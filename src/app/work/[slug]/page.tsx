import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CASE_STUDIES } from "@/data/case-studies";
import { FloatingNav } from "@/components/layout/floating-nav";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { CaseStudyView } from "@/components/case-study/case-study-view";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = CASE_STUDIES[slug];
  if (!project) return { title: "Work · Jaiyanth B" };

  return {
    title: `${project.title} — Case Study · Jaiyanth B`,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} — Engineering Case Study`,
      description: project.subtitle,
      type: "article",
    },
  };
}

export default async function WorkDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = CASE_STUDIES[slug];
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[#0A0A0A] transition-colors selection:bg-[#FFE45C] selection:text-[#0A0A0A]">
      <SmoothScroll />
      <CustomCursor />
      <FloatingNav />

      <main className="pt-28 sm:pt-36 pb-20 overflow-x-clip">
        <CaseStudyView project={project} />
      </main>

      <Footer />
    </div>
  );
}
