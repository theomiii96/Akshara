// API: GET all seeds (public/farmer) + POST new seed (admin only)
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const seeds = await prisma.seed.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ seeds });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const { name, variety, category, description, quantityKg, pricePerKg, minOrderKg, maxOrderKg, season, germinationPct } = data;

    if (!name || !variety || !category || quantityKg == null || pricePerKg == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const seed = await prisma.seed.create({
      data: {
        name,
        variety,
        category,
        description: description || null,
        quantityKg: parseFloat(quantityKg),
        pricePerKg: parseFloat(pricePerKg),
        minOrderKg: minOrderKg ? parseFloat(minOrderKg) : 0.5,
        maxOrderKg: maxOrderKg ? parseFloat(maxOrderKg) : 25.0,
        season: season || null,
        germinationPct: germinationPct ? parseFloat(germinationPct) : null,
        isActive: true,
      },
    });

    return NextResponse.json({ seed }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
