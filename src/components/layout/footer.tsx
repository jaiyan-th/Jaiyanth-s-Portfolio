"use client";

import { useState } from "react";
import { ArrowUpRight, Sparkles, Globe } from "lucide-react";
import { IDENTITY, NAV_LINKS } from "@/data/content";

export function Footer() {
  const [score, setScore] = useState<number>(0);
  const [popped, setPopped] = useState<number>(0);
  const [bubbles, setBubbles] = useState<Array<{ id: number; popped: boolean }>>([
    { id: 1, popped: false },
    { id: 2, popped: false },
    { id: 3, popped: false },
    { id: 4, popped: false },
    { id: 5, popped: false },
    { id: 6, popped: false },
  ]);

  const handlePop = (id: number) => {
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
    setScore((s) => s + 10);
    setPopped((p) => p + 1);

    setTimeout(() => {
      setBubbles((prev) =>
        prev.map((b) => (b.id === id ? { ...b, popped: false } : b))
      );
    }, 2400);
  };

  const elsewhereLinks = [
    { label: "GitHub", href: IDENTITY.github },
    { label: "LinkedIn", href: IDENTITY.linkedin },
    { label: "Resume", href: IDENTITY.resumeUrl },
  ];

  return (
    <footer
      aria-label="Footer"
      className="relative bg-[var(--canvas)] border-t border-[#E5E3DB] pt-16 sm:pt-24 pb-12 transition-colors"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Massive Email Headline Matching Sandeep Design Signature Header */}
        <div className="pb-16 sm:pb-24 border-b border-[#E5E3DB]">
          <a
            href={`mailto:${IDENTITY.email}`}
            className="group block text-center md:text-left"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] block mb-2">
              Direct Contact
            </span>
            <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#0A0A0A] hover:text-[#FF3355] transition-colors duration-200 break-all md:break-normal">
              {IDENTITY.email}
            </span>
          </a>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 py-16 border-b border-[#E5E3DB]">
          {/* Col 1: Identity & Status Line */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF3355]" />
                <span className="font-medium text-lg tracking-tight text-[#0A0A0A]">
                  {IDENTITY.name}
                </span>
              </div>
              <p className="text-sm text-[#6F6E6A] font-normal max-w-sm mb-6 leading-relaxed">
                Applied AI & Full-Stack Engineer designing and engineering intelligent digital systems from signal to software.
              </p>
            </div>

            {/* Currently / Status Pill */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#6F6E6A] block mb-1.5">
                currently
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E5E3DB] bg-white text-xs font-mono text-[#0A0A0A] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#1FB46A] animate-pulse" />
                <span>Open to full-time/contract roles · Replies within 2 hrs</span>
              </div>
            </div>
          </div>

          {/* Col 2: Write to me */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] mb-4">
              Write to me
            </h4>
            <a
              href={`mailto:${IDENTITY.email}`}
              className="text-sm sm:text-base font-medium text-[#0A0A0A] hover:text-[#FF3355] transition-colors inline-flex items-center gap-1 group"
            >
              <span>{IDENTITY.email}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="text-xs text-[#6F6E6A] mt-2 font-mono">
              Available for full-time & high-impact contracts worldwide.
            </p>
          </div>

          {/* Col 3: Pages */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] mb-4">
              Pages
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#6F6E6A] hover:text-[#0A0A0A] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Elsewhere */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] mb-4">
              Elsewhere
            </h4>
            <ul className="space-y-2.5 mb-6">
              {elsewhereLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[#6F6E6A] hover:text-[#0A0A0A] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Playful Interactive Bubble Counter (Exact Sandeep Design Easter Egg) */}
            <div className="p-3.5 rounded-2xl border border-[#E5E3DB] bg-white shadow-2xs">
              <div className="flex items-center justify-between mb-2 text-[11px] font-mono text-[#6F6E6A]">
                <span className="flex items-center gap-1 text-[#FF3355] font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>{score} score</span>
                </span>
                <span>{popped} popped</span>
              </div>
              <div className="flex items-center gap-2">
                {bubbles.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => handlePop(b.id)}
                    aria-label="Pop bubble"
                    className={`w-6 h-6 rounded-full border transition-all duration-200 ${
                      b.popped
                        ? "scale-50 opacity-0 bg-transparent border-transparent"
                        : "scale-100 opacity-80 hover:opacity-100 hover:scale-110 bg-[#FF3355]/20 border-[#FF3355]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Based in India · Working Worldwide, built with love */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#6F6E6A]">
          <div className="flex items-center gap-2">
            <span>copyright 2026 {IDENTITY.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-[#6F6E6A]" />
            <span>Based in India · Working Worldwide</span>
          </div>

          <div>
            <span>built with love</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
