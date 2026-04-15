# Component System — Padrinho Social Posts

## Conceito
Este sistema funciona como um design system para posts de Instagram.
Em vez de construir cada post do zero com tokens, o agente usa **componentes
pré-aprovados** criados pelo designer, adaptando apenas o conteúdo.

A separação de responsabilidades é clara:
- **Designer** → define e mantém os componentes no Figma (`_COMPONENTS`)
- **Agente** → escolhe, copia e adapta. Nunca altera estrutura visual sem aprovação.

---

## Localização dos Componentes

Arquivo Figma: `sBItPeNLyvT5EMyKLqQbRv`
Página: `_COMPONENTS`

Cada componente é um frame 1080×1440px nomeado com a convenção:
```
{categoria}/{nome-do-template}
```

Exemplos:
```
cover/minimal-light
cover/dark-bold-left
cover/blumine-circle
cover/photo-fullbleed
block/list-dark
block/list-light
block/statement-dark
block/minimal-statement-light
data/wave-number
data/circle-grid
data/progress-bar
data/before-after
```

---

## Catálogo de Componentes

### COVERS — Página inicial / Capa de carrossel

| ID | Nome | Fundo | Estrutura | Melhor para |
|---|---|---|---|---|
| `cover/minimal-light` | Minimal Light | Spring Wood `#F9F8F3` | Logo mark radial → headline centrado (Regular + *Italic*) → CTA dupla | Pilares: Acolhimento, Prova Social |
| `cover/dark-bold-left` | Dark Bold Left | Blue Whale `#002E49` | Logo mark → headline grande esquerda (*Italic* predominante) → highlight full-line → seta decorativa → CTA dupla | Pilares: Desmascaramento, Reconhecimento |
| `cover/blumine-circle` | Blumine Circle | Horizon `#669AB7` | Grande círculo stroke no topo → subhead centrado bold → headline gigante quote → highlight → CTA dupla | Pilares: Reconhecimento (pergunta espelho) |
| `cover/photo-fullbleed` | Photo Full Bleed | Foto real (substituir) | bg-photo + gradient overlay → subhead + wave → headline handwriting-style → highlight duplo | Pilares: Desmascaramento, Reconhecimento |

### BLOCKS — Slides de conteúdo / corpo do carrossel

| ID | Nome | Fundo | Estrutura | Melhor para |
|---|---|---|---|---|
| `block/list-dark` | List Dark | Blue Whale `#002E49` | Logo mark → headline serif → highlight → 4 bullets (bold keyword + regular detail) | Listas com produto/Bill, ações, benefícios |
| `block/list-light` | List Light | Spring Wood `#F9F8F3` | Headline misto (Regular + *Italic* inline) → 4 bullets → CTA dupla | Listas educacionais, cotidiano, dados qualitativos |
| `block/statement-dark` | Statement Dark | Blue Whale `#002E49` | Logo mark → número/stat grande → divider → highlight + *Italic* → wave | Um dado forte + contraste Regular/Italic |
| `block/minimal-statement-light` | Minimal Statement Light | Spring Wood `#F9F8F3` | Logo mark → headline (Regular + *Italic* com highlight) → body 3 linhas → CTA dupla | Explicações, reframing, analogias |

### DATA — Visualização de dados

| ID | Nome | Fundo | Estrutura | Melhor para |
|---|---|---|---|---|
| `data/wave-number` | Wave + Number | Spring Wood → Horizon (camadas) | Texto contexto top → 4 camadas wave em gradiente azul → dado grande + highlight + subtext | Comparativos de consumo, antes/depois |
| `data/circle-grid` | Circle Grid | Spring Wood `#F9F8F3` | Grid N×3 de círculos preenchidos/vazios → caption lateral | Percentuais visuais (ex: 60% de algo) |
| `data/progress-bar` | Progress Bar | Blue Whale `#002E49` | Headline + stat grande → 1-2 barras horizontais preenchidas → fonte | Múltiplos percentuais comparativos |
| `data/before-after` | Before/After | Spring Wood `#F9F8F3` | Título → 2 blocos lado a lado (valor antigo → seta → valor novo) por grupo | Evolução temporal de dados |

---

## Convenção de Nomenclatura de Layers

Todo componente deve ter layers com esses nomes exatos para o agente localizar:

```
frame (1080×1440)
│
├── bg-color              ← cor de fundo base (nunca editar)
├── bg-photo              ← (apenas cover/photo) — SUBSTITUIR pela foto real
├── gradient-overlay      ← (apenas photo/dark com imagem) — nunca editar
│
├── logo-mark             ← símbolo radial Padrinho (nunca editar)
├── bg-circle             ← (apenas cover/blumine) — nunca editar
│
├── counter               ← "N  /  N" — EDITAR número do slide
│
├── headline              ← Instrument Serif, linha principal
├── headline-italic       ← Instrument Serif Italic, linha de ênfase
├── hl                    ← highlight-inline rect — AJUSTAR largura ao texto
│
├── subhead               ← (quando existe) texto menor acima do headline
│
├── body                  ← (quando existe) parágrafo de corpo
│
├── bullet-1/diamond      ← ◆ símbolo (não editar)
├── bullet-1/bold         ← keyword em bold — EDITAR texto
├── bullet-1/regular      ← detalhe em regular — EDITAR texto
├── bullet-2/...          ← idem
├── bullet-3/...          ← idem
├── bullet-4/...          ← idem
│
├── cta-shadow            ← retângulo sombra da CTA (deslocar junto com cta-box)
├── cta-box               ← retângulo principal da CTA
├── cta-text              ← texto dentro da CTA — EDITAR
│
├── wave                  ← underline decorativo (ajustar posição sob palavra-chave)
│
├── divider               ← linha horizontal (não editar)
│
├── _annotation           ← HIDDEN — caption, hashtags, meta (nunca exporta)
│   ├── caption
│   ├── hashtags
│   └── brief-meta
│
└── handle                ← "@padrinho.app" (nunca editar)
```

---

## Regras de Adaptação de Conteúdo

### O que o agente PODE editar
- `headline` — texto, mas nunca o tamanho de fonte (ajustar número de linhas se necessário)
- `headline-italic` — texto (a palavra ou frase de ênfase emocional)
- `hl` — largura do retângulo (para cobrir o texto do headline-italic)
- `counter` — número do slide atual
- `subhead` — texto
- `body` — texto (máximo 3 linhas no template; se precisar de mais, considerar outro template)
- `bullet-N/bold` e `bullet-N/regular` — texto dos bullets
- `cta-text` — texto da CTA
- `wave` — posição horizontal (para ficar sob a palavra certa)
- `bg-photo` — substituir pelo fill da foto real
- `_annotation` — preencher com caption, hashtags e meta completos

### O que o agente NUNCA deve alterar
- Tamanhos de fonte
- Cores (usar apenas os hex dos tokens)
- Posição Y de qualquer elemento (exceto ajustes mínimos de 1-2px por quebra de linha)
- O frame inteiro (dimensões, cornerRadius, clipsContent)
- `handle` — sempre `@padrinho.app`, sempre igual
- `logo-mark` — posição, tamanho, opacidade
- `gradient-overlay` — qualquer propriedade
- `bg-color` — cor de fundo do frame

### Regra para `hl` (highlight inline)
O highlight deve cobrir a linha de texto com:
- `x`: 8px antes do início do texto
- `y`: 4px acima do texto
- `width`: largura do texto + 16px
- `height`: sempre 76px (ou o definido no componente)
- Nunca cobrir mais de uma linha

### Limite de conteúdo por template

| Template | Headline máx. | Body máx. | Bullets |
|---|---|---|---|
| `cover/minimal-light` | 2 linhas curtas | — | — |
| `cover/dark-bold-left` | 3 linhas | — | — |
| `cover/blumine-circle` | 2 linhas | — | — |
| `cover/photo-fullbleed` | 3 linhas | — | — |
| `block/list-dark` | 1 linha + italic | — | 4 items |
| `block/list-light` | 3 linhas misto | — | 4 items |
| `block/statement-dark` | stat + 2 linhas | — | — |
| `block/minimal-statement-light` | 2 linhas | 3 linhas | — |
| `data/wave-number` | 2 linhas contexto | 2 linhas dado | — |
| `data/circle-grid` | — | 3 linhas caption | — |
| `data/progress-bar` | 2 linhas | 2 linhas por barra | 2 barras |
| `data/before-after` | 1 linha título | — | 2 grupos |

---

## Modo 1 — Componente existente

```
1. Identificar qual componente melhor serve a narrativa do slide
2. Copiar o frame do componente para _QUEUE (via Figma MCP)
3. Renomear: "Post / YYYY-MM-DD / vN — {nome-componente}"
4. Editar apenas os layers permitidos acima
5. Preencher _annotation com caption + hashtags + brief
6. Screenshot para validação antes de entregar ao humano
```

---

## Modo 2 — Nenhum componente existente serve

Quando o conteúdo exige uma estrutura visual que não existe no catálogo,
o agente **não constrói silenciosamente**. Em vez disso:

### Processo de proposta de novo template

```
1. Identificar por que nenhum template existente serve
   (ex: "preciso de um template com citação grande centralizada e
   imagem de fundo parcial — não existe no catálogo")

2. Descrever o template proposto:
   - Nome sugerido: {categoria}/{nome}
   - Fundo: cor ou foto
   - Estrutura de layers e hierarquia
   - Referência visual mais próxima (post das semanas 08-10)
   - Por que é necessário para esta narrativa

3. Apresentar a proposta ao designer com:
   "Nenhum template atual cobre este slide. Proponho um novo:
    [descrição]. Posso construir um rascunho para você validar?"

4. AGUARDAR APROVAÇÃO antes de construir qualquer coisa

5. Se aprovado: construir o rascunho em _QUEUE com nome
   "RASCUNHO / {nome-template} / vN"

6. Após aprovação visual do designer:
   a. Mover versão final para _COMPONENTS
   b. Documentar no component-system.md (atualizar o GitHub)
```

### Critérios para propor um novo template
Um novo template só é necessário quando:
- O conteúdo é estruturalmente diferente (não apenas "mais texto" ou "menos itens")
- Pelo menos 3 posts futuros poderiam usar o mesmo template
- Existe uma referência visual nos posts das Semanas 08-10 que justifica

Não é necessário novo template quando:
- O template existente serve mas tem "texto a mais" → condensar o copy
- Quer uma variação de cor → usar o template com cores alternadas (dark/light)
- Quer trocar a posição de um elemento → não é permitido sem aprovação do designer

---

## Checklist de Entrega (toda vez)

- [ ] Componente escolhido é o mais adequado para o conteúdo?
- [ ] Se novo template: proposta aprovada pelo designer?
- [ ] Frame copiado do componente (não criado do zero)?
- [ ] Apenas layers permitidos foram editados?
- [ ] `hl` está cobrindo a linha correta com largura ajustada?
- [ ] `counter` atualizado com número correto do slide?
- [ ] `_annotation` preenchida com caption + hashtags + meta?
- [ ] Screenshot tirado e validado visualmente?
- [ ] Frame está na página `_QUEUE`?
- [ ] Nome do frame: `Post / YYYY-MM-DD / vN — {componente}`?
