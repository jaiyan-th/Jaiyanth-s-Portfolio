"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Check, Mail, Github, Linkedin, FileText } from "lucide-react";
import { IDENTITY } from "@/data/content";

export function ContactCta() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(IDENTITY.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${IDENTITY.email}`;
    }
  };

  const marqueeText =
    "LET'S TALK · GET IN TOUCH · OPEN FOR ROLES · APPLIED AI & FULL-STACK · ";

  return (
    <section
      id="contact"
      aria-label="Get in touch"
      className="relative py-20 sm:py-28 border-t border-[var(--border-line)] overflow-hidden"
    >
      {/* Huge Looping Marquee Headline */}
      <div className="relative w-full overflow-hidden group mb-14 sm:mb-20 select-none">
        <div className="flex w-max animate-marquee-fast group-hover:[animation-play-state:paused]">
          <span className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-tighter text-foreground/80 hover:text-foreground transition-colors mr-6">
            {marqueeText}
          </span>
          <span className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-tighter text-foreground/80 hover:text-foreground transition-colors mr-6">
            {marqueeText}
          </span>
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pt-8 border-t border-[var(--border-line)]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF3355] block mb-3">
              get in touch
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground max-w-xl tracking-tight leading-snug">
              Have an ambitious product that needs AI reasoning and full-stack execution?
            </h2>
          </div>

          {/* Email, Status, and Actions */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-line)] bg-[var(--surface)] text-xs font-mono text-[var(--text-muted)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open to full-time/contract roles · Replies within 2 hrs</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Direct Email Link */}
              <a
                href={`mailto:${IDENTITY.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF3355] text-white text-sm font-medium hover:bg-[#e02b4c] transition-colors group shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Email me</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-[var(--border-line)] bg-[var(--surface)] text-foreground text-sm font-medium hover:border-[#FF3355] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[var(--text-muted)]" />
                    <span className="text-xs font-mono">Copy</span>
                  </>
                )}
              </button>

              {/* Social Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={IDENTITY.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className="p-3 rounded-full border border-[var(--border-line)] bg-[var(--surface)] text-foreground hover:border-[#FF3355] hover:text-[#FF3355] transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={IDENTITY.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  className="p-3 rounded-full border border-[var(--border-line)] bg-[var(--surface)] text-foreground hover:border-[#FF3355] hover:text-[#FF3355] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={IDENTITY.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Resume link"
                  className="p-3 rounded-full border border-[var(--border-line)] bg-[var(--surface)] text-foreground hover:border-[#FF3355] hover:text-[#FF3355] transition-colors"
                >
                  <FileText className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
