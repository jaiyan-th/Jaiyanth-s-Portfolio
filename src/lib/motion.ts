// Editorial motion presets
// Easing: cubic-bezier(0.16, 1, 0.3, 1) everywhere

export const EASE = {
  primary: [0.16, 1, 0.3, 1] as const,
  secondary: [0.16, 1, 0.3, 1] as const,
};

export const DURATION = {
  micro: 0.18, // 180ms — hover / micro transitions
  button: 0.2, // 200ms — buttons
  reveal: 0.5, // 500ms — calm scroll reveals
  section: 0.6,
  modal: 0.35,
} as const;

export const STAGGER = {
  children: 0.06, // 60ms between siblings
  words: 0.04,
  lines: 0.06,
} as const;

// Soft fade-up (8-12px translateY)
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE.primary },
  },
};

// Subtle fade-in
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.reveal, ease: EASE.primary },
  },
};

// Stagger container
export const staggerContainer = (stagger: number = STAGGER.children) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  },
});

export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
