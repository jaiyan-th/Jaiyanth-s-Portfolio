"use client";

import * as React from "react";
import { ArrowUpRight, Link2, Code, Share2 } from "lucide-react";
import { IDENTITY } from "@/data/portfolio";

export function Contact() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const fieldMap: Record<string, string> = {
      "name-input": "name",
      "email-input": "email",
      "subject-input": "subject",
      "message-input": "message",
    };
    const field = fieldMap[id] || id;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setStatus("submitting");

    try {
      // Direct client POST to FormSubmit.co (Zero API key required)
      const fsPromise = fetch(`https://formsubmit.co/ajax/${IDENTITY.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio Contact] ${formData.subject} - from ${formData.name}`,
          _replyto: formData.email,
          message: `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`,
          _captcha: "false",
        }),
      });

      // API route POST fallback
      const apiPromise = fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const [fsRes, apiRes] = await Promise.allSettled([fsPromise, apiPromise]);

      let sent = false;
      if (fsRes.status === "fulfilled" && fsRes.value.ok) {
        const fsData = await fsRes.value.json();
        if (fsData.success === "true" || fsData.success === true) sent = true;
      }
      if (!sent && apiRes.status === "fulfilled" && apiRes.value.ok) {
        const apiData = await apiRes.value.json();
        if (apiData.success) sent = true;
      }

      if (sent) {
        setStatus("success");
        setStatusMessage("Message sent directly to inbox!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // Direct mailto trigger fallback
        const mailtoUrl = `mailto:${IDENTITY.email}?subject=${encodeURIComponent(
          `[Portfolio] ${formData.subject}`
        )}&body=${encodeURIComponent(
          `From: ${formData.name} <${formData.email}>\n\nMessage:\n${formData.message}`
        )}`;
        window.open(mailtoUrl, "_blank");
        setStatus("success");
        setStatusMessage("Opened in your email client!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      const mailtoUrl = `mailto:${IDENTITY.email}?subject=${encodeURIComponent(
        `[Portfolio] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `From: ${formData.name} <${formData.email}>\n\nMessage:\n${formData.message}`
      )}`;
      window.open(mailtoUrl, "_blank");
      setStatus("success");
      setStatusMessage("Opened in your email client!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } finally {
      setTimeout(() => {
        setStatus("idle");
        setStatusMessage("");
      }, 6000);
    }
  };

  return (
    <div className="bg-[#FAF3EE] text-black relative">
      {/* Contact Section */}
      <section id="contact" className="border-b border-black/10 px-4 py-12 md:px-8 md:py-20 bg-grid">
        <div className="max-w-7xl mx-auto">
          {/* Top Badge */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] font-bold text-[#B91C1C] tracking-widest uppercase block">
              06 —— CONTACT
            </span>
            <div className="h-[1px] flex-1 bg-black/10" />
          </div>

          {/* Grid Layout */}
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Info & Links */}
            <div className="lg:col-span-6 space-y-8">
              {/* Top Text Content */}
              <div>
                <h2 className="font-heading font-black text-3xl sm:text-5xl text-black leading-[1.08] tracking-tight uppercase mb-6">
                  Let's start a <br />
                  <span className="italic text-[#B91C1C]">// conversation.</span>
                </h2>

                {/* Quote Box */}
                <div className="border-l-2 border-[#B91C1C] pl-4 py-1 mb-6">
                  <p className="font-sans text-xs sm:text-sm text-black/80 font-semibold leading-relaxed">
                    Open to applied-AI and full-stack engineering roles. I read every message and reply within a few days.
                  </p>
                </div>

                <p className="font-sans text-xs sm:text-sm text-black/60">
                  Send a note about a role, a project, or a research idea.
                </p>
              </div>

              {/* Contact Links List */}
              <div className="pt-6 border-t border-black/10">
                <div className="divide-y divide-black/10 font-mono text-xs">
                  <div className="flex items-center justify-between py-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">
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
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">
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
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">
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
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">
                      LOCATION
                    </span>
                    <span className="font-bold text-black">
                      {IDENTITY.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form Card (Light & Enhanced) */}
            <div className="lg:col-span-6">
              <div className="bg-white border border-black/15 p-6 sm:p-8 relative shadow-xl text-black">
                {/* Viewfinder corners */}
                <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#B91C1C] pointer-events-none" />
                <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#B91C1C] pointer-events-none" />
                <span className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#B91C1C] pointer-events-none" />
                <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#B91C1C] pointer-events-none" />

                <div>
                  {/* Form Header */}
                  <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B91C1C] animate-pulse" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-black">
                        SEND MESSAGE
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                      <label htmlFor="name-input" className="block font-mono text-[10px] font-extrabold uppercase tracking-widest text-black mb-2">
                        NAME <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className="w-full bg-[#FAF3EE] border-b-2 border-black/40 p-3.5 font-sans text-xs text-black font-bold placeholder:text-black/75 focus:outline-none focus:border-[#B91C1C] focus:bg-white rounded-none transition-all"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="email-input" className="block font-mono text-[10px] font-extrabold uppercase tracking-widest text-black mb-2">
                        EMAIL <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className="w-full bg-[#FAF3EE] border-b-2 border-black/40 p-3.5 font-sans text-xs text-black font-bold placeholder:text-black/75 focus:outline-none focus:border-[#B91C1C] focus:bg-white rounded-none transition-all"
                      />
                    </div>

                    {/* Subject Input */}
                    <div>
                      <label htmlFor="subject-input" className="block font-mono text-[10px] font-extrabold uppercase tracking-widest text-black mb-2">
                        SUBJECT <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="subject-input"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Role, project, or idea..."
                        className="w-full bg-[#FAF3EE] border-b-2 border-black/40 p-3.5 font-sans text-xs text-black font-bold placeholder:text-black/75 focus:outline-none focus:border-[#B91C1C] focus:bg-white rounded-none transition-all"
                      />
                    </div>

                    {/* Message Input */}
                    <div>
                      <label htmlFor="message-input" className="block font-mono text-[10px] font-extrabold uppercase tracking-widest text-black mb-2">
                        MESSAGE <span className="text-[#B91C1C]">*</span>
                      </label>
                      <textarea
                        id="message-input"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me more..."
                        className="w-full bg-[#FAF3EE] border-b-2 border-black/40 p-3.5 font-sans text-xs text-black font-bold placeholder:text-black/75 focus:outline-none focus:border-[#B91C1C] focus:bg-white rounded-none resize-none transition-all"
                      />
                    </div>

                    {/* Form Bottom Row */}
                    <div className="pt-4 flex items-center justify-between">
                      <span className="font-mono text-[9px] font-semibold text-black/55">
                        {statusMessage || "RESPONSE TIME < 48H"}
                      </span>

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="bg-[#B91C1C] hover:bg-[#9B1515] disabled:opacity-70 text-white font-mono text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 border border-black/20 transition-all inline-flex items-center gap-2 shadow-md active:translate-y-0.5"
                      >
                        <span>
                          {status === "submitting"
                            ? "SENDING..."
                            : status === "success"
                            ? "SENT!"
                            : "SEND MESSAGE"}
                        </span>
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

      {/* Footer (Dark Charcoal) */}
      <footer className="bg-[#0B0C0E] border-t border-white/10 text-white px-4 py-12 md:px-8 md:py-16 relative" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)", backgroundSize: "48px 48px" }}>
        <div className="max-w-7xl mx-auto">
          {/* Top Row: Brand + Links */}
          <div className="grid md:grid-cols-12 gap-8 border-b border-white/10 pb-12 mb-8">
            {/* Left: Heading + Paragraph */}
            <div className="md:col-span-6 space-y-3">
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight leading-[1.08]">
                ENGINEERING THE FUTURE.
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/70 max-w-md leading-relaxed">
                Building robust Full-Stack applications and Applied AI systems with Bauhaus precision and Neo-Brutalist scale.
              </p>
            </div>

            {/* Right: Two Link Columns with Monospace Links */}
            <div className="md:col-span-6 grid grid-cols-2 gap-8 md:justify-items-end">
              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#FF4D4D] mb-3">
                  SOCIALS
                </span>
                <ul className="space-y-2 font-mono text-[10px] uppercase tracking-wider">
                  <li>
                    <a
                      href="https://www.linkedin.com/in/jaiyan-th/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-[#FF4D4D] transition-colors"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href={IDENTITY.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-[#FF4D4D] transition-colors"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-[#FF4D4D] transition-colors"
                    >
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#FF4D4D] mb-3">
                  NAVIGATION
                </span>
                <ul className="space-y-2 font-mono text-[10px] uppercase tracking-wider">
                  <li>
                    <a href="#about" className="text-white/80 hover:text-[#FF4D4D] transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#work" className="text-white/80 hover:text-[#FF4D4D] transition-colors">
                      Work
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-white/80 hover:text-[#FF4D4D] transition-colors">
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
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                — JAIYANTH B © 2026
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <a
                href="#top"
                aria-label="Link"
                className="w-8 h-8 bg-[#18191C] border border-white/20 text-white flex items-center justify-center hover:bg-[#FF4D4D] hover:border-[#FF4D4D] transition-colors"
              >
                <Link2 className="w-4 h-4" />
              </a>

              <a
                href={IDENTITY.github}
                aria-label="Code Repository"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#18191C] border border-white/20 text-white flex items-center justify-center hover:bg-[#FF4D4D] hover:border-[#FF4D4D] transition-colors"
              >
                <Code className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                aria-label="Share"
                className="w-8 h-8 bg-[#18191C] border border-white/20 text-white flex items-center justify-center hover:bg-[#FF4D4D] hover:border-[#FF4D4D] transition-colors"
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
