import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { FloatingNav } from "@/components/layout/floating-nav";
import { DottedSphere } from "@/components/canvas/dotted-sphere";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { SelectedWork } from "@/components/sections/selected-work";
import { Experience } from "@/components/sections/experience";
import { ScrollExpandPanel } from "@/components/sections/scroll-expand-panel";
import { Research } from "@/components/sections/research";
import { WhyWork } from "@/components/sections/why-work";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { VerticalTab } from "@/components/ui/vertical-tab";

export default function Home() {
  return (
    <div className="bg-canvas min-h-screen text-foreground transition-colors duration-200">
      {/* Lenis Smooth Scrolling Provider */}
      <SmoothScroll />

      {/* Subtle Star / Sparkle Interactive Cursor */}
      <CustomCursor />

      {/* Rotated Available Tab */}
      <VerticalTab />

      {/* Fixed Navbar */}
      <FloatingNav />

      {/* Ambient Red Dotted Sphere (Visible on cursor move or scroll throughout portfolio) */}
      <div className="fixed top-12 sm:top-14 right-[-40px] sm:right-6 lg:right-24 z-0 pointer-events-none select-none">
        <DottedSphere />
      </div>

      {/* Main Content Sections */}
      <main id="main" className="relative w-full max-w-full overflow-x-clip z-10">
        {/* Hero Section with Quick Snapshot Card */}
        <Hero />

        {/* 01 About Jaiyanth B (Featuring Official B&W Portrait Centered on Right) */}
        <About />

        {/* 02 Selected Work (4 Engineering Projects) */}
        <SelectedWork />

        {/* Scroll-Driven Expand Panel Test Component */}
        <ScrollExpandPanel />

        {/* 03 Experience (Brainery Spot Technology AI Internship) */}
        <Experience />

        {/* 04 Research & Academic Publications as Achievement */}
        <Research />

        {/* 05 Why Work With Me */}
        <WhyWork />

        {/* 06 Tech / Trusted By Marquee */}
        <TechMarquee />
      </main>

      {/* Interactive Matter.js Bubble Footer with AI CTA */}
      <Footer />
    </div>
  );
}
