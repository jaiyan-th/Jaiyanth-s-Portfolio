"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Clock, Globe } from "lucide-react";
import { IDENTITY, NAV_LINKS } from "@/data/content";

export function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const istTime = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date());
        setTime(istTime);
      } catch {
        setTime("IST (UTC+5:30)");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const elsewhereLinks = [
    { label: "GitHub", href: IDENTITY.github },
    { label: "LinkedIn", href: IDENTITY.linkedin },
    { label: "Resume", href: IDENTITY.resumeUrl },
  ];

  return (
    <footer
      aria-label="Site Footer"
      className="relative bg-[var(--canvas)] border-t border-[var(--border-line)] pt-16 sm:pt-20 pb-12 transition-colors"
    >
      <div className="w-full max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[var(--border-line)]">
          {/* Col 1: Identity & Status Line */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF3355]" />
                <span className="font-medium text-lg tracking-tight text-foreground">
                  {IDENTITY.name}
                </span>
              </div>
              <p className="text-sm text-[var(--text-muted)] font-light max-w-sm mb-6 leading-relaxed">
                Applied AI & Full-Stack Engineer engineering intelligent, grounded products from signal to system.
              </p>
            </div>

            {/* Status Line */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[var(--border-line)] bg-[var(--surface-muted)]/50 text-xs font-mono text-foreground w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{IDENTITY.availability}</span>
            </div>
          </div>

          {/* Col 2: Write to me (Email) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-4">
              Write to me
            </h4>
            <a
              href={`mailto:${IDENTITY.email}`}
              className="text-sm sm:text-base font-medium text-foreground hover:text-[#FF3355] transition-colors inline-flex items-center gap-1 group"
            >
              <span>{IDENTITY.email}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="text-xs text-[var(--text-muted)] mt-2 font-mono">
              Available for full-time roles & high-impact projects.
            </p>
          </div>

          {/* Col 3: Pages */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-4">
              Pages
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[#FF3355] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Elsewhere */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-4">
              Elsewhere
            </h4>
            <ul className="space-y-2.5">
              {elsewhereLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[var(--text-muted)] hover:text-[#FF3355] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Playful Counter / Time Detail, and Location */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span>© 2026 {IDENTITY.name}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">All rights reserved</span>
          </div>

          {/* Playful Counter / Clock Detail */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[var(--surface-muted)]/60 border border-[var(--border-line)]">
            <Clock className="w-3.5 h-3.5 text-[#FF3355]" />
            <span>IST:</span>
            <span className="text-foreground font-semibold">{time || "Loading..."}</span>
          </div>

          {/* Based in India */}
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span>Based in India (Karur, Tamil Nadu)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
