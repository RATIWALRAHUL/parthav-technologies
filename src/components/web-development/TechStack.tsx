import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { TECH_STACK } from "@/data/web-development";
import { TechLogo } from "@/components/common/TechLogo";
// Reuses the exact section-header styles from the main Services page.
import sharedStyles from "@/components/services/ServicesExplorer.module.css";
import styles from "./TechStack.module.css";

interface TechStackProps {
  technologies?: string[];
  eyebrow?: string;
  headlineLines?: { text: string; orange?: boolean }[];
  subtitle?: string;
}

export function TechStack({
  technologies = TECH_STACK.map((t) => t.name),
  eyebrow = "TECHNOLOGIES WE WORK WITH",
  headlineLines = [{ text: "Modern Tech for" }, { text: "Modern Solutions." }],
  subtitle = "We use industry-leading technologies to build fast, secure and future-ready applications.",
}: TechStackProps) {
  return (
    <section className={styles.section} aria-label="Technologies we work with">
      <Container>
        <div className={sharedStyles.headerRow}>
          <Reveal className={sharedStyles.headerLeft}>
            <div className={sharedStyles.eyebrowRow}>
              <span className={sharedStyles.eyebrowLine} aria-hidden="true" />
              <span className={sharedStyles.eyebrow}>{eyebrow}</span>
            </div>
            <h2 className={sharedStyles.headline}>
              {headlineLines.map((line, i) => (
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
            <p className={sharedStyles.subtitle}>{subtitle}</p>
            <Link href="/#contact" className={sharedStyles.viewAllLink}>
              <span>View Our Tech Stack</span>
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </Reveal>
        </div>

        <div className={styles.techRow}>
          {technologies.map((name) => (
            <div key={name} className={styles.techCard}>
              <span className={styles.techMark} aria-hidden="true">
                <TechLogo name={name} size={22} />
              </span>
              <span className={styles.techName}>{name}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
