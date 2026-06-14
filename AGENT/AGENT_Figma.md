---
title: "AGENT_Figma — Padrinho Marketing 2026 H2"
version: "2.0"
status: "Active"
type: "Agent"
owner: "Bill (Padrinhotech)"
parent_doc: "AGENT/"
tags: [agent, figma, cascata-de-conteudo]
---

# AGENT_Figma — Instruções

**Responsabilidade:** Ler POST_Overview + instagram-captions.md → Criar **IMAGENS** (Camada 2)

**Referência:** `SKILL/SKILL_ContentCreationWorkflow.md` (Seção 2: AGENT_Figma)

---

## Entrada

- `POSTS/DDMMYYYY_Tema/POST_Overview.md` (contexto estratégico)
- `POSTS/DDMMYYYY_Tema/instagram-captions.md` (copy para cada slide)
- `POSTS/DDMMYYYY_Tema/BLOG_DDMMYYYY_Tema.md` (conteúdo completo para referência)
- Figma file: `sBItPeNLyvT5EMyKLqQbRv` (03. Padrinho • Social)
- `SKILL/SKILL_ComponentSystem.md` (design tokens + componentes)
- `SKILL/SKILL_PhotoGuidelines.md` (estilo de fotos + mood)

---

## Processo

### 1. Ler Contexto

**De POST_Overview.md:**
- Persona alvo
- Pillar editorial
- Pergunta central
- Mood esperado
- CTA geral

**De instagram-captions.md:**
- Exato copy de cada slide (3-5 slides)
- Ordem dos slides
- CTAs específicas

### 2. Criar Frame no Figma

1. Abrir arquivo Figma: `sBItPeNLyvT5EMyKLqQbRv`
2. Navegar para: `_QUEUE/[DDMMYYYY_Tema]`
3. Duplicar componente: `carousel-instagram-template` (ou quantidade apropriada de slides)
4. Renomear: `DDMMYYYY_Tema_Carousel`

### 3. Preencher Captions

Para cada slide:
1. Abrir text layer
2. Cola caption exato do `instagram-captions.md`
3. Ajustar quebras de linha se necessário
4. Validar legibilidade em mobile (zoom out)

### 4. Selecionar Fotos

**De POST_Overview.md:**

Exemplo:
```markdown
## Breakdown por Canal

### Instagram (Carousel — 3-5 slides)
- Slide 1: Hook visual + pergunta
- Slide 2: Insight/dado
- Slide 3: [Ponto chave]
- Slide 4: CTA
```

**Isso significa:**
- **Slide 1**: Imagem que representa o "problema" (hook emocional)
- **Slide 2**: Imagem que representa "insight" (pode ser gráfico OU pessoa pensativa)
- **Slide 3**: Imagem que representa "solução/esperança"
- **Slide 4**: Imagem que representa "ação/comunidade"

**Critérios de Foto (SKILL_PhotoGuidelines.md):**
- Autêntica (não stock clichê)
- Representa a persona (Rosa, Ana, Pedro)
- Mood alinhado com mensagem
- Resolução OK (min 1000px)

**Exemplo:**

Se persona é Rosa (27, logística, Porto Alegre, mulher):
- Slide 1: Mulher 25-35 estressada, ambiente de trabalho, iluminação natural
- Slide 2: Mulher pensativa, esperançosa, sozinha mas calma
- Slide 3: Mulher sorrindo levemente, com grupo de amigos (comunidade)
- Slide 4: Grupo de pessoas unidas (comunidade sólida)

### 5. Injetar Fotos no Figma

1. Para cada slide que precisa foto:
   - Clicar no image frame
   - Upload direto via Figma (ou buscar Unsplash via browser)
   - Crop/fit conforme layout
   - Ajustar opacity se necessário para legibilidade de texto

2. Validações:
   - [ ] Foto é legível?
   - [ ] Texto sobre foto é legível? (contrast OK)
   - [ ] Foto responde ao contexto do slide?
   - [ ] Não é muito escura ou clara demais?

### 6. Finalizar Design

- [ ] Todos os textos estão exatos (não editados)?
- [ ] Todas as fotos estão injetas?
- [ ] Layout respeita padding/margins?
- [ ] Componentes seguem SKILL_ComponentSystem (colors, fonts, tokens)?
- [ ] Preview mobile (zoom 50%) ainda legível?

### 7. Exportar Imagens

Para cada slide:
1. Selecionar frame
2. File → Export as PNG (1080x1350)
3. Salvar em: `POSTS/DDMMYYYY_Tema/assets/images/instagram-carousel.png`

Se carousel com múltiplos slides:
- Exportar cada slide separado OU
- Exportar toda a sequência (conforme estrutura)

---

## Saída

**Arquivos criados:**
```
POSTS/DDMMYYYY_Tema/
├── assets/
│   └── images/
│       ├── instagram-carousel.png    ← Criado por AGENT_Figma
│       ├── whatsapp-image.png        ← Criado por AGENT_Figma (opcional)
│       └── linkedin-image.png        ← Criado por AGENT_Figma (opcional)
```

**Mensagem ao time (Telegram):**
```
🎨 VISUALS READY — [DATA]

✅ Instagram Carousel (4 slides)
✅ Fotos injetas e layout OK
✅ Exportado em 1080x1350 (PNG)

Arquivos em: POSTS/DDMMYYYY_Tema/assets/images/

[Preview das imagens]

→ Próximo: Publicação manual no Instagram conforme calendário
```

---

## Checklist AGENT_Figma

Antes de sinalizar "pronto para publicação":

**Design:**
- [ ] Frame criado no Figma
- [ ] Todos os captions estão exatos (do instagram-captions.md)
- [ ] Todas as fotos injetas
- [ ] Layout respeta brand guidelines
- [ ] Texto legível em mobile (zoom 50%)
- [ ] Contrast OK (WCAG AA)
- [ ] Componentes usam design tokens corretos

**Fotos:**
- [ ] Cada slide tem foto apropriada
- [ ] Fotos são autênticas (não stock)
- [ ] Mood alinhado com mensagem
- [ ] Persona representada

**Exportação:**
- [ ] PNG exportado em 1080x1350
- [ ] Arquivo salvo em assets/images/
- [ ] Nomes de arquivo claros (instagram-carousel.png, etc)

---

## Integração com Instagram

Depois que AGENT_Figma finaliza:

**Publicação Manual (por enquanto):**
1. Bill baixa PNG do POSTS/DDMMYYYY_Tema/assets/images/
2. Bill publica no Instagram @padrinho.app (via app ou Threads Manager)
3. Cola caption exato do instagram-captions.md
4. Cola hashtags

**Futuramente (automação):**
- API do Instagram pode ser integrada
- Publicação agendada via Meta Business Suite

---

## Referências

- `SKILL/SKILL_ContentCreationWorkflow.md` → Seção 2 (AGENT_Figma)
- `SKILL/SKILL_Documentation.md` → Seção 2-3 (Estrutura POSTS/ + Nomea Seção)
- `SKILL/SKILL_ComponentSystem.md` → Design tokens + componentes
- `SKILL/SKILL_PhotoGuidelines.md` → Critérios de foto
- `KNOW/KNOW_BrandPositioning.md` → Brand visual identity

---

**Fim do Workflow de Cascata:**
✅ POST_Overview (Strategy)
✅ 6 Textos (Tactic)
✅ QA de Textos (Operational)
✅ Imagens (Figma)

📱 Pronto para publicar no Instagram!
