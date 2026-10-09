import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  PenTool,
  ShieldCheck,
  HeartHandshake,
  Users,
  Zap,
  Target,
  BarChart3,
  Globe2,
  Layers,
  Sparkles,
  TrendingUp,
  Cpu,
  Palette,
  Workflow,
} from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Process } from "@/components/home/Process";
import { FinalCTA } from "@/components/home/FinalCTA";
import { TechLogo } from "@/components/common/TechLogo";
import { AboutHero } from "@/components/about/AboutHero";
import { FoundingStory } from "@/components/about/FoundingStory";

import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Parthav Technologies | Digital Technology Partner in Jaipur",
  description:
    "Learn about Parthav Technologies, a Jaipur-based digital technology partner helping businesses build better digital experiences through design, development, AI and digital growth.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: "/about",
    title: "About Parthav Technologies | Digital Technology Partner in Jaipur",
    description:
      "Turning visionary ideas into measurable impact. Built in Jaipur. Designed for the world.",
    siteName: "Parthav Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Parthav Technologies",
    description:
      "Turning visionary ideas into measurable impact. Built in Jaipur. Designed for the world.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://parthavtechnologies.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About Us",
          item: "https://parthavtechnologies.com/about",
        },
      ],
    },
    {
      "@type": "AboutPage",
      "@id": "https://parthavtechnologies.com/about#webpage",
      url: "https://parthavtechnologies.com/about",
      name: "About Us — Parthav Technologies",
      description:
        "Parthav Technologies is a Jaipur-based digital technology partner turning visionary ideas into measurable impact.",
      mainEntity: {
        "@type": "Organization",
        name: "Parthav Technologies",
        url: "https://parthavtechnologies.com",
        logo: "https://parthavtechnologies.com/logo/parthav-logo.png",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jaipur",
          addressRegion: "Rajasthan",
          addressCountry: "India",
        },
      },
    },
  ],
};

const PROOF_CARDS = [
  {
    title: "Full-Service Digital Partner",
    description: "Strategy, design, development and growth — under one roof.",
    icon: <Layers size={22} color="#0066CC" />,
    iconBg: "rgba(0, 102, 204, 0.08)",
  },
  {
    title: "Design + Technology",
    description: "Human-centered design meets robust engineering.",
    icon: <Palette size={22} color="#FF6A00" />,
    iconBg: "rgba(255, 106, 0, 0.08)",
  },
  {
    title: "AI + Automation",
    description: "Intelligent solutions for modern businesses.",
    icon: <Cpu size={22} color="#7928CA" />,
    iconBg: "rgba(121, 40, 202, 0.08)",
  },
  {
    title: "Built for Growth",
    description: "Scalable products, long-term partnerships.",
    icon: <TrendingUp size={22} color="#0D7A53" />,
    iconBg: "rgba(13, 122, 83, 0.08)",
  },
];

const PRINCIPLES = [
  {
    number: "01",
    title: "Curiosity",
    description: "We ask better questions before building solutions.",
    icon: <Search size={22} color="#0066CC" />,
  },
  {
    number: "02",
    title: "Craft",
    description: "We care about the details that make digital experiences feel effortless.",
    icon: <PenTool size={22} color="#7928CA" />,
  },
  {
    number: "03",
    title: "Ownership",
    description: "We take responsibility from the first idea through launch and beyond.",
    icon: <ShieldCheck size={22} color="#0066CC" />,
  },
  {
    number: "04",
    title: "Partnership",
    description: "We work alongside our clients, not simply for them.",
    icon: <HeartHandshake size={22} color="#FF6A00" />,
  },
];

const WHY_PARTHAV_CARDS = [
  {
    title: "Senior Craftsmanship",
    description: "Work directly with experienced designers and engineers rather than layers of handoffs.",
    icon: <Users size={22} />,
  },
  {
    title: "Performance by Default",
    description: "Performance, responsiveness and maintainability are considered from day one.",
    icon: <Zap size={22} />,
  },
  {
    title: "Strategy Before Execution",
    description: "Every project starts by understanding the business problem, users and desired outcome.",
    icon: <Target size={22} />,
  },
  {
    title: "Built for the Long Term",
    description: "We create systems that can evolve with your business rather than becoming technical debt.",
    icon: <BarChart3 size={22} />,
  },
];

const CAPABILITIES = [
  {
    title: "Web Development",
    description: "Modern websites, web applications and custom platforms.",
    href: "/services/web-development",
    icon: <Globe2 size={24} color="#0066CC" />,
    iconBg: "rgba(0, 102, 204, 0.08)",
  },
  {
    title: "UI/UX & Product Design",
    description: "Design systems, user journeys and conversion-focused interfaces.",
    href: "/services/ui-ux-product-design",
    icon: <Layers size={24} color="#0066CC" />,
    iconBg: "rgba(0, 102, 204, 0.08)",
  },
  {
    title: "SEO & Digital Growth",
    description: "High-impact SEO strategies and performance marketing.",
    href: "/services/seo-digital-growth",
    icon: <TrendingUp size={24} color="#0D7A53" />,
    iconBg: "rgba(13, 122, 83, 0.08)",
  },
  {
    title: "AI & Automation",
    description: "Custom AI agents, automation workflows and intelligent solutions.",
    href: "/services/ai-automation",
    icon: <Cpu size={24} color="#7928CA" />,
    iconBg: "rgba(121, 40, 202, 0.08)",
  },
  {
    title: "Branding & Digital Identity",
    description: "Brand strategy, visual identity and digital brand experiences.",
    href: "/services/branding-digital-identity",
    icon: <Palette size={24} color="#FF6A00" />,
    iconBg: "rgba(255, 106, 0, 0.08)",
  },
  {
    title: "CRM & Business Automation",
    description: "CRM implementation, integrations and business process automation.",
    href: "/services/crm-business-automation",
    icon: <Workflow size={24} color="#FF6A00" />,
    iconBg: "rgba(255, 106, 0, 0.08)",
  },
];

const TECHNOLOGIES_LIST = [
  { name: "Next.js" },
  { name: "React" },
  { name: "TypeScript" },
  { name: "Node.js" },
  { name: "Laravel" },
  { name: "PHP" },
  { name: "MongoDB" },
  { name: "MySQL" },
  { name: "Docker" },
  { name: "AWS" },
  { name: "Vercel" },
  { name: "GitHub" },
  { name: "Figma" },
  { name: "Redis" },
  { name: "Expo" },
  { name: "Socket.IO" },
];

const PROCESS_STEPS_DATA = [
  {
    step: "01",
    title: "Discover",
    description: "Understand the business, users and opportunity.",
    iconName: "Search",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Define priorities, architecture and direction.",
    iconName: "Compass",
  },
  {
    step: "03",
    title: "Design",
    description: "Turn strategy into intuitive digital experiences.",
    iconName: "PenTool",
  },
  {
    step: "04",
    title: "Build",
    description: "Develop scalable, secure and performant products.",
    iconName: "Code2",
  },
  {
    step: "05",
    title: "Launch & Grow",
    description: "Measure, optimize and continuously improve.",
    iconName: "Rocket",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main id="main-content">
        {/* =================================================================
            1. Hero Section (Exact Homepage Design System Match)
           ================================================================= */}
        <AboutHero />

        {/* =================================================================
            2. Proof / Capability Strip (4 Compact Cards)
           ================================================================= */}
        <section className={styles.proofSection} aria-label="Capabilities Overview">
          <Container>
            <div className={styles.proofGrid}>
              {PROOF_CARDS.map((card, idx) => (
                <Reveal key={card.title} delay={0.05 * idx}>
                  <div className={styles.proofCard}>
                    <div className={styles.proofIconBox} style={{ backgroundColor: card.iconBg }}>
                      {card.icon}
                    </div>
                    <div className={styles.proofContent}>
                      <h2 className={styles.proofTitle}>{card.title}</h2>
                      <p className={styles.proofDesc}>{card.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* =================================================================
            3. Founding Story Section (Exact Recreation from Reference Image)
           ================================================================= */}
        <FoundingStory />

        {/* =================================================================
            4. Mission + Vision (Two Large Side-by-Side Cards)
           ================================================================= */}
        <section className={styles.missionVisionSection} aria-label="Our Mission and Vision">
          <Container>
            <div className={styles.missionVisionGrid}>
              {/* Card 01: Our Mission */}
              <Reveal>
                <div className={styles.missionCard}>
                  <span className={styles.cardWatermark} aria-hidden="true">01</span>
                  <div>
                    <div className={styles.mvHeaderRow}>
                      <div className={styles.mvIconBox}>
                        <Target size={22} />
                      </div>
                      <span className={styles.mvBadgeNum}>01</span>
                    </div>
                    <h3 className={styles.mvTitle}>Our Mission</h3>
                    <p className={styles.mvText}>
                      Turn ambitious ideas into useful, scalable and meaningful digital experiences.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Card 02: Our Vision (Deep Navy) */}
              <Reveal delay={0.12}>
                <div className={styles.visionCard}>
                  <span className={styles.cardWatermark} aria-hidden="true">02</span>
                  <div>
                    <div className={styles.mvHeaderRow}>
                      <div className={styles.mvIconBox}>
                        <Sparkles size={22} />
                      </div>
                      <span className={styles.mvBadgeNum}>02</span>
                    </div>
                    <h3 className={styles.mvTitle}>Our Vision</h3>
                    <p className={styles.mvText}>
                      To be a technology partner known for thoughtful design, strong engineering and
                      measurable <span className={styles.orangeText}>digital impact.</span>
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* =================================================================
            5. Principles Section (HOW WE WORK)
           ================================================================= */}
        <section className={styles.principlesSection} aria-label="How We Work">
          <Container>
            <div className={styles.sectionHeaderCenter}>
              <Reveal>
                <span className={styles.sectionTag}>HOW WE WORK</span>
                <h2 className={styles.sectionHeading}>Principles that define our work.</h2>
                <p className={styles.sectionSubtitle}>
                  Our culture is built around curiosity, craft, ownership and partnership.
                </p>
              </Reveal>
            </div>

            <div className={styles.principlesGrid}>
              {PRINCIPLES.map((item, idx) => (
                <Reveal key={item.title} delay={0.06 * idx}>
                  <div className={styles.principleCard}>
                    <div className={styles.principleTopRow}>
                      <div className={styles.principleIconWrapper}>{item.icon}</div>
                      <span className={styles.principleNumberWatermark}>{item.number}</span>
                    </div>
                    <h3 className={styles.principleCardTitle}>{item.title}</h3>
                    <p className={styles.principleCardDesc}>{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* =================================================================
            6. Why Parthav — Dark Section (#031B3A)
           ================================================================= */}
        <section className={styles.whyParthavDarkSection} aria-label="Why Choose Parthav Technologies">
          <Container>
            <div className={styles.whyHeaderGrid}>
              <Reveal>
                <span className={styles.sectionTag} style={{ color: "var(--color-orange-light)" }}>
                  THE PARTHAV ADVANTAGE
                </span>
                <h2 className={styles.whyDarkHeading}>
                  Why forward-thinking <br />
                  teams choose us.
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <p className={styles.whyDarkSubtitle}>
                  We combine the high-touch agility of a dedicated product team with the strategic
                  rigor of an experienced digital consultancy.
                </p>
              </Reveal>
            </div>

            <div className={styles.whyCardsGrid}>
              {WHY_PARTHAV_CARDS.map((card, idx) => (
                <Reveal key={card.title} delay={0.08 * idx}>
                  <div className={styles.whyDarkCard}>
                    <div className={styles.whyDarkIconBox}>{card.icon}</div>
                    <h3 className={styles.whyDarkCardTitle}>{card.title}</h3>
                    <p className={styles.whyDarkCardDesc}>{card.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* =================================================================
            7. Core Capabilities (WHAT WE BUILD)
           ================================================================= */}
        <section className={styles.capabilitiesSection} aria-label="Our Core Capabilities">
          <Container>
            <div className={styles.sectionHeaderCenter}>
              <Reveal>
                <span className={styles.sectionTag}>WHAT WE BUILD</span>
                <h2 className={styles.sectionHeading}>Explore our core capabilities.</h2>
                <p className={styles.sectionSubtitle}>
                  From digital products and websites to AI systems and growth platforms, we bring the
                  capabilities needed to build what comes next.
                </p>
              </Reveal>
            </div>

            <div className={styles.capsGrid}>
              {CAPABILITIES.map((service, idx) => (
                <Reveal key={service.title} delay={0.05 * idx}>
                  <Link href={service.href} className={styles.capCard}>
                    <div className={styles.capIconBox} style={{ backgroundColor: service.iconBg }}>
                      {service.icon}
                    </div>
                    <h3 className={styles.capTitle}>{service.title}</h3>
                    <p className={styles.capDesc}>{service.description}</p>
                    <span className={styles.capLinkText}>
                      Explore service <ArrowRight size={14} />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* =================================================================
            8. Technology Section (OUR TECHNOLOGY)
           ================================================================= */}
        <section className={styles.techSection} aria-label="Our Technology Stack">
          <Container>
            <div className={styles.sectionHeaderCenter}>
              <Reveal>
                <span className={styles.sectionTag}>OUR TECHNOLOGY</span>
                <h2 className={styles.sectionHeading}>Built with the right technology.</h2>
                <p className={styles.sectionSubtitle}>
                  We choose proven technologies and modern tools based on the product, business
                  requirements and long-term scalability.
                </p>
              </Reveal>
            </div>

            <div className={styles.techGrid}>
              {TECHNOLOGIES_LIST.map((tech) => (
                <div key={tech.name} className={styles.techCard}>
                  <TechLogo name={tech.name} size={30} />
                  <span className={styles.techName}>{tech.name}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* =================================================================
            9. Process Section (HOW WE WORK — Reusing Existing Process)
           ================================================================= */}
        <Process
          eyebrow="HOW WE WORK"
          heading={<>From idea to impact.</>}
          subtitle="A clear, collaborative process designed to turn your ideas into real, measurable results."
          steps={PROCESS_STEPS_DATA}
        />

        {/* =================================================================
            10. Jaipur → World (ROOTED IN JAIPUR)
           ================================================================= */}
        <section className={styles.jaipurWorldSection} aria-label="Rooted in Jaipur">
          <Container>
            <div className={styles.jaipurWorldGrid}>
              {/* Left Column Text */}
              <div>
                <Reveal>
                  <span className={styles.sectionTag}>ROOTED IN JAIPUR</span>
                  <h2 className={styles.sectionHeading}>
                    Built in Jaipur. <br />
                    Creating impact worldwide.
                  </h2>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className={styles.storyParagraph}>
                    Our journey started in Jaipur, Rajasthan, and today we partner with ambitious
                    businesses across India and around the world.
                  </p>
                </Reveal>
              </div>

              {/* Right Column Illustration */}
              <Reveal delay={0.15}>
                <div className={styles.jaipurWorldMedia}>
                  <Image
                    src="/images/about/jaipur-to-world.jpg"
                    alt="Illustration connecting historic Jaipur landmarks with worldwide international skylines"
                    width={720}
                    height={405}
                    className={styles.jaipurWorldImage}
                  />
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* =================================================================
            11. Global CTA (Reusing Existing FinalCTA Component)
           ================================================================= */}
        <FinalCTA />
      </main>

      {/* =================================================================
          12. Global Footer (Reusing Existing Footer Component)
         ================================================================= */}
      <Footer />
    </div>
  );
}
