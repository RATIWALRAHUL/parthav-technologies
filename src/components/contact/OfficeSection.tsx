"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
} from "lucide-react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { COMPANY_INFO } from "@/data/company";
import styles from "./OfficeSection.module.css";

export function OfficeSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="office-info" className={styles.officeSection} aria-label="Our Office Information">
      <Container className={styles.container}>
        {/* Section Header */}
        <div className={styles.headerBlock}>
          <motion.div
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span>OUR OFFICE</span>
          </motion.div>

          <motion.h2
            className={styles.headline}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Visit us in <span className={styles.orangeText}>Jaipur.</span>
          </motion.h2>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            We&apos;re a Jaipur-based team, working with ambitious businesses across India and around the world.
          </motion.p>
        </div>

        {/* 3 Column Grid */}
        <div className={styles.officeGrid}>
          {/* ============================================================
             COLUMN 1: Contact Details & Social Links
             ============================================================ */}
          <motion.div
            className={styles.detailsCol}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Office Address */}
            <div className={styles.infoItem}>
              <div className={clsx(styles.infoIconBox, styles.peachIconBox)}>
                <MapPin size={20} strokeWidth={2.2} />
              </div>
              <div className={styles.infoText}>
                <h3 className={styles.infoTitle}>Our Office</h3>
                <p className={styles.infoDesc}>
                  A-72, Sector 4, Malviya Nagar,<br />
                  Jaipur, Rajasthan 302017, India
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className={styles.infoItem}>
              <div className={clsx(styles.infoIconBox, styles.blueIconBox)}>
                <Phone size={20} strokeWidth={2.2} />
              </div>
              <div className={styles.infoText}>
                <h3 className={styles.infoTitle}>Call Us</h3>
                <p className={styles.infoDesc}>
                  <a href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, "")}`} className={styles.infoLink}>
                    {COMPANY_INFO.phone}
                  </a>
                  <br />
                  <span style={{ fontSize: "0.78rem", color: "#8A9DB4" }}>
                    {COMPANY_INFO.workingHours}
                  </span>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className={styles.infoItem}>
              <div className={clsx(styles.infoIconBox, styles.peachIconBox)}>
                <Mail size={20} strokeWidth={2.2} />
              </div>
              <div className={styles.infoText}>
                <h3 className={styles.infoTitle}>Email Us</h3>
                <p className={styles.infoDesc}>
                  <a href={`mailto:${COMPANY_INFO.email}`} className={styles.infoLink}>
                    {COMPANY_INFO.email}
                  </a>
                  <br />
                  <span style={{ fontSize: "0.78rem", color: "#8A9DB4" }}>
                    We&apos;d love to hear from you.
                  </span>
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className={styles.socialSection}>
              <h4 className={styles.socialLabel}>Follow Us</h4>
              <div className={styles.socialIconsRow}>
                <a
                  href={COMPANY_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIconBtn}
                  aria-label="Follow Parthav Technologies on LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href={COMPANY_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIconBtn}
                  aria-label="Follow Parthav Technologies on Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href={COMPANY_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIconBtn}
                  aria-label="Follow Parthav Technologies on Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href={COMPANY_INFO.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIconBtn}
                  aria-label="Follow Parthav Technologies on X (Twitter)"
                >
                  <Twitter size={15} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* ============================================================
             COLUMN 2: Office Image Card with Location Badge
             ============================================================ */}
          <motion.div
            className={styles.imageCardCol}
            initial={{ opacity: 0, y: 24, scale: shouldReduceMotion ? 1 : 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/about/about-office.webp"
              alt="Parthav Technologies modern conference room in Jaipur"
              width={720}
              height={540}
              className={styles.officeImg}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
              loading="lazy"
            />

            {/* Floating Location Badge */}
            <div className={styles.officeFloatingBadge}>
              <MapPin size={20} strokeWidth={2.4} className={styles.badgePinIcon} />
              <div className={styles.badgeText}>
                <span className={styles.badgeTitle}>Our Office</span>
                <span className={styles.badgeSub}>Jaipur, India</span>
              </div>
            </div>
          </motion.div>

          {/* ============================================================
             COLUMN 3: Stylized Map Card with Landmarks & Get Directions
             ============================================================ */}
          <motion.div
            className={styles.mapCard}
            initial={{ opacity: 0, y: 24, scale: shouldReduceMotion ? 1 : 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Stylized Jaipur Road Map Vector Background */}
            <svg
              className={styles.mapVectorBg}
              viewBox="0 0 400 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Background terrain */}
              <rect width="400" height="320" fill="#F4F8FD" />

              {/* Waterway / Green belt contours */}
              <path
                d="M 320,0 Q 300,100 330,190 T 360,320"
                stroke="#D8EAF8"
                strokeWidth="16"
                fill="none"
              />
              <path
                d="M 0,260 Q 120,240 220,280 T 400,290"
                stroke="#E7F2FC"
                strokeWidth="20"
                fill="none"
              />

              {/* Road Grid Network */}
              <path
                d="M 0,90 Q 180,85 400,95"
                stroke="#E2ECF7"
                strokeWidth="7"
                fill="none"
              />
              <path
                d="M 0,165 Q 210,160 400,175"
                stroke="#E2ECF7"
                strokeWidth="9"
                fill="none"
              />
              <path
                d="M 0,240 Q 160,230 400,245"
                stroke="#E2ECF7"
                strokeWidth="6"
                fill="none"
              />

              {/* Vertical / Diagonal Arterial Roads */}
              <path
                d="M 90,0 Q 80,160 95,320"
                stroke="#E2ECF7"
                strokeWidth="7"
                fill="none"
              />
              <path
                d="M 190,0 Q 185,150 200,320"
                stroke="#D6E5F5"
                strokeWidth="10"
                fill="none"
              />
              <path
                d="M 280,0 Q 295,140 285,320"
                stroke="#E2ECF7"
                strokeWidth="7"
                fill="none"
              />
              <path
                d="M 30,0 L 370,320"
                stroke="#EBF2FA"
                strokeWidth="5"
                fill="none"
              />
              <path
                d="M 350,0 L 50,320"
                stroke="#EBF2FA"
                strokeWidth="4"
                fill="none"
              />
            </svg>

            {/* Landmark Markers */}
            <div className={clsx(styles.landmarkLabel, styles.landmarkRamgarh)}>
              <span className={styles.landmarkDot} />
              <span>Ramgarh Fort</span>
            </div>

            <div className={clsx(styles.landmarkLabel, styles.landmarkBirlaMandir)}>
              <span className={styles.landmarkDot} />
              <span>Birla Mandir</span>
            </div>

            <div className={clsx(styles.landmarkLabel, styles.landmarkAlbertHall)}>
              <span className={styles.landmarkDot} />
              <span>Albert Hall Museum</span>
            </div>

            <div className={clsx(styles.landmarkLabel, styles.landmarkHawaMahal)}>
              <span className={styles.landmarkDot} />
              <span>Hawa Mahal</span>
            </div>

            <div className={clsx(styles.landmarkLabel, styles.landmarkJaipur)}>
              <span>Jaipur</span>
              <span className={styles.landmarkHindi}>जयपुर</span>
            </div>

            <div className={clsx(styles.landmarkLabel, styles.landmarkMotiDungri)}>
              <span className={styles.landmarkDot} />
              <span>Moti Dungri</span>
            </div>

            {/* Prominent Floating Pin for Parthav Technologies */}
            <div className={styles.parthavPinCard}>
              <div className={styles.pinIconCircle}>
                <MapPin size={15} strokeWidth={2.4} />
              </div>
              <div className={styles.pinInfo}>
                <span className={styles.pinTitle}>Parthav Technologies</span>
                <span className={styles.pinSub}>Jaipur, Rajasthan</span>
              </div>
            </div>

            {/* Bottom Get Directions Action Button */}
            <a
              href={COMPANY_INFO.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsBtn}
              aria-label="Get directions to Parthav Technologies on Google Maps"
            >
              <MapPin size={16} className={styles.directionsIcon} />
              <span>Get Directions</span>
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
