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
    <div className={`w-full overflow-hidden bg-white text-black border-y-2 border-black py-2.5 ${className}`}>
      <div className="animate-marquee flex items-center gap-6 whitespace-nowrap font-display text-2xl sm:text-3xl tracking-wider uppercase">
        {displayItems.map((text, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <span className="hover:bg-[#8E0000] hover:text-white px-1.5 transition-colors">{text}</span>
            <span className="text-black text-xl font-bold">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
