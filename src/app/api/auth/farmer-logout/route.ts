// API: Farmer logout
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({ name: "akshara_farmer_token", value: "", maxAge: 0, path: "/" });
  return response;
}
