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
      className="relative bg-transparent pt-6 transition-colors"
    >
      {/* Interactive Matter-js Bubble Physics Section with integrated footer navigation & copyright */}
      <BubbleFooter />
    </footer>
  );
}
