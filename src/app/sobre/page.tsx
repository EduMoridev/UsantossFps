import type { Metadata } from "next";
import { ABOUT, CONTACT, SOCIAL_PROOF_NUMBERS } from "@/lib/site";
import { Badge, Button, Section, SectionHead } from "@/components/UI";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { CTABand, PageHero, ProofNumbers } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Quem faz",
  description: "Cinco anos, mais de três mil atendimentos remotos e um método que começa e termina em medição.",
};

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="quem faz"
        title={<>Uma pessoa, um método, <span className="text-accent">cinco anos medindo.</span></>}
        lead="Não é agência nem call center. Quem responde no WhatsApp é quem vai mexer no seu PC — e é quem assina o relatório no final."
      />

      {/* ---------------- Bio */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <Reveal dir="left" className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-full border border-accent/30 bg-accent/[0.07] font-display text-xl font-semibold text-accent">
                ES
              </div>
              <div>
                <div className="font-display text-xl font-semibold">{ABOUT.operatorName}</div>
                <div className="text-sm text-ink-3">{ABOUT.role}</div>
                <div className="mt-1 font-mono text-xs text-accent">{ABOUT.operatorHandle}</div>
              </div>
            </div>

            {ABOUT.bio.map((p) => (
              <p key={p.slice(0, 24)} className="max-w-2xl leading-relaxed text-ink-2 md:text-lg">
                {p}
              </p>
            ))}

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button href="/contato" icon="arrow">Falar comigo</Button>
              <Button href={CONTACT.discord} variant="ghost" icon="discord" external>
                Entrar no Discord
              </Button>
            </div>
          </Reveal>

          <Reveal dir="right">
            <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line">
              {ABOUT.credentials.map((c) => (
                <div key={c.title} className="bg-surface p-6">
                  <div className="font-display text-lg font-semibold text-accent">{c.title}</div>
                  <div className="mt-1 text-sm leading-relaxed text-ink-3">{c.detail}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- Princípios */}
      <Section tone="raised">
        <SectionHead
          eyebrow="princípios"
          title="Quatro regras que não mudam por cliente nenhum."
          lead="Elas são a razão de eu conseguir dizer 'não vale a pena' sem medo de perder a venda."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {ABOUT.principles.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <div className="card flex h-full flex-col gap-3 p-7">
                <span className="font-mono text-sm text-accent/50">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[1.125rem] font-semibold">{p.title}</h3>
                <p className="leading-relaxed text-ink-2">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- Bastidores / ferramentas */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHead
            eyebrow="bastidores"
            title="As ferramentas que aparecem na sua tela."
            lead="Tudo software conhecido, gratuito ou padrão da indústria. Nenhum 'otimizador' de origem duvidosa."
          />
          <Reveal dir="right" className="grid gap-3 sm:grid-cols-2">
            {ABOUT.toolbox.map((t) => (
              <div key={t} className="flex items-center gap-3 rounded-md border border-line bg-surface px-4 py-3.5">
                <Icon name="wrench" size={16} className="shrink-0 text-accent" />
                <span className="text-[0.875rem] text-ink-2">{t}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <ProofNumbers />
        </Reveal>
      </Section>

      {/* ---------------- Linha do tempo */}
      <Section tone="raised">
        <SectionHead eyebrow="linha do tempo" title="De um PC só para três mil." />
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { y: "2021", t: "O primeiro PC", d: "Ryzen 3 com GTX 1050 Ti. Meses testando o que realmente mudava o 1% low." },
            { y: "2022", t: "Primeiros clientes", d: "Amigos do Discord. O relatório antes/depois nasceu aqui, para provar o resultado." },
            { y: "2024", t: "Método fechado", d: "Medição instrumentada, ponto de restauração obrigatório e garantia formal de 7 dias." },
            { y: "2026", t: "3.142 atendimentos", d: "Comunidade de 4,8 mil membros e zero cliente banido em cinco anos." },
          ].map((x, i) => (
            <Reveal key={x.y} delay={i * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <div className="flex h-full flex-col gap-3 border-t-2 border-accent/30 pt-5">
                <Badge tone="accent">{x.y}</Badge>
                <h3 className="text-[1.0625rem] font-semibold">{x.t}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-ink-3">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand
        title="Quer conversar antes de fechar qualquer coisa?"
        lead={`${SOCIAL_PROOF_NUMBERS[3].value} de tempo médio de resposta. Manda a config do PC e eu digo o que dá para fazer.`}
      />
    </>
  );
}
