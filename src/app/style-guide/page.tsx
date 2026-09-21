import type { Metadata } from "next";
import { Badge, Button, CheckList, Section, SectionHead, Stars, StatBlock } from "@/components/UI";
import { Icon } from "@/components/Icon";
import { DeltaBars } from "@/components/Chart";
import { Accordion } from "@/components/Accordion";
import { PageHero, TrustStrip, TestimonialCard } from "@/components/Blocks";
import { TESTIMONIALS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guia de estilo",
  description: "Paleta, tipografia, espaçamentos, componentes e regras de movimento do design system UsantoosFps.",
};

const COLORS = [
  { g: "Superfícies", items: [
    { n: "void", hex: "#09090B", use: "Rodapé e faixas de máximo contraste (zinc-950)" },
    { n: "base", hex: "#0C0A09", use: "Fundo padrão de página (stone-950)" },
    { n: "surface", hex: "#18181B", use: "Cards, painéis, inputs (zinc-900)" },
    { n: "surface-2", hex: "#292524", use: "Card em hover, célula interna, cabeçalho de tabela (stone-800)" },
  ]},
  { g: "Linhas", items: [
    { n: "line", hex: "#44403C", use: "Borda padrão (1px) (stone-700)" },
    { n: "line-soft", hex: "#27272A", use: "Divisor interno e separador de seção (zinc-800)" },
  ]},
  { g: "Texto", items: [
    { n: "ink", hex: "#F8FAFC", use: "Títulos e texto de alta hierarquia (slate-50)" },
    { n: "ink-2", hex: "#D4D4D8", use: "Corpo de texto (zinc-300)" },
    { n: "ink-3", hex: "#A1A1AA", use: "Legendas e metadados (zinc-400)" },
  ]},
  { g: "Acento — usar em no máximo 10% da tela", items: [
    { n: "accent", hex: "#22C55E", use: "CTA principal, dado-chave, estado ativo (green-500)" },
    { n: "accent-600", hex: "#16A34A", use: "Pressionado (green-600)" },
    { n: "accent-soft", hex: "#4ADE80", use: "Hover do botão primário (green-400)" },
  ]},
];

const TYPE = [
  { n: "Display", cls: "font-display text-[3rem] leading-[1.02] tracking-[-0.035em]", spec: "Space Grotesk 600 · 68px/1.02 · -3.5%", t: "Seu setup no máximo" },
  { n: "H1", cls: "font-display text-[2.5rem] leading-[1.06] tracking-[-0.03em]", spec: "Space Grotesk 600 · 48px/1.06 · -3%", t: "Antes e depois medido" },
  { n: "H2", cls: "font-display text-[2rem] leading-[1.12] tracking-[-0.025em]", spec: "Space Grotesk 600 · 34px/1.12 · -2.5%", t: "O gargalo quase nunca é a placa" },
  { n: "H3", cls: "font-display text-[1.375rem] leading-[1.25] tracking-[-0.015em]", spec: "Space Grotesk 600 · 22px/1.25", t: "Otimização completa de PC" },
  { n: "Corpo", cls: "text-base leading-[1.65] text-ink-2", spec: "Inter 400 · 16px/1.65 · máx. 68ch", t: "Otimização remota que ataca a causa real da queda de FPS, com medição antes e depois." },
  { n: "Pequeno", cls: "text-sm leading-[1.6] text-ink-3", spec: "Inter 400 · 14px/1.6", t: "Média de 312 atendimentos com medição completa." },
  { n: "Micro / mono", cls: "font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent", spec: "Mono 400 · 11px · +16% tracking", t: "SISTEMA ONLINE // FPS MÉDIO" },
];

function Swatch({ n, hex, use }: { n: string; hex: string; use: string }) {
  return (
    <div className="flex items-center gap-4 rounded-md border border-line bg-surface p-3.5">
      <div
        className="h-12 w-12 shrink-0 rounded-md border border-white/10"
        style={{ backgroundColor: hex }}
      />
      <div className="min-w-0">
        <div className="font-mono text-[0.8125rem] text-ink">{hex}</div>
        <div className="text-[0.8125rem] text-ink-2">--color-{n}</div>
        <div className="mt-0.5 text-xs leading-snug text-ink-3">{use}</div>
      </div>
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="design system"
        title={<>Guia de estilo <span className="text-accent">UsantoosFps</span></>}
        lead="Tokens, tipografia, espaçamento, componentes e regras de movimento. Esta página é gerada pelos mesmos componentes do site — se ela está certa, o site está certo."
      />

      {/* -------------------- CORES */}
      <Section id="cores">
        <SectionHead
          eyebrow="01 · cor"
          title="Base neutra fria + um único acento."
          lead="A regra: verde é reservado para ação e para dado. Se tudo brilha, nada chama atenção — e o site vira 'gamer genérico'."
        />
        <div className="grid gap-8">
          {COLORS.map((g) => (
            <div key={g.g}>
              <h3 className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-3">{g.g}</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {g.items.map((c) => <Swatch key={c.n} {...c} />)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="mb-3 font-display text-base font-semibold text-accent">Faça</h3>
            <CheckList dense items={[
              "Verde só em CTA primário, número-chave, estado ativo e ícone de confirmação",
              "Gráficos: cinza #52525B para 'antes', verde para 'depois'",
              "Fundo escuro com cards um degrau mais claros — hierarquia por elevação, não por borda colorida",
              "Contraste mínimo de 4.5:1 para qualquer texto",
            ]} />
          </div>
          <div className="card p-6">
            <h3 className="mb-3 font-display text-base font-semibold text-ink-3">Não faça</h3>
            <ul className="grid gap-2.5">
              {[
                "Segunda cor de destaque (roxo, azul, laranja) competindo com o verde",
                "Gradiente colorido em texto de corpo ou em fundo de seção inteira",
                "Preto puro #000 — achata a hierarquia e cansa a leitura",
                "Neon com brilho pulsante contínuo; o glow é estático e sutil",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-3">
                  <Icon name="x" size={16} className="mt-1 shrink-0 text-ink-3/60" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* -------------------- TIPOGRAFIA */}
      <Section id="tipografia" tone="raised">
        <SectionHead
          eyebrow="02 · tipografia"
          title="Space Grotesk para títulos, Inter para leitura."
          lead="Space Grotesk tem desenho técnico e ótima presença em tamanho grande. Inter é a mais legível em corpo pequeno no escuro. Mono só para rótulos e números."
        />
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line">
          {TYPE.map((t) => (
            <div key={t.n} className="grid gap-4 bg-surface p-6 md:grid-cols-[10rem_1fr] md:items-baseline">
              <div>
                <div className="text-sm font-medium text-ink">{t.n}</div>
                <div className="mt-1 font-mono text-[0.6875rem] leading-relaxed text-ink-3">{t.spec}</div>
              </div>
              <div className={t.cls}>{t.t}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* -------------------- ESPAÇAMENTO */}
      <Section id="espacamento">
        <SectionHead
          eyebrow="03 · grid e espaçamento"
          title="Base 4px. Container de 1200px. Respiro grande entre seções."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h3 className="mb-4 font-display text-base font-semibold">Escala de espaço</h3>
            <div className="grid gap-2.5">
              {[
                { t: "4 / 8 px", u: "Gap dentro de um componente (ícone ↔ texto)" },
                { t: "12 / 16 px", u: "Padding interno de badge, input e célula" },
                { t: "24 / 28 px", u: "Padding de card" },
                { t: "40 / 56 px", u: "Gap entre blocos dentro de uma seção" },
                { t: "80 / 112 px", u: "Padding vertical de seção (mobile / desktop)" },
              ].map((s) => (
                <div key={s.t} className="flex items-center gap-4">
                  <span className="w-20 shrink-0 font-mono text-xs text-accent">{s.t}</span>
                  <span className="text-[0.875rem] text-ink-2">{s.u}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <h3 className="mb-4 font-display text-base font-semibold">Grid e raio</h3>
            <div className="grid gap-2.5 text-[0.875rem] text-ink-2">
              {[
                "Container: 1200px máx., 20px de padding lateral",
                "Colunas: 12 no desktop, 6 no tablet, 4 no mobile",
                "Breakpoints: 640 / 768 / 1024 / 1280 px",
                "Raio: 4 (micro) · 8 (input) · 12 (bloco) · 18 (card, botão) · pill (badge)",
                "Largura máxima de texto corrido: 68 caracteres",
                "Borda padrão: 1px sólido, nunca 2px em card",
              ].map((t) => (
                <div key={t} className="flex gap-3">
                  <Icon name="minus" size={14} className="mt-1.5 shrink-0 text-line" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* -------------------- COMPONENTES */}
      <Section id="componentes" tone="raised">
        <SectionHead
          eyebrow="04 · componentes"
          title="Biblioteca reutilizável."
          lead="Todos os componentes abaixo são os mesmos usados nas 13 páginas — nada é redesenhado por página."
        />

        <div className="grid gap-6">
          <div className="card p-7">
            <h3 className="mb-5 font-display text-base font-semibold">Botões</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="#" icon="arrow">Primário</Button>
              <Button href="#" variant="ghost" icon="gauge">Secundário</Button>
              <Button href="#" variant="quiet" icon="arrow">Terciário</Button>
              <Button href="#" size="lg" icon="whatsapp">Primário grande</Button>
            </div>
            <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-3">
              Altura 44px (md) e 56px (lg), raio 18px, transição de 150ms e recuo de escala
              no clique. Um único botão primário por bloco visível.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="card p-7">
              <h3 className="mb-5 font-display text-base font-semibold">Badges, estrelas e métrica</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Badge>Neutro</Badge>
                <Badge tone="accent">Destaque</Badge>
                <Stars n={5} />
              </div>
              <div className="mt-6">
                <StatBlock value="+42%" label="FPS médio ganho" note="média de 312 atendimentos" />
              </div>
            </div>

            <div className="card p-7">
              <h3 className="mb-5 font-display text-base font-semibold">Gráfico antes/depois</h3>
              <DeltaBars compact metrics={[
                { label: "FPS médio", before: 130, after: 214, unit: "fps", better: "up" },
                { label: "Input lag", before: 44, after: 23, unit: "ms", better: "down" },
              ]} />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="card p-7">
              <h3 className="mb-5 font-display text-base font-semibold">Acordeão</h3>
              <Accordion defaultOpen={0} items={[
                { q: "É seguro dar acesso remoto?", a: "Você inicia a sessão, vê tudo na sua tela e encerra quando quiser." },
                { q: "Isso dá ban?", a: "Não. Só configurações nativas do sistema, do driver e do jogo." },
              ]} />
            </div>
            <div className="card p-7">
              <h3 className="mb-5 font-display text-base font-semibold">Depoimento</h3>
              <TestimonialCard t={TESTIMONIALS[0]} />
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-base font-semibold">Faixa de confiança</h3>
            <TrustStrip />
          </div>

          <div className="card p-7">
            <h3 className="mb-5 font-display text-base font-semibold">Ícones</h3>
            <div className="flex flex-wrap gap-3">
              {["cpu","target","chip","bolt","disk","broadcast","phone","refresh","shield","clock","lock","undo","gauge","file","users","wrench","calendar","mail","whatsapp","discord"].map((n) => (
                <span key={n} className="grid h-11 w-11 place-items-center rounded-md border border-line bg-surface text-accent" title={n}>
                  <Icon name={n} size={19} />
                </span>
              ))}
            </div>
            <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-3">
              Conjunto desenhado sob medida: traço de 1.5px, grid de 24px, cantos arredondados.
              Nada de biblioteca de ícone de estoque.
            </p>
          </div>
        </div>
      </Section>

      {/* -------------------- MOVIMENTO */}
      <Section id="movimento">
        <SectionHead
          eyebrow="05 · movimento"
          title="A interface precisa parecer que tem baixo input lag."
          lead="Coerência conceitual: um site que vende redução de latência não pode ter animação lenta e arrastada."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "150 ms", d: "Hover, foco e estado de botão. Curva ease-out agressiva (0.16, 1, 0.3, 1)." },
            { t: "250 ms", d: "Abertura de acordeão e menu mobile. Único movimento de layout permitido." },
            { t: "500 ms", d: "Entrada de bloco ao rolar: 14px de subida + fade. Uma vez só, nunca em loop." },
          ].map((m) => (
            <div key={m.t} className="card flex flex-col gap-2 p-6">
              <div className="font-display text-2xl tracking-tight text-accent">{m.t}</div>
              <p className="text-[0.875rem] leading-relaxed text-ink-2">{m.d}</p>
            </div>
          ))}
        </div>
        <div className="card mt-4 flex items-start gap-3.5 p-6">
          <Icon name="check" size={18} className="mt-0.5 shrink-0 text-accent" />
          <p className="text-[0.9375rem] leading-relaxed text-ink-2">
            Todo movimento é desligado sob <code className="font-mono text-accent">prefers-reduced-motion</code>.
            Nenhum elemento pisca, e nenhuma animação decorativa roda em loop infinito além da
            faixa de jogos — que pausa no hover.
          </p>
        </div>
      </Section>

      {/* -------------------- ACESSIBILIDADE */}
      <Section id="acessibilidade" tone="raised">
        <SectionHead eyebrow="06 · acessibilidade" title="Requisitos mínimos do sistema." />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card p-6">
            <CheckList dense items={[
              "Contraste AA em todo texto (ink-3 sobre surface = 4.6:1)",
              "Anel de foco visível em verde, offset de 3px",
              "Link 'pular para o conteúdo' antes do header",
              "Alvo de toque mínimo de 44×44px no mobile",
            ]} />
          </div>
          <div className="card p-6">
            <CheckList dense items={[
              "Hierarquia semântica: um h1 por página",
              "Gráficos com rótulo textual e valor escrito — cor nunca é o único código",
              "Acordeão com aria-expanded e navegável por teclado",
              "Fontes auto-hospedadas: sem dependência externa em runtime",
            ]} />
          </div>
        </div>
      </Section>
    </>
  );
}
