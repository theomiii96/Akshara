"use client";

import React, { useState } from "react";
import { SERVICES, Service } from "@/data/website-data";
import {
  Sprout,
  TrendingUp,
  GraduationCap,
  PhoneCall,
  Landmark,
  Tractor,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  X,
  Phone,
} from "lucide-react";

interface ServicesSectionProps {
  onOpenInquiry?: (initialType?: string) => void;
}

export default function ServicesSection({ onOpenInquiry }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getServiceIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-forest-700 group-hover:text-white transition-colors" };
    switch (iconName) {
      case "Sprout":
        return <Sprout {...props} />;
      case "TrendingUp":
        return <TrendingUp {...props} />;
      case "GraduationCap":
        return <GraduationCap {...props} />;
      case "PhoneCall":
        return <PhoneCall {...props} />;
      case "Landmark":
        return <Landmark {...props} />;
      case "Tractor":
        return <Tractor {...props} />;
      default:
        return <Sprout {...props} />;
    }
  };

  return (
    <section id="services" className="py-20 bg-stone-50 relative border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-100 border border-forest-300 text-forest-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-forest-600" />
            <span>End-to-End Agri Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-stone-900 tracking-tight">
            Comprehensive <span className="text-forest-700">Farmer Services</span>
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Supporting farmer members at every step — from seed selection and soil enrichment to aggregation and direct market sale.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-forest-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
            >
              <div>
                {/* Header: Icon & Badge */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="w-13 h-13 p-3.5 rounded-2xl bg-forest-50 group-hover:bg-forest-700 flex items-center justify-center transition-colors shadow-sm">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-forest-50 text-forest-800 border border-forest-200">
                    {service.badge}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-display font-black text-stone-900 group-hover:text-forest-700 transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Key Bullet Features */}
                <div className="mt-5 pt-4 border-t border-stone-100 space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Stat & Action */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-forest-800 bg-forest-50/80 px-2.5 py-1 rounded-lg">
                  {service.stats}
                </span>

                <button
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-forest-700 hover:text-forest-900 group-hover:translate-x-1 transition-all"
                >
                  <span>Learn Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Helpline Banner */}
        <div className="mt-14 p-6 rounded-3xl bg-forest-900 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 border border-forest-800">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-forest-800 flex items-center justify-center text-harvest-400 flex-shrink-0 hidden sm:flex">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-base font-bold font-display">
                Need Immediate Agronomy Support or Pest Diagnosis?
              </div>
              <div className="text-xs text-earth-200">
                Call our 24/7 Farmer Support Desk at <strong className="text-harvest-400">1800-889-2345</strong> or send crop photos on WhatsApp.
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="btn-harvest text-xs sm:text-sm font-bold shadow-md whitespace-nowrap"
          >
            <span>WhatsApp Crop Photo</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
              aria-label="Close Service Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-forest-100 flex items-center justify-center text-forest-700">
                  {getServiceIcon(selectedService.icon)}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-forest-50 text-forest-800 border border-forest-200">
                    {selectedService.badge}
                  </span>
                  <h3 className="text-2xl font-display font-black text-stone-900 mt-1">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-stone-700 text-sm leading-relaxed border-t border-stone-200 pt-4">
                <p>{selectedService.longDesc}</p>

                <h4 className="font-bold text-forest-900 text-sm">Key Benefits for Farmer Members:</h4>
                <ul className="space-y-2">
                  {selectedService.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-forest-50 p-4 rounded-2xl border border-forest-200 flex items-center justify-between mt-6">
                  <div>
                    <div className="text-xs text-forest-600 font-bold uppercase">Impact Record</div>
                    <div className="text-base font-black text-forest-950">{selectedService.stats}</div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      if (onOpenInquiry) onOpenInquiry("service");
                      else window.location.hash = "#contact";
                    }}
                    className="btn-primary text-xs py-2.5 px-4"
                  >
                    <span>Request This Service</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
