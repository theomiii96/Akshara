import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("akshara_farmer_token")?.value;
    if (!token) return NextResponse.json({ authenticated: false });

    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ authenticated: false });

    const farmer = await prisma.farmerAccount.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, phone: true, village: true, district: true },
    });

    if (!farmer) return NextResponse.json({ authenticated: false });

    return NextResponse.json({ authenticated: true, farmer });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
