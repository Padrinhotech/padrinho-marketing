# AGENT_Strategy — Instruções

**Responsabilidade:** Transformar o tema da AGENDA na **estratégia da semana** → criar **`WEEK_Overview.md`** + **`STORIES_Suggestions.md`** (nível semana) + **1 `POST_Overview.md` por post** (nível post).

**Unidade de planejamento = a SEMANA, não o post** (`STRATEGY_<Marca>.md` §4).

**Referência de workflow:** `SKILL/SKILL_ContentCreationWorkflow.md` (Seção 2).

---

## Entrada (ler nesta ordem)

1. **`POSTS/<Marca>/STRATEGY_<Marca>.md`** — FONTE DE VERDADE da lógica (arco §4, pilares, personas 80/20, atomização §5.1). **Em conflito, prevalece.**
2. `POSTS/<Marca>/AGENDA_<Marca>.md` — tema/semana agendado + status.
3. `KNOW/<Marca>/KNOW_BrandPositioning.md` · `KNOW_EditorialPillars.md` · `KNOW_MarketIntel.md`.
4. `KNOW/<Marca>/KNOW_<Persona>.md` — persona(s) da semana. Lado paciente: Rosa · Pedro. Lado família: Ana · Caio · **Cláudia** (`KNOW_FamiliarCodependente.md`). Oferta família: `KNOW_ProgramaFamilia.md`.
5. **Modelos a preencher:** `MODEL/MODEL_WEEK_Overview.md` · `MODEL/MODEL_STORIES.md` · `MODEL/MODEL_POST_Overview.md`.
6. `SKILL/SKILL_ComponentIndex.md` — lógica de capa (foto-first) para o campo "Capa" do POST_Overview.

---

## Processo

### 0. Carregar a lógica estratégica
Ler `STRATEGY_<Marca>.md` — governa todas as decisões abaixo (arco Hook → Profundidade → Resolução, 80/20, leis de tom).

### 1. Validar o tema na AGENDA
Confirmar tema da semana, pilar e persona(s). Se indefinido, propor com base em trends/insights.

### 2. Desenhar o arco da semana (`STRATEGY_<Marca>.md` §4)
- **Lado da semana (`lado:`):** paciente (Bill/app · Rosa·Pedro) ou família (Programa Família em Reconstrução / FER · Ana·Caio·Cláudia) — lado **interno** do Padrinho; define persona, oferta e tom (família = confidencialidade, sem julgamento). Ver `STRATEGY_<Marca>.md` §3.1.
- 1 tema central → **N ângulos** (1 por post) → posts nos dias do arco (Dom · Seg · Qua · Sex).
- **2 vozes** (ex.: 2 Rosa + 2 Pedro / 2 Ana + 2 Caio) — variação de persona dentro do mesmo tema.
- Função por dia: **Hook** (abertura) → **Profundidade** (dado/educacional) → **Resolução** (conexão + CTA suave).
- **Variedade de componentes (anti-repetição) — definir já aqui:** atribuir a cada post uma **forma dominante diferente** (matriz de rotação, `SKILL_ComponentSystem.md` § Variedade): statement-led · data+list-led · quote+foto-led · explainer-led. Variar também o **nº de slides** entre posts. Registrar a forma dominante + nº de slides em cada `POST_Overview`. Não deixar os 4 posts com o mesmo esqueleto.
- Marcar os **dados-âncora a verificar** (entram no gate `FACTS_Verified.md`, preenchido na Tactic).

### 3. Criar `WEEK_Overview.md`  (a partir de `MODEL/MODEL_WEEK_Overview.md`)
Salvar em `POSTS/<Marca>/WEEKxx_DDMMYY_Tema/WEEK_Overview.md`. Preencher: **lado** (paciente/família), tema-guarda-chuva, por que esta estratégia, lei de tom, **tabela dos posts** (arco), atomização (1 Blog-pilar por post), integridade de dados, conexão com marcas.

### 3b. Criar `STORIES_Suggestions.md`  (a partir de `MODEL/MODEL_STORIES.md`)
Salvar em `POSTS/<Marca>/WEEKxx_DDMMYY_Tema/STORIES_Suggestions.md`. Ideias de Stories que **apoiam o arco** da semana (enquete · caixa de perguntas · quote card · reshare · bastidores · contagem regressiva · caixa anônima). **Não vão mais no `WEEK_Overview`.**

### 4. Criar 1 `POST_Overview.md` por post  (a partir de `MODEL/MODEL_POST_Overview.md`)
Salvar em `POSTS/<Marca>/WEEKxx_DDMMYY_Tema/NN_DIA_AnguloPersona/POST_Overview.md`. Preencher cada campo: tema (o que é/não é), **lado** (paciente/família), persona única + voz, pilar, engine, hook, **dado-âncora (verificar)**, mensagem principal, CTA (share/save/story → app/Bill no paciente, grupo/FER na família), tom (lei aplicada), **capa foto-first** (`cover-c/d/e` + `image-query` em inglês), success metric, Bill.

---

## Validações (antes de passar p/ Tactic)

- [ ] `WEEK_Overview.md` existe e descreve o arco completo (Hook → Profundidade → Resolução).
- [ ] 1 `POST_Overview.md` por post, na pasta `NN_DIA_AnguloPersona/`.
- [ ] Cada post declara **uma** persona, **um** pilar, ângulo único, hook e CTA.
- [ ] Dados-âncora marcados como **(verificar)** — nunca número inventado.
- [ ] Capa com preferência por **foto** (`cover-c/d/e`); tipográfica só exceção.
- [ ] Respeita as Leis de Tom (`KNOW_BrandPositioning` § Leis de Tom).

---

## Saída

```
POSTS/<Marca>/WEEKxx_DDMMYY_Tema/
├── WEEK_Overview.md                    ← este agente
├── STORIES_Suggestions.md              ← este agente (Stories da semana)
└── NN_DIA_AnguloPersona/
    └── POST_Overview.md                ← este agente (1 por post)
```

**Mensagem ao time (Telegram):**
```
🎯 STRATEGY — WEEKxx [Tema]
Arco: [Hook→Profundidade→Resolução] · [N] posts · vozes: [personas]
✅ WEEK_Overview + STORIES + [N] POST_Overview criados
→ Próximo: AGENT_Tactic atomiza cada post a partir do Blog-pilar
```

---

## Referências

- `POSTS/<Marca>/STRATEGY_<Marca>.md` → lógica estratégica (fonte de verdade)
- `MODEL/MODEL_WEEK_Overview.md` · `MODEL/MODEL_STORIES.md` · `MODEL/MODEL_POST_Overview.md` → shells a preencher
- `KNOW/<Marca>/KNOW_EditorialPillars.md` → 5 pilares · `KNOW_<Persona>.md` → personas
- `SKILL/SKILL_ComponentIndex.md` → capas (foto-first)
- `POSTS/<Marca>/AGENDA_<Marca>.md` → temas/semana

**Próximo Agente:** AGENT_Tactic (atomiza cada post + preenche `FACTS_Verified.md`)
