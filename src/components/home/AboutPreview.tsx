"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, PenTool, ShieldCheck, Handshake, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY_VALUES } from "@/data/company";
import styles from "./AboutPreview.module.css";

const VALUE_ICONS: Record<string, React.ReactNode> = {
  Search: <Search size={18} />,
  PenTool: <PenTool size={18} />,
  ShieldCheck: <ShieldCheck size={18} />,
  Handshake: <Handshake size={18} />,
};

export function AboutPreview() {
  return (
    <section id="about" className={styles.aboutSection} aria-label="About Parthav Technologies">
      <Container>
        <div className={styles.aboutGrid}>
          {/* Left Column: Office & Brand Image */}
          <Reveal>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/about/about-office.webp"
                alt="Parthav Technologies modern executive conference and digital collaborative studio in Jaipur"
                width={726}
                height={390}
                className={styles.officeImage}
              />
            </div>
          </Reveal>

          {/* Right Column: Narrative & Values */}
          <div className={styles.contentArea}>
            <Reveal delay={0.1}>
              <span className={styles.eyebrow}>ABOUT US</span>
              <h2 className={styles.headline}>
                Built in Jaipur. <br />
                Designed for the world.
              </h2>
              <p className={styles.description}>
                Parthav Technologies is an India-based digital partner helping growing businesses turn ideas into scalable digital products, websites and platforms.
              </p>
            </Reveal>

            <div className={styles.valuesGrid}>
              {COMPANY_VALUES.map((val, index) => (
                <motion.div
                  key={val.title}
                  className={styles.valueItem}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                >
                  <div className={styles.valueHeader}>
                    <span className={styles.valueIconBox} aria-hidden="true">
                      {VALUE_ICONS[val.iconName]}
                    </span>
                    <h3 className={styles.valueTitle}>{val.title}</h3>
                  </div>
                  <p className={styles.valueDesc}>{val.description}</p>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: "var(--space-6)" }}>
              <Link
                href="/about"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: "var(--color-orange)",
                  textDecoration: "none",
                }}
              >
                Learn more about our studio & story <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
