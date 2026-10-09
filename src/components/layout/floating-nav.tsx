"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { IDENTITY, NAV_LINKS } from "@/data/content";

export function FloatingNav() {
  const [active, setActive] = React.useState<string>("#hero");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [scrolled, setScrolled] = React.useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Top of page safeguard
      if (window.scrollY < 80) {
        setActive("#hero");
        return;
      }

      // Precise viewport detection for active nav tab
      const sectionIds = ["research", "experience", "work", "about", "hero"];
      const targetPoint = 200; // Position below navbar where section is considered active

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetPoint && rect.bottom > targetPoint) {
            setActive(`#${id}`);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      if (window.location.pathname !== "/") {
        window.location.href = `/${href}`;
        return;
      }
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        setActive(href);
        setIsOpen(false);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#EDEAE3]/90 backdrop-blur-md border-b border-[#E6E3DC] py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="w-full max-w-[1100px] mx-auto px-6 sm:px-8 xl:px-0 flex items-center justify-between">
        {/* Left: Accent Dot (8px) + Brand Name (16px) */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="group flex items-center gap-2.5 font-medium text-[16px] tracking-tight text-[#0A0A0A] transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-accent inline-block transition-transform duration-300 group-hover:scale-125" />
          <span className="hover:text-accent transition-colors font-medium">
            {IDENTITY.name}
          </span>
        </a>

        {/* Right: White Floating Pill Nav */}
        <motion.nav
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-7 bg-[#FFFFFF] px-6 py-2.5 rounded-full border border-[#E6E3DC] shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        >
          {NAV_LINKS.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-[13px] tracking-[0.04em] uppercase transition-colors relative py-1 ${
                  isActive
                    ? "text-[#0A0A0A] font-medium"
                    : "text-[#6B6B6B] hover:text-[#0A0A0A]"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </motion.nav>

        {/* Mobile Hamburger on Right */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="p-2 border border-[#E6E3DC] bg-[#FFFFFF] rounded-md text-[#0A0A0A] hover:text-accent transition-colors shadow-2xs"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-[#E6E3DC] bg-[#EDEAE3]/98 backdrop-blur-xl px-6 py-6 shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              {NAV_LINKS.map((item) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-[15px] py-1 transition-colors flex items-center justify-between uppercase tracking-[0.04em] ${
                      isActive
                        ? "text-accent font-semibold"
                        : "text-[#6B6B6B] hover:text-[#0A0A0A]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    )}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
