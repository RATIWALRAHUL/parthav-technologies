"use client";

import React from "react";
import Link from "next/link";
import { User, FileText, Mail, CheckCircle2, Bell } from "lucide-react";
import styles from "./Activity.module.css";

export interface ActivityItem {
  id: string;
  actor?: string;
  type: string;
  description: string;
  entityType?: string;
  entityId?: string;
  createdAt: string;
}

interface RecentActivityPanelProps {
  activities?: ActivityItem[];
}

function formatRelativeTime(dateString: string): string {
  try {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffMins = Math.floor(diffMs / (60 * 1000));
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } catch {
    return "Recently";
  }
}

function getActivityIcon(type: string) {
  switch (type) {
    case "INQUIRY_CREATED":
      return {
        icon: <User size={14} />,
        bg: "#FFF1E8",
        color: "#FF6A00",
      };
    case "BLOG_PUBLISHED":
      return {
        icon: <FileText size={14} />,
        bg: "#EAF4FF",
        color: "#2563EB",
      };
    case "SUBSCRIBER_JOINED":
      return {
        icon: <Mail size={14} />,
        bg: "#FFF1E8",
        color: "#EA580C",
      };
    case "STATUS_UPDATED":
      return {
        icon: <CheckCircle2 size={14} />,
        bg: "#F0FDF4",
        color: "#16A34A",
      };
    default:
      return {
        icon: <Bell size={14} />,
        bg: "#F1F5F9",
        color: "#64748B",
      };
  }
}

export function RecentActivityPanel({
  activities = [
    {
      id: "1",
      type: "INQUIRY_CREATED",
      description: "New inquiry from Priya Sharma",
      createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      type: "BLOG_PUBLISHED",
      description: 'Blog post "AI for Business Growth" published',
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      type: "SUBSCRIBER_JOINED",
      description: "Newsletter subscription from akash@company.com",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      type: "STATUS_UPDATED",
      description: "Inquiry status updated to Contacted",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "5",
      type: "INQUIRY_CREATED",
      description: "New inquiry from Rajesh Mehta",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
}: RecentActivityPanelProps) {
  return (
    <div className={styles.activityCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>Recent Activity</h3>
        <Link href="/admin/inquiries" className={styles.viewAll}>
          View All
        </Link>
      </div>

      <div className={styles.timeline}>
        {activities.map((item, idx) => {
          const { icon, bg, color } = getActivityIcon(item.type);
          const isLast = idx === activities.length - 1;

          return (
            <div key={item.id} className={styles.timelineItem}>
              <div className={styles.iconColumn}>
                <div
                  className={styles.iconCircle}
                  style={{ backgroundColor: bg, color }}
                >
                  {icon}
                </div>
                {!isLast && <div className={styles.lineConnector} />}
              </div>

              <div className={styles.textColumn}>
                <p className={styles.description}>{item.description}</p>
                <span className={styles.timestamp}>
                  {formatRelativeTime(item.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
