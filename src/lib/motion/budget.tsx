"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/* Orçamento de movimento do dispositivo/preferência do usuário.
   "off" é o estado inicial no servidor E no primeiro render do cliente
   (evita mismatch de hidratação) — o valor real só é calculado depois
   do mount, dentro de um efeito. */

export type MotionBudget = "full" | "lite" | "off";

function computeBudget(): MotionBudget {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";

  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const lowCores = (nav.hardwareConcurrency ?? 8) <= 4;
  const lowMemory = (nav.deviceMemory ?? 8) <= 4;
  const saveData = Boolean(nav.connection?.saveData);
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (lowCores || lowMemory || saveData || coarsePointer) return "lite";

  return "full";
}

const MotionBudgetContext = createContext<MotionBudget>("off");

export function MotionBudgetProvider({ children }: { children: ReactNode }) {
  const [budget, setBudget] = useState<MotionBudget>("off");

  useEffect(() => {
    setBudget(computeBudget());

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setBudget(computeBudget());
    reduceQuery.addEventListener("change", handleChange);
    return () => reduceQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-motion", budget);
  }, [budget]);

  return <MotionBudgetContext.Provider value={budget}>{children}</MotionBudgetContext.Provider>;
}

export function useMotionBudget(): MotionBudget {
  return useContext(MotionBudgetContext);
}
