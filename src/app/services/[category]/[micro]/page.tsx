import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MicroServiceDetailTemplate } from "@/components/services/MicroServiceDetailTemplate";
import { MAIN_SERVICES } from "@/data/main-services";
import { getMicroServiceDetail } from "@/data/micro-service-details";

// Every micro-service across all six categories gets a real page — hand-written
// content where it exists, an honest generic fallback otherwise (never fabricated
// specifics). See src/data/micro-service-details.ts.
export const dynamicParams = false;

interface PageParams {
  category: string;
  micro: string;
}

function resolveDetail(params: PageParams) {
  const mainService = MAIN_SERVICES.find((s) => s.categorySlug === params.category);
  if (!mainService) return null;
  if (!mainService.microServices.some((m) => m.id === params.micro)) return null;

  const detail = getMicroServiceDetail(mainService.id, params.micro);
  if (!detail) return null;

  return { detail, mainService };
}

export function generateStaticParams(): PageParams[] {
  return MAIN_SERVICES.flatMap((mainService) =>
    mainService.microServices.map((micro) => ({
      category: mainService.categorySlug,
      micro: micro.id,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const resolved = resolveDetail(await params);
  if (!resolved) return {};

  const { detail, mainService } = resolved;
  const canonical = `/services/${mainService.categorySlug}/${detail.microId}`;

  return {
    title: detail.seo.title,
    description: detail.seo.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: detail.seo.title,
      description: detail.seo.description,
      siteName: "Parthav Technologies",
    },
    twitter: {
      card: "summary_large_image",
      title: detail.seo.title,
      description: detail.seo.description,
    },
  };
}

export default async function MicroServicePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const resolved = resolveDetail(await params);
  if (!resolved) notFound();

  const { detail, mainService } = resolved;
  const microService = mainService.microServices.find((m) => m.id === detail.microId);
  const canonicalUrl = `https://parthavtechnologies.com/services/${mainService.categorySlug}/${detail.microId}`;

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
            item: `https://parthavtechnologies.com/services/${mainService.categorySlug}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: microService?.title ?? detail.h1Lines[0].text,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: microService?.title ?? detail.h1Lines[0].text,
        description: detail.seo.description,
        provider: {
          "@type": "Organization",
          name: "Parthav Technologies",
          "@id": "https://parthavtechnologies.com/#organization",
        },
        areaServed: "Worldwide",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content" style={{ width: "100%" }}>
        <MicroServiceDetailTemplate detail={detail} />
      </main>
      <Footer />
    </>
  );
}
