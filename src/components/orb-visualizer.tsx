"use client";

import { useEffect, useRef } from "react";

interface OrbVisualizerProps {
  /** Returns Uint8Array of FFT frequency bins (0-255), or null when not available */
  getFrequencyData: (() => Uint8Array) | null;
  /** Whether the visualizer should be actively drawing */
  isActive: boolean;
  /** Size class matching the orb: "w-64 h-64" | "w-72 h-72" */
  size?: "sm" | "md";
}

/**
 * Mythical circular audio spectrum visualizer.
 *
 * Draws frequency bars radiating from the orb center with an ethereal,
 * aurora-like aesthetic. Uses Canvas 2D with glow shadows and smooth
 * interpolation for fluid motion.
 */
export function OrbVisualizer({
  getFrequencyData,
  isActive,
  size = "md",
}: OrbVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const smoothedRef = useRef<number[]>([]);

  const pixelSize = size === "sm" ? 256 : 288; // w-64=256px, w-72=288px
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas resolution for crisp rendering on retina
    canvas.width = pixelSize * dpr;
    canvas.height = pixelSize * dpr;
    ctx.scale(dpr, dpr);

    const centerX = pixelSize / 2;
    const centerY = pixelSize / 2;
    const orbRadius = pixelSize * 0.38; // bars start just outside the orb
    const maxBarLen = pixelSize * 0.22;

    // Number of frequency bars (must be power of 2 for clean FFT sampling)
    const barCount = 64;

    // Initialize smoothed values
    if (smoothedRef.current.length !== barCount) {
      smoothedRef.current = new Array(barCount).fill(0);
    }

    // Smoothing factor (0 = instant, 1 = frozen)
    const smoothFactor = 0.82;

    // Color palette: deep teal → cyan → gold → rose
    function barColor(angle: number, intensity: number): string {
      // Map angle to hue: start at 170° (teal) and sweep through
      const baseHue = (170 + angle * 0.4) % 360;
      // Intensity brightens and shifts hue toward gold (45°)
      const hue = baseHue + intensity * 30;
      const sat = 60 + intensity * 30;
      const light = 45 + intensity * 35;
      return `hsl(${hue}, ${sat}%, ${light}%)`;
    }

    function draw() {
      if (!ctx) return;

      ctx.clearRect(0, 0, pixelSize, pixelSize);

      if (!isActive || !getFrequencyData) {
        // Slowly decay to zero when inactive
        let allZero = true;
        for (let i = 0; i < barCount; i++) {
          smoothedRef.current[i] *= 0.92;
          if (smoothedRef.current[i] > 0.5) allZero = false;
        }
        if (allZero) {
          animRef.current = requestAnimationFrame(draw);
          return;
        }
      }

      // Read FFT data
      let raw: Uint8Array | null = null;
      try {
        raw = getFrequencyData?.() ?? null;
      } catch {
        raw = null;
      }

      if (raw && raw.length > 0) {
        // Downsample / bin the raw FFT data into `barCount` bars
        // Focus on the lower-mid frequencies (most speech energy)
        const usableBins = raw.length / 2; // FFT is symmetric, only first half matters
        const startBin = Math.floor(usableBins * 0.02); // skip DC/low rumble
        const endBin = Math.floor(usableBins * 0.35); // focus on speech range
        const range = endBin - startBin;

        for (let i = 0; i < barCount; i++) {
          const binStart = startBin + Math.floor((i / barCount) * range);
          const binEnd = startBin + Math.floor(((i + 1) / barCount) * range);
          let sum = 0;
          let count = 0;
          for (let b = binStart; b < binEnd && b < raw.length; b++) {
            sum += raw[b];
            count++;
          }
          const avg = count > 0 ? sum / count : 0;
          const normalized = avg / 255; // 0–1

          // Smooth for fluid motion
          smoothedRef.current[i] =
            smoothedRef.current[i] * smoothFactor +
            normalized * (1 - smoothFactor);
        }
      }

      // Draw bars
      const angleStep = (Math.PI * 2) / barCount;

      for (let i = 0; i < barCount; i++) {
        const value = smoothedRef.current[i];
        if (value < 0.01) continue;

        const angle = i * angleStep - Math.PI / 2; // start at top
        const barLen = value * maxBarLen;
        const barWidth = 3;

        const x1 = centerX + Math.cos(angle) * orbRadius;
        const y1 = centerY + Math.sin(angle) * orbRadius;
        const x2 = centerX + Math.cos(angle) * (orbRadius + barLen);
        const y2 = centerY + Math.sin(angle) * (orbRadius + barLen);

        // Glow
        ctx.shadowBlur = 8 + value * 12;
        ctx.shadowColor = barColor(angle * (180 / Math.PI), value);

        // Bar line
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = barColor(angle * (180 / Math.PI), value);
        ctx.lineWidth = barWidth;
        ctx.lineCap = "round";
        ctx.stroke();

        // Tip dot
        ctx.beginPath();
        ctx.arc(x2, y2, barWidth * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = barColor(angle * (180 / Math.PI), value);
        ctx.fill();
      }

      // Reset shadow for next frame
      ctx.shadowBlur = 0;

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [isActive, getFrequencyData, pixelSize, dpr]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: pixelSize,
        height: pixelSize,
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
}
