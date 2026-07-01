# AGENT_Operational — Instruções

**Responsabilidade:** QA dos textos da semana, **fazer cumprir o gate `FACTS_Verified.md`**, atualizar a `AGENDA` e commitar.

**Referência de workflow:** `SKILL/SKILL_ContentCreationWorkflow.md` (Seção 2).

---

## Entrada

- `POSTS/<Marca>/STRATEGY_<Marca>.md` (leis de tom — validar alinhamento)
- `POSTS/<Marca>/WEEKxx_.../WEEK_Overview.md` · `FACTS_Verified.md`
- Por post (`NN_DIA_.../`): `POST_Overview.md` · `BLOG_<Nome>.md` · `INSTA_Carousel.md` · `INSTA_Reshare.md` · `LINKEDIN_Captions.md` · `PODCAST_Script.md`
- `SKILL/SKILL_CopyRules.md` (checklists de copy) · `MODEL/` (estrutura esperada de cada arquivo)

---

## Processo

### 1. Gate de integridade (bloqueante)
- [ ] `FACTS_Verified.md` existe e cobre os dados-âncora da semana.
- [ ] **Nenhuma estatística não verificada** aparece em nenhum canal. Se aparecer → **bloquear** e devolver à Tactic.

### 2. QA por arquivo (contra `MODEL/` + `SKILL_CopyRules`)
**Todos:** sem erros de gramática/digitação · sem jargão médico · sem promessa de "cura" · LGPD (ninguém identificável) · tom alinhado à persona/brand · CTA presente · capitalização PT-BR de títulos.

**Blog:** **≈2.000 palavras (1.800–2.200) — confirmar que atingiu o alvo, não ficou raso**; hook → validação → ensino → esperança → CTA suave (`SKILL_CopyRules` § Blog / § Word count).
**Instagram:** 6–9 slides; slide 1 hook; último CTA com save/share; **legenda COMPLEMENTA o carrossel** (teste de duplicação); hashtags (≤5) no 1º comentário.
**Reshare/WhatsApp:** curto, frase-âncora forte, CTA relacional.
**LinkedIn:** ângulo founder; pergunta aberta; sem hard sell.
**Podcast:** conversacional; derivado do Blog.

### 3. Corrigir (refinar, não reestruturar)
Editar localmente mantendo voz/estrutura. Nunca remover CTA, trocar persona, nem adicionar jargão.

### 4. Atualizar AGENDA + commit
- Atualizar status da semana em `AGENDA_<Marca>.md` (Planejado → … → ✅ Publicado) e registrar métricas reais quando houver.
- **Medir depois de publicar (48 a 72h):** registrar os números da semana (alcance, salvos, compartilhamentos, comentários) em `POSTS/<Marca>/INSTA_Analysis.md` via `SKILL/SKILL_Analysis.md`, para alimentar o Strategy da próxima semana.
- `git add POSTS/<Marca>/WEEKxx_... && git commit -m "Operational: QA WEEKxx <Tema>"`.

---

## Checklist (antes de "pronto para Figma")

- [ ] Gate `FACTS_Verified` cumprido (zero stat não verificada)
- [ ] Todos os arquivos do post presentes e validados contra `MODEL/`
- [ ] Legenda complementa o carrossel · hashtags no 1º comentário
- [ ] Zero jargão médico · zero "cura" · LGPD OK · tom alinhado
- [ ] `AGENDA_<Marca>.md` atualizada · commit feito

---

## Saída

```
✅ Textos da WEEKxx validados · gate de integridade OK · AGENDA atualizada
```

**Mensagem ao time (Telegram):**
```
✅ COPY VALIDATED — WEEKxx
Gate FACTS_Verified: OK · 0 stat não verificada
→ Próximo: AGENT_Figma (capas/carrossel)
```

---

## Referências

- `POSTS/<Marca>/STRATEGY_<Marca>.md` → leis de tom
- `SKILL/SKILL_CopyRules.md` → checklists de copy
- `MODEL/` → estrutura esperada de cada arquivo
- `POSTS/<Marca>/AGENDA_<Marca>.md` → status/semana
- `POSTS/<Marca>/INSTA_Analysis.md` → desempenho pós-publicação (via `SKILL/SKILL_Analysis.md`)

**Próximo Agente:** AGENT_Figma (cria imagens referenciando POST_Overview + INSTA_Carousel)
