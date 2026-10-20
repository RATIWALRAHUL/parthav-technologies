"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Charts.module.css";

export interface BarChartDataPoint {
  date: string;
  websiteForm: number;
  chatLeads: number;
  label?: string; // e.g. "Oct 1"
}

interface InquiriesBarChartProps {
  data?: BarChartDataPoint[];
  period?: string;
  onPeriodChange?: (period: string) => void;
}

const DEFAULT_MONTH_DATA: BarChartDataPoint[] = [
  { date: "Oct 1", label: "Oct 1", websiteForm: 14, chatLeads: 6 },
  { date: "Oct 3", websiteForm: 11, chatLeads: 5 },
  { date: "Oct 5", label: "Oct 5", websiteForm: 16, chatLeads: 9 },
  { date: "Oct 8", websiteForm: 13, chatLeads: 6 },
  { date: "Oct 10", label: "Oct 10", websiteForm: 18, chatLeads: 11 },
  { date: "Oct 12", websiteForm: 15, chatLeads: 8 },
  { date: "Oct 15", label: "Oct 15", websiteForm: 20, chatLeads: 12 },
  { date: "Oct 17", websiteForm: 17, chatLeads: 9 },
  { date: "Oct 20", label: "Oct 20", websiteForm: 22, chatLeads: 14 },
  { date: "Oct 22", websiteForm: 18, chatLeads: 10 },
  { date: "Oct 25", label: "Oct 25", websiteForm: 19, chatLeads: 10 },
  { date: "Oct 27", websiteForm: 21, chatLeads: 12 },
  { date: "Oct 30", label: "Oct 30", websiteForm: 23, chatLeads: 13 },
];

export function InquiriesBarChart({
  data,
  period = "Last 30 Days",
  onPeriodChange,
}: InquiriesBarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const chartData = data && data.length >= 7 ? data : DEFAULT_MONTH_DATA;
  const maxY = 25;

  return (
    <div className={styles.chartCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Inquiries Overview</h3>
        <div
          className={styles.periodDropdown}
          onClick={() => onPeriodChange?.(period)}
          role="button"
          tabIndex={0}
        >
          <span>{period}</span>
          <ChevronDown size={14} />
        </div>
      </div>

      <div className={styles.barChartContainer}>
        {/* Y Axis Grid */}
        <div className={styles.yAxis}>
          <span>25</span>
          <span>20</span>
          <span>15</span>
          <span>10</span>
          <span>5</span>
          <span>0</span>
        </div>

        {/* Chart Canvas Area */}
        <div className={styles.barsArea}>
          {/* Horizontal Grid lines */}
          <div className={styles.gridLines}>
            <div className={styles.gridLine} />
            <div className={styles.gridLine} />
            <div className={styles.gridLine} />
            <div className={styles.gridLine} />
            <div className={styles.gridLine} />
            <div className={styles.gridLine} />
          </div>

          {/* Grouped Bar Columns */}
          <div className={styles.columnsRow}>
            {chartData.map((item, idx) => {
              const webHeight = Math.min(100, (item.websiteForm / maxY) * 100);
              const chatHeight = Math.min(100, (item.chatLeads / maxY) * 100);
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={item.date}
                  className={styles.barGroup}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {isHovered && (
                    <div className={styles.barTooltip}>
                      <strong>{item.date}</strong>
                      <div className={styles.tooltipRow}>
                        <span className={styles.dotNavy} /> Website: {item.websiteForm}
                      </div>
                      <div className={styles.tooltipRow}>
                        <span className={styles.dotOrange} /> Chat: {item.chatLeads}
                      </div>
                    </div>
                  )}

                  <div className={styles.barsPair}>
                    <div
                      className={styles.barNavy}
                      style={{ height: `${webHeight}%` }}
                      title={`Website Form: ${item.websiteForm}`}
                    />
                    <div
                      className={styles.barOrange}
                      style={{ height: `${chatHeight}%` }}
                      title={`Chat Leads: ${item.chatLeads}`}
                    />
                  </div>
                  {item.label && <span className={styles.xLabel}>{item.label}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className={styles.legendRow}>
        <div className={styles.legendItem}>
          <span className={styles.legendDotNavy} />
          <span>Website Form</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDotOrange} />
          <span>Chat Leads</span>
        </div>
      </div>
    </div>
  );
}
