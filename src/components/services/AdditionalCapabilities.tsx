import React from "react";
import {
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
import styles from "./AdditionalCapabilities.module.css";

const CHIP_ICONS: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart size={15} strokeWidth={1.85} />,
  Cloud: <Cloud size={15} strokeWidth={1.85} />,
  Code2: <Code2 size={15} strokeWidth={1.85} />,
  LayoutDashboard: <LayoutDashboard size={15} strokeWidth={1.85} />,
  Plug: <Plug size={15} strokeWidth={1.85} />,
  Server: <Server size={15} strokeWidth={1.85} />,
  BarChart3: <BarChart3 size={15} strokeWidth={1.85} />,
  TrendingUp: <TrendingUp size={15} strokeWidth={1.85} />,
  ShieldCheck: <ShieldCheck size={15} strokeWidth={1.85} />,
};

export function AdditionalCapabilities() {
  return (
    <section className={styles.section} aria-label="Additional capabilities">
      <Container>
        <span className={styles.label}>ADDITIONAL CAPABILITIES</span>
        <div className={styles.chipsRow}>
          {CAPABILITY_CHIPS.map((chip) => (
            <span key={chip.label} className={styles.chip}>
              <span className={styles.chipIcon} aria-hidden="true">
                {CHIP_ICONS[chip.iconName]}
              </span>
              {chip.label}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
