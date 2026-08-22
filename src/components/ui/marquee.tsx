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
  const displayItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`w-full overflow-hidden bg-white text-black border-y-2 border-black py-3.5 sm:py-4 ${className}`}>
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap font-display text-3xl sm:text-4xl tracking-wider uppercase">
        {displayItems.map((text, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="hover:bg-[#8E0000] hover:text-white px-2 py-0.5 transition-colors">{text}</span>
            <span className="text-black text-2xl sm:text-3xl font-black leading-none select-none">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
