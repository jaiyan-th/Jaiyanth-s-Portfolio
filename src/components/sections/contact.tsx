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
      {/* Contact Section — Clean Warm Section Background */}
      <section id="contact" className="relative bg-[#FAF5E8] border-b-2 border-black px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-black">
        <div className="max-w-7xl mx-auto">
          {/* Main White Box (karolbinkow.ski LET'S TALK Box) */}
          <div className="bg-white border-2 border-black p-8 sm:p-12 shadow-[8px_8px_0px_#000000] relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-[#FFC000] border border-black inline-block" />
              <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
                LET'S TALK
              </span>
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-[44px] text-black leading-[1.08] tracking-tight uppercase mb-8">
              HAVE A PROBLEM THAT <br />
              <span className="bg-[#FFC000] text-black px-2 py-0.5 inline-block border-2 border-black shadow-[3px_3px_0px_#000000] mt-1">
                NEEDS TO SHIP?
              </span>
            </h2>

            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Direct Info */}
              <div className="lg:col-span-5 space-y-6">
                <p className="font-sans text-sm sm:text-base text-black/90 font-semibold leading-relaxed">
                  Open for full-time engineering roles, internship opportunities, and technical collaboration.
                </p>

                <div className="border-t-2 border-b-2 border-black py-4 space-y-4 font-mono text-xs">
                  <div>
                    <span className="text-black/60 font-black uppercase tracking-wider block mb-1">PRIMARY EMAIL</span>
                    <a
                      href={`mailto:${IDENTITY.email}`}
                      className="text-black font-black text-base hover:text-[#E5AC00] transition-colors break-all"
                    >
                      {IDENTITY.email}
                    </a>
                  </div>

                  <div>
                    <span className="text-black/60 font-black uppercase tracking-wider block mb-1">LOCATION</span>
                    <span className="text-black font-black block">{IDENTITY.location}</span>
                  </div>

                  <div>
                    <span className="text-black/60 font-black uppercase tracking-wider block mb-1">STATUS</span>
                    <span className="text-emerald-700 font-extrabold block">● Available for 2026</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="font-mono text-xs font-black text-black/60 uppercase tracking-wider block mb-3">
                    CONNECT DIRECTLY
                  </span>
                  <div className="flex flex-wrap gap-2 font-mono text-xs font-black">
                    <a
                      href="https://www.linkedin.com/in/jaiyan-th/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#EFEFEA] text-black px-3.5 py-2 border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-[#FFC000] transition-colors inline-flex items-center gap-1"
                    >
                      <span>LINKEDIN</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={IDENTITY.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#EFEFEA] text-black px-3.5 py-2 border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-[#FFC000] transition-colors inline-flex items-center gap-1"
                    >
                      <span>GITHUB</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Direct Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name-input" className="block font-mono text-[10px] font-black uppercase tracking-widest text-black/60 mb-1">
                        YOUR NAME
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-[#EFEFEA] border-2 border-black p-3 font-sans text-xs text-black font-extrabold placeholder:text-black/40 focus:outline-none focus:bg-white transition-all shadow-[2px_2px_0px_#000000]"
                      />
                    </div>

                    <div>
                      <label htmlFor="email-input" className="block font-mono text-[10px] font-black uppercase tracking-widest text-black/60 mb-1">
                        YOUR EMAIL
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-[#EFEFEA] border-2 border-black p-3 font-sans text-xs text-black font-extrabold placeholder:text-black/40 focus:outline-none focus:bg-white transition-all shadow-[2px_2px_0px_#000000]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject-input" className="block font-mono text-[10px] font-black uppercase tracking-widest text-black/60 mb-1">
                      SUBJECT
                    </label>
                    <input
                      id="subject-input"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Role inquiry / Collaboration"
                      className="w-full bg-[#EFEFEA] border-2 border-black p-3 font-sans text-xs text-black font-extrabold placeholder:text-black/40 focus:outline-none focus:bg-white transition-all shadow-[2px_2px_0px_#000000]"
                    />
                  </div>

                  <div>
                    <label htmlFor="message-input" className="block font-mono text-[10px] font-black uppercase tracking-widest text-black/60 mb-1">
                      MESSAGE
                    </label>
                    <textarea
                      id="message-input"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me more about your requirements..."
                      className="w-full bg-[#EFEFEA] border-2 border-black p-3.5 font-sans text-xs text-black font-extrabold placeholder:text-black/40 focus:outline-none focus:bg-white resize-none transition-all shadow-[2px_2px_0px_#000000]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-black text-black/60">
                      {statusMessage || "RESPONSE TIME < 48H"}
                    </span>

                    <motion.button
                      type="submit"
                      disabled={status === "submitting"}
                      whileHover={{ y: -2, x: -1, boxShadow: "5px 5px 0px #000000" }}
                      whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                      className="bg-[#FFC000] hover:bg-[#E5AC00] disabled:opacity-70 text-black font-mono text-xs font-black uppercase tracking-widest px-6 py-3.5 border-2 border-black shadow-[3px_3px_0px_#000000] transition-colors inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>
                        {status === "submitting"
                          ? "SENDING..."
                          : status === "success"
                          ? "SENT!"
                          : "SEND MESSAGE →"}
                      </span>
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understated karolbinkow.ski Footer */}
      <footer className="bg-[#EFEFEA] text-black px-4 py-8 md:px-8 border-b-2 border-black">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs font-black border-b-2 border-black pb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black text-white flex items-center justify-center text-[10px]">JB</div>
              <span className="uppercase">JAIYANTH B — SOFTWARE ENGINEER</span>
            </div>

            <div className="flex items-center gap-6 uppercase">
              <a href="#about" className="hover:underline">About</a>
              <a href="#work" className="hover:underline">Work</a>
              <a href="#contact" className="hover:underline">Contact</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] font-black text-black/70">
            <span>© 2026 JAIYANTH B. ALL RIGHTS RESERVED.</span>

            <div className="flex items-center gap-4">
              <a href="#hero" className="hover:text-black transition-colors">BACK TO TOP ↑</a>
              <a href={IDENTITY.github} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">GITHUB REPO</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
