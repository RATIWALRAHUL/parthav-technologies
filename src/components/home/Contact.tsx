"use client";

import { useState } from "react";
import {
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  User,
  Building2,
  Phone,
  Layers,
  IndianRupee,
  FileText,
} from "lucide-react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY_INFO } from "@/data/company";
import { useContactMutation } from "@/hooks/queries/useContact";
import { CustomSelect } from "@/components/ui/CustomSelect";
import styles from "./Contact.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_DETAILS_LENGTH = 10;

type FieldErrors = Partial<Record<"name" | "email" | "details" | "consent", string>>;

export function Contact() {
  const contactMutation = useContactMutation();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "UI/UX & Product Design",
    budget: "₹50,000–₹1,00,000",
    details: "",
    consent: false,
    honeypot: "",
  });

  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      next.name = "Please enter your full name.";
    }

    if (!formData.email.trim() || !EMAIL_PATTERN.test(formData.email.trim())) {
      next.email = "Please enter a valid work email address.";
    }

    if (!formData.details.trim() || formData.details.trim().length < MIN_DETAILS_LENGTH) {
      next.details = `Please describe your project (at least ${MIN_DETAILS_LENGTH} characters).`;
    }

    if (!formData.consent) {
      next.consent = "Please accept the consent agreement to continue.";
    }

    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactMutation.isPending) return;

    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    contactMutation.mutate(
      {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        phone: formData.phone.trim(),
        service: formData.projectType,
        budget: formData.budget,
        details: formData.details.trim(),
        source: "Homepage Contact Form",
        honeypot: formData.honeypot,
      },
      {
        onSuccess: () => {
          setFormData({
            name: "",
            email: "",
            company: "",
            phone: "",
            projectType: "UI/UX & Product Design",
            budget: "₹50,000–₹1,00,000",
            details: "",
            consent: false,
            honeypot: "",
          });
          setErrors({});
        },
      }
    );
  };

  return (
    <section className={styles.contactSection} id="contact">
      <Container>
        <div className={styles.innerGrid}>
          {/* Left Information Column */}
          <div className={styles.leftCol}>
            <Reveal direction="up" delay={0.1}>
              <span className={styles.eyebrow}>START A CONVERSATION</span>
              <h2 className={styles.headline}>
                Let&apos;s build something <br />
                <span className={styles.orangeText}>that matters.</span>
              </h2>
              <p className={styles.description}>
                Have a project in mind? We&apos;d love to hear about it. Tell us about your vision, timeline, and goals — our senior technical team will respond within 24 hours.
              </p>

              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIconWrapper}>
                    <Mail size={20} strokeWidth={2} />
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>Email Us Directly</span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className={`${styles.infoValue} ${styles.infoValueLink}`}
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIconWrapper}>
                    <MapPin size={20} strokeWidth={2} />
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>Studio Location</span>
                    <span className={styles.infoValue}>Jaipur, Rajasthan, India</span>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIconWrapper}>
                    <Clock size={20} strokeWidth={2} />
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>Working Hours</span>
                    <span className={styles.infoValue}>Mon – Sat, 9:00 AM – 6:00 PM IST</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Chat */}
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBanner}
              >
                <div className={styles.whatsappIcon}>
                  <MessageSquare size={24} />
                </div>
                <div className={styles.whatsappText}>
                  <span className={styles.whatsappTitle}>Prefer WhatsApp?</span>
                  <span className={styles.whatsappSub}>Chat with our technical founders directly</span>
                </div>
              </a>
            </Reveal>
          </div>

          {/* Right Form Card */}
          <Reveal direction="up" delay={0.25}>
            <div className={styles.formCard}>
              {contactMutation.isSuccess ? (
                <div className={styles.successMsg} role="status">
                  <CheckCircle2 size={36} color="#0D7A53" style={{ marginBottom: "12px", display: "inline-block" }} />
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", color: "#0D7A53", marginBottom: "8px" }}>
                    Thanks — your message has been received.
                  </h3>
                  <p>We&apos;ll review your requirements and get back to you within 24 hours.</p>
                  <button
                    type="button"
                    onClick={() => {
                      contactMutation.reset();
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        phone: "",
                        projectType: "UI/UX & Product Design",
                        budget: "₹50,000–₹1,00,000",
                        details: "",
                        consent: false,
                        honeypot: "",
                      });
                    }}
                    style={{
                      marginTop: "16px",
                      padding: "8px 16px",
                      backgroundColor: "transparent",
                      border: "1px solid #0D7A53",
                      borderRadius: "6px",
                      color: "#0D7A53",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Send Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.formGrid} noValidate>
                  {/* Honeypot field for bot protection */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={(e) => handleChange("honeypot", e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: "none" }}
                    aria-hidden="true"
                  />

                  {contactMutation.isError && (
                    <div className={clsx(styles.statusAlert, styles.errorAlert)} role="alert">
                      <AlertCircle size={18} className={styles.alertIcon} />
                      <div>
                        <strong>Submission failed</strong>
                        <div>{contactMutation.error?.message || "Please check the fields and try again."}</div>
                      </div>
                    </div>
                  )}

                  {/* Row 1: Name & Work Email with Floating Labels */}
                  <div className={styles.twoCols}>
                    <div className={styles.formGroup}>
                      <div className={styles.floatingGroup}>
                        <input
                          type="text"
                          id="contact-name"
                          required
                          disabled={contactMutation.isPending}
                          className={clsx(styles.floatingInput, errors.name && styles.inputError)}
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "contact-name-error" : undefined}
                          onChange={(e) => handleChange("name", e.target.value)}
                        />
                        <label htmlFor="contact-name" className={styles.floatingLabel}>
                          Your Name <span className={styles.requiredStar}>*</span>
                        </label>
                        <User size={16} className={styles.fieldIcon} aria-hidden="true" />
                      </div>
                      {errors.name && (
                        <span id="contact-name-error" className={styles.errorText} role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <div className={styles.floatingGroup}>
                        <input
                          type="email"
                          id="contact-email"
                          required
                          disabled={contactMutation.isPending}
                          className={clsx(styles.floatingInput, errors.email && styles.inputError)}
                          placeholder="rahul@company.com"
                          value={formData.email}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "contact-email-error" : undefined}
                          onChange={(e) => handleChange("email", e.target.value)}
                        />
                        <label htmlFor="contact-email" className={styles.floatingLabel}>
                          Work Email <span className={styles.requiredStar}>*</span>
                        </label>
                        <Mail size={16} className={styles.fieldIcon} aria-hidden="true" />
                      </div>
                      {errors.email && (
                        <span id="contact-email-error" className={styles.errorText} role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Company / Website & Phone with Floating Labels */}
                  <div className={styles.twoCols}>
                    <div className={styles.formGroup}>
                      <div className={styles.floatingGroup}>
                        <input
                          type="text"
                          id="contact-company"
                          disabled={contactMutation.isPending}
                          className={styles.floatingInput}
                          placeholder="e.g. Acme Health Corp"
                          value={formData.company}
                          onChange={(e) => handleChange("company", e.target.value)}
                        />
                        <label htmlFor="contact-company" className={styles.floatingLabel}>
                          Company / Website
                        </label>
                        <Building2 size={16} className={styles.fieldIcon} aria-hidden="true" />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <div className={styles.floatingGroup}>
                        <input
                          type="tel"
                          id="contact-phone"
                          disabled={contactMutation.isPending}
                          className={styles.floatingInput}
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                        />
                        <label htmlFor="contact-phone" className={styles.floatingLabel}>
                          Phone Number
                        </label>
                        <Phone size={16} className={styles.fieldIcon} aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Project Type & Budget Range with Custom Selects */}
                  <div className={styles.twoCols}>
                    <div className={styles.formGroup}>
                      <CustomSelect
                        id="contact-projectType"
                        name="projectType"
                        disabled={contactMutation.isPending}
                        value={formData.projectType}
                        onChange={(e) => handleChange("projectType", e.target.value)}
                        options={[
                          "UI/UX & Product Design",
                          "Web & Mobile Development",
                          "AI Solutions & Automation",
                          "SEO & Digital Growth",
                          "Branding & Digital Identity",
                          "CRM & Business Automation",
                          "Other / Not Sure Yet",
                        ]}
                        label="Project Type"
                        placeholder="Select project type"
                        icon={<Layers size={16} />}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <CustomSelect
                        id="contact-budget"
                        name="budget"
                        disabled={contactMutation.isPending}
                        value={formData.budget}
                        onChange={(e) => handleChange("budget", e.target.value)}
                        options={[
                          "Not decided yet",
                          "Under ₹25,000",
                          "₹25,000–₹50,000",
                          "₹50,000–₹1,00,000",
                          "₹1,00,000–₹3,00,000",
                          "₹3,00,000+",
                          "Prefer to discuss",
                        ]}
                        label="Budget Range"
                        placeholder="Select budget range"
                        icon={<IndianRupee size={16} />}
                      />
                    </div>
                  </div>

                  {/* Row 4: Project Details with Floating Textarea */}
                  <div className={styles.formGroup}>
                    <div className={styles.floatingTextareaWrapper}>
                      <textarea
                        id="contact-details"
                        required
                        disabled={contactMutation.isPending}
                        className={clsx(styles.floatingTextarea, errors.details && styles.inputError)}
                        placeholder="Tell us about what you want to build, current challenges, and target milestones..."
                        value={formData.details}
                        aria-invalid={!!errors.details}
                        aria-describedby={errors.details ? "contact-details-error" : undefined}
                        onChange={(e) => handleChange("details", e.target.value)}
                      />
                      <label htmlFor="contact-details" className={styles.floatingTextareaLabel}>
                        Project Details <span className={styles.requiredStar}>*</span>
                      </label>
                      <FileText size={16} className={clsx(styles.fieldIcon, styles.textareaIcon)} aria-hidden="true" />
                    </div>
                    {errors.details && (
                      <span id="contact-details-error" className={styles.errorText} role="alert">
                        {errors.details}
                      </span>
                    )}
                  </div>

                  {/* Consent checkbox */}
                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="contact-consent"
                      required
                      disabled={contactMutation.isPending}
                      className={styles.checkbox}
                      checked={formData.consent}
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? "contact-consent-error" : undefined}
                      onChange={(e) => handleChange("consent", e.target.checked)}
                    />
                    <label htmlFor="contact-consent" className={styles.checkboxLabel}>
                      I agree to be contacted by Parthav Technologies regarding this project enquiry.
                    </label>
                  </div>
                  {errors.consent && (
                    <span id="contact-consent-error" className={styles.errorText} role="alert">
                      {errors.consent}
                    </span>
                  )}

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={contactMutation.isPending}
                  >
                    <span>{contactMutation.isPending ? "Sending Brief..." : "Send Project Brief"}</span>
                    <ArrowRight size={18} strokeWidth={2.2} />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
