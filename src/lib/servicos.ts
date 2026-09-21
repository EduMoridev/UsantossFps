// src/lib/servicos.ts
//
// Serviços vendidos fora dos planos de PC (src/lib/planos.ts PLANOS) e fora
// dos sub-serviços de PC de /servicos (src/lib/site.ts SERVICES): otimização
// de celular, avulsos pontuais e cursos. Ficam de propósito fora da home e da
// página de planos — misturar um item de R$ 19,90 numa tela com planos de
// R$ 49,90 a R$ 179,90 reancora a percepção de preço do cliente para baixo.
//
// "Otimização Mobile" (src/lib/site.ts, dentro de SERVICES) já existe e cobre
// Android + iOS por R$ 49. As linhas "celular" abaixo são uma oferta iOS mais
// segmentada (básica/master) — os dois produtos coexistem de propósito.
export type Servico = {
  id: string;
  nome: string;
  /** Preço em reais. 0 = ainda não definido; o build falha assim (scripts/check-servicos.mjs). */
  preco: number;
  categoria: "celular" | "avulso" | "curso";
  /** 2 a 3 frases. Vazia = ainda não veio do cliente; o build falha assim. */
  descricao: string;
  duracao?: string;
  observacao?: string;
};

export const SERVICOS: Servico[] = [
  // TODO: falta a linha de Android — confirmar com o cliente se atende.
  {
    id: "ios-basica",
    nome: "Otimização Básica (iOS)",
    preco: 19.9,
    categoria: "celular",
    // TODO: descrição precisa vir do cliente. Propositalmente vazia — o
    // build falha até isso ser preenchido (mesma regra do preço).
    descricao: "",
  },
  {
    id: "ios-master",
    nome: "Otimização Master (iOS)",
    preco: 44.9,
    categoria: "celular",
    // TODO: descrição precisa vir do cliente. Propositalmente vazia — o
    // build falha até isso ser preenchido (mesma regra do preço).
    descricao: "",
  },
  // ATENÇÃO: a oferta original incluía "ativação de Windows e Office". Não
  // anunciar ativação — a cópia abaixo deixa claro que a licença é do
  // próprio cliente. TODO: confirmar esta descrição com o cliente antes de
  // publicar.
  {
    id: "formatacao",
    nome: "Formatação + instalação de drivers",
    preco: 60.0,
    categoria: "avulso",
    descricao:
      "Formatação limpa, instalação de drivers atualizados e configuração inicial do sistema. Instalo a sua licença do Windows e do Office.",
    duracao: "1h30 a 2h",
  },
  {
    id: "sensi",
    nome: "Configuração de sensibilidade (sensi)",
    preco: 40.0,
    categoria: "avulso",
    descricao:
      "Ajuste da sensibilidade do mouse ou do controle para o seu jogo principal, convertendo entre jogos e dispositivos sem perder a mira. Ideal para quem trocou de jogo, de mouse ou de resolução recentemente.",
    duracao: "20 min",
  },
  {
    id: "bios",
    nome: "Configuração de BIOS completa",
    preco: 60.0,
    categoria: "avulso",
    descricao:
      "XMP/EXPO, Resizable BAR e curva de energia revisados um a um, com o perfil original salvo antes de qualquer mudança. Feito com você acompanhando a tela, sem overclock arriscado.",
    duracao: "45 min",
  },
  {
    id: "curso-light",
    nome: "Curso de otimização — Light",
    preco: 200.0,
    categoria: "curso",
    descricao:
      "Passo a passo gravado da otimização básica: energia, processos em segundo plano e configuração da placa de vídeo. Você aplica no seu próprio ritmo, com suporte por texto para dúvidas.",
    duracao: "cerca de 2h de conteúdo",
  },
  {
    id: "curso-hard",
    nome: "Curso de otimização — Hard",
    preco: 500.0,
    categoria: "curso",
    descricao:
      "Tudo do Light mais BIOS, XMP/EXPO, tuning por jogo e configuração avançada de rede. Para quem quer entender e aplicar o processo inteiro sozinho, com suporte direto durante o aprendizado.",
    duracao: "cerca de 5h de conteúdo",
  },
];
