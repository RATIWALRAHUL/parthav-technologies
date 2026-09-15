"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  FileText,
  Star,
  Users,
  Target,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CountUp } from "@/components/ui/CountUp";
import styles from "./Hero.module.css";

const STANDARD_EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const videoParallaxY = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : 32]);

  // Animation variants
  const lineVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: custom * 0.07,
        ease: STANDARD_EASE,
      },
    }),
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        delay: custom * 0.08,
        ease: STANDARD_EASE,
      },
    }),
  };

  const videoRevealVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.04,
      y: shouldReduceMotion ? 0 : 15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.05,
        ease: STANDARD_EASE,
      },
    },
  };

  // Keywords for dynamic typing animation
  const KEYWORDS = React.useMemo(() => ["grow.", "scale.", "convert."], []);
  const [keywordIndex, setKeywordIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState(KEYWORDS[0]);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(KEYWORDS[0]);
      return;
    }

    const currentTarget = KEYWORDS[keywordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing forward
      if (displayText.length < currentTarget.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentTarget.slice(0, displayText.length + 1));
        }, 110);
      } else {
        // Pause on completed word
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      // Deleting backward
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentTarget.slice(0, displayText.length - 1));
        }, 65);
      } else {
        // Switch to next keyword
        setIsDeleting(false);
        setKeywordIndex((prev) => (prev + 1) % KEYWORDS.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, keywordIndex, KEYWORDS, shouldReduceMotion]);

  return (
    <section id="home" className={styles.heroSection} aria-label="Hero Introduction">
      {/* Complete Hero Section Background Video (Focused on the right image side) */}
      <motion.div
        className={styles.heroVideoBackgroundWrapper}
        aria-hidden="true"
        initial="hidden"
        animate="visible"
        variants={videoRevealVariants}
        style={{ y: videoParallaxY }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero/hero-agency-poster.webp"
          className={styles.heroVideo}
        >
          <source src="/videos/hero-agency.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroVideoOverlay} />
      </motion.div>

      <Container className={styles.heroContainer}>
        <div className={styles.heroGrid}>
          {/* ========================================================
              LEFT COLUMN: Messaging, CTAs, Trust, and Metrics Row
             ======================================================== */}
          <div className={styles.heroContent}>
            {/* Eyebrow */}
            <motion.div
              className={styles.eyebrow}
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUpVariants}
            >
              <span>DIGITAL PRODUCTS</span>
              <span className={styles.eyebrowDot}>•</span>
              <span>WEB</span>
              <span className={styles.eyebrowDot}>•</span>
              <span>AI</span>
              <span className={styles.eyebrowDot}>•</span>
              <span>GROWTH</span>
            </motion.div>

            {/* Main Headline (Line 1: We turn ideas into, Line 2: digital experiences, Line 3: that [typed keyword]) */}
            <h1 className={styles.headline}>
              <motion.span
                className={styles.headlineLine}
                initial="hidden"
                animate="visible"
                custom={1}
                variants={lineVariants}
              >
                We turn ideas into
              </motion.span>
              <motion.span
                className={`${styles.headlineLine} ${styles.orangeText}`}
                initial="hidden"
                animate="visible"
                custom={2}
                variants={lineVariants}
              >
                digital experiences
              </motion.span>
              <motion.span
                className={`${styles.headlineLine} ${styles.headlineThirdLine}`}
                initial="hidden"
                animate="visible"
                custom={3}
                variants={lineVariants}
              >
                <span>that</span>
                <span className={styles.typewriterWord}>{displayText}</span>
                <span className={styles.cursorBar} />
              </motion.span>
            </h1>

            {/* Supporting Description */}
            <motion.p
              className={styles.description}
              initial="hidden"
              animate="visible"
              custom={4}
              variants={fadeUpVariants}
            >
              Parthav Technologies combines strategy, UI/UX, web development, SEO and AI to help
              businesses launch, grow and automate — with digital products that make a real impact.
            </motion.p>

            {/* CTA Buttons with Magnetic on desktop */}
            <motion.div
              className={styles.ctaGroup}
              initial="hidden"
              animate="visible"
              custom={5}
              variants={fadeUpVariants}
            >
              <MagneticButton maxMovement={10}>
                <a href="#contact" className={styles.primaryCta} id="hero-start-project-btn">
                  <span>Start a Project</span>
                  <ArrowRight size={17} className={styles.arrowIcon} />
                </a>
              </MagneticButton>

              <MagneticButton maxMovement={6}>
                <a href="#work" className={styles.secondaryCta} id="hero-view-work-btn">
                  <span className={styles.playIconWrapper} aria-hidden="true">
                    <Play size={13} fill="currentColor" strokeWidth={0} />
                  </span>
                  <span>View Our Work</span>
                </a>
              </MagneticButton>
            </motion.div>

            {/* Trust Indicator with 4 Avatars */}
            <motion.div
              className={styles.trustCluster}
              initial="hidden"
              animate="visible"
              custom={6}
              variants={fadeUpVariants}
            >
              <div className={styles.avatarGroup} aria-hidden="true">
                <div className={styles.avatarItem}>
                  <Image
                    src="/images/hero/avatar-1.webp"
                    alt="Client avatar 1"
                    width={34}
                    height={34}
                    className={styles.avatarImg}
                  />
                </div>
                <div className={styles.avatarItem}>
                  <Image
                    src="/images/hero/avatar-2.webp"
                    alt="Client avatar 2"
                    width={34}
                    height={34}
                    className={styles.avatarImg}
                  />
                </div>
                <div className={styles.avatarItem}>
                  <Image
                    src="/images/hero/avatar-3.webp"
                    alt="Client avatar 3"
                    width={34}
                    height={34}
                    className={styles.avatarImg}
                  />
                </div>
                <div className={styles.avatarItem}>
                  <Image
                    src="/images/hero/avatar-4.webp"
                    alt="Client avatar 4"
                    width={34}
                    height={34}
                    className={styles.avatarImg}
                  />
                </div>
              </div>

              <div className={styles.trustText}>
                <span className={styles.trustDot}>•</span>
                <span>Trusted by growing businesses across India.</span>
              </div>
            </motion.div>

            {/* Hero Metrics Row with smooth CountUp */}
            <motion.div
              className={styles.metricsRow}
              initial="hidden"
              animate="visible"
              custom={7}
              variants={fadeUpVariants}
            >
              <div className={styles.metricItem}>
                <div className={styles.metricIcon}>
                  <FileText size={20} strokeWidth={1.75} />
                </div>
                <div className={styles.metricContent}>
                  <span className={styles.metricValue}>
                    <CountUp value="50+" />
                  </span>
                  <span className={styles.metricLabel}>Projects Delivered</span>
                </div>
              </div>

              <div className={styles.metricDivider} />

              <div className={styles.metricItem}>
                <div className={styles.metricIcon}>
                  <Star size={20} strokeWidth={1.75} />
                </div>
                <div className={styles.metricContent}>
                  <span className={styles.metricValue}>
                    <CountUp value="4.9/5" />
                  </span>
                  <span className={styles.metricLabel}>Client Rating</span>
                </div>
              </div>

              <div className={styles.metricDivider} />

              <div className={styles.metricItem}>
                <div className={styles.metricIcon}>
                  <Users size={20} strokeWidth={1.75} />
                </div>
                <div className={styles.metricContent}>
                  <span className={styles.metricValue}>
                    <CountUp value="3+" />
                  </span>
                  <span className={styles.metricLabel}>Markets</span>
                </div>
              </div>

              <div className={styles.metricDivider} />

              <div className={styles.metricItem}>
                <div className={styles.metricIcon}>
                  <Target size={20} strokeWidth={1.75} />
                </div>
                <div className={styles.metricContent}>
                  <span className={styles.metricValue}>
                    <CountUp value="95+" />
                  </span>
                  <span className={styles.metricLabel}>Growth-Focused</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Ambient showcase space allowing background tech video to shine cleanly */}
          <div className={styles.heroVisualSpace} aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}
