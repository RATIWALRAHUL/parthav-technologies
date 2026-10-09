export interface NavChildItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChildItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "All Services Overview",
        href: "/services",
        description: "Explore our full suite of digital engineering capabilities",
      },
      {
        label: "Web Development",
        href: "/services/web-development",
        description: "Scalable web apps, modern stacks & performant platforms",
      },
      {
        label: "UI/UX & Product Design",
        href: "/services/ui-ux-product-design",
        description: "Intuitive digital interfaces, user flows & design systems",
      },
      {
        label: "SEO & Digital Growth",
        href: "/services/seo-digital-growth",
        description: "Data-driven organic search visibility & technical SEO",
      },
      {
        label: "AI & Automation",
        href: "/services/ai-automation",
        description: "Intelligent AI workflows, agents & smart business tools",
      },
      {
        label: "Branding & Digital Identity",
        href: "/services/branding-digital-identity",
        description: "Memorable brand identities, guidelines & visual design",
      },
      {
        label: "CRM & Business Automation",
        href: "/services/crm-business-automation",
        description: "Custom sales funnels, CRM integrations & pipeline workflows",
      },
    ],
  },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
];

export const NAV_CTA = {
  label: "Let's Talk",
  href: "/contact",
};

