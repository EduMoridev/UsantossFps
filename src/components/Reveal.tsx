"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { ScrollRevealObject } from "scrollreveal";

/* Entrada sutil ao rolar, via ScrollReveal.js (scrollrevealjs.org).
   dir controla de onde o elemento surge: "up" (padrão, baixo pra cima),
   "left" ou "right" (lateral) — misturar direções dá ritmo à página.
   A lib toca DOM/window, então só é importada dentro do useEffect
   (client-only) — um import estático quebraria o SSR. */
const ORIGIN = { up: "bottom", left: "left", right: "right" } as const;

/* ScrollReveal calcula visibilidade dentro de um requestAnimationFrame.
   Se a página carregar com a aba em segundo plano (restaurada pelo
   navegador, aberta sem foco etc.), o navegador suspende o rAF e o
   cálculo inicial nunca roda — nem os listeners de scroll/resize chegam
   a ser registrados, então o conteúdo fica invisível para sempre, mesmo
   depois de focar a aba. Por isso, ao voltar o foco, forçamos um
   `sync()` (reavalia tudo do zero) uma única vez para todo o site. */
let srInstance: ScrollRevealObject | undefined;
let visibilityHookAttached = false;

function ensureVisibilitySync() {
  if (visibilityHookAttached) return;
  visibilityHookAttached = true;
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") srInstance?.sync();
  });
}

export function Reveal({
  children, delay = 0, className = "", dir = "up",
}: { children: ReactNode; delay?: number; className?: string; dir?: "up" | "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      return;
    }

    let cancelled = false;

    import("scrollreveal").then(({ default: ScrollReveal }) => {
      if (cancelled) return;
      srInstance = ScrollReveal();
      ensureVisibilitySync();
      srInstance.reveal(el, {
        delay,
        duration: 600,
        distance: dir === "up" ? "14px" : "32px",
        origin: ORIGIN[dir],
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        viewFactor: 0.12,
        viewOffset: { bottom: 60 },
        reset: false,
      });
    });

    return () => {
      cancelled = true;
      srInstance?.clean(el);
    };
  }, [delay, dir]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
