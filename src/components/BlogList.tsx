"use client";

import Link from "next/link";
import { useState } from "react";
import { BLOG_CATEGORIES, type Post } from "@/lib/site";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

function fmtDate(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export function BlogList({ posts }: { posts: Post[] }) {
  const [cat, setCat] = useState("Todos");
  const list = cat === "Todos" ? posts : posts.filter((p) => p.category === cat);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2">
        {BLOG_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-lg border px-4 py-2 text-[0.8125rem] transition-all duration-150 ${
              cat === c
                ? "border-accent/50 bg-accent/[0.09] text-accent"
                : "border-line text-ink-2 hover:border-accent/35 hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 60} dir={i % 2 === 0 ? "left" : "right"}>
            <Link href={`/blog/${p.slug}`} className="card card-hover group flex h-full flex-col gap-4 p-6">
              <div className="flex items-center gap-3 font-mono text-[0.625rem] uppercase tracking-[0.12em]">
                <span className="text-accent">{p.category}</span>
                <span className="h-3 w-px bg-line" />
                <span className="text-ink-3">{p.readTime}</span>
              </div>
              <h2 className="flex-1 text-[1.0625rem] font-semibold leading-snug transition-colors group-hover:text-accent">
                {p.title}
              </h2>
              <p className="text-[0.875rem] leading-relaxed text-ink-3">{p.excerpt}</p>
              <div className="flex items-center justify-between border-t border-line-soft pt-4 text-xs text-ink-3">
                {fmtDate(p.date)}
                <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {list.length === 0 && (
        <p className="py-16 text-center text-ink-3">Nenhum artigo nesta categoria ainda.</p>
      )}
    </>
  );
}
