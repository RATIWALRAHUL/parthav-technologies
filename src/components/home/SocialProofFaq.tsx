"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import styles from "./SocialProofFaq.module.css";

export function SocialProofFaq() {
  return (
    <section className={styles.section} id="testimonials">
      <Container>
        <div className={styles.grid}>
          <Reveal direction="up" delay={0.1}>
            <Testimonials />
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <FAQ />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
