import { COMPANY_INFO } from "@/data/company";
import { FAQ_DATA } from "@/data/faq";
import { SERVICES_DATA } from "@/data/services";
import type { ChatQuickAction } from "./chat.types";

export const CHAT_CONFIG = {
  assistantName: "Parthav AI",
  statusText: "Online • Usually replies in minutes",
  replyBadgeText: "We usually reply in a few minutes",
  minimizedSubtitle: "Need help? We're here!",
  tooltipHeading: "Need Help?",
  tooltipSubtitle: "Chat with us!",
  welcomeTitle: "Hi! 👋 I'm Parthav AI",
  welcomeSubtitle: "How can I help you today?",
  welcomeSupporting: "Get quick answers or connect with our team.",
  mobileWelcomeTitle: "👋 Hi there!",
  mobileWelcomeSubtitle: "How can we help you today?",
  composerPlaceholder: "Type your message...",
  brandingNote: "Powered by Parthav Technologies",

  companyContact: {
    email: COMPANY_INFO.email,
    phone: COMPANY_INFO.phone,
    whatsappUrl: COMPANY_INFO.whatsappUrl,
    location: COMPANY_INFO.location,
    workingHours: COMPANY_INFO.workingHours,
  },

  desktopQuickActions: [
    {
      id: "action-services",
      title: "Our Services",
      description: "Explore what we offer",
      iconName: "Monitor",
      actionType: "services",
      color: "blue",
      route: "/services",
    },
    {
      id: "action-quote",
      title: "Get a Quote",
      description: "Start your project",
      iconName: "FileText",
      actionType: "quote",
      color: "navy",
    },
    {
      id: "action-human",
      title: "Talk to a Human",
      description: "Connect with our team",
      iconName: "MessageSquare",
      actionType: "human",
      color: "orange",
    },
    {
      id: "action-inquiry",
      title: "General Inquiry",
      description: "Ask us anything",
      iconName: "Lightbulb",
      actionType: "inquiry",
      color: "orange",
    },
    {
      id: "action-cases",
      title: "View Case Studies",
      description: "See our work",
      iconName: "BookOpen",
      actionType: "cases",
      color: "blue",
      route: "/work",
    },
    {
      id: "action-faq",
      title: "FAQs",
      description: "Find quick answers",
      iconName: "HelpCircle",
      actionType: "faq",
      color: "blue",
    },
  ] as ChatQuickAction[],

  mobileQuickActions: [
    {
      id: "m-action-quote",
      title: "I have a project in mind",
      description: "Let's discuss your idea",
      iconName: "Send",
      actionType: "quote",
      color: "orange",
    },
    {
      id: "m-action-services",
      title: "Tell me about your services",
      description: "Explore our capabilities",
      iconName: "LayoutGrid",
      actionType: "services",
      color: "blue",
      route: "/services",
    },
    {
      id: "m-action-human",
      title: "I need support",
      description: "Get help with an existing project",
      iconName: "Headphones",
      actionType: "human",
      color: "navy",
    },
    {
      id: "m-action-cases",
      title: "Just browsing",
      description: "Show me what you do",
      iconName: "BookOpen",
      actionType: "cases",
      color: "blue",
      route: "/work",
    },
  ] as ChatQuickAction[],

  leadProjectTypes: [
    "Website & Web App",
    "Mobile Application",
    "AI Solution & Automation",
    "E-commerce Platform",
    "Custom Software & SaaS",
    "SEO & Digital Growth",
    "UI/UX & Product Design",
    "Something Else",
  ],

  leadTimelines: [
    "ASAP (Urgent)",
    "1 – 3 months",
    "3 – 6 months",
    "Just exploring / Budgeting",
  ],

  faqs: FAQ_DATA,
  services: SERVICES_DATA,
};
