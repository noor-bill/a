"use client";

import React, { useState } from "react";
import { Heart, Sparkles, Menu, X, Mail } from "lucide-react";

interface NavbarProps {
  onReopenEnvelope: () => void;
}

export function Navbar({ onReopenEnvelope }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Our Story", href: "#" },
    { label: "Love Letter", href: "#love-letter" },
    { label: "The Teasing 😏", href: "#teasing" },
    { label: "Our World 📸", href: "#gallery" },
    { label: "Reasons ❤️", href: "#reasons" },
    { label: "The Quiz 💕", href: "#quiz" },
    { label: "Surprise 🎁", href: "#surprise" },
  ];

  return (
    <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-rose-500/30 shadow-2xl shadow-black/50 text-white max-w-4xl w-full">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2 group font-serif-romantic font-bold text-sm sm:text-base tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200"
        >
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 group-hover:scale-125 transition-transform" />
          <span>4 Months of Us</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 text-xs font-medium text-rose-200/80">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Re-open envelope button */}
          <button
            onClick={onReopenEnvelope}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-950/70 hover:bg-rose-900 border border-rose-400/30 text-xs text-rose-200 transition-all hover:scale-105"
            title="Replay Envelope Animation"
          >
            <Mail className="w-3.5 h-3.5 text-rose-300" />
            <span>Open Envelope</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-rose-200 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden fixed top-20 inset-x-4 bg-black/90 backdrop-blur-2xl border border-rose-500/30 rounded-3xl p-6 shadow-2xl z-50">
          <div className="flex flex-col gap-3 text-center">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-rose-100 hover:text-white font-medium text-sm rounded-xl hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReopenEnvelope();
              }}
              className="mt-2 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-medium text-sm flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Reopen Envelope Surprise</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
