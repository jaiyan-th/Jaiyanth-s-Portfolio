"use client";

import React from "react";
import { useRouter } from "next/navigation";

/* ------------------------------------------------
   Card data shape — sections build these from
   their own domain data (ExperienceItem, ResearchPaper…)
   ------------------------------------------------ */
export interface Ring3DCardData {
  id: string;
  /** Small mono accent label, e.g. "INDUSTRY INTERNSHIP" */
  label: string;
  /** Date / year shown top-right, e.g. "Jun–Jul 2025" */
  date: string;
  /** Card title (18-20 px, tight tracking) */
  title: string;
  /** Optional summary / reflection */
  description?: string;
  /** 2-3 mono key/value rows from the card's domain fields */
  rows: { key: string; value: string }[];
  /** Optional link opened on click / Enter (front card only) */
  link?: string;
  /** Deterministic seed for the dot-matrix glow position */
  cardIndex: number;
}

/* ------------------------------------------------
   Props for the visual card component rendered
   inside Ring3D or SingleCardTilt
   ------------------------------------------------ */
interface Ring3DCardProps {
  data: Ring3DCardData;
  isFront: boolean;
  tabIndex?: number;
}

export function Ring3DCard({
  data,
  isFront,
  tabIndex = -1,
}: Ring3DCardProps) {
  const { label, date, title, description, rows, link, cardIndex } = data;
  const router = useRouter();

  /* Vary the accent glow position per card */
  const glowX = 20 + ((cardIndex * 37 + 11) % 61);
  const glowY = 20 + ((cardIndex * 53 + 7) % 61);

  const handleActivate = () => {
    if (!isFront || !link) return;
    if (link.startsWith("/")) {
      router.push(link);
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleActivate();
  };

  return (
    <div
      className="ring3d-card"
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      tabIndex={isFront ? 0 : tabIndex}
      role={isFront && link ? "link" : undefined}
      aria-hidden={!isFront ? true : undefined}
      style={{ cursor: isFront && link ? "pointer" : "default" }}
    >
      {/* ---- Top row: accent label + date ---- */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.12em] font-semibold"
          style={{ color: "var(--accent-hover, #C92A14)" }}
        >
          {label}
        </span>
        <span
          className="font-mono text-[10px] tracking-wider"
          style={{ color: "var(--text-secondary, #6B6B6B)" }}
        >
          {date}
        </span>
      </div>

      {/* ---- Decorative dot-matrix ---- */}
      <div
        className="ring3d-dots mb-3"
        aria-hidden="true"
        style={
          {
            "--glow-x": `${glowX}%`,
            "--glow-y": `${glowY}%`,
          } as React.CSSProperties
        }
      />

      {/* ---- Title ---- */}
      <h3
        className="font-sans text-[17px] sm:text-[18px] font-medium leading-tight mb-2"
        style={{
          color: "var(--text-primary, #0A0A0A)",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h3>

      {/* ---- Description (optional) ---- */}
      {description && (
        <p
          className="font-sans text-xs leading-relaxed mb-3 line-clamp-3"
          style={{ color: "var(--text-secondary, #6B6B6B)" }}
        >
          {description}
        </p>
      )}

      {/* ---- Hairline ---- */}
      <div
        className="w-full h-px mb-2.5"
        style={{ background: "var(--border-line, #E6E3DC)" }}
      />

      {/* ---- Key / value rows ---- */}
      <div className="flex flex-col gap-1.5 mt-auto">
        {rows.map((row) => (
          <div key={row.key} className="flex items-baseline gap-2">
            <span
              className="font-mono text-[10px] uppercase tracking-wider shrink-0"
              style={{ color: "var(--text-secondary, #6B6B6B)" }}
            >
              {row.key}
            </span>
            <span
              className="font-mono text-[11px] font-medium truncate"
              style={{ color: "var(--text-primary, #0A0A0A)" }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
