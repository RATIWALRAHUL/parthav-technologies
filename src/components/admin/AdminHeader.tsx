"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Calendar,
  ChevronDown,
  Bell,
  LogOut,
  Shield,
} from "lucide-react";
import type { SessionUser } from "@/lib/auth";
import styles from "./AdminHeader.module.css";

interface AdminHeaderProps {
  user: SessionUser | null;
  onToggleSidebar: () => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  dateRangeText?: string;
  onDateRangeClick?: () => void;
}

export function AdminHeader({
  user,
  onToggleSidebar,
  searchQuery = "",
  onSearchChange,
  dateRangeText = "Oct 01, 2026 - Oct 20, 2026",
  onDateRangeClick,
}: AdminHeaderProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const displayName = user?.name || "Rahul Kumawat";
  const displayRole = user?.role || "Administrator";
  const avatarUrl = user?.avatarUrl || "/images/hero/avatar-1.webp";

  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} />
        </button>

        <div className={styles.searchWrapper}>
          <Search size={15} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search inquiries, contacts, services, blog posts..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.rightGroup}>
        <button
          type="button"
          className={styles.dateRangeBtn}
          onClick={onDateRangeClick}
          aria-label="Select date range"
        >
          <Calendar size={15} className={styles.dateRangeIcon} />
          <span>{dateRangeText}</span>
          <ChevronDown size={13} className={styles.dateRangeChevron} />
        </button>

        <div className={styles.notificationWrapper}>
          <button
            type="button"
            className={styles.notificationBtn}
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="View notifications"
          >
            <Bell size={17} />
            <span className={styles.notificationDot}>1</span>
          </button>
        </div>

        <div className={styles.profileContainer}>
          <button
            type="button"
            className={styles.profileBtn}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
          >
            <div className={styles.avatarWrapper}>
              <Image
                src={avatarUrl}
                alt={displayName}
                fill
                className={styles.avatarImg}
                sizes="38px"
              />
            </div>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>{displayName}</span>
              <span className={styles.profileRole}>{displayRole}</span>
            </div>
            <ChevronDown size={14} style={{ color: "#8da4be" }} />
          </button>

          {dropdownOpen && (
            <div className={styles.profileDropdown}>
              <div className={styles.dropdownItem} style={{ borderBottom: "1px solid #f1f5f9", marginBottom: 4 }}>
                <Shield size={14} style={{ color: "#FF6A00" }} />
                <span>{displayRole}</span>
              </div>
              <button
                type="button"
                className={`${styles.dropdownItem} ${styles.logoutItem}`}
                onClick={handleLogout}
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
