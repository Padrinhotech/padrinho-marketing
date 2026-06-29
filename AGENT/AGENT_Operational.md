---
title: "AGENT_Operational — Padrinho Marketing 2026 H2"
version: "2.0"
status: "Active"
type: "Agent"
owner: "Bill (Padrinhotech)"
parent_doc: "AGENT/"
tags: [agent, operational, cascata-de-conteudo]
---

# AGENT_Operational — Instruções

**Responsabilidade:** Validar + finalizar **6 arquivos de TEXTO** (QA de qualidade)

**Referência:** `SKILL/SKILL_ContentCreationWorkflow.md` (Seção 2: AGENT_Operational)

---

## Entrada

- `POSTS/Padrinho/STRATEGY_Padrinho.md` (lógica estratégica + leis de tom — validar alinhamento)
- `POSTS/DDMMYYYY_Tema/POST_Overview.md`
- `POSTS/DDMMYYYY_Tema/BLOG_DDMMYYYY_Tema.md`
- `POSTS/DDMMYYYY_Tema/NEWS_DDMMYYYY_Tema.md`
- `POSTS/DDMMYYYY_Tema/instagram-captions.md`
- `POSTS/DDMMYYYY_Tema/podcast-script.md`
- `POSTS/DDMMYYYY_Tema/whatsapp-text.md`
- `POSTS/DDMMYYYY_Tema/linkedin-copy.md`

---

## Processo

### 1. Validar Cada Arquivo

**Todas as versões (6 arquivos):**
- [ ] Sem erros de digitação/gramática?
- [ ] Sem jargão médico/técnico?
- [ ] Sem promessas de "cura" ou resultados garantidos?
- [ ] Pergunta central é respondida?
- [ ] LGPD compliance (ninguém identificável)?
- [ ] Comprimento apropriado para o canal?
- [ ] Tom alinhado com brand positioning?

**Blog especificamente:**
- [ ] H1 é atraente e SEO-friendly?
- [ ] H2s são descritivos?
- [ ] Parágrafos não são muito longos (max 4-5 linhas)?
- [ ] Há CTA final clara?

**Newsletter especificamente:**
- [ ] Abertura pessoal e quente?
- [ ] Comprimento ~300-400 palavras?
- [ ] CTA é acionável (não genérico)?

**Instagram (slides + legenda) especificamente:**
- [ ] 6-9 slides; slide 1 é hook forte; slide final é CTA com gatilho de save/comentário?
- [ ] Cada slide ~100-150 chars?
- [ ] **Legenda do feed COMPLEMENTA o carrossel** — passa no teste de duplicação (ler só a legenda OU só os slides entrega coisas diferentes)? Não repete as frases dos slides nem o hook da capa?
- [ ] Hashtags no 1º comentário (não na legenda)?

**Podcast script especificamente:**
- [ ] Intro é engaging?
- [ ] 2-3 pontos principais?
- [ ] Conversacional (sem ler como artigo)?
- [ ] Closing conecta volta ao tema?
- [ ] Dura ~5-8 min (1.2k-1.6k palavras)?

**WhatsApp especificamente:**
- [ ] Ultra-casual?
- [ ] 50-150 caracteres?
- [ ] Pergunta ou CTA clara?

**LinkedIn especificamente:**
- [ ] Profissional ou pessoal (conforme autor)?
- [ ] 150-300 caracteres?
- [ ] Hashtags relevantes?

### 2. Corrigir Problemas

Se encontrar problemas:
1. Editar o arquivo localmente
2. Manter tom/voz original
3. Não mudar estrutura (apenas refine)
4. Validar novamente

**Exemplo de edição OK:**
```
❌ "O alcoolismo é um transtorno neurobiológico que causa dependência..."
✅ "Beber muito pode se tornar um padrão difícil de quebrar..."
```

**Exemplo de edição que NÃO fazer:**
```
❌ Remover CTA
❌ Mudar persona alvo
❌ Adicionar jargão técnico
```

### 3. Fazer Commit

Se tudo validado, fazer commit no GitHub:

```bash
git add POSTS/DDMMYYYY_Tema/
git commit -m "Operational: validate & finalize text copy for DDMMYYYY_Tema"
git push
```

---

## Saída

**Status:**
Todos os 6 arquivos:
- ✅ Validados
- ✅ Sem erros
- ✅ Prontos para AGENT_Figma

**Mensagem ao time (Telegram):**
```
✅ COPY VALIDATED — [DATA]

📝 6 Textos Finalizados:
✅ Blog
✅ Newsletter
✅ Instagram captions
✅ Podcast script
✅ WhatsApp
✅ LinkedIn

Todos em: POSTS/DDMMYYYY_Tema/
Nenhum erro encontrado.

→ Próximo: AGENT_Figma cria imagens
```

---

## Checklist AGENT_Operational

Antes de sinalizar "pronto para Figma":

**Geral:**
- [ ] 0 erros de gramática/digitação
- [ ] 0 jargão médico
- [ ] 0 promessas de cura
- [ ] Pergunta central respondida em todas as versões
- [ ] LGPD compliance OK
- [ ] Tone alinhado com brand

**Blog:**
- [ ] H1 + H2s claros
- [ ] Parágrafos legíveis
- [ ] CTA final
- [ ] ~1.5k-2k palavras

**Newsletter:**
- [ ] Abertura pessoal
- [ ] ~300-400 palavras
- [ ] CTA acionável

**Instagram:**
- [ ] 3-5 captions
- [ ] Hooks fortes
- [ ] Cada ~100 chars

**Podcast:**
- [ ] Conversacional
- [ ] 2-3 pontos
- [ ] ~1.2k-1.6k palavras
- [ ] Closing

**WhatsApp:**
- [ ] Ultra-casual
- [ ] 50-150 chars
- [ ] Pergunta/CTA

**LinkedIn:**
- [ ] Profissional ou pessoal
- [ ] 150-300 chars
- [ ] Hashtags

---

## Referências

- `POSTS/Padrinho/STRATEGY_Padrinho.md` → Lógica estratégica + leis de tom (fonte de verdade)
- `SKILL/SKILL_ContentCreationWorkflow.md` → Seção 2 (AGENT_Operational)
- `SKILL/SKILL_Documentation.md` → Seção 5-6 (Conven + Fluxo)
- `SKILL/SKILL_CopyRules.md` → Regras de copywriting (Regra de ouro: legenda complementa o carrossel)
- `KNOW/Padrinho/KNOW_BrandPositioning.md` → Brand tone

---

**Próximo Agente:** AGENT_Figma (cria imagens referenciando POST_Overview + instagram-captions.md)
