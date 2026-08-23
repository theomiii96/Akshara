// prisma/seed.ts — Seed script for Akshara FPC (simplified)
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Akshara FPC database...");

  // ── Company Admin User ──────────────────────────────────────────────────
  const adminHash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@aksharafpc.com" },
    update: {},
    create: {
      email: "admin@aksharafpc.com",
      name: "Dnyaneshwar Shinde",
      password: adminHash,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user ready: admin@aksharafpc.com / admin123");

  // ── Farmer Demo Accounts ───────────────────────────────────────────────
  const farmerHash = await bcrypt.hash("farmer123", 10);
  await prisma.farmerAccount.upsert({
    where: { phone: "9876543210" },
    update: {},
    create: {
      name: "Ramesh Patil",
      phone: "9876543210",
      village: "Niphad",
      district: "Nashik",
      password: farmerHash,
    },
  });
  await prisma.farmerAccount.upsert({
    where: { phone: "9988776655" },
    update: {},
    create: {
      name: "Sunita Devi Gaikwad",
      phone: "9988776655",
      village: "Karmala",
      district: "Solapur",
      password: farmerHash,
    },
  });
  console.log("✅ Demo farmer accounts ready (phone: 9876543210 / farmer123)");

  // ── Seed Stock ────────────────────────────────────────────────────────
  const seeds = [
    {
      name: "Akshara Super Red Onion Seeds",
      variety: "N-2-4-1 (Garwa Selection)",
      category: "Onion",
      description: "High-pungency, uniform dark-red globes with 120-day maturity and exceptional 5-month storage shelf life. Tolerant to Purple Blotch and Stemphylium blight.",
      quantityKg: 500.0,
      pricePerKg: 2200.0,
      minOrderKg: 1.0,
      maxOrderKg: 25.0,
      season: "Rabi & Late Kharif",
      germinationPct: 92.0,
    },
    {
      name: "Fursungi Special Red Onion Seeds",
      variety: "Fursungi Special",
      category: "Onion",
      description: "Premium deep-red variety with excellent keeping quality and high marketable grade. Ideal for Rabi season sowing.",
      quantityKg: 300.0,
      pricePerKg: 2400.0,
      minOrderKg: 1.0,
      maxOrderKg: 20.0,
      season: "Rabi",
      germinationPct: 90.5,
    },
    {
      name: "Akshara Golden Gold Hybrid Maize (AKM-88)",
      variety: "AKM-88",
      category: "Maize",
      description: "Double-cross hybrid maize with thick orange-yellow kernels, strong lodging resistance, and high fodder value. Expected yield 32-38 quintals/acre.",
      quantityKg: 800.0,
      pricePerKg: 380.0,
      minOrderKg: 4.0,
      maxOrderKg: 50.0,
      season: "Kharif & Spring",
      germinationPct: 90.0,
    },
    {
      name: "Akshara Sugandh Certified Paddy Seed (Pusa-1121)",
      variety: "Pusa-1121 Basmati",
      category: "Paddy",
      description: "Extra-long slender grain basmati with natural aroma. High milling recovery. Yields up to 24 quintals/acre under SRI practices.",
      quantityKg: 400.0,
      pricePerKg: 120.0,
      minOrderKg: 5.0,
      maxOrderKg: 60.0,
      season: "Kharif",
      germinationPct: 88.0,
    },
    {
      name: "Bhima Super Onion Seed",
      variety: "Bhima Super",
      category: "Onion",
      description: "DOGR released high-yield variety suitable for both Kharif and Rabi. Known for uniform medium-large bulbs and good export quality.",
      quantityKg: 150.0,
      pricePerKg: 1900.0,
      minOrderKg: 1.0,
      maxOrderKg: 15.0,
      season: "Rabi & Kharif",
      germinationPct: 88.0,
    },
  ];

  for (const seed of seeds) {
    // Check if seed with same name exists
    const existing = await prisma.seed.findFirst({
      where: { name: seed.name },
    });
    if (!existing) {
      await prisma.seed.create({ data: seed });
      console.log(`  ✅ Added seed: ${seed.name} (${seed.quantityKg} kg available)`);
    } else {
      console.log(`  ℹ️  Seed already exists: ${seed.name}`);
    }
  }

  console.log("\n🌾 Database seeding complete!");
  console.log("Company Login → /login → admin@aksharafpc.com / admin123");
  console.log("Farmer Login → /farmer-login → Phone: 9876543210 / farmer123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
