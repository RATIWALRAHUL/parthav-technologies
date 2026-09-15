"use client";

import React from "react";
import { Search, Compass, PenTool, Code2, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/data/process";
import styles from "./Process.module.css";

const STEP_ICONS: Record<string, React.ReactNode> = {
  Search: <Search size={18} strokeWidth={1.8} />,
  Compass: <Compass size={18} strokeWidth={1.8} />,
  PenTool: <PenTool size={18} strokeWidth={1.8} />,
  Code2: <Code2 size={18} strokeWidth={1.8} />,
  Rocket: <Rocket size={18} strokeWidth={1.8} />,
};

export function Process() {
  return (
    <section id="process" className={styles.processSection} aria-label="Our 5-Step Process">
      <Container>
        {/* Header */}
        <div className={styles.headerRow}>
          <div>
            <Reveal>
              <span className={styles.eyebrow}>OUR PROCESS</span>
              <h2 className={styles.headline}>
                A clear process. <br />
                No black box.
              </h2>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.1}>
              <p className={styles.subtitle}>
                Transparent, collaborative and focused on your business goals.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 5 Steps Grid with Connecting Line */}
        <div className={styles.processContainer}>
          {/* Desktop Connecting Line */}
          <div className={styles.lineTrack} aria-hidden="true">
            <motion.div
              className={styles.lineProgress}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className={styles.stepsGrid}>
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                className={styles.stepCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className={styles.stepTop}>
                  <motion.span
                    className={styles.stepIconBox}
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.12 + 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {STEP_ICONS[step.iconName]}
                  </motion.span>
                  <span className={styles.stepNum}>{step.step}</span>
                </div>

                <h3 className={styles.stepTitle}>{step.title}</h3>
                <motion.p
                  className={styles.stepDesc}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.12 + 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {step.description}
                </motion.p>
              </motion.div>
            ))}
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
