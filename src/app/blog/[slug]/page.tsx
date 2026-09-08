import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS } from "@/lib/site";
import { Badge, Button, Section, SectionHead } from "@/components/UI";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { CTABand } from "@/components/Blocks";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  return { title: p?.title ?? "Artigo", description: p?.excerpt };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) notFound();

  const related = POSTS.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-line-soft pb-12 pt-28 md:pt-36">
          <div className="grid-tech pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_50%_60%_at_35%_0%,#000,transparent)]" />
          <div className="container-fl relative max-w-3xl">
            <nav className="mb-8 flex items-center gap-2 text-[0.8125rem] text-ink-3">
              <Link href="/blog" className="transition-colors hover:text-accent">Blog</Link>
              <Icon name="chevron" size={13} />
              <span className="text-ink-2">{p.category}</span>
            </nav>
            <Reveal>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <Badge tone="accent">{p.category}</Badge>
                <Badge>{p.readTime} de leitura</Badge>
              </div>
              <h1 className="text-[2.125rem] leading-[1.08] tracking-[-0.03em] md:text-[3rem]">
                {p.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-2">{p.excerpt}</p>
            </Reveal>
          </div>
        </header>

        <div className="container-fl max-w-3xl py-14 md:py-20">
          <div className="flex flex-col gap-6">
            {p.body.map((par, i) => (
              <p
                key={i}
                className={`leading-[1.8] ${
                  i === 0 ? "text-lg text-ink" : "text-[1.0625rem] text-ink-2"
                }`}
              >
                {par}
              </p>
            ))}
          </div>

          <Reveal className="mt-12 rounded-lg border border-accent/25 bg-accent/[0.04] p-7">
            <h2 className="font-display text-lg font-semibold">Quer isso aplicado no seu PC?</h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
              O diagnóstico é gratuito e leva 10 minutos. Se o seu caso não tiver ganho
              relevante, eu digo antes de você pagar.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href="/contato" icon="arrow">Agendar diagnóstico</Button>
              <Button href="/servicos" variant="ghost">Ver serviços</Button>
            </div>
          </Reveal>
        </div>
      </article>

      <Section tone="raised">
        <SectionHead
          eyebrow="continue lendo"
          title="Outros artigos"
          action={<Button href="/blog" variant="ghost" icon="arrow">Todos</Button>}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {related.map((r, i) => (
            <Reveal key={r.slug} delay={i * 60} dir={i % 2 === 0 ? "left" : "right"}>
              <Link href={`/blog/${r.slug}`} className="card card-hover group flex h-full flex-col gap-3 p-6">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-accent">
                  {r.category}
                </span>
                <h3 className="flex-1 text-[0.9375rem] font-semibold leading-snug group-hover:text-accent">
                  {r.title}
                </h3>
                <span className="text-xs text-ink-3">{r.readTime}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  );
}
