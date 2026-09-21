"use client";

import { Accordion as HeroAccordion } from "@heroui/react";
import { Icon } from "./Icon";

/* Wrapper fino sobre o Accordion compound da HeroUI: estado, teclado
   e ARIA vêm da lib, aqui só entra o estilo UsantoosFps. */
export function Accordion({
  items, defaultOpen = -1,
}: { items: { q: string; a: string }[]; defaultOpen?: number }) {
  return (
    <HeroAccordion
      className="border-y border-line"
      defaultExpandedKeys={defaultOpen >= 0 ? [String(defaultOpen)] : undefined}
    >
      {items.map((it, i) => (
        <HeroAccordion.Item key={it.q} id={String(i)}>
          <HeroAccordion.Heading>
            <HeroAccordion.Trigger className="py-5 text-left text-[1.0625rem] font-medium leading-snug text-ink hover:text-accent">
              {it.q}
              <HeroAccordion.Indicator>
                <Icon name="chevronDown" size={16} />
              </HeroAccordion.Indicator>
            </HeroAccordion.Trigger>
          </HeroAccordion.Heading>
          <HeroAccordion.Panel>
            <HeroAccordion.Body className="max-w-[62ch] pb-6 pr-12 text-[0.9375rem] leading-relaxed text-ink-2">
              {it.a}
            </HeroAccordion.Body>
          </HeroAccordion.Panel>
        </HeroAccordion.Item>
      ))}
    </HeroAccordion>
  );
}
