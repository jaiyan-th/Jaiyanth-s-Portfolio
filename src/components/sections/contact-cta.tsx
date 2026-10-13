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
      className="relative section-padding border-t border-[#E2DFD7] overflow-hidden bg-[var(--canvas)]"
    >
      {/* Looping Marquee Headline */}
      <div className="relative w-full overflow-hidden group mb-8 sm:mb-12 select-none">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          <span className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-[#0A0A0A]/15 hover:text-[#0A0A0A]/60 transition-colors mr-6">
            {marqueeText}
          </span>
          <span className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-[#0A0A0A]/15 hover:text-[#0A0A0A]/60 transition-colors mr-6">
            {marqueeText}
          </span>
        </div>
      </div>

      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-[#E2DFD7]">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E2DFD7] text-[#0A0A0A] font-mono text-xs font-semibold mb-4 w-max">
              GET IN TOUCH
            </span>
            <h2 className="text-fluid-h2 font-extrabold text-[#0A0A0A] max-w-xl tracking-tight leading-snug">
              Have an ambitious product that needs AI reasoning and full-stack execution?
            </h2>
          </div>

          {/* Email, Status, and Actions */}
          <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-[#E2DFD7] text-[#0A0A0A] font-mono text-xs font-medium gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#1FB46A] animate-pulse" />
              <span>Open to full-time/contract roles · Replies within 2 hrs</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                href={`mailto:${IDENTITY.email}`}
                className="neo-black-btn min-h-[48px] px-6 rounded-full text-sm font-semibold gap-2 w-full sm:w-auto"
              >
                <Mail className="w-4 h-4" />
                <span>Email me</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="neo-pill-btn min-h-[48px] px-5 rounded-full text-sm font-semibold gap-2 w-full sm:w-auto"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-mono font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#0A0A0A]" />
                    <span className="text-xs font-mono font-bold">Copy</span>
                  </>
                )}
              </button>

              {/* Social Buttons */}
              <div className="flex items-center gap-2 pt-1 sm:pt-0">
                <a
                  href={IDENTITY.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-[#E2DFD7] text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all shadow-xs"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={IDENTITY.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-[#E2DFD7] text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all shadow-xs"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={IDENTITY.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Resume link"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-[#E2DFD7] text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all shadow-xs"
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
