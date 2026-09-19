import type { Metadata } from "next";
import { Button, Eyebrow, Section } from "@/components/UI";
import { Reveal } from "@/components/Reveal";
import { FerramentasExplorer } from "@/components/FerramentasExplorer";
import { BRAND } from "@/lib/site";
import { CATEGORIAS, CONTAGEM_FERRAMENTAS, FERRAMENTAS } from "@/lib/ferramentas";

export const metadata: Metadata = {
  title: "Ferramentas grátis",
  description: `${CONTAGEM_FERRAMENTAS} ferramentas gratuitas usadas nos atendimentos para diagnosticar, medir e manter o PC — todas baixadas do site oficial de cada uma.`,
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ferramentas gratuitas recomendadas pela UsantossFps",
  numberOfItems: CONTAGEM_FERRAMENTAS,
  itemListElement: FERRAMENTAS.map((f, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: f.nome,
    url: f.siteOficial,
    description: f.paraQueServe,
  })),
};

export default function GratisFerramentasPage() {
  return (
    <>
      {/* ---------------- Hero: a trilha do layout já limpou o header */}
      <section className="relative overflow-hidden pb-10 pt-12 md:pb-12 md:pt-16">
        <div className="grid-tech pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000,transparent)]" />
        <div className="container-fl relative">
          <Reveal className="flex max-w-3xl flex-col gap-6">
            <Eyebrow>ferramentas</Eyebrow>
            <h1 className="text-[2.5rem] leading-[1.05] tracking-[-0.035em] md:text-h1">
              As ferramentas que uso em cada atendimento.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
              São {CONTAGEM_FERRAMENTAS} programas usados nos atendimentos da {BRAND.name} — todos
              gratuitos e baixados sempre do site oficial de cada um, nunca de um instalador de
              terceiro.
            </p>
          </Reveal>
        </div>
      </section>

      <FerramentasExplorer categorias={CATEGORIAS} ferramentas={FERRAMENTAS} />

      <Section tone="raised">
        <Reveal className="flex flex-col items-start gap-4">
          <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2">
            Nenhuma dessas ferramentas otimiza o PC sozinha — elas mostram o problema. Ler o
            número certo e decidir o que mudar continua sendo trabalho humano.
          </p>
          <Button href="/planos" variant="quiet" icon="arrow">
            Ver os planos completos
          </Button>
        </Reveal>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </>
  );
}
