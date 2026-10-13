"use client";

import React, { useState } from "react";
import { OpeningSurprise } from "@/components/OpeningSurprise";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LoveLetter } from "@/components/LoveLetter";
import { TeasingSection } from "@/components/TeasingSection";
import { PhotoGallery } from "@/components/PhotoGallery";
import { VideoMemories } from "@/components/VideoMemories";
import { LoveReasons } from "@/components/LoveReasons";
import { LoveQuiz } from "@/components/LoveQuiz";
import { LoveQuotes } from "@/components/LoveQuotes";
import { SurpriseGift } from "@/components/SurpriseGift";
import { FinalReaction } from "@/components/FinalReaction";
import { AudioPlayer } from "@/components/AudioPlayer";
import { FloatingEffects } from "@/components/FloatingEffects";
import { Footer } from "@/components/Footer";

export default function AnniversaryPage() {
  const [isSurpriseOpened, setIsSurpriseOpened] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#0d050c] text-[#fdf2f4] overflow-x-hidden">
      {/* Floating Petals, Hearts, and Click Particles */}
      <FloatingEffects />

      {/* Romantic Ambient Audio Player */}
      <AudioPlayer />

      {/* Opening Surprise Screen (Shown initially or on replay) */}
      {!isSurpriseOpened && (
        <OpeningSurprise onOpen={() => setIsSurpriseOpened(true)} />
      )}

      {/* Main Experience (Visible once envelope opened) */}
      <div
        className={`transition-opacity duration-1000 ${
          isSurpriseOpened ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Navbar onReopenEnvelope={() => setIsSurpriseOpened(false)} />

        <div className="flex flex-col gap-10">
          <HeroSection />
          <LoveLetter />
          <TeasingSection />
          <PhotoGallery />
          <VideoMemories />
          <LoveReasons />
          <LoveQuiz />
          <LoveQuotes />
          <SurpriseGift />
          <FinalReaction />
        </div>

        <Footer />
      </div>
    </main>
  );
}
