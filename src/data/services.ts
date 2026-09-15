export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  iconName: string;
  href: string;
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
  },
  {
    id: "web-mobile-dev",
    number: "02",
    title: "Web & Mobile Development",
    description:
      "Build fast, responsive and scalable digital experiences across web and mobile.",
    capabilities: ["Web Applications", "Mobile Apps", "Custom Software"],
    iconName: "MonitorSmartphone",
    href: "/services#web-mobile-dev",
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
