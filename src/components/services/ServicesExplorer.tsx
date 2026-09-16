"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  LayoutGrid,
  PenTool,
  Code2,
  Bot,
  TrendingUp,
  Shapes,
  Workflow,
  Headphones,
  MonitorSmartphone,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MAIN_SERVICES } from "@/data/main-services";
import { SERVICE_CATEGORIES, type ServiceCategoryNavItem } from "@/data/service-categories";
import { MainServiceCard } from "./MainServiceCard";
import { MicroServicesPanel } from "./MicroServicesPanel";
import styles from "./ServicesExplorer.module.css";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid size={17} strokeWidth={1.85} />,
  PenTool: <PenTool size={17} strokeWidth={1.85} />,
  Code2: <Code2 size={17} strokeWidth={1.85} />,
  Bot: <Bot size={17} strokeWidth={1.85} />,
  TrendingUp: <TrendingUp size={17} strokeWidth={1.85} />,
  Shapes: <Shapes size={17} strokeWidth={1.85} />,
  Workflow: <Workflow size={17} strokeWidth={1.85} />,
  Headphones: <Headphones size={17} strokeWidth={1.85} />,
};

const MAIN_ICONS: Record<string, React.ReactNode> = {
  PenTool: <PenTool size={24} strokeWidth={1.85} />,
  MonitorSmartphone: <MonitorSmartphone size={24} strokeWidth={1.85} />,
  Bot: <Bot size={24} strokeWidth={1.85} />,
  TrendingUp: <TrendingUp size={24} strokeWidth={1.85} />,
  Shapes: <Shapes size={24} strokeWidth={1.85} />,
  Workflow: <Workflow size={24} strokeWidth={1.85} />,
};

export function ServicesExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Deep-link support: /services?service=ui-ux pre-selects that service on load.
  useEffect(() => {
    const param = searchParams.get("service");
    if (param && MAIN_SERVICES.some((s) => s.id === param)) {
      setSelectedId(param);
    }
  }, [searchParams]);

  const selectService = useCallback(
    (id: string | null) => {
      setSelectedId(id);
      const params = new URLSearchParams(searchParams.toString());
      if (id) {
        params.set("service", id);
      } else {
        params.delete("service");
      }
      const query = params.toString();
      router.replace(query ? `/services?${query}` : "/services", { scroll: false });
    },
    [router, searchParams]
  );

  const activeCategory: ServiceCategoryNavItem["id"] = selectedId
    ? (MAIN_SERVICES.find((s) => s.id === selectedId)?.categoryId as ServiceCategoryNavItem["id"]) ?? "all"
    : "all";

  const handleCategoryClick = (categoryId: ServiceCategoryNavItem["id"]) => {
    if (categoryId === "all") {
      selectService(null);
      return;
    }
    const match = MAIN_SERVICES.find((s) => s.categoryId === categoryId);
    selectService(match ? match.id : null);
  };

  const selectedService = selectedId ? MAIN_SERVICES.find((s) => s.id === selectedId) ?? null : null;
  const noDirectServiceForCategory = activeCategory === "support";

  return (
    <>
      {/* Category Navigation */}
      <section className={styles.categorySection} aria-label="Filter services by category">
        <Container>
          <div className={styles.categoryScroller} role="tablist" aria-label="Service categories">
            {SERVICE_CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="services-panel"
                  tabIndex={isActive ? 0 : -1}
                  className={`${styles.categoryPill} ${isActive ? styles.categoryPillActive : ""}`}
                  onClick={() => handleCategoryClick(category.id)}
                  onKeyDown={(e) => {
                    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                    e.preventDefault();
                    const ids = SERVICE_CATEGORIES.map((c) => c.id);
                    const currentIndex = ids.indexOf(activeCategory);
                    const delta = e.key === "ArrowRight" ? 1 : -1;
                    const nextId = ids[(currentIndex + delta + ids.length) % ids.length];
                    handleCategoryClick(nextId);
                    const nextButton = e.currentTarget
                      .closest('[role="tablist"]')
                      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[
                      (currentIndex + delta + ids.length) % ids.length
                    ];
                    nextButton?.focus();
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="categoryActiveBg"
                      className={styles.categoryPillBg}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span className={styles.categoryPillContent} aria-hidden="true">
                    {CATEGORY_ICONS[category.iconName]}
                  </span>
                  <span className={styles.categoryPillContent}>{category.label}</span>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Core Services */}
      <section
        id="services"
        className={styles.coreSection}
        aria-label="Core services"
        role="tabpanel"
      >
        <Container id="services-panel">
          {!selectedService && (
            <div className={styles.headerRow}>
              <Reveal className={styles.headerLeft}>
                <div className={styles.eyebrowRow}>
                  <span className={styles.eyebrowLine} aria-hidden="true" />
                  <span className={styles.eyebrow}>OUR SERVICES</span>
                </div>
                <h2 className={styles.headline}>
                  <span className={styles.navyText}>Six core services.</span>
                  <br />
                  <span className={styles.orangeText}>Infinite possibilities.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1} className={styles.headerRight}>
                <p className={styles.subtitle}>
                  Choose a service to explore how we can help your business
                  design, build, automate and grow.
                </p>
              </Reveal>
            </div>
          )}

          <AnimatePresence mode="wait">
            {selectedService ? (
              <MicroServicesPanel
                key={selectedService.id}
                service={selectedService}
                onBack={() => selectService(null)}
              />
            ) : (
              <motion.div
                key="all-services"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.grid}>
                  {MAIN_SERVICES.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <MainServiceCard
                        id={service.id}
                        number={service.number}
                        icon={MAIN_ICONS[service.iconName]}
                        title={service.title}
                        description={service.description}
                        serviceCount={service.microServices.length}
                        isSelected={false}
                        onSelect={() => selectService(service.id)}
                      />
                    </motion.div>
                  ))}
                </div>

                {noDirectServiceForCategory && (
                  <p className={styles.emptyNote} role="status">
                    Support is woven into every engagement — here are the six core services it complements.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>
    </>
  );
}
