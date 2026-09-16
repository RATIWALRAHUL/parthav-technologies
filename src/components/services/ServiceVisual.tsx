import React from "react";
import {
  ArrowUpRight,
  Bot,
  Search,
  Palette,
  GitBranch,
  BarChart3,
  Sparkles,
} from "lucide-react";
import styles from "./ServiceVisual.module.css";

interface ServiceVisualProps {
  visualId: string;
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.browserFrame}>
      <div className={styles.browserBar}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.browserBody}>{children}</div>
    </div>
  );
}

function DesignVisual() {
  return (
    <>
      <BrowserFrame>
        <div className={styles.designSwatchRow}>
          <span className={`${styles.swatch} ${styles.swatchNavy}`} />
          <span className={`${styles.swatch} ${styles.swatchOrange}`} />
          <span className={`${styles.swatch} ${styles.swatchLight}`} />
        </div>
        <div className={styles.designFrameBlock} />
        <div className={styles.lineWide} />
        <div className={styles.lineNarrow} />
      </BrowserFrame>
      <div className={`${styles.floatingBadge} ${styles.badgeTopRight}`}>
        <Palette size={14} strokeWidth={2} />
        <span>Design Systems</span>
      </div>
      <div className={`${styles.floatingBadge} ${styles.badgeBottomLeft}`}>
        <ArrowUpRight size={14} strokeWidth={2} />
        <span>User Engagement</span>
      </div>
    </>
  );
}

function DevelopmentVisual() {
  return (
    <>
      <BrowserFrame>
        <div className={styles.codeLine} style={{ width: "78%" }} />
        <div className={styles.codeLine} style={{ width: "55%" }} />
        <div className={styles.codeLine} style={{ width: "68%" }} />
        <div className={styles.codeLine} style={{ width: "40%" }} />
      </BrowserFrame>
      <div className={styles.phoneMock}>
        <div className={styles.phoneMockBar} />
        <div className={styles.phoneMockBlock} />
        <div className={styles.phoneMockLine} />
        <div className={styles.phoneMockLine} />
      </div>
      <div className={`${styles.floatingBadge} ${styles.badgeTopRight}`}>
        <Sparkles size={14} strokeWidth={2} />
        <span>Responsive Build</span>
      </div>
    </>
  );
}

function AiVisual() {
  return (
    <>
      <BrowserFrame>
        <svg viewBox="0 0 260 140" className={styles.nodeGraph} aria-hidden="true">
          <line x1="30" y1="100" x2="120" y2="40" className={styles.nodeLine} />
          <line x1="120" y1="40" x2="220" y2="70" className={styles.nodeLine} />
          <line x1="120" y1="40" x2="90" y2="110" className={styles.nodeLine} />
          <circle cx="30" cy="100" r="9" className={styles.nodeDotBlue} />
          <circle cx="120" cy="40" r="12" className={styles.nodeDotOrange} />
          <circle cx="220" cy="70" r="9" className={styles.nodeDotBlue} />
          <circle cx="90" cy="110" r="9" className={styles.nodeDotBlue} />
        </svg>
      </BrowserFrame>
      <div className={`${styles.floatingBadge} ${styles.badgeTopRight}`}>
        <Bot size={14} strokeWidth={2} />
        <span>AI Agents</span>
      </div>
      <div className={`${styles.floatingBadge} ${styles.badgeBottomLeft}`}>
        <Sparkles size={14} strokeWidth={2} />
        <span>Workflow Automation</span>
      </div>
    </>
  );
}

function SeoVisual() {
  return (
    <>
      <BrowserFrame>
        <div className={styles.searchBar}>
          <Search size={13} strokeWidth={2} />
          <span>parthavtechnologies.com</span>
        </div>
        <div className={styles.barChartRow}>
          <span style={{ height: "38%" }} />
          <span style={{ height: "58%" }} />
          <span style={{ height: "46%" }} />
          <span style={{ height: "78%" }} />
          <span style={{ height: "92%" }} />
        </div>
      </BrowserFrame>
      <div className={`${styles.floatingBadge} ${styles.badgeTopRight}`}>
        <BarChart3 size={14} strokeWidth={2} />
        <span>Search Visibility</span>
      </div>
    </>
  );
}

function BrandingVisual() {
  return (
    <>
      <BrowserFrame>
        <div className={styles.brandGrid}>
          <span className={styles.brandMonogram}>P</span>
          <span className={`${styles.swatch} ${styles.swatchNavy}`} />
          <span className={`${styles.swatch} ${styles.swatchOrange}`} />
          <span className={`${styles.swatch} ${styles.swatchLight}`} />
        </div>
        <div className={styles.lineWide} />
        <div className={styles.lineNarrow} />
      </BrowserFrame>
      <div className={`${styles.floatingBadge} ${styles.badgeTopRight}`}>
        <Palette size={14} strokeWidth={2} />
        <span>Visual Identity</span>
      </div>
    </>
  );
}

function CrmVisual() {
  return (
    <>
      <BrowserFrame>
        <div className={styles.pipelineRow}>
          <div className={styles.pipelineCol}>
            <span className={styles.pipelineCard} />
            <span className={styles.pipelineCard} />
          </div>
          <div className={styles.pipelineCol}>
            <span className={styles.pipelineCard} />
          </div>
          <div className={styles.pipelineCol}>
            <span className={`${styles.pipelineCard} ${styles.pipelineCardOrange}`} />
          </div>
        </div>
      </BrowserFrame>
      <div className={`${styles.floatingBadge} ${styles.badgeTopRight}`}>
        <GitBranch size={14} strokeWidth={2} />
        <span>Lead Pipeline</span>
      </div>
    </>
  );
}

const VISUALS: Record<string, React.ComponentType> = {
  "ui-ux": DesignVisual,
  "web-mobile-dev": DevelopmentVisual,
  "ai-automation": AiVisual,
  "seo-growth": SeoVisual,
  "branding-identity": BrandingVisual,
  "crm-automation": CrmVisual,
};

export function ServiceVisual({ visualId }: ServiceVisualProps) {
  const Visual = VISUALS[visualId] ?? DesignVisual;
  return (
    <div className={styles.stage} aria-hidden="true">
      <Visual />
    </div>
  );
}
