"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/Icon";

/* Azul escopado só a esta página — não é o tema do site (verde sobre
   quase-preto), é a referência estética à tela de erro do Windows que a
   tarefa pede. #0f2a75 com texto branco passa de 13:1 de contraste
   (WCAG exige 4.5:1), bem acima do mínimo. */
const AZUL_ERRO = "#0f2a75";

export default function NaoCliquePage() {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <div
      className="nao-clique-fade flex min-h-screen flex-col items-center justify-center gap-5 px-6 py-16 text-center"
      style={{ backgroundColor: AZUL_ERRO }}
    >
      <div className="font-display text-[4rem] leading-none text-white sm:text-[6rem]" aria-hidden="true">
        :(
      </div>

      <div className="inline-flex items-center gap-2 rounded-md border border-amber-300/40 bg-amber-400/15 px-3 py-1.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-amber-100">
        <Icon name="shieldAlert" size={14} />
        SIMULAÇÃO // ALERTA DE CONFIGURAÇÃO
      </div>

      <h1 className="max-w-md text-balance text-[1.375rem] font-semibold leading-snug text-white sm:max-w-xl sm:text-[1.875rem]">
        Seu PC não precisa chegar nesse ponto.
      </h1>

      <p className="max-w-md text-[0.9375rem] leading-relaxed text-blue-100">
        Configurações inadequadas podem causar instabilidade, travamentos, temperaturas elevadas
        e perda de desempenho. Ajustes agressivos de tensão, clock ou ventilação feitos sem teste
        também podem aumentar o estresse sobre o hardware.
      </p>

      <p className="max-w-md text-[0.9375rem] font-semibold leading-relaxed text-white">
        Melhor opção: deixar o sistema alinhado, testado e configurado de acordo com o seu setup.
      </p>

      <div className="mt-3 flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/#planos"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-[#0f2a75] transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
        >
          ALINHAR MEU PC AGORA
        </Link>
        <Link
          href="/gratis/scripts"
          className="inline-flex h-12 items-center justify-center rounded-lg border border-white/50 px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/10"
        >
          QUERO SEGUIR POR CONTA PRÓPRIA
        </Link>
      </div>

      <p className="mt-10 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-blue-100/90">
        USFPS_CONFIG_WARNING // 0X0000FPS
      </p>

      <style>{`
        @keyframes nao-clique-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .nao-clique-fade {
          opacity: 0;
          animation: nao-clique-fade-in 550ms ease-out forwards;
        }
      `}</style>
    </div>
  );
}
