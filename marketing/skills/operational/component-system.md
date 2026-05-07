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

Página dos componentes: `_COMPONENTS` (id `3345:20`)

---

## Catálogo de Componentes

### COVERS

| Nome | Frame ID | Fundo | Melhor para |
|---|---|---|---|
| `cover-a / minimal-light` | `3356:6120` | Cream | Acolhimento, Prova Social |
| `cover-b / dark-bold-left` | `3356:6288` | Navy | Desmascaramento, Reconhecimento |
| `cover-c / photo-fullbleed` | `3356:6334` | Foto | Reconhecimento emocional forte |
| `cover-d / photo-fullbleed` | `3356:6076` | Foto real | Desmascaramento, hooks virais |

### BLOCKS — Tipográficos

| Nome | Frame ID | Fundo | Melhor para |
|---|---|---|---|
| `block-a / list-dark` | `3356:6346` | Navy | Listas com produto/Bill |
| `block-b / list-light` | `3356:6373` | Cream | Listas educacionais |
| `block-c / statement-dark` | `3356:6399` | Navy | Statement de produto |
| `block-d / statement-light` | `3356:6411` | Cream | Statement editorial |
| `block-e / list-dark-b` | `3356:6466` | Navy | Listas menores dark |
| `block-f / list-light-b` | `3356:6444` | Cream | Listas menores light |
| `block-g / topic-list-light` | `3356:6491` | Cream | Dados com explicação |

### BLOCKS — Com foto

| Nome | Frame ID | Melhor para |
|---|---|---|
| `block-h / quote-content` | `3356:6555` | Reconhecimento emocional |
| `block-i / quote-list` | `3356:6530` | Listas sobre imagem |
| `block-j / final-quote-a` | `3356:6518` | Fechamento de carrossel |
| `block-k / quote-full-a` | `3356:6570` | Desmascaramento |
| `block-l / quote-full-b` | `3356:6588` | Reconhecimento |
| `block-n / final-quote-b` | `3356:8512` | Fechamento alternativo |

### DATA

| Nome | Frame ID | Melhor para |
|---|---|---|
| `data-a / wave-number` | `3356:8220` | Comparativos de consumo |
| `data-b / circle-grid-a` | `3356:8231` | Percentuais visuais |
| `data-c / huge-numbers` | `3356:6653` | Números de impacto |
| `data-f / fill-percentage` | `3356:8265` | Percentuais tipo "55% já..." |

---

## Estrutura Obrigatória de Carrossel

```
Slide 1 → COVER          — sempre tipográfico
Slide 2 → CONTENT        — tipográfico
Slide 3 → IMAGE CONTENT  — obrigatório ≥ 1x
Slide 4 → CONTENT        — tipográfico ou data
Slide N → END            — fechamento com CTA
```

---

## Nomenclatura de Layers

```
frame (1080×1440, cornerRadius 44)
├── bg-color / bg-photo
├── gradient-overlay   ← nunca editar
├── logo-mark          ← nunca editar
├── counter            ← editar: "N  /  N"
├── headline           ← editar
├── headline-italic    ← editar
├── hl                 ← ajustar largura
├── subhead            ← editar quando presente
├── body               ← editar quando presente
├── bullet-1/bold ... bullet-4/regular
├── cta-box / cta-text ← editar texto
├── wave               ← ajustar posição
├── _annotation        ← preencher com caption + hashtags
└── handle             ← nunca editar
```

---

## O que o Agente PODE editar
`headline` `headline-italic` `hl` `counter` `subhead` `body` `bullet-N` `cta-text` `wave` `bg-photo` `_annotation`

## O que o Agente NUNCA altera
Fontes · Tamanhos · Cores · Frame dimensions · `handle` · `logo-mark` · `gradient-overlay`
