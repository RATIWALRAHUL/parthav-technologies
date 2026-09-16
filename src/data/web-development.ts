import type { ProcessStep } from "./process";
import type { FAQItem } from "./faq";

export interface WebDevServiceCard {
  id: string;
  iconName: string;
  title: string;
  description: string;
  href: string;
}

export const WEB_DEV_SERVICE_CARDS: WebDevServiceCard[] = [
  {
    id: "business-websites",
    iconName: "Globe2",
    title: "Business Websites",
    description:
      "Professional, modern websites that represent your brand and convert visitors into customers.",
    href: "/#contact",
  },
  {
    id: "ecommerce-development",
    iconName: "ShoppingCart",
    title: "E-commerce Development",
    description:
      "Feature-rich online stores with seamless shopping experiences and powerful integrations.",
    href: "/#contact",
  },
  {
    id: "custom-web-applications",
    iconName: "Code2",
    title: "Custom Web Applications",
    description:
      "Tailored web applications built around your unique business processes and workflows.",
    href: "/#contact",
  },
  {
    id: "landing-pages",
    iconName: "PanelsTopLeft",
    title: "Landing Pages",
    description:
      "High-converting landing pages for products, campaigns and business growth.",
    href: "/#contact",
  },
  {
    id: "saas-platforms",
    iconName: "CloudCog",
    title: "SaaS Platforms",
    description:
      "Scalable SaaS solutions with multi-tenant architecture and modern technology.",
    href: "/#contact",
  },
  {
    id: "cms-development",
    iconName: "Database",
    title: "CMS Development",
    description:
      "Custom CMS solutions for easy content management and complete control.",
    href: "/#contact",
  },
  {
    id: "api-development",
    iconName: "Webhook",
    title: "API Development",
    description:
      "Robust APIs and third-party integrations to connect your digital ecosystem.",
    href: "/#contact",
  },
  {
    id: "website-optimization",
    iconName: "Gauge",
    title: "Website Optimization",
    description:
      "Improve speed, performance and Core Web Vitals for better user experience and SEO.",
    href: "/#contact",
  },
];

export interface TechStackItem {
  name: string;
  iconName: string;
}

export const TECH_STACK: TechStackItem[] = [
  { name: "Next.js", iconName: "Hexagon" },
  { name: "React", iconName: "Atom" },
  { name: "Laravel", iconName: "Flame" },
  { name: "Node.js", iconName: "Hexagon" },
  { name: "TypeScript", iconName: "FileCode" },
  { name: "PHP", iconName: "FileCode2" },
  { name: "WordPress", iconName: "Feather" },
  { name: "Shopify", iconName: "ShoppingBag" },
  { name: "MySQL", iconName: "Database" },
  { name: "MongoDB", iconName: "Leaf" },
];

export const WEB_DEV_PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description: "Understand your goals and requirements.",
    iconName: "Search",
  },
  {
    step: "02",
    title: "Plan",
    description: "Create a strategy and technical roadmap.",
    iconName: "Compass",
  },
  {
    step: "03",
    title: "Design",
    description: "Design intuitive and engaging experiences.",
    iconName: "PenTool",
  },
  {
    step: "04",
    title: "Develop",
    description: "Build, test and refine with precision.",
    iconName: "Code2",
  },
  {
    step: "05",
    title: "Launch & Grow",
    description: "Deploy and support your ongoing growth.",
    iconName: "Rocket",
  },
];

export const WEB_DEV_CTA = {
  eyebrow: "LET'S BUILD TOGETHER",
  headlineLines: [
    { text: "Ready to Build a Better" },
    { text: "Website?", orange: true },
  ],
  description:
    "Tell us what you're building, and we'll help you turn it into a fast, scalable digital experience built for your business.",
  primaryCta: { label: "Start Your Web Project", href: "/#contact" },
  visualPoints: ["Better Websites", "Happier Users", "Bigger Opportunities"],
  scriptText: "Ideas to Impact.",
};

export const WEB_DEV_FAQ: FAQItem[] = [
  {
    question: "How long does it take to build a website?",
    answer:
      "Most business websites take 3 to 6 weeks depending on scope. Complex web applications and SaaS platforms typically run 8 to 14 weeks, delivered in sprint-based milestones with regular check-ins.",
  },
  {
    question: "Which technology should I use for my website?",
    answer:
      "It depends on your goals. We typically recommend Next.js/React for performance-critical sites and web apps, WordPress or Shopify for content- and commerce-led sites, and Laravel or Node.js for custom backend systems. We'll help you choose during discovery.",
  },
  {
    question: "Can you build custom web applications?",
    answer:
      "Yes. We design and build custom web applications tailored to your specific business processes — from internal tools and dashboards to customer-facing platforms.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes. We audit your current site's UX, performance and technical structure, then redesign and rebuild it while preserving what already works, including SEO equity.",
  },
  {
    question: "Do you provide e-commerce development?",
    answer:
      "Yes. We build e-commerce stores on Shopify and custom stacks, including product catalogs, checkout flows, and payment and inventory integrations.",
  },
  {
    question: "Can you integrate APIs and third-party services?",
    answer:
      "Yes. We regularly integrate payment gateways, CRMs, marketing tools, and other third-party APIs, and build custom APIs to connect your own systems.",
  },
  {
    question: "Do you optimize websites for performance and SEO?",
    answer:
      "Yes. Every build includes Core Web Vitals optimization, technical SEO fundamentals, and structured data — performance and SEO aren't an afterthought.",
  },
  {
    question: "Do you provide ongoing maintenance?",
    answer:
      "Yes. We offer ongoing website care plans covering updates, monitoring, backups and minor enhancements after launch.",
  },
];
