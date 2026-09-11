"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/effects/theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle, mounted } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`relative h-9 w-9 p-0 flex items-center justify-center border-2 border-line bg-surface text-foreground hover:border-line-solid transition-colors cursor-pointer shadow-[2px_2px_0px_var(--shadow-color)] active:translate-x-[1px] active:translate-y-[1px] shrink-0 ${className}`}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      title={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
    >
      <span className="sr-only">Toggle theme</span>
      {!mounted ? (
        <span className="w-4 h-4 block" />
      ) : isDark ? (
        <Sun className="w-4 h-4 text-[#A3E635] transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[#111111] transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}
