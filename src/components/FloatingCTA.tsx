"use client";

import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/site";
import { Icon } from "./Icon";

/* Botão flutuante: fechado por padrão como pílula estreita,
   expande no hover/clique. Nunca cobre conteúdo em mobile (fica acima do fold do rodapé). */
export function FloatingCTA() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {open && (
        <div className="flex flex-col gap-2">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm text-ink shadow-lg transition-colors hover:border-accent/50 hover:text-accent"
          >
            <Icon name="whatsapp" size={17} /> WhatsApp
          </a>
          <a
            href={CONTACT.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm text-ink shadow-lg transition-colors hover:border-accent/50 hover:text-accent"
          >
            <Icon name="discord" size={17} /> Discord
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fechar contato rápido" : "Contato rápido"}
        aria-expanded={open}
        className="glow-accent flex h-13 items-center gap-2.5 rounded-lg bg-accent px-5 py-3.5 text-sm font-semibold text-[#052e16] transition-transform duration-150 hover:scale-[1.03] active:scale-95"
      >
        <Icon name={open ? "x" : "whatsapp"} size={18} />
        <span className="hidden sm:inline">{open ? "Fechar" : "Falar agora"}</span>
      </button>
    </div>
  );
}
