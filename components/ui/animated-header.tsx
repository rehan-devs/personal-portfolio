"use client";

import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  name: string;
  href: string;
}

interface AnimatedHeaderProps {
  menuItems?: NavItem[];
  logo?: React.ReactNode;
  ctaHref?: string;
  ctaText?: string;
  scrollThreshold?: number;
}

const defaultMenuItems: NavItem[] = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function AnimatedHeader({
  menuItems = defaultMenuItems,
  logo,
  ctaHref = "#contact",
  ctaText = "Hire Me",
  scrollThreshold = 50,
}: AnimatedHeaderProps) {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("");

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold);

      const sections = menuItems.map((item) =>
        item.href.replace("#", "")
      );
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold, menuItems]);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuState(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (menuState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuState]);

  const handleNavClick = (href: string) => {
    setMenuState(false);
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
    <header>
      <nav className="fixed z-50 w-full px-2">
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-500 ease-out",
            isScrolled &&
              "bg-background/70 max-w-4xl rounded-2xl border border-border-subtle/50 backdrop-blur-xl lg:px-5 shadow-lg shadow-black/20"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2 group"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {logo || <DefaultLogo />}
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <motion.div
                  animate={menuState ? { rotate: 180, opacity: 0, scale: 0 } : { rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu className="size-6 text-foreground" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={menuState ? { rotate: 0, opacity: 1, scale: 1 } : { rotate: -180, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="size-6 text-foreground" />
                </motion.div>
              </button>
            </div>

            {/* Desktop nav */}
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index} className={cn(index === 2 && "ml-16")}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "block duration-300 transition-colors relative py-1",
                        activeSection === item.href.replace("#", "")
                          ? "text-accent-primary"
                          : "text-foreground-secondary hover:text-foreground"
                      )}
                    >
                      <span>{item.name}</span>
                      {activeSection === item.href.replace("#", "") && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-primary rounded-full"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Button
                size="sm"
                className="bg-accent-primary hover:bg-accent-primary/90 text-white"
                onClick={() => handleNavClick(ctaHref)}
              >
                <span>{ctaText}</span>
              </Button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
              {menuState && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute top-full left-0 right-0 mt-2 lg:hidden"
                >
                  <div className="bg-background-card/95 backdrop-blur-xl rounded-2xl border border-border-subtle p-6 shadow-2xl mx-2">
                    <ul className="space-y-4 text-base">
                      {menuItems.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <button
                            onClick={() => handleNavClick(item.href)}
                            className={cn(
                              "block w-full text-left py-2 duration-150 transition-colors",
                              activeSection === item.href.replace("#", "")
                                ? "text-accent-primary"
                                : "text-foreground-secondary hover:text-foreground"
                            )}
                          >
                            <span>{item.name}</span>
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-6 pt-6 border-t border-border-subtle"
                    >
                      <Button
                        className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white"
                        onClick={() => handleNavClick(ctaHref)}
                      >
                        {ctaText}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </header>
  );
}

const DefaultLogo = () => {
  return (
    <div className="flex items-center gap-0.5 group-hover:gap-1 transition-all duration-300">
      <span className="font-heading font-bold text-xl text-accent-primary">
        Rehan
      </span>
      <span className="font-heading font-bold text-xl text-foreground group-hover:text-accent-secondary transition-colors duration-300">
        .
      </span>
    </div>
  );
};