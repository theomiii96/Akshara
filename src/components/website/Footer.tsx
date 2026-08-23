"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
  Linkedin,
  ShieldCheck,
  Heart,
  ArrowUp,
  Sprout,
} from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterSuccess(false);
      setNewsletterEmail("");
    }, 3500);
  };

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Company", href: "#about" },
    { name: "Certified Seeds", href: "#products" },
    { name: "Bio-Fertilizers & Nutrients", href: "#products" },
    { name: "Produce Aggregation", href: "#services" },
    { name: "Farmer Training", href: "#services" },
  ];

  const farmerResources = [
    { name: "Crop & Seed Calculator", href: "#calculator" },
    { name: "Kisan News & Melas", href: "#updates" },
    { name: "Field Gallery", href: "#gallery" },
    { name: "Farmer Testimonials", href: "#testimonials" },
    { name: "Contact & Helpdesk", href: "#contact" },
    { name: "Farmer / Staff Login", href: "/login" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Membership", href: "#" },
    { name: "Seed Quality Guarantee", href: "#" },
    { name: "SFAC / NABARD Compliance", href: "#" },
  ];

  return (
    <footer className="bg-forest-950 text-earth-200 relative overflow-hidden border-t-4 border-harvest-500">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-forest-800/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-forest-900">
          {/* Col 1: Brand & Intro */}
          <div className="lg:col-span-4 space-y-5">
            <Logo variant="white" size="lg" />

            <p className="text-xs sm:text-sm text-earth-300 leading-relaxed max-w-sm">
              Akshara Farmer Producer Company Ltd. is a dedicated agricultural producer organization empowering 5,000+ smallholder farmers with certified high-yield seeds, fair market linkage, and modern agronomic training.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-forest-900 hover:bg-forest-700 text-earth-200 hover:text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-forest-900 hover:bg-forest-700 text-earth-200 hover:text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-forest-900 hover:bg-forest-700 text-earth-200 hover:text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-forest-900 hover:bg-forest-700 text-earth-200 hover:text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-forest-900 hover:bg-emerald-600 text-emerald-400 hover:text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            {/* Registration Tag */}
            <div className="text-[11px] text-earth-400 font-mono">
              CIN: U01111MH2016PTC284920 • Regd. with SFAC & NABARD
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-harvest-400" />
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-earth-300 hover:text-harvest-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Farmer Resources */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-harvest-400" />
              Farmer Portal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {farmerResources.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("/") ? (
                    <Link
                      href={link.href}
                      className="text-harvest-300 font-bold hover:text-harvest-200 transition-colors flex items-center gap-1.5"
                    >
                      <span>{link.name}</span>
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-earth-300 hover:text-harvest-400 transition-colors flex items-center gap-1.5"
                    >
                      <span>{link.name}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter & Direct Hotline */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-harvest-400" />
              Kisan Newsletter & Mandi Alerts
            </h4>

            <p className="text-xs text-earth-300 leading-relaxed">
              Subscribe to receive weekly crop advisory, certified seed booking dates, and live APMC mandi rates.
            </p>

            {newsletterSuccess ? (
              <div className="p-3.5 rounded-xl bg-forest-900 border border-forest-700 text-xs text-emerald-300 flex items-center gap-2 animate-fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Thank you! You are subscribed to Krishi Alerts.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex items-center rounded-xl bg-forest-900 border border-forest-800 focus-within:border-harvest-500 overflow-hidden p-1">
                  <input
                    type="email"
                    required
                    placeholder="Enter mobile or email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="btn-harvest text-xs py-2 px-3 rounded-lg font-bold shadow-none"
                  >
                    <span>Subscribe</span>
                  </button>
                </div>
              </form>
            )}

            {/* Direct Contact Snippet */}
            <div className="pt-2 space-y-1.5 text-xs text-earth-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-harvest-400" />
                <span>Helpline: <strong>1800-889-2345</strong> (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-forest-400" />
                <span>Email: support@aksharafpc.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-earth-400 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} <strong>Akshara Farmer Producer Company Ltd.</strong> All Rights Reserved.
            <span className="hidden sm:inline"> • Empowering Farmers, Enriching Agriculture.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            {legalLinks.map((item, idx) => (
              <a key={idx} href={item.href} className="hover:text-harvest-400 transition-colors">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
