import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ContactHero } from "@/components/contact/ContactHero";
import { OfficeSection } from "@/components/contact/OfficeSection";

export const metadata: Metadata = {
  title: "Contact Parthav Technologies | Start Your Project",
  description:
    "Contact Parthav Technologies to discuss web development, UI/UX design, AI automation, SEO and digital growth solutions.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contact Parthav Technologies | Start Your Project",
    description:
      "Contact Parthav Technologies to discuss web development, UI/UX design, AI automation, SEO and digital growth solutions.",
    images: [
      {
        url: "/images/hero/hero-agency-poster.webp",
        width: 1200,
        height: 630,
        alt: "Parthav Technologies - Ideas to Impact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Parthav Technologies | Start Your Project",
    description:
      "Contact Parthav Technologies to discuss web development, UI/UX design, AI automation, SEO and digital growth solutions.",
    images: ["/images/hero/hero-agency-poster.webp"],
  },
};

export default function ContactPage() {
  return (
    <>
      {/* 1. Global Navbar */}
      <Navbar />

      <main id="main-content">
        {/* 2. Contact Hero (Editorial Copy + Arch Cutout + Inquiry Form) */}
        <ContactHero />

        {/* 3. Office & Contact Information (Details + Workspace Image + Map Card) */}
        <OfficeSection />

        {/* 4. Global Final CTA */}
        <FinalCTA />
      </main>

      {/* 5. Global Footer */}
      <Footer />
    </>
  );
}
