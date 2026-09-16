import React from "react";
import {
  Globe2,
  Building2,
  BriefcaseBusiness,
  PanelsTopLeft,
  Code2,
  Atom,
  Server,
  ServerCog,
  AppWindow,
  Layers,
  Webhook,
  Braces,
  PlugZap,
  FileCog,
  ArrowRightLeft,
  Gauge,
  CalendarCheck,
  Store,
  FileText,
  Smartphone,
  Bot,
  MessageCircle,
  Sparkles,
  Search,
  Settings2,
  MapPin,
  ChartNoAxesCombined,
  Shapes,
  PenTool,
  UsersRound,
  UserPlus,
  Workflow,
  Zap,
  ShoppingCart,
  LayoutDashboard,
  Database,
  Bell,
  CloudCog,
} from "lucide-react";

/** Exact-title icon overrides for the Web Development catalogue (PRD §5) — checked before the heuristic fallback below. */
function resolveExactIcon(title: string, props: { size: number; strokeWidth: number }): React.ReactNode | null {
  switch (title) {
    case "Business Websites":
      return <Globe2 {...props} />;
    case "Corporate Websites":
      return <Building2 {...props} />;
    case "Agency Websites":
      return <BriefcaseBusiness {...props} />;
    case "Landing Pages":
      return <PanelsTopLeft {...props} />;
    case "Next.js Development":
      return <Code2 {...props} />;
    case "React Development":
      return <Atom {...props} />;
    case "Laravel Development":
      return <Server {...props} />;
    case "Node.js Development":
      return <ServerCog {...props} />;
    case "Custom Web Applications":
      return <AppWindow {...props} />;
    case "SaaS Platforms":
      return <CloudCog {...props} />;
    case "Customer Portals":
      return <UsersRound {...props} />;
    case "Admin Dashboards":
      return <LayoutDashboard {...props} />;
    case "Booking Platforms":
      return <CalendarCheck {...props} />;
    case "Marketplace Development":
      return <Store {...props} />;
    case "API Development":
      return <Braces {...props} />;
    case "Third-party API Integration":
      return <PlugZap {...props} />;
    case "CMS Development":
      return <FileCog {...props} />;
    case "Website Migration":
      return <ArrowRightLeft {...props} />;
    case "Website Optimization":
      return <Gauge {...props} />;
    default:
      return null;
  }
}

/**
 * Resolves a reasonable, non-repetitive Lucide icon per micro-service from its title.
 * Plain server-safe function (no "use client") so both server and client card
 * components can call it without crossing the server/client boundary.
 */
export function resolveIcon(title: string): React.ReactNode {
  const props = { size: 24, strokeWidth: 1.85 as const };

  const exact = resolveExactIcon(title, props);
  if (exact) return exact;

  const t = title.toLowerCase();

  if (t.includes("next.js")) return <Code2 {...props} />;
  if (t.includes("react native") || t.includes("expo")) return <Smartphone {...props} />;
  if (t.includes("react")) return <Atom {...props} />;
  if (t.includes("laravel") || t.includes("node.js")) return <Layers {...props} />;
  if (t.includes("api")) return <Webhook {...props} />;
  if (t.includes("cms")) return <FileText {...props} />;
  if (t.includes("chatbot") || t.includes("chat")) return <MessageCircle {...props} />;
  if (t.includes("agent") || t.includes("recommendation")) return <Sparkles {...props} />;
  if (t.includes("ai ") || t.startsWith("ai") || t.includes(" ai")) return <Bot {...props} />;
  if (t.includes("local seo")) return <MapPin {...props} />;
  if (t.includes("seo") || t.includes("search")) return <Search {...props} />;
  if (t.includes("technical") || t.includes("audit") || t.includes("schema")) return <Settings2 {...props} />;
  if (t.includes("analytics") || t.includes("reporting") || t.includes("conversion")) return <ChartNoAxesCombined {...props} />;
  if (t.includes("logo")) return <PenTool {...props} />;
  if (t.includes("brand") || t.includes("identity") || t.includes("color") || t.includes("typography")) return <Shapes {...props} />;
  if (t.includes("crm")) return <UsersRound {...props} />;
  if (t.includes("lead")) return <UserPlus {...props} />;
  if (t.includes("workflow") || t.includes("process")) return <Workflow {...props} />;
  if (t.includes("automation") || t.includes("follow-up") || t.includes("appointment")) return <Zap {...props} />;
  if (t.includes("notification")) return <Bell {...props} />;
  if (t.includes("sheets") || t.includes("database") || t.includes("data")) return <Database {...props} />;
  if (t.includes("dashboard") || t.includes("admin panel") || t.includes("portal")) return <LayoutDashboard {...props} />;
  if (t.includes("ecommerce") || t.includes("e-commerce") || t.includes("marketplace") || t.includes("booking")) return <ShoppingCart {...props} />;
  if (t.includes("landing")) return <PanelsTopLeft {...props} />;
  if (t.includes("corporate") || t.includes("agency")) return <Building2 {...props} />;
  if (t.includes("saas") || t.includes("cloud") || t.includes("deploy") || t.includes("optimization") || t.includes("migration")) return <CloudCog {...props} />;
  if (t.includes("website") || t.includes("web")) return <Globe2 {...props} />;
  if (t.includes("mobile") || t.includes("app") || t.includes("android") || t.includes("ios")) return <Smartphone {...props} />;
  if (t.includes("design") || t.includes("ui") || t.includes("ux") || t.includes("wireframe") || t.includes("prototyp")) return <PenTool {...props} />;

  return <Sparkles {...props} />;
}
