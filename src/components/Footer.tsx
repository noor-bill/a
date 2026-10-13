"use client";

import React from "react";
import { Heart, Sparkles, ArrowUp } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";

export function Footer() {
  const { anniversaryDate } = anniversaryConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-14 px-4 sm:px-6 border-t border-rose-500/20 bg-gradient-to-b from-transparent to-black/80 flex flex-col items-center text-center">
      <div className="max-w-xl flex flex-col items-center">
        {/* Heart logo */}
        <div className="w-12 h-12 rounded-full bg-rose-950/70 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 shadow-lg animate-pulse-soft">
          <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
        </div>

        <p className="text-xl sm:text-2xl font-serif-romantic font-bold text-white mb-2 text-glow-rose">
          Four Months Down, Forever To Go.
        </p>

        <p className="text-sm sm:text-base text-rose-200/80 font-light max-w-md mb-6 leading-relaxed">
          Crafted with endless love, silly jokes, and genuine devotion for my beautiful wife on {anniversaryDate}.
        </p>

        <div className="flex items-center gap-2 text-xs text-rose-400/70 font-mono tracking-widest uppercase mb-6">
          <span>Husband & Wife</span>
          <span>•</span>
          <span>Forever & Always</span>
          <span>•</span>
          <span>100% Love</span>
        </div>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/20 text-xs text-rose-300 transition-all hover:scale-105"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to Top</span>
        </button>
      </div>
    </footer>
  );
}
