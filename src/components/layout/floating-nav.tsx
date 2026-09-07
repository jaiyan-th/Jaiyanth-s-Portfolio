"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

import { SectionContainer } from "@/components/layout/section-container";

export function FloatingNav() {
  const [active, setActive] = React.useState<string>("#hero");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const navHrefs = ["#hero", "#about", "#skills", "#work", "#experience", "#achievements", "#certifications", "#contact"];
    const sections = navHrefs
      .map((href) => document.getElementById(href.replace("#", "")))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { label: "ABOUT", href: "#about" },
    { label: "STACK", href: "#skills" },
    { label: "WORK", href: "#work" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "RESEARCH", href: "#achievements" },
    { label: "CERTIFICATIONS", href: "#certifications" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#hero") {
      e.preventDefault();
      setActive("#hero");
      window.scrollTo({ top: 0, behavior: "smooth" });
      try {
        window.history.pushState(null, "", "#hero");
      } catch {}
    } else {
      setActive(href);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF3EE]/95 backdrop-blur-md border-b-[3px] border-[#111111] py-3.5 transition-colors">
      <SectionContainer as="nav" aria-label="Main Navigation" className="flex items-center justify-between">
        {/* Left: Brand (Clean logo + wordmark only, no stray badge) */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="group cursor-pointer flex items-center shrink-0"
        >
          <span className="font-heading text-xl font-extrabold tracking-tight text-[#111111] group-hover:text-[#D9622B] transition-colors whitespace-nowrap">
            JAIYANTH B
          </span>
        </a>

        {/* Center Nav Links (Orange underline for active, hover orange) */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-label-caps text-xs tracking-wider transition-colors relative py-1 cursor-pointer ${
                  isActive
                    ? "text-[#111111] font-extrabold border-b-2 border-[#D9622B]"
                    : "text-[#6B6B6B] hover:text-[#D9622B]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right CTA (Solid orange fill, hard shadow, press-down hover, WCAG AA black text) */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center font-label-caps text-xs px-4 py-2 border-[2.5px] border-[#111111] bg-[#D9622B] text-[#111111] shadow-[3px_3px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#111111] transition-all cursor-pointer font-extrabold tracking-wider"
          >
            GET IN TOUCH
          </a>

          {/* Mobile/Tablet Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="lg:hidden p-2 border-2 border-[#111111] bg-white shadow-[2px_2px_0px_#111111] text-[#111111]"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </SectionContainer>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-3 pt-3 border-t-2 border-[#111111] bg-[#FAF3EE] py-4"
          >
            <SectionContainer className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      setIsOpen(false);
                      handleNavClick(e, item.href);
                    }}
                    className={`font-label-caps text-sm tracking-wider py-2 transition-colors ${
                      isActive ? "text-[#D9622B] font-extrabold" : "text-[#6B6B6B]"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center font-label-caps text-xs py-2.5 border-2 border-[#111111] bg-[#D9622B] text-[#111111] shadow-[3px_3px_0px_#111111] font-extrabold mt-2"
              >
                GET IN TOUCH
              </a>
            </SectionContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
