"use client";

import { useTheme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-pressed={theme === "light"}
      data-cursor="theme"
      className="relative h-9 w-9 rounded-full border border-line text-foreground flex items-center justify-center transition-colors duration-300 hover:border-accent/60"
    >
      <span className="sr-only">Toggle theme</span>
      <Sun
        aria-hidden
        className={`h-4 w-4 transition-all duration-500 ${
          mounted && theme === "light"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0 absolute"
        }`}
      />
      <Moon
        aria-hidden
        className={`h-4 w-4 transition-all duration-500 ${
          mounted && theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0 absolute"
        }`}
      />
    </button>
  );
}
