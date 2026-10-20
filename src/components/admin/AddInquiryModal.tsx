"use client";

import React, { useState } from "react";
import { X, Plus, AlertCircle } from "lucide-react";
import styles from "./AdminTable.module.css";

interface AddInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SERVICES = [
  "Web Development",
  "AI & Automation",
  "SEO & Digital Growth",
  "UI/UX Design",
  "CRM & Automation",
  "Branding & Digital Identity",
  "Others",
];

const BUDGETS = [
  "Not decided yet",
  "Under ₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1,00,000",
  "₹1,00,000–₹3,00,000",
  "₹3,00,000+",
  "Prefer to discuss",
];

export function AddInquiryModal({ isOpen, onClose, onSuccess }: AddInquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("Web Development");
  const [budget, setBudget] = useState("₹50,000–₹1,00,000");
  const [details, setDetails] = useState("");
  const status = "New";
  const source = "Manual";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          service,
          budget,
          details,
          status,
          source,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create inquiry.");
      }

      onSuccess();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>+ Add Manual Inquiry</h2>
          <button type="button" className={styles.closeModalBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {error && (
          <div style={{ backgroundColor: "#fef2f2", color: "#b91c1c", padding: "10px 12px", borderRadius: 6, fontSize: "0.8125rem", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#062B57", display: "block", marginBottom: 4 }}>
                Contact Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Priya Sharma"
                style={{ width: "100%", height: 38, padding: "0 10px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: "0.8125rem" }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#062B57", display: "block", marginBottom: 4 }}>
                Work Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="priya@company.com"
                style={{ width: "100%", height: 38, padding: "0 10px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: "0.8125rem" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#062B57", display: "block", marginBottom: 4 }}>
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98290 12345"
                style={{ width: "100%", height: 38, padding: "0 10px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: "0.8125rem" }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#062B57", display: "block", marginBottom: 4 }}>
                Company Name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Global"
                style={{ width: "100%", height: 38, padding: "0 10px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: "0.8125rem" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#062B57", display: "block", marginBottom: 4 }}>
                Service Discipline
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                style={{ width: "100%", height: 38, padding: "0 10px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: "0.8125rem", backgroundColor: "#fff" }}
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#062B57", display: "block", marginBottom: 4 }}>
                Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={{ width: "100%", height: 38, padding: "0 10px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: "0.8125rem", backgroundColor: "#fff" }}
              >
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#062B57", display: "block", marginBottom: 4 }}>
              Project Requirements / Notes
            </label>
            <textarea
              rows={3}
              required
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe client goals, timeline, and specifications..."
              style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: "0.8125rem", resize: "vertical" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: "8px 14px", borderRadius: 6, border: "1px solid #cbd5e1", background: "#fff", fontSize: "0.8125rem", cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.addInquiryBtn}
            >
              <Plus size={16} />
              <span>{isSubmitting ? "Creating..." : "Save Inquiry"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
