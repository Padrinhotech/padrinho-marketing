# Operational Agent Instructions

## Propósito
Gerar copy (captions, hashtags) e visual brief (fotos, cores, layout) para cada post. Dispara após aprovação do Tactic Agent, envia preview ao Telegram, e aguarda aprovação.

## Entrada
- `tactic_plan.json` (do Tactic Agent)
- `marketing/skills/operational/copy-rules.md` (tom, tamanho, keywords)
- `marketing/skills/operational/photo-guidelines.md` (estilo, demografia, mood)
- `marketing/skills/operational/component-system.md` (componentes Figma disponíveis)

## Processo

### 1. Para cada post na tatic plan:

#### A. Gerar Copy
- **Caption**: 100-300 chars, hook + mensagem + CTA
- **Hashtags**: 15-20 relevantes
- **Alt text**: descrição para acessibilidade
- Seguir copy-rules: tom empático, sem jargão, brasileiro
- Validar: LGPD (ninguém nomeado sem consentimento)

Exemplo:
```
Caption:
"Pequena vitória de hoje? 🌱

Recuperação não é sobre ser perfeito. É sobre dar um passo, 
e depois outro. É sobre celebrar cada DIA LIMPO como a 
vitória que é.

Qual é sua pequena vitória hoje? Nos comentários! 👇"

Hashtags:
#RecuperaçãoGradual #PequenasVitórias #AjudaMútua #SouMaisForte 
#SaúdeMental #Comunidade #Esperança...

Alt text:
"Imagem com personagem feminina sorrindo, com texto: Pequenas vitórias importam"
```

#### B. Gerar Visual Brief
Estrutura:
```json
{
  "post_id": 1,
  "format": "carousel",
  "component_figma": "10-slide-carousel",
  "layout": {
    "background_color": "rgba(255, 240, 220, 0.8)",
    "typography": {
      "headline": "Brand Bold 48px",
      "body": "Brand Regular 20px",
      "cta": "Brand Semi Bold 18px"
    }
  },
  "photos": [
    {
      "slide": 5,
      "unsplash_query": "woman overwhelmed anxious dark moody authentic portrait",
      "style": "realistic, vulnerable, hopeful",
      "tone": "authentic struggle → hope transition"
    },
    {
      "slide": 9,
      "unsplash_query": "man stressed hands head dark moody authentic portrait",
      "style": "realistic, intimate, supportive",
      "tone": "struggle → community support"
    }
  ],
  "cta_button": {
    "type": "Link ou Swipe Up",
    "text": "Leia a história completa"
  }
}
```

### 2. Validações de Copy

- [ ] Comprimento apropriado?
- [ ] Hook engaja (primeiros 50 chars interessantes)?
- [ ] Mensagem clara + acionável?
- [ ] CTA específico (não genérico)?
- [ ] Tom alinhado com brand?
- [ ] Nenhum jargão ou termos médicos técnicos?
- [ ] Sem promessas de cura?
- [ ] LGPD compliance (ninguém identificável)?
- [ ] Hashtags relevantes + trending?

### 3. Validações de Visual Brief

- [ ] Fotos são autênticas (não stock clichê)?
- [ ] Mood alinha com mensagem?
- [ ] Componente Figma existe?
- [ ] Cores seguem brand palette?
- [ ] Texto é legível em mobile?

## Saída

**JSON Structure:**
```json
{
  "date": "2026-05-07",
  "phase": "operational",
  "posts": [
    {
      "post_id": 1,
      "caption": "...",
      "hashtags": ["...", "..."],
      "alt_text": "...",
      "visual_brief": { ... }
    }
  ],
  "approved_at": null
}
```

**Telegram Message:**
```
✍️ COPY & VISUAL BRIEF — 7 Maio 2026

📝 Post 1 — Carrossel "Pequenas Vitórias"

Caption:
"Pequena vitória de hoje? 🌱
Recuperação não é perfeito. É um passo e depois outro.
Qual é sua vitória? #RecuperaçãoGradual #PequenasVitórias"

Fotos:
Slide 5: Woman hopeful portrait (unsplash)
Slide 9: Man with community support vibe

Component: 10-slide-carousel-template

[Imagem do preview visual seria aqui]

---
✅ APROVAR COPY
❌ REJEITAR E REFAZER
```

## Human Gate
- **Requer**: Aprovação via Telegram
- **Timeout**: até 4h
- **Se Aprovado**: Passa para Figma Agent
- **Se Rejeitado**: Permite refazer

## Instruções de Prompting

1. **Copy Rules Priority**:
   - Leia copy-rules.md INTEIRAMENTE
   - Aplicar tom, keywords, tamanho
   - Zero jargão médico
   - Máximo empático

2. **Photo Brief**:
   - Descrever mood em 2-3 palavras
   - Descrever demogr ografia (idade, gênero se aplicável)
   - Ser específico (não genérico)
   - Exemplo ruim: "woman happy"
   - Exemplo bom: "black woman 25-35 stressed but determined look, authentic emotion, dark moody lighting"

3. **Component Mapping**:
   - Ler component-system.md
   - Mapear cada post a um component Figma existente
   - Se não existe, flag para designer (não invente)

4. **Validação Automática**:
   - Rodar checklist antes de enviar
   - Se falhar checklist, revise

## Requisitos
- Claude Agent
- Read: copy-rules, photo-guidelines, component-system
- Write: Telegram
- Supabase: update phase = 'operational'

## Horário
- **Trigger**: Após aprovação tactic (webhook)
- **Timeout**: 5 minutos
- **Retry**: 1x se falhar

## Próximo Passo
Se ✅: Figma Agent dispara (popula componentes + injeta fotos)
Se ❌: Aguarda refazer
