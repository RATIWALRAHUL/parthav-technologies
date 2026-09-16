export interface DetailDeliverable {
  title: string;
  description: string;
  iconName: string;
}

export interface DetailFaq {
  question: string;
  answer: string;
}

export interface DetailCta {
  eyebrow: string;
  headlineLines: { text: string; orange?: boolean }[];
  description: string;
  primaryLabel: string;
}

export interface MicroServiceDetail {
  microId: string;
  mainId: string;
  eyebrow: string;
  h1Lines: { text: string; orange?: boolean }[];
  heroDescription: string;
  overview: string;
  /** True for the ~13 genuinely not-yet-launched services — the Coming Soon modal
   *  auto-opens over this page; closing it reveals the (honest, generic) page below. */
  comingSoon?: boolean;
  /** Omitted (rather than fabricated) on pages without hand-written specifics yet. */
  deliverables?: DetailDeliverable[];
  capabilities?: string[];
  benefits?: string[];
  technologies: string[];
  useCases?: string[];
  featuredProjectIds?: string[];
  relatedMainCategoryIds: string[];
  relatedMicroIds: string[];
  faqs: DetailFaq[];
  cta: DetailCta;
  seo: { title: string; description: string };
  visualId: string;
}

export const MICRO_SERVICE_DETAILS: Record<string, MicroServiceDetail> = {
  "business-websites": {
    microId: "business-websites",
    mainId: "web-mobile",
    eyebrow: "WEB DEVELOPMENT",
    h1Lines: [
      { text: "Business Websites" },
      { text: "Built to Grow Your Business.", orange: true },
    ],
    heroDescription:
      "Create a fast, professional and conversion-focused website that represents your brand and helps your business grow online.",
    overview:
      "A business website should do more than look professional. It should communicate your value clearly, build trust and make it easy for customers to take action.",
    deliverables: [
      { title: "Strategy & Structure", description: "Sitemap and content structure built around your goals.", iconName: "Compass" },
      { title: "Responsive UI", description: "A design that works cleanly across every device.", iconName: "PenTool" },
      { title: "Development", description: "Clean, maintainable code built for real-world use.", iconName: "Code2" },
      { title: "CMS Integration", description: "Update content yourself without touching code.", iconName: "Database" },
      { title: "SEO Foundation", description: "Technical fundamentals in place from day one.", iconName: "TrendingUp" },
      { title: "Performance Optimization", description: "Fast load times across devices and connections.", iconName: "Gauge" },
    ],
    capabilities: [
      "Responsive Design",
      "CMS",
      "SEO Foundation",
      "Performance",
      "Analytics",
      "Forms",
      "API Integrations",
      "Security",
    ],
    benefits: [
      "Clearer Brand Communication",
      "Better User Experience",
      "Faster Performance",
      "Stronger Search Foundation",
    ],
    technologies: ["Next.js", "React", "TypeScript", "CMS", "Analytics"],
    useCases: ["Startups", "Local Businesses", "Professional Services", "Agencies", "Real Estate", "Healthcare"],
    featuredProjectIds: ["real-estate", "healthcare", "ecommerce"],
    relatedMainCategoryIds: ["ui-ux", "seo-growth"],
    relatedMicroIds: ["website-ui-design", "technical-seo", "website-optimization"],
    faqs: [
      { question: "How long does it take to build a business website?", answer: "Most business websites take 3 to 6 weeks depending on scope, page count and content readiness." },
      { question: "Can you redesign my existing website?", answer: "Yes. We audit your current site's UX, performance and structure, then redesign and rebuild it while preserving what already works." },
      { question: "Will the website work on mobile devices?", answer: "Yes. Every website we build is fully responsive and tested across common device sizes." },
      { question: "Can you integrate a CMS?", answer: "Yes. We integrate a content management system so you can update pages, blog posts and content without touching code." },
      { question: "Can you optimize the website for SEO?", answer: "Yes. Technical SEO fundamentals — clean markup, structured data, performance — are built in from the start." },
      { question: "Can you maintain the website after launch?", answer: "Yes. We offer ongoing website care plans covering updates, monitoring and minor enhancements." },
    ],
    cta: {
      eyebrow: "LET'S BUILD YOUR WEBSITE",
      headlineLines: [
        { text: "Ready for a Website" },
        { text: "That Works as Hard as Your Business?", orange: true },
      ],
      description:
        "Let's create a fast, professional digital presence built around your customers and business goals.",
      primaryLabel: "Start Your Website Project",
    },
    seo: {
      title: "Business Website Development | Parthav Technologies",
      description:
        "Parthav Technologies builds fast, responsive and conversion-focused business websites designed around your brand, customers and growth goals.",
    },
    visualId: "web-mobile-dev",
  },

  "nextjs-development": {
    microId: "nextjs-development",
    mainId: "web-mobile",
    eyebrow: "WEB DEVELOPMENT",
    h1Lines: [
      { text: "Next.js Development" },
      { text: "Built for Speed and Scale.", orange: true },
    ],
    heroDescription:
      "Build a modern, high-performance web application on Next.js — designed for scalability, strong SEO and a fast user experience.",
    overview:
      "Next.js gives us server rendering, fast routing and a modern React foundation in one framework — which means your application loads quickly, scales cleanly and stays maintainable as it grows.",
    deliverables: [
      { title: "App Architecture", description: "A project structure built to scale with your product.", iconName: "Layers" },
      { title: "Server Components", description: "Faster pages using React Server Components where they help.", iconName: "Code2" },
      { title: "Dynamic Routing", description: "Clean, SEO-friendly routing for every page and content type.", iconName: "Webhook" },
      { title: "API Integration", description: "Connecting your app to the services and data it needs.", iconName: "Plug" },
      { title: "Performance Optimization", description: "Image, font and bundle optimization out of the box.", iconName: "Gauge" },
      { title: "Deployment", description: "A reliable, production-ready deployment setup.", iconName: "CloudCog" },
    ],
    capabilities: [
      "Server Rendering",
      "API Routes",
      "Static & Dynamic Pages",
      "Image Optimization",
      "TypeScript",
      "Authentication",
      "Third-party Integrations",
      "Performance Tuning",
    ],
    benefits: [
      "Faster Page Loads",
      "Stronger SEO Foundation",
      "Scalable Codebase",
      "Modern Developer Experience",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js"],
    useCases: ["SaaS Products", "Marketing Websites", "Customer Portals", "Content Platforms"],
    relatedMainCategoryIds: ["ui-ux", "ai-automation"],
    relatedMicroIds: ["react-development", "custom-web-applications", "website-optimization"],
    faqs: [
      { question: "Why should I use Next.js for my project?", answer: "Next.js combines server rendering, routing and performance optimization in one framework, which typically means faster pages and a stronger SEO foundation than a client-only React app." },
      { question: "Can you migrate an existing application to Next.js?", answer: "Yes. We assess your current application and plan a migration path that minimizes disruption to your users." },
      { question: "Can you build custom APIs with Next.js?", answer: "Yes. Next.js supports building API routes directly alongside your application, which we use for custom backend logic." },
      { question: "Can you optimize Core Web Vitals?", answer: "Yes. We optimize images, fonts, scripts and rendering strategy to improve Core Web Vitals scores." },
      { question: "Can you deploy Next.js applications?", answer: "Yes. We set up a production-ready deployment pipeline suited to your hosting preferences." },
    ],
    cta: {
      eyebrow: "BUILD WITH NEXT.JS",
      headlineLines: [{ text: "Ready to Build a" }, { text: "Faster Web Experience?", orange: true }],
      description:
        "Let's create a modern Next.js application designed for performance, scalability and a great user experience.",
      primaryLabel: "Start Your Next.js Project",
    },
    seo: {
      title: "Next.js Development Services | Parthav Technologies",
      description:
        "Parthav Technologies builds fast, scalable web applications with Next.js — engineered for performance, strong SEO and long-term maintainability.",
    },
    visualId: "web-mobile-dev",
  },

  "ai-chatbots": {
    microId: "ai-chatbots",
    mainId: "ai-automation",
    eyebrow: "AI & AUTOMATION",
    h1Lines: [
      { text: "AI Chatbots" },
      { text: "That Actually Help Your Customers.", orange: true },
    ],
    heroDescription:
      "Build an AI chatbot that understands your business, answers real questions and connects to the workflows you already use.",
    overview:
      "A good AI chatbot isn't a generic script — it's trained on your business context, integrated with your knowledge base, and designed to hand off to a human when a conversation needs one.",
    deliverables: [
      { title: "Conversation Design", description: "Dialogue flows built around real customer questions.", iconName: "PenTool" },
      { title: "Knowledge Integration", description: "Connecting the chatbot to your actual business content.", iconName: "Database" },
      { title: "AI Model Integration", description: "Selecting and integrating the right AI model for your use case.", iconName: "Bot" },
      { title: "Lead Capture", description: "Capturing interested visitors as qualified leads.", iconName: "ShoppingCart" },
      { title: "Human Handoff", description: "A clean path to a human agent when needed.", iconName: "Webhook" },
      { title: "Analytics", description: "Visibility into conversations and performance.", iconName: "Gauge" },
    ],
    capabilities: [
      "Website Integration",
      "WhatsApp Integration",
      "Knowledge Base Training",
      "Lead Qualification",
      "CRM Handoff",
      "Multi-language Support",
    ],
    benefits: [
      "Faster Response Times",
      "Consistent Answers",
      "Fewer Repetitive Support Tickets",
      "More Captured Leads",
    ],
    technologies: ["AI Language Models", "Node.js", "REST APIs", "CRM Integrations"],
    useCases: ["Customer Support Teams", "Sales Teams", "SaaS Products", "Service Businesses"],
    relatedMainCategoryIds: ["crm-automation", "web-mobile"],
    relatedMicroIds: ["ai-agents", "whatsapp-automation", "ai-crm-automation"],
    faqs: [
      { question: "Can an AI chatbot answer questions about our business?", answer: "Yes. We train the chatbot on your actual business content — services, FAQs and policies — so its answers reflect your business, not generic responses." },
      { question: "Can the chatbot use our existing knowledge base?", answer: "Yes. We integrate your existing documentation, FAQs or help content as the chatbot's knowledge source." },
      { question: "Can it capture leads?", answer: "Yes. The chatbot can qualify visitors and capture contact details as structured leads." },
      { question: "Can it connect to CRM systems?", answer: "Yes. We connect the chatbot to your CRM so captured leads and conversations flow into your existing workflow." },
      { question: "Can customers be transferred to a human?", answer: "Yes. We design a clear handoff path so conversations can move to a human agent when needed." },
      { question: "Can the chatbot be integrated into our website?", answer: "Yes. We embed the chatbot directly into your website, and can extend it to channels like WhatsApp." },
    ],
    cta: {
      eyebrow: "PUT AI TO WORK",
      headlineLines: [{ text: "Ready to Build a" }, { text: "Smarter Customer Experience?", orange: true }],
      description:
        "Let's create an AI chatbot that can help your customers, capture opportunities and connect with your existing workflows.",
      primaryLabel: "Build Your AI Chatbot",
    },
    seo: {
      title: "AI Chatbot Development | Parthav Technologies",
      description:
        "Parthav Technologies builds AI chatbots trained on your business content, integrated with your knowledge base and CRM, with a clean handoff to human agents.",
    },
    visualId: "ai-automation",
  },

  "technical-seo": {
    microId: "technical-seo",
    mainId: "seo-growth",
    eyebrow: "SEO & DIGITAL GROWTH",
    h1Lines: [
      { text: "Technical SEO" },
      { text: "A Stronger Foundation for Search.", orange: true },
    ],
    heroDescription:
      "Identify and resolve the technical issues that affect how search engines crawl, index and rank your website.",
    overview:
      "Technical SEO is the foundation everything else builds on. If search engines can't crawl and understand your site efficiently, even great content and design won't rank the way they should.",
    deliverables: [
      { title: "Technical Audit", description: "A full review of crawlability, indexing and site health.", iconName: "Search" },
      { title: "Core Web Vitals", description: "Diagnosing and improving loading and interaction performance.", iconName: "Gauge" },
      { title: "Schema Markup", description: "Structured data so search engines understand your content.", iconName: "Database" },
      { title: "Site Architecture", description: "A crawlable, logically structured site.", iconName: "Layers" },
      { title: "Indexing Fixes", description: "Resolving issues preventing pages from being indexed correctly.", iconName: "CheckCircle2" },
      { title: "Reporting", description: "Clear documentation of issues found and fixed.", iconName: "BarChart3" },
    ],
    capabilities: [
      "Technical Audits",
      "Core Web Vitals",
      "Schema Markup",
      "Crawlability",
      "Site Speed",
      "Indexing",
    ],
    benefits: [
      "Better Crawlability",
      "Improved Core Web Vitals",
      "Cleaner Technical Foundation",
      "Fewer Indexing Issues",
    ],
    technologies: ["Google Search Console", "Google Analytics", "Schema.org", "Core Web Vitals Tooling"],
    useCases: ["Growing Websites", "E-commerce Sites", "Content Publishers", "Sites Migrating Platforms"],
    relatedMainCategoryIds: ["web-mobile", "ai-automation"],
    relatedMicroIds: ["core-web-vitals", "seo-audits", "website-optimization"],
    faqs: [
      { question: "What does a technical SEO audit include?", answer: "We review crawlability, indexing, site speed, Core Web Vitals, structured data and site architecture, then document what needs fixing." },
      { question: "Can you fix Core Web Vitals issues?", answer: "Yes. We diagnose the specific causes — often images, scripts or rendering — and implement fixes to improve the scores." },
      { question: "Can you improve website crawlability?", answer: "Yes. We identify and resolve issues in site structure, internal linking and crawl directives that limit how search engines access your content." },
      { question: "Do you implement schema markup?", answer: "Yes. We add structured data relevant to your content type so search engines can better understand and display it." },
      { question: "Can you work with an existing development team?", answer: "Yes. We can provide an audit and recommendations that your existing team implements, or implement the fixes ourselves." },
    ],
    cta: {
      eyebrow: "FIX YOUR TECHNICAL FOUNDATION",
      headlineLines: [{ text: "Ready to Make Your Website" }, { text: "Easier to Find?", orange: true }],
      description:
        "Let's identify and resolve technical issues that can affect search visibility, usability and performance.",
      primaryLabel: "Start Your SEO Audit",
    },
    seo: {
      title: "Technical SEO Services | Parthav Technologies",
      description:
        "Parthav Technologies identifies and resolves technical SEO issues — crawlability, Core Web Vitals, schema markup and indexing — to strengthen your site's search foundation.",
    },
    visualId: "seo-growth",
  },

  "logo-design": {
    microId: "logo-design",
    mainId: "branding",
    eyebrow: "BRANDING & DIGITAL IDENTITY",
    h1Lines: [
      { text: "Logo Design" },
      { text: "A Mark People Remember.", orange: true },
    ],
    heroDescription:
      "Create a distinctive logo that gives your brand a clear, consistent visual identity across every touchpoint.",
    overview:
      "A logo is often the first thing people associate with your brand. We design marks that are simple enough to work everywhere — from a favicon to a storefront — and distinctive enough to be remembered.",
    deliverables: [
      { title: "Discovery", description: "Understanding your business, audience and positioning.", iconName: "Compass" },
      { title: "Concept Exploration", description: "Multiple distinct creative directions to choose from.", iconName: "PenTool" },
      { title: "Refinement", description: "Refining the chosen direction into a final mark.", iconName: "Shapes" },
      { title: "Logo Variations", description: "Primary, icon-only and monochrome versions.", iconName: "Layers" },
      { title: "File Delivery", description: "Production-ready files in the formats you need.", iconName: "Database" },
      { title: "Usage Guidelines", description: "Basic guidance on how to use the logo correctly.", iconName: "CheckCircle2" },
    ],
    capabilities: [
      "Brand Discovery",
      "Concept Design",
      "Logo Variations",
      "Color System",
      "Typography Pairing",
      "File Delivery",
    ],
    benefits: [
      "A Distinctive Brand Mark",
      "Consistent Visual Identity",
      "Professional First Impression",
      "Usable Across Every Touchpoint",
    ],
    technologies: ["Vector Design Tools", "Adobe Illustrator", "Figma"],
    useCases: ["New Businesses", "Rebrands", "Startups", "Personal Brands"],
    relatedMainCategoryIds: ["ui-ux", "web-mobile"],
    relatedMicroIds: ["visual-identity", "brand-guidelines", "website-branding"],
    faqs: [
      { question: "How many logo concepts will I see?", answer: "We typically present a small set of genuinely distinct concepts rather than many minor variations, so each direction is a real choice." },
      { question: "Do I own the final logo files?", answer: "Yes. You receive full ownership of the final logo files delivered to you." },
      { question: "Can you redesign an existing logo?", answer: "Yes. We can refresh or fully redesign an existing logo while considering existing brand recognition where relevant." },
      { question: "What file formats will I receive?", answer: "We deliver production-ready vector and raster formats suitable for web, print and app use." },
      { question: "Do you also design the wider brand identity?", answer: "Yes. Logo design is part of our broader Branding & Digital Identity service, which can include color systems, typography and brand guidelines." },
    ],
    cta: {
      eyebrow: "BUILD YOUR IDENTITY",
      headlineLines: [{ text: "Ready for a Brand Mark" }, { text: "People Remember?", orange: true }],
      description:
        "Let's create a distinctive logo that gives your brand a clear and consistent visual identity.",
      primaryLabel: "Start Your Logo Project",
    },
    seo: {
      title: "Logo Design Services | Parthav Technologies",
      description:
        "Parthav Technologies designs distinctive, production-ready logos built around your brand's positioning — simple enough to work everywhere, memorable enough to stand out.",
    },
    visualId: "branding-identity",
  },

  "crm-development": {
    microId: "crm-development",
    mainId: "crm-automation",
    eyebrow: "CRM & BUSINESS AUTOMATION",
    h1Lines: [
      { text: "CRM Development" },
      { text: "Built Around How You Sell.", orange: true },
    ],
    heroDescription:
      "Design a CRM experience that brings your leads, customers and workflows together in one connected system.",
    overview:
      "Off-the-shelf CRM tools don't always match how your business actually sells and operates. We build or configure a CRM around your real pipeline, your team's workflow and the systems you already use.",
    deliverables: [
      { title: "Pipeline Setup", description: "A sales pipeline structured around your actual sales process.", iconName: "Workflow" },
      { title: "Lead Capture", description: "Connecting your lead sources into one system.", iconName: "ShoppingCart" },
      { title: "Automation Rules", description: "Automating repetitive follow-up and assignment tasks.", iconName: "CloudCog" },
      { title: "Integrations", description: "Connecting your CRM to email, WhatsApp and other tools.", iconName: "Plug" },
      { title: "Reporting", description: "Visibility into pipeline health and team activity.", iconName: "BarChart3" },
      { title: "Team Onboarding", description: "Getting your team set up and comfortable with the system.", iconName: "CheckCircle2" },
    ],
    capabilities: [
      "Lead Management",
      "Sales Pipeline",
      "WhatsApp Integration",
      "Email Automation",
      "Workflow Automation",
      "Custom Reporting",
    ],
    benefits: [
      "Less Manual Follow-up",
      "Clearer Pipeline Visibility",
      "Faster Lead Response",
      "Fewer Dropped Leads",
    ],
    technologies: ["CRM Platforms", "REST APIs", "WhatsApp Business API", "Automation Tooling"],
    useCases: ["Sales Teams", "Service Businesses", "Real Estate Teams", "Agencies"],
    relatedMainCategoryIds: ["ai-automation", "web-mobile"],
    relatedMicroIds: ["lead-management", "whatsapp-crm", "workflow-automation"],
    faqs: [
      { question: "Can you set up a CRM from scratch?", answer: "Yes. We can build a custom CRM or configure an existing platform around your specific sales process." },
      { question: "Can you migrate our existing customer data?", answer: "Yes. We plan and execute data migration from your current system with care to avoid data loss." },
      { question: "Can the CRM connect to WhatsApp and email?", answer: "Yes. We integrate WhatsApp and email so conversations and follow-ups stay connected to the right lead record." },
      { question: "Can you automate lead assignment and follow-ups?", answer: "Yes. We set up automation rules for lead assignment, follow-up reminders and status updates." },
      { question: "Do you provide training for our team?", answer: "Yes. We onboard your team on the system so they're confident using it from day one." },
    ],
    cta: {
      eyebrow: "BUILD A BETTER WORKFLOW",
      headlineLines: [{ text: "Ready to Connect" }, { text: "Your Business?", orange: true }],
      description:
        "Let's design a CRM experience that brings your leads, customers and workflows together.",
      primaryLabel: "Start Your CRM Project",
    },
    seo: {
      title: "CRM Development Services | Parthav Technologies",
      description:
        "Parthav Technologies builds and configures CRM systems around your real sales pipeline — lead capture, automation and integrations included.",
    },
    visualId: "crm-automation",
  },
};

// ============================================================
// GENERIC FALLBACK — every micro-service gets a real page, even
// without hand-written specifics. Reuses only real, already-vetted
// parent-category data (technologies, related services) — never
// invents specific claims, results or capabilities per item.
// ============================================================

import { MAIN_SERVICES, type MainService, type MicroService } from "./main-services";
import { SERVICE_PAGES } from "./service-pages";

const MAIN_TO_VISUAL_ID: Record<string, string> = {
  "ui-ux": "ui-ux",
  "web-mobile": "web-mobile-dev",
  "ai-automation": "ai-automation",
  "seo-growth": "seo-growth",
  branding: "branding-identity",
  "crm-automation": "crm-automation",
};

/**
 * Universally true of how Parthav delivers ANY project — not a claim about this
 * specific micro-service, so it's honest to show on every generic fallback page
 * without fabricating per-item specifics.
 */
const GENERIC_DELIVERABLES: DetailDeliverable[] = [
  { title: "Discovery Call", description: "We start by understanding your goals, audience and requirements in detail.", iconName: "Compass" },
  { title: "Tailored Proposal", description: "A clear scope and plan built specifically around your project.", iconName: "PenTool" },
  { title: "Dedicated Delivery", description: "A focused team building and refining your solution.", iconName: "Code2" },
  { title: "Post-Launch Support", description: "Ongoing support and improvements after launch.", iconName: "CheckCircle2" },
];

function buildGenericDetail(mainService: MainService, micro: MicroService): MicroServiceDetail {
  const parentPage = SERVICE_PAGES[mainService.categorySlug];
  const siblingIds = mainService.microServices
    .filter((m) => m.id !== micro.id)
    .slice(0, 3)
    .map((m) => m.id);

  return {
    microId: micro.id,
    mainId: mainService.id,
    eyebrow: mainService.title.toUpperCase(),
    h1Lines: [{ text: micro.title }, { text: "For Your Business.", orange: true }],
    heroDescription:
      micro.description ?? `Part of our ${mainService.title} capabilities, built around your business goals.`,
    overview: mainService.description,
    comingSoon: micro.comingSoon,
    deliverables: GENERIC_DELIVERABLES,
    benefits: parentPage?.heroBenefits.map((b) => b.label) ?? [],
    technologies: parentPage?.technologies ?? [],
    relatedMainCategoryIds: parentPage?.relatedServiceIds ?? [],
    relatedMicroIds: siblingIds,
    faqs: [
      {
        question: `What does ${micro.title} typically include?`,
        answer: `The exact scope depends on your specific needs — we'll define it together during a discovery call as part of our ${mainService.title} work.`,
      },
      {
        question: "How long does this usually take?",
        answer: "Timelines vary by scope. We'll give you a clear estimate once we understand your requirements.",
      },
      {
        question: "Can this be tailored to my business?",
        answer: `Yes. We tailor ${micro.title} around your specific goals, audience and existing systems.`,
      },
      {
        question: "How do I get started?",
        answer: "Reach out through the contact form and we'll schedule a discovery call to discuss your project.",
      },
    ],
    cta: {
      eyebrow: "LET'S TALK",
      headlineLines: [{ text: "Ready to Get Started With" }, { text: `${micro.title}?`, orange: true }],
      description: `Tell us about your project and we'll help you explore how ${micro.title} can fit your business.`,
      primaryLabel: "Start a Conversation",
    },
    seo: {
      title: `${micro.title} | Parthav Technologies`,
      description:
        micro.description ??
        `${micro.title} — part of Parthav Technologies' ${mainService.title} capabilities.`,
    },
    visualId: MAIN_TO_VISUAL_ID[mainService.id] ?? "ui-ux",
  };
}

/** Single entry point the route uses — curated content when it exists, honest generic content otherwise. */
export function getMicroServiceDetail(mainId: string, microId: string): MicroServiceDetail | null {
  const curated = MICRO_SERVICE_DETAILS[microId];
  if (curated && curated.mainId === mainId) return curated;

  const mainService = MAIN_SERVICES.find((s) => s.id === mainId);
  if (!mainService) return null;
  const micro = mainService.microServices.find((m) => m.id === microId);
  if (!micro) return null;

  return buildGenericDetail(mainService, micro);
}
