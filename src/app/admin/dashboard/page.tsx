"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  Send,
  Briefcase,
  FileText,
  Mail,
} from "lucide-react";
import { KpiCard } from "@/components/admin/KpiCard";
import { InquiriesBarChart, type BarChartDataPoint } from "@/components/admin/InquiriesBarChart";
import { ServiceDoughnutChart, type ServiceSegment } from "@/components/admin/ServiceDoughnutChart";
import { RecentActivityPanel, type ActivityItem } from "@/components/admin/RecentActivityPanel";
import { RecentInquiriesTable } from "@/components/admin/RecentInquiriesTable";
import type { InquiryRecord } from "@/components/admin/InquiryModal";
import styles from "./Dashboard.module.css";

interface KpiMetric {
  value: number;
  changePercent: number;
  changePeriod: string;
  isPositive: boolean;
  sparkline: number[];
}

interface DashboardSummaryData {
  kpis: {
    totalInquiries: KpiMetric;
    newInquiries: KpiMetric;
    activeProjects: KpiMetric;
    publishedBlogPosts: KpiMetric;
    newsletterSubscribers: KpiMetric;
  };
  inquiriesOverview: BarChartDataPoint[];
  inquiriesByService: ServiceSegment[];
  recentActivity: ActivityItem[];
  recentInquiries: InquiryRecord[];
}

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardSummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/admin/dashboard/summary");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setDashboardData(json.data);
        }
      }
    } catch (err) {
      console.error("[Dashboard Fetch Error]", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const kpis = dashboardData?.kpis;
  const inquiriesOverview = dashboardData?.inquiriesOverview;
  const inquiriesByService = dashboardData?.inquiriesByService;
  const recentActivity = dashboardData?.recentActivity;
  const recentInquiries = dashboardData?.recentInquiries || [];

  return (
    <div className={styles.dashboardWrapper}>
      {/* 1. Header Welcome Bar matching reference image */}
      <div className={styles.welcomeRow}>
        <div className={styles.welcomeLeft}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            Welcome back, <span className={styles.highlightName}>Rahul!</span> Here&apos;s
            what&apos;s happening with your website.
          </p>
        </div>

        <div className={styles.brandMotif}>
          <span className={styles.motifLine} />
          <span className={styles.motifText}>Ideas | Technology | Growth</span>
        </div>
      </div>

      {/* 2. Five KPI Cards Row */}
      <div className={styles.kpiGrid}>
        <KpiCard
          label="Total Inquiries"
          value={kpis?.totalInquiries?.value ?? 124}
          icon={<Users size={18} />}
          iconTheme="blue"
          changePercent={kpis?.totalInquiries?.changePercent ?? 12}
          changePeriod="vs last month"
          sparklineColor="#3B82F6"
          sparklineData={kpis?.totalInquiries?.sparkline ?? [20, 24, 22, 28, 25, 32, 38, 35, 42]}
        />

        <KpiCard
          label="New Inquiries"
          value={kpis?.newInquiries?.value ?? 18}
          icon={<Send size={18} />}
          iconTheme="orange"
          changePercent={kpis?.newInquiries?.changePercent ?? 28}
          changePeriod="vs last week"
          sparklineColor="#FF6A00"
          sparklineData={kpis?.newInquiries?.sparkline ?? [4, 6, 5, 8, 7, 12, 10, 15, 18]}
        />

        <KpiCard
          label="Active Projects"
          value={kpis?.activeProjects?.value ? String(kpis.activeProjects.value).padStart(2, "0") : "06"}
          icon={<Briefcase size={18} />}
          iconTheme="blue"
          changePercent={kpis?.activeProjects?.changePercent ?? 20}
          changePeriod="vs last month"
          sparklineColor="#3B82F6"
          sparklineData={kpis?.activeProjects?.sparkline ?? [3, 4, 4, 5, 5, 6, 6, 6, 6]}
        />

        <KpiCard
          label="Published Blog Posts"
          value={kpis?.publishedBlogPosts?.value ?? 14}
          icon={<FileText size={18} />}
          iconTheme="orange"
          changePercent={kpis?.publishedBlogPosts?.changePercent ?? 8}
          changePeriod="vs last month"
          sparklineColor="#FF6A00"
          sparklineData={kpis?.publishedBlogPosts?.sparkline ?? [8, 9, 10, 11, 11, 12, 13, 14, 14]}
        />

        <KpiCard
          label="Newsletter Subscribers"
          value={kpis?.newsletterSubscribers?.value ?? 312}
          icon={<Mail size={18} />}
          iconTheme="blue"
          changePercent={kpis?.newsletterSubscribers?.changePercent ?? 35}
          changePeriod="vs last month"
          sparklineColor="#3B82F6"
          sparklineData={kpis?.newsletterSubscribers?.sparkline ?? [120, 140, 180, 210, 240, 260, 290, 312]}
        />
      </div>

      {/* 3. Middle Analytical Grid (3 Columns) */}
      <div className={styles.analyticsRow}>
        <InquiriesBarChart
          data={inquiriesOverview}
          period="Last 30 Days"
        />

        <ServiceDoughnutChart
          data={inquiriesByService}
          total={kpis?.totalInquiries?.value ?? 124}
        />

        <RecentActivityPanel
          activities={recentActivity}
        />
      </div>

      {/* 4. Bottom Table: Recent Inquiries */}
      <div className={styles.tableRow}>
        <RecentInquiriesTable
          inquiries={recentInquiries}
          onRefresh={fetchDashboardData}
        />
      </div>

      {/* Subtle background syncing indicator */}
      {isLoading && (
        <div style={{ position: "fixed", bottom: 16, right: 16, background: "rgba(6,43,87,0.85)", color: "#fff", padding: "6px 12px", borderRadius: 20, fontSize: "0.75rem", pointerEvents: "none", zIndex: 50 }}>
          Syncing dashboard metrics...
        </div>
      )}
    </div>
  );
}
