"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Search, Download, Plus, RefreshCw } from "lucide-react";
import { RecentInquiriesTable } from "@/components/admin/RecentInquiriesTable";
import { AddInquiryModal } from "@/components/admin/AddInquiryModal";
import type { InquiryRecord } from "@/components/admin/InquiryModal";

const STATUS_FILTERS = [
  "All",
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

const SERVICE_FILTERS = [
  "All",
  "Web Development",
  "AI & Automation",
  "SEO & Digital Growth",
  "UI/UX Design",
  "CRM & Automation",
  "Others",
];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedService, setSelectedService] = useState("All");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1, limit: 10 });
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchInquiries = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "15",
        search,
        status: selectedStatus,
        service: selectedService,
      });

      const res = await fetch(`/api/admin/inquiries?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setInquiries(json.data.items);
          setPagination(json.data.pagination);
        }
      }
    } catch (err) {
      console.error("Failed to load inquiries", err);
    } finally {
      setIsLoading(false);
    }
  }, [page, search, selectedStatus, selectedService]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchInquiries();
  };

  const handleExportCsv = () => {
    if (inquiries.length === 0) return;
    let csv = "ID,Inquiry Code,Name,Email,Phone,Company,Service,Status,Source,Date\n";
    for (const inq of inquiries) {
      csv += `"${inq.id}","${inq.inquiryCode}","${inq.name}","${inq.email}","${inq.phone || ""}","${inq.company || ""}","${inq.service}","${inq.status}","${inq.source}","${inq.createdAt}"\n`;
    }
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `parthav_inquiries_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
            Inquiry Management
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", margin: "4px 0 0 0" }}>
            Review, triage, and action all inbound client leads across web forms and AI chat.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            onClick={() => fetchInquiries()}
            title="Refresh Inquiries"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 8,
              border: "1px solid var(--color-card-border)",
              backgroundColor: "#ffffff",
              color: "var(--color-navy)",
              cursor: "pointer",
            }}
          >
            <RefreshCw size={15} style={{ animation: isLoading ? "spin 1s linear infinite" : "none" }} />
          </button>

          <button
            type="button"
            onClick={handleExportCsv}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              height: 40,
              padding: "0 14px",
              borderRadius: 8,
              border: "1px solid var(--color-card-border)",
              backgroundColor: "#ffffff",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--color-navy)",
              cursor: "pointer",
            }}
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              height: 40,
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
            <Plus size={16} strokeWidth={2.5} />
            <span>+ Add Inquiry</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ backgroundColor: "#ffffff", padding: "16px 20px", borderRadius: 12, border: "1px solid var(--color-card-border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 260 }}>
          <div style={{ position: "relative", width: "100%", maxWidth: 360 }}>
            <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8da4be" }} />
            <input
              type="text"
              placeholder="Search by name, email, company or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                height: 38,
                padding: "0 12px 0 36px",
                borderRadius: 8,
                border: "1px solid var(--color-card-border)",
                fontSize: "0.8125rem",
              }}
            />
          </div>
          <button
            type="submit"
            style={{ height: 38, padding: "0 14px", borderRadius: 8, border: "none", backgroundColor: "var(--color-navy)", color: "#ffffff", fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer" }}
          >
            Search
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8125rem" }}>
            <span style={{ color: "#64748b", fontWeight: 500 }}>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setPage(1);
              }}
              style={{ height: 36, padding: "0 8px", borderRadius: 6, border: "1px solid var(--color-card-border)", fontSize: "0.8125rem", backgroundColor: "#fff" }}
            >
              {STATUS_FILTERS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8125rem" }}>
            <span style={{ color: "#64748b", fontWeight: 500 }}>Service:</span>
            <select
              value={selectedService}
              onChange={(e) => {
                setSelectedService(e.target.value);
                setPage(1);
              }}
              style={{ height: 36, padding: "0 8px", borderRadius: 6, border: "1px solid var(--color-card-border)", fontSize: "0.8125rem", backgroundColor: "#fff" }}
            >
              {SERVICE_FILTERS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={fetchInquiries}
            title="Refresh list"
            style={{ height: 36, width: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, border: "1px solid var(--color-card-border)", backgroundColor: "#fff", cursor: "pointer" }}
          >
            <RefreshCw size={14} style={{ color: "#64748b" }} />
          </button>
        </div>
      </div>

      {/* Inquiries Table */}
      <RecentInquiriesTable
        inquiries={inquiries}
        onRefresh={fetchInquiries}
      />

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", backgroundColor: "#ffffff", borderRadius: 8, border: "1px solid var(--color-card-border)" }}>
          <span style={{ fontSize: "0.8125rem", color: "#64748b" }}>
            Showing page {page} of {pagination.totalPages} ({pagination.total} total inquiries)
          </span>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              style={{ height: 32, padding: "0 12px", borderRadius: 6, border: "1px solid var(--color-card-border)", backgroundColor: page <= 1 ? "#f1f5f9" : "#fff", cursor: page <= 1 ? "not-allowed" : "pointer", fontSize: "0.7813rem" }}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= pagination.totalPages}
              onClick={() => setPage(page + 1)}
              style={{ height: 32, padding: "0 12px", borderRadius: 6, border: "1px solid var(--color-card-border)", backgroundColor: page >= pagination.totalPages ? "#f1f5f9" : "#fff", cursor: page >= pagination.totalPages ? "not-allowed" : "pointer", fontSize: "0.7813rem" }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <AddInquiryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchInquiries}
      />
    </div>
  );
}
