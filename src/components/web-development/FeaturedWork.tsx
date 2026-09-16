"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FEATURED_PROJECTS, type ProjectItem } from "@/data/projects";
import sharedStyles from "@/components/services/ServicesExplorer.module.css";
import styles from "./FeaturedWork.module.css";

const STANDARD_EASE = [0.22, 1, 0.36, 1] as const;

interface FeaturedWorkProps {
  projects?: ProjectItem[];
  eyebrow?: string;
  headlineLines?: { text: string; orange?: boolean }[];
  subtitle?: string;
  sectionId?: string;
}

export function FeaturedWork({
  projects = FEATURED_PROJECTS,
  eyebrow = "FEATURED WORK",
  headlineLines = [{ text: "Real Projects." }, { text: "Real Impact.", orange: true }],
  subtitle = "Explore selected web development projects across different industries.",
  sectionId = "web-dev-work",
}: FeaturedWorkProps) {
  if (projects.length === 0) return null;

  return (
    <section id={sectionId} className={styles.section} aria-label="Featured work">
      <Container>
        <div className={sharedStyles.headerRow}>
          <Reveal className={sharedStyles.headerLeft}>
            <div className={sharedStyles.eyebrowRow}>
              <span className={sharedStyles.eyebrowLine} aria-hidden="true" />
              <span className={sharedStyles.eyebrow}>{eyebrow}</span>
            </div>
            <h2 className={sharedStyles.headline}>
              {headlineLines.map((line, i) => (
                <React.Fragment key={line.text}>
                  {i > 0 && <br />}
                  <span className={line.orange ? sharedStyles.orangeText : sharedStyles.navyText}>
                    {line.text}
                  </span>
                </React.Fragment>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className={sharedStyles.headerRight}>
            <p className={sharedStyles.subtitle}>{subtitle}</p>
            <Link href="/#work" className={sharedStyles.viewAllLink}>
              <span>View All Projects</span>
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className={styles.card}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: STANDARD_EASE }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={project.imageSrc}
                  alt={`${project.title} — ${project.category} project preview`}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className={styles.image}
                />
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.cardMeta}>
                  <span className={styles.categoryTag}>{project.category}</span>
                  <h3 className={styles.title}>{project.title}</h3>
                  <div className={styles.tagRow}>
                    {project.services.split(",").map((tag) => (
                      <span key={tag.trim()} className={styles.tag}>
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={project.href}
                  className={styles.actionCircle}
                  aria-label={`View ${project.title}`}
                >
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
