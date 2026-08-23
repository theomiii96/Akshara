"use client";

import React, { useState, useEffect, useRef } from "react";
import { HERO_SLIDES } from "@/data/website-data";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sprout,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  UserCheck,
  Building2,
  TrendingUp,
  Award,
} from "lucide-react";
import Link from "next/link";

interface HeroSliderProps {
  onOpenInquiry?: (initialType?: string) => void;
}

export default function HeroSlider({ onOpenInquiry }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const totalSlides = HERO_SLIDES.length;

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 50) nextSlide();
    if (diffX < -50) prevSlide();
    touchStartX.current = null;
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div
      id="home"
      className="relative w-full overflow-hidden bg-forest-950 text-white min-h-[600px] lg:min-h-[660px] flex flex-col justify-between select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides */}
      {HERO_SLIDES.map((s, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
            } transform transition-transform duration-1000`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${s.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/85 to-transparent lg:w-4/5" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
            <div className="absolute inset-0 bg-stone-950/30 backdrop-brightness-95" />
          </div>
        );
      })}

      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-harvest-500/10 rounded-full blur-3xl pointer-events-none z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-forest-500/10 rounded-full blur-3xl pointer-events-none z-10" />

      {/* Main Hero Content & 2-Option Login Box */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left: Text & Taglines */}
          <div className="lg:col-span-7 space-y-5 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/80 border border-forest-600/50 backdrop-blur-md text-harvest-400 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-inner">
              <Sparkles className="w-4 h-4 text-harvest-400" />
              <span>{slide.tag}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="text-xs sm:text-sm font-bold text-harvest-300 tracking-widest uppercase">
              {slide.subtitle}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-[1.12]">
              {slide.title}
            </h1>

            <p className="text-sm sm:text-base text-earth-200 font-sans leading-relaxed max-w-xl">
              {slide.description}
            </p>

            {/* Bullet Highlights */}
            <div className="flex flex-wrap gap-y-2 gap-x-6 pt-1">
              {slide.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-harvest-400 flex-shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Prominent 2-Option Login Box */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/30 text-stone-900 space-y-4">
              <div className="text-center space-y-1 pb-3 border-b border-stone-200">
                <span className="inline-block px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-[11px] font-extrabold uppercase tracking-wider">
                  Select Your Portal Access
                </span>
                <h3 className="text-xl font-display font-black text-stone-900">
                  Welcome to Akshara FPC
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  Choose your login option below to continue
                </p>
              </div>

              {/* 1st Option: Farmer Login */}
              <Link
                href="/farmer-login"
                className="group block p-4 rounded-2xl bg-gradient-to-r from-harvest-500 to-amber-500 hover:from-harvest-600 hover:to-amber-600 text-slate-950 font-bold shadow-lg transition-all duration-300 hover:scale-[1.02] border border-harvest-400"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 text-harvest-400 flex items-center justify-center shadow-md">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-900/80 uppercase font-black tracking-wider">Option 1</div>
                      <div className="text-base font-black leading-tight">👨‍🌾 Farmer Login</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-slate-950" />
                </div>
                <div className="text-[11px] text-slate-900 font-semibold mt-2 pt-2 border-t border-slate-950/15">
                  Order certified seeds, check live stock & track orders
                </div>
              </Link>

              {/* 2nd Option: Company Admin Login */}
              <Link
                href="/login"
                className="group block p-4 rounded-2xl bg-forest-900 hover:bg-forest-950 text-white font-bold shadow-md transition-all duration-300 hover:scale-[1.02] border border-forest-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-forest-800 text-harvest-400 flex items-center justify-center border border-forest-600">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-harvest-400 uppercase font-bold tracking-wider">Option 2</div>
                      <div className="text-base font-black leading-tight text-white">🏢 Company Admin Login</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-harvest-400" />
                </div>
                <div className="text-[11px] text-earth-300 font-normal mt-2 pt-2 border-t border-forest-800">
                  Manage company details, add seed stocks & process orders
                </div>
              </Link>

              <div className="text-center text-[11px] text-stone-500 font-medium pt-1">
                24/7 Kisan Helpline: <strong className="text-forest-700 font-bold">1800-889-2345</strong> (Toll Free)
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Slider Indicators & Controls */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? "w-8 h-2 bg-harvest-400 shadow-sm"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-9 h-9 rounded-xl bg-forest-900/80 hover:bg-forest-800 border border-forest-700/80 flex items-center justify-center text-white transition-all shadow-md"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="w-9 h-9 rounded-xl bg-forest-900/80 hover:bg-forest-800 border border-forest-700/80 flex items-center justify-center text-white transition-all shadow-md"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Feature Bar */}
      <div className="relative z-20 w-full bg-forest-900/90 border-t border-forest-800/80 backdrop-blur-md py-3 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-earth-100">
            <ShieldCheck className="w-4 h-4 text-harvest-400 flex-shrink-0" />
            <span>Govt Seed Certified</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-earth-100">
            <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>100% Seed Purity Standard</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-earth-100">
            <Award className="w-4 h-4 text-harvest-400 flex-shrink-0" />
            <span>5,000+ Member Network</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-earth-100">
            <Sprout className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Free Soil & Crop Advisory</span>
          </div>
        </div>
      </div>
    </div>
  );
}
