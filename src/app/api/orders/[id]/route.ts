import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { status } = await req.json();
    const validStatuses = ["PENDING", "CONFIRMED", "DISPATCHED", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const order = await prisma.seedOrder.update({
      where: { id: params.id },
      data: { status },
      include: {
        farmer: { select: { name: true, phone: true } },
        seed: { select: { name: true } },
      },
    });

    if (status === "CANCELLED") {
      await prisma.seed.update({
        where: { id: order.seedId },
        data: { quantityKg: { increment: order.quantityKg } },
      });
    }

    return NextResponse.json({ order });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
