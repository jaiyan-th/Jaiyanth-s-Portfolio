import type { Metadata } from "next";
import { FloatingNav } from "@/components/layout/floating-nav";
import { About } from "@/components/sections/about";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { ContactCta } from "@/components/sections/contact-cta";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";

export const metadata: Metadata = {
  title: "About · Jaiyanth B",
  description:
    "Applied AI & Full-Stack Engineer based in Karur, Tamil Nadu. Engineering intelligent products from signal to system.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[#0A0A0A] transition-colors selection:bg-accent/20 selection:text-inherit">
      <SmoothScroll />
      <CustomCursor />
      <FloatingNav />

      <main className="pt-16 sm:pt-20 overflow-x-clip">
        <About />
        <TechMarquee />
        <ContactCta />
      </main>

      <Footer />
    </div>
  );
}
