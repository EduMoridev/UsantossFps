import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/site";
import { Badge, Button, CheckList, Section, SectionHead } from "@/components/UI";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { DeltaBars } from "@/components/Chart";
import { Accordion } from "@/components/Accordion";
import { CTABand, TrustStrip } from "@/components/Blocks";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  return { title: s?.name ?? "Serviço", description: s?.short };
}

export default async function ServicoPage({ params }: Props) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) notFound();

  const others = SERVICES.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      {/* ---------------- Hero do serviço: template reutilizável */}
      <section className="relative overflow-hidden border-b border-line-soft pb-14 pt-28 md:pt-36">
        <div className="grid-tech pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_40%_0%,#000,transparent)]" />
        <div className="container-fl relative">
          <nav className="mb-8 flex items-center gap-2 text-[0.8125rem] text-ink-3" aria-label="Trilha">
            <Link href="/servicos" className="transition-colors hover:text-accent">Serviços</Link>
            <Icon name="chevron" size={13} />
            <span className="text-ink-2">{s.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <Reveal dir="left" className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-md border border-accent/30 bg-accent/[0.07] text-accent">
                  <Icon name={s.icon} size={23} />
                </span>
                <div>
                  <div className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent">
                    serviço
                  </div>
                  <div className="text-sm text-ink-3">{s.duration} · remoto</div>
                </div>
              </div>

              <h1 className="text-[2.25rem] leading-[1.06] tracking-[-0.035em] md:text-h1">
                {s.name}
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-ink-2">{s.headline}</p>
              <p className="max-w-xl leading-relaxed text-ink-3">{s.intro}</p>

              <div className="mt-1 flex flex-col gap-3 sm:flex-row">
                <Button href="/contato" size="lg" icon="arrow">Agendar este serviço</Button>
                <Button href="/planos" size="lg" variant="ghost">Ver em qual plano entra</Button>
              </div>
            </Reveal>

            {/* Cartão de resumo comercial — fixo no desktop */}
            <Reveal dir="right">
              <aside className="card sticky top-24 flex flex-col gap-5 p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-3">
                    investimento
                  </span>
                  <Badge tone="accent">Garantia 7 dias</Badge>
                </div>
                <div className="font-display text-[2.25rem] leading-none tracking-[-0.035em] text-accent">
                  {s.price}
                </div>
                <dl className="grid gap-3 border-y border-line-soft py-4 text-sm">
                  {[
                    { k: "Tempo de entrega", v: s.duration, i: "clock" },
                    { k: "Formato", v: "100% remoto, você assiste", i: "users" },
                    { k: "Entrega final", v: "Relatório antes/depois", i: "file" },
                  ].map((r) => (
                    <div key={r.k} className="flex items-center justify-between gap-4">
                      <dt className="flex items-center gap-2 text-ink-3">
                        <Icon name={r.i} size={15} /> {r.k}
                      </dt>
                      <dd className="text-right font-medium text-ink">{r.v}</dd>
                    </div>
                  ))}
                </dl>
                <div>
                  <div className="mb-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-3">
                    pré-requisitos
                  </div>
                  <CheckList items={s.requirements} dense />
                </div>
                <Button href="/contato" icon="arrow" className="w-full">Reservar horário</Button>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- O que está incluso */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHead eyebrow="o que está incluso" title="Item por item, sem surpresa." />
            <Reveal dir="left">
              <CheckList items={s.includes} />
            </Reveal>
          </div>
          <Reveal dir="right" className="flex flex-col gap-10">
            <div>
              <h3 className="mb-5 font-display text-lg font-semibold">Ganho típico neste serviço</h3>
              <div className="card p-6">
                <DeltaBars metrics={s.metrics} />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-ink-3">
                Média de atendimentos reais com este serviço. O ganho no seu PC depende
                do estado atual — a estimativa vem no diagnóstico gratuito, antes do pagamento.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-display text-lg font-semibold">O que você recebe no fim</h3>
              <div className="grid gap-3">
                {s.deliverables.map((d) => (
                  <div key={d} className="flex items-start gap-3 rounded-md border border-line bg-surface p-4">
                    <Icon name="file" size={17} className="mt-0.5 shrink-0 text-accent" />
                    <span className="text-[0.9375rem] text-ink-2">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="raised">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead eyebrow="dúvidas" title={`Sobre ${s.name.toLowerCase()}`} />
          <Reveal dir="right">
            <Accordion items={s.faq} defaultOpen={0} />
            <div className="mt-6">
              <Link href="/faq" className="text-[0.9375rem] text-ink-2 underline-offset-4 transition-colors hover:text-accent hover:underline">
                Ver todas as perguntas frequentes →
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="combina bem com"
          title="Serviços que costumam ser contratados junto."
          action={<Button href="/servicos" variant="ghost" icon="arrow">Todos</Button>}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {others.map((o, i) => (
            <Reveal key={o.slug} delay={i * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <Link href={`/servicos/${o.slug}`} className="card card-hover group flex h-full flex-col gap-3 p-6">
                <span className="text-accent"><Icon name={o.icon} size={20} /></span>
                <h3 className="text-[0.9375rem] font-semibold">{o.name}</h3>
                <p className="text-sm leading-relaxed text-ink-3">{o.short}</p>
                <span className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-accent">
                  {o.price}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <TrustStrip />
        </Reveal>
      </Section>

      <CTABand title={`Pronto para agendar ${s.name.toLowerCase()}?`} />
    </>
  );
}
