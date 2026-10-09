"use client";

import * as React from "react";

export function VerticalTab() {
  return (
    <aside
      aria-label="Availability Status"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 select-none pointer-events-auto hidden sm:flex items-center"
    >
      <div
        className="bg-[#0A0A0A] text-[#EDEBE6] border border-[var(--border-line)] border-r-0 px-3.5 py-1.5 shadow-lg flex items-center gap-2 cursor-default origin-bottom-right rotate-90 translate-x-full tracking-widest text-[11px] font-mono uppercase font-medium"
        style={{
          transformOrigin: "bottom right",
          transform: "rotate(90deg) translate(0, 0)",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span>Available for new roles</span>
      </div>
    </aside>
  );
}
