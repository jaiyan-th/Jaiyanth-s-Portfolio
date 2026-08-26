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
    <div className={`w-full overflow-hidden bg-white text-black border-y-2 border-black py-2.5 sm:py-3 ${className}`}>
      <div className="animate-marquee flex items-center gap-6 whitespace-nowrap font-display text-xl sm:text-2xl tracking-wider uppercase">
        {displayItems.map((text, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <span className="hover:bg-[#C9971C] hover:text-black px-1.5 py-0.5 transition-colors">{text}</span>
            <span className="text-black text-lg sm:text-xl font-bold leading-none select-none">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
