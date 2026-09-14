"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Entrada sutil ao rolar, via IntersectionObserver nativo — sem lib
   externa. dir controla de onde o elemento surge: "up" (padrão, baixo
   pra cima), "left" ou "right" (lateral).

   Crítico para SSR: o estado inicial é SEMPRE visível (é o que o
   servidor renderiza). A classe que oculta o elemento só é ligada
   dentro de um efeito — ou seja, só existe depois que o componente
   monta no navegador. Se o JS falhar ou não rodar, o HTML do servidor
   já está visível e nada quebra. Usamos useLayoutEffect (síncrono,
   antes do paint) para essa troca não gerar um flash visível de
   conteúdo aparecendo e sumindo antes de revelar de verdade. */

type Direction = "up" | "left" | "right";

const HIDDEN_OFFSET: Record<Direction, string> = {
  up: "translate-y-3.5",
  left: "-translate-x-8",
  right: "translate-x-8",
};

// useLayoutEffect gera warning no SSR ("does nothing on the server");
// como este componente só roda no cliente, cai para useEffect lá,
// evitando o aviso sem perder o benefício (trocar de estado antes do paint).
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Reveal({
  children,
  delay = 0,
  dir = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  dir?: Direction;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Só passa a existir "estado oculto" depois que o componente montou —
  // é essa troca que fica de fora do HTML gerado no servidor.
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    setArmed(true);

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setVisible(true);
          observer.unobserve(entry.target); // revela uma única vez
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden = armed && !visible;

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        hidden ? cn("opacity-0", HIDDEN_OFFSET[dir]) : "opacity-100 translate-x-0 translate-y-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
