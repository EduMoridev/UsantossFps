"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";

/* Layout mínimo da seção /gratis: só a trilha (breadcrumb) acima do
   conteúdo de cada página. A trilha é quem limpa o header fixo
   (pt-28/pt-32) — as páginas filhas não repetem esse espaçamento.
   Em /gratis (o hub) a trilha para em "Grátis"; nas subpáginas,
   "Grátis" vira link de volta ao hub e ganha um terceiro segmento. */
const PAGE_LABELS: Record<string, string> = {
  "/gratis/scripts": "Scripts",
  "/gratis/ferramentas": "Ferramentas",
  "/gratis/pcs": "Montagens",
};

export default function GratisLayout({ children }: { children: ReactNode }) {
  const path = usePathname();
  const label = PAGE_LABELS[path];

  return (
    <>
      <div className="border-b border-line-soft pb-4 pt-28 md:pt-32">
        <div className="container-fl">
          <nav className="flex items-center gap-2 text-[0.8125rem] text-ink-3" aria-label="Trilha">
            <Link href="/" className="transition-colors hover:text-accent">
              Início
            </Link>
            <Icon name="chevron" size={12} />
            {label ? (
              <>
                <Link href="/gratis" className="transition-colors hover:text-accent">
                  Grátis
                </Link>
                <Icon name="chevron" size={12} />
                <span className="text-ink-2">{label}</span>
              </>
            ) : (
              <span className="text-ink-2">Grátis</span>
            )}
          </nav>
        </div>
      </div>
      {children}
    </>
  );
}
