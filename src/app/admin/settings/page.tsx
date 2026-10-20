"use client";

import React, { useState } from "react";
import {
  Database,
  Mail,
  ShieldCheck,
  Building2,
  HardDrive,
  CheckCircle2,
  Save,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

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
            Site & System Settings
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", margin: "4px 0 0 0" }}>
            Operational parameters, enterprise database status, organization profiles, and security keys.
          </p>
        </div>

        {saved && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              backgroundColor: "#E6FBF2",
              color: "#00875A",
              borderRadius: 8,
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={16} /> Settings saved successfully
          </div>
        )}
      </div>

      {/* System Health Status Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: 20,
            borderRadius: 12,
            border: "1px solid var(--color-card-border)",
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: "#EAF4FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Database size={22} color="var(--color-navy)" />
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
              Database Engine
            </span>
            <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--color-navy)", marginTop: 2 }}>
              Native Node SQLite
            </div>
            <div style={{ fontSize: "0.8125rem", color: "#00875A", fontWeight: 600, marginTop: 4 }}>
              ● WAL Mode Active · Online
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: 20,
            borderRadius: 12,
            border: "1px solid var(--color-card-border)",
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: "#FFF2E8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={22} color="var(--color-orange)" />
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
              Auth Security
            </span>
            <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--color-navy)", marginTop: 2 }}>
              HMAC + Scrypt
            </div>
            <div style={{ fontSize: "0.8125rem", color: "#00875A", fontWeight: 600, marginTop: 4 }}>
              ● HttpOnly Session Cookies
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: 20,
            borderRadius: 12,
            border: "1px solid var(--color-card-border)",
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: "#F0F4F9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Mail size={22} color="var(--color-navy)" />
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
              Lead Dispatch
            </span>
            <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--color-navy)", marginTop: 2 }}>
              Direct DB Sync
            </div>
            <div style={{ fontSize: "0.8125rem", color: "#00875A", fontWeight: 600, marginTop: 4 }}>
              ● 100% Ingestion Rate
            </div>
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Organization Info */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: 24,
            borderRadius: 12,
            border: "1px solid var(--color-card-border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Building2 size={20} color="var(--color-orange)" />
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>
              Organization Profile
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: 6 }}>
                Company Legal Name
              </label>
              <input
                type="text"
                defaultValue="Parthav Technologies Pvt. Ltd."
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid var(--color-card-border)",
                  fontSize: "0.875rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: 6 }}>
                Brand Tagline
              </label>
              <input
                type="text"
                defaultValue="Ideas to Impact · Building for the World"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid var(--color-card-border)",
                  fontSize: "0.875rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: 6 }}>
                Support & Inquiries Email
              </label>
              <input
                type="email"
                defaultValue="contact@parthavtechnologies.com"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid var(--color-card-border)",
                  fontSize: "0.875rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: 6 }}>
                Direct Contact Phone
              </label>
              <input
                type="text"
                defaultValue="+91 98765 43210"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid var(--color-card-border)",
                  fontSize: "0.875rem",
                }}
              />
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: 6 }}>
                Headquarters Address
              </label>
              <input
                type="text"
                defaultValue="Parthav Tower, Malviya Nagar, Jaipur, Rajasthan, India — 302017"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid var(--color-card-border)",
                  fontSize: "0.875rem",
                }}
              />
            </div>
          </div>
        </div>

        {/* Technical Infrastructure */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: 24,
            borderRadius: 12,
            border: "1px solid var(--color-card-border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <HardDrive size={20} color="var(--color-navy)" />
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>
              Database & Storage Specifications
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ padding: 14, backgroundColor: "#F7FAFD", borderRadius: 8, border: "1px solid var(--color-card-border)" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-muted)" }}>Storage Engine</span>
              <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color-navy)", marginTop: 2 }}>
                SQLite 3 (Built-in Node 26.5.0 DatabaseSync)
              </div>
            </div>

            <div style={{ padding: 14, backgroundColor: "#F7FAFD", borderRadius: 8, border: "1px solid var(--color-card-border)" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-muted)" }}>Target File Path</span>
              <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color-navy)", marginTop: 2 }}>
                <code>r:\p\database\parthav.sqlite</code>
              </div>
            </div>

            <div style={{ padding: 14, backgroundColor: "#F7FAFD", borderRadius: 8, border: "1px solid var(--color-card-border)" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-muted)" }}>Concurrency Mode</span>
              <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color-navy)", marginTop: 2 }}>
                Write-Ahead Logging (WAL) + Foreign Keys Enforced
              </div>
            </div>

            <div style={{ padding: 14, backgroundColor: "#F7FAFD", borderRadius: 8, border: "1px solid var(--color-card-border)" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-muted)" }}>Session Duration</span>
              <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color-navy)", marginTop: 2 }}>
                7 Days (Sliding expiration, SameSite=Lax)
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button
            type="submit"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              backgroundColor: "var(--color-orange)",
              color: "#ffffff",
              border: "none",
              borderRadius: 8,
              fontSize: "0.875rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(255, 106, 0, 0.2)",
            }}
          >
            <Save size={16} /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
