"use client";

import React, { useState, useRef } from "react";
import {
  Film,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Heart,
  Sparkles,
  X,
  RotateCcw,
} from "lucide-react";
import { anniversaryConfig, VideoMemory } from "@/config/anniversary";
import confetti from "canvas-confetti";

export function VideoMemories() {
  const { videos } = anniversaryConfig;
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [activeCinemaVideo, setActiveCinemaVideo] = useState<VideoMemory | null>(null);
  const [likedVideoIds, setLikedVideoIds] = useState<Record<string, boolean>>({});
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const notifyAudioPlayer = (isVideoPlaying: boolean) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("video-play-status", {
          detail: { isPlaying: isVideoPlaying },
        })
      );
    }
  };

  const handlePlayToggle = (video: VideoMemory) => {
    const el = videoRefs.current[video.id];
    if (!el) return;

    if (playingVideoId === video.id) {
      el.pause();
      setPlayingVideoId(null);
      notifyAudioPlayer(false);
    } else {
      // Pause any previously playing video
      if (playingVideoId && videoRefs.current[playingVideoId]) {
        videoRefs.current[playingVideoId]?.pause();
      }
      el.play();
      setPlayingVideoId(video.id);
      notifyAudioPlayer(true);
    }
  };

  const toggleMute = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const el = videoRefs.current[id];
    if (!el) return;

    const newMuted = !el.muted;
    el.muted = newMuted;
    setMutedStates((prev) => ({ ...prev, [id]: newMuted }));
  };

  const toggleHeart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedVideoIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    try {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ["#f43f5e", "#fda4af", "#ffd700"],
      });
    } catch {
      // safe fallback
    }
  };

  const openCinemaModal = (video: VideoMemory) => {
    // Pause inline video
    if (playingVideoId && videoRefs.current[playingVideoId]) {
      videoRefs.current[playingVideoId]?.pause();
    }
    setPlayingVideoId(null);
    setActiveCinemaVideo(video);
    notifyAudioPlayer(true);
  };

  const closeCinemaModal = () => {
    setActiveCinemaVideo(null);
    notifyAudioPlayer(false);
  };

  return (
    <section id="videos" className="relative py-20 px-4 sm:px-6 flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] bg-gradient-to-tr from-rose-900/15 via-purple-900/15 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-200 text-xs sm:text-sm font-medium mb-4 shadow-sm">
          <Film className="w-3.5 h-3.5 text-purple-300" />
          <span>Our Moving Memories</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-bold text-white text-glow-rose leading-tight">
          {videos.title}
        </h2>
        <p className="text-base sm:text-lg text-rose-200/80 font-light mt-3 max-w-xl mx-auto">
          {videos.subtitle}
        </p>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl w-full">
        {videos.items.map((video) => {
          const isPlaying = playingVideoId === video.id;
          const isLiked = likedVideoIds[video.id];
          const isMuted = mutedStates[video.id] ?? false;

          return (
            <div
              key={video.id}
              className="group relative glass-romantic rounded-3xl overflow-hidden border border-rose-500/25 hover:border-purple-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-950/50 flex flex-col"
            >
              {/* Video Player Frame */}
              <div
                onClick={() => handlePlayToggle(video)}
                className="relative aspect-[9/16] sm:aspect-[4/5] w-full overflow-hidden bg-black/60 cursor-pointer flex items-center justify-center"
              >
                <video
                  ref={(el) => {
                    videoRefs.current[video.id] = el;
                  }}
                  src={video.src}
                  playsInline
                  loop
                  muted={isMuted}
                  onEnded={() => {
                    setPlayingVideoId(null);
                    notifyAudioPlayer(false);
                  }}
                  className="w-full h-full object-cover"
                />

                {/* Film Overlay Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 ${
                    isPlaying ? "opacity-30 group-hover:opacity-80" : "opacity-75"
                  }`}
                />

                {/* Top badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-auto">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-medium text-purple-200 border border-purple-500/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{video.tag}</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => toggleMute(e, video.id)}
                      className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:scale-110 active:scale-95 transition-all"
                      aria-label="Toggle mute"
                    >
                      {isMuted ? (
                        <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-white" />
                      )}
                    </button>

                    <button
                      onClick={(e) => toggleHeart(e, video.id)}
                      className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-rose-500/30 hover:scale-110 active:scale-95 transition-all"
                      aria-label="Like video"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-colors ${
                          isLiked
                            ? "fill-rose-500 text-rose-500"
                            : "text-white/80"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Center Play/Pause Indicator Button */}
                <div
                  className={`absolute z-10 transition-all duration-300 ${
                    isPlaying
                      ? "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                      : "opacity-100 scale-100"
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-rose-600/80 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-white shadow-xl shadow-rose-950/60 hover:scale-110 active:scale-95 transition-transform">
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-white" />
                    ) : (
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    )}
                  </div>
                </div>

                {/* Full-screen cinema trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openCinemaModal(video);
                  }}
                  className="absolute bottom-3 right-3 z-10 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/90 hover:text-white border border-white/20 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                  title="Watch in Cinema Mode"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Caption Card */}
              <div className="p-5 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#240a1d] to-[#150411]">
                <div>
                  <h3 className="text-base sm:text-lg font-serif-romantic font-bold text-white mb-1">
                    {video.title}
                  </h3>
                  <p className="text-sm font-handwriting text-2xl text-rose-200/90 leading-snug">
                    &ldquo;{video.caption}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-rose-500/15 flex items-center justify-between text-xs text-rose-300/70">
                  <span>{video.dateTag}</span>
                  <span className="text-[11px] text-amber-300/80 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Tap to {isPlaying ? "pause" : "play"}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Cinema Modal */}
      {activeCinemaVideo && (
        <div
          onClick={closeCinemaModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
        >
          <button
            onClick={closeCinemaModal}
            className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-105"
            aria-label="Close Cinema Mode"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full flex flex-col items-center max-h-[92vh]"
          >
            <div className="relative w-full max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-black/80 border border-rose-500/30">
              <video
                src={activeCinemaVideo.src}
                autoPlay
                controls
                playsInline
                loop
                className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain"
              />
            </div>

            <div className="mt-4 text-center max-w-xl px-4">
              <h3 className="text-xl sm:text-2xl font-serif-romantic font-bold text-white mb-1">
                {activeCinemaVideo.title}
              </h3>
              <p className="text-lg sm:text-xl font-handwriting text-rose-200">
                &ldquo;{activeCinemaVideo.caption}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
