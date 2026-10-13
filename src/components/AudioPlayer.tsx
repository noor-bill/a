"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music, Sparkles } from "lucide-react";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isDucked, setIsDucked] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [usingSynthesizer, setUsingSynthesizer] = useState(false);

  // Romantic chord progression frequencies: Cmaj7 - Am9 - Fmaj7 - Gadd9
  const notes = [
    [261.63, 329.63, 392.0, 493.88, 523.25],
    [220.0, 261.63, 329.63, 392.0, 493.88],
    [174.61, 220.0, 261.63, 329.63, 349.23],
    [196.0, 246.94, 293.66, 329.63, 392.0],
  ];

  const effectiveVolume = isDucked ? 0.03 : volume;

  const playSynthesizedTone = (freq: number, duration = 3.5, timeOffset = 0) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + timeOffset);

    const startTime = ctx.currentTime + timeOffset;
    const peakGain = 0.08 * effectiveVolume;

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  const startSynthesizerLoop = () => {
    let chordIndex = 0;
    const playNextChord = () => {
      const chord = notes[chordIndex % notes.length];
      chordIndex++;

      chord.forEach((freq, idx) => {
        playSynthesizedTone(freq, 4.0, idx * 0.45);
      });
    };

    playNextChord();
    intervalRef.current = window.setInterval(playNextChord, 4200);
  };

  const stopSynthesizer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const toggleMusic = async () => {
    if (isPlaying) {
      if (audioElementRef.current && !usingSynthesizer) {
        audioElementRef.current.pause();
      }
      stopSynthesizer();
      setIsPlaying(false);
    } else {
      if (!audioContextRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }

      const audio = new Audio("/music.mp3");
      audioElementRef.current = audio;
      audio.volume = effectiveVolume;
      audio.loop = true;

      try {
        await audio.play();
        setUsingSynthesizer(false);
        setIsPlaying(true);
      } catch {
        setUsingSynthesizer(true);
        startSynthesizerLoop();
        setIsPlaying(true);
      }
    }
  };

  // Listen to video play status to duck music when video is active
  useEffect(() => {
    const handleVideoStatus = (e: Event) => {
      const customEvent = e as CustomEvent<{ isPlaying: boolean }>;
      const isVideoPlaying = !!customEvent.detail?.isPlaying;
      setIsDucked(isVideoPlaying);

      if (audioElementRef.current) {
        audioElementRef.current.volume = isVideoPlaying ? 0.03 : volume;
      }
    };

    window.addEventListener("video-play-status", handleVideoStatus);
    return () => {
      window.removeEventListener("video-play-status", handleVideoStatus);
    };
  }, [volume]);

  useEffect(() => {
    return () => {
      stopSynthesizer();
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {/* Soundwave equalizer indicator */}
      {isPlaying && (
        <div className="hidden sm:flex items-center gap-1 bg-black/60 backdrop-blur-md px-3 py-2 rounded-full border border-rose-500/30 text-rose-300 text-xs shadow-lg shadow-rose-950/40">
          <span className="flex items-end gap-[3px] h-4">
            <span className="w-1 bg-rose-400 rounded-full animate-bounce [animation-duration:800ms] h-3" />
            <span className="w-1 bg-rose-300 rounded-full animate-bounce [animation-duration:600ms] h-4" />
            <span className="w-1 bg-rose-500 rounded-full animate-bounce [animation-duration:900ms] h-2" />
            <span className="w-1 bg-rose-400 rounded-full animate-bounce [animation-duration:700ms] h-3" />
          </span>
          <span className="ml-1 font-medium text-[11px] tracking-wide">
            {isDucked
              ? "Audio Lowered for Video 🎬"
              : usingSynthesizer
              ? "Romantic Melody ♫"
              : "Playing Music ♫"}
          </span>
        </div>
      )}

      {/* Main button */}
      <button
        onClick={toggleMusic}
        onMouseEnter={() => setShowVolumeSlider(true)}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-rose-600 to-pink-700 text-white shadow-lg shadow-rose-900/50 hover:shadow-rose-600/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-rose-400/30"
        title={isPlaying ? "Pause Romantic Music" : "Play Romantic Background Music"}
        aria-label={isPlaying ? "Pause Romantic Music" : "Play Romantic Background Music"}
      >
        <span className="absolute -inset-1 rounded-full bg-rose-500/20 blur group-hover:bg-rose-500/40 transition-all duration-300" />
        {isPlaying ? (
          <Volume2 className="w-5 h-5 relative z-10 animate-pulse text-white" />
        ) : (
          <div className="relative z-10 flex items-center justify-center">
            <Music className="w-5 h-5 text-rose-100 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-300 animate-ping" />
          </div>
        )}
      </button>

      {/* Volume slider popover on hover */}
      {showVolumeSlider && isPlaying && (
        <div
          onMouseLeave={() => setShowVolumeSlider(false)}
          className="absolute bottom-14 right-0 p-3 bg-black/80 backdrop-blur-md rounded-2xl border border-rose-500/20 shadow-xl flex items-center gap-2"
        >
          <VolumeX className="w-3.5 h-3.5 text-rose-300/70" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setVolume(val);
              if (audioElementRef.current) {
                audioElementRef.current.volume = val;
              }
            }}
            className="w-20 accent-rose-500 h-1.5 bg-rose-950 rounded-lg cursor-pointer"
          />
          <Volume2 className="w-3.5 h-3.5 text-rose-400" />
        </div>
      )}
    </div>
  );
}
