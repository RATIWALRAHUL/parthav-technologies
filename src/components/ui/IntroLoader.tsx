"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./IntroLoader.module.css";

const LOGO_SRC = "/logo/logo2.png";
const LOGO_MS = 1300; // logo animation length (see CSS delays)
const OPEN_MS = 150 + 850; // logo fade + panel travel
const MAX_MS = 5000; // hard cap so visitors can never get stuck

// Module scope survives client navigation and dev Strict Mode / remounts;
// a full browser refresh re-evaluates the module, so the intro replays then.
let introDone = false;

type Phase = "intro" | "open" | "gone";

const PARTS = ["emblem", "squares", "word", "tagline"] as const;

/**
 * Logo intro + top/bottom split reveal. SSR renders the overlay so the page
 * never flashes first; <noscript> and reduced-motion CSS hide it.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<Phase>(introDone ? "gone" : "intro");
  const openRef = useRef<() => void>(() => {});
  const endRef = useRef<() => void>(() => {});
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (introDone) return;
    const root = skipRef.current?.closest("[data-intro]");
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

    // Lock scroll without shifting layout when the scrollbar disappears.
    const html = document.documentElement;
    const prev = { overflow: html.style.overflow, gutter: html.style.scrollbarGutter };
    html.style.overflow = "hidden";
    html.style.scrollbarGutter = "stable"; // keeps the scrollbar space so layout never shifts

    // Keep keyboard focus out of the covered site.
    const inerted = Array.from(document.body.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el !== root && !el.inert,
    );
    inerted.forEach((el) => (el.inert = true));

    const restore = () => {
      timers.forEach(clearTimeout);
      html.style.overflow = prev.overflow;
      html.style.scrollbarGutter = prev.gutter;
      inerted.forEach((el) => (el.inert = false));
    };
    const end = () => {
      introDone = true;
      restore();
      setPhase("gone");
    };
    let opened = false;
    const open = () => {
      if (opened) return;
      opened = true;
      setPhase("open");
      later(end, OPEN_MS + 50);
    };
    openRef.current = open;
    endRef.current = end;

    // Effects run after hydration, so reaching here means the page is rendered.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      end();
    } else {
      skipRef.current?.focus({ preventScroll: true });
      // Time runs from navigation start, not hydration, so slow (dev) loads
      // can't stretch the intro; the reveal still always plays.
      const elapsed = performance.now();
      later(open, Math.max(0, LOGO_MS - elapsed));
      // Failsafe only: never cuts the reveal short, which needs LOGO_MS + OPEN_MS.
      later(end, Math.max(MAX_MS - elapsed, LOGO_MS + OPEN_MS + 500));
    }
    return restore;
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      data-intro
      className={`${styles.root} ${phase === "open" ? styles.open : ""}`}
      role="dialog"
      aria-label="Loading Parthav Technologies"
    >
      <div className={`${styles.panel} ${styles.top}`} />
      <div className={`${styles.panel} ${styles.bottom}`} />
      <div className={styles.logoLayer} aria-hidden="true">
        <div className={styles.logo}>
          {PARTS.map((part, i) => (
            <Image
              key={part}
              src={LOGO_SRC}
              alt=""
              width={2172}
              height={724}
              sizes="(max-width: 768px) 90vw, 640px"
              priority={i === 0}
              className={`${styles.part} ${styles[part]}`}
              onError={() => openRef.current()}
            />
          ))}
        </div>
      </div>
      <button ref={skipRef} type="button" className={styles.skip} onClick={() => endRef.current()}>
        Skip intro
      </button>
    </div>
  );
}
