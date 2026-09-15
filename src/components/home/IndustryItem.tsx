import React from "react";
import type { LucideIcon } from "lucide-react";
import type { IndustryItem as IndustryItemData } from "@/data/industries";
import styles from "./IndustriesWeServe.module.css";

interface IndustryItemProps {
  industry: IndustryItemData;
  icon: LucideIcon;
}

export function IndustryItem({ industry, icon: Icon }: IndustryItemProps) {
  return (
    <div className={styles.item}>
      <span
        className={styles.iconTile}
        style={{ backgroundColor: industry.background }}
      >
        <Icon
          size={22}
          strokeWidth={1.75}
          color={industry.accent}
          aria-hidden="true"
        />
      </span>
      <span className={styles.label}>{industry.name}</span>
    </div>
  );
}
