// src/lib/ferramentas.ts
//
// Ferramentas gratuitas recomendadas — dados da página /gratis/ferramentas.
//
// NOTA: as URLs oficiais vieram do material do cliente. Confira uma a uma antes
// de publicar: sites de utilitário mudam de domínio com frequência (o UniGetUI,
// por exemplo, migrou para o domínio da Devolutions). Um link quebrado numa
// página que existe para gerar confiança custa mais do que a página rende.

export type CategoriaFerramenta =
  | "Diagnóstico"
  | "Medição"
  | "Sistema"
  | "Manutenção"
  | "Hardware";

export interface Ferramenta {
  id: string;
  nome: string;
  categoria: CategoriaFerramenta;
  /** O que a ferramenta resolve, em uma frase. */
  paraQueServe: string;
  /** Como tirar proveito dela sem se perder. */
  comoUsar: string;
  /** O erro que as pessoas cometem com ela. */
  cuidado: string;
  siteOficial: string;
  /** Domínio exibido abaixo do botão, para o usuário conferir antes de clicar. */
  dominio: string;
}

export const CATEGORIAS: CategoriaFerramenta[] = [
  "Diagnóstico",
  "Medição",
  "Sistema",
  "Manutenção",
  "Hardware",
];

export const FERRAMENTAS: Ferramenta[] = [
  // ───────────────────────────── Diagnóstico ─────────────────────────────
  {
    id: "autoruns",
    nome: "Autoruns",
    categoria: "Diagnóstico",
    paraQueServe:
      "Mostra tudo o que sobe junto com o Windows: programas, serviços, tarefas agendadas, extensões e pontos de inicialização que o Gerenciador de Tarefas não lista.",
    comoUsar:
      "Ative “Hide Microsoft Entries” e desmarque apenas itens de terceiros que você reconhece. Reinicie e teste uma alteração por vez — assim você sabe qual mudança causou o quê.",
    cuidado:
      "Desmarcar é reversível, apagar não. Não remova entradas e não desative drivers, serviços da Microsoft ou o antivírus.",
    siteOficial:
      "https://learn.microsoft.com/pt-br/sysinternals/downloads/autoruns",
    dominio: "learn.microsoft.com",
  },
  {
    id: "process-explorer",
    nome: "Process Explorer",
    categoria: "Diagnóstico",
    paraQueServe:
      "Identifica processos pesados, arquivos travados, DLLs carregadas, processos-filhos e o consumo real de CPU, RAM e GPU.",
    comoUsar:
      "Execute como administrador, ordene pela coluna de maior uso e investigue o processo antes de encerrá-lo. Ele mostra quem é o pai de cada processo, que é o que costuma revelar a origem do problema.",
    cuidado:
      "Não finalize processos do Windows aleatoriamente. Derrubar o processo errado tira a interface, a rede ou o sistema inteiro do ar.",
    siteOficial:
      "https://learn.microsoft.com/pt-br/sysinternals/downloads/process-explorer",
    dominio: "learn.microsoft.com",
  },
  {
    id: "hwinfo",
    nome: "HWiNFO",
    categoria: "Diagnóstico",
    paraQueServe:
      "Monitora temperatura, clock, tensão, potência e uso de praticamente todos os sensores do hardware.",
    comoUsar:
      "Abra em modo “Sensors-only”, jogue por alguns minutos e depois confira as máximas: CPU, GPU, hotspot, clocks e indicadores de limite térmico ou de potência.",
    cuidado:
      "Sensor alto não é diagnóstico. Confirme o limite oficial do componente antes de mexer em tensão ou clock por causa de um número.",
    siteOficial: "https://www.hwinfo.com/download/",
    dominio: "hwinfo.com",
  },
  {
    id: "crystaldiskinfo",
    nome: "CrystalDiskInfo",
    categoria: "Diagnóstico",
    paraQueServe:
      "Lê os dados S.M.A.R.T. de SSDs e HDs: saúde, temperatura, horas ligadas e alertas de falha iminente.",
    comoUsar:
      "Cheque de tempos em tempos. Se aparecer “Caution” ou “Bad”, faça backup no mesmo dia — antes de tentar qualquer reparo.",
    cuidado:
      "Ele diagnostica, não recupera. Disco degradado não volta ao normal por software, e nenhum indicador substitui backup.",
    siteOficial: "https://crystalmark.info/en/software/crystaldiskinfo/",
    dominio: "crystalmark.info",
  },
  {
    id: "latencymon",
    nome: "LatencyMon",
    categoria: "Diagnóstico",
    paraQueServe:
      "Aponta picos de DPC e ISR, hard pagefaults e drivers que causam estalo de áudio, travadinha e latência sem motivo aparente.",
    comoUsar:
      "Rode alguns minutos com o PC parado e depois durante o problema. Olhe as abas Drivers, CPUs e Processes — não só a frase da tela inicial.",
    cuidado:
      "Um pico isolado não prova nada. Compare várias execuções e investigue o driver apontado antes de remover qualquer coisa.",
    siteOficial: "https://www.resplendence.com/latencymon",
    dominio: "resplendence.com",
  },

  // ─────────────────────────────── Medição ───────────────────────────────
  {
    id: "capframex",
    nome: "CapFrameX",
    categoria: "Medição",
    paraQueServe:
      "Captura FPS, frametimes, percentis e stuttering — o que realmente descreve a sensação de fluidez, muito além da média.",
    comoUsar:
      "Repita sempre a mesma cena, duração, resolução e configuração. Depois compare 1% low, 0,1% low e o gráfico de frametime, não só o FPS médio.",
    cuidado:
      "Teste diferente gera conclusão errada. Sem padronizar o cenário, é impossível afirmar que um ajuste melhorou alguma coisa.",
    siteOficial: "https://www.capframex.com/",
    dominio: "capframex.com",
  },
  {
    id: "crystaldiskmark",
    nome: "CrystalDiskMark",
    categoria: "Medição",
    paraQueServe:
      "Mede velocidade sequencial e aleatória de SSD, NVMe, HD e dispositivos USB.",
    comoUsar:
      "Feche os programas, selecione o disco certo e faça poucas execuções. Compare com o resultado esperado para aquele modelo e aquela interface.",
    cuidado:
      "Benchmark grava dados de verdade. Repetir testes pesados sem necessidade consome ciclos de gravação e esquenta o SSD.",
    siteOficial: "https://crystalmark.info/en/software/crystaldiskmark/",
    dominio: "crystalmark.info",
  },
  {
    id: "occt",
    nome: "OCCT",
    categoria: "Medição",
    paraQueServe:
      "Testa estabilidade e detecta erro em CPU, GPU, memória, VRAM e alimentação.",
    comoUsar:
      "Comece com testes curtos, de 10 a 15 minutos, acompanhando temperatura. Pare na hora se aparecer erro ou se o aquecimento fugir do controle.",
    cuidado:
      "É carga extrema. Não deixe rodando sem supervisão e não use em máquina que já está superaquecendo.",
    siteOficial: "https://www.ocbase.com/",
    dominio: "ocbase.com",
  },
  {
    id: "memtest86",
    nome: "MemTest86",
    categoria: "Medição",
    paraQueServe:
      "Testa a memória RAM fora do Windows, por pendrive inicializável — a única forma confiável de isolar erro de memória.",
    comoUsar:
      "Faça no mínimo quatro passagens. Se der erro, teste módulo por módulo e slot por slot, com XMP/EXPO desativado durante o diagnóstico.",
    cuidado:
      "Erro não condena o pente automaticamente. Frequência, tensão e slot causam falha do mesmo jeito.",
    siteOficial: "https://www.memtest86.com/",
    dominio: "memtest86.com",
  },

  // ─────────────────────────────── Sistema ───────────────────────────────
  {
    id: "powertoys",
    nome: "Microsoft PowerToys",
    categoria: "Sistema",
    paraQueServe:
      "Adiciona ferramentas que faltam no Windows: FancyZones, PowerRename, PowerToys Run, seletor de cores e atalhos avançados.",
    comoUsar:
      "Ative só os módulos que você vai usar de fato. Para produtividade, comece por FancyZones, PowerRename e PowerToys Run.",
    cuidado:
      "Não ligue tudo por hábito. Cada módulo ativo é mais um processo residente em segundo plano.",
    siteOficial: "https://learn.microsoft.com/pt-br/windows/powertoys/",
    dominio: "learn.microsoft.com",
  },
  {
    id: "everything",
    nome: "Everything",
    categoria: "Sistema",
    paraQueServe:
      "Acha qualquer arquivo ou pasta pelo nome quase instantaneamente, consumindo quase nada.",
    comoUsar:
      "Use os filtros ext:, path:, size: e date: para localizar arquivos grandes, formatos específicos ou itens recentes.",
    cuidado:
      "Confira o caminho completo antes de abrir, mover ou apagar. Nomes parecidos em pastas diferentes são a causa mais comum de estrago.",
    siteOficial: "https://www.voidtools.com/",
    dominio: "voidtools.com",
  },
  {
    id: "wiztree",
    nome: "WizTree",
    categoria: "Sistema",
    paraQueServe:
      "Mostra em segundos quais pastas e arquivos estão ocupando o disco.",
    comoUsar:
      "Ordene por tamanho e investigue Downloads, vídeos, instaladores, caches e duplicados antes de apagar qualquer coisa.",
    cuidado:
      "Não exclua nada dentro de Windows, Program Files, ProgramData ou AppData sem saber exatamente para que serve.",
    siteOficial: "https://diskanalyzer.com/",
    dominio: "diskanalyzer.com",
  },
  {
    id: "7-zip",
    nome: "7-Zip",
    categoria: "Sistema",
    paraQueServe:
      "Compacta e extrai 7z, ZIP, RAR e praticamente qualquer outro formato.",
    comoUsar:
      "Use 7z quando quiser compressão e ZIP quando precisar de compatibilidade. Baixe apenas do domínio oficial.",
    cuidado:
      "Arquivo compactado também carrega malware. Extrair sem erro não significa que o conteúdo é seguro.",
    siteOficial: "https://www.7-zip.org/",
    dominio: "7-zip.org",
  },
  {
    id: "unigetui",
    nome: "UniGetUI",
    categoria: "Sistema",
    paraQueServe:
      "Dá interface gráfica ao WinGet e a outros gerenciadores, para instalar e atualizar programas em lote.",
    comoUsar:
      "Confira nome, publicador e origem de cada pacote. Atualize em grupos pequenos e mantenha driver de hardware fora daqui.",
    cuidado:
      "Não aceite toda atualização no automático, e nunca use gerenciador genérico para BIOS, firmware ou driver sensível.",
    siteOficial: "https://devolutions.net/unigetui/",
    dominio: "devolutions.net",
  },

  // ───────────────────────────── Manutenção ──────────────────────────────
  {
    id: "revo-uninstaller",
    nome: "Revo Uninstaller Free",
    categoria: "Manutenção",
    paraQueServe:
      "Desinstala programas e encontra as sobras de arquivo e de Registro que o desinstalador padrão deixa para trás.",
    comoUsar:
      "Deixe o desinstalador oficial terminar primeiro, use a varredura moderada e revise cada sobra antes de remover.",
    cuidado:
      "Não marque tudo de uma vez. Pastas compartilhadas podem pertencer a outro programa que continua instalado.",
    siteOficial:
      "https://www.revouninstaller.com/br/products/revo-uninstaller-free/",
    dominio: "revouninstaller.com",
  },
  {
    id: "ddu",
    nome: "Display Driver Uninstaller",
    categoria: "Manutenção",
    paraQueServe:
      "Remove por completo drivers de vídeo AMD, NVIDIA ou Intel quando há corrupção, conflito ou troca de placa.",
    comoUsar:
      "Baixe o driver novo antes, desconecte a internet, entre em Modo de Segurança e use “Clean and restart”.",
    cuidado:
      "Não é limpeza de rotina. Em sistema saudável, o instalador oficial do fabricante já resolve.",
    siteOficial:
      "https://www.wagnardsoft.com/display-driver-uninstaller-ddu",
    dominio: "wagnardsoft.com",
  },
  {
    id: "adwcleaner",
    nome: "Malwarebytes AdwCleaner",
    categoria: "Manutenção",
    paraQueServe:
      "Procura adware, programas indesejados, barras, extensões e alterações suspeitas no navegador.",
    comoUsar:
      "Atualize, faça a varredura e revise a lista antes de mandar para a quarentena. Reinicie quando ele pedir.",
    cuidado:
      "Detecção de PUP não é sinônimo de vírus. Confirme o nome e restaure da quarentena se algo legítimo for levado junto.",
    siteOficial: "https://www.malwarebytes.com/adwcleaner",
    dominio: "malwarebytes.com",
  },
  {
    id: "rufus",
    nome: "Rufus",
    categoria: "Manutenção",
    paraQueServe:
      "Cria pendrives inicializáveis para instalar, recuperar ou diagnosticar sistemas.",
    comoUsar:
      "Confirme o dispositivo selecionado três vezes, use uma ISO confiável e escolha GPT/UEFI em máquinas modernas.",
    cuidado:
      "O pendrive escolhido é apagado por inteiro. Selecionar a unidade errada destrói os dados dela.",
    siteOficial: "https://rufus.ie/",
    dominio: "rufus.ie",
  },

  // ─────────────────────────────── Hardware ──────────────────────────────
  {
    id: "msi-afterburner",
    nome: "MSI Afterburner",
    categoria: "Hardware",
    paraQueServe:
      "Monitora a GPU, cria overlay junto com o RivaTuner, ajusta curva de ventoinha e, para quem sabe o que está fazendo, permite tuning.",
    comoUsar:
      "Comece só pelo monitoramento: FPS, frametime, temperatura, hotspot, clock, potência e uso da GPU.",
    cuidado:
      "Não aplique overclock ou undervolt copiado da internet. Instabilidade fecha jogo e provoca driver timeout.",
    siteOficial: "https://www.msi.com/Landing/afterburner",
    dominio: "msi.com",
  },
  {
    id: "fancontrol",
    nome: "FanControl",
    categoria: "Hardware",
    paraQueServe:
      "Cria curvas personalizadas para as ventoinhas de CPU, GPU e gabinete, a partir do sensor que você escolher.",
    comoUsar:
      "Faça a configuração assistida, identifique cada ventoinha e monte curvas suaves, com mínima e máxima seguras.",
    cuidado:
      "Rotação mínima baixa demais sem teste é receita de superaquecimento. Valide sob carga antes de deixar rodando.",
    siteOficial: "https://getfancontrol.com/",
    dominio: "getfancontrol.com",
  },
];

export const CONTAGEM_FERRAMENTAS = FERRAMENTAS.length;
