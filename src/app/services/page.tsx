import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  PenTool,
  MonitorSmartphone,
  Bot,
  TrendingUp,
  Shapes,
  Workflow,
  CheckCircle2,
  ShoppingCart,
  Cloud,
  Code2,
  LayoutDashboard,
  Plug,
  Server,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SERVICES_DATA, CAPABILITY_CHIPS } from "@/data/services";
import styles from "./services-page.module.css";

export const metadata: Metadata = {
  title: "Services & Digital Capabilities | Parthav Technologies",
  description:
    "Explore our full spectrum of digital capabilities: UI/UX & Product Design, Web & Mobile Development, AI & Automation, SEO & Digital Growth, Branding, and CRM.",
};

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  PenTool: <PenTool size={28} strokeWidth={1.85} />,
  MonitorSmartphone: <MonitorSmartphone size={28} strokeWidth={1.85} />,
  Bot: <Bot size={28} strokeWidth={1.85} />,
  TrendingUp: <TrendingUp size={28} strokeWidth={1.85} />,
  Shapes: <Shapes size={28} strokeWidth={1.85} />,
  Workflow: <Workflow size={28} strokeWidth={1.85} />,
};

const CHIP_ICONS: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart size={15} />,
  Cloud: <Cloud size={15} />,
  Code2: <Code2 size={15} />,
  LayoutDashboard: <LayoutDashboard size={15} />,
  Plug: <Plug size={15} />,
  Server: <Server size={15} />,
  BarChart3: <BarChart3 size={15} />,
  TrendingUp: <TrendingUp size={15} />,
  ShieldCheck: <ShieldCheck size={15} />,
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className={styles.servicesPageRoot}>
        {/* Page Hero Header */}
        <section className={styles.heroBanner}>
          <Container>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>FULL-SPECTRUM CAPABILITIES</span>
              <h1 className={styles.title}>
                Digital experiences. <br />
                <span className={styles.orangeText}>Built for growth.</span>
              </h1>
              <p className={styles.lead}>
                From strategic product design to scalable engineering, intelligent AI
                workflows and measurable search growth — Parthav Technologies delivers
                the end-to-end capabilities ambitious businesses need.
              </p>
            </div>
          </Container>
        </section>

        {/* Primary Services Grid */}
        <section className={styles.servicesGridSection}>
          <Container>
            <div className={styles.sectionHeading}>
              <span className={styles.sectionEyebrow}>CORE DISCIPLINES</span>
              <h2 className={styles.sectionTitle}>Six strategic service areas</h2>
            </div>

            <div className={styles.grid}>
              {SERVICES_DATA.map((service) => (
                <article
                  key={service.id}
                  id={service.id}
                  className={styles.serviceDetailCard}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.numberBadge}>{service.number}</span>
                    <div className={styles.iconWrapper} aria-hidden="true">
                      {SERVICE_ICONS[service.iconName]}
                    </div>
                  </div>

                  <h3 className={styles.serviceName}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>

                  <div className={styles.capabilitiesBlock}>
                    <span className={styles.blockLabel}>Key Capabilities</span>
                    <ul className={styles.capabilitiesList}>
                      {service.capabilities.map((cap) => (
                        <li key={cap} className={styles.capabilityItem}>
                          <CheckCircle2
                            size={14}
                            className={styles.checkIcon}
                            strokeWidth={2.2}
                          />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.cardAction}>
                    <Link href="/#contact" className={styles.cardCta}>
                      <span>Discuss {service.title}</span>
                      <ArrowRight size={15} strokeWidth={2} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* Specialized Competencies */}
        <section className={styles.chipsSection}>
          <Container>
            <div className={styles.chipsCard}>
              <div className={styles.chipsHeader}>
                <span className={styles.chipsEyebrow}>CROSS-FUNCTIONAL EXPERTISE</span>
                <h2 className={styles.chipsTitle}>Additional digital capabilities</h2>
                <p className={styles.chipsSubtitle}>
                  Specialized solutions we integrate across all client engagements.
                </p>
              </div>

              <div className={styles.chipsWrapper}>
                {CAPABILITY_CHIPS.map((chip) => (
                  <div key={chip.label} className={styles.specialtyChip}>
                    <span className={styles.specialtyIcon} aria-hidden="true">
                      {CHIP_ICONS[chip.iconName]}
                    </span>
                    <span>{chip.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Ready to build CTA */}
        <section className={styles.ctaSection}>
          <Container>
            <div className={styles.ctaBox}>
              <span className={styles.ctaEyebrow}>START A PROJECT</span>
              <h2 className={styles.ctaHeading}>
                Have an idea ready to turn into impact?
              </h2>
              <p className={styles.ctaText}>
                Let’s explore how Parthav Technologies can help design, build and scale
                your next digital product.
              </p>
              <div className={styles.ctaButtons}>
                <Link href="/#contact" className={styles.primaryBtn}>
                  <span>Schedule Discovery Call</span>
                  <ArrowRight size={16} strokeWidth={2} />
                </Link>
                <Link href="/" className={styles.secondaryBtn}>
                  <span>Return to Homepage</span>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
