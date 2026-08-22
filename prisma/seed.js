const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with Verified Tech Farmers and Annual Financial Mahiti...");

  // Clean up existing records
  await prisma.annualHarvestMahiti.deleteMany();
  await prisma.seedDistribution.deleteMany();
  await prisma.seedBatch.deleteMany();
  await prisma.farmer.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: {
      email: "admin@aksharafpc.com",
      name: "Dnyaneshwar Shinde (MD & Lead Agronomist)",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created: admin@aksharafpc.com / admin123");

  // 2. Create 5 Certified Onion Seed Batches (featuring N-2-4-1 and Fursungi Special)
  const batchesData = [
    {
      batchNumber: "AK-N241-2025-04",
      varietyName: "N-2-4-1 (Garwa Selection - High Storage)",
      seedClass: "Certified Class I",
      harvestDate: new Date("2025-12-15"),
      germinationRate: 92.5,
      purityPercentage: 99.6,
      moistureContent: 6.0,
      totalYieldKg: 2800.0,
      stockAvailableKg: 1950.0,
      costPerKg: 2200.0,
      qcStatus: "CERTIFIED",
      qcInspector: "Dr. Suresh Patil (Seed Quality Lab Nashik)",
      qcCertificateNo: "MSCA-NSK-2025-482",
    },
    {
      batchNumber: "AK-FUR-2025-09",
      varietyName: "Fursungi Special (Garwa Red Bulb)",
      seedClass: "Certified Class I",
      harvestDate: new Date("2025-12-20"),
      germinationRate: 90.0,
      purityPercentage: 99.2,
      moistureContent: 6.2,
      totalYieldKg: 3200.0,
      stockAvailableKg: 2100.0,
      costPerKg: 2050.0,
      qcStatus: "CERTIFIED",
      qcInspector: "Dr. Arvind Kulkarni (DOGR Certified Officer)",
      qcCertificateNo: "MSCA-PUN-2025-611",
    },
    {
      batchNumber: "AK-ON-2026-001",
      varietyName: "Bhima Super (Rabi / Late Kharif)",
      seedClass: "Foundation Seed",
      harvestDate: new Date("2026-01-10"),
      germinationRate: 91.0,
      purityPercentage: 99.4,
      moistureContent: 6.1,
      totalYieldKg: 1850.0,
      stockAvailableKg: 1300.0,
      costPerKg: 1950.0,
      qcStatus: "CERTIFIED",
      qcInspector: "Dr. Suresh Patil (Seed Quality Lab Nashik)",
      qcCertificateNo: "MSCA-NSK-2026-104",
    },
    {
      batchNumber: "AK-ON-2026-002",
      varietyName: "AgriFound Dark Red (Export Grade)",
      seedClass: "Certified Class I",
      harvestDate: new Date("2026-01-25"),
      germinationRate: 93.0,
      purityPercentage: 99.7,
      moistureContent: 5.8,
      totalYieldKg: 1500.0,
      stockAvailableKg: 1100.0,
      costPerKg: 2350.0,
      qcStatus: "CERTIFIED",
      qcInspector: "Smt. Manisha Pawar (Seed Certification Agency)",
      qcCertificateNo: "MSCA-AHM-2026-219",
    },
    {
      batchNumber: "AK-N241-2026-01",
      varietyName: "N-2-4-1 (Navsari / DOGR Breeder Lot)",
      seedClass: "Breeder Seed",
      harvestDate: new Date("2026-02-01"),
      germinationRate: 94.0,
      purityPercentage: 99.8,
      moistureContent: 5.9,
      totalYieldKg: 1100.0,
      stockAvailableKg: 850.0,
      costPerKg: 2600.0,
      qcStatus: "CERTIFIED",
      qcInspector: "Dr. Arvind Kulkarni (DOGR Certified Officer)",
      qcCertificateNo: "MSCA-PUN-2026-302",
    },
  ];

  const createdBatches = [];
  for (const b of batchesData) {
    const created = await prisma.seedBatch.create({ data: b });
    createdBatches.push(created);
  }
  console.log(`✅ Seeded ${createdBatches.length} Seed Batches`);

  // 3. Create 10 Verified Tech Farmers (Maharashtra: Nashik, Pune, Ahmednagar)
  const techFarmersData = [
    {
      farmerId: "AFPC-TF-0101",
      fullName: "Suresh Baburao Patil",
      phone: "+91 98224 51230",
      villageTown: "Niphad",
      taluka: "Niphad",
      district: "Nashik",
      totalLandOwnedAcres: 5.5,
      onionCultivationAreaAcres: 4.5,
      seedVarietyPurchased: "N-2-4-1 (Garwa Selection - High Storage)",
      quantityPurchasedKg: 22.5,
      purchaseDate: new Date("2025-08-15"),
      batchNumber: "AK-N241-2025-04",
      harvestYear: 2025,
      totalSeedYieldKg: 52000.0, // Commercial harvest yield using our seeds
      grossIncomeInr: 4680000.0, // ₹46.80 Lakhs annual income
      netProfitPerAcreInr: 880000.0, // ₹8.80 Lakhs / acre net profit
      isTechFarmerVerified: true,
      customerCategory: "TECH_FARMER",
      soilType: "Deep Black Cotton",
      irrigationSource: "Drip Irrigation & Godavari Canal",
      registrationDate: new Date("2024-03-10"),
      notes: "Tech Farmer leader in Niphad cluster. Achieved 6-month storage life with N-2-4-1 seeds.",
      annualHistory: [
        {
          harvestYear: 2024,
          seedVariety: "N-2-4-1 (Garwa Selection)",
          quantityPurchasedKg: 20.0,
          batchNumber: "AK-N241-2024-02",
          totalYieldKg: 46000.0,
          grossIncomeInr: 3910000.0,
          netProfitPerAcreInr: 760000.0,
          season: "Rabi 2024",
        },
        {
          harvestYear: 2025,
          seedVariety: "N-2-4-1 (Garwa Selection - High Storage)",
          quantityPurchasedKg: 22.5,
          batchNumber: "AK-N241-2025-04",
          totalYieldKg: 52000.0,
          grossIncomeInr: 4680000.0,
          netProfitPerAcreInr: 880000.0,
          season: "Rabi 2025",
        },
      ],
    },
    {
      farmerId: "AFPC-TF-0102",
      fullName: "Rameshwar Tukaram Jadhav",
      phone: "+91 94231 88901",
      villageTown: "Dindori",
      taluka: "Dindori",
      district: "Nashik",
      totalLandOwnedAcres: 4.0,
      onionCultivationAreaAcres: 3.5,
      seedVarietyPurchased: "Fursungi Special (Garwa Red Bulb)",
      quantityPurchasedKg: 17.5,
      purchaseDate: new Date("2025-08-20"),
      batchNumber: "AK-FUR-2025-09",
      harvestYear: 2025,
      totalSeedYieldKg: 41000.0,
      grossIncomeInr: 3895000.0, // ₹38.95 Lakhs annual income
      netProfitPerAcreInr: 920000.0, // ₹9.20 Lakhs / acre
      isTechFarmerVerified: true,
      customerCategory: "TECH_FARMER",
      soilType: "Red Loamy Soil",
      irrigationSource: "Open Well & Automated Drip",
      registrationDate: new Date("2024-04-12"),
      notes: "Precision drip irrigator; record bulb weight uniformity with Fursungi Special.",
      annualHistory: [
        {
          harvestYear: 2024,
          seedVariety: "Fursungi Special Red",
          quantityPurchasedKg: 15.0,
          batchNumber: "AK-FUR-2024-01",
          totalYieldKg: 35000.0,
          grossIncomeInr: 3150000.0,
          netProfitPerAcreInr: 780000.0,
          season: "Rabi 2024",
        },
        {
          harvestYear: 2025,
          seedVariety: "Fursungi Special (Garwa Red Bulb)",
          quantityPurchasedKg: 17.5,
          batchNumber: "AK-FUR-2025-09",
          totalYieldKg: 41000.0,
          grossIncomeInr: 3895000.0,
          netProfitPerAcreInr: 920000.0,
          season: "Rabi 2025",
        },
      ],
    },
    {
      farmerId: "AFPC-TF-0103",
      fullName: "Anand Bhaskar Shirole",
      phone: "+91 97654 11298",
      villageTown: "Sinnar",
      taluka: "Sinnar",
      district: "Nashik",
      totalLandOwnedAcres: 5.0,
      onionCultivationAreaAcres: 4.5,
      seedVarietyPurchased: "N-2-4-1 (Garwa Selection - High Storage)",
      quantityPurchasedKg: 22.0,
      purchaseDate: new Date("2025-09-01"),
      batchNumber: "AK-N241-2025-04",
      harvestYear: 2025,
      totalSeedYieldKg: 54000.0,
      grossIncomeInr: 4860000.0, // ₹48.60 Lakhs annual income (Top Performer)
      netProfitPerAcreInr: 910000.0,
      isTechFarmerVerified: true,
      customerCategory: "TECH_FARMER",
      soilType: "Clay Loam",
      irrigationSource: "Farm Pond & Micro-Drip",
      registrationDate: new Date("2024-05-18"),
      notes: "Top revenue producer in Sinnar taluka. Sold directly to premium Vashi APMC buyers.",
      annualHistory: [
        {
          harvestYear: 2024,
          seedVariety: "N-2-4-1 (Garwa Selection)",
          quantityPurchasedKg: 20.0,
          batchNumber: "AK-N241-2024-02",
          totalYieldKg: 48000.0,
          grossIncomeInr: 4080000.0,
          netProfitPerAcreInr: 810000.0,
          season: "Rabi 2024",
        },
        {
          harvestYear: 2025,
          seedVariety: "N-2-4-1 (Garwa Selection - High Storage)",
          quantityPurchasedKg: 22.0,
          batchNumber: "AK-N241-2025-04",
          totalYieldKg: 54000.0,
          grossIncomeInr: 4860000.0,
          netProfitPerAcreInr: 910000.0,
          season: "Rabi 2025",
        },
      ],
    },
    {
      farmerId: "AFPC-TF-0104",
      fullName: "Sunita Eknath Gaikwad",
      phone: "+91 98810 33421",
      villageTown: "Yeola",
      taluka: "Yeola",
      district: "Nashik",
      totalLandOwnedAcres: 3.5,
      onionCultivationAreaAcres: 2.5,
      seedVarietyPurchased: "Fursungi Special (Garwa Red Bulb)",
      quantityPurchasedKg: 12.5,
      purchaseDate: new Date("2025-09-10"),
      batchNumber: "AK-FUR-2025-09",
      harvestYear: 2025,
      totalSeedYieldKg: 31000.0,
      grossIncomeInr: 2945000.0, // ₹29.45 Lakhs
      netProfitPerAcreInr: 980000.0, // Outstanding ₹9.8L / acre efficiency
      isTechFarmerVerified: true,
      customerCategory: "TECH_FARMER",
      soilType: "Medium Black Soil",
      irrigationSource: "Borewell with Solar Pump",
      registrationDate: new Date("2024-06-02"),
      notes: "Women self-help group cluster mentor; solar-powered drip irrigation layout.",
      annualHistory: [
        {
          harvestYear: 2024,
          seedVariety: "Fursungi Special Red",
          quantityPurchasedKg: 10.0,
          batchNumber: "AK-FUR-2024-01",
          totalYieldKg: 26000.0,
          grossIncomeInr: 2340000.0,
          netProfitPerAcreInr: 820000.0,
          season: "Rabi 2024",
        },
        {
          harvestYear: 2025,
          seedVariety: "Fursungi Special (Garwa Red Bulb)",
          quantityPurchasedKg: 12.5,
          batchNumber: "AK-FUR-2025-09",
          totalYieldKg: 31000.0,
          grossIncomeInr: 2945000.0,
          netProfitPerAcreInr: 980000.0,
          season: "Rabi 2025",
        },
      ],
    },
    {
      farmerId: "AFPC-TF-0105",
      fullName: "Vilas Sopanrao Kale",
      phone: "+91 94220 19845",
      villageTown: "Junnar",
      taluka: "Junnar",
      district: "Pune",
      totalLandOwnedAcres: 5.0,
      onionCultivationAreaAcres: 4.0,
      seedVarietyPurchased: "N-2-4-1 (Garwa Selection - High Storage)",
      quantityPurchasedKg: 20.0,
      purchaseDate: new Date("2025-08-28"),
      batchNumber: "AK-N241-2025-04",
      harvestYear: 2025,
      totalSeedYieldKg: 49000.0,
      grossIncomeInr: 4410000.0, // ₹44.10 Lakhs
      netProfitPerAcreInr: 925000.0,
      isTechFarmerVerified: true,
      customerCategory: "TECH_FARMER",
      soilType: "Fertile Silt Loam",
      irrigationSource: "Kukadi Left Canal & Drip",
      registrationDate: new Date("2024-07-05"),
      notes: "High altitude Junnar valley grower; zero purple blotch incidence observed.",
      annualHistory: [
        {
          harvestYear: 2024,
          seedVariety: "N-2-4-1 (Garwa Selection)",
          quantityPurchasedKg: 18.0,
          batchNumber: "AK-N241-2024-02",
          totalYieldKg: 42000.0,
          grossIncomeInr: 3570000.0,
          netProfitPerAcreInr: 790000.0,
          season: "Rabi 2024",
        },
        {
          harvestYear: 2025,
          seedVariety: "N-2-4-1 (Garwa Selection - High Storage)",
          quantityPurchasedKg: 20.0,
          batchNumber: "AK-N241-2025-04",
          totalYieldKg: 49000.0,
          grossIncomeInr: 4410000.0,
          netProfitPerAcreInr: 925000.0,
          season: "Rabi 2025",
        },
      ],
    },
    {
      farmerId: "AFPC-TF-0106",
      fullName: "Kisan Mahadev Thite",
      phone: "+91 98902 44533",
      villageTown: "Manchar",
      taluka: "Ambegaon",
      district: "Pune",
      totalLandOwnedAcres: 3.5,
      onionCultivationAreaAcres: 3.0,
      seedVarietyPurchased: "Fursungi Special (Garwa Red Bulb)",
      quantityPurchasedKg: 15.0,
      purchaseDate: new Date("2025-09-05"),
      batchNumber: "AK-FUR-2025-09",
      harvestYear: 2025,
      totalSeedYieldKg: 37500.0,
      grossIncomeInr: 3562500.0, // ₹35.62 Lakhs
      netProfitPerAcreInr: 970000.0,
      isTechFarmerVerified: true,
      customerCategory: "TECH_FARMER",
      soilType: "Red-Brown Clay Loam",
      irrigationSource: "Dimbhe Dam Lift & Drip",
      registrationDate: new Date("2024-08-14"),
      notes: "Integrated pest management adopter; certified natural foliar spray trials.",
      annualHistory: [
        {
          harvestYear: 2024,
          seedVariety: "Fursungi Special Red",
          quantityPurchasedKg: 12.0,
          batchNumber: "AK-FUR-2024-01",
          totalYieldKg: 30000.0,
          grossIncomeInr: 2700000.0,
          netProfitPerAcreInr: 790000.0,
          season: "Rabi 2024",
        },
        {
          harvestYear: 2025,
          seedVariety: "Fursungi Special (Garwa Red Bulb)",
          quantityPurchasedKg: 15.0,
          batchNumber: "AK-FUR-2025-09",
          totalYieldKg: 37500.0,
          grossIncomeInr: 3562500.0,
          netProfitPerAcreInr: 970000.0,
          season: "Rabi 2025",
        },
      ],
    },
    {
      farmerId: "AFPC-TF-0107",
      fullName: "Shivaji Shankarrao Deshmukh",
      phone: "+91 97633 89012",
      villageTown: "Baramati",
      taluka: "Baramati",
      district: "Pune",
      totalLandOwnedAcres: 5.5,
      onionCultivationAreaAcres: 5.0,
      seedVarietyPurchased: "N-2-4-1 (Garwa Selection - High Storage)",
      quantityPurchasedKg: 25.0,
      purchaseDate: new Date("2025-08-18"),
      batchNumber: "AK-N241-2025-04",
      harvestYear: 2025,
      totalSeedYieldKg: 61000.0,
      grossIncomeInr: 4880000.0, // ₹48.80 Lakhs (Highest Grossing)
      netProfitPerAcreInr: 830000.0,
      isTechFarmerVerified: true,
      customerCategory: "TECH_FARMER",
      soilType: "Heavy Black Soil",
      irrigationSource: "Nira Left Canal & Automated Drip",
      registrationDate: new Date("2024-09-20"),
      notes: "Commercial storage innovator with 100-ton capacity modern ventilated chawl.",
      annualHistory: [
        {
          harvestYear: 2024,
          seedVariety: "N-2-4-1 (Garwa Selection)",
          quantityPurchasedKg: 22.0,
          batchNumber: "AK-N241-2024-02",
          totalYieldKg: 53000.0,
          grossIncomeInr: 4240000.0,
          netProfitPerAcreInr: 750000.0,
          season: "Rabi 2024",
        },
        {
          harvestYear: 2025,
          seedVariety: "N-2-4-1 (Garwa Selection - High Storage)",
          quantityPurchasedKg: 25.0,
          batchNumber: "AK-N241-2025-04",
          totalYieldKg: 61000.0,
          grossIncomeInr: 4880000.0,
          netProfitPerAcreInr: 830000.0,
          season: "Rabi 2025",
        },
      ],
    },
    {
      farmerId: "AFPC-TF-0108",
      fullName: "Pandurang Kashinath More",
      phone: "+91 99213 77412",
      villageTown: "Rahuri",
      taluka: "Rahuri",
      district: "Ahmednagar",
      totalLandOwnedAcres: 4.5,
      onionCultivationAreaAcres: 3.5,
      seedVarietyPurchased: "N-2-4-1 (Garwa Selection - High Storage)",
      quantityPurchasedKg: 17.5,
      purchaseDate: new Date("2025-09-02"),
      batchNumber: "AK-N241-2025-04",
      harvestYear: 2025,
      totalSeedYieldKg: 42000.0,
      grossIncomeInr: 3780000.0, // ₹37.80 Lakhs
      netProfitPerAcreInr: 890000.0,
      isTechFarmerVerified: true,
      customerCategory: "TECH_FARMER",
      soilType: "Deep Alluvial Black",
      irrigationSource: "Pravara River Lift Irrigation",
      registrationDate: new Date("2024-10-10"),
      notes: "MPKV Rahuri seed demonstration partner; 100% certified seed multiplier.",
      annualHistory: [
        {
          harvestYear: 2024,
          seedVariety: "N-2-4-1 (Garwa Selection)",
          quantityPurchasedKg: 15.0,
          batchNumber: "AK-N241-2024-02",
          totalYieldKg: 36000.0,
          grossIncomeInr: 3060000.0,
          netProfitPerAcreInr: 770000.0,
          season: "Rabi 2024",
        },
        {
          harvestYear: 2025,
          seedVariety: "N-2-4-1 (Garwa Selection - High Storage)",
          quantityPurchasedKg: 17.5,
          batchNumber: "AK-N241-2025-04",
          totalYieldKg: 42000.0,
          grossIncomeInr: 3780000.0,
          netProfitPerAcreInr: 890000.0,
          season: "Rabi 2025",
        },
      ],
    },
    {
      farmerId: "AFPC-TF-0109",
      fullName: "Balasaheb Ramdas Dighe",
      phone: "+91 98500 62190",
      villageTown: "Sangamner",
      taluka: "Sangamner",
      district: "Ahmednagar",
      totalLandOwnedAcres: 3.0,
      onionCultivationAreaAcres: 2.5,
      seedVarietyPurchased: "Fursungi Special (Garwa Red Bulb)",
      quantityPurchasedKg: 12.5,
      purchaseDate: new Date("2025-09-12"),
      batchNumber: "AK-FUR-2025-09",
      harvestYear: 2025,
      totalSeedYieldKg: 30000.0,
      grossIncomeInr: 2850000.0, // ₹28.50 Lakhs
      netProfitPerAcreInr: 940000.0,
      isTechFarmerVerified: true,
      customerCategory: "TECH_FARMER",
      soilType: "Medium Black Soil",
      irrigationSource: "Well with Micro-Sprinkler & Drip",
      registrationDate: new Date("2024-11-05"),
      notes: "Garwa onion nursery expert; achieved maximum germination vigour index.",
      annualHistory: [
        {
          harvestYear: 2024,
          seedVariety: "Fursungi Special Red",
          quantityPurchasedKg: 10.0,
          batchNumber: "AK-FUR-2024-01",
          totalYieldKg: 24000.0,
          grossIncomeInr: 2160000.0,
          netProfitPerAcreInr: 760000.0,
          season: "Rabi 2024",
        },
        {
          harvestYear: 2025,
          seedVariety: "Fursungi Special (Garwa Red Bulb)",
          quantityPurchasedKg: 12.5,
          batchNumber: "AK-FUR-2025-09",
          totalYieldKg: 30000.0,
          grossIncomeInr: 2850000.0,
          netProfitPerAcreInr: 940000.0,
          season: "Rabi 2025",
        },
      ],
    },
    {
      farmerId: "AFPC-TF-0110",
      fullName: "Devidas Ramchandra Gholap",
      phone: "+91 98220 99881",
      villageTown: "Kalwan",
      taluka: "Kalwan",
      district: "Nashik",
      totalLandOwnedAcres: 3.5,
      onionCultivationAreaAcres: 3.0,
      seedVarietyPurchased: "N-2-4-1 (Garwa Selection - High Storage)",
      quantityPurchasedKg: 15.0,
      purchaseDate: new Date("2025-09-15"),
      batchNumber: "AK-N241-2025-04",
      harvestYear: 2025,
      totalSeedYieldKg: 36000.0,
      grossIncomeInr: 3240000.0, // ₹32.40 Lakhs
      netProfitPerAcreInr: 910000.0,
      isTechFarmerVerified: true,
      customerCategory: "TECH_FARMER",
      soilType: "Sandy Loam to Medium Black",
      irrigationSource: "Girna Canal Lift & Drip",
      registrationDate: new Date("2025-01-08"),
      notes: "Kalwan tribal-belt progressive farmer. Adopted raised bed direct seeding technology.",
      annualHistory: [
        {
          harvestYear: 2024,
          seedVariety: "N-2-4-1 (Garwa Selection)",
          quantityPurchasedKg: 12.0,
          batchNumber: "AK-N241-2024-02",
          totalYieldKg: 28500.0,
          grossIncomeInr: 2422500.0,
          netProfitPerAcreInr: 720000.0,
          season: "Rabi 2024",
        },
        {
          harvestYear: 2025,
          seedVariety: "N-2-4-1 (Garwa Selection - High Storage)",
          quantityPurchasedKg: 15.0,
          batchNumber: "AK-N241-2025-04",
          totalYieldKg: 36000.0,
          grossIncomeInr: 3240000.0,
          netProfitPerAcreInr: 910000.0,
          season: "Rabi 2025",
        },
      ],
    },
  ];

  const createdFarmers = [];
  for (const farmerData of techFarmersData) {
    const { annualHistory, ...fData } = farmerData;
    const created = await prisma.farmer.create({
      data: fData,
    });

    if (annualHistory && annualHistory.length > 0) {
      for (const h of annualHistory) {
        await prisma.annualHarvestMahiti.create({
          data: {
            farmerId: created.id,
            harvestYear: h.harvestYear,
            seedVariety: h.seedVariety,
            quantityPurchasedKg: h.quantityPurchasedKg,
            batchNumber: h.batchNumber,
            totalYieldKg: h.totalYieldKg,
            grossIncomeInr: h.grossIncomeInr,
            netProfitPerAcreInr: h.netProfitPerAcreInr,
            season: h.season,
          },
        });
      }
    }

    createdFarmers.push(created);
  }
  console.log(`✅ Seeded ${createdFarmers.length} Verified Tech Farmers with Annual Financial Mahiti`);

  // 4. Create Linked Seed Distribution Records
  const distributionsData = [
    {
      distributionCode: "DIST-2026-001",
      farmerId: createdFarmers[0].id, // Suresh Patil (Niphad)
      batchId: createdBatches[0].id, // N-2-4-1
      quantityKg: 22.5,
      targetAcreage: 4.5,
      distributionDate: new Date("2025-08-15"),
      subsidyRatePct: 20.0,
      totalAmount: 39600.0,
      paymentStatus: "PAID",
      season: "Rabi 2025",
      notes: "Subsidized distribution under National Horticulture Mission FPC quota.",
    },
    {
      distributionCode: "DIST-2026-002",
      farmerId: createdFarmers[1].id, // Rameshwar Jadhav (Dindori)
      batchId: createdBatches[1].id, // Fursungi Special
      quantityKg: 17.5,
      targetAcreage: 3.5,
      distributionDate: new Date("2025-08-20"),
      subsidyRatePct: 15.0,
      totalAmount: 30493.75,
      paymentStatus: "PAID",
      season: "Rabi 2025",
      notes: "Direct allocation for seed multiplication agreement.",
    },
    {
      distributionCode: "DIST-2026-003",
      farmerId: createdFarmers[2].id, // Anand Shirole (Sinnar)
      batchId: createdBatches[0].id, // N-2-4-1
      quantityKg: 22.0,
      targetAcreage: 4.5,
      distributionDate: new Date("2025-09-01"),
      subsidyRatePct: 20.0,
      totalAmount: 38720.0,
      paymentStatus: "PAID",
      season: "Rabi 2025",
      notes: "Commercial seed production lot.",
    },
    {
      distributionCode: "DIST-2026-004",
      farmerId: createdFarmers[4].id, // Vilas Kale (Junnar)
      batchId: createdBatches[0].id, // N-2-4-1
      quantityKg: 20.0,
      targetAcreage: 4.0,
      distributionDate: new Date("2025-08-28"),
      subsidyRatePct: 20.0,
      totalAmount: 35200.0,
      paymentStatus: "PAID",
      season: "Rabi 2025",
      notes: "High altitude Junnar valley allocation.",
    },
    {
      distributionCode: "DIST-2026-005",
      farmerId: createdFarmers[6].id, // Shivaji Deshmukh (Baramati)
      batchId: createdBatches[0].id, // N-2-4-1
      quantityKg: 25.0,
      targetAcreage: 5.0,
      distributionDate: new Date("2025-08-18"),
      subsidyRatePct: 20.0,
      totalAmount: 44000.0,
      paymentStatus: "PAID",
      season: "Rabi 2025",
      notes: "Precision drip plot allocation.",
    },
  ];

  for (const d of distributionsData) {
    await prisma.seedDistribution.create({ data: d });
  }
  console.log(`✅ Seeded ${distributionsData.length} Seed Distributions`);
  console.log("🌾 Akshara Farmer Producer Company Tech Farmer database ready!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
