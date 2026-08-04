/* ============================================================
   ANIMATIONS.JS — Minimal editorial animation layer
   Drop-in script. No dependencies. Framework-agnostic.
   ============================================================
   Usage: <script src="animations.js" defer></script>
   Then add the class names to your existing elements.
   ============================================================ */

(function () {
  "use strict";

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     1. .reveal-lines — Split text into lines, wrap each in a span
     ------------------------------------------------------------
     Splits the text content of any .reveal-lines element into
     individual line spans so CSS can stagger them.
     Each line gets --reveal-index set for the CSS delay calc.

     HTML:
       <h1 class="reveal-lines">Your headline here</h1>
       <h1 class="reveal-lines reveal-on-scroll">Scroll-triggered</h1>
     ============================================================ */

  function wrapRevealLines() {
    const elements = document.querySelectorAll(".reveal-lines");
    elements.forEach((el) => {
      // Skip if already processed
      if (el.querySelector(".reveal-line")) return;

      // Read computed style to detect forced line breaks
      const html = el.innerHTML;

      // Split by <br> tags first (explicit line breaks)
      const lines = html.split(/<br\s*\/?>/i);

      el.innerHTML = lines
        .map((line, i) => {
          const trimmed = line.trim();
          if (!trimmed) return "";
          return (
            '<span class="reveal-line" style="--reveal-index:' +
            i +
            '"><span>' +
            trimmed +
            "</span></span>"
          );
        })
        .join("");
    });
  }

  // For elements that need automatic line-splitting based on natural
  // wrapping (browser-determined), use this more advanced splitter.
  // It wraps each visual line by measuring word positions.
  function wrapRevealLinesAuto() {
    const elements = document.querySelectorAll(
      ".reveal-lines[data-split-words]"
    );
    elements.forEach((el) => {
      if (el.querySelector(".reveal-line")) return;

      const text = el.textContent.trim();
      const words = text.split(/\s+/);

      // Measure each word's position to detect line breaks
      const original = el.innerHTML;
      el.innerHTML = words
        .map((w) => '<span class="reveal-word-measure">' + w + " </span>")
        .join("");

      const wordEls = el.querySelectorAll(".reveal-word-measure");
      const lines = [];
      let currentLine = [];
      let lastTop = wordEls[0] ? wordEls[0].offsetTop : 0;

      wordEls.forEach((wordEl) => {
        if (wordEl.offsetTop !== lastTop) {
          if (currentLine.length) lines.push(currentLine.join(" "));
          currentLine = [];
          lastTop = wordEl.offsetTop;
        }
        currentLine.push(wordEl.textContent.trim());
      });
      if (currentLine.length) lines.push(currentLine.join(" "));

      // Restore with wrapped lines
      el.innerHTML = lines
        .map((line, i) => {
          return (
            '<span class="reveal-line" style="--reveal-index:' +
            i +
            '"><span>' +
            line +
            "</span></span>"
          );
        })
        .join("");
    });
  }

  // Scroll-triggered reveal-lines: add .is-visible when in view
  function initRevealOnScroll() {
    const elements = document.querySelectorAll(
      ".reveal-lines.reveal-on-scroll"
    );
    if (!elements.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-10% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* ============================================================
     2. .fade-up — Fade + slide up on scroll into view
     ------------------------------------------------------------
     Any element with .fade-up fades in and slides up ~24px when
     scrolled into view. Consecutive siblings auto-stagger ~100ms.

     HTML:
       <div class="fade-up">Item one</div>
       <div class="fade-up">Item two</div>
     ============================================================ */

  function initFadeUp() {
    const elements = document.querySelectorAll(".fade-up");
    if (!elements.length) return;

    // Auto-stagger: assign --fade-index based on consecutive sibling order
    let lastParent = null;
    let index = 0;
    elements.forEach((el) => {
      if (el.parentElement !== lastParent) {
        lastParent = el.parentElement;
        index = 0;
      }
      el.style.setProperty("--fade-index", index);
      index++;
    });

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-5% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* ============================================================
     3. .active-counter — Crossfading two-digit counter
     ------------------------------------------------------------
     A counter that crossfades when the active item changes.
     Call setActiveCounter(el, newValue) to swap the number.
     Or use data-counter-auto="#listId" for scroll-based auto-wire.

     HTML:
       <span class="active-counter" data-counter>01</span>

     Auto-wire (updates based on scroll through a list):
       <span class="active-counter" data-counter data-counter-auto="#my-list"></span>

     Manual API:
       const counter = document.querySelector('[data-counter]');
       setActiveCounter(counter, '05');
     ============================================================ */

  function setActiveCounter(el, newValue) {
    if (!el || prefersReducedMotion) {
      if (el) el.textContent = newValue;
      return;
    }

    // Don't swap if value is the same
    if (el.textContent.trim() === newValue) return;

    // Trigger crossfade animation
    el.classList.remove("is-swapping");
    // Force reflow to restart animation
    void el.offsetWidth;
    el.classList.add("is-swapping");

    // Swap text at the midpoint of the crossfade (200ms)
    setTimeout(() => {
      el.textContent = newValue;
    }, 200);

    // Clean up after animation completes
    setTimeout(() => {
      el.classList.remove("is-swapping");
    }, 400);
  }

  // Expose globally for manual use
  window.setActiveCounter = setActiveCounter;

  function initAutoCounters() {
    const counters = document.querySelectorAll("[data-counter-auto]");
    if (!counters.length) return;

    counters.forEach((counter) => {
      const selector = counter.getAttribute("data-counter-auto");
      const list = document.querySelector(selector);
      if (!list) return;

      const items = Array.from(
        list.children
      );
      if (!items.length) return;

      // Track which item is most in view
      if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              const index = items.indexOf(entry.target);
              if (index >= 0) {
                const value = String(index + 1).padStart(2, "0");
                setActiveCounter(counter, value);
              }
            }
          });
        },
        { threshold: [0.5, 0.75] }
      );

      items.forEach((item) => observer.observe(item));
    });
  }

  /* ============================================================
     4. .menu-overlay + .menu-toggle — Full-screen overlay menu
     ------------------------------------------------------------
     Opens via clip-path circle() wipe from top-right corner.
     Nav links fade/slide in staggered after overlay opens.
     Includes close-on-link-click, close-on-Escape, body-scroll lock.

     HTML:
       <button class="menu-toggle" aria-label="Open menu" aria-expanded="false">
         <span></span><span></span><span></span>
       </button>
       <div class="menu-overlay" id="my-menu">
         <nav>
           <a href="#home">Home</a>
           <a href="#about">About</a>
         </nav>
       </div>
     ============================================================ */

  function initMenuOverlay() {
    const toggles = document.querySelectorAll(".menu-toggle");
    if (!toggles.length) return;

    // Assign stagger index to nav links
    document.querySelectorAll(".menu-overlay nav a").forEach((link, i) => {
      link.style.setProperty("--menu-link-index", i);
    });

    toggles.forEach((toggle) => {
      // Find the target overlay — either via aria-controls or the next .menu-overlay
      let overlay;
      const controls = toggle.getAttribute("aria-controls");
      if (controls) {
        overlay = document.getElementById(controls);
      }
      if (!overlay) {
        overlay = document.querySelector(".menu-overlay");
      }
      if (!overlay) return;

      const open = () => {
        overlay.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        document.body.classList.add("menu-open");
      };

      const close = () => {
        overlay.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      };

      toggle.addEventListener("click", () => {
        const isOpen = overlay.classList.contains("is-open");
        if (isOpen) close();
        else open();
      });

      // Close on link click
      overlay.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", close);
      });

      // Close on Escape
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("is-open")) {
          close();
          toggle.focus();
        }
      });

      // Close on overlay backdrop click (not on nav links)
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
      });
    });
  }

  /* ============================================================
     INIT — Run all initializers on DOM ready
     ============================================================ */

  function init() {
    wrapRevealLines();
    wrapRevealLinesAuto();
    initRevealOnScroll();
    initFadeUp();
    initAutoCounters();
    initMenuOverlay();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Re-run line splitting after fonts load (positions may shift)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      wrapRevealLinesAuto();
    });
  }
})();
