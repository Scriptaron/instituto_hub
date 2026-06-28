# Especificação de Design: Seletor Dinâmico de Paleta de Cores (Combobox)

Este documento descreve a especificação de design e a arquitetura técnica para adicionar um alternador de paletas de cores (Combobox) no cabeçalho do Instituto Hub, permitindo que o usuário escolha entre quatro paletas neo-brutalistas distintas.

## 🎯 Objetivos

1. **Flexibilidade Visual:** Permitir que o usuário e a equipe do Instituto experimentem e selecionem diferentes paletas no contexto do site real.
2. **Alinhamento com Redes Sociais:** Introduzir uma paleta inspirada no padrão lavanda, verde e ouro usado nas postagens oficiais do Instagram.
3. **Consistência Estética:** Garantir que todas as novas paletas sigam os princípios neo-brutalistas (bordas pretas grossas, sombras sólidas, tipografia pesada e alto contraste).
4. **Persistência de Preferência:** Salvar a paleta selecionada para que ela seja mantida em todas as páginas e futuras visitas.

---

## 🎨 Especificação das Paletas

### 1. Original (Neon)
* **Conceito:** A paleta atual do site, baseada em roxo puro e verde limão de alto contraste.
* **Claro:**
  * Fundo geral: `#f2f2f2` (cinza muito claro)
  * Principal: `#7a3aed` (roxo)
  * Destaque: `#d9ff7f` (verde limão)
  * Borda/Texto principal: `#2d2d2d` (grafite)
* **Escuro:**
  * Fundo geral: `#121212` (grafite escuro)
  * Principal: `#d9ff7f` (verde limão)
  * Destaque: `#7a3aed` (roxo)
  * Borda/Texto principal: `#e4e4e7` (zinco claro)

### 2. Lavanda Social (Instagram)
* **Conceito:** Alinhamento direto com o padrão de posts da rede social. Mais acolhedor e orgânico.
* **Claro:**
  * Fundo geral: `#e8e4f8` (lavanda suave)
  * Principal: `#5e3be0` (violeta médio)
  * Destaque: `#00a84f` (verde bandeira/grama)
  * Borda/Texto principal: `#1c0e4a` (roxo berinjela muito escuro)
  * Tags/Alertas Secundários: `#fbbf24` (amarelo ouro quente)
* **Escuro:**
  * Fundo geral: `#0f0d19` (roxo escuro profundo)
  * Principal: `#a78bfa` (lavanda claro)
  * Destaque: `#22c55e` (verde esmeralda)
  * Borda/Texto principal: `#f1f5f9` (cinza muito claro)

### 3. Retro Sunset
* **Conceito:** Combinação clássica brutalista com sensação analógica e de revista.
* **Claro:**
  * Fundo geral: `#fafaf9` (areia/creme)
  * Principal: `#2563eb` (azul royal)
  * Destaque: `#ff6b00` (laranja vibrante)
  * Borda/Texto principal: `#000000` (preto sólido)
* **Escuro:**
  * Fundo geral: `#0b132b` (azul marinho escuro)
  * Principal: `#ff9f1c` (laranja pastel)
  * Destaque: `#4ea8de` (azul celeste)
  * Borda/Texto principal: `#f8fafc` (branco ardósia)

### 4. Forest & Rose
* **Conceito:** Estética moderna, sofisticada e que traz uma sensação de bem-estar e natureza aliada ao arrojo.
* **Claro:**
  * Fundo geral: `#f0fdf4` (menta pastel)
  * Principal: `#065f46` (verde floresta)
  * Destaque: `#ec4899` (rosa pink)
  * Borda/Texto principal: `#022c22` (verde escuro quase preto)
* **Escuro:**
  * Fundo geral: `#022c22` (verde musgo profundo)
  * Principal: `#f472b6` (rosa claro)
  * Destaque: `#4ade80` (verde menta brilhante)
  * Borda/Texto principal: `#f0fdf4` (menta suave)

---

## 🛠️ Arquitetura Técnica

### 1. Mecanismo de Temas CSS (`src/styles/global.css`)
Substituiremos a definição estática do `@theme` no Tailwind por variáveis CSS mapeadas conforme o atributo `data-palette` configurado em `<html>`.

```css
/* Paleta Padrão / Original */
:root {
  --color-background: #f2f2f2;
  --color-principal: #7a3aed;
  --color-destaque: #d9ff7f;
  --color-foreground: #2d2d2d;
}

/* Lavanda Social */
html[data-palette="social"] {
  --color-background: #e8e4f8;
  --color-principal: #5e3be0;
  --color-destaque: #00a84f;
  --color-foreground: #1c0e4a;
}
/* E assim por diante para retro e forest... */
```

Configuraremos também os mapeamentos específicos de modo escuro (`html.dark`) para cada paleta:
```css
html.dark[data-palette="social"] body {
  --color-background: #0f0d19;
  --color-principal: #a78bfa;
  --color-destaque: #22c55e;
  --dark-panel-text: #f1f5f9;
  --dark-base-black: #09090b;
}
```

### 2. Componente de Seleção (`src/components/organisms/Header.astro`)
Um combobox `<select>` será posicionado ao lado do alternador de modo escuro no Header.

* **Marcação HTML:**
  ```html
  <div class="palette-selector-container relative">
      <select id="palette-select" class="btn bg-white hover:bg-slate-100 text-principal border-2 border-principal neo-shadow rounded-xl text-xs font-heading font-black py-0 h-10 sm:h-12 px-2 sm:px-4 cursor-pointer outline-none shadow-[2px_2px_0_0_black]">
          <option value="neon">Original (Neon)</option>
          <option value="social">Social (Lavanda)</option>
          <option value="retro">Retro (Sunset)</option>
          <option value="forest">Forest & Rose</option>
      </select>
  </div>
  ```

* **Script de Inicialização e Toggles (Executado no evento `astro:page-load`):**
  ```javascript
  const select = document.getElementById('palette-select');
  
  // 1. Carrega paleta do localStorage ou usa 'neon' por padrão
  const savedPalette = localStorage.getItem('theme-palette') || 'neon';
  document.documentElement.setAttribute('data-palette', savedPalette);
  if (select) select.value = savedPalette;
  
  // 2. Escuta alterações no select
  select?.addEventListener('change', (e) => {
      const targetPalette = e.target.value;
      document.documentElement.setAttribute('data-palette', targetPalette);
      localStorage.setItem('theme-palette', targetPalette);
  });
  ```

---

## 🧪 Plano de Verificação

### Testes Manuais
1. **Alternância de Paleta:** Clicar no combobox e selecionar cada uma das 4 paletas. Validar se todas as cores se alteram instantaneamente sem recarregar a página.
2. **Combinação com Modo Escuro:** Em cada paleta, ligar/desligar o modo escuro. Verificar se a legibilidade dos textos e o contraste dos botões permanecem adequados.
3. **Persistência:** Selecionar uma paleta (ex: "Social"), navegar para a página `/aulas` ou `/sobre` e verificar se a paleta se mantém ativa. Atualizar a página (`F5`) e verificar a persistência.
4. **Compatibilidade Responsiva:** Verificar no mobile se o combobox se ajusta no header sem quebrar o layout e sem sobrepor a logo.

### Testes Automatizados (Playwright)
* Adicionar um arquivo de teste `tests/palette.spec.ts` para verificar:
  - Presença do combobox no cabeçalho.
  - Atribuição correta do atributo `data-palette` no elemento `html` ao alterar a seleção.
  - Persistência do valor no `localStorage`.
