"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingChatButton } from "./FloatingChatButton";
import { ChatWindow } from "./ChatWindow";
import { ChatMinimizedBar } from "./ChatMinimizedBar";
import type { ChatWidgetState } from "./chat.types";
import styles from "./Chat.module.css";

export const FloatingChatWidget: React.FC = () => {
  const [widgetState, setWidgetState] = useState<ChatWidgetState>("closed");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [hasUnread, setHasUnread] = useState<boolean>(true);

  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Check screen size for mobile bottom sheet experience
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Lock body scroll on mobile when sheet is open
  useEffect(() => {
    if (isMobile && widgetState === "open") {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobile, widgetState]);

  // Handle ESC key to minimize/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && widgetState === "open") {
        setWidgetState("minimized");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [widgetState]);

  // Handle outside click on desktop
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !isMobile &&
        widgetState === "open" &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setWidgetState("minimized");
      }
    };

    if (widgetState === "open" && !isMobile) {
      // Delay listener slightly to avoid catching initial button click
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 150);
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [widgetState, isMobile]);

  // Route change: minimize chatbot only when pathname actually changes
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (widgetState === "open") {
        setWidgetState("minimized");
      }
    }
  }, [pathname, widgetState]);

  const handleOpen = useCallback(() => {
    setWidgetState("open");
    setHasUnread(false);
  }, []);

  const handleClose = useCallback(() => {
    setWidgetState("closed");
  }, []);

  const handleMinimize = useCallback(() => {
    setWidgetState("minimized");
  }, []);

  const handleExpand = useCallback(() => {
    setWidgetState("open");
  }, []);

  const handleNavigate = useCallback(
    (route: string) => {
      setWidgetState("minimized");
      router.push(route);
    },
    [router]
  );

  return (
    <div ref={containerRef} className={styles.widgetContainer}>
      <AnimatePresence>
        {/* Mobile backdrop overlay */}
        {isMobile && widgetState === "open" && (
          <motion.div
            key="mobile-backdrop"
            className={styles.mobileBackdrop}
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            aria-hidden="true"
          />
        )}

        {/* Main Chat Window (Desktop window or Mobile bottom sheet) */}
        {widgetState === "open" && (
          <motion.div
            key="chat-window-wrapper"
            initial={
              isMobile
                ? { y: "100%", opacity: 1 }
                : { opacity: 0, scale: 0.95, y: 16 }
            }
            animate={
              isMobile
                ? { y: 0, opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              isMobile
                ? { y: "100%", opacity: 1 }
                : { opacity: 0, scale: 0.95, y: 16 }
            }
            transition={{
              duration: isMobile ? 0.35 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ChatWindow
              isMobile={isMobile}
              onClose={handleClose}
              onMinimize={handleMinimize}
              onNavigate={handleNavigate}
            />
          </motion.div>
        )}

        {/* Minimized Pill Bar */}
        {widgetState === "minimized" && (
          <motion.div
            key="chat-minimized-wrapper"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ChatMinimizedBar onExpand={handleExpand} />
          </motion.div>
        )}

        {/* Floating Orange FAB Button with breathing float */}
        {widgetState === "closed" && (
          <motion.div
            key="chat-fab-wrapper"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <FloatingChatButton onClick={handleOpen} hasUnread={hasUnread} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
