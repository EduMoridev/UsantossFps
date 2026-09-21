/* ============================================================
   Depoimentos do marquee de prova social (home).
   Todos vêm do Discord/WhatsApp da UsantoosFps. `consentimento`
   começa em false para cada um — só vira true depois que o
   cliente confirmar o uso, um por um. Enquanto for false, o
   depoimento não é renderizado (ver TestimonialsMarquee).
   ============================================================ */

export type TestimonialSource = "Discord" | "WhatsApp";

export type Depoimento = {
  id: string;
  /** Nick do Discord, sem @ — o @ é adicionado só na renderização. */
  nick: string;
  origem: TestimonialSource;
  /** Só quando o plano foi confirmado. */
  plano?: string;
  text: string;
  /** Só quando for uma medição real de antes/depois. */
  fpsAntes?: string;
  fpsDepois?: string;
  /** Onde e como foi medido — é o que dá credibilidade ao número. */
  contexto?: string;
  /** false = não renderiza, mesmo com o resto dos dados preenchido. */
  consentimento: boolean;
};

export const DEPOIMENTOS: Depoimento[] = [
  {
    id: "salmos91",
    nick: "salmos91",
    origem: "Discord",
    text: "Meu FPS chorava pra pegar 130. Tá acima de 250. Atirando nem desce.",
    fpsAntes: "130",
    fpsDepois: "250+",
    contexto: "Free Fire",
    consentimento: false,
  },
  {
    id: "two9fp",
    nick: "two9fp",
    origem: "Discord",
    plano: "Start FPS",
    text: "Fez milagre, mano. De 30 FPS pra 170. Melhorou demais.",
    fpsAntes: "30",
    fpsDepois: "170",
    contexto: "Free Fire no emulador, em notebook",
    consentimento: false,
  },
  {
    id: "silentzin7",
    nick: "silentzin7",
    origem: "Discord",
    text: "Agora tá uma delícia. Atendimento impecável!",
    // CONFERIR: "de 180 a 220 fps" pode ser faixa após a otimização ou
    // antes→depois. Até confirmar, exibir só como faixa atual (fpsDepois).
    fpsDepois: "180–220",
    contexto: "Free Fire, gráfico no ultra",
    consentimento: false,
  },
  {
    id: "jotta",
    nick: "jotta",
    origem: "Discord",
    text: "240 FPS jogando o treinamento. Absurdo. Tá muito clean.",
    fpsDepois: "240",
    contexto: "medido no modo treinamento",
    consentimento: false,
  },
  {
    id: "iguim",
    nick: "iguim",
    origem: "Discord",
    plano: "Advanced FPS",
    text: "Bizarro de bom.",
    fpsDepois: "218",
    contexto: "Free Fire, contador na tela",
    consentimento: false,
  },
  {
    id: "killua",
    nick: "killua",
    origem: "Discord",
    text: "Agora sim, 140 FPS na BR. Valeu!",
    // Sem fpsAntes: os 60 FPS anteriores eram trava de config do emulador,
    // não desempenho de fato — usar como antes/depois seria enganoso.
    fpsDepois: "140",
    contexto: "Free Fire no emulador, modo Battle Royale",
    consentimento: false,
  },
  {
    id: "lucifer",
    nick: "lucifer",
    origem: "Discord",
    text: "Tá na média de 160, 170 e não tá descendo muito quando atiro.",
    fpsDepois: "160–170",
    contexto: "Free Fire, estável durante troca de tiro",
    consentimento: false,
  },
  {
    id: "diniyz",
    nick: "diniyz",
    origem: "Discord",
    text: "FPS muito bom. Jogo tá lisinho de novo.",
    contexto: "Free Fire",
    consentimento: false,
  },
];
