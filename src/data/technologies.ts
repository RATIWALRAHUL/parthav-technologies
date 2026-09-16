export type TechnologyCategory =
  | "all"
  | "frontend"
  | "backend"
  | "database"
  | "realtime"
  | "ai"
  | "cloud"
  | "design"
  | "analytics";

export interface Technology {
  id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "realtime" | "ai" | "cloud" | "design" | "analytics";
  categoryLabel: string;
  description: string;
  icon: string;
  website: string;
  featured: boolean;
  verified: boolean;
}

export const CATEGORY_FILTERS: { id: TechnologyCategory; label: string }[] = [
  { id: "all", label: "All Technologies" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "ai", label: "AI & Automation" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "design", label: "Product & UI/UX" },
  { id: "realtime", label: "APIs & Workflows" },
  { id: "analytics", label: "SEO & Growth" },
];

export const TECHNOLOGIES_DATA: Technology[] = [
  // FRONTEND
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    categoryLabel: "Frontend",
    description: "App router, SSR, and edge architecture for maximum web performance.",
    icon: "Next.js",
    website: "https://nextjs.org",
    featured: true,
    verified: true,
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    categoryLabel: "Frontend",
    description: "Modern component-driven UI architecture and concurrent rendering.",
    icon: "React",
    website: "https://react.dev",
    featured: true,
    verified: true,
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    categoryLabel: "Frontend",
    description: "Strict static typing ensuring enterprise code reliability and zero runtime surprises.",
    icon: "TypeScript",
    website: "https://www.typescriptlang.org",
    featured: true,
    verified: true,
  },
  {
    id: "shopify",
    name: "Shopify",
    category: "frontend",
    categoryLabel: "Frontend",
    description: "Enterprise e-commerce, custom theme development and headless storefronts.",
    icon: "Shopify",
    website: "https://www.shopify.com",
    featured: true,
    verified: true,
  },

  // BACKEND
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    categoryLabel: "Backend",
    description: "High-throughput asynchronous server runtimes and microservices.",
    icon: "Node.js",
    website: "https://nodejs.org",
    featured: true,
    verified: true,
  },
  {
    id: "python",
    name: "Python",
    category: "backend",
    categoryLabel: "Backend",
    description: "Robust data processing, LLM orchestration, and machine learning pipelines.",
    icon: "Python",
    website: "https://www.python.org",
    featured: true,
    verified: true,
  },
  {
    id: "laravel",
    name: "Laravel",
    category: "backend",
    categoryLabel: "Backend",
    description: "Elegant PHP framework for structured backends, queues and business logic.",
    icon: "Laravel",
    website: "https://laravel.com",
    featured: true,
    verified: true,
  },
  {
    id: "php",
    name: "PHP",
    category: "backend",
    categoryLabel: "Backend",
    description: "Reliable, modern server-side foundation powering custom web backends.",
    icon: "PHP",
    website: "https://www.php.net",
    featured: false,
    verified: true,
  },
  {
    id: "wordpress",
    name: "WordPress",
    category: "backend",
    categoryLabel: "Backend",
    description: "Custom CMS development, high-performance headless architectures and editorial tools.",
    icon: "WordPress",
    website: "https://wordpress.org",
    featured: false,
    verified: true,
  },

  // DATABASE
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    categoryLabel: "Database",
    description: "Flexible JSON document store built for rapid iteration and high write loads.",
    icon: "MongoDB",
    website: "https://www.mongodb.com",
    featured: true,
    verified: true,
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "database",
    categoryLabel: "Database",
    description: "Battle-tested relational database for ACID transactional data integrity.",
    icon: "MySQL",
    website: "https://www.mysql.com",
    featured: true,
    verified: true,
  },

  // AI & AUTOMATION
  {
    id: "openai",
    name: "OpenAI",
    category: "ai",
    categoryLabel: "AI & Automation",
    description: "Enterprise GPT-4o integration, function calling, embeddings and conversational agents.",
    icon: "OpenAI",
    website: "https://openai.com",
    featured: true,
    verified: true,
  },
  {
    id: "claude",
    name: "Claude (Anthropic)",
    category: "ai",
    categoryLabel: "AI & Automation",
    description: "Frontier reasoning, long-context document analysis and precise agentic automation.",
    icon: "Claude",
    website: "https://www.anthropic.com",
    featured: true,
    verified: true,
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "ai",
    categoryLabel: "AI & Automation",
    description: "Multi-agent frameworks, prompt templates and production RAG pipeline architecture.",
    icon: "LangChain",
    website: "https://www.langchain.com",
    featured: true,
    verified: true,
  },
  {
    id: "pinecone",
    name: "Pinecone",
    category: "ai",
    categoryLabel: "AI & Automation",
    description: "Ultra-low latency vector database for semantic search and AI knowledge retrieval.",
    icon: "Pinecone",
    website: "https://www.pinecone.io",
    featured: true,
    verified: true,
  },

  // CLOUD & DEVOPS
  {
    id: "vercel",
    name: "Vercel",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    description: "Global edge network, automated preview deployments and instant rollback architecture.",
    icon: "Vercel",
    website: "https://vercel.com",
    featured: true,
    verified: true,
  },
  {
    id: "github",
    name: "GitHub",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    description: "Source code governance, pull request review workflows and CI/CD automation pipelines.",
    icon: "GitHub",
    website: "https://github.com",
    featured: true,
    verified: true,
  },

  // DESIGN
  {
    id: "figma",
    name: "Figma",
    category: "design",
    categoryLabel: "Design & UI/UX",
    description: "Collaborative design systems, responsive component tokens and interactive prototypes.",
    icon: "Figma",
    website: "https://www.figma.com",
    featured: true,
    verified: true,
  },
  {
    id: "figjam",
    name: "FigJam",
    category: "design",
    categoryLabel: "Design & UI/UX",
    description: "UX user journeys, interactive brainstorming and system architecture mapping.",
    icon: "FigJam",
    website: "https://www.figma.com/figjam",
    featured: false,
    verified: true,
  },
  {
    id: "framer-motion",
    name: "Framer Motion",
    category: "design",
    categoryLabel: "Design & UI/UX",
    description: "Declarative spring physics and editorial micro-interactions for web interfaces.",
    icon: "Framer Motion",
    website: "https://www.framer.com/motion",
    featured: true,
    verified: true,
  },
  {
    id: "lucide",
    name: "Lucide Icons",
    category: "design",
    categoryLabel: "Design & UI/UX",
    description: "Crisp, balanced vector iconography with semantic SVG accessibility.",
    icon: "Lucide",
    website: "https://lucide.dev",
    featured: false,
    verified: true,
  },

  // REALTIME & WORKFLOWS
  {
    id: "whatsapp",
    name: "WhatsApp API",
    category: "realtime",
    categoryLabel: "APIs & Realtime",
    description: "Official Meta cloud API for real-time lead capture, notifications and CRM triggers.",
    icon: "WhatsApp",
    website: "https://www.whatsapp.com/business/api",
    featured: true,
    verified: true,
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "realtime",
    categoryLabel: "APIs & Realtime",
    description: "Multi-app integration connecting leads, marketing pipelines and CRM automation.",
    icon: "Zapier",
    website: "https://zapier.com",
    featured: false,
    verified: true,
  },
  {
    id: "make",
    name: "Make",
    category: "realtime",
    categoryLabel: "APIs & Realtime",
    description: "Visual logic orchestrator for complex multi-step data pipelines and business events.",
    icon: "Make",
    website: "https://www.make.com",
    featured: false,
    verified: true,
  },

  // ANALYTICS & GROWTH
  {
    id: "ga4",
    name: "Google Analytics 4",
    category: "analytics",
    categoryLabel: "SEO & Growth",
    description: "Event-based conversion tracking, user pathing and retention analytics.",
    icon: "Google Analytics",
    website: "https://analytics.google.com",
    featured: true,
    verified: true,
  },
  {
    id: "search-console",
    name: "Google Search Console",
    category: "analytics",
    categoryLabel: "SEO & Growth",
    description: "Deep crawl health auditing, Core Web Vitals monitoring and indexation telemetry.",
    icon: "Google Search Console",
    website: "https://search.google.com/search-console",
    featured: true,
    verified: true,
  },
  {
    id: "schema-org",
    name: "Schema.org",
    category: "analytics",
    categoryLabel: "SEO & Growth",
    description: "Semantic JSON-LD structured data for rich SERP snippets and entity discovery.",
    icon: "Schema.org",
    website: "https://schema.org",
    featured: false,
    verified: true,
  },
];
