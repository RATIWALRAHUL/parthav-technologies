import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { WEB_DEV_FAQ } from "@/data/web-development";
import type { FAQItem } from "@/data/faq";
// Reuses the exact same side-by-side grid as the homepage's Testimonials + FAQ section.
import styles from "@/components/home/SocialProofFaq.module.css";

interface WebDevTestimonialsFaqProps {
  faqItems?: FAQItem[];
  faqTitle?: string;
}

export function WebDevTestimonialsFaq({
  faqItems = WEB_DEV_FAQ,
  faqTitle = "Your Questions, Answered.",
}: WebDevTestimonialsFaqProps) {
  return (
    <section className={styles.section} aria-label="Client testimonials and frequently asked questions">
      <Container>
        <div className={styles.grid}>
          <Reveal direction="up" delay={0.1}>
            <Testimonials />
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <FAQ
              eyebrow="FREQUENTLY ASKED QUESTIONS"
              title={faqTitle}
              items={faqItems}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
