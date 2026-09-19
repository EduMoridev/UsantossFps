import type { CSSProperties } from "react";
import { COMPARISON_PLANS, COMPARISON_ROWS, type ComparisonCell } from "@/lib/plans";
import { Icon } from "./Icon";

/* Mesma célula (ícone + texto sr-only, ou texto puro) é usada na
   tabela de desktop e nos blocos empilhados do mobile — uma fonte
   só pra "incluso"/"não incluso" não divergir entre os dois. */
function CellValue({ value }: { value: ComparisonCell }) {
  if (typeof value === "string") return <>{value}</>;
  return value ? (
    <>
      <Icon name="check" size={16} className="text-accent" aria-hidden="true" />
      <span className="sr-only">Incluso</span>
    </>
  ) : (
    <>
      <Icon name="minus" size={16} className="text-line" aria-hidden="true" />
      <span className="sr-only">Não incluso</span>
    </>
  );
}

/* Tabela + blocos mobile puros, sem o <details> — reaproveitado tanto
   pela versão colapsada da home (PlanComparison, abaixo) quanto pela
   versão sempre aberta de /planos, para as duas nunca divergirem entre
   si nem da estrutura real de PLANOS. */
export function ComparisonTable() {
  return (
    <>
      {/* Desktop / tablet: tabela. Abaixo de 768px vira blocos — nunca rolagem horizontal. */}
      <div className="hidden overflow-hidden rounded-lg border border-line md:block">
        <table className="plan-compare-table w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Comparação detalhada entre os planos {COMPARISON_PLANS.map((p) => p.name).join(", ")}
          </caption>
          <thead>
            <tr className="border-b border-line bg-surface-2">
              <th
                scope="col"
                className="px-5 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-3"
              >
                Recurso
              </th>
              {COMPARISON_PLANS.map((p) => (
                <th
                  key={p.id}
                  scope="col"
                  className={`px-5 py-4 text-center ${p.featured ? "plan-compare-featured" : ""}`}
                >
                  <div className={`font-display text-base ${p.featured ? "font-semibold text-ink" : "font-medium text-ink-2"}`}>
                    {p.name}
                  </div>
                  <div className="mt-0.5 font-mono text-xs tabular-nums text-ink-3">{p.price}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row, i) => (
              <tr key={row.label} style={{ "--i": i } as CSSProperties}>
                <th scope="row" className="border-b border-line-soft px-5 py-3.5 text-left text-[0.9375rem] font-normal text-ink-2">
                  {row.label}
                </th>
                {COMPARISON_PLANS.map((p) => (
                  <td
                    key={p.id}
                    className={`border-b border-line-soft px-5 py-3.5 text-center text-[0.9375rem] tabular-nums ${
                      p.featured ? "plan-compare-featured font-semibold text-ink" : "text-ink-2"
                    }`}
                  >
                    <CellValue value={row.cells[p.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: um bloco por plano, empilhados */}
      <div className="grid gap-5 md:hidden">
        {COMPARISON_PLANS.map((p) => (
          <div
            key={p.id}
            className={`rounded-lg border p-5 ${p.featured ? "border-accent/45" : "border-line"}`}
          >
            <div className="flex items-baseline justify-between border-b border-line-soft pb-3">
              <h3 className={`font-display ${p.featured ? "font-semibold text-ink" : "font-medium text-ink-2"}`}>
                {p.name}
              </h3>
              <span className="font-display text-lg tabular-nums text-ink">{p.price}</span>
            </div>
            <dl className="mt-4 grid gap-3">
              {COMPARISON_ROWS.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 text-sm">
                  <dt className="text-ink-2">{row.label}</dt>
                  <dd className="flex shrink-0 items-center gap-1.5 font-medium tabular-nums text-ink">
                    <CellValue value={row.cells[p.id]} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}

/* Substitui o antigo link "Comparar em detalhe" (que levava pra
   /planos e não mostrava nada aqui). <details>/<summary> nativo:
   abre, fecha e anima só com CSS (classes .plan-compare* em
   globals.css) — zero JS, mesma técnica do FAQHome. */
export function PlanComparison() {
  return (
    <details className="plan-compare mx-auto mt-8 max-w-3xl md:max-w-none">
      <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink-2 marker:content-none transition-colors duration-150 hover:border-accent/45 hover:text-accent [&::-webkit-details-marker]:hidden">
        <span className="plan-compare-label-closed">Comparar em detalhe</span>
        <span className="plan-compare-label-open">Ocultar comparação</span>
        <Icon name="chevronDown" size={16} className="plan-compare-icon" />
      </summary>

      <div className="plan-compare-body">
        <ComparisonTable />
      </div>
    </details>
  );
}
