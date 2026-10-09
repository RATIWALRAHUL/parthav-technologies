"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, UsersRound, ChartNoAxesCombined, Handshake } from "lucide-react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import styles from "./FoundingStory.module.css";

interface FoundingStoryProps {
  eyebrow?: string;
  headingLine1?: string;
  headingLine2Lead?: string;
  headingLine2Accent?: string;
  paragraph1?: string;
  paragraph2?: string;
}

export function FoundingStory({
  eyebrow = "OUR FOUNDING STORY",
  headingLine1 = "Built in Jaipur.",
  headingLine2Lead = "Engineered ",
  headingLine2Accent = "for the world.",
  paragraph1 = "Parthav Technologies was founded with a simple belief: technology should make ambitious ideas more useful, more scalable and more impactful.",
  paragraph2 = "We bring strategy, design and technology together to create digital products, platforms and growth systems built around real business goals.",
}: FoundingStoryProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="founding-story"
      className={styles.foundingSection}
      aria-label="Our Founding Story"
    >
      {/* Ambient Background Decorative System */}
      <div className={styles.ambientDecor} aria-hidden="true">
        <div className={styles.ambientGlow} />

        {/* Soft Translucent Blue Geometric Shape (Top-Right) */}
        <motion.div
          className={styles.shapeTopRight}
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, -8, 0], rotate: [25, 27, 25] }
          }
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Soft Translucent Blue Geometric Shape (Left Background) */}
        <motion.div
          className={styles.shapeLeft}
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, 8, 0], rotate: [-15, -13, -15] }
          }
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Thin Orange Orbit Curved Line looping behind the visual */}
        <motion.svg
          className={styles.orangeOrbitSvg}
          viewBox="0 0 620 480"
          fill="none"
          animate={
            shouldReduceMotion
              ? undefined
              : { rotate: [0, 1.2, 0], scale: [1, 1.015, 1] }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse
            cx="310"
            cy="240"
            rx="290"
            ry="190"
            stroke="#FF6A00"
            strokeWidth="1.5"
            strokeOpacity="0.22"
            strokeDasharray="12 8"
          />
        </motion.svg>
      </div>

      <Container className={styles.container}>
        <div className={styles.foundingGrid}>
          {/* ============================================================
             LEFT COLUMN: Jaipur Hawa Mahal Visual & Floating Location Badge
             ============================================================ */}
          <motion.div
            className={styles.visualColumn}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className={styles.imageCard}>
              <Image
                src="/images/about/jaipur-hawa-mahal.jpg"
                alt="Historic Hawa Mahal Palace in Jaipur Rajasthan illuminated at golden hour"
                width={720}
                height={540}
                className={styles.jaipurImg}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 620px"
                loading="lazy"
              />

              {/* Floating Location Badge */}
              <motion.div
                className={styles.locationBadge}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className={styles.pinWrapper}>
                  <MapPin size={22} strokeWidth={2.4} className={styles.pinIcon} />
                </div>
                <div className={styles.badgeText}>
                  <span className={styles.badgeTitle}>Jaipur, Rajasthan</span>
                  <span className={styles.badgeSub}>Our home. Global outlook.</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ============================================================
             RIGHT COLUMN: Editorial Story & 3 Principle Cards
             ============================================================ */}
          <div className={styles.contentColumn}>
            {/* Eyebrow */}
            <motion.div
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className={styles.eyebrowDot} aria-hidden="true" />
              <span>{eyebrow}</span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h2
              className={styles.headline}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {headingLine1} <br />
              {headingLine2Lead}
              <span className={styles.orangeText}>{headingLine2Accent}</span>
            </motion.h2>

            {/* Paragraph 1 */}
            <motion.p
              className={styles.paragraph}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {paragraph1}
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p
              className={clsx(styles.paragraph, styles.paragraphLast)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {paragraph2}
            </motion.p>

            {/* 3 Principles Grid */}
            <div className={styles.principlesGrid}>
              {/* Card 01: Direct Collaboration */}
              <motion.div
                className={styles.principleCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className={clsx(styles.iconBox, styles.peachIconBox)}>
                  <UsersRound size={22} strokeWidth={2} />
                </div>
                <h3 className={styles.cardTitle}>Direct Collaboration</h3>
                <p className={styles.cardDesc}>
                  Work directly with the people building and shaping the business.
                </p>
              </motion.div>

              {/* Card 02: Performance Mindset */}
              <motion.div
                className={styles.principleCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: 0.36,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className={clsx(styles.iconBox, styles.blueIconBox)}>
                  <ChartNoAxesCombined size={22} strokeWidth={2} />
                </div>
                <h3 className={styles.cardTitle}>Performance Mindset</h3>
                <p className={styles.cardDesc}>
                  Design and engineering decisions are made with long-term impact in mind.
                </p>
              </motion.div>

              {/* Card 03: Continuous Partnership */}
              <motion.div
                className={styles.principleCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: 0.44,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className={clsx(styles.iconBox, styles.peachIconBox)}>
                  <Handshake size={22} strokeWidth={2} />
                </div>
                <h3 className={styles.cardTitle}>Continuous Partnership</h3>
                <p className={styles.cardDesc}>
                  We invest beyond launch to improve, optimize and grow.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
