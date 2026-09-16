"use client";

import React from "react";
import clsx from "clsx";
import type { Technology } from "@/data/technologies";
import { TechLogo } from "@/components/common/TechLogo";
import { ExternalLink } from "lucide-react";
import styles from "./TechnologyCard.module.css";

interface TechnologyCardProps {
  tech: Technology;
  compact?: boolean;
}

export function TechnologyCard({ tech, compact = false }: TechnologyCardProps) {
  const CardWrapper = tech.website ? "a" : "div";
  const linkProps = tech.website
    ? {
        href: tech.website,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `Visit official website of ${tech.name} (opens in new tab)`,
      }
    : {
        role: "article",
        "aria-label": `${tech.name} — ${tech.categoryLabel}`,
      };

  return (
    <CardWrapper
      {...linkProps}
      className={clsx(styles.card, compact && styles.compact)}
    >
      <div className={styles.topRow}>
        <div className={styles.logoWrapper}>
          <TechLogo name={tech.icon || tech.name} size={32} className={styles.logo} />
        </div>
        {tech.website && (
          <span className={styles.externalIcon} aria-hidden="true">
            <ExternalLink size={13} />
          </span>
        )}
      </div>

      <div className={styles.content}>
        <h4 className={styles.name}>{tech.name}</h4>
        <span className={styles.categoryBadge}>{tech.categoryLabel}</span>
      </div>

      {!compact && tech.description && (
        <p className={styles.description}>{tech.description}</p>
      )}
    </CardWrapper>
  );
}
