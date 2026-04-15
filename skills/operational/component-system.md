# Component System — Padrinho Social Posts

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

| Nome | Frame ID | Fundo | Estrutura | Melhor para |
|---|---|---|---|---|
| `cover-a / minimal-light` | `3356:6120` | Cream `#F9F8F3` | Logo mark radial + serif headline esquerda (regular + *italic*) + body + handle | Acolhimento, Prova Social, posts editoriais |
| `cover-b / dark-bold-left` | `3356:6288` | Navy `#002E49` | Logo mark radial + serif headline esquerda + body + handle | Desmascaramento, Reconhecimento |
| `cover-c / photo-fullbleed` | `3356:6334` | Foto (blumine overlay) | Foto full bleed + headline centrado + highlight + CTA box dupla + raios decorativos | Reconhecimento emocional forte |
| `cover-d / photo-fullbleed` | `3356:6076` | Foto real | Foto full bleed + mix handwriting/serif + seta curva + wave + CTA box | Desmascaramento, hooks virais |

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

#### Com foto

| Nome | Frame ID | Fundo | Estrutura | Melhor para |
|---|---|---|---|---|
| `block-h / quote-content` | `3356:6555` | Foto dark + raios | Foto + subhead pequeno + serif headline grande + highlight + CTA box | Reconhecimento emocional, hangxiety |
| `block-i / quote-list` | `3356:6530` | Foto warm | Foto + serif headline + *italic* + 4 bullets sobre foto | Listas sobre imagem, gatilhos |
| `block-j / final-quote-a` | `3356:6518` | Foto dark + raios | Foto + serif headline centrado + *italic* + highlight + subtext + CTA texto | Fechamento de carrossel, reframing |
| `block-k / quote-full-a` | `3356:6570` | Foto vivid | Foto + subhead + serif headline grande + *italic* + highlight + logo mark | Desmascaramento, narrativa forte |
| `block-l / quote-full-b` | `3356:6588` | Foto escura | Foto + serif headline centrado + *italic* + highlight + logo mark | Reconhecimento ("Na vida de quem...") |
| `block-m / quote-stacked` | `3356:5189` | Navy + stacked layers | Foto em camadas offset + serif headline + highlight | Desmascaramento artístico |
| `block-m / quote-simple` | `3356:5272` | Navy | Serif headline simples grande + highlight | Statement mínimo dark |
| `block-n / final-quote-b` | `3356:8512` | Foto + raios | Foto + serif headline + *italic* + highlight + CTA box + decorativos | Fechamento de carrossel |
| `block-k / quote-full-c` | `3356:8530` | Foto | Foto + headline + CTA tag | Variante de fechamento |

---

### DATA — Visualização de dados

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
| **Raios Decorativos** | cover-c, block-h, block-j, block-n | Dois raios azuis `#669AB7` no canto superior esquerdo e direito |
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

## Limites de Conteúdo por Template

| Categoria | Headline | Body/Subhead | Bullets | CTA |
|---|---|---|---|---|
| Covers (a/b) | 3 linhas | 2 linhas | — | 1 linha |
| Covers (c/d) | 2 linhas | 1 linha | — | 1 linha |
| Blocks list | 2 linhas | — | 3–4 items | 1–2 linhas |
| Blocks statement | 2–3 linhas | 2 linhas | — | 1 linha |
| Blocks quote (foto) | 2–3 linhas | 1 linha | 0–4 items | 1 linha |
| Data | 1–2 linhas | 1–2 linhas | — | — |

Se o conteúdo não couber: condensar o copy, não forçar no template.

---

## O que o Agente PODE editar
`headline` `headline-italic` `hl` (largura) `counter` `subhead` `body`
`bullet-N/bold` `bullet-N/regular` `cta-text` `wave` (posição) `bg-photo` (fill) `_annotation`

## O que o Agente NUNCA altera
Fontes · Tamanhos · Cores · Posições Y · Frame dimensions · `handle` · `logo-mark` · `gradient-overlay` · `bg-color`

---

## Modo 1 — Componente existente

1. Identificar o template mais adequado ao conteúdo
2. Copiar o frame de `_COMPONENTS` para `_QUEUE`
3. Renomear: `Post / YYYY-MM-DD / vN — {nome-componente}`
4. Editar apenas layers permitidos
5. Ajustar `hl` para cobrir o texto italic correto
6. Preencher `_annotation` com caption + hashtags + meta
7. Screenshot + validação visual
8. Reportar ao humano

## Modo 2 — Nenhum componente serve

1. Identificar o gap e descrever o template proposto
2. Justificar com referência visual (semanas 08–10 ou componentes similares)
3. **AGUARDAR APROVAÇÃO** antes de qualquer construção
4. Construir rascunho em `_QUEUE` com prefixo `RASCUNHO /`
5. Após aprovação visual: designer move para `_COMPONENTS`

---

## Checklist de Entrega

- [ ] Frame copiado de `_COMPONENTS` (nunca construído do zero)?
- [ ] Apenas layers permitidos foram editados?
- [ ] `hl` cobre o texto italic correto com largura ajustada?
- [ ] `counter` atualizado?
- [ ] `_annotation` preenchida (caption + hashtags + meta)?
- [ ] Screenshot tirado e validado?
- [ ] Frame em `_QUEUE` com nomenclatura correta?
