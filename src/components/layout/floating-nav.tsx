"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

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
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Research", href: "#achievements" },
    { label: "Certifications", href: "#certifications" },
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
    <header className="sticky top-0 z-50 bg-[#FCFBF9]/90 backdrop-blur-md border-b border-[#E5E2DC] px-6 py-4 transition-colors">
      <nav aria-label="Main Navigation" className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Author Brand */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="group cursor-pointer flex items-baseline gap-2.5"
        >
          <span className="font-serif text-lg tracking-tight text-[#1A1A1A] font-medium group-hover:text-[#2D5F4E] transition-colors">
            Jaiyanth B
          </span>
          <span className="hidden sm:inline font-mono text-[10px] tracking-wider uppercase text-[#6B6B6B]">
            / AI &amp; Full-Stack
          </span>
        </a>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-label text-[11px] tracking-[0.14em] uppercase transition-colors relative cursor-pointer ${
                  isActive
                    ? "text-[#1A1A1A] font-semibold"
                    : "text-[#6B6B6B] hover:text-[#1A1A1A] font-medium"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#2D5F4E]" />
                )}
              </a>
            );
          })}
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="font-label text-[11px] tracking-[0.14em] uppercase px-4 py-2 border border-[#E5E2DC] rounded-none text-[#1A1A1A] hover:border-[#2D5F4E] hover:text-[#2D5F4E] hover:bg-[#2D5F4E]/5 transition-all"
          >
            Get in touch
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden p-2 border border-[#E5E2DC] text-[#1A1A1A]"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 pt-3 border-t border-[#E5E2DC] bg-[#FCFBF9] px-2 py-4"
          >
            <div className="flex flex-col space-y-3">
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
                    className={`font-label text-xs tracking-[0.14em] uppercase py-2 transition-colors ${
                      isActive ? "text-[#2D5F4E] font-semibold" : "text-[#6B6B6B]"
                    }`}
                  >
                    {item.label}
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
