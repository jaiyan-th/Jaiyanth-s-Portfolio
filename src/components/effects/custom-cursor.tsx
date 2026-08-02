"use client";

import * as React from "react";

/**
 * Custom cursor — fine-pointer devices only.
 * Subtle dot + contextual label ring. Respects reduced motion.
 * Falls back to native cursor on touch / coarse pointers.
 */

type CursorState =
  | "default"
  | "view"
  | "explore"
  | "open"
  | "code"
  | "mail"
  | "theme"
  | "close";

type CursorContextValue = { set: (state: CursorState | null) => void };
const CursorContext = React.createContext<CursorContextValue | null>(null);

export function useCursorState() {
  return React.useContext(CursorContext);
}

export function CustomCursor() {
  const [enabled, setEnabled] = React.useState(false);
  const [state, setState] = React.useState<CursorState | null>(null);
  const [reduced, setReduced] = React.useState(false);

  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLDivElement>(null);

  const target = React.useRef({ x: 0, y: 0 });
  const ringPos = React.useRef({ x: 0, y: 0 });
  const raf = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) {
      setEnabled(false);
      setReduced(reduce);
      return;
    }
    setEnabled(true);
    setReduced(false);
    document.body.classList.add("cursor-ready");
    return () => document.body.classList.remove("cursor-ready");
  }, []);

  React.useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const t = e.target as HTMLElement | null;
      const stateAttr = t?.closest("[data-cursor]")?.getAttribute("data-cursor");
      setState((stateAttr as CursorState) || "default");
    };

    const leave = () => setState(null);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);

    const tick = () => {
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled || reduced) return null;

  const labelText: Record<CursorState, string> = {
    default: "",
    view: "View",
    explore: "Explore",
    open: "Open",
    code: "Code",
    mail: "Mail",
    theme: "Theme",
    close: "Close",
  };

  const isActive = state && state !== "default";
  const label = state ? labelText[state] : "";

  return (
    <CursorContext.Provider value={{ set: setState }}>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      >
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: "var(--accent)",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99]"
        style={{ willChange: "transform" }}
      >
        <div
          className="flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300"
          style={{
            width: isActive ? 80 : 32,
            height: isActive ? 80 : 32,
            transform: "translate(-50%, -50%)",
            borderColor: isActive ? "var(--accent)" : "var(--line)",
            background: isActive
              ? "color-mix(in oklab, var(--accent) 12%, transparent)"
              : "transparent",
            color: "var(--text-primary)",
          }}
        >
          {label ? (
            <span
              ref={labelRef}
              className="font-mono-label"
              style={{ fontSize: 9, letterSpacing: "0.22em" }}
            >
              {label}
            </span>
          ) : null}
        </div>
      </div>
    </CursorContext.Provider>
  );
}
