"use client";

import React, { useState } from "react";
import { PRODUCTS, PRODUCT_CATEGORIES, Product } from "@/data/website-data";
import ProductModal from "./ProductModal";
import {
  Sprout,
  FlaskConical,
  Tractor,
  Grid,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

interface ProductsSectionProps {
  onOpenInquiry?: (initialType?: string) => void;
}

export default function ProductsSection({ onOpenInquiry }: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Sprout":
        return <Sprout className="w-4 h-4" />;
      case "FlaskConical":
        return <FlaskConical className="w-4 h-4" />;
      case "Tractor":
        return <Tractor className="w-4 h-4" />;
      default:
        return <Grid className="w-4 h-4" />;
    }
  };

  return (
    <section id="products" className="py-20 bg-white relative border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-harvest-100 border border-harvest-300 text-harvest-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-harvest-600" />
            <span>100% Lab-Tested & Certified Seeds</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-stone-900 tracking-tight">
            Our Certified <span className="text-forest-700">Seed Varieties & Inputs</span>
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            From high-germination certified onion, maize, paddy, and pulse seeds to organic bio-fertilizers and drip kits.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-forest-700 text-white shadow-agri scale-[1.03]"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900"
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
                {cat.id !== "all" && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? "bg-forest-900 text-harvest-300" : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {PRODUCTS.filter((p) => p.category === cat.id).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl hover:border-forest-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              {/* Product Thumbnail */}
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-80" />

                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-forest-800/90 text-white shadow-sm backdrop-blur-sm">
                    {product.badge}
                  </span>
                </div>

                {product.subsidyAvailable && (
                  <div className="absolute top-3.5 right-3.5">
                    <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-black bg-harvest-400 text-stone-900 shadow-sm">
                      Govt Subsidy
                    </span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3.5 text-xs text-white/90 font-medium">
                  {product.categoryName}
                </div>
              </div>

              {/* Product Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-display font-black text-base text-stone-900 group-hover:text-forest-700 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
                    {product.shortDesc}
                  </p>
                </div>

                {/* Specs Highlights */}
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 space-y-1 text-[11px]">
                  {Object.entries(product.specifications).slice(0, 2).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between text-stone-600">
                      <span className="text-stone-400 font-medium truncate mr-2">{key}:</span>
                      <strong className="text-stone-800 truncate">{val}</strong>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full py-2.5 px-2 rounded-xl text-xs font-bold text-forest-800 bg-forest-50 hover:bg-forest-100 border border-forest-200 text-center transition-colors"
                  >
                    View Specs
                  </button>

                  <Link
                    href="/farmer-login"
                    className="w-full py-2.5 px-2 rounded-xl text-xs font-bold text-white bg-forest-700 hover:bg-forest-800 shadow-sm text-center transition-colors flex items-center justify-center gap-1"
                  >
                    <UserCheck className="w-3 h-3 text-harvest-300" />
                    <span>Order Seed</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Farmer Portal CTA Footer */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-forest-900 via-forest-800 to-forest-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs text-harvest-400 font-bold uppercase tracking-wider">
              Ready to Order Certified Seeds?
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-black">
              Log in to Farmer Portal for Real-Time Seed Stock & Instant Booking
            </h3>
            <p className="text-xs sm:text-sm text-earth-200 max-w-xl">
              Check real-time seed availability (kg), order with automatic stock deduction, and track your delivery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/farmer-login"
              className="btn-harvest text-xs sm:text-sm shadow-gold font-bold whitespace-nowrap"
            >
              <UserCheck className="w-4 h-4" />
              <span>👨‍🌾 Farmer Login & Order</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
