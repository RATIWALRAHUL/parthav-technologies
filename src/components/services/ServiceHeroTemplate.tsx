"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, ChevronRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import styles from "./ServiceHeroTemplate.module.css";

const STANDARD_EASE = [0.22, 1, 0.36, 1] as const;

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface HeroBenefit {
  label: string;
  icon: React.ReactNode;
}

interface ServiceHeroTemplateProps {
  ariaLabel: string;
  breadcrumbItems?: BreadcrumbItem[];
  eyebrow: string;
  headlineLines: { text: string; orange?: boolean }[];
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  benefits: HeroBenefit[];
  scriptLines?: string[];
  verticalWords?: string[];
  imageSrc: string;
  floatingBadgeText?: string;
}

/**
 * Shared hero layout for /services and its sub-pages (e.g. /services/web-development).
 * The hero image is a full-bleed background anchored to the right (same technique as
 * Home Hero's heroVideoBackgroundWrapper: object-position right + a white gradient
 * overlay that fades the image out before it reaches the text column), so nothing
 * ever shows behind the left-side content. Reuses Home Hero's exact motion variants
 * and CTA styling — see ServiceHeroTemplate.module.css.
 */
export function ServiceHeroTemplate({
  ariaLabel,
  breadcrumbItems,
  eyebrow,
  headlineLines,
  description,
  primaryCta,
  secondaryCta,
  benefits,
  scriptLines,
  verticalWords,
  imageSrc,
  floatingBadgeText,
}: ServiceHeroTemplateProps) {
  const shouldReduceMotion = useReducedMotion();

  // Identical to Home Hero's fadeUpVariants (Hero.tsx) — same y-offset, duration, stagger, ease.
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: custom * 0.08, ease: STANDARD_EASE },
    }),
  };

  // Identical to Home Hero's lineVariants — used for the headline lines.
  const lineVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: custom * 0.07, ease: STANDARD_EASE },
    }),
  };

  // Identical to Home Hero's videoRevealVariants — same scale/offset/duration for the hero visual.
  const visualVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.04,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.05, ease: STANDARD_EASE },
    },
  };

  let custom = 0;
  const breadcrumbCustom = breadcrumbItems ? custom++ : -1;
  const eyebrowCustom = custom++;
  const headlineCustomStart = custom;
  custom += headlineLines.length;
  const descriptionCustom = custom++;
  const ctaCustom = custom++;
  const benefitsCustom = custom++;

  return (
    <section className={styles.heroSection} aria-label={ariaLabel}>
      {/* Full-bleed background image, right-anchored and faded out before the text column. */}
      <motion.div
        className={styles.heroBgWrapper}
        aria-hidden="true"
        initial="hidden"
        animate="visible"
        variants={visualVariants}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroBgImage}
        />
        <div className={styles.heroBgOverlay} />

        {scriptLines && (
          <span className={styles.scriptNote}>
            {scriptLines.map((line, index) => (
              <React.Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </span>
        )}

        {verticalWords && (
          <span className={styles.verticalWords}>
            {verticalWords.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </span>
        )}

        {floatingBadgeText && (
          <div className={styles.floatingBadge}>
            <span className={styles.floatingBadgeDot} />
            {floatingBadgeText}
          </div>
        )}
      </motion.div>

      <Container className={styles.heroContainer}>
        <div className={styles.heroGrid}>
          {/* Messaging */}
          <div className={styles.heroContent}>
            {breadcrumbItems && (
              <motion.nav
                className={styles.breadcrumb}
                aria-label="Breadcrumb"
                initial="hidden"
                animate="visible"
                custom={breadcrumbCustom}
                variants={fadeUpVariants}
              >
                <ol className={styles.breadcrumbList}>
                  {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={item.label}>
                      {index > 0 && (
                        <li aria-hidden="true">
                          <ChevronRight size={14} strokeWidth={2} />
                        </li>
                      )}
                      <li aria-current={!item.href ? "page" : undefined}>
                        {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
                      </li>
                    </React.Fragment>
                  ))}
                </ol>
              </motion.nav>
            )}

            <motion.div
              className={styles.eyebrowRow}
              initial="hidden"
              animate="visible"
              custom={eyebrowCustom}
              variants={fadeUpVariants}
            >
              <span className={styles.eyebrowLine} aria-hidden="true" />
              <span className={styles.eyebrow}>{eyebrow}</span>
            </motion.div>

            <h1 className={styles.headline}>
              {headlineLines.map((line, index) => (
                <motion.span
                  key={line.text}
                  className={`${styles.headlineLine} ${line.orange ? styles.orangeText : ""}`}
                  initial="hidden"
                  animate="visible"
                  custom={headlineCustomStart + index}
                  variants={lineVariants}
                >
                  {line.text}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className={styles.description}
              initial="hidden"
              animate="visible"
              custom={descriptionCustom}
              variants={fadeUpVariants}
            >
              {description}
            </motion.p>

            <motion.div
              className={styles.ctaGroup}
              initial="hidden"
              animate="visible"
              custom={ctaCustom}
              variants={fadeUpVariants}
            >
              <MagneticButton maxMovement={10}>
                <Link href={primaryCta.href} className={styles.primaryCta}>
                  <span>{primaryCta.label}</span>
                  <ArrowRight size={17} strokeWidth={2} className={styles.arrowIcon} />
                </Link>
              </MagneticButton>

              <MagneticButton maxMovement={6}>
                <Link href={secondaryCta.href} className={styles.secondaryCta}>
                  <span className={styles.playIconWrapper} aria-hidden="true">
                    <Play size={11} fill="currentColor" strokeWidth={0} />
                  </span>
                  <span>{secondaryCta.label}</span>
                </Link>
              </MagneticButton>
            </motion.div>

            <motion.div
              className={styles.benefitsRow}
              initial="hidden"
              animate="visible"
              custom={benefitsCustom}
              variants={fadeUpVariants}
            >
              {benefits.map((benefit) => (
                <div key={benefit.label} className={styles.benefitItem}>
                  <span className={styles.benefitIcon} aria-hidden="true">
                    {benefit.icon}
                  </span>
                  <span>{benefit.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Empty column reserving space at desktop so text never overlaps the visible image. */}
          <div className={styles.heroVisualSpace} aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}
