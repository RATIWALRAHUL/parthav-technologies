"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Layers3,
  PanelsTopLeft,
  FileText,
  Mail,
  Files,
  Images,
  ChartNoAxesCombined,
  UsersRound,
  Settings,
} from "lucide-react";
import styles from "./AdminSidebar.module.css";

interface NavItemDef {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const NAV_ITEMS: NavItemDef[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Inquiries", href: "/admin/inquiries", icon: Inbox, badge: 12 },
  { label: "Services", href: "/admin/services", icon: Layers3 },
  { label: "Portfolio", href: "/admin/portfolio", icon: PanelsTopLeft },
  { label: "Blog & Insights", href: "/admin/blog", icon: FileText },
  { label: "Newsletter", href: "/admin/newsletter", icon: Mail, badge: 3 },
  { label: "Pages & Content", href: "/admin/pages", icon: Files },
  { label: "Media Library", href: "/admin/media", icon: Images },
  { label: "SEO Settings", href: "/admin/seo", icon: ChartNoAxesCombined },
  { label: "Users & Permissions", href: "/admin/users", icon: UsersRound },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className={styles.mobileDrawerOverlay}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.topSection}>
          <div className={styles.logoArea}>
            <Link href="/admin/dashboard" className={styles.logoLink} onClick={onClose}>
              <Image
                src="/logo/parthav-logo.png"
                alt="Parthav Technologies"
                width={150}
                height={34}
                priority
                style={{ objectFit: "contain" }}
              />
            </Link>
          </div>

          <nav className={styles.navMenu} aria-label="Admin Navigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin/dashboard"
                  ? pathname === "/admin/dashboard" || pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                  onClick={onClose}
                >
                  <div className={styles.navItemLeft}>
                    <Icon size={18} className={styles.navIcon} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={styles.badge}>{item.badge}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={styles.footerSection}>
          <div className={styles.monumentCard}>
            <Image
              src="/images/about/jaipur-hawa-mahal.jpg"
              alt="Hawa Mahal Jaipur"
              fill
              className={styles.monumentImage}
              sizes="240px"
            />
            <div className={styles.monumentOverlay} />
          </div>

          <div className={styles.footerBranding}>
            <span className={styles.footerTagline}>Ideas to Impact</span>
            <span className={styles.footerSubtext}>
              Jaipur, India
              <br />
              Building for the World
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
