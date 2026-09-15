import React from "react";
import {
  Monitor,
  FileText,
  MessageSquare,
  Lightbulb,
  BookOpen,
  HelpCircle,
  Send,
  LayoutGrid,
  Headphones,
  ChevronRight,
} from "lucide-react";
import type { ChatQuickAction } from "./chat.types";
import styles from "./Chat.module.css";

interface ChatQuickActionsProps {
  actions: ChatQuickAction[];
  isMobile?: boolean;
  onSelectAction: (action: ChatQuickAction) => void;
}

const renderIcon = (name: ChatQuickAction["iconName"], size = 18) => {
  switch (name) {
    case "Monitor":
      return <Monitor size={size} />;
    case "FileText":
      return <FileText size={size} />;
    case "MessageSquare":
      return <MessageSquare size={size} />;
    case "Lightbulb":
      return <Lightbulb size={size} />;
    case "BookOpen":
      return <BookOpen size={size} />;
    case "HelpCircle":
      return <HelpCircle size={size} />;
    case "Send":
      return <Send size={size} />;
    case "LayoutGrid":
      return <LayoutGrid size={size} />;
    case "Headphones":
      return <Headphones size={size} />;
    default:
      return <MessageSquare size={size} />;
  }
};

export const ChatQuickActions: React.FC<ChatQuickActionsProps> = ({
  actions,
  isMobile = false,
  onSelectAction,
}) => {
  return (
    <div
      className={isMobile ? styles.quickActionsMobileList : styles.quickActionsGrid}
      role="group"
      aria-label="Quick action suggestions"
    >
      {actions.map((action, index) => {
        const colorClass =
          action.color === "orange"
            ? styles.iconBgOrange
            : action.color === "navy"
            ? styles.iconBgNavy
            : styles.iconBgBlue;

        return (
          <button
            key={action.id}
            type="button"
            className={
              isMobile
                ? styles.quickActionMobileItem
                : styles.quickActionCard
            }
            onClick={() => onSelectAction(action)}
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <div className={`${styles.actionIconContainer} ${colorClass}`}>
              {renderIcon(action.iconName, isMobile ? 18 : 15)}
            </div>

            <div className={styles.actionTextCol}>
              <span className={styles.actionTitle}>{action.title}</span>
              <span className={styles.actionDescription}>
                {action.description}
              </span>
            </div>

            <ChevronRight
              size={16}
              className={styles.actionChevron}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
};
