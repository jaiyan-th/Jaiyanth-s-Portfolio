import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES } from "@/data/case-studies";
import { FloatingNav } from "@/components/layout/floating-nav";
import { HowIWork } from "@/components/sections/how-i-work";
import { ContactCta } from "@/components/sections/contact-cta";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";
import { ArrowUpRight, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Work · Jaiyanth B",
  description:
    "Selected engineering work across applied AI, RAG systems, and full-stack architectures.",
};

const renderProjectTitle = (title: string, slug: string) => {
  if (slug === "fake-news-detector") {
    return (
      <>
        Full-Stack Real-Time Fake News{" "}
        <span className="font-serif italic text-accent font-normal">Verification</span>
      </>
    );
  }
  if (slug === "deep-research-agent") {
    return (
      <>
        Autonomous Deep <span className="font-serif italic text-accent font-normal">Research</span> & Synthesis Agent
      </>
    );
  }
  if (slug === "automated-data-platform") {
    return (
      <>
        Enterprise Automated Data <span className="font-serif italic text-accent font-normal">Platform</span>
      </>
    );
  }
  if (slug === "cold-storage-optimization") {
    return (
      <>
        Cold <span className="font-serif italic text-accent font-normal">Storage</span> & Archive Tier Optimization
      </>
    );
  }
  return title;
};

export default function WorkIndexPage() {
  const projects = Array.from(
    new Map(Object.values(CASE_STUDIES).map((item) => [item.slug, item])).values()
  );

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[#111111] transition-colors selection:bg-[#111111] selection:text-white">
      <SmoothScroll />
      <CustomCursor />
      <FloatingNav />

      <main className="pt-28 sm:pt-36 pb-20 overflow-x-clip">
        <div className="site-container">
          {/* Work Page Header */}
          <div className="mb-14 sm:mb-20 space-y-4">
            <EyebrowPill accent="SELECTED WORK" text="2024–26" />
            <h1 className="font-serif font-bold text-fluid-hero text-[#111111] leading-[1.0] tracking-[-0.03em] max-w-4xl">
              Selected work across <em className="font-serif-italic italic text-accent font-normal">applied AI</em>, RAG systems, and <em className="font-serif-italic italic text-accent font-normal accent-underline">full-stack</em> products
            </h1>
            <p className="lead-intro font-sans text-base sm:text-lg text-text-muted leading-relaxed max-w-[60ch]">
              Engineered systems built for correctness, low latency, and verifiable data provenance.
            </p>
          </div>

          {/* List of Case Studies */}
          <div className="divide-y divide-border-line border-t border-b border-border-line mb-20 sm:mb-24">
            {projects.map((item) => (
              <div
                key={item.slug}
                className="group relative py-8 sm:py-10 lg:py-12 transition-all duration-300 hover:bg-white px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl hover:shadow-md min-h-[64px]"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start md:items-center">
                  {/* Column 1: Index Number */}
                  <div className="md:col-span-1">
                    <span className="font-mono text-xs text-accent font-medium tracking-[0.08em] uppercase">
                      {item.number}
                    </span>
                  </div>

                  {/* Column 2: Title, Summary, Stack */}
                  <div className="md:col-span-6 transition-transform duration-300 group-hover:translate-x-1.5">
                    <div className="flex items-center gap-3 mb-2">
                      <Link
                        href={`/work/${item.slug}`}
                        className="font-serif font-normal text-2xl sm:text-[28px] text-[#111111] group-hover:text-accent transition-colors tracking-tight leading-snug"
                      >
                        {renderProjectTitle(item.title, item.slug)}
                      </Link>
                    </div>
                    <p className="font-sans text-sm text-text-muted leading-relaxed mb-4 font-normal">
                      {item.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.stack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#F2ECE4]/70 text-text-muted text-[11px] font-mono uppercase tracking-[0.08em] border border-border-line"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Category */}
                  <div className="hidden md:block md:col-span-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
                    {item.category}
                  </div>

                  {/* Column 4: Year */}
                  <div className="hidden md:block md:col-span-1 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted text-right">
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
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-border-line text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-all shadow-xs"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    <Link
                      href={`/work/${item.slug}`}
                      className="neo-pill-btn px-5 py-2 font-sans text-xs sm:text-sm font-medium min-h-[44px]"
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
