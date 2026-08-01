# GLM Master Prompt — Award-Winning Portfolio for Jaiyanth B

You are a world-class creative developer, digital art director, motion designer, UX engineer, and production frontend architect.

Design and build a completely original, award-level personal portfolio for **Jaiyanth B**, a final-year Computer Science and Business Systems student focused on **Applied AI and Full-Stack Engineering**.

The website must feel premium, memorable, cinematic, and technically sophisticated. It should surprise users through thoughtful interaction and motion, not through visual clutter.

The final result must look like a serious professional portfolio suitable for recruiters, engineering teams, creative technology studios, and product companies.

Do not create a generic student portfolio, ordinary card-grid website, SaaS landing page, dashboard, gaming interface, copied template, or neon cyberpunk design.

---

## 1. Core Creative Direction

Use the creative concept:

# SIGNAL / SYSTEM / STORY

The portfolio should communicate how Jaiyanth transforms:

- unclear problems into useful signals
- signals into engineered systems
- systems into usable products and meaningful outcomes

The design should feel like a hybrid of:

- a premium editorial technology magazine
- a digital exhibition
- a sophisticated product case study
- a scientific interface
- an interactive engineering portfolio

Use:

- bold editorial typography
- carefully controlled whitespace
- strong grid systems
- animated data lines
- connected nodes
- layered depth
- subtle 3D visuals
- refined hover states
- cinematic page transitions
- original project visualizations
- elegant light and dark themes

The experience must be visually impressive without sacrificing usability.

---

## 2. Technical Stack

Build the portfolio using:

- current stable Next.js App Router
- React
- strict TypeScript
- Tailwind CSS v4
- Motion using `motion/react`
- Three.js using `@react-three/fiber`
- `@react-three/drei` only when useful
- Zod
- Next.js Server Actions
- Resend for contact email
- Vercel Analytics
- Vercel Speed Insights
- Playwright
- `@axe-core/playwright`

Use Server Components by default.

Use Client Components only for:

- animation
- cursor behavior
- menus
- theme switching
- modal dialogs
- Three.js
- interactive project visuals
- contact submission feedback

Do not use:

- Framer
- GSAP
- Bootstrap
- Material UI
- jQuery
- copied templates
- canary or experimental framework versions

Pin exact package versions and create a lockfile.

---

## 3. Portfolio Identity

Use this identity:

- Name: Jaiyanth B
- Role: AI + Full-Stack Engineer
- Education stage: Final-year Computer Science and Business Systems student
- Location: India
- Positioning: Builds useful AI-powered products and dependable full-stack systems
- Email: jaiyanthofficial@gmail.com
- GitHub: use a clearly editable placeholder if the exact URL is unavailable
- LinkedIn: show “Profile URL pending” until a real URL is supplied

Suggested hero statement:

> Engineering intelligent products from signal to system.

Suggested supporting text:

> I build applied AI workflows, full-stack products, structured APIs, data-driven systems, and thoughtful interfaces that turn complex problems into useful software.

Do not invent personal achievements, awards, employment, metrics, clients, testimonials, or social links.

---

## 4. Colour System

Create an elegant dark-first visual system with a complete light theme.

### Dark theme

- Canvas: `#090B0A`
- Elevated canvas: `#101310`
- Surface: `#171A17`
- Primary text: `#F3F2EA`
- Secondary text: `#9C9F98`
- Structural line: `rgba(243,242,234,0.13)`
- Main accent: `#B7FF4A`
- Secondary accent: `#6F7CFF`
- Warm status accent: `#FF8A68`

### Light theme

- Canvas: `#F1EFE8`
- Elevated canvas: `#F9F8F3`
- Surface: `#E5E2D8`
- Primary text: `#10110F`
- Secondary text: `#63655F`
- Structural line: `rgba(16,17,15,0.14)`
- Main accent: `#92D92F`
- Secondary accent: `#4D62E8`
- Warm status accent: `#D8654A`

Rules:

- use lime as the primary interaction accent
- use cobalt only for selected states, diagrams, and depth
- use coral only for limited warning or active moments
- avoid rainbow gradients
- avoid excessive neon glow
- maintain accessible contrast
- transition smoothly between themes
- persist the selected theme safely

---

## 5. Typography

Use Google Fonts through `next/font/google`.

Recommended pairing:

- Manrope or Space Grotesk for body and display
- Instrument Serif for expressive editorial phrases
- DM Mono for technical metadata and labels

Suggested scale:

- Hero display: `clamp(64px, 9vw, 138px)`
- Mobile hero: `clamp(52px, 17vw, 88px)`
- Section heading: `clamp(44px, 5.5vw, 80px)`
- Project heading: `clamp(34px, 4vw, 58px)`
- Large statement: `clamp(28px, 3.8vw, 52px)`
- Body: 15–17px
- Labels: 9–11px

Use:

- tight negative tracking for large headings
- compact line-height
- readable paragraph widths
- sentence case for body content
- uppercase only for small labels
- intentional responsive line breaks

Avoid:

- unreadably small text
- headings touching container borders
- overlapping typography
- awkward single-word wrapping
- excessive outlined text

---

## 6. Grid and Spacing

Use:

- maximum content width: 1280–1320px
- page width: approximately 92vw
- 12-column desktop grid
- 8-column tablet grid
- 4-column mobile grid

Section spacing:

- Desktop: 96px top and bottom
- Tablet: 80px
- Mobile: 68px

Breakpoints:

- 760px
- 1100px

Test at:

- 390px
- 760px
- 1100px
- 1440px

Requirements:

- no horizontal body overflow
- no giant fixed-height empty areas
- no text clipping
- no components touching viewport edges
- consistent section rhythm
- balanced content density
- mobile must feel intentionally designed

---

## 7. Page Structure

Use this section order:

1. Loader
2. Floating navigation
3. Hero
4. About
5. Interactive Skills System
6. Selected Work
7. Experience
8. IEEE Research
9. Contact
10. Footer
11. Project case-study routes and dialogs

Use a consistent section-heading pattern:

- section number
- mono label
- large editorial title
- concise supporting statement

---

## 8. Loader

Create a short system-calibration loader.

Possible messages:

- Mapping signals
- Connecting systems
- Calibrating interface
- Preparing experience

Requirements:

- 600–900ms maximum
- cosmetic only
- first visit per browser session
- use `sessionStorage`
- skip for reduced motion
- skip during automated tests
- never wait for Three.js
- never block server-rendered content
- reveal the hero through a mask or line transition

Do not use a long artificial loading sequence.

---

## 9. Navigation

Create a premium floating navigation with:

- Jaiyanth B identity
- About
- Skills
- Work
- Experience
- Research
- Contact
- opportunity indicator
- theme toggle

Desktop behavior:

- readable spacing
- minimum 14px navigation text
- active-section indicator
- compress slightly while scrolling down
- expand while scrolling upward
- change contrast when passing light or dark sections

Mobile behavior:

- clear Menu button
- full-screen or large-sheet navigation
- keyboard focus trap
- Escape close
- correct `aria-expanded`
- large touch targets

Do not use tiny compressed navigation labels.

---

## 10. Hero

Create a completely original cinematic hero.

### Content

Show:

- Jaiyanth B
- AI + Full-Stack Engineer
- final-year CS & Business Systems student
- India / IST
- concise engineering statement

Primary actions:

- View Selected Work
- Start a Conversation

### Visual composition

Use an original responsive “system sculpture” instead of a portrait.

It may contain:

- flowing data ribbons
- connected particles
- layered translucent planes
- orbital nodes
- project signals
- JB monogram
- labels such as AI Systems, APIs, Data, Product, and Interface

The visual should react subtly to:

- pointer movement
- scroll
- theme
- viewport size

Requirements:

- no large empty card
- no clipping below viewport
- no heavy 3D model
- no dependency on WebGL
- static fallback
- clear scroll cue
- content remains readable on mobile

---

## 11. Motion and Scroll Design

Create one unified motion system.

Primary easing:

`cubic-bezier(0.16, 1, 0.3, 1)`

Secondary easing:

`cubic-bezier(0.65, 0, 0.35, 1)`

Timing:

- Micro interactions: 180–280ms
- Buttons: 320–420ms
- Reveals: 650–900ms
- Section transitions: 800–1200ms
- Modal transition: 700–950ms
- Stagger: 60–100ms

Use:

- masked heading reveals
- line and word stagger
- restrained parallax
- clip-path transitions
- animated SVG paths
- scale from 0.96 to 1
- 20–32px vertical reveal
- one controlled sticky sequence
- section colour transitions
- project visual state changes
- cursor state changes
- modal portal transitions

Do not use:

- scroll-jacking
- long pinned traps
- animation on every word
- excessive blur
- constant heavy rotation
- layout-shifting animation
- unrelated visual effects
- slow page navigation

Respect `prefers-reduced-motion`.

---

## 12. About

Create a balanced editorial About section.

Include:

- strong personal statement
- concise biography
- verified metrics
- moving expertise strip
- subtle supporting visual

Use only these metrics:

- 3 selected projects
- 7 evidence-based skill groups
- 1 AI internship
- 1 IEEE research contribution

Suggested structure:

- left: large identity statement
- right: biography and metric matrix
- bottom: expertise strip

Do not create a huge empty metrics rectangle.

---

## 13. Skills System

Create exactly seven evidence-based groups.

### Programming Languages

- Python
- TypeScript
- JavaScript
- SQL

### Frontend / Web Technologies

- Next.js
- React
- HTML5
- CSS3
- Responsive UI
- Form Workflows

### Backend

- Flask
- NestJS
- REST APIs
- JWT Authentication
- OAuth
- API Integration

### Databases

- Supabase
- Prisma ORM
- Vector Database
- Relational Modeling
- Embeddings
- SQL

### AI Frameworks and Methods

- RAG
- LLMs
- NLP
- Groq
- Mistral
- Conversational AI
- Image Recognition

### Tools and Technologies

- Git
- News API
- Stitch
- Prompt Engineering
- Debugging
- Testing
- Semantic Search

### Soft Skills

- Team Collaboration
- Problem Solving
- Research Collaboration
- Technical Presentation
- Product Thinking
- Debugging Discipline
- Testing Mindset

Do not show PostgreSQL unless it is genuinely verified.

### Desktop interaction

Create an interactive constellation or layered skills board.

Preferred behavior:

- seven selectable category nodes
- selected category reveals skills in a designed panel
- related project evidence appears beside each skill group
- connections animate smoothly
- keyboard navigation
- readable fallback without animation

Do not create seven giant empty cards.

### Mobile

Use horizontal scroll snapping.

Each card should be around 84vw and include:

- category
- skills
- project or experience evidence
- short meaningful description

Add:

> Every skill shown is supported by a project, internship task, or research contribution.

---

## 14. Selected Work

Keep exactly three projects:

1. Fake News Detector
2. Up-Skill
3. Car-Rent

Do not add more projects.

Use strong editorial case-study layouts rather than three ordinary equal cards.

Suggested desktop structure:

- featured project with 7-column visual and 5-column content
- second project reversed
- third project full-width cinematic layout

Each project must include:

- project number
- category
- title
- factual summary
- verified stack
- engineering focus
- repository link
- case-study route
- original animated visual

### Fake News Detector

Position it as a RAG-powered fact-checking pipeline that cross-references articles with trusted evidence.

Use only:

- Python
- Flask
- Supabase
- Vector Database
- RAG
- LLM
- News API
- embeddings
- semantic search

Use the 75% to 85% improvement claim only if explicitly verified.

Visual concept:

- evidence-source network
- document scanning
- trust score
- retrieval path
- semantic-search beam

### Up-Skill

Position it as an AI career assistant supporting:

- ATS-style resume scoring
- mock interviews
- skill-gap analysis
- personalized learning paths

Use only:

- Flask
- Supabase
- Stitch
- NLP
- Groq
- Mistral

Visual concept:

- resume analysis layers
- skill-gap graph
- interview waveform
- learning-path timeline
- profile-intelligence orbit

### Car-Rent

Position it as a full-stack rental platform supporting:

- vehicle search
- booking
- reviews
- payments
- secure authentication
- REST APIs
- relational data modeling

Use only:

- Next.js
- React
- TypeScript
- NestJS
- Prisma ORM
- JWT
- OAuth
- REST API
- relational database

Do not claim PostgreSQL unless verified.

Visual concept:

- route geometry
- vehicle discovery
- booking timeline
- authentication flow
- location marker

### Mobile projects

Use vertically stacked projects with full-width visuals.

Do not force desktop horizontal scrolling on mobile.

---

## 15. Project Pages and Dialogs

Create routes:

- `/projects/fake-news-detector`
- `/projects/up-skill`
- `/projects/car-rent`

Project cards must be real links.

JavaScript may enhance them into accessible dialogs on the homepage, but direct routes must work without JavaScript.

Each case study should contain:

1. Overview
2. Problem
3. Engineering approach
4. Architecture
5. Features
6. Verified technology stack
7. Challenges
8. Learnings
9. Repository action

Do not invent:

- user counts
- revenue
- team size
- duration
- unverified metrics

Dialog requirements:

- `role="dialog"`
- `aria-modal="true"`
- focus trap
- Escape close
- backdrop close
- focus restoration
- scroll lock
- keyboard activation
- browser history support

---

## 16. Experience

Keep exactly:

- Role: AI Intern
- Organization: Brainery Spot Technology
- Period: Jun–Jul 2025

Supported work:

- Python AI workflows
- prompt engineering
- debugging
- testing
- REST API integration
- RAG and LLM prototypes
- Git collaboration
- team feedback

Create a meaningful two-column experience composition.

Suggested design:

- left: role, company, date, reflection
- right: animated workflow pipeline
- workflow stages activate on scroll
- no fake percentages
- no extra invented employment

---

## 17. Research

Use this paper:

**An AI Intelligence Wellness Framework Integrating Image Recognition and Conversational AI for Preventive Healthcare**

Metadata:

- ICETSIS 2026
- Bahrain
- May 2026
- IEEE Bahrain Section

Use only the correct verified status:

- co-authored
- accepted
- presented
- published

Do not guess.

Supported concepts:

- image recognition
- conversational AI
- preventive healthcare
- research collaboration
- technical presentation

Create a balanced two-column research section.

Visual concept:

- wellness core
- image-recognition input
- conversational-AI layer
- preventive-health output
- animated connecting paths
- explanatory annotations

Do not allow the paper title to overwhelm the entire section.

---

## 18. Contact

Create a premium final contact section.

### Left side

Include:

- strong closing statement
- email
- GitHub
- LinkedIn pending state
- India / IST
- availability statement only if valid

### Right side

Create a real accessible form with visible:

- labels
- borders
- focus states
- validation messages
- loading state
- success state
- error state
- submit button

Do not rely on placeholder text as the label.

Use:

- Next.js Server Action
- Zod
- Resend
- honeypot
- rate limiting or Cloudflare Turnstile
- safe server-side validation
- generic public errors
- no sensitive logs

Environment variables:

```env
NEXT_PUBLIC_SITE_URL=
RESEND_API_KEY=
CONTACT_TO_EMAIL=jaiyanthofficial@gmail.com
CONTACT_FROM_EMAIL=Portfolio Contact <contact@yourdomain.com>
```

Use the visitor email as `replyTo`, not sender.

Mock Resend during tests.

---

## 19. Custom Cursor

Create a custom cursor only on fine-pointer devices.

States:

- View
- Explore
- Open
- Code
- Mail
- Theme
- Close

Requirements:

- smooth requestAnimationFrame interpolation
- subtle default dot
- contextual text state
- never blocks interaction
- disabled on touch
- disabled for reduced motion
- no visible lag

---

## 20. Magnetic Interactions

Use subtle magnetic movement for primary controls.

Requirements:

- fine-pointer only
- transform only
- restrained translation
- smooth reset
- disabled for touch
- disabled for reduced motion

Do not apply magnetic effects to every element.

---

## 21. Three.js

Create a lightweight visual system related to Signal / System / Story.

Use:

- particle ribbons
- connected nodes
- dynamic lines
- subtle depth
- theme-responsive colours

Requirements:

- dynamic client-only import
- WebGL feature check
- static fallback
- capped pixel ratio
- reduced particle count on mobile
- pause when hidden
- reduced-motion support
- never block content
- no heavy downloaded model unless essential
- site remains complete if WebGL fails

---

## 22. Stock Images

Stock images are optional.

Prefer:

- CSS
- SVG
- Canvas
- Three.js
- original diagrams
- abstract system visuals

Use stock images only when they materially improve storytelling.

Rules:

- commercial-use license
- store locally
- optimize with `next/image`
- add meaningful alt text
- document source and license in README
- keep style and crops consistent

Avoid:

- generic developer photos
- handshakes
- office meetings
- robot faces
- random laptops
- fake dashboards
- unrelated city photography

Suitable categories:

- architectural shadows
- abstract refractions
- modern research spaces
- macro technology textures
- minimal mobility photography

If licensing cannot be verified, do not use the image.

---

## 23. Accessibility

Implement:

- semantic HTML
- one H1
- logical heading hierarchy
- Skip to Content
- visible focus styles
- keyboard navigation
- correct ARIA
- accessible dialogs
- associated form labels and errors
- reduced motion
- meaningful alt text
- no hover-only information
- contrast compliance

Run accessibility tests using `@axe-core/playwright`.

---

## 24. SEO

Create:

- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/app/manifest.ts`
- `src/app/opengraph-image.tsx`
- `src/app/icon.tsx`
- `src/app/not-found.tsx`

Add:

- complete metadata
- canonical URL
- Open Graph
- Twitter metadata
- Person JSON-LD
- project metadata
- meaningful social preview
- only assets that actually exist

---

## 25. Performance

Target:

- Lighthouse Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

Use:

- Server Components
- minimal client JavaScript
- lazy Three.js
- optimized fonts
- optimized images
- transform and opacity animations
- no layout shift
- no blocking loader
- no excessive backdrop filters
- no unnecessary dependencies

The site must remain smooth on normal laptops and modern mobile devices.

---

## 26. Project Structure

Use a structure similar to:

```text
src/
├── app/
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── manifest.ts
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── opengraph-image.tsx
│   ├── icon.tsx
│   └── not-found.tsx
├── actions/
│   └── contact.ts
├── components/
│   ├── effects/
│   ├── layout/
│   ├── projects/
│   ├── sections/
│   └── ui/
├── data/
│   └── portfolio.ts
├── lib/
│   ├── contact-schema.ts
│   ├── motion.ts
│   └── utils.ts
└── types/
    └── portfolio.ts
```

Also create:

- `.env.example`
- `.gitignore`
- `README.md`
- `playwright.config.ts`
- package lockfile
- `.nvmrc` or package engines

---

## 27. Testing

Add Playwright tests for:

- homepage rendering
- navigation
- mobile menu
- theme switching
- theme persistence
- project routes
- project dialog
- mouse and keyboard activation
- focus trap
- focus restoration
- contact validation
- mocked successful submission
- contact error handling
- spam protection
- reduced motion
- WebGL failure fallback
- 404 page
- external links
- no horizontal overflow
- accessibility

Test viewports:

- 390px
- 760px
- 1100px
- 1440px

Run:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Fix all errors before completion.

Do not call the real Resend API during automated tests.

---

## 28. Deployment Readiness

Prepare the project for Vercel.

README must explain:

- installation
- local development
- environment variables
- Resend domain verification
- contact testing
- content updates
- adding a resume
- replacing LinkedIn pending state
- project-link updates
- test commands
- Vercel preview deployment
- Vercel production deployment
- custom domain configuration
- analytics
- stock-image licenses

Do not:

- deploy
- connect GitHub
- create external accounts
- purchase a domain
- publish the project

without explicit permission.

---

## 29. Final Quality Check

Before completion, verify that the final design does not contain:

- tiny compressed navigation
- overlapping hero text
- clipped visuals
- giant unused areas
- empty skills cards
- ordinary project cards
- unreadable technical labels
- weak contact fields
- excessive animations
- inconsistent section spacing
- awkward line breaks
- horizontal overflow
- inaccessible interactions

The final result should feel:

- original
- elegant
- cinematic
- technically advanced
- balanced
- fast
- accessible
- factual
- recruiter-friendly
- deployable

Do not stop after scaffolding.

Complete the full implementation and validate it.

After completion, report:

1. design concept
2. files created
3. final stack
4. animations and interactions
5. responsive tests
6. accessibility results
7. lint, typecheck, build, and test results
8. deployment steps
9. information still required from Jaiyanth
10. any unverified claims omitted
