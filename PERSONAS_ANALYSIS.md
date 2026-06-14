# Personas Analysis — Validação de Clusters (Dados Reais)

**Status:** 🟡 FASE 1 — Coleta de Dados Concluída | FASE 2 — Análise em Progresso  
**Data:** 2026-06-14 | **Dados:** Supabase (268 users) + Apify (857 posts competitors)

---

## 1️⃣ DADOS SUPABASE — 268 Usuários Ativos (2024+)

### Distribuição de `app_goal` (Intenção Primária)
```
Total Users: 268

✅ Com app_goal definido: ~227 (85%)
- maintain_sobriety:      51 users (19%)
- full_abstinence:        45 users (17%)
- monitor_progress:       40 users (15%)
- identify_triggers:      39 users (15%)
- reduce_control:         25 users (9%)
- healthy_habits:         14 users (5%)
- rebuild_relationships:  13 users (5%)

❌ Sem app_goal (null):    41 users (15%)
```

### Observações de `role`
- **user:** 267 (99.6%)
- **admin:** 1 (0.4%)

✅ **Insight Inicial:** Cluster 4 (Dependentes) está bem representado. Os 41 users com app_goal=null sugerem drop-off na onboarding pós-install.

---

## 2️⃣ DADOS APIFY — 857 Posts de 43 Contas (Instagram Competitors)

### Amostra de 5 Posts (primeiros resultados):
1. **Mind (joinmind.now)** — Burnout organizacional + NR-1 (26 likes)
   - Tema: Saúde mental no trabalho | Público: Profissionais / HR
   
2. **Mind (joinmind.now)** — Burnout como problema de design (24 likes)
   - Tema: Gestão de carreira / Liderança | Público: Líderes / Executivos
   
3. **SOS Sobriedade (sossobriedade)** — Abordagem multidisciplinar em recuperação (91 likes, 886 views)
   - Tema: Recuperação / Motivação | Público: Dependentes em recuperação
   - **Engagement:** Alto (RELEVANTE para @padrinho.app)
   
4. **Mind (joinmind.now)** — Burnout em líderes (11 likes)
   - Tema: Saúde mental executiva | Público: C-Suite
   
5. **Mind (joinmind.now)** — Mind Summit 2026 com Sonja Lyubomirsky (1 like)
   - Tema: Evento / Psicologia Positiva | Público: Profissionais interessados

### Temas Identificados nos 857 Posts:
- **Burnout & Saúde Mental no Trabalho** (frequente, alto engagement)
- **Recuperação & Sobriedade** (moderado engagement, alta relevância)
- **Liderança & Gestão Emocional** (consistente)
- **Psicologia Positiva / Bem-estar** (menor volume)

✅ **Insight:** Há grande volume de conteúdo sobre saúde mental corporativa (Mind, etc.) MAS pouco conteúdo específico sobre **recuperação de sobriedade para dependentes** (exceto SOS Sobriedade). Oportunidade de diferenciação para @padrinho.app.

---

## 3️⃣ ANÁLISE DE PERSONAS ATUAIS vs. DADOS

### Persona 1: **Rosa Equilibrista** (Dependente, 25F, Instagram-native)
**Validação com Dados:**
- ✅ `maintain_sobriety` (51 users) + `identify_triggers` (39 users) = 90 users → Cluster sólido
- ✅ Content type: Motivação + Triggers (alinhado com SOS Sobriedade, 91 likes / 886 views)
- ✅ Plataforma: Instagram é dominante (Apify dataset = 857 posts IG)
- 🟡 Idade 25F: Dados Supabase não têm demographic info detalhado → **PENDENTE validar com Insightfulpipe**

**Status:** 🔴 A VALIDAR (Behavioral patterns confirmados, demographics em aberto)

---

### Persona 2: **Ana Mae Protetora** (Familiar, 40F, Facebook/YouTube)
**Validação com Dados:**
- ⚠️ `role` no Supabase está sempre = "user" ou "admin" (nenhum campo de "familiar")
- ❌ Nenhum campo `app_goal` explícita para "support a family member"
- ❓ Não há identificação de familiares nos primeiros 268 users

**Status:** 🔴 CRITICAMENTE NÃO VALIDADO (Falta coluna explicit "I'm supporting a family member" na onboarding)

**Ação Necessária:** 
- Verificar se Familiares campaign (Jun 2026) já trouxe dados
- Verificar se há coluna separada em Supabase para familia_target ou similar
- Se não existe, criar coluna `user_role` com opções: "dependent", "supporter", "admin"

---

### Persona 3: **Pedro Autônomo** (Dependente, 31M, desktop-first, tech)
**Validação com Dados:**
- ✅ `full_abstinence` (45 users, 17%) é sub-grupo identificável
- ✅ `reduce_control` (25 users, 9%) alinha com "harm reduction mindset"
- 🟡 Desktop-first + tech-savvy: Não há dados de device/platform no Supabase primário
- 🟡 Idade 31M: Sem demographic split no dataset atual

**Status:** 🟡 PARCIALMENTE VALIDADO (Goals & behaviors OK | Device/demographics faltando)

---

### Persona 4: **Caio Filho** (Amplifier, Familiar que Apoia)
**Validação com Dados:**
- ⚠️ Mesma questão de Ana Mae: sem coluna explícita em Supabase
- ✅ Campaign Familiares (Android + iOS) está ativa desde Jun 2026
- ❓ Mas nenhum user ainda reportou `app_goal = "support_family"` ou similar

**Status:** 🔴 NÃO VALIDADO (Campaign recém-lançada; aguardando dados de usuários)

---

## 4️⃣ DESCOBERTA DE NOVOS CLUSTERS

### Potencial Cluster 5: **"Help Seekers"** (Usuários com app_goal=null)
- 41 users (15%) não definiram intenção explícita
- Podem ser:
  - **Early explorers:** Baixa intenção | Alta curiosidade
  - **Overwhelmed users:** Entraram mas não conseguiram escolher goal
  - **Mobile-only installs:** Drop-off na onboarding (confirmado via Clarity: Install → Account = 9% before Google Sign-In)

**Segmentação sugerida:**
- Fazer re-engagement campaign com esses 41 users
- Testar nova onboarding: "Pick your journey" (visual + simpler)
- Rastrear via Clarity se drop-off está em CTA button ou form

---

## 5️⃣ RECOMENDAÇÕES IMEDIATAS

### 🔴 BLOCKERS (Fase 2 — Crítico)
1. **Supabase:** Adicionar coluna `user_role` com enum: dependent | supporter | admin
   - Query Supabase para contar users por novo role
   - Validar se Familiares campaign (Jun 2026) gerou supporters

2. **Insightfulpipe:** Puxar Meta/Google Ads demographics
   - Age distribution por campaign
   - Gender split
   - Location concentration

3. **Validação de Drop-off:** Cruzar Clarity + Supabase
   - Dos 41 users com app_goal=null, quantos estão < 24h na conta?
   - Quantos fizeram login repetido?

### 🟡 REFINEMENTS (Fase 2 — Desejável)
1. Refinar Rosa (25F) com dados de device/platform preference
2. Refinar Pedro (31M) com device type (desktop vs mobile)
3. Criar sub-personas baseadas em `reduce_control` (harm reduction mindset vs abstinence-first)

### 🟢 OPORTUNIDADES (Fase 2 — Background)
1. **GEO clustering:** Estão usuários concentrados em estados específicos? São Paulo dominante?
2. **Retention by goal:** Qual app_goal tem melhor retention / daily active?
3. **Caio Activation:** Quando Familiares users atingem 100+ count, criar Caio sub-persona com dados reais

---

## 6️⃣ PRÓXIMA SESSÃO

- [ ] Executar queries Supabase para `user_role` + `app_goal` cross-tab
- [ ] Insightfulpipe: Pull Meta Ads demographics by campaign
- [ ] Clarity: Session analysis dos 41 null-goal users
- [ ] Cruzar dados de 3 fontes em artifact interativo

**Blocker Status:** 🟡 Aguardando coluna `user_role` em Supabase para validar Familiares personas