"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Camera,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Upload,
  Maximize2,
  Sparkles,
} from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";
import confetti from "canvas-confetti";

export function PhotoGallery() {
  const { gallery } = anniversaryConfig;
  const [photos, setPhotos] = useState(gallery.photos);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [likedPhotoIds, setLikedPhotoIds] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toggleHeart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedPhotoIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    // Trigger mini heart confetti
    try {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ["#f43f5e", "#fda4af"],
      });
    } catch {
      // safe fallback
    }
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotoList = [...photos];
    Array.from(files).forEach((file, idx) => {
      const url = URL.createObjectURL(file);
      const newPhoto = {
        id: `custom-photo-${Date.now()}-${idx}`,
        src: url,
        caption: `Our beautiful memory ❤️ (${file.name})`,
        locationTag: "Our Personal Photo",
        dateTag: "Treasured Moment",
      };
      newPhotoList.unshift(newPhoto);
    });

    setPhotos(newPhotoList);
  };

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
    }
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section id="gallery" className="relative py-20 px-4 sm:px-6 flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-rose-950/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium mb-4 shadow-sm">
          <Camera className="w-3.5 h-3.5 text-rose-400" />
          <span>Our Visual Memories</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-bold text-white text-glow-rose leading-tight">
          {gallery.title}
        </h2>
        <p className="text-base sm:text-lg text-rose-200/80 font-light mt-3 max-w-xl mx-auto">
          {gallery.subtitle}
        </p>

        {/* Real photo upload trigger for husband */}
        <div className="mt-5 flex justify-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCustomUpload}
            multiple
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-950/50 hover:bg-rose-900/60 border border-rose-400/30 text-xs sm:text-sm text-rose-200 transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm"
          >
            <Upload className="w-3.5 h-3.5 text-amber-300" />
            <span>Upload or Preview With Real Photos 📸</span>
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl w-full">
        {photos.map((photo, index) => {
          const isLiked = likedPhotoIds[photo.id];
          return (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative cursor-pointer glass-romantic rounded-3xl overflow-hidden border border-rose-500/25 hover:border-pink-400/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-950/50 flex flex-col"
            >
              {/* Photo Frame Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-rose-950/40">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-medium text-rose-200 border border-rose-500/30">
                    {photo.locationTag}
                  </span>

                  <button
                    onClick={(e) => toggleHeart(e, photo.id)}
                    className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-rose-500/30 hover:scale-115 active:scale-95 transition-all"
                    aria-label="Like photo"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isLiked ? "fill-rose-500 text-rose-500" : "text-white/80"
                      }`}
                    />
                  </button>
                </div>

                {/* Hover zoom icon indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                    <Maximize2 className="w-5 h-5 text-rose-200" />
                  </div>
                </div>
              </div>

              {/* Caption Area */}
              <div className="p-5 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#240b1b] to-[#170611]">
                <p className="text-lg sm:text-xl font-handwriting text-rose-100/95 leading-relaxed">
                  &ldquo;{photo.caption}&rdquo;
                </p>

                <div className="mt-4 pt-3 border-t border-rose-500/15 flex items-center justify-between text-xs text-rose-300/70">
                  <span>{photo.dateTag}</span>
                  <span className="text-[11px] text-amber-300/80 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Tap to view</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-lg animate-in fade-in duration-300"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-105"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation left */}
          <button
            onClick={prevPhoto}
            className="absolute left-3 sm:left-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-110 active:scale-95"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation right */}
          <button
            onClick={nextPhoto}
            className="absolute right-3 sm:right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-110 active:scale-95"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image and Caption */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full flex flex-col items-center max-h-[90vh]"
          >
            <div className="relative w-full max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-black/60">
              <img
                src={photos[activePhotoIndex].src}
                alt={photos[activePhotoIndex].caption}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
              />
            </div>

            <div className="mt-4 text-center max-w-xl px-4">
              <p className="text-xl sm:text-2xl font-handwriting text-rose-100">
                &ldquo;{photos[activePhotoIndex].caption}&rdquo;
              </p>
              <div className="mt-2 flex items-center justify-center gap-3 text-xs text-rose-300/80">
                <span>{photos[activePhotoIndex].locationTag}</span>
                <span>•</span>
                <span>{photos[activePhotoIndex].dateTag}</span>
                <span>•</span>
                <span>
                  {activePhotoIndex + 1} / {photos.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
