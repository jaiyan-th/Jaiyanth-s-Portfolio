# Jaiyanth B — Portfolio

> **SIGNAL / SYSTEM / STORY** — an award-level personal portfolio for Jaiyanth B, a final-year Computer Science & Business Systems student focused on Applied AI and Full-Stack Engineering.

Built with Next.js 16 (App Router), React 19, strict TypeScript, Tailwind CSS v4, `motion/react`, `@react-three/fiber` + Three.js, Zod, Next.js Server Actions, Resend, Vercel Analytics, Vercel Speed Insights, Playwright, and `@axe-core/playwright`.

---

## Quick start

```bash
# 1. Install dependencies
bun install

# 2. Copy environment template
cp .env.example .env

# 3. Run the dev server
bun run dev
# → http://localhost:3000
```

## Scripts

| Script | Purpose |
| --- | --- |
| `bun run dev` | Start the Next.js dev server on port 3000 |
| `bun run build` | Production build (standalone output) |
| `bun run start` | Start the production server |
| `bun run lint` | ESLint (Next.js core-web-vitals + TypeScript) |
| `bun run typecheck` | `tsc --noEmit` strict type check |
| `bun run test:e2e` | Playwright e2e tests across desktop / tablet / mobile |

## Environment variables

Copy `.env.example` → `.env` and fill in:

```env
NEXT_PUBLIC_SITE_URL=https://jaiyanthb.com
RESEND_API_KEY=
CONTACT_TO_EMAIL=jaiyanthofficial@gmail.com
CONTACT_FROM_EMAIL=Portfolio Contact <contact@jaiyanthb.com>
```

- `NEXT_PUBLIC_SITE_URL` — used for canonical URLs, sitemap, robots, and Open Graph metadata.
- `RESEND_API_KEY` — server-side Resend key. **Leave empty in development** — the contact action will mock-send and log to the server console.
- `CONTACT_TO_EMAIL` — where contact form submissions are delivered.
- `CONTACT_FROM_EMAIL` — the From address (must be a verified Resend domain).

## Resend domain verification

1. Create an account at [resend.com](https://resend.com).
2. Add and verify your sending domain (e.g. `jaiyanthb.com`) — Resend will give you DNS records to add.
3. Once verified, set `CONTACT_FROM_EMAIL=Portfolio Contact <contact@yourdomain.com>`.
4. Set `RESEND_API_KEY` to your live API key.
5. Submit the contact form locally — you should receive an email at `CONTACT_TO_EMAIL`.

## Contact testing

The contact form is fully functional end-to-end:

- **Honeypot**: a hidden `company` field silently accepts bot submissions.
- **Rate limit**: in-memory, 3 submissions per minute per anonymous caller.
- **Zod validation**: name (2–120), email (RFC 5322), subject (3–200), message (10–4000).
- **Server Action**: `src/actions/contact.ts` — returns typed state (`idle` / `submitting` / `success` / `error`).
- **Mock mode**: when `RESEND_API_KEY` is empty or `NODE_ENV !== "production"`, submissions succeed without sending real email. This is what e2e tests rely on.

To verify email delivery locally, set `NODE_ENV=production` and a real `RESEND_API_KEY`, then submit the form.

## Content updates

All content lives in **`src/data/portfolio.ts`** — a single typed source of truth.

- Update `IDENTITY` to change name, role, email, GitHub, LinkedIn, hero copy.
- Update `ABOUT` for the about section (statement, biography, metrics, expertise strip).
- Update `SKILL_GROUPS` for the seven evidence-based skill groups.
- Update `PROJECTS` for the three selected projects (stack, summary, case study).
- Update `EXPERIENCE` for the AI Intern role.
- Update `RESEARCH` for the IEEE paper metadata.
- Update `CONTACT_LINKS` for the channels listed beside the form.

## Adding a resume

1. Place your PDF at `public/resume.pdf`.
2. Add a link anywhere in `src/data/portfolio.ts` (e.g. in the hero or contact section).
3. The site's `manifest.ts` and `sitemap.ts` already include the canonical URL.

## Replacing the LinkedIn pending state

1. In `src/data/portfolio.ts`, set `IDENTITY.linkedin` to the real URL.
2. Set `IDENTITY.linkedinPending = false`.
3. The "pending" badge will disappear from the contact section and footer.

## Project-link updates

Each project has a `repository` field. Update these in `src/data/portfolio.ts`:

```ts
{
  slug: "fake-news-detector",
  // ...
  repository: "https://github.com/your-username/your-repo",
}
```

The case-study routes (`/projects/<slug>`) are statically generated via `generateStaticParams` — no extra setup needed.

## Test commands

```bash
# Lint
bun run lint

# Type check
bun run typecheck

# Production build
bun run build

# End-to-end tests (3 viewports: desktop / tablet / mobile)
bun run test:e2e

# Single project
bunx playwright test --project=desktop
bunx playwright test --project=mobile
```

Playwright auto-installs Chromium on first run. The config spins up its own dev server (`NODE_ENV=test bun run dev`) and tears it down after.

**Latest test results**: 54 passed, 3 skipped (mobile-only tests skipped on desktop), 0 failed across desktop (1440x900), tablet (1100x800), and mobile (390x844).

## Vercel preview deployment

1. Push to GitHub.
2. Import the repo in Vercel.
3. Set the env vars (see `.env.example`).
4. Vercel will run `next build` automatically and produce a preview URL.
5. Run e2e against the preview:
   ```bash
   PLAYWRIGHT_BASE_URL=https://your-preview.vercel.app bunx playwright test
   ```

## Vercel production deployment

1. In Vercel, set the production env vars (especially `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`).
2. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
3. Deploy. The build outputs a standalone server.
4. Vercel Analytics and Speed Insights are wired up via `@vercel/analytics` and `@vercel/speed-insights` — they activate automatically in production.

## Custom domain configuration

1. In Vercel → Project → Settings → Domains, add your domain (e.g. `jaiyanthb.com`).
2. Add the DNS records Vercel shows you (A / CNAME).
3. Wait for SSL to provision (usually a few minutes).
4. Update `NEXT_PUBLIC_SITE_URL` to the new domain and redeploy.
5. Canonical URL, sitemap, and OG image are derived from `NEXT_PUBLIC_SITE_URL` automatically.

## Analytics

- **Vercel Analytics** — page views, top pages, visitors, Web Vitals. Visible in the Vercel dashboard.
- **Vercel Speed Insights** — Core Web Vitals field data. Also visible in the Vercel dashboard.
- Both are wired in `src/app/layout.tsx` and run only in production. In development they log debug messages but don't transmit data.

## Stock-image licenses

This portfolio uses **no stock images**. All visuals are:

- Original SVG (`src/components/projects/project-visual.tsx`)
- Original Three.js particle system (`src/components/effects/sculpture-canvas.tsx`)
- CSS gradients and grid backgrounds

If you add stock images later, store them in `public/images/`, use `next/image`, add meaningful `alt` text, and document the source and license here:

```
public/images/<file>.jpg
- Source: <URL>
- License: <e.g. Unsplash License, CC BY 4.0>
- Alt text: "<description>"
```

## Project structure

```text
src/
├── app/
│   ├── projects/[slug]/page.tsx     # Statically generated case-study routes
│   ├── globals.css                  # Brand tokens + Tailwind v4
│   ├── layout.tsx                   # Fonts, theme, analytics, JSON-LD
│   ├── page.tsx                     # Home page
│   ├── manifest.ts                  # PWA manifest
│   ├── robots.ts                    # robots.txt
│   ├── sitemap.ts                   # sitemap.xml
│   ├── opengraph-image.tsx          # Dynamic OG image (edge runtime)
│   ├── icon.tsx                     # Dynamic favicon (edge runtime)
│   └── not-found.tsx                # 404 page
├── actions/
│   └── contact.ts                   # Server Action: Zod + Resend + honeypot + rate limit
├── components/
│   ├── effects/                     # Cursor, magnetic, theme, three.js
│   ├── layout/                      # Loader, nav, footer
│   ├── projects/                    # Project visuals, dialog
│   ├── sections/                    # Hero, About, Skills, Work, Experience, Research, Contact
│   └── ui/                          # Masked heading, section header
├── data/
│   └── portfolio.ts                 # Single source of truth for content
├── lib/
│   ├── contact-schema.ts            # Zod schema
│   ├── motion.ts                    # Motion presets
│   └── utils.ts                     # cn() helper
└── types/
    └── portfolio.ts                 # Shared types

tests/
└── e2e/
    └── portfolio.spec.ts            # Playwright + axe-core tests
```

## Design system

- **Concept**: SIGNAL / SYSTEM / STORY
- **Dark theme** (default): canvas `#090B0A`, accent lime `#B7FF4A`, accent cobalt `#6F7CFF`, accent coral `#FF8A68`
- **Light theme**: canvas `#F1EFE8`, accent lime `#92D92F`, accent cobalt `#4D62E8`, accent coral `#D8654A`
- **Typography**: Space Grotesk (display + body), Instrument Serif (editorial italic), DM Mono (labels)
- **Motion**: primary easing `cubic-bezier(0.16, 1, 0.3, 1)`, secondary `cubic-bezier(0.65, 0, 0.35, 1)`
- **Grid**: 12-col desktop, 8-col tablet, 4-col mobile, max width 1320px, 92vw page

## License

All source code in this repository is © Jaiyanth B. All rights reserved.
