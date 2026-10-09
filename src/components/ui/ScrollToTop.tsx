"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import styles from "./ScrollToTop.module.css";

export function ScrollToTop() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsVisible(latest > 120);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-to-top"
          type="button"
          onClick={scrollToTop}
          className={styles.scrollTopButton}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Scroll to top of page"
          title="Jump to top"
        >
          {/* SVG Circular Border Progress */}
          <svg
            className={styles.progressSvg}
            width="48"
            height="48"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="scrollProgressGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FF7A00" />
                <stop offset="100%" stopColor="#FF4D00" />
              </linearGradient>
            </defs>

            {/* Inactive Track */}
            <circle
              cx="24"
              cy="24"
              r="20"
              className={styles.progressTrack}
            />

            {/* Dynamic Progress Fill based on page scroll depth */}
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              className={styles.progressCircle}
              style={{
                pathLength: smoothProgress,
              }}
            />
          </svg>

          {/* Jump To Top Icon */}
          <span className={styles.iconWrapper}>
            <ArrowUp size={18} strokeWidth={2.4} />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
