import { DEPOIMENTOS, type Depoimento } from "@/lib/testimonials";
import { Icon } from "./Icon";
import { Badge } from "./UI";

const APROVADOS = DEPOIMENTOS.filter((d) => d.consentimento);

/* Marquee com poucos itens repete cedo demais e parece vazio — abaixo
   desse número a seção vira grade estática em vez de rolagem. */
const MIN_PARA_MARQUEE = 5;
const USA_MARQUEE = APROVADOS.length >= MIN_PARA_MARQUEE;

const COLUMN_A = APROVADOS.filter((_, i) => i % 2 === 0);
const COLUMN_B = APROVADOS.filter((_, i) => i % 2 === 1);
const MOBILE_VISIBLE = APROVADOS.slice(0, 4);
const MOBILE_HIDDEN = APROVADOS.slice(4);

function iniciais(nick: string) {
  const letras = nick.replace(/[^a-zA-Z]/g, "");
  const base = letras.length >= 2 ? letras : nick;
  return base.slice(0, 2).toUpperCase();
}

function selo({ fpsAntes, fpsDepois }: Depoimento) {
  if (fpsAntes && fpsDepois) return `${fpsAntes} → ${fpsDepois} FPS`;
  if (fpsDepois) return `${fpsDepois} FPS`;
  return undefined;
}

function TestimonialContent({ d, glow = false }: { d: Depoimento; glow?: boolean }) {
  const fpsSelo = selo(d);
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{d.origem}</Badge>
        {d.plano && <Badge tone="accent">{d.plano}</Badge>}
      </div>
      <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-ink-2">
        &ldquo;{d.text}&rdquo;
      </blockquote>
      {fpsSelo && (
        <div>
          <div
            className={`w-fit rounded-full border border-accent/30 bg-accent/[0.07] px-3 py-1 font-mono text-[0.6875rem] tracking-[0.06em] text-accent ${
              glow ? "testimonial-badge" : ""
            }`}
          >
            {fpsSelo}
          </div>
          {d.contexto && (
            <div className="mt-1.5 text-xs text-ink-3">{d.contexto}</div>
          )}
        </div>
      )}
      {!fpsSelo && d.contexto && (
        <div className="text-xs text-ink-3">{d.contexto}</div>
      )}
      <figcaption className="flex items-center gap-3 border-t border-line-soft pt-4">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface-2 font-display text-xs font-semibold text-accent">
          {iniciais(d.nick)}
        </div>
        <div className="min-w-0 truncate text-sm font-medium text-ink">
          @{d.nick}
        </div>
      </figcaption>
    </>
  );
}

/* Card usado dentro da marquee: precisa da classe .testimonial-card
   (hover com scale + borda + esmaecimento dos vizinhos, tudo via CSS
   em globals.css) e do brilho no selo. tabIndex nos itens reais (não
   nos duplicados) é o que permite pausar a rolagem com o teclado —
   sem nenhum elemento focável dentro, :focus-within nunca dispararia. */
function MarqueeCard({
  d, ariaHidden = false, focusable = false,
}: { d: Depoimento; ariaHidden?: boolean; focusable?: boolean }) {
  return (
    <figure
      className="testimonial-card flex flex-col gap-4 rounded-lg border border-line bg-surface p-5"
      aria-hidden={ariaHidden || undefined}
      tabIndex={focusable ? 0 : undefined}
    >
      <TestimonialContent d={d} glow />
    </figure>
  );
}

/* Usado na grade estática (prefers-reduced-motion, <5 aprovados e
   lista mobile) — mesmo tratamento de card do resto do site, sem os
   efeitos exclusivos da marquee (que dependem da rolagem contínua). */
function StaticCard({ d }: { d: Depoimento }) {
  return (
    <figure className="card card-hover flex flex-col gap-4 p-5">
      <TestimonialContent d={d} />
    </figure>
  );
}

function MarqueeColumn({ items, direction }: { items: Depoimento[]; direction: "up" | "down" }) {
  return (
    <div className="testimonials-column h-[34rem]">
      <div className={`testimonials-track testimonials-track--${direction} flex flex-col gap-4`}>
        {items.map((d) => (
          <MarqueeCard key={d.id} d={d} focusable />
        ))}
        {/* Duplicata pro loop contínuo — invisível para leitor de tela e teclado */}
        {items.map((d) => (
          <MarqueeCard key={`${d.id}-dup`} d={d} ariaHidden />
        ))}
      </div>
    </div>
  );
}

/* Substitui os cards estáticos de depoimento por uma marquee de duas
   colunas — sem JS, só CSS (classes .testimonials-* em globals.css:
   animação de translateY, pausa em hover/focus-within, destaque de
   card via :has(), máscara de fade). Só entra em cena com pelo menos
   MIN_PARA_MARQUEE itens aprovados; abaixo disso cai pra grade.

   Três blocos cobrem os três estados possíveis, cada um exibido só
   por combinação de breakpoint + prefers-reduced-motion via Tailwind
   (md: + motion-safe:/motion-reduce:) — nunca mais de um visível ao
   mesmo tempo:
   1. Marquee (desktop, movimento permitido)
   2. Grade estática de 3 colunas (desktop, prefers-reduced-motion)
   3. Lista única com "Ver mais" (mobile, qualquer preferência) */
export function TestimonialsMarquee() {
  if (APROVADOS.length === 0) return null;

  return (
    <div>
      {USA_MARQUEE ? (
        <>
          <div className="hidden gap-4 md:motion-safe:grid md:grid-cols-2">
            <MarqueeColumn items={COLUMN_A} direction="up" />
            <MarqueeColumn items={COLUMN_B} direction="down" />
          </div>

          <div className="hidden gap-4 md:motion-reduce:grid md:grid-cols-3">
            {APROVADOS.map((d) => (
              <StaticCard key={d.id} d={d} />
            ))}
          </div>
        </>
      ) : (
        <div className="hidden gap-4 md:grid md:grid-cols-3">
          {APROVADOS.map((d) => (
            <StaticCard key={d.id} d={d} />
          ))}
        </div>
      )}

      <div className="grid gap-4 md:hidden">
        {MOBILE_VISIBLE.map((d) => (
          <StaticCard key={d.id} d={d} />
        ))}
        {MOBILE_HIDDEN.length > 0 && (
          <details className="testimonials-expand">
            <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink-2 marker:content-none transition-colors duration-150 hover:border-accent/45 hover:text-accent [&::-webkit-details-marker]:hidden">
              Ver mais
              <Icon name="chevronDown" size={16} className="testimonials-expand-icon" />
            </summary>
            <div className="testimonials-expand-body">
              <div className="grid gap-4 pt-4">
                {MOBILE_HIDDEN.map((d) => (
                  <StaticCard key={d.id} d={d} />
                ))}
              </div>
            </div>
          </details>
        )}
      </div>

      <p className="mt-6 text-xs text-ink-3">
        Resultados informados pelos próprios clientes. O ganho varia conforme o
        hardware, o jogo e a configuração de cada PC.
      </p>
    </div>
  );
}
