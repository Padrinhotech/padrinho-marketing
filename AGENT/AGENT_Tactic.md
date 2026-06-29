---
title: "AGENT_Tactic — Padrinho Marketing 2026 H2"
version: "2.0"
status: "Active"
type: "Agent"
owner: "Bill (Padrinhotech)"
parent_doc: "AGENT/"
tags: [agent, tactic, cascata-de-conteudo]
---

# AGENT_Tactic — Instruções

**Responsabilidade:** Ler POST_Overview.md → Criar **5 arquivos de TEXTO** (1 versão por canal)

**Referência:** `SKILL/SKILL_ContentCreationWorkflow.md` (Seção 2: AGENT_Tactic)

---

## Entrada

- `POSTS/DDMMYYYY_Tema/POST_Overview.md` (estratégia do Strategy Agent)
- `POSTS/Padrinho/STRATEGY_Padrinho.md` (lógica estratégica + leis de tom — manter alinhamento)
- `KNOW/Padrinho/KNOW_EditorialPillars.md` (tone + estrutura por pilar)
- `SKILL/SKILL_CopyRules.md` (regras de copywriting — inclui a *Regra de ouro* de legenda complementar)
- `KNOW/KNOW_[Persona].md` (para tom específico)

---

## Processo

### 1. Ler POST_Overview.md
- Entender pergunta central
- Entender persona alvo
- Entender pillar editorial
- Entender CTA geral

### 2. Criar 5 Arquivos de TEXTO

Cada arquivo é uma versão do mesmo conteúdo, **otimizado para seu canal específico**.

**Não copia/cola!** Reescreve para tom + comprimento + formato de cada canal.

#### A. `BLOG_DDMMYYYY_Tema.md`
**Para:** Blog (site)
**Comprimento:** 1.500–2.000 palavras
**Estrutura:** H1 (título) + H2 (seções) + parágrafos + listas + CTA final
**Tom:** Educativo, SEO-friendly, links internos
**Formato:** Markdown completo

**Começar com:**
```markdown
# [Título Atraente]

[Abertura/Hook em 1-2 parágrafos]

## [Seção 1]
[Conteúdo]

## [Seção 2]
[Conteúdo]

## Conclusão
[CTA específico para blog]
```

#### B. [INATIVO NESTE NÍVEL] Newsletter
O conteúdo da newsletter é mensal e agora é gerenciado na pasta `POSTS/Padrinho/NEWS/YYYY_MM_Mes`. O AGENT_Tactic não cria arquivo NEWS para cada post individual.

#### C. `INSTA_Carousel.md` (slides + legenda do feed)
**Para:** Instagram carousel. **Dois blocos DISTINTOS no mesmo arquivo — eles NÃO podem dizer a mesma coisa.**

**C.1 — Slides do carrossel** (o argumento, slide a slide)
- 6–9 slides, ~100–150 caracteres por slide
- Slide 01 = capa/hook · slides do meio = desenvolvimento/dado-âncora · último = CTA
- Cada slide mapeia a um componente Figma (ver `SKILL/SKILL_ComponentIndex.md`)
```
Slide 01: [Hook visual]
Slide 02: [Insight/dado]
...
Slide N: [CTA + gatilho de save/comentário]
```

**C.2 — Legenda do feed** (a voz POR CIMA do carrossel)
- ⚠️ **A legenda COMPLEMENTA o carrossel — nunca o transcreve.** Regra de ouro completa em `SKILL/SKILL_CopyRules.md` § *Regras de Legenda*.
- Se a legenda repete as frases dos slides na mesma ordem, está **errada**. Ela adiciona o que os slides NÃO têm: **bastidor / contexto pessoal**, um **ângulo ou dado novo**, **voz íntima** (amiga que comenta o post, não que o repete), e a **provocação** que puxa comentário.
- Gancho (primeiros ~125 chars) = **porta de entrada diferente** da capa — nunca a headline do slide 01 repetida.
- Máx **2.200 chars** · hashtags só no **1º comentário**, nunca na legenda.
- **Teste de duplicação:** ler só a legenda *ou* só o carrossel deve entregar experiências diferentes — cada um deixa o leitor querendo o outro. Se passam a mesma mensagem, reescreva a legenda.

#### D. `PNT_Script.md`
**Para:** Podcast Pé na Trilha (roteiro/pauta)
**Comprimento:** 5–8 min (approx 1.200–1.600 palavras)
**Estrutura:** Intro → 2-3 pontos principais → Closing
**Tom:** Conversacional, como se falando (use contrações: "tá", "você sabe")
**Formato:** Markdown com **negrito** para pausas/ênfase

**Começar com:**
```markdown
# [Título do Episódio]

## Intro (30s)
Olá, tudo bem? Bem-vindo ao Pé na Trilha. [Gancho da pergunta]...

## Ponto 1 (3 min)
[Desenvolver primeiro ponto]

## Ponto 2 (3 min)
[Desenvolver segundo ponto]

## Closing (1 min)
A gente acredita que [CTA]...
```

#### E. `WHATSAPP_Reshare.md`
**Para:** WhatsApp Community
**Comprimento:** 50–150 caracteres
**Estrutura:** Pergunta + insight simples + emoji
**Tom:** Ultra-casual, direto, conversacional
**Formato:** Plain text

**Exemplo:**
```
🌱 E aí, qual é sua pequena vitória hoje?

Recuperação não é sobre ser perfeito. É um passo, e depois outro.

Comenta aqui! 👇
```

#### F. `LINKEDIN_Captions.md`
**Para:** LinkedIn (Gabriel OU Fabio)
**Comprimento:** 150–300 caracteres
**Estrutura:** Hook profissional/pessoal → insight → CTA
**Tom:** Conforme o perfil (profissional para Gabriel, mais pessoal para Fabio)
**Formato:** Plain text

**Exemplo:**
```
Na semana passada tive um insight que quero compartilhar com vocês.

Recuperação é feita de pequenos passos. E cada passo importa.

Como é sua trajetória? Comenta! 👇

#MudançaDeEstilo #Recuperação
```

---

## Validações

Antes de passar para Operational:

- [ ] Todos os 5 arquivos existem?
- [ ] Cada um tem comprimento apropriado (Blog: 1.5k, IG: ~100 chars/slide, etc)?
- [ ] Tom varia por canal (Blog educativo, Newsletter quente, IG casual, etc)?
- [ ] **Legenda do feed COMPLEMENTA o carrossel** (passa no teste de duplicação)? Não repete as frases dos slides nem o hook da capa?
- [ ] Nenhum é cópia/cola dos outros?
- [ ] CTA é específico para cada canal?
- [ ] Nenhum jargão médico/técnico?
- [ ] Nenhuma promessa de "cura"?
- [ ] Pergunta central é respondida em cada versão?

---

## Saída

**Arquivos criados:**
```
POSTS/DDMMYYYY_Tema/
├── POST_Overview.md
├── BLOG_PostTitle.md         ← Criado por AGENT_Tactic
├── INSTA_Captions.md          ← Criado por AGENT_Tactic
├── PNT_Script.md              ← Criado por AGENT_Tactic
├── WHATSAPP_Reshare.md               ← Criado por AGENT_Tactic
└── LINKEDIN_Captions.md               ← Criado por AGENT_Tactic
```

**Mensagem ao time (Telegram):**
```
✍️ COPY READY — [DATA]

📝 5 Versões de Texto Criadas:
✅ Blog (1.8k palavras)
✅ Instagram captions (4 slides)
✅ Podcast script (1.4k palavras)
✅ WhatsApp (100 chars)
✅ LinkedIn (200 chars)

Todos em: POSTS/DDMMYYYY_Tema/

→ Próximo: AGENT_Operational valida + finaliza
```

---

## Checklist AGENT_Tactic

Antes de passar para Operational:
- [ ] 5 arquivos criados em POSTS/DDMMYYYY_Tema/
- [ ] Blog: ~1.500–2.000 palavras, estruturado, SEO

- [ ] Instagram: slides curtos + **legenda do feed que complementa (não duplica) o carrossel**
- [ ] Podcast: conversacional, 1.2k–1.6k palavras
- [ ] WhatsApp: ultra-casual, 50–150 chars
- [ ] LinkedIn: profissional ou pessoal conforme autor
- [ ] Nenhum é duplicate do outro
- [ ] Todos respondem pergunta central
- [ ] Zero jargão médico

---

## Referências

- `POSTS/Padrinho/STRATEGY_Padrinho.md` → Lógica estratégica + leis de tom (fonte de verdade)
- `SKILL/SKILL_ContentCreationWorkflow.md` → Seção 2 (AGENT_Tactic)
- `SKILL/SKILL_Documentation.md` → Seção 5 (Conven Seções de Escrita)
- `KNOW/Padrinho/KNOW_EditorialPillars.md` → Tone por pilar
- `SKILL/SKILL_CopyRules.md` → Regras de copywriting (Regra de ouro: legenda complementa o carrossel)
- `POSTS/DDMMYYYY_Tema/POST_Overview.md` → Estratégia de base

---

**Próximo Agente:** AGENT_Operational (valida + finaliza textos)
