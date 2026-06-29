---
title: "Component System — Padrinho Social Posts"
version: "1.0"
status: "Final"
type: "Skill"
owner: "Padrinho Marketing Automation"
parent_doc: "SKILL/"
tags: [components, figma, design-system, guidelines, visual-standards]
---

# Component System — Padrinho Social Posts

Guidelines de uso do design system Figma para criação de posts. Leia este arquivo se está entendendo como os componentes funcionam ou como adaptá-los. Usado pelo Figma Agent e Operational Agent para manter consistência visual.

## Conceito
Design system para posts de Instagram. O designer cria e mantém os
componentes no Figma. O agente escolhe, copia e adapta o conteúdo.
Nunca constrói do zero. Nunca altera estrutura visual.

---

## Arquivos Figma

| Arquivo | ID | Permissão |
|---|---|---|
| Styleguide | `YtsMDsUi5SIF29NCOFs53x` | Leitura — tokens, logos |
| Referências + Staging | `sBItPeNLyvT5EMyKLqQbRv` | Leitura nas Semanas / Escrita nas `_*` |

Página dos componentes: `_COMPONENTS` (id `3345:20`) — leitura + cópia apenas.

---

## Catálogo Completo de Componentes

### COVERS — Abertura / Capa de carrossel

> ✅ **`cover-d / photo-fullbleed` está habilitada** (2026 H2) — usa a fonte **Moma** (mix handwriting/serif), agora ativada. Os componentes usam 3 fontes: **Moma · Instrument Serif · Instrument Sans** (detalhe em `SKILL_CopyRules.md` § Tipografia).

| Nome | Frame ID | Fundo | Estrutura | Melhor para |
|---|---|---|---|---|
| `cover-a / minimal-light` | `3356:6120` | Cream `#F9F8F3` | Logo mark radial + serif headline esquerda (regular + *italic*) + body + handle | Acolhimento, Prova Social, posts editoriais |
| `cover-b / dark-bold-left` | `3356:6288` | Navy `#002E49` | Logo mark radial + serif headline esquerda + body + handle | Desmascaramento, Reconhecimento |
| `cover-c / photo-fullbleed` | `3356:6334` | Foto (blumine overlay) | Foto full bleed + headline centrado + highlight + CTA box dupla + raios decorativos | Reconhecimento emocional forte |
| `cover-d / photo-fullbleed` | `3356:6076` | Foto real | Foto full bleed + mix handwriting/serif + seta curva + wave + CTA box | Desmascaramento, hooks virais |
| `cover-e / photo-fullbleed` | `3532:2411` | Foto full-bleed | Foto full bleed + subhead + headline + CTA na capa | Hook emocional forte com CTA na capa |

---

### BLOCKS — Slides de conteúdo / corpo de carrossel

#### Tipográficos (sem foto)

| Nome | Frame ID | Fundo | Estrutura | Melhor para |
|---|---|---|---|---|
| `block-a / list-dark` | `3356:6346` | Navy `#002E49` | Serif headline + *italic* + highlight + 4 bullets (bold + regular) + CTA box dupla | Listas com produto/Bill, benefícios |
| `block-b / list-light` | `3356:6373` | Cream `#F9F8F3` | Serif headline + *italic* + highlight + 4 bullets + CTA box dupla | Listas educacionais, cotidiano |
| `block-c / statement-dark` | `3356:6399` | Navy `#002E49` | Logo mark radial + serif headline centrado + *italic* + highlight + CTA box dupla + wave | Statement de produto, acolhimento |
| `block-d / statement-light` | `3356:6411` | Cream `#F9F8F3` | Logo mark radial + serif headline centrado + *italic* + highlight + CTA box dupla + wave | Statement editorial, reframing |
| `block-e / list-dark-b` | `3356:6466` | Navy `#002E49` | Serif headline + *italic* + 3 bullets bold/regular + CTA box | Listas menores dark |
| `block-f / list-light-b` | `3356:6444` | Cream `#F9F8F3` | Serif headline + *italic* + 3 bullets + CTA box | Listas menores light |
| `block-g / topic-list-light` | `3356:6491` | Cream `#F9F8F3` | Subhead wave + serif headline grande + highlight + caixa topic-list (3 bullets dentro) | Dados com explicação + lista interna |
| `block-q / content-light` | `3575:2093` | Cream `#F9F8F3` | Serif headline + **body longo (3–5 linhas)** | **Conteúdo denso** — "dizer mais" sem foto: explicação, definição, mecanismo (educacional) |
| `block-r / content-dark` | `3575:2121` | Navy `#002E49` | Serif headline + **body longo (3–5 linhas)** | **Conteúdo denso** — variante dark do block-q |
| `block-s / statement-blue` | `3585:2002` | Azul (gradiente) | Subhead + serif headline (regular + *italic*) + highlight + **CTA box** + wave | Statement **com CTA** — 3ª cor de statement (entre navy `block-c` e cream `block-d`) |

#### Com foto

| Nome | Frame ID | Fundo | Estrutura | Melhor para |
|---|---|---|---|---|
| `block-h / quote-content` | `3356:6555` | Foto dark + raios | Foto + subhead pequeno + serif headline grande + highlight + CTA box | Reconhecimento emocional, hangxiety |
| `block-i / quote-list` | `3356:6530` | Foto warm | Foto + serif headline + *italic* + 4 bullets sobre foto | Listas sobre imagem, gatilhos |
| `block-j / final-quote-a` | `3356:6518` | Foto dark + raios | Foto + serif headline centrado + *italic* + highlight + subtext + CTA texto | Fechamento de carrossel, reframing |
| `block-k / quote-full-a` | `3356:6570` | Foto vivid | Foto + subhead + serif headline grande + *italic* + highlight + logo mark | Desmascaramento, narrativa forte |
| `block-l / quote-full-b` | `3356:6588` | Foto escura | Foto + serif headline centrado + *italic* + highlight + logo mark | Reconhecimento ("Na vida de quem...") |
| `block-m / quote-stacked` | `3356:5189` | Navy + stacked layers | Foto em camadas offset + serif headline + highlight | Desmascaramento artístico |
| `block-n / quote-simple` | `3356:5272` | Navy | Serif headline simples grande + highlight | Statement mínimo dark |
| `block-o / final-quote-b` | `3356:8512` | Foto + raios | Foto + serif headline + *italic* + highlight + CTA box + decorativos | Fechamento de carrossel |
| `block-p / quote-full-c` | `3356:8530` | Foto | Foto + headline + CTA tag | Variante de fechamento |

---

### DATA — Visualização de dados

> ⚠️ Colisão de nome: `3356:8455` (circle-grid-b) e `3356:6653` (huge-numbers) estão ambos rotulados `data-c`. Desambiguar SEMPRE pelo Frame ID. Renomeação em Figma pendente (sugestão: huge-numbers → `data-h`).

| Nome | Frame ID | Fundo | Estrutura | Melhor para |
|---|---|---|---|---|
| `data-a / wave-number` | `3356:8220` | Cream → Horizon (ondas) | Subtext top + 4 camadas de onda SVG + serif headline grande + *italic* + highlight | Comparativos de consumo |
| `data-b / circle-grid-a` | `3356:8231` | Cream `#F9F8F3` | Grid de logo marks preenchidos/vazios + serif headline + highlight | Percentuais visuais (ex: 60% de algo) |
| `data-c / circle-grid-b` | `3356:8455` | Cream `#F9F8F3` | Variante do grid de círculos | Percentuais com mais itens |
| `data-c / huge-numbers` | `3356:6653` | Navy `#002E49` + dot grid | Grid de pontos como fundo + serif headline gigante + highlight + subtext | Números de impacto (ex: +1.200 pessoas) |
| `data-d / quote-numbers` | `3356:6611` | Cream | Grid de logo marks + serif headline + *italic* + highlight + subtext | Milestones da comunidade |
| `data-e / quote-parts` | `3356:8429` | Navy com linhas horizontais | Escala visual numérica (0–4) + serif headline centrado + highlight duplo | Frações/proporções |
| `data-f / quote-fill-percentage` | `3356:8265` | Cream + preenchimento Horizon | Grid com linhas de percentual + número gigante + bold text | Percentuais tipo "55% já..." |
| `data-g / quote-100` | `3356:8313` | Navy com grid de rounded-rect | Grid de itens preenchidos/vazios + serif headline + highlight | "X em cada 100 pessoas" |

---

## Elementos Decorativos (presentes nos componentes)

Extraídos diretamente dos componentes reais. O agente não cria esses elementos —
copia do componente e adapta posição quando necessário.

| Elemento | Onde aparece | Descrição visual |
|---|---|---|
| **Logo Mark Radial** | cover-a, cover-b, block-c, block-d, block-l, data-d | Ícone Padrinho em spokes radiais. Usado como âncora visual entre topo e headline |
| **Highlight Inline** | Todos | Retângulo `#669AB7` ~42% opacidade cobrindo linha do *italic* emocional |
| **CTA Box Dupla** | cover-a, cover-b, block-a/b/c/d/e/f | Dois retângulos deslocados (+5,+5) criando sombra. Borda `#669AB7` |
| **Wave / Tilde** | cover-a, cover-b, block-c/d/g, data-a | Til estilizado (~) em `#669AB7` sob palavra-chave de CTA ou bold |
| **Raios Decorativos** | cover-c, block-h, block-j, block-o | Dois raios azuis `#669AB7` no canto superior esquerdo e direito |
| **Seta Curva** | cover-d | Seta handwriting em branco apontando para CTA |
| **Stacked Layers** | block-m/quote-stacked | Camadas de retângulos offset em tons de azul escuro + foto |
| **Ondas SVG** | data-a | 4 camadas de forma orgânica em tons horizon, empilhadas |
| **Dot Grid** | data-c/huge-numbers | Grid de pontos pequenos como textura de fundo |
| **Linhas Horizontais** | data-e, data-f | Linhas dashed horizontais como referência de escala |
| **Grid Rounded-Rect** | data-g | Grid de retângulos arredondados preenchidos/vazios para % |
| **Caixa Topic-List** | block-g | Caixa com borda + 3 bullets dentro, separados do headline |

---

## Nomenclatura de Layers

Todo componente deve ter layers com estes nomes para o agente localizar:

```
frame (1080×1440, cornerRadius 44)
│
├── bg-color / bg-photo ← substituir foto aqui
├── gradient-overlay   ← nunca editar
├── logo-mark          ← nunca editar
├── counter            ← editar: "N  /  N"
│
├── headline           ← editar: Instrument Serif Regular
├── headline-italic    ← editar: Instrument Serif Italic
├── hl                 ← ajustar largura ao texto italic
│
├── subhead            ← editar quando presente
├── body               ← editar quando presente
│
├── bullet-1/bold      ← editar texto
├── bullet-1/regular   ← editar texto
├── bullet-2/bold ... bullet-4/regular
│
├── cta-shadow         ← mover junto com cta-box
├── cta-box            ← mover junto com cta-shadow
├── cta-text           ← editar texto
│
├── wave               ← ajustar posição horizontal
│
├── _annotation        ← hidden — preencher com caption + hashtags + meta
│
└── handle             ← nunca editar
```

---

## Campos Disponíveis e Limites de Conteúdo por Template

> ⚠️ **Os limites abaixo são também ALVOS de conteúdo, não só tetos.** Campo que existe e fica vazio ou raso = slide subpreenchido. Escreva até a capacidade — regra completa em `SKILL_CopyRules.md` § *Escreva até a capacidade do componente*.

O copywriter DEVE gerar EXATAMENTE e APENAS os campos (`keys`) suportados pelo componente escolhido. **NUNCA crie chaves como `body` ou `headline-italic` se o componente na tabela abaixo não possuir suporte para elas**.

| Nome do Template | Campos (Keys) Suportados no Figma | Limites Estimados |
|---|---|---|
| `cover-a`, `cover-b` | `headline`, `body` | Headline: 2-3 linhas. Body: 2 linhas. (NOTA: não suporta `headline-italic`) |
| `cover-c` | `headline`, `subtext` | Headline: 2 linhas. Subtext: 1 linha. |
| `cover-d` | `headline`, `cta` | Headline: 2 linhas curtas (auto-width). CTA: 1 linha. |
| `cover-e` | `subhead`, `headline`, `cta` | Subhead: 1 linha. Headline: 2 linhas. CTA: 1 linha. |
| `block-a`, `block-b` | `headline`, `subtext`, `bullet-1`, `bullet-2`, `bullet-3`, `bullet-4` | Headline: 2 linhas. Bullets: 4 itens curtos. Subtext: 1-2 linhas. |
| `block-e`, `block-f` | `headline`, `body`, `bullet-1`, `bullet-2`, `bullet-3` | Headline: 2 linhas. Bullets: 3 itens curtos. Body: 2 linhas. |
| `block-c`, `block-d` | `headline`, `subtext` | Headline: 2-3 linhas. Subtext: 1 linha (usado como botão/tag). (NOTA: não suporta `body`) |
| `block-h` | `subhead`, `headline`, `body` | Subhead: 1 linha curta. Headline: 3 linhas. Body: 2 linhas. |
| `block-i` | `headline`, `bullet-1`, `bullet-2`, `bullet-3`, `bullet-4` | Headline: 2 linhas. Bullets: 4 itens. |
| `block-g` | `subhead`, `headline`, `body`, `bullet-1`, `bullet-2`, `bullet-3` | Subhead: 1 linha. Headline: 3 linhas. Body: 1 linha. Bullets: 3 itens curtos. |
| `block-j` | `headline`, `cta` | Headline: 3 linhas. CTA: 2 linhas. |
| `block-k`, `block-n` | `subhead`, `headline` | Subhead: 1 linha. Headline: 3 linhas. |
| `block-l`, `block-m` | `headline` | Headline: 3-4 linhas. |
| `block-o` | `headline`, `subtext` | Headline: 3 linhas. Subtext: 2 linhas. |
| `block-p` | `headline`, `cta` | Headline: 3 linhas. CTA: 1 linha. |
| `block-q`, `block-r` | `headline`, `body` | Headline: 2 linhas. **Body: 4–6 linhas (parágrafo denso).** Use quando precisar DIZER MAIS num slide só. |
| `block-s` | `headline`, `subtext`, `cta` | Subtext: subhead curto (1 linha). Headline: 2–3 linhas (com *itálico*). CTA: 1–2 linhas (caixa bordada). |
| `data-a` | `headline`, `subhead`, `subtext` | Headline: 2 linhas. Subhead: 1 linha. Subtext: 1 linha. |
| `data-b`, `data-c`, `data-g` | `headline` | Headline: 2-3 linhas. |
| `data-e` | `headline` | Headline: 2-3 linhas. (Os números fixos agora se chamam `number` e não devem ser gerados) |
| `data-f` | `headline`, `body` | Headline: 1-2 palavras (usado para o número gigante em destaque). Body: 2 linhas. (As porcentagens fixas agora se chamam `percentage` e não devem ser geradas) |
| `data-d` | `headline`, `body` | Headline: 2 linhas. Body: 2 linhas. |

> **CRÍTICO PARA O COPYWRITER:** Se você precisa de um parágrafo longo (`body`), **NÃO ESCOLHA** templates como `block-d` ou `block-a`, pois eles não têm onde receber o texto. Escolha `block-h` ou `cover-a`. 

> **IMAGENS:** componentes com foto recebem uma linha `image-query: <termos em inglês>`. Critérios/mood e a **lista canônica de templates com foto** vivem em `SKILL_PhotoGuidelines.md`; o **mecanismo de injeção** (Unsplash ao vivo via Figma `upload_assets`) vive em `SKILL_PhotographerAgent.md`.

Se o conteúdo não couber: condensar o copy, não forçar no template e não inventar chaves inexistentes.

---

## O que o Agente PODE editar
`headline` `headline-italic` `hl` (largura) `counter` `subhead` `body`
`bullet-N/bold` `bullet-N/regular` `cta-text` `wave` (posição) `bg-photo` (fill) `_annotation`

## O que o Agente NUNCA altera
Fontes · Tamanhos · Cores · Frame dimensions · `handle` · `logo-mark` · `gradient-overlay` · `bg-color`

## Posição Y — permitida com critério

O agente **pode ajustar a posição Y** de elementos quando o conteúdo adaptado
quebra em mais linhas do que o original e provoca sobreposição ou corte.

**Regras:**
- Mover o elemento afetado e todos os abaixo dele juntos (nunca isolado)
- Manter a distância relativa entre elementos do mesmo bloco
- Nunca mover: `handle`, `logo-mark`, `counter`, elementos decorativos fixos
- Ajuste máximo: ±120px — acima disso, condensar o copy ou reconsiderar o template
- Hard limit: nenhum conteúdo pode ultrapassar `y = H - 140` (zona do handle)

---


---

## Estrutura Obrigatória de Carrossel

Todo carrossel deve seguir esta estrutura mínima:

```
Slide 1   → COVER          (cover/*)         — preferência FOTO (cover-c/d/e); tipográfica (cover-a/b) só exceção
Slide 2   → CONTENT        (block/*)         — tipográfico
Slide 3   → IMAGE CONTENT  (block com foto)  — obrigatório ≥ 1x
Slide 4   → CONTENT        (block/*)         — tipográfico ou data
Slide 5   → CONTENT        (block/* ou data) — tipográfico ou data
Slide 6   → IMAGE CONTENT  (block com foto)  — recomendado
Slide N   → END            (block/statement) — fechamento com CTA
```

### Regras

**Imagem é prioridade.** Todo carrossel tem **≥1 foto**, mas a meta é **post rico em imagem** — a foto cria o contexto emocional e o ritmo humano (texto puro cansa). Referências de uso forte de imagem: `🌀 Semana 08` (carrossel "funcional", ~6 fotos), `🌀 Semana 09` (hangxiety / milestones). Lista canônica de templates com foto + critérios em `SKILL_PhotoGuidelines.md`.

**Distribuição (fotos INTERIORES — a capa-foto NÃO conta):**
- 6–8 slides → **3–4** fotos interiores · 9–12 slides → **4–5** fotos interiores
- Intercalar foto/texto para criar ritmo; evitar 2 fotos seguidas.
- **Evitar duas fotos consecutivas**; foto no penúltimo slide = âncora antes do fechamento.
- Capa com foto (cover-c/d/e) é a **preferência** (ver `SKILL_ComponentIndex.md`), separada dessa contagem; fechamento com foto é válido.

## Lógica de Seleção de Componentes (4 passos)

> A seleção combina **4 chaves, nesta ordem** — arco no topo, pilar logo abaixo. Foi assim que paramos de cair sempre nos mesmos statements.

```
1. MOMENTO DO ARCO   (posição na semana + posição no slide)  → famílias candidatas
2. PILAR             (1 dos 5)                                → estreita o conjunto
3. LEDGER DE VARIEDADE (o que a semana já usou)              → descarta repetições
4. PROFUNDIDADE      ("escreva até a capacidade")            → preenche o componente escolhido
```

### Passo 1 — Momento do arco → famílias
O arco da semana (**Hook → Profundidade → Resolução**, ver `STRATEGY_Padrinho.md §4`) vale em **dois níveis**: entre os 4 posts da semana **e** dentro de cada carrossel (capa → desenvolvimento → fecho).

| Momento do arco | Função | Famílias-líder |
|---|---|---|
| **Hook** (Dom/Seg · capa + 1ºs slides) | parar o scroll, emoção, gancho | `cover-c/d/e` · `block-k/l/m` (quote-full) · `block-r` (statement denso dark) |
| **Profundidade** (Qua/Qui · miolo) | entregar conhecimento, gerar **save** | `data-*` · `block-q/r` (conteúdo) · `block-g` (topic-list) · `block-b/f` (lista) |
| **Resolução** (Sex/Sáb · fecho) | acolher, comunidade, CTA suave | `block-j/o/n` (final-quote) · `block-a` (lista dark/Bill) · `block-h` (foto âncora) |

### Passo 2 — Pilar → conjunto
Estreita pelas tabelas "Pilar → conjunto" da seção **Variedade** abaixo (rotacionar, nunca o mesmo default).

### Passo 3 — Ledger de variedade
Aplica os caps por carrossel + a matriz de rotação semanal + o ledger (seção **Variedade** abaixo).

### Passo 4 — Profundidade
Escolhido o componente, **preencha-o até a capacidade** — ver `SKILL_CopyRules.md` § *Escreva até a capacidade do componente*. Statement não é rótulo de 4 palavras: é uma ideia completa.

---

## Variedade de Templates (anti-repetição) — REGRA CRÍTICA

> **Diagnóstico:** sem regra explícita, o agente cai sempre em `block-c`/`block-d` (statement) como fallback — e os 4 posts da semana ficam quase idênticos (ex.: um carrossel educacional virar 6 statements seguidos). Estas regras forçam variação. Os arcos abaixo são **exemplos ilustrativos, não sequências fixas** — varie.

### Por carrossel
- Nenhuma **família** de template aparece mais de **2×** no mesmo carrossel.
- Mínimo de **4 famílias distintas** por carrossel (ex.: cover · statement · list · data · quote-foto · explainer).
- **Nunca dois slides com o mesmo template em sequência.**
- `statement-dark/light` (block-c/d) **deixa de ser fallback universal**: no máximo 2 por carrossel. Se faltar variedade, prefira `block-g`, `block-e/f`, `data-*`, `block-q/r (content — dizer mais)` ou um quote-foto.

### Por semana — matriz de rotação
Cada um dos 4 posts recebe uma **forma dominante diferente** (define o esqueleto, não engessa):

| Post | Forma dominante |
|---|---|
| 1 | **statement-led** (hooks/afirmações curtas) |
| 2 | **data+list-led** (números, listas, comparativos) |
| 3 | **quote+foto-led** (emocional, foto, reconhecimento) |
| 4 | **explainer-led** (educacional denso — block-g/block-q) |

Rotacione a atribuição a cada semana. Registre a forma dominante de cada post no `WEEK_Overview.md`.

### Pilar → conjunto (não um default único)
O agente **alterna dentro do conjunto** — nunca usa sempre o mesmo:

| Pilar | Conjunto a rotacionar |
|---|---|
| Desmascaramento | `cover-d` · `block-k` · `block-m` · `block-r / content-dark` · `block-d` |
| Reconhecimento | `cover-c` · `block-h` · `block-l` · `block-c` |
| Acolhimento | `cover-a` · `block-a` · `block-c` · `block-s / statement-blue` · `block-j` |
| Empoderamento | `data-*` · `block-g` · `block-q / content-light` · `block-b` |
| Prova Social / Reingresso | `data-d` · `block-n` · `cover-b` |

### Ledger de seleção (no WEEK_Overview)
- Manter a tabela `post → templates usados (em ordem)`.
- Antes de montar o próximo post, conferir o ledger: o novo post deve **evitar repetir a mesma "espinha"** (mesma sequência de famílias) do post anterior da semana.

---

### Exemplo de arco para 8 slides

```
S1  cover-a / minimal-light       → Hook tipográfico
S2  block-d / statement-light     → Conceito / contexto
S3  block-h / quote-content       → 🖼 Foto — impacto emocional
S4  block-f / list-light-b        → Lista / dados
S5  block-g / topic-list-light    → Aprofundamento
S6  block-e / list-dark-b         → Contraste dark
S7  block-j / final-quote-a       → 🖼 Foto — âncora antes do fim
S8  block-d / statement-light     → Fechamento + CTA
```

### Exemplo de arco para 10 slides

```
S1  cover-c / photo-fullbleed     → 🖼 Foto — Cover com impacto
S2  block-d / statement-light     → Contexto
S3  block-h / quote-content       → 🖼 Foto — Reconhecimento emocional
S4  block-a / list-dark           → Lista
S5  data-f / fill-percentage      → Dado
S6  block-f / list-light-b        → Lista light
S7  block-j / final-quote-a       → 🖼 Foto — Âncora antes do fim
S8  block-b / list-light          → Ação
S9  block-c / statement-dark      → Reframing
S10 block-d / statement-light     → Fechamento
```

## Modo 1 — Componente existente
Identifique o template pela *Lógica de Seleção (4 passos)* acima. O **fluxo de entrega** (copiar `_COMPONENTS`→`_QUEUE`, renomear, editar layers, ajustar `hl`, preencher `_annotation`, screenshot, reportar) é canônico em **`SKILL_FigmaDelivery.md` § Fluxo de Execução** — siga de lá.

## Modo 2 — Nenhum componente serve

1. Identificar o gap e descrever o template proposto
2. Justificar com referência visual (semanas 08–10 ou componentes similares)
3. **AGUARDAR APROVAÇÃO** antes de qualquer construção
4. Construir rascunho em `_QUEUE` com prefixo `RASCUNHO /`
5. Após aprovação visual: designer move para `_COMPONENTS`

---

## Checklist de Entrega
O checklist canônico de entrega (frame em `_QUEUE`, layers permitidos, `hl`, `counter`, `_annotation`, screenshot) vive em **`SKILL_FigmaDelivery.md` § Checklist de Entrega**. Regras de foto (≥1 foto, não-consecutivas, capa-foto preferida) estão na seção *Estrutura Obrigatória* acima + `SKILL_PhotoGuidelines.md`.

---

**Last Updated:** 2026-05-07  
**Maintained by:** Design System  
**References:**  
- [SKILL/SKILL_ComponentIndex.md](SKILL/SKILL_ComponentIndex.md)
- [SKILL/SKILL_FigmaDelivery.md](SKILL/SKILL_FigmaDelivery.md)
- [AGENT/AGENT_Operational.md](AGENT/AGENT_Operational.md)
