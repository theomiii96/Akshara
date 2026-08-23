import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

function generateOrderCode() {
  const now = new Date();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${rand}`;
}

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("akshara_token")?.value;
    const farmerToken = cookieStore.get("akshara_farmer_token")?.value;

    if (token) {
      const orders = await prisma.seedOrder.findMany({
        include: {
          farmer: { select: { name: true, phone: true, village: true, district: true } },
          seed: { select: { name: true, variety: true, category: true } },
        },
        orderBy: { orderedAt: "desc" },
      });
      return NextResponse.json({ orders });
    }

    if (farmerToken) {
      const farmerUser = verifyToken(farmerToken);
      if (!farmerUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

      const orders = await prisma.seedOrder.findMany({
        where: { farmerAccountId: farmerUser.id },
        include: {
          seed: { select: { name: true, variety: true, category: true } },
        },
        orderBy: { orderedAt: "desc" },
      });
      return NextResponse.json({ orders });
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const farmerToken = cookieStore.get("akshara_farmer_token")?.value;
    if (!farmerToken) return NextResponse.json({ error: "Farmer login required" }, { status: 401 });

    const farmerUser = verifyToken(farmerToken);
    if (!farmerUser) return NextResponse.json({ error: "Invalid session" }, { status: 401 });

    const { seedId, quantityKg, notes } = await req.json();

    if (!seedId || !quantityKg || quantityKg <= 0) {
      return NextResponse.json({ error: "Seed ID and valid quantity required" }, { status: 400 });
    }

    const seed = await prisma.seed.findUnique({ where: { id: seedId } });
    if (!seed || !seed.isActive) {
      return NextResponse.json({ error: "Seed not available" }, { status: 404 });
    }
    if (seed.quantityKg <= 0) {
      return NextResponse.json({ error: "OUT_OF_STOCK" }, { status: 409 });
    }
    if (quantityKg > seed.quantityKg) {
      return NextResponse.json({
        error: `Only ${seed.quantityKg} kg available in stock`,
        availableKg: seed.quantityKg,
      }, { status: 409 });
    }
    if (quantityKg < seed.minOrderKg) {
      return NextResponse.json({ error: `Minimum order is ${seed.minOrderKg} kg` }, { status: 400 });
    }
    if (quantityKg > seed.maxOrderKg) {
      return NextResponse.json({ error: `Maximum order per booking is ${seed.maxOrderKg} kg` }, { status: 400 });
    }

    const [order] = await prisma.$transaction([
      prisma.seedOrder.create({
        data: {
          orderCode: generateOrderCode(),
          farmerAccountId: farmerUser.id,
          seedId,
          quantityKg,
          pricePerKg: seed.pricePerKg,
          totalAmount: seed.pricePerKg * quantityKg,
          notes: notes || null,
          status: "CONFIRMED",
        },
        include: {
          seed: { select: { name: true, variety: true } },
        },
      }),
      prisma.seed.update({
        where: { id: seedId },
        data: { quantityKg: { decrement: quantityKg } },
      }),
    ]);

    return NextResponse.json({ order }, { status: 201 });
  } catch (error: any) {
    console.error("Order error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
