"use client";

import React from "react";
import { FileText, Plus } from "lucide-react";

const ARTICLES = [
  {
    id: "1",
    title: "AI for Business Growth: Practical Automation Strategies in 2026",
    category: "AI & Automation",
    author: "Rahul Kumawat",
    status: "Published",
    publishedAt: "Oct 20, 2026",
    readTime: "6 min read",
  },
  {
    id: "2",
    title: "Next.js 15 App Router Architecture for Enterprise Platforms",
    category: "Engineering",
    author: "Rahul Kumawat",
    status: "Published",
    publishedAt: "Oct 15, 2026",
    readTime: "8 min read",
  },
  {
    id: "3",
    title: "Design Systems That Scale: Moving from Figma to Clean React Code",
    category: "UI/UX Design",
    author: "Design Lead",
    status: "Published",
    publishedAt: "Oct 10, 2026",
    readTime: "5 min read",
  },
  {
    id: "4",
    title: "Technical SEO Checklist for Modern Headless Web Applications",
    category: "SEO & Growth",
    author: "SEO Lead",
    status: "Draft",
    publishedAt: "In Review",
    readTime: "7 min read",
  },
];

export default function AdminBlogPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
            Blog & Insights
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", margin: "4px 0 0 0" }}>
            Editorial thought leadership publications and organic SEO articles.
          </p>
        </div>

        <button
          type="button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            height: 38,
            padding: "0 16px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "var(--color-orange)",
            color: "#ffffff",
            fontSize: "0.8125rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Plus size={16} />
          <span>New Article</span>
        </button>
      </div>

      <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-card-border)", borderRadius: 14, padding: 24, boxShadow: "0 2px 8px rgba(3, 27, 58, 0.02)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.8125rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-card-border)", backgroundColor: "#f8fafc" }}>
              <th style={{ padding: "12px 16px", color: "#64748b", fontWeight: 600 }}>Article Title</th>
              <th style={{ padding: "12px 16px", color: "#64748b", fontWeight: 600 }}>Category</th>
              <th style={{ padding: "12px 16px", color: "#64748b", fontWeight: 600 }}>Author</th>
              <th style={{ padding: "12px 16px", color: "#64748b", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "12px 16px", color: "#64748b", fontWeight: 600 }}>Published</th>
            </tr>
          </thead>
          <tbody>
            {ARTICLES.map((art) => (
              <tr key={art.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "14px 16px", fontWeight: 600, color: "var(--color-navy)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <FileText size={16} style={{ color: "#2563EB" }} />
                    <span>{art.title}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 16px", color: "#64748b" }}>{art.category}</td>
                <td style={{ padding: "14px 16px", color: "#64748b" }}>{art.author}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 6,
                      backgroundColor: art.status === "Published" ? "#f0fdf4" : "#fff1e8",
                      color: art.status === "Published" ? "#15803d" : "#c2410c",
                    }}
                  >
                    {art.status}
                  </span>
                </td>
                <td style={{ padding: "14px 16px", color: "#64748b", fontSize: "0.75rem" }}>
                  {art.publishedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
