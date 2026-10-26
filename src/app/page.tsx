import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { FloatingNav } from "@/components/layout/floating-nav";
import { Hero } from "@/components/sections/hero";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { ImpactBanner } from "@/components/sections/impact-banner";
import { SelectedWork } from "@/components/sections/selected-work";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Research } from "@/components/sections/research";
import { WhyWork } from "@/components/sections/why-work";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { VerticalTab } from "@/components/ui/vertical-tab";

export default function Home() {
  return (
    <div className="bg-[#F5F0E6] min-h-screen text-[#111111] transition-colors duration-200">
      {/* Lenis Smooth Scrolling Provider */}
      <SmoothScroll />

      {/* Subtle Star / Sparkle Interactive Cursor */}
      <CustomCursor />

      {/* Rotated Available Tab */}
      <VerticalTab />

      {/* Fixed Agency Framed Navbar */}
      <FloatingNav />

      {/* Main Content Sections */}
      <main id="main" className="relative w-full max-w-full overflow-x-clip z-10">
        {/* 01 Hero Section: Bold Syne typography, sketch CTA, and smiley cluster */}
        <Hero />

        {/* 02 Electric Violet Marquee Ribbon with Smiley bullets */}
        <TechMarquee />

        {/* 03 Electric Lime Green Impact Banner with Cartoon Googly Eyes */}
        <ImpactBanner />

        {/* 04 Selected Work (Agency Case Study Mockup Frames) */}
        <SelectedWork />

        {/* 05 About Jaiyanth B */}
        <About />

        {/* 06 Work Experience (Brainery Spot AI Internship) */}
        <Experience />

        {/* 07 Research & Academic Publications (IEEE ICETSIS '26) */}
        <Research />

        {/* 08 Why Work With Me */}
        <WhyWork />
      </main>

      {/* Interactive Matter.js Bubble Footer with AI CTA */}
      <Footer />
    </div>
  );
}
