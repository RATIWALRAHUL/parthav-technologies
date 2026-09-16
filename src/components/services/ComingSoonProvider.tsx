"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { ComingSoonModal } from "./ComingSoonModal";

interface ComingSoonRequest {
  serviceName: string;
  category: string;
  description?: string;
}

interface ComingSoonContextValue {
  openComingSoon: (request: ComingSoonRequest) => void;
}

const ComingSoonContext = createContext<ComingSoonContextValue | null>(null);

/**
 * Mounts ONE shared Coming Soon modal for the whole app. The image/visual inside it
 * only renders once a card actually opens the modal — nothing is preloaded on page load.
 */
export function ComingSoonProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = useState<ComingSoonRequest | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openComingSoon = useCallback((next: ComingSoonRequest) => {
    setRequest(next);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ComingSoonContext.Provider value={{ openComingSoon }}>
      {children}
      {request && (
        <ComingSoonModal
          isOpen={isOpen}
          onClose={close}
          serviceName={request.serviceName}
          category={request.category}
          description={request.description}
        />
      )}
    </ComingSoonContext.Provider>
  );
}

export function useComingSoon() {
  const ctx = useContext(ComingSoonContext);
  if (!ctx) {
    throw new Error("useComingSoon must be used within a ComingSoonProvider");
  }
  return ctx;
}
