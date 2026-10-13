"use client";

import React, { useState } from "react";
import { Smile, AlertCircle, Sparkles, HeartHandshake, Eye, X } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";
import confetti from "canvas-confetti";

export function TeasingSection() {
  const { teasing } = anniversaryConfig;
  const [showConfessions, setShowConfessions] = useState(false);

  const handleExpose = () => {
    setShowConfessions(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#fb7185", "#f43f5e", "#fbbf24"],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="teasing" className="relative py-20 px-4 sm:px-6 flex flex-col items-center">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[550px] bg-pink-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium mb-4 shadow-sm">
          <Smile className="w-3.5 h-3.5 text-amber-300" />
          <span>Husband-Wife Reality Check</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-bold text-white text-glow-rose leading-tight">
          {teasing.title}
        </h2>
        <p className="text-base sm:text-lg text-rose-200/80 font-light mt-3">
          {teasing.subtitle}
        </p>
      </div>

      {/* Grid of Rules Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {teasing.rules.map((rule, idx) => (
          <div
            key={idx}
            className="group relative glass-romantic-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-rose-500/20 hover:border-pink-400/50 hover:shadow-xl hover:shadow-rose-950/40 transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* Top header of card */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-rose-950/80 text-rose-300 text-xs font-semibold tracking-wider border border-rose-500/30">
                {rule.number}
              </span>
              <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                {rule.emoji}
              </span>
            </div>

            {/* Quote content */}
            <p className="text-base sm:text-lg text-rose-50 font-serif-romantic leading-relaxed my-2">
              &ldquo;{rule.quote}&rdquo;
            </p>

            {/* Tag footer */}
            <div className="mt-4 pt-3 border-t border-rose-500/15 flex items-center justify-between text-xs text-rose-300/70">
              <span className="italic">{rule.tag}</span>
              <span className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Verified Truth ✔
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* "Expose My Husband" Button */}
      <div className="mt-12 text-center">
        <button
          onClick={handleExpose}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-500 hover:to-amber-500 shadow-xl shadow-rose-950/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-300/30 cursor-pointer"
        >
          <Eye className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
          <span>{teasing.exposeButton}</span>
          <span className="text-xl">😏</span>
        </button>
        <p className="text-xs text-rose-300/60 mt-2 italic">
          (Warning: Contains 100% voluntary husband confessions)
        </p>
      </div>

      {/* Confessions Modal / Popup */}
      {showConfessions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative max-w-xl w-full glass-romantic rounded-3xl p-6 sm:p-8 border border-rose-400/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-rose-500/20">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🕵️‍♂️</span>
                <h3 className="text-xl sm:text-2xl font-serif-romantic font-bold text-white text-glow-rose">
                  Official Husband Confessions
                </h3>
              </div>
              <button
                onClick={() => setShowConfessions(false)}
                className="text-rose-300/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable confessions list */}
            <div className="overflow-y-auto space-y-4 py-4 pr-1">
              {teasing.confessions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-black/40 border border-rose-500/20 flex flex-col gap-2 hover:border-rose-400/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">{item.emoji}</span>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base text-rose-100 font-medium leading-relaxed">
                        &ldquo;{item.confession}&rdquo;
                      </p>
                      <p className="text-xs text-amber-300/90 italic font-mono mt-2 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>Husband Defense: {item.husbandComment}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Close button */}
            <div className="pt-4 border-t border-rose-500/20 flex justify-center">
              <button
                onClick={() => setShowConfessions(false)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-medium text-sm hover:scale-105 active:scale-95 transition-transform"
              >
                I Forgive You (For Now) 😌❤️
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
