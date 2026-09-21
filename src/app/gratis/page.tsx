import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/UI";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { SCRIPTS_MANIFEST } from "@/lib/scripts";
import { CONTAGEM_FERRAMENTAS } from "@/lib/ferramentas";
import { CONTAGEM_CONFIGS } from "@/lib/pcs";

export const metadata: Metadata = {
  title: "Grátis",
  description:
    "Scripts e ferramentas gratuitos usados nos atendimentos — código aberto para conferir, sempre baixados do site oficial.",
};

const scriptsCount = SCRIPTS_MANIFEST.length;

const HUB_ITEMS = [
  {
    href: "/gratis/scripts",
    icon: "disk",
    nome: "Scripts",
    descricao:
      "Scripts .bat prontos para manutenção do Windows — código aberto para conferir antes de baixar.",
    contagem: `${scriptsCount} ${scriptsCount === 1 ? "script" : "scripts"}`,
  },
  {
    href: "/gratis/ferramentas",
    icon: "wrench",
    nome: "Ferramentas",
    descricao:
      "As ferramentas usadas nos atendimentos para diagnosticar, medir e manter o PC — todas gratuitas.",
    contagem: `${CONTAGEM_FERRAMENTAS} ferramentas`,
  },
  {
    href: "/gratis/pcs",
    icon: "cpu",
    nome: "Montagens",
    descricao:
      "Configurações de PC gamer por faixa de uso e orçamento, com peças, faixa de preço e links de busca nas lojas.",
    contagem: `${CONTAGEM_CONFIGS} configurações`,
  },
] as const;

export default function GratisPage() {
  return (
    <section className="relative overflow-hidden pb-16 pt-12 md:pb-20 md:pt-16">
      <div className="grid-tech pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000,transparent)]" />
      <div className="container-fl relative">
        <Reveal className="mb-12 flex max-w-3xl flex-col gap-6 md:mb-16">
          <Eyebrow>grátis</Eyebrow>
          <h1 className="text-[2.5rem] leading-[1.05] tracking-[-0.035em] md:text-h1">
            Tudo que uso nos atendimentos, sem custo.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
            Scripts prontos e as ferramentas de diagnóstico que aparecem em quase todo
            atendimento — código aberto para conferir, sempre baixado do site oficial de
            cada uma.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {HUB_ITEMS.map((item, i) => (
            <Reveal key={item.href} delay={i * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <Link
                href={item.href}
                className="card card-hover group flex h-full flex-col gap-4 p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-md border border-line bg-surface-2 text-accent transition-colors duration-150 group-hover:border-accent/40">
                    <Icon name={item.icon} size={22} />
                  </span>
                  <Icon
                    name="arrow"
                    size={19}
                    className="mt-3 text-ink-3 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.nome}</h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                    {item.descricao}
                  </p>
                </div>
                <div className="border-t border-line-soft pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-accent">
                  {item.contagem}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
