"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import styles from "./AboutHero.module.css";

const STANDARD_EASE = [0.22, 1, 0.36, 1] as const;

export function AboutHero() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const videoParallaxY = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : 32]);

  // Animation variants matching Homepage Hero system
  const lineVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: custom * 0.08,
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

  return (
    <section className={styles.heroSection} aria-label="About Parthav Technologies">
      {/* Complete Hero Section Background Animated Video (Exact Homepage System) */}
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
          <source src="/videos/hero-agency.webm" type="video/webm" />
        </video>
        <div className={styles.heroVideoOverlay} />
      </motion.div>

      <Container className={styles.heroContainer}>
        <div className={styles.heroGrid}>
          {/* ========================================================
              LEFT COLUMN: Messaging, H1, Description, CTAs
             ======================================================== */}
          <div className={styles.heroContent}>
            {/* Eyebrow */}
            <motion.div
              className={styles.eyebrow}
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUpVariants}
            >
              <span className={styles.eyebrowDot}>•</span>
              <span>ABOUT PARTHAV TECHNOLOGIES</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className={styles.headline}>
              <motion.span
                className={styles.headlineLine}
                initial="hidden"
                animate="visible"
                custom={2}
                variants={lineVariants}
              >
                Turning visionary
              </motion.span>
              <motion.span
                className={styles.headlineLine}
                initial="hidden"
                animate="visible"
                custom={3}
                variants={lineVariants}
              >
                ideas into
              </motion.span>
              <motion.span
                className={`${styles.headlineLine} ${styles.orangeText}`}
                initial="hidden"
                animate="visible"
                custom={4}
                variants={lineVariants}
              >
                measurable impact.
              </motion.span>
            </h1>

            {/* Supporting Description */}
            <motion.p
              className={styles.description}
              initial="hidden"
              animate="visible"
              custom={5}
              variants={fadeUpVariants}
            >
              Parthav Technologies is a Jaipur-based digital technology partner helping
              ambitious businesses turn ideas into meaningful digital experiences — through
              strategy, design, development, AI and digital growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className={styles.ctaGroup}
              initial="hidden"
              animate="visible"
              custom={6}
              variants={fadeUpVariants}
            >
              <MagneticButton maxMovement={10}>
                <Link
                  href="/#contact"
                  className={styles.primaryCta}
                  id="about-hero-start-conversation-btn"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight size={17} className={styles.arrowIcon} />
                </Link>
              </MagneticButton>

              <MagneticButton maxMovement={6}>
                <Link
                  href="/services"
                  className={styles.secondaryCta}
                  id="about-hero-explore-services-btn"
                >
                  <span className={styles.playIconWrapper} aria-hidden="true">
                    <Play size={13} fill="currentColor" strokeWidth={0} />
                  </span>
                  <span>Explore Our Services</span>
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Mobile Video Visual (Visible under 1024px) */}
            <div className={styles.mobileVideoCard}>
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/images/hero/hero-agency-poster.webp"
                className={styles.mobileVideo}
              >
                <source src="/videos/hero-agency.mp4" type="video/mp4" />
                <source src="/videos/hero-agency.webm" type="video/webm" />
              </video>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: Ambient Showcase Space for Background Video
             ======================================================== */}
          <div className={styles.heroVisualSpace} aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}
