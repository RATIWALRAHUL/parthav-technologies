import React from "react";
import { ChevronUp } from "lucide-react";
import { ChatAvatar } from "./ChatAvatar";
import { CHAT_CONFIG } from "./chat.config";
import styles from "./Chat.module.css";

interface ChatMinimizedBarProps {
  onExpand: () => void;
}

export const ChatMinimizedBar: React.FC<ChatMinimizedBarProps> = ({
  onExpand,
}) => {
  return (
    <div
      className={styles.minimizedBar}
      onClick={onExpand}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExpand();
        }
      }}
      aria-label="Expand Parthav AI chat"
    >
      <div className={styles.minimizedLeft}>
        <ChatAvatar size={36} isOnline={true} />
        <div className={styles.minimizedTextCol}>
          <div className={styles.minimizedTitleRow}>
            <span className={styles.minimizedTitle}>{CHAT_CONFIG.assistantName}</span>
            <span className={styles.minimizedGreenDot} aria-hidden="true" />
          </div>
          <span className={styles.minimizedSubtitle}>
            {CHAT_CONFIG.minimizedSubtitle}
          </span>
        </div>
      </div>

      <div className={styles.minimizedExpandBtn} aria-hidden="true">
        <ChevronUp size={18} />
      </div>
    </div>
  );
};
