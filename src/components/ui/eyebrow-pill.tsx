import * as React from "react";
import { cn } from "@/lib/utils";

export interface EyebrowPillProps extends React.HTMLAttributes<HTMLDivElement> {
  accent: string;
  text?: string;
  className?: string;
}

/**
 * Editorial Eyebrow Pill
 * Small fully rounded pill with a 1px light-gray border and 4px 12px padding.
 * Mono font, uppercase, 11px, letter-spacing 0.08em.
 * The first part is in the accent color, followed by a "·" separator, then the rest in muted gray.
 */
export function EyebrowPill({
  accent,
  text,
  className,
  ...props
}: EyebrowPillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E5E5] font-mono text-[11px] uppercase tracking-[0.08em] shadow-[0_1px_2px_rgba(0,0,0,0.02)] select-none w-max leading-none",
        className
      )}
      {...props}
    >
      <span className="text-[#E8472B] font-medium">{accent}</span>
      {text && (
        <>
          <span className="text-[#888888] select-none">·</span>
          <span className="text-[#555555] font-medium">{text}</span>
        </>
      )}
    </div>
  );
}
