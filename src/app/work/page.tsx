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
    <div className="min-h-screen bg-[var(--canvas)] text-[#0A0A0A] transition-colors selection:bg-[#FF3355] selection:text-white">
      <SmoothScroll />
      <CustomCursor />
      <FloatingNav />

      <main className="pt-28 sm:pt-36 pb-20 overflow-x-clip">
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
          {/* Work Page Header */}
          <div className="mb-16 sm:mb-24">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF3355] block mb-3 font-semibold">
              Work & Projects
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#0A0A0A] leading-tight max-w-4xl mb-6">
              Selected work across applied AI, RAG systems, and full-stack products
            </h1>
            <p className="text-base sm:text-xl text-[#6F6E6A] font-normal leading-relaxed max-w-2xl">
              Engineered systems built for correctness, low latency, and verifiable data provenance.
            </p>
          </div>

          {/* List of Case Studies */}
          <div className="divide-y divide-[#E5E3DB] border-t border-b border-[#E5E3DB] mb-24">
            {projects.map((item) => (
              <div
                key={item.slug}
                className="group relative py-10 sm:py-12 transition-all duration-300 hover:bg-white px-4 sm:px-8 -mx-4 sm:-mx-8 rounded-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start md:items-center">
                  {/* Column 1: Index Number */}
                  <div className="md:col-span-1">
                    <span className="font-mono text-xs sm:text-sm text-[#FF3355] font-semibold tracking-wider">
                      {item.number}
                    </span>
                  </div>

                  {/* Column 2: Title, Summary, Stack */}
                  <div className="md:col-span-6 transition-transform duration-300 group-hover:translate-x-1.5">
                    <div className="flex items-center gap-3 mb-2">
                      <Link
                        href={`/work/${item.slug}`}
                        className="text-xl sm:text-2xl font-medium text-[#0A0A0A] group-hover:text-[#FF3355] transition-colors"
                      >
                        {item.title}
                      </Link>
                    </div>
                    <p className="text-sm text-[#6F6E6A] leading-relaxed mb-4">
                      {item.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.stack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#F5F4F0] text-[#6F6E6A] border border-[#E5E3DB]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Category */}
                  <div className="hidden md:block md:col-span-2 text-xs font-mono text-[#6F6E6A]">
                    {item.category}
                  </div>

                  {/* Column 4: Year */}
                  <div className="hidden md:block md:col-span-1 text-xs font-mono text-[#6F6E6A] text-right font-medium">
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
                        className="p-2.5 rounded-full border border-[#E5E3DB] bg-[#F5F4F0] text-[#6F6E6A] hover:text-[#0A0A0A] hover:border-[#FF3355] transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    <Link
                      href={`/work/${item.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium border border-[#E5E3DB] bg-[#F5F4F0] text-[#0A0A0A] group-hover:border-[#0A0A0A] group-hover:bg-[#0A0A0A] group-hover:text-white transition-all duration-200"
                    >
                      <span>Read Case</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
