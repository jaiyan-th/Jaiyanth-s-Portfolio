"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { IDENTITY, NAV_LINKS } from "@/data/content";

export function FloatingNav() {
  const [active, setActive] = React.useState<string>("#hero");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [scrolled, setScrolled] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const scrollPos = window.scrollY + 160;
      const sectionIds = ["research", "work", "about", "hero"];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActive(`#${id}`);
            break;
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
        // Allow link navigation to /#id
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
          ? "bg-[#ECEAE3]/90 backdrop-blur-md border-b border-[#E5E3DB] py-3.5 shadow-xs"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
        {/* Left: Brand Logo & Name */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="group flex items-center gap-2.5 font-medium text-base tracking-tight text-[#0A0A0A] transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF3355] inline-block transition-transform duration-300 group-hover:scale-125" />
          <span className="hover:text-[#FF3355] transition-colors font-medium">
            {IDENTITY.name}
          </span>
        </a>

        {/* Center: Links (Home, Work, About) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-7 bg-white px-5 py-2 rounded-full border border-[#E5E3DB] shadow-xs"
        >
          {NAV_LINKS.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-[13px] tracking-wide uppercase transition-colors relative py-0.5 ${
                  isActive
                    ? "text-[#0A0A0A] font-semibold"
                    : "text-[#6F6E6A] hover:text-[#0A0A0A]"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#FF3355]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Book a Call CTA + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <a
            href={IDENTITY.bookingUrl}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium bg-[#0A0A0A] text-white rounded-full hover:bg-[#FF3355] transition-all duration-200 group shadow-xs"
          >
            <span>Book a Call</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 border border-[#E5E3DB] bg-white rounded-md text-[#0A0A0A] hover:text-[#FF3355] transition-colors"
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
            className="md:hidden border-b border-[#E5E3DB] bg-[#ECEAE3]/98 backdrop-blur-xl px-6 py-6 shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              {NAV_LINKS.map((item) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-[16px] py-1 transition-colors flex items-center justify-between ${
                      isActive
                        ? "text-[#FF3355] font-semibold"
                        : "text-[#6F6E6A] hover:text-[#0A0A0A]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF3355]" />
                    )}
                  </a>
                );
              })}
              <div className="pt-2 border-t border-[#E5E3DB]">
                <a
                  href={IDENTITY.bookingUrl}
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#0A0A0A] text-white text-[14px] font-medium"
                >
                  <span>Book a Call</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
