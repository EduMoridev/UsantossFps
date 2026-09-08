import Link from "next/link";
import { BRAND } from "@/lib/site";

/* Wordmark: "FRAME" em peso alto + "LAB" no acento, separados por um
   traço de sinal — referência a frametime estável, não a "gaming". */
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const t = size === "lg" ? "text-2xl" : "text-[1.0625rem]";
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label={BRAND.name}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
        <path d="M2 14.5h3.2l2.4-9 2.6 12 2.4-8 1.6 5H18" stroke="#22c55e" strokeWidth="1.7"
              strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`font-display font-bold tracking-[-0.02em] ${t}`}>
        <span className="text-ink">{BRAND.nameParts[0]}</span>
        <span className="text-accent">{BRAND.nameParts[1]}</span>
      </span>
    </Link>
  );
}
