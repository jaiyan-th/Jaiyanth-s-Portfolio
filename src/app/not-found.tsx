import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center px-6">
      <div className="flex max-w-md flex-col items-start gap-6">
        <span className="font-mono-label text-secondary">[ 404 ]</span>
        <h1 className="font-display text-[clamp(56px,9vw,120px)] leading-none tracking-tight">
          Signal lost.
        </h1>
        <p className="text-body text-secondary text-pretty">
          The page you&apos;re looking for isn&apos;t here. It may have moved, or it may never
          have existed.
        </p>
        <Link
          href="/"
          className="btn-magnetic btn-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>
      </div>
    </main>
  );
}
