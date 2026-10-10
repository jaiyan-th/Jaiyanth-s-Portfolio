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

      {/* Neo-Brutalist Copyright & Region Bar */}
      <div className="w-full max-w-[1100px] mx-auto px-6 sm:px-8 xl:px-0 flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs font-mono font-bold text-[#525252]">
        <span className="neo-badge px-3 py-1 rounded-md bg-white text-black border-1.5 border-black shadow-[2px_2px_0px_#0A0A0A]">
          © 2026 {IDENTITY.name}
        </span>
        <span className="neo-badge px-3 py-1 rounded-md bg-[#FFE600] text-black border-1.5 border-black shadow-[2px_2px_0px_#0A0A0A]">
          Based in India · Working Worldwide
        </span>
      </div>
    </footer>
  );
}
