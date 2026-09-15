import React, { useState, useRef, useEffect } from "react";
import { Paperclip, Send } from "lucide-react";
import { CHAT_CONFIG } from "./chat.config";
import styles from "./Chat.module.css";

interface ChatComposerProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
  isSending?: boolean;
}

export const ChatComposer: React.FC<ChatComposerProps> = ({
  onSendMessage,
  disabled = false,
  isSending = false,
}) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus composer when mounted (desktop only)
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      inputRef.current?.focus();
    }
  }, []);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled || isSending) return;
    onSendMessage(trimmed);
    setText("");
    // Re-focus after sending
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.composerWrapper}>
      <div className={styles.composerInnerRow}>
        {/* Attachment button */}
        <button
          type="button"
          className={styles.composerAttachmentBtn}
          title="Add attachment"
          aria-label="Add attachment"
          onClick={() => {
            // Friendly simulated feedback
            onSendMessage("I'd like to share an attachment or project brief.");
          }}
        >
          <Paperclip size={18} />
        </button>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          className={styles.composerInput}
          placeholder={CHAT_CONFIG.composerPlaceholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isSending}
          aria-label="Type your message"
        />

        {/* Send Button */}
        <button
          type="button"
          className={`${styles.composerSendBtn} ${
            !text.trim() || disabled || isSending ? styles.composerSendBtnDisabled : ""
          }`}
          onClick={handleSend}
          disabled={!text.trim() || disabled || isSending}
          aria-label="Send message"
        >
          <Send size={16} className={styles.sendIconSvg} />
        </button>
      </div>

      {/* Powered by note */}
      <div className={styles.composerBrandingRow}>
        <span className={styles.composerBrandingBolt}>⚡</span>
        <span className={styles.composerBrandingText}>
          {CHAT_CONFIG.brandingNote}
        </span>
      </div>
    </div>
  );
};
