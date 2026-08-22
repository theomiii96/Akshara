import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const farmer = await prisma.farmer.findUnique({
      where: { id: params.id },
      include: {
        annualMahiti: {
          orderBy: { harvestYear: "desc" },
        },
        distributions: {
          include: {
            batch: true,
          },
          orderBy: { distributionDate: "desc" },
        },
      },
    });

    if (!farmer) {
      return NextResponse.json({ error: "Farmer not found" }, { status: 404 });
    }

    return NextResponse.json({ farmer });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch farmer: " + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();

    const onionArea =
      data.onionCultivationAreaAcres !== undefined
        ? parseFloat(data.onionCultivationAreaAcres)
        : undefined;
    const grossIncome =
      data.grossIncomeInr !== undefined ? parseFloat(data.grossIncomeInr) : undefined;

    let netProfit =
      data.netProfitPerAcreInr !== undefined
        ? parseFloat(data.netProfitPerAcreInr)
        : undefined;

    if (
      netProfit === undefined &&
      grossIncome !== undefined &&
      onionArea !== undefined &&
      onionArea > 0
    ) {
      netProfit = Math.round((grossIncome * 0.75) / onionArea);
    }

    const updatedFarmer = await prisma.farmer.update({
      where: { id: params.id },
      data: {
        fullName: data.fullName?.trim(),
        phone: data.phone?.trim(),
        villageTown: data.villageTown?.trim(),
        taluka: data.taluka?.trim(),
        district: data.district?.trim(),
        totalLandOwnedAcres:
          data.totalLandOwnedAcres !== undefined
            ? parseFloat(data.totalLandOwnedAcres)
            : undefined,
        onionCultivationAreaAcres: onionArea,
        seedVarietyPurchased: data.seedVarietyPurchased?.trim(),
        quantityPurchasedKg:
          data.quantityPurchasedKg !== undefined
            ? parseFloat(data.quantityPurchasedKg)
            : undefined,
        purchaseDate: data.purchaseDate ? new Date(data.purchaseDate) : undefined,
        batchNumber: data.batchNumber?.trim(),
        harvestYear:
          data.harvestYear !== undefined ? parseInt(data.harvestYear) : undefined,
        totalSeedYieldKg:
          data.totalSeedYieldKg !== undefined
            ? parseFloat(data.totalSeedYieldKg)
            : undefined,
        grossIncomeInr: grossIncome,
        netProfitPerAcreInr: netProfit,
        soilType: data.soilType?.trim(),
        irrigationSource: data.irrigationSource?.trim(),
        notes: data.notes?.trim(),
      },
      include: {
        annualMahiti: true,
      },
    });

    return NextResponse.json({ success: true, farmer: updatedFarmer });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update tech farmer: " + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.farmer.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: "Tech farmer deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete farmer: " + error.message },
      { status: 500 }
    );
  }
}
