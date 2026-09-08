"use client";

import { useMemo, useState } from "react";
import { CONTACT, PLANS, GAMES } from "@/lib/site";
import { Icon } from "./Icon";

const FIELDS = [
  { id: "nome", label: "Como te chamo?", ph: "Seu nome ou nick", req: true, col: 1 },
  { id: "contato", label: "WhatsApp ou Discord", ph: "(11) 90000-0000", req: true, col: 1 },
  { id: "cpu", label: "Processador", ph: "Ryzen 5 5600 / i5-12400F", req: true, col: 1 },
  { id: "gpu", label: "Placa de vídeo", ph: "RTX 3060 / RX 6600", req: true, col: 1 },
  { id: "ram", label: "Memória RAM", ph: "16 GB 3200 MHz", req: false, col: 1 },
  { id: "mobo", label: "Placa-mãe", ph: "B550M / H610M", req: false, col: 1 },
] as const;

const inputCls =
  "w-full rounded-md border border-line bg-surface px-4 py-3 text-[0.9375rem] text-ink placeholder:text-ink-3/70 transition-colors duration-150 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40";

const labelCls = "mb-2 block text-[0.8125rem] font-medium text-ink-2";

export function ContactForm() {
  const [v, setV] = useState<Record<string, string>>({
    plano: PLANS[1].name,
    jogo: GAMES[0],
  });
  const set = (k: string, val: string) => setV((s) => ({ ...s, [k]: val }));

  const missing = FIELDS.filter((f) => f.req && !v[f.id]?.trim()).length;

  const waLink = useMemo(() => {
    const msg = [
      `Olá! Vim pelo site da UsantossFps.`,
      ``,
      `Nome: ${v.nome || "-"}`,
      `Plano de interesse: ${v.plano || "-"}`,
      `Jogo principal: ${v.jogo || "-"}`,
      ``,
      `Processador: ${v.cpu || "-"}`,
      `Placa de vídeo: ${v.gpu || "-"}`,
      `Memória: ${v.ram || "-"}`,
      `Placa-mãe: ${v.mobo || "-"}`,
      ``,
      `Problema principal: ${v.problema || "-"}`,
    ].join("\n");
    return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, [v]);

  return (
    <form
      className="card p-6 md:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(waLink, "_blank", "noopener");
      }}
    >
      <div className="mb-6 flex items-start gap-3 rounded-md border border-accent/25 bg-accent/[0.05] p-4">
        <Icon name="bolt" size={17} className="mt-0.5 shrink-0 text-accent" />
        <p className="text-[0.8125rem] leading-relaxed text-ink-2">
          O formulário monta a mensagem pronta e abre o WhatsApp — você não precisa
          digitar a configuração duas vezes. Nada é enviado sem você confirmar.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.id}>
            <label className={labelCls} htmlFor={f.id}>
              {f.label} {f.req && <span className="text-accent">*</span>}
            </label>
            <input
              id={f.id}
              name={f.id}
              className={inputCls}
              placeholder={f.ph}
              value={v[f.id] ?? ""}
              onChange={(e) => set(f.id, e.target.value)}
              required={f.req}
            />
          </div>
        ))}

        <div>
          <label className={labelCls} htmlFor="jogo">Jogo principal</label>
          <select id="jogo" className={inputCls} value={v.jogo} onChange={(e) => set("jogo", e.target.value)}>
            {GAMES.map((g) => <option key={g} value={g}>{g}</option>)}
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label className={labelCls} htmlFor="plano">Plano de interesse</label>
          <select id="plano" className={inputCls} value={v.plano} onChange={(e) => set("plano", e.target.value)}>
            {PLANS.map((p) => <option key={p.id} value={p.name}>{p.name} — {p.price}</option>)}
            <option value="Ainda não sei">Ainda não sei</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="problema">
            Qual é o principal problema hoje? <span className="text-accent">*</span>
          </label>
          <textarea
            id="problema"
            rows={4}
            className={`${inputCls} resize-y`}
            placeholder="Ex.: FPS até que ok, mas trava de tempo em tempo no meio da partida. Mira parece atrasada."
            value={v.problema ?? ""}
            onChange={(e) => set("problema", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-3">
          {missing > 0
            ? `Faltam ${missing} campo${missing > 1 ? "s" : ""} obrigatório${missing > 1 ? "s" : ""}.`
            : "Tudo certo — a mensagem já está montada."}
        </p>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 font-semibold text-[#052e16] transition-all duration-150 hover:bg-accent-soft hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.6)] active:scale-[0.98]"
        >
          <Icon name="whatsapp" size={18} />
          Enviar pelo WhatsApp
        </button>
      </div>
    </form>
  );
}
