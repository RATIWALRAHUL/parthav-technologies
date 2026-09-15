"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import styles from "./TrustBar.module.css";

// Styled marks representing tech ecosystem and design principles
const ECOSYSTEM_MARKS = [
  { name: "TATA", symbol: "TATA" },
  { name: "Infosys", symbol: "Infosys" },
  { name: "Microsoft", symbol: "Microsoft" },
  { name: "Google", symbol: "Google" },
  { name: "AWS", symbol: "aws" },
  { name: "Adobe", symbol: "Adobe" },
  { name: "Notion", symbol: "N" },
];

export function TrustBar() {
  // Duplicate marks array for continuous, seamless infinite loop
  const duplicatedMarks = [...ECOSYSTEM_MARKS, ...ECOSYSTEM_MARKS];

  return (
    <section className={styles.trustSection} aria-label="Trusted Capabilities & Principles">
      <Container>
        <div className={styles.inner}>
          <div className={styles.labelRow}>
            <span className={styles.label}>
              TRUSTED BY TEAMS BUILDING WHAT&apos;S NEXT
            </span>
            <span className={styles.sideTagline}>
              Design-led. Engineering-driven. Growth-focused.
            </span>
          </div>

          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeTrack}>
              {duplicatedMarks.map((mark, index) => (
                <div
                  key={`${mark.name}-${index}`}
                  className={styles.brandBadge}
                  title={mark.name}
                >
                  <span className={styles.brandName}>{mark.symbol}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
