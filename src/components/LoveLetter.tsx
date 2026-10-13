"use client";

import React, { useState } from "react";
import { Heart, Sparkles, Feather, Bookmark, MessageCircleHeart, X } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";
import confetti from "canvas-confetti";

export function LoveLetter() {
  const { letter } = anniversaryConfig;
  const [showSecret, setShowSecret] = useState(false);
  const [revealedParagraphs, setRevealedParagraphs] = useState<number>(letter.body.length);

  const handleOpenSecret = () => {
    setShowSecret(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#fda4af", "#f43f5e", "#fb7185", "#fde047"],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="love-letter" className="relative py-20 px-4 sm:px-6 flex flex-col items-center">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-900/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-10 max-w-xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium mb-3 shadow-sm">
          <Feather className="w-3.5 h-3.5 text-rose-400" />
          <span>Handwritten Just For You</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-bold text-white text-glow-rose">
          {letter.heading}
        </h2>
      </div>

      {/* Parchment Letter Container */}
      <div className="relative max-w-3xl w-full">
        {/* Soft luxury shadow behind letter */}
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-rose-500/20 via-amber-500/10 to-pink-500/20 blur-xl opacity-75" />

        <div className="relative parchment-letter rounded-3xl p-6 sm:p-10 md:p-14 border-2 border-[#e3d1be] shadow-2xl overflow-hidden">
          {/* Subtle gold ribbon & wax seal watermark */}
          <div className="absolute -top-3 -right-3 w-28 h-28 overflow-hidden pointer-events-none opacity-40">
            <div className="w-40 h-8 bg-amber-400/30 rotate-45 transform origin-top-left border-y border-amber-500/40" />
          </div>

          <div className="flex items-center justify-between border-b border-[#e6d8c4] pb-4 mb-6">
            <div className="flex items-center gap-2 text-rose-900 font-serif-romantic italic text-lg sm:text-xl">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600 inline" />
              <span>{letter.salutation}</span>
            </div>
            <span className="text-xs text-rose-800/70 font-sans tracking-widest uppercase">
              October 14, 2026
            </span>
          </div>

          {/* Letter Body */}
          <div className="space-y-4 sm:space-y-5 text-base sm:text-lg text-[#301622] leading-relaxed font-sans font-normal">
            {letter.body.map((para, idx) => (
              <p
                key={idx}
                className="transition-all duration-700 ease-out"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Signoff & Handwritten Signature */}
          <div className="mt-8 pt-6 border-t border-[#e6d8c4] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-base sm:text-lg font-serif-romantic font-bold text-rose-900">
                {letter.signOff}
              </p>
              <p className="text-2xl sm:text-3xl font-handwriting text-rose-800 mt-2">
                {letter.sender}
              </p>
            </div>

            <div className="text-xs sm:text-sm text-rose-900/75 italic bg-amber-100/70 p-2.5 rounded-xl border border-amber-300/40 self-start sm:self-auto">
              {letter.ps}
            </div>
          </div>

          {/* "Read One More Thing" Button */}
          <div className="mt-8 pt-4 flex justify-center">
            <button
              onClick={handleOpenSecret}
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-lg shadow-rose-900/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <MessageCircleHeart className="w-4 h-4 text-rose-200 group-hover:scale-110 transition-transform" />
              <span>{letter.oneMoreThingButton}</span>
              <Sparkles className="w-4 h-4 text-amber-200 animate-spin [animation-duration:4s]" />
            </button>
          </div>
        </div>
      </div>

      {/* Secret Message Modal */}
      {showSecret && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative max-w-md w-full glass-gold-card p-6 sm:p-8 rounded-3xl border border-amber-400/40 shadow-2xl text-center">
            <button
              onClick={() => setShowSecret(false)}
              className="absolute top-4 right-4 text-rose-300/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-3xl mb-3">{letter.oneMoreThingSecret.sticker}</div>

            <h3 className="text-2xl font-serif-romantic font-bold text-amber-200 mb-4 text-glow-gold">
              {letter.oneMoreThingSecret.title}
            </h3>

            <p className="text-base text-rose-100/90 leading-relaxed font-light mb-6">
              {letter.oneMoreThingSecret.message}
            </p>

            <button
              onClick={() => setShowSecret(false)}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-medium text-sm hover:scale-105 active:scale-95 transition-transform"
            >
              I Love You Too ❤️
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
