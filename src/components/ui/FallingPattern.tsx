"use client";

import { useEffect, useRef } from "react";

interface FallingPatternProps {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  gap?: number;
  speed?: number;
  opacity?: number;
}

export default function FallingPattern({
  className = "",
  dotColor = "rgba(255, 255, 255, 0.6)",
  dotSize = 2,
  gap = 14,
  speed = 0.4,
  opacity = 0.35,
}: FallingPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const lastFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Pre-compute sin table for performance
    const SIN_TABLE_SIZE = 256;
    const sinTable = new Float32Array(SIN_TABLE_SIZE);
    for (let i = 0; i < SIN_TABLE_SIZE; i++) {
      sinTable[i] = Math.sin((i / SIN_TABLE_SIZE) * Math.PI * 2);
    }
    const fastSin = (x: number) => {
      const idx = ((x % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      return sinTable[Math.floor((idx / (Math.PI * 2)) * SIN_TABLE_SIZE) % SIN_TABLE_SIZE];
    };
    const fastCos = (x: number) => fastSin(x + Math.PI / 2);

    const draw = (timestamp: number) => {
      // Throttle to ~30fps
      if (timestamp - lastFrameRef.current < 33) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameRef.current = timestamp;

      timeRef.current += speed * 0.016;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;

      // Batch all dots into a single path
      ctx.fillStyle = dotColor;
      ctx.beginPath();

      for (let row = 0; row < rows; row++) {
        const y = row * gap;
        // Pre-compute y-dependent terms
        const yTerm1 = y * 0.03;
        const yTerm2 = y * 0.025;
        const yTerm3 = y * 0.02;

        for (let col = 0; col < cols; col++) {
          const x = col * gap;

          // Simplified noise with fewer trig calls
          const v1 = fastSin(x * 0.02 + t * 0.7) * fastCos(yTerm1 + t * 0.4);
          const v2 = fastSin(x * 0.035 + yTerm2 + t * 0.5);
          const v3 = fastCos(x * 0.015 - t * 0.3) * fastSin(yTerm3 + t * 0.6);
          const n = (v1 + v2 + v3) / 3;

          const r = ((n + 1) * 0.5) * dotSize;

          if (r > 0.4) {
            ctx.moveTo(x + r, y);
            ctx.arc(x, y, r, 0, Math.PI * 2);
          }
        }
      }

      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [dotColor, dotSize, gap, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
        zIndex: 0,
      }}
    />
  );
}
