import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials";
import { Icon } from "./Icon";

const COLUMN_A = TESTIMONIALS.filter((_, i) => i % 2 === 0);
const COLUMN_B = TESTIMONIALS.filter((_, i) => i % 2 === 1);
const MOBILE_VISIBLE = TESTIMONIALS.slice(0, 4);
const MOBILE_HIDDEN = TESTIMONIALS.slice(4);

function TestimonialContent({ t, glow = false }: { t: Testimonial; glow?: boolean }) {
  return (
    <>
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-3">
        via {t.source}
      </span>
      <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-ink-2">
        &ldquo;{t.text}&rdquo;
      </blockquote>
      {t.badge && (
        <div
          className={`w-fit rounded-full border border-accent/30 bg-accent/[0.07] px-3 py-1 font-mono text-[0.6875rem] tracking-[0.06em] text-accent ${
            glow ? "testimonial-badge" : ""
          }`}
        >
          {t.badge}
        </div>
      )}
      <figcaption className="flex items-center gap-3 border-t border-line-soft pt-4">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface-2 font-display text-xs font-semibold text-accent">
          {t.initials}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-ink">{t.name}</div>
          <div className="truncate text-xs text-ink-3">{t.context}</div>
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
  t, ariaHidden = false, focusable = false,
}: { t: Testimonial; ariaHidden?: boolean; focusable?: boolean }) {
  return (
    <figure
      className="testimonial-card flex flex-col gap-4 rounded-lg border border-line bg-surface p-5"
      aria-hidden={ariaHidden || undefined}
      tabIndex={focusable ? 0 : undefined}
    >
      <TestimonialContent t={t} glow />
    </figure>
  );
}

/* Usado na grade estática (prefers-reduced-motion) e na lista mobile
   — mesmo tratamento de card do resto do site, sem os efeitos
   exclusivos da marquee (que dependem da rolagem contínua). */
function StaticCard({ t }: { t: Testimonial }) {
  return (
    <figure className="card card-hover flex flex-col gap-4 p-5">
      <TestimonialContent t={t} />
    </figure>
  );
}

function MarqueeColumn({ items, direction }: { items: Testimonial[]; direction: "up" | "down" }) {
  return (
    <div className="testimonials-column h-[34rem]">
      <div className={`testimonials-track testimonials-track--${direction} flex flex-col gap-4`}>
        {items.map((t) => (
          <MarqueeCard key={t.name} t={t} focusable />
        ))}
        {/* Duplicata pro loop contínuo — invisível para leitor de tela e teclado */}
        {items.map((t) => (
          <MarqueeCard key={`${t.name}-dup`} t={t} ariaHidden />
        ))}
      </div>
    </div>
  );
}

/* Substitui os 3 cards estáticos de depoimento por uma marquee de
   duas colunas — sem JS, só CSS (classes .testimonials-* em
   globals.css: animação de translateY, pausa em hover/focus-within,
   destaque de card via :has(), máscara de fade).

   Três blocos cobrem os três estados possíveis, cada um exibido só
   por combinação de breakpoint + prefers-reduced-motion via Tailwind
   (md: + motion-safe:/motion-reduce:) — nunca mais de um visível ao
   mesmo tempo:
   1. Marquee (desktop, movimento permitido)
   2. Grade estática de 3 colunas (desktop, prefers-reduced-motion)
   3. Lista única com "Ver mais" (mobile, qualquer preferência) */
export function TestimonialsMarquee() {
  return (
    <div>
      <div className="hidden gap-4 md:motion-safe:grid md:grid-cols-2">
        <MarqueeColumn items={COLUMN_A} direction="up" />
        <MarqueeColumn items={COLUMN_B} direction="down" />
      </div>

      <div className="hidden gap-4 md:motion-reduce:grid md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <StaticCard key={t.name} t={t} />
        ))}
      </div>

      <div className="grid gap-4 md:hidden">
        {MOBILE_VISIBLE.map((t) => (
          <StaticCard key={t.name} t={t} />
        ))}
        {MOBILE_HIDDEN.length > 0 && (
          <details className="testimonials-expand">
            <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink-2 marker:content-none transition-colors duration-150 hover:border-accent/45 hover:text-accent [&::-webkit-details-marker]:hidden">
              Ver mais
              <Icon name="chevronDown" size={16} className="testimonials-expand-icon" />
            </summary>
            <div className="testimonials-expand-body">
              <div className="grid gap-4 pt-4">
                {MOBILE_HIDDEN.map((t) => (
                  <StaticCard key={t.name} t={t} />
                ))}
              </div>
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
