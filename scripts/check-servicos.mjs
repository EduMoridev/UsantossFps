// Verificação de preço e descrição dos serviços avulsos (/servicos) — roda
// no prebuild (ver package.json), nunca no cliente. Falha o build (exit 1)
// se sobrar preco igual a 0 ou descricao vazia em src/lib/servicos.ts,
// listando id e nome de cada um.
//
// Importa SERVICOS direto do .ts fonte via o type-stripping nativo do
// próprio Node (--experimental-strip-types, Node 22.6+) — mesma técnica de
// scripts/check-pcs.mjs, pelo mesmo motivo: evita duplicar SERVICOS aqui.
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SERVICOS_FILE = path.join(ROOT, "src", "lib", "servicos.ts");
const SERVICOS_FILE_REL = path.relative(ROOT, SERVICOS_FILE).split(path.sep).join("/");

const { SERVICOS } = await import(pathToFileURL(SERVICOS_FILE).href);

const pendentes = SERVICOS.filter(
  (s) => s.preco === 0 || s.descricao.trim() === "",
).map((s) => ({
  id: s.id,
  nome: s.nome,
  faltaPreco: s.preco === 0,
  faltaDescricao: s.descricao.trim() === "",
}));

if (pendentes.length > 0) {
  console.error(
    `[check-servicos] ${pendentes.length} serviço(s) incompleto(s) em ${SERVICOS_FILE_REL}:`,
  );
  for (const s of pendentes) {
    const motivos = [
      s.faltaPreco && "preço",
      s.faltaDescricao && "descrição",
    ].filter(Boolean).join(" e ");
    console.error(`  - [${s.id}] ${s.nome} → falta ${motivos}`);
  }
  console.error(
    "\n[check-servicos] a página /servicos não pode ir ao ar com serviço sem preço ou descrição. " +
      `Preencha preco/descricao dessas entradas em ${SERVICOS_FILE_REL}.`,
  );
  process.exit(1);
}

console.log(
  `[check-servicos] ${SERVICOS.length} serviço(s) em ${SERVICOS_FILE_REL}, todos com preço e descrição preenchidos.`,
);
