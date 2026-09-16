"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import styles from "./ServiceCtaBanner.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface ServiceCtaBannerProps {
  ariaLabel: string;
  eyebrow: string;
  headlineLines: { text: string; orange?: boolean }[];
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  visualPoints?: string[];
  scriptText?: string;
}

/**
 * Shared dark CTA banner for /services and its sub-pages. Design (layout, colors,
 * motion, visual tiles) is fixed — only the copy passed in changes per service.
 */
export function ServiceCtaBanner({
  ariaLabel,
  eyebrow,
  headlineLines,
  description,
  primaryCta,
  secondaryCta,
  visualPoints,
  scriptText,
}: ServiceCtaBannerProps) {
  return (
    <section className={styles.section} aria-label={ariaLabel}>
      <Container>
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className={styles.textSide}>
            <div className={styles.eyebrowRow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              <span className={styles.eyebrow}>{eyebrow}</span>
            </div>
            <h2 className={styles.headline}>
              {headlineLines.map((line, index) => (
                <React.Fragment key={line.text}>
                  {index > 0 && " "}
                  <span className={line.orange ? styles.orangeText : undefined}>
                    {line.text}
                  </span>
                </React.Fragment>
              ))}
            </h2>
            <p className={styles.description}>{description}</p>
            <div className={styles.ctaGroup}>
              <MagneticButton maxMovement={8}>
                <Button href={primaryCta.href} variant="primary" icon={<ArrowRight size={16} />}>
                  {primaryCta.label}
                </Button>
              </MagneticButton>

              {secondaryCta && (
                <Link href={secondaryCta.href} className={styles.secondaryCta}>
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>

          <div className={styles.visualSide} aria-hidden="true">
            {scriptText && <span className={styles.scriptNote}>{scriptText}</span>}
            <div className={styles.tileMain}>
              <span className={styles.tileMainSheen} />
            </div>
            <div className={styles.tileAccent} />
            {visualPoints && (
              <ul className={styles.pointList}>
                {visualPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
