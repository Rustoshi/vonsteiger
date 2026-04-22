import Hero from "@/components/sections/Hero";
import LogoBar from "@/components/sections/LogoBar";
import AboutSnapshot from "@/components/sections/AboutSnapshot";
import PracticeAreasSection from "@/components/sections/PracticeAreas";
import CaseResultsSection from "@/components/sections/CaseResults";
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";
import GlobalPresence from "@/components/sections/GlobalPresence";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoBar />
      <AboutSnapshot />
      <PracticeAreasSection />
      <CaseResultsSection />
      <TestimonialsCarousel />
      <GlobalPresence />
      <CTABanner />
    </>
  );
}
