"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { IDENTITY, NAV_LINKS } from "@/data/content";
import { CASE_STUDIES } from "@/data/case-studies";

export function FloatingNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = React.useState<string>("#hero");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [scrolled, setScrolled] = React.useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  // Close drawer on pathname change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // EFFECT 1: Always tracks scroll for the "scrolled" header state on EVERY page
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // EFFECT 2: Route-based active tab (derived from route type) & scroll-spy ONLY when pathname === "/"
  React.useEffect(() => {
    if (!pathname) return;

    if (pathname !== "/") {
      if (pathname.startsWith("/about")) {
        setActive("#about");
        return;
      }
      if (pathname.startsWith("/work")) {
        const slug = pathname.replace("/work/", "").split("/")[0];
        const project = CASE_STUDIES[slug];
        if (
          project?.category.toLowerCase().includes("research") ||
          project?.tag.toLowerCase().includes("research") ||
          project?.domain.toLowerCase().includes("research")
        ) {
          setActive("#research");
        } else {
          setActive("#work");
        }
        return;
      }
      return;
    }

    // Scroll-spy ONLY on homepage
    const handleScrollSpy = () => {
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

    handleScrollSpy();
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      if (pathname !== "/") {
        e.preventDefault();
        router.push(`/${href}`);
        return;
      }
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        setActive(href);
      }
    }
  };

  return (
    <header
      style={{
        paddingTop: "max(0.75rem, env(safe-area-inset-top, 0.75rem))",
      }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 transition-all duration-200 pointer-events-none"
    >
      <div className="site-container max-w-7xl mx-auto pointer-events-auto">
        <div
          className={`flex items-center justify-between px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-[#111111] transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-[4px_4px_0px_#111111]"
              : "bg-white shadow-[3px_3px_0px_#111111]"
          }`}
        >
          {/* Left: Clean Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-6 lg:gap-8"
          >
            {NAV_LINKS.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-sans text-[14px] font-bold tracking-tight transition-all relative py-1 ${
                    isActive
                      ? "text-[#111111]"
                      : "text-[#555555] hover:text-[#111111]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#111111]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Center: Brand Name (Clean modern sans, medium size) */}
          <a
            href="/#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="font-sans font-bold text-[16px] sm:text-[18px] tracking-tight uppercase text-[#111111] hover:text-[#6C47FF] transition-colors"
          >
            {IDENTITY.name}
          </a>

          {/* Right: Neo-brutalist "Let's Talk" Boxed CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg bg-white hover:bg-[#FFD13B] text-[#111111] font-sans text-[13px] sm:text-[14px] font-bold border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer select-none"
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile Hamburger on Right */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="w-10 h-10 flex items-center justify-center text-[#111111] hover:bg-[#F5F0E6] rounded-lg border border-[#111111] transition-colors focus-visible:outline-none"
            >
              {isOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Inter 14px 500 tap targets) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b-2 border-[#111111] bg-[#F5F3EE] px-6 py-4 shadow-[0_4px_0px_#111111]"
          >
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((item) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`font-sans text-[14px] font-medium min-h-[48px] flex items-center justify-between py-2 transition-colors ${
                      isActive
                        ? "text-[#E8472B]"
                        : "text-[#4a4a4a] hover:text-[#E8472B]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#E8472B]" />
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
