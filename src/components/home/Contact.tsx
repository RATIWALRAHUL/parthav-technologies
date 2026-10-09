"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, ArrowRight, MessageSquare, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY_INFO } from "@/data/company";
import styles from "./Contact.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_DETAILS_LENGTH = 20;

type FieldErrors = Partial<Record<"name" | "email" | "details" | "consent", string>>;

import { useContactMutation } from "@/hooks/queries/useContact";
import { CustomSelect } from "@/components/ui/CustomSelect";

export function Contact() {
  const contactMutation = useContactMutation();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "UI/UX & Product Design",
    budget: "$5,000 - $15,000",
    details: "",
    consent: false,
  });

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};

    if (!formData.name.trim()) {
      next.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(formData.email.trim())) {
      next.email = "Please enter a valid email address.";
    }

    if (!formData.details.trim()) {
      next.details = "Please tell us a little about your project.";
    } else if (formData.details.trim().length < MIN_DETAILS_LENGTH) {
      next.details = `Please add a few more details (at least ${MIN_DETAILS_LENGTH} characters).`;
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

    contactMutation.mutate(formData);
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
                  <p>We&apos;ll get back to you within 24 hours.</p>
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
                        budget: "$5,000 - $15,000",
                        details: "",
                        consent: false,
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
                  {contactMutation.isError && (
                    <div style={{ color: "#DC2626", backgroundColor: "#FEE2E2", padding: "10px 14px", borderRadius: "6px", fontSize: "0.875rem" }} role="alert">
                      {contactMutation.error?.message || "An error occurred while submitting. Please try again."}
                    </div>
                  )}
                  <div className={styles.twoCols}>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-name" className={styles.label}>
                        Your Name <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      {errors.name && (
                        <span id="contact-name-error" className={styles.errorText} role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="contact-email" className={styles.label}>
                        Work Email <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                        placeholder="rahul@company.com"
                        value={formData.email}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {errors.email && (
                        <span id="contact-email-error" className={styles.errorText} role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.twoCols}>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-company" className={styles.label}>
                        Company / Website
                      </label>
                      <input
                        type="text"
                        id="contact-company"
                        className={styles.input}
                        placeholder="e.g. Acme Health Corp"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="contact-phone" className={styles.label}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        className={styles.input}
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className={styles.twoCols}>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-projectType" className={styles.label}>
                        Project Type
                      </label>
                      <CustomSelect
                        id="contact-projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        options={[
                          "UI/UX & Product Design",
                          "Web Development",
                          "SEO & Digital Growth",
                          "AI & Automation",
                          "Full Enterprise Suite",
                        ]}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="contact-budget" className={styles.label}>
                        Budget Range
                      </label>
                      <CustomSelect
                        id="contact-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        options={[
                          "Under $5,000",
                          "$5,000 - $15,000",
                          "$15,000 - $30,000",
                          "$30,000+",
                        ]}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-details" className={styles.label}>
                      Project Details <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="contact-details"
                      required
                      className={`${styles.textarea} ${errors.details ? styles.inputError : ""}`}
                      placeholder="Tell us about what you want to build, current challenges, and target milestones..."
                      value={formData.details}
                      aria-invalid={!!errors.details}
                      aria-describedby={errors.details ? "contact-details-error" : undefined}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    />
                    {errors.details && (
                      <span id="contact-details-error" className={styles.errorText} role="alert">
                        {errors.details}
                      </span>
                    )}
                  </div>

                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="contact-consent"
                      required
                      className={styles.checkbox}
                      checked={formData.consent}
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? "contact-consent-error" : undefined}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
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
