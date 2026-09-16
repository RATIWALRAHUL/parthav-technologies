import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { SERVICE_PAGES } from "@/data/service-pages";
import { buildServicePageMetadata, buildServicePageJsonLd } from "@/lib/servicePageSeo";

const data = SERVICE_PAGES["crm-business-automation"];

export const metadata: Metadata = buildServicePageMetadata(data);
const jsonLd = buildServicePageJsonLd(data);

export default function CrmBusinessAutomationPage() {
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
