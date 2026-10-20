"use client";

import React, { useState } from "react";
import { X, Mail, Phone, Building2, Tag, CheckCircle2 } from "lucide-react";
import styles from "./AdminTable.module.css";

export interface InquiryRecord {
  id: string;
  inquiryCode: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service: string;
  budget?: string | null;
  details: string;
  source: string;
  status: string;
  createdAt: string;
}

interface InquiryModalProps {
  inquiry: InquiryRecord | null;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: string) => Promise<void>;
}

const STATUS_OPTIONS = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
  "Spam",
];

export function InquiryModal({ inquiry, onClose, onStatusChange }: InquiryModalProps) {
  const [selectedStatus, setSelectedStatus] = useState(inquiry?.status || "New");
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState(false);

  if (!inquiry) return null;

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await onStatusChange(inquiry.id, selectedStatus);
      setStatusSuccess(true);
      setTimeout(() => setStatusSuccess(false), 2000);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>
              {inquiry.inquiryCode}
            </span>
            <h2 className={styles.modalTitle}>{inquiry.name}</h2>
          </div>
          <button type="button" className={styles.closeModalBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8125rem" }}>
              <Mail size={16} style={{ color: "#FF6A00" }} />
              <a href={`mailto:${inquiry.email}`} style={{ color: "#062B57", fontWeight: 500 }}>
                {inquiry.email}
              </a>
            </div>
            {inquiry.phone && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8125rem" }}>
                <Phone size={16} style={{ color: "#3B82F6" }} />
                <span>{inquiry.phone}</span>
              </div>
            )}
            {inquiry.company && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8125rem" }}>
                <Building2 size={16} style={{ color: "#64748B" }} />
                <span>{inquiry.company}</span>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8125rem" }}>
              <Tag size={16} style={{ color: "#10B981" }} />
              <span>{inquiry.service}</span>
            </div>
          </div>

          <div style={{ padding: "12px 14px", backgroundColor: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600, display: "block", marginBottom: 4 }}>
              Project Requirements / Message:
            </span>
            <p style={{ fontSize: "0.875rem", color: "#1e293b", lineHeight: 1.5, margin: 0 }}>
              {inquiry.details}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#062B57" }}>
                Lead Status:
              </span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{
                  height: 36,
                  padding: "0 10px",
                  borderRadius: 6,
                  border: "1px solid #cbd5e1",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  backgroundColor: "#ffffff",
                }}
              >
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleUpdate}
              disabled={isUpdating || selectedStatus === inquiry.status}
              className={styles.addInquiryBtn}
              style={{
                height: 36,
                padding: "0 14px",
                backgroundColor: selectedStatus === inquiry.status ? "#94a3b8" : "#FF6A00",
              }}
            >
              {isUpdating ? "Saving..." : "Update Status"}
            </button>
          </div>

          {statusSuccess && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#16a34a", fontSize: "0.8125rem", fontWeight: 600 }}>
              <CheckCircle2 size={16} />
              <span>Status updated to {selectedStatus}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
