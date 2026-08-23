"use client";

import React from "react";
import { STATS_DATA } from "@/data/website-data";
import {
  Users,
  MapPin,
  Truck,
  ShieldCheck,
  TrendingUp,
  Award,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export default function StatsSection() {
  const getIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-harvest-400" };
    switch (iconName) {
      case "Users":
        return <Users {...props} />;
      case "MapPin":
        return <MapPin {...props} />;
      case "Truck":
        return <Truck {...props} />;
      case "ShieldCheck":
        return <ShieldCheck {...props} />;
      case "TrendingUp":
        return <TrendingUp {...props} />;
      default:
        return <Award {...props} />;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-forest-950 via-forest-900 to-stone-950 text-white relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-harvest-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-800/80 border border-forest-700 text-harvest-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Measurable Impact on the Ground</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight text-white">
            Why Choose <span className="text-harvest-400">Akshara FPC</span>
          </h2>

          <p className="text-xs sm:text-sm text-earth-200 font-sans">
            Transparent collective bargaining delivering quantifiable prosperity to rural families.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {STATS_DATA.map((stat) => (
            <div
              key={stat.id}
              className="p-5 sm:p-6 rounded-3xl bg-forest-900/60 border border-forest-800/80 backdrop-blur-md hover:border-harvest-500/50 transition-all duration-300 flex flex-col justify-between group hover:scale-[1.03]"
            >
              <div className="w-12 h-12 rounded-2xl bg-forest-800/80 flex items-center justify-center mb-4 group-hover:bg-forest-700 transition-colors shadow-inner">
                {getIcon(stat.icon)}
              </div>

              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white tracking-tight group-hover:text-harvest-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-earth-100 mt-1 leading-snug">
                  {stat.label}
                </div>
                <div className="text-[11px] text-earth-400 mt-1 leading-snug">
                  {stat.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Accreditation Bar */}
        <div className="mt-12 pt-8 border-t border-forest-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-earth-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>SFAC Registered FPC</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>NABARD Supported Institution</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>State Seed Certification Protocol</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>100% Direct Bank Settlement</span>
          </div>
        </div>
      </div>
    </section>
  );
}
