import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MAIN_SERVICES } from "@/data/main-services";
import sharedStyles from "./ServicesExplorer.module.css";
import styles from "./RelatedServicesSection.module.css";

interface RelatedServicesSectionProps {
  relatedIds: string[];
}

export function RelatedServicesSection({ relatedIds }: RelatedServicesSectionProps) {
  const related = relatedIds
    .map((id) => MAIN_SERVICES.find((s) => s.id === id))
    .filter((s): s is (typeof MAIN_SERVICES)[number] => !!s);

  if (related.length === 0) return null;

  return (
    <section className={styles.section} aria-label="Related services">
      <Container>
        <Reveal className={styles.header}>
          <span className={sharedStyles.eyebrow}>RELATED SERVICES</span>
        </Reveal>
        <div className={styles.grid}>
          {related.map((service) => (
            <Link key={service.id} href={`/services/${service.categorySlug}`} className={styles.card}>
              <span>{service.title}</span>
              <ArrowRight size={16} strokeWidth={2} className={styles.arrow} />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
