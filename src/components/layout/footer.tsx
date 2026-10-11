"use client";

import dynamic from "next/dynamic";
import { IDENTITY } from "@/data/content";

// Client-only BubbleFooter with ssr: false
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
      className="relative bg-transparent pt-8 pb-14 transition-colors"
    >
      {/* 70vh Interactive Matter-js Bubble Physics Section */}
      <BubbleFooter />

      {/* Clean Copyright & Region Line with Single Black Rule */}
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[#0A0A0A] text-[11px] font-mono text-[#666666]">
        <span>copyright 2026 {IDENTITY.name}</span>
        <span>Based in India · Working Worldwide</span>
      </div>
    </footer>
  );
}
