"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE, DURATION } from "@/lib/motion";

/**
 * Loader — shows a "WELCOME" text reveal on first visit per session.
 * Each letter fades + slides up with a stagger, holds briefly, then exits.
 * Skipped for reduced-motion, automated tests, and repeat visits (sessionStorage).
 */
const WORD = "WELCOME";

export function Loader() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTest =
      navigator.userAgent.toLowerCase().includes("playwright") ||
      process.env.NODE_ENV === "test";
    if (reduce || isTest) return;

    const seen = sessionStorage.getItem("jb-loader-seen");
    if (seen) return;
    setShow(true);

    const stop = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("jb-loader-seen", "1");
    }, 2000);

    return () => clearTimeout(stop);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-live="polite"
          role="status"
          aria-label="Welcome"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE.primary }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "#000000" }}
        >
          {/* WELCOME — letter-by-letter reveal */}
          <div className="flex items-center gap-[2px] overflow-hidden">
            {WORD.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay: 0.15 + i * 0.07,
                  duration: 0.5,
                  ease: EASE.primary,
                }}
                className="font-display text-[clamp(40px,9vw,96px)] font-bold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Subtle accent dot — pulses */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="mt-6 h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
