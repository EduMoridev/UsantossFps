import type { Metadata } from "next";
import Link from "next/link";
import { POSTS, CONTACT } from "@/lib/site";
import { Badge, Button, Section, SectionHead } from "@/components/UI";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { BlogList } from "@/components/BlogList";
import { CTABand, PageHero } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Blog técnico",
  description: "Artigos sobre 1% low, input lag, XMP, stuttering e manutenção — sem promessa de milagre.",
};

export default function BlogPage() {
  const featured = POSTS.find((p) => p.featured) ?? POSTS[0];

  return (
    <>
      <PageHero
        eyebrow="blog técnico"
        title={<>O que eu faria no seu PC, <span className="text-accent">explicado de graça.</span></>}
        lead="Artigos sobre o que realmente move o ponteiro em performance. Se você quiser fazer sozinho, o conteúdo está todo aqui."
      />

      <Section>
        {/* Destaque */}
        <Reveal>
        <Link
          href={`/blog/${featured.slug}`}
          className="card card-hover group mb-12 grid gap-8 overflow-hidden p-8 md:grid-cols-[1.2fr_0.8fr] md:p-10"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Badge tone="accent">Destaque</Badge>
              <Badge>{featured.category}</Badge>
            </div>
            <h2 className="text-[1.75rem] leading-tight tracking-[-0.025em] transition-colors group-hover:text-accent md:text-[2.125rem]">
              {featured.title}
            </h2>
            <p className="max-w-xl leading-relaxed text-ink-2">{featured.excerpt}</p>
            <span className="mt-2 inline-flex items-center gap-2 text-sm text-accent">
              Ler artigo
              <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>

          {/* Bloco gráfico ilustrativo no lugar de foto de banco de imagem */}
          <div className="flex items-end gap-2 rounded-md border border-line bg-surface-2 p-6">
            {[38, 92, 41, 88, 30, 95, 44, 90, 25, 86].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-sm ${i % 2 ? "bg-accent/70" : "bg-[#52525b]"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </Link>
        </Reveal>

        <SectionHead eyebrow="todos os artigos" title="Arquivo" />
        <BlogList posts={POSTS} />
      </Section>

      <Section tone="raised">
        <Reveal className="grid gap-8 rounded-lg border border-line bg-surface p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <h2 className="text-[1.5rem] leading-tight tracking-[-0.02em]">
              Conteúdo novo sai primeiro no Discord.
            </h2>
            <p className="mt-2 max-w-lg text-ink-2">
              Canal aberto com dicas, testes de driver e avisos de atualização problemática
              antes de virar artigo aqui.
            </p>
          </div>
          <Button href={CONTACT.discord} icon="discord" external>Entrar no Discord</Button>
        </Reveal>
      </Section>

      <CTABand
        title="Prefere que eu faça por você?"
        lead="O conteúdo é gratuito. O serviço existe para quem não quer gastar o fim de semana testando."
      />
    </>
  );
}
