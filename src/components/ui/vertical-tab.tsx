"use client";

import * as React from "react";

export function VerticalTab() {
  return (
    <aside
      aria-label="Availability Status"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 select-none pointer-events-auto hidden sm:flex items-center"
    >
      <div
        className="bg-[#FFE600] text-[#0A0A0A] border-2 border-r-0 border-[#0A0A0A] px-3.5 py-1.5 shadow-[4px_4px_0px_#0A0A0A] flex items-center gap-2 cursor-default tracking-widest text-[11px] font-mono uppercase font-bold rounded-l-md hover:translate-x-[-2px] transition-transform"
        style={{
          transformOrigin: "bottom right",
          transform: "rotate(90deg) translate(0, 0)",
        }}
      >
        <span className="w-2 h-2 rounded-full bg-[#00E599] border border-black animate-pulse" />
        <span>Available for new roles</span>
      </div>
    </aside>
  );
}
