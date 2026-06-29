---
title: "Component Index — Padrinho Figma"
version: "1.0"
status: "Final"
type: "Skill"
owner: "Padrinho Marketing Automation"
parent_doc: "SKILL/"
tags: [components, figma, reference, design-system, templates]
---

# Component Index — Padrinho Figma

Catálogo de componentes Figma disponíveis para o Figma Agent selecionar e usar na criação de posts. Leia este arquivo se está escolhendo templates ou entendendo qual componente usar para cada tipo de conteúdo. Usado pelo Figma Agent para referenciar Frame IDs e seleção estratégica.

## Arquivo Principal
**File ID:** `sBItPeNLyvT5EMyKLqQbRv`
**Regra:** Nunca escrever nas páginas `🌀 Semana XX` ou `_COMPONENTS`.

---

## Catálogo de componentes

> **Catálogo canônico** (Frame IDs, fundo, campos suportados, pilares, limites) vive em **`SKILL_ComponentSystem.md` § Catálogo Completo + § Campos Disponíveis**. Este arquivo é o **guia de seleção**, não o catálogo — não duplique as tabelas de Frame ID aqui.
>
> Regra de escrita: nunca editar em `_COMPONENTS`; copiar para `_QUEUE` (fluxo em `SKILL_FigmaDelivery.md`).

### ⭐ Capa: preferência por FOTO
Das 5 capas, 3 têm foto (`cover-c`, `cover-d`, `cover-e`). **Dê preferência a elas** no slide 01 de qualquer carrossel — marque o slide com 🖼 e inclua `image-query` (em inglês). As tipográficas (`cover-a`, `cover-b`) são **exceção** — só quando o conceito for puramente textual.

---

## Guia Rápido de Seleção

```
HOOK emocional forte (foto, impacto)
  → cover-c, cover-d, cover-e, block-h, block-j, block-k, block-l
  → cover-e: capa de foto com subhead + headline + CTA

HEADLINE editorial (só tipografia)
  → cover-a, cover-b, block-c, block-d

LISTA educacional (bullets + CTA)
  → block-a (dark), block-b (light)
  → block-e (dark 3 items), block-f (light 3 items)
  → block-g (dado + lista em caixa)
  → block-i (lista sobre foto)

DADO / ESTATÍSTICA
  → data-f (% com fill)
  → data-g (grid 100)
  → data-b/c (círculos)
  → data-c/huge (número gigante)
  → data-a (ondas comparativo)
  → data-e (partes/proporção)
  → data-d (milestones comunidade)

FECHAMENTO de carrossel (CTA suave)
  → block-j, block-o, block-p
```

---

## Seleção de DATA por TIPO de dado (pare de usar `data-a` pra tudo)

> **Diagnóstico:** o agente cai sempre em `data-a` — os outros 7 templates de dado quase nunca entram. Escolha pelo **formato do número**, não por hábito. Um percentual NÃO é um número-herói.

| O dado é… | Template certo | Exemplo |
|---|---|---|
| **1 número-herói** (moeda, volume, contagem) | `data-a / wave-number` | "R$ 7 bilhões", "7,7 L por pessoa" |
| **percentual (%)** | `data-b / circle-grid-a` **ou** `data-f / quote-fill-percentage` | "64% não bebem", "55% já pensaram em parar" |
| **% denso / muitos itens** | `data-c / circle-grid-b` | percentuais com granularidade |
| **"X em cada N pessoas"** | `data-g / quote-100` **ou** `data-e / quote-parts` | "6 em cada 10", "1 em cada 4" |
| **fração / proporção** | `data-e / quote-parts` | "3 de 4 recaídas…" |
| **milestone de comunidade** (logo marks) | `data-d / quote-numbers` | "+1.000 downloads", "3.265 plays" |
| **número de impacto gigante (não-moeda)** | `data-c / huge-numbers` ⚠️ **o número é vetor — NÃO editável via texto**; só use quando o número casar com o componente | "+1.200 pessoas" |

**Regra de variedade de dado:**
- No máx **1 slide de dado por template** dentro do mesmo carrossel.
- Se a semana tem vários posts com **%**, **alterne** entre `data-b`, `data-f` e `data-g` — nunca repita `data-a` pra todos.
- `data-a` é reservado a **número-herói único** (não percentual). "64%" → `data-b`/`data-f`/`data-g`, nunca `data-a`.

---

## Posts de Referência — Semanas 08–10

> Usar como referência visual e editorial. Nunca editar.

### Semana 10 (padrão atual)

| Frame ID | Componente equivalente | Pilar | Nota |
|---|---|---|---|
| `3205:1249` | `block-c / statement-dark` | Acolhimento | "Pode ter os dois" |
| `3205:3021` | `block-a / list-dark` | Acolhimento | "Com o Bill, você pode:" |
| `3205:2954` | `block-b / list-light` | Empoderamento | IA no cotidiano |
| `3205:2887` | `cover-d / photo-fullbleed` | Desmascaramento | Ghibli wave hand |
| `3205:1303` | `cover-b / dark-bold-left` | Prova Social | Personagem + celular |

### Semana 08 (foto + data)

| Frame ID | Componente equivalente | Pilar | Nota |
|---|---|---|---|
| `3177:56` | `cover-d / photo-fullbleed` | Desmascaramento | Handwriting + highlight |
| `3177:3818` | `cover-b / dark-bold-left` | Reconhecimento | Seta decorativa |
| `3177:3942` | `data-a / wave-number` | Empoderamento | Ondas + 7,7 litros |
| `3177:3946` | `data-b / circle-grid-a` | Empoderamento | 60% litrão |
| `3177:3881` | `cover-c / photo-fullbleed` | Reconhecimento | Blumine + quote |
| `3177:3870` | `block-l / quote-full-b` | Reconhecimento | Amigos no carro |

---

## DNA Visual — O que faz um post ser Padrinho

1. Instrument Serif com pelo menos uma palavra em *itálico*
2. Highlight inline `#669AB7` cobre a linha inteira do *itálico*
3. `@padrinho.app` spaced, quase invisível, y≈1321
4. Corner radius 44px no frame
5. CTA sempre em caixa bordada dupla (+5,+5 offset)
6. Bullets: ◆ + bold keyword + regular detail
7. Wave (~) sob palavra-chave de CTA
8. Logo mark radial como âncora visual (não decoração)
9. Alternância dark (`#002E49`) / light (`#F9F8F3`) entre slides
10. Foto sempre autêntica — nunca posada ou com sorriso forçado

## O que NÃO é Padrinho
- Gradientes genéricos sem base nos tokens
- Tipografia toda em bold sem contraste de peso
- CTA com linguagem de venda no orgânico
- Mais de uma cor de destaque por post
- Formato quadrado (1080×1080) — sempre 1080×1440

---

**Last Updated:** 2026-06-21  
**Maintained by:** Figma Agent  
**References:**  
- [SKILL/SKILL_ComponentSystem.md](SKILL/SKILL_ComponentSystem.md)
- [SKILL/SKILL_FigmaDelivery.md](SKILL/SKILL_FigmaDelivery.md)
- [AGENT/AGENT_Figma.md](AGENT/AGENT_Figma.md)
