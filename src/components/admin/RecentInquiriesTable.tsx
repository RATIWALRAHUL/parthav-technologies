"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, Edit2, MoreHorizontal, Plus } from "lucide-react";
import { InquiryModal, type InquiryRecord } from "./InquiryModal";
import { AddInquiryModal } from "./AddInquiryModal";
import styles from "./AdminTable.module.css";

interface RecentInquiriesTableProps {
  inquiries: InquiryRecord[];
  onRefresh?: () => void;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[d.getUTCMonth()];
    const day = d.getUTCDate().toString().padStart(2, "0");
    const year = d.getUTCFullYear();
    let hours = d.getUTCHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const minutes = d.getUTCMinutes().toString().padStart(2, "0");
    return `${month} ${day}, ${year}  ${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  } catch {
    return dateStr;
  }
}

function getStatusClass(status: string): string {
  switch (status) {
    case "New":
      return styles.statusNew;
    case "Contacted":
      return styles.statusContacted;
    case "Proposal Sent":
      return styles.statusProposal;
    case "Qualified":
      return styles.statusQualified;
    case "Won":
      return styles.statusWon;
    case "Lost":
      return styles.statusLost;
    default:
      return styles.statusDefault;
  }
}

export function RecentInquiriesTable({
  inquiries,
  onRefresh,
}: RecentInquiriesTableProps) {
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(inquiries.map((i) => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        onRefresh?.();
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className={styles.tableCard}>
      <div className={styles.tableHeader}>
        <h3 className={styles.tableTitle}>Recent Inquiries</h3>
        <div className={styles.tableActions}>
          <Link href="/admin/inquiries" className={styles.viewAllLink}>
            View All Inquiries
          </Link>
          <button
            type="button"
            className={styles.addInquiryBtn}
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Add Inquiry</span>
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: 40, textAlign: "center" }}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  onChange={handleToggleAll}
                  checked={inquiries.length > 0 && selectedIds.length === inquiries.length}
                />
              </th>
              <th>#ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Service</th>
              <th>Status</th>
              <th>Source</th>
              <th>Date & Time</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>
                  No inquiries recorded in this period.
                </td>
              </tr>
            ) : (
              inquiries.map((inq) => {
                const isSelected = selectedIds.includes(inq.id);

                return (
                  <tr key={inq.id} style={{ backgroundColor: isSelected ? "#f0f7ff" : undefined }}>
                    <td style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        checked={isSelected}
                        onChange={() => handleToggleRow(inq.id)}
                      />
                    </td>
                    <td className={styles.codeCell}>{inq.inquiryCode}</td>
                    <td className={styles.nameCell}>{inq.name}</td>
                    <td className={styles.emailCell}>{inq.email}</td>
                    <td className={styles.serviceCell}>{inq.service}</td>
                    <td>
                      <span className={`${styles.statusPill} ${getStatusClass(inq.status)}`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className={styles.sourceCell}>{inq.source}</td>
                    <td className={styles.dateCell}>{formatDate(inq.createdAt)}</td>
                    <td style={{ textAlign: "right" }}>
                      <div className={styles.actionsCell} style={{ justifyContent: "flex-end" }}>
                        <button
                          type="button"
                          className={styles.actionBtn}
                          title="View Inquiry Details"
                          onClick={() => setSelectedInquiry(inq)}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          className={styles.actionBtn}
                          title="Update Status"
                          onClick={() => setSelectedInquiry(inq)}
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          className={styles.actionBtn}
                          title="More Actions"
                          onClick={() => setSelectedInquiry(inq)}
                        >
                          <MoreHorizontal size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Inquiry Detail & Status Modal */}
      {selectedInquiry && (
        <InquiryModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Manual Inquiry Creation Modal */}
      <AddInquiryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => onRefresh?.()}
      />
    </div>
  );
}
