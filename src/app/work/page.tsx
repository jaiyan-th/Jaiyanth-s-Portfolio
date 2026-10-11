import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES } from "@/data/case-studies";
import { FloatingNav } from "@/components/layout/floating-nav";
import { HowIWork } from "@/components/sections/how-i-work";
import { ContactCta } from "@/components/sections/contact-cta";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ArrowUpRight, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Work · Jaiyanth B",
  description:
    "Selected engineering work across applied AI, RAG systems, and full-stack architectures.",
};

export default function WorkIndexPage() {
  const projects = Array.from(
    new Map(Object.values(CASE_STUDIES).map((item) => [item.slug, item])).values()
  );

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[#0A0A0A] transition-colors selection:bg-[#FFE45C] selection:text-[#0A0A0A]">
      <SmoothScroll />
      <CustomCursor />
      <FloatingNav />

      <main className="pt-28 sm:pt-36 pb-20 overflow-x-clip">
        <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Work Page Header */}
          <div className="mb-16 sm:mb-24">
            <span className="neo-sticker bg-[#FFE45C] text-[#0A0A0A] font-bold mb-4">
              WORK & PROJECTS
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.035em] text-[#0A0A0A] leading-tight max-w-4xl mb-6">
              Selected work across applied AI, RAG systems, and full-stack products
            </h1>
            <p className="text-base sm:text-xl text-[#555555] font-normal leading-relaxed max-w-2xl">
              Engineered systems built for correctness, low latency, and verifiable data provenance.
            </p>
          </div>

          {/* List of Case Studies */}
          <div className="divide-y divide-[#E2DFD7] border-t border-b border-[#E2DFD7] mb-24">
            {projects.map((item) => (
              <div
                key={item.slug}
                className="group relative py-10 sm:py-12 transition-all duration-300 hover:bg-white px-4 sm:px-8 -mx-4 sm:-mx-8 rounded-md hover:hard-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start md:items-center">
                  {/* Column 1: Index Number */}
                  <div className="md:col-span-1">
                    <span className="font-mono text-sm text-[#E5341B] font-extrabold tracking-wider">
                      {item.number}
                    </span>
                  </div>

                  {/* Column 2: Title, Summary, Stack */}
                  <div className="md:col-span-6 transition-transform duration-300 group-hover:translate-x-1.5">
                    <div className="flex items-center gap-3 mb-2">
                      <Link
                        href={`/work/${item.slug}`}
                        className="text-xl sm:text-2xl font-bold text-[#0A0A0A] group-hover:text-[#E5341B] transition-colors tracking-tight"
                      >
                        {item.title}
                      </Link>
                    </div>
                    <p className="text-sm text-[#555555] leading-relaxed mb-4">
                      {item.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.stack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="neo-sticker bg-[#F2ECE4] text-[#0A0A0A]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Category */}
                  <div className="hidden md:block md:col-span-2 text-xs font-mono text-[#666666] font-semibold">
                    {item.category}
                  </div>

                  {/* Column 4: Year */}
                  <div className="hidden md:block md:col-span-1 text-xs font-mono text-[#666666] text-right font-medium">
                    {item.year}
                  </div>

                  {/* Column 5: Action Link to Detail */}
                  <div className="md:col-span-2 flex items-center justify-start md:justify-end gap-3 pt-2 md:pt-0">
                    {item.repoUrl && (
                      <a
                        href={item.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Repository"
                        className="p-2.5 rounded-full bg-[#FAF3EE] text-[#0A0A0A] hover:bg-[#FFE45C] transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    <Link
                      href={`/work/${item.slug}`}
                      className="neo-pill-btn px-5 py-2 text-xs font-bold"
                    >
                      <span>Read Case</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How I Work Section */}
        <HowIWork />

        {/* Contact CTA */}
        <ContactCta />
      </main>

      <Footer />
    </div>
  );
}
