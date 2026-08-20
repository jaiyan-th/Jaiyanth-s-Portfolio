"use client";

import * as React from "react";

interface MarqueeProps {
  items?: string[];
  className?: string;
}

const DEFAULT_ITEMS = [
  "SYSTEMS ENGINEER",
  "APPLIED AI WORKFLOWS",
  "RAG PIPELINES",
  "FULL-STACK PRODUCTS",
  "STRUCTURED REST APIS",
  "RETRIEVAL-GROUNDED AI",
  "BUILT, NOT JUST DEMOED",
];

export function Marquee({ items = DEFAULT_ITEMS, className = "" }: MarqueeProps) {
  // Duplicate items array so animation loops seamlessly without a gap
  const displayItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`w-full overflow-hidden bg-[#2F5D46] text-white border-y-2 border-[#14231C] py-2.5 shadow-[0_4px_0_rgba(20,35,28,1)] ${className}`}>
      <div className="animate-marquee flex items-center gap-6 whitespace-nowrap font-mono text-xs sm:text-sm font-black tracking-widest uppercase">
        {displayItems.map((text, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <span>{text}</span>
            <span className="text-white/70 font-mono text-xs">→</span>
          </div>
        ))}
      </div>
    </div>
  );
}
