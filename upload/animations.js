/* =========================================================
   animations.js
   Drop-in animation logic for editorial-style portfolio sites.
   Vanilla JS, no dependencies. Pair with animations.css.
   Include this file with <script src="animations.js" defer></script>
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------
     1. .reveal-lines
     Staggers each line's transition-delay, then reveals on load.
     Add data-delay="false" to a wrapper if you want it to
     trigger on scroll instead of immediately (uses the same
     IntersectionObserver as .fade-up below).
     ------------------------------------------------------- */
  document.querySelectorAll('.reveal-lines').forEach((el) => {
    const lines = el.querySelectorAll('span > span');
    lines.forEach((line, i) => {
      line.style.transitionDelay = `${i * 80}ms`;
    });

    if (el.dataset.trigger === 'scroll') {
      // handled by the shared observer below
      el.classList.add('fade-up-trigger');
    } else {
      // reveal shortly after load so the browser has painted first
      requestAnimationFrame(() => {
        setTimeout(() => el.classList.add('is-visible'), 50);
      });
    }
  });

  /* -------------------------------------------------------
     2. .fade-up (and scroll-triggered .reveal-lines)
     IntersectionObserver reveals elements as they enter the
     viewport, staggering consecutive siblings automatically.
     ------------------------------------------------------- */
  const fadeTargets = document.querySelectorAll('.fade-up, .fade-up-trigger');
  let staggerIndex = 0;

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${staggerIndex * 100}ms`;
        entry.target.classList.add('is-visible');
        staggerIndex++;
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeTargets.forEach((el) => fadeObserver.observe(el));

  /* -------------------------------------------------------
     3. Active counter widget
     Call updateCounter(index, total, el) whenever the active
     item in a list/carousel changes. Pads index to 2 digits.
     Example:
       const counterEl = document.querySelector('.active-counter');
       updateCounter(3, 5, counterEl); // shows "03"
     ------------------------------------------------------- */
  window.updateCounter = function updateCounter(index, total, el) {
    if (!el) return;
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = String(index).padStart(2, '0');
      el.style.opacity = 1;
    }, 200);
  };

  // Optional: auto-wire an active counter to a list of items
  // using scroll position. Add data-counter-list to a container
  // of items and data-counter-target to the element showing the number.
  const counterList = document.querySelector('[data-counter-list]');
  const counterTarget = document.querySelector('[data-counter-target]');

  if (counterList && counterTarget) {
    const items = Array.from(counterList.children);
    const total = items.length;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = items.indexOf(entry.target) + 1;
          updateCounter(index, total, counterTarget);
        }
      });
    }, { threshold: 0.6 });

    items.forEach((item) => counterObserver.observe(item));
  }

  /* -------------------------------------------------------
     4. .menu-overlay + .menu-toggle
     Toggles the overlay open/closed and staggers link reveal.
     ------------------------------------------------------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const menuOverlay = document.querySelector('.menu-overlay');

  if (menuToggle && menuOverlay) {
    const links = menuOverlay.querySelectorAll('a');
    links.forEach((link, i) => {
      link.style.transitionDelay = `${i * 60}ms`;
    });

    menuToggle.addEventListener('click', () => {
      const isOpen = menuOverlay.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.textContent = isOpen ? 'Close' : 'Menu';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click (useful for single-page nav)
    links.forEach((link) => {
      link.addEventListener('click', () => {
        menuOverlay.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = 'Menu';
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuOverlay.classList.contains('is-open')) {
        menuOverlay.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = 'Menu';
        document.body.style.overflow = '';
      }
    });
  }

  /* -------------------------------------------------------
     5. .bracket-link — pure CSS, no JS needed.
     ------------------------------------------------------- */

  /* -------------------------------------------------------
     6. Floating label inputs — pure CSS, no JS needed.
     Just make sure each input/textarea has placeholder=" ".
     ------------------------------------------------------- */

});
