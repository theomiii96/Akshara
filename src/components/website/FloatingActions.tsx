"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, ArrowUp, PhoneCall } from "lucide-react";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Floating Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-2xl bg-white hover:bg-forest-50 text-forest-800 border border-stone-200 shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href="https://wa.me/919876543210?text=Hello%20Akshara%20Farmer%20Producer%20Company,%20I%20want%20to%20inquire%20about%20certified%20seeds%20and%20farmer%20services."
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Chat with Agronomist on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span className="text-xs font-bold hidden sm:inline group-hover:inline">
          Kisan WhatsApp
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-harvest-400 border-2 border-white" />
      </a>
    </div>
  );
}
