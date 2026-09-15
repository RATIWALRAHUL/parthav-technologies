/**
 * PARTHAV TECHNOLOGIES — CENTRAL MOTION SYSTEM (2026)
 * Unified durations, easings, stagger standards, and Framer Motion variants.
 */

import type { Variants, Transition } from "framer-motion";

// ========================================================
// MOTION TOKENS
// ========================================================

export const MOTION_DURATIONS = {
  micro: 0.2, // 150-220ms
  small: 0.28, // 220-320ms
  medium: 0.55, // 400-600ms
  large: 0.75, // 600-900ms
  hero: 0.95, // 700-1200ms
} as const;

export const MOTION_EASINGS = {
  standard: [0.22, 1, 0.36, 1] as const, // Primary agency ease
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  springGentle: { type: "spring", stiffness: 260, damping: 24 } as const,
};

export const DEFAULT_TRANSITION: Transition = {
  duration: MOTION_DURATIONS.medium,
  ease: MOTION_EASINGS.standard,
};

// ========================================================
// REUSABLE FRAMER MOTION VARIANTS
// ========================================================

/** Standard section or element fade-up */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.medium,
      delay: custom * 0.08,
      ease: MOTION_EASINGS.standard,
    },
  }),
};

/** Subtle fade-in */
export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    transition: {
      duration: MOTION_DURATIONS.small,
      delay: custom * 0.06,
      ease: MOTION_EASINGS.easeOut,
    },
  }),
};

/** Hero text line reveal */
export const headingLineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.medium,
      delay: custom * 0.07,
      ease: MOTION_EASINGS.standard,
    },
  }),
};

/** Container orchestrating staggered children */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

/** Staggered child item (cards, capability pills, list items) */
export const cardStaggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.medium,
      ease: MOTION_EASINGS.standard,
    },
  },
};

/** Image scale and opacity reveal */
export const imageRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.04,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: MOTION_DURATIONS.large,
      ease: MOTION_EASINGS.standard,
    },
  },
};
