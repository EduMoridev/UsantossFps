import Link from "next/link";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export type LegalSection = { id: string; title: string; body: (string | string[])[] };

export function LegalDoc({
  updated, sections, sibling,
}: { updated: string; sections: LegalSection[]; sibling: { href: string; label: string } }) {
  return (
    <div className="container-fl py-14 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <Reveal dir="left" className="lg:sticky lg:top-24 lg:h-fit"><aside>
          <div className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-3">
            neste documento
          </div>
          <nav className="flex flex-col gap-1 border-l border-line pl-4">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="py-1 text-[0.875rem] text-ink-3 transition-colors duration-150 hover:text-accent"
              >
                {s.title}
              </a>
            ))}
          </nav>
          <Link
            href={sibling.href}
            className="mt-8 inline-flex items-center gap-2 text-[0.875rem] text-ink-2 transition-colors hover:text-accent"
          >
            <Icon name="file" size={15} /> {sibling.label}
          </Link>
        </aside></Reveal>

        <div className="max-w-2xl">
          <p className="mb-10 text-sm text-ink-3">Última atualização: {updated}</p>
          <div className="flex flex-col gap-12">
            {sections.map((s, i) => (
              <Reveal key={s.id} dir={i % 2 === 0 ? "left" : "right"}>
                <section id={s.id} className="scroll-mt-28">
                  <h2 className="mb-4 flex items-baseline gap-3 text-[1.25rem] tracking-[-0.02em]">
                    <span className="font-mono text-sm text-accent/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </h2>
                  <div className="flex flex-col gap-4">
                    {s.body.map((b, j) =>
                      Array.isArray(b) ? (
                        <ul key={j} className="grid gap-2.5">
                          {b.map((li) => (
                            <li key={li} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
                              <Icon name="check" size={16} className="mt-1 shrink-0 text-accent/70" />
                              <span>{li}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p key={j} className="text-[0.9375rem] leading-[1.75] text-ink-2">{b}</p>
                      )
                    )}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
