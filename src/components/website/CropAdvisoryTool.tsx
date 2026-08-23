"use client";

import React, { useState } from "react";
import { CROP_CALCULATOR_DATA } from "@/data/website-data";
import {
  Calculator,
  Sprout,
  Sparkles,
  ArrowRight,
  Calendar,
  Layers,
  Droplets,
  FlaskConical,
  Scale,
  CheckCircle,
} from "lucide-react";

interface CropAdvisoryToolProps {
  onOpenInquiry?: (initialType?: string, initialCrop?: string) => void;
}

export default function CropAdvisoryTool({ onOpenInquiry }: CropAdvisoryToolProps) {
  const [selectedCropId, setSelectedCropId] = useState("onion");
  const [acreage, setAcreage] = useState<number>(2);

  const selectedCrop =
    CROP_CALCULATOR_DATA.find((c) => c.id === selectedCropId) ||
    CROP_CALCULATOR_DATA[0];

  const totalSeedRequired = (selectedCrop.seedPerAcreKg * acreage).toFixed(1);

  return (
    <section id="calculator" className="py-20 bg-earth-100/50 relative border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-100 border border-forest-300 text-forest-800 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-forest-600" />
            <span>Interactive Farmer Utility</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-stone-900 tracking-tight">
            Smart Crop & <span className="text-forest-700">Seed Calculator</span>
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Select your planned crop and acreage to instantly calculate certified seed requirements, sowing dates, and fertilizer schedules.
          </p>
        </div>

        {/* Interactive Card Container */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Crop Selection & Acreage Input */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-gradient-to-b from-stone-50 to-white border-b lg:border-b-0 lg:border-r border-stone-200 space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  1. Select Crop Variety
                </label>
                <div className="space-y-2">
                  {CROP_CALCULATOR_DATA.map((crop) => (
                    <button
                      key={crop.id}
                      onClick={() => setSelectedCropId(crop.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left font-bold text-sm transition-all duration-200 ${
                        selectedCropId === crop.id
                          ? "bg-forest-700 text-white shadow-agri scale-[1.02]"
                          : "bg-white text-stone-800 border border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Sprout
                          className={`w-4 h-4 ${
                            selectedCropId === crop.id ? "text-harvest-400" : "text-forest-600"
                          }`}
                        />
                        <span>{crop.crop}</span>
                      </div>
                      {selectedCropId === crop.id && (
                        <CheckCircle className="w-4 h-4 text-harvest-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Acreage Slider & Counter */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    2. Planned Land Area (Acres)
                  </label>
                  <span className="text-lg font-black text-forest-700 font-display">
                    {acreage} {acreage === 1 ? "Acre" : "Acres"}
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="25"
                  step="0.5"
                  value={acreage}
                  onChange={(e) => setAcreage(parseFloat(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-forest-600"
                />

                <div className="flex justify-between text-[11px] font-semibold text-stone-400 mt-1">
                  <span>1 Acre</span>
                  <span>10 Acres</span>
                  <span>25 Acres</span>
                </div>
              </div>

              {/* Instant Output Pill */}
              <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200">
                <div className="text-xs font-bold text-forest-800 uppercase tracking-wider">
                  Total Certified Seed Requirement:
                </div>
                <div className="text-2xl sm:text-3xl font-black text-forest-900 font-display mt-1">
                  {totalSeedRequired} <span className="text-base font-bold text-forest-700">kg</span>
                </div>
                <div className="text-xs text-forest-600 mt-0.5">
                  Based on standardized {selectedCrop.seedPerAcreGrams} per acre recommendation
                </div>
              </div>
            </div>

            {/* Right Column: Agronomy Details & Package */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-200">
                  <div>
                    <div className="text-xs text-harvest-600 font-bold uppercase tracking-wider">
                      Agronomic Package of Practices
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-stone-900">
                      {selectedCrop.crop}
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-forest-100 text-forest-800 border border-forest-200">
                    High-Yield Protocol
                  </span>
                </div>

                {/* 4 Key Agronomy Data Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase">
                      <Calendar className="w-4 h-4 text-forest-600" />
                      <span>Ideal Sowing Window</span>
                    </div>
                    <div className="text-sm font-bold text-stone-900">
                      {selectedCrop.idealSowingTime}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase">
                      <Layers className="w-4 h-4 text-harvest-600" />
                      <span>Plant Spacing / Nursery</span>
                    </div>
                    <div className="text-sm font-bold text-stone-900">
                      {selectedCrop.spacing}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase">
                      <Scale className="w-4 h-4 text-forest-600" />
                      <span>Expected Target Yield</span>
                    </div>
                    <div className="text-sm font-bold text-stone-900">
                      {selectedCrop.expectedYield}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      <span>Water Management</span>
                    </div>
                    <div className="text-sm font-bold text-stone-900">
                      {selectedCrop.waterRequirement}
                    </div>
                  </div>
                </div>

                {/* Fertilizer Schedule */}
                <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase mb-1">
                    <FlaskConical className="w-4 h-4 text-emerald-600" />
                    <span>Recommended Soil Nutrition & Bio-Fertilizer Schedule</span>
                  </div>
                  <div className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                    {selectedCrop.fertilizerRecommendation}
                  </div>
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-stone-500">
                  Need customized soil analysis? Contact our agronomy team for free testing.
                </div>

                <button
                  onClick={() => {
                    if (onOpenInquiry) {
                      onOpenInquiry("seeds", selectedCrop.crop);
                    } else {
                      window.location.hash = "#contact";
                    }
                  }}
                  className="btn-harvest text-xs sm:text-sm whitespace-nowrap shadow-gold font-bold"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Pre-Book {totalSeedRequired} kg Certified Seeds</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
