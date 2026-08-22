import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase().trim() || "";
    const district = searchParams.get("district") || "";
    const variety = searchParams.get("variety") || "";
    const incomeBracket = searchParams.get("incomeBracket") || "";
    const sortBy = searchParams.get("sortBy") || "income_desc";

    const where: any = {
      isTechFarmerVerified: true, // Directory strictly filtered to verified seed buyers
    };

    if (district && district !== "ALL") {
      where.district = district;
    }

    if (variety && variety !== "ALL") {
      where.seedVarietyPurchased = { contains: variety };
    }

    if (incomeBracket === "ABOVE_30L") {
      where.grossIncomeInr = { gte: 3000000 };
    } else if (incomeBracket === "ABOVE_40L") {
      where.grossIncomeInr = { gte: 4000000 };
    } else if (incomeBracket === "ABOVE_45L") {
      where.grossIncomeInr = { gte: 4500000 };
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { phone: { contains: search } },
        { villageTown: { contains: search } },
        { taluka: { contains: search } },
        { district: { contains: search } },
        { farmerId: { contains: search } },
        { seedVarietyPurchased: { contains: search } },
        { batchNumber: { contains: search } },
      ];
    }

    let orderBy: any = { grossIncomeInr: "desc" };

    if (sortBy === "income_asc") {
      orderBy = { grossIncomeInr: "asc" };
    } else if (sortBy === "profit_desc") {
      orderBy = { netProfitPerAcreInr: "desc" };
    } else if (sortBy === "profit_asc") {
      orderBy = { netProfitPerAcreInr: "asc" };
    } else if (sortBy === "land_desc") {
      orderBy = { totalLandOwnedAcres: "desc" };
    } else if (sortBy === "onion_area_desc") {
      orderBy = { onionCultivationAreaAcres: "desc" };
    } else if (sortBy === "yield_desc") {
      orderBy = { totalSeedYieldKg: "desc" };
    } else if (sortBy === "recent") {
      orderBy = { purchaseDate: "desc" };
    }

    const farmers = await prisma.farmer.findMany({
      where,
      include: {
        annualMahiti: {
          orderBy: { harvestYear: "desc" },
        },
        distributions: {
          include: {
            batch: true,
          },
        },
      },
      orderBy,
    });

    const enrichedFarmers = farmers.map((f) => {
      const landYieldRatio =
        f.onionCultivationAreaAcres > 0
          ? Number((f.totalSeedYieldKg / f.onionCultivationAreaAcres).toFixed(0))
          : 0;

      return {
        ...f,
        landYieldRatio, // kg per acre yield ratio
        totalDistributedKg: f.distributions.reduce((sum, d) => sum + d.quantityKg, 0),
        distributionsCount: f.distributions.length,
      };
    });

    return NextResponse.json({ farmers: enrichedFarmers });
  } catch (error: any) {
    console.error("Fetch farmers error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tech farmers: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      fullName,
      phone,
      villageTown,
      taluka,
      district,
      totalLandOwnedAcres,
      onionCultivationAreaAcres,
      seedVarietyPurchased,
      quantityPurchasedKg,
      purchaseDate,
      batchNumber,
      harvestYear,
      totalSeedYieldKg,
      grossIncomeInr,
      netProfitPerAcreInr,
      soilType,
      irrigationSource,
      notes,
    } = data;

    if (!fullName || !phone || !villageTown || !district || !seedVarietyPurchased) {
      return NextResponse.json(
        { error: "Full Name, phone, village, district, and seed variety are required." },
        { status: 400 }
      );
    }

    const count = await prisma.farmer.count();
    const nextCodeNum = String(count + 101).padStart(4, "0");
    const farmerId = data.farmerId?.trim() || `AFPC-TF-${nextCodeNum}`;

    const totalLand = parseFloat(totalLandOwnedAcres) || 3.0;
    const onionArea = parseFloat(onionCultivationAreaAcres) || 2.0;
    const qtyPurchased = parseFloat(quantityPurchasedKg) || 10.0;
    const year = parseInt(harvestYear) || new Date().getFullYear();
    const totalYield = parseFloat(totalSeedYieldKg) || 25000.0;
    const grossIncome = parseFloat(grossIncomeInr) || 2500000.0;

    // Calculate net profit per acre if not explicitly provided (approx 70-80% profit margin in garwa onion)
    let netProfitPerAcre = parseFloat(netProfitPerAcreInr);
    if (isNaN(netProfitPerAcre) || netProfitPerAcre <= 0) {
      netProfitPerAcre = onionArea > 0 ? (grossIncome * 0.75) / onionArea : 750000;
    }

    const newFarmer = await prisma.farmer.create({
      data: {
        farmerId,
        fullName: fullName.trim(),
        phone: phone.trim(),
        villageTown: villageTown.trim(),
        taluka: (taluka || villageTown).trim(),
        district: district.trim(),
        totalLandOwnedAcres: totalLand,
        onionCultivationAreaAcres: onionArea,
        seedVarietyPurchased: seedVarietyPurchased.trim(),
        quantityPurchasedKg: qtyPurchased,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : new Date(),
        batchNumber: batchNumber?.trim() || "AK-N241-2025-04",
        harvestYear: year,
        totalSeedYieldKg: totalYield,
        grossIncomeInr: grossIncome,
        netProfitPerAcreInr: Math.round(netProfitPerAcre),
        isTechFarmerVerified: true,
        customerCategory: "TECH_FARMER",
        soilType: soilType?.trim() || "Medium Black Soil",
        irrigationSource: irrigationSource?.trim() || "Drip Irrigation",
        notes: notes?.trim() || null,
        annualMahiti: {
          create: [
            {
              harvestYear: year,
              seedVariety: seedVarietyPurchased.trim(),
              quantityPurchasedKg: qtyPurchased,
              batchNumber: batchNumber?.trim() || "AK-N241-2025-04",
              totalYieldKg: totalYield,
              grossIncomeInr: grossIncome,
              netProfitPerAcreInr: Math.round(netProfitPerAcre),
              season: "Rabi " + year,
            },
          ],
        },
      },
      include: {
        annualMahiti: true,
      },
    });

    return NextResponse.json({ success: true, farmer: newFarmer }, { status: 201 });
  } catch (error: any) {
    console.error("Create farmer error:", error);
    return NextResponse.json(
      { error: "Failed to create tech farmer record: " + error.message },
      { status: 500 }
    );
  }
}
