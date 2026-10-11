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
      <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[#0A0A0A] text-fluid-mono text-[#666666] text-center sm:text-left">
        <span>copyright 2026 {IDENTITY.name}</span>
        <span>Based in India · Working Worldwide</span>
      </div>
    </footer>
  );
}
