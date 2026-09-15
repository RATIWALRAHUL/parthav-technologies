"use client";

import React from "react";
import { Briefcase, Star, Globe, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { IMPACT_METRICS } from "@/data/company";
import styles from "./ImpactMetrics.module.css";

import { CountUp } from "@/components/ui/CountUp";

const METRIC_ICONS: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase size={22} strokeWidth={1.8} />,
  Star: <Star size={22} strokeWidth={1.8} />,
  Globe: <Globe size={22} strokeWidth={1.8} />,
  Zap: <Zap size={22} strokeWidth={1.8} />,
};

export function ImpactMetrics() {
  return (
    <section className={styles.impactSection} aria-label="Progress in Numbers">
      <Container>
        <div className={styles.inner}>
          <div className={styles.headerRow}>
            <div>
              <span className={styles.eyebrow}>REAL IMPACT</span>
              <h2 className={styles.headline}>Progress in numbers.</h2>
            </div>
            <p className={styles.disclaimer}>
              Representative performance targets / verified portfolio metrics.
            </p>
          </div>

          <div className={styles.metricsGrid}>
            {IMPACT_METRICS.map((item, index) => (
              <motion.div
                key={item.label}
                className={styles.metricCard}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.iconCircle} aria-hidden="true">
                  {METRIC_ICONS[item.iconName]}
                </div>
                <div className={styles.metricData}>
                  <span className={styles.metricValue}>
                    <CountUp value={item.value} durationMs={1400} />
                  </span>
                  <span className={styles.metricLabel}>{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
