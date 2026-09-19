"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Cpu, ExternalLink, Gauge, Settings, Stethoscope, Wrench, type LucideIcon } from "lucide-react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import type { CategoriaFerramenta, Ferramenta } from "@/lib/ferramentas";

const CATEGORY_ICON: Record<CategoriaFerramenta, LucideIcon> = {
  Diagnóstico: Stethoscope,
  Medição: Gauge,
  Sistema: Settings,
  Manutenção: Wrench,
  Hardware: Cpu,
};

function matches(f: Ferramenta, needle: string) {
  if (!needle) return true;
  return (
    f.nome.toLowerCase().includes(needle) ||
    f.paraQueServe.toLowerCase().includes(needle) ||
    f.comoUsar.toLowerCase().includes(needle) ||
    f.cuidado.toLowerCase().includes(needle)
  );
}

/* -------------------------------------------------- CARD DE FERRAMENTA
   Ícone escolhido pela categoria, nunca o logo da ferramenta — assim o
   card não depende de marca de terceiro. Os dois <details> usam a
   mesma técnica de ::details-content do FAQHome (classes .tool-detail
   em globals.css). */
function ToolCard({ f }: { f: Ferramenta }) {
  const CategoryIcon = CATEGORY_ICON[f.categoria];

  return (
    <article className="card card-hover flex flex-col gap-4 p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-accent">
          <CategoryIcon size={20} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h3 className="text-[1.0625rem] font-semibold leading-snug text-ink">{f.nome}</h3>
      </div>

      <p className="text-[0.9375rem] font-medium leading-relaxed text-ink">{f.paraQueServe}</p>

      <details className="tool-detail border-t border-line-soft pt-3">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[0.8125rem] font-medium text-ink-2 marker:content-none [&::-webkit-details-marker]:hidden">
          Como usar
          <Icon name="chevronDown" size={14} className="tool-detail-icon shrink-0 text-ink-3" />
        </summary>
        <div className="tool-detail-body">
          <p className="pt-2 text-[0.875rem] leading-relaxed text-ink-2">{f.comoUsar}</p>
        </div>
      </details>

      {/* Borda lateral no tom de acento, não vermelho — o site é técnico,
          não um alerta de segurança. */}
      <details className="tool-detail border-t border-line-soft pt-3">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[0.8125rem] font-medium text-ink-2 marker:content-none [&::-webkit-details-marker]:hidden">
          Cuidado
          <Icon name="chevronDown" size={14} className="tool-detail-icon shrink-0 text-ink-3" />
        </summary>
        <div className="tool-detail-body">
          <p className="border-l-2 border-accent/40 py-0.5 pl-3 text-[0.875rem] leading-relaxed text-ink-2">
            {f.cuidado}
          </p>
        </div>
      </details>

      <div className="mt-6 flex flex-col gap-1.5 border-t border-line-soft pt-4">
        <a
          href={f.siteOficial}
          target="_blank"
          rel="noopener noreferrer"
          className="glass inline-flex h-10 items-center justify-center gap-2 rounded-lg border-line/70 px-4 text-sm font-medium text-ink transition-all duration-150 hover:border-accent/50 hover:bg-accent/[0.08] hover:text-accent"
        >
          Site oficial
          <ExternalLink size={15} strokeWidth={1.5} aria-hidden="true" />
        </a>
        <span className="text-center font-mono text-[0.6875rem] text-ink-3">{f.dominio}</span>
      </div>
    </article>
  );
}

/* -------------------------------------------------- EXPLORADOR */
export function FerramentasExplorer({
  categorias, ferramentas,
}: { categorias: CategoriaFerramenta[]; ferramentas: Ferramenta[] }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoriaFerramenta>(categorias[0]);
  const sectionRefs = useRef<Partial<Record<CategoriaFerramenta, HTMLElement | null>>>({});

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 150);
    return () => window.clearTimeout(t);
  }, [query]);

  const grouped = useMemo(
    () =>
      categorias
        .map((categoria) => ({
          categoria,
          itens: ferramentas.filter((f) => f.categoria === categoria && matches(f, debouncedQuery)),
        }))
        .filter((g) => g.itens.length > 0),
    [categorias, ferramentas, debouncedQuery]
  );

  const visibleKey = grouped.map((g) => g.categoria).join("|");

  useEffect(() => {
    const cats = grouped.map((g) => g.categoria);
    if (cats.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const cat = entry.target.getAttribute("data-categoria") as CategoriaFerramenta | null;
          if (cat) setActiveCategory(cat);
        }
      },
      { rootMargin: "-150px 0px -70% 0px", threshold: 0 }
    );

    for (const cat of cats) {
      const el = sectionRefs.current[cat];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleKey]);

  function scrollToCategory(cat: CategoriaFerramenta) {
    sectionRefs.current[cat]?.scrollIntoView({ block: "start" });
  }

  const showEmptyState = debouncedQuery !== "" && grouped.length === 0;

  return (
    <>
      <div className="container-fl pb-10 md:pb-12">
        <Reveal className="mx-auto max-w-xl">
          <label htmlFor="busca-ferramentas" className="sr-only">
            Buscar ferramenta
          </label>
          <div className="relative">
            <Icon
              name="search"
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3"
            />
            <input
              id="busca-ferramentas"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome ou pelo que resolve…"
              className="w-full rounded-md border border-line bg-surface py-3 pl-11 pr-4 text-[0.9375rem] text-ink placeholder:text-ink-3/70 transition-colors duration-150 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40"
            />
          </div>
        </Reveal>
      </div>

      <div className="sticky top-16 z-30 border-y border-line-soft bg-base/90 backdrop-blur-xl md:top-[72px]">
        <div className="container-fl flex flex-wrap gap-2 py-4" role="group" aria-label="Ir para categoria">
          {categorias.map((c) => {
            const disabled = !grouped.some((g) => g.categoria === c);
            const active = !disabled && activeCategory === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => scrollToCategory(c)}
                disabled={disabled}
                aria-current={active ? "true" : undefined}
                className={`rounded-full border px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-35 ${
                  active
                    ? "border-accent/50 bg-accent/[0.1] text-accent"
                    : "border-line bg-surface-2 text-ink-2 hover:border-accent/40 hover:text-accent"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div className="container-fl py-14 md:py-20">
        {showEmptyState ? (
          <Reveal className="flex flex-col items-center gap-2 py-16 text-center">
            <p className="text-lg font-medium text-ink">Nenhuma ferramenta encontrada</p>
            <p className="text-[0.9375rem] text-ink-3">
              Tente outro termo — o nome ou o que a ferramenta resolve.
            </p>
          </Reveal>
        ) : (
          grouped.map((g, gi) => (
            <section
              key={g.categoria}
              ref={(el) => {
                sectionRefs.current[g.categoria] = el;
              }}
              data-categoria={g.categoria}
              className={`scroll-mt-[140px] pt-14 first:pt-0 md:pt-20 ${gi > 0 ? "border-t border-line-soft" : ""}`}
            >
              <Reveal className="mb-8 flex items-baseline justify-between gap-4">
                <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
                  {g.categoria}
                </h2>
                <span className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-3">
                  {g.itens.length} {g.itens.length === 1 ? "ferramenta" : "ferramentas"}
                </span>
              </Reveal>

              <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
                {g.itens.map((f, i) => (
                  <Reveal key={f.id} delay={Math.min(i, 6) * 50} dir={i % 2 === 0 ? "left" : "right"}>
                    <ToolCard f={f} />
                  </Reveal>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </>
  );
}
