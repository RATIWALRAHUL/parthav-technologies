import React from "react";
import Link from "next/link";
import { CheckCheck } from "lucide-react";
import { ChatAvatar } from "./ChatAvatar";
import type { ChatMessage } from "./chat.types";
import styles from "./Chat.module.css";

interface ChatMessageItemProps {
  message: ChatMessage;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
}) => {
  const isUser = message.sender === "user";

  const route =
    typeof message.meta?.route === "string" ? message.meta.route : undefined;

  return (
    <div
      className={`${styles.messageRow} ${
        isUser ? styles.messageRowUser : styles.messageRowAssistant
      }`}
    >
      {!isUser && (
        <div className={styles.messageAvatarCol}>
          <ChatAvatar size={32} />
        </div>
      )}

      <div className={styles.messageBubbleWrapper}>
        <div
          className={`${styles.messageBubble} ${
            isUser ? styles.messageBubbleUser : styles.messageBubbleAssistant
          }`}
        >
          <div className={styles.messageText}>{message.content}</div>

          {/* Optional inline route link button */}
          {route ? (
            <div className={styles.messageActionBtnWrapper}>
              <Link href={route} className={styles.messageLinkBtn}>
                Explore {route.replace("/", "").toUpperCase()} →
              </Link>
            </div>
          ) : null}
        </div>

        {/* Message Timestamp */}
        <div
          className={`${styles.messageMeta} ${
            isUser ? styles.messageMetaUser : styles.messageMetaAssistant
          }`}
        >
          <span>{message.timestamp}</span>
          {isUser && (
            <CheckCheck
              size={14}
              className={styles.readReceiptIcon}
              aria-label="Delivered and read"
            />
          )}
        </div>
      </div>

      {isUser && (
        <div className={styles.userAvatarIcon}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="14" cy="14" r="14" fill="#062B57" />
            <circle cx="14" cy="10" r="4.5" fill="#FFFFFF" />
            <path
              d="M6 22C6 17.5817 9.58172 14 14 14C18.4183 14 22 17.5817 22 22"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
