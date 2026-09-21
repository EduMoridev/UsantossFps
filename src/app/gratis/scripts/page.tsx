import type { Metadata } from "next";
import { Eyebrow, Section, SectionHead, Button } from "@/components/UI";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { ScriptsGrid } from "@/components/ScriptsGrid";
import { SCRIPTS_MANIFEST } from "@/lib/scripts";
import { GITHUB_SCRIPTS_ISSUES, GITHUB_SCRIPTS_REPO } from "@/lib/config";

export const metadata: Metadata = {
  title: "Scripts grátis",
  description:
    "Scripts .bat gratuitos de manutenção do Windows, com código aberto para conferir antes de baixar.",
};

const NAO_FAZEM = [
  "Não medem FPS nem 1% low",
  "Não ajustam BIOS, XMP/EXPO ou Resizable BAR",
  "Não tocam em driver de GPU ou chipset",
  "Não fazem undervolt ou overclock",
];

export default function GratisScriptsPage() {
  return (
    <>
      {/* ---------------- Hero: a trilha do layout já limpou o header,
          aqui é só o conteúdo, sem repetir o pt-32 do PageHero padrão */}
      <section className="relative overflow-hidden pb-14 pt-12 md:pb-16 md:pt-16">
        <div className="grid-tech pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000,transparent)]" />
        <div className="container-fl relative">
          <Reveal className="flex max-w-3xl flex-col gap-6">
            <Eyebrow>scripts gratuitos</Eyebrow>
            <h1 className="text-[2.5rem] leading-[1.1] tracking-tight md:text-h1">
              Scripts prontos para o seu PC.
              <br />
              <span className="text-accent">Sem custo, sem letra miúda.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
              São scripts .bat simples de manutenção do Windows — sem custo, código
              aberto para conferir linha por linha antes de baixar. A maioria pede
              para rodar como administrador porque mexe em configuração do sistema:
              crie um ponto de restauração antes (tem um script pronto pra isso na
              lista) e leia o código de cada um antes de executar.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <Reveal className="mb-10 flex items-start gap-3 rounded-md border border-line bg-surface-2/60 p-5">
          <Icon name="shieldAlert" size={18} className="mt-0.5 shrink-0 text-ink-3" />
          <div className="flex flex-col gap-1.5 text-[0.8125rem] leading-relaxed text-ink-2">
            <p>
              O Windows costuma mostrar um aviso do SmartScreen ao baixar um arquivo
              .bat de fora da loja — isso é esperado para qualquer script batch, não é
              um alerta específico sobre este arquivo.
            </p>
            <p>
              Antes de rodar, você pode abrir o .bat num editor de texto (Bloco de
              Notas) e ler exatamente o que ele faz — o código também aparece dentro
              de cada card abaixo, sem precisar baixar nada.
            </p>
            <p>
              Depois de baixar, compare o hash SHA-256 mostrado no card com o do
              arquivo salvo para ter certeza de que nada foi alterado no caminho.
            </p>
          </div>
        </Reveal>

        <ScriptsGrid scripts={SCRIPTS_MANIFEST} />

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[0.8125rem] text-ink-3">
          <span>
            Todos os scripts são públicos e auditáveis no{" "}
            <a
              href={GITHUB_SCRIPTS_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-2 underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              GitHub
            </a>
            .
          </span>
          <span className="hidden sm:inline">·</span>
          <span>
            Encontrou um problema?{" "}
            <a
              href={GITHUB_SCRIPTS_ISSUES}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-2 underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Abra uma issue
            </a>
            .
          </span>
        </Reveal>
      </Section>

      <Section tone="raised">
        <SectionHead eyebrow="limites" title="O que esses scripts não fazem" />
        <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NAO_FAZEM.map((t) => (
            <div key={t} className="flex items-start gap-3 rounded-md border border-line bg-surface p-4">
              <Icon name="x" size={16} className="mt-0.5 shrink-0 text-ink-3" />
              <span className="text-[0.9375rem] leading-relaxed text-ink-2">{t}</span>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-8 flex flex-col gap-2">
          <p className="text-[0.9375rem] text-ink-2">
            Isso é trabalho de diagnóstico medido, feito ao vivo com você acompanhando.
          </p>
          <Button href="/planos" variant="quiet" icon="arrow">
            Ver os planos completos
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
