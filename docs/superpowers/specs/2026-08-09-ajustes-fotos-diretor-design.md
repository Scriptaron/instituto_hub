# Design Spec: Ajustes de Fotos e Diretor Thiago Gal

**Data**: 2026-08-09  
**Autor**: Antigravity

## Contexto e Objetivo
O usuário adicionou fotos novas no diretório de assets do projeto e solicitou duas alterações principais na página "Sobre":
1. Adicionar o diretor Thiago Gal (2014-2017) que estava faltando na ordem cronológica.
2. Atualizar as referências das fotos da entrada do instituto, da sala de aula e da sala de jogos, visto que as extensões antigas (.png/.webp) foram deletadas e novas fotos (.jpg) foram adicionadas.
As mudanças devem ocorrer em uma branch adequada baseada na branch de desenvolvimento (`developing`).

## Detalhamento das Alterações

### 1. Git Branching
* Branch de origem: `developing`
* Nova branch: `feat/ajustes-finais`

### 2. Assets (Imagens)
Os novos arquivos a serem utilizados estão presentes em `src/assets/`:
* `entrada-instituto.jpg` (substitui `entrada-instituto.png`)
* `sala-aula.jpg` (substitui `sala-aula.webp`)
* `sala-jogos.jpg` (substitui `sala-jogos.webp`)
* `diretor-gal.jpg` (foto nova para Thiago Gal)

### 3. Código (`src/pages/sobre.astro`)

* **Imports**:
  * Substituir os imports das três fotos antigas pelos novos caminhos `.jpg`.
  * Adicionar o import da foto de Thiago Gal (`dirGal`).

* **Carrossel de Diretores**:
  * Adicionar o Polaroid de Thiago Gal entre Geraldo Oliveira (2012-2014) e Herberto Klein (2018-2019).
  * O Polaroid do Thiago Gal usará fita azul (`bg-blue-100`) e rotação `rotate-1`.
  * O Polaroid de Herberto Klein (que segue Thiago Gal) será ajustado para `-rotate-1` e fita rosa (`bg-pink-100`) para manter a harmonia do carrossel.

## Plano de Verificação
1. Executar o build do projeto com `npm run build` para garantir que o compilador do Astro encontre as imagens e compile sem falhas.
2. Confirmar visualmente no código gerado se os cartões estão na ordem cronológica correta.
