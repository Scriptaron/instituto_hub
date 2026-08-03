---
target: src/pages/index.astro
total_score: 20
p0_count: 0
p1_count: 3
timestamp: 2026-06-22T00-03-18Z
slug: src-pages-index-astro
---
## Design Health Score

| # | Heurística | Score | Problema-Chave |
|---|-----------|-------|----------------|
| 1 | Visibilidade do Status do Sistema | 2 | Nenhum feedback de loading ao clicar em matrícula ou submeter formulários; botões não têm estado disabled/loading |
| 2 | Correspondência com o Mundo Real | 3 | Linguagem clara e natural; "Cronograma" pode confundir novatos ("Eventos" seria mais universal) |
| 3 | Controle e Liberdade do Usuário | 2 | Menu mobile fecha por blur (frágil); sem breadcrumbs em páginas internas; nenhuma confirmação de ação após matrícula |
| 4 | Consistência e Padrões | 2 | `border-radius: rounded-2xl` misturado com elementos sem borda arredondada; sombras neo-brutalist inconsistentes entre páginas; cards em `sobre.astro` usam `#25D366` (verde WhatsApp) como bg de polaroid — quebra a paleta |
| 5 | Prevenção de Erros | 2 | Botão "Recuperação" com `href="#"` — link morto exposto; nenhuma validação de formulário visível; zero confirmação antes de abrir links externos |
| 6 | Reconhecimento em Vez de Recordação | 3 | Navegação visível e rotulada; ativo destacado com bg-destaque; ícones sempre acompanhados de texto |
| 7 | Flexibilidade e Eficiência de Uso | 1 | Nenhum atalho de teclado; sem modo rápido de filtrar aulas; carrossel de diretores só funciona com JS (sem fallback) |
| 8 | Design Estético e Minimalista | 2 | Fundo com bolinhas roxas + blur absoluto + `animate-bounce` num elemento decorativo + múltiplos `border-l-4` como ênfase — ruído visual acumulado |
| 9 | Recuperação de Erros | 1 | Página 404 existe mas os erros de formulário/ação não têm feedback visual; estados vazios de eventos são bons, mas outros estados de erro estão ausentes |
| 10 | Ajuda e Documentação | 2 | WhatsApp como canal de suporte é boa prática para o público; mas nenhum tooltip, hint inline ou FAQ acessível na nav |
| **Total** | | **20/40** | **Acceptable — melhorias significativas necessárias** |

---

## Veredicto Anti-Patterns

**O design parece gerado por IA?**

**Avaliação LLM:** Não completamente — e isso é um ponto positivo. A identidade neobrutalist é genuína e coerente no macro: tipografia Bricolage Grotesque com peso pesado, sombras sólidas offset, paleta roxo+verde limão, elementos polaroid com rotação leve. Esses são choices deliberados com personalidade real. Porém, ao nível dos componentes, surgem os tells: `border-l-4` como ênfase em texto aparece em 9 lugares distintos (footer, hero, seções, cartão de aulas, cronograma) — isso é reflexo de IA, não sistema de design. O `animate-bounce` num elemento decorativo é datado. O background com radial-gradient de bolinhas somado ao blur absoluto no canto superior esquerdo cria camadas de ruído que competem entre si.

**Scan determinístico:** 13 findings (exit code 2 = findings detectados):
- **9× `side-tab`** — `border-l-4` / `border-r-4` usado como ênfase decorativa em cards, footer, seções. Distribuídos em: `index.astro` (L102, L133, L154, L205), `cronograma.astro` (L80, L111×2), `sobre.astro` (L34), `Footer.astro` (L9), `aulas.astro` (L23), `TimelineEvent.astro` (L99).
- **1× `border-accent-on-rounded`** — `AulaCard.astro` L40: `border-b-4` numa div com `rounded-t-[11px]` — borda grossa conflita com o arredondamento.
- **1× `bounce-easing`** — `index.astro` L89: `animate-bounce` no elemento decorativo (bolinha amarela flutuante). Easing de bounce é datado; substituir por float suave com `ease-in-out`.

Nenhum falso-positivo identificado — todos os findings são genuínos e impactam a consistência do design.

**Browser visualization:** Dev server não iniciado para esta sessão; sem overlay de browser. CLI scan é o sinal primário.

---

## Impressão Geral

O projeto tem alma. A combinação de polaroids rotacionados, tipografia Bricolage com peso black, e a paleta roxo/verde limão sobre fundo de bolinhas cria uma identidade visual coerente que resiste ao teste "parece AI?" no primeiro olhar. O maior problema não é o que está lá — é o que está inconsistente: o mesmo pattern de `border-l-4` aparece em 9 lugares como se fosse um sistema, mas funciona como um tique de copiar-colar. A paleta quebra em dois momentos críticos: `#25D366` (verde WhatsApp) como fundo de polaroid em `sobre.astro`, e `rounded-2xl` misturado com elementos sem borda arredondada. A oportunidade maior é passar de "design com boa ideia" para "sistema de design com identidade", unificando os componentes ao redor dos tokens já definidos.

---

## O que Está Funcionando

**1. Tokens de paleta bem definidos.** `--color-principal: #7a3aed` e `--color-destaque: #d9ff7f` estão no CSS como tokens reais, usados com classe semântica (`bg-principal`, `bg-destaque`). O dark mode inverte a paleta de forma inteligente — verde vira principal, roxo vira destaque. Isso é um sistema genuíno, não CSS ad-hoc.

**2. Polaroids com personalidade.** O carrossel de diretores em `sobre.astro` (white card, `p-2 pb-14`, fita colorida no topo, rotação leve, badge de período) é o elemento mais único e memorável do projeto. Não existe em nenhum template; foi pensado para este produto.

**3. Estados ativos no nav com bg-destaque.** O item ativo recebe `bg-destaque border-4 border-principal neo-shadow-yellow translate` — não é apenas uma troca de cor, é um estado com sombra e deslocamento. Isso é neobrutalist e intencional.

---

## Problemas Prioritários

### [P1] Sistema de `border-l-4` como padrão de ênfase
**O que é:** A borda esquerda grossa colorida (`border-l-4 border-destaque pl-4`) aparece em 9+ locais como único mecanismo de ênfase para texto de suporte — footer, hero, seções, cards, cronograma.

**Por que importa:** É o anti-pattern mais frequente no scan. O impeccable chama isso de "the most recognizable tell of AI-generated UIs". Quando um único pattern aparece em tantos contextos distintos, ele perde a força de cada uso individual e parece cópia, não sistema. No neobrutalism autêntico, a ênfase varia por elemento — bold, barra completa, bg tint, tamanho.

**Fix:** Reservar `border-l-4` para no máximo 2 usos por página, em contextos onde a borda lateral realmente comunica algo (ex: citação, depoimento). Para texto de suporte em seções de conteúdo, usar weight variado (font-bold vs font-medium) ou indentação simples.

**Comando sugerido:** `$impeccable layout` — revisar a hierarquia tipográfica e eliminar o uso reflexivo de border-l-4.

---

### [P1] `#25D366` (verde WhatsApp) como fundo de polaroid quebra a paleta
**O que é:** Em `sobre.astro`, 2 dos 6 polaroids de diretores usam `bg-[#25D366]` como fundo da foto — uma cor de produto de terceiro que não faz parte dos tokens.

**Por que importa:** Quebra a consistência da paleta em uma seção altamente visível. O usuário que foi convencido pela paleta roxo+verde limão encontra um verde completamente diferente (mais saturado, conotação de WhatsApp) sem razão visual aparente.

**Fix:** Substituir `bg-[#25D366]` nos polaroids por `bg-destaque` (verde limão) ou `bg-principal` (roxo), mantendo a rotação de apenas 2 cores da paleta.

**Comando sugerido:** `$impeccable colorize` — auditoria de uso de cores fora dos tokens.

---

### [P1] Botão "Recuperação" com `href="#"` — link morto exposto
**O que é:** Em `AulaCard.astro` L82, o botão "Recuperação" tem `href="#"` — aparece em todos os cards de aula, mas não vai a lugar nenhum.

**Por que importa:** Um link morto é um erro de P1 que quebra a confiança. Se o usuário clica em "Recuperação" esperando acessar algo e nada acontece (ou a página sobe para o topo), a experiência é quebrada. Em um card de matrícula, isso é crítico.

**Fix:** Ou (a) remover o botão até que a funcionalidade exista, ou (b) adicionar `href` real ou desabilitar visualmente com `opacity-50 pointer-events-none` e tooltip "Em breve".

**Comando sugerido:** `$impeccable harden` — identificar e tratar todos os estados sem destino.

---

### [P2] `border-accent-on-rounded` no AulaCard — borda inferior conflita com arredondamento
**O que é:** `AulaCard.astro` L40 tem `border-b-4 border-principal` numa div com `rounded-t-[11px]`. A borda grossa na parte inferior da imagem aparece alinhada ao arredondamento do topo do card, criando uma colisão visual.

**Por que importa:** No neobrutalism, a borda é um elemento de identidade forte. Quando ela conflita com o border-radius, o efeito parece descuidado. O card em geral mistura `rounded-2xl` (no container principal) com `rounded-t-[11px]` (na imagem) — inconsistência de radii.

**Fix:** Padronizar: ou cards 100% quadrados (zero border-radius, puro neobrutalist) ou cards com um único radius token (`rounded-lg` em tudo). Remover o `border-b-4` na imagem e manter apenas o container externo com borda.

**Comando sugerido:** `$impeccable polish` — consistência de border-radius e sombras em todos os cards.

---

### [P2] `animate-bounce` no elemento decorativo (bolinha verde flutuante)
**O que é:** `index.astro` L89: `<div class="absolute -top-6 -right-6 w-12 h-12 bg-destaque border-4 border-principal rounded-full hidden lg:block animate-bounce z-30">`. Um elemento puramente decorativo com bounce infinito.

**Por que importa:** Bounce easing é datado (pré-2020). Pior: como é `animate-bounce` nativo do Tailwind, ele não respeita `prefers-reduced-motion`. O elemento pulsa para sempre, sem pausa, e pode causar distração ou desconforto para usuários com sensibilidade a movimento.

**Fix:** Substituir por uma animação de float suave (`translateY` de 4px com `ease-in-out`, 2s, `alternate`, `infinite`) e adicionar `@media (prefers-reduced-motion: reduce) { animation: none; }`.

**Comando sugerido:** `$impeccable animate` — rever todas as animações do projeto.

---

## Persona Red Flags

### Jordan (Primeira vez no site — jovem interessado em participar)
Jordan ouviu falar do Instituto por um amigo e acessou o site para "ver se tem uma aula perto de mim" no celular.

- Abre o site e vê "INSTITUTO HUB" grande e "A glória de Deus é a inteligência." — entende o contexto religioso, mas não sabe o que fazer a seguir. O CTA "Inscreva-se nas Aulas" está visível, mas a hierarquia visual compete com 4 outros elementos simultâneos (blur de fundo, card de events, foto rotacionada, bolinha flutuante).
- Clica em "Aulas" no nav. Na página `/aulas`, encontra os cards. Quer se matricular. Clica em "Matricular-se" — abre um Microsoft Forms em nova aba. Volta ao site. Não sabe se completou o processo ou se precisa fazer mais alguma coisa.
- Vê o botão "Recuperação" no card. Não sabe o que significa (jargão interno). Clica. Nada acontece. Abandona.

**Diagnóstico:** Jargão interno ("Recuperação", "Rel. Code"), zero confirmação pós-ação, botão morto.

---

### Casey (Usuário mobile, polegar único, conexão 4G)
Casey quer ver os próximos eventos rapidamente antes de ir para o trabalho.

- Header sticky funciona bem — acesso ao nav é sempre visível. ✅
- Na página inicial, o card de "Próximos Eventos" está em `md:col-span-7` — em mobile, ocupa 100% da largura. Os eventos aparecem em formato vertical. A data e o título são legíveis. ✅
- Rola para baixo. A galeria de fotos com `rotate-1 hover:rotate-0` em mobile não tem hover — as fotos ficam sempre rotacionadas. Em alguns viewports móveis, a foto rotacionada pode cortar na borda da tela.
- O WhatsApp FAB está no canto inferior direito (thumb zone). ✅
- O iframe do Google Maps carrega no load sem lazy — em conexão lenta, pode bloquear LCP.

**Diagnóstico:** Fotos rotacionadas sem estado de toque em mobile, iframe de maps sem lazy, galeria pode extravasar viewport.

---

### Sam (Usuário de teclado e leitor de tela)
Sam usa NVDA + Firefox e tenta navegar o site com Tab.

- `<button id="theme-toggle" aria-label="Alternar Tema Escuro">` — aria-label correto. ✅
- O dropdown mobile usa `tabindex="0"` e `role="button"` mas `aria-expanded` está hardcoded como `false` — nunca muda programaticamente para `true` quando o menu abre.
- Carrossel de diretores: `<button id="btn-prev-diretor" aria-label="Diretor Anterior">` — label presente. Mas o carrossel navega via scroll programático sem anunciar a mudança de slide ao leitor de tela.
- `<div class="noise-overlay">` sem `aria-hidden="true"` — pode ser lido pelo leitor de tela como conteúdo.
- Foco invisível em vários elementos — nenhuma regra de `focus-visible` customizada encontrada.

**Diagnóstico:** `aria-expanded` estático, ausência de live region no carrossel, noise-overlay sem aria-hidden, focus ring insuficiente.

---

## Observações Menores

- **`noise-overlay`** em `BaseLayout.astro` L66: `<div class="noise-overlay">` não tem estilos definidos no CSS — provavelmente um resquício de uma feature abandonada. Verificar se pode ser removido.
- **Dois sistemas de background simultâneos**: o `body` em `global.css` tem `background-image: radial-gradient(...)` com `!important`, e o `<body>` no `BaseLayout.astro` tem `style="background-image: radial-gradient(...)"` inline. Dois gradients competindo — apenas um prevalece (o inline vence por especificidade). Remover o do CSS para evitar confusão.
- **`rounded-2xl` vs `rounded-t-[11px]` vs sem radius**: três sistemas de arredondamento coexistindo. Definir um único token (`--rounded-card: 0.5rem` já existe no DaisyUI, mas não está sendo usado nos cards customizados).
- **Dark mode com `!important` em cascata**: O dark mode usa `!important` em praticamente todas as regras em `global.css`. Isso cria fragilidade — qualquer elemento novo que não siga esse padrão não será coberto automaticamente. Considerar uma abordagem com `data-theme` consistente.
- **Fonte carregada do Google Fonts**: `Bricolage Grotesque` e `DM Sans` via `@import url(...)` — bloqueia render. Migrar para `<link rel="preconnect">` + `<link rel="stylesheet">` no `<head>` para melhorar LCP.
- **`svg` no `<style>` de `index.astro`**: O `<style>` inline com `.stroke-text` está dentro do frontmatter do Astro entre `<style></style>` tags — correto para Astro, mas o scoping pode conflitar com o ClientRouter nas transições de página.

---

## Perguntas para Considerar

- "O que um jovem de 19 anos que nunca ouviu falar do Instituto deveria entender nos primeiros 5 segundos do site? A hierarquia atual prioriza esse entendimento?"
- "Se removermos os `border-l-4` como ênfase, o que fica? Essa pergunta revela se a hierarquia tipográfica está funcionando ou se dependemos da borda como muleta."
- "Os polaroids de diretores são o elemento mais memorável do site. Essa mesma linguagem visual poderia ser aplicada a outros conteúdos (depoimentos, fotos de eventos)?"
