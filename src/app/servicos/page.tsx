import type { Metadata } from "next";
import { SERVICES } from "@/lib/site";
import { Section, SectionHead, Button } from "@/components/UI";
import { Reveal } from "@/components/Reveal";
import { CTABand, PageHero, ServiceCard, TrustStrip } from "@/components/Blocks";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Otimização completa, tuning por jogo, drivers e BIOS, input lag, formatação limpa, setup de live e otimização mobile.",
};

export default function ServicosPage() {
  return (
    <>
      <PageHero
        eyebrow="serviços"
        title={<>Oito frentes de trabalho. <span className="text-accent">Você escolhe onde dói.</span></>}
        lead="Cada serviço ataca um gargalo diferente. No diagnóstico gratuito eu digo quais fazem sentido para o seu hardware — e quais seriam dinheiro jogado fora."
      >
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href="/contato" icon="arrow">Descobrir o meu caso</Button>
          <Button href="/planos" variant="ghost">Ver planos fechados</Button>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <ServiceCard s={s} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="raised">
        <SectionHead
          eyebrow="o que nunca entra"
          title="Tão importante quanto o que eu faço é o que eu me recuso a fazer."
          lead="Boa parte do mercado de 'otimização' vive de atalhos que quebram o sistema ou colocam sua conta em risco."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "Windows modificado ou 'lite'", d: "Quebra atualização de segurança e antivírus. O enxugamento é feito por configuração, sempre em cima da imagem oficial." },
            { t: "Injeção, DLL ou script de terceiros", d: "É o caminho mais curto para um ban permanente. Nenhum anticheat gosta de código estranho no processo do jogo." },
            { t: "Overclock agressivo sem pedido", d: "Ganho pequeno, risco alto e instabilidade que aparece semanas depois. Só faço se você pedir, e com validação." },
          ].map((x, i) => (
            <Reveal key={x.t} delay={i * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <div className="card flex h-full flex-col gap-3 p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-3">
                  <Icon name="x" size={16} />
                </span>
                <h3 className="text-[0.9375rem] font-semibold">{x.t}</h3>
                <p className="text-sm leading-relaxed text-ink-3">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="incluso em qualquer serviço" title="O padrão da casa." align="center" />
        <Reveal>
          <TrustStrip />
        </Reveal>
      </Section>

      <CTABand />
    </>
  );
}
