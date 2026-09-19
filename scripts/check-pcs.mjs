// Verificação de preço das montagens (/gratis/pcs) — roda no prebuild (ver
// package.json), nunca no cliente. Falha o build (exit 1) se sobrar
// faixaMin ou faixaMax igual a 0 em src/lib/pcs.ts, listando arquivo,
// configuração e peça de cada uma.
//
// Importa CONFIGS direto do .ts fonte via o type-stripping nativo do
// próprio Node (--experimental-strip-types, Node 22.6+) — por isso o
// script roda como `node --experimental-strip-types scripts/check-pcs.mjs`
// no prebuild, e não como `node scripts/check-pcs.mjs`. Sem isso seria
// preciso duplicar CONFIGS aqui, o que este projeto evita de propósito
// (mesmo motivo do comentário em scripts/build-scripts-manifest.mjs).
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PCS_FILE = path.join(ROOT, "src", "lib", "pcs.ts");
const PCS_FILE_REL = path.relative(ROOT, PCS_FILE).split(path.sep).join("/");

const { CONFIGS } = await import(pathToFileURL(PCS_FILE).href);

const pendentes = CONFIGS.flatMap((c) =>
  c.pecas
    .filter((p) => p.faixaMin === 0 || p.faixaMax === 0)
    .map((p) => ({ configId: c.id, configNome: c.nome, pecaNome: p.nome })),
);

if (pendentes.length > 0) {
  console.error(
    `[check-pcs] ${pendentes.length} peça(s) sem faixa de preço pesquisada em ${PCS_FILE_REL}:`,
  );
  for (const p of pendentes) {
    console.error(`  - [${p.configId}] ${p.configNome} → ${p.pecaNome}`);
  }
  console.error(
    "\n[check-pcs] a página /gratis/pcs não pode ir ao ar com faixa não pesquisada. " +
      `Preencha faixaMin/faixaMax dessas peças em ${PCS_FILE_REL}.`,
  );
  process.exit(1);
}

console.log(
  `[check-pcs] ${CONFIGS.length} configuração(ões) em ${PCS_FILE_REL}, todas as peças com faixa de preço preenchida.`,
);
