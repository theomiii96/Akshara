"use client";

import { useState } from "react";
import {
  Menu,
  Bell,
  Search,
  Plus,
  Calendar,
  Sparkles,
  CheckCircle,
  Leaf,
  Layers,
  Users,
} from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  onMenuClick: () => void;
  user?: {
    name: string;
    email: string;
  } | null;
}

export default function Header({ onMenuClick, user }: HeaderProps) {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Rabi 2026 Production Cycle
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-medium">
              Akshara Farmer Producer Company Ltd.
            </span>
          </div>
        </div>

        {/* Right Side: Quick Action buttons & Status */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Action Link */}
          <Link
            href="/dashboard/farmers"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Farmers</span>
          </Link>

          <Link
            href="/dashboard/inventory"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-rose-600" />
            <span>Seed Inventory</span>
          </Link>

          <Link
            href="/dashboard/distributions"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Issue Seed Batch</span>
          </Link>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotification(!showNotification)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            </button>

            {showNotification && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in-50 slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">Notifications</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    2 New
                  </span>
                </div>
                <div className="py-2 space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                    <p className="font-semibold text-emerald-900 text-[11px]">
                      Batch QC Certified
                    </p>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Batch AK-ON-2026-001 (Bhima Super) passed 91.5% germination test.
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <p className="font-semibold text-slate-800 text-[11px]">
                      New Farmer Registered
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Appasaheb Shinde (Solapur) added with 5.5 acres onion acreage.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {user?.name ? user.name[0] : "A"}
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                {user?.name ? user.name.split(" ")[0] : "Admin"}
              </p>
              <p className="text-[10px] text-slate-500">Akshara FPC Staff</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
