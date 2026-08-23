"use client";

import React, { useState, useEffect } from "react";
import { TESTIMONIALS } from "@/data/website-data";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  Sprout,
  HeartHandshake,
} from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = TESTIMONIALS.length;

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, total]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % total);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-earth-50 relative overflow-hidden border-b border-stone-200">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-soil-pattern opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-harvest-100 border border-harvest-300 text-harvest-900 text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5 text-harvest-600" />
            <span>Voices From The Soil</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-stone-900 tracking-tight">
            Farmer <span className="text-forest-700">Testimonials</span>
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Real stories of transformation, higher crop yields, and fair farmgate realizations from our farmer members.
          </p>
        </div>

        {/* Testimonial Carousel Card */}
        <div
          className="max-w-4xl mx-auto bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden p-6 sm:p-10 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Quote className="absolute top-6 right-6 w-16 h-16 text-forest-100/80 -rotate-12 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Farmer Photo & Info */}
            <div className="md:col-span-4 text-center md:text-left space-y-4">
              <div className="relative inline-block mx-auto">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-forest-100 shadow-md mx-auto">
                  <img
                    src={activeTestimonial.image}
                    alt={activeTestimonial.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-forest-700 text-white flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-4 h-4 text-harvest-300" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-display font-black text-stone-900">
                  {activeTestimonial.name}
                </h3>
                <div className="flex items-center justify-center md:justify-start gap-1 text-xs font-semibold text-stone-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-forest-600 flex-shrink-0" />
                  <span>{activeTestimonial.village}, {activeTestimonial.district}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-1 text-xs text-forest-700 font-bold mt-1">
                  <Sprout className="w-3.5 h-3.5" />
                  <span>{activeTestimonial.crop}</span>
                </div>
              </div>

              {/* Impact Pill */}
              <div className="inline-block px-3 py-1.5 rounded-xl bg-forest-50 border border-forest-200 text-forest-800 text-xs font-extrabold shadow-sm">
                {activeTestimonial.increasePercent}
              </div>
            </div>

            {/* Testimonial Quote & Rating */}
            <div className="md:col-span-8 space-y-5">
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-harvest-400 text-harvest-400"
                  />
                ))}
                <span className="ml-2 text-xs font-bold text-stone-500">
                  Verified FPC Shareholder
                </span>
              </div>

              {/* Quote text */}
              <p className="text-base sm:text-lg text-stone-700 italic font-sans leading-relaxed">
                "{activeTestimonial.quote}"
              </p>

              <div className="pt-2 text-xs font-bold text-stone-400">
                {activeTestimonial.experience} • Member Since {activeTestimonial.memberSince}
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
            {/* Indicators */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex
                      ? "w-8 h-2 bg-forest-700"
                      : "w-2 h-2 bg-stone-300 hover:bg-stone-400"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-xl bg-forest-700 hover:bg-forest-800 text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
