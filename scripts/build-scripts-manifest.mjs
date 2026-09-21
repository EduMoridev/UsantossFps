// Varre public/downloads/scripts/*.bat e gera src/lib/scripts-manifest.json.
// Roda no prebuild (ver package.json) — falha o build se algum .bat não
// tiver o cabeçalho de metadados completo, em vez de gerar entrada incompleta.
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SCRIPTS_DIR = path.join(ROOT, "public", "downloads", "scripts");
const OUT_FILE = path.join(ROOT, "src", "lib", "scripts-manifest.json");

const ALLOWED_CATEGORIES = ["limpeza", "rede", "energia", "diagnostico", "manutencao"];
const REQUIRED_FIELDS = [
  "titulo", "categoria", "descricao", "admin", "reversivel", "tempo", "arquivogithub",
];
const HEADER_LINE = /^REM\s+@([a-z]+):[ \t]*(.*)$/i;

// Mantenha sincronizado com src/lib/config.ts (GITHUB_SCRIPTS_BLOB) — um
// script Node puro não importa .ts sem um passo de build extra, e
// duplicar só esta URL é mais simples e confiável do que fazer parsing
// do arquivo TS.
const GITHUB_SCRIPTS_BLOB = "https://github.com/EduMoridev/UsantossFps-scripts/blob/main/scripts";

function parseHeader(fileName, content) {
  const fields = {};
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(HEADER_LINE);
    if (!match) continue;
    const key = match[1].toLowerCase();
    const value = match[2].trim();
    if (value) fields[key] = value;
  }

  const missing = REQUIRED_FIELDS.filter((f) => !fields[f]);
  if (missing.length > 0) {
    throw new Error(
      `Cabeçalho incompleto em "${fileName}": faltando ${missing.map((f) => `@${f}`).join(", ")}.`
    );
  }

  if (!ALLOWED_CATEGORIES.includes(fields.categoria)) {
    throw new Error(
      `Categoria inválida em "${fileName}": "${fields.categoria}". Use uma de: ${ALLOWED_CATEGORIES.join(", ")}.`
    );
  }

  const boolFrom = (raw, field) => {
    const v = raw.toLowerCase();
    if (v === "sim") return true;
    if (v === "nao" || v === "não") return false;
    throw new Error(`Valor inválido em "${fileName}" para @${field}: "${raw}". Use "sim" ou "não".`);
  };

  return {
    titulo: fields.titulo,
    categoria: fields.categoria,
    descricao: fields.descricao,
    admin: boolFrom(fields.admin, "admin"),
    reversivel: boolFrom(fields.reversivel, "reversivel"),
    tempo: fields.tempo,
    arquivoGithub: fields.arquivogithub,
  };
}

function build() {
  if (!existsSync(SCRIPTS_DIR)) {
    console.warn(`[scripts-manifest] pasta não encontrada: ${SCRIPTS_DIR} — gerando manifest vazio.`);
    writeFileSync(OUT_FILE, "[]\n", "utf8");
    return [];
  }

  const files = readdirSync(SCRIPTS_DIR)
    .filter((f) => f.toLowerCase().endsWith(".bat"))
    .sort((a, b) => a.localeCompare(b, "pt-BR"));

  const entries = files.map((fileName) => {
    const fullPath = path.join(SCRIPTS_DIR, fileName);
    const buffer = readFileSync(fullPath);
    const content = buffer.toString("utf8");
    const meta = parseHeader(fileName, content);
    const stat = statSync(fullPath);
    const hashSha256 = createHash("sha256").update(buffer).digest("hex");

    return {
      arquivo: fileName,
      arquivoGithub: meta.arquivoGithub,
      titulo: meta.titulo,
      categoria: meta.categoria,
      descricao: meta.descricao,
      admin: meta.admin,
      reversivel: meta.reversivel,
      tempo: meta.tempo,
      tamanhoBytes: buffer.length,
      hashSha256,
      modificadoEm: stat.mtime.toISOString(),
      conteudo: content,
    };
  });

  entries.sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR"));

  writeFileSync(OUT_FILE, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
  console.log(`[scripts-manifest] gerado com ${entries.length} script(s) em ${path.relative(ROOT, OUT_FILE)}`);
  return entries;
}

// Checagem opcional contra o GitHub — só roda com CHECK_GITHUB_LINKS
// definido, porque depende de rede e não pode travar o build normal.
// Eu rodo manualmente antes de publicar.
async function checkGithubLinks(entries) {
  console.log(`[scripts-manifest] CHECK_GITHUB_LINKS ativo — validando ${entries.length} link(s) no GitHub...`);

  const broken = [];
  for (const entry of entries) {
    const url = `${GITHUB_SCRIPTS_BLOB}/${entry.arquivoGithub}`;
    try {
      const res = await fetch(url, { method: "HEAD", redirect: "follow" });
      if (!res.ok) broken.push({ arquivo: entry.arquivo, url, status: res.status });
    } catch (err) {
      broken.push({ arquivo: entry.arquivo, url, status: `erro de rede: ${err.message}` });
    }
  }

  if (broken.length > 0) {
    console.error(`[scripts-manifest] ${broken.length} link(s) do GitHub quebrado(s):`);
    for (const b of broken) console.error(`  - ${b.arquivo} → ${b.url} (${b.status})`);
    process.exit(1);
  }

  console.log("[scripts-manifest] todos os links do GitHub respondem OK.");
}

try {
  const entries = build();
  if (process.env.CHECK_GITHUB_LINKS) {
    await checkGithubLinks(entries);
  }
} catch (err) {
  console.error(`[scripts-manifest] build falhou: ${err.message}`);
  process.exit(1);
}
