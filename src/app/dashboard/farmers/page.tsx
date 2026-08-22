"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Search,
  Plus,
  Filter,
  Download,
  Edit2,
  Trash2,
  Eye,
  Phone,
  MapPin,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  X,
  Loader2,
  AlertCircle,
  Calendar,
  Layers,
  Sparkles,
  ArrowUpDown,
  TrendingUp,
  DollarSign,
  Scale,
  Award,
  BarChart3,
  BadgeCheck,
} from "lucide-react";
import { formatDate, formatCurrency, formatNumber } from "@/lib/utils";

interface AnnualMahiti {
  id: string;
  harvestYear: number;
  seedVariety: string;
  quantityPurchasedKg: number;
  batchNumber: string;
  totalYieldKg: number;
  grossIncomeInr: number;
  netProfitPerAcreInr: number;
  season: string;
}

interface Farmer {
  id: string;
  farmerId: string;
  fullName: string;
  phone: string;
  villageTown: string;
  taluka?: string;
  district: string;
  totalLandOwnedAcres: number;
  onionCultivationAreaAcres: number;
  seedVarietyPurchased: string;
  quantityPurchasedKg: number;
  purchaseDate: string;
  batchNumber: string;
  harvestYear: number;
  totalSeedYieldKg: number;
  grossIncomeInr: number;
  netProfitPerAcreInr: number;
  landYieldRatio?: number;
  isTechFarmerVerified: boolean;
  customerCategory: string;
  soilType?: string;
  irrigationSource?: string;
  registrationDate: string;
  status: string;
  notes?: string;
  annualMahiti?: AnnualMahiti[];
  distributionsCount: number;
  totalDistributedKg: number;
}

const DISTRICTS = ["ALL", "Nashik", "Pune", "Ahmednagar", "Solapur"];
const VARIETIES = ["ALL", "N-2-4-1", "Fursungi Special", "Bhima Super", "AgriFound Dark Red"];
const INCOME_BRACKETS = [
  { label: "All Incomes", value: "ALL" },
  { label: "High Income (> ₹30 Lakhs)", value: "ABOVE_30L" },
  { label: "Top Earners (> ₹40 Lakhs)", value: "ABOVE_40L" },
  { label: "Elite Tier (> ₹45 Lakhs)", value: "ABOVE_45L" },
];

export default function FarmersPage() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [districtFilter, setDistrictFilter] = useState("ALL");
  const [varietyFilter, setVarietyFilter] = useState("ALL");
  const [incomeFilter, setIncomeFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("income_desc");

  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFarmer, setEditingFarmer] = useState<Farmer | null>(null);
  const [detailFarmer, setDetailFarmer] = useState<Farmer | null>(null);
  const [deleteFarmer, setDeleteFarmer] = useState<Farmer | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    villageTown: "",
    taluka: "",
    district: "Nashik",
    totalLandOwnedAcres: "4.5",
    onionCultivationAreaAcres: "3.5",
    seedVarietyPurchased: "N-2-4-1 (Garwa Selection - High Storage)",
    quantityPurchasedKg: "17.5",
    purchaseDate: new Date().toISOString().slice(0, 10),
    batchNumber: "AK-N241-2025-04",
    harvestYear: "2025",
    totalSeedYieldKg: "42000",
    grossIncomeInr: "3800000",
    netProfitPerAcreInr: "900000",
    soilType: "Medium Black Soil",
    irrigationSource: "Drip Irrigation",
    notes: "",
  });

  const fetchFarmers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (districtFilter !== "ALL") params.append("district", districtFilter);
      if (varietyFilter !== "ALL") params.append("variety", varietyFilter);
      if (incomeFilter !== "ALL") params.append("incomeBracket", incomeFilter);
      if (sortBy) params.append("sortBy", sortBy);

      const res = await fetch(`/api/farmers?${params.toString()}`);
      const json = await res.json();
      setFarmers(json.farmers || []);
    } catch (err) {
      console.error("Failed to fetch farmers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFarmers();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, districtFilter, varietyFilter, incomeFilter, sortBy]);

  const openCreateModal = () => {
    setEditingFarmer(null);
    setFormData({
      fullName: "",
      phone: "+91 ",
      villageTown: "",
      taluka: "",
      district: "Nashik",
      totalLandOwnedAcres: "4.5",
      onionCultivationAreaAcres: "3.5",
      seedVarietyPurchased: "N-2-4-1 (Garwa Selection - High Storage)",
      quantityPurchasedKg: "17.5",
      purchaseDate: new Date().toISOString().slice(0, 10),
      batchNumber: "AK-N241-2025-04",
      harvestYear: "2025",
      totalSeedYieldKg: "42000",
      grossIncomeInr: "3800000",
      netProfitPerAcreInr: "900000",
      soilType: "Medium Black Soil",
      irrigationSource: "Drip Irrigation",
      notes: "Verified direct customer of Akshara FPC certified onion seeds.",
    });
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (f: Farmer) => {
    setEditingFarmer(f);
    setFormData({
      fullName: f.fullName,
      phone: f.phone,
      villageTown: f.villageTown,
      taluka: f.taluka || "",
      district: f.district,
      totalLandOwnedAcres: String(f.totalLandOwnedAcres),
      onionCultivationAreaAcres: String(f.onionCultivationAreaAcres),
      seedVarietyPurchased: f.seedVarietyPurchased,
      quantityPurchasedKg: String(f.quantityPurchasedKg),
      purchaseDate: f.purchaseDate.slice(0, 10),
      batchNumber: f.batchNumber,
      harvestYear: String(f.harvestYear),
      totalSeedYieldKg: String(f.totalSeedYieldKg),
      grossIncomeInr: String(f.grossIncomeInr),
      netProfitPerAcreInr: String(f.netProfitPerAcreInr),
      soilType: f.soilType || "Medium Black Soil",
      irrigationSource: f.irrigationSource || "Drip Irrigation",
      notes: f.notes || "",
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError("");

    try {
      const url = editingFarmer ? `/api/farmers/${editingFarmer.id}` : "/api/farmers";
      const method = editingFarmer ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to save tech farmer record");
      }

      setModalOpen(false);
      fetchFarmers();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteFarmer) return;
    try {
      const res = await fetch(`/api/farmers/${deleteFarmer.id}`, { method: "DELETE" });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to delete farmer");
      }
      setDeleteFarmer(null);
      fetchFarmers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const exportCSV = () => {
    if (farmers.length === 0) return;
    const headers = [
      "Farmer ID",
      "Tech Farmer Name",
      "Contact Phone",
      "Village / Town",
      "Taluka",
      "District",
      "Total Land Owned (Acres)",
      "Onion Cultivation Area (Acres)",
      "Seed Variety Purchased",
      "Batch Number",
      "Quantity Purchased (kg)",
      "Purchase Date",
      "Harvest Year",
      "Total Harvest Yield (kg)",
      "Gross Annual Income (INR)",
      "Net Profit Per Acre (INR)",
      "Buyer Verification Status",
    ];

    const rows = farmers.map((f) => [
      f.farmerId,
      `"${f.fullName}"`,
      `"${f.phone}"`,
      `"${f.villageTown}"`,
      `"${f.taluka || ""}"`,
      `"${f.district}"`,
      f.totalLandOwnedAcres,
      f.onionCultivationAreaAcres,
      `"${f.seedVarietyPurchased}"`,
      `"${f.batchNumber}"`,
      f.quantityPurchasedKg,
      formatDate(f.purchaseDate),
      f.harvestYear,
      f.totalSeedYieldKg,
      f.grossIncomeInr,
      f.netProfitPerAcreInr,
      "Verified Tech Farmer (Direct FPC Seed Buyer)",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Akshara_Tech_Farmers_Annual_Mahiti_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Aggregate stats across current list
  const totalLandSum = farmers.reduce((sum, f) => sum + (f.totalLandOwnedAcres || 0), 0);
  const totalOnionSum = farmers.reduce((sum, f) => sum + (f.onionCultivationAreaAcres || 0), 0);
  const totalYieldSum = farmers.reduce((sum, f) => sum + (f.totalSeedYieldKg || 0), 0);
  const totalGrossIncomeSum = farmers.reduce((sum, f) => sum + (f.grossIncomeInr || 0), 0);
  const avgNetProfitPerAcre =
    totalOnionSum > 0
      ? Math.round(
          farmers.reduce(
            (sum, f) => sum + f.netProfitPerAcreInr * f.onionCultivationAreaAcres,
            0
          ) / totalOnionSum
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* Header & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              Verified Tech Farmer Management
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-300">
              <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Seed Buyers</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tracking commercial progressive growers who purchased <strong>N-2-4-1</strong> & <strong>Fursungi Special</strong> onion seeds directly from Akshara FPC.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Mahiti (CSV)</span>
          </button>

          <button
            onClick={openCreateModal}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Register Tech Farmer</span>
          </button>
        </div>
      </div>

      {/* Top Financial & Agronomic Analytics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm text-xs">
        <div className="p-2 border-r border-slate-100 last:border-0">
          <span className="text-slate-400 font-medium block">Verified Tech Farmers</span>
          <span className="text-lg font-bold text-slate-900 font-display mt-0.5 block">
            {farmers.length} Growers
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" /> 100% Direct Buyers
          </span>
        </div>

        <div className="p-2 border-r border-slate-100 last:border-0">
          <span className="text-slate-400 font-medium block">Onion Cultivation Area</span>
          <span className="text-lg font-bold text-slate-900 font-display mt-0.5 block">
            {formatNumber(totalOnionSum, 1)} Acres
          </span>
          <span className="text-[11px] text-slate-500">
            Total Land: {formatNumber(totalLandSum, 1)} Ac
          </span>
        </div>

        <div className="p-2 border-r border-slate-100 last:border-0">
          <span className="text-slate-400 font-medium block">Total Harvest Produced</span>
          <span className="text-lg font-bold text-slate-900 font-display mt-0.5 block">
            {formatNumber(totalYieldSum / 1000, 1)} Metric Tons
          </span>
          <span className="text-[11px] text-emerald-700 font-medium">
            {formatNumber(totalYieldSum, 0)} kg Bulb/Seed
          </span>
        </div>

        <div className="p-2 border-r border-slate-100 last:border-0">
          <span className="text-slate-400 font-medium block">Total Gross Revenue</span>
          <span className="text-lg font-extrabold text-emerald-700 font-display mt-0.5 block">
            {formatCurrency(totalGrossIncomeSum)}
          </span>
          <span className="text-[11px] text-slate-500">
            Generated from our seeds
          </span>
        </div>

        <div className="p-2 col-span-2 lg:col-span-1">
          <span className="text-slate-400 font-medium block">Avg Net Profit / Acre</span>
          <span className="text-lg font-extrabold text-teal-700 font-display mt-0.5 block">
            {formatCurrency(avgNetProfitPerAcre)} / Ac
          </span>
          <span className="text-[11px] text-teal-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> High Profitability
          </span>
        </div>
      </div>

      {/* Smart Filters & Sorting Row */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, ID, village, variety, batch..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters and Sorting */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* District Filter */}
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d === "ALL" ? "All Districts" : d}
                </option>
              ))}
            </select>

            {/* Variety Filter */}
            <select
              value={varietyFilter}
              onChange={(e) => setVarietyFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {VARIETIES.map((v) => (
                <option key={v} value={v}>
                  {v === "ALL" ? "All Seed Varieties" : v}
                </option>
              ))}
            </select>

            {/* Income Bracket Filter */}
            <select
              value={incomeFilter}
              onChange={(e) => setIncomeFilter(e.target.value)}
              className="px-3 py-2 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {INCOME_BRACKETS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>

            {/* Sorting */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="income_desc">💰 Gross Income (High to Low)</option>
                <option value="profit_desc">📈 Net Profit / Acre (High to Low)</option>
                <option value="yield_desc">⚖️ Harvest Yield (High to Low)</option>
                <option value="onion_area_desc">🧅 Onion Acreage (High to Low)</option>
                <option value="land_desc">🚜 Total Land (High to Low)</option>
                <option value="recent">🕒 Recent Purchase Date</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Filter Badges */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto text-[11px]">
          <span className="text-slate-400 font-medium shrink-0">Quick Filters:</span>
          <button
            onClick={() => {
              setIncomeFilter("ALL");
              setVarietyFilter("ALL");
            }}
            className={`px-2.5 py-1 rounded-lg border font-medium cursor-pointer transition-colors ${
              incomeFilter === "ALL" && varietyFilter === "ALL"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            All Tech Farmers
          </button>
          <button
            onClick={() => setVarietyFilter("N-2-4-1")}
            className={`px-2.5 py-1 rounded-lg border font-medium cursor-pointer transition-colors ${
              varietyFilter === "N-2-4-1"
                ? "bg-emerald-700 text-white border-emerald-700"
                : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            N-2-4-1 Buyers
          </button>
          <button
            onClick={() => setVarietyFilter("Fursungi Special")}
            className={`px-2.5 py-1 rounded-lg border font-medium cursor-pointer transition-colors ${
              varietyFilter === "Fursungi Special"
                ? "bg-rose-700 text-white border-rose-700"
                : "bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100"
            }`}
          >
            Fursungi Special Buyers
          </button>
          <button
            onClick={() => setIncomeFilter("ABOVE_40L")}
            className={`px-2.5 py-1 rounded-lg border font-medium cursor-pointer transition-colors ${
              incomeFilter === "ABOVE_40L"
                ? "bg-amber-600 text-white border-amber-600"
                : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
            }`}
          >
            ⭐ Elite Growers (&gt; ₹40 Lakhs)
          </button>
        </div>
      </div>

      {/* Tech Farmers Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Farmer ID & Name</th>
                <th className="py-3.5 px-4">Contact & Location</th>
                <th className="py-3.5 px-4 text-center">Land vs Onion Area</th>
                <th className="py-3.5 px-4">Variety & Batch Purchased</th>
                <th className="py-3.5 px-4 text-right">Harvest Yield</th>
                <th className="py-3.5 px-4 text-right">Annual Gross Income (₹)</th>
                <th className="py-3.5 px-4 text-right">Net Profit / Acre</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
                    <span>Loading verified tech farmer directory...</span>
                  </td>
                </tr>
              ) : farmers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold text-slate-600">No tech farmers match the filter</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Adjust your income or variety filters to see all verified seed buyers.
                    </p>
                  </td>
                </tr>
              ) : (
                farmers.map((farmer) => (
                  <tr
                    key={farmer.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => setDetailFarmer(farmer)}
                  >
                    {/* Identification */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                          {farmer.fullName[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1.5">
                            <span>{farmer.fullName}</span>
                            <span title="Verified Seed Buyer">
                              <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                            </span>
                          </div>
                          <div className="font-mono text-[11px] text-slate-500 flex items-center gap-1">
                            <span>{farmer.farmerId}</span>
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-1 py-0.2 rounded font-sans">
                              {farmer.customerCategory === "TECH_FARMER" ? "Tech Farmer" : "Progressive"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800 flex items-center gap-1">
                        <span>{farmer.villageTown}</span>
                        <span className="text-slate-400">,</span>
                        <span className="text-emerald-700 font-bold">{farmer.district}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{farmer.phone}</span>
                      </div>
                    </td>

                    {/* Land vs Onion Area */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 text-[11px]" title="Total Land Owned">
                          {farmer.totalLandOwnedAcres} Ac
                        </span>
                        <span className="text-slate-300 font-bold">/</span>
                        <span className="font-extrabold text-emerald-700 text-[11px]" title="Onion Cultivation Area">
                          {farmer.onionCultivationAreaAcres} Ac
                        </span>
                      </div>
                    </td>

                    {/* Seed Variety & Batch */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">
                        {farmer.seedVarietyPurchased.split(" (")[0]}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
                        <span className="text-emerald-700 font-medium">{farmer.batchNumber}</span>
                        <span>•</span>
                        <span>{farmer.quantityPurchasedKg} kg</span>
                      </div>
                    </td>

                    {/* Harvest Yield */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="font-bold text-slate-900">
                        {formatNumber(farmer.totalSeedYieldKg, 0)} kg
                      </div>
                      <div className="text-[10px] text-slate-500">
                        (~{farmer.landYieldRatio} kg/Ac)
                      </div>
                    </td>

                    {/* Annual Gross Income */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="font-extrabold text-emerald-700 text-sm">
                        {formatCurrency(farmer.grossIncomeInr)}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-medium">
                        Year {farmer.harvestYear}
                      </div>
                    </td>

                    {/* Net Profit / Acre */}
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-teal-50 text-teal-800 border border-teal-200">
                        {formatCurrency(farmer.netProfitPerAcreInr)}/Ac
                      </span>
                    </td>

                    {/* Actions */}
                    <td
                      className="py-3.5 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setDetailFarmer(farmer)}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="View Financial Mahiti"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openEditModal(farmer)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Farmer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteFarmer(farmer)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Farmer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT TECH FARMER MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  {editingFarmer ? "Edit Tech Farmer Profile" : "Register Verified Tech Farmer"}
                </h3>
                <p className="text-xs text-slate-500">
                  {editingFarmer
                    ? `Updating parameters & financial mahiti for ${editingFarmer.farmerId}`
                    : "Add commercial onion seed buyer with land size and annual income tracking."}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="mt-4 space-y-4 text-xs">
              {/* Section 1: Farmer Identification */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                  👨‍🌾 Farmer Identification & Location
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Suresh Baburao Patil"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98224 51230"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Village / Town *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.villageTown}
                      onChange={(e) => setFormData({ ...formData, villageTown: e.target.value })}
                      placeholder="e.g. Niphad"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Taluka
                    </label>
                    <input
                      type="text"
                      value={formData.taluka}
                      onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                      placeholder="e.g. Niphad"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      District *
                    </label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Nashik">Nashik</option>
                      <option value="Pune">Pune</option>
                      <option value="Ahmednagar">Ahmednagar</option>
                      <option value="Solapur">Solapur</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Land & Seed Purchase Details */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                  🧅 Land & Seed Purchase Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Total Land Owned (Acres) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      required
                      value={formData.totalLandOwnedAcres}
                      onChange={(e) =>
                        setFormData({ ...formData, totalLandOwnedAcres: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Onion Cultivation Area (Acres) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      required
                      value={formData.onionCultivationAreaAcres}
                      onChange={(e) => {
                        const area = parseFloat(e.target.value) || 1;
                        const gross = parseFloat(formData.grossIncomeInr) || 0;
                        const calcProfit = Math.round((gross * 0.75) / area);
                        setFormData({
                          ...formData,
                          onionCultivationAreaAcres: e.target.value,
                          netProfitPerAcreInr: String(calcProfit),
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Seed Variety Purchased *
                    </label>
                    <select
                      value={formData.seedVarietyPurchased}
                      onChange={(e) =>
                        setFormData({ ...formData, seedVarietyPurchased: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="N-2-4-1 (Garwa Selection - High Storage)">
                        N-2-4-1 (Garwa Selection)
                      </option>
                      <option value="Fursungi Special (Garwa Red Bulb)">
                        Fursungi Special Red
                      </option>
                      <option value="Bhima Super (Rabi / Late Kharif)">
                        Bhima Super
                      </option>
                      <option value="AgriFound Dark Red (Export Grade)">
                        AgriFound Dark Red
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Quantity Purchased (kg) *
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      required
                      value={formData.quantityPurchasedKg}
                      onChange={(e) =>
                        setFormData({ ...formData, quantityPurchasedKg: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Batch Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.batchNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, batchNumber: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono text-emerald-700 font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Annual Financial Mahiti */}
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-3">
                <span className="font-bold text-emerald-900 block text-[11px] uppercase tracking-wider">
                  📈 Annual Yield & Financial Mahiti (Reporting)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Harvest Year *
                    </label>
                    <select
                      value={formData.harvestYear}
                      onChange={(e) => setFormData({ ...formData, harvestYear: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-semibold"
                    >
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Total Harvest Yield (kg) *
                    </label>
                    <input
                      type="number"
                      step="500"
                      min="1000"
                      required
                      value={formData.totalSeedYieldKg}
                      onChange={(e) =>
                        setFormData({ ...formData, totalSeedYieldKg: e.target.value })
                      }
                      placeholder="45000"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Gross Income (₹) *
                    </label>
                    <input
                      type="number"
                      step="50000"
                      min="100000"
                      required
                      value={formData.grossIncomeInr}
                      onChange={(e) => {
                        const gross = parseFloat(e.target.value) || 0;
                        const area = parseFloat(formData.onionCultivationAreaAcres) || 1;
                        const calcProfit = Math.round((gross * 0.75) / area);
                        setFormData({
                          ...formData,
                          grossIncomeInr: e.target.value,
                          netProfitPerAcreInr: String(calcProfit),
                        });
                      }}
                      placeholder="3800000"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-extrabold text-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Net Profit / Acre (₹)
                    </label>
                    <input
                      type="number"
                      step="10000"
                      required
                      value={formData.netProfitPerAcreInr}
                      onChange={(e) =>
                        setFormData({ ...formData, netProfitPerAcreInr: e.target.value })
                      }
                      placeholder="900000"
                      className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl font-extrabold text-teal-800"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Agronomic Notes & Storage Experience
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Storage life observed, chawl structure type, APMC realization notes..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-2 shadow cursor-pointer disabled:opacity-60"
                >
                  {formSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingFarmer ? "Update Tech Farmer" : "Save & Register Tech Farmer"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL MODAL: LAND VS YIELD RATIO & ANNUAL FINANCIAL MAHITI */}
      {detailFarmer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full p-6 animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-lg flex items-center justify-center shadow">
                  {detailFarmer.fullName[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 font-display">
                      {detailFarmer.fullName}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Tech Farmer</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    ID: {detailFarmer.farmerId} • {detailFarmer.villageTown}, {detailFarmer.district} ({detailFarmer.phone})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDetailFarmer(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Land vs. Yield Ratio Visual Comparison Card */}
            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4" />
                  <span>Land vs. Yield Ratio (Efficiency Card)</span>
                </span>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                  {detailFarmer.seedVarietyPurchased.split(" (")[0]}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-slate-400 block">Total Land Owned</span>
                  <span className="text-lg font-bold text-white block mt-0.5">
                    {detailFarmer.totalLandOwnedAcres} Acres
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-emerald-400 block font-semibold">Onion Area Cultivated</span>
                  <span className="text-lg font-bold text-emerald-300 block mt-0.5">
                    {detailFarmer.onionCultivationAreaAcres} Acres
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-slate-400 block">Total Harvest Produced</span>
                  <span className="text-lg font-bold text-white block mt-0.5">
                    {formatNumber(detailFarmer.totalSeedYieldKg, 0)} kg
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-900/60 border border-emerald-700/60">
                  <span className="text-emerald-300 block font-semibold">Yield / Acre Ratio</span>
                  <span className="text-lg font-extrabold text-white block mt-0.5">
                    {detailFarmer.landYieldRatio || Math.round(detailFarmer.totalSeedYieldKg / detailFarmer.onionCultivationAreaAcres)} kg/Ac
                  </span>
                </div>
              </div>

              {/* Progress Bar of Land Dedicated to Onion Seeds */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                  <span>Onion Seed Area Share</span>
                  <span>
                    {Math.round((detailFarmer.onionCultivationAreaAcres / detailFarmer.totalLandOwnedAcres) * 100)}% of owned land
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                    style={{
                      width: `${Math.min(100, Math.round((detailFarmer.onionCultivationAreaAcres / detailFarmer.totalLandOwnedAcres) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Seed Purchase & Agronomic Details */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block">Variety Purchased</span>
                <span className="font-bold text-slate-900 block mt-0.5 truncate" title={detailFarmer.seedVarietyPurchased}>
                  {detailFarmer.seedVarietyPurchased}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block">Batch & Lot</span>
                <span className="font-bold text-emerald-800 font-mono block mt-0.5">
                  {detailFarmer.batchNumber}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block">Purchase Date</span>
                <span className="font-bold text-slate-900 block mt-0.5">
                  {formatDate(detailFarmer.purchaseDate)}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block">Seed Qty (kg)</span>
                <span className="font-bold text-slate-900 block mt-0.5">
                  {detailFarmer.quantityPurchasedKg} kg
                </span>
              </div>
            </div>

            {/* Annual Financial Mahiti Table */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Annual Financial Mahiti (Year-Wise Harvest Reporting)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Audited with Akshara FPC Seed Invoices</span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">Year & Season</th>
                      <th className="py-2.5 px-3">Seed Variety & Batch</th>
                      <th className="py-2.5 px-3 text-right">Qty (kg)</th>
                      <th className="py-2.5 px-3 text-right">Harvest Yield (kg)</th>
                      <th className="py-2.5 px-3 text-right">Gross Income (₹)</th>
                      <th className="py-2.5 px-3 text-right">Net Profit / Acre</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {detailFarmer.annualMahiti && detailFarmer.annualMahiti.length > 0 ? (
                      detailFarmer.annualMahiti.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-bold text-slate-900">
                            {m.harvestYear}
                            <span className="block text-[10px] font-normal text-slate-400">{m.season}</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="font-semibold text-slate-800">{m.seedVariety}</div>
                            <div className="text-[10px] text-emerald-700 font-mono">{m.batchNumber}</div>
                          </td>
                          <td className="py-2.5 px-3 text-right font-medium text-slate-700">
                            {m.quantityPurchasedKg} kg
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                            {formatNumber(m.totalYieldKg, 0)} kg
                          </td>
                          <td className="py-2.5 px-3 text-right font-extrabold text-emerald-700">
                            {formatCurrency(m.grossIncomeInr)}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="font-extrabold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                              {formatCurrency(m.netProfitPerAcreInr)}/Ac
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-slate-900">
                          {detailFarmer.harvestYear}
                          <span className="block text-[10px] font-normal text-slate-400">Rabi Season</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-slate-800">{detailFarmer.seedVarietyPurchased}</div>
                          <div className="text-[10px] text-emerald-700 font-mono">{detailFarmer.batchNumber}</div>
                        </td>
                        <td className="py-2.5 px-3 text-right font-medium text-slate-700">
                          {detailFarmer.quantityPurchasedKg} kg
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                          {formatNumber(detailFarmer.totalSeedYieldKg, 0)} kg
                        </td>
                        <td className="py-2.5 px-3 text-right font-extrabold text-emerald-700">
                          {formatCurrency(detailFarmer.grossIncomeInr)}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <span className="font-extrabold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                            {formatCurrency(detailFarmer.netProfitPerAcreInr)}/Ac
                          </span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {detailFarmer.notes && (
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="font-semibold text-slate-700 block mb-0.5">Agronomic Experience & Remarks:</span>
                <p className="text-slate-600">{detailFarmer.notes}</p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Registered Tech Farmer since {formatDate(detailFarmer.registrationDate)}
              </span>
              <button
                onClick={() => setDetailFarmer(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl cursor-pointer"
              >
                Close Mahiti Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteFarmer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Delete Tech Farmer Record?
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Are you sure you want to remove <strong>{deleteFarmer.fullName}</strong> ({deleteFarmer.farmerId})? This will delete all associated annual financial mahiti logs.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setDeleteFarmer(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow cursor-pointer"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
