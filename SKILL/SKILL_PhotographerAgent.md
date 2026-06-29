---
title: "Photographer Agent Workflow — Padrinho"
version: "1.0"
status: "Final"
type: "Skill"
owner: "Padrinho Marketing Automation"
parent_doc: "SKILL/"
tags: [visual, photos, unsplash, figma, workflow]
---

# Photographer Agent Workflow — Padrinho

Workflow de seleção e aplicação de fotos em templates Figma com imagem. Leia este arquivo junto com photo-guidelines.md quando processando conteúdo visual. Guia operacional para aplicação de assets visuais.

## Papel
Você é acionado sempre que um slide usa um template com foto. Sua função é **buscar a foto certa no Unsplash (ao vivo)** pela `image-query` do slide e injetá-la no layer `image` do frame em `_QUEUE`.

**Leia sempre antes:** `SKILL/SKILL_PhotoGuidelines.md` (critérios, mood por pilar, zona de texto segura, e a **lista canônica de templates com foto**).

---

## Templates que precisam de foto

| Template | Ação |
|---|---|
| `cover-c / photo-fullbleed` | Buscar em _ASSETS |
| `cover-d / photo-fullbleed` | Buscar em _ASSETS |
| `block-h / quote-content` | Buscar em _ASSETS |
| `block-i / quote-list` | Buscar em _ASSETS |
| `block-j / final-quote-a` | Buscar em _ASSETS |
| `block-k / quote-full-a` | Buscar em _ASSETS |
| `block-l / quote-full-b` | Buscar em _ASSETS |
| `block-o / final-quote-b` | Buscar em _ASSETS |
| `block-p / quote-full-c` | Buscar em _ASSETS |
| Todos os outros | Nenhuma ação |

---

## Banco de Fotos — _ASSETS (cache OPCIONAL, secundário)

> O mecanismo **primário é Unsplash ao vivo** (ver Processo abaixo). A página `_ASSETS` (arquivo `sBItPeNLyvT5EMyKLqQbRv`) é só um **cache opcional de reuso**: fotos já aprovadas podem ficar ali pra reaproveitar sem nova busca. Não é obrigatório popular slots.

Catálogo de slots por pilar (para reuso):

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

## Processo de Seleção e Injeção (Unsplash ao vivo)

```
1. Pegar a `image-query` (inglês) + pilar/mood do slide — critérios em SKILL_PhotoGuidelines.md
2. Identificar fundo do template:
   → dark:  block-h, block-j, block-o, cover-c/d (com overlay)
   → claro: block-i, block-k, block-l, block-p
3. Buscar foto PORTRAIT no Unsplash:
   GET https://api.unsplash.com/search/photos?query=<image-query>&orientation=portrait&per_page=1
   header: Authorization: Client-ID <ACCESS_KEY>   → results[0].urls.regular
4. Injetar via Figma MCP `upload_assets` (⚠️ `figma.createImageAsync` NÃO é suportado no use_figma):
   - achar o nodeId do layer chamado `image` dentro do slide (findOne name === 'image')
   - upload_assets(count=1, nodeId=<id do layer image>, scaleMode=FILL) → retorna submitUrl
   - baixar os bytes da foto e POST multipart (campo `file`) na submitUrl → commita + seta o fill
5. Registrar na _annotation:
   FOTO: <fotógrafo> / Unsplash · QUERY: <image-query> · DATA: YYYY-MM-DD
```

> **Reuso (opcional):** se já houver uma foto adequada na página `_ASSETS`, pode copiar o `fills[0]` (IMAGE) dela para o layer `image` em vez de buscar de novo. É atalho, não o caminho padrão.

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
- [SKILL/SKILL_PhotoGuidelines.md](SKILL/SKILL_PhotoGuidelines.md)
- [AGENT/AGENT_Figma.md](AGENT/AGENT_Figma.md)
- [AGENT/AGENT_Operational.md](AGENT/AGENT_Operational.md)
