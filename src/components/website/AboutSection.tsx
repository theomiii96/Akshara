"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Users,
  Target,
  Eye,
  HeartHandshake,
  CheckCircle,
  Award,
  ChevronRight,
  Sprout,
  X,
  FileText,
  Download,
} from "lucide-react";

export default function AboutSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pillars = [
    {
      title: "Quality Seed Assurance",
      desc: "Lab-tested seed varieties with 98%+ germination guarantee and climate resilience.",
      icon: Sprout,
    },
    {
      title: "Direct Market Linkage",
      desc: "Bypassing intermediaries to ensure farmgate produce fetches true market value.",
      icon: Target,
    },
    {
      title: "Fair Pricing & Credit",
      desc: "Subsidized bulk inputs, revolving credit lines, and prompt 24-hr bank settlements.",
      icon: HeartHandshake,
    },
    {
      title: "Doorstep Agronomy",
      desc: "Free soil health audits, telephonic diagnosis, and modern mechanized hiring.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="about" className="py-20 bg-earth-50 relative overflow-hidden border-b border-stone-200">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-soil-pattern opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-100 border border-forest-300 text-forest-800 text-xs font-bold uppercase tracking-wider">
            <Sprout className="w-3.5 h-3.5 text-forest-600" />
            <span>Rooted In Agriculture • Driven By Farmers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-stone-900 tracking-tight">
            About <span className="text-forest-700">Akshara Farmer Producer Company</span>
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Bridging scientific agricultural innovation with grassroots farming communities for sustainable rural prosperity.
          </p>
        </div>

        {/* Main Content Grid: Text & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with floating impact card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image with rounded border */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80"
                  alt="Farmers holding healthy crop harvest in field"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xs font-bold text-harvest-400 uppercase tracking-wider">
                    Community First
                  </div>
                  <div className="text-lg font-bold font-display">
                    Over 5,000 Smallholders United Under One Collective Flag
                  </div>
                </div>
              </div>

              {/* Floating Badge Top Left */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-stone-200 hidden sm:flex items-center gap-3 animate-float">
                <div className="w-12 h-12 rounded-xl bg-forest-600 flex items-center justify-center text-white shadow-md">
                  <Award className="w-6 h-6 text-harvest-300" />
                </div>
                <div>
                  <div className="text-xl font-black text-stone-900 leading-tight">10+ Years</div>
                  <div className="text-xs text-stone-500 font-semibold">Of Ground Impact</div>
                </div>
              </div>

              {/* Floating Badge Bottom Right */}
              <div className="absolute -bottom-6 -right-6 bg-forest-900 text-white p-4 rounded-2xl shadow-2xl border border-forest-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center text-harvest-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-black text-white leading-tight">100% Owned</div>
                  <div className="text-xs text-forest-200 font-medium">By Farmer Shareholders</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Mission Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-stone-700 text-base leading-relaxed">
              <p className="font-semibold text-lg text-forest-900">
                Akshara Farmer Producer Company (FPC) is an incorporated agricultural cooperative enterprise founded to empower smallholder and marginal farmers with institutional strength, scientific input access, and fair commercial realization.
              </p>

              <p>
                Operating across 120+ villages in key agricultural belts, we specialize in end-to-end support for onion, maize, paddy, and horticulture farmers. We produce and distribute laboratory-certified foundation seeds, supply high-grade bio-nutrients at wholesale prices, and eliminate predatory middlemen through direct farmgate produce aggregation.
              </p>

              <p>
                Our vision extends beyond retail transactions. With dedicated village Custom Hiring Centers, regular Krishi Vigyan field workshops, free soil health testing, and a 24/7 telephonic agronomy cell, we ensure every farmer member achieves higher yields at lower production costs.
              </p>
            </div>

            {/* 4 Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((p, index) => {
                const IconComponent = p.icon;
                return (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:shadow-md hover:border-forest-300 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-forest-50 group-hover:bg-forest-600 group-hover:text-white text-forest-700 flex items-center justify-center flex-shrink-0 transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-stone-900 group-hover:text-forest-700 transition-colors">
                          {p.title}
                        </h4>
                        <p className="text-xs text-stone-500 mt-1 leading-snug">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary text-sm shadow-agri"
              >
                <span>Read Full About Us & Mission</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-stone-700 hover:text-forest-700 bg-white hover:bg-stone-50 border border-stone-300 shadow-sm transition-all"
              >
                <Target className="w-4 h-4 text-forest-600" />
                <span>Our Services</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Full "Read More" About Us Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-forest-100 flex items-center justify-center text-forest-700">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-black text-stone-900">
                    Akshara Farmer Producer Company Ltd.
                  </h3>
                  <p className="text-xs text-stone-500 font-semibold">
                    Registration No: CIN-U01111MH2016PTC284920 • Supported by SFAC & NABARD
                  </p>
                </div>
              </div>

              <div className="border-t border-stone-200 pt-4 space-y-4 text-stone-700 text-sm leading-relaxed">
                <h4 className="text-lg font-bold text-forest-800 flex items-center gap-2">
                  <Target className="w-5 h-5 text-harvest-500" />
                  Our Mission & Guiding Purpose
                </h4>
                <p>
                  To transform agriculture from a high-risk individual gamble into a profitable, climate-resilient, collective enterprise. We aim to double the net disposable income of our 5,000+ farmer members by reducing cultivation input costs by 20% and maximizing farmgate realization by 25%.
                </p>

                <h4 className="text-lg font-bold text-forest-800 flex items-center gap-2 pt-2">
                  <Eye className="w-5 h-5 text-harvest-500" />
                  Our Long-Term Vision
                </h4>
                <p>
                  To build a globally benchmarked farmer producer institution that champions sustainable soil health, seed sovereignty, decentralized cold storage infrastructure, and direct farm-to-consumer supply chains across India.
                </p>

                <h4 className="text-lg font-bold text-forest-800 flex items-center gap-2 pt-2">
                  <HeartHandshake className="w-5 h-5 text-harvest-500" />
                  Core Cooperative Values
                </h4>
                <ul className="space-y-2 pl-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                    <span><strong>100% Democratic Governance:</strong> Every farmer member holds equal voting and dividend rights regardless of acreage size.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Zero Adulteration Guarantee:</strong> Strict batch-testing of all distributed seeds, bio-fertilizers, and farm implements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Transparent Weighing & Instant Settlement:</strong> Zero commission deductions, verified digital scales, and 24-hr bank credits.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Soil Health & Ecological Stewardship:</strong> Promoting organic amendments, drip micro-irrigation, and reduced chemical dependency.</span>
                  </li>
                </ul>

                <div className="bg-forest-50 p-4 rounded-2xl border border-forest-200 flex flex-wrap items-center justify-between gap-4 mt-6">
                  <div>
                    <div className="font-bold text-forest-950 text-sm">Download FPC Annual Report & Charter</div>
                    <div className="text-xs text-forest-700">Audit reports, board of directors, and certified member guidelines (PDF)</div>
                  </div>
                  <a
                    href="#contact"
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-700 text-white font-bold text-xs hover:bg-forest-800 shadow-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Request Copy</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
