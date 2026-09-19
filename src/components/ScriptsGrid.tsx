"use client";

import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Icon } from "./Icon";
import { Badge } from "./UI";
import { GITHUB_SCRIPTS_BLOB } from "@/lib/config";
import { CATEGORY_LABELS, fmtBytes, type ScriptCategory, type ScriptMeta } from "@/lib/scripts";

/* -------------------------------------------------- BOTÃO COPIAR
   Região aria-live separada do texto do botão: o rótulo visível não
   precisa mudar de layout toda hora, quem depende de leitor de tela
   ouve "Copiado" via a região dedicada, sem barulho extra no botão. */
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Sem permissão de clipboard ou contexto não seguro: sem-op silencioso.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2.5 py-1.5 text-xs font-medium text-ink-2 transition-colors duration-150 hover:border-accent/50 hover:text-accent"
    >
      <Icon name={copied ? "check" : "copy"} size={13} className={copied ? "text-accent" : undefined} />
      {copied ? "Copiado" : label}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Copiado para a área de transferência." : ""}
      </span>
    </button>
  );
}

/* -------------------------------------------------- CARD DE SCRIPT */
function ScriptCard({ s }: { s: ScriptMeta }) {
  return (
    <article className="script-card card card-hover flex h-full flex-col gap-4 p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[1.0625rem] font-semibold leading-snug text-ink">{s.titulo}</h3>
        <span className="shrink-0 rounded-full border border-line bg-surface-2 px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-3">
          {s.tempo}
        </span>
      </div>

      <p className="flex-1 text-[0.9375rem] leading-relaxed text-ink-2">{s.descricao}</p>

      <div className="flex flex-wrap gap-2">
        <Badge tone="line">{s.admin ? "requer admin" : "não requer admin"}</Badge>
        <Badge tone="line">{s.reversivel ? "reversível" : "não reversível"}</Badge>
      </div>

      <details className="script-code border-t border-line-soft pt-4">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[0.8125rem] font-medium text-ink-2 marker:content-none [&::-webkit-details-marker]:hidden">
          Ver o código
          <Icon name="chevronDown" size={14} className="script-code-icon shrink-0 text-ink-3" />
        </summary>
        <div className="script-code-body">
          <div className="flex flex-col gap-3">
            <pre className="max-h-[320px] overflow-auto overscroll-contain rounded-md border border-line bg-void p-3 font-mono text-[0.75rem] leading-relaxed text-ink-2">
              <code>{s.conteudo}</code>
            </pre>
            <div>
              <CopyButton text={s.conteudo} label="Copiar código" />
            </div>

            <div className="rounded-md border border-line-soft bg-surface-2/50 p-3">
              <div className="mb-1.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-3">
                SHA-256 · {fmtBytes(s.tamanhoBytes)}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <code className="select-all break-all font-mono text-[0.6875rem] text-ink-2">
                  {s.hashSha256}
                </code>
                <CopyButton text={s.hashSha256} label="Copiar hash" />
              </div>
              <p className="mt-2 text-[0.75rem] leading-relaxed text-ink-3">
                Confira o hash depois de baixar se quiser ter certeza de que o arquivo não foi alterado.
              </p>
            </div>
          </div>
        </div>
      </details>

      <div className="mt-auto flex flex-col gap-2 border-t border-line-soft pt-4 sm:flex-row">
        <a
          href={`/downloads/scripts/${s.arquivo}`}
          download
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-[#052e16] transition-all duration-150 hover:bg-accent-soft hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.6)] active:scale-[0.98]"
        >
          <Icon name="download" size={16} />
          Baixar .bat
        </a>
        <a
          href={`${GITHUB_SCRIPTS_BLOB}/${s.arquivoGithub}`}
          target="_blank"
          rel="noopener noreferrer"
          className="glass inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border-line/70 px-4 text-sm font-medium text-ink transition-all duration-150 hover:border-accent/50 hover:bg-accent/[0.08] hover:text-accent"
        >
          <ExternalLink size={15} strokeWidth={1.5} aria-hidden="true" />
          Ver no GitHub
        </a>
      </div>
    </article>
  );
}

/* -------------------------------------------------- GRADE + FILTRO */
export function ScriptsGrid({ scripts }: { scripts: ScriptMeta[] }) {
  const categories = Array.from(new Set(scripts.map((s) => s.categoria))) as ScriptCategory[];
  const [active, setActive] = useState<ScriptCategory | "todos">("todos");
  const [visible, setVisible] = useState(true);

  function selectCategory(cat: ScriptCategory | "todos") {
    if (cat === active) return;
    setVisible(false);
    window.setTimeout(() => {
      setActive(cat);
      setVisible(true);
    }, 150);
  }

  const filtered = active === "todos" ? scripts : scripts.filter((s) => s.categoria === active);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
        <button
          type="button"
          onClick={() => selectCategory("todos")}
          className={`rounded-full border px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-colors duration-150 ${
            active === "todos"
              ? "border-accent/50 bg-accent/[0.1] text-accent"
              : "border-line bg-surface-2 text-ink-2 hover:border-accent/40 hover:text-accent"
          }`}
          aria-pressed={active === "todos"}
        >
          Todos
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => selectCategory(c)}
            className={`rounded-full border px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-colors duration-150 ${
              active === c
                ? "border-accent/50 bg-accent/[0.1] text-accent"
                : "border-line bg-surface-2 text-ink-2 hover:border-accent/40 hover:text-accent"
            }`}
            aria-pressed={active === c}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      <div
        className={`grid gap-4 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {filtered.map((s) => (
          <ScriptCard key={s.arquivo} s={s} />
        ))}
      </div>
    </div>
  );
}
