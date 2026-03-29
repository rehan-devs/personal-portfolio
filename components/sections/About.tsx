"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Clock,
  GraduationCap,
  Briefcase,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import SectionWrapper from "@/components/ui/section-wrapper";
import SectionHeading from "@/components/ui/section-heading";

const stats = [
  { number: "50+", label: "Projects Completed" },
  { number: "30+", label: "Happy Clients" },
  { number: "100%", label: "On-Time Delivery" },
];

const experiences = [
  {
    role: "Front End Developer",
    type: "Freelancer",
    highlights: [
      "Built and maintained 25+ responsive client websites using React, Tailwind CSS, and modern JavaScript",
      "Converted Figma and PSD designs into pixel-perfect, cross-browser compatible websites",
      "Reduced average page load time by 40% through optimization techniques",
    ],
  },
  {
    role: "Web Developer",
    type: "Full Service",
    highlights: [
      "Developed 30+ websites for local businesses including restaurants, clinics, and startups",
      "Handled full project lifecycle from consultation to deployment and support",
      "Integrated third-party APIs including Google Maps, payment gateways, and social media",
    ],
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="about">
      <SectionHeading
        badge="About Me"
        title="Crafting Digital"
        titleAccent="Experiences"
        description="A passionate developer from Pakistan, turning complex problems into elegant, user-friendly solutions."
      />

      <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left side - Photo & Info */}
        <div className="space-y-8">
          {/* Profile Card with Circular Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden glass-card">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-background-card to-accent-tertiary/10" />

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-accent-primary/5 blur-2xl" />
              <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full bg-accent-secondary/5 blur-3xl" />

              {/* Centered circular profile image container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Outer glow ring */}
                  <div
                    className="absolute -inset-3 rounded-full opacity-50 blur-md"
                    style={{
                      background: "linear-gradient(135deg, #e07a5f 0%, #f2cc8f 50%, #81b29a 100%)",
                    }}
                  />

                  {/* Border ring */}
                  <div
                    className="absolute -inset-1 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #e07a5f 0%, #f2cc8f 50%, #81b29a 100%)",
                      padding: "3px",
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-background-card" />
                  </div>

                  {/* Profile image */}
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-background-card shadow-2xl">
                    <Image
                      src="/images/profile.jpg"
                      alt="Muhammad Rehan - Full Stack Developer"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 176px"
                    />
                  </div>

                  {/* Animated ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 rounded-full border border-dashed border-accent-primary/20"
                  />
                </div>
              </div>

              {/* Name and title below image */}
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Muhammad Rehan
                </h3>
                <p className="text-foreground-secondary text-sm">
                  Full Stack Developer
                </p>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-3 -right-3 px-4 py-2 rounded-xl bg-accent-primary/10 border border-accent-primary/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-accent-primary" />
                <span className="text-foreground-secondary">Pakistan</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-3 -left-3 px-4 py-2 rounded-xl bg-accent-tertiary/10 border border-accent-tertiary/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-accent-tertiary" />
                <span className="text-foreground-secondary">UTC+5</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="text-center p-4 rounded-xl glass-card"
              >
                <div className="font-heading text-2xl md:text-3xl font-bold gradient-text mb-1">
                  {stat.number}
                </div>
                <div className="text-xs text-foreground-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right side - Bio & Experience */}
        <div className="space-y-8">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-foreground-secondary leading-relaxed text-base md:text-lg">
              Specialized in transforming Figma designs and rough ideas into
              pixel-perfect, high-performance websites, landing pages, and web
              applications with clean architecture and seamless user experiences.
            </p>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-6 space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent-secondary/10">
                <GraduationCap className="w-5 h-5 text-accent-secondary" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground">
                  BS Software Engineering
                </h4>
                <p className="text-sm text-foreground-muted">
                  University of The Punjab
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground-muted">
              <Calendar className="w-4 h-4" />
              <span>2020 — 2024</span>
            </div>
            <ul className="space-y-2 mt-3">
              {[
                "Specialized in modern front-end development & scalable architecture",
                "Built multiple responsive websites with performance at the core",
                "Strong focus on clean code, UI/UX precision, and component-driven design",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground-secondary"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent-tertiary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Experience Timeline */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-accent-primary" />
              Experience
            </h3>
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                className="glass-card p-5 relative"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">
                      {exp.role}
                    </h4>
                    <span className="text-xs text-accent-primary font-medium">
                      {exp.type}
                    </span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-foreground-secondary"
                    >
                      <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}