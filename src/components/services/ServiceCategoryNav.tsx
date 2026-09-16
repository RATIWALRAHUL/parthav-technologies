import React from "react";
import Link from "next/link";
import {
  Code2,
  PenTool,
  Smartphone,
  Bot,
  TrendingUp,
  Shapes,
  ShoppingCart,
  Workflow,
  MoreHorizontal,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
// Reuses the exact category-pill styles from the main Services page category nav.
import styles from "./ServicesExplorer.module.css";

const CATEGORIES = [
  { id: "web-mobile", label: "Web Development", href: "/services/web-development", icon: Code2 },
  { id: "ui-ux", label: "UI/UX Design", href: "/services/ui-ux-product-design", icon: PenTool },
  { id: "mobile-apps", label: "Mobile Apps", href: "/services/web-development#mobile", icon: Smartphone },
  { id: "ai-automation", label: "AI & Automation", href: "/services/ai-automation", icon: Bot },
  { id: "seo-growth", label: "SEO & Growth", href: "/services/seo-digital-growth", icon: TrendingUp },
  { id: "branding", label: "Branding", href: "/services/branding-digital-identity", icon: Shapes },
  { id: "ecommerce", label: "E-commerce", href: "/services", icon: ShoppingCart },
  { id: "crm-automation", label: "CRM & Automation", href: "/services/crm-business-automation", icon: Workflow },
  { id: "more", label: "More Services", href: "/services", icon: MoreHorizontal },
];

interface ServiceCategoryNavProps {
  activeId: string;
}

export function ServiceCategoryNav({ activeId }: ServiceCategoryNavProps) {
  return (
    <section className={styles.categorySection} aria-label="Browse other services">
      <Container>
        <div className={styles.categoryScroller} role="tablist" aria-label="Service categories">
          {CATEGORIES.map((category) => {
            const isActive = category.id === activeId;
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={category.href}
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? "page" : undefined}
                className={`${styles.categoryPill} ${isActive ? styles.categoryPillActive : ""}`}
              >
                {isActive && <span className={styles.categoryPillBg} />}
                <span className={styles.categoryPillContent} aria-hidden="true">
                  <Icon size={17} strokeWidth={1.85} />
                </span>
                <span className={styles.categoryPillContent}>{category.label}</span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
