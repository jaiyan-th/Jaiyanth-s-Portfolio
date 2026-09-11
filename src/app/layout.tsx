import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Lora,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/effects/theme-provider";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE } from "@/data/portfolio";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
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
  themeColor: "#0A0A0A",
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
      </head>
      <body
        className={`${bricolageGrotesque.variable} ${lora.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} antialiased bg-[#0A0A0A] text-[#F5F5F0] font-body`}
      >
        <ThemeProvider>
          <ScrollProgress />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#A3E635] focus:text-[#0A0A0A] focus:text-sm focus:font-bold focus:border-2 focus:border-white"
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
