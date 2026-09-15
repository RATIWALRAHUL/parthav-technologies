"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  value: string;
  durationMs?: number;
  className?: string;
}

export function CountUp({
  value,
  durationMs = 1400,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? value : "0");

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    if (!isInView) return;

    // Extract numeric part, decimal if any, and prefix/suffix
    // e.g. "50+" -> num: 50, suffix: "+"
    // e.g. "4.9/5" -> num: 4.9, suffix: "/5"
    const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || "";
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || "";
    const isDecimal = match[2].includes(".");
    const decimals = isDecimal ? match[2].split(".")[1].length : 0;

    const startTime = performance.now();

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * easeProgress;

      const formattedNum = isDecimal
        ? current.toFixed(decimals)
        : Math.round(current).toString();

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(value);
      }
    };

    const animId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animId);
  }, [isInView, value, durationMs, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
