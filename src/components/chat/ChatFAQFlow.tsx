import React from "react";
import { HelpCircle, ChevronRight } from "lucide-react";
import { CHAT_CONFIG } from "./chat.config";
import type { FAQItem } from "@/data/faq";
import styles from "./Chat.module.css";

interface ChatFAQFlowProps {
  onSelectQuestion: (faq: FAQItem) => void;
}

export const ChatFAQFlow: React.FC<ChatFAQFlowProps> = ({
  onSelectQuestion,
}) => {
  return (
    <div className={styles.faqFlowContainer} role="region" aria-label="Frequently Asked Questions">
      <div className={styles.faqFlowHeader}>
        <HelpCircle size={16} className={styles.faqIconAccent} />
        <span className={styles.faqFlowTitle}>Frequently Asked Questions</span>
      </div>

      <div className={styles.faqList}>
        {CHAT_CONFIG.faqs.map((item, idx) => (
          <button
            key={idx}
            type="button"
            className={styles.faqItemBtn}
            onClick={() => onSelectQuestion(item)}
          >
            <span className={styles.faqQuestionText}>{item.question}</span>
            <ChevronRight size={15} className={styles.faqChevron} />
          </button>
        ))}
      </div>
    </div>
  );
};
