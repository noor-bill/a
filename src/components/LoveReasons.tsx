"use client";

import React, { useState } from "react";
import { Heart, Sparkles, RefreshCw, Star } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";
import confetti from "canvas-confetti";

export function LoveReasons() {
  const { reasons } = anniversaryConfig;
  const [currentSecretIndex, setCurrentSecretIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNextReason = (e: React.MouseEvent) => {
    setIsAnimating(true);
    setCurrentSecretIndex((prev) => (prev + 1) % reasons.secretReasons.length);
    setRevealedCount((prev) => prev + 1);

    // Mini heart burst at button
    try {
      confetti({
        particleCount: 20,
        spread: 50,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ["#f43f5e", "#fda4af", "#fbbf24"],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section id="reasons" className="relative py-20 px-4 sm:px-6 flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium mb-4 shadow-sm">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>My Favorite Things About You</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-bold text-white text-glow-rose leading-tight">
          {reasons.title}
        </h2>
        <p className="text-base sm:text-lg text-rose-200/80 font-light mt-3">
          {reasons.subtitle}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {/* The 4 Foundational Cards */}
        {reasons.foundations.map((item) => (
          <div
            key={item.id}
            className="group relative glass-romantic-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-rose-500/20 hover:border-pink-400/50 hover:shadow-xl hover:shadow-rose-950/40 transition-all duration-300 hover:-translate-y-1.5"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-2xl bg-rose-950/80 border border-rose-500/30 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                  {item.emoji}
                </span>
                <span className="text-xs font-mono font-medium text-rose-300/60 uppercase tracking-widest">
                  Reason 0{item.id}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif-romantic font-bold text-white mb-2 group-hover:text-rose-200 transition-colors">
                {item.title}
              </h3>

              <p className="text-sm sm:text-base text-rose-100/85 font-light leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-rose-500/15 flex items-center text-xs text-rose-300/60 italic">
              <span>Always in my heart</span>
            </div>
          </div>
        ))}

        {/* The 5th Interactive Card: Tap to Reveal More Reasons */}
        <div className="md:col-span-2 lg:col-span-2 group relative glass-gold-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-amber-400/40 shadow-2xl hover:border-amber-300/60 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold">
                  Interactive Love Box ✨
                </span>
                <span className="text-xs text-amber-200/70">
                  Revealed: #{revealedCount}
                </span>
              </div>
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin [animation-duration:6s]" />
            </div>

            <div
              className={`min-h-[90px] sm:min-h-[100px] flex items-center transition-all duration-300 ${
                isAnimating ? "opacity-30 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <p className="text-lg sm:text-2xl font-serif-romantic italic text-amber-100 leading-relaxed">
                &ldquo;{reasons.secretReasons[currentSecretIndex]}&rdquo;
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-amber-300/70 italic">
              Showing reason {currentSecretIndex + 1} of {reasons.secretReasons.length}
            </span>

            <button
              onClick={handleNextReason}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white font-semibold text-sm sm:text-base hover:from-amber-400 hover:to-pink-500 active:scale-95 transition-all shadow-lg shadow-amber-900/30 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-white animate-spin [animation-duration:10s]" />
              <span>{reasons.interactiveButton}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
