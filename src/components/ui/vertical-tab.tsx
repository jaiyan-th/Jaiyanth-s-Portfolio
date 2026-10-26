"use client";

import * as React from "react";

export function VerticalTab() {
  return (
    <aside
      aria-label="Availability Status"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 select-none pointer-events-auto hidden sm:flex items-center"
    >
      <div
        className="bg-[#111111] text-[#FAF3EE] px-2.5 py-3 border-l-2 border-y-2 border-[#111111] shadow-[-2px_2px_0px_rgba(17,17,17,0.3)] flex items-center gap-2 cursor-default tracking-[0.08em] text-[11px] font-mono uppercase font-medium rounded-l-lg hover:-translate-x-0.5 transition-transform [writing-mode:vertical-rl] rotate-180"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#1FB866] animate-pulse shrink-0" />
        <span>Available for new roles</span>
      </div>
    </aside>
  );
}
