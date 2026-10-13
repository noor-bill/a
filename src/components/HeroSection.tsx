"use client";

import React, { useEffect, useState } from "react";
import { Heart, Calendar, Sparkles, Clock, Smile, Flame } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";

export function HeroSection() {
  const { hero, weddingDate, anniversaryDate } = anniversaryConfig;
  const [timePassed, setTimePassed] = useState({
    days: 122,
    hours: 2928,
    minutes: 175680,
    seconds: 10540800,
  });

  useEffect(() => {
    const wedding = new Date(weddingDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, now - wedding);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor(diff / 1000);

      setTimePassed({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-rose-900/20 via-pink-700/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Date badge */}
      <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-gold-card text-amber-200 text-xs sm:text-sm font-medium mb-6 shadow-xl border border-amber-400/30">
        <Calendar className="w-4 h-4 text-amber-300" />
        <span>{anniversaryDate}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
        <span className="text-rose-200 font-semibold">Our 4-Month Milestone</span>
        <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
      </div>

      {/* Big Main Heading */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-romantic font-bold text-white tracking-tight max-w-4xl leading-[1.15] mb-6 text-glow-rose">
        {hero.heading}
      </h1>

      {/* Subheading */}
      <p className="text-lg sm:text-xl md:text-2xl text-rose-200/90 font-light max-w-2xl leading-relaxed mb-10">
        {hero.subheading}
      </p>

      {/* The Central "4 Months" Animated Badge */}
      <div className="relative group my-4">
        {/* Glowing backdrop */}
        <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 blur-xl opacity-60 group-hover:opacity-85 transition-opacity duration-500 animate-pulse-soft" />

        <div className="relative flex flex-col items-center justify-center px-10 sm:px-14 py-6 sm:py-8 rounded-full bg-gradient-to-br from-[#2f0d21] via-[#1c0714] to-[#3a1028] border-2 border-rose-400/40 shadow-2xl">
          <div className="flex items-center gap-3 text-4xl sm:text-6xl md:text-7xl font-serif-romantic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200">
            <span>{hero.milestoneNumber}</span>
            <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-rose-500 fill-rose-500 animate-bounce [animation-duration:1200ms]" />
          </div>
          <p className="text-xs sm:text-sm text-rose-300 tracking-widest uppercase font-semibold mt-1">
            {hero.milestoneLabel}
          </p>
        </div>
      </div>

      {/* Live Counter Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl w-full mt-12 z-10">
        <div className="glass-romantic-card p-4 sm:p-5 rounded-2xl flex flex-col items-center border border-rose-500/20 hover:border-rose-400/40 transition-all duration-300 group">
          <div className="w-10 h-10 rounded-full bg-rose-900/50 flex items-center justify-center mb-2 text-rose-300 group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5 text-rose-300" />
          </div>
          <span className="text-2xl sm:text-3xl font-serif-romantic font-bold text-white">
            {timePassed.days}
          </span>
          <span className="text-[11px] sm:text-xs text-rose-300/80 font-medium mt-1">
            {hero.stats.daysLabel}
          </span>
        </div>

        <div className="glass-romantic-card p-4 sm:p-5 rounded-2xl flex flex-col items-center border border-rose-500/20 hover:border-rose-400/40 transition-all duration-300 group">
          <div className="w-10 h-10 rounded-full bg-pink-900/50 flex items-center justify-center mb-2 text-pink-300 group-hover:scale-110 transition-transform">
            <Clock className="w-5 h-5 text-pink-300" />
          </div>
          <span className="text-2xl sm:text-3xl font-serif-romantic font-bold text-white">
            {timePassed.hours.toLocaleString()}
          </span>
          <span className="text-[11px] sm:text-xs text-rose-300/80 font-medium mt-1">
            {hero.stats.hoursLabel}
          </span>
        </div>

        <div className="glass-romantic-card p-4 sm:p-5 rounded-2xl flex flex-col items-center border border-rose-500/20 hover:border-rose-400/40 transition-all duration-300 group">
          <div className="w-10 h-10 rounded-full bg-red-900/50 flex items-center justify-center mb-2 text-red-300 group-hover:scale-110 transition-transform">
            <Smile className="w-5 h-5 text-red-300" />
          </div>
          <span className="text-2xl sm:text-3xl font-serif-romantic font-bold text-white">
            Infinite
          </span>
          <span className="text-[11px] sm:text-xs text-rose-300/80 font-medium mt-1">
            {hero.stats.smilesLabel}
          </span>
        </div>

        <div className="glass-romantic-card p-4 sm:p-5 rounded-2xl flex flex-col items-center border border-rose-500/20 hover:border-rose-400/40 transition-all duration-300 group">
          <div className="w-10 h-10 rounded-full bg-amber-900/50 flex items-center justify-center mb-2 text-amber-300 group-hover:scale-110 transition-transform">
            <Flame className="w-5 h-5 text-amber-300" />
          </div>
          <span className="text-2xl sm:text-3xl font-serif-romantic font-bold text-white">
            12M+
          </span>
          <span className="text-[11px] sm:text-xs text-rose-300/80 font-medium mt-1">
            {hero.stats.heartbeatsLabel}
          </span>
        </div>
      </div>

      {/* Down arrow indicator */}
      <a
        href="#love-letter"
        className="mt-14 inline-flex flex-col items-center text-rose-300/70 hover:text-rose-200 transition-colors duration-300 group text-xs font-light"
      >
        <span>Read your love letter</span>
        <span className="mt-1 w-6 h-9 rounded-full border-2 border-rose-400/40 flex items-start justify-center p-1">
          <span className="w-1.5 h-2 bg-rose-400 rounded-full animate-bounce [animation-duration:1500ms]" />
        </span>
      </a>
    </section>
  );
}
