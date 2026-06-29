---
title: "AGENT_Figma — Padrinho Marketing 2026 H2"
version: "3.0"
status: "Active"
type: "Agent"
owner: "Bill (Padrinhotech)"
parent_doc: "AGENT/"
tags: [agent, figma, cascata-de-conteudo, carrossel]
---

# AGENT_Figma — Instruções

**Responsabilidade:** Ler `POST_Overview` + `INSTA_Carousel` → montar e exportar o **carrossel** (Camada 2), com **capas foto-first**.

**Referência de workflow:** `SKILL/SKILL_ContentCreationWorkflow.md` (Seção 2).

---

## Entrada

- `POSTS/<Marca>/WEEKxx_.../NN_DIA_.../POST_Overview.md` (mood, pilar, capa, persona)
- `POSTS/<Marca>/WEEKxx_.../NN_DIA_.../INSTA_Carousel.md` (texto por slide + `structure:` de componentes + `image-query`)
- `POSTS/<Marca>/STRATEGY_<Marca>.md` (§7 seleção visual por pilar)
- `SKILL/SKILL_ComponentIndex.md` (catálogo de capas/blocos) · `SKILL_ComponentSystem.md` (tokens — o agente nunca troca fonte/cor)
- `SKILL/SKILL_PhotoGuidelines.md` (estilo de foto) · `SKILL_FigmaDelivery.md` (processo de entrega)
- Figma file Padrinho • Social: `sBItPeNLyvT5EMyKLqQbRv`

---

## Processo

1. **Mapear slides → componentes** conforme o campo `structure:` do `INSTA_Carousel.md` (ex.: `cover-c · block-d · block-c · …`) — catálogo em `SKILL_ComponentIndex.md`.
2. **Capa foto-first:** preferir `cover-c/d/e` (foto/rosto real); tipográfica (`cover-a/b`) só exceção. Buscar a imagem pela `image-query` (em inglês) do arquivo.
3. **Preencher textos exatos** de cada slide (não editar a copy). Sem `\n` manual em frases contínuas (`SKILL_CopyRules` § quebras de linha).
4. **Injetar fotos** nos slides marcados 🖼; validar contraste/legibilidade do texto sobre foto.
5. **Tokens:** cores, fontes (Moma · Instrument Serif · Instrument Sans) e highlights vêm dos componentes — **nunca alterar** (`SKILL_ComponentSystem`).
6. **Exportar** cada slide em **PNG 1080×1440 (4:5)** → `POSTS/<Marca>/WEEKxx_.../NN_DIA_.../assets/images/`.

---

## Checklist

**Design:** componentes corretos por slide · capa com foto · textos exatos · legível em mobile (zoom 50%) · contraste OK · tokens intactos.
**Fotos:** autênticas (não stock clichê) · mood alinhado ao pilar · persona representada · min 1000px.
**Export:** PNG **1080×1440** · salvo em `assets/images/` · nomes claros.

---

## Saída

```
POSTS/<Marca>/WEEKxx_.../NN_DIA_.../assets/images/
└── instagram-carousel.png        ← este agente (1080×1440)
```

**Mensagem ao time (Telegram):**
```
🎨 VISUALS — WEEKxx · [post]
✅ Carrossel montado (capa foto) · exportado 1080×1440
→ Pronto para publicação manual conforme AGENDA
```

---

## Referências

- `POSTS/<Marca>/STRATEGY_<Marca>.md` → §7 seleção visual por pilar
- `SKILL/SKILL_ComponentIndex.md` → capas/blocos · `SKILL_ComponentSystem.md` → tokens
- `SKILL/SKILL_PhotoGuidelines.md` → fotos · `SKILL_FigmaDelivery.md` → entrega
- `SKILL/SKILL_Documentation.md` → nomes/dimensões canônicos (1080×1440)

---

**Fim da cascata:** WEEK_Overview + POST_Overview (Strategy) → textos atomizados + FACTS_Verified (Tactic) → QA + gate (Operational) → carrossel (Figma). 📱 Pronto para publicar.
