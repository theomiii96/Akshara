import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const dist = await prisma.seedDistribution.findUnique({
      where: { id: params.id },
    });

    if (!dist) {
      return NextResponse.json({ error: "Distribution not found" }, { status: 404 });
    }

    // Atomic delete and stock restitution
    await prisma.$transaction(async (tx) => {
      await tx.seedDistribution.delete({
        where: { id: params.id },
      });

      await tx.seedBatch.update({
        where: { id: dist.batchId },
        data: {
          stockAvailableKg: {
            increment: dist.quantityKg,
          },
        },
      });
    });

    return NextResponse.json({ success: true, message: "Distribution deleted and stock restored" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete distribution: " + error.message },
      { status: 500 }
    );
  }
}
