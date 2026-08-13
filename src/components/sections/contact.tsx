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
      <section id="contact" className="border-b-2 border-black px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-grid">
        <div className="max-w-7xl mx-auto">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="font-mono text-[10px] font-bold text-[#B91C1C] tracking-widest uppercase block">
              06 —— CONTACT
            </span>
            <div className="h-[2px] flex-1 bg-black/20" />
          </motion.div>

          {/* Grid Layout */}
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Info & Links */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-6 space-y-8"
            >
              {/* Top Text Content */}
              <div>
                <h2 className="font-heading font-black text-3xl sm:text-5xl text-black leading-[1.08] tracking-tight uppercase mb-6">
                  Let's start a <br />
                  <span className="italic text-[#B91C1C]">// conversation.</span>
                </h2>

                {/* Quote Box */}
                <div className="border-l-4 border-[#B91C1C] pl-4 py-1.5 mb-6 bg-white/60">
                  <p className="font-sans text-xs sm:text-sm text-black/80 font-bold leading-relaxed">
                    Open to applied-AI and full-stack engineering roles. I read every message and reply within a few days.
                  </p>
                </div>

                <p className="font-sans text-xs sm:text-sm text-black/70 font-semibold">
                  Send a note about a role, a project, or a research idea.
                </p>
              </div>

              {/* Contact Links List */}
              <div className="pt-6 border-t-2 border-black">
                <div className="divide-y-2 divide-black/10 font-mono text-xs">
                  <motion.div whileHover={{ x: 4 }} className="flex items-center justify-between py-4 group">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/60">
                      EMAIL
                    </span>
                    <a
                      href={`mailto:${IDENTITY.email}`}
                      className="font-black text-black group-hover:text-[#B91C1C] transition-colors"
                    >
                      {IDENTITY.email}
                    </a>
                  </motion.div>

                  <motion.div whileHover={{ x: 4 }} className="flex items-center justify-between py-4 group">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/60">
                      GITHUB
                    </span>
                    <a
                      href={IDENTITY.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-black text-black group-hover:text-[#B91C1C] transition-colors"
                    >
                      github.com/jaiyan-th
                    </a>
                  </motion.div>

                  <motion.div whileHover={{ x: 4 }} className="flex items-center justify-between py-4 group">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/60">
                      LINKEDIN
                    </span>
                    <a
                      href="https://www.linkedin.com/in/jaiyan-th/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-black text-black group-hover:text-[#B91C1C] transition-colors"
                    >
                      linkedin.com/in/jaiyan-th
                    </a>
                  </motion.div>

                  <motion.div whileHover={{ x: 4 }} className="flex items-center justify-between py-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/60">
                      LOCATION
                    </span>
                    <span className="font-black text-black">
                      {IDENTITY.location}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4, x: -2, boxShadow: "8px 8px 0px #000000" }}
              className="lg:col-span-6 bg-white border-2 border-black p-6 sm:p-8 relative shadow-[5px_5px_0px_#000000] text-black rounded-sm transition-all"
            >
              {/* Viewfinder corners */}
              <span className="blueprint-corner blueprint-corner-tl" />
              <span className="blueprint-corner blueprint-corner-tr" />
              <span className="blueprint-corner blueprint-corner-bl" />
              <span className="blueprint-corner blueprint-corner-br" />

              <div>
                {/* Form Header */}
                <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C] animate-ping" />
                    <span className="font-mono text-[10px] font-black uppercase tracking-wider text-black">
                      SEND MESSAGE
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name-input" className="block font-mono text-[10px] font-black uppercase tracking-widest text-black mb-2">
                      NAME <span className="text-[#B91C1C]">*</span>
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full bg-[#FAF3EE] border-b-2 border-black/40 p-3.5 font-sans text-xs text-black font-extrabold placeholder:text-black/60 focus:outline-none focus:border-[#B91C1C] focus:bg-white rounded-none transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email-input" className="block font-mono text-[10px] font-black uppercase tracking-widest text-black mb-2">
                      EMAIL <span className="text-[#B91C1C]">*</span>
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full bg-[#FAF3EE] border-b-2 border-black/40 p-3.5 font-sans text-xs text-black font-extrabold placeholder:text-black/60 focus:outline-none focus:border-[#B91C1C] focus:bg-white rounded-none transition-all"
                    />
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label htmlFor="subject-input" className="block font-mono text-[10px] font-black uppercase tracking-widest text-black mb-2">
                      SUBJECT <span className="text-[#B91C1C]">*</span>
                    </label>
                    <input
                      id="subject-input"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Role, project, or idea..."
                      className="w-full bg-[#FAF3EE] border-b-2 border-black/40 p-3.5 font-sans text-xs text-black font-extrabold placeholder:text-black/60 focus:outline-none focus:border-[#B91C1C] focus:bg-white rounded-none transition-all"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="message-input" className="block font-mono text-[10px] font-black uppercase tracking-widest text-black mb-2">
                      MESSAGE <span className="text-[#B91C1C]">*</span>
                    </label>
                    <textarea
                      id="message-input"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me more..."
                      className="w-full bg-[#FAF3EE] border-b-2 border-black/40 p-3.5 font-sans text-xs text-black font-extrabold placeholder:text-black/60 focus:outline-none focus:border-[#B91C1C] focus:bg-white rounded-none resize-none transition-all"
                    />
                  </div>

                  {/* Form Bottom Row */}
                  <div className="pt-4 flex items-center justify-between">
                    <span className="font-mono text-[9px] font-black text-black/70">
                      {statusMessage || "RESPONSE TIME < 48H"}
                    </span>

                    <motion.button
                      type="submit"
                      disabled={status === "submitting"}
                      whileHover={{ y: -2, x: -1, boxShadow: "4px 4px 0px #000000" }}
                      whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                      className="bg-[#B91C1C] hover:bg-[#FF4D4D] disabled:opacity-70 text-white font-mono text-[10px] font-black uppercase tracking-widest px-6 py-3.5 border-2 border-black transition-colors inline-flex items-center gap-2 shadow-[2px_2px_0px_#000000]"
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

      {/* Footer */}
      <footer className="bg-[#0B0C0E] border-t-2 border-white/10 text-white px-4 py-12 md:px-8 md:py-16 relative" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)", backgroundSize: "48px 48px" }}>
        <div className="max-w-7xl mx-auto">
          {/* Top Row: Brand + Links */}
          <div className="grid md:grid-cols-12 gap-8 border-b-2 border-white/10 pb-12 mb-8">
            {/* Left: Heading + Paragraph */}
            <div className="md:col-span-6 space-y-3">
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight leading-[1.08]">
                ENGINEERING THE FUTURE.
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/70 max-w-md leading-relaxed font-medium">
                Building robust Full-Stack applications and Applied AI systems with Bauhaus precision and Neo-Brutalist scale.
              </p>
            </div>

            {/* Right: Two Link Columns with Monospace Links */}
            <div className="md:col-span-6 grid grid-cols-2 gap-8 md:justify-items-end">
              <div>
                <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-[#FF4D4D] mb-3">
                  SOCIALS
                </span>
                <ul className="space-y-2 font-mono text-[10px] uppercase tracking-wider font-bold">
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
                <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-[#FF4D4D] mb-3">
                  NAVIGATION
                </span>
                <ul className="space-y-2 font-mono text-[10px] uppercase tracking-wider font-bold">
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
              <span className="font-mono text-[10px] font-black uppercase tracking-wider text-white/80 block">
                — JAIYANTH B © 2026
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <motion.a
                href="#top"
                whileHover={{ y: -2 }}
                aria-label="Link"
                className="w-9 h-9 bg-[#18191C] border-2 border-white/20 text-white flex items-center justify-center hover:bg-[#FF4D4D] hover:border-[#FF4D4D] transition-colors shadow-[2px_2px_0px_#000]"
              >
                <Link2 className="w-4 h-4" />
              </motion.a>

              <motion.a
                href={IDENTITY.github}
                whileHover={{ y: -2 }}
                aria-label="Code Repository"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#18191C] border-2 border-white/20 text-white flex items-center justify-center hover:bg-[#FF4D4D] hover:border-[#FF4D4D] transition-colors shadow-[2px_2px_0px_#000]"
              >
                <Code className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                aria-label="Share"
                className="w-9 h-9 bg-[#18191C] border-2 border-white/20 text-white flex items-center justify-center hover:bg-[#FF4D4D] hover:border-[#FF4D4D] transition-colors shadow-[2px_2px_0px_#000]"
              >
                <Share2 className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
