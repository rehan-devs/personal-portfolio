"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Preloader from "@/components/ui/preloader";
import { AnimatedHeader } from "@/components/ui/animated-header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Philosophy from "@/components/sections/Philosophy";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: showPreloader ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen bg-background"
      >
        <AnimatedHeader
          menuItems={[
            { name: "About", href: "#about" },
            { name: "Services", href: "#services" },
            { name: "Projects", href: "#projects" },
            { name: "Contact", href: "#contact" },
          ]}
          ctaText="Hire Me"
          ctaHref="#contact"
          scrollThreshold={50}
        />
        <Hero />
        <About />
        <Services />
        <TechStack />
        <Projects />
        <Certifications />
        <Philosophy />
        <Contact />
        <Footer />
      </motion.main>
    </>
  );
}