"use client";

import * as React from "react";
import { ArrowUpRight, Link2, Code, Share2 } from "lucide-react";
import { IDENTITY } from "@/data/portfolio";

export function Contact() {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="bg-[#FAF3EE] relative">
      {/* Contact Section */}
      <section id="contact" className="border-b border-black/10 px-4 py-12 md:px-8 md:py-20 bg-grid">
        <div className="max-w-7xl mx-auto">
          {/* Top Badge */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] font-bold text-[#D9622B] tracking-widest uppercase block">
              06 —— CONTACT
            </span>
            <div className="h-[1px] flex-1 bg-black/10" />
          </div>

          {/* Grid Layout */}
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Info & Links (Evenly spaced without vacant gap) */}
            <div className="lg:col-span-6 space-y-8">
              {/* Top Text Content */}
              <div>
                <h2 className="font-heading font-black text-3xl sm:text-5xl text-black leading-[1.08] tracking-tight uppercase mb-6">
                  Let's start a <br />
                  <span className="italic text-[#B91C1C]">// conversation.</span>
                </h2>

                {/* Quote Box */}
                <div className="border-l border-[#B91C1C] pl-4 py-1 mb-6">
                  <p className="font-sans text-xs sm:text-sm text-black/70 font-semibold leading-relaxed">
                    Open to applied-AI and full-stack engineering roles. I read every message and reply within a few days.
                  </p>
                </div>

                <p className="font-sans text-xs sm:text-sm text-black/60">
                  Send a note about a role, a project, or a research idea.
                </p>
              </div>

              {/* Contact Links List - Evenly distributed, no vacant gap */}
              <div className="pt-6 border-t border-black/10">
                <div className="divide-y divide-black/10 font-mono text-xs">
                  <div className="flex items-center justify-between py-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/55">
                      EMAIL
                    </span>
                    <a
                      href={`mailto:${IDENTITY.email}`}
                      className="font-bold text-black hover:text-[#B91C1C] transition-colors"
                    >
                      {IDENTITY.email}
                    </a>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/55">
                      GITHUB
                    </span>
                    <a
                      href={IDENTITY.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-black hover:text-[#B91C1C] transition-colors"
                    >
                      github.com/jaiyan-th
                    </a>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/55">
                      LINKEDIN
                    </span>
                    <a
                      href="https://www.linkedin.com/in/jaiyan-th/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-black hover:text-[#B91C1C] transition-colors"
                    >
                      linkedin.com/in/jaiyan-th
                    </a>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/55">
                      LOCATION
                    </span>
                    <span className="font-bold text-black">
                      {IDENTITY.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form Card */}
            <div className="lg:col-span-6">
              <div className="bg-white p-6 sm:p-8 blueprint-box relative">
                {/* Viewfinder corners */}
                <span className="blueprint-corner blueprint-corner-tl" />
                <span className="blueprint-corner blueprint-corner-tr" />
                <span className="blueprint-corner blueprint-corner-bl" />
                <span className="blueprint-corner blueprint-corner-br" />

                <div>
                  {/* Form Header */}
                  <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C]" />
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-black">
                        SEND MESSAGE
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                      <label htmlFor="name-input" className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/55 mb-2">
                        NAME <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        required
                        placeholder="Jane Doe"
                        className="w-full bg-transparent border-b border-black/20 p-2.5 font-sans text-xs text-black placeholder:text-black/35 focus:outline-none focus:border-[#B91C1C] rounded-none transition-colors"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="email-input" className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/55 mb-2">
                        EMAIL <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        required
                        placeholder="jane@example.com"
                        className="w-full bg-transparent border-b border-black/20 p-2.5 font-sans text-xs text-black placeholder:text-black/35 focus:outline-none focus:border-[#B91C1C] rounded-none transition-colors"
                      />
                    </div>

                    {/* Subject Input */}
                    <div>
                      <label htmlFor="subject-input" className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/55 mb-2">
                        SUBJECT <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="subject-input"
                        type="text"
                        required
                        placeholder="Role, project, or idea..."
                        className="w-full bg-transparent border-b border-black/20 p-2.5 font-sans text-xs text-black placeholder:text-black/35 focus:outline-none focus:border-[#B91C1C] rounded-none transition-colors"
                      />
                    </div>

                    {/* Message Input */}
                    <div>
                      <label htmlFor="message-input" className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/55 mb-2">
                        MESSAGE <span className="text-[#B91C1C]">*</span>
                      </label>
                      <textarea
                        id="message-input"
                        required
                        rows={4}
                        placeholder="Tell me more..."
                        className="w-full bg-transparent border-b border-black/20 p-2.5 font-sans text-xs text-black placeholder:text-black/35 focus:outline-none focus:border-[#B91C1C] rounded-none resize-none transition-colors"
                      />
                    </div>

                    {/* Form Bottom Row */}
                    <div className="pt-4 flex items-center justify-between">
                      <span className="font-mono text-[9px] text-black/45">
                        RESPONSE TIME &lt; 48H
                      </span>

                      <button
                        type="submit"
                        className="border border-black font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3 hover:bg-black/5 transition-all inline-flex items-center gap-1.5"
                      >
                        <span>{submitted ? "SENT!" : "SEND MESSAGE"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FAF3EE] border-t-2 border-[#D9622B] text-black px-4 py-12 md:px-8 md:py-16 bg-grid">
        <div className="max-w-7xl mx-auto">
          {/* Top Row: Brand + Links */}
          <div className="grid md:grid-cols-12 gap-8 border-b border-black/10 pb-12 mb-8">
            {/* Left: Heading + Paragraph */}
            <div className="md:col-span-6 space-y-3">
              <h3 className="font-heading font-black text-lg text-black uppercase tracking-tight leading-[1.08]">
                ENGINEERING THE FUTURE.
              </h3>
              <p className="font-sans text-xs sm:text-sm text-black/60 max-w-md leading-relaxed">
                Building robust Full-Stack applications and Applied AI systems with Bauhaus precision and Neo-Brutalist scale.
              </p>
            </div>

            {/* Right: Two Link Columns with Monospace Links */}
            <div className="md:col-span-6 grid grid-cols-2 gap-8 md:justify-items-end">
              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#D9622B] mb-3">
                  SOCIALS
                </span>
                <ul className="space-y-2 font-mono text-[10px] uppercase tracking-wider">
                  <li>
                    <a
                      href="https://www.linkedin.com/in/jaiyan-th/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/75 hover:text-[#D9622B] transition-colors"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href={IDENTITY.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/75 hover:text-[#D9622B] transition-colors"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/75 hover:text-[#D9622B] transition-colors"
                    >
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#D9622B] mb-3">
                  NAVIGATION
                </span>
                <ul className="space-y-2 font-mono text-[10px] uppercase tracking-wider">
                  <li>
                    <a href="#about" className="text-black/75 hover:text-[#D9622B] transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#work" className="text-black/75 hover:text-[#D9622B] transition-colors">
                      Work
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-black/75 hover:text-[#D9622B] transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-black block">
                — JAIYANTH B © 2026
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <a
                href="#top"
                aria-label="Link"
                className="w-8 h-8 bg-white border border-black/25 text-black flex items-center justify-center hover:bg-black/5 transition-colors"
              >
                <Link2 className="w-4 h-4" />
              </a>

              <a
                href={IDENTITY.github}
                aria-label="Code Repository"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white border border-black/25 text-black flex items-center justify-center hover:bg-black/5 transition-colors"
              >
                <Code className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                aria-label="Share"
                className="w-8 h-8 bg-white border border-black/25 text-black flex items-center justify-center hover:bg-black/5 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
