import type { Metadata } from "next";
import { TESTIMONIALS, TRUST_BADGES, CONTACT } from "@/lib/site";
import { Badge, Button, Section, SectionHead, Stars } from "@/components/UI";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { CTABand, PageHero, ProofNumbers, TestimonialCard } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Depoimentos",
  description: "Avaliações reais de clientes vindas de Discord, Instagram e WhatsApp.",
};

export default function DepoimentosPage() {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <>
      <PageHero
        eyebrow="prova social"
        title={<>3.142 atendimentos. <span className="text-accent">Nota 4,9.</span></>}
        lead="Depoimentos coletados no Discord, Instagram e WhatsApp — cada um com o número que mudou no PC da pessoa."
      >
        <div className="mt-2 flex items-center gap-4">
          <Stars n={5} />
          <span className="text-sm text-ink-3">4,9 de 5 · 8 meses de avaliações</span>
        </div>
      </PageHero>

      <Section>
        <Reveal>
          <ProofNumbers />
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal dir="left">
            <div className="glass-strong relative h-full overflow-hidden rounded-lg p-8 md:p-10">
              <Icon name="quote" size={40} className="mb-6 text-accent/25" />
              <blockquote className="text-xl leading-relaxed text-ink md:text-2xl md:leading-[1.5]">
                &ldquo;{featured.text}&rdquo;
              </blockquote>
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line-soft pt-6">
                <div className="grid h-11 w-11 place-items-center rounded-full border border-accent/30 bg-accent/[0.07] font-display text-sm font-semibold text-accent">
                  {featured.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-ink">{featured.name}</div>
                  <div className="text-sm text-ink-3">{featured.role} · via {featured.source}</div>
                </div>
                {featured.metric && <Badge tone="accent">{featured.metric}</Badge>}
              </div>
            </div>
          </Reveal>

          <Reveal dir="right" className="grid gap-px overflow-hidden rounded-lg border border-line bg-line">
            {TRUST_BADGES.map((b) => (
              <div key={b.title} className="flex items-start gap-3.5 bg-surface p-6">
                <Icon name={b.icon} size={20} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <div className="text-[0.9375rem] font-semibold text-ink">{b.title}</div>
                  <div className="mt-0.5 text-sm leading-snug text-ink-3">{b.text}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="raised">
        <SectionHead
          eyebrow="mais avaliações"
          title="O que muda depois do atendimento."
          lead="Selecionadas por representarem casos diferentes — não só as mais elogiosas."
        />
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {rest.map((t, i) => (
            <Reveal key={t.handle} delay={(i % 3) * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal className="grid gap-10 rounded-lg border border-line bg-surface p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[1.5rem] leading-tight tracking-[-0.02em] md:text-[1.75rem]">
              Prefere ver as conversas cruas?
            </h2>
            <p className="max-w-lg text-ink-2">
              O canal de feedbacks do Discord tem os prints originais, com data e sem edição —
              incluindo os atendimentos que deram trabalho.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={CONTACT.discord} variant="ghost" icon="discord" external>Abrir Discord</Button>
            <Button href={CONTACT.instagram} variant="ghost" icon="instagram" external>Instagram</Button>
          </div>
        </Reveal>
      </Section>

      <CTABand
        title="Quer ser o próximo case?"
        lead="Diagnóstico gratuito, sem compromisso. Se o ganho for pequeno, eu digo antes."
      />
    </>
  );
}
