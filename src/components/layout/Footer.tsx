"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram, Youtube, Compass, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { COMPANY_INFO } from "@/data/company";
import styles from "./Footer.module.css";

import { motion } from "framer-motion";

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <motion.div
          className={styles.topGrid}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logoLink}>
              <Image
                src="/logo/parthav-logo.png"
                alt="Parthav Technologies"
                width={150}
                height={34}
                style={{ objectFit: "contain" }}
              />
            </Link>
            <span className={styles.brandTagline}>{COMPANY_INFO.tagline}</span>
            <p className={styles.brandDesc}>
              A premier digital technology partner turning ideas into scalable, high-converting digital products, modern web platforms, and automated business systems.
            </p>

            <div className={styles.socialRow}>
              <a
                href={COMPANY_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={COMPANY_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={COMPANY_INFO.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href={COMPANY_INFO.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Design Portfolio"
              >
                <Compass size={18} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className={`${styles.column} ${openSection === "company" ? styles.columnExpanded : ""}`}>
            <button
              className={styles.columnHeaderBtn}
              onClick={() => toggleSection("company")}
              aria-expanded={openSection === "company"}
            >
              <span className={styles.columnTitle}>Company</span>
              <ChevronDown size={16} className={styles.accordionChevron} />
            </button>
            <div className={styles.collapsibleContent}>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/" className={styles.footerLink}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className={styles.footerLink}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className={styles.footerLink}>
                    Services Overview
                  </Link>
                </li>
                <li>
                  <Link href="/#work" className={styles.footerLink}>
                    Featured Work
                  </Link>
                </li>
                <li>
                  <Link href="/#process" className={styles.footerLink}>
                    Our Process
                  </Link>
                </li>
                <li>
                  <Link href="/#seo-ai" className={styles.footerLink}>
                    SEO & AI
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className={styles.footerLink}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Services Links */}
          <div className={`${styles.column} ${openSection === "services" ? styles.columnExpanded : ""}`}>
            <button
              className={styles.columnHeaderBtn}
              onClick={() => toggleSection("services")}
              aria-expanded={openSection === "services"}
            >
              <span className={styles.columnTitle}>Services</span>
              <ChevronDown size={16} className={styles.accordionChevron} />
            </button>
            <div className={styles.collapsibleContent}>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/services/web-development" className={styles.footerLink}>
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link href="/services/ui-ux-product-design" className={styles.footerLink}>
                    UI/UX & Product Design
                  </Link>
                </li>
                <li>
                  <Link href="/services/seo-digital-growth" className={styles.footerLink}>
                    SEO & Digital Growth
                  </Link>
                </li>
                <li>
                  <Link href="/services/ai-automation" className={styles.footerLink}>
                    AI & Automation
                  </Link>
                </li>
                <li>
                  <Link href="/services/branding-digital-identity" className={styles.footerLink}>
                    Branding & Digital Identity
                  </Link>
                </li>
                <li>
                  <Link href="/services/crm-business-automation" className={styles.footerLink}>
                    CRM & Business Automation
                  </Link>
                </li>
                <li>
                  <Link href="/services" className={styles.footerLink}>
                    All Services
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Resources */}
          <div className={`${styles.column} ${openSection === "resources" ? styles.columnExpanded : ""}`}>
            <button
              className={styles.columnHeaderBtn}
              onClick={() => toggleSection("resources")}
              aria-expanded={openSection === "resources"}
            >
              <span className={styles.columnTitle}>Resources</span>
              <ChevronDown size={16} className={styles.accordionChevron} />
            </button>
            <div className={styles.collapsibleContent}>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/#work" className={styles.footerLink}>
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/#process" className={styles.footerLink}>
                    Delivery Framework
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className={styles.footerLink}>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/#seo-ai" className={styles.footerLink}>
                    SEO & AI Guide
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Details */}
          <div className={`${styles.column} ${openSection === "studio" ? styles.columnExpanded : ""}`}>
            <button
              className={styles.columnHeaderBtn}
              onClick={() => toggleSection("studio")}
              aria-expanded={openSection === "studio"}
            >
              <span className={styles.columnTitle}>Studio</span>
              <ChevronDown size={16} className={styles.accordionChevron} />
            </button>
            <div className={styles.collapsibleContent}>
              <p className={styles.contactText}>
                {COMPANY_INFO.location}
              </p>
              <p className={styles.contactText}>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className={styles.contactEmailLink}
                >
                  {COMPANY_INFO.email}
                </a>
              </p>
              <p className={styles.contactText}>
                {COMPANY_INFO.workingHours}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <span className={styles.copyright}>
            © 2026 Parthav Technologies. All rights reserved.
          </span>
          <ul className={styles.legalLinks}>
            <li>
              <Link href="/sitemap.xml" className={styles.legalLink}>
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
