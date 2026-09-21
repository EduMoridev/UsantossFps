import Link from "next/link";
import type { ReactNode } from "react";
import { CONTACT, GAMES, SOCIAL_PROOF_NUMBERS, TRUST_BADGES, type Testimonial, type Service } from "@/lib/site";
import { Icon } from "./Icon";
import { Badge, Button, Eyebrow, Stars } from "./UI";
import { Reveal } from "./Reveal";

/* -------------------------------------------------- HERO DE PÁGINA INTERNA */
export function PageHero({
  eyebrow, title, lead, children,
}: { eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line-soft pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="grid-tech pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000,transparent)] opacity-60" />
      <div className="container-fl relative">
        <Reveal className="flex max-w-3xl flex-col gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-[2.5rem] leading-[1.1] tracking-tight md:text-h1">{title}</h1>
          {lead && <p className="max-w-2xl text-lg leading-relaxed text-ink-2">{lead}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------- SELOS DE CONFIANÇA */
export function TrustStrip({ tone = "line" }: { tone?: "line" | "card" }) {
  return (
    <div
      className={`grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4 ${
        tone === "card" ? "" : ""
      }`}
    >
      {TRUST_BADGES.map((b) => (
        <div key={b.title} className="flex items-start gap-3.5 bg-surface p-5">
          <Icon name={b.icon} size={20} className="mt-0.5 shrink-0 text-accent" />
          <div>
            <div className="text-sm font-semibold text-ink">{b.title}</div>
            <div className="mt-0.5 text-[0.8125rem] leading-snug text-ink-3">{b.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------- FAIXA DE JOGOS
   Wordmarks em texto — nunca logos de terceiros, por licenciamento. */
export function GameMarquee() {
  const list = [...GAMES, ...GAMES];
  return (
    <div className="relative overflow-hidden border-y border-line-soft py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-base to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-base to-transparent" />
      <div className="flex w-max animate-[marquee_46s_linear_infinite] gap-12 hover:[animation-play-state:paused]">
        {list.map((g, i) => (
          <span
            key={`${g}-${i}`}
            className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink-3 transition-colors duration-150 hover:text-accent"
          >
            {g}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

/* -------------------------------------------------- NÚMEROS DE PROVA SOCIAL */
export function ProofNumbers() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-4">
      {SOCIAL_PROOF_NUMBERS.map((n) => (
        <div key={n.label} className="bg-surface px-5 py-7 text-center">
          <div className="font-display text-[2rem] leading-none tracking-[-0.03em] text-ink md:text-[2.5rem]">
            {n.value}
          </div>
          <div className="mt-2 text-[0.8125rem] text-ink-3">{n.label}</div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------- CARD DE DEPOIMENTO */
export function TestimonialCard({ t, featured = false }: { t: Testimonial; featured?: boolean }) {
  return (
    <figure
      className={`card card-hover flex h-full flex-col gap-4 p-6 ${
        featured ? "md:p-8" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <Stars n={t.rating} />
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-3">
          via {t.source}
        </span>
      </div>
      <blockquote
        className={`flex-1 leading-relaxed text-ink-2 ${featured ? "text-lg" : "text-[0.9375rem]"}`}
      >
        &ldquo;{t.text}&rdquo;
      </blockquote>
      {t.metric && (
        <div className="w-fit rounded-full border border-accent/30 bg-accent/[0.07] px-3 py-1 font-mono text-[0.6875rem] tracking-[0.06em] text-accent">
          {t.metric}
        </div>
      )}
      <figcaption className="flex items-center gap-3 border-t border-line-soft pt-4">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface-2 font-display text-xs font-semibold text-accent">
          {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-ink">{t.name}</div>
          <div className="truncate text-xs text-ink-3">{t.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------- CARD DE SERVIÇO */
export function ServiceCard({ s }: { s: Service }) {
  return (
    <Link href={`/servicos/${s.slug}`} className="card card-hover group flex flex-col gap-4 p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-md border border-line bg-surface-2 text-accent transition-colors duration-150 group-hover:border-accent/40">
          <Icon name={s.icon} size={21} />
        </span>
        <Icon
          name="arrow"
          size={18}
          className="mt-3 text-ink-3 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-[1.0625rem] font-semibold leading-snug">{s.name}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{s.short}</p>
      </div>
      <div className="flex items-center gap-3 border-t border-line-soft pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-3">
        <span className="text-accent">{s.price}</span>
        <span className="h-3 w-px bg-line" />
        <span>{s.duration}</span>
      </div>
    </Link>
  );
}

/* -------------------------------------------------- FAIXA DE CTA FINAL */
export function CTABand({
  title = "Descubra quanto o seu PC ainda tem para dar",
  lead = "Diagnóstico gratuito em 10 minutos. Se o ganho não valer a pena, eu falo antes de você pagar.",
}: { title?: string; lead?: string }) {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className="grid-tech pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_80%_at_50%_50%,#000,transparent)]" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.13]"
        style={{ background: "radial-gradient(circle, #22c55e 0%, transparent 65%)" }}
      />
      <div className="container-fl relative py-20 md:py-28">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Badge tone="accent" glass>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {CONTACT.responseTime}
          </Badge>
          <h2 className="text-[2rem] leading-[1.14] tracking-tight md:text-[2.75rem]">{title}</h2>
          <p className="max-w-xl text-ink-2 md:text-lg">{lead}</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button href="/contato" size="lg" icon="arrow">Agendar diagnóstico grátis</Button>
            <Button href={CONTACT.whatsappUrl} size="lg" variant="ghost" icon="whatsapp" external>
              Chamar no WhatsApp
            </Button>
          </div>
          <p className="text-xs text-ink-3">
            Garantia de 7 dias · Sem instalar nada permanente · Você encerra o acesso quando quiser
          </p>
        </Reveal>
      </div>
    </section>
  );
}
