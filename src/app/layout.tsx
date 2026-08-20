import type { Metadata, Viewport } from "next";
import {
  Unbounded,
  Fraunces,
  Plus_Jakarta_Sans,
  Space_Grotesk,
  JetBrains_Mono,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/effects/theme-provider";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CursorSpotlight } from "@/components/ui/cursor-spotlight";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE } from "@/data/portfolio";

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["400", "700"],
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
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#FAF3EE" },
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
        className={`${unbounded.variable} ${fraunces.variable} ${plusJakartaSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${spaceMono.variable} antialiased bg-[#E8D8C4] text-[#561C24] font-sans`}
      >
        <ThemeProvider>
          <ScrollProgress />
          <CursorSpotlight />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#6D2932] focus:text-white focus:text-sm focus:font-medium"
          >
            Skip to content
          </a>
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
