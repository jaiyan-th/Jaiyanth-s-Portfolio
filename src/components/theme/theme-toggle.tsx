"use client";

import * as React from "react";
import { useTheme } from "@/components/effects/theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`h-8 w-8 p-0 flex items-center justify-center border border-[var(--border-line)] bg-transparent text-foreground hover:border-[var(--text-primary)] hover:text-accent transition-all cursor-pointer rounded-none shrink-0 ${className}`}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      title={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
    >
      <span className="sr-only">Toggle theme</span>
      {/* Half-filled circle icon with 1px border */}
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21V3Z" fill="currentColor" />
      </svg>
    </button>
  );
}
