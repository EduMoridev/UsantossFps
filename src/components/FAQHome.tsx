import { Section, SectionHead } from "./UI";
import { Reveal } from "./Reveal";
import { Icon } from "./Icon";

/* FAQ da home. De propósito SEM o Accordion da HeroUI: aqui embaixo é
   <details>/<summary> nativo — abre, fecha e anima (classes .faq-item*
   em globals.css) sem uma linha de JS. name="faq" faz do grupo um
   acordeão exclusivo nativo: abrir um item fecha o anterior sozinho. */
const FAQS = [
  {
    q: "Perco a garantia do meu PC?",
    a: "Não. Todos os ajustes são de software e de perfis que o próprio fabricante disponibiliza, como XMP/EXPO e curva de energia. Nada é físico e nada é irreversível. Se em algum caso específico houver risco, eu aviso antes de tocar.",
  },
  {
    q: "Meus arquivos correm algum risco?",
    a: "Crio um ponto de restauração do Windows antes de qualquer alteração, e você acompanha a sessão inteira pela sua própria tela. Não abro pastas pessoais em nenhum momento do processo.",
  },
  {
    q: "Por que não tem risco de ban?",
    a: "Nenhuma alteração toca em arquivo de jogo nem injeta processo dentro dele. O que muda é configuração do sistema, driver, energia e rede — coisas que o anticheat não considera modificação do cliente.",
  },
  {
    q: "Quanto tempo dura cada atendimento?",
    a: "Essencial leva de 60 a 90 minutos, Competitivo de 2 a 3 horas e Elite de 4 a 6 horas, que podem ser divididas em duas sessões. O horário é escolhido por você.",
  },
  {
    q: "Funciona em notebook?",
    a: "Funciona, e costuma render mais que em desktop. A maioria dos notebooks sai de fábrica com curva de energia conservadora e sofre throttling térmico depois de alguns minutos de jogo.",
  },
  {
    q: "E se não melhorar nada?",
    a: "Você tem garantia de 7 dias: eu refaço ou devolvo o valor. Além disso, no diagnóstico gratuito eu falo antes se o ganho previsto não justificar o preço.",
  },
  {
    q: "Preciso deixar algum programa instalado?",
    a: "Não. A ferramenta de acesso remoto é removida ao fim da sessão e o medidor de desempenho sai junto. O PC fica só com as configurações ajustadas.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function FAQHome() {
  return (
    <Section>
      <SectionHead
        eyebrow="dúvidas"
        title={<>As perguntas que sempre aparecem —<br />respondidas sem enrolação.</>}
      />

      <Reveal className="border-t border-line">
        {FAQS.map((item, i) => (
          <details key={item.q} name="faq" open={i === 0} className="faq-item py-5">
            <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 text-left text-[1.0625rem] font-medium leading-snug text-ink marker:content-none [&::-webkit-details-marker]:hidden">
              {item.q}
              <Icon name="plus" size={16} className="faq-item-icon shrink-0 text-ink-3" />
            </summary>
            <div className="faq-item-body">
              <p className="max-w-[62ch] pt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                {item.a}
              </p>
            </div>
          </details>
        ))}
      </Reveal>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </Section>
  );
}
