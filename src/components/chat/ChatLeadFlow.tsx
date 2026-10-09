import React, { useState } from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { CHAT_CONFIG } from "./chat.config";
import type { LeadFormData } from "./chat.types";
import { useSubmitLeadMutation } from "@/hooks/queries/useChat";
import styles from "./Chat.module.css";

interface ChatLeadFlowProps {
  onComplete: (leadId: string) => void;
  onCancel: () => void;
}

export const ChatLeadFlow: React.FC<ChatLeadFlowProps> = ({
  onComplete,
  onCancel,
}) => {
  const submitLeadMutation = useSubmitLeadMutation();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<LeadFormData>({
    projectType: "",
    requirements: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validate step before advancing
  const handleNext = () => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1 && !formData.projectType) {
      newErrors.projectType = "Please select what you're looking to build.";
    }

    if (step === 2 && !formData.requirements.trim()) {
      newErrors.requirements = "Please briefly share your project goals.";
    }

    if (step === 3 && !formData.timeline) {
      newErrors.timeline = "Please select an estimated timeline.";
    }

    if (step === 4) {
      if (!formData.name.trim()) {
        newErrors.name = "Please enter your name.";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    submitLeadMutation.mutate(formData, {
      onSuccess: (res) => {
        onComplete(res.leadId);
      },
      onError: () => {
        setErrors({ form: "Submission failed. Please try again or talk to our team." });
      },
    });
  };

  return (
    <div className={styles.leadFlowCard} role="region" aria-label="Project Inquiry">
      {/* Progress Header */}
      <div className={styles.leadFlowHeader}>
        <div className={styles.leadFlowTitleWrapper}>
          <Sparkles size={16} className={styles.leadFlowSparkle} />
          <span className={styles.leadFlowTitle}>Start a Project</span>
        </div>
        <span className={styles.leadFlowStepBadge}>Step {step} of 4</span>
      </div>

      {/* Progress Bar */}
      <div className={styles.leadProgressBar}>
        <div
          className={styles.leadProgressFill}
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {/* Step 1: Project Type */}
      {step === 1 && (
        <div className={styles.leadStepContent}>
          <p className={styles.leadStepQuestion}>
            What are you looking to build?
          </p>
          <div className={styles.leadPillsGrid}>
            {CHAT_CONFIG.leadProjectTypes.map((type) => {
              const isSelected = formData.projectType === type;
              return (
                <button
                  key={type}
                  type="button"
                  className={`${styles.leadPill} ${
                    isSelected ? styles.leadPillSelected : ""
                  }`}
                  onClick={() => {
                    setFormData({ ...formData, projectType: type });
                    setErrors({});
                  }}
                >
                  {isSelected && <Check size={14} className={styles.pillCheck} />}
                  <span>{type}</span>
                </button>
              );
            })}
          </div>
          {errors.projectType && (
            <p className={styles.leadError}>{errors.projectType}</p>
          )}
        </div>
      )}

      {/* Step 2: Requirements */}
      {step === 2 && (
        <div className={styles.leadStepContent}>
          <p className={styles.leadStepQuestion}>
            Tell us briefly about your idea or requirements:
          </p>
          <textarea
            className={styles.leadTextarea}
            placeholder="e.g. Modern SaaS platform with user authentication, dashboard analytics, and clean UI/UX..."
            rows={3}
            value={formData.requirements}
            onChange={(e) => {
              setFormData({ ...formData, requirements: e.target.value });
              if (errors.requirements) setErrors({});
            }}
          />
          {errors.requirements && (
            <p className={styles.leadError}>{errors.requirements}</p>
          )}
        </div>
      )}

      {/* Step 3: Timeline */}
      {step === 3 && (
        <div className={styles.leadStepContent}>
          <p className={styles.leadStepQuestion}>
            What is your approximate timeline?
          </p>
          <div className={styles.leadOptionsList}>
            {CHAT_CONFIG.leadTimelines.map((time) => {
              const isSelected = formData.timeline === time;
              return (
                <button
                  key={time}
                  type="button"
                  className={`${styles.leadOptionRow} ${
                    isSelected ? styles.leadOptionRowSelected : ""
                  }`}
                  onClick={() => {
                    setFormData({ ...formData, timeline: time });
                    setErrors({});
                  }}
                >
                  <span>{time}</span>
                  {isSelected && <Check size={16} className={styles.pillCheck} />}
                </button>
              );
            })}
          </div>
          {errors.timeline && (
            <p className={styles.leadError}>{errors.timeline}</p>
          )}
        </div>
      )}

      {/* Step 4: Contact Details */}
      {step === 4 && (
        <div className={styles.leadStepContent}>
          <p className={styles.leadStepQuestion}>
            How can our leadership team reach you?
          </p>
          <div className={styles.leadInputsStack}>
            <div>
              <label className={styles.leadInputLabel}>Your Name *</label>
              <input
                type="text"
                className={styles.leadInput}
                placeholder="Rahul Sharma"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && <p className={styles.leadError}>{errors.name}</p>}
            </div>

            <div>
              <label className={styles.leadInputLabel}>Work Email *</label>
              <input
                type="email"
                className={styles.leadInput}
                placeholder="rahul@company.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && <p className={styles.leadError}>{errors.email}</p>}
            </div>

            <div>
              <label className={styles.leadInputLabel}>
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                className={styles.leadInput}
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
          </div>
          {errors.form && <p className={styles.leadError}>{errors.form}</p>}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className={styles.leadFlowFooter}>
        <button
          type="button"
          className={styles.leadCancelBtn}
          onClick={onCancel}
        >
          Cancel
        </button>

        <div className={styles.leadFlowFooterRight}>
          {step > 1 && (
            <button
              type="button"
              className={styles.leadBackBtn}
              onClick={() => setStep((prev) => prev - 1)}
            >
              Back
            </button>
          )}

          <button
            type="button"
            className={styles.leadNextBtn}
            onClick={handleNext}
            disabled={submitLeadMutation.isPending}
          >
            {submitLeadMutation.isPending ? (
              <span>Submitting...</span>
            ) : (
              <>
                <span>{step === 4 ? "Send Request" : "Continue"}</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
