"use client";

import { useEffect } from "react";
import { useComingSoon } from "./ComingSoonProvider";

/**
 * Renders nothing — just opens the Coming Soon modal once, on mount, for pages
 * whose service is genuinely not launched yet. The page content underneath is
 * still real and stays visible once the user closes the modal.
 */
export function ComingSoonAutoOpen({
  serviceName,
  category,
}: {
  serviceName: string;
  category: string;
}) {
  const { openComingSoon } = useComingSoon();

  useEffect(() => {
    openComingSoon({ serviceName, category });
    // Only ever fire once per mount — this is a one-time page-entry gate, not a
    // reactive effect tied to prop changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
