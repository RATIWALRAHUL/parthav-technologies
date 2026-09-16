import React from "react";
import { ArrowRight } from "lucide-react";
import styles from "./MainServiceCard.module.css";

interface MainServiceCardProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  serviceCount: number;
  isSelected: boolean;
  onSelect: () => void;
  id?: string;
}

export function MainServiceCard({
  number,
  icon,
  title,
  description,
  serviceCount,
  isSelected,
  onSelect,
  id,
}: MainServiceCardProps) {
  return (
    <button
      type="button"
      id={id}
      className={`${styles.card} ${isSelected ? styles.cardSelected : ""}`}
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      <div className={styles.cardTop}>
        <span className={styles.iconWrapper} aria-hidden="true">
          {icon}
        </span>
        <span className={styles.numberBadge}>{number}</span>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles.footer}>
        <span className={styles.countText}>{serviceCount} Services</span>
        <span className={styles.exploreLink}>
          <span>Explore Services</span>
          <ArrowRight size={15} strokeWidth={2} className={styles.exploreArrow} />
        </span>
      </div>

      {isSelected && (
        <span className={styles.selectedBadge} aria-hidden="true">
          Selected
        </span>
      )}
    </button>
  );
}
