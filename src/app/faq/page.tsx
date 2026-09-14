import type { Metadata } from "next";
import Link from "next/link";
import { FAQ_CATEGORIES, CONTACT } from "@/lib/site";
import { Button, Section, SectionHead } from "@/components/UI";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { CTABand, PageHero } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description: "Segurança do acesso remoto, garantia, compatibilidade, prazos e formas de pagamento.",
};

const ANCHORS = ["seguranca", "garantia", "compatibilidade", "atendimento"];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="faq"
        title={<>Tudo que você deveria perguntar <span className="text-accent">antes de deixar alguém mexer no seu PC.</span></>}
        lead="Se a sua dúvida não estiver aqui, manda no WhatsApp — respondo mesmo quando a resposta é 'não vale a pena para o seu caso'."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-16">
          {/* Índice lateral */}
          <Reveal dir="left" className="lg:sticky lg:top-24 lg:h-fit"><aside>
            <div className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-3">
              categorias
            </div>
            <nav className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {FAQ_CATEGORIES.map((c, i) => (
                <a
                  key={c.title}
                  href={`#${ANCHORS[i]}`}
                  className="rounded-md border border-line px-3.5 py-2 text-sm text-ink-2 transition-colors duration-150 hover:border-accent/45 hover:text-accent lg:border-transparent lg:px-3"
                >
                  {c.title}
                </a>
              ))}
            </nav>

            <div className="glass mt-8 hidden rounded-lg p-5 lg:block">
              <div className="text-sm font-semibold text-ink">Não achou?</div>
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-3">
                {CONTACT.responseTime}. Sem robô, sem script de vendas.
              </p>
              <Button href={CONTACT.whatsappUrl} variant="ghost" external icon="whatsapp" className="mt-4 w-full">
                Perguntar
              </Button>
            </div>
          </aside></Reveal>

          <div className="grid gap-14">
            {FAQ_CATEGORIES.map((c, i) => (
              <div key={c.title} id={ANCHORS[i]} className="scroll-mt-28">
                <SectionHead title={c.title} />
                <Reveal dir={i % 2 === 0 ? "left" : "right"}>
                  <Accordion items={c.items} defaultOpen={i === 0 ? 0 : -1} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="raised">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { i: "gauge", t: "Ver resultados medidos", d: "Cases reais com antes e depois.", h: "/resultados" },
            { i: "wrench", t: "Ver o que está incluso", d: "Todos os serviços, item por item.", h: "/servicos" },
            { i: "users", t: "Ler depoimentos", d: "Avaliações de Discord e Instagram.", h: "/depoimentos" },
          ].map((x, i) => (
            <Reveal key={x.h} delay={i * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <Link href={x.h} className="card card-hover group flex items-start gap-4 p-6">
                <Icon name={x.i} size={20} className="mt-0.5 shrink-0 text-accent" />
                <div className="flex-1">
                  <div className="text-[0.9375rem] font-semibold group-hover:text-accent">{x.t}</div>
                  <div className="mt-1 text-sm text-ink-3">{x.d}</div>
                </div>
                <Icon name="arrow" size={16} className="mt-1 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  );
}
