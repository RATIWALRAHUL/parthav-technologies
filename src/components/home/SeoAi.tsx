"use client";

import Link from "next/link";
import { Search, Check, Sparkles, ArrowRight, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./SeoAi.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const SEO_SIGNALS = [
  "Technical SEO",
  "Structured Content",
  "Schema Markup",
  "Core Web Vitals",
  "AI Search Optimization",
  "GEO / AEO Readiness",
];

const GROWTH_METRICS = [
  { label: "Visibility", path: "M2 20 C 10 17, 16 12, 24 9 C 32 6, 38 4, 46 2" },
  { label: "Discoverability", path: "M2 18 C 10 16, 16 14, 24 10 C 32 7, 38 5, 46 3" },
  { label: "Performance", path: "M2 19 C 10 15, 16 13, 24 8 C 32 5, 38 3, 46 1" },
];

const AI_SIGNALS = [
  "Content understood",
  "Structured data detected",
  "Entity context connected",
];

export function SeoAi() {
  return (
    <section className={styles.seoSection} id="seo-ai">
      <Container>
        <div className={styles.innerGrid}>
          {/* Left Narrative */}
          <div className={styles.contentArea}>
            <Reveal direction="up" delay={0.1}>
              <span className={styles.eyebrow}>SEARCH VISIBILITY & AI</span>
              <h2 className={styles.headline}>
                Build once. <br />
                Stay <span className={styles.orangeText}>discoverable.</span>
              </h2>
              <p className={styles.description}>
                We engineer digital products and websites that perform across traditional search engines and emerging AI answer engines (AEO/GEO). High Core Web Vitals, structured schema, and authority-first content architectures ensure durable organic acquisition.
              </p>
              <Link href="#contact" className={styles.ctaBtn}>
                <span>Get SEO & AI Audit</span>
                <ArrowRight size={16} strokeWidth={2.2} />
              </Link>
            </Reveal>
          </div>

          {/* Right Dashboard Card */}
          <Reveal direction="up" delay={0.25}>
            <div className={styles.dashboardCard}>
              <div className={styles.dashboardLeft}>
                {/* Search Bar Preview */}
                <motion.div
                  className={styles.searchBar}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <Search size={16} className={styles.searchIcon} strokeWidth={2} />
                  <span className={styles.searchText}>
                    How do people find your business?
                  </span>
                </motion.div>

                {/* Illustrative Search Result Preview */}
                <motion.div
                  className={styles.resultCard}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
                >
                  <div className={styles.resultInfo}>
                    <span className={styles.resultTitle}>Your Business</span>
                    <span className={styles.resultUrl}>yourbusiness.com</span>
                    <p className={styles.resultDesc}>
                      Digital products • Web • AI • Growth
                    </p>
                  </div>
                </motion.div>

                {/* Growth Visualization (illustrative, no metrics implied) */}
                <motion.div
                  className={styles.growthStrip}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.5, delay: 0.24, ease: EASE }}
                >
                  {GROWTH_METRICS.map((metric) => (
                    <div key={metric.label} className={styles.growthItem}>
                      <svg viewBox="0 0 48 22" fill="none" className={styles.growthSpark}>
                        <motion.path
                          d={metric.path}
                          stroke="#27D08E"
                          strokeWidth="2"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true, amount: 0 }}
                          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
                        />
                      </svg>
                      <span className={styles.growthLabel}>{metric.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right Checklist */}
              <div className={styles.dashboardRight}>
                <ul className={styles.checklist}>
                  {SEO_SIGNALS.map((signal, index) => (
                    <motion.li
                      key={signal}
                      className={styles.checkItem}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.09, ease: EASE }}
                    >
                      <span className={styles.checkBadge}>
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{signal}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className={styles.aiCard}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.5, delay: 0.9, ease: EASE }}
                >
                  <div className={styles.aiCardTitle}>
                    <BrainCircuit size={14} strokeWidth={2} />
                    <span>AI Search</span>
                  </div>
                  <ul className={styles.aiCardList}>
                    {AI_SIGNALS.map((signal) => (
                      <li key={signal} className={styles.checkItem}>
                        <span className={styles.checkBadge}>
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span>{signal}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  className={styles.aiPillBadge}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.5, delay: 1.05, ease: EASE }}
                >
                  <Sparkles size={14} />
                  <span>GEO & AI Answer Ready</span>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
