import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  PenTool,
  MonitorSmartphone,
  Bot,
  TrendingUp,
  Shapes,
  Workflow,
} from "lucide-react";
import type { ServiceItem } from "@/data/services";
import styles from "./Services.module.css";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  PenTool: <PenTool size={22} strokeWidth={1.85} />,
  MonitorSmartphone: <MonitorSmartphone size={22} strokeWidth={1.85} />,
  Bot: <Bot size={22} strokeWidth={1.85} />,
  TrendingUp: <TrendingUp size={22} strokeWidth={1.85} />,
  Shapes: <Shapes size={22} strokeWidth={1.85} />,
  Workflow: <Workflow size={22} strokeWidth={1.85} />,
};

export interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  isClone?: boolean;
}

export function ServiceCard({ service, isClone = false }: ServiceCardProps) {
  return (
    <article
      className={styles.serviceCard}
      aria-hidden={isClone ? "true" : undefined}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <span className={styles.cardNumber}>{service.number}</span>
          <div className={styles.iconContainer} aria-hidden="true">
            {SERVICE_ICONS[service.iconName] || <PenTool size={22} strokeWidth={1.85} />}
          </div>
        </div>

        <h3 className={styles.cardTitle}>{service.title}</h3>
        <p className={styles.cardDescription}>{service.description}</p>

        <ul className={styles.capabilityList} aria-label={`${service.title} capabilities`}>
          {service.capabilities.map((cap) => (
            <li key={cap} className={styles.capabilityPill}>
              {cap}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.cardFooter}>
        <Link
          href={service.href}
          className={styles.exploreCta}
          tabIndex={isClone ? -1 : 0}
          aria-label={`Explore ${service.title}`}
        >
          <span className={styles.exploreText}>Explore Service</span>
          <ArrowRight size={15} strokeWidth={2} className={styles.exploreArrow} />
        </Link>
      </div>
    </article>
  );
}
