---
title: "Figma Agent — Padrinho Automation"
version: "1.0"
status: "Final"
type: "Agent"
owner: "Padrinho Marketing Automation"
parent_doc: "marketing/AGENT/"
tags: [agent, automation, orchestration]
---

# Figma Design Agent Instructions

## Propósito
Materializar o conteúdo aprovado em frames Figma reais, injetar fotos, exportar preview, e enviar ao Telegram. É o último passo antes da publicação.

## Entrada
- `operational_copy.json` (do Operational Agent)
- Figma file: `sBItPeNLyvT5EMyKLqQbRv` (03. Padrinho • Social)
- `marketing/SKILL/skill-figma-tokens.json` (design tokens)
- unsplash-mcp (para injetar fotos)

## Processo

### 1. Para cada post:

#### A. Preparar no Figma
1. Localizar componente em `_COMPONENTS`
2. Copiar para `_QUEUE/[post_id]_[date]`
3. Renomear com padrão: `Post 1 - Pequenas Vitórias - 2026-05-07`

#### B. Popular Textos
- Paste caption em text layer correto
- Paste hashtags no rodapé
- Ajustar breaks de linha se necessário
- Validar legibilidade mobile

#### C. Injetar Foto (unsplash-mcp)
```javascript
// Usando unsplash-mcp:
await unsplash.search({
  query: "woman overwhelmed anxious dark moody authentic portrait",
  page: 1,
  per_page: 10
})
// Pega primeira imagem
// Insere como fill no layer especificado
```

#### D. Ajustar Layout
- Centralizar texto se necessário
- Ajustar tamanho de foto (crop/fit)
- Validar contraste (WCAG AA mínimo)
- Deixar padding respeitando brand guidelines

### 2. Exportar Preview
- Exportar cada frame como PNG (1080x1080 para Instagram)
- Salvar em: `/marketing/posts/[date]/post_[id].png`
- Gerar sprite/grid visual para Telegram

### 3. Enviar ao Telegram

**Estrutura de Mensagem:**
```
🎨 VISUAL FINAL — 7 Maio 2026

✅ Post 1 — Carrossel "Pequenas Vitórias"
[imagem preview do slide 1]
[imagem preview do slide 5]
[imagem preview do slide 10]

Caption:
"Pequena vitória de hoje? 🌱..."

Component: Figma → //_QUEUE/Post1_Pequenas_Vitórias_2026-05-07

---
📱 Em _QUEUE e pronto para publicar!

✅ PUBLICAR NO INSTAGRAM
❌ CANCELAR (voltar para copy)
```

## Saída

**JSON Structure:**
```json
{
  "date": "2026-05-07",
  "phase": "figma",
  "posts": [
    {
      "post_id": 1,
      "figma_frame_id": "3363:219",
      "figma_url": "https://figma.com/design/sBIt.../...",
      "exports": {
        "png_url": "https://github.com/raw/.../post_1.png",
        "preview_generated_at": "2026-05-07T18:30:00Z"
      },
      "published_at": null
    }
  ],
  "published": false
}
```

## Human Gate
- **Final Approval**: Telegram button
- **Timeout**: até 1h (publikação é iminente)
- **Se ✅**: Dispara `/api/publish` (Instagram)
- **Se ❌**: Volta para Operational (refazer copy)

## Instruções de Prompting

1. **Integração unsplash-mcp**:
   - Receber query exato do operational_copy.json
   - Buscar primeira imagem (melhor score)
   - Inserir no layer correto do Figma
   - Logging: qual foto foi usada (URL unsplash)

2. **Validações Figma**:
   - [ ] Texto legível? (contrast ratio)
   - [ ] Foto visível? (não cropped)
   - [ ] Layout alinhado com brand?
   - [ ] Nenhum "placeholder" ainda visível?
   - [ ] Dimensões corretas (1080x1350 carousel, 1080x1080 single)?

3. **Export Settings**:
   - PNG, 1x scale (não 2x)
   - No background (transparent if needed)
   - Slices por slide se carousel (10 imagens para 10 slides)

4. **Logging**:
   - Qual unsplash foto foi usada (creditar depois)
   - Quando foi exportado
   - Qualidade do preview (se há erros visuais)

## Requisitos
- Claude Agent (com acesso unsplash-mcp)
- Figma REST API token
- unsplash-mcp instalado
- Write: Telegram
- Write: GitHub (posts/)
- Supabase: update phase = 'figma'

## Horário
- **Trigger**: Após aprovação operational (webhook)
- **Timeout**: 10 minutos (complexo)
- **Retry**: 1x se falhar

## Próximo Passo
Se ✅: `/api/publish` dispara automaticamente
   - Pega cada frame de _QUEUE
   - Publica no Instagram
   - Move para _APPROVED
   - Telegram: "✅ Publicado às 18:45"

Se ❌: Volta para Operational, aguarda novo copy

## Integração com Publish Flow

```javascript
// publish.js recebe:
{
  "post_id": 1,
  "caption": "...",
  "images": ["post_1_slide_1.png", "post_1_slide_2.png", ...],
  "hashtags": ["#...", "#..."],
  "publish_at": "2026-05-07T18:30:00Z"
}

// E publica cada um no Instagram Graph API
```

## Notas
- Sempre creditar Unsplash (rodapé ou comentário)
- Arquivo de fotos usadas: `marketing/posts/[date]/credits.md`
- Se foto se repete entre posts, usar mesma (economiza)
- Backup visual: salvar PNGs no GitHub (audit trail)
