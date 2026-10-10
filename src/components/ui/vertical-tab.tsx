"use client";

import * as React from "react";

export function VerticalTab() {
  return (
    <aside
      aria-label="Availability Status"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 select-none pointer-events-auto hidden sm:flex items-center"
    >
      <div
        className="bg-[#0A0A0A] text-[#F5F3EE] border-2 border-r-0 border-[#0A0A0A] px-3.5 py-1.5 shadow-[3px_3px_0px_rgba(0,0,0,0.2)] flex items-center gap-2 cursor-default tracking-widest text-[11px] font-mono uppercase font-medium rounded-l-md hover:translate-x-[-2px] transition-transform"
        style={{
          transformOrigin: "bottom right",
          transform: "rotate(90deg) translate(0, 0)",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#1FB866] animate-pulse" />
        <span>Available for new roles</span>
      </div>
    </aside>
  );
}
