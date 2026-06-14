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

**Responsabilidade:** Ler POST_Overview.md → Criar **6 arquivos de TEXTO** (1 versão por canal)

**Referência:** `SKILL/SKILL_ContentCreationWorkflow.md` (Seção 2: AGENT_Tactic)

---

## Entrada

- `POSTS/DDMMYYYY_Tema/POST_Overview.md` (estratégia do Strategy Agent)
- `KNOW/KNOW_EditorialPillars.md` (tone + estrutura por pilar)
- `KNOW/KNOW_CopyRules.md` (regras de copywriting)
- `KNOW/KNOW_[Persona].md` (para tom específico)

---

## Processo

### 1. Ler POST_Overview.md
- Entender pergunta central
- Entender persona alvo
- Entender pillar editorial
- Entender CTA geral

### 2. Criar 6 Arquivos de TEXTO

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

#### B. `NEWS_DDMMYYYY_Tema.md`
**Para:** Newsletter (e-mail)
**Comprimento:** 300–400 palavras
**Estrutura:** Abertura quente + 2 pontos principais + CTA
**Tom:** Pessoal, conversacional, direto (como Bill falando)
**Formato:** Markdown simples

**Começar com:**
```markdown
# [Assunto do Email]

Oi, [Nome],

[Abertura pessoal conectando com a pergunta]

[Ponto 1]

[Ponto 2]

A gente acredita que [CTA específico].

[Signature]
```

#### C. `instagram-captions.md`
**Para:** Instagram carousel (copy dos slides)
**Comprimento:** ~100 caracteres por slide
**Estrutura:** 1 caption por linha (para 3-5 slides)
**Tom:** Quente, emojis apropriados, hook forte
**Formato:** Plain text, 1 caption por linha

**Formato:**
```
Caption Slide 1: [Hook + pergunta + emoji]
Caption Slide 2: [Insight/dado + emoji]
Caption Slide 3: [Ponto chave + emoji]
Caption Slide 4: [CTA + emoji]
```

#### D. `podcast-script.md`
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

#### E. `whatsapp-text.md`
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

#### F. `linkedin-copy.md`
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

- [ ] Todos os 6 arquivos existem?
- [ ] Cada um tem comprimento apropriado (Blog: 1.5k, News: 300-400, IG: ~100 chars/slide, etc)?
- [ ] Tom varia por canal (Blog educativo, Newsletter quente, IG casual, etc)?
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
├── BLOG_DDMMYYYY_Tema.md         ← Criado por AGENT_Tactic
├── NEWS_DDMMYYYY_Tema.md         ← Criado por AGENT_Tactic
├── instagram-captions.md          ← Criado por AGENT_Tactic
├── podcast-script.md              ← Criado por AGENT_Tactic
├── whatsapp-text.md               ← Criado por AGENT_Tactic
└── linkedin-copy.md               ← Criado por AGENT_Tactic
```

**Mensagem ao time (Telegram):**
```
✍️ COPY READY — [DATA]

📝 6 Versões de Texto Criadas:
✅ Blog (1.8k palavras)
✅ Newsletter (350 palavras)
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
- [ ] 6 arquivos criados em POSTS/DDMMYYYY_Tema/
- [ ] Blog: ~1.500–2.000 palavras, estruturado, SEO
- [ ] Newsletter: ~300–400 palavras, quente/pessoal
- [ ] Instagram: captions curtos, hooks fortes
- [ ] Podcast: conversacional, 1.2k–1.6k palavras
- [ ] WhatsApp: ultra-casual, 50–150 chars
- [ ] LinkedIn: profissional ou pessoal conforme autor
- [ ] Nenhum é duplicate do outro
- [ ] Todos respondem pergunta central
- [ ] Zero jargão médico

---

## Referências

- `SKILL/SKILL_ContentCreationWorkflow.md` → Seção 2 (AGENT_Tactic)
- `SKILL/SKILL_Documentation.md` → Seção 5 (Conven Seções de Escrita)
- `KNOW/KNOW_EditorialPillars.md` → Tone por pilar
- `KNOW/KNOW_CopyRules.md` → Regras de copywriting
- `POSTS/DDMMYYYY_Tema/POST_Overview.md` → Estratégia de base

---

**Próximo Agente:** AGENT_Operational (valida + finaliza textos)
