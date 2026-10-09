import React, { useState, useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageItem } from "./ChatMessageItem";
import { ChatQuickActions } from "./ChatQuickActions";
import { ChatComposer } from "./ChatComposer";
import { ChatTypingIndicator } from "./ChatTypingIndicator";
import { ChatLeadFlow } from "./ChatLeadFlow";
import { ChatSuccess } from "./ChatSuccess";
import { ChatFAQFlow } from "./ChatFAQFlow";
import { ChatHumanSupport } from "./ChatHumanSupport";
import { ChatAvatar } from "./ChatAvatar";
import { CHAT_CONFIG } from "./chat.config";
import { useSendMessageMutation } from "@/hooks/queries/useChat";
import type { ChatMessage, ChatQuickAction } from "./chat.types";
import type { FAQItem } from "@/data/faq";
import styles from "./Chat.module.css";

interface ChatWindowProps {
  isMobile: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onNavigate?: (route: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  isMobile,
  onClose,
  onMinimize,
  onNavigate,
}) => {
  // Current active sub-flow inside chat (null, "lead", "faq", "human", "success")
  const [activeFlow, setActiveFlow] = useState<
    "none" | "lead" | "faq" | "human" | "success"
  >("none");
  const [submittedLeadId, setSubmittedLeadId] = useState<string>("");
  const sendMessageMutation = useSendMessageMutation();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initialize initial conversation if empty
  useEffect(() => {
    // Generate initial welcome message
    const initialMsg: ChatMessage = {
      id: "msg-welcome",
      sender: "assistant",
      content: isMobile
        ? `${CHAT_CONFIG.mobileWelcomeTitle}\n${CHAT_CONFIG.mobileWelcomeSubtitle}`
        : `${CHAT_CONFIG.welcomeTitle}\n${CHAT_CONFIG.welcomeSubtitle}`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "text",
    };
    setMessages([initialMsg]);
  }, [isMobile]);

  // Scroll to bottom helper
  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
      });
      setShowScrollBottomBtn(false);
    }
  };

  // Detect when user scrolls away from bottom
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 70;
    setShowScrollBottomBtn(!isAtBottom);
  };

  // Automatically scroll when messages change if user was already at bottom
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    if (isAtBottom) {
      scrollToBottom(true);
    }
  }, [messages, isTyping, activeFlow]);

  // Handler for user sending a message via composer
  const handleSendMessage = async (text: string) => {
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: text,
      timestamp: now,
      type: "text",
      status: "sent",
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await sendMessageMutation.mutateAsync(text);
      setIsTyping(false);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        content: response.message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: response.type || "text",
        meta: response.meta,
      };

      setMessages((prev) => [...prev, botMsg]);

      if (response.type === "lead-flow") {
        setActiveFlow("lead");
      } else if (response.type === "human") {
        setActiveFlow("human");
      } else if (response.type === "faq") {
        setActiveFlow("faq");
      }
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: "assistant",
          content:
            "Something went wrong while connecting. You can try again or talk directly to our team.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "error",
        },
      ]);
    }
  };

  // Handler for quick actions
  const handleSelectAction = (action: ChatQuickAction) => {
    if (action.actionType === "services" && action.route) {
      if (onNavigate) onNavigate(action.route);
      return;
    }

    if (action.actionType === "cases" && action.route) {
      if (onNavigate) onNavigate(action.route);
      return;
    }

    if (action.actionType === "quote") {
      setActiveFlow("lead");
      return;
    }

    if (action.actionType === "human") {
      setActiveFlow("human");
      return;
    }

    if (action.actionType === "faq") {
      setActiveFlow("faq");
      return;
    }

    if (action.actionType === "inquiry") {
      handleSendMessage("I'd like to ask a general inquiry about your team.");
    }
  };

  // Handler when selecting an FAQ question
  const handleSelectFAQ = (faq: FAQItem) => {
    setActiveFlow("none");
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: faq.question,
      timestamp: now,
      type: "text",
    };

    const botMsg: ChatMessage = {
      id: `bot-${Date.now() + 1}`,
      sender: "assistant",
      content: faq.answer,
      timestamp: now,
      type: "text",
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleResetChat = () => {
    setActiveFlow("none");
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "assistant",
        content: isMobile
          ? `${CHAT_CONFIG.mobileWelcomeTitle}\n${CHAT_CONFIG.mobileWelcomeSubtitle}`
          : `${CHAT_CONFIG.welcomeTitle}\n${CHAT_CONFIG.welcomeSubtitle}`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "text",
      },
    ]);
  };

  return (
    <div
      className={isMobile ? styles.chatWindowMobile : styles.chatWindowDesktop}
      role="dialog"
      aria-label="Parthav AI chat"
    >
      {/* Mobile Swipe / Drag Handle */}
      {isMobile && (
        <div
          className={styles.mobileDragHandleWrapper}
          onClick={onClose}
          aria-label="Swipe down or tap to close"
        >
          <div className={styles.mobileDragHandle} />
        </div>
      )}

      {/* Chat Header */}
      <ChatHeader
        onClose={onClose}
        onMinimize={onMinimize}
        onResetChat={handleResetChat}
        isMobile={isMobile}
      />

      {/* Messages Scroll Area */}
      <div
        className={styles.chatScrollArea}
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {/* Welcome Section on first load */}
        <div className={styles.welcomeContainer}>
          <div className={styles.welcomeBotRow}>
            <ChatAvatar size={36} />
            <div className={styles.welcomeBubble}>
              <div className={styles.welcomeHeading}>
                {isMobile
                  ? CHAT_CONFIG.mobileWelcomeTitle
                  : CHAT_CONFIG.welcomeTitle}
              </div>
              <div className={styles.welcomeSub}>
                {isMobile
                  ? CHAT_CONFIG.mobileWelcomeSubtitle
                  : CHAT_CONFIG.welcomeSubtitle}
              </div>
            </div>
          </div>
          <p className={styles.welcomeSupportingText}>
            {CHAT_CONFIG.welcomeSupporting}
          </p>
        </div>

        {/* Quick Actions (Show when conversation is fresh) */}
        {messages.length <= 1 && activeFlow === "none" && (
          <div className={styles.quickActionsSection}>
            <ChatQuickActions
              actions={
                isMobile
                  ? CHAT_CONFIG.mobileQuickActions
                  : CHAT_CONFIG.desktopQuickActions
              }
              isMobile={isMobile}
              onSelectAction={handleSelectAction}
            />
          </div>
        )}

        {/* Subsequent Chat Messages */}
        <div className={styles.messagesList}>
          {messages.slice(1).map((msg) => (
            <ChatMessageItem key={msg.id} message={msg} />
          ))}

          {/* Typing Indicator */}
          {isTyping && <ChatTypingIndicator />}

          {/* Active Flow: Lead Qualification Wizard */}
          {activeFlow === "lead" && (
            <div className={styles.flowCardWrapper}>
              <ChatLeadFlow
                onComplete={(leadId) => {
                  setSubmittedLeadId(leadId);
                  setActiveFlow("success");
                }}
                onCancel={() => setActiveFlow("none")}
              />
            </div>
          )}

          {/* Active Flow: FAQ Interactive Browser */}
          {activeFlow === "faq" && (
            <div className={styles.flowCardWrapper}>
              <ChatFAQFlow onSelectQuestion={handleSelectFAQ} />
            </div>
          )}

          {/* Active Flow: Human Support Channels */}
          {activeFlow === "human" && (
            <div className={styles.flowCardWrapper}>
              <ChatHumanSupport onBackToChat={() => setActiveFlow("none")} />
            </div>
          )}

          {/* Active Flow: Submission Success */}
          {activeFlow === "success" && (
            <div className={styles.flowCardWrapper}>
              <ChatSuccess
                leadId={submittedLeadId}
                onBackToChat={() => setActiveFlow("none")}
              />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Floating Scroll to Bottom / New Message Pill */}
      {showScrollBottomBtn && (
        <button
          type="button"
          className={styles.scrollToBottomBtn}
          onClick={() => scrollToBottom(true)}
          aria-label="Scroll to newest message"
        >
          <ArrowDown size={14} />
          <span>New message</span>
        </button>
      )}

      {/* Bottom Message Composer */}
      <ChatComposer
        onSendMessage={handleSendMessage}
        disabled={activeFlow === "lead"}
        isSending={isTyping}
      />
    </div>
  );
};
