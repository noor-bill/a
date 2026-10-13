"use client";

import React, { useState } from "react";
import { Quote, Sparkles, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";
import confetti from "canvas-confetti";

export function LoveQuotes() {
  const { quotes } = anniversaryConfig;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const quote = quotes.list[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.list.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.list.length) % quotes.list.length);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    setFavorites((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex],
    }));

    try {
      confetti({
        particleCount: 20,
        spread: 45,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ["#fb7185", "#f43f5e"],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="quotes" className="relative py-20 px-4 sm:px-6 flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-amber-950/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium mb-4 shadow-sm">
          <Quote className="w-3.5 h-3.5 text-amber-300" />
          <span>Words For You</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-bold text-white text-glow-rose leading-tight">
          {quotes.title}
        </h2>
        <p className="text-base sm:text-lg text-rose-200/80 font-light mt-3">
          {quotes.subtitle}
        </p>
      </div>

      {/* Quote Display Card */}
      <div className="relative max-w-3xl w-full">
        {/* Ambient border glow */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-rose-500/20 via-amber-500/30 to-pink-500/20 blur-lg opacity-75" />

        <div className="relative glass-gold-card rounded-3xl p-8 sm:p-14 border border-amber-400/40 shadow-2xl flex flex-col items-center text-center">
          {/* Top Tag & Favorite Button */}
          <div className="w-full flex items-center justify-between mb-8">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold tracking-wider uppercase border border-amber-400/30">
              {quote.tag}
            </span>

            <button
              onClick={toggleFavorite}
              className="p-2.5 rounded-full bg-rose-950/60 hover:bg-rose-900 border border-rose-400/30 text-rose-200 transition-all hover:scale-110 active:scale-95"
              aria-label="Save as favorite"
            >
              <Heart
                className={`w-4 h-4 ${
                  favorites[currentIndex]
                    ? "fill-rose-500 text-rose-500"
                    : "text-rose-200"
                }`}
              />
            </button>
          </div>

          {/* Large Quote Mark */}
          <Quote className="w-12 h-12 text-amber-400/40 mb-6 rotate-180" />

          {/* The Quote Text */}
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif-romantic text-white font-medium leading-relaxed mb-8 max-w-2xl min-h-[120px] flex items-center justify-center">
            &ldquo;{quote.quote}&rdquo;
          </blockquote>

          {/* Author */}
          <div className="flex flex-col items-center">
            <span className="text-sm sm:text-base font-handwriting text-2xl text-amber-200">
              — {quote.author} ❤️
            </span>
            <span className="text-xs text-rose-300/60 mt-1">
              October 14, 2026
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="w-full mt-10 pt-6 border-t border-amber-500/20 flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 border border-rose-500/30 text-rose-200 text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {quotes.list.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-6 bg-amber-400"
                      : "w-2 bg-rose-900/60 hover:bg-rose-700/60"
                  }`}
                  aria-label={`Go to quote ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 border border-rose-500/30 text-rose-200 text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
