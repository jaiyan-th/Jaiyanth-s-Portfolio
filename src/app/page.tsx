import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { FloatingNav } from "@/components/layout/floating-nav";
import { Hero } from "@/components/sections/hero";
import { FeaturedCase } from "@/components/sections/featured-case";
import { SelectedWork } from "@/components/sections/selected-work";
import { About } from "@/components/sections/about";
import { WhyWork } from "@/components/sections/why-work";
import { HowIWork } from "@/components/sections/how-i-work";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { ContactCta } from "@/components/sections/contact-cta";
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

      {/* Main Content Sections */}
      <main id="main" className="relative w-full max-w-full overflow-x-clip">
        {/* Hero Section with Quick Snapshot Card */}
        <Hero />

        {/* 01 Featured Case */}
        <FeaturedCase />

        {/* 02 Selected Work (Rich Featured-Style Cards) */}
        <SelectedWork />

        {/* 03 About Jaiyanth B (Featuring Official B&W Portrait) */}
        <About />

        {/* 04 Why Work With Me */}
        <WhyWork />

        {/* 05 How I Work */}
        <HowIWork />

        {/* 06 Tech / Trusted By Marquee */}
        <TechMarquee />

        {/* Get In Touch Marquee & Contact CTA */}
        <ContactCta />
      </main>

      {/* Detailed Editorial Footer */}
      <Footer />
    </div>
  );
}
