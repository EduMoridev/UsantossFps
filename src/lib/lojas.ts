// src/lib/lojas.ts
//
// Gerador de links de busca nas lojas.
//
// POR QUE BUSCA E NÃO LINK DE PRODUTO:
// link de SKU morre quando o estoque acaba ou o produto é substituído, e a página
// vira uma coleção de 404 — justamente numa página cujo propósito é ajudar. Link
// de busca nunca quebra e sempre mostra o preço real do dia.
//
// STATUS DE VERIFICAÇÃO DOS PADRÕES DE URL:
//   kabum        VERIFICADO  (padrão /busca/<slug> confirmado em URL real)
//   mercadolivre PROVÁVEL    (padrão consolidado, confira uma vez)
//   pichau       NÃO VERIFICADO  <- confira antes de publicar
//   terabyte     NÃO VERIFICADO  <- confira antes de publicar
//
// COMO VERIFICAR (2 minutos): abra a loja, busque "ryzen 5 5600", copie a URL da
// barra de endereço e compare com o padrão abaixo. Se divergir, corrija A FUNÇÃO —
// todos os links do site se ajustam de uma vez.

export type LojaId = "kabum" | "pichau" | "terabyte" | "mercadolivre";

export interface Loja {
  id: LojaId;
  nome: string;
  /** Monta a URL de busca para um termo. */
  buscar: (termo: string) => string;
  /** false = padrão de URL ainda não conferido manualmente. */
  urlVerificada: boolean;
}

/** "Ryzen 5 5600" -> "ryzen-5-5600" */
function slug(termo: string): string {
  return termo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const LOJAS: Loja[] = [
  {
    id: "kabum",
    nome: "KaBuM!",
    buscar: (t) => `https://www.kabum.com.br/busca/${slug(t)}`,
    urlVerificada: true,
  },
  {
    id: "pichau",
    nome: "Pichau",
    // TODO: CONFERIR o padrão real antes de publicar.
    buscar: (t) => `https://www.pichau.com.br/search?q=${encodeURIComponent(t)}`,
    urlVerificada: false,
  },
  {
    id: "terabyte",
    nome: "Terabyte",
    // TODO: CONFERIR o padrão real antes de publicar.
    buscar: (t) =>
      `https://www.terabyteshop.com.br/busca?str=${encodeURIComponent(t)}`,
    urlVerificada: false,
  },
  {
    id: "mercadolivre",
    nome: "Mercado Livre",
    buscar: (t) => `https://lista.mercadolivre.com.br/${slug(t)}`,
    urlVerificada: false,
  },
];

/**
 * Afiliados. Se o cliente aderir a algum programa, preencha aqui.
 * Quando houver QUALQUER parâmetro de afiliado ativo, a página é obrigada a
 * informar isso ao usuário — omitir destrói a confiança que o resto do site
 * constrói, e no Brasil a transparência em publicidade é exigida pelo CDC.
 */
export const AFILIADOS: Partial<Record<LojaId, string>> = {
  // kabum: "?utm_source=afiliado&tag=SEU_ID",
};

export const TEM_AFILIADO = Object.keys(AFILIADOS).length > 0;

/** URL final de busca, já com parâmetro de afiliado se existir. */
export function linkLoja(lojaId: LojaId, termo: string): string {
  const loja = LOJAS.find((l) => l.id === lojaId);
  if (!loja) throw new Error(`Loja desconhecida: ${lojaId}`);

  const base = loja.buscar(termo);
  const sufixo = AFILIADOS[lojaId];
  if (!sufixo) return base;

  return base.includes("?")
    ? `${base}&${sufixo.replace(/^\?/, "")}`
    : `${base}${sufixo}`;
}

/** Todos os links de uma peça, prontos para renderizar. */
export function linksDaPeca(termo: string) {
  return LOJAS.map((loja) => ({
    id: loja.id,
    nome: loja.nome,
    url: linkLoja(loja.id, termo),
    urlVerificada: loja.urlVerificada,
  }));
}
