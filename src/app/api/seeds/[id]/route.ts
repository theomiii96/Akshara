// API: GET, PATCH, DELETE a specific seed by id (admin)
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const seed = await prisma.seed.findUnique({ where: { id: params.id } });
    if (!seed) return NextResponse.json({ error: "Seed not found" }, { status: 404 });
    return NextResponse.json({ seed });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const seed = await prisma.seed.update({
      where: { id: params.id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.variety !== undefined && { variety: data.variety }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.quantityKg !== undefined && { quantityKg: parseFloat(data.quantityKg) }),
        ...(data.pricePerKg !== undefined && { pricePerKg: parseFloat(data.pricePerKg) }),
        ...(data.minOrderKg !== undefined && { minOrderKg: parseFloat(data.minOrderKg) }),
        ...(data.maxOrderKg !== undefined && { maxOrderKg: parseFloat(data.maxOrderKg) }),
        ...(data.season !== undefined && { season: data.season }),
        ...(data.germinationPct !== undefined && { germinationPct: parseFloat(data.germinationPct) }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
    });
    return NextResponse.json({ seed });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Soft delete (deactivate)
    await prisma.seed.update({ where: { id: params.id }, data: { isActive: false } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
