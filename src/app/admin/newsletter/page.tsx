"use client";

import React, { useEffect, useState } from "react";
import { Mail, Download, RefreshCw } from "lucide-react";

interface SubscriberItem {
  id: string;
  email: string;
  status: string;
  sourcePage: string;
  createdAt: string;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscribers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/subscribers");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setSubscribers(json.data);
          setTotal(json.total || json.data.length);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleExport = () => {
    window.location.href = "/api/admin/subscribers?format=csv";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
            Newsletter Subscribers
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", margin: "4px 0 0 0" }}>
            Manage {total} active audience subscribers captured from website footers and launch notifications.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            onClick={fetchSubscribers}
            style={{
              height: 38,
              width: 38,
              borderRadius: 8,
              border: "1px solid var(--color-card-border)",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <RefreshCw size={14} style={{ color: "#64748b", animation: isLoading ? "spin 1s linear infinite" : "none" }} />
          </button>

          <button
            type="button"
            onClick={handleExport}
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
              boxShadow: "0 2px 8px rgba(255, 106, 0, 0.25)",
            }}
          >
            <Download size={15} />
            <span>Export Subscribers (CSV)</span>
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-card-border)", borderRadius: 14, padding: 24, boxShadow: "0 2px 8px rgba(3, 27, 58, 0.02)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-card-border)", backgroundColor: "#f8fafc" }}>
                <th style={{ padding: "12px 16px", color: "#64748b", fontWeight: 600 }}>Subscriber Email</th>
                <th style={{ padding: "12px 16px", color: "#64748b", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "12px 16px", color: "#64748b", fontWeight: 600 }}>Source Page</th>
                <th style={{ padding: "12px 16px", color: "#64748b", fontWeight: 600 }}>Subscribed Date</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.slice(0, 50).map((sub) => (
                <tr key={sub.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--color-navy)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Mail size={14} style={{ color: "#FF6A00" }} />
                      <span>{sub.email}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#16a34a", backgroundColor: "#f0fdf4", padding: "2px 8px", borderRadius: 8 }}>
                      {sub.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", color: "#64748b" }}>{sub.sourcePage}</td>
                  <td style={{ padding: "12px 16px", color: "#64748b", fontSize: "0.75rem" }}>
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
