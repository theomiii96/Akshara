"use client";

import React, { useState } from "react";
import { Product } from "@/data/website-data";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Package,
  Calendar,
  Sparkles,
  Phone,
  Send,
  Leaf,
  Check,
} from "lucide-react";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    quantity: "",
    village: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 shadow-md transition-colors"
          aria-label="Close Product Details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Image & Highlights */}
          <div className="md:col-span-5 relative bg-stone-100 min-h-[260px] md:min-h-[450px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-5 left-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-forest-800 shadow-md">
                <Leaf className="w-3.5 h-3.5 text-forest-600" />
                {product.categoryName}
              </span>
            </div>

            {/* Bottom Tag */}
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="text-xs font-bold text-harvest-300 uppercase tracking-wider">
                {product.badge}
              </div>
              <div className="text-base font-bold font-display mt-0.5">
                {product.name}
              </div>
            </div>
          </div>

          {/* Right Column: Full Details & Order Booking */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-forest-700 uppercase tracking-wider mb-1">
                <span>{product.badge}</span>
                {product.subsidyAvailable && (
                  <span className="px-2 py-0.5 rounded bg-harvest-100 text-harvest-800 text-[10px] font-extrabold">
                    Subsidy Available
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-display font-black text-stone-900 leading-tight">
                {product.name}
              </h3>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                {product.fullDesc}
              </p>
            </div>

            {/* Technical Specifications Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Technical Specifications & Testing Standards
              </h4>
              <div className="grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-2xl border border-stone-200">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="text-xs">
                    <span className="text-stone-500 block">{key}:</span>
                    <strong className="text-stone-800 font-semibold">{val}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Pack Sizes & Season */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              {product.packSizes && (
                <div className="flex items-center gap-1.5 text-stone-700">
                  <Package className="w-4 h-4 text-forest-600" />
                  <span><strong>Available Packs:</strong> {product.packSizes.join(", ")}</span>
                </div>
              )}
              {product.season && (
                <div className="flex items-center gap-1.5 text-stone-700">
                  <Calendar className="w-4 h-4 text-harvest-600" />
                  <span><strong>Recommended Season:</strong> {product.season}</span>
                </div>
              )}
            </div>

            {/* Quick Inquiry / Booking Form */}
            <div className="border-t border-stone-200 pt-5">
              <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-harvest-500" />
                Book Seed Order / Request Member Price Quote
              </h4>

              {submitted ? (
                <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200 text-forest-800 text-center space-y-1 animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-forest-600 text-white flex items-center justify-center mx-auto mb-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-sm">Inquiry Received Successfully!</div>
                  <div className="text-xs text-forest-700">
                    Our village coordinator will call you within 2 hours with seed availability & member subsidy pricing.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Village / Tehsil"
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
                    />
                    <input
                      type="text"
                      placeholder="Estimated Acreage / Quantity"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary text-xs py-3 justify-center shadow-agri"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Booking Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
