"use client";

import React from "react";
import { motion } from "framer-motion";
import { ServiceDetailCard } from "./ServiceDetailCard";
import { resolveIcon } from "@/lib/resolveServiceIcon";
import type { MicroService } from "@/data/main-services";
import styles from "./MicroServiceGrid.module.css";

interface MicroServiceGridProps {
  microServices: MicroService[];
  /** Used to build each card's real detail-page URL: /services/{categorySlug}/{micro.id} */
  categorySlug: string;
  /** Parent service name, shown inside the Coming Soon modal. */
  categoryLabel: string;
}

export function MicroServiceGrid({ microServices, categorySlug, categoryLabel }: MicroServiceGridProps) {
  const groups = Array.from(
    new Set(microServices.map((m) => m.group).filter((g): g is string => !!g))
  );
  const isGrouped = groups.length > 0;

  const renderCard = (micro: MicroService, index: number) => (
    <motion.div
      key={micro.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 8) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <ServiceDetailCard
        id={micro.id}
        icon={resolveIcon(micro.name || micro.title, micro.icon)}
        iconName={micro.icon}
        name={micro.name}
        title={micro.title}
        description={micro.description}
        route={micro.route || (micro.status === "available" ? `/services/${categorySlug}/${micro.id}` : undefined)}
        status={micro.status}
        comingSoon={micro.comingSoon ?? micro.status === "coming-soon"}
        category={categoryLabel}
      />
    </motion.div>
  );

  if (isGrouped) {
    return (
      <div className={styles.groupList}>
        {groups.map((group) => (
          <div key={group} className={styles.group}>
            <span className={styles.groupLabel}>{group}</span>
            <div className={styles.grid}>
              {microServices.filter((m) => m.group === group).map(renderCard)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <div className={styles.grid}>{microServices.map(renderCard)}</div>;
}
