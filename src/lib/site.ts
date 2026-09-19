/* ============================================================
   UsantossFps — fonte única de conteúdo.
   Trocar marca, preços, contatos e cases aqui reflete no site inteiro.
   ============================================================ */

export const BRAND = {
  name: "UsantossFps",
  nameParts: ["Usantoss", "Fps"] as const,
  tagline: "Seu setup no máximo. Sem trocar uma peça.",
  short: "Engenharia de performance para PC gamer.",
  legalName: "UsantossFps Otimização de Performance",
  cnpj: "00.000.000/0001-00",
};

export const CONTACT = {
  whatsapp: "5511951422087",
  whatsappLabel: "(11) 95142-2087",
  whatsappUrl:
    "https://wa.me/5511951422087?text=Fala!%20Quero%20otimizar%20meu%20PC%20com%20a%20UsantossFps.",
  discord: "https://discord.com/invite/e9F3AsGDqW",
  instagram: "https://instagram.com/usantoosfps",
  tiktok: "https://tiktok.com/@usantoosfps",
  youtube: "https://youtube.com/@usantoosfps",
  email: "contato@usantossfps.gg",
  responseTime: "Resposta média em 12 min",
  hours: "Seg a Sáb · 10h às 22h (BRT)",
};

export const NAV = [
  { label: "Serviços", href: "/servicos" },
  { label: "Planos", href: "/planos" },
  { label: "Resultados", href: "/resultados" },
  { label: "Como funciona", href: "/como-funciona" },
  { label: "Blog", href: "/blog" },
  { label: "Grátis", href: "/gratis" },
];

export const FOOTER_NAV = [
  {
    title: "Serviço",
    links: [
      { label: "Todos os serviços", href: "/servicos" },
      { label: "Planos e preços", href: "/planos" },
      { label: "Como funciona", href: "/como-funciona" },
      { label: "Resultados reais", href: "/resultados" },
    ],
  },
  {
    title: "Confiança",
    links: [
      { label: "Quem faz", href: "/sobre" },
      { label: "Depoimentos", href: "/depoimentos" },
      { label: "Perguntas frequentes", href: "/faq" },
      { label: "Blog técnico", href: "/blog" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Contato e agendamento", href: "/contato" },
      { label: "Política de privacidade", href: "/legal/privacidade" },
      { label: "Termos de uso", href: "/legal/termos" },
      { label: "Guia de estilo", href: "/style-guide" },
    ],
  },
];

/* ---------------------------------------------- MÉTRICAS DE TOPO */
export const HERO_STATS = [
  { value: "+42%", label: "FPS médio ganho", note: "média de 300 atendimentos" },
  { value: "-38%", label: "Input lag", note: "medido com frame capture" },
  { value: "3.000+", label: "Atendimentos", note: "desde 2021" },
  { value: "4,9/5", label: "Nota média", note: "Discord + Instagram" },
];

export const TRUST_BADGES = [
  { icon: "shield", title: "Garantia de 7 dias", text: "Não melhorou? Refaço ou devolvo." },
  { icon: "clock", title: CONTACT.responseTime, text: CONTACT.hours },
  { icon: "lock", title: "Acesso supervisionado", text: "Você vê a tela e encerra quando quiser." },
  { icon: "undo", title: "Ponto de restauração", text: "Tudo reversível em 1 clique." },
];

export const GAMES = [
  "VALORANT", "CS2", "FORTNITE", "LEAGUE OF LEGENDS", "APEX LEGENDS",
  "WARZONE", "RAINBOW SIX", "ROCKET LEAGUE", "DOTA 2", "PUBG",
  "OVERWATCH 2", "THE FINALS",
];

/* Lista maior, só para sugestão no combobox do formulário de contato —
   a faixa de logos da home (GAMES acima) fica curta de propósito. */
export const GAME_SUGGESTIONS = [
  ...GAMES,
  "GTA V", "GTA Online", "Minecraft", "Roblox", "Free Fire",
  "Genshin Impact", "Honkai: Star Rail", "Wuthering Waves",
  "Call of Duty: Black Ops 6", "Call of Duty: Warzone", "Call of Duty: MW3",
  "Battlefield 2042", "Battlefield 6", "Delta Force",
  "Elden Ring", "Dark Souls III", "Baldur's Gate 3", "Cyberpunk 2077",
  "The Witcher 3", "Red Dead Redemption 2", "Black Myth: Wukong",
  "Diablo IV", "Path of Exile", "Path of Exile 2", "World of Warcraft",
  "Lost Ark", "Throne and Liberty", "Albion Online", "Tibia",
  "Naraka: Bladepoint", "PUBG Mobile", "Free Fire Max",
  "Marvel Rivals", "Overwatch", "Paladins", "Smite", "Splitgate 2",
  "Tom Clancy's Rainbow Six Siege", "Escape from Tarkov", "Hunt: Showdown",
  "Rust", "DayZ", "ARK: Survival Ascended", "Palworld", "7 Days to Die",
  "Sea of Thieves", "Destiny 2", "Halo Infinite",
  "Left 4 Dead 2", "Deep Rock Galactic", "Helldivers 2",
  "Phasmophobia", "Lethal Company", "R.E.P.O.",
  "GTA San Andreas", "FiveM", "Euro Truck Simulator 2",
  "FC 25", "FC 26", "eFootball", "NBA 2K25",
  "Mortal Kombat 1", "Tekken 8", "Street Fighter 6", "Guilty Gear Strive",
  "Terraria", "Stardew Valley", "Among Us", "Fall Guys", "Brawlhalla",
  "Clash Royale", "Clash of Clans", "Brawl Stars", "Mobile Legends",
  "Wild Rift", "Honor of Kings",
  "iRacing", "Assetto Corsa Competizione", "Forza Horizon 5", "F1 24",
  "World of Tanks", "War Thunder", "Enlisted",
  "Outro",
];

/* ---------------------------------------------- SERVIÇOS */
export type Service = {
  slug: string;
  name: string;
  short: string;
  icon: string;
  price: string;
  duration: string;
  headline: string;
  intro: string;
  includes: string[];
  deliverables: string[];
  metrics: { label: string; before: number; after: number; unit: string; better: "up" | "down" }[];
  faq: { q: string; a: string }[];
  requirements: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "otimizacao-completa",
    name: "Otimização Completa de PC",
    short: "O pacote base: sistema, serviços, energia, rede e GPU alinhados para jogo.",
    icon: "cpu",
    price: "A partir de R$ 89",
    duration: "60 a 90 min",
    headline: "Todo o sistema reconfigurado para uma coisa só: frametime estável.",
    intro:
      "A maioria dos PCs perde desempenho não por falta de hardware, mas por camadas de software brigando pelo mesmo núcleo de CPU. Aqui eu removo, isolo e reordeno tudo que disputa recurso com o jogo — sem instalar 'otimizadores' mágicos e sem quebrar nada do seu uso diário.",
    includes: [
      "Auditoria de processos, serviços e tarefas agendadas em segundo plano",
      "Remoção de bloatware, overlays e telemetria que roubam CPU",
      "Plano de energia e parking de núcleos ajustados ao seu processador",
      "Prioridade de processo, afinidade e agendamento de GPU acelerado por hardware",
      "Painel NVIDIA/AMD configurado por perfil (latência, cache de shader, escalonamento)",
      "Ajuste de rede: buffer bloat, DNS, throttling e QoS",
      "Limpeza térmica de software: curva de fan e limites de potência",
      "Ponto de restauração antes e depois + relatório do que mudou",
    ],
    deliverables: [
      "Relatório PDF com antes/depois de FPS, 1% low e latência",
      "Perfil de energia exportado para reaplicar quando quiser",
      "Checklist de manutenção mensal",
    ],
    metrics: [
      { label: "FPS médio", before: 143, after: 206, unit: "fps", better: "up" },
      { label: "1% low", before: 71, after: 148, unit: "fps", better: "up" },
      { label: "Input lag", before: 42, after: 24, unit: "ms", better: "down" },
      { label: "Boot do sistema", before: 51, after: 19, unit: "s", better: "down" },
    ],
    faq: [
      { q: "Vou perder algum programa?", a: "Não. Nada que você usa é removido sem sua confirmação na hora. Só sai o que roda sozinho em segundo plano." },
      { q: "Funciona em notebook?", a: "Sim, e o ganho costuma ser maior — notebooks vêm com mais camadas de software do fabricante." },
    ],
    requirements: ["Windows 10 ou 11", "Conexão estável para acesso remoto", "1h30 livre sem uso do PC"],
  },
  {
    slug: "tuning-por-jogo",
    name: "Tuning por Jogo",
    short: "Configuração cirúrgica do seu jogo principal: gráficos, rede, sensibilidade e HUD.",
    icon: "target",
    price: "A partir de R$ 59",
    duration: "40 a 60 min",
    headline: "Cada jogo tem seu gargalo. O seu vai ser configurado pelo que ele realmente é.",
    intro:
      "Preset 'baixo' não é sinônimo de mais FPS competitivo. Em VALORANT o gargalo é CPU; em Warzone é VRAM; em CS2 é frametime consistente. Eu configuro cada opção pelo custo real que ela tem no seu hardware, mantendo a visibilidade do inimigo.",
    includes: [
      "Config file editado e comentado (quando o jogo permite)",
      "Ajuste opção a opção pelo custo de frametime, não por preset",
      "Limitador de FPS alinhado à taxa do monitor e ao seu tipo de sincronia",
      "NVIDIA Reflex / Anti-Lag e buffer de renderização",
      "Sensibilidade convertida entre jogos (eDPI mantido)",
      "Configuração de rede do cliente: tickrate, interpolação e região",
      "HUD, crosshair e cores ajustados para leitura rápida",
    ],
    deliverables: [
      "Arquivo de configuração salvo em backup",
      "Tabela de sensibilidade equivalente entre seus jogos",
      "Print do antes/depois com contador de frametime",
    ],
    metrics: [
      { label: "FPS médio", before: 210, after: 318, unit: "fps", better: "up" },
      { label: "1% low", before: 96, after: 214, unit: "fps", better: "up" },
      { label: "Variação de frametime", before: 9.4, after: 2.1, unit: "ms", better: "down" },
    ],
    faq: [
      { q: "Posso pedir mais de um jogo?", a: "Sim. Cada jogo adicional entra com desconto no mesmo atendimento." },
      { q: "Mexer em config file dá ban?", a: "Não. Só uso opções que o próprio jogo expõe. Nada de injeção, DLL ou terceiros." },
    ],
    requirements: ["Jogo já instalado e atualizado", "Saber seu DPI atual do mouse"],
  },
  {
    slug: "drivers-e-bios",
    name: "Drivers e BIOS",
    short: "Instalação limpa de drivers, XMP/EXPO, curva de energia e Resizable BAR.",
    icon: "chip",
    price: "A partir de R$ 79",
    duration: "45 a 75 min",
    headline: "Metade dos PCs roda com a memória em metade da velocidade que pagou.",
    intro:
      "XMP desligado, driver empilhado sobre driver antigo, Resizable BAR desativado, limite de potência errado. São ajustes de cinco minutos que a maioria nunca fez — e que respondem por boa parte do desempenho perdido. Faço tudo com você acompanhando, passo a passo, sem overclock arriscado.",
    includes: [
      "Remoção completa de drivers antigos (DDU em modo seguro)",
      "Instalação limpa do driver de vídeo na versão mais estável para o seu jogo",
      "Ativação e validação de XMP / EXPO com teste de estabilidade",
      "Resizable BAR / Above 4G Decoding quando compatível",
      "Ajuste de curva de energia e undervolt conservador (CPU e GPU)",
      "Modo de latência da BIOS, HPET e virtualização revistos",
      "Backup do perfil de BIOS antes de qualquer mudança",
    ],
    deliverables: [
      "Perfil de BIOS salvo em arquivo",
      "Print das validações de estabilidade",
      "Lista das versões instaladas para você repetir depois",
    ],
    metrics: [
      { label: "FPS médio", before: 128, after: 171, unit: "fps", better: "up" },
      { label: "Temperatura CPU", before: 84, after: 68, unit: "°C", better: "down" },
      { label: "Latência de memória", before: 78, after: 61, unit: "ns", better: "down" },
    ],
    faq: [
      { q: "Isso não corre risco de brickar a placa?", a: "Não faço flash de BIOS. Só altero configurações já expostas no menu, com o perfil original salvo antes." },
      { q: "É overclock?", a: "Não por padrão. Trabalho com o que o fabricante já garante — XMP e limites oficiais. Overclock só se você pedir." },
    ],
    requirements: ["Acesso à senha da BIOS, se houver", "Placa-mãe com XMP/EXPO disponível"],
  },
  {
    slug: "input-lag-e-perifericos",
    name: "Input Lag e Periféricos",
    short: "Toda a cadeia do clique ao pixel medida e reduzida, do mouse ao monitor.",
    icon: "bolt",
    price: "A partir de R$ 69",
    duration: "40 a 60 min",
    headline: "Do clique ao pixel: cada milissegundo tem um lugar onde nasce.",
    intro:
      "Input lag não é uma coisa só — é uma soma. Polling rate do mouse, fila de renderização, sincronia, overdrive do monitor e modo de exibição. Eu meço a cadeia inteira, ataco o maior ofensor primeiro e mostro o número antes e depois.",
    includes: [
      "Medição de latência ponta a ponta com captura de frames",
      "Polling rate, aceleração e filtro de suavização do mouse",
      "Fila de renderização, Reflex/Anti-Lag e modo de baixa latência",
      "Sincronia correta para o seu caso (G-Sync/FreeSync + limitador)",
      "Overdrive do monitor calibrado sem ghosting inverso",
      "Modo exclusivo de tela cheia e desativação de otimizações do Windows",
      "Cadeia de USB revisada (hubs, portas compartilhadas, energia)",
    ],
    deliverables: [
      "Medição antes/depois em milissegundos",
      "Perfil de monitor e mouse documentado",
      "Configuração de sincronia explicada em uma página",
    ],
    metrics: [
      { label: "Input lag total", before: 47, after: 21, unit: "ms", better: "down" },
      { label: "Latência de render", before: 19, after: 7, unit: "ms", better: "down" },
      { label: "Ghosting percebido", before: 8, after: 2, unit: "/10", better: "down" },
    ],
    faq: [
      { q: "Preciso de monitor de 240Hz?", a: "Não. O ganho aparece em qualquer taxa — só muda a margem disponível." },
      { q: "Serve para jogos de tiro em console?", a: "O foco é PC. Para console, consigo ajudar só na parte de monitor e periféricos." },
    ],
    requirements: ["Informar modelo do mouse e do monitor", "Cabo do monitor à mão para eventual troca de porta"],
  },
  {
    slug: "formatacao-e-instalacao-limpa",
    name: "Formatação e Instalação Limpa",
    short: "Windows do zero, enxuto e já otimizado — sem imagens piratas ou 'lite'.",
    icon: "disk",
    price: "A partir de R$ 129",
    duration: "2 a 3 h",
    headline: "Windows original, instalado do jeito que ele deveria vir de fábrica.",
    intro:
      "Nada de ISO modificada baixada em fórum: uso a imagem oficial da Microsoft e faço o enxugamento na configuração, não na base. Você fica com um sistema atualizável, seguro e leve — e com seus arquivos preservados.",
    includes: [
      "Backup guiado dos seus arquivos e perfis antes de tudo",
      "Instalação limpa com imagem oficial e particionamento correto",
      "Configuração de privacidade e telemetria na primeira inicialização",
      "Drivers instalados na ordem certa, direto do fabricante",
      "Otimização completa já aplicada no sistema novo",
      "Reinstalação dos seus programas e launchers essenciais",
      "Ativação da sua licença existente (ou orientação para comprar)",
    ],
    deliverables: [
      "Sistema pronto para uso, com login e sincronizações restauradas",
      "Pen drive de recuperação configurado (se você tiver um)",
      "Relatório do que foi instalado",
    ],
    metrics: [
      { label: "Boot do sistema", before: 74, after: 14, unit: "s", better: "down" },
      { label: "RAM em repouso", before: 5.8, after: 2.3, unit: "GB", better: "down" },
      { label: "Processos em segundo plano", before: 187, after: 96, unit: "un", better: "down" },
    ],
    faq: [
      { q: "Vou perder meus arquivos?", a: "Não, desde que o backup seja feito junto comigo antes. Se o HD tiver espaço, mantenho seus dados em partição separada." },
      { q: "Vocês usam Windows 'lite'?", a: "Nunca. Sistema modificado quebra atualização e antivírus. O enxugamento é feito por configuração." },
    ],
    requirements: ["Pen drive de 8 GB ou mais", "Licença do Windows ou conta Microsoft vinculada", "Alguém junto ao PC no momento do boot"],
  },
  {
    slug: "setup-de-live-e-gravacao",
    name: "Setup de Live e Gravação",
    short: "OBS calibrado para transmitir sem derrubar o FPS do jogo.",
    icon: "broadcast",
    price: "A partir de R$ 99",
    duration: "60 a 90 min",
    headline: "Jogar e transmitir ao mesmo tempo sem escolher entre os dois.",
    intro:
      "Streamers perdem FPS por configurar OBS no automático. Eu separo a carga de encode da carga de jogo, escolho o encoder certo para o seu hardware e valido tudo com transmissão de teste — incluindo áudio, que é onde a maioria dos problemas realmente aparece.",
    includes: [
      "Escolha do encoder (NVENC / AV1 / x264) pelo seu hardware e plataforma",
      "Bitrate, keyframe e preset por plataforma (Twitch, YouTube, Kick)",
      "Separação de trilhas de áudio (jogo, mic, alerta, música)",
      "Filtros de microfone: ruído, compressor e limiter",
      "Cenas base, alertas e transições organizados",
      "Gravação em qualidade superior à live, em paralelo",
      "Live de teste com você acompanhando os números",
    ],
    deliverables: [
      "Perfil e coleção de cenas exportados do OBS",
      "Guia de qual cena usar em cada situação",
      "Parâmetros anotados para reconfigurar em outro PC",
    ],
    metrics: [
      { label: "FPS durante a live", before: 88, after: 156, unit: "fps", better: "up" },
      { label: "Frames perdidos", before: 6.2, after: 0.1, unit: "%", better: "down" },
      { label: "Uso de CPU no encode", before: 41, after: 9, unit: "%", better: "down" },
    ],
    faq: [
      { q: "Preciso de segundo PC?", a: "Na maioria dos casos não. Com NVENC ou AV1 dá para transmitir bem em uma máquina só." },
      { q: "Configuram overlays e alertas?", a: "Organizo as cenas e integro alertas que você já tenha. Design de overlay é orçado à parte." },
    ],
    requirements: ["OBS Studio instalado", "Contas da plataforma logadas", "Upload de pelo menos 6 Mbps"],
  },
  {
    slug: "otimizacao-mobile",
    name: "Otimização Mobile",
    short: "Android e iOS ajustados para FPS estável e menos aquecimento.",
    icon: "phone",
    price: "A partir de R$ 49",
    duration: "30 a 45 min",
    headline: "Free Fire, COD Mobile e Wild Rift rodando sem queda no meio da partida.",
    intro:
      "Celular não perde FPS por falta de potência — perde por throttling térmico e por trinta apps acordando ao mesmo tempo. Ajusto o que o sistema permite sem root e sem jailbreak, com foco em estabilidade durante partidas longas.",
    includes: [
      "Auditoria de apps em segundo plano e permissões de inicialização",
      "Ajuste de sensibilidade e HUD por jogo",
      "Modo de desempenho, taxa de atualização e resolução de render",
      "Redução de throttling: limpeza de cache e gestão térmica",
      "Rede: DNS, preferência de banda e latência",
      "Configuração de gravação de tela sem perda de FPS",
    ],
    deliverables: [
      "Sensibilidade anotada para reaplicar",
      "Lista de apps que devem continuar desativados",
    ],
    metrics: [
      { label: "FPS médio", before: 44, after: 59, unit: "fps", better: "up" },
      { label: "Quedas por partida", before: 12, after: 1, unit: "un", better: "down" },
      { label: "Temperatura", before: 46, after: 39, unit: "°C", better: "down" },
    ],
    faq: [
      { q: "Precisa de root?", a: "Não. Tudo é feito com recursos nativos do sistema." },
      { q: "Como é feito remotamente?", a: "Por chamada de vídeo com espelhamento de tela, guiando você em cada passo." },
    ],
    requirements: ["Android 10+ ou iOS 15+", "Chamada de vídeo com câmera ou espelhamento"],
  },
  {
    slug: "manutencao-recorrente",
    name: "Manutenção Recorrente",
    short: "Revisão mensal para o sistema não voltar a engordar.",
    icon: "refresh",
    price: "R$ 39 / mês",
    duration: "30 min por revisão",
    headline: "Otimização não é evento único. Atualização do Windows desfaz metade.",
    intro:
      "A cada grande atualização o Windows reativa serviços, reinstala apps e mexe em energia. A manutenção recorrente reaplica o perfil, revisa drivers e mede de novo — para o ganho não escorrer com o tempo.",
    includes: [
      "Revisão mensal agendada no horário que você escolher",
      "Reaplicação do perfil após atualizações do sistema",
      "Checagem de drivers e novas versões estáveis",
      "Medição comparativa com o mês anterior",
      "Fila prioritária no suporte",
    ],
    deliverables: [
      "Histórico de desempenho mês a mês",
      "Alerta quando uma atualização for problemática para o seu hardware",
    ],
    metrics: [
      { label: "Retenção do ganho", before: 58, after: 97, unit: "%", better: "up" },
      { label: "Chamados de problema", before: 4, after: 0, unit: "un", better: "down" },
    ],
    faq: [
      { q: "Tem fidelidade?", a: "Não. Cancela quando quiser, sem multa." },
      { q: "Preciso ter feito a otimização antes?", a: "Sim — a manutenção mantém um perfil que já foi aplicado." },
    ],
    requirements: ["Ter passado por uma otimização completa"],
  },
];

/* ---------------------------------------------- PLANOS */
export type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  pitch: string;
  featured?: boolean;
  badge?: string;
  duration: string;
  cta: string;
  features: { label: string; included: boolean }[];
};

export const PLANS: Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    price: "R$ 89",
    period: "pagamento único",
    pitch: "Para quem quer tirar o peso do sistema e sentir o jogo respirar.",
    duration: "60 a 90 min",
    cta: "Começar pelo Essencial",
    features: [
      { label: "Otimização completa do Windows", included: true },
      { label: "Remoção de bloatware e processos em segundo plano", included: true },
      { label: "Plano de energia e prioridade de processo", included: true },
      { label: "Painel da placa de vídeo configurado", included: true },
      { label: "Relatório antes/depois de FPS", included: true },
      { label: "Garantia de 7 dias", included: true },
      { label: "Tuning de 1 jogo específico", included: false },
      { label: "Drivers e BIOS (XMP/EXPO, ReBAR)", included: false },
      { label: "Medição de input lag ponta a ponta", included: false },
      { label: "Setup de live e gravação", included: false },
      { label: "Suporte pós-atendimento", included: false },
    ],
  },
  {
    id: "competitivo",
    name: "Competitivo",
    price: "R$ 169",
    period: "pagamento único",
    pitch: "O padrão de quem joga ranqueado e liga para 1% low e input lag.",
    featured: true,
    badge: "Mais escolhido",
    duration: "2 a 3 h",
    cta: "Quero o Competitivo",
    features: [
      { label: "Otimização completa do Windows", included: true },
      { label: "Remoção de bloatware e processos em segundo plano", included: true },
      { label: "Plano de energia e prioridade de processo", included: true },
      { label: "Painel da placa de vídeo configurado", included: true },
      { label: "Relatório antes/depois de FPS", included: true },
      { label: "Garantia de 7 dias", included: true },
      { label: "Tuning de 1 jogo específico", included: true },
      { label: "Drivers e BIOS (XMP/EXPO, ReBAR)", included: true },
      { label: "Medição de input lag ponta a ponta", included: true },
      { label: "Setup de live e gravação", included: false },
      { label: "Suporte pós-atendimento", included: true },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: "R$ 289",
    period: "pagamento único",
    pitch: "Máquina inteira revisada, incluindo transmissão e acompanhamento.",
    duration: "4 a 6 h (pode ser em 2 sessões)",
    cta: "Falar sobre o Elite",
    features: [
      { label: "Otimização completa do Windows", included: true },
      { label: "Remoção de bloatware e processos em segundo plano", included: true },
      { label: "Plano de energia e prioridade de processo", included: true },
      { label: "Painel da placa de vídeo configurado", included: true },
      { label: "Relatório antes/depois de FPS", included: true },
      { label: "Garantia de 7 dias", included: true },
      { label: "Tuning de até 3 jogos", included: true },
      { label: "Drivers e BIOS (XMP/EXPO, ReBAR)", included: true },
      { label: "Medição de input lag ponta a ponta", included: true },
      { label: "Setup de live e gravação", included: true },
      { label: "Suporte pós-atendimento por 30 dias", included: true },
    ],
  },
];

export const PLAN_NOTES = [
  "Valores de referência para hardware doméstico. Setups com mais de um PC ou uso profissional são orçados à parte.",
  "Pagamento em PIX à vista ou cartão em até 3x (condições no atendimento).",
  "Formatação com instalação limpa entra como adicional de R$ 129 em qualquer plano.",
];

/* ---------------------------------------------- CASES / RESULTADOS */
export type Case = {
  id: string;
  title: string;
  person: string;
  setup: string;
  game: string;
  plan: string;
  summary: string;
  metrics: { label: string; before: number; after: number; unit: string; better: "up" | "down" }[];
};

export const CASES: Case[] = [
  {
    id: "case-valorant-1650",
    title: "GTX 1650 saindo de 130 para 214 FPS em VALORANT",
    person: "Rafael M. · Imortal 1",
    setup: "Ryzen 5 3600 · GTX 1650 · 16 GB 3000 MHz",
    game: "VALORANT",
    plan: "Competitivo",
    summary:
      "O gargalo não era a placa: XMP estava desligado e 41 processos de fabricante disputavam CPU. Com memória na velocidade correta e o sistema enxuto, o 1% low quase triplicou — que é o número que se sente na jogabilidade.",
    metrics: [
      { label: "FPS médio", before: 130, after: 214, unit: "fps", better: "up" },
      { label: "1% low", before: 54, after: 152, unit: "fps", better: "up" },
      { label: "Input lag", before: 44, after: 23, unit: "ms", better: "down" },
      { label: "Boot", before: 62, after: 17, unit: "s", better: "down" },
    ],
  },
  {
    id: "case-warzone-3060",
    title: "Fim do stuttering em Warzone com RTX 3060",
    person: "Beatriz L. · Casual competitiva",
    setup: "i5-12400F · RTX 3060 · 16 GB 3200 MHz",
    game: "WARZONE",
    plan: "Competitivo",
    summary:
      "FPS médio já era bom, mas travava a cada 8 segundos. O culpado era o cache de shader estourando junto com o antivírus varrendo a pasta do jogo em tempo real. Ajustes de exclusão e cache resolveram sem tocar em hardware.",
    metrics: [
      { label: "FPS médio", before: 118, after: 147, unit: "fps", better: "up" },
      { label: "1% low", before: 39, after: 112, unit: "fps", better: "up" },
      { label: "Variação de frametime", before: 11.8, after: 2.4, unit: "ms", better: "down" },
    ],
  },
  {
    id: "case-stream-4070",
    title: "Live em 1080p60 sem derrubar o jogo",
    person: "Diego 'dgx' · Streamer, 1,2k seguidores",
    setup: "Ryzen 7 5700X · RTX 4070 · 32 GB",
    game: "APEX LEGENDS",
    plan: "Elite",
    summary:
      "Transmitia em x264 no mesmo processador que rodava o jogo. Migração para NVENC, separação de trilhas de áudio e limitador alinhado ao monitor: live estável e quase zero frame perdido.",
    metrics: [
      { label: "FPS na live", before: 84, after: 163, unit: "fps", better: "up" },
      { label: "Frames perdidos", before: 5.9, after: 0.1, unit: "%", better: "down" },
      { label: "CPU no encode", before: 38, after: 8, unit: "%", better: "down" },
    ],
  },
  {
    id: "case-notebook",
    title: "Notebook de 2019 voltando a rodar CS2 competitivo",
    person: "Lucas A. · Estudante",
    setup: "i7-9750H · GTX 1660 Ti Mobile · 16 GB",
    game: "CS2",
    plan: "Essencial",
    summary:
      "Notebook com throttling térmico severo e 6 utilitários do fabricante rodando. Curva de energia, undervolt conservador e limpeza de software: temperatura caiu 16 °C e o FPS parou de despencar depois de 20 minutos.",
    metrics: [
      { label: "FPS médio", before: 97, after: 161, unit: "fps", better: "up" },
      { label: "FPS após 30 min", before: 61, after: 154, unit: "fps", better: "up" },
      { label: "Temperatura CPU", before: 96, after: 80, unit: "°C", better: "down" },
    ],
  },
];

export const AGGREGATE_RESULTS = [
  { label: "Ganho médio de FPS", value: 42, unit: "%", detail: "média ponderada de 312 atendimentos com medição antes/depois" },
  { label: "Ganho médio de 1% low", value: 88, unit: "%", detail: "o número que elimina a sensação de travada" },
  { label: "Redução de input lag", value: 38, unit: "%", detail: "medido do clique ao pixel com captura de frames" },
  { label: "Redução no tempo de boot", value: 63, unit: "%", detail: "de ligar até a área de trabalho utilizável" },
];

/* ---------------------------------------------- DEPOIMENTOS */
export type Testimonial = {
  name: string;
  handle: string;
  role: string;
  text: string;
  metric?: string;
  source: "Discord" | "Instagram" | "WhatsApp" | "Google";
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  { name: "Rafael Moura", handle: "@rafa.mvp", role: "VALORANT · Imortal", source: "Discord", rating: 5, metric: "130 → 214 FPS", text: "Achei que ia precisar trocar de placa. Saí de 130 pra 214 de FPS médio com o mesmo PC, e o que mais mudou foi a estabilidade — parou de dar aquela travadinha na hora da troca de tiro." },
  { name: "Beatriz Lopes", handle: "@bia.plays", role: "Warzone · Casual", source: "Instagram", rating: 5, metric: "Stutter zerado", text: "Meu problema não era FPS baixo, era travar do nada. Ele identificou em 20 minutos uma coisa que dois técnicos aqui da cidade não acharam. Explicou tudo enquanto fazia." },
  { name: "Diego Xavier", handle: "@dgx", role: "Streamer", source: "Discord", rating: 5, metric: "0,1% de frames perdidos", text: "Live e jogo no mesmo PC sempre foi um sofrimento. Agora transmito em 1080p60 com o jogo acima de 160 FPS. Ele configurou até o áudio, que era o que mais me dava dor de cabeça." },
  { name: "Lucas Andrade", handle: "@lukz", role: "CS2 · Notebook", source: "WhatsApp", rating: 5, metric: "-16 °C na CPU", text: "Notebook velho, já tava me conformando. O ganho maior foi o PC parar de esquentar e cair FPS depois de meia hora de jogo. Valeu cada centavo." },
  { name: "Camila Reis", handle: "@mila.rz", role: "Fortnite", source: "Instagram", rating: 5, metric: "Boot de 58s → 15s", text: "Não entendo nada de PC e tinha medo de deixar alguém mexer remoto. Ele mostrou a tela o tempo todo, avisou antes de cada mudança e fez ponto de restauração. Zero estresse." },
  { name: "Pedro Henrique", handle: "@ph.gg", role: "Apex Legends", source: "Discord", rating: 5, metric: "1% low +140%", text: "O relatório de antes e depois é o diferencial. Não é 'confia que melhorou', é número em cima da mesa. Já indiquei pra três amigos do time." },
  { name: "Thiago Nunes", handle: "@thg", role: "League of Legends", source: "Google", rating: 5, metric: "Ping -22ms", text: "O ping caiu de 68 pra 46 só com ajuste de rede e DNS. Nem sabia que dava. Atendimento no horário marcado e sem enrolação." },
  { name: "Amanda Costa", handle: "@amandacs", role: "Rocket League", source: "Instagram", rating: 4, metric: "144 FPS travados", text: "Demorou um pouco mais do que o previsto porque meu PC tinha um problema de driver antigo, mas ele ficou até resolver sem cobrar a mais. Isso conta muito." },
];

export const SOCIAL_PROOF_NUMBERS = [
  { value: "3.142", label: "atendimentos concluídos" },
  { value: "4,9", label: "nota média em 8 meses" },
  { value: "96%", label: "recomendariam a um amigo" },
  { value: "12 min", label: "tempo médio de resposta" },
];

/* ---------------------------------------------- PROCESSO */
export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Diagnóstico gratuito",
    time: "10 min · sem compromisso",
    text: "Você manda o hardware e o jogo principal pelo WhatsApp ou Discord. Eu digo o que dá para ganhar no seu caso — inclusive quando o ganho for pequeno e não valer a pena.",
    detail: [
      "Formulário curto: processador, placa de vídeo, memória, jogo e o problema principal",
      "Resposta com estimativa realista de ganho e qual plano faz sentido",
      "Se o gargalo for hardware, eu falo antes de você pagar",
    ],
  },
  {
    n: "02",
    title: "Agendamento",
    time: "você escolhe o horário",
    text: "Escolhemos um horário em que você não vá precisar do PC. Pagamento em PIX ou cartão, e a confirmação vem com o passo a passo do que preparar.",
    detail: [
      "Janelas de 10h às 22h, de segunda a sábado",
      "Lembrete 1h antes do atendimento",
      "Checklist do que ter à mão (senha de BIOS, licença, pen drive)",
    ],
  },
  {
    n: "03",
    title: "Medição do 'antes'",
    time: "15 min",
    text: "Antes de mudar qualquer coisa, gravo o estado atual: FPS médio, 1% low, input lag, tempo de boot e temperatura. Sem esse número, não existe prova de resultado.",
    detail: [
      "Benchmark no seu jogo real, não em teste sintético",
      "Captura de frametime e latência",
      "Ponto de restauração do sistema criado na sua frente",
    ],
  },
  {
    n: "04",
    title: "Otimização com você assistindo",
    time: "1 a 4 h, conforme o plano",
    text: "Acesso remoto com a sua tela visível para você o tempo todo. Explico cada mudança antes de aplicar, e você pode encerrar a sessão a qualquer momento.",
    detail: [
      "Ferramenta de acesso remoto que você inicia e encerra",
      "Nada é instalado sem aviso",
      "Você pode gravar a sessão se quiser",
    ],
  },
  {
    n: "05",
    title: "Medição do 'depois' e entrega",
    time: "20 min",
    text: "Repito exatamente os mesmos testes e monto o relatório comparativo. Você recebe o PDF, o perfil salvo e a garantia de 7 dias para qualquer ajuste.",
    detail: [
      "Relatório PDF com gráficos antes/depois",
      "Perfis exportados para reaplicar no futuro",
      "7 dias de ajuste gratuito — não gostou, eu refaço ou devolvo",
    ],
  },
];

/* ---------------------------------------------- FAQ */
export const FAQ_CATEGORIES = [
  {
    title: "Segurança e privacidade",
    items: [
      { q: "É seguro dar acesso remoto ao meu PC?", a: "Você inicia a sessão, vê tudo o que acontece na sua tela e encerra quando quiser. Uso ferramenta de acesso pontual — não fica nada instalado com acesso permanente. Nunca peço senha de banco, e-mail ou qualquer conta que não seja necessária para o serviço." },
      { q: "Vocês mexem nos meus arquivos pessoais?", a: "Não. O trabalho é em configuração de sistema, serviços e drivers. Suas pastas pessoais não são abertas. No caso de formatação, o backup é feito com você acompanhando cada passo." },
      { q: "Meus dados ficam guardados?", a: "Só o necessário para o atendimento: contato, especificação do hardware e o relatório de desempenho. Nada é vendido ou compartilhado. Você pode pedir a exclusão a qualquer momento pela Política de Privacidade." },
    ],
  },
  {
    title: "Resultado e garantia",
    items: [
      { q: "Quanto de FPS eu vou ganhar?", a: "Depende do estado atual da máquina. A média dos atendimentos é de 42% no FPS médio e 88% no 1% low — mas em PCs já bem configurados o ganho é menor. No diagnóstico gratuito eu digo a estimativa antes de você pagar, e aviso quando não vale a pena." },
      { q: "E se não melhorar nada?", a: "Você tem 7 dias de garantia. Se os números do relatório não mostrarem ganho relevante, eu refaço o atendimento ou devolvo o valor integral. A medição antes/depois existe justamente para isso não virar discussão." },
      { q: "O ganho dura para sempre?", a: "Não. Atualizações grandes do Windows reativam serviços e mexem em energia, e o sistema volta a acumular software com o tempo. Por isso existe o plano de manutenção recorrente — ou você reaplica o perfil que eu deixo salvo." },
      { q: "Isso dá ban em jogo com anticheat?", a: "Não. Não uso injeção de código, DLL, cheat, script de terceiros ou 'otimizador' de origem duvidosa. Só configurações nativas do Windows, do driver, da BIOS e do próprio jogo — exatamente o que times profissionais fazem." },
    ],
  },
  {
    title: "Compatibilidade e requisitos",
    items: [
      { q: "Funciona em qualquer PC?", a: "Funciona em Windows 10 e 11, desktop ou notebook, com qualquer placa NVIDIA, AMD ou Intel. Em máquinas muito antigas o ganho existe, mas é limitado — e eu digo isso antes." },
      { q: "Preciso de internet rápida?", a: "Para o acesso remoto, uma conexão estável de 10 Mbps já resolve. A qualidade da sua internet não afeta o resultado da otimização, só o conforto da sessão." },
      { q: "Vocês atendem console?", a: "Não. O foco é PC e mobile. Para console consigo ajudar apenas na parte de monitor, cabo e periférico." },
    ],
  },
  {
    title: "Atendimento e pagamento",
    items: [
      { q: "Quanto tempo demora?", a: "Do Essencial (60 a 90 min) ao Elite (4 a 6 h, que pode ser dividido em duas sessões). O tempo exato vai na confirmação do agendamento." },
      { q: "Como pago?", a: "PIX à vista ou cartão em até 3x. O pagamento é feito antes do atendimento começar, e a nota é enviada por e-mail." },
      { q: "Preciso ficar na frente do PC?", a: "Não o tempo todo, mas é bom estar por perto no começo e no fim. Na formatação, alguém precisa estar junto na hora de dar boot pelo pen drive." },
      { q: "Atende fora do Brasil?", a: "Sim, desde que o fuso permita agendar dentro do horário de atendimento e o pagamento seja combinado antes." },
    ],
  },
];

/* ---------------------------------------------- BLOG */
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "1-percent-low-importa-mais-que-fps-medio",
    title: "Por que o 1% low importa mais que o FPS médio",
    excerpt:
      "Seu contador marca 200 FPS e o jogo continua parecendo travado. O número que explica isso quase ninguém olha.",
    category: "Fundamentos",
    date: "2026-08-28",
    readTime: "6 min",
    featured: true,
    body: [
      "O FPS médio é uma média — e média esconde o pior momento. Se o jogo entrega 240 quadros por segundo durante 59 segundos e 30 quadros no segundo em que o inimigo aparece, a média continua bonita e a partida está perdida.",
      "O 1% low mede exatamente esse pior momento: é a média do 1% de quadros mais lentos da sessão. É o número que corresponde à sensação de travada, de mira 'pulando' e de tiro que não registrou.",
      "Na prática, um PC com 140 de média e 120 de 1% low é mais agradável de jogar que um com 200 de média e 45 de 1% low. Estabilidade ganha de pico quase sempre.",
      "As causas mais comuns de 1% low ruim são: memória rodando abaixo da velocidade nominal, antivírus varrendo a pasta do jogo em tempo real, cache de shader mal dimensionado e processos de fabricante acordando em intervalo fixo.",
      "Por isso todo relatório de otimização daqui traz os dois números. Melhorar só a média é fácil e engana. Melhorar o 1% low é o trabalho de verdade.",
    ],
  },
  {
    slug: "xmp-expo-memoria-metade-da-velocidade",
    title: "XMP desligado: por que metade dos PCs roda a memória pela metade",
    excerpt:
      "Você pagou por memória de 3200 MHz e o Windows está usando 2133. É um clique na BIOS — e quase ninguém deu.",
    category: "Hardware",
    date: "2026-08-14",
    readTime: "5 min",
    body: [
      "Memória RAM sai de fábrica configurada no padrão conservador da JEDEC, normalmente 2133 ou 2400 MHz. A velocidade que está na caixa só é atingida com um perfil ativado manualmente: XMP na Intel, EXPO na AMD.",
      "Como quem monta o PC raramente entra na BIOS depois de instalar o Windows, o perfil fica desligado. O usuário passa anos usando 66% da velocidade que comprou.",
      "O impacto é maior do que parece. Em jogos com muita simulação — CS2, VALORANT, Warzone, qualquer battle royale com 100 jogadores — a memória alimenta a CPU, e CPU faminta significa 1% low despencando.",
      "Ativar é simples: entrar na BIOS, procurar o perfil XMP/EXPO, escolher o perfil 1 e salvar. O que exige atenção é a validação: nem toda combinação de placa-mãe, processador e pente sustenta o perfil, e um sistema instável é pior que um sistema lento.",
      "Por isso, aqui, ativação de perfil sempre vem acompanhada de teste de estabilidade e de backup do perfil anterior da BIOS.",
    ],
  },
  {
    slug: "input-lag-da-onde-vem",
    title: "Input lag: de onde vem cada milissegundo entre o clique e o pixel",
    excerpt:
      "Não existe 'o' input lag. Existe uma cadeia de sete etapas, e otimizar a errada não muda nada.",
    category: "Latência",
    date: "2026-07-30",
    readTime: "8 min",
    body: [
      "Do momento em que o botão do mouse fecha o contato até o pixel mudar de cor no monitor, o sinal passa por sete etapas: mouse, USB, sistema operacional, motor do jogo, fila de renderização, saída da GPU e painel do monitor.",
      "Cada etapa tem uma faixa típica. O mouse a 1000 Hz contribui com cerca de 1 ms. A fila de renderização mal configurada pode contribuir com 15 a 30 ms sozinha — é quase sempre o maior ofensor, e é gratuito de resolver.",
      "Sincronia vertical tradicional adiciona um quadro inteiro de espera. Já G-Sync ou FreeSync com limitador de FPS alguns quadros abaixo da taxa máxima do monitor entrega imagem sem rasgo e latência quase igual à do V-Sync desligado.",
      "O overdrive do monitor é o passo mais ignorado: no ajuste errado ele cria ghosting inverso, que não aparece em número nenhum mas atrapalha a leitura do movimento.",
      "A regra é medir antes de mexer. Sem captura de frames, otimizar latência vira fé.",
    ],
  },
  {
    slug: "otimizadores-de-um-clique-por-que-nao",
    title: "Otimizadores de um clique: por que eu não uso nenhum",
    excerpt:
      "Programas que prometem +200 FPS num botão. O que eles realmente fazem com o seu sistema.",
    category: "Opinião",
    date: "2026-07-11",
    readTime: "5 min",
    body: [
      "A promessa é sempre a mesma: um botão, um ganho enorme, nenhum conhecimento necessário. O que esses programas fazem, na prática, é desativar serviços em lote sem saber o que a sua máquina usa.",
      "O resultado típico: impressora que para de funcionar, Windows Update quebrado, áudio sumindo em chamada, e um ganho de FPS que existe só porque o programa fica ele mesmo consumindo recurso em segundo plano medindo.",
      "Pior: vários deles instalam serviços com permanência e telemetria própria. Você troca vinte processos por dezoito processos e um deles é do próprio 'otimizador'.",
      "Otimização é decisão caso a caso. O serviço que é lixo no seu PC pode ser essencial no meu. Isso não cabe num botão.",
      "O critério que uso é simples: se eu não consigo explicar o que uma mudança faz e como desfazer, ela não entra.",
    ],
  },
  {
    slug: "stuttering-em-jogos-shader-cache",
    title: "Stuttering: o cache de shader é o culpado mais provável",
    excerpt:
      "Travadinhas de meio segundo em intervalos irregulares têm quase sempre a mesma origem.",
    category: "Diagnóstico",
    date: "2026-06-22",
    readTime: "6 min",
    body: [
      "Stuttering com FPS médio alto é uma assinatura clara: o jogo está compilando shaders durante a partida em vez de antes dela.",
      "O cache de shader guarda essas compilações. Quando o limite de tamanho é pequeno demais, o cache é descartado e tudo é recompilado — no meio do jogo.",
      "Antivírus varrendo a pasta do cache em tempo real produz o mesmo sintoma, porque cada leitura vira uma verificação.",
      "A correção envolve aumentar o limite do cache no painel da placa, excluir as pastas do jogo e do cache da varredura em tempo real e, em alguns jogos, forçar a pré-compilação no primeiro carregamento.",
      "É um ajuste de cinco minutos que costuma resolver o problema que faz a pessoa achar que precisa trocar de placa de vídeo.",
    ],
  },
  {
    slug: "checklist-manutencao-mensal",
    title: "Checklist de manutenção mensal para não perder o ganho",
    excerpt:
      "Sete verificações de dez minutos que impedem o Windows de desfazer a otimização.",
    category: "Manutenção",
    date: "2026-06-03",
    readTime: "4 min",
    body: [
      "Toda atualização grande do Windows reativa serviços, reinstala aplicativos sugeridos e às vezes troca o plano de energia. O ganho escorre devagar, e quando você percebe já voltou ao começo.",
      "A rotina que recomendo: verificar o plano de energia ativo, conferir se os serviços desativados continuam desativados, revisar a lista de inicialização, checar versão do driver de vídeo, olhar o espaço livre do disco do sistema, rodar o mesmo benchmark de sempre e comparar com o mês anterior.",
      "O ponto mais importante é o último. Sem comparar com uma medição anterior, você não sabe se perdeu desempenho — só sente que 'está mais lento', o que é impossível de agir em cima.",
      "Guarde os números. Uma planilha simples com data, FPS médio e 1% low já resolve.",
    ],
  },
];

export const BLOG_CATEGORIES = ["Todos", "Fundamentos", "Hardware", "Latência", "Diagnóstico", "Manutenção", "Opinião"];

/* ---------------------------------------------- SOBRE */
export const ABOUT = {
  operatorName: "Eduardo Santos",
  operatorHandle: "@usantoosfps",
  role: "Especialista em performance de sistemas para jogos",
  since: 2021,
  bio: [
    "Comecei otimizando o meu próprio PC porque não tinha dinheiro para trocar de placa de vídeo. Um Ryzen 3 com uma GTX 1050 Ti que precisava aguentar CS competitivo. Descobri, testando por meses, que o gargalo raramente é o que a gente acha que é.",
    "De 2021 para cá foram mais de três mil atendimentos, sempre remotos, sempre com medição antes e depois. O método é o mesmo desde o começo: medir, mudar uma coisa por vez, medir de novo. Se o número não melhorou, a mudança volta atrás.",
    "Não vendo milagre. Existe hardware que já está no limite, e nesses casos eu digo antes de você pagar. O que eu entrego é o máximo que a sua máquina consegue dar hoje — que costuma ser bem mais do que ela está dando.",
  ],
  credentials: [
    { title: "3.142 atendimentos", detail: "PCs e celulares otimizados desde 2021, todos remotamente" },
    { title: "Medição instrumentada", detail: "Captura de frametime e latência ponta a ponta, não achismo" },
    { title: "Zero anticheat flagrado", detail: "Nenhum cliente banido em cinco anos — nada de injeção ou terceiros" },
    { title: "Comunidade de 4,8 mil membros", detail: "Discord ativo com suporte e conteúdo técnico gratuito" },
  ],
  principles: [
    { title: "Medir antes de mexer", text: "Sem número inicial não existe prova de resultado. Toda sessão começa com benchmark no seu jogo real." },
    { title: "Nada irreversível", text: "Ponto de restauração antes, perfil de BIOS salvo, backup de config. Tudo volta em um clique." },
    { title: "Sem caixa-preta", text: "Você assiste a sessão inteira e eu explico cada mudança antes de aplicar. Se não dá para explicar, não entra." },
    { title: "Honestidade sobre limite", text: "Quando o gargalo é hardware, eu falo — mesmo que isso signifique não fechar a venda." },
  ],
  toolbox: [
    "CapFrameX e PresentMon para frametime",
    "Captura de latência ponta a ponta",
    "DDU para remoção limpa de driver",
    "OCCT e memtest para validação de estabilidade",
    "HWiNFO para telemetria térmica",
    "Process Explorer e Autoruns para auditoria",
  ],
};

/* ---------------------------------------------- CONTATO */
export const CONTACT_SLOTS = [
  { day: "Segunda", slots: ["14:00", "16:00", "19:00", "21:00"] },
  { day: "Terça", slots: ["10:00", "14:00", "19:00"] },
  { day: "Quarta", slots: ["14:00", "16:00", "21:00"] },
  { day: "Quinta", slots: ["10:00", "19:00", "21:00"] },
  { day: "Sexta", slots: ["14:00", "16:00", "19:00"] },
  { day: "Sábado", slots: ["10:00", "12:00", "14:00"] },
];
