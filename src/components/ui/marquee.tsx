"use client";

import * as React from "react";

interface MarqueeProps {
  items?: string[];
  className?: string;
}

const DEFAULT_ITEMS = [
  "APPLIED AI",
  "RAG PIPELINES",
  "FULL-STACK ENGINEERING",
  "PYTHON",
  "FASTAPI",
  "REACT 19",
  "NEXT.JS 16",
  "TYPESCRIPT",
  "SUPABASE",
  "REST APIS",
  "GROQ & MISTRAL",
  "AES-256-GCM",
  "VECTOR DATABASES",
  "TAILWIND CSS",
  "IEEE CO-AUTHORED",
];

export function Marquee({ items = DEFAULT_ITEMS, className = "" }: MarqueeProps) {
  return (
    <aside
      aria-label="Core technologies and skills ticker"
      className={`w-full max-w-full overflow-hidden overflow-x-clip bg-white text-[#111111] border-b-[3px] border-[#111111] py-3.5 select-none ${className}`}
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* Track 1 */}
        <div className="flex items-center gap-8 pr-8 font-heading text-sm sm:text-base font-extrabold tracking-wider uppercase shrink-0">
          {items.map((text, idx) => (
            <div key={`track1-${idx}`} className="flex items-center gap-8">
              <span className="hover:text-[#D9622B] transition-colors cursor-default">{text}</span>
              <span className="w-2 h-2 rounded-full bg-[#D9622B] shrink-0" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Track 2 (for seamless infinite loop) */}
        <div
          aria-hidden="true"
          className="flex items-center gap-8 pr-8 font-heading text-sm sm:text-base font-extrabold tracking-wider uppercase shrink-0"
        >
          {items.map((text, idx) => (
            <div key={`track2-${idx}`} className="flex items-center gap-8">
              <span className="hover:text-[#D9622B] transition-colors cursor-default">{text}</span>
              <span className="w-2 h-2 rounded-full bg-[#D9622B] shrink-0" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
