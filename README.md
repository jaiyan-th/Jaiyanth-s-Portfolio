# Jaiyanth B — Portfolio | Applied AI & Full-Stack Systems

A modern, high-performance personal portfolio engineered with **Next.js 16 App Router (Turbopack)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Motion**, and **Matter.js**. 

Features an unboxed, modern editorial aesthetic with seamless typography, an interactive canvas telemetry signal field, an interactive 2D physics playground footer, and deep-dive technical case studies with grounded benchmarks and architecture diagrams.

---

## ⚡ Key Highlights

- **Unboxed Modern Design**: Open editorial layout eliminating boxy card wrappers and heavy drop-shadow slabs for clean, distraction-free typographic hierarchy.
- **Natural, Balanced Spacing**: Unified `max-w-[1360px]` container geometry across all viewports to ensure balanced visual weight and eliminate wide empty center gaps on ultra-wide screens.
- **Live Signal Telemetry Field (`FIG. 01`)**: Custom HTML5 canvas background tracking cursor coordinates $(X, Y)$, local event counts, and real-time cursor speed processed completely client-side.
- **Interactive Matter.js Physics Footer**: 60fps 2D rigid-body physics simulation using Matter.js with cursor repulsion, boundary collision, entry scale springs, and responsive canvas sizing.
- **Deep-Dive Engineering Case Studies**: Comprehensive technical breakdowns at `/work/[slug]` detailing architecture tradeoffs, latency benchmarks, failure modes, and schemas for:
  - **Fake News Detector**: Grounded RAG fact verification pipeline with Qdrant vector search and source attribution.
  - **Up-Skill**: Multi-stage agentic career platform orchestrating Groq (Llama-3 70B) and Mistral LLMs.
  - **Car-Rent**: Concurrency-safe automotive reservation platform with atomic row-level locking in PostgreSQL.
  - **Secure Document Vault**: High-assurance store with AES-256-GCM authenticated encryption and Argon2id key derivation.
  - **Preventive Healthcare AI Framework**: Peer-reviewed multimodal diagnostic triage research paper accepted at **IEEE ICETSIS 2026** Bahrain.
- **Fluid Micro-Interactions**: Lenis smooth scrolling, floating interactive work preview canvas, and motion micro-interactions tuned for both 120Hz displays and `prefers-reduced-motion`.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, SSG) |
| **Language & UI** | [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Physics Engine** | [Matter.js](https://brm.io/matter-js/) (2D Rigid-Body Simulation) |
| **Animation** | [Motion](https://motion.dev/) (Framer Motion v12) |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```text
├── public/
│   ├── images/
│   │   ├── projects/                  # High-res project case study screenshots
│   │   │   ├── car-rent.jpg
│   │   │   ├── document-vault.jpg
│   │   │   ├── fake-news-detector.jpg
│   │   │   └── up-skill.jpg
│   │   └── jaiyanth-about.jpg         # Profile photograph
│   └── logo.svg
├── src/
│   ├── app/
│   │   ├── about/page.tsx             # Dedicated About route
│   │   ├── api/contact/route.ts       # Contact API endpoint (Resend / webhook integration)
│   │   ├── globals.css                # Design tokens, keyframe animations & Tailwind setup
│   │   ├── icon.tsx                   # Dynamic edge-generated favicon via ImageResponse
│   │   ├── layout.tsx                 # Root layout, Google Fonts, Providers & SmoothScroll
│   │   ├── manifest.ts                # Web app manifest definition
│   │   ├── not-found.tsx              # Custom 404 page
│   │   ├── opengraph-image.tsx        # Dynamic OpenGraph social card generator
│   │   ├── page.tsx                   # Main editorial home page assembling all core sections
│   │   ├── projects/[slug]/page.tsx   # Compatibility redirect to /work/[slug]
│   │   ├── robots.ts                  # Search engine crawler instructions
│   │   ├── sitemap.ts                 # Dynamic XML sitemap generator
│   │   ├── work/page.tsx              # Dedicated Work archive
│   │   └── work/[slug]/page.tsx       # SSG technical case study detail page
│   ├── components/
│   │   ├── canvas/
│   │   │   └── live-signal-field.tsx  # Interactive dot-grid canvas & cursor telemetry
│   │   ├── effects/
│   │   │   ├── smooth-scroll.tsx      # Lenis smooth-scroll wrapper
│   │   │   └── theme-provider.tsx     # Theme provider wrapper
│   │   ├── layout/
│   │   │   ├── floating-nav.tsx       # Borderless sticky navigation bar
│   │   │   ├── footer.tsx             # Interactive bubble footer wrapper & credits
│   │   │   └── section-container.tsx  # Shared layout container
│   │   ├── sections/
│   │   │   ├── about.tsx              # Story, values, and engineering credentials
│   │   │   ├── bubble-footer.tsx      # 70vh Matter.js rigid-body physics bubble simulation
│   │   │   ├── contact-cta.tsx        # Compact contact CTA section
│   │   │   ├── experience.tsx         # AI engineering internship breakdown & stack
│   │   │   ├── hero.tsx               # Headline, CTAs, and telemetry status
│   │   │   ├── how-i-work.tsx         # Engineering workflow principles
│   │   │   ├── research.tsx           # IEEE ICETSIS 2026 research publication highlight
│   │   │   ├── selected-work.tsx      # Interactive project list with floating desktop preview
│   │   │   ├── snapshot-card.tsx      # Unboxed editorial system snapshot panel
│   │   │   ├── tech-marquee.tsx       # Infinite typographic core stack marquee
│   │   │   └── why-work.tsx           # 3 engineering value propositions (Production AI, Systems, Velocity)
│   │   └── ui/
│   │       ├── custom-cursor.tsx      # Precision crosshair cursor
│   │       ├── reveal-heading.tsx     # Staggered typography reveal effect
│   │       ├── scroll-progress.tsx    # Page scroll percentage bar
│   │       ├── toast.tsx              # Toast feedback primitives
│   │       ├── toaster.tsx            # Global toast provider
│   │       └── vertical-tab.tsx       # Vertical navigation tabs
│   ├── data/
│   │   ├── case-studies.ts            # Detailed architecture diagrams & metrics for case studies
│   │   ├── content.ts                 # Navigation, credentials & marquee content
│   │   └── portfolio.ts               # Core developer identity, experience & research data
│   ├── hooks/
│   │   └── use-toast.ts               # Toast interaction hook
│   ├── lib/
│   │   └── utils.ts                   # Utility functions (clsx + tailwind-merge)
│   └── types/
│       └── portfolio.ts               # TypeScript data models and schema types
├── components.json                    # UI component configuration
├── eslint.config.mjs                  # ESLint configuration
├── next.config.ts                     # Next.js configuration
├── package.json                       # Dependencies and project scripts
├── postcss.config.mjs                 # PostCSS Tailwind CSS v4 plugin
├── tailwind.config.ts                 # Extended Tailwind design tokens
└── tsconfig.json                      # Strict TypeScript compiler options
```

---

## 🛠️ Local Development

### Prerequisites
- **Node.js**: v18.17+ or v20+ recommended
- **npm** (or `pnpm` / `yarn`)

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/jaiyan-th/Jaiyanth-s-Portfolio.git
cd Jaiyanth-s-Portfolio
npm install
```

### 2. Development Server
Start the local Next.js Turbopack development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Type Checking
Run TypeScript type safety verification:
```bash
npm run typecheck
```

### 4. Production Build
Create an optimized production bundle (SSG):
```bash
npm run build
```

To test the production build locally:
```bash
npm run start
```

---

## 📄 Sections Overview

1. **Hero (`#hero`)**: Eyebrow status badges, scaled display headline (*Applied AI engineering for systems that make sense*), live cursor signal field, and unboxed system snapshot panel.
2. **About (`#about`)**: Engineering values narrative (*Building systems where applied AI meets production reliability*), education credentials, and portrait.
3. **Selected Work (`#work`)**: Curated list of high-assurance systems with desktop floating image previews and direct links to comprehensive case studies.
4. **Experience (`#experience`)**: AI Internship at Brainery Spot Technology focusing on RAG pipelines, LLM multi-turn chains, and production REST APIs.
5. **Research (`#research`)**: Co-authored peer-reviewed paper accepted at **IEEE ICETSIS 2026** on an AI intelligence wellness framework for preventive healthcare.
6. **Why Work With Me (`#why-work`)**: Editorial breakdown across Production AI, Full-Stack Architecture, and Rigour & Velocity.
7. **Core Stack (`#tech`)**: Infinite typographic marquee highlighting key libraries and platforms.
8. **Interactive Footer (`#contact`)**: 70vh Matter.js canvas playground with interactive bubble physics and direct contact actions.

---

## 📜 License

MIT License © 2026 [Jaiyanth B](https://github.com/jaiyan-th). All rights reserved.
