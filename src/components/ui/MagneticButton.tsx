"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  maxMovement?: number;
}

export function MagneticButton({
  children,
  className,
  maxMovement = 10,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    // Only enable magnetic behavior on desktop pointer devices
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches && window.innerWidth >= 1024);

    const handleResize = () => {
      setCanHover(mq.matches && window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const x = useSpring(0, { stiffness: 220, damping: 20 });
  const y = useSpring(0, { stiffness: 220, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || shouldReduceMotion || !ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Normalizing magnetic movement between -maxMovement and +maxMovement
    const targetX = (distanceX / (width / 2)) * maxMovement;
    const targetY = (distanceY / (height / 2)) * maxMovement;

    x.set(targetX);
    y.set(targetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!canHover || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
}
