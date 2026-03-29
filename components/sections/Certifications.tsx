"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Award, CheckCircle, ChevronDown } from "lucide-react";
import SectionWrapper from "@/components/ui/section-wrapper";
import SectionHeading from "@/components/ui/section-heading";

const certifications = [
  {
    platform: "freeCodeCamp",
    name: "Responsive Web Design",
    accent: "#f2cc8f",
  },
  {
    platform: "freeCodeCamp",
    name: "JavaScript Algorithms & Data Structures",
    accent: "#f2cc8f",
  },
  {
    platform: "freeCodeCamp",
    name: "Front End Development Libraries",
    accent: "#f2cc8f",
  },
  {
    platform: "HackerRank",
    name: "CSS Certification",
    accent: "#81b29a",
  },
  {
    platform: "HackerRank",
    name: "JavaScript Certification",
    accent: "#81b29a",
  },
  {
    platform: "HackerRank",
    name: "React Certification",
    accent: "#81b29a",
  },
  {
    platform: "HackerRank",
    name: "Front End Developer",
    accent: "#81b29a",
  },
  {
    platform: "HackerRank",
    name: "Software Engineer",
    accent: "#81b29a",
  },
];

const INITIAL_VISIBLE_MOBILE = 4;

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // On desktop show all, on mobile show limited unless expanded
  const visibleCerts = isMobile && !showAll
    ? certifications.slice(0, INITIAL_VISIBLE_MOBILE)
    : certifications;

  return (
    <SectionWrapper id="certifications">
      <SectionHeading
        badge="Certifications"
        title="Verified"
        titleAccent="Credentials"
        description="Industry-recognized certifications that validate my skills and commitment to continuous learning."
      />

      <div ref={ref}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {visibleCerts.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                layout
                className="glass-card-hover p-5 group cursor-default"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${cert.accent}15` }}
                  >
                    <Award
                      className="w-5 h-5"
                      style={{ color: cert.accent }}
                    />
                  </div>
                  <CheckCircle
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: cert.accent }}
                  />
                </div>

                <p
                  className="text-xs font-medium uppercase tracking-wider mb-2"
                  style={{ color: cert.accent }}
                >
                  {cert.platform}
                </p>

                <h3 className="font-heading text-sm font-semibold text-foreground leading-tight group-hover:text-accent-primary transition-colors duration-300">
                  {cert.name}
                </h3>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More / Show Less button - ONLY visible on mobile */}
        {isMobile && certifications.length > INITIAL_VISIBLE_MOBILE && (
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
              {showAll ? "Show Less" : `Show All ${certifications.length} Certifications`}
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
    </SectionWrapper>
  );
}