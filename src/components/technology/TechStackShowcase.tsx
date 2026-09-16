"use client";

import React, { useRef, useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TechnologyCard } from "./TechnologyCard";
import {
  TECHNOLOGIES_DATA,
  CATEGORY_FILTERS,
  type TechnologyCategory,
} from "@/data/technologies";
import styles from "./TechStackShowcase.module.css";

interface TechStackShowcaseProps {
  className?: string;
}

const TOUCH_RESUME_DELAY = 1600;

export function TechStackShowcase({ className }: TechStackShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<TechnologyCategory>("all");
  const trackRef1 = useRef<HTMLDivElement>(null);
  const trackRef2 = useRef<HTMLDivElement>(null);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Split into 2 balanced rows for the marquee
  const row1 = TECHNOLOGIES_DATA.slice(0, Math.ceil(TECHNOLOGIES_DATA.length / 2));
  const row2 = TECHNOLOGIES_DATA.slice(Math.ceil(TECHNOLOGIES_DATA.length / 2));

  // Filtered list when category filter is selected
  const filteredTechs =
    activeCategory === "all"
      ? TECHNOLOGIES_DATA
      : TECHNOLOGIES_DATA.filter((tech) => tech.category === activeCategory);

  const pause = () => {
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
      resumeTimeout.current = null;
    }
    trackRef1.current?.classList.add(styles.paused);
    trackRef2.current?.classList.add(styles.paused);
  };

  const resume = (delay: number) => {
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
    }
    resumeTimeout.current = setTimeout(() => {
      trackRef1.current?.classList.remove(styles.paused);
      trackRef2.current?.classList.remove(styles.paused);
    }, delay);
  };

  return (
    <section
      id="tech-stack"
      className={clsx(styles.section, className)}
      aria-label="Our Technology Stack"
    >
      <Container>
        <div className={styles.header}>
          <Reveal duration={0.4}>
            <span className="eyebrow">OUR TECHNOLOGY STACK</span>
          </Reveal>
          <Reveal duration={0.5} yOffset={14}>
            <h2 className={styles.heading}>
              Built with the <span className={styles.highlight}>right technology</span>.
            </h2>
          </Reveal>
          <Reveal duration={0.6} yOffset={16}>
            <p className={styles.subheading}>
              We choose proven technologies and modern tools based on the product,
              business requirements and long-term scalability.
            </p>
          </Reveal>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <Reveal duration={0.5} yOffset={12}>
          <div className={styles.filterWrapper} role="tablist" aria-label="Technology Categories">
            {CATEGORY_FILTERS.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={clsx(styles.filterBtn, isActive && styles.filterBtnActive)}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </Reveal>
      </Container>

      {/* CONTINUOUS DUAL MARQUEE (SHOWN WHEN "ALL" IS SELECTED) */}
      {activeCategory === "all" ? (
        <Reveal duration={0.6} yOffset={14}>
          <div
            className={styles.marqueeViewport}
            onMouseEnter={pause}
            onMouseLeave={() => resume(0)}
            onTouchStart={pause}
            onTouchEnd={() => resume(TOUCH_RESUME_DELAY)}
          >
            {/* ROW 1: Moves Left */}
            <div ref={trackRef1} className={styles.track}>
              <div className={styles.trackSet}>
                {row1.map((tech) => (
                  <TechnologyCard key={tech.id} tech={tech} />
                ))}
              </div>
              <div className={styles.trackSet} aria-hidden="true">
                {row1.map((tech) => (
                  <TechnologyCard key={`dup1-${tech.id}`} tech={tech} />
                ))}
              </div>
            </div>

            {/* ROW 2: Moves Right */}
            <div ref={trackRef2} className={clsx(styles.track, styles.trackReverse)}>
              <div className={styles.trackSet}>
                {row2.map((tech) => (
                  <TechnologyCard key={tech.id} tech={tech} />
                ))}
              </div>
              <div className={styles.trackSet} aria-hidden="true">
                {row2.map((tech) => (
                  <TechnologyCard key={`dup2-${tech.id}`} tech={tech} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      ) : (
        /* FILTERED GRID VIEW (SHOWN WHEN A SPECIFIC CATEGORY IS SELECTED) */
        <Container>
          <div className={styles.filteredGrid} role="tabpanel">
            {filteredTechs.map((tech) => (
              <TechnologyCard key={tech.id} tech={tech} />
            ))}
          </div>
        </Container>
      )}
    </section>
  );
}
