// API: Farmer login (phone + password)
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { phone, password } = await req.json();

    if (!phone || !password) {
      return NextResponse.json({ error: "Phone number and password are required" }, { status: 400 });
    }

    const farmer = await prisma.farmerAccount.findUnique({
      where: { phone: phone.trim() },
    });

    if (!farmer) {
      return NextResponse.json({ error: "Invalid phone number or password" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, farmer.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid phone number or password" }, { status: 401 });
    }

    const token = signToken({
      id: farmer.id,
      email: farmer.phone, // reuse email field for phone
      name: farmer.name,
      role: "FARMER",
    });

    const response = NextResponse.json({
      success: true,
      farmer: {
        id: farmer.id,
        name: farmer.name,
        phone: farmer.phone,
        village: farmer.village,
        district: farmer.district,
      },
    });

    response.cookies.set({
      name: "akshara_farmer_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Farmer login error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
