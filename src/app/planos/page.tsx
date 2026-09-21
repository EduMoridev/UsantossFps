import type { Metadata } from "next";
import Link from "next/link";
import { PLANOS, FORMAS_PAGAMENTO, PERIODO_PAGAMENTO } from "@/lib/planos";
import { FAQ_CATEGORIES, SERVICES } from "@/lib/site";
import { Badge, Button, CheckList, Section, SectionHead } from "@/components/UI";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { CTABand, PageHero, ProofNumbers, TrustStrip } from "@/components/Blocks";
import { ComparisonTable } from "@/components/PlanComparison";

export const metadata: Metadata = {
  title: "Planos e preços",
  description:
    "Start FPS, Not Extreme, Advanced FPS e Pro Experience — comparativo completo de tudo que entra em cada pacote.",
};

function formatBRL(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function PlanosPage() {
  return (
    <>
      <PageHero
        eyebrow="planos e preços"
        title={<>Preço fechado antes de começar. <span className="text-accent">Sem orçamento surpresa.</span></>}
        lead="Quatro pacotes que cobrem do PC que só precisa respirar até a experiência mais completa, com mentoria e overclock guiado em call. Todos com medição antes/depois e garantia de 7 dias."
      />

      {/* ---------------- Cards de plano */}
      <Section>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PLANOS.map((p, i) => {
            const tag = p.destaque ?? p.badge;
            return (
              <Reveal key={p.id} delay={i * 70} dir={i % 2 === 0 ? "left" : "right"}>
                <div
                  className={`relative flex h-full flex-col gap-6 rounded-lg border p-6 transition-colors duration-200 md:p-7 ${
                    p.destaque
                      ? "glass-strong !border-accent/45 shadow-[0_20px_60px_-30px_rgba(34,197,94,0.5)]"
                      : "border-line bg-surface hover:border-line"
                  }`}
                >
                  {tag && (
                    <div className="absolute -top-3 left-6">
                      <Badge tone="accent">{tag}</Badge>
                    </div>
                  )}

                  <h2 className="font-display text-xl font-semibold">{p.nome}</h2>

                  <div className="border-y border-line-soft py-5">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      {p.precoAnterior && (
                        <span className="text-sm text-ink-3 line-through decoration-line">
                          {formatBRL(p.precoAnterior)}
                        </span>
                      )}
                      <span className="font-display text-[2.25rem] leading-none tracking-[-0.04em] text-ink">
                        {formatBRL(p.preco)}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-ink-3">{PERIODO_PAGAMENTO}</div>
                  </div>

                  <div className="flex-1">
                    <CheckList items={p.itens} dense />
                  </div>

                  {p.notaEspecial && (
                    <div className="flex items-start gap-2.5 rounded-md border border-accent/25 bg-accent/[0.06] px-3.5 py-3 text-[0.8125rem] leading-relaxed text-ink-2">
                      <Icon name="broadcast" size={15} className="mt-0.5 shrink-0 text-accent" />
                      <span>{p.notaEspecial}</span>
                    </div>
                  )}

                  <div className="mt-auto">
                    <Button href="/contato" variant={p.destaque ? "primary" : "ghost"} size="lg" icon="arrow">
                      Escolher {p.nome}
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 text-[0.8125rem] text-ink-3">
          <span className="font-medium text-ink-2">Formas de pagamento aceitas:</span>
          {FORMAS_PAGAMENTO.map((f, i) => (
            <span key={f} className="flex items-center gap-2">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-line" />}
              {f}
            </span>
          ))}
        </div>
      </Section>

      {/* ---------------- Tabela comparativa */}
      <Section tone="raised">
        <SectionHead
          eyebrow="comparativo"
          title="Lado a lado, sem interpretação."
          lead="A mesma lista para os quatro planos. O que não está incluso aparece marcado, não escondido."
        />

        <Reveal>
          <ComparisonTable />
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
        <Reveal className="mt-8 text-center">
          <Link
            href="/servicos"
            className="text-[0.875rem] text-ink-2 underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            Também atendo celular e serviços avulsos →
          </Link>
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
