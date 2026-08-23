export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  bgGradient: string;
  accentColor: string;
  image: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  highlights: string[];
}

export interface Product {
  id: string;
  name: string;
  category: "seeds" | "fertilizers" | "equipment";
  categoryName: string;
  image: string;
  badge: string;
  shortDesc: string;
  fullDesc: string;
  specifications: { [key: string]: string };
  priceGuide?: string;
  subsidyAvailable?: boolean;
  season?: string;
  packSizes?: string[];
  certifications?: string[];
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  stats: string;
  badge: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  summary: string;
  content: string[];
  image: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  village: string;
  district: string;
  crop: string;
  quote: string;
  experience: string;
  memberSince: string;
  image: string;
  rating: number;
  increasePercent: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "farms" | "seeds" | "training" | "harvest";
  categoryLabel: string;
  image: string;
  caption: string;
  date: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "Empowering Farmers, Enriching Agriculture",
    subtitle: "DIRECT LAB-TO-LAND SUPPORT FOR 5,000+ FARMER MEMBERS",
    description:
      "Akshara Farmer Producer Company bridges the gap between scientific seed technology, genuine certified seeds, and direct FPC support for farming families across the region.",
    tag: "Certified FPC Excellence",
    bgGradient: "from-emerald-950 via-green-900 to-stone-900",
    accentColor: "#22c55e",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1920&q=80",
    primaryCta: { text: "👨‍🌾 Farmer Login", href: "/farmer-login" },
    secondaryCta: { text: "🏢 Admin Login", href: "/login" },
    highlights: ["100% Certified Germination", "Direct Seed Ordering", "Doorstep Farm Delivery"],
  },
  {
    id: 2,
    title: "High-Yield Certified Seeds & Bio-Inputs",
    subtitle: "SCIENTIFICALLY DEVELOPED & TESTED GERMPLASM",
    description:
      "Boost your per-acre yield with lab-certified onion, maize, paddy, and pulse seeds with guaranteed 98%+ germination, high disease resistance, and robust drought tolerance.",
    tag: "98.4% Germination Rate",
    bgGradient: "from-green-950 via-emerald-900 to-amber-950",
    accentColor: "#f59e0b",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=1920&q=80",
    primaryCta: { text: "👨‍🌾 Farmer Portal Login", href: "/farmer-login" },
    secondaryCta: { text: "🏢 Company Login", href: "/login" },
    highlights: ["Government Seed Certification", "Customized Seed Lots", "Free Soil Advisory"],
  },
  {
    id: 3,
    title: "Hands-on Agronomy & Modern Training",
    subtitle: "FROM SOIL TESTING TO CLIMATE-SMART HARVESTING",
    description:
      "Our team of certified agronomists conducts regular Krishi workshops, free soil health audits, drone spray demonstrations, and 24/7 telephonic pest advisory.",
    tag: "Free Krishi Advisory",
    bgGradient: "from-teal-950 via-green-950 to-stone-900",
    accentColor: "#10b981",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1920&q=80",
    primaryCta: { text: "👨‍🌾 Login to Order Seeds", href: "/farmer-login" },
    secondaryCta: { text: "Call Kisan Helpline", href: "tel:18008892345" },
    highlights: ["Weekly Field Demonstrations", "Free Soil Health Cards", "24/7 Pest SOS Helpline"],
  },
];

export const STATS_DATA = [
  {
    id: 1,
    value: "5,200+",
    label: "Active Farmer Members",
    subtext: "Smallholder & marginal farmers empowered",
    icon: "Users",
  },
  {
    id: 2,
    value: "120+",
    label: "Villages Covered",
    subtext: "Across 4 major agricultural clusters",
    icon: "MapPin",
  },
  {
    id: 3,
    value: "12,000+",
    label: "Seed Bags Distributed",
    subtext: "Certified high-germination seed lots",
    icon: "Truck",
  },
  {
    id: 4,
    value: "98.4%",
    label: "Certified Seed Germination",
    subtext: "Rigorous laboratory & field trial tested",
    icon: "ShieldCheck",
  },
  {
    id: 5,
    value: "₹4.8 Cr+",
    label: "Farmer Income Added",
    subtext: "Through collective bargaining & input savings",
    icon: "TrendingUp",
  },
];

export const PRODUCT_CATEGORIES = [
  { id: "all", name: "All Certified Seeds & Inputs", icon: "Grid" },
  { id: "seeds", name: "Certified Crop Seeds", icon: "Sprout" },
  { id: "fertilizers", name: "Bio-Inputs & Fertilizers", icon: "FlaskConical" },
  { id: "equipment", name: "Agri Implements & Kits", icon: "Tractor" },
];

export const PRODUCTS: Product[] = [
  {
    id: "seed-onion-akshara-red",
    name: "Akshara Super Red Certified Onion Seeds",
    category: "seeds",
    categoryName: "Certified Crop Seeds",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80",
    badge: "FPC Flagship Variety",
    shortDesc: "High-pungency, uniform dark-red globes with 120-day maturity and exceptional 5-month storage shelf life.",
    fullDesc:
      "Akshara Super Red is our flagship certified onion seed, bred specifically for semi-arid and tropical climates. It offers uniform round bulb shape, rich dark red skin layers, high pungency, and superior tolerance to Purple Blotch and Stemphylium blight. Tested across 80+ trial plots with consistent 18-22 MT/acre yield.",
    specifications: {
      "Germination Rate": "Min. 85% (Avg. 92%)",
      "Genetic Purity": "99.0% Certified",
      "Maturity Period": "115 - 125 Days",
      "Bulb Shape & Color": "Globe, Deep Crimson Red",
      "Average Bulb Weight": "90 - 120 Grams",
      "Storage Quality": "Superior (4-5 Months)",
    },
    priceGuide: "₹2,200 per kg (Farmer FPC Price)",
    subsidyAvailable: true,
    season: "Late Kharif & Rabi Season",
    packSizes: ["500g Tin", "1kg Vacuum Foil", "5kg Farm Sack"],
    certifications: ["State Seed Certification", "ISTI Tested", "FPC Quality Mark"],
  },
  {
    id: "seed-fursungi-onion",
    name: "Fursungi Special Red Onion Seeds",
    category: "seeds",
    categoryName: "Certified Crop Seeds",
    image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&w=800&q=80",
    badge: "Premium Selection",
    shortDesc: "Deep crimson red globe onion seed with excellent storage stability and high marketable yield.",
    fullDesc:
      "Fursungi Special is a trusted certified seed line for Rabi sowing. High tolerance to thrips and leaf blight, yielding uniform 80-110g globes.",
    specifications: {
      "Germination Rate": "90.5%",
      "Genetic Purity": "98.8%",
      "Maturity Period": "120 - 130 Days",
      "Storage Quality": "Up to 5 Months",
    },
    priceGuide: "₹2,400 per kg",
    subsidyAvailable: true,
    season: "Rabi Season",
    packSizes: ["1kg Foil", "5kg Pack"],
    certifications: ["MSCA Certified", "Lab Tested"],
  },
  {
    id: "seed-hybrid-maize",
    name: "Akshara Golden Gold Hybrid Maize (AKM-88)",
    category: "seeds",
    categoryName: "Certified Crop Seeds",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80",
    badge: "High Yield Hybrid",
    shortDesc: "Double-cross hybrid maize with thick orange-yellow kernels, strong lodging resistance, and high fodder value.",
    fullDesc:
      "AKM-88 is an elite hybrid maize variety developed for both Kharif and Spring sowing. Featuring strong stay-green characteristics, tight husk cover preventing cob rot, and heavy 16-18 kernel rows per cob.",
    specifications: {
      "Germination Rate": "90% Certified",
      "Genetic Purity": "98.5%",
      "Maturity Period": "95 - 105 Days",
      "Cob Length": "20 - 22 cm",
      "Expected Yield": "32 - 38 Quintals / Acre",
      "Plant Height": "200 - 220 cm (Erect)",
    },
    priceGuide: "₹380 per kg",
    subsidyAvailable: true,
    season: "Kharif & Spring",
    packSizes: ["4kg Pack", "10kg Bag", "25kg Bag"],
    certifications: ["Govt Certified Hybrid", "Seed Health Certified"],
  },
  {
    id: "seed-basmati-paddy",
    name: "Akshara Sugandh Certified Paddy Seed (Pusa-1121)",
    category: "seeds",
    categoryName: "Certified Crop Seeds",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    badge: "Export Grade",
    shortDesc: "Extra-long slender grain basmati with exquisite natural aroma, non-lodging erect stalks, and high milling recovery.",
    fullDesc:
      "Treated with bio-fungicides for bakanae disease prevention. Yields up to 24 quintals per acre under recommended SRI and DSR agronomic practices.",
    specifications: {
      "Germination Rate": "88%",
      "Maturity": "140 - 145 Days",
      "Grain Type": "Extra Long Slender (8.4mm)",
      "Aroma Score": "High Natural Basmati Aroma",
      "Milling Recovery": "68% Head Rice",
    },
    priceGuide: "₹120 per kg",
    subsidyAvailable: true,
    season: "Kharif Season",
    packSizes: ["10kg Bag", "25kg Bag"],
    certifications: ["National Seeds Protocol", "FPC Certified"],
  },
  {
    id: "fert-organic-compost",
    name: "Akshara Krishi Ratna Vermicompost (Enriched)",
    category: "fertilizers",
    categoryName: "Bio-Inputs & Fertilizers",
    image: "https://images.unsplash.com/photo-1585336261026-879893976c6c?auto=format&fit=crop&w=800&q=80",
    badge: "100% Organic Certified",
    shortDesc: "Microbial-rich earthworm castings fortified with Trichoderma, Pseudomonas, and mycorrhiza for soil rejuvenation.",
    fullDesc:
      "Manufactured in our FPC cluster vermicompost units from farm organic residue and cow dung. Restores degraded soil organic carbon (SOC), boosts water holding capacity by 40%, and stimulates vigorous root proliferation.",
    specifications: {
      "Organic Carbon": "Min. 16.5%",
      "Total N-P-K": "N: 1.8%, P: 1.2%, K: 1.5%",
      "C:N Ratio": "15:1 (Optimum)",
      "Moisture Content": "18 - 22%",
      "Bio-Fortification": "Trichoderma viride + PSB",
    },
    priceGuide: "₹12 per kg",
    subsidyAvailable: true,
    season: "All Year Round Soil Prep",
    packSizes: ["25kg Bag", "50kg HDPE Bag", "1 Ton Jumbo Bulk"],
    certifications: ["NPOP Organic Certified", "FCO Compliant"],
  },
  {
    id: "fert-bio-npk-consortium",
    name: "Akshara Bio-NPK Liquid Consortium (1 Litre)",
    category: "fertilizers",
    categoryName: "Bio-Inputs & Fertilizers",
    image: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=800&q=80",
    badge: "Saves 25% Chemical NPK",
    shortDesc: "High CFU multi-strain bacterial consortium fixing atmospheric nitrogen, solubilizing phosphorus, and mobilizing potash.",
    fullDesc:
      "Contains Azotobacter chroococcum, Bacillus megaterium, and Frateuria aurantia with >1x10^8 CFU/ml. Apply via seed treatment, root dipping, or drip fertigation.",
    specifications: {
      "Viable Cell Count": "> 1 x 10^8 CFU/ml",
      "pH Range": "6.5 - 7.5",
      "Application Dose": "1 Litre per Acre via Drip/Soil",
      "Shelf Life": "12 Months from Manufacturing",
    },
    priceGuide: "₹450 per Litre",
    subsidyAvailable: false,
    season: "Vegetative & Flowering Stage",
    packSizes: ["500ml Bottle", "1 Litre Bottle", "5 Litre Can"],
    certifications: ["FCO Standard Bio-Fertilizer"],
  },
  {
    id: "equip-drip-irrigation-kit",
    name: "Akshara Precision Drip Kit (1 Acre Complete)",
    category: "equipment",
    categoryName: "Agri Implements & Kits",
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80",
    badge: "Saves 60% Water",
    shortDesc: "Complete ISI certified inline drip kit with venturi injector, screen filter, lateral pipes, and pressure gauge.",
    fullDesc:
      "Engineered specifically for vegetable and fruit crops (onion, tomato, chilli, pomegranate). Delivers uniform water and water-soluble fertilizer directly to root zones, reducing weed growth and labor by 70%.",
    specifications: {
      "Coverage": "1.0 Acre (Standard Row Spacing)",
      "Emitter Spacing": "30cm / 40cm / 50cm Inline",
      "Discharge Rate": "2.0 & 4.0 LPH Pressure Compensated",
      "Filter Unit": "2-inch Disc/Screen Filter included",
      "Venturi Injector": "3/4-inch Fertigation Assembly",
    },
    priceGuide: "Eligible for up to 55%-80% Govt Subsidy",
    subsidyAvailable: true,
    season: "All Season Installation",
    packSizes: ["1 Acre Complete Master Box"],
    certifications: ["BIS / ISI Marked", "PMKSY Subsidy Approved"],
  },
];

export const SERVICES: Service[] = [
  {
    id: "seed-distribution",
    title: "Certified Seed Distribution & Seed Lots",
    icon: "Sprout",
    shortDesc: "Supplying certified, foundation-grade seeds directly to village hubs with guaranteed germination rates and member pricing.",
    longDesc:
      "Akshara FPC operates village seed distribution centers where registered members receive high-quality certified seeds at member rates. Every lot undergoes germination testing in accredited seed labs before delivery.",
    features: [
      "100% Certified germination (>85% guarantee)",
      "Subsidized rates through collective FPC procurement",
      "Direct village door-step delivery before sowing season",
      "Variety selection suited to local soil and rainfall patterns",
    ],
    stats: "12,000+ Bags Distributed Annually",
    badge: "Govt Certified Seeds",
  },
  {
    id: "farmer-training",
    title: "Farmer Training & Seed Production Workshops",
    icon: "GraduationCap",
    shortDesc: "Regular field demonstrations, seed plot techniques, pest management, and drone spraying workshops.",
    longDesc:
      "In collaboration with state agricultural universities and KVKs, Akshara FPC hosts monthly practical training camps. We educate farmers on high-density planting, seed multiplication, and water conservation methods.",
    features: [
      "Monthly hands-on field days led by senior agronomists",
      "Free Soil Health Card generation & nutrient mapping",
      "Integrated Pest & Disease Management (IPM) guidance",
      "Drone technology demonstrations for precision spraying",
    ],
    stats: "8,500+ Farmers Trained",
    badge: "Practical Knowledge Transfer",
  },
  {
    id: "crop-advisory",
    title: "24/7 Agronomy & On-Field Seed Advisory",
    icon: "PhoneCall",
    shortDesc: "Dedicated Krishi helpline, WhatsApp crop diagnosis, and on-farm visits by qualified agronomists.",
    longDesc:
      "When a pest infestation or leaf discoloration occurs, farmers can click a photo and send it via WhatsApp to our agronomy cell. Our crop experts provide instant diagnosis and recommend cost-effective bio-control remedies.",
    features: [
      "Toll-free Kisan helpline for instant telephonic support",
      "Photo-based WhatsApp pest and disease identification",
      "Scheduled field visits by agricultural officers for critical issues",
      "Hyper-local weather forecasts & spray timing SMS alerts",
    ],
    stats: "24/7 Telephonic Support",
    badge: "Instant Expert Diagnosis",
  },
  {
    id: "credit-facilitation",
    title: "Credit, Insurance & Seed Subsidy Facilitation",
    icon: "Landmark",
    shortDesc: "Assisting member farmers in accessing Kisan Credit Cards (KCC), seed subsidies, and crop insurance.",
    longDesc:
      "Navigating government agricultural schemes can be complex. Akshara FPC’s dedicated documentation desk assists member farmers with paperwork for interest subvention loans, crop insurance claims, and NABARD/SFAC scheme benefits.",
    features: [
      "End-to-end KCC loan application and renewal support",
      "Rapid crop damage assessment and insurance claim filing",
      "Assistance for micro-irrigation and seed subsidies (55-80%)",
      "Zero-interest short-term input credit via FPC revolving fund",
    ],
    stats: "₹3.2 Cr Subsidies Disbursed",
    badge: "NABARD & SFAC Supported",
  },
  {
    id: "custom-hiring",
    title: "Custom Hiring Center & Farm Machinery",
    icon: "Tractor",
    shortDesc: "Affordable hourly rental of modern tractors, rotary tillers, seed drills, and boom sprayers.",
    longDesc:
      "Small and marginal farmers often cannot afford expensive heavy machinery. Our village-level Custom Hiring Centers make mechanized farming accessible at nominal hourly rates.",
    features: [
      "Modern 4WD tractors with rotary tillers and disc harrows",
      "Automatic precision seed-cum-fertilizer drills",
      "High-pressure tractor-mounted boom sprayers",
      "Mobile solar grain & spice dryers for post-harvest value addition",
    ],
    stats: "45+ Farm Implements in Fleet",
    badge: "Cost-Saving Mechanization",
  },
];

export const NEWS_UPDATES: NewsItem[] = [
  {
    id: "kisan-sammelan-2026",
    title: "Annual Kisan Sammelan & Certified Seed Distribution Camp 2026 Concludes with 1,200+ Farmers",
    category: "Events & Melas",
    date: "Aug 18, 2026",
    readTime: "3 min read",
    author: "Agronomy Editorial",
    authorRole: "Akshara FPC Outreach Cell",
    summary:
      "Over 1,200 smallholder farmers gathered at our central aggregation hub for the distribution of certified onion and maize seed kits ahead of the upcoming sowing window.",
    content: [
      "The annual Kisan Sammelan brought together progressive farmers, senior agricultural scientists, and district agriculture officers to deliberate on climate-resilient farming techniques.",
      "During the event, Akshara FPC distributed over 2,500 subsidized certified seed packets and felicitated 15 progressive women farmers who achieved record onion yields using drip fertigation.",
      "Special technical sessions were held on soil carbon revival, seed storage, and direct member price guarantees for the upcoming harvest season.",
    ],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    tags: ["Kisan Sammelan", "Seed Distribution", "Event", "Farmer Awards"],
  },
  {
    id: "onion-seed-variety-release",
    title: "Akshara FPC Unveils New High-Yield Climate-Tolerant Onion Seed 'Akshara Super Red'",
    category: "Product Launch",
    date: "Jul 29, 2026",
    readTime: "4 min read",
    author: "Dr. Arvind Joshi",
    authorRole: "Chief Agronomist & Seed Breeder",
    summary:
      "Following 3 years of multi-location trials across 80 village plots, our seed division has officially commercialized 'Akshara Super Red' with proven 22 MT/acre yield.",
    content: [
      "Akshara Super Red has been engineered specifically to withstand sudden temperature spikes and humid fungal pressure. Its distinctive deep crimson skin and compact spherical structure ensure minimal storage rot during the monsoon months.",
      "In comparative field trials conducted alongside standard commercial hybrids, Akshara Super Red delivered a 28% increase in marketable grade-A bulb recovery with exceptional keeping quality of over 5 months.",
      "Member farmers can pre-book certified seed tins through village collection centers or via our farmer portal with special cooperative member subsidies.",
    ],
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=800&q=80",
    tags: ["Seed Release", "Onion Cultivation", "Agronomy", "High Yield"],
  },
  {
    id: "success-story-ramesh-patil",
    title: "Success Story: How Ramesh Patil Doubled His Farm Income Through Certified Onion Seeds",
    category: "Farmer Spotlight",
    date: "Jun 14, 2026",
    readTime: "5 min read",
    author: "Pooja Deshmukh",
    authorRole: "FPC Field Coordinator",
    summary:
      "Ramesh Patil, a 4-acre farmer from Shirur, shares how certified seeds and direct FPC technical support boosted his net income from ₹1.4 Lakh to ₹3.1 Lakh in a single season.",
    content: [
      "'Before joining Akshara FPC, I bought uncertified local seed lots with poor germination and high viral infection,' says Ramesh Patil.",
      "By adopting Akshara FPC's certified seed variety and availing drip fertigation guidance, his per-acre yield increased from 11 MT to 17 MT.",
      "'Ordering seeds directly through the Akshara Farmer Portal saved me time and guaranteed seed purity. I got pure, high-germination seed right at my doorstep.'",
    ],
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    tags: ["Farmer Story", "Income Doubling", "Certified Seeds", "Case Study"],
  },
  {
    id: "micro-irrigation-subsidy-alert",
    title: "Government Subsidy Alert: Apply for 80% Drip & Sprinkler Grants Before September 15",
    category: "Govt Scheme Alert",
    date: "May 22, 2026",
    readTime: "3 min read",
    author: "Sanjay Verma",
    authorRole: "FPC Scheme Officer",
    summary:
      "The State Horticulture Department has opened online subsidy applications under PMKSY. Akshara FPC helpdesks are assisting farmers with 100% free document processing.",
    content: [
      "Under the Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) 'Per Drop More Crop' initiative, small and marginal farmers are eligible for up to 80% capital subsidy on precision drip irrigation kits.",
      "Akshara FPC has established dedicated documentation counters at all 14 village centers. Our field executives help farmers prepare 7/12 land records, Aadhaar-linked bank verification, and water source test reports.",
      "Interested farmers are advised to visit the nearest Akshara center before the quota deadline.",
    ],
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80",
    tags: ["PMKSY Subsidy", "Drip Irrigation", "Govt Grants", "Farmer Helpdesk"],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Rameshwar Shinde",
    village: "Niphad",
    district: "Nashik, Maharashtra",
    crop: "Onion & Pomegranate",
    quote:
      "Joining Akshara FPC completely transformed our farming economics. Their certified onion seeds gave us 35% higher yield, and ordering directly through the farmer portal is fast and transparent.",
    experience: "Member for 4 Years • 6 Acres",
    memberSince: "2022",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    increasePercent: "+38% Net Income",
  },
  {
    id: "t-2",
    name: "Sunita Devi Gaikwad",
    village: "Karmala",
    district: "Solapur, Maharashtra",
    crop: "Tomato & Soybean",
    quote:
      "When my crop suffered leaf curl, the Akshara agronomy team visited my field within 24 hours. The bio-consortium spray they recommended saved my harvest. Their seed quality is 100% reliable.",
    experience: "Member for 3 Years • 4 Acres",
    memberSince: "2023",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    increasePercent: "+42% Yield Boost",
  },
  {
    id: "t-3",
    name: "Balram Patel",
    village: "Sonkatch",
    district: "Dewas, Madhya Pradesh",
    crop: "Certified Maize & Wheat",
    quote:
      "Direct seed delivery with guaranteed germination rates is what makes Akshara FPC trustworthy. No fake seeds, no middleman markups. We are proud shareholders in our own company.",
    experience: "Member for 5 Years • 8 Acres",
    memberSince: "2021",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    increasePercent: "100% Seed Purity",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-1",
    title: "Certified Onion Seed Breeder Trial Plot",
    category: "seeds",
    categoryLabel: "Seed Production",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80",
    caption: "Inspection of certified foundation onion seed plots during flowering stage with agricultural scientists.",
    date: "March 2026",
  },
  {
    id: "g-2",
    title: "Village Seed Distribution & Processing Center",
    category: "harvest",
    categoryLabel: "Seed Logistics",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80",
    caption: "Certified seed packaging and grading at our Shirur cluster center.",
    date: "April 2026",
  },
  {
    id: "g-3",
    title: "Drone Spraying & Precision Agronomy Workshop",
    category: "training",
    categoryLabel: "Farmer Training",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80",
    caption: "Live demonstration of agri-drone ultra-low-volume bio-nutrient spray for 150+ member farmers.",
    date: "May 2026",
  },
  {
    id: "g-4",
    title: "Organic Vermicompost Production Units",
    category: "farms",
    categoryLabel: "FPC Infrastructure",
    image: "https://images.unsplash.com/photo-1585336261026-879893976c6c?auto=format&fit=crop&w=1000&q=80",
    caption: "Member-managed vermicompost sheds producing 50 MT certified organic fertilizer monthly.",
    date: "June 2026",
  },
  {
    id: "g-5",
    title: "Kisan Sammelan & Best Farmer Felicitations",
    category: "training",
    categoryLabel: "Community Events",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
    caption: "Felicitation ceremony of progressive women farmers achieving record yields at our annual meet.",
    date: "July 2026",
  },
  {
    id: "g-6",
    title: "Seed Germination & Purity Quality Testing Lab",
    category: "seeds",
    categoryLabel: "Quality Assurance",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80",
    caption: "Routine incubator germination and physical purity trials ensuring >85% seed viability standards.",
    date: "August 2026",
  },
];

export const CROP_CALCULATOR_DATA = [
  {
    crop: "Onion (Rabi / Late Kharif)",
    id: "onion",
    seedPerAcreKg: 3.5,
    seedPerAcreGrams: "3.5 - 4.0 kg",
    nurseryArea: "4 - 5 Guntha (400 sq. m)",
    idealSowingTime: "October - November (Rabi) / August (Late Kharif)",
    transplantingAge: "40 - 45 Days old healthy seedlings",
    expectedYield: "18 - 22 MT / Acre",
    spacing: "15 cm x 10 cm",
    waterRequirement: "12 - 15 Light irrigations (Drip Recommended)",
    fertilizerRecommendation: "Organic Vermicompost: 2 MT + NPK (100:50:50) + Sulphur (30 kg/acre)",
  },
  {
    crop: "Hybrid Maize (Corn)",
    id: "maize",
    seedPerAcreKg: 8.0,
    seedPerAcreGrams: "7.5 - 8.0 kg",
    nurseryArea: "Direct Sowing in Furrows",
    idealSowingTime: "June - July (Kharif) / Feb - March (Spring)",
    transplantingAge: "Direct Field Sowing",
    expectedYield: "32 - 38 Quintals / Acre",
    spacing: "60 cm x 20 cm",
    waterRequirement: "4 - 6 Critical irrigations at tasseling & silking",
    fertilizerRecommendation: "NPK (120:60:40) + Zinc Sulphate (10 kg/acre) + Bio-NPK Consortium",
  },
  {
    crop: "Basmati Paddy (SRI Method)",
    id: "paddy",
    seedPerAcreKg: 5.0,
    seedPerAcreGrams: "5.0 - 6.0 kg (SRI) / 15 kg (Traditional)",
    nurseryArea: "100 sq. m Raised Bed Nursery",
    idealSowingTime: "June 15 - July 10",
    transplantingAge: "12 - 15 Days (Single seedling per hill)",
    expectedYield: "22 - 26 Quintals / Acre",
    spacing: "25 cm x 25 cm (Square Planting)",
    waterRequirement: "Alternate Wetting and Drying (AWD method)",
    fertilizerRecommendation: "Compost 3 MT + Azospirillum + PSB + NPK (80:40:40 kg/acre)",
  },
  {
    crop: "Soybean (Certified High Germination)",
    id: "soybean",
    seedPerAcreKg: 25.0,
    seedPerAcreGrams: "24 - 28 kg",
    nurseryArea: "Direct Broad-Bed Furrow (BBF) Sowing",
    idealSowingTime: "June 20 - July 15 (After 75-100mm monsoon rain)",
    transplantingAge: "Direct Seed Drill Sowing",
    expectedYield: "10 - 14 Quintals / Acre",
    spacing: "45 cm x 5-7 cm",
    waterRequirement: "Rainfed (Provide 1-2 life-saving irrigations during pod filling)",
    fertilizerRecommendation: "Rhizobium + PSB seed coating + Single Super Phosphate (SSP) 150 kg/acre",
  },
];

export const FAQ_ITEMS = [
  {
    question: "What is Akshara Farmer Producer Company (FPC)?",
    answer:
      "Akshara Farmer Producer Company is a farmer-owned cooperative enterprise incorporated under the Companies Act, supported by NABARD and SFAC. Our primary mission is to empower smallholder farmers by aggregating seed requirements, providing certified seeds and bio-inputs at member prices, offering free agronomy guidance, and ensuring high crop germination.",
  },
  {
    question: "How do I log in to order certified seeds?",
    answer:
      "Farmers can click the 'Farmer Login' button at the top of the website, enter their registered mobile number and password, browse available seed varieties in real-time stock, and place orders directly.",
  },
  {
    question: "What guarantees are provided on Akshara Certified Seeds?",
    answer:
      "Every batch of Akshara Certified Seeds comes with a minimum 85% to 98% germination guarantee, physical purity certification, and moisture compliance tested in government-accredited seed laboratories.",
  },
  {
    question: "What happens if a seed variety is out of stock?",
    answer:
      "When farmers order seeds, the available quantity is automatically deducted from stock in real-time. If stock reaches 0, the portal displays 'OUT OF STOCK' and disables further orders until new batches are added by company staff.",
  },
  {
    question: "How can I access the free Krishi Helpline & Soil Testing?",
    answer:
      "Our toll-free Kisan helpline is available 6 days a week from 8:00 AM to 7:00 PM at 1800-889-2345. You can also send photos of crop pests to our dedicated WhatsApp helpline (+91 98765 43210) for instant advice from certified agronomists.",
  },
];
