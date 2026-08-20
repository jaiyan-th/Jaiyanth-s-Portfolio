import { FloatingNav } from "@/components/layout/floating-nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { Achievements } from "@/components/sections/achievements";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="bg-[#FAF3EE] min-h-screen text-black font-serif">
      <FloatingNav />
      <main id="main" className="relative w-full max-w-full overflow-x-hidden">
        <Hero />
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
