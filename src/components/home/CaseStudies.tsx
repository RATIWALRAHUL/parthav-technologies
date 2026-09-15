"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FEATURED_PROJECTS } from "@/data/projects";
import styles from "./CaseStudies.module.css";

import { CountUp } from "@/components/ui/CountUp";

const STANDARD_EASE = [0.22, 1, 0.36, 1] as const;

export function CaseStudies() {
  return (
    <section id="work" className={styles.workSection} aria-label="Featured Work">
      <Container>
        {/* Section Header */}
        <div className={styles.headerRow}>
          <div>
            <Reveal>
              <span className={styles.eyebrow}>FEATURED WORK</span>
              <h2 className={styles.headline}>
                Real solutions. <span className={styles.orangeText}>Real results.</span>
              </h2>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.1}>
              <a href="#contact" className={styles.viewAllBtn}>
                <span>View all work</span>
                <ArrowRight size={15} />
              </a>
            </Reveal>
          </div>
        </div>

        {/* 3 Case Study Cards */}
        <div className={styles.cardsGrid}>
          {FEATURED_PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              className={styles.projectCard}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: STANDARD_EASE }}
            >
              <div className={styles.imageWrapper}>
                <motion.div
                  initial={{ scale: 1.06, opacity: 0.8 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: STANDARD_EASE }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Image
                    src={project.imageSrc}
                    alt={`${project.title} - ${project.category} case study preview`}
                    width={606}
                    height={228}
                    className={styles.projectImage}
                  />
                </motion.div>
              </div>

              <div className={styles.cardBody}>
                <span className={styles.categoryTag}>{project.category}</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Problem</span>
                  <span className={styles.detailText}>{project.problem}</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Solution</span>
                  <span className={styles.detailText}>{project.solution}</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Services</span>
                  <span className={styles.detailText}>{project.services}</span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.metricBadge}>
                  <span className={styles.metricValue}>
                    <CountUp value={project.metricValue} durationMs={1200} />
                  </span>
                  <span className={styles.metricLabel}>{project.metricLabel}</span>
                </div>

                <Link href={project.href} className={styles.actionCircle} aria-label={`View ${project.title}`}>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
