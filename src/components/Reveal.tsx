"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* Entrada sutil ao rolar. 600ms, uma única vez, respeita reduced-motion.
   dir controla de onde o elemento surge: "up" (padrão, baixo pra cima),
   "left" ou "right" (lateral) — misturar direções dá ritmo à página. */
export function Reveal({
  children, delay = 0, className = "", dir = "up",
}: { children: ReactNode; delay?: number; className?: string; dir?: "up" | "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.animationDelay = `${delay}ms`;
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const dirCls = dir === "left" ? "reveal-left" : dir === "right" ? "reveal-right" : "";

  return (
    <div ref={ref} className={`reveal ${dirCls} ${className}`}>
      {children}
    </div>
  );
}
