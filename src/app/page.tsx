import { FloatingNav } from "@/components/layout/floating-nav";
import { Loader } from "@/components/layout/loader";
import { SectionProgressTrail } from "@/components/effects/section-progress-trail";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { Research } from "@/components/sections/research";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Loader />
      <FloatingNav />
      <SectionProgressTrail />
      <main id="main" className="relative">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Research />
        <Contact />
      </main>
    </>
  );
}
