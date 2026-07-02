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
Das 5 capas, 3 têm foto (`cover / photo-fullbleed-a`, `-b`, `-c`). **Dê preferência a elas** no slide 01 de qualquer carrossel — marque o slide com 🖼 e inclua `image-query` (em inglês). As tipográficas (`cover / minimal-light`, `minimal-dark`) são **exceção** — só quando o conceito for puramente textual.

---

## Crosswalk de nomes (antigo → novo, 2026 H2)

> A taxonomia mudou de `block-*/cover-*/data-*` (prefixo de letra) para `categoria / variante-descritiva`. Categorias: **cover · list · quote · content · data** (31 componentes). Tabela para traduzir referências antigas (inclusive `structure:` em posts já publicados).

| Novo nome | Frame ID | Nome antigo |
|---|---|---|
| `cover / minimal-light` | `3356:6120` | `cover-a / minimal-light` |
| `cover / minimal-dark` | `3356:6288` | `cover-b / dark-bold-left` |
| `cover / photo-fullbleed-a` | `3356:6076` | `cover-d / photo-fullbleed` |
| `cover / photo-fullbleed-b` | `3737:323` | — (novo; substitui a antiga `cover-c`, removida) |
| `cover / photo-fullbleed-c` | `3532:2411` | `cover-e / photo-fullbleed` |
| `list / list-dark-a` | `3356:6346` | `block-a / list-dark` |
| `list / list-light-a` | `3356:6373` | `block-b / list-light` |
| `list / list-dark-b` | `3737:290` | — (novo; reconstrói a antiga `block-e / list-dark-b`) |
| `list / list-light-b` | `3356:6491` | `block-g / topic-list-light` |
| `list / list-fullbleed` | `3356:6530` | `block-i / quote-list` |
| `quote / phrase` | `3356:6588` | `block-l / quote-full-b` |
| `quote / phrase-topic-a` | `3356:8512` | `block-o / final-quote-b` |
| `quote / phrase-topic-b` | `3356:8530` | `block-p / quote-full-c` |
| `quote / ending-a` | `3356:6518` | `block-j / final-quote-a` |
| `quote / ending-b` | `3356:6570` | `block-k / quote-full-a` |
| `quote / simple-a` | `3356:5272` | `block-n / quote-simple` |
| `quote / simple-b` | `3585:2002` | `block-s / statement-blue` |
| `quote / fold-quote` | `3356:5189` | `block-m / quote-stacked` |
| `content / deep-text-dark-a` | `3575:2121` | `block-r / content-dark` |
| `content / deep-text-light-a` | `3735:211` | `block-t / content-image` |
| `content / deep-text-dark-b` | `3575:2093` | `block-q / content-light` (agora dark) |
| `content / deep-text-light-b` | `3737:316` | — (novo) |
| `content / deep-fullbleed` | `3356:6555` | `block-h / quote-content` |
| `data / wave-number` | `3356:8220` | `data-a / wave-number` |
| `data / circle-grid-a` | `3356:8231` | `data-b / circle-grid-a` |
| `data / circle-grid-b` | `3356:8455` | `data-c / circle-grid-b` |
| `data / huge-numbers` | `3356:6653` | `data-c / huge-numbers` (colisão resolvida) |
| `data / quote-numbers` | `3356:6611` | `data-d / quote-numbers` |
| `data / quote-parts` | `3356:8429` | `data-e / quote-parts` |
| `data / quote-fill-percentage` | `3356:8265` | `data-f / quote-fill-percentage` |
| `data / quote-100` | `3356:8313` | `data-g / quote-100` |

> **Descontinuados** (removidos do Figma, sem substituto 1:1): `cover-c / photo-fullbleed` (`3356:6334`), `block-c / statement-dark`, `block-d / statement-light`, `block-e / list-dark-b`, `block-f / list-light-b`.

---

## Guia Rápido de Seleção

```
HOOK emocional forte (foto, impacto)
  → cover / photo-fullbleed-a·b·c, quote / phrase, quote / ending-a·b
  → cover / photo-fullbleed-c: capa de foto com subhead + headline + CTA

HEADLINE editorial (só tipografia)
  → cover / minimal-light·dark, quote / simple-b (com CTA), quote / simple-a

CONTEÚDO denso com imagem inline (dizer mais + apoio visual)
  → content / deep-text-dark-a·b, deep-text-light-a·b
  → deep-text-light-a (com subhead de contexto)
  → content / deep-fullbleed (texto profundo sobre foto full-bleed)

LISTA educacional (bullets + CTA)
  → list / list-dark-a, list-light-a (4 bullets + CTA)
  → list / list-dark-b, list-light-b (subhead + caixa de lista/tópicos)
  → list / list-fullbleed (lista sobre foto)

DADO / ESTATÍSTICA
  → data / quote-fill-percentage (% com fill)
  → data / quote-100 (grid 100)
  → data / circle-grid-a·b (círculos)
  → data / huge-numbers (número gigante)
  → data / wave-number (ondas comparativo)
  → data / quote-parts (partes/proporção)
  → data / quote-numbers (milestones comunidade)

FECHAMENTO de carrossel (CTA suave)
  → quote / ending-a, quote / ending-b, quote / phrase-topic-a·b, quote / simple-b
```

---

## Seleção de DATA por TIPO de dado (pare de usar `wave-number` pra tudo)

> **Diagnóstico:** o agente cai sempre em `wave-number` — os outros 7 templates de dado quase nunca entram. Escolha pelo **formato do número**, não por hábito. Um percentual NÃO é um número-herói.

| O dado é… | Template certo | Exemplo |
|---|---|---|
| **1 número-herói** (moeda, volume, contagem) | `data / wave-number` | "R$ 7 bilhões", "7,7 L por pessoa" |
| **percentual (%)** | `data / circle-grid-a` **ou** `data / quote-fill-percentage` | "64% não bebem", "55% já pensaram em parar" |
| **% denso / muitos itens** | `data / circle-grid-b` | percentuais com granularidade |
| **"X em cada N pessoas"** | `data / quote-100` **ou** `data / quote-parts` | "6 em cada 10", "1 em cada 4" |
| **fração / proporção** | `data / quote-parts` | "3 de 4 recaídas…" |
| **milestone de comunidade** (logo marks) | `data / quote-numbers` | "+1.000 downloads", "3.265 plays" |
| **número de impacto gigante (não-moeda)** | `data / huge-numbers` ⚠️ **o número é vetor — NÃO editável via texto**; só use quando o número casar com o componente | "+1.200 pessoas" |

**Regra de variedade de dado:**
- No máx **1 slide de dado por template** dentro do mesmo carrossel.
- Se a semana tem vários posts com **%**, **alterne** entre `circle-grid-a`, `quote-fill-percentage` e `quote-100` — nunca repita `wave-number` pra todos.
- `wave-number` é reservado a **número-herói único** (não percentual). "64%" → `circle-grid-a`/`quote-fill-percentage`/`quote-100`, nunca `wave-number`.

---

## Posts de Referência — Semanas 08–10

> Usar como referência visual e editorial. Nunca editar.

### Semana 10 (padrão atual)

| Frame ID | Componente equivalente | Pilar | Nota |
|---|---|---|---|
| `3205:1249` | `quote / simple-b` (era `block-c / statement-dark`, descontinuado) | Acolhimento | "Pode ter os dois" |
| `3205:3021` | `list / list-dark-a` | Acolhimento | "Com o Bill, você pode:" |
| `3205:2954` | `list / list-light-a` | Empoderamento | IA no cotidiano |
| `3205:2887` | `cover / photo-fullbleed-a` | Desmascaramento | Ghibli wave hand |
| `3205:1303` | `cover / minimal-dark` | Prova Social | Personagem + celular |

### Semana 08 (foto + data)

| Frame ID | Componente equivalente | Pilar | Nota |
|---|---|---|---|
| `3177:56` | `cover / photo-fullbleed-a` | Desmascaramento | Handwriting + highlight |
| `3177:3818` | `cover / minimal-dark` | Reconhecimento | Seta decorativa |
| `3177:3942` | `data / wave-number` | Empoderamento | Ondas + 7,7 litros |
| `3177:3946` | `data / circle-grid-a` | Empoderamento | 60% litrão |
| `3177:3881` | `cover / photo-fullbleed-c` | Reconhecimento | Blumine + quote |
| `3177:3870` | `quote / phrase` | Reconhecimento | Amigos no carro |

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

**Last Updated:** 2026-07-01  
**Maintained by:** Figma Agent  
**References:**  
- [SKILL/SKILL_ComponentSystem.md](SKILL/SKILL_ComponentSystem.md)
- [SKILL/SKILL_FigmaDelivery.md](SKILL/SKILL_FigmaDelivery.md)
- [AGENT/AGENT_Figma.md](AGENT/AGENT_Figma.md)
