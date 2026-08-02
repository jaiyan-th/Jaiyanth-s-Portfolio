"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { IDENTITY, NAV_ITEMS, SITE } from "@/data/portfolio";
import { EASE, DURATION } from "@/lib/motion";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="bg-grid">
        <div className="container-editorial py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-12">
            {/* CTA */}
            <div className="md:col-span-7">
              <span className="font-mono-label text-secondary">[ 07 / Footer ]</span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: DURATION.reveal, ease: EASE.primary }}
                className="mt-5 font-display text-section text-balance"
              >
                Let&apos;s build something{" "}
                <span className="font-serif-editorial italic" style={{ color: "var(--accent)" }}>
                  useful
                </span>
                .
              </motion.h2>
              <p className="mt-6 max-w-md text-body text-secondary">
                Open to applied-AI and full-stack engineering roles. Reply within a few days.
              </p>
              <a
                href={`mailto:${IDENTITY.email}`}
                data-cursor="mail"
                className="mt-8 inline-flex items-center gap-3 text-[clamp(20px,3vw,28px)] font-display tracking-tight transition-colors"
              >
                <span className="border-b border-line pb-1 transition-colors hover:border-accent">
                  {IDENTITY.email}
                </span>
                <ArrowUpRight className="h-6 w-6" aria-hidden />
              </a>
            </div>

            {/* Nav columns */}
            <div className="md:col-span-5">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="font-mono-label text-secondary">Sitemap</span>
                  <ul className="mt-4 space-y-2.5">
                    {NAV_ITEMS.map((n) => (
                      <li key={n.href}>
                        <a
                          href={n.href}
                          data-cursor="view"
                          className="text-body text-secondary transition-colors hover:text-foreground"
                        >
                          {n.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-mono-label text-secondary">Channels</span>
                  <ul className="mt-4 space-y-2.5">
                    <li>
                      <a
                        href={`mailto:${IDENTITY.email}`}
                        data-cursor="mail"
                        className="text-body text-secondary transition-colors hover:text-foreground"
                      >
                        Email
                      </a>
                    </li>
                    <li>
                      <a
                        href={IDENTITY.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="code"
                        className="text-body text-secondary transition-colors hover:text-foreground"
                      >
                        GitHub
                      </a>
                    </li>
                    <li className="text-body text-secondary">
                      LinkedIn
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 hairline" />

          <div className="flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
            <p className="font-mono-label text-secondary">
              © {year} {IDENTITY.name}. Built with Next.js · Motion · Three.js.
            </p>
            <p className="font-mono-label text-secondary">
              {SITE.url.replace("https://", "")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
