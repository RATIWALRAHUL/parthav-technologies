import React from "react";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { AdminLayoutClient } from "./AdminLayoutClient";

export const metadata: Metadata = {
  title: "Admin Dashboard | Parthav Technologies",
  description: "Operations and inquiry management workstation for Parthav Technologies.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return <AdminLayoutClient user={user}>{children}</AdminLayoutClient>;
}
