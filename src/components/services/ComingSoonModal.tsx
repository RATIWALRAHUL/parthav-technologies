"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Bell, Mail, Sparkles, ArrowRight, Check } from "lucide-react";
import styles from "./ComingSoonModal.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  category: string;
  description?: string;
}

const DEFAULT_DESCRIPTION =
  "We're currently preparing this service to bring you a better, more powerful solution. Be the first to know when we launch.";

export function ComingSoonModal({
  isOpen,
  onClose,
  serviceName,
  category,
  description = DEFAULT_DESCRIPTION,
}: ComingSoonModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Reset transient state whenever a different service opens.
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setConsent(false);
      setSubmitted(false);
      setLoading(false);
    }
  }, [isOpen, serviceName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !email || !consent) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <div className={styles.wrapper}>
            <motion.div
              ref={dialogRef}
              className={styles.dialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby="coming-soon-title"
              tabIndex={-1}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
                <X size={18} strokeWidth={2} />
              </button>

              <div className={styles.contentCol}>
                <span className={styles.eyebrow}>COMING SOON</span>
                <h2 id="coming-soon-title" className={styles.title}>
                  {serviceName}
                  <br />
                  <span className={styles.orangeText}>is Coming Soon.</span>
                </h2>
                <span className={styles.categoryTag}>{category}</span>

                <p className={styles.description}>&ldquo;{description}&rdquo;</p>

                <ul className={styles.featureList}>
                  <li>
                    <Bell size={15} strokeWidth={2} />
                    <span>Get Notified</span>
                  </li>
                  <li>
                    <Mail size={15} strokeWidth={2} />
                    <span>Early Updates</span>
                  </li>
                  <li>
                    <Sparkles size={15} strokeWidth={2} />
                    <span>Launch Updates</span>
                  </li>
                </ul>

                {submitted ? (
                  <div className={styles.successBox} role="status">
                    <span className={styles.successIcon}>
                      <Check size={16} strokeWidth={2.5} />
                    </span>
                    <span>Thanks! We&apos;ll let you know when this launches.</span>
                  </div>
                ) : (
                  <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.inputRow}>
                      <label htmlFor="coming-soon-email" className={styles.srOnly}>
                        Email address
                      </label>
                      <input
                        id="coming-soon-email"
                        type="email"
                        required
                        placeholder="Enter your email address"
                        className={styles.emailInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button type="submit" className={styles.notifyBtn} disabled={loading || !consent}>
                        <span>{loading ? "Sending…" : "Notify Me"}</span>
                        {!loading && <ArrowRight size={15} strokeWidth={2} />}
                      </button>
                    </div>

                    <label className={styles.consentRow}>
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                      />
                      <span>
                        I agree to receive product updates, insights and newsletters from Parthav Technologies.
                      </span>
                    </label>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
