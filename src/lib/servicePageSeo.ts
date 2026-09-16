import type { Metadata } from "next";
import { MAIN_SERVICES } from "@/data/main-services";
import type { ServicePageData } from "@/data/service-pages";

export function buildServicePageMetadata(data: ServicePageData): Metadata {
  const canonical = `/services/${data.slug}`;
  return {
    title: data.seo.title,
    description: data.seo.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
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
}

export function buildServicePageJsonLd(data: ServicePageData) {
  const mainService = MAIN_SERVICES.find((s) => s.id === data.mainId);
  const canonicalUrl = `https://parthavtechnologies.com/services/${data.slug}`;

  return {
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
            name: mainService?.title ?? data.eyebrow,
            item: canonicalUrl,
          },
        ],
      },
      ...(mainService?.microServices ?? []).map((micro) => ({
        "@type": "Service",
        "@id": `${canonicalUrl}#${micro.id}`,
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
}
