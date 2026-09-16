import type { ProcessStep } from "./process";
import type { FAQItem } from "./faq";
import { WEB_DEV_PROCESS_STEPS, WEB_DEV_CTA } from "./web-development";

export interface ServicePageCta {
  eyebrow: string;
  headlineLines: { text: string; orange?: boolean }[];
  description: string;
  primaryLabel: string;
}

export interface ServicePageData {
  mainId: string;
  slug: string;
  number: string;
  eyebrow: string;
  headlineLines: { text: string; orange?: boolean }[];
  heroDescription: string;
  heroBenefits: { label: string; iconName: string }[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  microEyebrow: string;
  microHeadlineLines: { text: string; orange?: boolean }[];
  microDescription: string;
  technologies: string[];
  processHeadlineLines: { text: string; orange?: boolean }[];
  processSubtitle: string;
  processSteps: ProcessStep[];
  featuredProjectIds: string[];
  relatedServiceIds: string[];
  faq: FAQItem[];
  cta: ServicePageCta;
  seo: { title: string; description: string };
}

const STANDARD_PROCESS_STEPS = (descriptions: [string, string, string, string, string]): ProcessStep[] => [
  { step: "01", title: "Discover", description: descriptions[0], iconName: "Search" },
  { step: "02", title: "Plan", description: descriptions[1], iconName: "Compass" },
  { step: "03", title: "Design", description: descriptions[2], iconName: "PenTool" },
  { step: "04", title: "Build", description: descriptions[3], iconName: "Code2" },
  { step: "05", title: "Launch & Grow", description: descriptions[4], iconName: "Rocket" },
];

export const SERVICE_PAGES: Record<string, ServicePageData> = {
  "ui-ux-product-design": {
    mainId: "ui-ux",
    slug: "ui-ux-product-design",
    number: "01",
    eyebrow: "UI/UX & PRODUCT DESIGN",
    headlineLines: [
      { text: "Design Digital Experiences" },
      { text: "That Feel Right.", orange: true },
    ],
    heroDescription:
      "We design clear, intuitive and engaging digital experiences around real users, business goals and meaningful outcomes.",
    heroBenefits: [
      { label: "Research Driven", iconName: "Compass" },
      { label: "User-Centered", iconName: "Users" },
      { label: "Design Systems", iconName: "Layers" },
    ],
    primaryCta: { label: "Start Your Design Project", href: "/#contact" },
    secondaryCta: { label: "See Our Work", href: "/#work" },
    microEyebrow: "OUR UI/UX SERVICES",
    microHeadlineLines: [
      { text: "Everything You Need to" },
      { text: "Design Better Experiences.", orange: true },
    ],
    microDescription:
      "From research and wireframes to interfaces, prototypes and design systems, we bring together the capabilities needed to create meaningful digital products.",
    technologies: ["Figma", "FigJam", "Design Systems", "Prototyping"],
    processHeadlineLines: [{ text: "A Clear Process." }, { text: "Designed for Better Results.", orange: true }],
    processSubtitle: "A simple, transparent process that keeps you involved at every step.",
    processSteps: STANDARD_PROCESS_STEPS([
      "Understand your users and business goals.",
      "Define structure, flows and requirements.",
      "Create clear, intuitive interfaces.",
      "Build interactive prototypes and systems.",
      "Refine and hand off for development.",
    ]),
    featuredProjectIds: ["real-estate", "healthcare", "ecommerce"],
    relatedServiceIds: ["web-mobile", "branding", "seo-growth"],
    faq: [
      { question: "Do you conduct UX research?", answer: "Yes. We research your users and business context before designing, so decisions are based on real needs, not assumptions." },
      { question: "Can you redesign an existing website or product?", answer: "Yes. We audit what exists, identify what's not working, and redesign around clearer goals and better usability." },
      { question: "Do you design mobile applications?", answer: "Yes. We design interfaces for both web and native mobile applications." },
      { question: "Can you create a design system?", answer: "Yes. We build reusable design systems so your product stays visually consistent as it grows." },
      { question: "Do you provide interactive prototypes?", answer: "Yes. We build clickable prototypes so you can experience the product before development begins." },
      { question: "Can you design for conversion?", answer: "Yes. We design interfaces with clear calls to action and user flows built around conversion." },
    ],
    cta: {
      eyebrow: "LET'S DESIGN TOGETHER",
      headlineLines: [{ text: "Ready to Design Something" }, { text: "People Love to Use?", orange: true }],
      description: "Let's turn your ideas into a clear, intuitive digital experience.",
      primaryLabel: "Start Your Design Project",
    },
    seo: {
      title: "UI/UX & Product Design Services | Parthav Technologies",
      description:
        "Parthav Technologies designs clear, intuitive digital experiences — UX research, wireframes, interfaces, prototypes and design systems.",
    },
  },

  "ai-automation": {
    mainId: "ai-automation",
    slug: "ai-automation",
    number: "03",
    eyebrow: "AI & AUTOMATION",
    headlineLines: [{ text: "Put AI to Work", orange: true }, { text: "For Your Business." }],
    heroDescription:
      "Build practical AI systems and automation workflows that simplify operations, improve customer experiences and help teams work smarter.",
    heroBenefits: [
      { label: "Practical AI", iconName: "Bot" },
      { label: "Workflow Automation", iconName: "Workflow" },
      { label: "Built for Teams", iconName: "Users" },
    ],
    primaryCta: { label: "Explore AI Solutions", href: "/#contact" },
    secondaryCta: { label: "See How We Work", href: "/#process" },
    microEyebrow: "OUR AI & AUTOMATION SERVICES",
    microHeadlineLines: [{ text: "Practical AI." }, { text: "Real Business Impact.", orange: true }],
    microDescription:
      "Use AI and automation to simplify workflows, improve customer experiences and help your business operate smarter.",
    technologies: ["OpenAI", "Claude", "LangChain", "Python", "Node.js", "Pinecone"],
    processHeadlineLines: [{ text: "A Clear Process." }, { text: "Designed for Better Results.", orange: true }],
    processSubtitle: "A simple, transparent process that keeps you involved at every step.",
    processSteps: STANDARD_PROCESS_STEPS([
      "Understand where AI can create real value.",
      "Define scope, data sources and requirements.",
      "Design the conversation flow or workflow.",
      "Build, integrate and test the system.",
      "Launch and refine based on real usage.",
    ]),
    featuredProjectIds: [],
    relatedServiceIds: ["crm-automation", "web-mobile", "seo-growth"],
    faq: [
      { question: "Can you build a custom AI chatbot?", answer: "Yes. We design chatbots trained on your business content and integrated with your website or messaging channels." },
      { question: "Can AI connect with our existing systems?", answer: "Yes. We integrate AI systems with your existing CRM, tools and data sources where possible." },
      { question: "Can you build AI agents?", answer: "Yes. We build AI agents designed around specific business tasks and workflows." },
      { question: "Can you automate business workflows?", answer: "Yes. We identify repetitive workflows and automate them, from lead follow-ups to internal reporting." },
      { question: "Can AI integrate with CRM?", answer: "Yes. We connect AI systems to your CRM so leads and conversations stay in one place." },
      { question: "Do you provide ongoing AI support?", answer: "Yes. We offer ongoing support to refine and maintain AI systems after launch." },
    ],
    cta: {
      eyebrow: "LET'S PUT AI TO WORK",
      headlineLines: [{ text: "Ready to Build a" }, { text: "Smarter Business?", orange: true }],
      description: "Let's identify where AI and automation can create real value for your business.",
      primaryLabel: "Explore AI Solutions",
    },
    seo: {
      title: "AI Solutions & Automation Services | Parthav Technologies",
      description:
        "Parthav Technologies builds practical AI systems and automation workflows — chatbots, AI agents, workflow automation and CRM integrations.",
    },
  },

  "seo-digital-growth": {
    mainId: "seo-growth",
    slug: "seo-digital-growth",
    number: "04",
    eyebrow: "SEO & DIGITAL GROWTH",
    headlineLines: [
      { text: "Get Found." },
      { text: "Get Discovered." },
      { text: "Keep Growing.", orange: true },
    ],
    heroDescription:
      "Improve your visibility across search and modern discovery platforms with technical SEO, content strategy, AI search optimization and CRO.",
    heroBenefits: [
      { label: "Technical SEO", iconName: "Settings2" },
      { label: "AI Search Ready", iconName: "Search" },
      { label: "Conversion Focused", iconName: "TrendingUp" },
    ],
    primaryCta: { label: "Start Your SEO Strategy", href: "/#contact" },
    secondaryCta: { label: "See Our Approach", href: "/#process" },
    microEyebrow: "OUR SEO & GROWTH SERVICES",
    microHeadlineLines: [{ text: "Everything You Need to" }, { text: "Grow Your Digital Visibility.", orange: true }],
    microDescription:
      "Build a stronger foundation for search, modern discovery and conversion.",
    technologies: ["Google Analytics", "Search Console", "Schema.org", "GEO", "AEO", "CRO Tooling"],
    processHeadlineLines: [{ text: "A Clear Process." }, { text: "Designed for Better Results.", orange: true }],
    processSubtitle: "A simple, transparent process that keeps you involved at every step.",
    processSteps: STANDARD_PROCESS_STEPS([
      "Audit your current search presence and technical health.",
      "Define a strategy and prioritized roadmap.",
      "Plan content, structure and technical fixes.",
      "Implement technical, on-page and content work.",
      "Monitor, report and keep improving.",
    ]),
    featuredProjectIds: ["real-estate", "healthcare", "ecommerce"],
    relatedServiceIds: ["web-mobile", "ai-automation", "ui-ux"],
    faq: [
      { question: "What does your SEO process include?", answer: "A technical audit, keyword and content strategy, on-page and technical implementation, and ongoing reporting." },
      { question: "Can you improve technical SEO?", answer: "Yes. We diagnose and resolve crawlability, indexing, Core Web Vitals and structured data issues." },
      { question: "Do you provide local SEO?", answer: "Yes. We optimize for local search visibility for businesses that serve specific locations." },
      { question: "Can you optimize for AI search?", answer: "Yes. We apply GEO and AEO practices to help your content surface in AI-driven search and answer engines." },
      { question: "How do you measure SEO progress?", answer: "Through Google Search Console, Analytics and regular reporting on visibility, technical health and conversions." },
      { question: "Do you provide ongoing SEO?", answer: "Yes. We offer ongoing SEO retainers for continued optimization and reporting." },
    ],
    cta: {
      eyebrow: "LET'S GROW TOGETHER",
      headlineLines: [{ text: "Ready to Grow Your" }, { text: "Digital Visibility?", orange: true }],
      description: "Let's build a stronger foundation for search, discovery and conversion.",
      primaryLabel: "Start Your SEO Strategy",
    },
    seo: {
      title: "SEO & Digital Growth Services | Parthav Technologies",
      description:
        "Parthav Technologies improves search visibility with technical SEO, content strategy, AI search optimization (GEO/AEO) and conversion rate optimization.",
    },
  },

  "branding-digital-identity": {
    mainId: "branding",
    slug: "branding-digital-identity",
    number: "05",
    eyebrow: "BRANDING & DIGITAL IDENTITY",
    headlineLines: [{ text: "Build a Brand" }, { text: "People Remember.", orange: true }],
    heroDescription:
      "Create a distinctive visual identity that makes your business recognizable across every digital touchpoint.",
    heroBenefits: [
      { label: "Strategy Led", iconName: "Compass" },
      { label: "Distinctive Identity", iconName: "Shapes" },
      { label: "Consistent Systems", iconName: "Layers" },
    ],
    primaryCta: { label: "Start Your Brand Project", href: "/#contact" },
    secondaryCta: { label: "See Our Work", href: "/#work" },
    microEyebrow: "OUR BRANDING SERVICES",
    microHeadlineLines: [{ text: "Everything You Need to" }, { text: "Build a Distinctive Brand.", orange: true }],
    microDescription:
      "Create a consistent identity that makes your business recognizable across every touchpoint.",
    technologies: ["Figma", "Design Systems", "Adobe Illustrator"],
    processHeadlineLines: [{ text: "A Clear Process." }, { text: "Designed for Better Results.", orange: true }],
    processSubtitle: "A simple, transparent process that keeps you involved at every step.",
    processSteps: STANDARD_PROCESS_STEPS([
      "Understand your business, audience and positioning.",
      "Define the direction and creative strategy.",
      "Design the identity and visual system.",
      "Build out brand assets and guidelines.",
      "Deliver final files and support rollout.",
    ]),
    featuredProjectIds: [],
    relatedServiceIds: ["ui-ux", "web-mobile", "seo-growth"],
    faq: [
      { question: "Do you create complete brand identities?", answer: "Yes. We design full identity systems — logo, color, typography and guidelines — not just a logo alone." },
      { question: "Can you redesign an existing brand?", answer: "Yes. We can refresh or fully rebrand an existing identity while considering existing brand recognition." },
      { question: "Do you create logos?", answer: "Yes. Logo design is part of our branding service, delivered with production-ready files." },
      { question: "Can you create brand guidelines?", answer: "Yes. We document how to use your identity consistently across touchpoints." },
      { question: "Do you design social media assets?", answer: "Yes. We create branded templates and creatives for social and marketing use." },
      { question: "Can you apply the identity to a website?", answer: "Yes. We can carry your brand identity through to your website and digital products." },
    ],
    cta: {
      eyebrow: "LET'S BUILD YOUR IDENTITY",
      headlineLines: [{ text: "Ready to Build a Brand" }, { text: "People Remember?", orange: true }],
      description: "Let's create a distinctive digital identity for your business.",
      primaryLabel: "Start Your Brand Project",
    },
    seo: {
      title: "Branding & Digital Identity Services | Parthav Technologies",
      description:
        "Parthav Technologies creates distinctive brand identities — strategy, logo design, visual systems and guidelines — built to be recognizable everywhere.",
    },
  },

  "crm-business-automation": {
    mainId: "crm-automation",
    slug: "crm-business-automation",
    number: "06",
    eyebrow: "CRM & BUSINESS AUTOMATION",
    headlineLines: [{ text: "Connect Your Business." }, { text: "Automate What Matters.", orange: true }],
    heroDescription:
      "Connect leads, customers, tools and workflows into efficient business systems that reduce manual work and improve operations.",
    heroBenefits: [
      { label: "Connected Systems", iconName: "Workflow" },
      { label: "Less Manual Work", iconName: "Zap" },
      { label: "Built for Sales Teams", iconName: "UsersRound" },
    ],
    primaryCta: { label: "Start Your CRM Project", href: "/#contact" },
    secondaryCta: { label: "See How We Work", href: "/#process" },
    microEyebrow: "OUR CRM & AUTOMATION SERVICES",
    microHeadlineLines: [{ text: "Everything You Need to" }, { text: "Connect and Automate Your Business.", orange: true }],
    microDescription:
      "Bring leads, customers, tools and workflows together into one efficient business system.",
    technologies: ["Node.js", "React", "MongoDB", "MySQL", "REST APIs", "Automation Tooling"],
    processHeadlineLines: [{ text: "A Clear Process." }, { text: "Designed for Better Results.", orange: true }],
    processSubtitle: "A simple, transparent process that keeps you involved at every step.",
    processSteps: STANDARD_PROCESS_STEPS([
      "Understand your sales process and workflows.",
      "Define the CRM structure and automation needs.",
      "Design the pipeline and user experience.",
      "Build, integrate and automate workflows.",
      "Launch, train your team and refine.",
    ]),
    featuredProjectIds: [],
    relatedServiceIds: ["ai-automation", "web-mobile", "seo-growth"],
    faq: [
      { question: "Can you build a custom CRM?", answer: "Yes. We build custom CRMs or configure existing platforms around your specific sales process." },
      { question: "Can you automate lead management?", answer: "Yes. We automate lead capture, assignment and follow-up so fewer leads fall through the cracks." },
      { question: "Can you integrate WhatsApp?", answer: "Yes. We connect WhatsApp so conversations stay linked to the right lead or customer record." },
      { question: "Can you connect existing tools?", answer: "Yes. We integrate your CRM with the email, calendar and business tools you already use." },
      { question: "Can you automate follow-ups?", answer: "Yes. We set up automated follow-up sequences and reminders based on your sales process." },
      { question: "Can you build custom business workflows?", answer: "Yes. We design automation workflows around your specific operational needs, from onboarding to invoicing." },
    ],
    cta: {
      eyebrow: "LET'S AUTOMATE WHAT MATTERS",
      headlineLines: [{ text: "Ready to Connect" }, { text: "Your Business?", orange: true }],
      description: "Let's build smarter workflows for your leads, customers and operations.",
      primaryLabel: "Start Your CRM Project",
    },
    seo: {
      title: "CRM & Business Automation Services | Parthav Technologies",
      description:
        "Parthav Technologies builds CRM systems and business automation workflows — lead management, WhatsApp integration and custom workflow automation.",
    },
  },

  "web-development": {
    mainId: "web-mobile",
    slug: "web-development",
    number: "02",
    eyebrow: "WEB DEVELOPMENT",
    headlineLines: [
      { text: "Web Development" },
      { text: "That Powers Real" },
      { text: "Business Growth.", orange: true },
    ],
    heroDescription:
      "We build fast, scalable and high-performance websites and web applications tailored to your business goals.",
    heroBenefits: [
      { label: "Modern Technologies", iconName: "Sparkles" },
      { label: "Scalable Architecture", iconName: "Layers" },
      { label: "Performance Focused", iconName: "Gauge" },
      { label: "Built for Business", iconName: "Building2" },
    ],
    primaryCta: { label: "Start Your Project", href: "/#contact" },
    secondaryCta: { label: "See How We Work", href: "/#process" },
    microEyebrow: "OUR WEB DEVELOPMENT SERVICES",
    microHeadlineLines: [{ text: "Everything You Need" }, { text: "to Build Online.", orange: true }],
    microDescription:
      "From business websites to complex web applications, we deliver digital solutions that are fast, secure and built to grow with your business.",
    technologies: ["Next.js", "React", "Laravel", "Node.js", "TypeScript", "PHP", "WordPress", "Shopify", "MySQL", "MongoDB"],
    processHeadlineLines: [{ text: "A Clear Process." }, { text: "Amazing Results.", orange: true }],
    processSubtitle: "A simple, transparent process that keeps you involved at every step — from idea to launch.",
    processSteps: WEB_DEV_PROCESS_STEPS,
    featuredProjectIds: ["real-estate", "healthcare", "ecommerce"],
    relatedServiceIds: ["ui-ux", "ai-automation", "seo-growth"],
    faq: [
      { question: "How long does a website take to build?", answer: "Most business websites take 3 to 6 weeks depending on scope. Complex web applications and SaaS platforms typically run 8 to 14 weeks." },
      { question: "Which technology is right for my project?", answer: "It depends on your goals — we typically recommend Next.js/React for performance-critical sites, WordPress or Shopify for content- and commerce-led sites, and Laravel or Node.js for custom backends." },
      { question: "Can you build custom web applications?", answer: "Yes. We design and build custom web applications tailored to your specific business processes." },
      { question: "Can you develop mobile apps?", answer: "Yes. We build native and cross-platform mobile applications for Android and iOS." },
      { question: "Can you integrate third-party APIs?", answer: "Yes. We regularly integrate payment gateways, CRMs, marketing tools and custom APIs." },
      { question: "Do you provide maintenance after launch?", answer: "Yes. We offer ongoing website and application care plans covering updates, monitoring and enhancements." },
    ],
    cta: WEB_DEV_CTA.headlineLines
      ? {
          eyebrow: WEB_DEV_CTA.eyebrow,
          headlineLines: WEB_DEV_CTA.headlineLines,
          description: WEB_DEV_CTA.description,
          primaryLabel: WEB_DEV_CTA.primaryCta.label,
        }
      : {
          eyebrow: "LET'S BUILD TOGETHER",
          headlineLines: [{ text: "Ready to Build Something" }, { text: "Amazing?", orange: true }],
          description: "Let's create a fast, scalable web or mobile experience built around your business.",
          primaryLabel: "Start Your Project",
        },
    seo: {
      title: "Web Development Services | Parthav Technologies",
      description:
        "Parthav Technologies builds fast, scalable websites, web applications and digital platforms designed for performance, usability and business growth.",
    },
  },
};
