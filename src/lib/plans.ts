/* ============================================================
   RASCUNHO — matriz de comparação de planos (usada na home).
   Inclusões, prazos de suporte e duração ainda precisam ser
   CONFIRMADOS COM O CLIENTE antes de publicar. Não tratar como
   fonte definitiva sem revisão.
   ============================================================ */

export type PlanId = "essencial" | "competitivo" | "elite";

/* string = valor exibido como texto (ex: "30 dias", "2 a 3 h");
   boolean = célula de inclusão, renderizada como ícone. */
export type ComparisonCell = boolean | string;

export type ComparisonPlanColumn = {
  id: PlanId;
  name: string;
  price: string;
  featured?: boolean;
};

export type ComparisonRow = {
  label: string;
} & Record<PlanId, ComparisonCell>;

export const COMPARISON_PLANS: ComparisonPlanColumn[] = [
  { id: "essencial", name: "Essencial", price: "R$ 89" },
  { id: "competitivo", name: "Competitivo", price: "R$ 169", featured: true },
  { id: "elite", name: "Elite", price: "R$ 289" },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  { label: "Limpeza e otimização do Windows", essencial: true, competitivo: true, elite: true },
  { label: "Serviços em segundo plano", essencial: true, competitivo: true, elite: true },
  { label: "Plano de energia", essencial: true, competitivo: true, elite: true },
  { label: "Atualização limpa de drivers", essencial: false, competitivo: true, elite: true },
  { label: "Ajustes de BIOS e XMP/EXPO", essencial: false, competitivo: true, elite: true },
  { label: "Otimização de rede e latência", essencial: false, competitivo: true, elite: true },
  { label: "Tuning do jogo principal", essencial: false, competitivo: true, elite: true },
  { label: "Cadeia de input lag e periféricos", essencial: false, competitivo: false, elite: true },
  { label: "Undervolt e curva térmica", essencial: false, competitivo: false, elite: true },
  { label: "Ajuste para transmissão", essencial: false, competitivo: false, elite: true },
  { label: "Medição antes e depois", essencial: true, competitivo: true, elite: true },
  { label: "Relatório de sessão", essencial: false, competitivo: true, elite: true },
  { label: "Suporte pós-atendimento", essencial: "7 dias", competitivo: "30 dias", elite: "60 dias" },
  { label: "Duração", essencial: "60 a 90 min", competitivo: "2 a 3 h", elite: "4 a 6 h" },
];
