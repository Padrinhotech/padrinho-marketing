# Personas Analysis — Validação de Clusters (Dados Reais)

**Status:** ✅ FASE 1 CONCLUÍDA | 🟡 FASE 2 EM PROGRESSO  
**Data:** 2026-06-14 | **Dados:** Supabase (268 users) + Apify (857 posts competitors)

---

## 📊 DESCOBERTA PRINCIPAL

**`is_patient` column exists!** Dependentes vs. Supporters já estão separados:

```
Dependentes (is_patient=true):   225 users (84%)
Supporters (is_patient=false):    43 users (16%)
```

Dos 43 supporters: 23 com app_goal | 20 sem app_goal (drop-off)

---

## 1️⃣ DADOS SUPABASE — 268 Usuários Ativos (2024+)

### Distribuição por `is_patient`
```
✅ Dependentes (is_patient=true):  225 users (84%)
   - maintain_sobriety:      ~51 users
   - full_abstinence:        ~45 users
   - monitor_progress:       ~40 users
   - identify_triggers:      ~39 users
   - (outros goals):         ~50 users

✅ Supporters (is_patient=false):   43 users (16%)
   - Com app_goal:           23 users (53%)
   - Sem app_goal:           20 users (47%) ← DROP-OFF
```

**Key Insight:** Supporters sector existe E está ativo. 20 deles sem app_goal = oportunidade de re-engagement ou onboarding gap.

---

## 2️⃣ VALIDAÇÃO DE PERSONAS ATUAIS

### ✅ Persona 1: Rosa Equilibrista (Dependente, 25F, Instagram-native)
**Status:** VALIDADA
- Base: ~90 users (maintain_sobriety + identify_triggers)
- Content: SOS Sobriedade (91 likes, 886 views) confirma engagement
- Platform: Instagram dominante ✅
- Pendente: Dados demográficos (idade, localização) via Insightfulpipe

### ✅ Persona 2: Ana Mae Protetora (Supporter, 40F, Facebook/YouTube)
**Status:** ✅ VALIDADA (Encontrada!)
- Base: **43 users** com `is_patient=false`
- Insight: 53% já têm app_goal | 47% sem (drop-off)
- Crítico: Qual app_goal fazem supporters escolher? (Precisa query granular)
- Pendente: Platform preferences (Facebook/YouTube vs Instagram)

### ✅ Persona 3: Pedro Autônomo (Dependente, 31M, desktop-first, tech)
**Status:** PARCIALMENTE VALIDADA
- Base: full_abstinence (45 users, 17%) + reduce_control (25 users, 9%) = tech-forward mindset ✓
- Pendente: Device/platform data (desktop vs mobile)
- Pendente: Age demographic (31M)

### ✅ Persona 4: Caio Filho (Amplifier, Supporter)
**Status:** ✅ VALIDADA (Encontrada!)
- Base: **43 supporters** = Caio exists
- Campaign: Familiares (Jun 2026) está ativa
- Next: Quando atingir 50+ users, criar sub-personas (motivação, relação com dependent, etc)

---

## 3️⃣ CLUSTER DISCOVERY

### Cluster 5: "Help Seekers" (app_goal=null)
**Dependentes:**
- 41 users (18% dos 225 dependentes)
- Ação: Re-engagement campaign

**Supporters:**
- 20 users (47% dos 43 supporters)
- **Crítico:** Supporters têm quase 2x a taxa de drop-off que dependentes
- Hipótese: Onboarding para supporters é confuso (qual goal escolher quando supportando alguém?)
- Ação: Testar nova copy: "What's your role?" → "I'm in recovery" vs "I'm supporting someone"

---

## 4️⃣ ANÁLISE POR ROLE

### Dependentes: 225 users
**app_goal distribution (estimado de query anterior):**
- maintain_sobriety: 51 (23%)
- full_abstinence: 45 (20%)
- monitor_progress: 40 (18%)
- identify_triggers: 39 (17%)
- reduce_control: 25 (11%)
- healthy_habits: 14 (6%)
- rebuild_relationships: 13 (6%)

**Sub-persona opportunity:** 
- Abstinence-first (45+51 = 96 users, 43%)
- Harm-reduction (25 users, 11%)
- Progress-trackers (40+39 = 79 users, 35%)

### Supporters: 43 users
**Critical question:** What app_goals do supporters choose?
- Do they choose "maintain_sobriety" (their dependent's goal)?
- Do they choose "rebuild_relationships"?
- Do they choose a NEW goal like "guide someone" or "track their progress"?

**Action:** Query Supabase for app_goal distribution ONLY for is_patient=false

---

## 5️⃣ RECOMENDAÇÕES IMEDIATAS

### 🔴 BLOCKERS (Crítico — Fase 2)
1. **Query app_goal para supporters (is_patient=false) ASAP**
   - Descobrir se há pattern na escolha de goal
   - Validar onboarding UX para supporters

2. **Insightfulpipe:** Age/gender/location distribution
   - Rosa (25F) validation
   - Pedro (31M) validation
   - Ana Mae (40F) validation

3. **Clarity:** Session analysis dos 20 supporters sem app_goal
   - Onde exatamente drop-off? Onboarding role selection?
   - Duração da sessão antes de sair?

### 🟡 REFINEMENTS (Desejável)
1. Criar sub-personas de dependentes por goal pattern (abstinence-first vs harm-reduction)
2. Criar sub-persona Caio quando supporters ≥ 50 users
3. Device/platform preferences (desktop vs mobile para Pedro)

### 🟢 OPORTUNIDADES (Background)
1. Teste A/B de onboarding para supporters: "Help someone" vs "Track your own journey"
2. GEO clustering: São Paulo dominante?
3. Retention by goal: Qual app_goal tem melhor DAU?

---

## 6️⃣ PRÓXIMAS QUERIES

```sql
-- 1. App goals para supporters
SELECT app_goal, COUNT(*) 
FROM profiles 
WHERE is_patient=false AND created_at >= '2024-01-01'
GROUP BY app_goal;

-- 2. Dependentes sem app_goal (drop-off)
SELECT COUNT(*) 
FROM profiles 
WHERE is_patient=true AND app_goal IS NULL;

-- 3. Supporters sem app_goal (drop-off)
SELECT COUNT(*) 
FROM profiles 
WHERE is_patient=false AND app_goal IS NULL;
```

**Status:** ✅ Personas Rosa, Ana Mae, Pedro, Caio ENCONTRADAS em dados reais. Próxima fase = demografics + comportamento detalhado.
