export type ServiceCategoryId =
  | "design"
  | "development"
  | "ai"
  | "seo"
  | "branding"
  | "crm";

export interface ServiceDetail {
  subtitle: string;
  capabilities: string[];
  ctaLabel: string;
  ctaHref: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  iconName: string;
  href: string;
  category: ServiceCategoryId;
  detailed: ServiceDetail;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "ui-ux",
    number: "01",
    title: "UI/UX & Product Design",
    description:
      "Design digital products that are clear, intuitive and built around real user needs.",
    capabilities: ["UI/UX Design", "Product Design", "Design Systems"],
    iconName: "PenTool",
    href: "/services#ui-ux",
    category: "design",
    detailed: {
      subtitle: "User-centered design for real business impact.",
      capabilities: [
        "UX Research & Strategy",
        "Wireframes & Prototypes",
        "UI Design & Visual Systems",
        "Design for Web & Mobile",
        "UX Audits & Redesigns",
      ],
      ctaLabel: "Start Your Design Project",
      ctaHref: "/#contact",
    },
  },
  {
    id: "web-mobile-dev",
    number: "02",
    title: "Web & Mobile Development",
    description:
      "Build fast, responsive and scalable digital experiences across web and mobile.",
    capabilities: ["Web Applications", "Mobile Apps", "Custom Software"],
    iconName: "MonitorSmartphone",
    href: "/services/web-development",
    category: "development",
    detailed: {
      subtitle: "Fast, scalable digital products built for real users.",
      capabilities: [
        "Web Applications",
        "Responsive Websites",
        "Mobile Applications",
        "Custom Software",
        "API Integrations",
      ],
      ctaLabel: "Start Your Development Project",
      ctaHref: "/#contact",
    },
  },
  {
    id: "ai-automation",
    number: "03",
    title: "AI & Automation",
    description:
      "Use practical AI and automation to simplify workflows and create smarter customer experiences.",
    capabilities: ["AI Solutions", "Workflow Automation", "AI Agents"],
    iconName: "Bot",
    href: "/services#ai-automation",
    category: "ai",
    detailed: {
      subtitle: "Practical AI systems designed around real business workflows.",
      capabilities: [
        "AI Assistants",
        "AI Agents",
        "Workflow Automation",
        "Customer Support Automation",
        "AI-powered Search",
      ],
      ctaLabel: "Start Your AI Project",
      ctaHref: "/#contact",
    },
  },
  {
    id: "seo-growth",
    number: "04",
    title: "SEO & Digital Growth",
    description:
      "Improve visibility, performance and conversions across search and modern discovery platforms.",
    capabilities: ["Technical SEO", "AI Search / GEO", "Conversion Optimization"],
    iconName: "TrendingUp",
    href: "/services#seo-growth",
    category: "seo",
    detailed: {
      subtitle: "Build visibility across search and modern discovery platforms.",
      capabilities: [
        "Technical SEO",
        "On-page SEO",
        "AI Search / GEO",
        "Analytics",
        "Conversion Optimization",
      ],
      ctaLabel: "Start Your Growth Project",
      ctaHref: "/#contact",
    },
  },
  {
    id: "branding-identity",
    number: "05",
    title: "Branding & Digital Identity",
    description:
      "Build a distinctive digital identity that makes your business recognizable and memorable.",
    capabilities: ["Brand Identity", "Visual Systems", "Digital Brand Strategy"],
    iconName: "Shapes",
    href: "/services#branding-identity",
    category: "branding",
    detailed: {
      subtitle: "Create a recognizable identity across every digital touchpoint.",
      capabilities: [
        "Brand Strategy",
        "Logo & Identity",
        "Visual Systems",
        "Digital Guidelines",
        "Marketing Creatives",
      ],
      ctaLabel: "Start Your Branding Project",
      ctaHref: "/#contact",
    },
  },
  {
    id: "crm-automation",
    number: "06",
    title: "CRM & Business Automation",
    description:
      "Connect your leads, tools and workflows to reduce manual work and improve business operations.",
    capabilities: ["CRM", "Lead Automation", "Workflow Integrations"],
    iconName: "Workflow",
    href: "/services#crm-automation",
    category: "crm",
    detailed: {
      subtitle: "Connect your business tools and automate repetitive workflows.",
      capabilities: [
        "CRM Setup",
        "Lead Management",
        "Workflow Automation",
        "WhatsApp / Email Automation",
        "API Integrations",
      ],
      ctaLabel: "Start Your Automation Project",
      ctaHref: "/#contact",
    },
  },
];

export interface CapabilityChip {
  label: string;
  iconName: string;
}

export const CAPABILITY_CHIPS: CapabilityChip[] = [
  { label: "E-commerce", iconName: "ShoppingCart" },
  { label: "SaaS", iconName: "Cloud" },
  { label: "Custom Software", iconName: "Code2" },
  { label: "Dashboards", iconName: "LayoutDashboard" },
  { label: "API Integrations", iconName: "Plug" },
  { label: "Cloud & DevOps", iconName: "Server" },
  { label: "Analytics", iconName: "BarChart3" },
  { label: "CRO", iconName: "TrendingUp" },
  { label: "Website Care", iconName: "ShieldCheck" },
];
