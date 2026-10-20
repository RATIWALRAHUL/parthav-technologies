"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import type { SessionUser } from "@/lib/auth";
import styles from "./AdminLayout.module.css";

interface AdminLayoutClientProps {
  user: SessionUser | null;
  children: React.ReactNode;
}

export function AdminLayoutClient({ user, children }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login route, render standalone without admin chrome
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className={styles.adminShell}>
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className={styles.mainWrapper}>
        <AdminHeader
          user={user}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className={styles.contentArea}>
          {children}
        </main>
      </div>
    </div>
  );
}
