"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/website/Logo";
import {
  Sprout,
  ShoppingBag,
  ClipboardList,
  LogOut,
  Plus,
  Minus,
  Check,
  AlertTriangle,
  Loader2,
  Package,
  RefreshCw,
  ShieldCheck,
  IndianRupee,
  Calendar,
  Tag,
  X,
  MapPin,
  Phone,
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
  seed: { name: string; variety: string; category: string };
}

interface Farmer {
  id: string;
  name: string;
  phone: string;
  village: string;
  district: string;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  DISPATCHED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "⏳ Pending",
  CONFIRMED: "✅ Confirmed",
  DISPATCHED: "🚚 Dispatched",
  DELIVERED: "🏠 Delivered",
  CANCELLED: "❌ Cancelled",
};

export default function FarmerDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"seeds" | "myorders">("seeds");
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [loading, setLoading] = useState(true);

  // Order modal
  const [orderModal, setOrderModal] = useState<Seed | null>(null);
  const [orderQty, setOrderQty] = useState(1);
  const [orderNotes, setOrderNotes] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<Order | null>(null);

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [meRes, seedsRes, ordersRes] = await Promise.all([
        fetch("/api/auth/farmer-me"),
        fetch("/api/seeds"),
        fetch("/api/orders"),
      ]);

      if (meRes.ok) {
        const d = await meRes.json();
        if (d.authenticated) setFarmer(d.farmer);
        else { router.push("/farmer-login"); return; }
      }
      if (seedsRes.ok) { const d = await seedsRes.json(); setSeeds(d.seeds || []); }
      if (ordersRes.ok) { const d = await ordersRes.json(); setOrders(d.orders || []); }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openOrderModal = (seed: Seed) => {
    setOrderModal(seed);
    setOrderQty(seed.minOrderKg);
    setOrderNotes("");
    setOrderError("");
    setOrderSuccess(null);
  };

  const handlePlaceOrder = async () => {
    if (!orderModal) return;
    setOrderLoading(true);
    setOrderError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seedId: orderModal.id, quantityKg: orderQty, notes: orderNotes }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === "OUT_OF_STOCK") {
          setOrderError("This seed is now out of stock.");
        } else {
          setOrderError(data.error || "Failed to place order");
        }
      } else {
        setOrderSuccess(data.order);
        showToast("Order placed successfully! Akshara FPC will contact you soon.", "success");
        fetchData(); // refresh stock
      }
    } finally {
      setOrderLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/farmer-logout", { method: "POST" });
    router.push("/farmer-login");
  };

  const availableSeeds = seeds.filter(s => s.isActive);
  const outOfStockCount = availableSeeds.filter(s => s.quantityKg <= 0).length;
  const myPendingOrders = orders.filter(o => o.status === "CONFIRMED" || o.status === "PENDING" || o.status === "DISPATCHED").length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <div className="hidden sm:block h-5 w-px bg-slate-200" />
            <span className="hidden sm:block text-xs font-bold text-harvest-800 uppercase tracking-wider bg-harvest-50 px-2.5 py-1 rounded-lg border border-harvest-200">
              Farmer Portal
            </span>
          </div>
          <div className="flex items-center gap-3">
            {farmer && (
              <div className="hidden md:flex items-center gap-2 text-xs text-slate-600">
                <div className="w-7 h-7 rounded-full bg-forest-100 flex items-center justify-center text-forest-700 font-bold text-xs">
                  {farmer.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-800">{farmer.name}</div>
                  <div className="text-[10px] text-slate-500">{farmer.village}, {farmer.district}</div>
                </div>
              </div>
            )}
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 w-full space-y-5">
        {/* Farmer Info Card */}
        {farmer && (
          <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1">
              <div className="text-xs text-forest-200 font-bold uppercase tracking-wider">Welcome back</div>
              <h2 className="text-2xl font-display font-black">{farmer.name}</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-forest-200">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {farmer.village}, {farmer.district}</span>
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {farmer.phone}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-black text-harvest-400">{availableSeeds.filter(s => s.quantityKg > 0).length}</div>
                <div className="text-xs text-forest-200">Seeds Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-white">{myPendingOrders}</div>
                <div className="text-xs text-forest-200">Active Orders</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab("seeds")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === "seeds" ? "bg-forest-700 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
          >
            <span className="flex items-center gap-2"><Sprout className="w-4 h-4" /> Available Seeds</span>
          </button>
          <button
            onClick={() => setTab("myorders")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === "myorders" ? "bg-forest-700 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
          >
            <span className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4" /> My Orders
              {myPendingOrders > 0 && <span className="bg-harvest-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">{myPendingOrders}</span>}
            </span>
          </button>
          <button onClick={fetchData} className="ml-auto p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* ── SEEDS TAB ────────────────────────────────────────── */}
        {tab === "seeds" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Seeds Available for Order
                <span className="ml-2 text-sm font-normal text-slate-500">({availableSeeds.filter(s => s.quantityKg > 0).length} in stock)</span>
              </h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-forest-600" />
              </div>
            ) : availableSeeds.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-semibold">No seeds available right now</p>
                <p className="text-sm mt-1">Please check back soon or contact Akshara FPC</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {availableSeeds.map((seed) => {
                  const isOutOfStock = seed.quantityKg <= 0;
                  const isLow = seed.quantityKg > 0 && seed.quantityKg < 30;
                  return (
                    <div key={seed.id} className={`bg-white rounded-2xl border p-5 shadow-sm transition-all ${isOutOfStock ? "border-red-200 opacity-70" : "border-slate-200 hover:shadow-md hover:border-forest-300"}`}>
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1.5">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-forest-100 text-forest-800">{seed.category}</span>
                            {isOutOfStock && (
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-800 flex items-center gap-1">
                                <X className="w-2.5 h-2.5" /> Out of Stock
                              </span>
                            )}
                            {isLow && !isOutOfStock && (
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                                Only {seed.quantityKg.toFixed(0)} kg left!
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-base text-slate-900 leading-snug">{seed.name}</h3>
                          <p className="text-xs text-slate-500 mt-0.5 font-medium">{seed.variety}</p>
                        </div>
                        {/* Price Badge */}
                        <div className="text-right flex-shrink-0">
                          <div className="text-lg font-black text-forest-700">₹{seed.pricePerKg.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-500 font-semibold">per kg</div>
                        </div>
                      </div>

                      {/* Description */}
                      {seed.description && (
                        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">{seed.description}</p>
                      )}

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                        {seed.germinationPct && (
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Germination: <strong>{seed.germinationPct}%</strong></span>
                          </div>
                        )}
                        {seed.season && (
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Calendar className="w-3.5 h-3.5 text-harvest-600" />
                            <span>{seed.season}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Package className="w-3.5 h-3.5 text-forest-600" />
                          <span>Min: <strong>{seed.minOrderKg} kg</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Tag className="w-3.5 h-3.5 text-forest-600" />
                          <span>Max: <strong>{seed.maxOrderKg} kg</strong></span>
                        </div>
                      </div>

                      {/* Stock Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500">Stock Available</span>
                          <span className={`font-bold ${isOutOfStock ? "text-red-600" : isLow ? "text-amber-600" : "text-forest-700"}`}>
                            {isOutOfStock ? "OUT OF STOCK" : `${seed.quantityKg.toFixed(1)} kg`}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isOutOfStock ? "bg-red-300" : isLow ? "bg-amber-400" : "bg-forest-500"}`}
                            style={{ width: isOutOfStock ? "0%" : `${Math.min(100, (seed.quantityKg / 500) * 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Order Button */}
                      <button
                        onClick={() => !isOutOfStock && openOrderModal(seed)}
                        disabled={isOutOfStock}
                        className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                          isOutOfStock
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-forest-700 hover:bg-forest-800 text-white shadow-md hover:shadow-lg active:scale-[0.98]"
                        }`}
                      >
                        {isOutOfStock ? (
                          <><X className="w-4 h-4" /> Out of Stock</>
                        ) : (
                          <><ShoppingBag className="w-4 h-4" /> Order This Seed</>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── MY ORDERS TAB ──────────────────────────────────────── */}
        {tab === "myorders" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              My Seed Orders <span className="text-sm font-normal text-slate-500 ml-2">({orders.length} total)</span>
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-forest-600" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-semibold">No orders placed yet</p>
                <p className="text-sm mt-1">Browse seeds and place your first order</p>
                <button onClick={() => setTab("seeds")} className="mt-4 px-5 py-2.5 rounded-xl bg-forest-700 text-white text-sm font-bold">
                  Browse Seeds
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-xs text-slate-700 font-mono">{order.orderCode}</span>
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${STATUS_COLORS[order.status] || "bg-slate-100 text-slate-700"}`}>
                            {STATUS_LABELS[order.status] || order.status}
                          </span>
                        </div>
                        <div className="font-bold text-sm text-forest-800">{order.seed.name}</div>
                        <div className="text-xs text-slate-500">{order.seed.variety} • {order.seed.category}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(order.orderedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-xl font-black text-slate-900">₹{order.totalAmount.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">{order.quantityKg} kg × ₹{order.pricePerKg}/kg</div>
                      </div>
                    </div>
                    {order.status === "CONFIRMED" && (
                      <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 font-medium">
                        ✅ Your order is confirmed. Akshara FPC will dispatch it soon.
                      </div>
                    )}
                    {order.status === "DISPATCHED" && (
                      <div className="mt-3 p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-800 font-medium">
                        🚚 Your seeds have been dispatched! Please be ready to receive them.
                      </div>
                    )}
                    {order.status === "DELIVERED" && (
                      <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                        🏠 Delivered! Thank you for ordering from Akshara FPC.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── ORDER MODAL ──────────────────────────────────────────── */}
      {orderModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Place Seed Order</h3>
              <button onClick={() => setOrderModal(null)} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {orderSuccess ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900">Order Placed!</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Order <strong>{orderSuccess.orderCode}</strong> confirmed.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Akshara FPC will contact you on <strong>{farmer?.phone}</strong> to arrange delivery.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200 text-sm">
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Quantity Ordered</span>
                    <strong>{orderSuccess.quantityKg} kg</strong>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Total Amount</span>
                    <strong className="text-forest-700">₹{orderSuccess.totalAmount.toLocaleString()}</strong>
                  </div>
                </div>
                <button onClick={() => { setOrderModal(null); setTab("myorders"); }}
                  className="w-full py-3 px-4 bg-forest-700 text-white font-bold rounded-xl text-sm">
                  View My Orders
                </button>
              </div>
            ) : (
              <>
                {/* Seed Info */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-sm text-slate-900">{orderModal.name}</div>
                  <div className="text-xs text-slate-500">{orderModal.variety} • {orderModal.category}</div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500">Price per kg</span>
                    <span className="font-black text-forest-700 text-base">₹{orderModal.pricePerKg.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Stock Available</span>
                    <span className="font-bold text-emerald-700">{orderModal.quantityKg.toFixed(1)} kg</span>
                  </div>
                </div>

                {orderError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{orderError}</span>
                  </div>
                )}

                {/* Quantity Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Quantity (kg) — Min: {orderModal.minOrderKg} kg, Max: {Math.min(orderModal.maxOrderKg, orderModal.quantityKg).toFixed(1)} kg
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setOrderQty(q => Math.max(orderModal.minOrderKg, parseFloat((q - 0.5).toFixed(1))))}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4 text-slate-700" />
                    </button>
                    <input
                      type="number"
                      min={orderModal.minOrderKg}
                      max={Math.min(orderModal.maxOrderKg, orderModal.quantityKg)}
                      step="0.5"
                      value={orderQty}
                      onChange={e => setOrderQty(parseFloat(e.target.value) || orderModal.minOrderKg)}
                      className="flex-1 text-center text-lg font-black text-slate-900 border border-slate-200 rounded-xl py-2 focus:outline-none focus:ring-2 focus:ring-forest-500"
                    />
                    <button
                      onClick={() => setOrderQty(q => Math.min(Math.min(orderModal.maxOrderKg, orderModal.quantityKg), parseFloat((q + 0.5).toFixed(1))))}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4 text-slate-700" />
                    </button>
                  </div>
                </div>

                {/* Total Preview */}
                <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-forest-700 font-bold">Total Amount</div>
                    <div className="text-xs text-forest-600">{orderQty} kg × ₹{orderModal.pricePerKg}/kg</div>
                  </div>
                  <div className="text-2xl font-black text-forest-900">
                    ₹{(orderQty * orderModal.pricePerKg).toLocaleString()}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Notes (optional)</label>
                  <textarea
                    rows={2}
                    value={orderNotes}
                    onChange={e => setOrderNotes(e.target.value)}
                    placeholder="Any delivery instructions or remarks..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none"
                  />
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={orderLoading}
                  className="w-full py-3.5 px-4 bg-forest-700 hover:bg-forest-800 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {orderLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>{orderLoading ? "Placing Order..." : "Confirm Order"}</span>
                </button>

                <p className="text-center text-xs text-slate-400">
                  Akshara FPC will contact you on <strong>{farmer?.phone}</strong> to confirm delivery details.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl text-sm font-bold flex items-center gap-2 animate-fade-in max-w-sm text-center ${toast.type === "success" ? "bg-forest-700 text-white" : "bg-red-600 text-white"}`}>
          {toast.type === "success" ? <Check className="w-4 h-4 flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 flex-shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
