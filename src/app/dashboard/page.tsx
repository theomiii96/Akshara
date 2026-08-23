"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/website/Logo";
import {
  Sprout,
  Package,
  ShoppingBag,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  AlertTriangle,
  TrendingDown,
  Users,
  IndianRupee,
  Loader2,
  ChevronDown,
  RefreshCw,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

interface Seed {
  id: string;
  name: string;
  variety: string;
  category: string;
  description?: string;
  quantityKg: number;
  pricePerKg: number;
  minOrderKg: number;
  maxOrderKg: number;
  season?: string;
  germinationPct?: number;
  isActive: boolean;
}

interface Order {
  id: string;
  orderCode: string;
  quantityKg: number;
  pricePerKg: number;
  totalAmount: number;
  status: string;
  notes?: string;
  orderedAt: string;
  farmer: { name: string; phone: string; village: string; district: string };
  seed: { name: string; variety: string; category: string };
}

const CATEGORIES = ["Onion", "Maize", "Paddy", "Vegetable", "Wheat", "Soybean", "Other"];
const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  DISPATCHED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function CompanyDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"seeds" | "orders">("seeds");
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Seed form state
  const [showForm, setShowForm] = useState(false);
  const [editSeed, setEditSeed] = useState<Seed | null>(null);
  const [formData, setFormData] = useState({
    name: "", variety: "", category: "Onion", description: "",
    quantityKg: "", pricePerKg: "", minOrderKg: "1", maxOrderKg: "25",
    season: "", germinationPct: "",
  });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [seedsRes, ordersRes, meRes] = await Promise.all([
        fetch("/api/seeds"),
        fetch("/api/orders"),
        fetch("/api/auth/me"),
      ]);
      if (seedsRes.ok) {
        const d = await seedsRes.json();
        setSeeds(d.seeds || []);
      }
      if (ordersRes.ok) {
        const d = await ordersRes.json();
        setOrders(d.orders || []);
      }
      if (meRes.ok) {
        const d = await meRes.json();
        if (d.authenticated) setUser(d.user);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openNewForm = () => {
    setEditSeed(null);
    setFormData({ name: "", variety: "", category: "Onion", description: "", quantityKg: "", pricePerKg: "", minOrderKg: "1", maxOrderKg: "25", season: "", germinationPct: "" });
    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (seed: Seed) => {
    setEditSeed(seed);
    setFormData({
      name: seed.name, variety: seed.variety, category: seed.category,
      description: seed.description || "", quantityKg: String(seed.quantityKg),
      pricePerKg: String(seed.pricePerKg), minOrderKg: String(seed.minOrderKg),
      maxOrderKg: String(seed.maxOrderKg), season: seed.season || "",
      germinationPct: seed.germinationPct ? String(seed.germinationPct) : "",
    });
    setFormError("");
    setShowForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(""); setFormLoading(true);
    try {
      const payload = {
        ...formData,
        quantityKg: parseFloat(formData.quantityKg),
        pricePerKg: parseFloat(formData.pricePerKg),
        minOrderKg: parseFloat(formData.minOrderKg),
        maxOrderKg: parseFloat(formData.maxOrderKg),
        germinationPct: formData.germinationPct ? parseFloat(formData.germinationPct) : undefined,
      };
      const url = editSeed ? `/api/seeds/${editSeed.id}` : "/api/seeds";
      const method = editSeed ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) {
        const d = await res.json();
        setFormError(d.error || "Failed to save");
      } else {
        setShowForm(false);
        showToast(editSeed ? "Seed updated successfully!" : "Seed added to stock!");
        fetchData();
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteSeed = async (id: string, name: string) => {
    if (!confirm(`Deactivate "${name}" from stock? Farmers won't be able to order it.`)) return;
    const res = await fetch(`/api/seeds/${id}`, { method: "DELETE" });
    if (res.ok) { showToast("Seed removed from active stock"); fetchData(); }
    else showToast("Failed to remove seed", "error");
  };

  const handleOrderStatus = async (orderId: string, status: string) => {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }),
    });
    if (res.ok) { showToast(`Order status → ${status}`); fetchData(); }
    else showToast("Failed to update status", "error");
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const totalStock = seeds.reduce((s, seed) => s + seed.quantityKg, 0);
  const pendingOrders = orders.filter(o => o.status === "PENDING" || o.status === "CONFIRMED").length;
  const totalRevenue = orders.filter(o => o.status !== "CANCELLED").reduce((s, o) => s + o.totalAmount, 0);
  const lowStockSeeds = seeds.filter(s => s.quantityKg < 30).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <div className="hidden sm:block h-5 w-px bg-slate-300" />
            <span className="hidden sm:block text-xs font-bold text-forest-800 uppercase tracking-wider bg-forest-50 px-2.5 py-1 rounded-lg border border-forest-200">
              Company Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-xs text-slate-500">
              Welcome, <strong className="text-slate-800">{user?.name || "Admin"}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Stock</span>
              <div className="w-8 h-8 rounded-xl bg-forest-100 flex items-center justify-center">
                <Package className="w-4 h-4 text-forest-700" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 font-display">{totalStock.toFixed(0)} <span className="text-sm font-bold text-slate-500">kg</span></div>
            <div className="text-xs text-slate-500 mt-1">{seeds.length} active seed varieties</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Orders</span>
              <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-blue-700" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 font-display">{pendingOrders}</div>
            <div className="text-xs text-slate-500 mt-1">{orders.length} total orders</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Revenue</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                <IndianRupee className="w-4 h-4 text-emerald-700" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 font-display">₹{(totalRevenue / 1000).toFixed(1)}K</div>
            <div className="text-xs text-slate-500 mt-1">From confirmed orders</div>
          </div>

          <div className={`rounded-2xl p-5 border shadow-sm ${lowStockSeeds > 0 ? "bg-amber-50 border-amber-200" : "bg-white border-slate-200"}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Low Stock</span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${lowStockSeeds > 0 ? "bg-amber-200" : "bg-slate-100"}`}>
                <AlertTriangle className={`w-4 h-4 ${lowStockSeeds > 0 ? "text-amber-700" : "text-slate-400"}`} />
              </div>
            </div>
            <div className={`text-2xl font-black font-display ${lowStockSeeds > 0 ? "text-amber-900" : "text-slate-900"}`}>{lowStockSeeds}</div>
            <div className="text-xs text-slate-500 mt-1">Seeds below 30 kg</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab("seeds")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === "seeds" ? "bg-forest-700 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
          >
            <span className="flex items-center gap-2"><Sprout className="w-4 h-4" /> Seed Stock Management</span>
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === "orders" ? "bg-forest-700 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
          >
            <span className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4" /> Farmer Orders
              {pendingOrders > 0 && <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">{pendingOrders}</span>}
            </span>
          </button>
          <button onClick={fetchData} className="ml-auto p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* ── SEEDS TAB ───────────────────────────────────────────── */}
        {tab === "seeds" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Available Seed Varieties</h2>
              <button
                onClick={openNewForm}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-sm font-bold shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Seed</span>
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-forest-600" />
              </div>
            ) : seeds.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-semibold">No seeds in stock yet</p>
                <p className="text-sm mt-1">Click "Add New Seed" to begin</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {seeds.map((seed) => {
                  const isOutOfStock = seed.quantityKg <= 0;
                  const isLow = seed.quantityKg > 0 && seed.quantityKg < 30;
                  return (
                    <div key={seed.id} className={`bg-white rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md ${isOutOfStock ? "border-red-200 bg-red-50/30" : isLow ? "border-amber-200 bg-amber-50/30" : "border-slate-200"}`}>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-forest-100 text-forest-800">{seed.category}</span>
                            {isOutOfStock && <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-800">OUT OF STOCK</span>}
                            {isLow && !isOutOfStock && <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">LOW STOCK</span>}
                          </div>
                          <h3 className="font-bold text-sm text-slate-900 leading-snug">{seed.name}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">{seed.variety}</p>
                        </div>
                        <div className="flex gap-1.5 flex-shrink-0">
                          <button onClick={() => openEditForm(seed)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-forest-700 transition-colors">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteSeed(seed.id, seed.name)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">Available Stock</span>
                          <span className={`font-black text-sm ${isOutOfStock ? "text-red-700" : isLow ? "text-amber-700" : "text-forest-700"}`}>
                            {isOutOfStock ? "0 kg" : `${seed.quantityKg} kg`}
                          </span>
                        </div>
                        {/* Stock progress bar */}
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${isOutOfStock ? "bg-red-400" : isLow ? "bg-amber-400" : "bg-forest-500"}`}
                            style={{ width: isOutOfStock ? "0%" : `${Math.min(100, (seed.quantityKg / 500) * 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">Price per kg</span>
                          <span className="font-bold text-slate-800">₹{seed.pricePerKg.toLocaleString()}</span>
                        </div>
                        {seed.germinationPct && (
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500">Germination</span>
                            <span className="font-bold text-emerald-700">{seed.germinationPct}%</span>
                          </div>
                        )}
                        {seed.season && (
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500">Season</span>
                            <span className="font-bold text-slate-700">{seed.season}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── ORDERS TAB ─────────────────────────────────────────── */}
        {tab === "orders" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              All Farmer Orders <span className="text-sm font-normal text-slate-500 ml-2">({orders.length} total)</span>
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-forest-600" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-semibold">No orders placed yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-sm text-slate-900 font-mono">{order.orderCode}</span>
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status] || "bg-slate-100 text-slate-700"}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-forest-800">{order.seed.name}</div>
                        <div className="text-xs text-slate-500">{order.seed.variety} • {order.seed.category}</div>
                        <div className="flex flex-wrap gap-4 text-xs text-slate-600 mt-1">
                          <span><strong>Farmer:</strong> {order.farmer.name}</span>
                          <span><strong>Phone:</strong> {order.farmer.phone}</span>
                          <span><strong>Village:</strong> {order.farmer.village}, {order.farmer.district}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 text-right">
                        <div>
                          <div className="text-lg font-black text-slate-900">₹{order.totalAmount.toLocaleString()}</div>
                          <div className="text-xs text-slate-500">{order.quantityKg} kg × ₹{order.pricePerKg}/kg</div>
                        </div>
                        <div className="text-xs text-slate-400">{new Date(order.orderedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
                        {/* Status Update Actions */}
                        {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                          <div className="flex gap-1.5">
                            {order.status === "CONFIRMED" && (
                              <button onClick={() => handleOrderStatus(order.id, "DISPATCHED")} className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors">
                                Mark Dispatched
                              </button>
                            )}
                            {order.status === "DISPATCHED" && (
                              <button onClick={() => handleOrderStatus(order.id, "DELIVERED")} className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors">
                                Mark Delivered
                              </button>
                            )}
                            <button onClick={() => handleOrderStatus(order.id, "CANCELLED")} className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    {order.notes && (
                      <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 italic">
                        Note: {order.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── ADD / EDIT SEED MODAL ──────────────────────────────────── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black text-slate-900">{editSeed ? "Edit Seed" : "Add New Seed to Stock"}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1">Seed Name *</label>
                  <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Akshara Super Red Onion Seeds"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Variety *</label>
                  <input required value={formData.variety} onChange={e => setFormData({ ...formData, variety: e.target.value })}
                    placeholder="e.g. N-2-4-1 (Garwa)"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Category *</label>
                  <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Available Stock (kg) *</label>
                  <input type="number" step="0.1" min="0" required value={formData.quantityKg} onChange={e => setFormData({ ...formData, quantityKg: e.target.value })}
                    placeholder="e.g. 500"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Price per kg (₹) *</label>
                  <input type="number" step="0.01" min="0" required value={formData.pricePerKg} onChange={e => setFormData({ ...formData, pricePerKg: e.target.value })}
                    placeholder="e.g. 2200"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Min Order (kg)</label>
                  <input type="number" step="0.5" min="0.5" value={formData.minOrderKg} onChange={e => setFormData({ ...formData, minOrderKg: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Max Order (kg)</label>
                  <input type="number" step="0.5" min="0.5" value={formData.maxOrderKg} onChange={e => setFormData({ ...formData, maxOrderKg: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Season</label>
                  <input value={formData.season} onChange={e => setFormData({ ...formData, season: e.target.value })}
                    placeholder="e.g. Rabi & Late Kharif"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Germination % </label>
                  <input type="number" step="0.1" min="0" max="100" value={formData.germinationPct} onChange={e => setFormData({ ...formData, germinationPct: e.target.value })}
                    placeholder="e.g. 92.5"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1">Description</label>
                  <textarea rows={2} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Short description for farmers..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none" />
                </div>
              </div>

              <button type="submit" disabled={formLoading}
                className="w-full py-3 px-4 bg-forest-700 hover:bg-forest-800 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                <span>{editSeed ? "Save Changes" : "Add Seed to Stock"}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl text-sm font-bold flex items-center gap-2 animate-fade-in ${toast.type === "success" ? "bg-forest-700 text-white" : "bg-red-600 text-white"}`}>
          {toast.type === "success" ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
