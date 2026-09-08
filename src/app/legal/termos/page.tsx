import type { Metadata } from "next";
import { BRAND, CONTACT } from "@/lib/site";
import { PageHero } from "@/components/Blocks";
import { LegalDoc, type LegalSection } from "@/components/Legal";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Escopo do serviço, garantia de 7 dias, responsabilidades, pagamento e cancelamento.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "objeto",
    title: "Objeto",
    body: [
      `Estes termos regem a contratação dos serviços de otimização de desempenho prestados por ${BRAND.legalName}, de forma remota, para computadores e dispositivos móveis do contratante.`,
      "Ao contratar qualquer serviço, você declara ter lido e concordado com o conteúdo desta página e da Política de Privacidade.",
    ],
  },
  {
    id: "escopo",
    title: "O que o serviço inclui e o que não inclui",
    body: [
      "O serviço consiste em ajustes de configuração de sistema operacional, serviços em segundo plano, drivers, BIOS, periféricos e opções internas dos jogos, com medição de desempenho antes e depois.",
      "Não estão incluídos:",
      [
        "Reparo, substituição ou diagnóstico de hardware defeituoso",
        "Fornecimento de licenças de software, jogos ou sistema operacional",
        "Instalação de programas modificados, versões piratas ou sistemas alterados",
        "Qualquer forma de trapaça, injeção de código ou modificação de cliente de jogo",
        "Recuperação de dados perdidos anteriormente ao atendimento",
      ],
    ],
  },
  {
    id: "resultado",
    title: "Sobre o resultado esperado",
    body: [
      "O ganho de desempenho depende do estado inicial do equipamento e dos limites físicos do hardware. As médias divulgadas no site são referências históricas, não promessa contratual de número específico.",
      "No diagnóstico gratuito é informada uma estimativa realista antes de qualquer pagamento. Quando o prestador entende que o ganho não justifica a contratação, isso é comunicado expressamente.",
    ],
  },
  {
    id: "garantia",
    title: "Garantia de 7 dias",
    body: [
      "Durante 7 dias corridos após a entrega do relatório, o contratante pode solicitar:",
      [
        "Revisão gratuita de qualquer ajuste que tenha causado comportamento indesejado",
        "Nova execução do serviço, caso o relatório não demonstre ganho relevante",
        "Reembolso integral, caso a nova execução também não produza ganho relevante",
      ],
      "A garantia não cobre queda de desempenho decorrente de alterações feitas pelo contratante ou por terceiros após a entrega, nem de atualizações do sistema operacional posteriores ao atendimento.",
    ],
  },
  {
    id: "responsabilidades",
    title: "Responsabilidades das partes",
    body: [
      "Cabe ao prestador: executar o serviço com diligência técnica, criar ponto de restauração antes de alterações relevantes, salvar o perfil original da BIOS quando aplicável, explicar cada mudança antes de aplicá-la e entregar o relatório comparativo.",
      "Cabe ao contratante: fornecer informações verdadeiras sobre o equipamento, manter backup dos próprios arquivos importantes, estar disponível no horário agendado e informar previamente qualquer problema de hardware conhecido.",
      "O prestador não se responsabiliza por falhas decorrentes de hardware já defeituoso, fonte de alimentação inadequada, superaquecimento por sujeira física ou ausência de backup por parte do contratante.",
    ],
  },
  {
    id: "anticheat",
    title: "Compatibilidade com sistemas anticheat",
    body: [
      "Todos os ajustes utilizam recursos nativos do sistema operacional, do driver, da BIOS e das opções expostas pelos próprios jogos. Não são utilizados injeção de código, bibliotecas de terceiros, macros ou qualquer artifício que viole os termos de uso das desenvolvedoras.",
      "Em cinco anos de operação não houve registro de sanção a clientes decorrente do serviço. Ainda assim, políticas de anticheat são definidas unilateralmente pelas desenvolvedoras e podem mudar.",
    ],
  },
  {
    id: "pagamento",
    title: "Pagamento, cancelamento e remarcação",
    body: [
      "O pagamento é feito antes do início do atendimento, por PIX à vista ou cartão em até 3 parcelas. O valor é fechado no agendamento e não sofre alteração durante a execução.",
      "Cancelamentos com mais de 6 horas de antecedência são reembolsados integralmente. Remarcação é gratuita e pode ser feita uma vez sem custo. Ausência sem aviso no horário agendado pode gerar cobrança de 30% do valor.",
      "Conforme o art. 49 do Código de Defesa do Consumidor, contratações feitas fora do estabelecimento podem ser desistidas em até 7 dias, desde que o serviço ainda não tenha sido executado.",
    ],
  },
  {
    id: "propriedade",
    title: "Propriedade intelectual",
    body: [
      "Relatórios, perfis de configuração e materiais entregues são de uso pessoal do contratante. Textos, identidade visual e conteúdo do blog são de propriedade do prestador e não podem ser reproduzidos comercialmente sem autorização.",
    ],
  },
  {
    id: "foro",
    title: "Legislação e contato",
    body: [
      "Estes termos são regidos pela legislação brasileira. Eventuais controvérsias serão resolvidas preferencialmente por acordo direto, pelo canal de atendimento.",
      `Contato: ${CONTACT.email} · WhatsApp ${CONTACT.whatsappLabel}.`,
    ],
  },
];

export default function TermosPage() {
  return (
    <>
      <PageHero
        eyebrow="institucional"
        title="Termos de uso"
        lead="Escopo, garantia, responsabilidades e cancelamento — escritos para serem lidos, não para se esconder atrás de letra miúda."
      />
      <LegalDoc
        updated="20 de agosto de 2026"
        sections={SECTIONS}
        sibling={{ href: "/legal/privacidade", label: "Ler a Política de Privacidade" }}
      />
    </>
  );
}
