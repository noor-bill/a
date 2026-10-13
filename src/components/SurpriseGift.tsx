"use client";

import React, { useState } from "react";
import { Gift, Heart, Sparkles, PartyPopper } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";
import confetti from "canvas-confetti";

export function SurpriseGift() {
  const { surprise } = anniversaryConfig;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenGift = () => {
    setIsOpening(true);

    try {
      // Grand celebratory confetti
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
      };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ["#f43f5e", "#fda4af"],
      });
      fire(0.2, {
        spread: 60,
        colors: ["#fde047", "#fbbf24"],
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ["#ffffff", "#e11d48", "#f43f5e"],
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        colors: ["#fb7185", "#ffd700"],
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
        colors: ["#e11d48", "#ec4899"],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 600);
  };

  return (
    <section id="surprise" className="relative py-24 px-4 sm:px-6 flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] bg-gradient-to-r from-rose-900/30 via-pink-700/20 to-amber-700/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium mb-4 shadow-sm">
          <Gift className="w-3.5 h-3.5 text-rose-400" />
          <span>The Grand Finale</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-bold text-white text-glow-rose leading-tight">
          {surprise.heading}
        </h2>
        <p className="text-base sm:text-lg text-rose-200/80 font-light mt-3">
          {surprise.subtext}
        </p>
      </div>

      {!isOpen ? (
        /* The Closed Gift Box */
        <div className="flex flex-col items-center">
          <div className="relative group cursor-pointer mb-8" onClick={handleOpenGift}>
            {/* Pulsing Aura */}
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-rose-600 via-pink-500 to-amber-400 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 animate-pulse-soft" />

            {/* 3D Gift Box Visual */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-gradient-to-br from-[#401229] via-[#2d091c] to-[#1c0511] border-2 border-rose-400/50 shadow-2xl flex flex-col items-center justify-center p-6 transition-transform duration-500 group-hover:scale-105 active:scale-95">
              {/* Ribbon Vertical */}
              <div className="absolute inset-y-0 w-8 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 shadow-md flex items-center justify-center">
                <div className="w-1 h-full bg-amber-200/40" />
              </div>

              {/* Ribbon Horizontal */}
              <div className="absolute inset-x-0 h-8 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-md flex items-center justify-center">
                <div className="w-full h-1 bg-amber-200/40" />
              </div>

              {/* Bow on Top */}
              <div className="absolute -top-7 z-20 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <div className="w-12 h-10 rounded-full border-4 border-amber-400 bg-amber-300/80 -rotate-45 shadow-lg" />
                  <div className="w-12 h-10 rounded-full border-4 border-amber-400 bg-amber-300/80 rotate-45 shadow-lg -ml-4" />
                  <div className="absolute w-6 h-6 rounded-full bg-amber-400 border border-amber-200 shadow-inner flex items-center justify-center">
                    <Heart className="w-3 h-3 fill-rose-600 text-rose-600" />
                  </div>
                </div>
              </div>

              {/* Subtle Gift Centerpiece */}
              <div className="relative z-10 bg-black/40 px-4 py-2 rounded-xl backdrop-blur-sm border border-rose-300/30 text-rose-100 text-xs font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Tap to unwrap</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleOpenGift}
            disabled={isOpening}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 hover:from-rose-500 hover:to-pink-500 active:scale-95 transition-all duration-300 shadow-2xl shadow-rose-950/70 border border-rose-300/40 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-45 transition-transform" />
            <span>{surprise.buttonText}</span>
            <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
          </button>
        </div>
      ) : (
        /* The Unwrapped Romantic Surprise Reveal */
        <div className="relative max-w-3xl w-full animate-in zoom-in-95 duration-700">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-rose-600 via-amber-400 to-pink-600 blur-xl opacity-70" />

          <div className="relative glass-gold-card rounded-3xl p-8 sm:p-14 border-2 border-amber-400/50 shadow-2xl text-center flex flex-col items-center">
            {/* Top Celebration Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-semibold mb-6">
              <PartyPopper className="w-4 h-4 text-amber-300" />
              <span>{surprise.revealCelebration}</span>
              <PartyPopper className="w-4 h-4 text-amber-300" />
            </div>

            {/* Heartfelt Quote */}
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif-romantic font-bold text-white leading-relaxed mb-6 text-glow-gold max-w-2xl">
              &ldquo;{surprise.revealQuote}&rdquo;
            </p>

            {/* Promise paragraph */}
            <p className="text-base sm:text-lg text-rose-100/90 font-light leading-relaxed max-w-2xl mb-8">
              {surprise.revealPromise}
            </p>

            {/* Playful husband payment tease */}
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/70 border border-rose-400/30 max-w-lg w-full text-rose-200 text-sm sm:text-base italic leading-relaxed shadow-inner">
              {surprise.revealTease}
            </div>

            {/* Replay unwrap button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-8 text-xs text-rose-300/60 hover:text-rose-200 transition-colors underline underline-offset-4"
            >
              Wrap the gift back up 🎁
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
