import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Compass,
  PenTool,
  Code2,
  Database,
  TrendingUp,
  Gauge,
  Layers,
  Webhook,
  Plug,
  CloudCog,
  Search,
  BarChart3,
  ShoppingCart,
  Bot,
  Shapes,
  Workflow,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Process } from "@/components/home/Process";
import { ServiceCtaBanner } from "@/components/services/ServiceCtaBanner";
import { ServiceVisual } from "@/components/services/ServiceVisual";
import { ServiceDetailCard } from "@/components/services/ServiceDetailCard";
import { resolveIcon } from "@/lib/resolveServiceIcon";
import { ComingSoonAutoOpen } from "@/components/services/ComingSoonAutoOpen";
import { FeaturedWork } from "@/components/web-development/FeaturedWork";
import { WebDevTestimonialsFaq } from "@/components/web-development/WebDevTestimonialsFaq";
import { MAIN_SERVICES } from "@/data/main-services";
import { FEATURED_PROJECTS } from "@/data/projects";
import type { MicroServiceDetail } from "@/data/micro-service-details";
import sharedStyles from "@/components/services/ServicesExplorer.module.css";
import styles from "./MicroServiceDetailTemplate.module.css";

const DELIVERABLE_ICONS: Record<string, React.ReactNode> = {
  Compass: <Compass size={22} strokeWidth={1.85} />,
  PenTool: <PenTool size={22} strokeWidth={1.85} />,
  Code2: <Code2 size={22} strokeWidth={1.85} />,
  Database: <Database size={22} strokeWidth={1.85} />,
  TrendingUp: <TrendingUp size={22} strokeWidth={1.85} />,
  Gauge: <Gauge size={22} strokeWidth={1.85} />,
  Layers: <Layers size={22} strokeWidth={1.85} />,
  Webhook: <Webhook size={22} strokeWidth={1.85} />,
  Plug: <Plug size={22} strokeWidth={1.85} />,
  CloudCog: <CloudCog size={22} strokeWidth={1.85} />,
  Search: <Search size={22} strokeWidth={1.85} />,
  CheckCircle2: <CheckCircle2 size={22} strokeWidth={1.85} />,
  BarChart3: <BarChart3 size={22} strokeWidth={1.85} />,
  ShoppingCart: <ShoppingCart size={22} strokeWidth={1.85} />,
  Bot: <Bot size={22} strokeWidth={1.85} />,
  Shapes: <Shapes size={22} strokeWidth={1.85} />,
  Workflow: <Workflow size={22} strokeWidth={1.85} />,
};

const PROCESS_STEPS_DEFAULT = [
  { step: "01", title: "Discover", description: "Understand your goals.", iconName: "Search" },
  { step: "02", title: "Plan", description: "Define structure and requirements.", iconName: "Compass" },
  { step: "03", title: "Design", description: "Create the experience.", iconName: "PenTool" },
  { step: "04", title: "Build", description: "Develop and test.", iconName: "Code2" },
  { step: "05", title: "Launch & Grow", description: "Deploy and improve.", iconName: "Rocket" },
];

export function MicroServiceDetailTemplate({ detail }: { detail: MicroServiceDetail }) {
  const mainService = MAIN_SERVICES.find((s) => s.id === detail.mainId);
  if (!mainService) return null;

  const microService = mainService.microServices.find((m) => m.id === detail.microId);
  const parentHref = `/services/${mainService.categorySlug}`;

  const relatedMainServices = detail.relatedMainCategoryIds
    .map((id) => MAIN_SERVICES.find((s) => s.id === id))
    .filter((s): s is (typeof MAIN_SERVICES)[number] => !!s);

  const relatedMicros = detail.relatedMicroIds
    .map((id) => {
      for (const s of MAIN_SERVICES) {
        const m = s.microServices.find((mm) => mm.id === id);
        if (m) return { micro: m, main: s };
      }
      return null;
    })
    .filter((x): x is { micro: (typeof MAIN_SERVICES)[number]["microServices"][number]; main: (typeof MAIN_SERVICES)[number] } => !!x);

  const featuredProjects = (detail.featuredProjectIds ?? [])
    .map((id) => FEATURED_PROJECTS.find((p) => p.id === id))
    .filter((p): p is (typeof FEATURED_PROJECTS)[number] => !!p);

  return (
    <>
      {detail.comingSoon && (
        <ComingSoonAutoOpen
          serviceName={microService?.title ?? detail.h1Lines[0].text}
          category={mainService.title}
        />
      )}

      {/* Breadcrumb + Hero */}
      <section className={styles.heroSection} aria-label={`${microService?.title ?? detail.h1Lines[0].text} introduction`}>
        <Container>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol className={styles.breadcrumbList}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-hidden="true"><ChevronRight size={14} strokeWidth={2} /></li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li aria-hidden="true"><ChevronRight size={14} strokeWidth={2} /></li>
              <li>
                <Link href={parentHref}>{mainService.title}</Link>
              </li>
              <li aria-hidden="true"><ChevronRight size={14} strokeWidth={2} /></li>
              <li aria-current="page">{microService?.title ?? detail.h1Lines[0].text}</li>
            </ol>
          </nav>

          <div className={styles.heroGrid}>
            <div>
              <div className={styles.eyebrowRow}>
                <span className={styles.eyebrowLine} aria-hidden="true" />
                <span className={styles.eyebrow}>{detail.eyebrow}</span>
              </div>

              <h1 className={styles.headline}>
                {detail.h1Lines.map((line) => (
                  <span
                    key={line.text}
                    className={`${styles.headlineLine} ${line.orange ? styles.orangeText : ""}`}
                  >
                    {line.text}
                  </span>
                ))}
              </h1>

              <p className={styles.description}>{detail.heroDescription}</p>

              <div className={styles.ctaGroup}>
                <MagneticButton maxMovement={8}>
                  <Button href="/#contact" variant="primary" icon={<ArrowRight size={16} />}>
                    Start Your Project
                  </Button>
                </MagneticButton>
                <MagneticButton maxMovement={6}>
                  <Button href="/#work" variant="secondary">
                    View Our Work
                  </Button>
                </MagneticButton>
              </div>
            </div>

            <div className={styles.heroVisual} aria-hidden="true">
              <ServiceVisual visualId={detail.visualId} />
            </div>
          </div>
        </Container>
      </section>

      {/* Parent context: sibling micro-services */}
      <section className={styles.siblingSection} aria-label={`Other ${mainService.title} services`}>
        <Container>
          <Link href={parentHref} className={styles.backLink}>
            <ArrowLeft size={15} strokeWidth={2} />
            <span>Back to {mainService.title}</span>
          </Link>
          <div className={styles.siblingScroller}>
            {mainService.microServices.map((m) => {
              const isCurrent = m.id === detail.microId;
              return !isCurrent ? (
                <Link
                  key={m.id}
                  href={`/services/${mainService.categorySlug}/${m.id}`}
                  className={styles.siblingPill}
                >
                  {m.title}
                </Link>
              ) : (
                <span key={m.id} className={`${styles.siblingPill} ${styles.siblingPillActive}`}>
                  {m.title}
                </span>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Service Overview */}
      <section className={styles.overviewSection} aria-label="About this service">
        <Container>
          <Reveal className={styles.overviewInner}>
            <div className={sharedStyles.eyebrowRow}>
              <span className={sharedStyles.eyebrowLine} aria-hidden="true" />
              <span className={sharedStyles.eyebrow}>ABOUT THIS SERVICE</span>
            </div>
            <h2 className={styles.sectionHeadline}>Built Around What Your Business Needs.</h2>
            <p className={styles.overviewText}>{detail.overview}</p>
          </Reveal>
        </Container>
      </section>

      {/* What We Deliver */}
      {detail.deliverables && detail.deliverables.length > 0 && (
        <section className={styles.deliverSection} aria-label="What we deliver">
          <Container>
            <Reveal className={styles.sectionHeaderCenter}>
              <span className={sharedStyles.eyebrow}>WHAT WE DELIVER</span>
            </Reveal>
            <div className={styles.deliverGrid}>
              {detail.deliverables.map((item, index) => (
                <div key={item.title} className={styles.deliverCard}>
                  <div className={styles.deliverTop}>
                    <span className={styles.deliverIcon} aria-hidden="true">
                      {DELIVERABLE_ICONS[item.iconName]}
                    </span>
                    <span className={styles.deliverNumber}>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className={styles.deliverTitle}>{item.title}</h3>
                  <p className={styles.deliverDesc}>{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Why It Matters */}
      {detail.benefits && detail.benefits.length > 0 && (
        <section className={styles.benefitsSection} aria-label="Why it matters">
          <Container>
            <Reveal className={styles.sectionHeaderCenter}>
              <span className={sharedStyles.eyebrow}>WHY IT MATTERS</span>
            </Reveal>
            <div className={styles.benefitsGrid}>
              {detail.benefits.map((benefit) => (
                <div key={benefit} className={styles.benefitItem}>
                  <CheckCircle2 size={18} strokeWidth={2} className={styles.benefitIcon} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Capabilities */}
      {detail.capabilities && detail.capabilities.length > 0 && (
        <section className={styles.chipsSection} aria-label="Core capabilities">
          <Container>
            <span className={styles.chipsLabel}>CORE CAPABILITIES</span>
            <div className={styles.chipsRow}>
              {detail.capabilities.map((cap) => (
                <span key={cap} className={styles.chip}>{cap}</span>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Process */}
      <Process
        eyebrow="HOW WE WORK"
        heading={
          <>
            A Clear Process. <br />
            <span className="highlight-orange">No Guesswork.</span>
          </>
        }
        subtitle="A simple, transparent process that keeps you involved at every step."
        steps={PROCESS_STEPS_DEFAULT}
      />

      {/* Technology */}
      {detail.technologies.length > 0 && (
        <section className={styles.chipsSection} aria-label="Technology">
          <Container>
            <span className={styles.chipsLabel}>TECHNOLOGY</span>
            <div className={styles.chipsRow}>
              {detail.technologies.map((tech) => (
                <span key={tech} className={styles.chip}>{tech}</span>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Use Cases */}
      {detail.useCases && detail.useCases.length > 0 && (
        <section className={styles.chipsSection} aria-label="Who this is for">
          <Container>
            <span className={styles.chipsLabel}>WHO IS THIS FOR?</span>
            <div className={styles.chipsRow}>
              {detail.useCases.map((useCase) => (
                <span key={useCase} className={styles.chip}>{useCase}</span>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Featured Work (only if genuinely relevant projects exist) */}
      {featuredProjects.length > 0 && (
        <FeaturedWork
          projects={featuredProjects}
          sectionId={`${detail.microId}-work`}
        />
      )}

      {/* Related Services */}
      {relatedMainServices.length > 0 && (
        <section className={styles.relatedSection} aria-label="Related services">
          <Container>
            <Reveal className={styles.sectionHeaderCenter}>
              <span className={sharedStyles.eyebrow}>RELATED SERVICES</span>
            </Reveal>
            <div className={styles.relatedGrid}>
              {relatedMainServices.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.categorySlug}`}
                  className={styles.relatedCard}
                >
                  <span>{s.title}</span>
                  <ArrowRight size={16} strokeWidth={2} />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* You May Also Need */}
      {relatedMicros.length > 0 && (
        <section className={styles.relatedSection} aria-label="You may also need">
          <Container>
            <Reveal className={styles.sectionHeaderCenter}>
              <span className={sharedStyles.eyebrow}>YOU MAY ALSO NEED</span>
            </Reveal>
            <div className={styles.microGrid}>
              {relatedMicros.map(({ micro, main }) => (
                <ServiceDetailCard
                  key={micro.id}
                  icon={resolveIcon(micro.title)}
                  title={micro.title}
                  description={micro.description}
                  href={`/services/${main.categorySlug}/${micro.id}`}
                  comingSoon={micro.comingSoon}
                  category={main.title}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Testimonials + FAQ (same side-by-side component used on the homepage) */}
      <WebDevTestimonialsFaq faqItems={detail.faqs} faqTitle="Your Questions, Answered." />

      {/* CTA */}
      <ServiceCtaBanner
        ariaLabel={`Start your ${microService?.title ?? ""} project`}
        eyebrow={detail.cta.eyebrow}
        headlineLines={detail.cta.headlineLines}
        description={detail.cta.description}
        primaryCta={{ label: detail.cta.primaryLabel, href: "/#contact" }}
      />
    </>
  );
}
