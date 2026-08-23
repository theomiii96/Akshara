"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/website/Logo";
import {
  Phone,
  Lock,
  ArrowRight,
  Loader2,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function FarmerLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/farmer-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid login credentials");
      router.push("/farmer-dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setPhone("9876543210");
    setPassword("farmer123");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-950 via-green-900 to-stone-900 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-harvest-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl grid lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left: Brand */}
        <div className="lg:col-span-7 text-white space-y-6">
          <Logo variant="white" size="lg" />

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-display font-black leading-tight">
              Farmer Seed<br />
              <span className="text-harvest-400">Order Portal</span>
            </h1>
            <p className="text-earth-200 text-base leading-relaxed max-w-lg">
              Order certified seeds directly from Akshara Farmer Producer Company. Browse available varieties, check stock, and place orders from your village.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-forest-900/60 border border-forest-800 backdrop-blur-sm">
              <Sprout className="w-5 h-5 text-harvest-400 mb-2" />
              <div className="text-sm font-bold text-white">Certified Seeds</div>
              <div className="text-xs text-earth-300 mt-1">High-germination varieties at FPC prices</div>
            </div>
            <div className="p-4 rounded-2xl bg-forest-900/60 border border-forest-800 backdrop-blur-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="text-sm font-bold text-white">Live Stock Status</div>
              <div className="text-xs text-earth-300 mt-1">Real-time availability, no shortages</div>
            </div>
            <div className="p-4 rounded-2xl bg-forest-900/60 border border-forest-800 backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-harvest-400 mb-2" />
              <div className="text-sm font-bold text-white">Easy Ordering</div>
              <div className="text-xs text-earth-300 mt-1">Select, order, and track in minutes</div>
            </div>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-white rounded-2xl p-7 shadow-2xl border border-white/20">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 font-display">Farmer Login</h2>
              <p className="text-xs text-slate-500 mt-1">
                Use your registered mobile number and password to sign in
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Registered Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-forest-700 hover:bg-forest-800 text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 group cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>View Available Seeds & Order</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Fill */}
            <div className="mt-5 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
                <span className="font-medium">Demo Farmer Account</span>
                <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">Demo Mode</span>
              </div>
              <button
                type="button"
                onClick={handleDemoFill}
                className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 text-left">
                  <span className="w-2 h-2 rounded-full bg-forest-500" />
                  <div>
                    <span className="font-semibold block text-slate-800">Ramesh Patil — Niphad, Nashik</span>
                    <span className="text-slate-500 text-[11px]">Phone: 9876543210 • Password: farmer123</span>
                  </div>
                </div>
                <span className="text-forest-700 font-semibold text-[11px]">Fill & Apply</span>
              </button>
            </div>

            {/* Link to company login */}
            <div className="mt-4 text-center text-xs text-slate-400">
              Company Staff?{" "}
              <a href="/login" className="text-forest-700 font-semibold hover:underline">
                Go to Company Login →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-earth-400 z-10">
        © {new Date().getFullYear()} Akshara Farmer Producer Company Ltd. Certified FPC Member Portal.
      </div>
    </div>
  );
}
