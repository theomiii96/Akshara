import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase().trim() || "";
    const season = searchParams.get("season") || "";
    const paymentStatus = searchParams.get("paymentStatus") || "";

    const where: any = {};

    if (season && season !== "ALL") {
      where.season = season;
    }

    if (paymentStatus && paymentStatus !== "ALL") {
      where.paymentStatus = paymentStatus;
    }

    if (search) {
      where.OR = [
        { distributionCode: { contains: search } },
        { farmer: { fullName: { contains: search } } },
        { farmer: { villageTown: { contains: search } } },
        { batch: { batchNumber: { contains: search } } },
        { batch: { varietyName: { contains: search } } },
      ];
    }

    const distributions = await prisma.seedDistribution.findMany({
      where,
      include: {
        farmer: true,
        batch: true,
      },
      orderBy: { distributionDate: "desc" },
    });

    return NextResponse.json({ distributions });
  } catch (error: any) {
    console.error("Fetch distributions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch distributions: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      farmerId,
      batchId,
      quantityKg,
      targetAcreage,
      distributionDate,
      subsidyRatePct,
      paymentStatus,
      season,
      notes,
    } = data;

    if (!farmerId || !batchId || !quantityKg) {
      return NextResponse.json(
        { error: "Farmer, Seed Batch, and Quantity (kg) are required." },
        { status: 400 }
      );
    }

    const qty = parseFloat(quantityKg);
    if (qty <= 0) {
      return NextResponse.json(
        { error: "Quantity must be greater than 0 kg." },
        { status: 400 }
      );
    }

    // Check batch and stock
    const batch = await prisma.seedBatch.findUnique({
      where: { id: batchId },
    });

    if (!batch) {
      return NextResponse.json({ error: "Seed batch not found" }, { status: 404 });
    }

    if (batch.stockAvailableKg < qty) {
      return NextResponse.json(
        {
          error: `Insufficient stock in batch ${batch.batchNumber}. Available: ${batch.stockAvailableKg} kg, Requested: ${qty} kg.`,
        },
        { status: 400 }
      );
    }

    const farmer = await prisma.farmer.findUnique({
      where: { id: farmerId },
    });

    if (!farmer) {
      return NextResponse.json({ error: "Farmer not found" }, { status: 404 });
    }

    const subsidy = parseFloat(subsidyRatePct) || 0;
    const baseTotal = qty * batch.costPerKg;
    const finalTotal = baseTotal * (1 - subsidy / 100);

    const count = await prisma.seedDistribution.count();
    const year = new Date().getFullYear();
    const distributionCode = `DIST-${year}-${String(count + 1).padStart(3, "0")}`;

    // Execute atomic transaction to create distribution and decrement stock
    const result = await prisma.$transaction(async (tx) => {
      const createdDist = await tx.seedDistribution.create({
        data: {
          distributionCode,
          farmerId,
          batchId,
          quantityKg: qty,
          targetAcreage: targetAcreage ? parseFloat(targetAcreage) : Number((qty / 5).toFixed(1)),
          distributionDate: distributionDate ? new Date(distributionDate) : new Date(),
          subsidyRatePct: subsidy,
          totalAmount: Math.round(finalTotal),
          paymentStatus: paymentStatus || "PAID",
          season: season || "Rabi 2026",
          notes: notes?.trim() || null,
        },
        include: {
          farmer: true,
          batch: true,
        },
      });

      await tx.seedBatch.update({
        where: { id: batchId },
        data: {
          stockAvailableKg: {
            decrement: qty,
          },
        },
      });

      return createdDist;
    });

    return NextResponse.json({ success: true, distribution: result }, { status: 201 });
  } catch (error: any) {
    console.error("Create distribution error:", error);
    return NextResponse.json(
      { error: "Failed to issue seed distribution: " + error.message },
      { status: 500 }
    );
  }
}
