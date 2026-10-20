"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const PAGES = [
  { name: "Homepage", route: "/", type: "Static (SSG)", status: "Active", updated: "Oct 20, 2026" },
  { name: "About Us", route: "/about", type: "Static (SSG)", status: "Active", updated: "Oct 20, 2026" },
  { name: "Contact Page", route: "/contact", type: "Static (SSG)", status: "Active", updated: "Oct 20, 2026" },
  { name: "Services Hub", route: "/services", type: "Static (SSG)", status: "Active", updated: "Oct 20, 2026" },
  { name: "Web Development", route: "/services/web-development", type: "Static (SSG)", status: "Active", updated: "Oct 20, 2026" },
  { name: "UI/UX & Product Design", route: "/services/ui-ux-product-design", type: "Static (SSG)", status: "Active", updated: "Oct 20, 2026" },
  { name: "AI & Automation", route: "/services/ai-automation", type: "Static (SSG)", status: "Active", updated: "Oct 20, 2026" },
  { name: "SEO & Digital Growth", route: "/services/seo-digital-growth", type: "Static (SSG)", status: "Active", updated: "Oct 20, 2026" },
  { name: "Branding & Digital Identity", route: "/services/branding-digital-identity", type: "Static (SSG)", status: "Active", updated: "Oct 20, 2026" },
  { name: "CRM & Business Automation", route: "/services/crm-business-automation", type: "Static (SSG)", status: "Active", updated: "Oct 20, 2026" },
];

export default function AdminPagesContentPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
          Pages & Website Content
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", margin: "4px 0 0 0" }}>
          Inventory of active marketing pages, routes, and rendering strategies.
        </p>
      </div>

      <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-card-border)", borderRadius: 14, padding: 24, boxShadow: "0 2px 8px rgba(3, 27, 58, 0.02)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.8125rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-card-border)", backgroundColor: "#f8fafc" }}>
              <th style={{ padding: "12px 16px", color: "#64748b", fontWeight: 600 }}>Page Name</th>
              <th style={{ padding: "12px 16px", color: "#64748b", fontWeight: 600 }}>Route Path</th>
              <th style={{ padding: "12px 16px", color: "#64748b", fontWeight: 600 }}>Render Mode</th>
              <th style={{ padding: "12px 16px", color: "#64748b", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "12px 16px", textAlign: "right", color: "#64748b", fontWeight: 600 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {PAGES.map((p) => (
              <tr key={p.route} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "14px 16px", fontWeight: 600, color: "var(--color-navy)" }}>{p.name}</td>
                <td style={{ padding: "14px 16px", color: "#64748b", fontFamily: "monospace" }}>{p.route}</td>
                <td style={{ padding: "14px 16px", color: "#64748b" }}>{p.type}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#16a34a", backgroundColor: "#f0fdf4", padding: "2px 8px", borderRadius: 6 }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: "14px 16px", textAlign: "right" }}>
                  <Link href={p.route} target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--color-orange)", fontWeight: 600, textDecoration: "none" }}>
                    <span>Visit</span>
                    <ExternalLink size={12} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
