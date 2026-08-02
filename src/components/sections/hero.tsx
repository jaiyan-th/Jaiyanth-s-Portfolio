"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { IDENTITY } from "@/data/portfolio";
import { EASE, DURATION } from "@/lib/motion";
import { SystemSculpture } from "@/components/effects/system-sculpture";
import { Magnetic } from "@/components/effects/magnetic";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-32"
    >
      {/* Three.js sculpture as background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0">
          <SystemSculpture />
        </div>
        {/* Soft vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 50%, transparent 0%, var(--canvas) 95%)",
          }}
        />
      </div>

      {/* Floating editorial labels */}
      <FloatingLabels />

      <div className="container-editorial relative">
        {/* Top eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: DURATION.reveal, ease: EASE.primary }}
          className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mb-16"
        >
          <span className="label-chip">
            <span className="dot" />
            {IDENTITY.role}
          </span>
          <span className="font-mono-label text-secondary">
            {IDENTITY.education}
          </span>
          <span className="font-mono-label text-secondary">
            {IDENTITY.location}
          </span>
        </motion.div>

        {/* Hero headline */}
        <h1
          id="hero-heading"
          className="font-display text-hero text-balance lg:text-hero"
        >
          <HeroLine text="Engineering" delay={0.2} />
          <HeroLine text="intelligent products" delay={0.32} />
          <HeroLine text="from signal to system." delay={0.44} accent />
        </h1>

        {/* Supporting + actions */}
        <div className="mt-10 grid gap-10 border-t border-line pt-10 md:grid-cols-12 lg:mt-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.56, duration: DURATION.reveal, ease: EASE.primary }}
            className="text-body text-secondary text-pretty md:col-span-6 lg:col-span-5"
          >
            {IDENTITY.heroSupporting}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: DURATION.reveal, ease: EASE.primary }}
            className="flex flex-wrap items-center gap-3 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8"
          >
            <Magnetic strength={0.2}>
              <a
                href="/#work"
                data-cursor="view"
                className="btn-magnetic btn-primary"
              >
                View selected work
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="/#contact"
                data-cursor="mail"
                className="btn-magnetic btn-ghost"
              >
                Start a conversation
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-16 flex items-center gap-3 pb-8"
        >
          <span className="font-mono-label text-secondary">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: EASE.secondary }}
            className="grid h-7 w-7 place-items-center rounded-full border border-line text-secondary"
          >
            <ArrowDown className="h-3 w-3" aria-hidden />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

function HeroLine({
  text,
  delay,
  accent = false,
}: {
  text: string;
  delay: number;
  accent?: boolean;
}) {
  return (
    <span className="mask-line">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: DURATION.section, ease: EASE.primary }}
        className="block"
        style={
          accent
            ? { color: "var(--accent)" }
            : undefined
        }
      >
        {text}
      </motion.span>
    </span>
  );
}

function FloatingLabels() {
  const labels = [
    { text: "AI Systems", top: "18%", left: "8%", delay: 0.9 },
    { text: "APIs", top: "24%", right: "10%", delay: 1.0 },
    { text: "Data", top: "44%", left: "4%", delay: 1.1 },
    { text: "Product", top: "62%", right: "6%", delay: 1.2 },
    { text: "Interface", top: "78%", left: "12%", delay: 1.3 },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      {labels.map((l) => (
        <motion.span
          key={l.text}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: l.delay, duration: 0.7, ease: EASE.primary }}
          className="absolute font-mono-label text-secondary"
          style={{
            top: l.top,
            left: l.left,
            right: l.right,
          }}
        >
          {l.text}
        </motion.span>
      ))}
    </div>
  );
}
