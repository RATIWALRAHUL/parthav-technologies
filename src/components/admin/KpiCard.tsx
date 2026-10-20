"use client";

import React, { useId } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./KpiCard.module.css";

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconTheme?: "blue" | "orange";
  changePercent?: number;
  changePeriod?: string;
  sparklineColor?: string;
  sparklineData?: number[];
}

/**
 * Generate smooth cubic Bezier path from data points
 */
function generateSmoothPath(
  data: number[],
  width: number,
  height: number,
  padY = 4
): { linePath: string; areaPath: string } {
  if (!data || data.length < 2) return { linePath: "", areaPath: "" };

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - padY - ((val - min) / range) * (height - 2 * padY),
  }));

  // Build smooth cubic Bezier curve through points
  let linePath = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i != points.length - 2 ? points[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    linePath += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }

  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

  return { linePath, areaPath };
}

export function KpiCard({
  label,
  value,
  icon,
  iconTheme = "blue",
  changePercent = 12,
  changePeriod = "vs last month",
  sparklineColor = "#3B82F6",
  sparklineData = [10, 14, 12, 18, 16, 22, 28],
}: KpiCardProps) {
  const width = 84;
  const height = 36;
  const gradId = useId();

  const { linePath, areaPath } = generateSmoothPath(
    sparklineData,
    width,
    height
  );

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div
          className={`${styles.iconCircle} ${
            iconTheme === "orange" ? styles.iconOrange : styles.iconBlue
          }`}
        >
          {icon}
        </div>
        <div className={styles.contentCol}>
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>{value}</span>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.badgeGroup}>
          <span className={styles.pillPositive}>
            <ArrowUpRight size={12} strokeWidth={2.8} />
            {changePercent}%
          </span>
          <span className={styles.periodText}>{changePeriod}</span>
        </div>

        <div className={styles.sparklineContainer} aria-hidden="true">
          <svg
            className={styles.sparklineSvg}
            viewBox={`0 0 ${width} ${height}`}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={sparklineColor} stopOpacity="0.25" />
                <stop offset="100%" stopColor={sparklineColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill={`url(#${gradId})`} />
            <path
              d={linePath}
              fill="none"
              stroke={sparklineColor}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
