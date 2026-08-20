"use client";

import * as React from "react";
import { ArrowUpRight, Link2, Code, Share2 } from "lucide-react";
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
        setStatusMessage("Message sent directly to inbox!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
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
    }
  };

  return (
    <div className="relative">
      {/* Contact Section */}
      <section id="contact" className="relative bg-[#E8D8C4] border-b-2 border-[#561C24] px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-[#561C24] overflow-hidden bg-grid">
        <div className="max-w-7xl mx-auto">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-12"
          >
            <span className="font-mono text-[10px] font-bold text-[#6D2932] tracking-widest uppercase block mb-1">
              06 —— CONTACT &amp; DISCOVERY
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#561C24] leading-[1.08] tracking-tight uppercase">
              Start a <span className="text-[#6D2932]">conversation.</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#561C24]/75 mt-2 font-semibold">
              Open for full-time engineering roles, internship opportunities, and technical collaboration.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-5 flex flex-col"
            >
              <div className="border-2 border-[#561C24] p-6 sm:p-8 bg-white shadow-[6px_6px_0px_#561C24] relative flex-1 flex flex-col justify-between rounded-sm">
                <span className="blueprint-corner blueprint-corner-tl" />
                <span className="blueprint-corner blueprint-corner-tr" />
                <span className="blueprint-corner blueprint-corner-bl" />
                <span className="blueprint-corner blueprint-corner-br" />

                <div>
                  <div className="border-b-2 border-[#561C24] pb-4 mb-6">
                    <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[#561C24]">
                      DIRECT DISCOVERY
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#561C24]/65 mb-1">
                        PRIMARY EMAIL
                      </span>
                      <a
                        href={`mailto:${IDENTITY.email}`}
                        className="font-mono text-sm sm:text-base font-black text-[#6D2932] hover:underline break-all"
                      >
                        {IDENTITY.email}
                      </a>
                    </div>

                    <div>
                      <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#561C24]/65 mb-1">
                        LOCATION
                      </span>
                      <span className="font-mono text-xs font-black text-[#561C24] block">
                        {IDENTITY.location}
                      </span>
                    </div>

                    <div>
                      <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#561C24]/65 mb-1">
                        CURRENT STATUS
                      </span>
                      <span className="font-mono text-xs font-black text-[#561C24] block">
                        Open to full-time roles &amp; internships
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t-2 border-[#561C24] mt-6">
                  <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#561C24]/65 mb-2">
                    CONNECT
                  </span>
                  <div className="flex flex-wrap gap-2 font-mono text-[10px]">
                    <a
                      href="https://www.linkedin.com/in/jaiyan-th/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 border-2 border-[#561C24] bg-[#E8D8C4] text-[#561C24] font-black hover:bg-[#6D2932] hover:text-white transition-colors shadow-[2px_2px_0px_#561C24]"
                    >
                      LINKEDIN
                    </a>
                    <a
                      href={IDENTITY.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 border-2 border-[#561C24] bg-[#E8D8C4] text-[#561C24] font-black hover:bg-[#6D2932] hover:text-white transition-colors shadow-[2px_2px_0px_#561C24]"
                    >
                      GITHUB
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col"
            >
              <div className="border-2 border-[#561C24] p-6 sm:p-8 bg-white shadow-[6px_6px_0px_#6D2932] relative flex-1 flex flex-col rounded-sm">
                <span className="blueprint-corner blueprint-corner-tl" />
                <span className="blueprint-corner blueprint-corner-tr" />
                <span className="blueprint-corner blueprint-corner-bl" />
                <span className="blueprint-corner blueprint-corner-br" />

                <div className="border-b-2 border-[#561C24] pb-4 mb-6 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[#561C24]">
                    SEND MESSAGE
                  </span>
                  <span className="font-mono text-[9px] text-[#6D2932] font-black uppercase bg-[#E8D8C4] px-2 py-0.5 border border-[#561C24]/30 shadow-[1px_1px_0px_#561C24]">
                    DIRECT ROUTE
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name-input" className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#561C24]/65 mb-1">
                          YOUR NAME
                        </label>
                        <input
                          id="name-input"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full bg-[#E8D8C4] border-b-2 border-[#561C24]/40 p-3 font-sans text-xs text-[#561C24] font-extrabold placeholder:text-[#561C24]/60 focus:outline-none focus:border-[#6D2932] focus:bg-white rounded-none transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="email-input" className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#561C24]/65 mb-1">
                          YOUR EMAIL
                        </label>
                        <input
                          id="email-input"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full bg-[#E8D8C4] border-b-2 border-[#561C24]/40 p-3 font-sans text-xs text-[#561C24] font-extrabold placeholder:text-[#561C24]/60 focus:outline-none focus:border-[#6D2932] focus:bg-white rounded-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject-input" className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#561C24]/65 mb-1">
                        SUBJECT
                      </label>
                      <input
                        id="subject-input"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Role inquiry / Collaboration"
                        className="w-full bg-[#E8D8C4] border-b-2 border-[#561C24]/40 p-3 font-sans text-xs text-[#561C24] font-extrabold placeholder:text-[#561C24]/60 focus:outline-none focus:border-[#6D2932] focus:bg-white rounded-none transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="message-input" className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#561C24]/65 mb-1">
                        MESSAGE
                      </label>
                      <textarea
                        id="message-input"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me more..."
                        className="w-full bg-[#E8D8C4] border-b-2 border-[#561C24]/40 p-3.5 font-sans text-xs text-[#561C24] font-extrabold placeholder:text-[#561C24]/60 focus:outline-none focus:border-[#6D2932] focus:bg-white rounded-none resize-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Form Bottom Row */}
                  <div className="pt-4 flex items-center justify-between">
                    <span className="font-mono text-[9px] font-black text-[#561C24]/75">
                      {statusMessage || "RESPONSE TIME < 48H"}
                    </span>

                    <motion.button
                      type="submit"
                      disabled={status === "submitting"}
                      whileHover={{ y: -2, x: -1, boxShadow: "4px 4px 0px #561C24" }}
                      whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #561C24" }}
                      className="bg-[#6D2932] hover:bg-[#582027] disabled:opacity-70 text-white font-mono text-[10px] font-black uppercase tracking-widest px-6 py-3.5 border-2 border-[#561C24] transition-colors inline-flex items-center gap-2 shadow-[2px_2px_0px_#561C24]"
                    >
                      <span>
                        {status === "submitting"
                          ? "SENDING..."
                          : status === "success"
                          ? "SENT!"
                          : "SEND MESSAGE"}
                      </span>
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compact Light Footer */}
      <footer className="bg-[#E8D8C4] border-t-2 border-[#561C24] text-[#561C24] px-4 py-6 md:px-8 md:py-8 relative bg-grid">
        <div className="max-w-7xl mx-auto">
          {/* Top Row: Brand + Links */}
          <div className="grid md:grid-cols-12 gap-6 border-b-2 border-[#561C24]/15 pb-6 mb-5">
            {/* Left: Heading + Paragraph */}
            <div className="md:col-span-6 space-y-2">
              <h3 className="font-heading font-black text-base sm:text-lg text-[#561C24] uppercase tracking-tight leading-[1.08]">
                ENGINEERING THE FUTURE.
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#561C24]/80 max-w-md leading-relaxed font-medium">
                Building robust Full-Stack applications and Applied AI systems engineered for real-world impact and production performance.
              </p>
            </div>

            {/* Right: Two Link Columns with Monospace Links */}
            <div className="md:col-span-6 grid grid-cols-2 gap-6 md:justify-items-end">
              <div>
                <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-[#6D2932] mb-2">
                  SOCIALS
                </span>
                <ul className="space-y-1.5 font-mono text-[10px] uppercase tracking-wider font-bold">
                  <li>
                    <a
                      href="https://www.linkedin.com/in/jaiyan-th/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#561C24]/80 hover:text-[#6D2932] transition-colors"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href={IDENTITY.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#561C24]/80 hover:text-[#6D2932] transition-colors"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-[#6D2932] mb-2">
                  NAVIGATION
                </span>
                <ul className="space-y-1.5 font-mono text-[10px] uppercase tracking-wider font-bold">
                  <li>
                    <a href="#about" className="text-[#561C24]/80 hover:text-[#6D2932] transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#work" className="text-[#561C24]/80 hover:text-[#6D2932] transition-colors">
                      Work
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-[#561C24]/80 hover:text-[#6D2932] transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[#561C24]/80 block">
                — JAIYANTH B © 2026
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <motion.a
                href="#hero"
                whileHover={{ y: -2 }}
                aria-label="Back to Top"
                className="w-8 h-8 bg-white border-2 border-[#561C24] text-[#561C24] flex items-center justify-center hover:bg-[#6D2932] hover:text-white transition-colors shadow-[2px_2px_0px_#561C24]"
              >
                <Link2 className="w-3.5 h-3.5" />
              </motion.a>

              <motion.a
                href={IDENTITY.github}
                whileHover={{ y: -2 }}
                aria-label="Code Repository"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white border-2 border-[#561C24] text-[#561C24] flex items-center justify-center hover:bg-[#6D2932] hover:text-white transition-colors shadow-[2px_2px_0px_#561C24]"
              >
                <Code className="w-3.5 h-3.5" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                aria-label="Share"
                className="w-8 h-8 bg-white border-2 border-[#561C24] text-[#561C24] flex items-center justify-center hover:bg-[#6D2932] hover:text-white transition-colors shadow-[2px_2px_0px_#561C24]"
              >
                <Share2 className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
