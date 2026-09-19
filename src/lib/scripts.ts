import manifest from "./scripts-manifest.json";

export type ScriptCategory = "limpeza" | "rede" | "energia" | "diagnostico" | "manutencao";

export type ScriptMeta = {
  arquivo: string;
  /** Nome do arquivo dentro de scripts/ no repositório público — pode
   *  divergir de `arquivo` (local é kebab-case, o repo usa o nome
   *  original). Usado para montar o link "Ver no GitHub". */
  arquivoGithub: string;
  titulo: string;
  categoria: ScriptCategory;
  descricao: string;
  admin: boolean;
  reversivel: boolean;
  tempo: string;
  tamanhoBytes: number;
  hashSha256: string;
  modificadoEm: string;
  conteudo: string;
};

// Gerado por scripts/build-scripts-manifest.mjs a partir de
// public/downloads/scripts/*.bat — nunca editar este import à mão,
// editar os .bat (ou o script gerador) e rodar `npm run scripts:manifest`.
export const SCRIPTS_MANIFEST = manifest as ScriptMeta[];

export const CATEGORY_LABELS: Record<ScriptCategory, string> = {
  limpeza: "Limpeza",
  rede: "Rede",
  energia: "Energia",
  diagnostico: "Diagnóstico",
  manutencao: "Manutenção",
};

export function fmtBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}
