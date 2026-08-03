import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, DM_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/effects/theme-provider";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE } from "@/data/portfolio";

// Inter — Helvetica-style Neo-Grotesque, tight tracking, high impact.
// Used for both display headings and body text across the entire portfolio.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Instrument Serif — high-contrast italic serif for accent words.
// Used ONLY for highlighted/emphasis words (like "complex" in the reference)
// to create a striking type-contrast against the bold sans-serif body.
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

// DM Mono — kept for technical labels / metadata (monospace)
const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s · Jaiyanth B",
  },
  description: SITE.description,
  applicationName: "Jaiyanth B Portfolio",
  authors: [{ name: "Jaiyanth B" }],
  creator: "Jaiyanth B",
  keywords: [
    "Jaiyanth B",
    "AI Engineer",
    "Full-Stack Engineer",
    "Applied AI",
    "RAG",
    "Next.js",
    "React",
    "TypeScript",
    "NestJS",
    "Flask",
    "Supabase",
    "Prisma",
    "Computer Science and Business Systems",
    "Portfolio",
  ],
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: "Jaiyanth B",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0E1214" },
    { media: "(prefers-color-scheme: light)", color: "#F4F5F3" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jaiyanth B",
  jobTitle: "AI + Full-Stack Engineer",
  email: "mailto:jaiyanthofficial@gmail.com",
  url: SITE.url,
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  knowsAbout: [
    "Applied AI",
    "Retrieval-Augmented Generation",
    "Full-Stack Engineering",
    "Next.js",
    "NestJS",
    "Flask",
    "Supabase",
    "Prisma ORM",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Computer Science and Business Systems",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* No-flash theme bootstrap — runs before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('jb-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored || (prefersDark ? 'dark' : 'dark');
                  var root = document.documentElement;
                  root.classList.remove('dark', 'light');
                  root.classList.add(theme === 'light' ? 'light' : 'dark');
                  root.dataset.theme = theme;
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} ${dmMono.variable} antialiased bg-canvas text-foreground`}
      >
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-canvas focus:text-sm focus:font-medium"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <CustomCursor />
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
