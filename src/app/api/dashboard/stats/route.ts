import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [farmers, batches, distributions] = await Promise.all([
      prisma.farmer.findMany({
        where: { isTechFarmerVerified: true },
        include: {
          annualMahiti: true,
        },
        orderBy: { grossIncomeInr: "desc" },
      }),
      prisma.seedBatch.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.seedDistribution.findMany({
        include: {
          farmer: true,
          batch: true,
        },
        orderBy: { distributionDate: "desc" },
      }),
    ]);

    const totalFarmers = farmers.length;
    const totalLandAcreage = farmers.reduce((sum, f) => sum + (f.totalLandOwnedAcres || 0), 0);
    const totalOnionAcreage = farmers.reduce(
      (sum, f) => sum + (f.onionCultivationAreaAcres || 0),
      0
    );
    const totalHarvestYieldKg = farmers.reduce((sum, f) => sum + (f.totalSeedYieldKg || 0), 0);
    const totalGrossIncomeInr = farmers.reduce((sum, f) => sum + (f.grossIncomeInr || 0), 0);
    const avgNetProfitPerAcreInr =
      totalOnionAcreage > 0
        ? Math.round(
            farmers.reduce(
              (sum, f) => sum + f.netProfitPerAcreInr * f.onionCultivationAreaAcres,
              0
            ) / totalOnionAcreage
          )
        : 0;

    const totalSeedYieldKg = batches.reduce((sum, b) => sum + (b.totalYieldKg || 0), 0);
    const totalStockAvailableKg = batches.reduce((sum, b) => sum + (b.stockAvailableKg || 0), 0);
    const totalDistributedKg = distributions.reduce((sum, d) => sum + (d.quantityKg || 0), 0);
    const totalDistributionRevenue = distributions.reduce((sum, d) => sum + (d.totalAmount || 0), 0);

    const certifiedBatchesCount = batches.filter(
      (b) => b.qcStatus === "CERTIFIED" || b.qcStatus === "PASSED"
    ).length;

    // Aggregate by variety (from batches & farmers)
    const varietyMap = new Map<string, { totalYield: number; remainingStock: number; distributed: number }>();
    batches.forEach((b) => {
      const current = varietyMap.get(b.varietyName) || { totalYield: 0, remainingStock: 0, distributed: 0 };
      current.totalYield += b.totalYieldKg;
      current.remainingStock += b.stockAvailableKg;
      current.distributed += b.totalYieldKg - b.stockAvailableKg;
      varietyMap.set(b.varietyName, current);
    });

    const varietyYieldData = Array.from(varietyMap.entries()).map(([variety, data]) => ({
      variety: variety.split(" (")[0],
      fullName: variety,
      totalYield: data.totalYield,
      remainingStock: Math.max(0, data.remainingStock),
      distributed: Math.max(0, data.distributed),
    }));

    // District breakdown
    const districtMap = new Map<string, { acreage: number; farmers: number; income: number }>();
    farmers.forEach((f) => {
      const current = districtMap.get(f.district) || { acreage: 0, farmers: 0, income: 0 };
      current.acreage += f.onionCultivationAreaAcres || 0;
      current.farmers += 1;
      current.income += f.grossIncomeInr || 0;
      districtMap.set(f.district, current);
    });

    const districtAcreageData = Array.from(districtMap.entries()).map(([district, data]) => ({
      district,
      acreage: Number(data.acreage.toFixed(1)),
      farmers: data.farmers,
      income: data.income,
    }));

    // Top Earning Tech Farmers
    const topTechFarmers = farmers.slice(0, 5).map((f) => ({
      id: f.id,
      code: f.farmerId,
      name: f.fullName,
      village: `${f.villageTown}, ${f.district}`,
      variety: f.seedVarietyPurchased.split(" (")[0],
      onionArea: f.onionCultivationAreaAcres,
      yieldKg: f.totalSeedYieldKg,
      grossIncome: f.grossIncomeInr,
      profitPerAcre: f.netProfitPerAcreInr,
    }));

    // Recent distributions
    const recentDistributions = distributions.slice(0, 6).map((d) => ({
      id: d.id,
      code: d.distributionCode,
      farmerName: d.farmer.fullName,
      farmerVillage: `${d.farmer.villageTown}, ${d.farmer.district}`,
      batchNumber: d.batch.batchNumber,
      varietyName: d.batch.varietyName,
      quantityKg: d.quantityKg,
      totalAmount: d.totalAmount,
      date: d.distributionDate,
      season: d.season,
      paymentStatus: d.paymentStatus,
    }));

    return NextResponse.json({
      summary: {
        totalFarmers,
        totalLandAcreage: Number(totalLandAcreage.toFixed(1)),
        totalOnionAcreage: Number(totalOnionAcreage.toFixed(1)),
        totalHarvestYieldKg: Math.round(totalHarvestYieldKg),
        totalGrossIncomeInr: Math.round(totalGrossIncomeInr),
        avgNetProfitPerAcreInr,
        totalSeedYieldKg: Number(totalSeedYieldKg.toFixed(1)),
        totalStockAvailableKg: Number(totalStockAvailableKg.toFixed(1)),
        totalDistributedKg: Number(totalDistributedKg.toFixed(1)),
        totalDistributionRevenue: Math.round(totalDistributionRevenue),
        activeBatchesCount: batches.length,
        certifiedBatchesCount,
        qcPassRate: batches.length ? Math.round((certifiedBatchesCount / batches.length) * 100) : 100,
      },
      varietyYieldData,
      districtAcreageData,
      topTechFarmers,
      recentDistributions,
    });
  } catch (error: any) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics: " + error.message },
      { status: 500 }
    );
  }
}
