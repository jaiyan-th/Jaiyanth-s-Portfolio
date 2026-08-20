"use client";

import * as React from "react";

interface MarqueeProps {
  items?: string[];
  className?: string;
}

const DEFAULT_ITEMS = [
  "PYTHON",
  "REACT",
  "NEXT.JS",
  "TYPESCRIPT",
  "FLASK",
  "SUPABASE",
  "NESTJS",
  "GROQ",
  "MISTRAL",
  "RAG PIPELINES",
  "REST APIS",
  "TAILWIND CSS",
  "PRISMA ORM",
];

export function Marquee({ items = DEFAULT_ITEMS, className = "" }: MarqueeProps) {
  // Duplicate items array so animation loops seamlessly without a gap
  const displayItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`w-full overflow-hidden bg-[#0B0C0E] text-[#F5F3EF] border-y border-[#232323] py-3 ${className}`}>
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap font-mono text-xs font-bold tracking-widest uppercase">
        {displayItems.map((text, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="hover:text-[#6D2932] transition-colors">{text}</span>
            <span className="text-[#6D2932] font-mono text-xs">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
