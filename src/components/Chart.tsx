"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { delta, fmtNum as fmt, type Metric } from "@/lib/metrics";

export type { Metric };

/* -------------------------------------------------- BARRA ANTES/DEPOIS
   Duas barras, uma cor neutra (antes) e o acento (depois).
   Sem eixo, sem grade: o número está escrito ao lado. */
export function DeltaBars({ metrics, compact = false }: { metrics: Metric[]; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setOn(true), io.disconnect()),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`grid ${compact ? "gap-5" : "gap-7"}`}>
      {metrics.map((m) => {
        const max = Math.max(m.before, m.after) * 1.08;
        const d = delta(m);
        return (
          <div key={m.label} className="grid gap-2.5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium text-ink">{m.label}</span>
              <span
                className={`inline-flex items-center gap-1 font-mono text-xs ${
                  d.improved ? "text-accent" : "text-ink-3"
                }`}
              >
                <Icon name={m.better === "up" ? "arrowUp" : "arrowDown"} size={12} />
                {d.pct}%
              </span>
            </div>

            {(["before", "after"] as const).map((k) => {
              const v = m[k];
              const isAfter = k === "after";
              return (
                <div key={k} className="flex items-center gap-3">
                  <span className="w-11 shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-3">
                    {isAfter ? "depois" : "antes"}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className={`h-full origin-left rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isAfter ? "bg-accent" : "bg-[#52525b]"
                      }`}
                      data-w={`${((v / max) * 100).toFixed(1)}%`}
                      style={{
                        width: on ? `${(v / max) * 100}%` : "0%",
                        transitionDelay: isAfter ? "160ms" : "0ms",
                      }}
                    />
                  </div>
                  <span
                    className={`w-[4.5rem] shrink-0 text-right font-mono text-xs tabular-nums ${
                      isAfter ? "text-accent" : "text-ink-3"
                    }`}
                  >
                    {fmt(v)} {m.unit}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------- FRAMETIME (linha)
   Ilustra estabilidade: linha irregular (antes) x linha plana (depois). */
export function FrametimeChart() {
  const before = [8, 22, 9, 34, 11, 7, 41, 10, 26, 8, 38, 12, 9, 30, 8, 19, 44, 9, 12, 28, 8, 35, 10, 16];
  const after = [7, 8, 7, 9, 7, 8, 7, 8, 9, 7, 8, 7, 8, 7, 9, 8, 7, 8, 7, 8, 9, 7, 8, 7];
  const W = 720, H = 180, max = 48;
  const path = (arr: number[]) =>
    arr
      .map((v, i) => `${i === 0 ? "M" : "L"}${(i / (arr.length - 1)) * W},${H - (v / max) * H}`)
      .join(" ");

  return (
    <div className="card p-5 md:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">Frametime durante 24 s de partida</h3>
          <p className="text-sm text-ink-3">Quanto mais plana a linha, menos travada você sente.</p>
        </div>
        <div className="flex gap-4 font-mono text-[0.625rem] uppercase tracking-[0.1em]">
          <span className="flex items-center gap-1.5 text-ink-3">
            <span className="h-0.5 w-4 bg-[#52525b]" /> antes
          </span>
          <span className="flex items-center gap-1.5 text-accent">
            <span className="h-0.5 w-4 bg-accent" /> depois
          </span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img"
           aria-label="Gráfico de frametime: linha irregular antes, linha plana depois">
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#27272a" strokeWidth="1" />
        ))}
        <path d={path(before)} fill="none" stroke="#52525b" strokeWidth="2" strokeLinejoin="round" />
        <path d={path(after)} fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------- DONUT DE AGREGADO */
export function GainRing({ value, label }: { value: number; label: string }) {
  const r = 42, c = 2 * Math.PI * r;
  const pct = Math.min(value, 100) / 100;
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 100 100" className="h-[76px] w-[76px] shrink-0 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#44403c" strokeWidth="6" />
        <circle
          cx="50" cy="50" r={r} fill="none" stroke="#22c55e" strokeWidth="6"
          strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`}
        />
      </svg>
      <div>
        <div className="font-display text-2xl leading-none tracking-tight text-accent">+{value}%</div>
        <div className="mt-1 text-sm text-ink-2">{label}</div>
      </div>
    </div>
  );
}
