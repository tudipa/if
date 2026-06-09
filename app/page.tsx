import { AboutSection } from "@/components/AboutSection";
import { CTASection } from "@/components/CTASection";
import { FocusAreaSection } from "@/components/FocusAreaSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { NewsAgendaSection } from "@/components/NewsAgendaSection";
import { VisionMissionSection } from "@/components/VisionMissionSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <VisionMissionSection />
        <FocusAreaSection />
        <NewsAgendaSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
