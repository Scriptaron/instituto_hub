# Especificação de Design: Estilos de Sombra em Modo Escuro (Neo-Brutalismo)

Este documento descreve a especificação de design para remover as paletas de cores alternativas e focar exclusivamente no tema Original (Roxo e Verde Limão), introduzindo um seletor no cabeçalho para experimentar três abordagens distintas de sombra neo-brutalista no Modo Escuro.

## 🎯 Objetivos

1. **Foco na Marca Original:** Manter o site exclusivamente com a identidade visual Roxo (`#7a3aed`) e Verde Limão (`#d9ff7f`).
2. **Refinamento de Sombras (Modo Escuro):** Oferecer 3 opções de sombra em modo escuro para resolver o problema de contraste (sombras pretas em fundo escuro vs. sombras brancas que parecem brilho).
3. **Mecanismo de Teste ao Vivo:** Substituir o combobox de paletas por um combobox de estilos de sombra no cabeçalho.

---

## 🎨 Os 3 Estilos de Sombra para Modo Escuro

### 1. Sombra Preta (Sombra Elevada - Padrão)
* **Conceito:** A abordagem mais premium e física. O fundo do site é cinza-escuro (`#121212`) e os cards são levemente mais claros (`#1c1c1f`). A sombra projetada é preta sólida (`#000000`). Para destacar o card, ele recebe uma borda sutil cinza-clara (`#f1f5f9`), criando um efeito clássico de flutuação.
* **Tokens CSS:**
  * `--dark-shadow-color: #000000;`
  * `--dark-shadow-ring-color: var(--dark-panel-text);` (borda clara)

### 2. Sombra Neon (Cyberpunk)
* **Conceito:** Estilo vibrante e digital. O card possui contorno preto, e a sombra projetada é na cor principal da marca no modo escuro (Verde Limão `#d9ff7f`). Isso cria um visual neon bem característico e marcante.
* **Tokens CSS:**
  * `--dark-shadow-color: var(--color-principal);` (Verde Limão)
  * `--dark-shadow-ring-color: var(--dark-base-black);` (borda preta)

### 3. Sombra Branca (Original do site)
* **Conceito:** O comportamento original do site, onde a sombra projetada e a borda usam a cor cinza-clara (`#f1f5f9`). Serve como linha de base para comparação.
* **Tokens CSS:**
  * `--dark-shadow-color: var(--dark-panel-text);` (cinza-claro)
  * `--dark-shadow-ring-color: var(--dark-panel-text);` (cinza-claro)

---

## 🛠️ Detalhes da Implementação

### 1. Limpeza de Paletas Adicionais
Removeremos todos os blocos `html[data-palette="..."]` do [global.css](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/styles/global.css) e limparemos as variáveis para manter apenas a paleta Original ativa.

### 2. Lógica de Variáveis de Sombra no [global.css](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/styles/global.css)
Substituiremos a cor física das sombras por variáveis dinâmicas:
```css
html.dark body {
    --dark-shadow-color: #000000;
    --dark-shadow-ring-color: var(--dark-panel-text);
}

/* Sombra Neon */
html.dark[data-shadow-style="neon-shadow"] body {
    --dark-shadow-color: var(--color-principal);
    --dark-shadow-ring-color: var(--dark-base-black);
}

/* Sombra Branca */
html.dark[data-shadow-style="white-shadow"] body {
    --dark-shadow-color: var(--dark-panel-text);
    --dark-shadow-ring-color: var(--dark-panel-text);
}
```

E atualizaremos as classes `.neo-shadow`, `.neo-shadow-sm` e `.neo-shadow-yellow` no modo escuro para usar essas variáveis:
```css
html.dark .neo-shadow, ... {
    box-shadow: 0 0 0 1px var(--dark-shadow-ring-color), 4px 4px 0px 0px var(--dark-shadow-color) !important;
}
```

### 3. O Combobox no [Header.astro](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/components/organisms/Header.astro)
O select será atualizado para:
```html
<select id="shadow-select" aria-label="Escolher Estilo de Sombra" class="...">
    <option value="black-shadow">Sombra Preta</option>
    <option value="neon-shadow">Sombra Neon</option>
    <option value="white-shadow">Sombra Branca</option>
</select>
```
Salvaremos no `localStorage` sob a chave `theme-shadow-style` e injetaremos `data-shadow-style` na tag `<html>`.

---

## 🧪 Plano de Verificação

1. **Verificação Visual:** Alternar entre as 3 opções no modo escuro e confirmar se as sombras mudam conforme o esperado (preta, verde limão, cinza-clara).
2. **Sem FOUC:** Garantir que ao atualizar a página, a sombra selecionada seja aplicada instantaneamente na inicialização da página.
3. **Testes automatizados:** Atualizar o arquivo de testes `tests/e2e/palette.spec.ts` para testar os estilos de sombra (`data-shadow-style`) em vez de paletas.
