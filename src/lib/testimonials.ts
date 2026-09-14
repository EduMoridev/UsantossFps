/* ============================================================
   Depoimentos do marquee de prova social (home).
   Os 3 primeiros são reais — mesmo texto e selo já usados no site.
   Os demais são placeholders para preencher com depoimentos reais
   antes de publicar (ver comentários acima de cada um).
   ============================================================ */

export type TestimonialSource = "Discord" | "Instagram" | "WhatsApp";

export type Testimonial = {
  source: TestimonialSource;
  text: string;
  /** Selo com o número que mudou (ex: "130 → 214 FPS"). Opcional. */
  badge?: string;
  initials: string;
  name: string;
  context: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    source: "Discord",
    text: "Achei que ia precisar trocar de placa. Saí de 130 pra 214 de FPS médio com o mesmo PC, e o que mais mudou foi a estabilidade — parou de dar aquela travadinha na hora da troca de tiro.",
    badge: "130 → 214 FPS",
    initials: "RM",
    name: "Rafael Moura",
    context: "VALORANT · Imortal",
  },
  {
    source: "Instagram",
    text: "Meu problema não era FPS baixo, era travar do nada. Ele identificou em 20 minutos uma coisa que dois técnicos aqui da cidade não acharam. Explicou tudo enquanto fazia.",
    badge: "Stutter zerado",
    initials: "BL",
    name: "Beatriz Lopes",
    context: "Warzone · Casual",
  },
  {
    source: "Discord",
    text: "Live e jogo no mesmo PC sempre foi um sofrimento. Agora transmito em 1080p60 com o jogo acima de 160 FPS. Ele configurou até o áudio, que era o que mais me dava dor de cabeça.",
    badge: "0,1% de frames perdidos",
    initials: "DX",
    name: "Diego Xavier",
    context: "Streamer",
  },
  // PLACEHOLDER — SUBSTITUIR POR DEPOIMENTO REAL
  {
    source: "WhatsApp",
    text: "Depoimento de exemplo — trocar pelo texto real do cliente, mesma voz direta dos outros, sem exagero de marketing.",
    badge: "Métrica antes → depois",
    initials: "PL",
    name: "Nome do cliente 1",
    context: "Jogo · categoria",
  },
  // PLACEHOLDER — SUBSTITUIR POR DEPOIMENTO REAL
  {
    source: "Discord",
    text: "Depoimento de exemplo — trocar pelo texto real do cliente, mesma voz direta dos outros, sem exagero de marketing.",
    badge: "Métrica antes → depois",
    initials: "PL",
    name: "Nome do cliente 2",
    context: "Jogo · categoria",
  },
  // PLACEHOLDER — SUBSTITUIR POR DEPOIMENTO REAL
  {
    source: "Instagram",
    text: "Depoimento de exemplo — trocar pelo texto real do cliente, mesma voz direta dos outros, sem exagero de marketing.",
    badge: "Métrica antes → depois",
    initials: "PL",
    name: "Nome do cliente 3",
    context: "Jogo · categoria",
  },
  // PLACEHOLDER — SUBSTITUIR POR DEPOIMENTO REAL
  {
    source: "WhatsApp",
    text: "Depoimento de exemplo — trocar pelo texto real do cliente, mesma voz direta dos outros, sem exagero de marketing.",
    badge: "Métrica antes → depois",
    initials: "PL",
    name: "Nome do cliente 4",
    context: "Jogo · categoria",
  },
  // PLACEHOLDER — SUBSTITUIR POR DEPOIMENTO REAL
  {
    source: "Discord",
    text: "Depoimento de exemplo — trocar pelo texto real do cliente, mesma voz direta dos outros, sem exagero de marketing.",
    badge: "Métrica antes → depois",
    initials: "PL",
    name: "Nome do cliente 5",
    context: "Jogo · categoria",
  },
  // PLACEHOLDER — SUBSTITUIR POR DEPOIMENTO REAL
  {
    source: "Instagram",
    text: "Depoimento de exemplo — trocar pelo texto real do cliente, mesma voz direta dos outros, sem exagero de marketing.",
    badge: "Métrica antes → depois",
    initials: "PL",
    name: "Nome do cliente 6",
    context: "Jogo · categoria",
  },
];
