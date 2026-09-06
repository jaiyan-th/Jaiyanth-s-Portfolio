"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { IDENTITY } from "@/data/portfolio";
import { motion } from "motion/react";

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
      let sent = false;
      try {
        const apiRes = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (apiRes.ok) {
          const apiData = await apiRes.json();
          if (apiData.success && !apiData.fallbackMailto) {
            sent = true;
          }
        }
      } catch (err) {
        console.warn("API contact route failed, falling back to direct provider:", err);
      }

      if (!sent) {
        try {
          const fsRes = await fetch(`https://formsubmit.co/ajax/${IDENTITY.email}`, {
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
          if (fsRes.ok) {
            const fsData = await fsRes.json();
            if (fsData.success === "true" || fsData.success === true) {
              sent = true;
            }
          }
        } catch (fsErr) {
          console.warn("Direct FormSubmit failed:", fsErr);
        }
      }

      if (sent) {
        setStatus("success");
        setStatusMessage("Message sent directly to inbox.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const mailtoUrl = `mailto:${IDENTITY.email}?subject=${encodeURIComponent(
          `[Portfolio] ${formData.subject}`
        )}&body=${encodeURIComponent(
          `From: ${formData.name} <${formData.email}>\n\nMessage:\n${formData.message}`
        )}`;
        window.open(mailtoUrl, "_blank");
        setStatus("success");
        setStatusMessage("Opened in your email client.");
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
      setStatusMessage("Opened in your email client.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div className="relative bg-[#FCFBF9]">
      <section id="contact" className="relative px-6 py-20 md:py-28 text-[#1A1A1A] scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 mb-16"
          >
            <span className="font-label text-[11px] tracking-[0.14em] uppercase text-[#6B6B6B] block">
              07 / Contact
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal leading-[1.15] tracking-tight">
              Start a <span className="italic text-[#2D5F4E]">conversation</span>.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 space-y-6">
              <p className="font-sans text-sm sm:text-base text-[#6B6B6B] leading-relaxed">
                Available for full-time engineering roles, high-impact prototypes, and technical engagements.
              </p>

              <div className="border-t border-b border-[#E5E2DC] py-6 space-y-4 font-sans text-sm">
                <div>
                  <span className="font-label text-[10px] tracking-wider uppercase text-[#6B6B6B] block mb-1">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${IDENTITY.email}`}
                    className="text-[#1A1A1A] hover:text-[#2D5F4E] transition-colors font-medium break-all"
                  >
                    {IDENTITY.email}
                  </a>
                </div>

                <div>
                  <span className="font-label text-[10px] tracking-wider uppercase text-[#6B6B6B] block mb-1">
                    Location
                  </span>
                  <span className="text-[#1A1A1A]">{IDENTITY.location}</span>
                </div>

                <div>
                  <span className="font-label text-[10px] tracking-wider uppercase text-[#6B6B6B] block mb-1">
                    Availability
                  </span>
                  <span className="text-[#2D5F4E] font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D5F4E]" />
                    Open to opportunities
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <span className="font-label text-[10px] tracking-wider uppercase text-[#6B6B6B] block mb-3">
                  Online Profiles
                </span>
                <div className="flex items-center gap-6 text-xs font-label uppercase tracking-wider">
                  <a
                    href="https://www.linkedin.com/in/jaiyan-th/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1A1A1A] hover:text-[#2D5F4E] transition-colors inline-flex items-center gap-1"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#2D5F4E]" />
                  </a>
                  <a
                    href={IDENTITY.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1A1A1A] hover:text-[#2D5F4E] transition-colors inline-flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#2D5F4E]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Underline-Only Form */}
            <div className="lg:col-span-7 bg-white border border-[#E5E2DC] p-6 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name-input" className="block font-label text-[10px] uppercase tracking-widest text-[#6B6B6B] mb-2">
                      Your Name
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full bg-transparent border-0 border-b border-[#E5E2DC] pb-2 font-sans text-sm text-[#1A1A1A] placeholder:text-[#6B6B6B]/40 focus:outline-none focus:border-[#2D5F4E] transition-colors rounded-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="email-input" className="block font-label text-[10px] uppercase tracking-widest text-[#6B6B6B] mb-2">
                      Your Email
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full bg-transparent border-0 border-b border-[#E5E2DC] pb-2 font-sans text-sm text-[#1A1A1A] placeholder:text-[#6B6B6B]/40 focus:outline-none focus:border-[#2D5F4E] transition-colors rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject-input" className="block font-label text-[10px] uppercase tracking-widest text-[#6B6B6B] mb-2">
                    Subject
                  </label>
                  <input
                    id="subject-input"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry / Full-time role"
                    className="w-full bg-transparent border-0 border-b border-[#E5E2DC] pb-2 font-sans text-sm text-[#1A1A1A] placeholder:text-[#6B6B6B]/40 focus:outline-none focus:border-[#2D5F4E] transition-colors rounded-none"
                  />
                </div>

                <div>
                  <label htmlFor="message-input" className="block font-label text-[10px] uppercase tracking-widest text-[#6B6B6B] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message-input"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your team, system goals, or timeline..."
                    className="w-full bg-transparent border-0 border-b border-[#E5E2DC] pb-2 font-sans text-sm text-[#1A1A1A] placeholder:text-[#6B6B6B]/40 focus:outline-none focus:border-[#2D5F4E] resize-none transition-colors rounded-none"
                  />
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                  <span className="font-sans text-xs text-[#6B6B6B]">
                    {statusMessage || "Response within 24–48 hours."}
                  </span>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="font-label text-xs tracking-[0.14em] uppercase px-6 py-3 bg-[#2D5F4E] text-white hover:bg-[#234b3d] disabled:opacity-60 transition-colors cursor-pointer"
                  >
                    {status === "submitting" ? "Sending..." : "Send message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Restrained Editorial Footer */}
      <footer className="border-t border-[#E5E2DC] px-6 py-10 bg-[#FCFBF9] text-[#6B6B6B] text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-label tracking-wider uppercase text-[11px]">
          <div>
            <span>© 2026 Jaiyanth B · AI + Full-Stack Engineer</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-[#1A1A1A] transition-colors">
              Top ↑
            </a>
            <a
              href={IDENTITY.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1A1A1A] transition-colors"
            >
              GitHub
            </a>
            <a
              href={IDENTITY.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1A1A1A] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
