"use client";

import React from "react";
import { NewsItem } from "@/data/website-data";
import {
  X,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Bookmark,
  ChevronRight,
  Sprout,
} from "lucide-react";

interface NewsModalProps {
  article: NewsItem | null;
  onClose: () => void;
}

export default function NewsModal({ article, onClose }: NewsModalProps) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          aria-label="Close Article"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Category & Metadata */}
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-stone-500 mb-2">
              <span className="px-3 py-1 rounded-full bg-forest-100 text-forest-800 font-bold uppercase tracking-wider">
                {article.category}
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-forest-600" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-harvest-600" />
                <span>{article.readTime}</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-black text-stone-900 leading-tight">
              {article.title}
            </h2>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-stone-100 text-xs text-stone-600">
              <User className="w-4 h-4 text-forest-600" />
              <span>
                By <strong>{article.author}</strong> ({article.authorRole})
              </span>
            </div>
          </div>

          {/* Article Featured Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-stone-100">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Full Article Content */}
          <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-stone-200">
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-stone-400" />
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 text-stone-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
