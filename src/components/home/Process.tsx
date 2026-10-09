"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Compass, PenTool, Code2, Rocket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS_STEPS, type ProcessStep } from "@/data/process";
import styles from "./Process.module.css";

const STEP_ICONS: Record<string, React.ReactNode> = {
  Search: <Search size={18} strokeWidth={1.8} />,
  Compass: <Compass size={18} strokeWidth={1.8} />,
  PenTool: <PenTool size={18} strokeWidth={1.8} />,
  Code2: <Code2 size={18} strokeWidth={1.8} />,
  Rocket: <Rocket size={18} strokeWidth={1.8} />,
};

interface ProcessProps {
  eyebrow?: string;
  heading?: React.ReactNode;
  subtitle?: string;
  steps?: ProcessStep[];
  cta?: { label: string; href: string };
}

export function Process({
  eyebrow = "OUR PROCESS",
  heading = (
    <>
      A clear process. <br />
      No black box.
    </>
  ),
  subtitle = "Transparent, collaborative and focused on your business goals.",
  steps = PROCESS_STEPS,
  cta,
}: ProcessProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const activeIndex = hoveredStep !== null ? hoveredStep : selectedStep;

  return (
    <section id="process" className={styles.processSection} aria-label="Our 5-Step Process">
      <Container>
        {/* Header */}
        <div className={styles.headerRow}>
          <div>
            <Reveal>
              <span className={styles.eyebrow}>{eyebrow}</span>
              <h2 className={styles.headline}>{heading}</h2>
            </Reveal>
          </div>

          <div className={styles.headerRight}>
            <Reveal delay={0.1}>
              <p className={styles.subtitle}>{subtitle}</p>
              {cta && (
                <Link href={cta.href} className={styles.headerCta}>
                  <span>{cta.label}</span>
                  <ArrowRight size={15} strokeWidth={2} />
                </Link>
              )}
            </Reveal>
          </div>
        </div>

        {/* 5 Steps Grid with Process-based Glow */}
        <div className={styles.processContainer}>
          <div className={styles.stepsGrid}>
            {steps.map((step, index) => {
              const isCurrent = activeIndex === index;
              const isPreceding = activeIndex > index;
              const inProcess = activeIndex >= index;

              return (
                <motion.div
                  key={step.step}
                  role="button"
                  tabIndex={0}
                  className={clsx(
                    styles.stepCard,
                    isCurrent && styles.stepCardCurrent,
                    isPreceding && styles.stepCardPreceding,
                    inProcess && styles.stepCardInProcess
                  )}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => setSelectedStep(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedStep(index);
                    }
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  aria-label={`Step ${step.step}: ${step.title}`}
                >
                  {/* Luminous Top Glow Beam */}
                  <div
                    className={clsx(
                      styles.cardGlowBeam,
                      isCurrent && styles.cardGlowBeamCurrent,
                      isPreceding && styles.cardGlowBeamPreceding
                    )}
                    aria-hidden="true"
                  />

                  <div className={styles.stepTop}>
                    <motion.span
                      className={clsx(
                        styles.stepIconBox,
                        isCurrent && styles.stepIconBoxCurrent,
                        isPreceding && styles.stepIconBoxPreceding
                      )}
                      aria-hidden="true"
                      animate={
                        isCurrent
                          ? { scale: [1, 1.08, 1] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      {STEP_ICONS[step.iconName]}
                    </motion.span>
                    <span
                      className={clsx(
                        styles.stepNum,
                        inProcess && styles.stepNumActive
                      )}
                    >
                      {step.step}
                    </span>
                  </div>

                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Milestone Footer Banner */}
        <Reveal delay={0.3} className={styles.milestoneBar}>
          <span>Client check-ins</span>
          <span className={styles.milestoneDot}>•</span>
          <span>Milestone approvals</span>
          <span className={styles.milestoneDot}>•</span>
          <span>Transparent delivery</span>
        </Reveal>
      </Container>
    </section>
  );
}
