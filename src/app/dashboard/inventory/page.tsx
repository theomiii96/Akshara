"use client";

import { useState, useEffect } from "react";
import {
  Layers,
  Search,
  Plus,
  Filter,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
  Edit2,
  Eye,
  Award,
  Scale,
  Calendar,
  X,
  Loader2,
  Percent,
  TrendingUp,
} from "lucide-react";
import { formatCurrency, formatNumber, formatDate } from "@/lib/utils";

interface SeedBatch {
  id: string;
  batchNumber: string;
  varietyName: string;
  seedClass: string;
  harvestDate: string;
  germinationRate: number;
  purityPercentage: number;
  moistureContent: number;
  totalYieldKg: number;
  stockAvailableKg: number;
  distributedKg: number;
  distributionPct: number;
  costPerKg: number;
  qcStatus: string;
  qcInspector?: string;
  qcCertificateNo?: string;
  distributions?: Array<{
    id: string;
    distributionCode: string;
    quantityKg: number;
    totalAmount: number;
    distributionDate: string;
    farmer: {
      name: string;
      village: string;
      district: string;
    };
  }>;
}

const QC_STATUSES = ["ALL", "CERTIFIED", "PASSED", "PENDING", "REJECTED"];
const SEED_VARIETIES = [
  "Bhima Super (Rabi / Late Kharif)",
  "Bhima Red (High Yield Rabi)",
  "Bhima Shakti (Long Storage Rabi)",
  "AgriFound Dark Red (Export Grade)",
  "Panchganga Selection (Kharif Special)",
  "Prashant Onion F1 Hybrid",
  "Phule Samarth Red",
];

export default function InventoryPage() {
  const [batches, setBatches] = useState<SeedBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [qcFilter, setQcFilter] = useState("ALL");

  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<SeedBatch | null>(null);
  const [detailBatch, setDetailBatch] = useState<SeedBatch | null>(null);
  const [deleteBatch, setDeleteBatch] = useState<SeedBatch | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    batchNumber: "",
    varietyName: "Bhima Super (Rabi / Late Kharif)",
    seedClass: "Certified Class I",
    harvestDate: new Date().toISOString().slice(0, 10),
    germinationRate: "90.0",
    purityPercentage: "99.2",
    moistureContent: "6.2",
    totalYieldKg: "1500",
    stockAvailableKg: "1500",
    costPerKg: "1950",
    qcStatus: "CERTIFIED",
    qcInspector: "Dr. Suresh Patil (Seed Quality Lab)",
    qcCertificateNo: "MSCA-MH-2026-001",
  });

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (qcFilter !== "ALL") params.append("qcStatus", qcFilter);

      const res = await fetch(`/api/batches?${params.toString()}`);
      const json = await res.json();
      setBatches(json.batches || []);
    } catch (err) {
      console.error("Failed to fetch batches", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBatches();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, qcFilter]);

  const openCreateModal = () => {
    setEditingBatch(null);
    const count = batches.length + 1;
    const year = new Date().getFullYear();
    setFormData({
      batchNumber: `AK-ON-${year}-${String(count).padStart(3, "0")}`,
      varietyName: "Bhima Super (Rabi / Late Kharif)",
      seedClass: "Certified Class I",
      harvestDate: new Date().toISOString().slice(0, 10),
      germinationRate: "91.0",
      purityPercentage: "99.4",
      moistureContent: "6.2",
      totalYieldKg: "1800",
      stockAvailableKg: "1800",
      costPerKg: "1950",
      qcStatus: "CERTIFIED",
      qcInspector: "Dr. Suresh Patil (Seed Quality Lab)",
      qcCertificateNo: `MSCA-MH-${year}-${Math.floor(100 + Math.random() * 900)}`,
    });
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (b: SeedBatch) => {
    setEditingBatch(b);
    setFormData({
      batchNumber: b.batchNumber,
      varietyName: b.varietyName,
      seedClass: b.seedClass,
      harvestDate: b.harvestDate.slice(0, 10),
      germinationRate: String(b.germinationRate),
      purityPercentage: String(b.purityPercentage),
      moistureContent: String(b.moistureContent || 6.0),
      totalYieldKg: String(b.totalYieldKg),
      stockAvailableKg: String(b.stockAvailableKg),
      costPerKg: String(b.costPerKg),
      qcStatus: b.qcStatus,
      qcInspector: b.qcInspector || "",
      qcCertificateNo: b.qcCertificateNo || "",
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError("");

    try {
      const url = editingBatch ? `/api/batches/${editingBatch.id}` : "/api/batches";
      const method = editingBatch ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to save seed batch");
      }

      setModalOpen(false);
      fetchBatches();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteBatch) return;
    try {
      const res = await fetch(`/api/batches/${deleteBatch.id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to delete seed batch");
      }
      setDeleteBatch(null);
      fetchBatches();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const totalYieldSum = batches.reduce((sum, b) => sum + (b.totalYieldKg || 0), 0);
  const totalStockSum = batches.reduce((sum, b) => sum + (b.stockAvailableKg || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              Onion Seed Inventory & Production Tracking
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
              {batches.length} Batches
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track seed varieties, certified batch lots, germination rates, purity tests, and stock levels.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Seed Batch Lot</span>
        </button>
      </div>

      {/* Mini Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm text-xs">
        <div className="p-2 border-r border-slate-100 last:border-0">
          <span className="text-slate-400 font-medium block">Total Seed Lots</span>
          <span className="text-lg font-bold text-slate-900 font-display mt-0.5 block">
            {batches.length} Batches
          </span>
        </div>
        <div className="p-2 border-r border-slate-100 last:border-0">
          <span className="text-slate-400 font-medium block">Total Harvest Yield</span>
          <span className="text-lg font-bold text-slate-900 font-display mt-0.5 block">
            {formatNumber(totalYieldSum, 0)} kg
          </span>
        </div>
        <div className="p-2 border-r border-slate-100 last:border-0">
          <span className="text-slate-400 font-medium block">Stock in Storage</span>
          <span className="text-lg font-bold text-emerald-700 font-display mt-0.5 block">
            {formatNumber(totalStockSum, 0)} kg
          </span>
        </div>
        <div className="p-2">
          <span className="text-slate-400 font-medium block">Certified Pass Rate</span>
          <span className="text-lg font-bold text-teal-700 font-display mt-0.5 block">
            {batches.length ? Math.round((batches.filter(b => b.qcStatus === "CERTIFIED" || b.qcStatus === "PASSED").length / batches.length) * 100) : 100}%
          </span>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search batch number, variety, certificate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Quality Status:</span>
          </div>

          <select
            value={qcFilter}
            onChange={(e) => setQcFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {QC_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st === "ALL" ? "All QC Status" : st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Seed Batches Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Batch Number & Variety</th>
                <th className="py-3.5 px-4">Seed Class</th>
                <th className="py-3.5 px-4 text-center">Germination</th>
                <th className="py-3.5 px-4 text-center">Purity</th>
                <th className="py-3.5 px-4 text-right">Harvest Yield</th>
                <th className="py-3.5 px-4 text-right">Available Stock</th>
                <th className="py-3.5 px-4 text-right">Price / kg</th>
                <th className="py-3.5 px-4 text-center">QC Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
                    <span>Loading seed inventory lots...</span>
                  </td>
                </tr>
              ) : batches.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <Layers className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold text-slate-600">No seed batches found</p>
                  </td>
                </tr>
              ) : (
                batches.map((batch) => (
                  <tr
                    key={batch.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => setDetailBatch(batch)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 hover:text-emerald-700">
                        {batch.varietyName}
                      </div>
                      <div className="font-mono text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5 mt-0.5">
                        <span>{batch.batchNumber}</span>
                        {batch.qcCertificateNo && (
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded">
                            {batch.qcCertificateNo}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                        {batch.seedClass}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          batch.germinationRate >= 90
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : batch.germinationRate >= 85
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {batch.germinationRate}%
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center font-medium text-slate-700">
                      {batch.purityPercentage}%
                    </td>

                    <td className="py-3.5 px-4 text-right font-medium text-slate-800">
                      {formatNumber(batch.totalYieldKg, 0)} kg
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="font-bold text-emerald-700">
                        {formatNumber(batch.stockAvailableKg, 0)} kg
                      </div>
                      <div className="w-16 bg-slate-100 rounded-full h-1.5 mt-1 ml-auto overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.round((batch.stockAvailableKg / (batch.totalYieldKg || 1)) * 100)
                            )}%`,
                          }}
                        />
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-semibold text-slate-900">
                      {formatCurrency(batch.costPerKg)}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          batch.qcStatus === "CERTIFIED"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : batch.qcStatus === "PASSED"
                            ? "bg-blue-100 text-blue-800 border border-blue-300"
                            : batch.qcStatus === "PENDING"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-rose-100 text-rose-800 border border-rose-300"
                        }`}
                      >
                        {batch.qcStatus === "CERTIFIED" && <ShieldCheck className="w-3 h-3" />}
                        <span>{batch.qcStatus}</span>
                      </span>
                    </td>

                    <td
                      className="py-3.5 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setDetailBatch(batch)}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="View Batch Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openEditModal(batch)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Batch"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteBatch(batch)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Batch"
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

      {/* CREATE / EDIT BATCH MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  {editingBatch ? "Edit Seed Production Batch" : "Add Onion Seed Harvest Batch"}
                </h3>
                <p className="text-xs text-slate-500">
                  {editingBatch
                    ? `Updating parameters for ${editingBatch.batchNumber}`
                    : "Record new harvested seed lot with germination & purity lab tests."}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Batch Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.batchNumber}
                    onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Seed Variety *
                  </label>
                  <select
                    value={formData.varietyName}
                    onChange={(e) => setFormData({ ...formData, varietyName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    {SEED_VARIETIES.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Seed Class
                  </label>
                  <select
                    value={formData.seedClass}
                    onChange={(e) => setFormData({ ...formData, seedClass: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Certified Class I">Certified Class I</option>
                    <option value="Certified Class II">Certified Class II</option>
                    <option value="Foundation Seed">Foundation Seed</option>
                    <option value="Breeder Seed">Breeder Seed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Harvest Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.harvestDate}
                    onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    QC Status
                  </label>
                  <select
                    value={formData.qcStatus}
                    onChange={(e) => setFormData({ ...formData, qcStatus: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-emerald-700"
                  >
                    <option value="CERTIFIED">CERTIFIED</option>
                    <option value="PASSED">PASSED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>
              </div>

              {/* Lab Quality Tests */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                  🧪 Laboratory Quality Parameters
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">
                      Germination (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={formData.germinationRate}
                      onChange={(e) => setFormData({ ...formData, germinationRate: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-semibold text-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">
                      Purity (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={formData.purityPercentage}
                      onChange={(e) => setFormData({ ...formData, purityPercentage: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">
                      Moisture (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.moistureContent}
                      onChange={(e) => setFormData({ ...formData, moistureContent: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Yield & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Total Yield (kg) *
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    required
                    value={formData.totalYieldKg}
                    onChange={(e) => setFormData({ ...formData, totalYieldKg: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Available Stock (kg)
                  </label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={formData.stockAvailableKg}
                    onChange={(e) => setFormData({ ...formData, stockAvailableKg: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Cost per kg (INR) *
                  </label>
                  <input
                    type="number"
                    step="10"
                    required
                    value={formData.costPerKg}
                    onChange={(e) => setFormData({ ...formData, costPerKg: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Inspection Authority / Officer
                  </label>
                  <input
                    type="text"
                    value={formData.qcInspector}
                    onChange={(e) => setFormData({ ...formData, qcInspector: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Certificate Number
                  </label>
                  <input
                    type="text"
                    value={formData.qcCertificateNo}
                    onChange={(e) => setFormData({ ...formData, qcCertificateNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
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
                  <span>{editingBatch ? "Update Batch" : "Save Seed Batch"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {detailBatch && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {detailBatch.varietyName}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {detailBatch.qcStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Batch: {detailBatch.batchNumber} • {detailBatch.seedClass}
                </p>
              </div>
              <button
                onClick={() => setDetailBatch(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quality Specs */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-emerald-700 block font-medium">Germination Rate</span>
                <span className="font-extrabold text-emerald-900 text-base block mt-0.5">{detailBatch.germinationRate}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-medium">Physical Purity</span>
                <span className="font-extrabold text-slate-900 text-base block mt-0.5">{detailBatch.purityPercentage}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-medium">Harvest Yield</span>
                <span className="font-bold text-slate-900 block mt-0.5">{detailBatch.totalYieldKg} kg</span>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                <span className="text-blue-700 block font-medium">Available Stock</span>
                <span className="font-bold text-blue-900 block mt-0.5">{detailBatch.stockAvailableKg} kg</span>
              </div>
            </div>

            {/* Certificate Details */}
            <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">QC Certificate:</span>
                <span className="font-mono font-bold text-slate-800">{detailBatch.qcCertificateNo || "Pending Issue"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Inspection Authority:</span>
                <span className="font-semibold text-slate-800">{detailBatch.qcInspector || "MSCA Laboratory"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Unit Seed Price:</span>
                <span className="font-bold text-emerald-700">{formatCurrency(detailBatch.costPerKg)} / kg</span>
              </div>
            </div>

            {/* Linked Distributions */}
            <div className="mt-5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Distributed Farmer Allocations
              </h4>
              {detailBatch.distributions && detailBatch.distributions.length > 0 ? (
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                  {detailBatch.distributions.map((d) => (
                    <div key={d.id} className="p-3 flex items-center justify-between hover:bg-slate-50">
                      <div>
                        <div className="font-semibold text-slate-900">{d.farmer.name}</div>
                        <div className="text-[11px] text-slate-500">{d.farmer.village}, {d.farmer.district}</div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-900">{d.quantityKg} kg</span>
                        <span className="text-[11px] text-slate-400 block">{formatDate(d.distributionDate)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
                  No seed dispatches from this batch yet.
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setDetailBatch(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteBatch && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Delete Seed Batch?
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Are you sure you want to remove <strong>{deleteBatch.batchNumber}</strong> ({deleteBatch.varietyName})? This action cannot be undone if allocations are linked.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setDeleteBatch(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow cursor-pointer"
              >
                Delete Batch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
