import type { Metadata } from "next";
import { CONTACT, BRAND } from "@/lib/site";
import { PageHero } from "@/components/Blocks";
import { LegalDoc, type LegalSection } from "@/components/Legal";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Quais dados são coletados, para quê, por quanto tempo e como pedir exclusão.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "quem-somos",
    title: "Quem somos",
    body: [
      `${BRAND.legalName} presta serviços de otimização de desempenho para computadores e dispositivos móveis, de forma remota. O responsável pelo tratamento dos dados é o próprio prestador, que pode ser contatado em ${CONTACT.email} ou pelo WhatsApp ${CONTACT.whatsappLabel}.`,
      "Esta política explica, em linguagem direta, o que é coletado e o que não é. Se algum ponto não estiver claro, é só perguntar — a resposta vira uma atualização deste texto.",
    ],
  },
  {
    id: "dados-coletados",
    title: "Quais dados são coletados",
    body: [
      "São coletados apenas os dados necessários para realizar e comprovar o atendimento:",
      [
        "Identificação e contato: nome ou nick, WhatsApp, Discord ou e-mail",
        "Configuração do equipamento: processador, placa de vídeo, memória, placa-mãe, sistema operacional",
        "Descrição do problema e jogo principal informados por você",
        "Métricas de desempenho antes e depois (FPS, 1% low, latência, temperatura, tempo de boot)",
        "Dados de pagamento processados diretamente pela instituição financeira — o prestador não armazena número de cartão",
      ],
      "Nenhuma senha de banco, e-mail pessoal ou rede social é solicitada em hipótese alguma.",
    ],
  },
  {
    id: "finalidade",
    title: "Para que os dados são usados",
    body: [
      "Executar o serviço contratado, emitir a nota, comprovar o resultado por meio do relatório antes/depois e dar suporte dentro do período de garantia. Adicionalmente, métricas podem ser usadas de forma agregada e anônima para calcular as médias divulgadas no site.",
      "Depoimentos só são publicados com autorização expressa, e o nome pode ser abreviado ou substituído por apelido a pedido.",
    ],
  },
  {
    id: "acesso-remoto",
    title: "Acesso remoto e arquivos pessoais",
    body: [
      "O acesso remoto é iniciado por você, por meio de um código de sessão gerado no seu equipamento. Sem esse código, o acesso é impossível. A sessão é visível na sua tela do início ao fim e pode ser encerrada por você a qualquer momento.",
      "Durante o atendimento, o trabalho ocorre em configurações do sistema, serviços, drivers e opções de jogos. Pastas pessoais não são abertas, copiadas ou transferidas. Em serviços de formatação, o backup dos seus arquivos é feito com você acompanhando cada passo e permanece no seu próprio equipamento ou mídia.",
    ],
  },
  {
    id: "compartilhamento",
    title: "Compartilhamento com terceiros",
    body: [
      "Seus dados não são vendidos, alugados ou cedidos para fins de marketing. O compartilhamento se limita ao estritamente operacional:",
      [
        "Instituição de pagamento, para processar a cobrança",
        "Plataformas de mensagem usadas na comunicação (WhatsApp, Discord), sob as políticas próprias delas",
        "Autoridades públicas, quando houver obrigação legal",
      ],
    ],
  },
  {
    id: "retencao",
    title: "Por quanto tempo ficam guardados",
    body: [
      "Dados de contato e relatórios de desempenho são mantidos por 24 meses, prazo que cobre eventual suporte, comparação em novo atendimento e obrigações fiscais. Depois disso, são eliminados ou anonimizados.",
      "Você pode pedir a exclusão antes desse prazo, exceto no que a lei exigir guarda mínima (registros fiscais, por exemplo).",
    ],
  },
  {
    id: "direitos",
    title: "Seus direitos (LGPD)",
    body: [
      "Conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode a qualquer momento:",
      [
        "Confirmar se há tratamento de dados seus e acessar o que existe",
        "Corrigir dados incompletos ou desatualizados",
        "Solicitar anonimização, bloqueio ou eliminação de dados desnecessários",
        "Solicitar a portabilidade dos dados",
        "Revogar consentimento, inclusive para uso de depoimento já publicado",
      ],
      `Pedidos podem ser feitos por ${CONTACT.email} e são respondidos em até 15 dias.`,
    ],
  },
  {
    id: "cookies",
    title: "Cookies e medição do site",
    body: [
      "Este site não usa cookies de publicidade nem rastreadores de terceiros para perfilamento. Podem ser usados cookies estritamente necessários ao funcionamento e uma medição de audiência agregada, sem identificação individual.",
    ],
  },
  {
    id: "seguranca",
    title: "Segurança",
    body: [
      "Os dados são armazenados em serviços com autenticação de dois fatores, acesso restrito ao prestador e transmissão criptografada. Nenhum sistema é infalível: em caso de incidente relevante, você será comunicado e as autoridades notificadas conforme a lei.",
    ],
  },
  {
    id: "alteracoes",
    title: "Alterações desta política",
    body: [
      "Mudanças serão publicadas nesta página com nova data de atualização. Alterações materiais são comunicadas pelo canal de contato que você usou no último atendimento.",
    ],
  },
];

export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        eyebrow="institucional"
        title="Política de privacidade"
        lead="O que é coletado, por quê, por quanto tempo — e como pedir a exclusão. Sem juridiquês desnecessário."
      />
      <LegalDoc
        updated="20 de agosto de 2026"
        sections={SECTIONS}
        sibling={{ href: "/legal/termos", label: "Ler os Termos de Uso" }}
      />
    </>
  );
}
