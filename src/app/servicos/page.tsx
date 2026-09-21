import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT, SERVICES } from "@/lib/site";
import { SERVICOS, type Servico } from "@/lib/servicos";
import { Badge, Section, SectionHead, Button } from "@/components/UI";
import { Reveal } from "@/components/Reveal";
import { CTABand, PageHero, ServiceCard, TrustStrip } from "@/components/Blocks";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Otimização completa, tuning por jogo, drivers e BIOS, input lag, formatação limpa, setup de live, otimização mobile, avulsos e cursos.",
};

const CELULAR = SERVICOS.filter((s) => s.categoria === "celular");
const AVULSOS = SERVICOS.filter((s) => s.categoria === "avulso");
const CURSOS = SERVICOS.filter((s) => s.categoria === "curso");

function formatBRL(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function waLinkServico(nome: string) {
  const msg = `Olá! Quero saber mais sobre "${nome}".`;
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
}

/* Cursos usam borda própria (não a utility `card`) de propósito: precisam
   ficar visualmente distintos dos serviços avulsos, e sobrepor a cor de
   borda de `card` via utility exigiria !important — mais simples partir de
   `border` puro, como já faz o card "featured" de /planos. */
function ServicoCard({ s }: { s: Servico }) {
  const isCurso = s.categoria === "curso";
  return (
    <div
      className={
        isCurso
          ? "flex h-full flex-col gap-4 rounded-lg border-2 border-accent/40 bg-surface p-6 transition-colors duration-150 hover:border-accent/70"
          : "card card-hover flex h-full flex-col gap-4 p-6"
      }
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[1.0625rem] font-semibold leading-snug text-ink">{s.nome}</h3>
        {isCurso && <Badge tone="accent">curso</Badge>}
      </div>

      <div className="font-mono text-[1.0625rem] font-semibold text-accent">{formatBRL(s.preco)}</div>

      {s.descricao ? (
        <p className="flex-1 text-[0.875rem] leading-relaxed text-ink-2">{s.descricao}</p>
      ) : (
        <p className="flex-1 text-[0.875rem] italic leading-relaxed text-ink-3">
          Descrição pendente — aguardando confirmação do cliente.
        </p>
      )}

      {s.duracao && (
        <div className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-3">
          <Icon name="clock" size={13} />
          {s.duracao}
        </div>
      )}

      {s.observacao && (
        <p className="border-l-2 border-accent/40 pl-3 text-[0.8125rem] leading-relaxed text-ink-2">
          {s.observacao}
        </p>
      )}

      <div className="mt-auto pt-2">
        <Button href={waLinkServico(s.nome)} variant="ghost" icon="whatsapp">
          Falar no WhatsApp
        </Button>
      </div>
    </div>
  );
}

function ServicoGrid({ items }: { items: Servico[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => (
        <Reveal key={s.id} delay={(i % 3) * 60} dir={i % 2 === 0 ? "left" : "right"}>
          <ServicoCard s={s} />
        </Reveal>
      ))}
    </div>
  );
}

export default function ServicosPage() {
  return (
    <>
      <PageHero
        eyebrow="serviços"
        title={<>Oito frentes de trabalho. <span className="text-accent">Você escolhe onde dói.</span></>}
        lead="Cada serviço ataca um gargalo diferente. No diagnóstico gratuito eu digo quais fazem sentido para o seu hardware — e quais seriam dinheiro jogado fora."
      >
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href="/contato" icon="arrow">Descobrir o meu caso</Button>
          <Button href="/planos" variant="ghost">Ver planos fechados</Button>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <ServiceCard s={s} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="raised">
        <SectionHead
          eyebrow="o que nunca entra"
          title="Tão importante quanto o que eu faço é o que eu me recuso a fazer."
          lead="Boa parte do mercado de 'otimização' vive de atalhos que quebram o sistema ou colocam sua conta em risco."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "Windows modificado ou 'lite'", d: "Quebra atualização de segurança e antivírus. O enxugamento é feito por configuração, sempre em cima da imagem oficial." },
            { t: "Injeção, DLL ou script de terceiros", d: "É o caminho mais curto para um ban permanente. Nenhum anticheat gosta de código estranho no processo do jogo." },
            { t: "Overclock agressivo sem pedido", d: "Ganho pequeno, risco alto e instabilidade que aparece semanas depois. Só faço se você pedir, e com validação." },
          ].map((x, i) => (
            <Reveal key={x.t} delay={i * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <div className="card flex h-full flex-col gap-3 p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-3">
                  <Icon name="x" size={16} />
                </span>
                <h3 className="text-[0.9375rem] font-semibold">{x.t}</h3>
                <p className="text-sm leading-relaxed text-ink-3">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="incluso em qualquer serviço" title="O padrão da casa." align="center" />
        <Reveal>
          <TrustStrip />
        </Reveal>
      </Section>

      {/* ---------------- Outros serviços: celular, avulsos e cursos */}
      <Section tone="raised">
        <SectionHead
          eyebrow="outros serviços"
          title={
            <>
              Além do PC, também atendo
              <br className="hidden sm:block" /> celular, avulsos e cursos.
            </>
          }
          lead="Cada um é vendido separado, sem entrar em pacote — contrate só o que precisa."
        />

        <Reveal className="mb-12 flex items-start gap-3 rounded-md border border-line bg-surface-2 px-4 py-3.5 text-[0.8125rem] leading-relaxed text-ink-2">
          <Icon name="shield" size={16} className="mt-0.5 shrink-0 text-accent" />
          <span>
            Os preços abaixo são por atendimento. O pagamento é combinado direto no WhatsApp, e a
            otimização de celular não envolve root nem jailbreak.
          </span>
        </Reveal>

        <div className="flex flex-col gap-16">
          <div>
            <h3 className="mb-5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-3">
              Celular
            </h3>
            <ServicoGrid items={CELULAR} />
          </div>
          <div>
            <h3 className="mb-5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-3">
              Serviços avulsos
            </h3>
            <ServicoGrid items={AVULSOS} />
          </div>
          <div>
            <h3 className="mb-5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-3">
              Cursos
            </h3>
            <ServicoGrid items={CURSOS} />
          </div>
        </div>

        <Reveal className="mt-14 flex justify-center">
          <Link
            href="/planos"
            className="text-[0.9375rem] text-ink-2 underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            Procurando otimização de PC? Veja os planos →
          </Link>
        </Reveal>
      </Section>

      <CTABand />
    </>
  );
}
