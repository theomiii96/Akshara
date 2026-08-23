"use client";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import {
  Menu,
  X,
  PhoneCall,
  ChevronRight,
  UserCheck,
  Building2,
} from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onOpenInquiry?: (initialType?: string) => void;
}

export default function Navbar({ onOpenInquiry }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ["home", "about", "products", "services", "calculator", "updates", "gallery", "testimonials", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Certified Seeds", href: "#products" },
    { name: "Services", href: "#services" },
    { name: "Latest Updates", href: "#updates" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-forest-100 py-3"
          : "bg-white border-b border-stone-200 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Company Logo */}
          <a href="#home" className="group flex items-center">
            <Logo size="md" />
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-forest-700 bg-forest-50/80 font-bold"
                      : "text-stone-700 hover:text-forest-700 hover:bg-stone-50"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop 2-Option Login Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* 1st Option: Farmer Login */}
            <Link
              href="/farmer-login"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-harvest-400 hover:bg-harvest-500 shadow-md transition-all hover:scale-[1.02]"
            >
              <UserCheck className="w-4 h-4 text-slate-900" />
              <span>👨‍🌾 Farmer Login</span>
            </Link>

            {/* 2nd Option: Company Admin Login */}
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-forest-700 hover:bg-forest-800 shadow-agri transition-all hover:scale-[1.02]"
            >
              <Building2 className="w-4 h-4 text-harvest-300" />
              <span>🏢 Admin Login</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/farmer-login"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 bg-harvest-400 shadow-sm"
            >
              Farmer Login
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-forest-700 hover:bg-forest-50 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-stone-900" />
              ) : (
                <Menu className="w-6 h-6 text-stone-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-50 bg-stone-950/60 backdrop-blur-sm lg:hidden animate-fade-in">
          <div className="bg-white border-b border-stone-200 shadow-2xl px-6 py-6 max-h-[85vh] overflow-y-auto">
            {/* 2 Big Login Options Box for Mobile */}
            <div className="mb-6 p-4 rounded-2xl bg-forest-50 border border-forest-200 space-y-2.5">
              <div className="text-xs font-bold text-forest-900 uppercase tracking-wider text-center mb-1">
                Choose Login Option
              </div>
              <Link
                href="/farmer-login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-harvest-500 text-slate-900 font-extrabold text-sm shadow-md"
              >
                <UserCheck className="w-4 h-4" />
                <span>1st Option: 👨‍🌾 Farmer Login & Orders</span>
              </Link>
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest-800 text-white font-bold text-sm shadow-sm"
              >
                <Building2 className="w-4 h-4 text-harvest-400" />
                <span>2nd Option: 🏢 Admin / Company Login</span>
              </Link>
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-forest-50 text-forest-800 font-bold border border-forest-200"
                        : "text-stone-800 hover:bg-stone-50"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? "text-forest-700" : "text-stone-400"}`} />
                  </a>
                );
              })}
            </div>

            {/* Helpline Footer */}
            <div className="mt-6 pt-4 border-t border-stone-200">
              <div className="p-4 rounded-2xl bg-forest-950 text-white flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-harvest-400 font-bold">24/7 KISAN HELPLINE</div>
                  <div className="text-sm font-black">1800-889-2345</div>
                </div>
                <a
                  href="tel:18008892345"
                  className="w-9 h-9 rounded-xl bg-forest-700 flex items-center justify-center hover:bg-forest-600 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
