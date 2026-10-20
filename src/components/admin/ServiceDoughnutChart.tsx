"use client";

import React from "react";
import styles from "./Charts.module.css";

export interface ServiceSegment {
  service: string;
  count: number;
  percentage: number;
  color: string;
}

export type ServiceItem = ServiceSegment;

interface ServiceDoughnutChartProps {
  data?: ServiceItem[];
  total?: number;
}

const DEFAULT_DATA: ServiceItem[] = [
  { service: "Web Development", count: 32, percentage: 26, color: "#062B57" },
  { service: "AI & Automation", count: 28, percentage: 23, color: "#FF6A00" },
  { service: "SEO & Digital Growth", count: 18, percentage: 15, color: "#3B82F6" },
  { service: "UI/UX Design", count: 16, percentage: 13, color: "#FFB27D" },
  { service: "CRM & Automation", count: 12, percentage: 10, color: "#93C5FD" },
  { service: "Others", count: 18, percentage: 13, color: "#94A3B8" },
];

export function ServiceDoughnutChart({
  data = DEFAULT_DATA,
  total = 124,
}: ServiceDoughnutChartProps) {
  // Compute SVG stroke-dasharray & stroke-dashoffset for circular ring
  const radius = 58;
  const circumference = 2 * Math.PI * radius; // ~364.4

  let accumulatedPercent = 0;

  return (
    <div className={styles.chartCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Inquiries by Service</h3>
      </div>

      <div className={styles.doughnutContent}>
        {/* SVG Ring with Center Value */}
        <div className={styles.doughnutWrapper}>
          <svg className={styles.doughnutSvg} viewBox="0 0 160 160">
            {data.map((item) => {
              const strokeLength = (item.percentage / 100) * circumference;
              const strokeOffset = circumference - (accumulatedPercent / 100) * circumference;
              accumulatedPercent += item.percentage;

              return (
                <circle
                  key={item.service}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth="20"
                  strokeDasharray={`${strokeLength} ${circumference}`}
                  strokeDashoffset={strokeOffset}
                  transform="rotate(-90 80 80)"
                  className={styles.donutSegment}
                />
              );
            })}
          </svg>

          {/* Center Text */}
          <div className={styles.doughnutCenter}>
            <span className={styles.doughnutTotal}>{total}</span>
            <span className={styles.doughnutLabel}>Total</span>
          </div>
        </div>

        {/* Legend on Right Side */}
        <div className={styles.doughnutLegend}>
          {data.map((item) => (
            <div key={item.service} className={styles.donutLegendRow}>
              <div className={styles.donutLegendLeft}>
                <span className={styles.legendColorDot} style={{ backgroundColor: item.color }} />
                <span className={styles.donutServiceName}>{item.service}</span>
              </div>
              <div className={styles.donutLegendRight}>
                <span className={styles.donutServiceCount}>{item.count}</span>
                <span className={styles.donutServicePercent}>({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
