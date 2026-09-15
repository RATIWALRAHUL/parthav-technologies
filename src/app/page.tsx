import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { IndustriesWeServe } from "@/components/home/IndustriesWeServe";
import { Services } from "@/components/home/Services";
import { WhyParthav } from "@/components/home/WhyParthav";
import { ImpactMetrics } from "@/components/home/ImpactMetrics";
import { CaseStudies } from "@/components/home/CaseStudies";
import { Process } from "@/components/home/Process";
import { AboutPreview } from "@/components/home/AboutPreview";
import { SeoAi } from "@/components/home/SeoAi";
import { SocialProofFaq } from "@/components/home/SocialProofFaq";
import { Contact } from "@/components/home/Contact";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" style={{ width: "100%" }}>
        <Hero />
        <IndustriesWeServe />
        <Services />
        <WhyParthav />
        <ImpactMetrics />
        <CaseStudies />
        <Process />
        <AboutPreview />
        <SeoAi />
        <SocialProofFaq />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
