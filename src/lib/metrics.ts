export type Metric = {
  label: string;
  before: number;
  after: number;
  unit: string;
  better: "up" | "down";
};

export function fmtNum(n: number) {
  return Number.isInteger(n) ? n.toLocaleString("pt-BR") : n.toFixed(1).replace(".", ",");
}

/* Ganho percentual sempre lido como "melhora", independente da direção. */
export function delta(m: Metric) {
  const raw = ((m.after - m.before) / m.before) * 100;
  const improved = m.better === "up" ? raw > 0 : raw < 0;
  return { pct: Math.abs(Math.round(raw)), improved };
}
