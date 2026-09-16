export interface MicroService {
  id: string;
  title: string;
  description?: string;
  group?: string;
  /**
   * True only for the genuinely not-yet-launched capabilities — the service's own detail
   * page (every micro-service has one, at /services/<categorySlug>/<id>) auto-opens the
   * Coming Soon modal on load; closing it reveals the real page underneath.
   */
  comingSoon?: boolean;
}

export interface MainService {
  id: string;
  /** Matches the top category-nav pill this service is selected from. */
  categoryId: string;
  /** URL segment used for micro-service detail pages: /services/<categorySlug>/<microId> */
  categorySlug: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
  microServices: MicroService[];
}

export const MAIN_SERVICES: MainService[] = [
  {
    id: "ui-ux",
    categoryId: "design",
    categorySlug: "ui-ux-product-design",
    number: "01",
    title: "UI/UX & Product Design",
    description:
      "We design digital experiences that are clear, intuitive and built around real user needs.",
    iconName: "PenTool",
    microServices: [
      { id: "ui-ux-design", title: "UI/UX Design", description: "User-centered interface design." },
      { id: "website-ui-design", title: "Website UI Design", description: "Modern responsive website interfaces." },
      { id: "mobile-app-ui-ux", title: "Mobile App UI/UX", description: "Mobile experiences designed around users." },
      { id: "saas-product-design", title: "SaaS Product Design", description: "Product experiences for SaaS platforms." },
      { id: "dashboard-design", title: "Dashboard Design", description: "Clear and data-focused dashboards." },
      { id: "admin-panel-design", title: "Admin Panel Design", description: "Efficient business administration interfaces." },
      { id: "ux-research", title: "UX Research" },
      { id: "user-flows", title: "User Flows" },
      { id: "wireframing", title: "Wireframing" },
      { id: "interactive-prototyping", title: "Interactive Prototyping" },
      { id: "design-systems", title: "Design Systems" },
      { id: "ux-audit", title: "UX Audit" },
      { id: "website-redesign", title: "Website Redesign" },
      { id: "landing-page-design", title: "Landing Page Design" },
      { id: "conversion-focused-ui", title: "Conversion-focused UI" },
      { id: "design-for-web-mobile", title: "Design for Web & Mobile" },
    ],
  },
  {
    id: "web-mobile",
    categoryId: "development",
    categorySlug: "web-development",
    number: "02",
    title: "Web & Mobile Development",
    description:
      "Build fast, responsive and scalable digital experiences across web and mobile.",
    iconName: "MonitorSmartphone",
    microServices: [
      { id: "business-websites", title: "Business Websites", description: "Professional websites designed to communicate your brand clearly and turn visitors into customers.", group: "Web Development" },
      { id: "corporate-websites", title: "Corporate Websites", group: "Web Development" },
      { id: "agency-websites", title: "Agency Websites", group: "Web Development" },
      { id: "landing-pages", title: "Landing Pages", group: "Web Development" },
      { id: "nextjs-development", title: "Next.js Development", description: "Build modern web experiences with a framework focused on performance and scalability.", group: "Web Development" },
      { id: "react-development", title: "React Development", group: "Web Development" },
      { id: "laravel-development", title: "Laravel Development", group: "Web Development" },
      { id: "nodejs-development", title: "Node.js Development", group: "Web Development" },
      { id: "custom-web-applications", title: "Custom Web Applications", group: "Web Development" },
      { id: "saas-platforms", title: "SaaS Platforms", group: "Web Development" },
      { id: "customer-portals", title: "Customer Portals", group: "Web Development" },
      { id: "admin-dashboards", title: "Admin Dashboards", group: "Web Development" },
      { id: "booking-platforms", title: "Booking Platforms", group: "Web Development" },
      { id: "marketplace-development", title: "Marketplace Development", group: "Web Development" },
      { id: "api-development", title: "API Development", group: "Web Development" },
      { id: "third-party-api-integration", title: "Third-party API Integration", group: "Web Development" },
      { id: "cms-development", title: "CMS Development", group: "Web Development" },
      { id: "website-migration", title: "Website Migration", group: "Web Development" },
      { id: "website-optimization", title: "Website Optimization", group: "Web Development" },
      { id: "android-app-development", title: "Android App Development", group: "Mobile App Development" },
      { id: "ios-app-development", title: "iOS App Development", group: "Mobile App Development" },
      { id: "react-native-apps", title: "React Native Apps", group: "Mobile App Development" },
      { id: "expo-apps", title: "Expo Apps", group: "Mobile App Development" },
      { id: "cross-platform-applications", title: "Cross-platform Applications", group: "Mobile App Development" },
      { id: "business-applications", title: "Business Applications", group: "Mobile App Development" },
      { id: "customer-apps", title: "Customer Apps", group: "Mobile App Development" },
      { id: "employee-apps", title: "Employee Apps", group: "Mobile App Development" },
      { id: "ecommerce-apps", title: "E-commerce Apps", group: "Mobile App Development" },
      { id: "booking-apps", title: "Booking Apps", group: "Mobile App Development" },
      { id: "chat-applications", title: "Chat Applications", group: "Mobile App Development" },
      { id: "crm-mobile-apps", title: "CRM Mobile Apps", group: "Mobile App Development" },
      { id: "delivery-applications", title: "Delivery Applications", group: "Mobile App Development" },
      { id: "real-time-applications", title: "Real-time Applications", group: "Mobile App Development" },
      { id: "push-notifications", title: "Push Notifications", group: "Mobile App Development" },
      { id: "app-api-integration", title: "App API Integration", group: "Mobile App Development" },
      { id: "app-maintenance", title: "App Maintenance", group: "Mobile App Development" },
    ],
  },
  {
    id: "ai-automation",
    categoryId: "ai",
    categorySlug: "ai-automation",
    number: "03",
    title: "AI & Automation",
    description:
      "Use practical AI and automation to simplify workflows and create smarter customer experiences.",
    iconName: "Bot",
    microServices: [
      { id: "ai-chatbots", title: "AI Chatbots", description: "Create conversational experiences that help customers find answers and take action." },
      { id: "ai-customer-support", title: "AI Customer Support" },
      { id: "ai-sales-assistants", title: "AI Sales Assistants" },
      { id: "ai-agents", title: "AI Agents" },
      { id: "ai-voice-assistants", title: "AI Voice Assistants", comingSoon: true },
      { id: "ai-powered-search", title: "AI-powered Search" },
      { id: "ai-content-systems", title: "AI Content Systems", comingSoon: true },
      { id: "document-ai", title: "Document AI", comingSoon: true },
      { id: "rag-applications", title: "RAG Applications", comingSoon: true },
      { id: "internal-ai-assistants", title: "Internal AI Assistants", comingSoon: true },
      { id: "ai-knowledge-bases", title: "AI Knowledge Bases", comingSoon: true },
      { id: "lead-qualification", title: "Lead Qualification" },
      { id: "ai-powered-recommendations", title: "AI-powered Recommendations", comingSoon: true },
      { id: "workflow-automation", title: "Workflow Automation", comingSoon: true },
      { id: "business-process-automation", title: "Business Process Automation", comingSoon: true },
      { id: "whatsapp-automation", title: "WhatsApp Automation", comingSoon: true },
      { id: "email-automation-ai", title: "Email Automation", comingSoon: true },
      { id: "ai-crm-automation", title: "AI CRM Automation", comingSoon: true },
      { id: "reporting-automation", title: "Reporting Automation", comingSoon: true },
    ],
  },
  {
    id: "seo-growth",
    categoryId: "seo",
    categorySlug: "seo-digital-growth",
    number: "04",
    title: "SEO & Digital Growth",
    description:
      "Improve visibility, performance and conversions across search and modern discovery platforms.",
    iconName: "TrendingUp",
    microServices: [
      { id: "technical-seo", title: "Technical SEO", description: "Improve the technical foundation that helps search engines crawl, understand and discover your website." },
      { id: "on-page-seo", title: "On-page SEO" },
      { id: "off-page-seo", title: "Off-page SEO" },
      { id: "local-seo", title: "Local SEO" },
      { id: "ecommerce-seo", title: "E-commerce SEO" },
      { id: "international-seo", title: "International SEO" },
      { id: "keyword-research", title: "Keyword Research" },
      { id: "content-seo", title: "Content SEO" },
      { id: "seo-audits", title: "SEO Audits" },
      { id: "technical-audits", title: "Technical Audits" },
      { id: "core-web-vitals", title: "Core Web Vitals" },
      { id: "schema-markup", title: "Schema Markup" },
      { id: "google-search-console", title: "Google Search Console" },
      { id: "google-analytics", title: "Google Analytics" },
      { id: "ai-search-optimization", title: "AI Search Optimization" },
      { id: "geo", title: "GEO" },
      { id: "aeo", title: "AEO" },
      { id: "ai-visibility", title: "AI Visibility" },
      { id: "entity-optimization", title: "Entity Optimization" },
      { id: "conversion-rate-optimization", title: "Conversion Rate Optimization" },
      { id: "seo-reporting", title: "SEO Reporting" },
      { id: "seo-strategy", title: "SEO Strategy" },
    ],
  },
  {
    id: "branding",
    categoryId: "branding",
    categorySlug: "branding-digital-identity",
    number: "05",
    title: "Branding & Digital Identity",
    description:
      "Build a distinctive digital identity that makes your business recognizable and memorable.",
    iconName: "Shapes",
    microServices: [
      { id: "brand-strategy", title: "Brand Strategy" },
      { id: "logo-design", title: "Logo Design" },
      { id: "visual-identity", title: "Visual Identity" },
      { id: "brand-guidelines", title: "Brand Guidelines" },
      { id: "color-system", title: "Color System" },
      { id: "typography-system", title: "Typography System" },
      { id: "brand-assets", title: "Brand Assets" },
      { id: "social-media-branding", title: "Social Media Branding" },
      { id: "marketing-creatives", title: "Marketing Creatives" },
      { id: "presentation-design", title: "Presentation Design" },
      { id: "business-profiles", title: "Business Profiles" },
      { id: "digital-brand-systems", title: "Digital Brand Systems" },
      { id: "website-branding", title: "Website Branding" },
      { id: "campaign-design", title: "Campaign Design" },
      { id: "creative-direction", title: "Creative Direction" },
    ],
  },
  {
    id: "crm-automation",
    categoryId: "crm",
    categorySlug: "crm-business-automation",
    number: "06",
    title: "CRM & Business Automation",
    description:
      "Connect your leads, tools and workflows to reduce manual work and improve business operations.",
    iconName: "Workflow",
    microServices: [
      { id: "crm-development", title: "CRM Development" },
      { id: "crm-setup", title: "CRM Setup" },
      { id: "lead-management", title: "Lead Management" },
      { id: "lead-capture", title: "Lead Capture" },
      { id: "sales-pipeline", title: "Sales Pipeline" },
      { id: "lead-assignment", title: "Lead Assignment" },
      { id: "customer-management", title: "Customer Management" },
      { id: "whatsapp-crm", title: "WhatsApp CRM" },
      { id: "email-automation-crm", title: "Email Automation" },
      { id: "follow-up-automation", title: "Follow-up Automation" },
      { id: "appointment-automation", title: "Appointment Automation" },
      { id: "sales-automation", title: "Sales Automation" },
      { id: "employee-workflows", title: "Employee Workflows" },
      { id: "customer-onboarding", title: "Customer Onboarding" },
      { id: "invoice-workflows", title: "Invoice Workflows" },
      { id: "notifications", title: "Notifications" },
      { id: "google-sheets-automation", title: "Google Sheets Automation" },
      { id: "api-integrations-crm", title: "API Integrations" },
      { id: "custom-business-workflows", title: "Custom Business Workflows" },
    ],
  },
];
