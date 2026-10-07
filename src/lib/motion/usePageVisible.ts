"use client";

import { useEffect, useState } from "react";

/* true quando a aba está visível — usado para pausar animações em loop
   (RAF, timers) enquanto o usuário está em outra aba. Estado inicial
   assume visível para não desligar animações antes do primeiro efeito. */
export function usePageVisible(): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(!document.hidden);

    const handleChange = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleChange);
    return () => document.removeEventListener("visibilitychange", handleChange);
  }, []);

  return visible;
}
