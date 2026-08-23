"use client";

import React, { useState } from "react";
import { GALLERY_ITEMS, GalleryItem } from "@/data/website-data";
import {
  Image as ImageIcon,
  Sparkles,
  X,
  Maximize2,
  Calendar,
  Layers,
} from "lucide-react";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "seeds", label: "Seed Production" },
    { id: "harvest", label: "Harvest & Mandi" },
    { id: "training", label: "Farmer Workshops" },
    { id: "farms", label: "Farm Infrastructure" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-white relative border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-100 border border-forest-300 text-forest-800 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5 text-forest-600" />
            <span>Visual Glimpses of Ground Action</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-stone-900 tracking-tight">
            Our Field & <span className="text-forest-700">FPC Gallery</span>
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Snapshots of our breeder seed trial plots, village aggregation drives, drone demonstrations, and annual farmer conventions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-forest-700 text-white shadow-agri scale-[1.02]"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-sm hover:shadow-xl cursor-pointer border border-stone-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top Category Tag */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-forest-800/90 text-white backdrop-blur-sm shadow-sm">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-xs font-bold font-display line-clamp-1 group-hover:text-harvest-300 transition-colors">
                  {item.title}
                </div>
                <div className="text-[10px] text-earth-300 mt-0.5 line-clamp-1">
                  {item.caption}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fade-in">
          <div className="bg-stone-900 text-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-stone-700 relative">
            {/* Close Button */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="relative aspect-[16/10] bg-black">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="w-full h-full object-contain object-center"
              />
            </div>

            {/* Description Bar */}
            <div className="p-6 bg-stone-900 border-t border-stone-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-harvest-400">
                <span className="uppercase">{lightboxItem.categoryLabel}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-stone-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {lightboxItem.date}
                </span>
              </div>
              <h3 className="text-xl font-display font-black text-white">
                {lightboxItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {lightboxItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
