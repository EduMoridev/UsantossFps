import type { Metadata } from "next";
import { AGGREGATE_RESULTS, CASES } from "@/lib/site";
import { Badge, Button, Section, SectionHead } from "@/components/UI";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { DeltaBars, FrametimeChart, GainRing } from "@/components/Chart";
import { delta } from "@/lib/metrics";
import { CTABand, PageHero } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Antes e depois",
  description: "Cases reais com FPS médio, 1% low, input lag e tempo de boot medidos antes e depois da otimização.",
};

export default function ResultadosPage() {
  return (
    <>
      <PageHero
        eyebrow="antes e depois"
        title={<>Número em cima da mesa. <span className="text-accent">Não &ldquo;confia que melhorou&rdquo;.</span></>}
        lead="Toda sessão começa com um benchmark no seu jogo real e termina com o mesmo teste repetido. É essa comparação que sustenta a garantia de 7 dias."
      >
        <div className="mt-3 flex flex-wrap gap-2">
          {["CapFrameX", "PresentMon", "HWiNFO", "Captura de latência"].map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </PageHero>

      {/* ---------------- Agregado */}
      <Section>
        <SectionHead
          eyebrow="média geral"
          title="312 atendimentos com medição completa."
          lead="Estes são os números médios — não os melhores casos. Máquinas já bem configuradas puxam a média para baixo, e isso é honesto."
        />
        <div className="grid gap-8 rounded-lg border border-line bg-surface p-8 sm:grid-cols-2 lg:grid-cols-4 md:p-10">
          {AGGREGATE_RESULTS.map((r, i) => (
            <Reveal key={r.label} delay={i * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <div className="flex flex-col gap-3">
                <GainRing value={r.value} label={r.label} />
                <p className="text-xs leading-relaxed text-ink-3">{r.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <FrametimeChart />
        </Reveal>
      </Section>

      {/* ---------------- Cases */}
      <Section tone="raised">
        <SectionHead
          eyebrow="cases"
          title="Quatro máquinas, quatro gargalos diferentes."
          lead="Repare que em nenhum deles a solução foi trocar hardware."
        />

        <div className="grid gap-5">
          {CASES.map((c, i) => (
            <Reveal key={c.id} delay={i * 50} dir={i % 2 === 0 ? "left" : "right"}>
              <article className="card grid gap-8 p-7 lg:grid-cols-[1.1fr_0.9fr] lg:p-9">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="accent">{c.game}</Badge>
                    <Badge>Plano {c.plan}</Badge>
                  </div>
                  <h3 className="text-[1.375rem] leading-snug tracking-[-0.02em] md:text-h3">
                    {c.title}
                  </h3>
                  <p className="leading-relaxed text-ink-2">{c.summary}</p>
                  <div className="mt-auto flex flex-col gap-2 border-t border-line-soft pt-4 text-[0.8125rem] text-ink-3 sm:flex-row sm:items-center sm:gap-5">
                    <span className="flex items-center gap-2">
                      <Icon name="users" size={14} /> {c.person}
                    </span>
                    <span className="flex items-center gap-2">
                      <Icon name="cpu" size={14} /> {c.setup}
                    </span>
                  </div>
                </div>

                <div className="rounded-md border border-line bg-surface-2 p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-3">
                      medição
                    </span>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent">
                      {delta(c.metrics[0]).pct}% no FPS médio
                    </span>
                  </div>
                  <DeltaBars metrics={c.metrics} compact />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- Metodologia */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHead
            eyebrow="metodologia"
            title="Como esses números são medidos."
            lead="Se a medição não for repetível, o resultado não vale nada."
          />
          <Reveal dir="right" className="grid gap-4">
            {[
              { t: "Mesmo jogo, mesmo mapa, mesma rotina", d: "Benchmark sintético não representa a sua partida. Uso o seu jogo principal, no mesmo trajeto, por 3 minutos." },
              { t: "Três execuções, mediana registrada", d: "Uma medição só pode pegar um pico ou um vale. A mediana de três corridas elimina o ruído." },
              { t: "Antes e depois no mesmo dia", d: "Sem intervalo de dias, sem atualização de driver no meio. A única variável que muda é a otimização." },
              { t: "Frametime, não só FPS", d: "O 1% low e a variação de frametime entram no relatório porque são eles que descrevem a sensação de jogo." },
              { t: "Ponto de restauração antes de tudo", d: "Se você quiser voltar ao estado original para comparar, é um clique." },
            ].map((m, i) => (
              <div key={m.t} className="flex gap-4 rounded-md border border-line bg-surface p-5">
                <span className="font-mono text-sm text-accent/50">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="text-[0.9375rem] font-semibold text-ink">{m.t}</div>
                  <div className="mt-1 text-sm leading-relaxed text-ink-3">{m.d}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="raised">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <Icon name="shield" size={30} className="text-accent" />
          <h2 className="text-[1.75rem] leading-tight tracking-[-0.025em] md:text-h2">
            Se o relatório não mostrar ganho relevante, você não paga.
          </h2>
          <p className="text-ink-2">
            Sete dias para pedir revisão ou reembolso integral. A medição existe justamente
            para essa conversa nunca virar discussão de opinião.
          </p>
          <Button href="/contato" size="lg" icon="arrow">Medir o meu PC</Button>
        </Reveal>
      </Section>

      <CTABand />
    </>
  );
}
