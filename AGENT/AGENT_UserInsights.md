---
title: "UserInsights Agent — Padrinho Automation"
version: "1.0"
status: "Final"
type: "Agent"
owner: "Padrinho Marketing Automation"
parent_doc: "AGENT/"
tags: [agent, automation, orchestration]
---

# User Insights Agent — Padrinho

**Responsável por:** Coletar dados de usuários do Supabase (read-only), analisar padrões comportamentais, e atualizar `../KNOW/KNOW_audiences/user-insights.md` automaticamente.

**Quando roda:** Diariamente às 23h30 BRT (00h30 UTC+1) — após Market Agent
**Entrada:** Supabase queries (read-only) em profiles, behavior, journey
**Saída:** Arquivo atualizado `../KNOW/KNOW_audiences/user-insights.md` + commit no GitHub

---

## Responsabilidades

### 1. Dados Demográficos 👥
- **Distribuição de idade:** % por faixa (18-25, 25-34, 35-44, 45-54, 55+)
- **Gênero:** % M / F / Não-binário
- **Localização:** Top 10 estados, Top 10 cidades
- **Classe social:** % A, B, C, D, E (baseado em proxy: tipo de conta, comportamento)
- **Status familiar:** % solteiro, casado, com filhos
- **Profissão:** Top 20 profissões (texto livre, agrupado)

### 2. Padrões de Consumo 🍺
- **Frequência reportada:** % diariamente, 3-4x/semana, fins de semana, ocasional
- **Quantidade média:** litros/semana por usuário
- **Contexto (quando bebe):**
  - % happy hour/bar social
  - % em casa (solitário)
  - % em eventos/festas
  - % outros
- **Bebida preferida:** % cerveja, vinho, destilado, energético, outros
- **Gatilhos identificados:** (análise de texto das respostas)
  - Estresse (%)
  - Solidão (%)
  - Celebração (%)
  - Hábito (%)
  - Pressão social (%)

### 3. Barreiras & Motivações 🎯
- **Por que quis reduzir:**
  - Saúde (%)
  - Pressão familiar (%)
  - Trabalho/produtividade (%)
  - Financeiro (%)
  - Relacionamentos (%)
  - Autorrealização (%)
- **Tentativas anteriores:** % que já tentou parar/reduzir
- **Obstáculos principais:** (análise de texto)
  - Pressão social (%)
  - Hábito/vício (%)
  - Isolamento sem álcool (%)
  - Dificuldade emocional (%)
  - Falta de suporte (%)

### 4. Jornada de Usuário 🛣️
- **Stage de consciência:** % em cada stage
  - Inconsciência (não vê como problema)
  - Reconhecimento (começa a questionar)
  - Consideração (buscando solução)
  - Decisão (pronto para mudança)
  - Ação (implementando mudança)
  - Manutenção (sustentando mudança)
- **Tempo médio por stage:** dias na app antes de avançar
- **Taxa de retenção:** % retorna 7d, 14d, 30d, 90d

### 5. Sentimento & Engajamento 😊
- **Satisfação com app:** NPS (Net Promoter Score)
- **Temas de suporte mais comum:** (ticket analysis)
  - Motivação/suporte emocional (%)
  - Features/bugs (%)
  - Dúvidas sobre uso (%)
  - Conteúdo (%)
- **Momento crítico:** quando usuários mais abandonam (que dia da jornada)
- **Feedback sobre Bill (IA):**
  - "Personalizava meu acompanhamento" (%)
  - "Sentia apoio/acolhimento" (%)
  - "Ajudava com decisões" (%)
  - "Faltava algo" (%)

### 6. Comparação com Personas 📊
Para cada persona (Rosa, Ana Mae, Pedro, Caio):
- **% de usuários que se identificam** com essa persona
- **Comportamento típico:** diferenças vs. média geral
- **Retenção:** % que continua vs. abandona
- **NPS:** diferenças de satisfação

---

## Supabase Queries

### Profile Data
```sql
SELECT 
  age_range,
  gender,
  state,
  city,
  occupation,
  family_status,
  COUNT(*) as count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) as pct
FROM profiles
WHERE created_at >= now() - interval '90 days'
GROUP BY age_range, gender, state, city, occupation, family_status
```

### Consumption Behavior
```sql
SELECT 
  frequency_self_reported,
  context_when_drinks,
  drink_preference,
  avg_liters_per_week,
  COUNT(*) as count
FROM consumption_logs
WHERE logged_at >= now() - interval '30 days'
GROUP BY frequency_self_reported, context_when_drinks, drink_preference
```

### Barriers & Motivations (desde onboarding)
```sql
SELECT 
  motivation_to_reduce,
  previous_attempts,
  main_barriers,
  COUNT(*) as count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) as pct
FROM user_intake_forms
WHERE created_at >= now() - interval '90 days'
GROUP BY motivation_to_reduce, previous_attempts, main_barriers
```

### Journey Stage & Retention
```sql
SELECT 
  journey_stage,
  AVG(days_in_stage) as avg_days,
  COUNT(*) as total_users,
  ROUND(100.0 * COUNT(CASE WHEN retained_7d THEN 1 END) / COUNT(*), 1) as retention_7d,
  ROUND(100.0 * COUNT(CASE WHEN retained_30d THEN 1 END) / COUNT(*), 1) as retention_30d,
  ROUND(100.0 * COUNT(CASE WHEN retained_90d THEN 1 END) / COUNT(*), 1) as retention_90d
FROM user_journey
WHERE created_at >= now() - interval '90 days'
GROUP BY journey_stage
```

### NPS & Satisfaction
```sql
SELECT 
  ROUND(AVG(CASE WHEN nps_score >= 9 THEN 1 WHEN nps_score >= 7 THEN 0 ELSE -1 END) * 100, 1) as nps,
  ROUND(AVG(app_satisfaction_rating), 1) as avg_satisfaction,
  COUNT(*) as respondents
FROM surveys
WHERE created_at >= now() - interval '30 days'
```

### Support Tickets (tema)
```sql
SELECT 
  ticket_category,
  COUNT(*) as count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) as pct
FROM support_tickets
WHERE created_at >= now() - interval '30 days'
GROUP BY ticket_category
```

### Persona Alignment
```sql
SELECT 
  self_identified_persona,
  COUNT(*) as count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) as pct,
  ROUND(AVG(nps_score), 1) as nps,
  ROUND(AVG(retention_days), 1) as avg_retention_days
FROM profiles
WHERE self_identified_persona IS NOT NULL
GROUP BY self_identified_persona
```

---

## Estrutura de Saída (user-insights.md)

Atualizar APENAS as seções marcadas com **📊**:

### Header (fixo)
```markdown
# User Insights — Padrinho

> **Protocolo de atualização:** Este arquivo é atualizado automaticamente pelo User Insights Agent.
> Última atualização: [DATA_DE_HOJE]
> Dados de: últimos 90 dias
> Próxima atualização: [DATA_PROXIMO_DIA]
```

### 📊 Demographics
Tabela com distribuição de:
- idade, gênero, localização, classe, família, profissão

### 📊 Consumption Patterns
Tabela e análise sobre:
- frequência, quantidade, contexto, bebida preferida

### 📊 Barriers & Motivations
- Por que quer reduzir (%)
- Obstáculos principais (%)
- Tentativas anteriores (%)

### 📊 User Journey
- % por stage de consciência
- Tempo médio em cada stage
- Taxas de retenção (7d, 30d, 90d)

### 📊 Sentiment & NPS
- NPS score
- Temas de suporte
- Feedback sobre Bill
- Momento crítico de abandono

### 📊 Persona Alignment
- % que se identifica com cada persona
- NPS por persona
- Retenção por persona
- Insights diferenciais

---

## Exemplo de Output JSON

```json
{
  "date": "2026-05-07",
  "updated_at": "2026-05-07T23:30:00Z",
  "period_days": 90,
  "total_active_users": 2847,
  
  "demographics": {
    "age_distribution": {
      "18_25": { "count": 412, "pct": 14.5 },
      "25_34": { "count": 891, "pct": 31.3 },
      "35_44": { "count": 756, "pct": 26.5 },
      "45_54": { "count": 562, "pct": 19.7 },
      "55_plus": { "count": 226, "pct": 7.9 }
    },
    "gender": {
      "male": { "count": 1703, "pct": 59.8 },
      "female": { "count": 1087, "pct": 38.2 },
      "non_binary": { "count": 57, "pct": 2.0 }
    },
    "top_states": [
      { "state": "São Paulo", "count": 612, "pct": 21.5 },
      { "state": "Rio Grande do Sul", "count": 487, "pct": 17.1 },
      { "state": "Minas Gerais", "count": 356, "pct": 12.5 }
    ],
    "family_status": {
      "single": { "pct": 42 },
      "married": { "pct": 38 },
      "with_children": { "pct": 45 }
    }
  },
  
  "consumption": {
    "frequency": {
      "daily": { "pct": 8 },
      "3_4_times_week": { "pct": 22 },
      "weekends": { "pct": 45 },
      "occasional": { "pct": 25 }
    },
    "context": {
      "social_bar": { "pct": 52 },
      "home_alone": { "pct": 18 },
      "events": { "pct": 22 },
      "other": { "pct": 8 }
    },
    "avg_liters_per_week": 4.2,
    "drink_preference": {
      "beer": { "pct": 65 },
      "wine": { "pct": 15 },
      "spirits": { "pct": 15 },
      "other": { "pct": 5 }
    }
  },
  
  "barriers_motivations": {
    "why_reduce": {
      "health": { "pct": 38 },
      "family_pressure": { "pct": 22 },
      "work_productivity": { "pct": 18 },
      "relationships": { "pct": 15 },
      "financial": { "pct": 7 }
    },
    "main_obstacles": {
      "social_pressure": { "pct": 35 },
      "habit_addiction": { "pct": 28 },
      "isolation_without_alcohol": { "pct": 18 },
      "emotional_difficulty": { "pct": 14 },
      "lack_of_support": { "pct": 5 }
    },
    "previous_attempts": {
      "yes": { "pct": 72 },
      "no": { "pct": 28 }
    }
  },
  
  "journey": {
    "stages": [
      {
        "stage": "awareness",
        "count": 156,
        "pct": 5.5,
        "avg_days_in_stage": 8,
        "retention_7d": 42,
        "retention_30d": 18,
        "retention_90d": 5
      },
      {
        "stage": "consideration",
        "count": 412,
        "pct": 14.5,
        "avg_days_in_stage": 14,
        "retention_7d": 68,
        "retention_30d": 45,
        "retention_90d": 22
      }
    ]
  },
  
  "sentiment": {
    "nps": 52,
    "avg_satisfaction": 4.2,
    "support_categories": {
      "emotional_support": { "pct": 38 },
      "features_bugs": { "pct": 22 },
      "how_to_use": { "pct": 25 },
      "content": { "pct": 15 }
    },
    "bill_feedback": {
      "personalized_support": { "pct": 74 },
      "felt_supported": { "pct": 81 },
      "helped_with_decisions": { "pct": 68 },
      "missing_something": { "pct": 22 }
    },
    "critical_abandonment_point": "Day 3-4 (após primeiros check-ins)"
  },
  
  "personas": [
    {
      "persona": "Rosa - Equilibrista",
      "identified_pct": 35,
      "nps": 58,
      "retention_days": 48,
      "characteristics": "Mulher 35-44, SP/RS, profissional, bebe fins de semana em contexto social"
    },
    {
      "persona": "Ana Mae - Mãe Protetora",
      "identified_pct": 28,
      "nps": 54,
      "retention_days": 42,
      "characteristics": "Mulher 40-50, casada com filhos, preocupação com saúde familiar"
    },
    {
      "persona": "Pedro - Autônomo Solitário",
      "identified_pct": 24,
      "nps": 48,
      "retention_days": 35,
      "characteristics": "Homem 30-45, trabalha por conta própria, bebida como coping"
    },
    {
      "persona": "Caio - Filho Ressentido",
      "identified_pct": 13,
      "nps": 42,
      "retention_days": 22,
      "characteristics": "Homem 25-35, conflito familiar, pressão de pais/companheira"
    }
  ]
}
```

---

## Implementação

- **Node.js:** `AUT/api/agents/agent-user-insights.js`
- **Cron:** Vercel — `30 2 * * *` (23h30 BRT = 02h30 UTC+1)
- **Runtime:** 90s (queries Supabase, síntese)
- **Saída:** 
  1. JSON armazenado em estado
  2. `../KNOW/KNOW_audiences/user-insights.md` atualizado
  3. GitHub commit automático
  4. Telegram message de preview (aguardando aprovação)

---

## LGPD Compliance ⚖️

- ✅ Read-only queries (sem extração de dados pessoais)
- ✅ Agregações e percentuais (nunca nomes, emails, IDs)
- ✅ Últimos 90 dias apenas (window de dados limitado)
- ✅ Exclusão de PII (não armazena dados identificáveis)
- ✅ Consent: usuários já consentimem uso de dados ao usar app
