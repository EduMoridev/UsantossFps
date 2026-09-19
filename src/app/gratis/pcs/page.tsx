import type { Metadata } from "next";
import { Button, Eyebrow, Section } from "@/components/UI";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { PcsExplorer } from "@/components/PcsExplorer";
import { CONFIGS, CONTAGEM_CONFIGS } from "@/lib/pcs";
import { TEM_AFILIADO } from "@/lib/lojas";

export const metadata: Metadata = {
  title: "Montagens de PC prontas",
  description:
    "Sete configurações de PC gamer por faixa de uso, com peças, faixa de preço e links de busca nas lojas — pontos de partida, não veredito final.",
};

/* A página não pode ir ao ar com faixa de preço não pesquisada, mas essa
   regra é aplicada em dois lugares diferentes de propósito:
   - em produção, scripts/check-pcs.mjs falha o `npm run build` antes de
     este módulo sequer ser importado (ver prebuild em package.json);
   - em desenvolvimento, NÃO lançamos erro aqui — travar o `next dev`
     inteiro por causa de um preço que ainda não foi pesquisado torna a
     tela branca de erro em vez de deixar o resto da página navegável.
   Em vez disso, calculamos a lista uma vez (em build/servidor, nunca no
   cliente) e usamos para: (1) o banner "MODO DEV" abaixo e (2) marcar
   cada peça com `semFaixa`, para o card trocar "R$ 0 – R$ 0" por
   "faixa não pesquisada" sem precisar checar isso de novo no navegador. */
const pendentes = CONFIGS.flatMap((c) =>
  c.pecas
    .filter((p) => p.faixaMin === 0 || p.faixaMax === 0)
    .map((p) => ({ configId: c.id, configNome: c.nome, pecaNome: p.nome })),
);

/* "Desatualizado" é calculado uma única vez, em build, e embutido no
   HTML estático — nunca recalculado no cliente. Recalcular com
   `new Date()` dentro do componente causaria divergência entre o que o
   servidor gerou no build e o que o navegador computa meses depois,
   quebrando a hidratação num site que fica no ar sem rebuild. */
const DIAS_LIMITE = 30;
const buildDate = new Date();
const CONFIGS_COM_META = CONFIGS.map((c) => {
  const verificado = new Date(`${c.verificadoEm}T00:00:00Z`);
  const diasDesdeVerificacao = Math.floor(
    (buildDate.getTime() - verificado.getTime()) / 86_400_000,
  );
  const pecas = c.pecas.map((p) => ({
    ...p,
    semFaixa: p.faixaMin === 0 || p.faixaMax === 0,
  }));
  const estimadas = pecas.filter((p) => p.baseFaixa === "estimado").length;
  return {
    ...c,
    pecas,
    desatualizado: diasDesdeVerificacao > DIAS_LIMITE,
    investimentoOmitido: pecas.some((p) => p.semFaixa),
    maioriaEstimada: estimadas > pecas.length / 2,
  };
});

/* Banner âmbar, só em dev, listando o que falta preencher. Não usa
   `<details>` controlado por estado — é <details> nativo, então nada
   disto roda como verificação no cliente: o servidor já decidiu o que
   mostrar antes de mandar o HTML. */
function BannerModoDev({
  pendentes,
}: {
  pendentes: { configId: string; configNome: string; pecaNome: string }[];
}) {
  if (process.env.NODE_ENV === "production" || pendentes.length === 0) return null;

  const porConfig = new Map<string, { configNome: string; pecas: string[] }>();
  for (const p of pendentes) {
    if (!porConfig.has(p.configId)) porConfig.set(p.configId, { configNome: p.configNome, pecas: [] });
    porConfig.get(p.configId)!.pecas.push(p.pecaNome);
  }

  return (
    <div className="container-fl pt-6">
      <details
        open
        className="rounded-lg border-2 border-amber-500/70 bg-amber-500/10 px-4 py-3.5 text-amber-100"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-mono text-[0.75rem] font-bold uppercase tracking-[0.14em] text-amber-300 marker:content-none [&::-webkit-details-marker]:hidden">
          <span>
            MODO DEV — {pendentes.length} peça{pendentes.length > 1 ? "s" : ""} sem faixa de preço
          </span>
          <Icon name="chevronDown" size={14} className="shrink-0" />
        </summary>
        <div className="mt-3 flex flex-col gap-3 border-t border-amber-500/30 pt-3 text-[0.8125rem] leading-relaxed">
          <p className="text-amber-100/90">
            Em produção o build falha por causa disso (scripts/check-pcs.mjs) — aqui em dev a página
            só avisa. Preencha faixaMin/faixaMax em src/lib/pcs.ts:
          </p>
          {[...porConfig.entries()].map(([configId, { configNome, pecas }]) => (
            <div key={configId}>
              <p className="font-medium text-amber-200">
                {configNome}{" "}
                <span className="font-mono text-[0.6875rem] text-amber-300/70">({configId})</span>
              </p>
              <ul className="mt-1 list-disc pl-5 text-amber-100/80">
                {pecas.map((nome) => (
                  <li key={nome}>{nome}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Montagens de PC gamer recomendadas pela UsantossFps",
  numberOfItems: CONTAGEM_CONFIGS,
  itemListElement: CONFIGS.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.nome,
    description: c.publico,
  })),
};

export default function GratisPcsPage() {
  return (
    <>
      <BannerModoDev pendentes={pendentes} />

      {/* ---------------- Hero: a trilha do layout já limpou o header */}
      <section className="relative overflow-hidden pb-10 pt-12 md:pb-12 md:pt-16">
        <div className="grid-tech pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000,transparent)]" />
        <div className="container-fl relative">
          <Reveal className="flex max-w-3xl flex-col gap-6">
            <Eyebrow>montagens</Eyebrow>
            <h1 className="text-[2.5rem] leading-[1.05] tracking-[-0.035em] md:text-h1">
              {CONTAGEM_CONFIGS} configurações de PC gamer,
              <br />
              por faixa de uso e orçamento.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
              São pontos de partida, não verdade absoluta. O preço de cada peça oscila muito de uma
              semana para outra, e memória RAM e SSD atravessam uma escassez global que empurra os
              valores para cima sem aviso — confira sempre o preço atual na loja antes de comprar.
            </p>
          </Reveal>

          <Reveal className="mt-8 grid gap-3 sm:grid-cols-2" delay={80}>
            <div className="flex items-start gap-3 rounded-md border border-line bg-surface-2 px-4 py-3.5 text-[0.8125rem] leading-relaxed text-ink-2">
              <Icon name="shield" size={16} className="mt-0.5 shrink-0 text-accent" />
              <span>
                {TEM_AFILIADO
                  ? "Alguns links abaixo são de afiliado — isso não muda o preço que você paga, só nos dá uma comissão da loja."
                  : "Não vendemos peças e não recebemos por indicação. Os links levam direto à busca da loja."}
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-md border border-line bg-surface-2 px-4 py-3.5 text-[0.8125rem] leading-relaxed text-ink-2">
              <Icon name="search" size={16} className="mt-0.5 shrink-0 text-accent" />
              <span>
                Cada link abre a busca da loja, não um produto específico — estoque e preço mudam
                todo dia, e link de produto quebra quando o item sai de linha.
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container-fl pb-14 md:pb-20">
        <PcsExplorer configs={CONFIGS_COM_META} />
        <p className="mt-8 text-[0.75rem] leading-relaxed text-ink-3">
          <span aria-hidden="true">*</span> faixa estimada — aproximação ainda não confirmada em
          fonte de preço; peças sem o marcador já foram pesquisadas.
        </p>
      </div>

      <Section tone="raised">
        <Reveal className="flex flex-col items-start gap-4">
          <h2 className="text-[1.5rem] font-semibold leading-snug text-ink md:text-[1.75rem]">
            Montou e quer tirar o máximo dela?
          </h2>
          <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2">
            Hardware novo com o Windows padrão de fábrica ainda deixa desempenho na mesa. Otimizo o
            sistema inteiro para o seu PC novo render o que ele realmente pode.
          </p>
          <Button href="/planos" variant="quiet" icon="arrow">
            Ver os planos completos
          </Button>
        </Reveal>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </>
  );
}
