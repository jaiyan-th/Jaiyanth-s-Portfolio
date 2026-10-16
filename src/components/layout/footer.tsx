"use client";

import dynamic from "next/dynamic";
import { IDENTITY } from "@/data/content";

const BubbleFooter = dynamic(
  () =>
    import("@/components/sections/bubble-footer").then(
      (mod) => mod.BubbleFooter
    ),
  { ssr: false }
);

export function Footer() {
  return (
    <footer
      id="footer"
      aria-label="Footer"
      className="relative bg-transparent pt-6 pb-12 transition-colors"
    >
      {/* Interactive Matter-js Bubble Physics Section */}
      <BubbleFooter />

      {/* Clean Copyright & Region Line */}
      <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t-2 border-[#111111]/20 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted text-center sm:text-left">
        <span>© 2026 {IDENTITY.name}</span>
        <span>Based in India · Working Worldwide</span>
      </div>
    </footer>
  );
}
