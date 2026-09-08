import type { Metadata } from "next";
import Link from "next/link";
import { PLANS, PLAN_NOTES, FAQ_CATEGORIES, SERVICES } from "@/lib/site";
import { Badge, Button, Section, SectionHead } from "@/components/UI";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { CTABand, PageHero, ProofNumbers, TrustStrip } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Planos e preços",
  description: "Essencial, Competitivo e Elite — comparativo completo de tudo que entra em cada pacote.",
};

const ROWS = PLANS[2].features.map((f) => f.label);

export default function PlanosPage() {
  return (
    <>
      <PageHero
        eyebrow="planos e preços"
        title={<>Preço fechado antes de começar. <span className="text-accent">Sem orçamento surpresa.</span></>}
        lead="Três pacotes que cobrem do PC que só precisa respirar até a máquina de streamer. Todos com medição antes/depois e garantia de 7 dias."
      />

      {/* ---------------- Cards de plano */}
      <Section>
        <div className="grid gap-5 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.id} delay={i * 70} dir={i % 2 === 0 ? "left" : "right"}>
              <div
                className={`relative flex h-full flex-col gap-6 rounded-lg border p-7 transition-colors duration-200 md:p-8 ${
                  p.featured
                    ? "glass-strong !border-accent/45 shadow-[0_20px_60px_-30px_rgba(34,197,94,0.5)]"
                    : "border-line bg-surface hover:border-line"
                }`}
              >
                {p.badge && (
                  <div className="absolute -top-3 left-7">
                    <Badge tone="accent">{p.badge}</Badge>
                  </div>
                )}

                <div>
                  <h2 className="font-display text-xl font-semibold">{p.name}</h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{p.pitch}</p>
                </div>

                <div className="border-y border-line-soft py-5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[2.75rem] leading-none tracking-[-0.04em] text-ink">
                      {p.price}
                    </span>
                    <span className="text-sm text-ink-3">{p.period}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-ink-3">
                    <Icon name="clock" size={13} /> {p.duration}
                  </div>
                </div>

                <ul className="flex flex-1 flex-col gap-3">
                  {p.features.map((f) => (
                    <li
                      key={f.label}
                      className={`flex gap-3 text-[0.875rem] leading-snug ${
                        f.included ? "text-ink-2" : "text-ink-3/60 line-through decoration-line"
                      }`}
                    >
                      <Icon
                        name={f.included ? "check" : "x"}
                        size={16}
                        className={`mt-0.5 shrink-0 ${f.included ? "text-accent" : "text-ink-3/50"}`}
                      />
                      {f.label}
                    </li>
                  ))}
                </ul>

                <Button href="/contato" variant={p.featured ? "primary" : "ghost"} size="lg" icon="arrow">
                  {p.cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <ul className="mt-8 grid gap-2.5">
          {PLAN_NOTES.map((n) => (
            <li key={n} className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-ink-3">
              <Icon name="minus" size={14} className="mt-1 shrink-0 text-line" />
              {n}
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------------- Tabela comparativa (desktop) */}
      <Section tone="raised">
        <SectionHead
          eyebrow="comparativo"
          title="Lado a lado, sem interpretação."
          lead="A mesma lista para os três planos. O que não está incluso aparece marcado, não escondido."
        />

        <Reveal className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-2">
                <th className="w-[42%] px-5 py-4 text-left font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-3">
                  Recurso
                </th>
                {PLANS.map((p) => (
                  <th key={p.id} className="px-5 py-4 text-center">
                    <div className={`font-display text-base font-semibold ${p.featured ? "text-accent" : "text-ink"}`}>
                      {p.name}
                    </div>
                    <div className="mt-0.5 font-mono text-xs text-ink-3">{p.price}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, ri) => (
                <tr key={row} className={ri % 2 ? "bg-surface/40" : ""}>
                  <td className="border-t border-line-soft px-5 py-3.5 text-ink-2">{row}</td>
                  {PLANS.map((p) => {
                    const f = p.features.find((x) => x.label === row);
                    const yes = !!f?.included;
                    return (
                      <td key={p.id} className="border-t border-line-soft px-5 py-3.5 text-center">
                        <Icon
                          name={yes ? "check" : "minus"}
                          size={17}
                          className={`mx-auto ${yes ? "text-accent" : "text-line"}`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td className="border-t border-line px-5 py-5" />
                {PLANS.map((p) => (
                  <td key={p.id} className="border-t border-line px-5 py-5 text-center">
                    <Button href="/contato" variant={p.featured ? "primary" : "ghost"}>
                      Escolher
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Reveal>
      </Section>

      {/* ---------------- Avulso */}
      <Section>
        <SectionHead
          eyebrow="não quer pacote?"
          title="Todos os serviços também são vendidos avulsos."
          lead="Se você já sabe exatamente qual é o seu problema, contrate só o que precisa."
          action={<Button href="/servicos" variant="ghost" icon="arrow">Ver serviços</Button>}
        />
        <Reveal className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/servicos/${s.slug}`}
              className="group flex items-center justify-between gap-3 bg-surface p-5 transition-colors hover:bg-surface-2"
            >
              <div>
                <div className="text-[0.875rem] font-medium text-ink group-hover:text-accent">{s.name}</div>
                <div className="mt-0.5 font-mono text-[0.6875rem] text-accent">{s.price}</div>
              </div>
              <Icon name="arrow" size={16} className="shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
            </Link>
          ))}
        </Reveal>
        <Reveal className="mt-10">
          <TrustStrip />
        </Reveal>
      </Section>

      <Section tone="raised">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHead eyebrow="pagamento e garantia" title="As perguntas que aparecem antes de fechar." />
          <Reveal dir="right">
            <Accordion items={FAQ_CATEGORIES[3].items.concat(FAQ_CATEGORIES[1].items.slice(1, 2))} defaultOpen={0} />
          </Reveal>
        </div>
        <Reveal className="mt-14">
          <ProofNumbers />
        </Reveal>
      </Section>

      <CTABand
        title="Na dúvida entre dois planos?"
        lead="Manda a configuração do PC. Em 10 minutos eu digo qual faz sentido — inclusive se for o mais barato."
      />
    </>
  );
}
