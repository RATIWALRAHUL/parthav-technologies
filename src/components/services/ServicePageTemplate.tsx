import React from "react";
import {
  Compass,
  Users,
  Layers,
  Bot,
  Workflow,
  Settings2,
  Search,
  TrendingUp,
  Shapes,
  Zap,
  UsersRound,
  Sparkles,
  Gauge,
  Building2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceHeroTemplate } from "@/components/services/ServiceHeroTemplate";
import { ServiceCategoryNav } from "@/components/services/ServiceCategoryNav";
import { MicroServiceGrid } from "@/components/services/MicroServiceGrid";
import { TechStack } from "@/components/web-development/TechStack";
import { Process } from "@/components/home/Process";
import { FeaturedWork } from "@/components/web-development/FeaturedWork";
import { RelatedServicesSection } from "@/components/services/RelatedServicesSection";
import { ServiceCtaBanner } from "@/components/services/ServiceCtaBanner";
import { WebDevTestimonialsFaq } from "@/components/web-development/WebDevTestimonialsFaq";
import { FinalCTA } from "@/components/home/FinalCTA";
import { MAIN_SERVICES } from "@/data/main-services";
import { FEATURED_PROJECTS } from "@/data/projects";
import type { ServicePageData } from "@/data/service-pages";
import sharedStyles from "@/components/services/ServicesExplorer.module.css";

const HERO_BENEFIT_ICONS: Record<string, React.ReactNode> = {
  Compass: <Compass size={18} strokeWidth={1.85} />,
  Users: <Users size={18} strokeWidth={1.85} />,
  Layers: <Layers size={18} strokeWidth={1.85} />,
  Bot: <Bot size={18} strokeWidth={1.85} />,
  Workflow: <Workflow size={18} strokeWidth={1.85} />,
  Settings2: <Settings2 size={18} strokeWidth={1.85} />,
  Search: <Search size={18} strokeWidth={1.85} />,
  TrendingUp: <TrendingUp size={18} strokeWidth={1.85} />,
  Shapes: <Shapes size={18} strokeWidth={1.85} />,
  Zap: <Zap size={18} strokeWidth={1.85} />,
  UsersRound: <UsersRound size={18} strokeWidth={1.85} />,
  Sparkles: <Sparkles size={18} strokeWidth={1.85} />,
  Gauge: <Gauge size={18} strokeWidth={1.85} />,
  Building2: <Building2 size={18} strokeWidth={1.85} />,
};

export function ServicePageTemplate({ data }: { data: ServicePageData }) {
  const mainService = MAIN_SERVICES.find((s) => s.id === data.mainId);
  if (!mainService) return null;

  const featuredProjects = data.featuredProjectIds
    .map((id) => FEATURED_PROJECTS.find((p) => p.id === id))
    .filter((p): p is (typeof FEATURED_PROJECTS)[number] => !!p);

  return (
    <>
      <ServiceHeroTemplate
        ariaLabel={`${mainService.title} introduction`}
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: mainService.title },
        ]}
        eyebrow={data.eyebrow}
        headlineLines={data.headlineLines}
        description={data.heroDescription}
        primaryCta={data.primaryCta}
        secondaryCta={data.secondaryCta}
        benefits={data.heroBenefits.map((b) => ({
          label: b.label,
          icon: HERO_BENEFIT_ICONS[b.iconName] ?? <Sparkles size={18} strokeWidth={1.85} />,
        }))}
        imageSrc="/images/heroservice.png"
        floatingBadgeText={mainService.title}
      />

      <ServiceCategoryNav activeId={mainService.id} />

      <section id="services" className={sharedStyles.coreSection} aria-label={`Our ${mainService.title} services`}>
        <Container>
          <div className={sharedStyles.headerRow}>
            <Reveal className={sharedStyles.headerLeft}>
              <div className={sharedStyles.eyebrowRow}>
                <span className={sharedStyles.eyebrowLine} aria-hidden="true" />
                <span className={sharedStyles.eyebrow}>{data.microEyebrow}</span>
              </div>
              <h2 className={sharedStyles.headline}>
                {data.microHeadlineLines.map((line, i) => (
                  <React.Fragment key={line.text}>
                    {i > 0 && <br />}
                    <span className={line.orange ? sharedStyles.orangeText : sharedStyles.navyText}>
                      {line.text}
                    </span>
                  </React.Fragment>
                ))}
              </h2>
            </Reveal>

            <Reveal delay={0.1} className={sharedStyles.headerRight}>
              <p className={sharedStyles.subtitle}>{data.microDescription}</p>
            </Reveal>
          </div>

          <MicroServiceGrid
            microServices={mainService.microServices}
            categorySlug={mainService.categorySlug}
            categoryLabel={mainService.title}
          />
        </Container>
      </section>

      <TechStack
        technologies={data.technologies}
        eyebrow="TECHNOLOGIES WE WORK WITH"
        headlineLines={[{ text: "Modern Tech for" }, { text: "Modern Solutions." }]}
        subtitle="We use industry-leading technologies suited to this service."
      />

      <Process
        eyebrow="OUR PROCESS"
        heading={
          <>
            {data.processHeadlineLines.map((line, i) => (
              <React.Fragment key={line.text}>
                {i > 0 && <br />}
                <span className={line.orange ? "highlight-orange" : undefined}>{line.text}</span>
              </React.Fragment>
            ))}
          </>
        }
        subtitle={data.processSubtitle}
        steps={data.processSteps}
        cta={{ label: "Learn More About Our Process", href: "/#process" }}
      />

      <FeaturedWork
        projects={featuredProjects}
        sectionId={`${data.slug}-work`}
        headlineLines={[{ text: "Real Projects." }, { text: "Real Impact.", orange: true }]}
        subtitle={`Explore selected ${mainService.title.toLowerCase()} projects.`}
      />

      <RelatedServicesSection relatedIds={data.relatedServiceIds} />

      <ServiceCtaBanner
        ariaLabel={`Start your ${mainService.title} project`}
        eyebrow={data.cta.eyebrow}
        headlineLines={data.cta.headlineLines}
        description={data.cta.description}
        primaryCta={{ label: data.cta.primaryLabel, href: "/#contact" }}
      />

      <WebDevTestimonialsFaq faqItems={data.faq} />

      <FinalCTA />
    </>
  );
}
