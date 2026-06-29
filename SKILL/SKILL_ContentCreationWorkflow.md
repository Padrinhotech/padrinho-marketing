# SKILL_ContentCreationWorkflow

**Objetivo:** Documentar o racional de criação de conteúdo em cascata que alimenta TODOS os canais do Padrinho.

**Responsabilidade:** Este documento é a fonte da verdade para os Agents entenderem como criar conteúdo de forma replicável e eficiente.

---

## 1. Estrutura de Cascata (3 Camadas)

```
┌─────────────────────────────────────────────────────────────────┐
│ CAMADA 1: TEXTO (Criado 1ª)                                    │
├─────────────────────────────────────────────────────────────────┤
│ • Blog post (markdown) — standalone                             │
│ • Newsletter (markdown) — standalone                            │
│ • Instagram captions (copy por slide)                           │
│ • Podcast script/pauta                                          │
│ • WhatsApp text                                                 │
│ • LinkedIn copy (Gabriel + Fabio)                              │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ CAMADA 2: IMAGEM (Criado 2ª) — Referencia CAMADA 1            │
├─────────────────────────────────────────────────────────────────┤
│ • Instagram carousel (a partir de INSTA_Carousel.md)        │
│ • WhatsApp image (adaptação do carousel)                        │
│ • LinkedIn image (reutiliza carousel ou novo)                  │
│ • YouTube thumbnail (futuramente)                               │
│                                                                 │
│ ⚠️ Criados em Figma, seguindo SKILL_ComponentSystem.md          │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ CAMADA 3: VÍDEO (Criado 3ª) — Futuro                           │
├─────────────────────────────────────────────────────────────────┤
│ • Instagram Reels script (criado agora)                         │
│ • TikTok script (criado agora)                                  │
│ • YouTube video script (criado agora)                           │
│ • Podcast recording (gravação futura)                           │
│ • Instagram Reels/TikTok video (gravação futura)               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Workflow por Agente

### AGENT_Strategy
**Responsabilidade:** Define tema + contexto estratégico

**Output:** POST_Overview.md (template abaixo)
- Tema semanal
- Pillar editorial
- Persona alvo
- Perguntas/dúvidas que o conteúdo responde
- Estrutura proposta para Blog
- Refs para capas/estrutura esperada

**Não cria:** Copies específicas por canal

---

### AGENT_Tactic
**Responsabilidade:** Quebra o tema em 6 versões de TEXTO

**Recebe:** POST_Overview.md

**Cria:**
1. `BLOG_DDMMYYYY_Tema.md` — Versão blog (completa, SEO)
2. ~~`NEWS_DDMMYYYY_Tema.md`~~ — **Newsletter NÃO é por post.** É mensal, agregada em `POSTS/Padrinho/NEWS/YYYY_MM_Mes/` (ver `SKILL_Documentation.md`).
3. `INSTA_Carousel.md` — Slides do carrossel (6-9) **+ legenda do feed que COMPLEMENTA o carrossel (não duplica os slides — ver `SKILL/SKILL_CopyRules.md` § Regras de Legenda)**
4. `PNT_Script.md` — Roteiro/pauta (5-8 min)
5. `INSTA_Reshare.md` — Mensagem WhatsApp (50-150 caracteres)
6. `LINKEDIN_Captions.md` — Post LinkedIn (150-300 caracteres)

> **Nomes de arquivo, contagem de slides (6–9) e dimensões (1080×1440) são canônicos em `SKILL_Documentation.md` § Estrutura de Arquivos.** Não redefinir aqui.

**Considera:**
- Tom e comprimento por canal
- CTA apropriado por canal
- Hashtags para Instagram/LinkedIn
- Formatação (markdown para Blog/Newsletter, plain text para redes)

**Não cria:** Imagens, vídeos

---

### AGENT_Operational
**Responsabilidade:** Valida e finaliza arquivos de TEXTO

**Recebe:** Outputs de AGENT_Tactic

**Faz:**
- Valida gramática, tom, CTA
- Ajusta formatação (markdown, emojis, breaks de linha)
- Confirma alignment com personas/brand
- Move arquivos para POSTS/DDMMYYYY_Tema/

**Sinaliza:** Para AGENT_Figma quando CAMADA 1 está pronta

**Não cria:** Imagens

---

### AGENT_Figma
**Responsabilidade:** Cria assets visuais (CAMADA 2)

**Recebe:** 
- POST_Overview.md
- INSTA_Carousel.md
- BLOG_*.md (referência para imagens contextualizadas)

**Cria:**
- Instagram carousel (múltiplas slides com captions)
- WhatsApp image (adaptação simplificada)
- LinkedIn image (same as carousel OR novo)

**Segue:**
- SKILL_ComponentSystem.md (design tokens)
- SKILL_PhotoGuidelines.md (qualidade, estilo)
- SKILL_FigmaDelivery.md (processo)

**Exporta:** Imagens para POSTS/DDMMYYYY_Tema/assets/images/

---

## 3. Estrutura de Pastas em POSTS/

```
POSTS/
├── AGENDA_Padrinho.md              ← Tabela de temas (2026 H2)
│
└── 14062026_SobriedadeGlowUp/      ← Data_Tema (DDMMYYYY_Tema)
    ├── POST_Overview.md             ← Guia estratégico (criado por Strategy)
    ├── BLOG_14062026_SobriedadeGlowUp.md     ← Texto final (criado por Tactic, validado por Operational)
    ├── INSTA_Carousel.md        ← Copy (criado por Tactic, validado por Operational)
    ├── PNT_Script.md            ← Roteiro (criado por Tactic, validado por Operational)
    ├── INSTA_Reshare.md             ← Texto (criado por Tactic, validado por Operational)
    ├── LINKEDIN_Captions.md             ← Texto (criado por Tactic, validado por Operational)
    └── assets/
        └── images/
            ├── instagram-carousel.png        ← Criado por Figma
            ├── whatsapp-image.png           ← Criado por Figma
            └── linkedin-image.png           ← Criado por Figma
```

---

## 4. POST_Overview.md — Template

```markdown
# Post Overview: [TEMA]

**Data:** DDMMYYYY
**Pillar:** [Desmascaramento | Reconhecimento | Acolhimento | Empoderamento | Prova Social]
**Persona Alvo:** [Rosa | Ana | Pedro]

## Contexto Estratégico

**Pergunta que responde:**
- [Pergunta 1 que Rosa/Ana/Pedro faz]
- [Pergunta 2]

**Angle:** [Como este conteúdo é diferente?]
**Insight:** [Dado ou verdade central]
**CTA Geral:** [Call-to-action principal para todas as versões]

## Estrutura Blog

**Seções:**
1. Hook / Abertura
2. [Seção principal]
3. [Seção principal]
4. Conclusão + CTA

**Comprimento:** ~1.500–2.000 palavras

## Breakdown por Canal

### Instagram (Carousel — 6–9 slides)
- Slide 1: Hook visual + pergunta
- Slide 2: Insight/dado
- Slide 3: [Ponto chave]
- Slide 4: CTA

### Newsletter
- Tom: Quente, pessoal
- Comprimento: ~300–400 palavras
- Segmento: [Se aplicável]

### Podcast
- Duração: 5–8 min
- Estrutura: Intro + 2-3 pontos + Closing

### LinkedIn (Gabriel / Fabio)
- Ângulo: Profissional / Pessoal
- Comprimento: ~150 caracteres

### WhatsApp
- Comprimento: ~50–100 caracteres
- Enquete ou poll: [Sim/Não]

---

**Status:** Pronto para AGENT_Tactic criar os copies
```

---

## 5. Timing & Responsabilidade

| Etapa | Agente | Duração | Output |
|-------|--------|---------|--------|
| 1. Briefing | Strategy | 30 min | POST_Overview.md |
| 2. Copy | Tactic | 1-2 h | 6 arquivos de texto |
| 3. QA | Operational | 30 min | Arquivos finalizados |
| 4. Visual | Figma | 2-3 h | 3 imagens |
| 5. Publicação | Manual | Conforme calendário | Posts nos canais |

---

## 6. Checklist para Agents

### AGENT_Strategy
- [ ] Tema e pillar bem definidos
- [ ] Persona clara
- [ ] Perguntas reais mapeadas
- [ ] Estrutura de blog pensada
- [ ] POST_Overview salvo em POSTS/DDMMYYYY_Tema/

### AGENT_Tactic
- [ ] Todos os 6 arquivos de texto criados
- [ ] Tom consistente com brand positioning
- [ ] CTAs apropriados por canal
- [ ] Formatação correta (markdown/plain text)
- [ ] Nenhuma repetição desnecessária entre canais

### AGENT_Operational
- [ ] Gramática, ortografia, pontuação
- [ ] Links funcionando (se houver)
- [ ] Imagens referenciadas existem ou têm refs
- [ ] CTAs claros e acionáveis
- [ ] Arquivos movidos para POSTS/DDMMYYYY_Tema/

### AGENT_Figma
- [ ] Instagram carousel tem 6–9 slides
- [ ] Captions alinhadas com INSTA_Carousel.md
- [ ] Imagens seguem SKILL_ComponentSystem.md
- [ ] WhatsApp/LinkedIn são adaptações ou novos designs
- [ ] Imagens exportadas para assets/images/

---

**Última atualização:** junho 2026  
**Fonte da verdade para:** Strategy → Tactic → Operational → Figma
