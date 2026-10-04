"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "motion/react";
import { useMotionBudget } from "@/lib/motion/budget";
import { usePageVisible } from "@/lib/motion/usePageVisible";

/* Spotlight que segue o cursor — só existe em desktop com orçamento
   "full". Nunca causa re-render do React: a posição crua é throttlada
   a 1x/frame via rAF, suavizada por uma spring (useMotionValue +
   useSpring) e escrita direto em custom properties CSS (--mx/--my) no
   próprio nó do DOM. */
function MouseSpotlight() {
  const budget = useMotionBudget();
  const visible = usePageVisible();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 150, damping: 25 });
  const springY = useSpring(my, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const el = ref.current;
    if (!el || budget !== "full" || !visible) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;

    const applyPending = () => {
      rafId = 0;
      mx.set(pendingX);
      my.set(pendingY);
    };

    const handlePointerMove = (e: PointerEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(applyPending);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    const unsubX = springX.on("change", (v) => el.style.setProperty("--mx", `${v}px`));
    const unsubY = springY.on("change", (v) => el.style.setProperty("--my", `${v}px`));

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId) cancelAnimationFrame(rafId);
      unsubX();
      unsubY();
    };
  }, [budget, visible, mx, my, springX, springY]);

  if (budget !== "full") return null;

  return (
    <div
      ref={ref}
      className="absolute inset-0"
      style={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--mx" as any]: "50%",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--my" as any]: "50%",
        backgroundImage:
          "radial-gradient(600px circle at var(--mx) var(--my), color-mix(in oklab, var(--color-accent) 8%, transparent), transparent 80%)",
      }}
    />
  );
}

/* Fundo global do site — uma única instância, fixa atrás de todo o
   conteúdo. Camadas de trás pra frente: base sólida, grade técnica,
   brilho ambiente (blobs derivando via CSS, pausados em lite/off pelo
   atributo data-motion no <html>), spotlight do mouse (só "full" +
   pointer:fine) e grão estático. Tudo visível por padrão no HTML do
   servidor — só a animação e o spotlight dependem de JS. */
export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <div className="absolute inset-0 bg-base" />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--color-accent) 4%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-accent) 4%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 75% 70% at 50% 35%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 50% 35%, black 40%, transparent 100%)",
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
      </div>

      <MouseSpotlight />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
