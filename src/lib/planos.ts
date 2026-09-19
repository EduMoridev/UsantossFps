// src/lib/planos.ts
//
// Estrutura de planos de otimização de PC. Substitui os antigos Essencial
// (R$ 89) / Competitivo (R$ 169) / Elite (R$ 289), que viviam como PLANS em
// src/lib/site.ts. Migrado para arquivo próprio seguindo o mesmo padrão de
// src/lib/pcs.ts e src/lib/servicos.ts: dados de produto ficam fora da fonte
// única de conteúdo institucional.
//
// src/lib/plans.ts (matriz de comparação, usada na home e em /planos) deriva
// os itens de cada plano diretamente de PLANOS abaixo — não duplique nome,
// preço ou item em outro lugar, ou os dois voltam a divergir como aconteceu
// com a estrutura antiga.
export interface Plano {
  id: string;
  nome: string;
  /** Preço atual, em reais (ex.: 49.9 = R$ 49,90). */
  preco: number;
  /**
   * Preço "de", exibido riscado ao lado do preço atual. OPCIONAL: só
   * preencha se esse valor já foi cobrado de fato antes. Simular um "de/por"
   * sobre um preço que nunca foi praticado é publicidade enganosa (Código
   * de Defesa do Consumidor, art. 37, §1º) — nunca invente esse número.
   */
  precoAnterior?: number;
  /** Texto curto que eleva o card visualmente (ex.: "mais vendido"). Só um plano deveria usar isso por vez. */
  destaque?: string;
  /** Texto curto de um selo simples, sem elevar o card (ex.: "novo"). */
  badge?: string;
  itens: string[];
  /** Diferencial extra, exibido em destaque abaixo dos itens (ex.: atendimento por call). */
  notaEspecial?: string;
}

/** Todos os planos são pagamento único — nenhum é assinatura recorrente. */
export const PERIODO_PAGAMENTO = "pagamento único";

export const FORMAS_PAGAMENTO = ["Pix", "Cartão de crédito"];

export const PLANOS: Plano[] = [
  {
    id: "start-fps",
    nome: "Start FPS",
    preco: 49.9,
    precoAnterior: 79.0,
    itens: [
      "Otimização remota",
      "Aumento de desempenho",
      "Redução do input lag",
      "Limpeza extrema",
      "Versões exclusivas de drivers",
      "Guia de otimização para o dia a dia",
    ],
  },
  {
    id: "not-extreme",
    nome: "Not Extreme",
    preco: 89.9,
    itens: [
      "Otimização remota",
      "Performance extra em notebook",
      "Limpeza extrema",
      "Redução de gargalos",
      "Estabilização de FPS",
      "Redução do input lag",
      "Gerenciamento térmico e energético",
      "Configurações específicas para Windows 10 e 11",
      "Melhor configuração de mouse e teclado",
    ],
  },
  {
    id: "advanced-fps",
    nome: "Advanced FPS",
    preco: 99.9,
    precoAnterior: 120.0,
    destaque: "mais vendido",
    itens: [
      "Otimização remota",
      "Configuração de monitor",
      "BIOS configurada",
      "Tempo de resposta",
      "Teclado responsivo",
      "Suporte a melhora de mira",
      "Aumento de FPS em jogos competitivos e offline",
      "Otimização em nível pro player",
      "Redução extrema do input lag",
      "Redução de microtravamentos",
    ],
  },
  {
    id: "pro-experience",
    nome: "Pro Experience",
    preco: 179.9,
    badge: "novo",
    itens: [
      "Otimização remota",
      "Formatação Windows 10 e 11",
      "Mentoria de upgrades do PC",
      "Pasta de otimização preventiva",
      "Sensibilidades e resoluções",
      "Overclock de processador",
      "Controle de ventilação",
      "Overclock de placa de vídeo",
      "BIOS predefinida",
      "Mentoria de ajuste antes de jogar",
    ],
    notaEspecial:
      "Única otimização feita em chamada de vídeo — para tirar dúvidas e acompanhar o processo ao vivo.",
  },
];
