// Audita contraste de texto (e de ícones/bordas informativos) contra os
// pares declarados em src/lib/theme-pairs.ts, usando a fórmula de luminância
// relativa e razão de contraste da WCAG 2.1.
//
// Roda via `node --experimental-strip-types scripts/audit-contrast.mjs`
// (mesmo padrão de scripts/check-pcs.mjs) porque importa PAIRS direto do
// .ts fonte — assim a lista de pares nunca duplica/diverge do arquivo real.
//
// FASE 1 (medição): este script só lê e imprime. Nenhum arquivo é alterado.
// Depois da Fase 2 (correção), ele é encadeado no prebuild (package.json) e
// passa a falhar o build (exit 1) se algum par cair abaixo do mínimo exigido.

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PAIRS_FILE = path.join(ROOT, "src", "lib", "theme-pairs.ts");
const PAIRS_FILE_REL = path.relative(ROOT, PAIRS_FILE).split(path.sep).join("/");

const { PAIRS } = await import(pathToFileURL(PAIRS_FILE).href);

// ============================================================
// COR — sRGB <-> linear <-> OKLab, alpha compositing, WCAG luminância
// ============================================================

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex({ r, g, b }) {
  const c = (v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

// Composição alpha padrão ("src over backdrop"), em sRGB 0-255.
function compositeOver(fg, fgAlpha, bg) {
  const a = fgAlpha;
  return {
    r: fg.r * a + bg.r * (1 - a),
    g: fg.g * a + bg.g * (1 - a),
    b: fg.b * a + bg.b * (1 - a),
  };
}

// Resolve uma pilha de camadas (baixo -> cima) numa cor sRGB sólida final.
function resolveLayers(layers) {
  let acc = hexToRgb(layers[0].hex);
  for (let i = 1; i < layers.length; i++) {
    const layer = layers[i];
    acc = compositeOver(hexToRgb(layer.hex), layer.alpha ?? 1, acc);
  }
  return acc;
}

// --- OKLab (Björn Ottosson) — usado só por colorMixOklab, para
// reproduzir color-mix(in oklab, A x%, B y%) do CSS com fidelidade real,
// em vez de aproximar por mistura linear em sRGB. ---
function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}
function linearToSrgb(v) {
  const c = v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  return c * 255;
}
function rgbToOklab({ r, g, b }) {
  const R = srgbToLinear(r), G = srgbToLinear(g), B = srgbToLinear(b);
  const l = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B;
  const m = 0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B;
  const s = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B;
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
  return {
    L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
  };
}
function oklabToRgb({ L, a, b }) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const R = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const G = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const B = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
  return { r: linearToSrgb(R), g: linearToSrgb(G), b: linearToSrgb(B) };
}

// Reproduz `color-mix(in oklab, hexA pctA%, hexB pctB%)` com hexA/hexB
// opacos. Se pctA + pctB != 100, normaliza (igual à spec do CSS Color 4).
function colorMixOklab(hexA, pctA, hexB, pctB) {
  const sum = pctA + pctB;
  const wA = pctA / sum, wB = pctB / sum;
  const oA = rgbToOklab(hexToRgb(hexA));
  const oB = rgbToOklab(hexToRgb(hexB));
  const mixed = {
    L: oA.L * wA + oB.L * wB,
    a: oA.a * wA + oB.a * wB,
    b: oA.b * wA + oB.b * wB,
  };
  return rgbToHex(oklabToRgb(mixed));
}

function relLuminance({ r, g, b }) {
  const lin = (c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrastRatio(rgbA, rgbB) {
  const La = relLuminance(rgbA), Lb = relLuminance(rgbB);
  const lighter = Math.max(La, Lb), darker = Math.min(La, Lb);
  return (lighter + 0.05) / (darker + 0.05);
}

export { colorMixOklab, resolveLayers, compositeOver, hexToRgb, rgbToHex, contrastRatio };

// ============================================================
// REGRAS WCAG 2.1 AA
// ============================================================

function isLargeText(sizePx, weight = 400) {
  return sizePx >= 24 || (weight >= 700 && sizePx >= 18.66);
}

function requirementFor(pair) {
  if (pair.role === "disabled") return null; // isento pela norma
  if (pair.role === "text") return isLargeText(pair.sizePx, pair.weight) ? 3 : 4.5;
  return 3; // icon / border / focus — não-textual que carrega informação
}

// Banda "limítrofe": acima do mínimo mas por uma margem pequena (~22%,
// a mesma proporção do exemplo do pedido: 5.5 é limítrofe pra exigência 4.5).
const BORDERLINE_FACTOR = 5.5 / 4.5;

function classify(ratio, requirement) {
  if (requirement === null) return "ISENTO";
  if (ratio < requirement) return "FALHA";
  if (ratio < requirement * BORDERLINE_FACTOR) return "LIMÍTROFE";
  return "PASSA";
}

// ============================================================
// EXECUÇÃO
// ============================================================

const rows = PAIRS.map((pair) => {
  const bgRgb = resolveLayers(pair.background);
  const textRgb = compositeOver(hexToRgb(pair.text.hex), pair.text.alpha ?? 1, bgRgb);
  const ratio = contrastRatio(textRgb, bgRgb);
  const requirement = requirementFor(pair);
  const status = classify(ratio, requirement);
  return { ...pair, bgRgb, textRgb, ratio, requirement, status };
});

function fmtRatio(r) {
  return `${r.toFixed(2)}:1`;
}

function printGroup(title, items) {
  if (items.length === 0) return;
  console.log(`\n${"=".repeat(2)} ${title} (${items.length}) ${"=".repeat(2)}`);
  const idW = Math.max(...items.map((i) => i.id.length), 2);
  const ctxW = Math.min(46, Math.max(...items.map((i) => i.context.length), 2));
  for (const it of items) {
    const sizeLabel = `${it.sizePx}px${it.weight ? `/${it.weight}` : ""}`;
    const req = it.requirement === null ? "isento" : `>= ${it.requirement}:1`;
    console.log(
      `${it.id.padEnd(idW)}  ${it.context.slice(0, ctxW).padEnd(ctxW)}  ` +
      `${fmtRatio(it.ratio).padStart(7)}  ${sizeLabel.padEnd(9)}  ${req.padEnd(9)}  ${it.status}`
    );
    if (it.note) console.log(`${" ".repeat(idW)}  note: ${it.note}`);
  }
}

console.log(`[audit-contrast] ${rows.length} pares lidos de ${PAIRS_FILE_REL}\n`);
console.log(
  `ID`.padEnd(Math.max(...rows.map((i) => i.id.length), 2) + 2) +
  `CONTEXTO`
);

const falha = rows.filter((r) => r.status === "FALHA");
const limitrofe = rows.filter((r) => r.status === "LIMÍTROFE");
const passa = rows.filter((r) => r.status === "PASSA");
const isento = rows.filter((r) => r.status === "ISENTO");

printGroup("FALHA", falha);
printGroup("LIMÍTROFE", limitrofe);
printGroup("PASSA", passa);
printGroup("ISENTO (texto desabilitado)", isento);

console.log(
  `\n[audit-contrast] resumo: ${falha.length} falha, ${limitrofe.length} limítrofe, ` +
  `${passa.length} passa, ${isento.length} isento (de ${rows.length} pares).`
);

if (falha.length > 0) {
  console.error(
    `\n[audit-contrast] ${falha.length} par(es) abaixo do mínimo WCAG 2.1 AA. ` +
    `Corrija os tokens em src/app/globals.css (ou o par, se o uso real já mudou) ` +
    `e rode de novo antes de seguir.`
  );
  process.exit(1);
}

console.log(`\n[audit-contrast] nenhuma falha. ✅`);
