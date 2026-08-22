"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Sprout,
  Layers,
  Send,
  TrendingUp,
  Award,
  CheckCircle2,
  MapPin,
  ArrowUpRight,
  Plus,
  RefreshCw,
  Clock,
  ShieldCheck,
  Scale,
  DollarSign,
  BadgeCheck,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { formatCurrency, formatNumber, formatDate } from "@/lib/utils";

interface DashboardData {
  summary: {
    totalFarmers: number;
    totalLandAcreage: number;
    totalOnionAcreage: number;
    totalHarvestYieldKg: number;
    totalGrossIncomeInr: number;
    avgNetProfitPerAcreInr: number;
    totalSeedYieldKg: number;
    totalStockAvailableKg: number;
    totalDistributedKg: number;
    totalDistributionRevenue: number;
    activeBatchesCount: number;
    certifiedBatchesCount: number;
    qcPassRate: number;
  };
  varietyYieldData: Array<{
    variety: string;
    fullName: string;
    totalYield: number;
    remainingStock: number;
    distributed: number;
  }>;
  districtAcreageData: Array<{
    district: string;
    acreage: number;
    farmers: number;
    income: number;
  }>;
  topTechFarmers: Array<{
    id: string;
    code: string;
    name: string;
    village: string;
    variety: string;
    onionArea: number;
    yieldKg: number;
    grossIncome: number;
    profitPerAcre: number;
  }>;
  recentDistributions: Array<{
    id: string;
    code: string;
    farmerName: string;
    farmerVillage: string;
    batchNumber: string;
    varietyName: string;
    quantityKg: number;
    totalAmount: number;
    date: string;
    season: string;
    paymentStatus: string;
  }>;
}

const DISTRICT_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"];

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/stats");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-2xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 rounded-l-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Akshara FPC • Tech Farmer Analytics</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
            Onion Seed Production & Tech Farmer Operations
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl">
            Real-time analytics for verified growers purchasing <strong>N-2-4-1</strong> & <strong>Fursungi Special</strong> certified seeds across Nashik, Pune & Ahmednagar.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <Link
            href="/dashboard/farmers"
            className="px-3.5 py-2 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-semibold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-700" />
            <span>Register Tech Farmer</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Verified Tech Farmers */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Verified Tech Farmers
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BadgeCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              {loading ? "..." : data?.summary.totalFarmers || 0}
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
              <span className="inline-flex items-center text-emerald-600 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 mr-0.5" /> 100%
              </span>
              <span>verified seed buyers</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Total Land Owned:</span>
            <span className="font-semibold text-slate-700">
              {loading ? "..." : `${data?.summary.totalLandAcreage || 0} Acres`}
            </span>
          </div>
        </div>

        {/* Card 2: Cultivation Acreage */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Onion Seed Acreage
            </span>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              {loading ? "..." : `${data?.summary.totalOnionAcreage || 0} Ac`}
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
              <span className="text-teal-600 font-semibold">
                {loading ? "..." : Math.round(((data?.summary.totalOnionAcreage || 0) / (data?.summary.totalLandAcreage || 1)) * 100)}%
              </span>
              <span>of total grower land</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Varieties:</span>
            <span className="font-semibold text-slate-700">N-2-4-1 & Fursungi</span>
          </div>
        </div>

        {/* Card 3: Total Harvest Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Grower Gross Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-display">
              {loading ? "..." : formatCurrency(data?.summary.totalGrossIncomeInr || 0)}
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
              <span className="text-emerald-600 font-semibold">
                {loading ? "..." : `${formatNumber((data?.summary.totalHarvestYieldKg || 0) / 1000, 1)} MT`}
              </span>
              <span>harvest produced</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Avg Net Profit:</span>
            <span className="font-bold text-teal-700">
              {loading ? "..." : `${formatCurrency(data?.summary.avgNetProfitPerAcreInr || 0)} / Ac`}
            </span>
          </div>
        </div>

        {/* Card 4: FPC Seed Inventory */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Certified Seed Stock
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              {loading ? "..." : `${formatNumber(data?.summary.totalStockAvailableKg || 0, 0)} kg`}
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
              <span className="text-rose-600 font-semibold">
                {loading ? "..." : `${formatNumber(data?.summary.totalDistributedKg || 0, 0)} kg`}
              </span>
              <span>distributed</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>QC Pass Rate:</span>
            <span className="font-semibold text-emerald-600">
              {loading ? "..." : `${data?.summary.qcPassRate || 100}% Certified`}
            </span>
          </div>
        </div>
      </div>

      {/* Visualizations Section: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chart: Seed Yield by Variety */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                Certified Seed Production by Variety (kg)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Yield harvested vs stock available & distributed
              </p>
            </div>
            <Link
              href="/dashboard/inventory"
              className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1"
            >
              <span>View Inventory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-72 w-full">
            {loading ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                Loading production chart...
              </div>
            ) : data?.varietyYieldData && data.varietyYieldData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.varietyYieldData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="variety"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                      border: "none",
                    }}
                    formatter={(value: any, name: string) => [
                      `${value} kg`,
                      name === "totalYield"
                        ? "Total Yield"
                        : name === "remainingStock"
                        ? "Remaining Stock"
                        : "Distributed",
                    ]}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                  />
                  <Bar
                    dataKey="totalYield"
                    name="Total Yield (kg)"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="remainingStock"
                    name="Available Stock (kg)"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                No variety data available
              </div>
            )}
          </div>
        </div>

        {/* Right Chart: District Cultivation Acreage */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">
                  District Acreage Breakdown
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Onion seed acreage per Maharashtra district
                </p>
              </div>
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="h-52 w-full mt-2">
              {loading ? (
                <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                  Loading district metrics...
                </div>
              ) : data?.districtAcreageData && data.districtAcreageData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.districtAcreageData}
                      dataKey="acreage"
                      nameKey="district"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                    >
                      {data.districtAcreageData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={DISTRICT_COLORS[index % DISTRICT_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderRadius: "12px",
                        color: "#fff",
                        fontSize: "12px",
                        border: "none",
                      }}
                      formatter={(value: any, name: string) => [
                        `${value} Acres`,
                        `District: ${name}`,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
            {data?.districtAcreageData.map((d, index) => (
              <div
                key={d.district}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: DISTRICT_COLORS[index % DISTRICT_COLORS.length] }}
                  />
                  <span className="font-semibold text-slate-700 truncate">{d.district}</span>
                </div>
                <span className="font-bold text-slate-900 ml-1 shrink-0">{d.acreage} Ac</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Earning Tech Farmers Table */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 font-display">
                Top-Performing Tech Farmers (Annual Gross Income)
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                High-Income Seed Multipliers
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Farmers achieving highest revenues and per-acre profitability with Akshara FPC certified seeds.
            </p>
          </div>
          <Link
            href="/dashboard/farmers"
            className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1"
          >
            <span>View Full Directory</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="pb-3 font-medium">Rank & Farmer Name</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Seed Variety</th>
                <th className="pb-3 font-medium text-center">Onion Area</th>
                <th className="pb-3 font-medium text-right">Harvest Produced</th>
                <th className="pb-3 font-medium text-right">Annual Gross Income (₹)</th>
                <th className="pb-3 font-medium text-right">Net Profit / Acre</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-400">
                    Loading top earners...
                  </td>
                </tr>
              ) : data?.topTechFarmers && data.topTechFarmers.length > 0 ? (
                data.topTechFarmers.map((farmer, index) => (
                  <tr key={farmer.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${
                            index === 0
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : index === 1
                              ? "bg-slate-200 text-slate-800"
                              : index === 2
                              ? "bg-amber-50 text-amber-800"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900">{farmer.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{farmer.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 font-medium text-slate-700">{farmer.village}</td>
                    <td className="py-3 font-semibold text-emerald-800">{farmer.variety}</td>
                    <td className="py-3 text-center font-semibold text-slate-800">{farmer.onionArea} Ac</td>
                    <td className="py-3 text-right font-bold text-slate-900">
                      {formatNumber(farmer.yieldKg, 0)} kg
                    </td>
                    <td className="py-3 text-right font-extrabold text-emerald-700 text-sm">
                      {formatCurrency(farmer.grossIncome)}
                    </td>
                    <td className="py-3 text-right">
                      <span className="font-extrabold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 text-[11px]">
                        {formatCurrency(farmer.profitPerAcre)}/Ac
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-400">
                    No tech farmers recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
