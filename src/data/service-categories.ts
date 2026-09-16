import type { ServiceCategoryId } from "./services";

export interface ServiceCategoryNavItem {
  id: ServiceCategoryId | "all" | "support";
  label: string;
  iconName: string;
}

export const SERVICE_CATEGORIES: ServiceCategoryNavItem[] = [
  { id: "all", label: "All Services", iconName: "LayoutGrid" },
  { id: "design", label: "Design", iconName: "PenTool" },
  { id: "development", label: "Development", iconName: "Code2" },
  { id: "ai", label: "AI & Automation", iconName: "Bot" },
  { id: "seo", label: "SEO & Growth", iconName: "TrendingUp" },
  { id: "branding", label: "Branding", iconName: "Shapes" },
  { id: "crm", label: "CRM & Automation", iconName: "Workflow" },
  { id: "support", label: "Support", iconName: "Headphones" },
];
