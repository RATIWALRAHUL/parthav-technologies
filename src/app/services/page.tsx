import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { AdditionalCapabilities } from "@/components/services/AdditionalCapabilities";
import { DetailedServices } from "@/components/services/DetailedServices";
import { TechStackShowcase } from "@/components/technology/TechStackShowcase";
import { Process } from "@/components/home/Process";
import { FinalCTA } from "@/components/home/FinalCTA";
import { SERVICES_DATA } from "@/data/services";

export const metadata: Metadata = {
  title: "Parthav Technologies | Services — UI/UX, Web, AI & Digital Growth",
  description:
    "Explore Parthav Technologies services across UI/UX design, web and mobile development, AI automation, SEO, branding and business automation.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    url: "/services",
    title: "Parthav Technologies | Services — UI/UX, Web, AI & Digital Growth",
    description:
      "From strategy and product design to development, AI, SEO and business automation — explore the capabilities Parthav Technologies brings to every engagement.",
    siteName: "Parthav Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parthav Technologies | Services",
    description:
      "UI/UX, Web & Mobile Development, AI & Automation, SEO & Digital Growth, Branding, and CRM & Business Automation.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://parthavtechnologies.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "https://parthavtechnologies.com/services",
        },
      ],
    },
    ...SERVICES_DATA.map((service) => ({
      "@type": "Service",
      "@id": `https://parthavtechnologies.com/services#${service.id}`,
      name: service.title,
      description: service.description,
      provider: {
        "@type": "Organization",
        name: "Parthav Technologies",
        "@id": "https://parthavtechnologies.com/#organization",
      },
      areaServed: "Worldwide",
    })),
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content" style={{ width: "100%" }}>
        <ServicesHero />
        <Suspense fallback={null}>
          <ServicesExplorer />
        </Suspense>
        <AdditionalCapabilities />
        <DetailedServices />
        <TechStackShowcase />
        <Process />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
