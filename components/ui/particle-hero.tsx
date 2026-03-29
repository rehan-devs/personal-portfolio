"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fadeDelay: number;
  fadeStart: number;
  fadingOut: boolean;
}

export default function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [isGoldMode, setIsGoldMode] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() / 5 + 0.1,
      opacity: 1,
      fadeDelay: Math.random() * 600 + 100,
      fadeStart: Date.now() + Math.random() * 600 + 100,
      fadingOut: false,
    });

    const resetParticle = (particle: Particle) => {
      particle.x = Math.random() * canvas.width;
      particle.y = canvas.height + 10;
      particle.speed = Math.random() / 5 + 0.1;
      particle.opacity = 1;
      particle.fadeDelay = Math.random() * 600 + 100;
      particle.fadeStart = Date.now() + particle.fadeDelay;
      particle.fadingOut = false;
    };

    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 6000);
      particlesRef.current = Array.from({ length: Math.min(count, 200) }, createParticle);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      timeRef.current += 0.008;

      ctx.clearRect(0, 0, w, h);

      const centerX = w / 2;
      const globeY = 32;

      // Colors based on mode
      const primaryColor = isGoldMode ? "216, 189, 16" : "224, 122, 95";
      const secondaryColor = isGoldMode ? "255, 215, 0" : "242, 204, 143";

      // Draw soft light rays emanating from globe
      const numRays = 5;
      for (let i = 0; i < numRays; i++) {
        const baseAngle = ((i - (numRays - 1) / 2) * Math.PI) / 5.5;
        const animOffset = Math.sin(timeRef.current + i * 0.8) * 0.03;
        const angle = baseAngle + animOffset;

        ctx.save();
        ctx.translate(centerX, globeY);
        ctx.rotate(angle);

        // Create soft gradient for each ray
        const rayLength = h * 1.3;
        const gradient = ctx.createLinearGradient(0, 0, 0, rayLength);

        const baseOpacity = 0.18 + Math.sin(timeRef.current * 0.5 + i) * 0.04;

        gradient.addColorStop(0, `rgba(${primaryColor}, ${baseOpacity})`);
        gradient.addColorStop(0.15, `rgba(${secondaryColor}, ${baseOpacity * 0.6})`);
        gradient.addColorStop(0.4, `rgba(${primaryColor}, ${baseOpacity * 0.25})`);
        gradient.addColorStop(0.7, `rgba(${primaryColor}, ${baseOpacity * 0.08})`);
        gradient.addColorStop(1, `rgba(${primaryColor}, 0)`);

        // Draw ray as a soft cone
        const spreadStart = 8;
        const spreadEnd = 280 + Math.sin(timeRef.current + i * 0.5) * 40;

        ctx.beginPath();
        ctx.moveTo(-spreadStart, 0);
        ctx.lineTo(-spreadEnd, rayLength);
        ctx.lineTo(spreadEnd, rayLength);
        ctx.lineTo(spreadStart, 0);
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.filter = "blur(25px)";
        ctx.fill();
        ctx.filter = "none";

        ctx.restore();
      }

      // Draw particles
      particlesRef.current.forEach((particle) => {
        particle.y -= particle.speed;

        if (particle.y < 0) {
          resetParticle(particle);
        }

        if (!particle.fadingOut && Date.now() > particle.fadeStart) {
          particle.fadingOut = true;
        }

        if (particle.fadingOut) {
          particle.opacity -= 0.008;
          if (particle.opacity <= 0) {
            resetParticle(particle);
          }
        }

        const colors = isGoldMode
          ? [`rgba(216, 189, 16, ${particle.opacity})`, `rgba(255, 215, 0, ${particle.opacity})`]
          : [
              `rgba(224, 122, 95, ${particle.opacity})`,
              `rgba(242, 204, 143, ${particle.opacity})`,
              `rgba(129, 178, 154, ${particle.opacity * 0.7})`,
              `rgba(250, 250, 249, ${particle.opacity * 0.5})`,
            ];

        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillRect(particle.x, particle.y, 0.5, Math.random() * 2 + 1);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isGoldMode]);

  const toggleMode = () => setIsGoldMode(!isGoldMode);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Dark globe with colored shadow below */}
      <button
        onClick={toggleMode}
        className="absolute top-5 left-1/2 -translate-x-1/2 z-20 cursor-pointer transition-transform duration-300 hover:scale-110"
        aria-label="Toggle color mode"
      >
        {/* Colored shadow/glow below globe */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-8 h-4 rounded-full blur-md"
          style={{
            background: isGoldMode
              ? "rgba(216, 189, 16, 0.5)"
              : "rgba(224, 122, 95, 0.5)",
          }}
        />
        {/* Dark globe */}
        <div
          className="relative w-5 h-5 rounded-full"
          style={{
            background: "linear-gradient(145deg, #1a1a1d 0%, #0a0a0b 50%, #000 100%)",
            boxShadow: isGoldMode
              ? "0 4px 20px rgba(216, 189, 16, 0.3), inset 0 1px 1px rgba(255,255,255,0.05)"
              : "0 4px 20px rgba(224, 122, 95, 0.3), inset 0 1px 1px rgba(255,255,255,0.05)",
          }}
        />
      </button>

      {/* Subtle accent lines */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[20, 35, 50, 65, 80].map((top) => (
          <div
            key={`h-${top}`}
            className="absolute left-0 right-0 h-px opacity-[0.03]"
            style={{
              top: `${top}%`,
              background: "linear-gradient(90deg, transparent 10%, rgba(224, 122, 95, 0.4) 50%, transparent 90%)",
            }}
          />
        ))}
      </div>
    </>
  );
}