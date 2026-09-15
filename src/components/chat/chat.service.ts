import { CHAT_CONFIG } from "./chat.config";
import type {
  ChatAssistantResponse,
  LeadFormData,
} from "./chat.types";

export interface ChatServiceProvider {
  sendMessage(message: string): Promise<ChatAssistantResponse>;
  submitLead(
    lead: LeadFormData
  ): Promise<{ success: boolean; leadId: string; message: string }>;
}

class MockChatProvider implements ChatServiceProvider {
  async sendMessage(query: string): Promise<ChatAssistantResponse> {
    // Artificial small delay to simulate network & model response (350-600ms)
    await new Promise((res) => setTimeout(res, 450));

    const q = query.toLowerCase().trim();

    // 1. Greetings
    if (
      q === "hi" ||
      q === "hello" ||
      q === "hey" ||
      q.startsWith("hi ") ||
      q.startsWith("hello ")
    ) {
      return {
        message:
          "Hello! Great to connect with you. How can Parthav Technologies help accelerate your digital vision today? You can select a quick option or describe what you're looking to build.",
      };
    }

    // 2. Project / Quote / Pricing / Cost
    if (
      q.includes("project") ||
      q.includes("quote") ||
      q.includes("cost") ||
      q.includes("price") ||
      q.includes("pricing") ||
      q.includes("hire") ||
      q.includes("build a website") ||
      q.includes("build an app")
    ) {
      return {
        message:
          "We'd love to partner with you on your project! We offer transparent, milestone-based quotes and dedicated agile retainers. Would you like to start a quick project inquiry here in the chat?",
        type: "lead-flow",
      };
    }

    // 3. Human / Contact / Call / Email / WhatsApp
    if (
      q.includes("human") ||
      q.includes("talk to someone") ||
      q.includes("contact") ||
      q.includes("phone") ||
      q.includes("email") ||
      q.includes("call") ||
      q.includes("whatsapp") ||
      q.includes("address") ||
      q.includes("office")
    ) {
      return {
        message:
          `You can reach our leadership team directly via phone (${CHAT_CONFIG.companyContact.phone}), email (${CHAT_CONFIG.companyContact.email}), or instant WhatsApp. We're based in Jaipur and partner with clients globally.`,
        type: "human",
      };
    }

    // 4. Services
    if (
      q.includes("service") ||
      q.includes("what do you do") ||
      q.includes("capability") ||
      q.includes("capabilities") ||
      q.includes("offer")
    ) {
      return {
        message:
          "Parthav Technologies specializes in four core areas: 1) UI/UX & Product Design, 2) Custom Web & Mobile Development, 3) Technical SEO & Digital Growth, and 4) AI Solutions & Automation. Check our full services page or ask about any specific discipline.",
        meta: { route: "/services" },
      };
    }

    // 5. Tech Stack
    if (
      q.includes("stack") ||
      q.includes("tech") ||
      q.includes("react") ||
      q.includes("next.js") ||
      q.includes("nextjs") ||
      q.includes("python")
    ) {
      return {
        message:
          "Our core engineering stack includes Next.js, React, TypeScript, Node.js, Python for AI pipelines, PostgreSQL, AWS/Vercel/GCP, and modern headless CMS ecosystems. We build high-performance systems targeted at 95+ Lighthouse scores.",
      };
    }

    // 6. Case Studies / Work / Portfolio
    if (
      q.includes("work") ||
      q.includes("portfolio") ||
      q.includes("case study") ||
      q.includes("case studies") ||
      q.includes("examples")
    ) {
      return {
        message:
          "We've delivered 50+ enterprise and growth projects across FinTech, HealthTech, AI Platforms, and Luxury E-Commerce with a 4.9/5 client satisfaction rating. You can view our featured case studies on our Work page.",
        meta: { route: "/work" },
      };
    }

    // 7. Timeline / How long
    if (
      q.includes("timeline") ||
      q.includes("how long") ||
      q.includes("weeks") ||
      q.includes("months")
    ) {
      return {
        message:
          "Most web platforms and product design sprints take between 4 to 8 weeks depending on technical depth. We work in disciplined 2-week milestones with continuous deployment previews.",
      };
    }

    // 8. Location / Jaipur
    if (
      q.includes("jaipur") ||
      q.includes("india") ||
      q.includes("location") ||
      q.includes("where are you")
    ) {
      return {
        message:
          "Our engineering and design studio is headquartered in Jaipur, Rajasthan, India. We work with clients across India, North America, Europe, and the Middle East.",
      };
    }

    // 9. FAQ / Common Questions
    if (q.includes("faq") || q.includes("question") || q.includes("help")) {
      return {
        message:
          "Here are some frequently asked questions about our process, pricing, and capabilities:",
        type: "faq",
      };
    }

    // 10. Natural Intelligent Fallback
    return {
      message:
        `Great question! At Parthav Technologies, we craft digital products from ideas to measurable impact. Could you tell me a little more about your timeline or goals, or would you like to speak directly with our team?`,
    };
  }

  async submitLead(
    lead: LeadFormData
  ): Promise<{ success: boolean; leadId: string; message: string }> {
    await new Promise((res) => setTimeout(res, 600));

    // Store in localStorage for client persistence if available
    try {
      if (typeof window !== "undefined") {
        const existing = JSON.parse(
          localStorage.getItem("parthav_leads") || "[]"
        );
        const newLead = {
          ...lead,
          id: `lead-${Date.now()}`,
          submittedAt: new Date().toISOString(),
        };
        existing.push(newLead);
        localStorage.setItem("parthav_leads", JSON.stringify(existing));
      }
    } catch {
      // Ignore storage error
    }

    return {
      success: true,
      leadId: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
      message:
        "Thanks! Your project request is on its way. Someone from our team will get back to you shortly.",
    };
  }
}

// Export singleton instance
export const chatService: ChatServiceProvider = new MockChatProvider();
