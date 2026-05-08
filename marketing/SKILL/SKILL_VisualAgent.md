---
title: "Visual Agent Workflow — Padrinho"
version: "1.0"
status: "Final"
type: "Skill"
owner: "Padrinho Marketing Automation"
parent_doc: "marketing/SKILL/"
tags: [visual, photos, unsplash, figma, workflow]
---

# Visual Agent Workflow — Padrinho

Workflow de seleção e aplicação de fotos em templates Figma com imagem. Leia este arquivo junto com photo-guidelines.md quando processando conteúdo visual. Guia operacional para aplicação de assets visuais.

## Papel
Você é acionado sempre que um slide usa um template com foto (`bg-photo`).
Sua função é selecionar a foto certa do banco `_ASSETS` e copiar o fill
para o layer de imagem do slide.

**Leia sempre antes:** `skills/operational/photo-guidelines.md`

---

## Templates que precisam de foto

| Template | Ação |
|---|---|
| `cover-c / photo-fullbleed` | Buscar em _ASSETS |
| `cover-d / photo-fullbleed` | Buscar em _ASSETS |
| `block-h / quote-content` | Buscar em _ASSETS |
| `block-i / quote-list` | Buscar em _ASSETS |
| `block-j / final-quote-a` | Buscar em _ASSETS |
| `block-k / quote-full-a/b/c` | Buscar em _ASSETS |
| `block-l / quote-full-b` | Buscar em _ASSETS |
| `block-n / final-quote-b` | Buscar em _ASSETS |
| Todos os outros | Nenhuma ação |

---

## Banco de Fotos — _ASSETS

**Arquivo:** `sBItPeNLyvT5EMyKLqQbRv`
**Página:** `_ASSETS`

Fotos organizadas por pilar em 5 seções.
Você popula arrastando fotos do Unsplash (ou qualquer fonte) diretamente
para os slots. Uma vez dentro, ficam disponíveis para todos os posts.

### Catálogo de slots

#### RECONHECIMENTO (8 slots)
| Slot | Descrição | Fundo |
|---|---|---|
| `rec-01 / rosto-oculto-cabelo` | Rosto coberto pelo cabelo | Claro |
| `rec-02 / rosto-oculto-maos` | Rosto coberto pelas mãos | Claro |
| `rec-03 / olhar-distante` | Olhar introspectivo, distante | Claro |
| `rec-04 / mulher-sozinha` | Mulher sozinha, cotidiano | Claro |
| `rec-05 / mulher-janela` | Mulher olhando pela janela | Escuro |
| `rec-06 / mulher-cama-manha` | Manhã, reflexão, cama/sofá | Escuro |
| `rec-07 / interior-noite` | Ambiente interior noturno | Escuro |
| `rec-08 / desfoque-emocional` | Motion blur, desfoque expressivo | Escuro |

#### DESMASCARAMENTO (6 slots)
| Slot | Descrição | Fundo |
|---|---|---|
| `des-01 / mulher-funcional-tensa` | Mulher funcional, expressão tensa | Claro |
| `des-02 / desfoque-movimento` | Desfoque, confusão, espiral | Escuro |
| `des-03 / mulher-bem-arrumada` | Aparência OK, algo fora de lugar | Claro |
| `des-04 / motion-blur-emocional` | Blur forte, emoção intensa | Escuro |
| `des-05 / contraste-luz-sombra` | Luz dramática, sombras | Escuro |
| `des-06 / perfil-pensativo` | Perfil, pensativo, neutro | Claro |

#### ACOLHIMENTO (6 slots)
| Slot | Descrição | Fundo |
|---|---|---|
| `aco-01 / duas-amigas-rindo` | Duas amigas, alegria real | Claro |
| `aco-02 / abraco-amigo` | Abraço, acolhimento | Claro |
| `aco-03 / maos-conexao` | Mãos — símbolo de cuidado | Claro |
| `aco-04 / conversa-proxima` | Conversa íntima, próxima | Claro |
| `aco-05 / amigas-carro` | Amigas no carro, autêntico | Claro |
| `aco-06 / luz-dourada-grupo` | Grupo, golden hour, calor | Claro |

#### EMPODERAMENTO (6 slots)
| Slot | Descrição | Fundo |
|---|---|---|
| `emp-01 / mulher-caminhando` | Mulher em movimento, exterior | Claro |
| `emp-02 / homem-correndo` | Homem correndo, ação | Claro |
| `emp-03 / mulher-horizonte` | Horizonte, liberdade | Claro |
| `emp-04 / postura-expansiva` | Postura aberta, confiante | Claro |
| `emp-05 / exterior-ceu-aberto` | Céu visível, exterior | Claro |
| `emp-06 / atleta-pista` | Atleta, pista, conquista | Claro |

#### PROVA SOCIAL (4 slots)
| Slot | Descrição | Fundo |
|---|---|---|
| `soc-01 / grupo-real-alegria` | Grupo pequeno, alegria real | Claro |
| `soc-02 / amigos-cotidiano` | Amigos em momento cotidiano | Claro |
| `soc-03 / momento-autentico` | Momento capturado, espontâneo | Claro |
| `soc-04 / pessoas-rindo-real` | Riso autêntico, não posado | Claro |

---

## Processo de Seleção e Injeção

```
1. Identificar o pilar do slide (ver photo-guidelines.md)
2. Identificar se o template precisa de fundo dark ou claro
   → dark: block-h, block-j, block-n, cover-c, cover-d (com overlay)
   → claro: block-i, block-k, block-l
3. Escolher o slot mais adequado da seção correspondente
4. Copiar o fill (image fill) do slot para o layer bg-photo do slide:
   - Localizar o slot em _ASSETS pelo nome
   - Ler o fills[0] (IMAGE fill)
   - Aplicar no layer bg-photo do frame em _QUEUE
5. Registrar na _annotation:
   FOTO: {nome do slot} / _ASSETS
   DATA: YYYY-MM-DD
```

### Código de referência (Figma Plugin API)

```javascript
// 1. Encontrar o slot em _ASSETS
const assetsPage = figma.root.children.find(p => p.name === "_ASSETS");
const slot = assetsPage.children.find(n => n.name === "rec-01 / rosto-oculto-cabelo");

// 2. Pegar o fill de imagem
const imageFill = slot.fills.find(f => f.type === "IMAGE");
if (!imageFill) {
  console.warn("Slot ainda sem foto — popular em _ASSETS");
  return;
}

// 3. Aplicar no layer bg-photo do slide
const bgLayer = findLayer(slideFrame, "ivana-cajina-9fl5AUulJsk-unsplash 1");
bgLayer.fills = [imageFill];
```

---

## Quando o slot está vazio

Se o slot escolhido ainda não tem foto:
1. Verificar se outro slot da mesma seção está populado
2. Se nenhum da seção estiver: registrar na `_annotation`:
   ```
   FOTO: PENDENTE
   SLOT: {nome do slot}
   SEÇÃO: {pilar}
   ```
3. Entregar o slide com o placeholder cinza do slot

---

## Como popular os slots

1. Abrir a página `_ASSETS` no Figma
2. Encontrar o slot da categoria desejada
3. Arrastar a foto diretamente para o frame do slot
4. Ajustar o fill para `FILL` (cobrir o frame inteiro)

Fontes recomendadas para as fotos:
- Unsplash.com (buscar com as queries de `photo-guidelines.md`)
- Fotos próprias do Padrinho
- Fotos fornecidas pelo time

---

## Checklist de entrega

- [ ] Pilar do slide identificado?
- [ ] Slot compatível com o fundo do template (dark/claro)?
- [ ] Slot tem foto? (não é placeholder cinza)
- [ ] Fill copiado corretamente para o layer bg-photo?
- [ ] Atribuição registrada na `_annotation`?
- [ ] Screenshot tirado para validação visual?

---

**Last Updated:** 2026-05-07  
**Maintained by:** Figma Agent  
**References:**  
- [../SKILL/SKILL_operational/photo-guidelines.md](photo-guidelines.md)
- [../AUT/AUT_figma-design.md](../AUT/figma-design.md)
- [../AUT/AUT_operational.md](../AUT/operational.md)
