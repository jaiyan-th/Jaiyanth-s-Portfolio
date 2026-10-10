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

      if (window.scrollY < 80) {
        setActive("#hero");
        return;
      }

      const sectionIds = ["research", "experience", "work", "about", "hero"];
      const targetPoint = 200;

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#F5F3EE]/95 backdrop-blur-md border-b-2 border-[#0A0A0A] py-3.5"
          : "bg-transparent border-b border-transparent py-4 sm:py-5"
      }`}
    >
      <div className="w-full max-w-[1100px] mx-auto px-6 sm:px-8 xl:px-0 flex items-center justify-between">
        {/* Left: Clean Brand Name with Accent Dot */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="group flex items-center gap-2.5 font-medium text-[16px] tracking-tight text-[#0A0A0A] transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block transition-transform duration-200 group-hover:scale-125" />
          <span className="hover:text-accent transition-colors font-semibold">
            {IDENTITY.name}
          </span>
        </a>

        {/* Right: Clean Floating Nav Pill with Bold Outer Shadow */}
        <motion.nav
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 bg-[#FFFFFF] px-6 py-2.5 rounded-full border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A]"
        >
          {NAV_LINKS.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-[13px] font-mono tracking-wider uppercase transition-colors relative py-0.5 ${
                  isActive
                    ? "text-[#0A0A0A] font-bold"
                    : "text-[#666666] hover:text-[#0A0A0A] font-medium"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent" />
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
            className="p-2 border-2 border-[#0A0A0A] bg-white rounded-lg text-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            {isOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
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
            className="md:hidden border-b-2 border-[#0A0A0A] bg-[#F5F3EE] px-6 py-5 shadow-lg mt-2"
          >
            <div className="flex flex-col space-y-3">
              {NAV_LINKS.map((item) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-[14px] font-mono py-1.5 transition-colors flex items-center justify-between uppercase tracking-wider ${
                      isActive
                        ? "text-accent font-bold"
                        : "text-[#666666] hover:text-[#0A0A0A] font-medium"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-accent" />
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
