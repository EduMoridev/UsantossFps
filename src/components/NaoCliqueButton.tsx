import Link from "next/link";
import { Icon } from "./Icon";

/* Link de verdade (nunca modal): /nao-clique precisa ser uma rota própria
   para o botão "voltar" do navegador funcionar depois do easter egg.
   O pulso na borda é puramente decorativo (@keyframes escopado aqui) e já
   cai sob o `*, *::before, *::after { animation-duration: 0.01ms !important }`
   de src/app/globals.css sob prefers-reduced-motion — nenhum check extra
   é necessário aqui. */
export function NaoCliqueButton() {
  return (
    <>
      <Link
        href="/nao-clique"
        className="nao-clique-pulse inline-flex items-center gap-2 rounded-full border border-accent/50 px-4 py-2 text-[0.75rem] font-medium tracking-[0.02em] text-ink-3 transition-colors duration-150 hover:border-accent hover:text-accent"
      >
        <Icon name="flame" size={14} className="text-accent" />
        NÃO CLIQUE AQUI
      </Link>
      <style>{`
        @keyframes nao-clique-pulse-border {
          0%, 100% { border-color: color-mix(in oklab, var(--color-accent) 45%, transparent); }
          50% { border-color: color-mix(in oklab, var(--color-accent) 95%, transparent); }
        }
        .nao-clique-pulse {
          animation: nao-clique-pulse-border 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
