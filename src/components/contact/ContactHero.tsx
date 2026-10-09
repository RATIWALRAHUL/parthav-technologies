"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MessageCircle,
  UsersRound,
  Target,
  User,
  Mail,
  Building2,
  Phone,
  Layers,
  IndianRupee,
  FileText,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { useContactMutation } from "@/hooks/queries/useContact";
import { CustomSelect } from "@/components/ui/CustomSelect";
import styles from "./ContactHero.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_DETAILS_LEN = 10;

const SERVICE_OPTIONS = [
  "UI/UX & Product Design",
  "Web & Mobile Development",
  "AI Solutions & Automation",
  "SEO & Digital Growth",
  "Branding & Digital Identity",
  "CRM & Business Automation",
  "E-commerce Solutions",
  "Custom Software & Business Systems",
  "Cloud, DevOps & Website Care",
  "Analytics & Conversion Optimization",
  "Other / Not Sure Yet",
];

const BUDGET_OPTIONS = [
  "Not decided yet",
  "Under ₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1,00,000",
  "₹1,00,000–₹3,00,000",
  "₹3,00,000+",
  "Prefer to discuss",
];

type FieldErrors = Partial<Record<"name" | "email" | "details", string>>;

export function ContactHero() {
  const shouldReduceMotion = useReducedMotion();
  const contactMutation = useContactMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    details: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});

  const validate = (): FieldErrors => {
    const errs: FieldErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Please enter your full name.";
    }
    if (!formData.email.trim() || !EMAIL_PATTERN.test(formData.email.trim())) {
      errs.email = "Please enter a valid work email address.";
    }
    if (!formData.details.trim() || formData.details.trim().length < MIN_DETAILS_LEN) {
      errs.details = `Please describe your project (at least ${MIN_DETAILS_LEN} characters).`;
    }
    return errs;
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    contactMutation.mutate(
      {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        phone: formData.phone.trim(),
        service: formData.service || undefined,
        budget: formData.budget || undefined,
        details: formData.details.trim(),
        honeypot: formData.honeypot,
      },
      {
        onSuccess: () => {
          setFormData({
            name: "",
            email: "",
            company: "",
            phone: "",
            service: "",
            budget: "",
            details: "",
            honeypot: "",
          });
          setErrors({});
        },
      }
    );
  };

  return (
    <section id="contact-hero" className={styles.heroSection} aria-label="Contact Parthav Technologies">
      {/* Ambient Visual Background Elements */}
      <div className={styles.ambientDecor} aria-hidden="true">
        <div className={styles.ambientGlowLeft} />
        <div className={styles.shapeTopLeft} />
        <div className={styles.shapeRight} />
        <div className={styles.dottedMatrix} />

        <svg className={styles.orangeOrbitSvg} viewBox="0 0 440 360" fill="none">
          <path
            d="M 20,240 C 90,80 340,30 420,180"
            stroke="#FF6A00"
            strokeWidth="1.5"
            strokeOpacity="0.25"
            strokeDasharray="10 8"
          />
        </svg>
      </div>

      <Container className={styles.container}>
        <div className={styles.heroGrid}>
          {/* ============================================================
             LEFT COLUMN: Headline, Copy & 3 Benefit Items
             ============================================================ */}
          <div className={styles.leftColumn}>
            {/* Eyebrow */}
            <motion.div
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.eyebrowDot} aria-hidden="true" />
              <span>CONTACT PARTHAV TECHNOLOGIES</span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h1
              className={styles.headline}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Let&apos;s build <br />
              what&apos;s next <br />
              <span className={styles.orangeText}>together.</span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              className={styles.supportingText}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              Have a project in mind or just want to say hello? We&apos;d love to hear from you.
              Share your ideas and our team will help you explore the right next steps.
            </motion.p>

            {/* 3 Benefit Items */}
            <motion.div
              className={styles.benefitsRow}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Item 1 */}
              <div className={styles.benefitItem}>
                <div className={clsx(styles.benefitIconBox, styles.peachIconBox)}>
                  <MessageCircle size={20} strokeWidth={2.2} />
                </div>
                <div className={styles.benefitText}>
                  <h3 className={styles.benefitTitle}>Quick Response</h3>
                  <p className={styles.benefitDesc}>We usually reply within 24 hours.</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className={styles.benefitItem}>
                <div className={clsx(styles.benefitIconBox, styles.blueIconBox)}>
                  <UsersRound size={20} strokeWidth={2.2} />
                </div>
                <div className={styles.benefitText}>
                  <h3 className={styles.benefitTitle}>Direct Communication</h3>
                  <p className={styles.benefitDesc}>Speak directly with our team.</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className={styles.benefitItem}>
                <div className={clsx(styles.benefitIconBox, styles.peachIconBox)}>
                  <Target size={20} strokeWidth={2.2} />
                </div>
                <div className={styles.benefitText}>
                  <h3 className={styles.benefitTitle}>Project Consultation</h3>
                  <p className={styles.benefitDesc}>Get clarity on your ideas and next steps.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ============================================================
             RIGHT COLUMN: Premium Inquiry Form Card
             ============================================================ */}
          <motion.div
            className={styles.rightColumn}
            initial={{ opacity: 0, y: 24, scale: shouldReduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Send us a message</h2>
                <p className={styles.formSubtitle}>
                  Tell us about your project, goals or just say hello.
                </p>
              </div>

              {/* Success Alert */}
              {contactMutation.isSuccess && (
                <div className={clsx(styles.statusAlert, styles.successAlert)} role="status">
                  <CheckCircle2 size={18} className={styles.alertIcon} />
                  <div>
                    <strong>Thanks! Your inquiry has been received.</strong>
                    <div>Our team will review your project and get back to you shortly.</div>
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {contactMutation.isError && (
                <div className={clsx(styles.statusAlert, styles.errorAlert)} role="alert">
                  <AlertCircle size={18} className={styles.alertIcon} />
                  <div>
                    <strong>Submission failed</strong>
                    <div>{contactMutation.error?.message || "Please check the fields and try again."}</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot field (hidden from real users, traps bots) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  aria-hidden="true"
                />

                <div className={styles.formGrid}>
                  {/* Row 1: Full Name & Work Email */}
                  <div className={styles.formRow2}>
                    <div className={styles.formGroup}>
                      <div className={styles.floatingGroup}>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className={clsx(styles.floatingInput, errors.name && styles.inputError)}
                          disabled={contactMutation.isPending}
                        />
                        <label htmlFor="contact-name" className={styles.floatingLabel}>
                          Full Name <span className={styles.requiredStar}>*</span>
                        </label>
                        <User size={16} className={styles.fieldIcon} aria-hidden="true" />
                      </div>
                      {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <div className={styles.floatingGroup}>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={clsx(styles.floatingInput, errors.email && styles.inputError)}
                          disabled={contactMutation.isPending}
                        />
                        <label htmlFor="contact-email" className={styles.floatingLabel}>
                          Work Email <span className={styles.requiredStar}>*</span>
                        </label>
                        <Mail size={16} className={styles.fieldIcon} aria-hidden="true" />
                      </div>
                      {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>
                  </div>

                  {/* Row 2: Company Name & Phone / WhatsApp */}
                  <div className={styles.formRow2}>
                    <div className={styles.formGroup}>
                      <div className={styles.floatingGroup}>
                        <input
                          id="contact-company"
                          name="company"
                          type="text"
                          placeholder="Your company name"
                          value={formData.company}
                          onChange={handleChange}
                          className={styles.floatingInput}
                          disabled={contactMutation.isPending}
                        />
                        <label htmlFor="contact-company" className={styles.floatingLabel}>
                          Company Name (Optional)
                        </label>
                        <Building2 size={16} className={styles.fieldIcon} aria-hidden="true" />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <div className={styles.floatingGroup}>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                          className={styles.floatingInput}
                          disabled={contactMutation.isPending}
                        />
                        <label htmlFor="contact-phone" className={styles.floatingLabel}>
                          Phone / WhatsApp (Optional)
                        </label>
                        <Phone size={16} className={styles.fieldIcon} aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Service Required & Estimated Budget (Redesigned Custom Select) */}
                  <div className={styles.formRow2}>
                    <div className={styles.formGroup}>
                      <CustomSelect
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        options={SERVICE_OPTIONS}
                        label="Service Required (Optional)"
                        placeholder="Select a service"
                        icon={<Layers size={16} />}
                        disabled={contactMutation.isPending}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <CustomSelect
                        id="contact-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        options={BUDGET_OPTIONS}
                        label="Estimated Budget (Optional)"
                        placeholder="Select budget range"
                        icon={<IndianRupee size={16} />}
                        disabled={contactMutation.isPending}
                      />
                    </div>
                  </div>

                  {/* Row 4: Project Details */}
                  <div className={styles.formGroup}>
                    <div className={styles.floatingTextareaWrapper}>
                      <textarea
                        id="contact-details"
                        name="details"
                        required
                        placeholder="Tell us about your project, your goals or how we can help..."
                        value={formData.details}
                        onChange={handleChange}
                        className={clsx(styles.floatingTextarea, errors.details && styles.inputError)}
                        disabled={contactMutation.isPending}
                      />
                      <label htmlFor="contact-details" className={styles.floatingTextareaLabel}>
                        Project Details <span className={styles.requiredStar}>*</span>
                      </label>
                      <FileText size={16} className={clsx(styles.fieldIcon, styles.textareaIcon)} aria-hidden="true" />
                    </div>
                    {errors.details && <span className={styles.errorText}>{errors.details}</span>}
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className={styles.bottomRow}>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={contactMutation.isPending}
                  >
                    <span>
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </span>
                    <ArrowRight size={16} />
                  </button>

                  <div className={styles.privacyNote}>
                    <Lock size={15} className={styles.lockIcon} aria-hidden="true" />
                    <span>
                      Your information is handled responsibly and used to respond to your inquiry.
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
