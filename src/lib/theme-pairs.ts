// Inventário de pares (texto × fundo) para o audit de contraste
// (scripts/audit-contrast.mjs). FASE 1 — medição apenas: este arquivo só
// descreve o que já existe no código, não muda nenhum token.
//
// Cada par usa o MENOR tamanho real em que aquele token de texto aparece
// sobre aquele fundo — contraste (razão) não depende de tamanho, só a
// EXIGÊNCIA depende (texto grande pede só 3:1). Testar no menor tamanho é
// o cenário mais estrito; se passar lá, qualquer uso maior do mesmo par
// de cores passa também.
//
// `background` é uma pilha de camadas (baixo → cima) resolvida por
// composição alpha padrão. Para fundos translúcidos (glass, bg-accent/10
// etc.) a camada de cima leva `alpha` e é composta sobre a camada de base.

export type Layer = { hex: string; alpha?: number };
export type Role = "text" | "icon" | "border" | "focus" | "disabled";

export type ThemePair = {
  id: string;
  context: string;
  text: Layer;
  background: Layer[];
  sizePx: number;
  weight?: number;
  role: Role;
  note?: string;
};

// --- Tokens de src/app/globals.css (@theme) — copiados aqui porque este
// arquivo roda em Node puro via --experimental-strip-types, sem pipeline
// de CSS. Mantenha sincronizado manualmente se os valores lá mudarem. ---
export const TOKENS = {
  void: "#09090b",
  base: "#0c0a09",
  surface: "#18181b",
  surface2: "#292524",
  line: "#44403c",
  lineSoft: "#27272a",
  ink: "#f8fafc",
  ink2: "#d4d4d8",
  ink3: "#a1a1aa",
  accent: "#22c55e",
  accent600: "#16a34a",
  accent700: "#15803d",
  accentSoft: "#4ade80",
  // color-mix(in oklab, accent 55%, ink-3 45%) — ver globals.css --color-accent-text.
  accentText: "#71b684",
  buttonPrimaryFg: "#052e16",
  // HeroUI — calculado (color-mix em OKLab, ver scripts/audit-contrast.mjs
  // colorMixOklab): chip--accent.chip--soft usa
  // --accent-soft-foreground: color-mix(in oklab, var(--accent) 80%, var(--foreground) 30%)
  // com --accent = #22c55e e --foreground = var(--color-ink) = #f8fafc no
  // [data-theme="dark"] deste site.
  accentSoftFg: "#74d58b",
  // amber/blue do Tailwind (não fazem parte da paleta da marca — usados só
  // em /nao-clique e no banner MODO DEV, ambos fora do tema verde/cinza).
  amber100: "#fef3c7",
  amber200: "#fde68a",
  amber300: "#fcd34d",
  amber400: "#fbbf24",
  amber500: "#f59e0b",
  blue100: "#dbeafe",
  white: "#ffffff",
  naoCliqueBlue: "#0f2a75",
} as const;

const T = TOKENS;

export const PAIRS: ThemePair[] = [
  // ============================================================
  // 1. HIERARQUIA DE TEXTO — ink / ink-2 / ink-3 sobre as 4 superfícies
  //    (base, surface, surface-2, void). Testado no menor tamanho real.
  // ============================================================
  {
    id: "ink-on-base",
    context: "app/page.tsx:60 — <strong> dentro do lead do hero",
    text: { hex: T.ink },
    background: [{ hex: T.base }],
    sizePx: 18,
    weight: 700,
    role: "text",
  },
  {
    id: "ink-on-surface",
    context: "components/ScriptsGrid.tsx:49 — título do card de script",
    text: { hex: T.ink },
    background: [{ hex: T.surface }],
    sizePx: 17,
    weight: 600,
    role: "text",
  },
  {
    id: "ink-on-surface2",
    context: "app/page.tsx:115 — valor FPS no mockup do hero",
    text: { hex: T.ink },
    background: [{ hex: T.surface2 }],
    sizePx: 20,
    weight: 400,
    role: "text",
  },
  {
    id: "ink-on-void",
    context: "components/Header.tsx:96 — item do menu mobile sobre glass-strong (aprox. void)",
    text: { hex: T.ink },
    background: [{ hex: T.void }],
    sizePx: 24,
    weight: 600,
    role: "text",
  },
  {
    id: "ink2-on-base",
    context: "app/page.tsx:56 — parágrafo de lead do hero",
    text: { hex: T.ink2 },
    background: [{ hex: T.base }],
    sizePx: 18,
    weight: 400,
    role: "text",
  },
  {
    id: "ink2-on-surface",
    context: "components/Blocks.tsx:140 — descrição curta do ServiceCard",
    text: { hex: T.ink2 },
    background: [{ hex: T.surface }],
    sizePx: 15,
    weight: 400,
    role: "text",
  },
  {
    id: "ink2-on-surface2",
    context: "components/PlanComparison.tsx:50 — nome do plano não-destacado (cabeçalho da tabela)",
    text: { hex: T.ink2 },
    background: [{ hex: T.surface2 }],
    sizePx: 16,
    weight: 500,
    role: "text",
  },
  {
    id: "ink2-on-void",
    context: "components/Footer.tsx:58 — links de rodapé",
    text: { hex: T.ink2 },
    background: [{ hex: T.void, alpha: 0.9 }, { hex: T.base }],
    sizePx: 15,
    weight: 400,
    role: "text",
  },
  {
    id: "ink2-on-header-glass",
    context: "components/Header.tsx:64 — link \"Contato\" sobre header fixo (bg-base/85 + blur)",
    text: { hex: T.ink2 },
    background: [{ hex: T.base, alpha: 0.85 }, { hex: T.base }],
    sizePx: 15,
    weight: 400,
    role: "text",
    note: "pior caso: conteúdo claro passando atrás do blur equivale a mais luminância que base puro — ver nota de cobertura no fim do arquivo.",
  },
  {
    id: "ink3-on-base",
    context: "app/page.tsx:77 — \"Garantia de 7 dias\" / badges de confiança do hero",
    text: { hex: T.ink3 },
    background: [{ hex: T.base }],
    sizePx: 13,
    weight: 400,
    role: "text",
  },
  {
    id: "ink3-on-surface",
    context: "components/Blocks.tsx:142 — preço/duração no rodapé do ServiceCard (mono, uppercase)",
    text: { hex: T.ink3 },
    background: [{ hex: T.surface }],
    sizePx: 11,
    weight: 400,
    role: "text",
  },
  {
    id: "ink3-on-surface2",
    context: "components/ScriptsGrid.tsx:50 — pill de tempo do script (mono, uppercase)",
    text: { hex: T.ink3 },
    background: [{ hex: T.surface2 }],
    sizePx: 10,
    weight: 400,
    role: "text",
  },
  {
    id: "ink3-on-void",
    context: "components/Footer.tsx:70-76 — copyright / \"WhatsApp · e-mail\"",
    text: { hex: T.ink3 },
    background: [{ hex: T.void, alpha: 0.9 }, { hex: T.base }],
    sizePx: 12,
    weight: 400,
    role: "text",
  },

  // ============================================================
  // 2. EYEBROWS — mono, uppercase, micro (0.6875rem = 11px), sempre verde.
  //    O caso mais arriscado da auditoria: texto PEQUENO na cor de marca.
  // ============================================================
  {
    id: "eyebrow-accent-on-base",
    context: "components/UI.tsx:72 — <Eyebrow> (usada em quase toda SectionHead sobre fundo base)",
    text: { hex: T.accent },
    background: [{ hex: T.base }],
    sizePx: 11,
    weight: 400,
    role: "text",
  },
  {
    id: "eyebrow-accent-on-surface",
    context: "components/Blocks.tsx:143 — preço do serviço (text-accent mono) dentro do ServiceCard",
    text: { hex: T.accent },
    background: [{ hex: T.surface }],
    sizePx: 11,
    weight: 400,
    role: "text",
  },
  {
    id: "accent-on-active-filter-pill",
    context: "components/ScriptsGrid.tsx:142 / FerramentasExplorer.tsx:181 — label do filtro ativo (bg-accent/[0.1] sobre base)",
    text: { hex: T.accent },
    background: [{ hex: T.base }, { hex: T.accent, alpha: 0.1 }],
    sizePx: 11,
    weight: 400,
    role: "text",
  },

  // ============================================================
  // 3. VERDE COMO TEXTO COM OPACIDADE REDUZIDA — marcadores "01/02/03",
  //    numerais decorativos, ícones de check. O ponto mais provável de
  //    falha: opacidade sobre texto, exatamente o alerta do pedido.
  // ============================================================
  {
    id: "accent-25-step-numeral-on-surface",
    context: "app/page.tsx:205 — numeral \"01/02/03\" dos 3 passos (grande, mas ainda texto legível)",
    text: { hex: T.accentText },
    background: [{ hex: T.surface }],
    sizePx: 40,
    weight: 400,
    role: "text",
    note: "corrigido: era text-accent/25 (opacidade), agora text-accent-text (token sólido).",
  },
  {
    id: "accent-50-section-index-on-base",
    context: "components/Legal.tsx:43 — índice \"01\" das seções legais (mono, text-sm)",
    text: { hex: T.accentText },
    background: [{ hex: T.base }],
    sizePx: 14,
    weight: 400,
    role: "text",
    note: "corrigido: era text-accent/50 (opacidade), agora text-accent-text (token sólido).",
  },
  {
    id: "accent-50-index-sobre-resultados",
    context: "app/sobre/page.tsx:75 e app/resultados/page.tsx:118 — mesmo padrão de índice \"01\" (mono text-sm)",
    text: { hex: T.accentText },
    background: [{ hex: T.surface }],
    sizePx: 14,
    weight: 400,
    role: "text",
    note: "corrigido: era text-accent/50 (opacidade), agora text-accent-text (token sólido).",
  },
  {
    id: "accent-60-step-index-como-funciona",
    context: "app/como-funciona/page.tsx:102 — índice \"01\" (mono text-xs) dentro de Section tone=raised",
    text: { hex: T.accentText },
    background: [{ hex: T.base }, { hex: T.surface, alpha: 0.4 }],
    sizePx: 12,
    weight: 400,
    role: "text",
    note: "corrigido: era text-accent/60 (opacidade), agora text-accent-text (token sólido).",
  },
  {
    id: "accent-25-depoimentos-quote-icon",
    context: "app/depoimentos/page.tsx:37 — ícone de aspas decorativo (aria-hidden, grande) antes do título",
    text: { hex: T.accentText },
    background: [{ hex: T.base }],
    sizePx: 40,
    weight: 400,
    role: "icon",
    note: "corrigido: era text-accent/25 (opacidade), agora text-accent-text. Decorativo (aspas de abertura), não carrega informação sozinho, mas corrigido por consistência.",
  },
  {
    id: "accent-70-checklist-icon-legal",
    context: "components/Legal.tsx:54 — ícone de check das listas em /legal/* (não-texto)",
    text: { hex: T.accent, alpha: 0.7 },
    background: [{ hex: T.base }],
    sizePx: 16,
    weight: 400,
    role: "icon",
  },

  // ============================================================
  // 4. BOTÕES — texto sobre fundo colorido sólido
  // ============================================================
  {
    id: "button-primary-fg-on-accent",
    context: "components/UI.tsx:26 — Button variant=\"primary\" (bg-accent, texto #052e16)",
    text: { hex: T.buttonPrimaryFg },
    background: [{ hex: T.accent }],
    sizePx: 15,
    weight: 500,
    role: "text",
  },
  {
    id: "button-ghost-ink-on-glass",
    context: "components/UI.tsx:27 — Button variant=\"ghost\" (.glass: surface 55% sobre o fundo da seção)",
    text: { hex: T.ink },
    background: [{ hex: T.base }, { hex: T.surface, alpha: 0.55 }],
    sizePx: 15,
    weight: 500,
    role: "text",
  },

  // ============================================================
  // 5. BADGES / SELOS (texto sobre fundo colorido, via Chip da HeroUI)
  // ============================================================
  {
    id: "badge-accent-soft-fg-on-accent-soft-bg",
    context: "components/UI.tsx Badge tone=\"accent\" (Chip color=accent variant=soft) — ex.: page.tsx:258 tag do plano, selo do hero",
    text: { hex: T.accentSoftFg },
    background: [{ hex: T.base }, { hex: T.accent, alpha: 0.12 }],
    sizePx: 11,
    weight: 500,
    role: "text",
    note: "--chip-bg: var(--accent-soft) = color-mix(accent 12%, transparent); --chip-fg: var(--accent-soft-foreground), calculado em OKLab (ver TOKENS.accentSoftFg).",
  },
  {
    id: "badge-default-fg-on-default-bg",
    context: "components/ScriptsGrid.tsx:58 — Badge tone=\"line\" (Chip color=default) \"requer admin\"/\"reversível\"",
    text: { hex: T.ink },
    background: [{ hex: T.surface2 }],
    sizePx: 11,
    weight: 500,
    role: "text",
    note: "--chip-bg: var(--default) = surface-2; --chip-fg: var(--default-foreground) = ink — contraste alto por construção, incluído por completude.",
  },
  {
    id: "testimonial-metric-badge-accent-on-tint",
    context: "components/Blocks.tsx:107 — selo de métrica no card de depoimento (bg-accent/[0.07] sobre card)",
    text: { hex: T.accent },
    background: [{ hex: T.surface }, { hex: T.accent, alpha: 0.07 }],
    sizePx: 11,
    weight: 400,
    role: "text",
  },

  // ============================================================
  // 6. CAMPOS DE FORMULÁRIO — placeholder e ícones
  // ============================================================
  {
    id: "placeholder-ink3-on-surface",
    context: "components/ContactForm.tsx:24 / FerramentasExplorer.tsx:161 / ui/combobox.tsx:12 / ui/select.tsx:21 — placeholder (text-ink-3) em campo bg-surface",
    text: { hex: T.ink3 },
    background: [{ hex: T.surface }],
    sizePx: 15,
    weight: 400,
    role: "text",
    note: "corrigido: era placeholder:text-ink-3/70 (opacidade), agora placeholder:text-ink-3 (token sólido, mesmo já usado como texto terciário em todo o site).",
  },
  {
    id: "field-icon-ink3-on-surface",
    context: "components/FerramentasExplorer.tsx:153 — ícone de busca dentro do input (não-texto)",
    text: { hex: T.ink3 },
    background: [{ hex: T.surface }],
    sizePx: 17,
    weight: 400,
    role: "icon",
  },

  // ============================================================
  // 7. ÍCONES E BORDAS NÃO-TEXTUAIS QUE CARREGAM INFORMAÇÃO
  // ============================================================
  {
    id: "icon-minus-ink3-on-plan-table",
    context: "components/PlanComparison.tsx:17 — ícone \"não incluso\" na tabela de planos (Section tone=raised → surface 40% sobre base)",
    text: { hex: T.ink3 },
    background: [{ hex: T.base }, { hex: T.surface, alpha: 0.4 }],
    sizePx: 16,
    weight: 400,
    role: "icon",
    note: "corrigido: era text-line (token de borda, overload semântico errado pra um ícone informativo) — agora text-ink-3, o token de texto terciário já usado em toda a hierarquia. --color-line não mudou: continua servindo as bordas reais do site.",
  },
  {
    id: "focus-ring-accent-on-surface",
    context: "globals.css:134 — :focus-visible { outline: 2px solid var(--color-accent) } sobre campo bg-surface",
    text: { hex: T.accent },
    background: [{ hex: T.surface }],
    sizePx: 2,
    weight: 400,
    role: "focus",
  },
  {
    id: "header-active-nav-underline",
    context: "components/Header.tsx:54 — sublinhado de 1px do item ativo (bg-accent) sobre header (base/85)",
    text: { hex: T.accent },
    background: [{ hex: T.base, alpha: 0.85 }, { hex: T.base }],
    sizePx: 1,
    weight: 400,
    role: "border",
  },

  // ============================================================
  // 8. GRÁFICOS — legendas "antes/depois", linha de frametime
  // ============================================================
  {
    id: "chart-legend-antes-ink3-on-surface2",
    context: "components/Chart.tsx:38/68/102 — rótulo \"antes\"/\"depois\" das barras e da legenda do frametime",
    text: { hex: T.ink3 },
    background: [{ hex: T.surface2 }],
    sizePx: 10,
    weight: 400,
    role: "text",
  },
  {
    id: "chart-before-bar-fill-on-track",
    context: "components/Chart.tsx:57 — barra \"antes\" (bg-ink-3) sobre o trilho (bg-surface-2)",
    text: { hex: T.ink3 },
    background: [{ hex: T.surface2 }],
    sizePx: 8,
    weight: 400,
    role: "icon",
    note: "corrigido: era o hex solto #52525b (zinc-600, fora da paleta de tokens), agora bg-ink-3 — mesmo token cinza terciário do resto do site, sem introduzir cor nova.",
  },
  {
    id: "chart-before-line-stroke-on-card",
    context: "components/Chart.tsx:115 — linha \"antes\" do frametime (stroke-ink-3) sobre o card (bg-surface)",
    text: { hex: T.ink3 },
    background: [{ hex: T.surface }],
    sizePx: 2,
    weight: 400,
    role: "icon",
    note: "corrigido: era o hex solto #52525b, agora stroke-ink-3 (classe Tailwind, token oficial) — elemento gráfico que carrega informação (frametime antes).",
  },

  // ============================================================
  // 9. ESTRELAS DE AVALIAÇÃO (ícone, não-texto, mas carrega informação)
  // ============================================================
  {
    id: "stars-filled-fill-on-surface",
    context: "components/UI.tsx:141 — estrela preenchida (fill-accent-text) sobre o card de depoimento",
    text: { hex: T.accentText },
    background: [{ hex: T.surface }],
    sizePx: 13,
    weight: 400,
    role: "icon",
    note: "corrigido: era fill-accent/25 (opacidade), agora fill-accent-text (token sólido). O contorno (stroke) já era accent 100% — a diferença filled/empty passa a ser: stroke full accent + fill accent-text (cheia) vs. stroke/fill sólidos em ink-3 (vazia), sem opacidade em nenhum dos dois estados.",
  },
  {
    id: "stars-empty-stroke-on-surface",
    context: "components/UI.tsx:141 — estrela vazia (antes opacity-25, agora text-ink-3) sobre o card de depoimento",
    text: { hex: T.ink3 },
    background: [{ hex: T.surface }],
    sizePx: 13,
    weight: 400,
    role: "icon",
    note: "corrigido: era opacity-25 sobre o accent herdado do pai (diluía contorno E preenchimento), agora text-ink-3 sólido — cinza terciário, claramente \"vazia\" sem depender de opacidade.",
  },

  // ============================================================
  // 10. /nao-clique — texto branco/âmbar/azul-claro sobre azul sólido
  //     (fora da paleta verde/cinza por design, ver comentário no arquivo)
  // ============================================================
  {
    id: "naoclique-white-on-blue",
    context: "app/nao-clique/page.tsx:39/49 — título e texto em destaque (text-white)",
    text: { hex: T.white },
    background: [{ hex: T.naoCliqueBlue }],
    sizePx: 22,
    weight: 600,
    role: "text",
  },
  {
    id: "naoclique-blue100-on-blue",
    context: "app/nao-clique/page.tsx:43 — parágrafo de corpo (text-blue-100)",
    text: { hex: T.blue100 },
    background: [{ hex: T.naoCliqueBlue }],
    sizePx: 15,
    weight: 400,
    role: "text",
  },
  {
    id: "naoclique-blue100-90-footer-on-blue",
    context: "app/nao-clique/page.tsx:68 — \"USFPS_CONFIG_WARNING\" (text-blue-100/90, mono micro)",
    text: { hex: T.blue100, alpha: 0.9 },
    background: [{ hex: T.naoCliqueBlue }],
    sizePx: 11,
    weight: 700,
    role: "text",
  },
  {
    id: "naoclique-amber100-badge-on-tint",
    context: "app/nao-clique/page.tsx:34 — selo \"SIMULAÇÃO // ALERTA\" (text-amber-100 sobre bg-amber-400/15, que por sua vez está sobre o azul)",
    text: { hex: T.amber100 },
    background: [{ hex: T.naoCliqueBlue }, { hex: T.amber400, alpha: 0.15 }],
    sizePx: 11,
    weight: 700,
    role: "text",
  },
  {
    id: "naoclique-button-primary-blue-on-white",
    context: "app/nao-clique/page.tsx:56 — botão primário (bg-white, texto #0f2a75)",
    text: { hex: T.naoCliqueBlue },
    background: [{ hex: T.white }],
    sizePx: 14,
    weight: 600,
    role: "text",
  },
  {
    id: "naoclique-button-ghost-white-on-blue",
    context: "app/nao-clique/page.tsx:62 — botão ghost (border-white/50, texto white, fundo = azul da página)",
    text: { hex: T.white },
    background: [{ hex: T.naoCliqueBlue }],
    sizePx: 14,
    weight: 600,
    role: "text",
  },

  // ============================================================
  // 11. BANNER "MODO DEV" (/gratis/pcs) — NUNCA renderiza em produção
  //     (early return se NODE_ENV === "production"). Medido por
  //     completude, mas fora do escopo de legibilidade pro usuário final.
  // ============================================================
  {
    id: "devbanner-amber100-on-tint",
    context: "app/gratis/pcs/page.tsx:88 — texto do aviso (text-amber-100/90 sobre bg-amber-500/10)",
    text: { hex: T.amber100, alpha: 0.9 },
    background: [{ hex: T.base }, { hex: T.amber500, alpha: 0.1 }],
    sizePx: 13,
    weight: 400,
    role: "text",
    note: "dev-only (process.env.NODE_ENV === \"production\" ? null) — nunca chega ao usuário final.",
  },
  {
    id: "devbanner-amber300-70-on-tint",
    context: "app/gratis/pcs/page.tsx:96 — \"(id da config)\" (text-amber-300/70, mono micro)",
    text: { hex: T.amber300, alpha: 0.7 },
    background: [{ hex: T.base }, { hex: T.amber500, alpha: 0.1 }],
    sizePx: 11,
    weight: 400,
    role: "text",
    note: "dev-only — idem acima.",
  },

  // ============================================================
  // 12. ESTADO DESABILITADO — isento pela norma, reportado assim mesmo
  // ============================================================
  {
    id: "disabled-category-pill-ferramentas",
    context: "components/FerramentasExplorer.tsx:179 — pílula de categoria sem itens (disabled:opacity-35)",
    text: { hex: T.ink2, alpha: 0.35 },
    background: [{ hex: T.surface2, alpha: 0.35 }, { hex: T.base }],
    sizePx: 11,
    weight: 400,
    role: "disabled",
  },
];

// --- Nota de cobertura (lida pelo humano, não pelo script) ---
// Pares como "ink2-on-header-glass" aproximam o backdrop-blur do header e
// dos painéis .glass pela cor da camada abaixo (base/surface), que é o
// pior caso realista neste site: o fundo nunca tem imagens claras, só a
// malha técnica (~4% de acento), os blobs (~10-13% de acento) e ruído
// (~3%) sobre uma base quase-preta — ou seja, o ponto mais claro possível
// atrás do blur ainda está muito perto de --color-base. Qualquer par que
// passar aqui passa também nesses casos reais.
