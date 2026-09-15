"use client";

import React, { useRef } from "react";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import {
  House,
  HeartPulse,
  ShoppingCart,
  GraduationCap,
  Landmark,
  Plane,
  Utensils,
  Factory,
  HandHeart,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IndustryItem } from "./IndustryItem";
import { INDUSTRIES_DATA } from "@/data/industries";
import styles from "./IndustriesWeServe.module.css";

interface IndustriesWeServeProps {
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

const TOUCH_RESUME_DELAY = 1500;

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  "real-estate": House,
  healthcare: HeartPulse,
  ecommerce: ShoppingCart,
  education: GraduationCap,
  finance: Landmark,
  "travel-tourism": Plane,
  hospitality: Utensils,
  manufacturing: Factory,
  "non-profit": HandHeart,
};

function IndustryRow() {
  return (
    <>
      {INDUSTRIES_DATA.map((industry, index) => (
        <React.Fragment key={industry.id}>
          {index > 0 && <span className={styles.divider} aria-hidden="true" />}
          <IndustryItem industry={industry} icon={INDUSTRY_ICONS[industry.id]} />
        </React.Fragment>
      ))}
    </>
  );
}

export function IndustriesWeServe({
  direction = "left",
  pauseOnHover = true,
}: IndustriesWeServeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pause = () => {
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
      resumeTimeout.current = null;
    }
    trackRef.current?.classList.add(styles.paused);
  };

  const resume = (delay: number) => {
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
    }
    resumeTimeout.current = setTimeout(() => {
      trackRef.current?.classList.remove(styles.paused);
    }, delay);
  };
  return (
    <section className={styles.section} aria-label="Industries We Serve">
      <Container>
        <Reveal className={styles.eyebrowWrap} duration={0.5}>
          <span className="eyebrow">INDUSTRIES WE SERVE</span>
        </Reveal>
      </Container>

      <Reveal duration={0.6} yOffset={12}>
        <div
          className={styles.marqueeViewport}
          onMouseEnter={pauseOnHover ? pause : undefined}
          onMouseLeave={pauseOnHover ? () => resume(0) : undefined}
          onTouchStart={pause}
          onTouchEnd={() => resume(TOUCH_RESUME_DELAY)}
        >
          <div
            ref={trackRef}
            className={clsx(
              styles.track,
              direction === "right" && styles.trackReverse
            )}
          >
            <div className={styles.trackSet}>
              <IndustryRow />
            </div>
            <div className={styles.duplicateGroup} aria-hidden="true">
              <span className={styles.divider} />
              <div className={styles.trackSet}>
                <IndustryRow />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
