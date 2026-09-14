"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode, Ref } from "react";
import { Button as HeroButton, Chip } from "@heroui/react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

/* ---------------------------------------------------------- BOTÃO
   Wrapper fino sobre o Button da HeroUI: pegamos motor de estados
   (hover/press/focus, a11y) da lib e só troca o elemento renderizado
   para <Link>/<a>, já que todo botão daqui é navegação. 3 variantes
   próprias mapeadas para as variantes semânticas da HeroUI. */
type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "quiet";
  size?: "md" | "lg";
  icon?: string;
  external?: boolean;
  className?: string;
};

const VARIANT_MAP = { primary: "primary", ghost: "outline", quiet: "ghost" } as const;
const VARIANT_CLS = {
  primary: "bg-accent text-[#052e16] font-semibold hover:bg-accent-soft hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.6)]",
  ghost: "glass border-line/70 text-ink hover:border-accent/50 hover:bg-accent/[0.08] hover:text-accent",
  quiet: "h-auto border-0 bg-transparent px-0 text-ink-2 hover:bg-transparent hover:text-accent",
};

export function Button({
  href, children, variant = "primary", size = "md", icon, external, className = "",
}: BtnProps) {
  const isExternal = external || href.startsWith("http");

  return (
    <HeroButton
      variant={VARIANT_MAP[variant]}
      size={size}
      className={`group !rounded-lg font-medium whitespace-nowrap ${VARIANT_CLS[variant]} ${className}`}
      render={(props) => {
        // A HeroUI/react-aria tipa `render` para o elemento raiz padrão
        // (<button>), mas aqui ele sempre vira navegação (<a>/<Link>) —
        // o cast reflete isso; os handlers e o ref continuam repassados.
        const linkProps = props as unknown as AnchorHTMLAttributes<HTMLAnchorElement> & {
          ref?: Ref<HTMLAnchorElement>;
        };
        return isExternal ? (
          <a href={href} target="_blank" rel="noopener noreferrer" {...linkProps} />
        ) : (
          <Link href={href} {...linkProps} />
        );
      }}
    >
      {children}
      {icon && (
        <Icon
          name={icon}
          size={17}
          className="transition-transform duration-150 group-hover:translate-x-0.5"
        />
      )}
    </HeroButton>
  );
}

/* ---------------------------------------------------------- EYEBROW */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-px w-6 bg-accent/60" />
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent">
        {children}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------- SEÇÃO */
export function Section({
  children, className = "", id, tone = "base",
}: { children: ReactNode; className?: string; id?: string; tone?: "base" | "raised" | "void" }) {
  const bg = { base: "", raised: "bg-surface/40", void: "bg-void" }[tone];
  return (
    <section id={id} className={`border-t border-line-soft py-20 md:py-28 ${bg} ${className}`}>
      <div className="container-fl">{children}</div>
    </section>
  );
}

/* ---------------------------------------------------------- CABEÇALHO DE SEÇÃO */
export function SectionHead({
  eyebrow, title, lead, align = "left", action,
}: { eyebrow?: string; title: ReactNode; lead?: ReactNode; align?: "left" | "center"; action?: ReactNode }) {
  return (
    <Reveal
      className={`mb-12 flex flex-col gap-5 md:mb-16 ${
        align === "center" ? "items-center text-center" : ""
      } ${action ? "md:flex-row md:items-end md:justify-between" : ""}`}
    >
      <div className={`flex flex-col gap-4 ${align === "center" ? "items-center" : ""} max-w-2xl`}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="text-[2rem] leading-[1.1] tracking-[-0.025em] md:text-h2">{title}</h2>
        {lead && <p className="text-ink-2 md:text-lg">{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}

/* ---------------------------------------------------------- BADGE */
export function Badge({
  children, tone = "line", glass = false,
}: { children: ReactNode; tone?: "line" | "accent"; glass?: boolean }) {
  return (
    <Chip
      size="sm"
      variant={tone === "accent" ? "soft" : "secondary"}
      color={tone === "accent" ? "accent" : "default"}
      className={`whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.1em] sm:text-[0.6875rem] sm:tracking-[0.12em] ${
        glass ? "backdrop-blur-md backdrop-saturate-150" : ""
      }`}
    >
      {children}
    </Chip>
  );
}

/* ---------------------------------------------------------- ESTRELAS */
export function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5 text-accent" aria-label={`${n} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="star"
          size={13}
          className={i < n ? "fill-accent/25" : "opacity-25"}
        />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------- LISTA DE CHECK */
export function CheckList({ items, dense = false }: { items: string[]; dense?: boolean }) {
  return (
    <ul className={`grid gap-${dense ? "2.5" : "3.5"}`}>
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
          <Icon name="check" size={17} className="mt-1 shrink-0 text-accent" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------- MÉTRICA GRANDE */
export function StatBlock({
  value, label, note,
}: { value: string; label: string; note?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="font-display text-[2.5rem] leading-none tracking-[-0.04em] text-accent md:text-[3rem]">
        {value}
      </div>
      <div className="text-sm font-medium text-ink">{label}</div>
      {note && <div className="text-xs text-ink-3">{note}</div>}
    </div>
  );
}
