/* ============================================================
   Matriz de comparação de planos (usada na home e em /planos).
   Deriva de PLANOS (src/lib/planos.ts) em vez de redigitar nome,
   preço ou item aqui — é exatamente essa duplicação que deixou a
   estrutura antiga (Essencial/Competitivo/Elite) dessincronizada
   entre a home, /planos e este arquivo. Cada linha é montada a
   partir dos itens reais de cada plano: um plano "inclui" uma
   linha quando o texto do item bate exatamente com o de outro
   plano — não há inclusão implícita entre planos que não
   compartilham o mesmo texto de item.
   ============================================================ */
import { PLANOS, type Plano } from "./planos";

export type PlanId = Plano["id"];

export type ComparisonCell = boolean;

export type ComparisonPlanColumn = {
  id: PlanId;
  name: string;
  price: string;
  featured?: boolean;
};

export type ComparisonRow = {
  label: string;
  cells: Record<PlanId, ComparisonCell>;
};

function formatBRL(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export const COMPARISON_PLANS: ComparisonPlanColumn[] = PLANOS.map((p) => ({
  id: p.id,
  name: p.nome,
  price: formatBRL(p.preco),
  featured: !!p.destaque,
}));

const FEATURE_ORDER: string[] = [];
for (const p of PLANOS) {
  for (const item of p.itens) {
    if (!FEATURE_ORDER.includes(item)) FEATURE_ORDER.push(item);
  }
}

export const COMPARISON_ROWS: ComparisonRow[] = FEATURE_ORDER.map((label) => ({
  label,
  cells: Object.fromEntries(
    PLANOS.map((p) => [p.id, p.itens.includes(label)]),
  ) as Record<PlanId, ComparisonCell>,
}));
