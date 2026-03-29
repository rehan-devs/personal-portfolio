"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleHero from "@/components/ui/particle-hero";
import SocialIcons from "@/components/ui/social-icons";

const roles = [
  "Full Stack Developer",
  "React Specialist",
  "Next.js Expert",
  "UI/UX Enthusiast",
  "Problem Solver",
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const role = roles[currentRole];

    if (!isDeleting) {
      if (displayText.length < role.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(role.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayText, isDeleting, currentRole]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "100dvh",
        background: "#0a0a0b",
      }}
    >
      {/* Particle Hero Background with Spotlights */}
      <ParticleHero />

      {/* Additional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-[1] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full py-20 sm:py-24 md:py-0">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-accent-tertiary/30 bg-accent-tertiary/5 px-4 sm:px-5 py-2 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-tertiary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-tertiary" />
          </span>
          <span className="text-xs sm:text-sm font-medium text-accent-tertiary">
            Available for Freelance
          </span>
        </motion.div>

        {/* Main heading with glow effect */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4 sm:mb-6"
        >
          <span className="text-foreground drop-shadow-[0_0_30px_rgba(224,122,95,0.15)]">
            Muhammad
          </span>
          <br />
          <span
            className="gradient-text"
            style={{
              textShadow: "0 0 60px rgba(224, 122, 95, 0.3)",
            }}
          >
            Rehan
          </span>
        </motion.h1>

        {/* Typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-7 sm:h-8 mb-4 sm:mb-6 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-secondary" />
          <span className="font-heading text-base sm:text-lg md:text-xl text-foreground-secondary">
            {displayText}
            <span className="animate-pulse text-accent-primary">|</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-foreground-secondary text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
        >
          Designing fast, responsive web experiences from concept to code.
          <br className="hidden sm:block" />
          Specializing in transforming ideas into pixel-perfect, high-performance
          websites.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
        >
          <Button
            size="lg"
            className="min-w-[160px] sm:min-w-[180px] group w-full sm:w-auto"
            onClick={() => handleScrollTo("projects")}
          >
            View My Work
            <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-[160px] sm:min-w-[180px] w-full sm:w-auto"
            onClick={() => handleScrollTo("contact")}
          >
            Get In Touch
          </Button>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <SocialIcons size="md" />
        </motion.div>
      </div>
    </section>
  );
}