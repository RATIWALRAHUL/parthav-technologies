"use client";

import React from "react";
import {
  ArrowRight,
  Target,
  Palette,
  TrendingUp,
  BrainCircuit,
  Search,
  PenTool,
  Code2,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./WhyParthav.module.css";

const PRINCIPLES = [
  {
    icon: <Target size={22} strokeWidth={1.8} />,
    title: "Strategy before pixels",
    desc: "We define the right roadmap, market alignment and technology path, not just the visual surface.",
  },
  {
    icon: <Palette size={22} strokeWidth={1.8} />,
    title: "Design before code",
    desc: "We craft seamless product experiences, intuitive flows and design systems that users love.",
  },
  {
    icon: <TrendingUp size={22} strokeWidth={1.8} />,
    title: "SEO and performance built in",
    desc: "We engineer for sub-second page loads, Core Web Vitals excellence and organic search visibility.",
  },
  {
    icon: <BrainCircuit size={22} strokeWidth={1.8} />,
    title: "AI where it creates real leverage",
    desc: "We integrate practical AI automation and intelligence where it delivers measurable business scale.",
  },
];

const PROCESS_NODES = [
  {
    label: "Discover",
    desc: "Understand your users, goals and market.",
    icon: <Search size={18} />,
  },
  {
    label: "Design",
    desc: "Turn strategy into clear digital experiences.",
    icon: <PenTool size={18} />,
  },
  {
    label: "Build",
    desc: "Develop fast, reliable and scalable products.",
    icon: <Code2 size={18} />,
  },
  {
    label: "Launch",
    desc: "Test, refine and release with confidence.",
    icon: <Rocket size={18} />,
  },
  {
    label: "Grow",
    desc: "Optimize, learn and improve continuously.",
    icon: <TrendingUp size={18} />,
  },
];

export function WhyParthav() {
  return (
    <section id="why-parthav" className={styles.whySection} aria-label="Why Parthav Technologies">
      <Container>
        <div className={styles.inner}>
          {/* Section Header */}
          <div className={styles.headerRow}>
            <div className={styles.titleArea}>
              <Reveal>
                <span className={styles.eyebrow}>WHY PARTHAV</span>
                <h2 className={styles.headline}>
                  Not just a vendor. <br />
                  <span className={styles.orangeText}>Your digital growth partner.</span>
                </h2>
              </Reveal>
            </div>

            <div className={styles.copyArea}>
              <Reveal delay={0.1}>
                <p className={styles.copyText}>
                  We go beyond execution. We bring strategy, design, engineering and growth together — so your digital products don&apos;t just look good, they perform.
                </p>
              </Reveal>
              <a href="#contact" className={styles.headerArrowBtn} aria-label="Contact Parthav">
                <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* 4 Principles Grid */}
          <div className={styles.principlesGrid}>
            {PRINCIPLES.map((item, index) => (
              <motion.div
                key={item.title}
                className={styles.principleCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <span className={styles.principleIconCircle} aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className={styles.principleTitle}>{item.title}</h3>
                <p className={styles.principleDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Horizontal Process Progression Line */}
          <motion.div
            className={styles.processLineContainer}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.processTrack}>
              <div className={styles.processConnectorLine} aria-hidden="true">
                <motion.div
                  className={styles.processProgressFill}
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {PROCESS_NODES.map((node, index) => (
                <motion.div
                  key={node.label}
                  className={styles.processNode}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.12, duration: 0.4 }}
                >
                  <span className={styles.nodePill} aria-hidden="true">
                    {node.icon}
                  </span>
                  <span className={styles.nodeText}>
                    <span className={styles.nodeLabel}>{node.label}</span>
                    <motion.span
                      className={styles.nodeDesc}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.12, duration: 0.4 }}
                    >
                      {node.desc}
                    </motion.span>
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
