import type { Metadata } from "next";
import { PROCESS_STEPS, FAQ_CATEGORIES, CONTACT } from "@/lib/site";
import { Badge, Button, CheckList, Section, SectionHead } from "@/components/UI";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { CTABand, PageHero, TrustStrip } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Como funciona",
  description: "Do diagnóstico gratuito à entrega do relatório: o passo a passo completo do atendimento remoto.",
};

export default function ComoFuncionaPage() {
  return (
    <>
      <PageHero
        eyebrow="processo"
        title={<>Cinco etapas. <span className="text-accent">Você acompanha todas.</span></>}
        lead="Atendimento 100% remoto, com a sua tela visível o tempo inteiro. Nada é aplicado sem eu explicar antes, e a sessão termina quando você quiser."
      >
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href="/contato" icon="arrow">Começar pelo diagnóstico</Button>
          <Button href={CONTACT.whatsappUrl} variant="ghost" icon="whatsapp" external>
            Tirar dúvida no WhatsApp
          </Button>
        </div>
      </PageHero>

      {/* ---------------- Timeline */}
      <Section>
        <div className="relative">
          {/* trilho vertical — só no desktop */}
          <div className="pointer-events-none absolute left-[calc(3.5rem-0.5px)] top-4 hidden h-[calc(100%-6rem)] w-px bg-gradient-to-b from-accent/50 via-line to-transparent lg:block" />

          <div className="grid gap-4 lg:gap-6">
            {PROCESS_STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 50} dir={i % 2 === 0 ? "left" : "right"}>
                <div className="grid gap-6 lg:grid-cols-[7rem_1fr] lg:gap-8">
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                    <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-accent/35 bg-surface font-display text-lg font-semibold text-accent">
                      {s.n}
                    </span>
                    <span className="font-mono text-[0.625rem] uppercase leading-tight tracking-[0.12em] text-ink-3 lg:pl-1">
                      {s.time}
                    </span>
                  </div>

                  <div className="card p-7 md:p-8">
                    <h2 className="text-[1.375rem] leading-snug tracking-[-0.02em]">{s.title}</h2>
                    <p className="mt-3 max-w-2xl leading-relaxed text-ink-2">{s.text}</p>
                    <div className="mt-6 border-t border-line-soft pt-6">
                      <CheckList items={s.detail} dense />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------- O que preparar */}
      <Section tone="raised">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHead
              eyebrow="antes da sessão"
              title="O que você precisa deixar pronto."
              lead="Nada complicado — mas ter isso à mão evita atrasar o atendimento."
            />
            <Reveal dir="left">
              <CheckList
                items={[
                  "PC ligado e sem tarefas importantes rodando",
                  "Conexão estável (10 Mbps já resolve)",
                  "Senha de administrador do Windows",
                  "Senha da BIOS, se você tiver definido uma",
                  "Licença do Windows ou conta Microsoft vinculada (só na formatação)",
                  "Pen drive de 8 GB, se for formatação",
                  "Uma janela de tempo em que você não vá precisar do PC",
                ]}
              />
            </Reveal>
          </div>

          <Reveal dir="right" className="flex flex-col gap-5">
            <div className="card p-7">
              <div className="mb-4 flex items-center gap-3">
                <Icon name="lock" size={20} className="text-accent" />
                <h3 className="font-display text-lg font-semibold">Como o acesso remoto funciona</h3>
              </div>
              <ol className="grid gap-3.5 text-[0.9375rem] leading-relaxed text-ink-2">
                {[
                  "Você baixa um aplicativo de acesso pontual — nada que fique instalado.",
                  "O aplicativo gera um código de sessão que só você tem.",
                  "Você me passa o código; sem ele, não existe acesso.",
                  "Durante toda a sessão você vê a tela e o cursor se movendo.",
                  "Ao encerrar, o código expira. Para um novo atendimento, gera-se outro.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="font-mono text-xs text-accent/60">{String(i + 1).padStart(2, "0")}</span>
                    {t}
                  </li>
                ))}
              </ol>
            </div>

            <div className="card flex items-start gap-4 border-accent/25 bg-accent/[0.04] p-6">
              <Icon name="shield" size={20} className="mt-0.5 shrink-0 text-accent" />
              <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                <strong className="font-semibold text-ink">Nunca peço</strong> senha de banco,
                e-mail, redes sociais ou qualquer conta que não seja necessária para o serviço.
                Se algum &quot;técnico&quot; pedir isso, encerre o atendimento na hora.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- Depois */}
      <Section>
        <SectionHead
          eyebrow="depois da entrega"
          title="O atendimento não acaba quando a sessão fecha."
          align="center"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { i: "file", t: "Relatório em PDF", d: "Gráficos antes/depois de FPS, 1% low, latência e boot, com a configuração do seu PC documentada." },
            { i: "undo", t: "7 dias de ajuste", d: "Qualquer coisa que tenha ficado estranha, eu resolvo sem cobrar. Não gostou? Reembolso integral." },
            { i: "refresh", t: "Perfil salvo", d: "Plano de energia, config do jogo e perfil de BIOS exportados para você reaplicar depois de uma formatação." },
          ].map((x, i) => (
            <Reveal key={x.t} delay={i * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <div className="card flex h-full flex-col gap-3 p-7">
                <Icon name={x.i} size={22} className="text-accent" />
                <h3 className="text-[1.0625rem] font-semibold">{x.t}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <TrustStrip />
        </Reveal>
      </Section>

      <Section tone="raised">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHead
            eyebrow="dúvidas do processo"
            title="O que costumam perguntar antes de agendar."
            lead={<Badge tone="accent">{CONTACT.responseTime}</Badge>}
          />
          <Reveal dir="right">
            <Accordion items={FAQ_CATEGORIES[0].items} defaultOpen={0} />
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
