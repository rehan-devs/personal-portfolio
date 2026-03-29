"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Project {
  id: number;
  name: string;
  type: string;
  description: string;
  image: string;
  stack: string[];
  url: string;
}

const allProjects: Project[] = [
  {
    id: 1,
    name: "SCOÖP",
    type: "E-Commerce",
    description:
      "Premium artisan ice cream shop with buttery-smooth animations, interactive 3D visuals, and luxurious design aesthetic",
    image: "/images/scoop.jpg",
    stack: ["Next.js 14", "GSAP", "React Three Fiber", "Tailwind CSS"],
    url: "https://scoop-cones.vercel.app/",
  },
  {
    id: 2,
    name: "Veldora",
    type: "Web Apps",
    description:
      "Playful blockchain gaming platform where dragons rule the skies with engaging animations and Web3 wallet integration",
    image: "/images/veldora.jpg",
    stack: ["Next.js", "TypeScript", "Web3"],
    url: "https://veldora-gaming-platform.vercel.app/",
  },
  {
    id: 3,
    name: "ChronoPins",
    type: "Web Apps",
    description:
      "Interactive digital time capsule for cities — drop memory pins on maps, explore decades of hidden stories",
    image: "/images/chronopins.jpg",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    url: "https://chronopins.vercel.app",
  },
  {
    id: 4,
    name: "Nexus",
    type: "Landing Pages",
    description:
      "Modern digital agency website with premium animations, parallax scrolling, and a client inquiry system",
    image: "/images/nexus.jpg",
    stack: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    url: "https://nexushq.netlify.app/",
  },
  {
    id: 5,
    name: "FlowSync",
    type: "Landing Pages",
    description:
      "Fully responsive SaaS landing page with animated hero sections, dashboard previews, and pricing tables",
    image: "/images/flowsync.jpg",
    stack: ["React", "Tailwind CSS", "Framer Motion"],
    url: "https://sync-flow.netlify.app/",
  },
  {
    id: 6,
    name: "Stride",
    type: "E-Commerce",
    description:
      "Complete sneaker e-commerce platform with dynamic product browsing, cart functionality, and checkout",
    image: "/images/stride.jpg",
    stack: ["React", "Tailwind CSS", "Stripe"],
    url: "https://stridesneakers.netlify.app/",
  },
  {
    id: 7,
    name: "Aurum",
    type: "Landing Pages",
    description:
      "Elegant restaurant website with online reservations, interactive menus, and luxurious dark-gold design",
    image: "/images/aurum.jpg",
    stack: ["HTML5", "CSS3", "JavaScript"],
    url: "https://aurumdines.netlify.app/",
  },
  {
    id: 8,
    name: "ChromaCraft Studio",
    type: "Tools",
    description:
      "Premium color system generator — enter one brand color, get a complete design system with accessibility audits",
    image: "/images/chromacraft.jpg",
    stack: ["React", "TypeScript", "Tailwind CSS", "Chroma.js"],
    url: "https://chromacraft-studio.vercel.app/",
  },
  {
    id: 9,
    name: "Regex Recipes",
    type: "Tools",
    description:
      "Use-case-first regex tool with 30+ recipes, code snippets in 5 languages, and honest edge case docs",
    image: "/images/regex.jpg",
    stack: ["React", "TypeScript"],
    url: "https://regex-recipes.vercel.app/",
  },
  {
    id: 10,
    name: "NovaPulse",
    type: "Landing Pages",
    description:
      "Premium dark-themed landing page for an AI-powered personal finance platform with sophisticated animations",
    image: "/images/novapulse.jpg",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS"],
    url: "https://novapulse-ai.vercel.app/",
  },
];

const filters = ["All", "Web Apps", "Landing Pages", "E-Commerce", "Tools"];

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
];

function ProjectCardContent({ project }: { project: Project }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex h-full w-full flex-col gap-4">
      {/* Project Image */}
      <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-background-elevated">
        {!imageError ? (
          <>
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 100vw, 560px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-card/80 via-background-card/20 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 via-accent-secondary/10 to-accent-tertiary/20 flex items-center justify-center">
            <span className="font-heading text-4xl font-bold text-foreground/10">
              {project.name}
            </span>
          </div>
        )}

        {/* Project Type Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-background/90 backdrop-blur-sm text-accent-primary border border-accent-primary/20">
            {project.type}
          </span>
        </div>
      </div>

      {/* Project Info */}
      <div className="flex w-full items-center justify-between gap-4 px-3 pb-6">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="truncate font-heading text-lg font-semibold text-foreground">
            {project.name}
          </h3>
          <p className="text-sm text-foreground-secondary line-clamp-2 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] rounded-md bg-background-elevated text-foreground-muted border border-border-subtle/50"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] rounded-md bg-background-elevated text-foreground-muted border border-border-subtle/50">
                +{project.stack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* View Button */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex h-10 shrink-0 cursor-pointer select-none items-center gap-1 rounded-full bg-accent-primary pl-4 pr-3 text-sm font-medium text-[#1a0a08] hover:bg-accent-primary/90 transition-colors"
        >
          View
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export default function ProjectCardStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isDesktop, setIsDesktop] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return allProjects;
    return allProjects.filter((p) => p.type === activeFilter);
  }, [activeFilter]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const visibleCards = isDesktop
    ? [
        filteredProjects[currentIndex % filteredProjects.length],
        filteredProjects[(currentIndex + 1) % filteredProjects.length],
        filteredProjects[(currentIndex + 2) % filteredProjects.length],
      ]
    : [filteredProjects[currentIndex % filteredProjects.length]];

  return (
    <div className="flex w-full flex-col items-center">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
              activeFilter === filter
                ? "bg-accent-primary text-[#1a0a08] shadow-lg shadow-accent-primary/20"
                : "bg-background-card text-foreground-secondary border border-border-subtle hover:border-accent-primary/30 hover:text-foreground"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Desktop: Stacked cards */}
      {isDesktop ? (
        <div className="flex w-full flex-col items-center justify-center pt-2">
          <div className="relative h-[400px] w-full overflow-hidden sm:w-[560px] md:w-[600px]">
            <AnimatePresence initial={false} mode="popLayout">
              {visibleCards.map((project, index) => {
                if (!project) return null;
                const { scale, y } = positionStyles[index] ?? positionStyles[2];
                const zIndex = 3 - index;

                return (
                  <motion.div
                    key={`${project.id}-${currentIndex}`}
                    initial={{ y: -60, scale: 0.85, opacity: 0 }}
                    animate={{ y, scale, opacity: 1 }}
                    exit={{ y: 400, scale: 1, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    style={{
                      zIndex,
                      position: "absolute",
                      left: "50%",
                      x: "-50%",
                      bottom: 0,
                    }}
                    className="flex h-[340px] w-[90%] sm:w-[520px] md:w-[560px] flex-col overflow-hidden rounded-2xl border border-border-subtle bg-background-card shadow-xl group"
                  >
                    <div className="p-2 h-full">
                      <ProjectCardContent project={project} />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Desktop navigation bar */}
          <div className="relative z-10 flex w-full sm:w-[560px] md:w-[600px] items-center justify-between border-t border-border-subtle py-4 px-4 mt-2">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="p-2.5 rounded-xl border border-border-subtle bg-background-card text-foreground-secondary hover:bg-background-elevated hover:text-foreground disabled:opacity-50 transition-all duration-300"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="flex h-10 cursor-pointer select-none items-center justify-center gap-1.5 overflow-hidden rounded-xl border border-border-subtle bg-background-card px-5 font-medium text-foreground-secondary transition-all hover:bg-background-elevated hover:text-foreground disabled:opacity-50 active:scale-[0.98] text-sm"
            >
              Next Project
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="text-foreground-muted text-sm font-medium">
              {currentIndex + 1} / {filteredProjects.length}
            </span>
          </div>
        </div>
      ) : (
        /* Mobile: Single card with navigation */
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={filteredProjects[currentIndex]?.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="rounded-2xl border border-border-subtle bg-background-card overflow-hidden group"
            >
              {filteredProjects[currentIndex] && (
                <div className="p-2">
                  <ProjectCardContent project={filteredProjects[currentIndex]} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Mobile navigation */}
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="p-3 rounded-xl border border-border-subtle bg-background-card text-foreground-secondary hover:bg-background-elevated disabled:opacity-50 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5">
              {filteredProjects.slice(0, 7).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex
                      ? "w-6 h-2 bg-accent-primary"
                      : "w-2 h-2 bg-foreground-muted/30 hover:bg-foreground-muted/50"
                  }`}
                  aria-label={`Project ${idx + 1}`}
                />
              ))}
              {filteredProjects.length > 7 && (
                <span className="text-xs text-foreground-muted ml-1">
                  +{filteredProjects.length - 7}
                </span>
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="p-3 rounded-xl border border-border-subtle bg-background-card text-foreground-secondary hover:bg-background-elevated disabled:opacity-50 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-foreground-muted text-xs text-center mt-3">
            {currentIndex + 1} of {filteredProjects.length}
          </p>
        </div>
      )}
    </div>
  );
}