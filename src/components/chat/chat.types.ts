export type SenderType = "user" | "assistant" | "system";

export type MessageContentType =
  | "text"
  | "quick-actions"
  | "lead-flow"
  | "faq"
  | "human"
  | "error"
  | "success";

export interface ChatQuickAction {
  id: string;
  title: string;
  description: string;
  iconName: "Monitor" | "FileText" | "MessageSquare" | "Lightbulb" | "BookOpen" | "HelpCircle" | "Send" | "LayoutGrid" | "Headphones";
  actionType: "services" | "quote" | "human" | "inquiry" | "cases" | "faq" | "custom";
  route?: string;
  color?: "blue" | "navy" | "orange";
}

export interface ChatMessage {
  id: string;
  sender: SenderType;
  content: string;
  timestamp: string;
  type: MessageContentType;
  status?: "sending" | "sent" | "error";
  actions?: ChatQuickAction[];
  meta?: Record<string, unknown>;
}

export interface LeadFormData {
  projectType: string;
  requirements: string;
  timeline: string;
  name: string;
  email: string;
  phone?: string;
}

export type ChatWidgetState = "closed" | "open" | "minimized";

export interface ChatAssistantResponse {
  message: string;
  type?: MessageContentType;
  actions?: ChatQuickAction[];
  meta?: Record<string, unknown>;
}
