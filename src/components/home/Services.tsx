import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingCart,
  Cloud,
  Code2,
  LayoutDashboard,
  Plug,
  Server,
  BarChart3,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CAPABILITY_CHIPS } from "@/data/services";
import { ServicesCarousel } from "./ServicesCarousel";
import styles from "./Services.module.css";

const CHIP_ICONS: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart size={14} />,
  Cloud: <Cloud size={14} />,
  Code2: <Code2 size={14} />,
  LayoutDashboard: <LayoutDashboard size={14} />,
  Plug: <Plug size={14} />,
  Server: <Server size={14} />,
  BarChart3: <BarChart3 size={14} />,
  TrendingUp: <TrendingUp size={14} />,
  ShieldCheck: <ShieldCheck size={14} />,
};

export function Services() {
  return (
    <section id="services" className={styles.servicesSection} aria-label="Our Digital Capabilities">
      <Container>
        <ServicesCarousel />

        {/* Additional Capabilities Chips */}
        <div className={styles.capabilitiesBox}>
          <span className={styles.capabilitiesLabel}>ADDITIONAL CAPABILITIES</span>
          <div className={styles.chipsRow}>
            {CAPABILITY_CHIPS.map((chip) => (
              <div key={chip.label} className={styles.chip}>
                <span className={styles.chipIcon} aria-hidden="true">
                  {CHIP_ICONS[chip.iconName]}
                </span>
                <span>{chip.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.viewAllRow}>
          <Link href="/services" className={styles.viewAllLink} id="services-view-all-btn">
            <span>View All Services</span>
            <ArrowRight size={16} strokeWidth={2} className={styles.viewAllArrow} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
