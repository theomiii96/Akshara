import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase().trim() || "";
    const qcStatus = searchParams.get("qcStatus") || "";

    const where: any = {};

    if (qcStatus && qcStatus !== "ALL") {
      where.qcStatus = qcStatus;
    }

    if (search) {
      where.OR = [
        { batchNumber: { contains: search } },
        { varietyName: { contains: search } },
        { seedClass: { contains: search } },
        { qcCertificateNo: { contains: search } },
      ];
    }

    const batches = await prisma.seedBatch.findMany({
      where,
      include: {
        distributions: {
          include: {
            farmer: true,
          },
        },
      },
      orderBy: { harvestDate: "desc" },
    });

    const enrichedBatches = batches.map((b) => {
      const distributedKg = b.totalYieldKg - b.stockAvailableKg;
      const distributionPct = b.totalYieldKg > 0 ? (distributedKg / b.totalYieldKg) * 100 : 0;
      return {
        ...b,
        distributedKg: Number(distributedKg.toFixed(1)),
        distributionPct: Number(distributionPct.toFixed(1)),
      };
    });

    return NextResponse.json({ batches: enrichedBatches });
  } catch (error: any) {
    console.error("Fetch batches error:", error);
    return NextResponse.json(
      { error: "Failed to fetch seed batches: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      batchNumber,
      varietyName,
      seedClass,
      harvestDate,
      germinationRate,
      purityPercentage,
      moistureContent,
      totalYieldKg,
      stockAvailableKg,
      costPerKg,
      qcStatus,
      qcInspector,
      qcCertificateNo,
    } = data;

    if (!varietyName || !totalYieldKg || !costPerKg) {
      return NextResponse.json(
        { error: "Variety name, total yield, and cost per kg are required." },
        { status: 400 }
      );
    }

    // Auto-generate batch number if omitted
    const count = await prisma.seedBatch.count();
    const year = new Date().getFullYear();
    const generatedBatchNo = `AK-ON-${year}-${String(count + 1).padStart(3, "0")}`;

    const totalYield = parseFloat(totalYieldKg) || 0;
    const stockAvailable =
      stockAvailableKg !== undefined ? parseFloat(stockAvailableKg) : totalYield;

    const newBatch = await prisma.seedBatch.create({
      data: {
        batchNumber: batchNumber?.trim() || generatedBatchNo,
        varietyName: varietyName.trim(),
        seedClass: seedClass?.trim() || "Certified Class I",
        harvestDate: harvestDate ? new Date(harvestDate) : new Date(),
        germinationRate: parseFloat(germinationRate) || 88.0,
        purityPercentage: parseFloat(purityPercentage) || 99.0,
        moistureContent: moistureContent ? parseFloat(moistureContent) : 6.2,
        totalYieldKg: totalYield,
        stockAvailableKg: stockAvailable,
        costPerKg: parseFloat(costPerKg) || 1800,
        qcStatus: qcStatus || "CERTIFIED",
        qcInspector: qcInspector?.trim() || "Seed Quality Assurance Cell",
        qcCertificateNo:
          qcCertificateNo?.trim() || `MSCA-${year}-${Math.floor(100 + Math.random() * 900)}`,
      },
    });

    return NextResponse.json({ success: true, batch: newBatch }, { status: 201 });
  } catch (error: any) {
    console.error("Create batch error:", error);
    return NextResponse.json(
      { error: "Failed to create seed batch: " + error.message },
      { status: 500 }
    );
  }
}
