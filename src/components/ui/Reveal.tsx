"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 20,
  direction = "up",
  className,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  let initial: { opacity: number; x?: number; y?: number } = { opacity: 0, y: yOffset };
  if (direction === "down") initial = { opacity: 0, y: -yOffset };
  if (direction === "left") initial = { opacity: 0, x: -24 };
  if (direction === "right") initial = { opacity: 0, x: 24 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
