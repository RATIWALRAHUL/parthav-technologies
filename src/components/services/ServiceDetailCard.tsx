"use client";

import React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { useComingSoon } from "./ComingSoonProvider";
import { resolveIcon } from "@/lib/resolveServiceIcon";
import type { ServiceStatus } from "@/data/main-services";
import styles from "./ServiceDetailCard.module.css";

export interface ServiceDetailCardProps {
  id?: string;
  icon?: React.ReactNode;
  iconName?: string;
  title?: string;
  name?: string;
  description?: string;
  /** Real destination route, e.g. /services/web-development/business-websites */
  href?: string;
  route?: string;
  /** Central registry service status */
  status?: ServiceStatus;
  comingSoon?: boolean;
  /** Parent service name, shown inside Coming Soon modal */
  category: string;
}

export function ServiceDetailCard({
  id,
  icon,
  iconName,
  title,
  name,
  description,
  href,
  route,
  status,
  comingSoon,
  category,
}: ServiceDetailCardProps) {
  const { openComingSoon } = useComingSoon();
  const displayName = name || title || "";

  // Determine destination route
  const targetRoute = route || href;

  // Strict invariant: if marked coming-soon, or if route is missing / invalid (e.g. #, /#contact, /),
  // card acts as Coming Soon / Get Notified rather than redirecting to homepage or #contact.
  const isComingSoon =
    status === "coming-soon" ||
    comingSoon === true ||
    !targetRoute ||
    targetRoute === "/" ||
    targetRoute.startsWith("/#") ||
    targetRoute.startsWith("#");

  const renderedIcon =
    icon || resolveIcon(displayName, iconName);

  const cardContent = (
    <>
      <div className={styles.cardTop}>
        <div
          className={`${styles.iconWrapper} ${isComingSoon ? styles.iconWrapperComingSoon : styles.iconWrapperAvailable}`}
          aria-hidden="true"
        >
          {renderedIcon}
        </div>
        <span
          className={`${styles.statusPill} ${isComingSoon ? styles.statusComingSoon : styles.statusAvailable}`}
        >
          {isComingSoon ? (
            <>
              <Clock size={11} strokeWidth={2.2} aria-hidden="true" />
              <span>Coming Soon</span>
            </>
          ) : (
            <>
              <span className={styles.statusDot} aria-hidden="true" />
              <span>Available</span>
            </>
          )}
        </span>
      </div>

      <h3 className={styles.title}>{displayName}</h3>
      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.divider} aria-hidden="true" />

      <span className={`${styles.cta} ${isComingSoon ? styles.ctaComingSoon : styles.ctaAvailable}`}>
        {isComingSoon ? "Get Notified" : "Explore Service"}
      </span>
    </>
  );

  if (isComingSoon) {
    return (
      <button
        id={id}
        type="button"
        className={`${styles.card} ${styles.cardComingSoon}`}
        onClick={() => openComingSoon({ serviceName: displayName, category, description })}
        aria-label={`Get notified when ${displayName} launches`}
      >
        {cardContent}
      </button>
    );
  }

  return (
    <Link
      id={id}
      href={targetRoute!}
      className={styles.card}
      aria-label={`Explore ${displayName} service`}
    >
      {cardContent}
    </Link>
  );
}
