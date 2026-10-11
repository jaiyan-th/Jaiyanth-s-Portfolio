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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#F5F3EE]/95 backdrop-blur-md border-b border-[#E2DFD7] pb-3"
          : "bg-transparent border-b border-transparent pb-3.5 sm:pb-4"
      }`}
    >
      <div className="site-container flex items-center justify-between">
        {/* Left: Clean Brand Name with Red Dot (min 48px tap height) */}
        <a
          href="/#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="group flex items-center gap-2.5 min-h-[48px] py-1 font-medium text-[16px] sm:text-[17px] tracking-tight text-[#0A0A0A] transition-colors focus-visible:outline-none"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5341B] inline-block transition-transform duration-200 group-hover:scale-125 shrink-0" />
          <span className="hover:text-[#E5341B] transition-colors font-semibold">
            {IDENTITY.name}
          </span>
        </a>

        {/* Right: Clean Navigation Links using fluid nav typography */}
        <motion.nav
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8 px-2 py-1"
        >
          {NAV_LINKS.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-fluid-nav tracking-wider uppercase transition-colors relative py-2 min-h-[44px] flex items-center ${
                  isActive
                    ? "text-[#0A0A0A] font-bold"
                    : "text-[#666666] hover:text-[#0A0A0A] font-medium"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E5341B]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </motion.nav>

        {/* Mobile Hamburger on Right (min 48x48 tap target) */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="w-12 h-12 flex items-center justify-center text-[#0A0A0A] hover:text-[#E5341B] transition-colors focus-visible:outline-none"
          >
            {isOpen ? <X className="w-6 h-6 stroke-[2.5]" /> : <Menu className="w-6 h-6 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (48px tap targets, closes on route change) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-[#E2DFD7] bg-[#F5F3EE] px-6 py-4 shadow-md"
          >
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((item) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-fluid-nav min-h-[48px] flex items-center justify-between uppercase tracking-wider py-2 transition-colors ${
                      isActive
                        ? "text-[#E5341B] font-bold"
                        : "text-[#666666] hover:text-[#0A0A0A] font-medium"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#E5341B]" />
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
