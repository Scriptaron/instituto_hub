# Ajustes de Fotos e Diretor Thiago Gal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Atualizar as imagens de ambiente (entrada, sala de aula e sala de jogos) e adicionar o diretor Thiago Gal (2014-2017) ao carrossel cronológico da página "Sobre".

**Architecture:** Modificação direta no arquivo Astro `src/pages/sobre.astro` para atualizar imports das imagens e o HTML do carrossel, reajustando a fita e rotação de Herberto Klein para manter a harmonia visual.

**Tech Stack:** Astro, Tailwind CSS, TypeScript

## Global Constraints
* As imagens corretas devem ser as novas JPGs fornecidas no diretório `src/assets/`.
* O diretor Thiago Gal deve ser inserido na ordem cronológica entre Geraldo Oliveira (2012-2014) e Herberto Klein (2018-2019).
* Manter o comportamento do carrossel de diretores idêntico, apenas adicionando o novo item.

---

### Task 1: Atualização da página sobre.astro

**Files:**
- Modify: `src/pages/sobre.astro`

**Interfaces:**
- Consumes: None
- Produces: None

- [ ] **Step 1: Modificar os imports das imagens de ambiente e importar a imagem do novo diretor**

Substituir em `src/pages/sobre.astro`:
```typescript
import imgEntrada from '../assets/entrada-instituto.png';
import imgSalaAula from '../assets/sala-aula.webp';
import imgSalaJogos from '../assets/sala-jogos.webp';
```
Por:
```typescript
import imgEntrada from '../assets/entrada-instituto.jpg';
import imgSalaAula from '../assets/sala-aula.jpg';
import imgSalaJogos from '../assets/sala-jogos.jpg';
import dirGal from '../assets/diretor-gal.jpg';
```

- [ ] **Step 2: Adicionar Thiago Gal ao carrossel de diretores e ajustar cartão de Herberto Klein**

Localizar os cards de Geraldo Oliveira e Herberto Klein em `src/pages/sobre.astro` (aproximadamente entre as linhas 101 e 126):
```html
                            <div class="snap-center shrink-0 w-[200px] flex justify-center py-2">
                                <div class="bg-white p-2 pb-14 transform -rotate-2 w-[184px] relative text-principal outline outline-1 outline-transparent ring-1 ring-transparent">
                                    <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-yellow-100 opacity-90 z-10 pointer-events-none"></div>
                                    <div class="w-full aspect-[4/5] overflow-hidden bg-destaque mb-2">
                                        <Image src={dirGeraldo} alt="Geraldo Oliveira" class="w-full h-full object-cover object-top grayscale-[0.3] " />
                                    </div>
                                    <div class="absolute bottom-3 w-full left-0 text-center flex flex-col items-center">
                                        <p class="font-heading font-black text-principal text-xs uppercase truncate w-full px-1">Geraldo Oliveira</p>
                                        <span class="bg-principal text-white px-2 py-0.5 text-[0.55rem] font-black uppercase tracking-widest mt-0.5">2012 - 2014</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="snap-center shrink-0 w-[200px] flex justify-center py-2">
                                <div class="bg-white p-2 pb-14 transform rotate-1 w-[184px] relative text-principal outline outline-1 outline-transparent ring-1 ring-transparent">
                                    <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-pink-100 opacity-90 z-10 pointer-events-none"></div>
                                    <div class="w-full aspect-[4/5] overflow-hidden bg-destaque mb-2">
                                        <Image src={dirHeberto} alt="Herberto Morôni Klein" class="w-full h-full object-cover object-top grayscale-[0.3] " />
                                    </div>
                                    <div class="absolute bottom-3 w-full left-0 text-center flex flex-col items-center">
                                        <p class="font-heading font-black text-principal text-xs uppercase truncate w-full px-1">Herberto Klein</p>
                                        <span class="bg-principal text-white px-2 py-0.5 text-[0.55rem] font-black uppercase tracking-widest mt-0.5">2018 - 2019</span>
                                    </div>
                                </div>
                            </div>
```

E alterar para incluir Thiago Gal e reajustar Herberto Klein:
```html
                            <div class="snap-center shrink-0 w-[200px] flex justify-center py-2">
                                <div class="bg-white p-2 pb-14 transform -rotate-2 w-[184px] relative text-principal outline outline-1 outline-transparent ring-1 ring-transparent">
                                    <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-yellow-100 opacity-90 z-10 pointer-events-none"></div>
                                    <div class="w-full aspect-[4/5] overflow-hidden bg-destaque mb-2">
                                        <Image src={dirGeraldo} alt="Geraldo Oliveira" class="w-full h-full object-cover object-top grayscale-[0.3] " />
                                    </div>
                                    <div class="absolute bottom-3 w-full left-0 text-center flex flex-col items-center">
                                        <p class="font-heading font-black text-principal text-xs uppercase truncate w-full px-1">Geraldo Oliveira</p>
                                        <span class="bg-principal text-white px-2 py-0.5 text-[0.55rem] font-black uppercase tracking-widest mt-0.5">2012 - 2014</span>
                                    </div>
                                </div>
                            </div>

                            <div class="snap-center shrink-0 w-[200px] flex justify-center py-2">
                                <div class="bg-white p-2 pb-14 transform rotate-1 w-[184px] relative text-principal outline outline-1 outline-transparent ring-1 ring-transparent">
                                    <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-blue-100 opacity-90 z-10 pointer-events-none"></div>
                                    <div class="w-full aspect-[4/5] overflow-hidden bg-destaque mb-2">
                                        <Image src={dirGal} alt="Thiago Gal" class="w-full h-full object-cover object-top grayscale-[0.3] " />
                                    </div>
                                    <div class="absolute bottom-3 w-full left-0 text-center flex flex-col items-center">
                                        <p class="font-heading font-black text-principal text-xs uppercase truncate w-full px-1">Thiago Gal</p>
                                        <span class="bg-principal text-white px-2 py-0.5 text-[0.55rem] font-black uppercase tracking-widest mt-0.5">2014 - 2017</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="snap-center shrink-0 w-[200px] flex justify-center py-2">
                                <div class="bg-white p-2 pb-14 transform -rotate-1 w-[184px] relative text-principal outline outline-1 outline-transparent ring-1 ring-transparent">
                                    <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-pink-100 opacity-90 z-10 pointer-events-none"></div>
                                    <div class="w-full aspect-[4/5] overflow-hidden bg-destaque mb-2">
                                        <Image src={dirHeberto} alt="Herberto Morôni Klein" class="w-full h-full object-cover object-top grayscale-[0.3] " />
                                    </div>
                                    <div class="absolute bottom-3 w-full left-0 text-center flex flex-col items-center">
                                        <p class="font-heading font-black text-principal text-xs uppercase truncate w-full px-1">Herberto Klein</p>
                                        <span class="bg-principal text-white px-2 py-0.5 text-[0.55rem] font-black uppercase tracking-widest mt-0.5">2018 - 2019</span>
                                    </div>
                                </div>
                            </div>
```

- [ ] **Step 3: Executar build local para testar a compilação**

Comando: `npm run build`
Esperado: Compilação realizada com sucesso, sem reclamação de assets inválidos ou imports quebrados.

- [ ] **Step 4: Realizar o commit das alterações**

Comando:
```bash
git add src/pages/sobre.astro
git commit -m "feat(sobre): add Thiago Gal and update main environment photos to jpg"
```
