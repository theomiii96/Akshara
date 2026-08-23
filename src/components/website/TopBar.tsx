"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  Clock,
  Globe,
  LogIn,
  UserCheck,
  Building2,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";

export default function TopBar() {
  const [selectedLang, setSelectedLang] = useState("English");
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी (Hindi)" },
    { code: "mr", label: "मराठी (Marathi)" },
    { code: "te", label: "తెలుగు (Telugu)" },
  ];

  return (
    <div className="bg-forest-950 text-earth-100 text-xs border-b border-forest-900/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          {/* Left: Contact Details */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <a
              href="tel:18008892345"
              className="flex items-center gap-1.5 hover:text-harvest-400 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-harvest-400 animate-pulse" />
              <span>
                Kisan Helpline: <strong className="text-white">1800-889-2345</strong> (Toll Free)
              </span>
            </a>

            <a
              href="mailto:support@aksharafpc.org"
              className="hidden sm:flex items-center gap-1.5 hover:text-harvest-400 transition-colors text-earth-200"
            >
              <Mail className="w-3.5 h-3.5 text-forest-400" />
              <span>support@aksharafpc.org</span>
            </a>

            <div className="hidden md:flex items-center gap-1.5 text-earth-300">
              <Clock className="w-3.5 h-3.5 text-forest-400" />
              <span>Mon - Sat: 8:00 AM - 7:00 PM</span>
            </div>
          </div>

          {/* Right: 2 Distinct Login Buttons (Farmer & Admin) + Language */}
          <div className="flex items-center gap-2 ml-auto sm:ml-0">
            {/* Language Switcher Dropdown */}
            <div className="relative mr-1">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded bg-forest-900/80 hover:bg-forest-800 text-earth-200 transition-colors"
                aria-label="Select Language"
              >
                <Globe className="w-3 h-3 text-harvest-400" />
                <span className="font-medium">{selectedLang}</span>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-forest-900 border border-forest-700 rounded-lg shadow-xl py-1 z-50 animate-fade-in">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang.label.split(" ")[0]);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-forest-800 transition-colors ${
                        selectedLang === lang.label.split(" ")[0]
                          ? "text-harvest-400 font-bold bg-forest-800/60"
                          : "text-earth-200"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 1st Option: Farmer Login */}
            <Link
              href="/farmer-login"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-harvest-500 hover:bg-harvest-600 text-slate-900 font-bold shadow-sm transition-all hover:scale-[1.02]"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>👨‍🌾 Farmer Login</span>
            </Link>

            {/* 2nd Option: Admin Login */}
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-forest-800 hover:bg-forest-700 text-harvest-300 font-semibold border border-forest-700 shadow-sm transition-all hover:scale-[1.02]"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>🏢 Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
