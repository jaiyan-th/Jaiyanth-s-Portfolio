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
      <section id="contact" className="relative bg-[#0B0C0E] border-b border-[#232323] px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-[#F5F3EF] overflow-hidden bg-grid">
        <div className="max-w-7xl mx-auto">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-14 border-b border-[#232323] pb-8"
          >
            <span className="font-mono text-xs font-bold text-[#6D2932] tracking-widest uppercase block mb-1">
              06 —— CONTACT &amp; DISCOVERY
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#F5F3EF] leading-[1.08] tracking-tight uppercase">
              Start a <span className="text-[#6D2932]">conversation.</span>
            </h2>
            <p className="font-sans text-sm text-[#9A958D] mt-2 font-normal">
              Open for full-time engineering roles, internship opportunities, and technical collaboration.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left: Direct Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#6D2932] block">
                  // DIRECT DISCOVERY
                </span>
                
                <div className="space-y-6 text-sm font-mono">
                  <div>
                    <span className="text-[#9A958D] text-xs block mb-1">PRIMARY EMAIL</span>
                    <a
                      href={`mailto:${IDENTITY.email}`}
                      className="text-[#F5F3EF] hover:text-[#6D2932] transition-colors font-bold text-base break-all"
                    >
                      {IDENTITY.email}
                    </a>
                  </div>

                  <div>
                    <span className="text-[#9A958D] text-xs block mb-1">LOCATION</span>
                    <span className="text-[#F5F3EF] font-bold block">{IDENTITY.location}</span>
                  </div>

                  <div>
                    <span className="text-[#9A958D] text-xs block mb-1">STATUS</span>
                    <span className="text-[#F5F3EF] font-bold block">Open to full-time roles &amp; internships</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#232323]">
                <span className="font-mono text-xs font-bold text-[#9A958D] uppercase tracking-widest block mb-3">
                  CONNECT DIRECTLY
                </span>
                <div className="flex flex-wrap gap-4 font-mono text-xs font-bold">
                  <a
                    href="https://www.linkedin.com/in/jaiyan-th/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9A958D] hover:text-[#F5F3EF] transition-colors flex items-center gap-1"
                  >
                    <span>LINKEDIN</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={IDENTITY.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9A958D] hover:text-[#F5F3EF] transition-colors flex items-center gap-1"
                  >
                    <span>GITHUB</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right: Low-Pressure Editorial Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <div className="bg-[#141619] border border-[#232323] p-8">
                <div className="border-b border-[#232323] pb-4 mb-6">
                  <span className="font-mono text-xs font-bold text-[#F5F3EF] uppercase tracking-widest">
                    SEND A DIRECT MESSAGE
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name-input" className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#9A958D] mb-2">
                        YOUR NAME
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-[#0B0C0E] border border-[#232323] p-3 font-sans text-xs text-[#F5F3EF] font-medium placeholder:text-[#9A958D]/50 focus:outline-none focus:border-[#6D2932] transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email-input" className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#9A958D] mb-2">
                        YOUR EMAIL
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-[#0B0C0E] border border-[#232323] p-3 font-sans text-xs text-[#F5F3EF] font-medium placeholder:text-[#9A958D]/50 focus:outline-none focus:border-[#6D2932] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject-input" className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#9A958D] mb-2">
                      SUBJECT
                    </label>
                    <input
                      id="subject-input"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Role inquiry / Collaboration"
                      className="w-full bg-[#0B0C0E] border border-[#232323] p-3 font-sans text-xs text-[#F5F3EF] font-medium placeholder:text-[#9A958D]/50 focus:outline-none focus:border-[#6D2932] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message-input" className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#9A958D] mb-2">
                      MESSAGE
                    </label>
                    <textarea
                      id="message-input"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me more..."
                      className="w-full bg-[#0B0C0E] border border-[#232323] p-3.5 font-sans text-xs text-[#F5F3EF] font-medium placeholder:text-[#9A958D]/50 focus:outline-none focus:border-[#6D2932] resize-none transition-all"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#9A958D]">
                      {statusMessage || "RESPONSE TIME < 48H"}
                    </span>

                    <motion.button
                      type="submit"
                      disabled={status === "submitting"}
                      whileHover={{ x: 2 }}
                      className="bg-[#6D2932] hover:bg-[#582027] disabled:opacity-70 text-white font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 border border-[#6D2932] transition-colors inline-flex items-center gap-2 cursor-pointer"
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

      {/* Understated Dark Footer */}
      <footer className="bg-[#0B0C0E] border-t border-[#232323] text-[#F5F3EF] px-4 py-8 md:px-8 relative">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid md:grid-cols-12 gap-8 border-b border-[#232323] pb-8">
            <div className="md:col-span-6 space-y-2">
              <h3 className="font-heading font-black text-lg text-[#F5F3EF] uppercase tracking-tight">
                ENGINEERING THE FUTURE.
              </h3>
              <p className="font-sans text-xs text-[#9A958D] max-w-md leading-relaxed font-normal">
                Building robust Full-Stack applications and Applied AI systems engineered for real-world impact and production performance.
              </p>
            </div>

            <div className="md:col-span-6 grid grid-cols-2 gap-6 md:justify-items-end font-mono text-xs">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-[#6D2932] mb-3">
                  SOCIALS
                </span>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://www.linkedin.com/in/jaiyan-th/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9A958D] hover:text-[#F5F3EF] transition-colors"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href={IDENTITY.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9A958D] hover:text-[#F5F3EF] transition-colors"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-[#6D2932] mb-3">
                  NAVIGATION
                </span>
                <ul className="space-y-2">
                  <li>
                    <a href="#about" className="text-[#9A958D] hover:text-[#F5F3EF] transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#work" className="text-[#9A958D] hover:text-[#F5F3EF] transition-colors">
                      Work
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-[#9A958D] hover:text-[#F5F3EF] transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#9A958D]">
            <span>— JAIYANTH B © 2026</span>

            <div className="flex items-center gap-4">
              <a href="#hero" className="hover:text-[#F5F3EF] transition-colors">
                Back to Top ↑
              </a>
              <a href={IDENTITY.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5F3EF] transition-colors">
                Source Code
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
