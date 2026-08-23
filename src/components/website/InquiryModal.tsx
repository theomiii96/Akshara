"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Send,
  CheckCircle2,
  Sprout,
  Phone,
  User,
  MapPin,
  FileText,
  Sparkles,
} from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
  initialCrop?: string;
}

export default function InquiryModal({
  isOpen,
  onClose,
  initialType = "general",
  initialCrop = "",
}: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    village: "",
    district: "",
    inquiryType: "seeds",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialType) {
      setFormData((prev) => ({
        ...prev,
        inquiryType: initialType,
        notes: initialCrop ? `Interested in booking certified seeds for: ${initialCrop}` : "",
      }));
    }
  }, [initialType, initialCrop, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
          aria-label="Close Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-forest-100 flex items-center justify-center text-forest-700">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900">
              Farmer Inquiry & Booking
            </h3>
            <p className="text-xs text-stone-500 font-semibold">
              Akshara Farmer Producer Company Ltd.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-forest-50 border border-forest-200 text-center space-y-3 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-forest-600 text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-forest-950 font-display">
              Inquiry Submitted Successfully!
            </h4>
            <p className="text-xs text-forest-800 leading-relaxed max-w-xs mx-auto">
              Thank you, <strong>{formData.name}</strong>. Our local FPC field coordinator will contact you at <strong>{formData.phone}</strong> within 2 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patil"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                Phone / WhatsApp Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Village / Town
                </label>
                <input
                  type="text"
                  placeholder="e.g. Niphad"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  District
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nashik"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                Inquiry Type
              </label>
              <select
                value={formData.inquiryType}
                onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white font-medium text-stone-800"
              >
                <option value="seeds">Certified Seed Booking & Subsidies</option>
                <option value="membership">Join as FPC Shareholder Member</option>
                <option value="fertilizers">Bio-Fertilizers & Soil Nutrition</option>
                <option value="produce">Sell Farm Produce (Direct Aggregation)</option>
                <option value="service">Custom Machinery Rental / Soil Test</option>
                <option value="bulk">Wholesale / Institutional B2B Quote</option>
                <option value="general">General Agronomy Advisory</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                Message / Crop Details
              </label>
              <textarea
                rows={2}
                placeholder="Mention crop, acreage, or any specific requirements..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary text-sm py-3 justify-center shadow-agri mt-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Farmer Inquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
