"use client";

import { useState, useEffect } from "react";
import {
  Send,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileText,
  Trash2,
  Eye,
  Building2,
  Calendar,
  X,
  Loader2,
  Printer,
  Sparkles,
  ShieldCheck,
  Sprout,
  Users,
} from "lucide-react";
import { formatCurrency, formatNumber, formatDate } from "@/lib/utils";

interface Distribution {
  id: string;
  distributionCode: string;
  quantityKg: number;
  targetAcreage: number;
  distributionDate: string;
  subsidyRatePct: number;
  totalAmount: number;
  paymentStatus: string;
  season: string;
  notes?: string;
  farmer: {
    id: string;
    farmerId: string;
    fullName: string;
    phone: string;
    villageTown: string;
    district: string;
    onionCultivationAreaAcres: number;
  };
  batch: {
    id: string;
    batchNumber: string;
    varietyName: string;
    seedClass: string;
    germinationRate: number;
    purityPercentage: number;
    costPerKg: number;
    stockAvailableKg: number;
    qcCertificateNo?: string;
  };
}

interface FarmerOption {
  id: string;
  farmerId: string;
  fullName: string;
  villageTown: string;
  district: string;
  onionCultivationAreaAcres: number;
}

interface BatchOption {
  id: string;
  batchNumber: string;
  varietyName: string;
  seedClass: string;
  germinationRate: number;
  costPerKg: number;
  stockAvailableKg: number;
}

export default function DistributionsPage() {
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [farmers, setFarmers] = useState<FarmerOption[]>([]);
  const [batches, setBatches] = useState<BatchOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("ALL");
  const [paymentFilter, setPaymentFilter] = useState("ALL");

  // Modals
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [voucherModal, setVoucherModal] = useState<Distribution | null>(null);
  const [deleteModal, setDeleteModal] = useState<Distribution | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Form Data
  const [selectedFarmerId, setSelectedFarmerId] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [quantityKg, setQuantityKg] = useState("20");
  const [targetAcreage, setTargetAcreage] = useState("4.0");
  const [subsidyRatePct, setSubsidyRatePct] = useState("20");
  const [season, setSeason] = useState("Rabi 2025");
  const [paymentStatus, setPaymentStatus] = useState("PAID");
  const [distributionDate, setDistributionDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [notes, setNotes] = useState("Direct FPC subsidy allocation for Tech Farmer.");

  const fetchDistributions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (seasonFilter !== "ALL") params.append("season", seasonFilter);
      if (paymentFilter !== "ALL") params.append("paymentStatus", paymentFilter);

      const res = await fetch(`/api/distributions?${params.toString()}`);
      const json = await res.json();
      setDistributions(json.distributions || []);
    } catch (err) {
      console.error("Failed to load distributions", err);
    } finally {
      setLoading(false);
    }
  };

  const loadDropdownOptions = async () => {
    try {
      const [farmersRes, batchesRes] = await Promise.all([
        fetch("/api/farmers"),
        fetch("/api/batches"),
      ]);
      const farmersJson = await farmersRes.json();
      const batchesJson = await batchesRes.json();
      setFarmers(farmersJson.farmers || []);
      setBatches(batchesJson.batches || []);
      if (farmersJson.farmers?.length > 0) {
        setSelectedFarmerId(farmersJson.farmers[0].id);
      }
      if (batchesJson.batches?.length > 0) {
        setSelectedBatchId(batchesJson.batches[0].id);
      }
    } catch (err) {
      console.error("Failed to load dropdown options", err);
    }
  };

  useEffect(() => {
    loadDropdownOptions();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDistributions();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, seasonFilter, paymentFilter]);

  const selectedBatch = batches.find((b) => b.id === selectedBatchId);

  // Calculate live amount
  const qty = parseFloat(quantityKg) || 0;
  const cost = selectedBatch ? selectedBatch.costPerKg : 2100;
  const subPct = parseFloat(subsidyRatePct) || 0;
  const baseTotal = qty * cost;
  const finalTotal = baseTotal * (1 - subPct / 100);

  const handleIssueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError("");

    try {
      const res = await fetch("/api/distributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmerId: selectedFarmerId,
          batchId: selectedBatchId,
          quantityKg,
          targetAcreage,
          distributionDate,
          subsidyRatePct,
          paymentStatus,
          season,
          notes,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to issue seed distribution");
      }

      setIssueModalOpen(false);
      fetchDistributions();
      loadDropdownOptions();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    try {
      const res = await fetch(`/api/distributions/${deleteModal.id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to delete distribution voucher");
      }
      setDeleteModal(null);
      fetchDistributions();
      loadDropdownOptions();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const totalDistributedKg = distributions.reduce((sum, d) => sum + (d.quantityKg || 0), 0);
  const totalAmountSum = distributions.reduce((sum, d) => sum + (d.totalAmount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              Seed Distribution & Allocation Hub
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-200">
              {distributions.length} Dispatches
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Allocate certified N-2-4-1 and Fursungi seed batches to verified growers with subsidy tracking & receipts.
          </p>
        </div>

        <button
          onClick={() => {
            setFormError("");
            setIssueModalOpen(true);
          }}
          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Issue Seed Batch</span>
        </button>
      </div>

      {/* Mini Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm text-xs">
        <div className="p-2 border-r border-slate-100 last:border-0">
          <span className="text-slate-400 font-medium block">Total Dispatches</span>
          <span className="text-lg font-bold text-slate-900 font-display mt-0.5 block">
            {distributions.length} Vouchers
          </span>
        </div>
        <div className="p-2 border-r border-slate-100 last:border-0">
          <span className="text-slate-400 font-medium block">Seed Quantity Dispatched</span>
          <span className="text-lg font-bold text-slate-900 font-display mt-0.5 block">
            {formatNumber(totalDistributedKg, 0)} kg
          </span>
        </div>
        <div className="p-2 border-r border-slate-100 last:border-0">
          <span className="text-slate-400 font-medium block">Total Billed Amount</span>
          <span className="text-lg font-bold text-emerald-700 font-display mt-0.5 block">
            {formatCurrency(totalAmountSum)}
          </span>
        </div>
        <div className="p-2">
          <span className="text-slate-400 font-medium block">Active Season</span>
          <span className="text-lg font-bold text-teal-700 font-display mt-0.5 block">
            Rabi 2025 / 2026
          </span>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search voucher code, tech farmer, village, batch..."
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
          <select
            value={seasonFilter}
            onChange={(e) => setSeasonFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">All Seasons</option>
            <option value="Rabi 2025">Rabi 2025</option>
            <option value="Rabi 2026">Rabi 2026</option>
            <option value="Late Kharif 2025">Late Kharif 2025</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">All Payment Status</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
            <option value="SUBSIDIZED">Subsidized</option>
          </select>
        </div>
      </div>

      {/* Distributions Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Voucher Code</th>
                <th className="py-3.5 px-4">Tech Farmer Recipient</th>
                <th className="py-3.5 px-4">Seed Variety & Batch</th>
                <th className="py-3.5 px-4 text-right">Quantity (kg)</th>
                <th className="py-3.5 px-4 text-right">Target Area</th>
                <th className="py-3.5 px-4 text-right">Net Amount</th>
                <th className="py-3.5 px-4 text-center">Season & Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
                    <span>Loading distribution vouchers...</span>
                  </td>
                </tr>
              ) : distributions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Send className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold text-slate-600">No distribution records found</p>
                  </td>
                </tr>
              ) : (
                distributions.map((dist) => (
                  <tr
                    key={dist.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => setVoucherModal(dist)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {dist.distributionCode}
                      <span className="block text-[10px] font-normal text-slate-400">
                        {formatDate(dist.distributionDate)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 hover:text-emerald-700 flex items-center gap-1">
                        <span>{dist.farmer.fullName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {dist.farmer.villageTown}, {dist.farmer.district}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{dist.batch.varietyName}</div>
                      <div className="text-[11px] font-mono text-emerald-700">
                        {dist.batch.batchNumber} • {dist.batch.germinationRate}% Germ.
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                      {dist.quantityKg} kg
                    </td>

                    <td className="py-3.5 px-4 text-right font-medium text-slate-700">
                      {dist.targetAcreage} Ac
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="font-bold text-emerald-700">
                        {formatCurrency(dist.totalAmount)}
                      </div>
                      {dist.subsidyRatePct > 0 && (
                        <div className="text-[10px] text-rose-600 font-semibold">
                          {dist.subsidyRatePct}% Subsidy Applied
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="text-[11px] font-semibold text-slate-700">{dist.season}</div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mt-0.5">
                        {dist.paymentStatus}
                      </span>
                    </td>

                    <td
                      className="py-3.5 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setVoucherModal(dist)}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="View Distribution Voucher"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteModal(dist)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Cancel Distribution"
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

      {/* ISSUE SEED BATCH MODAL */}
      {issueModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Issue Seed Batch Allocation
                </h3>
                <p className="text-xs text-slate-500">
                  Allocate certified onion seed lots to verified tech farmers.
                </p>
              </div>
              <button
                onClick={() => setIssueModalOpen(false)}
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

            <form onSubmit={handleIssueSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Recipient Tech Farmer *
                </label>
                <select
                  value={selectedFarmerId}
                  onChange={(e) => setSelectedFarmerId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  {farmers.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.fullName} ({f.farmerId}) — {f.villageTown}, {f.district} (Onion Area: {f.onionCultivationAreaAcres} Ac)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Select Certified Seed Batch *
                </label>
                <select
                  value={selectedBatchId}
                  onChange={(e) => setSelectedBatchId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.varietyName} [{b.batchNumber}] — {b.stockAvailableKg} kg In Stock (₹{b.costPerKg}/kg, {b.germinationRate}% Germ.)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Seed Quantity to Issue (kg) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max={selectedBatch ? selectedBatch.stockAvailableKg : 9999}
                    required
                    value={quantityKg}
                    onChange={(e) => {
                      const v = e.target.value;
                      setQuantityKg(v);
                      const num = parseFloat(v) || 0;
                      setTargetAcreage((num / 5).toFixed(1));
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {selectedBatch && (
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Max available: <strong>{selectedBatch.stockAvailableKg} kg</strong>
                    </span>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Estimated Target Acreage (Acres)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={targetAcreage}
                    onChange={(e) => setTargetAcreage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Subsidy Discount (%)
                  </label>
                  <select
                    value={subsidyRatePct}
                    onChange={(e) => setSubsidyRatePct(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-emerald-700"
                  >
                    <option value="0">0% (Commercial Price)</option>
                    <option value="10">10% FPC Member Rebate</option>
                    <option value="15">15% Early Booking</option>
                    <option value="20">20% NHM Govt Subsidy</option>
                    <option value="25">25% Breeder Cluster Subsidy</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Crop Season
                  </label>
                  <select
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    <option value="Rabi 2025">Rabi 2025</option>
                    <option value="Rabi 2026">Rabi 2026</option>
                    <option value="Late Kharif 2025">Late Kharif 2025</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Payment Status
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    <option value="PAID">PAID</option>
                    <option value="PENDING">PENDING</option>
                    <option value="SUBSIDIZED">SUBSIDIZED</option>
                  </select>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Base Rate:</span>
                  <span>{qty} kg × {formatCurrency(cost)}/kg = {formatCurrency(baseTotal)}</span>
                </div>
                {subPct > 0 && (
                  <div className="flex items-center justify-between text-rose-600 font-medium">
                    <span>Subsidy Deduction ({subPct}%):</span>
                    <span>- {formatCurrency(baseTotal * (subPct / 100))}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-bold text-slate-900 text-sm">
                  <span>Total Payable:</span>
                  <span className="text-emerald-700 font-extrabold text-base">{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIssueModalOpen(false)}
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
                  <span>Confirm & Issue Seed Lot</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VOUCHER MODAL */}
      {voucherModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow">
                  <Sprout className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 font-display">
                    Akshara Farmer Producer Company Ltd.
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold">
                    Certified Onion Seed Distribution Voucher
                  </p>
                </div>
              </div>
              <button
                onClick={() => setVoucherModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <span className="text-slate-400 block">Voucher Code</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {voucherModal.distributionCode}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block">Issue Date</span>
                  <span className="font-semibold text-slate-800">
                    {formatDate(voucherModal.distributionDate)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="font-bold text-slate-900 block mb-1 text-[11px] uppercase tracking-wider">
                    👨‍🌾 Verified Tech Farmer
                  </span>
                  <p className="font-bold text-slate-800">{voucherModal.farmer.fullName}</p>
                  <p className="text-slate-500 font-mono">{voucherModal.farmer.farmerId}</p>
                  <p className="text-slate-600">{voucherModal.farmer.villageTown}, {voucherModal.farmer.district}</p>
                  <p className="text-slate-600">{voucherModal.farmer.phone}</p>
                </div>

                <div>
                  <span className="font-bold text-slate-900 block mb-1 text-[11px] uppercase tracking-wider">
                    🧅 Certified Seed Lot
                  </span>
                  <p className="font-bold text-emerald-800">{voucherModal.batch.varietyName}</p>
                  <p className="text-slate-600 font-mono">Batch: {voucherModal.batch.batchNumber}</p>
                  <p className="text-slate-600">Germination: {voucherModal.batch.germinationRate}% • Purity: {voucherModal.batch.purityPercentage}%</p>
                  <p className="text-slate-500 text-[11px]">Cert: {voucherModal.batch.qcCertificateNo || "MSCA Verified"}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-600 uppercase font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Item Description</th>
                    <th className="py-2.5 px-3 text-right">Quantity</th>
                    <th className="py-2.5 px-3 text-right">Unit Rate</th>
                    <th className="py-2.5 px-3 text-right">Subsidy</th>
                    <th className="py-2.5 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{voucherModal.batch.varietyName}</div>
                      <div className="text-[11px] text-slate-500">Season: {voucherModal.season} (Target: {voucherModal.targetAcreage} Ac)</div>
                    </td>
                    <td className="py-3 px-3 text-right font-bold">{voucherModal.quantityKg} kg</td>
                    <td className="py-3 px-3 text-right">{formatCurrency(voucherModal.batch.costPerKg)}</td>
                    <td className="py-3 px-3 text-right text-rose-600 font-semibold">{voucherModal.subsidyRatePct}%</td>
                    <td className="py-3 px-3 text-right font-extrabold text-emerald-700 text-sm">
                      {formatCurrency(voucherModal.totalAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {voucherModal.notes && (
              <p className="mt-3 text-slate-500 text-[11px] italic">
                Note: {voucherModal.notes}
              </p>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Authorized by Seed Quality Officer</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Voucher</span>
                </button>
                <button
                  onClick={() => setVoucherModal(null)}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Cancel & Delete Voucher?
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Cancelling voucher <strong>{deleteModal.distributionCode}</strong> will restore <strong>{deleteModal.quantityKg} kg</strong> back to batch stock ({deleteModal.batch.batchNumber}).
            </p>
            <div className="mt-5 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setDeleteModal(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
              >
                Keep Voucher
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow cursor-pointer"
              >
                Confirm Cancel & Restore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
