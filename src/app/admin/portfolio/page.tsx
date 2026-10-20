"use client";

import React from "react";
import Image from "next/image";
import { FEATURED_PROJECTS } from "@/data/projects";

export default function AdminPortfolioPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
          Portfolio & Case Studies
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", margin: "4px 0 0 0" }}>
          Operational overview of featured agency case studies, metrics, and deliverable highlights.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
        {FEATURED_PROJECTS.map((proj) => (
          <div
            key={proj.id}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid var(--color-card-border)",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(3, 27, 58, 0.02)",
            }}
          >
            <div style={{ position: "relative", height: 160, width: "100%", backgroundColor: "#e2e8f0" }}>
              <Image
                src={proj.imageSrc}
                alt={proj.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="340px"
              />
              <span style={{ position: "absolute", top: 12, left: 12, backgroundColor: "var(--color-deep-navy)", color: "#ffffff", padding: "3px 10px", borderRadius: 6, fontSize: "0.6875rem", fontWeight: 700 }}>
                {proj.category}
              </span>
            </div>

            <div style={{ padding: 20 }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 700, color: "var(--color-navy)", margin: "0 0 8px 0" }}>
                {proj.title}
              </h3>
              <p style={{ fontSize: "0.8125rem", color: "#64748b", margin: "0 0 14px 0", lineHeight: 1.4 }}>
                <strong>Problem:</strong> {proj.problem}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{proj.services}</span>
                <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "var(--color-orange)" }}>
                  {proj.metricValue} {proj.metricLabel}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
