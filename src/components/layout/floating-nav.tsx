"use client";

import * as React from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, IDENTITY } from "@/data/portfolio";
import { ThemeToggle } from "@/components/effects/theme-toggle";
import { Magnetic } from "@/components/effects/magnetic";
import { EASE, DURATION } from "@/lib/motion";

export function FloatingNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("");
  const { scrollY } = useScroll();
  const lastY = React.useRef(0);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const openBtnRef = React.useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    if (y > lastY.current && y > 220 && !open) setHidden(true);
    else setHidden(false);
    lastY.current = y;
  });

  // Active section tracking
  React.useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.href.split("#")[1]!);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Focus trap when menu open
  React.useEffect(() => {
    if (!open) return;
    const node = menuRef.current;
    if (!node) return;
    const focusables = node.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0]!;
    first.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const lst = focusables[focusables.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        lst.focus();
      } else if (!e.shiftKey && document.activeElement === lst) {
        e.preventDefault();
        first.focus();
      }
    };
    node.addEventListener("keydown", trap);
    return () => node.removeEventListener("keydown", trap);
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        openBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: hidden ? -120 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: DURATION.button, ease: EASE.primary }}
        className="fixed left-0 right-0 top-0 z-[70] flex justify-center px-4 pt-4"
      >
        <nav
          aria-label="Primary"
          className={`flex w-full max-w-[1320px] items-center justify-between gap-4 rounded-full border border-line px-4 py-2.5 transition-all duration-500 ${
            scrolled ? "glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.4)]" : "bg-transparent"
          }`}
        >
          {/* Identity */}
          <a
            href="/#top"
            data-cursor="explore"
            className="flex items-center gap-3 pl-2 pr-3"
            aria-label={`${IDENTITY.name} — back to top`}
          >
            <span
              aria-hidden
              className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-semibold"
              style={{
                background: "var(--accent)",
                color: "var(--canvas)",
                letterSpacing: "-0.02em",
              }}
            >
              JB
            </span>
            <span className="hidden text-[13px] font-medium tracking-tight sm:block">
              {IDENTITY.name}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.href.replace("/", "");
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    data-cursor="view"
                    className={`relative flex items-center gap-2 rounded-full px-3.5 py-2 text-[14px] tracking-tight transition-colors duration-300 ${
                      isActive ? "text-foreground" : "text-secondary hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`font-mono-label !text-[9px] ${
                        isActive ? "text-accent" : ""
                      }`}
                    >
                      {item.index}
                    </span>
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full"
                        style={{
                          background: "color-mix(in oklab, var(--accent) 14%, transparent)",
                          border: "1px solid color-mix(in oklab, var(--accent) 40%, transparent)",
                        }}
                        transition={{ duration: 0.4, ease: EASE.primary }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 md:flex">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              <span className="font-mono-label !text-[9.5px] text-secondary">
                Open · IST
              </span>
            </div>
            <Magnetic strength={0.18}>
              <a
                href="/#contact"
                data-cursor="mail"
                className="hidden rounded-full px-4 py-2 text-[13.5px] font-medium tracking-tight transition-colors duration-300 sm:inline-flex"
                style={{
                  background: "var(--accent)",
                  color: "var(--canvas)",
                }}
              >
                Start a conversation
              </a>
            </Magnetic>
            <ThemeToggle />
            <button
              ref={openBtnRef}
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-foreground lg:hidden"
            >
              <Menu className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.modal, ease: EASE.primary }}
            className="fixed inset-0 z-[90] flex flex-col lg:hidden"
            style={{ background: "var(--canvas)" }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-mono-label text-secondary">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <div className="hairline" />
            <nav className="flex flex-1 flex-col px-6 py-6" aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: DURATION.reveal, ease: EASE.primary }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between border-b border-line py-5 text-[clamp(28px,7vw,44px)] font-display tracking-tight"
                    >
                      <span>{item.label}</span>
                      <span className="font-mono-label !text-[10px] text-secondary">
                        {item.index}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 pt-8">
                <a
                  href={`mailto:${IDENTITY.email}`}
                  className="font-mono-label text-secondary"
                  onClick={() => setOpen(false)}
                >
                  {IDENTITY.email}
                </a>
                <div className="flex items-center gap-3">
                  <span className="font-mono-label text-secondary">
                    {IDENTITY.location}
                  </span>
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
