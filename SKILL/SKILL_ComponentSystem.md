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

> **Nova taxonomia (2026 H2):** nomes no formato `categoria / variante-descritiva` — **sem prefixo de letra**. 5 categorias: **cover · list · quote · content · data** (31 componentes). O crosswalk nomes antigos → novos vive em `SKILL_ComponentIndex.md` § Crosswalk de nomes.
>
> Fontes: **Moma · Instrument Serif · Instrument Sans** (`SKILL_CopyRules.md` § Tipografia). 🖼 = componente com foto/imagem.

### COVER — Abertura / Capa de carrossel (5)

| Nome | Frame ID | Fundo | Estrutura | Melhor para |
|---|---|---|---|---|
| `cover / minimal-light` | `3356:6120` | Cream `#F9F8F3` | Logo mark radial + serif headline esquerda (regular + *italic*) + body + handle | Acolhimento, prova social, editorial |
| `cover / minimal-dark` | `3356:6288` | Navy `#002E49` | Logo mark radial + serif headline esquerda + body + handle | Desmascaramento, reconhecimento |
| `cover / photo-fullbleed-a` | `3356:6076` | 🖼 Foto real | Foto full bleed + mix handwriting/serif (Moma) + seta curva + wave + CTA box | Desmascaramento, hooks virais |
| `cover / photo-fullbleed-b` | `3737:323` | 🖼 Foto + overlay navy/blur | Foto full bleed + serif headline bold + body | Hook editorial/awareness sobre foto |
| `cover / photo-fullbleed-c` | `3532:2411` | 🖼 Foto full-bleed | Foto + subhead + headline + CTA na capa | Hook emocional com CTA na capa |

### LIST — Listas e tópicos (5) · com e sem imagem

| Nome | Frame ID | Fundo | Estrutura | Melhor para |
|---|---|---|---|---|
| `list / list-dark-a` | `3356:6346` | Navy `#002E49` | Serif headline + *italic* + highlight + 4 bullets (bold + regular) + CTA box dupla | Listas com produto/Bill, benefícios |
| `list / list-light-a` | `3356:6373` | Cream `#F9F8F3` | Serif headline + *italic* + highlight + 4 bullets + CTA box dupla | Listas educacionais, cotidiano |
| `list / list-dark-b` | `3737:290` | Navy `#002E49` | Subhead + serif headline + caixa "isso acontece porque" (bullets dentro) | Lista com explicação/mecanismo (dark) |
| `list / list-light-b` | `3356:6491` | Cream `#F9F8F3` | Subhead wave + serif headline grande + highlight + caixa topic-list (bullets dentro) | Dados com explicação + lista interna (light) |
| `list / list-fullbleed` | `3356:6530` | 🖼 Foto warm | Foto + serif headline + *italic* + 4 bullets sobre foto | Listas sobre imagem, gatilhos |

### QUOTE — Frases de impacto / meio e fecho (8) · com e sem imagem

| Nome | Frame ID | Fundo | Estrutura | Melhor para |
|---|---|---|---|---|
| `quote / phrase` | `3356:6588` | 🖼 Foto escura | Foto + serif headline centrado + *italic* + highlight + logo mark | Reconhecimento ("Na vida de quem...") |
| `quote / phrase-topic-a` | `3356:8512` | 🖼 Foto + raios | Foto + serif headline + *italic* + highlight + CTA box + decorativos | Tópico/fechamento com foto |
| `quote / phrase-topic-b` | `3356:8530` | 🖼 Foto | Foto + headline + CTA tag | Tópico/variante com tag |
| `quote / ending-a` | `3356:6518` | 🖼 Foto dark + raios | Foto + serif headline centrado + *italic* + highlight + subtext + CTA texto | Fechamento de carrossel, reframing |
| `quote / ending-b` | `3356:6570` | 🖼 Foto vivid | Foto + subhead + serif headline grande + *italic* + highlight + logo mark | Fechamento forte, desmascaramento |
| `quote / simple-a` | `3356:5272` | Cream (tipográfico) | Subhead + serif headline simples grande + highlight | Statement mínimo light |
| `quote / simple-b` | `3585:2002` | Azul (gradiente) | Subhead + serif headline (regular + *italic*) + highlight + **CTA box** + wave | Statement **com CTA** |
| `quote / fold-quote` | `3356:5189` | 🖼 Navy + stacked layers | Foto em camadas offset + serif headline + highlight | Desmascaramento artístico |

### CONTENT — Conteúdo profundo (5) · texto denso + imagem

> `deep-text-*` têm uma **imagem inline** (rounded-rect 800×400, ~2:1 landscape) entre headline e body — **não é foto full-bleed**. `deep-fullbleed` é foto full-bleed com texto sobre. Todos recebem `image-query` (EN). Critérios em `SKILL_PhotoGuidelines.md`.

| Nome | Frame ID | Fundo | Estrutura | Melhor para |
|---|---|---|---|---|
| `content / deep-text-dark-a` | `3575:2121` | 🖼 Navy `#002E49` | Serif headline + **imagem inline** + body denso | Conteúdo denso dark com apoio visual |
| `content / deep-text-light-a` | `3735:211` | 🖼 Cream `#F9F8F3` | **Subhead** + serif headline + **imagem inline** + body denso | Conteúdo denso light com subhead de contexto (pesquisa, dado) |
| `content / deep-text-dark-b` | `3575:2093` | 🖼 Navy `#002E49` | Serif headline + **imagem inline** + body denso | Conteúdo denso dark (variante) |
| `content / deep-text-light-b` | `3737:316` | 🖼 Cream `#F9F8F3` | Serif headline + **imagem inline** + body denso | Conteúdo denso light (variante) |
| `content / deep-fullbleed` | `3356:6555` | 🖼 Foto dark + raios | Foto full bleed + subhead + serif headline grande + highlight + CTA box | Conteúdo profundo sobre foto emocional (hangxiety) |

### DATA — Visualização de dados (8)

> Letras (`data-a…g`) removidas. A antiga colisão `data-c` (circle-grid-b vs huge-numbers) foi **resolvida** — agora nomes únicos.

| Nome | Frame ID | Fundo | Estrutura | Melhor para |
|---|---|---|---|---|
| `data / wave-number` | `3356:8220` | Cream → Horizon (ondas) | Subtext top + 4 camadas de onda SVG + serif headline grande + *italic* + highlight | Número-herói / comparativos de consumo |
| `data / circle-grid-a` | `3356:8231` | Cream `#F9F8F3` | Grid de logo marks preenchidos/vazios + serif headline + highlight | Percentuais visuais (ex: 60%) |
| `data / circle-grid-b` | `3356:8455` | Cream `#F9F8F3` | Variante do grid de círculos | Percentuais com mais itens |
| `data / huge-numbers` | `3356:6653` | Navy `#002E49` + dot grid | Grid de pontos + serif headline gigante + highlight + subtext | Números de impacto (número = vetor, **não editável**) |
| `data / quote-numbers` | `3356:6611` | Cream | Grid de logo marks + serif headline + *italic* + highlight + subtext | Milestones da comunidade |
| `data / quote-parts` | `3356:8429` | Navy com linhas horizontais | Escala visual numérica (0–4) + serif headline centrado + highlight duplo | Frações/proporções |
| `data / quote-fill-percentage` | `3356:8265` | Cream + preenchimento Horizon | Grid com linhas de percentual + número gigante + bold text | Percentuais tipo "55% já..." |
| `data / quote-100` | `3356:8313` | Navy com grid de rounded-rect | Grid de itens preenchidos/vazios + serif headline + highlight | "X em cada 100 pessoas" |

---

## Elementos Decorativos (presentes nos componentes)

Extraídos diretamente dos componentes reais. O agente não cria esses elementos —
copia do componente e adapta posição quando necessário.

| Elemento | Onde aparece | Descrição visual |
|---|---|---|
| **Logo Mark Radial** | cover/minimal-*, quote/phrase, quote/ending-b, data/quote-numbers | Ícone Padrinho em spokes radiais. Usado como âncora visual entre topo e headline |
| **Highlight Inline** | Todos | Retângulo `#669AB7` ~42% opacidade cobrindo linha do *italic* emocional |
| **CTA Box Dupla** | cover/minimal-*, list/list-*-a, quote/simple-b | Dois retângulos deslocados (+5,+5) criando sombra. Borda `#669AB7` |
| **Wave / Tilde** | cover/minimal-*, list/list-*-b, quote/simple-b, data/wave-number | Til estilizado (~) em `#669AB7` sob palavra-chave de CTA ou bold |
| **Raios Decorativos** | content/deep-fullbleed, quote/phrase-topic-a, quote/ending-a | Dois raios azuis `#669AB7` no canto superior esquerdo e direito |
| **Seta Curva** | cover/photo-fullbleed-a | Seta handwriting em branco apontando para CTA |
| **Stacked Layers** | quote/fold-quote | Camadas de retângulos offset em tons de azul escuro + foto |
| **Ondas SVG** | data/wave-number | 4 camadas de forma orgânica em tons horizon, empilhadas |
| **Dot Grid** | data/huge-numbers | Grid de pontos pequenos como textura de fundo |
| **Linhas Horizontais** | data/quote-parts, data/quote-fill-percentage | Linhas dashed horizontais como referência de escala |
| **Grid Rounded-Rect** | data/quote-100 | Grid de retângulos arredondados preenchidos/vazios para % |
| **Caixa Topic-List** | list/list-*-b | Caixa com borda + bullets dentro, separados do headline |

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
├── image              ← editar fill (imagem inline em content/deep-text-* — não é bg-photo)
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
| `cover / minimal-light`, `cover / minimal-dark` | `headline`, `body` | Headline: 2-3 linhas. Body: 2 linhas. (NOTA: não suporta `headline-italic`) |
| `cover / photo-fullbleed-a` | `headline`, `cta` | Headline: 2 linhas curtas (auto-width). CTA: 1 linha. |
| `cover / photo-fullbleed-b` | `headline`, `body` | Headline: 2 linhas. Body: 2 linhas. |
| `cover / photo-fullbleed-c` | `subhead`, `headline`, `cta` | Subhead: 1 linha. Headline: 2 linhas. CTA: 1 linha. |
| `list / list-dark-a`, `list / list-light-a` | `headline`, `subtext`, `bullet-1`, `bullet-2`, `bullet-3`, `bullet-4` | Headline: 2 linhas. Bullets: 4 itens curtos. Subtext: 1-2 linhas. |
| `list / list-dark-b`, `list / list-light-b` | `subhead`, `headline`, `body`, `bullet-1`, `bullet-2`, `bullet-3` | Subhead: 1 linha. Headline: 3 linhas. Body: 1 linha. Bullets: 3 itens curtos (dentro da caixa). |
| `list / list-fullbleed` | `headline`, `bullet-1`, `bullet-2`, `bullet-3`, `bullet-4` (+ `image-query`) | Headline: 2 linhas. Bullets: 4 itens. |
| `quote / phrase`, `quote / fold-quote` | `headline` (+ `image-query`) | Headline: 3-4 linhas. |
| `quote / phrase-topic-a`, `quote / ending-a` | `headline`, `subtext`, `cta` (+ `image-query`) | Headline: 3 linhas. Subtext: 2 linhas. CTA: 1-2 linhas. |
| `quote / phrase-topic-b` | `headline`, `cta` (+ `image-query`) | Headline: 3 linhas. CTA: 1 linha. |
| `quote / ending-b` | `subhead`, `headline` (+ `image-query`) | Subhead: 1 linha. Headline: 3 linhas. |
| `quote / simple-a` | `subhead`, `headline` | Subhead: 1 linha. Headline: 3 linhas. |
| `quote / simple-b` | `headline`, `subtext`, `cta` | Subtext: subhead curto (1 linha). Headline: 2–3 linhas (com *itálico*). CTA: 1–2 linhas (caixa bordada). |
| `content / deep-text-dark-a`, `content / deep-text-dark-b`, `content / deep-text-light-b` | `headline`, `body`, `image` (+ `image-query`) | Headline: 2 linhas. **Body: 4–6 linhas (parágrafo denso).** Imagem inline 2:1 entre headline e body. Use quando precisar DIZER MAIS num slide só, com apoio visual. |
| `content / deep-text-light-a` | `subhead`, `headline`, `body`, `image` (+ `image-query`) | Subhead: 1 linha de contexto. Headline: 2–3 linhas. Body: 3–4 linhas. Imagem inline 2:1 entre headline e body. |
| `content / deep-fullbleed` | `subhead`, `headline`, `body` (+ `image-query`) | Subhead: 1 linha curta. Headline: 3 linhas. Body: 2 linhas. |
| `data / wave-number` | `headline`, `subhead`, `subtext` | Headline: 2 linhas. Subhead: 1 linha. Subtext: 1 linha. |
| `data / circle-grid-a`, `data / circle-grid-b`, `data / quote-100` | `headline` | Headline: 2-3 linhas. |
| `data / quote-parts` | `headline` | Headline: 2-3 linhas. (Os números fixos agora se chamam `number` e não devem ser gerados) |
| `data / quote-fill-percentage` | `headline`, `body` | Headline: 1-2 palavras (usado para o número gigante em destaque). Body: 2 linhas. (As porcentagens fixas agora se chamam `percentage` e não devem ser geradas) |
| `data / quote-numbers` | `headline`, `body` | Headline: 2 linhas. Body: 2 linhas. |
| `data / huge-numbers` | `headline`, `subtext` | Headline: número (⚠️ **vetor, não editável** via texto). Subtext: 2 linhas. |

> **CRÍTICO PARA O COPYWRITER:** Se você precisa de um parágrafo longo (`body`), **NÃO ESCOLHA** templates de lista/statement como `list / list-*-a` ou `quote / simple-*`, pois eles não têm onde receber o texto. Escolha `content / deep-text-*` (conteúdo com imagem), `content / deep-fullbleed` ou `cover / minimal-*`. 

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
Slide 1   → COVER          (cover/*)              — preferência FOTO (photo-fullbleed-a/b/c); minimal-light/dark só exceção
Slide 2   → CONTENT        (list/quote/content)   — tipográfico
Slide 3   → IMAGE CONTENT  (com foto/imagem)      — obrigatório ≥ 1x
Slide 4   → CONTENT        (list/content ou data) — tipográfico ou data
Slide 5   → CONTENT        (list/content ou data) — tipográfico ou data
Slide 6   → IMAGE CONTENT  (com foto/imagem)      — recomendado
Slide N   → END            (quote/ending-* ou simple-b) — fechamento com CTA
```

### Regras

**Imagem é prioridade.** Todo carrossel tem **≥1 foto**, mas a meta é **post rico em imagem** — a foto cria o contexto emocional e o ritmo humano (texto puro cansa). Referências de uso forte de imagem: `🌀 Semana 08` (carrossel "funcional", ~6 fotos), `🌀 Semana 09` (hangxiety / milestones). Lista canônica de templates com foto + critérios em `SKILL_PhotoGuidelines.md`.

**Distribuição (fotos INTERIORES — a capa-foto NÃO conta):**
- 6–8 slides → **3–4** fotos interiores · 9–12 slides → **4–5** fotos interiores
- Intercalar foto/texto para criar ritmo; evitar 2 fotos seguidas.
- **Evitar duas fotos consecutivas**; foto no penúltimo slide = âncora antes do fechamento.
- Capa com foto (`cover / photo-fullbleed-a/b/c`) é a **preferência** (ver `SKILL_ComponentIndex.md`), separada dessa contagem; fechamento com foto é válido.

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
| **Hook** (Dom/Seg · capa + 1ºs slides) | parar o scroll, emoção, gancho | `cover / photo-fullbleed-*` · `quote / phrase`, `ending-b`, `fold-quote` · `content / deep-text-dark-*` |
| **Profundidade** (Qua/Qui · miolo) | entregar conhecimento, gerar **save** | `data / *` · `content / deep-text-*` (conteúdo c/ imagem) · `list / list-*-b` (topic-list) · `list / list-*-a` |
| **Resolução** (Sex/Sáb · fecho) | acolher, comunidade, CTA suave | `quote / ending-a`, `ending-b`, `simple-b` · `list / list-dark-a` (Bill) · `content / deep-fullbleed` (foto âncora) |

### Passo 2 — Pilar → conjunto
Estreita pelas tabelas "Pilar → conjunto" da seção **Variedade** abaixo (rotacionar, nunca o mesmo default).

### Passo 3 — Ledger de variedade
Aplica os caps por carrossel + a matriz de rotação semanal + o ledger (seção **Variedade** abaixo).

### Passo 4 — Profundidade
Escolhido o componente, **preencha-o até a capacidade** — ver `SKILL_CopyRules.md` § *Escreva até a capacidade do componente*. Statement não é rótulo de 4 palavras: é uma ideia completa.

---

## Variedade de Templates (anti-repetição) — REGRA CRÍTICA

> **Diagnóstico:** sem regra explícita, o agente cai sempre no mesmo statement (`quote / simple-*`) como fallback — e os 4 posts da semana ficam quase idênticos (ex.: um carrossel educacional virar 6 statements seguidos). Estas regras forçam variação. Os arcos abaixo são **exemplos ilustrativos, não sequências fixas** — varie.

### Por carrossel
- Nenhuma **categoria** de template (`cover · list · quote · content · data`) aparece mais de **2×** no mesmo carrossel — **exceto** onde a variante muda claramente a forma (ex.: `list / list-fullbleed` vs `list / list-dark-a`).
- Mínimo de **4 categorias/variantes distintas** por carrossel.
- **Nunca dois slides com o mesmo template em sequência.**
- `quote / simple-*` (statement) **não é fallback universal**: no máximo 2 por carrossel. Se faltar variedade, prefira `list / list-*-b`, `list / list-*-a`, `data / *`, `content / deep-text-*` ou um `quote` com foto.

### Por semana — matriz de rotação
Cada um dos 4 posts recebe uma **forma dominante diferente** (define o esqueleto, não engessa):

| Post | Forma dominante |
|---|---|
| 1 | **statement-led** (hooks/afirmações curtas) |
| 2 | **data+list-led** (números, listas, comparativos) |
| 3 | **quote+foto-led** (emocional, foto, reconhecimento) |
| 4 | **explainer-led** (educacional denso — `list / list-*-b` / `content / deep-text-*`) |

Rotacione a atribuição a cada semana. Registre a forma dominante de cada post no `WEEK_Overview.md`.

### Pilar → conjunto (não um default único)
O agente **alterna dentro do conjunto** — nunca usa sempre o mesmo:

| Pilar | Conjunto a rotacionar |
|---|---|
| Desmascaramento | `cover / photo-fullbleed-a` · `quote / ending-b` · `quote / fold-quote` · `content / deep-text-dark-a` · `quote / simple-b` |
| Reconhecimento | `cover / photo-fullbleed-c` · `content / deep-fullbleed` · `quote / phrase` · `content / deep-text-light-a` |
| Acolhimento | `cover / minimal-light` · `list / list-dark-a` · `content / deep-text-light-b` · `quote / simple-b` · `quote / ending-a` |
| Empoderamento | `data / *` · `list / list-light-b` · `content / deep-text-light-a` · `content / deep-text-light-b` · `list / list-light-a` |
| Prova Social / Reingresso | `data / quote-numbers` · `quote / simple-a` · `cover / minimal-dark` |

### Ledger de seleção (no WEEK_Overview)
- Manter a tabela `post → templates usados (em ordem)`.
- Antes de montar o próximo post, conferir o ledger: o novo post deve **evitar repetir a mesma "espinha"** (mesma sequência de famílias) do post anterior da semana.

---

### Exemplo de arco para 8 slides

```
S1  cover / minimal-light         → Hook tipográfico
S2  quote / simple-b              → Conceito / contexto (com CTA suave)
S3  content / deep-fullbleed      → 🖼 Foto — impacto emocional
S4  list / list-light-a           → Lista / dados
S5  content / deep-text-light-b   → 🖼 Conteúdo denso com imagem inline
S6  list / list-dark-a            → Contraste dark
S7  quote / ending-a              → 🖼 Foto — âncora antes do fim
S8  quote / simple-b              → Fechamento + CTA
```

### Exemplo de arco para 10 slides

```
S1  cover / photo-fullbleed-c     → 🖼 Foto — Cover com impacto
S2  quote / simple-b              → Contexto + CTA suave
S3  content / deep-fullbleed      → 🖼 Foto — Reconhecimento emocional
S4  list / list-dark-a            → Lista
S5  content / deep-text-light-a   → 🖼 Explicação com imagem inline
S6  data / quote-fill-percentage  → Dado
S7  quote / ending-a              → 🖼 Foto — Âncora antes do fim
S8  list / list-light-a           → Ação
S9  content / deep-text-dark-a    → 🖼 Reframing dark com imagem
S10 quote / simple-b              → Fechamento
```

## Modo 1 — Componente existente
Identifique o template pela *Lógica de Seleção (4 passos)* acima. O **fluxo de entrega** (copiar `_COMPONENTS`→`🌀 Semana NN`, posicionar com 0px entre slides / 400px entre carrosséis, renomear, editar layers, ajustar `hl`, preencher `_annotation`, screenshot, reportar) é canônico em **`SKILL_FigmaDelivery.md` § Fluxo de Execução** + § Layout na página da semana — siga de lá.

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

**Last Updated:** 2026-07-01  
**Maintained by:** Design System  
**References:**  
- [SKILL/SKILL_ComponentIndex.md](SKILL/SKILL_ComponentIndex.md)
- [SKILL/SKILL_FigmaDelivery.md](SKILL/SKILL_FigmaDelivery.md)
- [AGENT/AGENT_Operational.md](AGENT/AGENT_Operational.md)
