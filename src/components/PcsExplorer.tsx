"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { Badge, CheckList } from "./UI";
import { linksDaPeca } from "@/lib/lojas";
import type { CategoriaPeca, Config, Peca } from "@/lib/pcs";

/* `semFaixa`/`desatualizado`/`investimentoOmitido` são calculados uma
   vez no servidor (src/app/gratis/pcs/page.tsx) — o card aqui só lê
   esses booleanos prontos, nunca compara faixaMin/faixaMax a 0 de
   novo no cliente. */
type PecaComMeta = Peca & { semFaixa: boolean };
type ConfigComMeta = Omit<Config, "pecas"> & {
  pecas: PecaComMeta[];
  desatualizado: boolean;
  investimentoOmitido: boolean;
};

const CATEGORIA_LABEL: Record<CategoriaPeca, string> = {
  processador: "Processador",
  "placa-mae": "Placa-mãe",
  memoria: "Memória",
  armazenamento: "Armazenamento",
  fonte: "Fonte",
  gabinete: "Gabinete",
  "placa-video": "Placa de vídeo",
};

function formatBRL(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

function formatFaixa(min: number, max: number) {
  return `${formatBRL(min)} – ${formatBRL(max)}`;
}

/* Parse manual em vez de toLocaleDateString: evita depender do fuso do
   navegador/servidor para uma data que já vem no formato ISO simples
   (YYYY-MM-DD) em src/lib/pcs.ts. */
function formatDataBR(iso: string) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function totalInvestimento(pecas: PecaComMeta[]) {
  return pecas.reduce(
    (acc, p) => ({ min: acc.min + p.faixaMin, max: acc.max + p.faixaMax }),
    { min: 0, max: 0 },
  );
}

/* Links de loja: botões discretos lado a lado no desktop; no mobile
   colapsam num único "Onde comprar" com a mesma técnica de
   ::details-content do FAQHome (classes .pc-links* em globals.css). */
function LinksLoja({ termo }: { termo: string }) {
  const links = linksDaPeca(termo);

  const botoes = (
    <>
      {links.map((l) => (
        <a
          key={l.id}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-md border border-line bg-surface-2 px-2.5 py-1.5 text-[0.75rem] text-ink-2 transition-colors duration-150 hover:border-accent/50 hover:text-accent"
        >
          {l.nome}
          <ExternalLink size={12} strokeWidth={1.5} aria-hidden="true" />
        </a>
      ))}
    </>
  );

  return (
    <>
      <div className="hidden flex-wrap gap-1.5 md:flex">{botoes}</div>

      <details className="pc-links md:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-md border border-line bg-surface-2 px-3 py-2 text-[0.8125rem] font-medium text-ink-2 marker:content-none [&::-webkit-details-marker]:hidden">
          Onde comprar
          <Icon name="chevronDown" size={14} className="pc-links-icon shrink-0 text-ink-3" />
        </summary>
        <div className="pc-links-body">
          <div className="flex flex-wrap gap-1.5 pt-2">{botoes}</div>
        </div>
      </details>
    </>
  );
}

function PecaRow({ peca }: { peca: PecaComMeta }) {
  return (
    <li className="flex flex-col gap-2 border-t border-line-soft py-4 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-3">
            {CATEGORIA_LABEL[peca.categoria]}
          </span>
          <span className="text-[0.9375rem] font-medium text-ink">{peca.nome}</span>
        </div>
        <span
          className={`whitespace-nowrap text-[0.8125rem] font-medium ${
            peca.semFaixa ? "italic text-ink-3" : "text-accent"
          }`}
        >
          {peca.semFaixa ? "faixa não pesquisada" : formatFaixa(peca.faixaMin, peca.faixaMax)}
        </span>
      </div>

      {peca.observacao && (
        <p className="border-l-2 border-accent/40 pl-3 text-[0.8125rem] leading-relaxed text-ink-2">
          {peca.observacao}
        </p>
      )}

      <LinksLoja termo={peca.busca} />
    </li>
  );
}

function ConfigCard({ config }: { config: ConfigComMeta }) {
  const total = totalInvestimento(config.pecas);

  return (
    <article className="card card-hover flex flex-col gap-6 p-6 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold leading-snug text-ink">{config.nome}</h3>
          <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-2">{config.publico}</p>
        </div>
        <Badge tone="line">{config.plataforma}</Badge>
      </div>

      <div className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-3">
        <Icon name="target" size={13} />
        {config.resolucaoAlvo}
      </div>

      {config.desatualizado && (
        <div className="flex items-start gap-2 rounded-md border border-line bg-surface-2 px-3 py-2.5 text-[0.8125rem] leading-relaxed text-ink-2">
          <Icon name="clock" size={15} className="mt-0.5 shrink-0 text-accent" />
          <span>Faixas possivelmente desatualizadas — confira nas lojas.</span>
        </div>
      )}

      <ul className="flex flex-col">
        {config.pecas.map((p) => (
          <PecaRow key={p.busca} peca={p} />
        ))}
      </ul>

      <div className="grid gap-6 border-t border-line-soft pt-5 sm:grid-cols-2">
        <div>
          <h4 className="mb-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-accent">
            O que esperar
          </h4>
          <CheckList items={config.esperar} dense />
        </div>
        <div>
          <h4 className="mb-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-3">
            O que não esperar
          </h4>
          <ul className="grid gap-2.5">
            {config.naoEsperar.map((it) => (
              <li key={it} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
                <Icon name="x" size={15} className="mt-1 shrink-0 text-ink-3" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line-soft pt-5">
        {!config.investimentoOmitido && (
          <div className="text-[0.9375rem] font-semibold text-ink">
            Investimento aproximado: {formatFaixa(total.min, total.max)}
          </div>
        )}
        <div className={`text-[0.75rem] text-ink-3 ${config.investimentoOmitido ? "" : "mt-1"}`}>
          Verificado em {formatDataBR(config.verificadoEm)}
        </div>
      </div>
    </article>
  );
}

/* Agrupa configs pelo nome: as duas versões AMD/Intel de uma mesma
   faixa compartilham nome, então caem no mesmo grupo e o alternador
   escolhe qual mostrar. Faixas sem versão nas duas plataformas ficam
   em grupo de 1 e aparecem sempre, ignorando o alternador. */
function agruparPorNome(configs: ConfigComMeta[]) {
  const ordem: string[] = [];
  const porNome = new Map<string, ConfigComMeta[]>();
  for (const c of configs) {
    if (!porNome.has(c.nome)) {
      porNome.set(c.nome, []);
      ordem.push(c.nome);
    }
    porNome.get(c.nome)!.push(c);
  }
  return ordem.map((nome) => porNome.get(nome)!);
}

export function PcsExplorer({ configs }: { configs: ConfigComMeta[] }) {
  const [plataforma, setPlataforma] = useState<"AMD" | "Intel">("AMD");

  const grupos = useMemo(() => agruparPorNome(configs), [configs]);
  const temAlternativa = grupos.some((g) => g.length > 1);

  return (
    <>
      {temAlternativa && (
        <Reveal className="mb-8 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-3">
            Plataforma
          </span>
          <div className="inline-flex rounded-full border border-line bg-surface-2 p-1" role="group" aria-label="Escolher plataforma">
            {(["AMD", "Intel"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlataforma(p)}
                aria-pressed={plataforma === p}
                className={`rounded-full px-4 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-colors duration-150 ${
                  plataforma === p
                    ? "bg-accent text-[#052e16]"
                    : "text-ink-2 hover:text-ink"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <span className="text-[0.8125rem] text-ink-3">
            Só afeta as faixas que existem nas duas plataformas.
          </span>
        </Reveal>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {grupos.map((grupo, i) => {
          const config =
            grupo.length > 1
              ? grupo.find((c) => c.plataforma === plataforma) ?? grupo[0]
              : grupo[0];
          return (
            <Reveal key={grupo[0].nome} delay={Math.min(i, 4) * 60} dir={i % 2 === 0 ? "left" : "right"}>
              {/* key no id força remontar ao trocar de plataforma — é o
                  que dispara a animação .pc-card-switch (globals.css),
                  fazendo o crossfade entre AMD e Intel. */}
              <div key={config.id} className="pc-card-switch">
                <ConfigCard config={config} />
              </div>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
