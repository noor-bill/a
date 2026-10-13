"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: "heart" | "petal" | "sparkle";
  color: string;
}

interface ClickBurst {
  x: number;
  y: number;
  id: number;
  emoji: string;
}

export function FloatingEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [clickBursts, setClickBursts] = useState<ClickBurst[]>([]);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initial particles (around 28 for smooth mobile & desktop performance)
    const particleCount = window.innerWidth < 768 ? 16 : 28;
    const particles: Particle[] = [];

    const colors = [
      "rgba(244, 63, 94, ", // Rose
      "rgba(251, 113, 133, ", // Light Rose
      "rgba(225, 29, 72, ", // Crimson
      "rgba(253, 164, 175, ", // Pastel Pink
      "rgba(251, 191, 36, ", // Warm Gold
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 14 + 8,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: Math.random() * 0.8 + 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.5 + 0.25,
        type: i % 3 === 0 ? "heart" : i % 3 === 1 ? "petal" : "sparkle",
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.fillStyle = `${color}${opacity})`;
      context.beginPath();
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      // Top left curve
      context.bezierCurveTo(
        -size / 2,
        -size / 2,
        -size,
        topCurveHeight / 3,
        0,
        size
      );
      // Top right curve
      context.bezierCurveTo(
        size,
        topCurveHeight / 3,
        size / 2,
        -size / 2,
        0,
        topCurveHeight
      );
      context.closePath();
      context.fill();
      context.restore();
    };

    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.fillStyle = `${color}${opacity * 0.8})`;
      context.beginPath();
      context.ellipse(0, 0, size * 0.7, size * 0.35, Math.PI / 4, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const drawSparkle = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.fillStyle = `${color}${opacity})`;
      context.beginPath();
      context.arc(0, 0, size * 0.25, 0, Math.PI * 2);
      context.fill();
      // Star flare
      context.strokeStyle = `${color}${opacity * 0.7})`;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(-size * 0.6, 0);
      context.lineTo(size * 0.6, 0);
      context.moveTo(0, -size * 0.6);
      context.lineTo(0, size * 0.6);
      context.stroke();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.005) * 0.5;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (p.type === "heart") {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else if (p.type === "petal") {
          drawPetal(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, p.opacity);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  // Click burst tap effect for playful romantic feedback
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const emojis = ["❤️", "💖", "✨", "🌸", "💍", "🥰", "💕"];
      const newBurst: ClickBurst = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + Math.random(),
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      };

      setClickBursts((prev) => [...prev.slice(-10), newBurst]);

      setTimeout(() => {
        setClickBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
      }, 1000);
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <>
      {enabled && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-20 h-full w-full opacity-60"
        />
      )}

      {/* Floating click burst particles */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {clickBursts.map((b) => (
          <div
            key={b.id}
            style={{ left: b.x, top: b.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl select-none animate-ping duration-1000"
          >
            {b.emoji}
          </div>
        ))}
      </div>
    </>
  );
}
