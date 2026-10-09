"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NAV_ITEMS, NAV_CTA } from "@/data/navigation";
import { COMPANY_INFO } from "@/data/company";
import styles from "./Navbar.module.css";

import { MagneticButton } from "@/components/ui/MagneticButton";

const STANDARD_EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    if (pathname.startsWith("/services")) return "Services";
    if (pathname === "/about") return "About Us";
    if (pathname === "/contact") return "Contact";
    return "Home";
  });

  // Keep activeSection in sync with pathname changes
  useEffect(() => {
    if (pathname.startsWith("/services")) {
      setActiveSection("Services");
    } else if (pathname === "/about") {
      setActiveSection("About Us");
    } else if (pathname === "/contact") {
      setActiveSection("Contact");
    } else if (pathname === "/") {
      setActiveSection("Home");
    }
  }, [pathname]);

  // Track scroll position for elevated header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // ESC key listener to close mobile menu
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    },
    [mobileMenuOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    label: string,
    href: string
  ) => {
    setActiveSection(label);
    setMobileMenuOpen(false);

    const [hrefPath, hrefHash] = href.split("#");
    const targetPath = hrefPath === "" ? "/" : hrefPath;

    // Already on the target page: smooth-scroll instead of a full navigation.
    if (targetPath === pathname) {
      if (hrefHash) {
        e.preventDefault();
        document.getElementById(hrefHash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        // If clicking same page link without hash, scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    // Otherwise let Link navigate to the other page (and land on the hash, if any).
  };

  return (
    <>
      <motion.header
        className={clsx(styles.header, isScrolled && styles.scrolled)}
        role="banner"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: STANDARD_EASE }}
      >
        <Container className={styles.navContainer}>
          {/* Brand Logo */}
          <Link
            href="/"
            className={styles.logoLink}
            aria-label="Parthav Technologies - Homepage"
            onClick={() => setActiveSection("Home")}
          >
            <Image
              src="/logo/parthav-logo.png"
              alt="Parthav Technologies - Ideas to Impact"
              width={164}
              height={40}
              priority
              className={styles.logoImg}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation">
            <ul className={styles.navMenu}>
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.label;
                const hasChildren = Boolean(item.children && item.children.length > 0);

                return (
                  <li key={item.label} className={hasChildren ? styles.navItemWrapper : undefined}>
                    <Link
                      href={item.href}
                      className={clsx(
                        styles.navLink,
                        hasChildren && styles.navLinkWithChevron,
                        isActive && styles.activeLink
                      )}
                      onClick={(e) => handleNavClick(e, item.label, item.href)}
                      aria-haspopup={hasChildren ? "true" : undefined}
                    >
                      <span>{item.label}</span>
                      {hasChildren && (
                        <ChevronDown size={14} className={styles.dropdownChevron} />
                      )}
                      {isActive && (
                        <motion.span
                          layoutId="navActiveIndicator"
                          className={styles.activeIndicator}
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: 0.25,
                            ease: STANDARD_EASE,
                          }}
                        />
                      )}
                    </Link>

                    {hasChildren && (
                      <div className={styles.dropdownMenu} role="menu">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={styles.dropdownItem}
                            role="menuitem"
                            onClick={(e) => handleNavClick(e, item.label, child.href)}
                          >
                            <span className={styles.dropdownItemTitle}>{child.label}</span>
                            {child.description && (
                              <span className={styles.dropdownItemDesc}>{child.description}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right CTA & Mobile Toggle */}
          <div className={styles.navRight}>
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, "")}`}
              className={styles.callBtn}
              aria-label={`Call Parthav Technologies at ${COMPANY_INFO.phone}`}
            >
              <Phone size={18} strokeWidth={2} />
            </a>

            <div className={styles.navCta}>
              <MagneticButton maxMovement={8}>
                <Button
                  href={NAV_CTA.href}
                  variant="primary"
                  icon={<ArrowRight size={14} />}
                  className={styles.headerCtaBtn}
                >
                  {NAV_CTA.label}
                </Button>
              </MagneticButton>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Drawer Navigation with Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className={styles.mobileOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              id="mobile-navigation-drawer"
              className={styles.mobileDrawer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className={styles.mobileNavList}>
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeSection === item.label;
                  const hasChildren = Boolean(item.children && item.children.length > 0);

                  return (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + index * 0.07, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={item.href}
                        className={clsx(
                          styles.mobileNavLink,
                          isActive && styles.mobileNavLinkActive
                        )}
                        onClick={(e) => handleNavClick(e, item.label, item.href)}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              backgroundColor: "var(--color-orange)",
                            }}
                          />
                        )}
                      </Link>

                      {hasChildren && (
                        <ul className={styles.mobileSubList}>
                          {item.children!.map((child) => {
                            const isChildActive = pathname === child.href;
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={clsx(
                                    styles.mobileSubLink,
                                    isChildActive && styles.mobileSubLinkActive
                                  )}
                                  onClick={(e) => handleNavClick(e, item.label, child.href)}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              <div className={styles.mobileCtaWrapper}>
                <Button
                  href={NAV_CTA.href}
                  variant="primary"
                  icon={<ArrowRight size={16} />}
                  style={{ width: "100%" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {NAV_CTA.label}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
