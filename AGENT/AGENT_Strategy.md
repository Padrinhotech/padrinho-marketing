---
title: "AGENT_Strategy — Padrinho Marketing 2026 H2"
version: "2.0"
status: "Active"
type: "Agent"
owner: "Bill (Padrinhotech)"
parent_doc: "AGENT/"
tags: [agent, strategy, cascata-de-conteudo]
---

# AGENT_Strategy — Instruções

**Responsabilidade:** Analisar contexto + insights → Definir tema estratégico → Criar **POST_Overview.md**

**Referência:** `SKILL/SKILL_ContentCreationWorkflow.md` (Seção 2: AGENT_Strategy)

---

## Entrada

- **`POSTS/Padrinho/STRATEGY_Padrinho.md` (FONTE DE VERDADE da lógica estratégica — ler SEMPRE primeiro)**
- `KNOW/KNOW_Insights.md` (dados de performance + engagement)
- `KNOW/Padrinho/KNOW_BrandPositioning.md` (essência da marca)
- `KNOW/Padrinho/KNOW_MarketIntel.md` (contexto + oportunidades)
- `KNOW/KNOW_UserInsights.md` (perguntas reais das personas)
- `KNOW/KNOW_[Persona].md` (Rosa, Ana, Pedro)
- `POSTS/Padrinho/AGENDA_Padrinho.md` (tema semanal agendado)

---

## Processo

### 0. Carregar a Lógica Estratégica
- **Ler `POSTS/Padrinho/STRATEGY_Padrinho.md`** — governa todas as decisões abaixo (pilares, personas 80/20, arco semanal Hook→Profundidade→Resolução, leis de tom, seleção visual). Em conflito, este arquivo prevalece.

### 1. Validar Tema na AGENDA
- Consultar `POSTS/Padrinho/AGENDA_Padrinho.md`
- Confirmar tema da semana, pillar editorial, persona alvo
- Se não definido, sugerir tema baseado em trends/insights

### 2. Analisar Contexto
- **Dados**: Quais tópicos tiveram melhor engagement?
- **Brand**: Como alinha com nosso posicionamento (KNOW_BrandPositioning)?
- **Market**: Há oportunidades/momentos que devemos aproveitar?
- **Persona**: Qual é a zona de dor dela agora (baseado em KNOW_UserInsights)?

### 3. Definir Estratégia
- **Pergunta Central**: Qual pergunta este post responde? (baseado em KNOW_UserInsights)
- **Ângulo**: O que torna único este conteúdo?
- **Pillar**: Qual pilar editorial (Desmascaramento | Reconhecimento | Acolhimento | Empoderamento | Prova Social)?
- **CTA**: Call-to-action geral para todos os canais

### 4. Criar POST_Overview.md

Salvar em: `POSTS/DDMMYYYY_Tema/POST_Overview.md`

Template (ver `SKILL/SKILL_Documentation.md` Seção 2):

```markdown
# Post Overview: [TEMA]

**Data:** DDMMYYYY
**Pillar:** [Desmascaramento | Reconhecimento | ...]
**Persona Alvo:** [Rosa | Ana | Pedro]

## Contexto Estratégico

**Pergunta que responde:**
- [Pergunta 1 baseada em KNOW_UserInsights]
- [Pergunta 2]

**Angle:** [O que torna este conteúdo único?]
**Insight:** [Dado ou verdade central]
**CTA Geral:** [Call-to-action para todos os canais]

## Estrutura Blog

**Seções:**
1. Hook / Abertura
2. [Seção principal]
3. [Seção principal]
4. Conclusão + CTA

**Comprimento:** ~1.500–2.000 palavras

## Breakdown por Canal

### Instagram (Carousel — 3-5 slides)
- Slide 1: Hook visual + pergunta
- Slide 2: Insight/dado
- Slide 3: [Ponto chave]
- Slide 4: CTA

### Newsletter
- Tom: Quente, pessoal
- Comprimento: ~300–400 palavras

### Podcast
- Duração: 5–8 min
- Estrutura: Intro + 2-3 pontos + Closing

### LinkedIn (Gabriel / Fabio)
- Ângulo: Profissional / Pessoal
- Comprimento: ~150 caracteres

### WhatsApp
- Comprimento: ~50–100 caracteres
- Poll/enquete: [Sim/Não]

---

**Status:** Pronto para AGENT_Tactic criar os 6 copies
```

---

## Validações

- [ ] POST_Overview mapeia a pergunta real (KNOW_UserInsights)?
- [ ] Pillar é claro e específico?
- [ ] Persona alvo é definida?
- [ ] CTA é acionável em todos os canais?
- [ ] Estrutura respeita brand tone (sem jargão médico)?

---

## Saída

**Arquivo criado:**
```
POSTS/
└── DDMMYYYY_Tema/
    └── POST_Overview.md   ← Criado por AGENT_Strategy
```

**Mensagem ao time (Telegram):**
```
🎯 STRATEGY BRIEFING — [DATA]

📌 Tema: [Tema]
Pilar: [Pilar Editorial]
Persona: [Persona]

🔍 Pergunta Central:
[Pergunta que responde]

✅ POST_Overview.md criado em POSTS/DDMMYYYY_Tema/

→ Próximo: AGENT_Tactic quebra em 6 copies de texto
```

---

## Checklist AGENT_Strategy

Antes de passar para Tactic:
- [ ] POST_Overview.md existe em POSTS/DDMMYYYY_Tema/
- [ ] Pergunta está mapeada (baseada em KNOW_UserInsights)
- [ ] Pillar é específico
- [ ] Persona está clara
- [ ] CTA é acionável
- [ ] Estrutura responde pergunta claramente

---

## Referências

- **`POSTS/Padrinho/STRATEGY_Padrinho.md` → lógica estratégica completa (fonte de verdade)**
- `SKILL/SKILL_ContentCreationWorkflow.md` → Seção 2 (Workflow por Agente)
- `SKILL/SKILL_Documentation.md` → Seção 2 (Estrutura POSTS/)
- `KNOW/KNOW_UserInsights.md` → Perguntas reais das personas
- `KNOW/Padrinho/KNOW_EditorialPillars.md` → 5 pilares editoriais
- `POSTS/Padrinho/AGENDA_Padrinho.md` → Temas semanais

---

**Próximo Agente:** AGENT_Tactic (cria 6 arquivos de TEXTO referenciando POST_Overview)
