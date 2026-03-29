"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Target,
  Smartphone,
  Zap,
  FileCode,
  Search,
  Lock,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import SectionWrapper from "@/components/ui/section-wrapper";
import SectionHeading from "@/components/ui/section-heading";

const principles = [
  {
    icon: Target,
    title: "Pixel Perfect",
    description:
      "Every design gets coded exactly as intended — no shortcuts, no compromises",
    number: "01",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description:
      "Responsive design isn't an afterthought — it's the starting point",
    number: "02",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "Optimized assets, clean code, fast load times on every single project",
    number: "03",
  },
  {
    icon: FileCode,
    title: "Clean Code",
    description:
      "Readable, documented, structured code that any developer can pick up",
    number: "04",
  },
  {
    icon: Search,
    title: "SEO Friendly",
    description:
      "Semantic HTML, proper meta tags, structured data for search engines",
    number: "05",
  },
  {
    icon: Lock,
    title: "Security First",
    description:
      "Every input validated, every token encrypted, every gate locked",
    number: "06",
  },
  {
    icon: MessageSquare,
    title: "Communication",
    description:
      "Clear updates, fast responses, full transparency — no ghosting ever",
    number: "07",
  },
];

const INITIAL_VISIBLE_MOBILE = 3;

export default function Philosophy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);

  return (
    <SectionWrapper id="philosophy" className="bg-background-secondary/30">
      <SectionHeading
        badge="Philosophy"
        title="How I"
        titleAccent="Work"
        description="The principles that guide every project, every line of code, every client interaction."
      />

      <div ref={ref} className="relative">
        {/* Desktop: Timeline layout */}
        <div className="hidden lg:block">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border-subtle to-transparent" />

          <div>
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center gap-8 mb-8 ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`w-[calc(50%-2rem)] ${
                      isLeft ? "text-right" : "text-left"
                    }`}
                  >
                    <div className="glass-card-hover p-6 group">
                      <div
                        className={`flex items-start gap-4 ${
                          isLeft ? "flex-row-reverse text-right" : ""
                        }`}
                      >
                        <div className="shrink-0 p-3 rounded-xl bg-accent-primary/10 group-hover:bg-accent-primary/20 transition-colors duration-300">
                          <Icon className="w-5 h-5 text-accent-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-mono text-accent-secondary">
                              {principle.number}
                            </span>
                            <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-accent-primary transition-colors">
                              {principle.title}
                            </h3>
                          </div>
                          <p className="text-foreground-secondary text-sm leading-relaxed">
                            {principle.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="flex w-4 h-4 items-center justify-center shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1 + 0.3,
                      }}
                      className="w-3 h-3 rounded-full bg-accent-primary"
                    />
                  </div>

                  {/* Empty space for other side */}
                  <div className="w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Collapsible card layout */}
        <div className="lg:hidden">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {(showAll
                ? principles
                : principles.slice(0, INITIAL_VISIBLE_MOBILE)
              ).map((principle, index) => {
                const Icon = principle.icon;

                return (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    layout
                    className="glass-card-hover p-5 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 p-3 rounded-xl bg-accent-primary/10 group-hover:bg-accent-primary/20 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-accent-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs font-mono text-accent-secondary">
                            {principle.number}
                          </span>
                          <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-accent-primary transition-colors">
                            {principle.title}
                          </h3>
                        </div>
                        <p className="text-foreground-secondary text-sm leading-relaxed">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Show More / Show Less */}
          {principles.length > INITIAL_VISIBLE_MOBILE && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="flex justify-center mt-6"
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border-subtle bg-background-card text-foreground-secondary hover:bg-background-elevated hover:text-foreground hover:border-accent-primary/30 transition-all duration-300 text-sm font-medium"
              >
                {showAll
                  ? "Show Less"
                  : `Show All ${principles.length} Principles`}
                <motion.div
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}