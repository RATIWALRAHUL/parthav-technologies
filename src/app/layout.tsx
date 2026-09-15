import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Parthav Technologies | UI/UX, Web Development, SEO & AI",
  description:
    "Parthav Technologies is a Jaipur-based digital technology partner specializing in UI/UX design, web development, SEO, AI solutions and digital growth. Built in Jaipur. Designed for the world.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  keywords: [
    "Parthav Technologies",
    "UI UX design agency Jaipur",
    "web development company Jaipur",
    "SEO agency Jaipur",
    "AI development company Jaipur",
    "digital agency Jaipur",
    "web design company Jaipur",
    "AI automation services India",
  ],
  authors: [{ name: "Parthav Technologies" }],
  creator: "Parthav Technologies",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Parthav Technologies | UI/UX, Web Development, SEO & AI",
    description:
      "Ideas to Impact. Turn your ideas into digital experiences that grow with strategy, UI/UX, web development, SEO, and AI automation.",
    siteName: "Parthav Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parthav Technologies | UI/UX, Web Development, SEO & AI",
    description:
      "Ideas to Impact. Digital experiences built for growth from Jaipur to the world.",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#062B57",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://parthavtechnologies.com/#organization",
      name: "Parthav Technologies",
      url: "https://parthavtechnologies.com",
      logo: "https://parthavtechnologies.com/logo/parthav-logo.png",
      sameAs: [
        "https://linkedin.com/company/parthav-technologies",
        "https://instagram.com/parthavtechnologies",
        "https://youtube.com/@parthavtechnologies"
      ],
      description: "Premier digital technology partner in Jaipur specializing in UI/UX, web development, SEO, and AI."
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://parthavtechnologies.com/#localbusiness",
      name: "Parthav Technologies",
      image: "https://parthavtechnologies.com/images/hero/hero-workspace.webp",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        addressCountry: "IN"
      },
      priceRange: "$$"
    },
    {
      "@type": "WebSite",
      "@id": "https://parthavtechnologies.com/#website",
      url: "https://parthavtechnologies.com",
      name: "Parthav Technologies",
      publisher: {
        "@id": "https://parthavtechnologies.com/#organization"
      }
    }
  ]
};

import { LogoPreloader } from "@/components/ui/LogoPreloader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { FloatingChatWidget } from "@/components/chat/FloatingChatWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LogoPreloader />
        <ScrollProgress />
        {children}
        <FloatingChatWidget />
      </body>
    </html>
  );
}
