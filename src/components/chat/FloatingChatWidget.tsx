"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
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
      }, 100);
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
      {/* Mobile backdrop overlay */}
      {isMobile && widgetState === "open" && (
        <div
          className={styles.mobileBackdrop}
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Main Chat Window (Desktop window or Mobile bottom sheet) */}
      {widgetState === "open" && (
        <ChatWindow
          isMobile={isMobile}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onNavigate={handleNavigate}
        />
      )}

      {/* Minimized Pill Bar */}
      {widgetState === "minimized" && (
        <ChatMinimizedBar onExpand={handleExpand} />
      )}

      {/* Floating Orange FAB Button */}
      {widgetState === "closed" && (
        <FloatingChatButton onClick={handleOpen} hasUnread={hasUnread} />
      )}
    </div>
  );
};
