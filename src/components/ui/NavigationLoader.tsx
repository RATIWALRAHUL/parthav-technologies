"use client";

import React from "react";
import NextTopLoader from "nextjs-toploader";

/**
 * Top-of-navbar page transition progress bar.
 * Appears when navigating between pages and shows incremental loading progress.
 */
export function NavigationLoader() {
  return (
    <NextTopLoader
      color="#FF6A00"
      initialPosition={0.18}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={250}
      shadow="0 0 14px rgba(255, 106, 0, 0.9), 0 0 6px #FF6A00"
      zIndex={99999}
      showAtBottom={false}
    />
  );
}
