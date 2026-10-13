"use client";

import React, { useState } from "react";
import { Heart, MessageSquareHeart, Sparkles } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";
import confetti from "canvas-confetti";

export function FinalReaction() {
  const { finalFeedback } = anniversaryConfig;
  const [selectedReactionId, setSelectedReactionId] = useState<string | null>(null);

  const activeReaction = finalFeedback.options.find(
    (opt) => opt.id === selectedReactionId
  );

  const handleSelect = (id: string) => {
    setSelectedReactionId(id);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#f43f5e", "#fb7185", "#ffd700", "#ffffff"],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="feedback" className="relative py-20 px-4 sm:px-6 flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-rose-950/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium mb-4 shadow-sm">
          <MessageSquareHeart className="w-3.5 h-3.5 text-rose-400" />
          <span>Wife's Final Review</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-bold text-white text-glow-rose leading-tight">
          {finalFeedback.question}
        </h2>
        <p className="text-sm sm:text-base text-rose-200/80 font-light mt-3">
          Choose your official honest reaction below (All answers lead to warm hugs!):
        </p>
      </div>

      {/* Interactive Options */}
      <div className="flex flex-wrap items-center justify-center gap-4 max-w-2xl w-full mb-8">
        {finalFeedback.options.map((option) => {
          const isSelected = selectedReactionId === option.id;
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xl shadow-rose-950/60 border-2 border-rose-300 scale-105"
                  : "bg-rose-950/50 hover:bg-rose-900/60 text-rose-100 border border-rose-400/30 hover:scale-103 active:scale-95"
              }`}
            >
              <span className="text-xl group-hover:scale-120 transition-transform">
                {option.emoji}
              </span>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>

      {/* Personalized Dynamic Reaction Banner */}
      {activeReaction && (
        <div className="relative max-w-xl w-full animate-in zoom-in-95 duration-500">
          <div className="glass-romantic-card rounded-3xl p-6 sm:p-8 border-2 border-rose-400/40 shadow-2xl text-center flex flex-col items-center">
            <span className="text-4xl mb-3 animate-bounce">{activeReaction.emoji}</span>
            <h3 className="text-xl sm:text-2xl font-serif-romantic font-bold text-white mb-2 text-glow-rose">
              {activeReaction.reactionTitle}
            </h3>
            <p className="text-base sm:text-lg text-rose-100/90 font-light leading-relaxed mb-4">
              {activeReaction.reactionMessage}
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-amber-300/80 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Status: Husband is smiling ear to ear right now</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
