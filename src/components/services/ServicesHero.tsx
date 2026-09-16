import React from "react";
import { Compass, Cpu, TrendingUp } from "lucide-react";
import { ServiceHeroTemplate } from "./ServiceHeroTemplate";

export function ServicesHero() {
  return (
    <ServiceHeroTemplate
      ariaLabel="Services introduction"
      eyebrow="OUR SERVICES"
      headlineLines={[
        { text: "Everything you need to" },
        { text: "build what comes next.", orange: true },
      ]}
      description="From strategy and product design to development, AI, SEO and business automation — we bring the right capabilities together to turn your ideas into real business impact."
      primaryCta={{ label: "Start a Project", href: "/#contact" }}
      secondaryCta={{ label: "See How We Work", href: "/#process" }}
      benefits={[
        { label: "Strategy Driven", icon: <Compass size={18} strokeWidth={1.85} /> },
        { label: "Technology Enabled", icon: <Cpu size={18} strokeWidth={1.85} /> },
        { label: "Growth Focused", icon: <TrendingUp size={18} strokeWidth={1.85} /> },
      ]}
      scriptLines={["Digital", "for a better", "tomorrow."]}
      verticalWords={["Strategy.", "Design.", "Build.", "Automate.", "Grow."]}
      imageSrc="/images/heroservice.png"
      floatingBadgeText="Growth-Ready Systems"
    />
  );
}
