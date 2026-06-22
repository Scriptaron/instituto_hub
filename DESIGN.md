# Sistema de Design — Instituto Hub

Este documento descreve o sistema de design **Neo-Brutalista** do Instituto Hub, estabelecendo os padrões visuais, tokens de estilo, componentes reutilizáveis, animações e regras de acessibilidade que garantem a identidade "acolhedora, ousada e comunitária" do projeto.

---

## 🎨 Paleta de Cores e Tokens

O sistema de design utiliza cores vibrantes com alto contraste, contornos pretos espessos e sombras sólidas características do estilo Neo-Brutalista.

### Cores Globais (Modo Claro)

| Token CSS | Cor Hex | Uso e Aplicação |
|---|---|---|
| `--color-principal` | `#7a3aed` (Roxo) | Cor principal da marca. Usada em botões primários, links importantes e destaques. |
| `--color-destaque` | `#d9ff7f` (Verde Limão) | Cor de realce secundária. Usada em tags de destaque, detalhes pontuais e seções especiais. |
| `--color-background` | `#f2f2f2` (Cinza Claro) | Fundo padrão da aplicação. Combina com um padrão de grid radial. |
| `--color-foreground` | `#2d2d2d` (Grafite Escuro) | Cor do texto padrão, bordas e sombras. Garante alto contraste. |

### Cores de Marca de Terceiros (Apenas para CTAs Externos)

* **WhatsApp**:
  * `--color-whatsapp`: `#25D366`
  * `--color-whatsapp-hover`: `#128C7E`
* **Zoom**:
  * `--color-zoom`: `#2D8CFF`
  * `--color-zoom-hover`: `#0B5CFF`

---

## ✍️ Tipografia

A tipografia do Instituto Hub prioriza fontes modernas com alta legibilidade e impacto visual.

* **Títulos (Headings)**:
  * **Família**: `'Bricolage Grotesque', sans-serif` (`--font-heading`)
  * **Aplicação**: Aplicada automaticamente a todas as tags de título (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`) e classes `.font-heading`.
* **Texto de Apoio (Body)**:
  * **Família**: `'DM Sans', sans-serif` (`--font-body`)
  * **Aplicação**: Aplicada ao elemento `body` e a todos os textos normais do site.

---

## 👤 Sombras Neo-Brutalistas (Shadow Mechanics)

A principal característica visual do sistema são as sombras duras (sem desfoque), pretas sólidas e com contorno explícito.

> [!NOTE]
> **O Truque do Subpixel**: Para evitar vazamentos de renderização (anti-aliasing) ao redor das bordas, todas as classes de sombra adicionam uma borda invisível de 1px usando `box-shadow: 0px 0px 0px 1px var(--color-foreground)`.

### Tokens de Sombra

#### `.neo-shadow` e `.neo-shadow-yellow`
* **Padrão**: `box-shadow: 0px 0px 0px 1px var(--color-foreground), 6px 6px 0px 0px var(--color-foreground);`
* **Efeito Hover (Pressionado)**:
  * Reduz a sombra para `2px 2px`
  * Desloca o elemento para baixo e para a direita em `4px` (`transform: translate(4px, 4px)`)
  * Transição suave de `all 0.2s ease-in-out`

#### `.neo-shadow-sm`
* **Padrão**: `box-shadow: 0px 0px 0px 1px var(--color-foreground), 3px 3px 0px 0px var(--color-foreground);`
* **Efeito Hover (Pressionado)**:
  * Reduz a sombra para `1px 1px`
  * Desloca o elemento em `2px` (`transform: translate(2px, 2px)`)

---

## 🧱 Componentes Atoms

Foram desenvolvidos componentes estruturais (`Atoms`) em Astro para garantir a fidelidade estética e a reutilização DRY do código.

### 1. `NeoButton` (`src/components/atoms/NeoButton.astro`)

Botão Neo-brutalista totalmente configurável que pode renderizar uma tag `<button>` ou um link `<a>`.

#### Props do Componente

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `href` | `string` | `undefined` | Se fornecido, o componente renderiza uma tag `<a>`. |
| `variant` | `'primary' \| 'secondary' \| 'whatsapp' \| 'zoom' \| 'ghost'` | `'primary'` | Define a paleta de cores do botão. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Define o tamanho, preenchimento (padding) e altura. |
| `class` | `string` | `""` | Classes CSS extras para estilização ad-hoc. |
| `target` | `string` | `undefined` | Atributo target para links. |
| `rel` | `string` | `undefined` | Atributo rel para links. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Atributo type para botões. |
| `disabled` | `boolean` | `false` | Desabilita o botão se for do tipo button. |
| `aria-label` | `string` | `undefined` | Rótulo de acessibilidade. |

#### Classes por Variante e Tamanho

* **Variante `primary`**: `bg-principal text-white border-4 border-principal hover:bg-principal neo-shadow`
* **Variante `secondary`**: `bg-white text-principal border-4 border-principal hover:bg-slate-50 neo-shadow`
* **Variante `whatsapp`**: `bg-[#25D366] hover:bg-[#128C7E] text-white dark:text-foreground border-4 border-principal neo-shadow`
* **Variante `zoom`**: `bg-[#2D8CFF] hover:bg-[#0B5CFF] text-white dark:text-foreground border-4 border-principal neo-shadow`
* **Variante `ghost`**: `bg-transparent text-principal border-4 border-principal hover:bg-principal/10` *(sem sombra)*

* **Tamanho `sm`**: `text-xs px-4 min-h-0 h-9`
* **Tamanho `md`**: `text-xs sm:text-sm px-6 min-h-0 h-11`
* **Tamanho `lg`**: `text-sm sm:text-base px-8 min-h-0 h-13`

#### Exemplo de Uso (Astro)

```astro
---
import NeoButton from '../components/atoms/NeoButton.astro';
---

<!-- Link como Botão Primário -->
<NeoButton href="/aulas" variant="primary" size="lg">
  Ver Grade de Aulas
</NeoButton>

<!-- Botão de Ação Secundário -->
<NeoButton type="submit" variant="secondary" size="md">
  Enviar Inscrição
</NeoButton>
```

---

### 2. `NeoTag` (`src/components/atoms/NeoTag.astro`)

Tag compacta com contorno e design característico do estilo de cartaz.

#### Props do Componente

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `variant` | `'principal' \| 'destaque' \| 'white' \| 'dark'` | `'destaque'` | Variante de col para o fundo e contorno. |
| `size` | `'xs' \| 'sm'` | `'sm'` | Define o tamanho do texto e padding. |
| `rotate` | `string` | `""` | Classe de rotação Tailwind (ex: `rotate-3` ou `-rotate-3`). |
| `class` | `string` | `""` | Classes CSS extras. |

#### Classes por Variante e Tamanho

* **Variante `principal`**: `bg-principal text-white border-principal`
* **Variante `destaque`**: `bg-destaque text-foreground border-principal`
* **Variante `white`**: `bg-white text-principal border-principal`
* **Variante `dark`**: `bg-slate-800 text-white border-slate-800`

* **Tamanho `xs`**: `text-[10px] px-2 py-0.5`
* **Tamanho `sm`**: `text-xs px-3 py-1`

#### Exemplo de Uso (Astro)

```astro
---
import NeoTag from '../components/atoms/NeoTag.astro';
---

<!-- Tag de destaque rotacionada -->
<NeoTag variant="destaque" rotate="rotate-3">
  Inscrições Abertas
</NeoTag>

<!-- Tag de tamanho reduzido para metadados -->
<NeoTag variant="dark" size="xs">
  Segunda-feira
</NeoTag>
```

---

## 🌀 Animações e Transições

O site possui animações de entrada e interações suaves.

### Flutuação (`animate-float`)
Utilizada para trazer vida ao cabeçalho ou elementos visuais secundários.

* **Keyframes (`float`)**:
  * `0%, 100%`: `transform: translateY(0);`
  * `50%`: `transform: translateY(-6px);`
* **Classe CSS**: `.animate-float` executa a animação infinitamente a cada `2.5s` com timing `ease-in-out`.

> [!IMPORTANT]
> **Acessibilidade de Animação**:
> Para usuários que configuraram redução de movimento no sistema operacional, a diretiva `@media (prefers-reduced-motion: reduce)` desativa totalmente as animações `.animate-float`, `.animate-bounce`, `.animate-slide-up` e `.animate-fade-in` (`animation: none !important`).

---

## 🌙 Regras de Dark Mode (Modo Escuro)

O modo escuro do Instituto Hub é baseado em classes e utiliza uma paleta de cores neutras e escuras inspirada no design minimalista de alta qualidade da Apple.

### Ativação
O modo escuro é controlado adicionando/removendo a classe `.dark` no elemento `html` (gerenciado por um script de toggle e respeitando o tema ativo).

### Regras de Inversão de Cores

1. **Inversão Principal/Destaque**:
   * O **Roxo** (`--color-principal`) passa a ser o **Verde Limão** (`#d9ff7f`)
   * O **Verde Limão** (`--color-destaque`) passa a ser o **Roxo** (`#7a3aed`)
   * O fundo geral (`--color-background`) muda para `#121212`
   * O texto padrão muda para `#e4e4e7` (Zinco Claro)

2. **Grid de Fundo**:
   * O padrão de grid radial é substituído por um tom verde translúcido sutil: `radial-gradient(rgba(217, 255, 127, 0.08) 2px, transparent 2px) !important`

### Tokens Estruturais do Dark Mode

| Token CSS | Valor | Uso e Substituição |
|---|---|---|
| `--dark-panel-bg` | `#18181b` | Substitui os fundos brancos (`bg-white`) dos painéis de conteúdo. |
| `--dark-panel-bg-alt` | `#27272a` | Substitui fundos cinzas claros (`bg-slate-100`) em elementos internos secundários. |
| `--dark-panel-text` | `#f1f5f9` | Usado para sombras duras e contornos claros no modo escuro. |
| `--dark-base-black` | `#09090b` | Cor preta super escura para sombras pesadas e texto sobre elementos com fundo Neon/Destaque. |

### Contraste e Acessibilidade no Modo Escuro

* **Texto sobre Neons**: Quando elementos usam as cores vibrantes no fundo (`.bg-principal` ou `.bg-destaque`), o texto é forçado a usar a cor escura `var(--dark-base-black)` para garantir que a legibilidade nunca seja comprometida.
* **Sombras Duras no Modo Escuro**: As sombras brutas de cards e botões no modo escuro são invertidas para usar `--dark-panel-text` (`#f1f5f9`) com offset de `4px` (`2px` no hover) para melhor legibilidade no fundo escuro.
* **Tratamento de Imagens**:
  * No modo escuro, as imagens recebem filtros para evitar brilho excessivo na tela: `filter: brightness(0.7) grayscale(0.2) contrast(1.1)`.
  * Em hover (direto ou no card container), a imagem faz uma transição de 0.5s para revelar mais cor e brilho natural: `brightness(0.85) contrast(1.1)`.
