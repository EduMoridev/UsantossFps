import Link from "next/link";
import {
  BRAND, CONTACT, HERO_STATS, SERVICES, PLANS, TESTIMONIALS, PROCESS_STEPS, CASES,
} from "@/lib/site";
import { Button, Badge, Section, SectionHead, Eyebrow, StatBlock } from "@/components/UI";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { DeltaBars, FrametimeChart } from "@/components/Chart";
import {
  CTABand, GameMarquee, ProofNumbers, ServiceCard, TestimonialCard, TrustStrip,
} from "@/components/Blocks";

export default function Home() {
  const hero = CASES[0];

  return (
    <>
      {/* ============================================ HERO */}
      <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="grid-tech pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,#000,transparent)]" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[64rem] -translate-x-1/2 rounded-full opacity-[0.11]"
          style={{ background: "radial-gradient(circle, #22c55e 0%, transparent 62%)" }}
        />

        <div className="container-fl relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="flex flex-col gap-7">
            <Reveal>
              <Badge tone="accent" glass>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Agenda aberta · resposta em 12 min
              </Badge>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="text-[2.625rem] leading-[1.03] tracking-[-0.04em] sm:text-[3.25rem] lg:text-[3.75rem]">
                <span className="text-gradient-ink">Seu setup no máximo.</span>
                <br />
                <span className="text-accent">Sem trocar uma peça.</span>
              </h1>
            </Reveal>

            <Reveal delay={110}>
              <p className="max-w-xl text-lg leading-relaxed text-ink-2">
                Otimização remota que ataca a causa real da queda de FPS: processos
                em segundo plano, drivers empilhados, memória abaixo da velocidade e
                fila de renderização mal configurada. Com medição{" "}
                <strong className="font-medium text-ink">antes e depois</strong> — não
                é &quot;confia que melhorou&quot;.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/contato" size="lg" icon="arrow">
                  Diagnóstico gratuito
                </Button>
                <Button href="/resultados" size="lg" variant="ghost" icon="gauge">
                  Ver resultados reais
                </Button>
              </div>
            </Reveal>

            <Reveal delay={210}>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-ink-3">
                {["Garantia de 7 dias", "Nada instalado permanente", "Zero risco de ban"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <Icon name="check" size={14} className="text-accent" />
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Mockup de painel: substitui foto de banco de imagens */}
          <Reveal delay={140} dir="right">
            <div className="glass-strong relative overflow-hidden rounded-lg p-5 md:p-6">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-40"
                style={{ background: "linear-gradient(180deg, rgba(34,197,94,.14), transparent)" }}
              />
              <div className="relative mb-5 flex items-center justify-between gap-3 border-b border-line-soft pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-2">
                    {BRAND.name} // relatório de sessão
                  </span>
                </div>
                <span className="font-mono text-[0.625rem] text-ink-3">{hero.game}</span>
              </div>

              <div className="relative mb-6 grid grid-cols-3 gap-3">
                {[
                  { k: "FPS médio", v: "214", d: "+65%" },
                  { k: "1% low", v: "152", d: "+181%" },
                  { k: "Input lag", v: "23ms", d: "-48%" },
                ].map((s) => (
                  <div key={s.k} className="rounded-md border border-line bg-surface-2 p-3">
                    <div className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-ink-3">
                      {s.k}
                    </div>
                    <div className="mt-1.5 font-display text-xl leading-none tracking-tight text-ink">
                      {s.v}
                    </div>
                    <div className="mt-1 font-mono text-[0.625rem] text-accent">{s.d}</div>
                  </div>
                ))}
              </div>

              <div className="relative">
                <DeltaBars metrics={hero.metrics.slice(0, 3)} compact />
              </div>

              <div className="relative mt-5 flex items-center gap-2.5 border-t border-line-soft pt-4 text-[0.8125rem] text-ink-3">
                <Icon name="cpu" size={15} className="text-ink-3" />
                {hero.setup}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <GameMarquee />

      {/* ============================================ NÚMEROS */}
      <Section tone="raised">
        <div className="grid gap-10 md:grid-cols-4">
          {HERO_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <StatBlock value={s.value} label={s.label} note={s.note} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================================ O PROBLEMA */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal dir="left" className="flex flex-col gap-6">
            <Eyebrow>o que ninguém te conta</Eyebrow>
            <h2 className="text-[2rem] leading-[1.1] tracking-[-0.028em] md:text-h2">
              O gargalo quase nunca é a placa de vídeo.
            </h2>
            <p className="text-ink-2 md:text-lg">
              PCs perdem desempenho por camadas de software brigando pelo mesmo núcleo
              de processador. Memória rodando abaixo da velocidade que você pagou.
              Antivírus varrendo a pasta do jogo em tempo real. Fila de renderização
              somando 20 ms de atraso de graça.
            </p>
            <ul className="grid gap-4">
              {[
                { t: "FPS médio alto, jogo travando", d: "O número que importa é o 1% low — e é ele que quase ninguém mede." },
                { t: "Mira com atraso perceptível", d: "Input lag é uma soma de sete etapas. Otimizar a errada não muda nada." },
                { t: "Perde desempenho após 20 min", d: "Throttling térmico por curva de energia de fábrica, comum em notebooks." },
              ].map((p) => (
                <li key={p.t} className="flex gap-3.5 border-l border-line pl-4">
                  <div>
                    <div className="text-[0.9375rem] font-semibold text-ink">{p.t}</div>
                    <div className="mt-1 text-sm leading-relaxed text-ink-3">{p.d}</div>
                  </div>
                </li>
              ))}
            </ul>
            <Button href="/blog" variant="quiet" icon="arrow">
              Ler os artigos técnicos
            </Button>
          </Reveal>

          <Reveal dir="right">
            <FrametimeChart />
            <p className="mt-4 text-sm leading-relaxed text-ink-3">
              Mesmo PC, mesma partida, mesmo FPS médio. A diferença entre as duas linhas
              é exatamente a sensação de &quot;travadinha&quot; que faz você errar o tiro.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ============================================ COMO FUNCIONA (3 PASSOS) */}
      <Section tone="raised">
        <SectionHead
          eyebrow="como funciona"
          title="Três passos até o seu PC entregar o que ele tem."
          lead="Todo atendimento é remoto, com você vendo a tela e podendo encerrar a qualquer momento."
          action={<Button href="/como-funciona" variant="ghost" icon="arrow">Processo completo</Button>}
        />
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
          {PROCESS_STEPS.slice(0, 3).map((s, i) => (
            <Reveal key={s.n} delay={i * 70} dir={i % 2 === 0 ? "left" : "right"}>
              <div className="flex h-full flex-col gap-4 bg-surface p-7">
                <div className="flex items-center gap-3">
                  <span className="font-display text-[2.5rem] leading-none tracking-tight text-accent/25">
                    {s.n}
                  </span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-3">
                    {s.time}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================================ SERVIÇOS */}
      <Section>
        <SectionHead
          eyebrow="serviços"
          title="Cada gargalo tem um serviço específico."
          lead="Você pode contratar um item isolado ou fechar um plano que junta os que fazem sentido para o seu caso."
          action={<Button href="/servicos" variant="ghost" icon="arrow">Todos os serviços</Button>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.slice(0, 4).map((s, i) => (
            <Reveal key={s.slug} delay={i * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <ServiceCard s={s} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================================ PLANOS RESUMO */}
      <Section tone="raised">
        <SectionHead
          eyebrow="planos"
          title="Três pacotes. Sem letra miúda."
          lead="Preço fechado antes de começar. Se no diagnóstico o ganho não justificar, eu falo."
          action={<Button href="/planos" variant="ghost" icon="arrow">Comparar em detalhe</Button>}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.id} delay={i * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <div
                className={`card card-hover flex h-full flex-col gap-5 p-7 ${
                  p.featured
                    ? "glass-strong !border-accent/45 shadow-[0_20px_60px_-30px_rgba(34,197,94,0.5)]"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  {p.badge && <Badge tone="accent">{p.badge}</Badge>}
                </div>
                <div>
                  <div className="font-display text-[2.25rem] leading-none tracking-[-0.035em] text-ink">
                    {p.price}
                  </div>
                  <div className="mt-1.5 text-xs text-ink-3">{p.period} · {p.duration}</div>
                </div>
                <p className="flex-1 text-[0.9375rem] leading-relaxed text-ink-2">{p.pitch}</p>
                <Button href="/planos" variant={p.featured ? "primary" : "ghost"} icon="arrow">
                  {p.cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================================ PROVA SOCIAL */}
      <Section>
        <SectionHead
          eyebrow="prova social"
          title="3.142 atendimentos e nenhum cliente banido."
          lead="Depoimentos vindos de Discord, Instagram e WhatsApp — com o número que mudou em cada caso."
          action={<Button href="/depoimentos" variant="ghost" icon="arrow">Ver todos</Button>}
        />
        <Reveal className="mb-8">
          <ProofNumbers />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <Reveal key={t.handle} delay={i * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================================ CONFIANÇA */}
      <Section tone="raised">
        <SectionHead
          eyebrow="segurança"
          title="Acesso remoto sem susto."
          lead="Você inicia a sessão, assiste a tudo e encerra quando quiser. Nada permanece instalado."
          align="center"
        />
        <Reveal>
          <TrustStrip />
        </Reveal>
        <div className="mt-8 text-center">
          <Link href="/faq" className="text-[0.9375rem] text-ink-2 underline-offset-4 transition-colors hover:text-accent hover:underline">
            Todas as dúvidas sobre segurança, garantia e compatibilidade →
          </Link>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
