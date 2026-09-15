import React from "react";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import styles from "./Chat.module.css";

interface ChatSuccessProps {
  leadId: string;
  onBackToChat: () => void;
}

export const ChatSuccess: React.FC<ChatSuccessProps> = ({
  leadId,
  onBackToChat,
}) => {
  return (
    <div className={styles.successCard} role="status" aria-live="polite">
      <div className={styles.successIconWrapper}>
        <CheckCircle2 size={32} className={styles.successIcon} />
      </div>
      <h4 className={styles.successTitle}>
        Thanks! Your project request is on its way.
      </h4>
      <p className={styles.successSubtitle}>
        Our leadership team in Jaipur has received your brief and will get back
        to you within 24 hours.
      </p>

      <div className={styles.successRefBadge}>
        Reference ID: <strong>{leadId}</strong>
      </div>

      <button
        type="button"
        className={styles.successBackBtn}
        onClick={onBackToChat}
      >
        <ArrowLeft size={16} />
        <span>Back to Chat</span>
      </button>
    </div>
  );
};
