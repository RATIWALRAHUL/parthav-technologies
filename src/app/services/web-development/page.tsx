import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { SERVICE_PAGES } from "@/data/service-pages";
import { MAIN_SERVICES } from "@/data/main-services";

const data = SERVICE_PAGES["web-development"];

export const metadata: Metadata = {
  title: data.seo.title,
  description: data.seo.description,
  alternates: {
    canonical: "/services/web-development",
  },
  openGraph: {
    type: "website",
    url: "/services/web-development",
    title: data.seo.title,
    description: data.seo.description,
    siteName: "Parthav Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: data.seo.title,
    description: data.seo.description,
  },
};

const mainService = MAIN_SERVICES.find((s) => s.id === data.mainId)!;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://parthavtechnologies.com/" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://parthavtechnologies.com/services" },
        {
          "@type": "ListItem",
          position: 3,
          name: mainService.title,
          item: "https://parthavtechnologies.com/services/web-development",
        },
      ],
    },
    ...mainService.microServices.map((micro) => ({
      "@type": "Service",
      "@id": `https://parthavtechnologies.com/services/web-development#${micro.id}`,
      name: micro.title,
      description: micro.description ?? data.microDescription,
      provider: {
        "@type": "Organization",
        name: "Parthav Technologies",
        "@id": "https://parthavtechnologies.com/#organization",
      },
      areaServed: "Worldwide",
    })),
  ],
};

export default function WebDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content" style={{ width: "100%" }}>
        <ServicePageTemplate data={data} />
      </main>
      <Footer />
    </>
  );
}
