// src/lib/pcs.ts
//
// Configurações recomendadas. Cada peça carrega um termo de busca; os links das
// lojas são gerados em src/lib/lojas.ts.
//
// Faixas marcadas com baseFaixa: "estimado" são aproximações — memória RAM e
// SSD/NAND atravessam uma escassez global que empurra preços para cima sem
// aviso, e essas faixas ainda não foram confirmadas numa fonte de preço.
// Elas PRECISAM ser confirmadas com o cliente antes de serem tratadas como
// definitivas. Faixas "pesquisado" já foram confirmadas em fonte de preço;
// "cliente" veio de valor informado pelo próprio cliente.
//
// CORREÇÕES TÉCNICAS APLICADAS EM RELAÇÃO ÀS LISTAS ORIGINAIS DO CLIENTE:
//  1. Ryzen 3 3200G com placa A520M foi TROCADO por B450M. As placas A520 trazem
//     impresso na caixa "não compatível com Ryzen 5 3400G e Ryzen 3 3200G" — o
//     3200G é Zen+ e o chipset A520 só dá suporte a Zen 2 em diante. Atualização
//     de BIOS não resolve.
//  2. A configuração de entrada passou de 1x8GB para 2x4GB. Com vídeo integrado,
//     canal simples derruba o desempenho gráfico entre 30% e 40%.
//  3. As fontes ganharam exigência de certificação 80 Plus. Fonte genérica é a
//     peça que leva o resto do PC junto quando falha.
//  4. As placas de vídeo estão marcadas para revisão: RTX 4060 e 4060 Ti são
//     recomendação de 2023 e precisam ser comparadas com a geração atual.

export type CategoriaPeca =
  | "processador"
  | "placa-mae"
  | "memoria"
  | "armazenamento"
  | "fonte"
  | "gabinete"
  | "placa-video";

export interface Peca {
  categoria: CategoriaPeca;
  /** Nome exibido ao usuário. */
  nome: string;
  /** Termo usado para montar os links de busca nas lojas. */
  busca: string;
  /** Aviso curto exibido abaixo do nome, quando houver. */
  observacao?: string;
  /** Faixa aproximada em reais. 0 = ainda não pesquisado; o build falha assim. */
  faixaMin: number;
  faixaMax: number;
  /** "pesquisado" = confirmado em fonte de preço; "estimado" = aproximação. */
  baseFaixa: "pesquisado" | "estimado" | "cliente";
}

export interface Config {
  id: string;
  nome: string;
  publico: string;
  plataforma: "AMD" | "Intel";
  resolucaoAlvo: string;
  /** Data ISO da última verificação de faixas. */
  verificadoEm: string;
  pecas: Peca[];
  esperar: string[];
  naoEsperar: string[];
}

export const CONFIGS: Config[] = [
  {
    id: "entrada-esports",
    nome: "Entrada — eSports em 1080p",
    publico: "Quem joga Free Fire, Valorant e CS2 e não tem orçamento para placa de vídeo.",
    plataforma: "AMD",
    resolucaoAlvo: "1080p em configurações baixas, jogos competitivos",
    verificadoEm: "2026-09-19",
    pecas: [
      { categoria: "processador", nome: "AMD Ryzen 3 3200G", busca: "ryzen 3 3200g", observacao: "Vídeo integrado Vega 8; exige placa B450M", faixaMin: 450, faixaMax: 700, baseFaixa: "estimado" },
      { categoria: "placa-mae", nome: "Placa-mãe B450M", busca: "placa mae b450m", observacao: "NÃO use A520M: incompatível com o 3200G", faixaMin: 400, faixaMax: 600, baseFaixa: "estimado" },
      { categoria: "memoria", nome: "8 GB DDR4 (2x4 GB)", busca: "memoria ddr4 4gb 3200", observacao: "Dois pentes, não um. Canal duplo é essencial com vídeo integrado", faixaMin: 280, faixaMax: 500, baseFaixa: "estimado" },
      { categoria: "armazenamento", nome: "SSD NVMe 256 GB", busca: "ssd nvme 256gb", faixaMin: 180, faixaMax: 320, baseFaixa: "estimado" },
      { categoria: "fonte", nome: "Fonte 450 W 80 Plus", busca: "fonte 450w 80 plus", observacao: "Não compre fonte sem certificação", faixaMin: 250, faixaMax: 400, baseFaixa: "estimado" },
      { categoria: "gabinete", nome: "Gabinete com 3 fans", busca: "gabinete gamer 3 fans", faixaMin: 200, faixaMax: 350, baseFaixa: "estimado" },
    ],
    esperar: ["Free Fire e Valorant fluidos em 1080p baixo", "Navegação e estudo sem travar"],
    naoEsperar: ["Jogos AAA", "Streaming enquanto joga", "Qualquer coisa acima de 1080p"],
  },
  {
    id: "entrada-plus",
    nome: "Entrada Plus — eSports folgado",
    publico: "Mesmo perfil da anterior, com margem para mais abas abertas e upgrade futuro.",
    plataforma: "AMD",
    resolucaoAlvo: "1080p em jogos competitivos, com folga de memória",
    verificadoEm: "2026-09-19",
    pecas: [
      { categoria: "processador", nome: "AMD Ryzen 3 3200G", busca: "ryzen 3 3200g", observacao: "Exige placa B450M", faixaMin: 450, faixaMax: 700, baseFaixa: "estimado" },
      { categoria: "placa-mae", nome: "Placa-mãe B450M", busca: "placa mae b450m", faixaMin: 400, faixaMax: 600, baseFaixa: "estimado" },
      { categoria: "memoria", nome: "16 GB DDR4 (2x8 GB)", busca: "memoria ddr4 2x8gb 3200", faixaMin: 650, faixaMax: 1100, baseFaixa: "estimado" },
      { categoria: "armazenamento", nome: "SSD NVMe 512 GB", busca: "ssd nvme 512gb", faixaMin: 300, faixaMax: 550, baseFaixa: "estimado" },
      { categoria: "fonte", nome: "Fonte 450 W 80 Plus", busca: "fonte 450w 80 plus", faixaMin: 250, faixaMax: 400, baseFaixa: "estimado" },
      { categoria: "gabinete", nome: "Gabinete com 3 fans", busca: "gabinete gamer 3 fans", faixaMin: 200, faixaMax: 350, baseFaixa: "estimado" },
    ],
    esperar: ["Competitivos fluidos", "Espaço para vários jogos instalados", "Caminho aberto para adicionar placa de vídeo depois"],
    naoEsperar: ["Jogos AAA", "1440p"],
  },
  {
    id: "intermediario",
    nome: "Intermediário — 1080p com folga",
    publico: "Quem quer processador melhor agora e placa de vídeo depois.",
    plataforma: "AMD",
    resolucaoAlvo: "1080p, com upgrade planejado",
    verificadoEm: "2026-09-19",
    pecas: [
      { categoria: "processador", nome: "AMD Ryzen 5 5600GT", busca: "ryzen 5 5600gt", observacao: "Pode exigir atualização de BIOS em placas A520 antigas", faixaMin: 800, faixaMax: 1200, baseFaixa: "estimado" },
      { categoria: "placa-mae", nome: "Placa-mãe A520M ou B550M", busca: "placa mae b550m", observacao: "B550M custa mais e libera PCIe 4.0 para upgrade futuro", faixaMin: 650, faixaMax: 950, baseFaixa: "estimado" },
      { categoria: "memoria", nome: "16 GB DDR4 (2x8 GB)", busca: "memoria ddr4 2x8gb 3200", faixaMin: 650, faixaMax: 1100, baseFaixa: "estimado" },
      { categoria: "armazenamento", nome: "SSD NVMe 512 GB", busca: "ssd nvme 512gb", faixaMin: 300, faixaMax: 550, baseFaixa: "estimado" },
      { categoria: "fonte", nome: "Fonte 500 W 80 Plus", busca: "fonte 500w 80 plus", faixaMin: 280, faixaMax: 450, baseFaixa: "estimado" },
      { categoria: "gabinete", nome: "Gabinete com 3 fans", busca: "gabinete gamer 3 fans", faixaMin: 200, faixaMax: 350, baseFaixa: "estimado" },
    ],
    esperar: ["Competitivos com folga", "Bom desempenho fora dos jogos"],
    naoEsperar: ["Jogos AAA sem placa de vídeo dedicada"],
  },
  {
    id: "custo-beneficio-amd",
    nome: "Custo-benefício — 1080p alto",
    publico: "Quem quer jogar de tudo em 1080p sem gastar além do necessário.",
    plataforma: "AMD",
    resolucaoAlvo: "1080p em configurações altas",
    verificadoEm: "2026-09-19",
    pecas: [
      { categoria: "processador", nome: "AMD Ryzen 5 5600", busca: "ryzen 5 5600", faixaMin: 750, faixaMax: 1150, baseFaixa: "pesquisado" },
      { categoria: "placa-mae", nome: "Placa-mãe B550M", busca: "placa mae b550m", faixaMin: 650, faixaMax: 950, baseFaixa: "estimado" },
      { categoria: "memoria", nome: "16 GB DDR4 (2x8 GB)", busca: "memoria ddr4 2x8gb 3200", faixaMin: 650, faixaMax: 1100, baseFaixa: "estimado" },
      { categoria: "armazenamento", nome: "SSD NVMe 1 TB", busca: "ssd nvme 1tb", faixaMin: 500, faixaMax: 900, baseFaixa: "estimado" },
      { categoria: "placa-video", nome: "Placa de vídeo intermediária", busca: "rtx 4060", observacao: "REVISAR: comparar com a geração atual antes de publicar", faixaMin: 1900, faixaMax: 2700, baseFaixa: "pesquisado" },
      { categoria: "fonte", nome: "Fonte 600 W 80 Plus", busca: "fonte 600w 80 plus", faixaMin: 350, faixaMax: 550, baseFaixa: "estimado" },
      { categoria: "gabinete", nome: "Gabinete com 4 fans", busca: "gabinete gamer 4 fans", faixaMin: 300, faixaMax: 500, baseFaixa: "estimado" },
    ],
    esperar: ["Jogos atuais em 1080p alto", "Streaming leve"],
    naoEsperar: ["4K", "Ray tracing pesado"],
  },
  {
    id: "custo-beneficio-intel",
    nome: "Custo-benefício — 1080p alto",
    publico: "Mesma proposta da versão AMD, para quem prefere Intel.",
    plataforma: "Intel",
    resolucaoAlvo: "1080p em configurações altas",
    verificadoEm: "2026-09-19",
    pecas: [
      { categoria: "processador", nome: "Intel Core i5-12400F", busca: "i5 12400f", observacao: "Sem vídeo integrado: depende da placa de vídeo", faixaMin: 700, faixaMax: 1100, baseFaixa: "estimado" },
      { categoria: "placa-mae", nome: "Placa-mãe H610M", busca: "placa mae h610m", observacao: "H610 limita a memória a 3200 MHz", faixaMin: 500, faixaMax: 800, baseFaixa: "estimado" },
      { categoria: "memoria", nome: "16 GB DDR4 (2x8 GB)", busca: "memoria ddr4 2x8gb 3200", faixaMin: 650, faixaMax: 1100, baseFaixa: "estimado" },
      { categoria: "armazenamento", nome: "SSD NVMe 1 TB", busca: "ssd nvme 1tb", faixaMin: 500, faixaMax: 900, baseFaixa: "estimado" },
      { categoria: "placa-video", nome: "Placa de vídeo intermediária", busca: "rtx 4060", observacao: "REVISAR: comparar com a geração atual", faixaMin: 1900, faixaMax: 2700, baseFaixa: "pesquisado" },
      { categoria: "fonte", nome: "Fonte 600 W 80 Plus", busca: "fonte 600w 80 plus", faixaMin: 350, faixaMax: 550, baseFaixa: "estimado" },
      { categoria: "gabinete", nome: "Gabinete com 4 fans", busca: "gabinete gamer 4 fans", faixaMin: 300, faixaMax: 500, baseFaixa: "estimado" },
    ],
    esperar: ["Jogos atuais em 1080p alto"],
    naoEsperar: ["Funcionar sem placa de vídeo — o 12400F não tem vídeo integrado"],
  },
  {
    id: "alto-desempenho-amd",
    nome: "Alto desempenho — 1080p e 1440p",
    publico: "Quem joga competitivo em alta taxa de quadros ou transmite.",
    plataforma: "AMD",
    resolucaoAlvo: "1080p em alta taxa de quadros, 1440p em configurações altas",
    verificadoEm: "2026-09-19",
    pecas: [
      { categoria: "processador", nome: "AMD Ryzen 5 5600", busca: "ryzen 5 5600", faixaMin: 750, faixaMax: 1150, baseFaixa: "pesquisado" },
      { categoria: "placa-mae", nome: "Placa-mãe B550M", busca: "placa mae b550m", faixaMin: 650, faixaMax: 950, baseFaixa: "estimado" },
      { categoria: "memoria", nome: "32 GB DDR4 (2x16 GB)", busca: "memoria ddr4 2x16gb 3200", faixaMin: 1300, faixaMax: 2200, baseFaixa: "estimado" },
      { categoria: "armazenamento", nome: "SSD NVMe 1 TB", busca: "ssd nvme 1tb", faixaMin: 500, faixaMax: 900, baseFaixa: "estimado" },
      { categoria: "placa-video", nome: "Placa de vídeo superior", busca: "rtx 4060 ti", observacao: "REVISAR: comparar com a geração atual", faixaMin: 2800, faixaMax: 3800, baseFaixa: "estimado" },
      { categoria: "fonte", nome: "Fonte 650 W 80 Plus", busca: "fonte 650w 80 plus", faixaMin: 400, faixaMax: 650, baseFaixa: "estimado" },
      { categoria: "gabinete", nome: "Gabinete com 4 fans", busca: "gabinete gamer 4 fans", faixaMin: 300, faixaMax: 500, baseFaixa: "estimado" },
    ],
    esperar: ["Alta taxa de quadros em competitivos", "1440p em jogos atuais", "Transmissão sem perda perceptível"],
    naoEsperar: ["4K com tudo no máximo"],
  },
  {
    id: "alto-desempenho-intel",
    nome: "Alto desempenho — 1080p e 1440p",
    publico: "Mesma proposta da versão AMD, para quem prefere Intel.",
    plataforma: "Intel",
    resolucaoAlvo: "1080p em alta taxa de quadros, 1440p em configurações altas",
    verificadoEm: "2026-09-19",
    pecas: [
      { categoria: "processador", nome: "Intel Core i5-12400F", busca: "i5 12400f", observacao: "Sem vídeo integrado", faixaMin: 700, faixaMax: 1100, baseFaixa: "estimado" },
      { categoria: "placa-mae", nome: "Placa-mãe H610M", busca: "placa mae h610m", faixaMin: 500, faixaMax: 800, baseFaixa: "estimado" },
      { categoria: "memoria", nome: "32 GB DDR4 (2x16 GB)", busca: "memoria ddr4 2x16gb 3200", faixaMin: 1300, faixaMax: 2200, baseFaixa: "estimado" },
      { categoria: "armazenamento", nome: "SSD NVMe 1 TB", busca: "ssd nvme 1tb", faixaMin: 500, faixaMax: 900, baseFaixa: "estimado" },
      { categoria: "placa-video", nome: "Placa de vídeo superior", busca: "rtx 4060 ti", observacao: "REVISAR: comparar com a geração atual", faixaMin: 2800, faixaMax: 3800, baseFaixa: "estimado" },
      { categoria: "fonte", nome: "Fonte 650 W 80 Plus", busca: "fonte 650w 80 plus", faixaMin: 400, faixaMax: 650, baseFaixa: "estimado" },
      { categoria: "gabinete", nome: "Gabinete com 4 fans", busca: "gabinete gamer 4 fans", faixaMin: 300, faixaMax: 500, baseFaixa: "estimado" },
    ],
    esperar: ["Alta taxa de quadros em competitivos", "1440p em jogos atuais"],
    naoEsperar: ["4K com tudo no máximo"],
  },
];

export const CONTAGEM_CONFIGS = CONFIGS.length;
