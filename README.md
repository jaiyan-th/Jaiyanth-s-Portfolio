# Jaiyanth B — Portfolio: AI + Full-Stack Engineer

A high-performance, responsive portfolio web application engineered with Next.js App Router, TypeScript, and a Neo-Brutalist design system.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI & Logic**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with Neo-Brutalist design tokens (`#FAF3EE` cream background, `#B91C1C` deep red accent, `#D9622B` burnt orange secondary)
- **Typography**: [Google Fonts](https://fonts.google.com/) via `next/font/google` (`Bricolage Grotesque` for headlines, `Lora` for body serif, `Plus Jakarta Sans` for nav, `DM Mono` for code cards)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion v12)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Analytics**: Vercel Analytics & Speed Insights

---

## 📁 Project Structure

```text
c:\Users\jaiya\Documents\Portfolio\
├── public/
│   ├── images/
│   │   └── projects/         # Optimized project screenshots (Fake News Detector, Up-Skill, Car-Rent)
│   └── logo.svg
├── src/
│   ├── actions/
│   │   └── contact.ts        # Server action & validation handler for contact form
│   ├── app/
│   │   ├── globals.css       # Tailwind CSS setup, design variables, and double-outline utilities
│   │   ├── layout.tsx        # Root layout, Google Font declarations, and provider wrappers
│   │   ├── page.tsx          # Main single-page scroll layout containing all 7 sections
│   │   └── projects/[slug]/  # Static case study detail pages (SSG)
│   ├── components/
│   │   ├── effects/
│   │   │   └── theme-provider.tsx # Next-themes theme wrapper
│   │   ├── layout/
│   │   │   └── floating-nav.tsx   # Sticky navigation bar with active section indicator
│   │   ├── projects/
│   │   │   ├── project-dialog.tsx # Case study modal dialog with Framer Motion transitions
│   │   │   ├── project-visual.tsx # Project visual card renderer
│   │   │   └── trust-gauge.tsx    # Interactive RAG trust verdict gauge component
│   │   ├── sections/
│   │   │   ├── hero.tsx       # Dedicated Hero section with interactive terminal code card
│   │   │   ├── about.tsx      # About section with biography narrative & Verified Metrics card
│   │   │   ├── skills.tsx     # 7 evidence-based skill categories accordion
│   │   │   ├── work.tsx       # 3 selected project feature rows with case study dialogs
│   │   │   ├── experience.tsx # AI Internship experience card & 8-stage workflow pipeline
│   │   │   ├── research.tsx   # IEEE ICETSIS 2026 paper card & research highlights
│   │   │   └── contact.tsx    # Contact section form & footer links
│   │   └── ui/
│   │       ├── toast.tsx      # Toast notifications component
│   │       └── toaster.tsx    # Global toast provider
│   ├── data/
│   │   └── portfolio.ts       # Central source-of-truth portfolio data (projects, skills, identity)
│   ├── hooks/
│   │   ├── use-mobile.ts     # Mobile breakpoint detection hook
│   │   └── use-toast.ts      # Toast notification hook
│   ├── lib/
│   │   ├── contact-schema.ts # Zod schema for contact form
│   │   ├── motion.ts         # Motion easing and duration design tokens
│   │   └── utils.ts          # Utility functions for class merging (clsx + tailwind-merge)
│   └── types/
│       └── portfolio.ts      # TypeScript interfaces and data models
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🛠️ Local Setup & Running

### Prerequisites
- Node.js 18+ or 20+
- npm (or yarn / pnpm / bun)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

---

## 🏗️ Building for Production

To create an optimized production build:
```bash
npm run build
```

To run the production build locally:
```bash
npm run start
```

---

## 🔐 Environment Variables

Create a `.env` or `.env.local` file in the root directory if configuring custom analytics or API keys:

```env
# Optional Vercel Analytics / Site Configuration
NEXT_PUBLIC_SITE_URL=https://jaiyanthb.com
```

*(No private secrets or database keys are required — the site is statically pre-rendered for performance).*

---

## 📄 Sections Overview

1. **Hero (`#hero`)**: Eyebrow status badges, scaled display headline (*ENGINEERING INTELLIGENT PRODUCTS*), marker stroke highlight, and an interactive terminal card.
2. **About (`#about`)**: Biography narrative (*From signal to system to story*) and 2x2 Verified Metrics card.
3. **Skills (`#skills`)**: 7 evidence-based skill categories (Languages, Web, Backend, DB, AI, Tools, Soft) with real-world evidence.
4. **Work (`#work`)**: 3 featured projects (Fake News Detector, Up-Skill, Car-Rent) with interactive case study modals.
5. **Experience (`#experience`)**: AI Internship experience at Brainery Spot Technology & 8-stage workflow pipeline.
6. **Achievements (`#achievements`)**: Co-authored IEEE research paper accepted at ICETSIS 2026 & research accomplishments.
7. **Contact & Footer (`#contact`)**: Interactive contact form, email/social links, and footer links.

---

## 🎨 Credits & Attribution

- **Typography**: Google Fonts (`Bricolage Grotesque`, `Lora`, `Plus Jakarta Sans`, `DM Mono`)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📜 License

MIT License © 2026 [Jaiyanth B](https://github.com/jaiyanth-b). All rights reserved.
