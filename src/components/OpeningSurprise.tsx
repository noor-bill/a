"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Mail, Lock } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";

interface OpeningSurpriseProps {
  onOpen: () => void;
}

export function OpeningSurprise({ onOpen }: OpeningSurpriseProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [envelopeFlapped, setEnvelopeFlapped] = useState(false);
  const { opening } = anniversaryConfig;

  const handleOpenClick = () => {
    setIsOpening(true);
    setEnvelopeFlapped(true);

    // Fire fireworks & heart-shaped confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f43f5e", "#fb7185", "#e11d48", "#fde047", "#ffffff"],
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#f43f5e", "#fda4af", "#e11d48"],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#f43f5e", "#fda4af", "#e11d48"],
        });
      }, 350);
    } catch {
      // safe fallback
    }

    // Trigger main reveal after animation
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-1000 ${
        isOpening ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      style={{
        background: "radial-gradient(ellipse at center, #2e081d 0%, #170410 60%, #0a0208 100%)",
      }}
    >
      {/* Background glowing ambiance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-pink-700/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-lg w-full text-center z-10 flex flex-col items-center">
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium mb-6 shadow-inner animate-pulse-soft">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>October 14, 2026 • 4-Month Anniversary</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        {/* Envelope Container with 3D feel */}
        <div className="relative w-72 sm:w-80 h-52 sm:h-56 mb-8 transition-transform duration-500 hover:scale-102">
          {/* Envelope Glow */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-rose-500/20 via-pink-500/30 to-amber-500/20 blur-xl opacity-75" />

          {/* Envelope Body */}
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#401229] to-[#250716] border border-rose-400/40 shadow-2xl overflow-hidden flex flex-col justify-end p-4">
            {/* Top flap */}
            <div
              className={`absolute top-0 left-0 right-0 h-28 bg-[#521735] border-b border-rose-300/30 origin-top transition-all duration-700 shadow-md ${
                envelopeFlapped ? "-rotate-180 -translate-y-6 opacity-40" : "rotate-0"
              }`}
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />

            {/* Glowing Letter peeking out */}
            <div
              className={`absolute left-4 right-4 bg-[#fffaf0] rounded-t-lg transition-all duration-700 shadow-lg flex flex-col items-center p-3 text-rose-950 ${
                envelopeFlapped ? "top-2 bottom-12" : "top-14 bottom-4"
              }`}
            >
              <div className="w-12 h-1 bg-rose-300 rounded-full mb-2" />
              <div className="w-32 h-1.5 bg-rose-200 rounded-full mb-1" />
              <div className="w-24 h-1.5 bg-rose-100 rounded-full" />
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500 mt-2 animate-bounce" />
            </div>

            {/* Envelope front pouch fold */}
            <div
              className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#360d21] to-[#4a132e] border-t border-rose-500/30 shadow-inner flex items-center justify-center"
              style={{
                clipPath: "polygon(0 100%, 50% 30%, 100% 100%)",
              }}
            />

            {/* Wax Seal Centerpiece */}
            {!envelopeFlapped && (
              <div className="absolute top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-red-600 via-rose-700 to-rose-950 flex items-center justify-center shadow-xl border-2 border-amber-300/60 animate-pulse-soft">
                  <Heart className="w-7 h-7 text-amber-200 fill-amber-200" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Text Details */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-bold text-white mb-3 text-glow-rose tracking-wide">
          {opening.greeting}
        </h1>

        <p className="text-base sm:text-lg text-rose-200/90 font-light max-w-sm mb-6">
          {opening.subgreeting}
        </p>

        {/* Playful Warning Banner */}
        <div className="max-w-md w-full bg-rose-950/70 border border-rose-500/40 rounded-2xl p-4 mb-8 text-rose-200 text-xs sm:text-sm leading-relaxed backdrop-blur-md shadow-lg shadow-black/40">
          <p className="font-sans font-medium text-rose-100 flex items-start justify-center gap-2">
            <span>{opening.warning}</span>
          </p>
        </div>

        {/* Main CTA Button */}
        <button
          onClick={handleOpenClick}
          disabled={isOpening}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 hover:from-rose-500 hover:to-pink-500 active:scale-95 transition-all duration-300 shadow-xl shadow-rose-900/60 hover:shadow-rose-600/60 border border-rose-300/40 cursor-pointer"
        >
          <span className="absolute -inset-1 rounded-full bg-rose-400/30 blur-md group-hover:bg-rose-400/60 transition-all duration-300" />
          <Mail className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <span className="relative z-10">{opening.buttonText}</span>
          <Heart className="w-5 h-5 relative z-10 fill-white text-white group-hover:scale-125 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}
