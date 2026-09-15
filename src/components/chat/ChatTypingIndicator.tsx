import React from "react";
import { ChatAvatar } from "./ChatAvatar";
import styles from "./Chat.module.css";

export const ChatTypingIndicator: React.FC = () => {
  return (
    <div className={styles.typingContainer} aria-label="Parthav AI is typing">
      <ChatAvatar size={28} />
      <div className={styles.typingBubble}>
        <span className={styles.typingDot} style={{ animationDelay: "0ms" }} />
        <span className={styles.typingDot} style={{ animationDelay: "160ms" }} />
        <span className={styles.typingDot} style={{ animationDelay: "320ms" }} />
      </div>
    </div>
  );
};
