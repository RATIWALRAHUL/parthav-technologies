"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import styles from "./LogoPreloader.module.css";

const STANDARD_EASE = [0.22, 1, 0.36, 1] as const;

export function LogoPreloader() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    if (shouldReduceMotion) {
      return;
    }

    try {
      const hasSeen = sessionStorage.getItem("parthav_preloader_seen");
      if (!hasSeen) {
        setIsVisible(true);
        sessionStorage.setItem("parthav_preloader_seen", "true");

        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 950);

        return () => clearTimeout(timer);
      }
    } catch {
      // In private browsing or environments where sessionStorage is blocked
      setIsVisible(false);
    }
  }, [shouldReduceMotion]);

  if (!hasMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.preloaderOverlay}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: STANDARD_EASE },
          }}
          aria-hidden="true"
        >
          <motion.div
            className={styles.centerContent}
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.55, ease: STANDARD_EASE },
            }}
            exit={{
              opacity: 0,
              y: -16,
              scale: 0.98,
              transition: { duration: 0.4, ease: STANDARD_EASE },
            }}
          >
            <div className={styles.logoWrapper}>
              <Image
                src="/logo/parthav-logo.png"
                alt="Parthav Technologies"
                width={170}
                height={42}
                priority
                className={styles.logoImage}
              />
            </div>

            <div className={styles.lineTrack}>
              <motion.div
                className={styles.lineFill}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.65, delay: 0.25, ease: STANDARD_EASE }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
