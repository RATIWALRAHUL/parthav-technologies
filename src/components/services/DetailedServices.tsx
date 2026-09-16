"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SERVICES_DATA } from "@/data/services";
import { ServiceVisual } from "./ServiceVisual";
import styles from "./DetailedServices.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export function DetailedServices() {
  const [activeId, setActiveId] = useState(SERVICES_DATA[0].id);
  const shouldReduceMotion = useReducedMotion();

  const activeService = SERVICES_DATA.find((s) => s.id === activeId) ?? SERVICES_DATA[0];

  return (
    <section id="detailed-services" className={styles.section} aria-label="Detailed service breakdown">
      <Container>
        <div className={styles.headerRow}>
          <Reveal>
            <div className={styles.eyebrowRow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              <span className={styles.eyebrow}>DETAILED SERVICES</span>
            </div>
            <h2 className={styles.headline}>
              <span className={styles.navyText}>Explore Our Services</span>{" "}
              <span className={styles.orangeText}>in Detail.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.subtitle}>
              Dive deeper into each service to see how we solve real
              business challenges.
            </p>
          </Reveal>
        </div>

        <div className={styles.layout}>
          {/* Left: Service navigation */}
          <nav className={styles.serviceNav} aria-label="Detailed service list">
            {SERVICES_DATA.map((service) => {
              const isActive = service.id === activeId;
              return (
                <button
                  key={service.id}
                  type="button"
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                  onClick={() => setActiveId(service.id)}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className={styles.navNumber}>{service.number}</span>
                  <span className={styles.navLabel}>{service.title}</span>
                </button>
              );
            })}
          </nav>

          {/* Center: Content */}
          <div className={styles.contentGrid}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                className={styles.contentCol}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <h3 className={styles.serviceTitle}>{activeService.title}</h3>
                <p className={styles.serviceSubtitle}>{activeService.detailed.subtitle}</p>

                <ul className={styles.capabilityList}>
                  {activeService.detailed.capabilities.map((cap) => (
                    <li key={cap} className={styles.capabilityItem}>
                      <CheckCircle2 size={18} strokeWidth={2} className={styles.checkIcon} />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={activeService.detailed.ctaHref}
                  variant="primary"
                  icon={<ArrowRight size={16} strokeWidth={2} />}
                  className={styles.ctaButton}
                >
                  {activeService.detailed.ctaLabel}
                </Button>
              </motion.div>
            </AnimatePresence>

            {/* Right: Visual */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                className={styles.visualCol}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <ServiceVisual visualId={activeService.id} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
