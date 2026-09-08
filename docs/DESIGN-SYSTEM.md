# FRAMELAB — Guia de estilo

Sistema de design do site institucional de otimização de PC para jogos.
Versão 1.0 · setembro de 2026

> A versão viva deste guia está em `/style-guide` no protótipo. Ela é renderizada
> pelos mesmos componentes do site: se a página estiver certa, o site está certo.

---

## 1. Marca

**FRAMELAB.** "Frame" é a unidade que o cliente compra (FPS, frametime, 1% low);
"Lab" comunica método, medição e reversibilidade — o oposto do "otimizador mágico"
que o mercado vende. Funciona em português e inglês, tem 8 letras, cabe em um
handle e não depende de gíria gamer que envelhece.

- **Wordmark:** `FRAME` em `ink` + `LAB` em `accent`, Space Grotesk Bold, tracking −2%.
- **Símbolo:** uma linha de frametime desenhada em 6 pontos — irregular à esquerda,
  estável à direita. É o gráfico do próprio serviço virando logo.
- **Tagline:** *Seu setup no máximo. Sem trocar uma peça.*
- **Nome legal em contrato:** FRAMELAB Otimização de Performance.

O nome é trocável em um único lugar: `src/lib/site.ts → BRAND`.

---

## 2. Cor

Base neutra fria + **um único** acento. Regra de ouro: o ciano ocupa no máximo
~10% da tela e só aparece em **ação** (CTA, link ativo) ou **dado** (número-chave,
série "depois" de gráfico). Se tudo brilha, nada chama atenção — e o site vira
"gamer genérico".

### Superfícies
| Token | Hex | Uso |
|---|---|---|
| `void` | `#05070A` | Rodapé e faixas de contraste máximo |
| `base` | `#090C11` | Fundo padrão de página |
| `surface` | `#0F141B` | Cards, painéis, inputs |
| `surface-2` | `#151C25` | Hover de card, célula interna, header de tabela |

### Linhas
| Token | Hex | Uso |
|---|---|---|
| `line` | `#1E2833` | Borda padrão, 1px |
| `line-soft` | `#172029` | Divisor interno e separador de seção |

### Texto
| Token | Hex | Contraste sobre `base` | Uso |
|---|---|---|---|
| `ink` | `#EEF3F8` | 16.8:1 | Títulos e texto de alta hierarquia |
| `ink-2` | `#AAB6C4` | 7.4:1 | Corpo de texto |
| `ink-3` | `#6D7A89` | 4.6:1 | Legendas e metadados (mínimo AA) |

### Acento
| Token | Hex | Uso |
|---|---|---|
| `accent` | `#00E5FF` | CTA primário, dado-chave, estado ativo, ícone de confirmação |
| `accent-600` | `#00B8D4` | Estado pressionado |
| `accent-700` | `#0091A7` | Apoio em gradiente |
| `accent-soft` | `#7FF2FF` | Hover do botão primário |
| `accent-ink` | `#04222A` | Texto **sobre** o botão ciano (nunca branco: contraste insuficiente) |

### Gráficos
| Token | Hex | Uso |
|---|---|---|
| `chart-before` | `#2B3846` | Série "antes" |
| `chart-after` | `#00E5FF` | Série "depois" |

### Faça / não faça
**Faça**
- Ciano só em CTA primário, número-chave, estado ativo e check.
- Hierarquia por elevação (fundo um degrau mais claro), não por borda colorida.
- Contraste mínimo de 4.5:1 em qualquer texto.

**Não faça**
- Segunda cor de destaque (roxo, verde, laranja) competindo com o ciano.
- Gradiente colorido em texto de corpo ou em fundo de seção inteira.
- Preto puro `#000` — achata a hierarquia e cansa a leitura em tela.
- Neon pulsante contínuo. O glow é estático, sutil e só no hero e na faixa de CTA.

---

## 3. Tipografia

| Papel | Família | Por quê |
|---|---|---|
| Display | **Space Grotesk** 600 | Desenho técnico, terminais retos, ótima presença em corpo grande. Passa "engenharia" sem virar fonte de e-sports. |
| Corpo | **Inter** 400/500 | A mais legível em texto pequeno sobre fundo escuro; altura-x alta e números tabulares. |
| Utilitário | **Mono** (JetBrains Mono / ui-monospace) | Rótulos, unidades e números de medição. Reforça a ideia de leitura de instrumento. |

### Escala

| Nível | Tamanho / entrelinha | Tracking | Aplicação |
|---|---|---|---|
| Display | 68 / 69 px | −3.5% | H1 da home |
| H1 | 48 / 51 px | −3% | Título de página interna |
| H2 | 34 / 38 px | −2.5% | Título de seção |
| H3 | 22 / 28 px | −1.5% | Título de card e de case |
| Corpo grande | 18 / 30 px | 0 | Lead abaixo do título |
| Corpo | 16 / 26 px | 0 | Texto padrão |
| Corpo pequeno | 15 / 24 px | 0 | Texto dentro de card |
| Pequeno | 14 / 22 px | 0 | Legenda |
| Micro mono | 11 / 16 px | +16%, caixa alta | Eyebrow, rótulo de dado, unidade |

Mobile: Display cai para 42 px e H1 para 40 px; o restante da escala é o mesmo.

**Regras**
- Máximo de 68 caracteres por linha em texto corrido.
- `text-wrap: balance` em todos os títulos; `pretty` em parágrafos.
- Um `h1` por página. Eyebrow não é título — é rótulo.
- Números em colunas usam `tabular-nums`.

---

## 4. Grid, espaço e forma

- **Container:** 1200 px de largura máxima, 20 px de padding lateral.
- **Colunas:** 12 (desktop) · 6 (tablet) · 4 (mobile).
- **Breakpoints:** 640 / 768 / 1024 / 1280 px.
- **Base de espaço:** 4 px.

| Escala | Uso |
|---|---|
| 4 / 8 px | Gap dentro de um componente (ícone ↔ texto) |
| 12 / 16 px | Padding interno de badge, input e célula |
| 24 / 28 px | Padding de card |
| 40 / 56 px | Gap entre blocos dentro de uma seção |
| 80 / 112 px | Padding vertical de seção (mobile / desktop) |

**Raio:** 4 (micro) · 8 (input) · 12 (bloco) · 18 (card) · pill (botão e badge).
**Borda:** sempre 1 px. Card nunca usa 2 px — destaque se faz com cor de borda, não com espessura.

---

## 5. Componentes

| Componente | Regra |
|---|---|
| **Botão primário** | Pill ciano, texto `accent-ink`, altura 44 (md) / 56 (lg). **Um por bloco visível.** |
| **Botão secundário** | Contorno `line`, texto `ink`; no hover ganha borda ciano a 50% e fundo ciano a 6%. |
| **Botão terciário** | Só texto `ink-2`, vira ciano no hover. Usado para "ver todos". |
| **Card** | `surface` + borda `line` + raio 18. No hover: `surface-2`, borda ciano 45%, −2 px em Y. |
| **Badge** | Pill de 11 px mono, caixa alta. Variante neutra e variante acento. |
| **Header** | Fixo, 72 px. Transparente no topo; ao rolar ganha `bg-base/85` + blur + borda inferior. Máx. 5 itens + 1 CTA. |
| **Footer** | 4 colunas: marca + 3 grupos de links. Selo de disponibilidade com ponto ciano. |
| **Barra antes/depois** | Duas barras (cinza / ciano), rótulo à esquerda, valor com unidade à direita, delta % no topo. Nunca só cor: o valor está sempre escrito. |
| **Acordeão** | Ícone `+` que gira 45° ao abrir. Um item aberto por vez. |
| **Selos de confiança** | Faixa de 4 células com borda de 1px compartilhada. Repetida em Home, Serviços, Planos, Processo e Contato. |
| **Botão flutuante** | Canto inferior direito, aparece após 520 px de rolagem, expande em WhatsApp + Discord. |

**Ícones:** conjunto próprio, traço de 1,5 px, grid de 24 px, cantos arredondados.
Nenhuma biblioteca de estoque — ícone genérico é a assinatura visual mais rápida
de "template".

---

## 6. Movimento

Coerência conceitual: um site que vende **redução de latência** não pode ter
animação lenta. Curva única: `cubic-bezier(0.16, 1, 0.3, 1)`.

| Duração | Onde |
|---|---|
| 150 ms | Hover, foco, estado de botão, link de navegação |
| 250 ms | Acordeão e menu mobile — os únicos movimentos de layout permitidos |
| 500 ms | Entrada de bloco ao rolar: 14 px de subida + fade, **uma vez só** |
| 700 ms | Preenchimento das barras de gráfico ao entrarem na tela |

Nada pisca. Nenhuma animação decorativa em loop infinito, exceto a faixa de jogos —
que pausa no hover. Tudo é desligado sob `prefers-reduced-motion`.

---

## 7. Acessibilidade

- Contraste AA em todo texto; `ink-3` sobre `surface` = 4.6:1.
- Anel de foco visível em ciano, offset de 3 px, em todo elemento focável.
- Link "pular para o conteúdo" antes do header.
- Alvo de toque mínimo de 44 × 44 px no mobile.
- Gráficos com rótulo textual **e** valor escrito — cor nunca é o único código.
- Acordeão com `aria-expanded`, navegável por teclado.
- Fontes auto-hospedadas: sem dependência de CDN externo em runtime.

---

## 8. Justificativa das escolhas

**Por que dark-mode como base.** O público olha para telas escuras o dia inteiro
(jogo, Discord, OBS). Fundo claro quebra o contexto e, pior, deixa gráfico de
performance com aparência de planilha corporativa. O escuro também faz o ciano
render mais com menos área — o que sustenta a regra do acento único.

**Por que ciano e não verde ou roxo.** Verde-neon é a cor de "otimizador de um
clique" — exatamente o que este serviço não é. Roxo puxa para streaming e
entretenimento, não para diagnóstico. Ciano é a cor de instrumento: osciloscópio,
telemetria, monitoramento. Ele diz *medição*, que é o argumento comercial central
do site.

**Por que gráfico em vez de foto.** Foto de banco de imagem com teclado RGB é o
sinal mais rápido de "site de freelancer". O ativo visual do negócio é o número
antes/depois — então o hero mostra um **relatório de sessão**, não uma pessoa
sorrindo com fone. Isso também resolve o problema de credibilidade do site atual.

**Por que o 1% low aparece em todo lugar.** É o diferencial técnico que separa
este serviço de quem só promete "mais FPS". Colocá-lo em toda medição transforma
uma alegação de marketing em uma métrica verificável — e é o que sustenta a
garantia de 7 dias sem virar discussão de opinião.

**Por que a conversão é por diagnóstico e não por compra direta.** O público de
baixo conhecimento técnico não sabe qual plano precisa, e o de alto conhecimento
quer saber o que vai ser feito antes de pagar. O CTA primário em todas as páginas
é "diagnóstico gratuito" — baixo atrito, qualifica o lead e permite dizer "não
vale a pena", o que é a jogada de confiança mais forte do site.

**Por que microinterações rápidas.** Toda transição é de 150 ms com curva
agressiva de saída. O site precisa *parecer* que tem baixo input lag — a promessa
do produto é demonstrada pela própria interface, não só descrita nela.

**Onde os CTAs aparecem.** Header fixo (1), hero (2), fim de cada seção
argumentativa (1 terciário), faixa final de CTA (2) e botão flutuante após 520 px.
Nenhum pop-up, nenhum banner de saída — o público reconhece e rejeita esses padrões.

---

## 9. Arquitetura do site

| # | Página | Rota | Papel na conversão |
|---|---|---|---|
| 1 | Home | `/` | Proposta de valor + prova numérica + trilhas para todas as outras |
| 2 | Quem faz | `/sobre` | Autoridade e princípios — resolve o medo de acesso remoto |
| 3 | Serviços | `/servicos` | Cobertura de escopo + o que **não** se faz |
| 4 | Serviço individual | `/servicos/[slug]` | Template reutilizável: incluso, prazo, preço, ganho típico, FAQ |
| 5 | Planos e preços | `/planos` | Comparativo lado a lado + venda avulsa |
| 6 | Antes e depois | `/resultados` | Cases com métrica e metodologia de medição |
| 7 | Depoimentos | `/depoimentos` | Prova social por origem (Discord, Instagram, WhatsApp) |
| 8 | Como funciona | `/como-funciona` | Passo a passo e segurança do acesso remoto |
| 9 | FAQ | `/faq` | Objeções: segurança, garantia, compatibilidade, pagamento |
| 10 | Blog | `/blog` + `/blog/[slug]` | Autoridade técnica e tráfego orgânico |
| 11 | Contato | `/contato` | Formulário que monta a mensagem de WhatsApp + agenda clicável |
| 12 | Privacidade | `/legal/privacidade` | LGPD, retenção, direitos |
| 13 | Termos de uso | `/legal/termos` | Escopo, garantia de 7 dias, cancelamento |
| — | Guia de estilo | `/style-guide` | Documentação viva do design system |

**Páginas sugeridas para a fase 2**, quando houver volume:
`/parcerias` (times amadores e lojas de hardware, com comissão),
`/afiliados` (streamers com link rastreado),
`/ferramentas` (checklist gratuito de otimização — isca de e-mail),
`/agenda` (integração com Cal.com para agendamento sem intermediário).
