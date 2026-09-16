"use client";

import React, { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import type { MainService } from "@/data/main-services";
import { ServiceDetailCard } from "./ServiceDetailCard";
import { resolveIcon } from "@/lib/resolveServiceIcon";
import styles from "./MicroServicesPanel.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const MOBILE_INITIAL_COUNT = 8;

interface MicroServicesPanelProps {
  service: MainService;
  onBack: () => void;
}

export function MicroServicesPanel({ service, onBack }: MicroServicesPanelProps) {
  const [showAllMobile, setShowAllMobile] = useState(false);

  const groups = Array.from(
    new Set(service.microServices.map((m) => m.group).filter((g): g is string => !!g))
  );
  const isGrouped = groups.length > 0;

  const flatCount = service.microServices.length;

  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: EASE }}
    >
      <button type="button" className={styles.backLink} onClick={onBack}>
        <ArrowLeft size={16} strokeWidth={2} />
        <span>All Services</span>
      </button>

      <div className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>{service.title}</h3>
        <span className={styles.panelCount}>{flatCount} Services</span>
      </div>

      {isGrouped ? (
        <div className={styles.groupList}>
          {groups.map((group) => (
            <div key={group} className={styles.group}>
              <span className={styles.groupLabel}>{group}</span>
              <div className={styles.grid}>
                {service.microServices
                  .filter((m) => m.group === group)
                  .map((micro) => (
                    <ServiceDetailCard
                      key={micro.id}
                      icon={resolveIcon(micro.title)}
                      title={micro.title}
                      description={micro.description}
                      href={`/services/${service.categorySlug}/${micro.id}`}
                      comingSoon={micro.comingSoon}
                      category={service.title}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className={`${styles.grid} ${!showAllMobile ? styles.gridTruncated : ""}`}>
            {service.microServices.map((micro) => (
              <ServiceDetailCard
                key={micro.id}
                icon={resolveIcon(micro.title)}
                title={micro.title}
                description={micro.description}
                href={`/services/${service.categorySlug}/${micro.id}`}
                comingSoon={micro.comingSoon}
                category={service.title}
              />
            ))}
          </div>

          {flatCount > MOBILE_INITIAL_COUNT && (
            <button
              type="button"
              className={`${styles.viewAllBtn} ${showAllMobile ? styles.viewAllBtnHidden : ""}`}
              onClick={() => setShowAllMobile(true)}
            >
              <span>View All Services</span>
              <ChevronDown size={16} strokeWidth={2} />
            </button>
          )}
        </>
      )}
    </motion.div>
  );
}
