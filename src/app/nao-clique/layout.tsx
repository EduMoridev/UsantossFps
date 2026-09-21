import type { Metadata } from "next";

/* Layout próprio desta rota: existe principalmente porque `metadata` só
   pode ser exportado de Server Component, e a página em si precisa ser
   Client Component (ouve a tecla Escape). noindex aqui de propósito — é
   um easter egg de estilo "tela de erro", não algo que deveria aparecer
   numa busca por "usantoosfps" ou ser o primeiro contato de alguém com a
   marca. */
export const metadata: Metadata = {
  title: "Alerta de configuração",
  robots: { index: false },
};

export default function NaoCliqueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
