import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const batch = await prisma.seedBatch.findUnique({
      where: { id: params.id },
      include: {
        distributions: {
          include: {
            farmer: true,
          },
          orderBy: { distributionDate: "desc" },
        },
      },
    });

    if (!batch) {
      return NextResponse.json({ error: "Batch not found" }, { status: 404 });
    }

    return NextResponse.json({ batch });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch batch: " + error.message },
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

    const updatedBatch = await prisma.seedBatch.update({
      where: { id: params.id },
      data: {
        varietyName: data.varietyName?.trim(),
        seedClass: data.seedClass?.trim(),
        germinationRate:
          data.germinationRate !== undefined ? parseFloat(data.germinationRate) : undefined,
        purityPercentage:
          data.purityPercentage !== undefined ? parseFloat(data.purityPercentage) : undefined,
        moistureContent:
          data.moistureContent !== undefined ? parseFloat(data.moistureContent) : undefined,
        totalYieldKg:
          data.totalYieldKg !== undefined ? parseFloat(data.totalYieldKg) : undefined,
        stockAvailableKg:
          data.stockAvailableKg !== undefined ? parseFloat(data.stockAvailableKg) : undefined,
        costPerKg: data.costPerKg !== undefined ? parseFloat(data.costPerKg) : undefined,
        qcStatus: data.qcStatus,
        qcInspector: data.qcInspector?.trim(),
        qcCertificateNo: data.qcCertificateNo?.trim(),
      },
    });

    return NextResponse.json({ success: true, batch: updatedBatch });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update batch: " + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const distCount = await prisma.seedDistribution.count({
      where: { batchId: params.id },
    });

    if (distCount > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete batch: ${distCount} active seed distribution(s) are linked to this batch.`,
        },
        { status: 400 }
      );
    }

    await prisma.seedBatch.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: "Batch deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete batch: " + error.message },
      { status: 500 }
    );
  }
}
