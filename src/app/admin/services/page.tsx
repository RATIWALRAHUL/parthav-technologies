"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MAIN_SERVICES } from "@/data/main-services";
import { ExternalLink } from "lucide-react";

export default function AdminServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredServices = MAIN_SERVICES.filter((main) => {
    if (selectedCategory !== "all" && main.id !== selectedCategory) return false;
    return true;
  });

  const totalMicroServices = MAIN_SERVICES.reduce((acc, curr) => acc + curr.microServices.length, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
            Services Catalogue
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", margin: "4px 0 0 0" }}>
            Operational registry of all 6 core service disciplines and {totalMicroServices} specialized micro-services.
          </p>
        </div>

        <Link
          href="/services"
          target="_blank"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            height: 38,
            padding: "0 14px",
            borderRadius: 8,
            border: "1px solid var(--color-card-border)",
            backgroundColor: "#ffffff",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "var(--color-navy)",
            textDecoration: "none",
          }}
        >
          <span>View Public Services Hub</span>
          <ExternalLink size={14} />
        </Link>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => setSelectedCategory("all")}
          style={{
            padding: "6px 14px",
            borderRadius: 20,
            fontSize: "0.8125rem",
            fontWeight: 600,
            border: "1px solid",
            borderColor: selectedCategory === "all" ? "var(--color-orange)" : "var(--color-card-border)",
            backgroundColor: selectedCategory === "all" ? "var(--color-orange)" : "#ffffff",
            color: selectedCategory === "all" ? "#ffffff" : "var(--color-navy)",
            cursor: "pointer",
          }}
        >
          All Categories ({MAIN_SERVICES.length})
        </button>

        {MAIN_SERVICES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setSelectedCategory(m.id)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: "0.8125rem",
              fontWeight: 600,
              border: "1px solid",
              borderColor: selectedCategory === m.id ? "var(--color-orange)" : "var(--color-card-border)",
              backgroundColor: selectedCategory === m.id ? "var(--color-orange)" : "#ffffff",
              color: selectedCategory === m.id ? "#ffffff" : "var(--color-navy)",
              cursor: "pointer",
            }}
          >
            {m.title} ({m.microServices.length})
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {filteredServices.map((cat) => (
          <div
            key={cat.id}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid var(--color-card-border)",
              borderRadius: 14,
              padding: 24,
              boxShadow: "0 2px 8px rgba(3, 27, 58, 0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: "0.8125rem", fontWeight: 800, color: "var(--color-orange)", backgroundColor: "#fff1e8", padding: "2px 8px", borderRadius: 6 }}>
                  {cat.number}
                </span>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>
                  {cat.title}
                </h2>
              </div>
              <span style={{ fontSize: "0.7813rem", color: "#64748b" }}>
                {cat.microServices.length} Micro-Services Configured
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              {cat.microServices.map((micro) => {
                const isComingSoon = micro.status === "coming-soon";
                return (
                  <div
                    key={micro.id}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: 10,
                      padding: "14px 16px",
                      backgroundColor: "#fafcff",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-navy)" }}>
                          {micro.name}
                        </span>
                        <span
                          style={{
                            fontSize: "0.6875rem",
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: 10,
                            backgroundColor: isComingSoon ? "#fff1e8" : "#eaf4ff",
                            color: isComingSoon ? "#c2410c" : "#1d4ed8",
                          }}
                        >
                          {isComingSoon ? "Coming Soon" : "Available"}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "0 0 10px 0", lineHeight: 1.4 }}>
                        {micro.description}
                      </p>
                    </div>

                    <Link
                      href={`/services/${cat.categorySlug}/${micro.id}`}
                      target="_blank"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--color-orange)",
                        textDecoration: "none",
                        marginTop: 4,
                      }}
                    >
                      <span>Preview Live Page</span>
                      <ExternalLink size={12} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
