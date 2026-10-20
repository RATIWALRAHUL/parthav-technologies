"use client";

import React, { useState } from "react";
import {
  ChartNoAxesCombined,
  CheckCircle2,
  Globe,
  FileCode2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export default function AdminSeoPage() {
  const [activeTab, setActiveTab] = useState<"general" | "sitemap" | "robots" | "schema">("general");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--color-navy)",
              margin: 0,
            }}
          >
            SEO Settings & Health
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", margin: "4px 0 0 0" }}>
            Search engine visibility, canonical URLs, dynamic XML sitemaps, robots.txt, and structured data diagnostics.
          </p>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 16px",
              backgroundColor: "#ffffff",
              border: "1px solid var(--color-card-border)",
              borderRadius: 8,
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--color-navy)",
              textDecoration: "none",
            }}
          >
            <FileCode2 size={16} color="var(--color-orange)" />
            View Live Sitemap
            <ExternalLink size={14} color="var(--color-text-muted)" />
          </a>
        </div>
      </div>

      {/* SEO Health Score Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid var(--color-card-border)",
            borderRadius: 12,
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              backgroundColor: "#EAF4FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChartNoAxesCombined size={24} color="#062B57" />
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
              Overall SEO Score
            </span>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-navy)" }}>98 / 100</div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid var(--color-card-border)",
            borderRadius: 12,
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              backgroundColor: "#FFF2E8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Globe size={24} color="#FF6A00" />
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
              Indexed URLs in Sitemap
            </span>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-navy)" }}>145+ URLs</div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid var(--color-card-border)",
            borderRadius: 12,
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              backgroundColor: "#E6FBF2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckCircle2 size={24} color="#00875A" />
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
              Robots.txt & Meta
            </span>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#00875A" }}>Optimized</div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid var(--color-card-border)",
            borderRadius: 12,
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              backgroundColor: "#F0F4F9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShieldCheck size={24} color="#062B57" />
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
              Schema.org Rich Snippets
            </span>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-navy)" }}>4 Schemas</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--color-card-border)", gap: 24 }}>
        {[
          { id: "general", label: "Global Meta & Canonical" },
          { id: "sitemap", label: "XML Sitemap Status" },
          { id: "robots", label: "Robots.txt Configuration" },
          { id: "schema", label: "Structured Data (Schema.org)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "general" | "sitemap" | "robots" | "schema")}
            style={{
              padding: "12px 4px",
              border: "none",
              background: "none",
              borderBottom: activeTab === tab.id ? "2px solid var(--color-orange)" : "2px solid transparent",
              color: activeTab === tab.id ? "var(--color-orange)" : "var(--color-text-muted)",
              fontWeight: activeTab === tab.id ? 700 : 500,
              fontSize: "0.9375rem",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === "general" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid var(--color-card-border)",
              borderRadius: 12,
              padding: 24,
            }}
          >
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-navy)", margin: "0 0 16px 0" }}>
              Default Meta & OpenGraph Settings
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: 6 }}>
                  Site Canonical Base URL
                </label>
                <input
                  type="text"
                  readOnly
                  value="https://parthavtechnologies.com"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1px solid var(--color-card-border)",
                    backgroundColor: "#F7FAFD",
                    fontSize: "0.875rem",
                    color: "var(--color-navy)",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: 6 }}>
                  Default Title Template
                </label>
                <input
                  type="text"
                  readOnly
                  value="%s | Parthav Technologies"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1px solid var(--color-card-border)",
                    backgroundColor: "#F7FAFD",
                    fontSize: "0.875rem",
                    color: "var(--color-navy)",
                  }}
                />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: 6 }}>
                  Default Meta Description
                </label>
                <textarea
                  readOnly
                  rows={2}
                  value="Parthav Technologies — Premier IT Solutions & Digital Transformation Agency in Jaipur, India. Specializing in Web Development, AI & Automation, SEO & Digital Growth, UI/UX Design, and Cloud CRM."
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1px solid var(--color-card-border)",
                    backgroundColor: "#F7FAFD",
                    fontSize: "0.875rem",
                    color: "var(--color-navy)",
                    resize: "none",
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid var(--color-card-border)",
              borderRadius: 12,
              padding: 24,
            }}
          >
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-navy)", margin: "0 0 16px 0" }}>
              Search Engine Verification
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ padding: 16, backgroundColor: "#F7FAFD", borderRadius: 8, border: "1px solid var(--color-card-border)" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-orange)", textTransform: "uppercase" }}>
                  Google Search Console
                </span>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy)", marginTop: 4 }}>
                  Verified via DNS & Meta Tag
                </div>
              </div>
              <div style={{ padding: 16, backgroundColor: "#F7FAFD", borderRadius: 8, border: "1px solid var(--color-card-border)" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", textTransform: "uppercase" }}>
                  Bing Webmaster Tools
                </span>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy)", marginTop: 4 }}>
                  Synchronized via Google Search Console
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "sitemap" && (
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid var(--color-card-border)",
            borderRadius: 12,
            padding: 24,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>
                Dynamic XML Sitemap Generator
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", margin: "4px 0 0 0" }}>
                Next.js App Router generated at <code>/sitemap.xml</code> with clean canonical URLs (fragments removed).
              </p>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              style={{
                fontSize: "0.8125rem",
                color: "var(--color-orange)",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Open Live XML <ExternalLink size={14} />
            </a>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-card-border)", textAlign: "left" }}>
                <th style={{ padding: "10px 12px", color: "var(--color-text-muted)", fontWeight: 600 }}>Route Group</th>
                <th style={{ padding: "10px 12px", color: "var(--color-text-muted)", fontWeight: 600 }}>Coverage</th>
                <th style={{ padding: "10px 12px", color: "var(--color-text-muted)", fontWeight: 600 }}>Change Frequency</th>
                <th style={{ padding: "10px 12px", color: "var(--color-text-muted)", fontWeight: 600 }}>Priority</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #f0f4f9" }}>
                <td style={{ padding: "12px", fontWeight: 600, color: "var(--color-navy)" }}>Core Landing Pages</td>
                <td style={{ padding: "12px", color: "var(--color-text-muted)" }}>/, /about, /services, /work, /contact, /faq</td>
                <td style={{ padding: "12px" }}>weekly</td>
                <td style={{ padding: "12px", fontWeight: 700, color: "var(--color-orange)" }}>1.0</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f0f4f9" }}>
                <td style={{ padding: "12px", fontWeight: 600, color: "var(--color-navy)" }}>5 Pillar Service Hubs</td>
                <td style={{ padding: "12px", color: "var(--color-text-muted)" }}>/services/web-development, /services/ai-automation, ...</td>
                <td style={{ padding: "12px" }}>weekly</td>
                <td style={{ padding: "12px", fontWeight: 700, color: "var(--color-navy)" }}>0.9</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f0f4f9" }}>
                <td style={{ padding: "12px", fontWeight: 600, color: "var(--color-navy)" }}>130 Micro-Service Pages</td>
                <td style={{ padding: "12px", color: "var(--color-text-muted)" }}>/services/[pillar]/[slug] deep pages</td>
                <td style={{ padding: "12px" }}>monthly</td>
                <td style={{ padding: "12px", fontWeight: 700, color: "var(--color-navy)" }}>0.8</td>
              </tr>
              <tr>
                <td style={{ padding: "12px", fontWeight: 600, color: "var(--color-navy)" }}>Blog & Case Studies</td>
                <td style={{ padding: "12px", color: "var(--color-text-muted)" }}>/blog, /blog/[slug], /work/[slug]</td>
                <td style={{ padding: "12px" }}>weekly</td>
                <td style={{ padding: "12px", fontWeight: 700, color: "var(--color-navy)" }}>0.7</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "robots" && (
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid var(--color-card-border)",
            borderRadius: 12,
            padding: 24,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>
              Robots.txt Directives
            </h3>
            <a
              href="/robots.txt"
              target="_blank"
              style={{
                fontSize: "0.8125rem",
                color: "var(--color-orange)",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Open Live robots.txt <ExternalLink size={14} />
            </a>
          </div>

          <pre
            style={{
              padding: 16,
              backgroundColor: "#031B3A",
              color: "#EAF4FF",
              borderRadius: 8,
              fontSize: "0.875rem",
              lineHeight: 1.6,
              overflowX: "auto",
              fontFamily: "monospace",
            }}
          >
{`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/admin/

Sitemap: https://parthavtechnologies.com/sitemap.xml`}
          </pre>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginTop: 12 }}>
            Guards all administrative panels and confidential backend endpoints from web crawler indexing while permitting full indexing of public marketing pages.
          </p>
        </div>
      )}

      {activeTab === "schema" && (
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid var(--color-card-border)",
            borderRadius: 12,
            padding: 24,
          }}
        >
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-navy)", margin: "0 0 16px 0" }}>
            JSON-LD Rich Structured Data
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {[
              {
                type: "Organization",
                desc: "Defines Parthav Technologies corporate entity, logo, social profiles, and founders.",
                status: "Active",
              },
              {
                type: "LocalBusiness",
                desc: "Geo-coordinates for Jaipur, Rajasthan headquarters, telephone, and operational hours.",
                status: "Active",
              },
              {
                type: "ProfessionalService",
                desc: "Catalog of custom software, AI engineering, and digital growth offerings.",
                status: "Active",
              },
              {
                type: "WebSite",
                desc: "Configures Sitelinks Searchbox and official domain identity for Google Knowledge Graph.",
                status: "Active",
              },
            ].map((schema) => (
              <div
                key={schema.type}
                style={{
                  padding: 16,
                  border: "1px solid var(--color-card-border)",
                  borderRadius: 8,
                  backgroundColor: "#F7FAFD",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, color: "var(--color-navy)", fontSize: "0.9375rem" }}>
                    schema.org/{schema.type}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "#00875A",
                      backgroundColor: "#E6FBF2",
                      padding: "2px 8px",
                      borderRadius: 12,
                    }}
                  >
                    {schema.status}
                  </span>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.5 }}>
                  {schema.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
