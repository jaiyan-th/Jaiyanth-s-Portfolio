import { FloatingNav } from "@/components/layout/floating-nav";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/ui/marquee";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { Achievements } from "@/components/sections/achievements";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="bg-[#FAF3EE] min-h-screen text-[#111111]">
      <FloatingNav />
      <main id="main" className="relative w-full max-w-full">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}
