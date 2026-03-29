"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const words = ["Hello", "Welcome", "مرحبا", "Bonjour", "Let's Build", "Rehan.dev"];

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isExiting, setIsExiting] = useState(false);
  const [hideText, setHideText] = useState(false);

  useEffect(() => {
    const updateDimension = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateDimension();
    window.addEventListener("resize", updateDimension);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("resize", updateDimension);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      const exitTimer = setTimeout(() => {
        setHideText(true);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete?.();
          }, 800);
        }, 300);
      }, 1000);
      return () => clearTimeout(exitTimer);
    }

    const timer = setTimeout(
      () => {
        setIndex(index + 1);
      },
      index === 0 ? 1000 : 150
    );
    return () => clearTimeout(timer);
  }, [index, onComplete]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  return (
    <motion.div
      initial={{ top: 0 }}
      animate={{ top: isExiting ? "-100vh" : 0 }}
      transition={{
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="fixed inset-0 flex items-center justify-center z-[99999] overflow-hidden"
      style={{ backgroundColor: "#0a0a0b" }}
    >
      {dimension.width > 0 && (
        <>
          {/* Centered text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hideText ? 0 : 0.75 }}
            transition={{ duration: hideText ? 0.3 : 1, delay: hideText ? 0 : 0.2 }}
            className="absolute z-10 w-full flex items-center justify-center px-4"
          >
            <div className="flex items-center justify-center">
              <span
                className="block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full mr-2 sm:mr-3 shrink-0"
                style={{ backgroundColor: "#e07a5f" }}
              />
              <span className="text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-medium text-center">
                {words[index]}
              </span>
            </div>
          </motion.div>

          {/* SVG Curve */}
          <svg
            className="absolute inset-0 w-full"
            style={{ height: "calc(100% + 300px)" }}
          >
            <motion.path
              initial={{ d: initialPath }}
              animate={{ d: isExiting ? targetPath : initialPath }}
              transition={{
                duration: 0.7,
                ease: [0.76, 0, 0.24, 1],
                delay: isExiting ? 0.1 : 0,
              }}
              fill="#e07a5f"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}