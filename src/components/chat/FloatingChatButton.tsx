import React, { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { CHAT_CONFIG } from "./chat.config";
import styles from "./Chat.module.css";

interface FloatingChatButtonProps {
  onClick: () => void;
  hasUnread?: boolean;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({
  onClick,
  hasUnread = true,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after a gentle delay (1800ms) if not dismissed in session
    try {
      const dismissed = sessionStorage.getItem("pt_chat_tooltip_dismissed");
      if (!dismissed) {
        const timer = setTimeout(() => {
          setShowTooltip(true);
        }, 1800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleDismissTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
    try {
      sessionStorage.setItem("pt_chat_tooltip_dismissed", "true");
    } catch {
      // Ignore
    }
  };

  const handleButtonClick = () => {
    if (showTooltip) {
      setShowTooltip(false);
      try {
        sessionStorage.setItem("pt_chat_tooltip_dismissed", "true");
      } catch {
        // Ignore
      }
    }
    onClick();
  };

  return (
    <div className={styles.fabContainer}>
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div
          className={styles.fabTooltip}
          role="tooltip"
          onClick={handleButtonClick}
        >
          <button
            type="button"
            className={styles.tooltipCloseBtn}
            onClick={handleDismissTooltip}
            aria-label="Dismiss chat tip"
          >
            <X size={12} />
          </button>
          <div className={styles.tooltipHeading}>
            {CHAT_CONFIG.tooltipHeading}
          </div>
          <div className={styles.tooltipSubtitle}>
            {CHAT_CONFIG.tooltipSubtitle}
          </div>
          <div className={styles.tooltipArrow} aria-hidden="true" />
        </div>
      )}

      {/* Floating Orange Button */}
      <button
        type="button"
        className={styles.fabButton}
        onClick={handleButtonClick}
        aria-label="Open Parthav AI chat"
        title="Chat with Parthav AI"
      >
        <MessageSquare size={26} className={styles.fabIcon} />

        {/* Unread indicator dot */}
        {hasUnread && (
          <span
            className={styles.fabNotificationDot}
            aria-label="New message indicator"
          />
        )}
      </button>
    </div>
  );
};
