export const queryKeys = {
  services: {
    all: ["services"] as const,
    list: () => [...queryKeys.services.all, "list"] as const,
    detail: (id: string) => [...queryKeys.services.all, id] as const,
  },
  projects: {
    all: ["projects"] as const,
    list: () => [...queryKeys.projects.all, "list"] as const,
    detail: (id: string) => [...queryKeys.projects.all, id] as const,
  },
  contact: {
    all: ["contact"] as const,
    submissions: () => [...queryKeys.contact.all, "submissions"] as const,
  },
  comingSoon: {
    all: ["comingSoon"] as const,
    subscriptions: () => [...queryKeys.comingSoon.all, "subscriptions"] as const,
  },
  chat: {
    all: ["chat"] as const,
    quickReplies: (flow: string) => [...queryKeys.chat.all, "quickReplies", flow] as const,
    messages: () => [...queryKeys.chat.all, "messages"] as const,
    leads: () => [...queryKeys.chat.all, "leads"] as const,
  },
};
