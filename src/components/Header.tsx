"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, CONTACT } from "@/lib/site";
import { Logo } from "./Logo";
import { Button } from "./UI";
import { Icon } from "./Icon";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "border-b border-line bg-base/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="container-fl flex h-16 items-center justify-between gap-6 md:h-[72px]">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            {NAV.map((n) => {
              const active = path === n.href || path.startsWith(n.href + "/");
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`relative rounded-lg px-3.5 py-2 text-[0.9375rem] transition-colors duration-150 ${
                    active ? "text-accent" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {n.label}
                  {active && (
                    <span className="absolute inset-x-3.5 -bottom-px h-px bg-accent" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contato"
              className="hidden text-[0.9375rem] text-ink-2 transition-colors hover:text-ink lg:block"
            >
              Contato
            </Link>
            <Button href="/contato" className="hidden md:inline-flex" icon="arrow">
              Diagnóstico grátis
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              className="glass rounded-lg p-2.5 text-ink transition-colors hover:border-accent/50 hover:text-accent lg:hidden"
            >
              <Icon name={open ? "x" : "menu"} size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile — folha inteira, itens grandes, um CTA só */}
      <div
        className={`glass-strong fixed inset-0 z-40 rounded-none border-none transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="container-fl flex h-full flex-col justify-between pb-10 pt-24">
          <nav className="flex flex-col" aria-label="Mobile">
            {[...NAV, { label: "Depoimentos", href: "/depoimentos" }, { label: "Quem faz", href: "/sobre" }, { label: "FAQ", href: "/faq" }, { label: "Contato", href: "/contato" }].map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                className="flex items-center justify-between border-b border-line-soft py-4 font-display text-2xl tracking-tight text-ink transition-colors hover:text-accent"
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                {n.label}
                <Icon name="chevron" size={18} className="text-ink-3" />
              </Link>
            ))}
          </nav>
          <div className="grid gap-3">
            <Button href="/contato" size="lg" icon="arrow">Agendar diagnóstico grátis</Button>
            <Button href={CONTACT.whatsappUrl} size="lg" variant="ghost" icon="whatsapp" external>
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
