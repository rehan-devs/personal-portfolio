"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import SocialIcons from "@/components/ui/social-icons";
import CosmosSpectrum from "@/components/ui/cosmos-spectrum";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Philosophy", href: "#philosophy" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Cosmos Spectrum Background */}
      <div className="absolute inset-0">
        <CosmosSpectrum color="sunset" blur />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Main footer content */}
        <div className="section-padding py-20 md:py-24">
          <div className="section-container">
            {/* Large name - INCREASED OPACITY */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold gradient-text opacity-40 select-none">
                REHAN
              </h2>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <blockquote className="text-foreground-secondary italic text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                &ldquo;If it&apos;s not good enough for my name, it&apos;s not good
                enough for yours.&rdquo;
              </blockquote>
            </motion.div>

            {/* Navigation */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-10"
            >
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm text-foreground-secondary hover:text-accent-primary transition-colors duration-300"
                >
                  {link.name}
                </button>
              ))}
            </motion.nav>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-10"
            >
              <SocialIcons size="md" />
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent mb-8" />

            {/* Bottom bar - REMOVED HEART TEXT */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-sm text-foreground-muted"
              >
                © 2025 Muhammad Rehan. All rights reserved.
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                onClick={scrollToTop}
                className="flex items-center gap-2 text-sm text-foreground-muted hover:text-accent-primary transition-colors duration-300 group"
              >
                Back to Top
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}