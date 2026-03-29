"use client";

import { useEffect, useRef } from "react";

interface CosmosSpectrumProps {
  color?: "sunset" | "warm" | "default";
  blur?: boolean;
}

const colorThemes = {
  default: [
    "#0a0a0b",
    "#e07a5f",
    "#f2cc8f",
    "#faf9f6",
    "#81b29a",
    "#e07a5f",
    "#f2cc8f",
    "#0a0a0b",
  ],
  sunset: [
    "#0a0a0b",
    "#8b3a2f",
    "#e07a5f",
    "#f2cc8f",
    "#faf9f6",
    "#f2cc8f",
    "#e07a5f",
    "#0a0a0b",
  ],
  warm: [
    "#0a0a0b",
    "#e07a5f",
    "#f2cc8f",
    "#81b29a",
    "#faf9f6",
    "#81b29a",
    "#f2cc8f",
    "#0a0a0b",
  ],
};

export default function CosmosSpectrum({
  color = "sunset",
  blur = true,
}: CosmosSpectrumProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    };

    resize();
    window.addEventListener("resize", resize);

    const colors = colorThemes[color];

    const animate = () => {
      time += 0.003;
      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#0a0a0b";
      ctx.fillRect(0, 0, width, height);

      const numBands = colors.length;
      for (let i = 0; i < numBands; i++) {
        const y = (height / numBands) * i;
        const bandHeight = height / numBands + 20;

        const gradient = ctx.createLinearGradient(0, y, width, y + bandHeight);
        gradient.addColorStop(0, colors[i]);
        gradient.addColorStop(
          0.5,
          colors[(i + 1) % numBands]
        );
        gradient.addColorStop(1, colors[(i + 2) % numBands]);

        ctx.globalAlpha = 0.15 + Math.sin(time + i * 0.5) * 0.05;
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.moveTo(0, y + Math.sin(time + i) * 10);
        for (let x = 0; x < width; x += 50) {
          ctx.lineTo(
            x,
            y +
              Math.sin(time * 2 + x * 0.005 + i) * 15 +
              Math.cos(time + x * 0.003) * 10
          );
        }
        ctx.lineTo(width, y + bandHeight + Math.sin(time + i) * 10);
        ctx.lineTo(width, y + bandHeight + 20);
        for (let x = width; x >= 0; x -= 50) {
          ctx.lineTo(
            x,
            y +
              bandHeight +
              Math.sin(time * 1.5 + x * 0.004 + i) * 10 +
              Math.cos(time * 0.8 + x * 0.002) * 8
          );
        }
        ctx.closePath();
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [color]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          filter: blur ? "blur(40px)" : "none",
          opacity: 0.6,
        }}
      />
    </div>
  );
}