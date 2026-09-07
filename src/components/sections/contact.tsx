"use client";

import * as React from "react";
import { ArrowUpRight, Mail, MapPin, Send } from "lucide-react";
import { IDENTITY } from "@/data/portfolio";
import { motion } from "motion/react";
import { fadeUpVariants } from "@/lib/motion";
import { SectionContainer } from "@/components/layout/section-container";

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
    <div className="relative bg-[#FAF3EE]">
      <section id="contact" className="relative py-16 md:py-24 text-[#111111] scroll-mt-20">
        <SectionContainer className="space-y-12">
          {/* Section Header: Plain bold black headline, no italic, no color */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUpVariants}
            className="space-y-4"
          >
            {/* Sticker Badge + Beside Subtitle */}
            <div className="flex items-center gap-2.5">
              <span className="sticker-badge bg-[#111111] text-white -rotate-1">
                <Send className="w-3.5 h-3.5 text-[#FFFFFF]" />
                CONTACT
              </span>
              <span className="font-body italic text-[#D9622B] text-sm font-semibold">
                / start here
              </span>
            </div>

            {/* Section Headline with ONE italic accent word (talk) */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-extrabold text-[#111111] leading-[1.08] tracking-tight">
              Let&apos;s{" "}
              <span className="italic text-[#D9622B]">talk.</span>
            </h2>
            <p className="font-body text-base sm:text-lg lg:text-[1.2rem] text-[#444444] max-w-2xl xl:max-w-3xl">
              Open for full-time engineering roles, internship opportunities, and technical collaboration.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Direct Contact Block (Left 5 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-5"
            >
              <div className="neo-card p-6 sm:p-8 lg:p-10 bg-white space-y-6">
                <div className="flex items-center justify-between border-b-2 border-[#111111] pb-3.5">
                  <span className="font-label-caps text-xs sm:text-[13px] text-[#555555]">
                    DIRECT CONTACT
                  </span>
                  <span className="sticker-badge bg-[#111111] text-white text-[10px] sm:text-[11px] py-0.5 px-2.5 rotate-1">
                    AVAILABLE 2026
                  </span>
                </div>

                <div className="space-y-5 font-body text-sm sm:text-base">
                  <div>
                    <span className="font-label-caps text-[11px] sm:text-xs text-[#777777] block mb-1.5">
                      EMAIL
                    </span>
                    <a
                      href="mailto:jaiyanthofficial@gmail.com"
                      className="font-mono-code text-sm sm:text-base font-bold text-[#111111] hover:opacity-75 transition-opacity break-all inline-flex items-center gap-1.5"
                    >
                      <Mail className="w-4 h-4 text-[#111111]" />
                      jaiyanthofficial@gmail.com
                    </a>
                  </div>

                  <div className="border-t-[1.5px] border-[#111111]/20 pt-4">
                    <span className="font-label-caps text-[11px] sm:text-xs text-[#777777] block mb-1.5">
                      LOCATION
                    </span>
                    <p className="font-body text-sm sm:text-base font-semibold text-[#111111] flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#111111]" />
                      Karur, Tamil Nadu, India
                    </p>
                  </div>
                </div>

                {/* Online Profiles Links */}
                <div className="border-t-2 border-[#111111] pt-4">
                  <span className="font-label-caps text-[10px] text-[#777777] block mb-3">
                    ONLINE PROFILES
                  </span>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://www.linkedin.com/in/jaiyan-th/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn-secondary px-4 py-2 font-label-caps text-xs inline-flex items-center gap-1"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={IDENTITY.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn-secondary px-4 py-2 font-label-caps text-xs inline-flex items-center gap-1"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Underline-Only Form */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="lg:col-span-7"
            >
              <div className="neo-card p-6 sm:p-8 lg:p-10 bg-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name-input" className="block font-label-caps text-[11px] text-[#111111] mb-2 font-bold">
                        Your name
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className="w-full bg-transparent border-0 border-b-[3px] border-[#111111] pb-2 font-body text-sm sm:text-base text-[#111111] placeholder:text-[#888888] focus:outline-none focus:border-[#111111] transition-colors rounded-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="email-input" className="block font-label-caps text-[11px] text-[#111111] mb-2 font-bold">
                        Your email
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className="w-full bg-transparent border-0 border-b-[3px] border-[#111111] pb-2 font-body text-sm sm:text-base text-[#111111] placeholder:text-[#888888] focus:outline-none focus:border-[#111111] transition-colors rounded-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject-input" className="block font-label-caps text-[11px] text-[#111111] mb-2 font-bold">
                      Subject
                    </label>
                    <input
                      id="subject-input"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry / Full-time role"
                      className="w-full bg-transparent border-0 border-b-[3px] border-[#111111] pb-2 font-body text-sm sm:text-base text-[#111111] placeholder:text-[#888888] focus:outline-none focus:border-[#111111] transition-colors rounded-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="message-input" className="block font-label-caps text-[11px] text-[#111111] mb-2 font-bold">
                      Message
                    </label>
                    <textarea
                      id="message-input"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your team, system goals, or timeline..."
                      className="w-full bg-transparent border-0 border-b-[3px] border-[#111111] pb-2 font-body text-sm sm:text-base text-[#111111] placeholder:text-[#888888] focus:outline-none focus:border-[#111111] resize-none transition-colors rounded-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <span className="font-label-caps text-[11px] text-[#666666] tracking-wider">
                      {statusMessage || "Response time under 48h"}
                    </span>

                    {/* Primary CTA button: solid orange fill */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="neo-btn-primary px-8 py-3.5 text-xs inline-flex items-center justify-center cursor-pointer font-extrabold tracking-wider text-[#111111]"
                    >
                      {status === "submitting" ? "Sending..." : "Send message"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </SectionContainer>
      </section>

      {/* Expressive Neo-Brutalist Footer */}
      <footer className="border-t-[3px] border-[#111111] py-10 bg-[#FAF3EE] text-[#111111]">
        <SectionContainer className="flex flex-col sm:flex-row items-center justify-between gap-6 font-label-caps text-xs">
          <div>
            <span className="font-heading font-extrabold text-sm text-[#111111]">
              Jaiyanth B — AI &amp; Full-Stack Engineer
            </span>
          </div>

          <div className="flex items-center gap-6 font-bold">
            <a href="#about" className="hover:text-[#111111] hover:underline transition-colors">
              About
            </a>
            <a href="#work" className="hover:text-[#111111] hover:underline transition-colors">
              Work
            </a>
            <a href="#contact" className="hover:text-[#111111] hover:underline transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4 text-[#555555]">
            <span>© 2026 Jaiyanth B. All rights reserved.</span>
            <a href="#hero" className="hover:text-[#111111] font-bold transition-colors">
              Back to top ↑
            </a>
            <a
              href="https://github.com/jaiyan-th/Jaiyanth-s-Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111111] font-bold transition-colors inline-flex items-center gap-0.5"
            >
              <span>GitHub repo</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </SectionContainer>
      </footer>
    </div>
  );
}
