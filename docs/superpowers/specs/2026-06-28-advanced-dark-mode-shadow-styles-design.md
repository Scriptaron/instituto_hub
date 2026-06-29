# Especificação de Design Avançada: Estilos de Sombra Premium em Modo Escuro

Este documento apresenta três propostas de design sofisticadas e inovadoras para as sombras neo-brutalistas no Modo Escuro (mantendo o tema original Roxo + Verde Limão), utilizando pseudo-elementos (`::after`) para alcançar efeitos visuais de alta fidelidade que superam as limitações das sombras padrão do CSS.

## 🎯 Objetivos de Design

1. **Impacto Estético Superior:** Criar efeitos que chamem a atenção do usuário no primeiro olhar, alinhados com o design moderno (alta saturação, micro-animações, padrões texturizados).
2. **Brutalismo Editorial Autêntico:** Utilizar conceitos de design gráfico clássico (como hachuras/listras) e estéticas cyberpunk digitais (degradês neon).
3. **Geometria Perfeitamente Ancorada:** Manter a física do neo-brutalismo, onde o card translada no hover, mas a sombra permanece estacionária na tela.

---

## 🎨 As 3 Novas Propostas de Sombra para o Seletor

### 1. Sombra de Degradê Neon (`gradient-shadow`)
* **Visual:** A sombra projetada deixa de ser uma cor sólida e se torna um **degradê linear luminoso** que flui do Roxo (`#7a3aed`) ao Verde Limão (`#d9ff7f`).
* **Implementação:** Usamos um pseudo-elemento `::after` posicionado atrás do card, com `background: linear-gradient(135deg, var(--color-principal), var(--color-destaque))`.
* **Aparência:** Altamente moderna, futurista e brilhante. Destaca os cards com um glow limpo e premium.

### 2. Sombra Listrada Brutalista (`stripe-shadow`)
* **Visual:** Estética clássica de jornais e pôsteres brutalistas. A sombra é composta por **linhas diagonais listradas em 45 graus**, alternando entre preto sólido e a cor Verde Limão da marca.
* **Implementação:** Usamos um gradiente linear repetitivo (`repeating-linear-gradient`):
  ```css
  background: repeating-linear-gradient(
      45deg,
      #000000,
      #000000 4px,
      var(--color-principal) 4px,
      var(--color-principal) 8px
  );
  ```
* **Aparência:** Extremamente estilizada, dando um tom artístico e impresso de alta qualidade.

### 3. Sombra Preta Elevada (`black-shadow`)
* **Visual:** A sombra sólida preta clássica. Os painéis ganham fundo grafite (`#1c1c1f`) e bordas cinza-claro (`#f1f5f9`). A sombra projetada é preta sólida (`#000000`), criando um efeito físico sóbrio e elegante.
* **Implementação:** Através do `box-shadow` tradicional ou pseudo-elemento preto sólido.

---

## 📐 Matemática da Ancoragem com Pseudo-elementos

Para que o efeito neo-brutalista funcione perfeitamente, a sombra não pode se mover em relação à tela quando o usuário passa o mouse. Como o card translada em `translate(2px, 2px)` no hover:
- **Estado Inicial:** O card está em `(0,0)` e o pseudo-elemento em `top: 4px; left: 4px;`. Posição na tela da sombra: `(4, 4)`.
- **Estado Hover:** O card se move para `(2,2)`. Para que o pseudo-elemento permaneça em `(4,4)` na tela, seu deslocamento relativo ao card deve ser reduzido para `top: 2px; left: 2px;` (`2 + 2 = 4`).

Isso garante estabilidade espacial absoluta e um efeito físico impecável!

---

## 🛠️ Esboço da Implementação no CSS (`global.css`)

```css
/* Configuração Base para Sombras com Pseudo-elementos */
html.dark[data-shadow-style="gradient-shadow"] .neo-shadow,
html.dark[data-shadow-style="stripe-shadow"] .neo-shadow {
    position: relative !important;
    box-shadow: none !important; /* Desativa a sombra CSS padrão */
}

html.dark[data-shadow-style="gradient-shadow"] .neo-shadow::after,
html.dark[data-shadow-style="stripe-shadow"] .neo-shadow::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    border: 2px solid var(--dark-panel-text);
    border-radius: inherit;
    transition: all 0.2s ease;
}

/* 1. Aplicação do Degradê Neon */
html.dark[data-shadow-style="gradient-shadow"] .neo-shadow::after {
    top: 4px;
    left: 4px;
    background: linear-gradient(135deg, var(--color-destaque), var(--color-principal));
}
html.dark[data-shadow-style="gradient-shadow"] .neo-shadow:hover::after {
    top: 2px;
    left: 2px;
}

/* 2. Aplicação das Listras Brutalistas */
html.dark[data-shadow-style="stripe-shadow"] .neo-shadow::after {
    top: 4px;
    left: 4px;
    background: repeating-linear-gradient(
        45deg,
        var(--dark-base-black),
        var(--dark-base-black) 4px,
        var(--color-principal) 4px,
        var(--color-principal) 8px
    );
}
html.dark[data-shadow-style="stripe-shadow"] .neo-shadow:hover::after {
    top: 2px;
    left: 2px;
}
```
