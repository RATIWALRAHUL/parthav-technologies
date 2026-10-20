"use client";

import React from "react";
import Image from "next/image";
import { Copy } from "lucide-react";

const MEDIA_ASSETS = [
  { name: "Parthav Main Logo", path: "/logo/parthav-logo.png", dimensions: "150x34", format: "PNG" },
  { name: "Hawa Mahal Jaipur Heritage", path: "/images/about/jaipur-hawa-mahal.jpg", dimensions: "1200x800", format: "JPG" },
  { name: "Executive Avatar (Rahul)", path: "/images/hero/avatar-1.webp", dimensions: "80x80", format: "WebP" },
  { name: "Modern Property Platform", path: "/images/work/project-realestate.webp", dimensions: "600x400", format: "WebP" },
  { name: "Healthcare Booking Platform", path: "/images/work/project-healthcare.webp", dimensions: "600x400", format: "WebP" },
  { name: "Fashion E-commerce Store", path: "/images/work/project-ecommerce.webp", dimensions: "600x400", format: "WebP" },
];

export default function AdminMediaPage() {
  const [copiedPath, setCopiedPath] = React.useState<string | null>(null);

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
          Media Library
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", margin: "4px 0 0 0" }}>
          Production visual assets, brand vectors, WebP posters, and UI graphics.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
        {MEDIA_ASSETS.map((asset) => (
          <div
            key={asset.path}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid var(--color-card-border)",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(3, 27, 58, 0.02)",
            }}
          >
            <div style={{ height: 140, position: "relative", backgroundColor: "#062B57", display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}>
              <Image
                src={asset.path}
                alt={asset.name}
                fill
                style={{ objectFit: "contain", padding: 12 }}
                sizes="280px"
              />
            </div>
            <div style={{ padding: "14px 16px" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-navy)", display: "block", marginBottom: 4 }}>
                {asset.name}
              </span>
              <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block", marginBottom: 10 }}>
                {asset.format} • {asset.dimensions}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(asset.path)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  borderRadius: 6,
                  border: "1px solid #cbd5e1",
                  background: "#f8fafc",
                  fontSize: "0.7188rem",
                  fontWeight: 600,
                  color: "var(--color-navy)",
                  cursor: "pointer",
                }}
              >
                <Copy size={12} />
                <span>{copiedPath === asset.path ? "Copied!" : "Copy Path"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
