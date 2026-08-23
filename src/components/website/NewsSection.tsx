"use client";

import React, { useState } from "react";
import { NEWS_UPDATES, NewsItem } from "@/data/website-data";
import NewsModal from "./NewsModal";
import {
  Newspaper,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight,
  BookOpen,
} from "lucide-react";

export default function NewsSection() {
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  return (
    <section id="updates" className="py-20 bg-white relative border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-100 border border-forest-300 text-forest-800 text-xs font-bold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5 text-forest-600" />
            <span>Kisan Bulletins & Agronomy News</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-stone-900 tracking-tight">
            Latest Updates & <span className="text-forest-700">Farmer Stories</span>
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Stay informed with our recent field events, seed launches, government subsidy alerts, and inspiring farmer case studies.
          </p>
        </div>

        {/* 4 News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {NEWS_UPDATES.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-forest-300 transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-60" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-forest-800/90 text-white shadow-sm backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] font-semibold text-stone-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-forest-600" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-harvest-600" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base text-stone-900 group-hover:text-forest-700 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                {/* Read Full Link */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-forest-700 group-hover:text-forest-900">
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Article Modal */}
      {selectedArticle && (
        <NewsModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </section>
  );
}
