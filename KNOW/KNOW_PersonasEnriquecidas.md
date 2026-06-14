# Personas Enriquecidas — Dados Reais (Supabase 268 Users + Apify Benchmarks)

**Status:** ✅ FASE 1 COMPLETA | Data: 2026-06-14  
**Fonte:** Supabase (268 users) + Apify (857 posts de competitors)

---

## 👤 PERSONA 1: ROSA EQUILIBRISTA (Dependente, 25F, Instagram-native)

### Dados Supabase
- **Base:** ~90 users (maintain_sobriety 51 + identify_triggers 39)
- **Goals dominantes:** 
  - maintain_sobriety (19% do total)
  - identify_triggers (12% do total)
- **Atividade:** 79 dias médio | 16 usuarios ativos últimos 30d
- **Engagement:** Mantém consistência alta

### Dados Comportamentais
- **Foco:** Alcançar sobriedade + evitar recaídas
- **Jornada:** "Preciso manter a sobriedade e entender meus gatilhos"
- **Timeline:** ~2.5 meses de atividade média

### Insight Competitivo (Apify)
- **SOS Sobriedade** (sossobriedade): 91 likes, 886 views em post sobre "abordagem multidisciplinar"
- **Themes:** Motivação + Recuperação (relevante para Rosa)
- **Engagement rate:** Alta (video content mais engajante)
- **Gap:** Pouco conteúdo Instagram sobre "identificar triggers" (oportunidade @padrinho.app)

### Copy/Content Strategy para Rosa
**Pilares:** Motivação diária + Ferramentas práticas + Comunidade que entende  
**Tone:** Conversacional, esperançoso, sem julgamentos  
**Formatos:** Carrosel (dicas), Reels (histórias curtas), Stories (check-in diário)

**Exemplo de Copy:**
> "Hoje você consegue. E se um gatilho aparecer? A gente tá aqui pra ajudar."

---

## 👨‍💼 PERSONA 2: PEDRO AUTÔNOMO (Dependente, 31M, Desktop-first, Tech-savvy)

### Dados Supabase
- **Base:** ~70 users (full_abstinence 49 + reduce_control 34)
- **Goals dominantes:**
  - full_abstinence (18% do total) — **High commitment**
  - reduce_control (13% do total) — **Pragmatic approach**
- **Atividade:** 80 dias médio (abstinence) | 57 dias (reduce_control)
- **Retenção:** Maior entre dependentes

### Dados Comportamentais
- **Foco:** Abstinência total OU controle gerenciado
- **Jornada:** "Preciso decidir minha estratégia e cumprir"
- **Mindset:** Racional, data-driven, orientado a resultados

### Insight Competitivo (Apify)
- **Mind (joinmind.now):** Burnout + Gestão executiva (24-26 likes)
- **Themes:** Liderança, saúde mental no trabalho, decisões difíceis
- **Gap:** Foco em saúde corporativa, não em recuperação de dependência
- **Oportunidade:** Pedro quer "ferramentas inteligentes" para gerir sua recuperação

### Copy/Content Strategy para Pedro
**Pilares:** Dados + Ciência + Autonomia + Progresso mensurável  
**Tone:** Direto, factual, respeitoso à inteligência  
**Formatos:** Carousel (dados/estatísticas), Blog posts (deep-dives), Guias práticos

**Exemplo de Copy:**
> "A abordagem de 'reduzir' ou 'zero'? Quer entender os dados de ambas?"

---

## 👩‍🤝‍👨 PERSONA 3: ANA MAE PROTETORA (Supporter, 40F, Facebook/YouTube) — AINDA SEM DADOS

### Status Atual
- **Coluna `support_recipient`:** Vazia (aguardando primeiro supporter registrado)
- **Hipótese:** Está no Familiares campaign (launched Jun 2026) mas ainda sem conversão de onboarding
- **Placeholder:** Usando padrão de Caio (amplifier) até ter dados reais

### Dados Esperados (quando `support_recipient` tiver registros)
- Demographics: 40F, localização (São Paulo likely)
- Platform preference: Facebook/YouTube (menos Instagram, mais video longo)
- Goals: rebuild_relationships, monitor_progress, emotional support
- Jornada: "Como ajudar alguém que amo?"

### Copy/Content Strategy para Ana Mae (Placeholder)
**Pilares:** Amor + Suporte emocional + Limites saudáveis  
**Tone:** Empático, prático, não-julgador  
**Formatos:** Videos longos (YouTube), Community posts (Facebook), Stories de esperança

**Exemplo de Copy:**
> "Cuidar de quem amamos não significa perder a gente mesma."

---

## 🚀 PERSONA 4: CAIO FILHO (Amplifier, Supporter, 15-20% Budget)

### Status Atual
- **Coluna `support_recipient`:** Vazia (Caio é "amplifier" teórico, não user real ainda)
- **Campaign Active:** Familiares (Android + iOS) com copy "Apoie quem você ama"
- **Timeline:** Lançado Jun 2026 → aguardando conversões de reais supporters

### Dados Esperados (quando `support_recipient` ≥ 50)
- Demographics: Diverse (filho, cônjuge, amigo proche de dependente)
- Motivation: Ajudar + não sabia como + descobriu app
- Behavior: High engagement (querem fazer diferença)
- Platform: Todos (orgânico em redes)

### Copy/Content Strategy para Caio (Live)
**Pilares:** "Você não está sozinho nisso" + Ação concreta + Comunidade  
**Tone:** Solidário, inspirador, prático  
**Formatos:** Testimonials (stories reais), How-to (steps to help), Community showcase

**Exemplo de Copy:**
> "Seu amigo está em recuperação. Aqui, você sabe exatamente como apoiar."

---

## 📊 DESCOBERTA: NOVO PADRÃO DE USUÁRIOS

### Cluster: "Help Seekers" (37 users, 14%)
- app_goal = NULL (não definiram objetivo explícito)
- Recente: 19 nos últimos 30 dias
- Comportamento: Exploratory, low commitment
- **Ação:** Re-engagement campaign com copy "Qual é seu passo primeiro?"

---

## 🎯 RECOMENDAÇÕES IMEDIATAS

### 🟢 VALIDADO
✅ Rosa Equilibrista — 90 users, engagement alto, Instagram-fit  
✅ Pedro Autônomo — 70 users, retention forte, tech-savvy  
✅ Help Seekers — 37 users, re-engagement opportunity

### 🟡 AGUARDANDO DADOS REAIS
⏳ Ana Mae Protetora — Familiares campaign ativo, 0 conversões yet  
⏳ Caio Filho — Amplifier teórico, aguardando support_recipient column

### 🔴 AÇÃO BLOCKERS
- `support_recipient` column não foi criada em Supabase
- Insightfulpipe Instagram desabilitado (permissões)
- Google Ads Addiction Services cert ainda não requirida

---

## 📋 PRÓXIMA SESSÃO

- [ ] Criar coluna `support_recipient` em Supabase
- [ ] Validar Familiares campaign (Android + iOS) performance
- [ ] Atualizar personas com dados reais quando support_recipient ≥ 10
- [ ] Refinar sub-personas (abstinence-first vs harm-reduction para Pedro)
- [ ] A/B test onboarding copy: "What's your goal?" vs "What's your role?"

**Status Final:** 2 personas validadas + 2 em espera = clusters confirmados.
