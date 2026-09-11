"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { SectionContainer } from "@/components/layout/section-container";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "STACK", href: "#skills" },
  { label: "WORK", href: "#work" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "RESEARCH", href: "#achievements" },
  { label: "CERTIFICATIONS", href: "#certifications" },
];

export function FloatingNav() {
  const [active, setActive] = React.useState<string>("#hero");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      const sections = ["contact", "certifications", "achievements", "experience", "work", "skills", "about", "hero"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActive(`#${sectionId}`);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      try {
        elem.scrollIntoView({ behavior: "smooth" });
        setActive(href);
      } catch {}
    } else {
      setActive(href);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-canvas/95 backdrop-blur-md border-b-[3px] border-line py-3.5 transition-colors">
      <SectionContainer as="nav" aria-label="Main Navigation" className="flex items-center justify-between">
        {/* Left: Brand */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="group cursor-pointer flex items-center shrink-0"
        >
          <span className="font-heading text-xl font-extrabold tracking-tight text-foreground group-hover:text-[#A3E635] transition-colors whitespace-nowrap">
            JAIYANTH B
          </span>
        </a>

        {/* Center Nav Links */}
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
                    ? "text-foreground font-extrabold border-b-2 border-[#A3E635]"
                    : "text-text-secondary hover:text-[#A3E635]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right Area: Theme Toggle + CTA Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <ThemeToggle />

          <a
            href="#contact"
            className="neo-btn-primary hidden sm:inline-flex items-center justify-center font-label-caps text-xs px-4 py-2 border-[2px] border-line-solid cursor-pointer font-extrabold tracking-wider"
          >
            GET IN TOUCH
          </a>

          {/* Mobile/Tablet Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="lg:hidden p-2 border-2 border-line bg-surface shadow-[2px_2px_0px_var(--shadow-color)] text-foreground"
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
            className="lg:hidden mt-3 pt-3 border-t-2 border-line bg-canvas py-4"
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
                      isActive ? "text-[#A3E635] font-extrabold" : "text-text-secondary"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="neo-btn-primary inline-flex items-center justify-center font-label-caps text-xs py-2.5 border-2 border-line-solid font-extrabold mt-2"
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
