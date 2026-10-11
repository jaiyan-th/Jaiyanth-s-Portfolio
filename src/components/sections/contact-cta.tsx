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
      className="relative py-16 sm:py-24 border-t border-[#E2DFD7] overflow-hidden bg-[var(--canvas)]"
    >
      {/* Huge Looping Marquee Headline */}
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

      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pt-8 border-t border-[#E2DFD7]">
          <div>
            <span className="neo-sticker bg-[#FFE45C] text-[#0A0A0A] font-bold block mb-4 w-max">
              GET IN TOUCH
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A0A0A] max-w-xl tracking-tight leading-snug">
              Have an ambitious product that needs AI reasoning and full-stack execution?
            </h2>
          </div>

          {/* Email, Status, and Actions */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="neo-sticker bg-white text-[#0A0A0A] font-medium gap-2 py-1.5 px-3">
              <span className="w-2 h-2 rounded-full bg-[#1FB46A] animate-pulse" />
              <span>Open to full-time/contract roles · Replies within 2 hrs</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Direct Email Link - Solid Black Pill */}
              <a
                href={`mailto:${IDENTITY.email}`}
                className="neo-black-btn h-[48px] px-6 rounded-full text-sm font-semibold gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email me</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Copy Email Button - Outlined Pill with Hard Shadow */}
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="neo-pill-btn h-[48px] px-5 rounded-full text-sm font-semibold gap-2"
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
              <div className="flex items-center gap-2">
                <a
                  href={IDENTITY.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className="p-3 rounded-full bg-white text-[#0A0A0A] hover:bg-[#FFE45C] transition-colors hard-shadow"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={IDENTITY.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  className="p-3 rounded-full bg-white text-[#0A0A0A] hover:bg-[#FFE45C] transition-colors hard-shadow"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={IDENTITY.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Resume link"
                  className="p-3 rounded-full bg-white text-[#0A0A0A] hover:bg-[#FFE45C] transition-colors hard-shadow"
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
