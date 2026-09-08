import type { Metadata } from "next";
import { CONTACT, CONTACT_SLOTS } from "@/lib/site";
import { Badge, Button, Section, SectionHead } from "@/components/UI";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { PageHero, TrustStrip } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Contato e agendamento",
  description: "Diagnóstico gratuito em 10 minutos. WhatsApp, Discord ou formulário com a configuração do seu PC.",
};

const CHANNELS = [
  { i: "whatsapp", t: "WhatsApp", d: CONTACT.whatsappLabel, note: "Canal principal · resposta mais rápida", href: CONTACT.whatsappUrl },
  { i: "discord", t: "Discord", d: "Comunidade com 4,8 mil membros", note: "Suporte, feedbacks e conteúdo grátis", href: CONTACT.discord },
  { i: "mail", t: "E-mail", d: CONTACT.email, note: "Para notas fiscais e assuntos comerciais", href: `mailto:${CONTACT.email}` },
];

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="contato e agendamento"
        title={<>Diagnóstico gratuito <span className="text-accent">em 10 minutos.</span></>}
        lead="Manda a configuração do PC e o problema principal. Eu respondo com a estimativa realista de ganho e o plano que faz sentido — antes de você pagar qualquer coisa."
      >
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge tone="accent" glass>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {CONTACT.responseTime}
          </Badge>
          <Badge>{CONTACT.hours}</Badge>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          {/* ---------------- Formulário */}
          <div>
            <SectionHead
              eyebrow="formulário rápido"
              title="Conte o que está acontecendo."
              lead="Quanto mais específico o sintoma, mais preciso é o diagnóstico."
            />
            <Reveal dir="left">
              <ContactForm />
            </Reveal>
          </div>

          {/* ---------------- Canais + agenda */}
          <Reveal dir="right" className="flex flex-col gap-5">
            <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line">
              {CHANNELS.map((c) => (
                <a
                  key={c.t}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 bg-surface p-5 transition-colors hover:bg-surface-2"
                >
                  <span className="mt-0.5 text-accent"><Icon name={c.i} size={20} /></span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[0.9375rem] font-semibold text-ink group-hover:text-accent">{c.t}</div>
                    <div className="truncate text-sm text-ink-2">{c.d}</div>
                    <div className="mt-0.5 text-xs text-ink-3">{c.note}</div>
                  </div>
                  <Icon name="arrow" size={16} className="mt-1 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              ))}
            </div>

            {/* Agenda */}
            <Reveal>
              <div className="card p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Icon name="calendar" size={18} className="text-accent" />
                    <h3 className="font-display text-base font-semibold">Horários desta semana</h3>
                  </div>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-3">BRT</span>
                </div>

                <div className="grid gap-3">
                  {CONTACT_SLOTS.map((d) => (
                    <div key={d.day} className="flex items-center gap-3">
                      <span className="w-16 shrink-0 text-[0.8125rem] text-ink-3">{d.day}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {d.slots.map((s) => (
                          <a
                            key={s}
                            href={`${CONTACT.whatsappUrl.split("?")[0]}?text=${encodeURIComponent(
                              `Olá! Queria reservar o horário de ${d.day.toLowerCase()} às ${s}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-line px-2.5 py-1 font-mono text-[0.6875rem] text-ink-2 transition-all duration-150 hover:border-accent/50 hover:bg-accent/[0.07] hover:text-accent"
                          >
                            {s}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-5 border-t border-line-soft pt-4 text-xs leading-relaxed text-ink-3">
                  Horários fora dessa faixa podem ser combinados, inclusive para quem está
                  em outro fuso. Clique em um horário para já reservar pelo WhatsApp.
                </p>
              </div>
            </Reveal>

            <div className="card flex items-start gap-3.5 border-accent/25 bg-accent/[0.04] p-5">
              <Icon name="shield" size={18} className="mt-0.5 shrink-0 text-accent" />
              <p className="text-[0.8125rem] leading-relaxed text-ink-2">
                Seus dados são usados só para o atendimento. Nunca peço senha de banco,
                e-mail ou redes sociais.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="raised">
        <SectionHead eyebrow="o que já está garantido" title="Antes mesmo de você pagar." align="center" />
        <Reveal>
          <TrustStrip />
        </Reveal>
        <div className="mt-10 flex justify-center">
          <Button href="/faq" variant="ghost" icon="arrow">Ver perguntas frequentes</Button>
        </div>
      </Section>
    </>
  );
}
