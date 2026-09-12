"use client";

import { useMemo, useState } from "react";
import { Command as CommandPrimitive } from "cmdk";
import Fuse from "fuse.js";
import { Popover, PopoverAnchor, PopoverContent } from "./popover";
import { CommandList, CommandEmpty, CommandItem } from "./command";
import { Icon } from "../Icon";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full rounded-md border border-line bg-surface px-4 py-3 text-[0.9375rem] text-ink placeholder:text-ink-3/70 transition-colors duration-150 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40";

/* Input de texto livre com sugestões — não trava o usuário numa lista
   fechada (peça de PC pode não estar em nenhuma lista pronta), só
   acelera quem tem uma peça comum. Baseado no padrão Combobox do
   shadcn/ui (Popover + Command), mas com filtragem manual para permitir
   texto arbitrário como valor. */
export function Combobox({
  id, value, onChange, options, placeholder, required,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);

  /* Fuzzy real (Fuse.js) em vez de substring puro — assim um erro de
     digitação ("Ryzne" em vez de "Ryzen") ainda encontra a peça certa. */
  const fuse = useMemo(
    () => new Fuse([...options], { threshold: 0.4, ignoreLocation: true, minMatchCharLength: 2 }),
    [options]
  );

  const filtered = useMemo(() => {
    const q = value.trim();
    if (!q) return options.slice(0, 8);
    return fuse.search(q).slice(0, 8).map((r) => r.item);
  }, [value, fuse, options]);

  return (
    <CommandPrimitive shouldFilter={false} className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <CommandPrimitive.Input
            id={id}
            value={value}
            onValueChange={onChange}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder={placeholder}
            autoComplete="off"
            required={required}
            className={inputCls}
          />
        </PopoverAnchor>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            if (e.target instanceof Node && document.getElementById(id ?? "")?.contains(e.target)) return;
            setOpen(false);
          }}
          className="w-[var(--radix-popover-trigger-width)] p-1"
        >
          <CommandList>
            {filtered.length === 0 ? (
              <CommandEmpty>Sem sugestão — pode digitar livremente.</CommandEmpty>
            ) : (
              filtered.map((opt) => (
                <CommandItem
                  key={opt}
                  value={opt}
                  onMouseDown={(e) => e.preventDefault()}
                  onSelect={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                >
                  <span className={cn("flex-1", opt === value && "text-accent")}>{opt}</span>
                  {opt === value && <Icon name="check" size={14} className="shrink-0 text-accent" />}
                </CommandItem>
              ))
            )}
          </CommandList>
        </PopoverContent>
      </Popover>
    </CommandPrimitive>
  );
}
