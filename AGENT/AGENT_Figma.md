# AGENT_Figma — Instruções

**Responsabilidade:** Ler `POST_Overview` + `INSTA_Carousel` → montar e exportar o **carrossel** (Camada 2), com **capas foto-first**.

**Referência de workflow:** `SKILL/SKILL_ContentCreationWorkflow.md` (Seção 2).

---

## Entrada

- `POSTS/<Marca>/WEEKxx_.../NN_DIA_.../POST_Overview.md` (mood, pilar, capa, persona)
- `POSTS/<Marca>/WEEKxx_.../NN_DIA_.../INSTA_Carousel.md` (texto por slide + `structure:` de componentes + `image-query`)
- `SKILL/SKILL_ComponentIndex.md` · `SKILL_ComponentSystem.md` (seleção visual / capa foto-first por pilar)
- `SKILL/SKILL_ComponentIndex.md` (catálogo de capas/blocos) · `SKILL_ComponentSystem.md` (tokens — o agente nunca troca fonte/cor)
- `SKILL/SKILL_PhotoGuidelines.md` (estilo de foto) · `SKILL_FigmaDelivery.md` (processo de entrega)
- Figma file Padrinho • Social: `sBItPeNLyvT5EMyKLqQbRv`

---

## Processo

1. **Página da semana:** garantir `🌀 Semana NN` no Figma (criar se não existir; NN = nº da WEEK). **Não usar `_QUEUE`** (descontinuado). Regras de página/segurança em `SKILL_FigmaDelivery.md`.
2. **Mapear slides → componentes** conforme o campo `structure:` do `INSTA_Carousel.md` (ex.: `cover / photo-fullbleed-c · content / deep-text-dark-a · quote / simple-b · …`) — catálogo em `SKILL_ComponentIndex.md`.
3. **Conferir variedade entre os 4 posts** (`SKILL_ComponentSystem` § Variedade): cada post tem **forma dominante diferente** e **nº de slides variado** — se vierem clones (mesma espinha/contagem), devolver à Tactic. Nunca 4 posts quase idênticos.
4. **Capa foto-first:** preferir `cover / photo-fullbleed-a/b/c` (foto/rosto real); tipográfica (`cover / minimal-light/dark`) só exceção. Buscar a imagem pela `image-query` (em inglês).
5. **Preencher textos exatos** de cada slide (não editar a copy). Sem `\n` manual em frases contínuas (`SKILL_CopyRules` § quebras de linha).
6. **Injetar fotos** nos slides marcados 🖼; validar contraste/legibilidade.
7. **Tokens:** cores, fontes (Moma · Instrument Serif · Instrument Sans) e highlights vêm dos componentes — **nunca alterar** (`SKILL_ComponentSystem`).
8. **Layout na página** (`SKILL_FigmaDelivery` § Layout): uma linha por post, **0px entre slides**; carrosséis empilhados na ordem dos posts, **400px entre carrosséis**.
9. **Exportar** cada slide em **PNG 1080×1440 (4:5)** → `POSTS/<Marca>/WEEKxx_.../NN_DIA_.../CAROUSEL_Slides/`, um arquivo por slide, nomeado **apenas com o número de 2 dígitos** (`01.png`, `02.png`, ... `NN.png` — sem a palavra "slide").

---

## Checklist

**Página/layout:** frames em `🌀 Semana NN` (não `_QUEUE`) · slides a **0px** dentro do carrossel · **400px** entre carrosséis · empilhados na ordem dos posts.
**Variedade:** 4 posts com formas dominantes distintas + nº de slides variado (`SKILL_ComponentSystem` § Variedade) — não clonar esqueleto.
**Design:** componentes corretos por slide · capa com foto · textos exatos · legível em mobile (zoom 50%) · contraste OK · tokens intactos.
**Fotos:** autênticas (não stock clichê) · mood alinhado ao pilar · persona representada · min 1000px.
**Export:** PNG **1080×1440** · salvo em `CAROUSEL_Slides/` · um arquivo por slide, nomeado só com o número (`01.png`...`NN.png`).

---

## Saída

```
POSTS/<Marca>/WEEKxx_.../NN_DIA_.../CAROUSEL_Slides/
├── 01.png        ← este agente (1080×1440)
├── 02.png
└── ...NN.png     ← um arquivo por slide, só o número
```

**Mensagem ao time (Telegram):**
```
🎨 VISUALS — WEEKxx · [post]
✅ Carrossel montado (capa foto) · exportado 1080×1440
→ Pronto para publicação manual conforme AGENDA
```

---

## Referências

- `SKILL/SKILL_ComponentIndex.md` → seleção visual / capa foto-first por pilar
- `SKILL/SKILL_ComponentIndex.md` → capas/blocos · `SKILL_ComponentSystem.md` → tokens
- `SKILL/SKILL_PhotoGuidelines.md` → fotos · `SKILL_FigmaDelivery.md` → entrega
- `SKILL/SKILL_Documentation.md` → nomes/dimensões canônicos (1080×1440)

---

**Fim da cascata:** WEEK_Overview + POST_Overview (Strategy) → textos atomizados + FACTS_Verified (Tactic) → QA + gate (Operational) → carrossel (Figma). 📱 Pronto para publicar.
