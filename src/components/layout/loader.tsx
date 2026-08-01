"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE, DURATION } from "@/lib/motion";

const MESSAGES = ["Mapping signals", "Connecting systems", "Calibrating interface", "Preparing experience"];

export function Loader() {
  const [show, setShow] = React.useState(false);
  const [msgIndex, setMsgIndex] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTest = navigator.userAgent.toLowerCase().includes("playwright") || process.env.NODE_ENV === "test";
    if (reduce || isTest) return;

    const seen = sessionStorage.getItem("jb-loader-seen");
    if (seen) return;
    setShow(true);

    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 220);

    const stop = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("jb-loader-seen", "1");
    }, 820);

    return () => {
      clearInterval(interval);
      clearTimeout(stop);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-live="polite"
          role="status"
          aria-label="Loading experience"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION.modal, ease: EASE.primary }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "var(--canvas)" }}
        >
          <div className="relative flex flex-col items-center gap-6">
            <div className="relative h-20 w-20">
              <motion.svg
                viewBox="0 0 80 80"
                className="h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.circle
                  cx="40"
                  cy="40"
                  r="28"
                  fill="none"
                  stroke="var(--line)"
                  strokeWidth="1"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="28"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                  strokeDasharray="176"
                  strokeDashoffset="176"
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.78, ease: EASE.primary }}
                />
                <motion.text
                  x="40"
                  y="46"
                  textAnchor="middle"
                  fontFamily="var(--font-sans)"
                  fontSize="22"
                  fontWeight="600"
                  fill="var(--text-primary)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.18, duration: 0.4 }}
                >
                  JB
                </motion.text>
              </motion.svg>
            </div>
            <div className="font-mono-label text-secondary">
              {MESSAGES[msgIndex]}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
