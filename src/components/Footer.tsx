import Link from "next/link";
import { BRAND, CONTACT, FOOTER_NAV } from "@/lib/site";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

const SOCIALS = [
  { name: "discord", href: CONTACT.discord, label: "Discord" },
  { name: "instagram", href: CONTACT.instagram, label: "Instagram" },
  { name: "youtube", href: CONTACT.youtube, label: "YouTube" },
  { name: "tiktok", href: CONTACT.tiktok, label: "TikTok" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-void">
      <div className="container-fl py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          <div className="flex flex-col gap-5">
            <Logo size="lg" />
            <p className="max-w-xs text-[0.9375rem] leading-relaxed text-ink-2">
              {BRAND.tagline} Otimização remota com medição antes e depois — sem
              &quot;otimizador&quot; mágico, sem risco de ban.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="glass rounded-lg p-2.5 text-ink-2 transition-all duration-150 hover:border-accent/50 hover:text-accent"
                >
                  <Icon name={s.name} size={17} />
                </a>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-ink-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {CONTACT.responseTime} · {CONTACT.hours}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {FOOTER_NAV.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-3">
                  {col.title}
                </h3>
                <ul className="grid gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[0.9375rem] text-ink-2 transition-colors duration-150 hover:text-accent"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line-soft pt-7 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.legalName}. Todos os direitos reservados.
          </p>
          <p className="font-mono uppercase tracking-[0.1em]">
            {CONTACT.whatsappLabel} · {CONTACT.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
