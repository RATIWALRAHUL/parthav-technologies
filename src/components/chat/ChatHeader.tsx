import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Minus, X, RotateCcw, Phone, ExternalLink } from "lucide-react";
import { ChatAvatar } from "./ChatAvatar";
import { CHAT_CONFIG } from "./chat.config";
import styles from "./Chat.module.css";

interface ChatHeaderProps {
  onClose: () => void;
  onMinimize: () => void;
  onResetChat?: () => void;
  isMobile?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onClose,
  onMinimize,
  onResetChat,
  isMobile = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className={styles.chatHeader}>
      {/* Decorative subtle header contour glow */}
      <div className={styles.headerContourGlow} aria-hidden="true" />

      {/* Left: Bot Info */}
      <div className={styles.headerIdentity}>
        <ChatAvatar size={40} isOnline={true} />
        <div className={styles.headerTextGroup}>
          <div className={styles.headerTitleRow}>
            <span className={styles.headerName}>{CHAT_CONFIG.assistantName}</span>
            <span className={styles.headerOnlineDot} aria-hidden="true" />
          </div>
          <span className={styles.headerSubtitle}>{CHAT_CONFIG.statusText}</span>
        </div>
      </div>

      {/* Right: Controls */}
      <div className={styles.headerControls}>
        {/* Three dots menu */}
        <div className={styles.headerMenuWrapper} ref={menuRef}>
          <button
            type="button"
            className={styles.headerIconBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Chat options menu"
            aria-expanded={menuOpen}
          >
            <MoreHorizontal size={18} />
          </button>

          {menuOpen && (
            <div className={styles.headerDropdownMenu} role="menu">
              {onResetChat && (
                <button
                  type="button"
                  className={styles.dropdownMenuItem}
                  onClick={() => {
                    setMenuOpen(false);
                    onResetChat();
                  }}
                  role="menuitem"
                >
                  <RotateCcw size={15} />
                  <span>Restart Conversation</span>
                </button>
              )}
              <a
                href={`tel:${CHAT_CONFIG.companyContact.phone.replace(/\s+/g, "")}`}
                className={styles.dropdownMenuItem}
                role="menuitem"
                onClick={() => setMenuOpen(false)}
              >
                <Phone size={15} />
                <span>Call Studio ({CHAT_CONFIG.companyContact.phone})</span>
              </a>
              <a
                href="/services"
                className={styles.dropdownMenuItem}
                role="menuitem"
                onClick={() => setMenuOpen(false)}
              >
                <ExternalLink size={15} />
                <span>Browse Services</span>
              </a>
            </div>
          )}
        </div>

        {/* Minimize Button (Desktop only) */}
        {!isMobile && (
          <button
            type="button"
            className={styles.headerIconBtn}
            onClick={onMinimize}
            aria-label="Minimize chat"
            title="Minimize"
          >
            <Minus size={18} />
          </button>
        )}

        {/* Close Button */}
        <button
          type="button"
          className={styles.headerIconBtn}
          onClick={onClose}
          aria-label="Close chat"
          title="Close"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
