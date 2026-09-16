"use client";

import React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { useComingSoon } from "./ComingSoonProvider";
import styles from "./ServiceDetailCard.module.css";

interface ServiceDetailCardProps {
  id?: string;
  icon: React.ReactNode;
  title: string;
  description?: string;
  /** Real page every micro-service has — used for available cards, and to seed the Coming Soon modal's context. */
  href: string;
  /** True only for the genuinely not-yet-launched capabilities. */
  comingSoon?: boolean;
  /** Parent service name, shown inside the Coming Soon modal. */
  category: string;
}

export function ServiceDetailCard({
  id,
  icon,
  title,
  description,
  href,
  comingSoon,
  category,
}: ServiceDetailCardProps) {
  const { openComingSoon } = useComingSoon();

  const body = (
    <>
      <div className={styles.cardTop}>
        <span className={`${styles.iconWrapper} ${comingSoon ? styles.iconWrapperComingSoon : ""}`} aria-hidden="true">
          {icon}
        </span>
        <span className={`${styles.statusPill} ${comingSoon ? styles.statusComingSoon : styles.statusAvailable}`}>
          {comingSoon ? (
            <Clock size={11} strokeWidth={2.25} aria-hidden="true" />
          ) : (
            <span className={styles.statusDot} aria-hidden="true" />
          )}
          {comingSoon ? "Coming Soon" : "Available"}
        </span>
      </div>

      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.divider} />

      <span className={`${styles.cta} ${comingSoon ? styles.ctaComingSoon : ""}`}>
        {comingSoon ? "Get Notified" : "Explore Service"}
      </span>
    </>
  );

  if (comingSoon) {
    return (
      <button
        id={id}
        type="button"
        className={`${styles.card} ${styles.cardComingSoon}`}
        onClick={() => openComingSoon({ serviceName: title, category })}
        aria-label={`Get notified when ${title} launches`}
      >
        {body}
      </button>
    );
  }

  return (
    <Link id={id} href={href} className={styles.card} aria-label={`Explore ${title} service`}>
      {body}
    </Link>
  );
}
