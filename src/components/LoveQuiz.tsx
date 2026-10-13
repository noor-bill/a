"use client";

import React, { useState } from "react";
import { HelpCircle, Sparkles, Heart, Trophy, RotateCcw } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";
import confetti from "canvas-confetti";

export function LoveQuiz() {
  const { quiz } = anniversaryConfig;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<{
    text: string;
    reaction: string;
    emoji: string;
    husbandBanter: string;
  } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const question = quiz.questions[currentQuestionIndex];

  const handleSelectOption = (option: (typeof quiz.questions)[0]["options"][0]) => {
    setSelectedOption(option);

    try {
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.7 },
        colors: ["#f43f5e", "#fda4af", "#fbbf24"],
      });
    } catch {
      // safe fallback
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#f43f5e", "#fb7185", "#fde047", "#ffffff"],
        });
      } catch {
        // safe fallback
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCompleted(false);
  };

  return (
    <section id="quiz" className="relative py-20 px-4 sm:px-6 flex flex-col items-center">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[550px] bg-pink-950/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium mb-4 shadow-sm">
          <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
          <span>The Couple's Game</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-bold text-white text-glow-rose leading-tight">
          {quiz.title}
        </h2>
        <p className="text-base sm:text-lg text-rose-200/80 font-light mt-3">
          {quiz.subtitle}
        </p>
      </div>

      {/* Main Quiz Box */}
      <div className="max-w-2xl w-full">
        {!isCompleted ? (
          <div className="glass-romantic-card rounded-3xl p-6 sm:p-10 border border-rose-500/25 shadow-2xl flex flex-col">
            {/* Progress bar */}
            <div className="flex items-center justify-between text-xs text-rose-300 mb-6 font-medium">
              <span>
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </span>
              <span className="font-mono text-amber-300">
                Score: 100% in Love ❤️
              </span>
            </div>

            <div className="w-full bg-rose-950/70 h-1.5 rounded-full mb-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
                }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif-romantic font-bold text-white mb-6 leading-snug">
              {question.question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption?.text === opt.text;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 text-sm sm:text-base ${
                      isSelected
                        ? "bg-gradient-to-r from-rose-600/50 to-pink-600/50 border-rose-400 text-white shadow-lg shadow-rose-950/50 scale-102"
                        : "bg-black/30 border-rose-500/20 text-rose-100 hover:border-rose-400/50 hover:bg-black/50"
                    }`}
                  >
                    <span className="font-medium">{opt.text}</span>
                    <span className="text-xl">{opt.emoji}</span>
                  </button>
                );
              })}
            </div>

            {/* Playful Husband Reaction Banner */}
            {selectedOption && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-950/80 to-purple-950/80 border border-rose-400/40 shadow-inner animate-in fade-in slide-in-from-bottom-2 duration-300 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{selectedOption.emoji}</span>
                  <div>
                    <h4 className="font-serif-romantic font-bold text-base sm:text-lg text-amber-200">
                      {selectedOption.reaction}
                    </h4>
                    <p className="text-xs sm:text-sm text-rose-200/90 font-light mt-1">
                      {selectedOption.husbandBanter}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Next Question CTA */}
            {selectedOption && (
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-sm sm:text-base hover:scale-105 active:scale-95 transition-all shadow-lg shadow-rose-900/40"
                >
                  {currentQuestionIndex < quiz.questions.length - 1
                    ? "Next Question →"
                    : "See Final Results 🏆"}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Results Card */
          <div className="glass-gold-card rounded-3xl p-8 sm:p-12 border-2 border-amber-400/40 shadow-2xl text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mb-4 text-amber-300 shadow-xl animate-bounce">
              <Trophy className="w-10 h-10 text-amber-300" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Final Husband Evaluation</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-serif-romantic font-bold text-white mb-3 text-glow-gold">
              Certified 100% Queen of His Heart 👑
            </h3>

            <p className="text-base sm:text-lg text-rose-100/90 font-light max-w-md mb-8 leading-relaxed">
              Official verdict: You know your husband inside and out. He is completely, hopelessly, and irreversibly obsessed with you. There were never any wrong answers anyway!
            </p>

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-950/70 hover:bg-rose-900/80 border border-rose-400/30 text-rose-200 font-medium text-sm transition-all hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Quiz Again</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
