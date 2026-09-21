"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingCTA } from "./FloatingCTA";

/* Rotas que não usam a navbar/rodapé/CTA flutuante do site — hoje só o
   easter egg /nao-clique, que precisa parecer uma tela cheia própria (tipo
   tela de erro), não uma página do site com um card azul dentro. Preferido
   a mover todo o app/ para um route group só por causa de uma rota: aqui o
   layout raiz continua simples e esta é a única peça que sabe onde esconder
   o cromo do site. */
const ROTAS_SEM_CROMO = ["/nao-clique"];

export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const semCromo = ROTAS_SEM_CROMO.includes(pathname);

  if (semCromo) {
    return <main id="conteudo">{children}</main>;
  }

  return (
    <>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
