"use client";

import React, { useState, useEffect } from "react";
import { UserPlus, Shield, X, Loader2 } from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url: string | null;
  is_active: number;
  last_login_at: string | null;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Administrator",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create administrator");
      }

      setIsModalOpen(false);
      setFormData({ name: "", email: "", password: "", role: "Administrator" });
      fetchUsers();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
    } finally {
      setSubmitting(false);
    }
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
            Users & Permissions
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", margin: "4px 0 0 0" }}>
            Manage administrative personnel, authorization tiers, and security access logs.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 16px",
            backgroundColor: "var(--color-orange)",
            color: "#ffffff",
            border: "none",
            borderRadius: 8,
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(255, 106, 0, 0.2)",
          }}
        >
          <UserPlus size={16} />
          Add Administrator
        </button>
      </div>

      {/* Role summary pills */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        <div style={{ backgroundColor: "#ffffff", padding: "16px 20px", borderRadius: 12, border: "1px solid var(--color-card-border)" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase" }}>
            Total Administrators
          </span>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-navy)", marginTop: 4 }}>
            {users.length} Active
          </div>
        </div>

        <div style={{ backgroundColor: "#ffffff", padding: "16px 20px", borderRadius: 12, border: "1px solid var(--color-card-border)" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase" }}>
            Session Security
          </span>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#00875A", marginTop: 4 }}>
            HMAC-SHA256
          </div>
        </div>

        <div style={{ backgroundColor: "#ffffff", padding: "16px 20px", borderRadius: 12, border: "1px solid var(--color-card-border)" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase" }}>
            Password Hashing
          </span>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-navy)", marginTop: 4 }}>
            Node Scrypt
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 12,
          border: "1px solid var(--color-card-border)",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(3, 27, 58, 0.02)",
        }}
      >
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-card-border)" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>
            Authorized Accounts
          </h2>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-muted)" }}>
            <Loader2 className="animate-spin" size={24} style={{ margin: "0 auto 8px auto" }} />
            Loading administrators...
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#F7FAFD", borderBottom: "1px solid var(--color-card-border)", textAlign: "left" }}>
                  <th style={{ padding: "12px 20px", fontWeight: 600, color: "var(--color-navy)" }}>User</th>
                  <th style={{ padding: "12px 20px", fontWeight: 600, color: "var(--color-navy)" }}>Email</th>
                  <th style={{ padding: "12px 20px", fontWeight: 600, color: "var(--color-navy)" }}>Role</th>
                  <th style={{ padding: "12px 20px", fontWeight: 600, color: "var(--color-navy)" }}>Status</th>
                  <th style={{ padding: "12px 20px", fontWeight: 600, color: "var(--color-navy)" }}>Last Login</th>
                  <th style={{ padding: "12px 20px", fontWeight: 600, color: "var(--color-navy)" }}>Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid #f0f4f9" }}>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            backgroundColor: "var(--color-navy)",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "0.875rem",
                          }}
                        >
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: "var(--color-navy)" }}>{u.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>ID: {u.id.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px", color: "var(--color-text-muted)" }}>{u.email}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          backgroundColor: u.role === "Super Admin" ? "#FFF2E8" : "#EAF4FF",
                          color: u.role === "Super Admin" ? "var(--color-orange)" : "var(--color-navy)",
                          padding: "3px 10px",
                          borderRadius: 12,
                        }}
                      >
                        <Shield size={12} />
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: u.is_active ? "#00875A" : "#DE350B",
                          backgroundColor: u.is_active ? "#E6FBF2" : "#FFEBE6",
                          padding: "3px 10px",
                          borderRadius: 12,
                        }}
                      >
                        {u.is_active ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px", color: "var(--color-text-muted)", fontSize: "0.8125rem" }}>
                      {u.last_login_at ? new Date(u.last_login_at).toLocaleString() : "Never"}
                    </td>
                    <td style={{ padding: "14px 20px", color: "var(--color-text-muted)", fontSize: "0.8125rem" }}>
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(3, 27, 58, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 16,
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 16,
              width: "100%",
              maxWidth: 480,
              boxShadow: "0 20px 40px rgba(3, 27, 58, 0.15)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid var(--color-card-border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 700, color: "var(--color-navy)" }}>
                Add New Administrator
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              {error && (
                <div
                  style={{
                    padding: "10px 14px",
                    backgroundColor: "#FFEBE6",
                    color: "#DE350B",
                    borderRadius: 8,
                    fontSize: "0.8125rem",
                  }}
                >
                  {error}
                </div>
              )}

              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: 6 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="vikram@parthavtechnologies.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  Password (min 8 characters)
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                  Authorization Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1px solid var(--color-card-border)",
                    fontSize: "0.875rem",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <option value="Administrator">Administrator (Full Access)</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Lead Manager">Lead Manager (Inquiries Only)</option>
                  <option value="Editor">Editor (Content & Blog)</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: "9px 16px",
                    backgroundColor: "#f0f4f9",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--color-navy)",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "9px 20px",
                    backgroundColor: "var(--color-orange)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                >
                  {submitting ? "Creating..." : "Save Administrator"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
