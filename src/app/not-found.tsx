import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center px-6 bg-[var(--canvas)]">
      <div className="flex max-w-md flex-col items-start gap-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent font-medium">
          [ 404 · NOT FOUND ]
        </span>
        <h1 className="font-serif font-normal text-[clamp(48px,8vw,96px)] leading-none tracking-[-0.02em] text-[#111111]">
          Signal <span className="font-serif italic text-accent font-normal accent-underline">lost</span>.
        </h1>
        <p className="lead-intro font-sans text-base text-text-muted leading-relaxed">
          The page you&apos;re looking for isn&apos;t here. It may have moved, or it may never
          have existed.
        </p>
        <Link
          href="/"
          className="neo-black-btn min-h-[48px] px-6 rounded-full font-sans text-sm font-medium tracking-normal gap-2 inline-flex items-center"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>
      </div>
    </main>
  );
}
