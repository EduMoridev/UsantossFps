# Como montar o arquivo Figma do FRAMELAB

Não dá para gerar um `.fig` fora do Figma — o formato é fechado. O que vai
aqui é o kit que reconstrói o arquivo em cerca de 20 minutos, com camadas
editáveis de verdade (não imagem colada).

---

## Caminho A — telas editáveis a partir do código (recomendado)

Gera frames com texto, auto layout e cores reais, prontos para editar.

1. No Figma, instale o plugin **html.to.design** (gratuito para uso manual).
2. Rode o protótipo localmente:
   ```bash
   cd framelab
   npm install
   npm run dev          # http://localhost:3000
   ```
3. No Figma: `Plugins → html.to.design → Import from URL`, marque
   **"Import local URL"** e cole cada rota, uma por vez:

   ```
   http://localhost:3000/                    → Home
   http://localhost:3000/sobre               → Quem faz
   http://localhost:3000/servicos            → Serviços
   http://localhost:3000/servicos/otimizacao-completa → Serviço (template)
   http://localhost:3000/planos              → Planos e preços
   http://localhost:3000/resultados          → Antes e depois
   http://localhost:3000/depoimentos         → Depoimentos
   http://localhost:3000/como-funciona       → Como funciona
   http://localhost:3000/faq                 → FAQ
   http://localhost:3000/blog                → Blog
   http://localhost:3000/blog/1-percent-low-importa-mais-que-fps-medio → Artigo
   http://localhost:3000/contato             → Contato
   http://localhost:3000/legal/privacidade   → Privacidade
   http://localhost:3000/legal/termos        → Termos
   http://localhost:3000/style-guide         → Guia de estilo
   ```
4. Importe cada rota **duas vezes**, trocando a largura no plugin:
   **1440 px** (desktop) e **390 px** (mobile).
5. Organize em páginas do Figma: `01 Desktop`, `02 Mobile`, `03 Design System`.

> Se preferir não rodar nada localmente: o protótipo publicado como Artifact
> também funciona no plugin, desde que a página esteja compartilhada por link.

---

## Caminho B — tokens como Variables do Figma

Traz cor, tipografia, espaçamento e raio como variáveis reutilizáveis.

1. Instale o plugin **Tokens Studio for Figma**.
2. `Settings → Import → File` e selecione `framelab-tokens.json`.
3. Em `Styles & Variables`, clique em **Export to Figma**:
   - Cores → Variables de cor
   - Typography → Text Styles
   - Spacing / Radius → Variables numéricas
4. As telas do Caminho A passam a poder ser religadas a essas variáveis.

---

## Caminho C — mockups como referência visual

Na pasta `mockups/` estão os PNGs de página inteira, desktop (1440 px) e
mobile (390 px @2x). Servem para apresentar ao cliente, anotar em cima ou
usar como camada de referência embaixo dos frames importados.

Arraste a pasta inteira para dentro de um frame do Figma — cada arquivo vira
uma imagem, e o nome numerado (`01-home`, `02-sobre`…) preserva a ordem.

---

## Estrutura sugerida do arquivo Figma

```
📄 00 · Capa
📄 01 · Design System        ← tokens, tipografia, componentes (Caminho B + /style-guide)
📄 02 · Desktop 1440         ← 15 frames
📄 03 · Mobile 390           ← 15 frames
📄 04 · Componentes          ← botão, card, badge, barra antes/depois, acordeão, header, footer
📄 05 · Protótipo            ← ligações de navegação entre os frames
```

## Fontes a instalar antes

- **Space Grotesk** — títulos (peso 600)
- **Inter** — corpo (400 / 500)
- **JetBrains Mono** — rótulos e números (400)

As três são gratuitas no Google Fonts.
