"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  KeyRound,
} from "lucide-react";
import styles from "./login.module.css";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/admin/dashboard";

  const [email, setEmail] = useState("admin@parthavtechnologies.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid email or password.");
      }

      router.push(redirectTarget);
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred during authentication.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = () => {
    setEmail("admin@parthavtechnologies.com");
    setPassword("admin123");
    setError(null);
  };

  return (
    <div className={styles.loginContainer}>
      {/* Decorative ambient elements */}
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.ambientGlowRight} aria-hidden="true" />

      <div className={styles.loginCard}>
        {/* Top Header with Brand */}
        <div className={styles.logoHeader}>
          <div className={styles.logoWrapper}>
            <Image
              src="/logo/parthav-logo.png"
              alt="Parthav Technologies"
              width={170}
              height={40}
              priority
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.badgePill}>
            <ShieldCheck size={13} className={styles.badgePillIcon} />
            <span>Admin Workstation</span>
          </div>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>
            Sign in with your administrative credentials to manage leads, content, and system operations.
          </p>
        </div>

        {/* Error notification banner */}
        {error && (
          <div className={styles.errorBanner} role="alert">
            <AlertCircle size={16} className={styles.errorIcon} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* Email field with icon */}
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Work Email
            </label>
            <div className={styles.inputWrapper}>
              <Mail size={17} className={styles.fieldIcon} aria-hidden="true" />
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="admin@parthavtechnologies.com"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Password field with eye toggle */}
          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <Lock size={17} className={styles.fieldIcon} aria-hidden="true" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.input} ${styles.passwordInput}`}
                placeholder="••••••••"
                disabled={isSubmitting}
              />
              <button
                type="button"
                className={styles.eyeToggleBtn}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff size={18} className={styles.eyeIcon} />
                ) : (
                  <Eye size={18} className={styles.eyeIcon} />
                )}
              </button>
            </div>
          </div>

          {/* Remember me & Security options */}
          <div className={styles.optionsRow}>
            <label className={styles.rememberMeLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkbox}
              />
              <span>Remember this session</span>
            </label>
            <span className={styles.securityBadge}>
              <Check size={12} color="#16a34a" /> 256-bit Encrypted
            </span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitBtn}
          >
            {isSubmitting ? (
              <span className={styles.loadingSpinner}>Authenticating credentials...</span>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Sign In to Dashboard</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Quick evaluation helper */}
        <div className={styles.credentialsHint}>
          <div className={styles.hintHeader}>
            <KeyRound size={14} className={styles.hintIcon} />
            <span>Seed Evaluation Credentials</span>
          </div>
          <div className={styles.credentialPills}>
            <span className={styles.credPill}>
              <strong>Email:</strong> admin@parthavtechnologies.com
            </span>
            <span className={styles.credPill}>
              <strong>Password:</strong> admin123
            </span>
          </div>
          <button
            type="button"
            className={styles.quickFillBtn}
            onClick={handleQuickFill}
          >
            Auto-fill Credentials
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.loginContainer}>
          <div style={{ color: "#ffffff", fontSize: "0.9375rem", fontWeight: 600 }}>
            Loading authentication portal...
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
