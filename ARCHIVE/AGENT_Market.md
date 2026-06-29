> ⚠️ **DEPRECATED (2026 H2).** Documenta a automação Node/Vercel/cron/Telegram já removida. Mantido só como referência histórica — não usar no workflow atual (cascata manual via MCP).

---
title: "Market Agent — Padrinho Automation"
version: "1.0"
status: deprecated
type: "Agent"
owner: "Padrinho Marketing Automation"
parent_doc: "AGENT/"
tags: [agent, automation, orchestration]
---

# Market Agent — Padrinho

**Responsável por:** Coletar dados de mercado, tendências, comportamento de consumo, paisagem competitiva e atualizar `../KNOW/KNOW_strategy/KNOW_MarketContext.md` automaticamente.

**Quando roda:** Diariamente às 23h BRT (00h UTC+1) — após Insights Agent
**Entrada:** MCPs de trend data + APIs externas
**Saída:** Arquivo atualizado `../KNOW/KNOW_strategy/KNOW_MarketContext.md` + commit no GitHub

---

## Responsabilidades

### 1. Coletar Dados de Consumo 🍺
- **Brasil:**
  - Consumo per capita (litros/ano)
  - % populacao que consome (em excesso, moderado, não consome)
  - Internações e óbitos atribuíveis ao álcool
  - Tendências recentes (mudanças YoY)
  
- **Fonte preferida:** CISA (Comissão Nacional de Autoavaliação e Normas)
  - Site: cisa.org.br/panorama
  - Updates anuais (Panorama CISA)
  - Também: Datasus, IBGE, Ipsos

### 2. Tendências de Consumo 📈
- Mudanças em padrões de beber (FDS vs. solitário)
- Geração (Gen Z abstenção, millennial mudanças)
- Canais de consumo (happy hour vs. delivery vs. solitário)
- Searchvolume/interesse por termos-chave (Google Trends)
  - "reduzir álcool"
  - "parar de beber"
  - "controlar consumo"
  - "alcoolismo"

### 3. Geografia Prioritária 🗺️
- Atualize % consumo excessivo por estado
- Priorize: RS, MS, SP, SC, RJ, DF
- Compare vs. média nacional

### 4. Análise Competitiva ⚔️
- **Sunflower:**
  - MAUs (mensal), funding, novos features
  - Preço, mercados novos
  - Reviews e sentimento público
  
- **Reframe:**
  - Tração global, preço, expansão BR
  - Reviews/satisfação
  
- **I Am Sober + outros:**
  - Downloads, receita estimada
  - Pontos fortes/fracos

### 5. Comportamento do ICP 👤
- Rosa (equilibrista): mudanças de consumo, pressão social
- Ana Mae (mãe): impacto familiar, culpa
- Pedro (autônomo): isolamento, autocuidado
- Caio (filho): influência familiar, conflito

---

## Estrutura de Saída (KNOW_MarketContext.md)

Atualizar APENAS as seções marcadas com **📊**:

### Header (fixo)
```markdown
# Market Context — Padrinho

> **Protocolo de atualização:** Este arquivo deve ser atualizado mensalmente.
> Última atualização: [DATA_DE_HOJE]
> Próxima atualização: [DATA_PROXIMO_MES]
```

### 📊 Dados de Consumo
Tabela com:
| Indicador | Valor | Ano | Fonte |
|---|---|---|---|
| Consumo per capita | X litros/ano | YYYY | FONTE |
| Consumo excessivo (população) | X% | YYYY | FONTE |
| Não bebem | X% | YYYY | FONTE |
| Internações | X.XXX | YYYY | Datasus |
| Óbitos | X.XXX | YYYY | Datasus |

### Tendências Recentes
- "Mudança X: +Y% em YYYY vs. ZZZZ"
- "Gen Z: abstenção de X% (era Y%)"
- "Consumo solitário cresceu X pp"

### 📊 Geografia
Tabela com % consumo excessivo por estado (top 10)

### 📊 Concorrentes
Para cada um (Sunflower, Reframe, I Am Sober):
- Tração (MAUs, downloads, receita)
- Posicionamento
- Fraqueza
- Nossa contra-narrativa

---

## Dados & MCPs

### CISA Panorama
- **URL:** https://cisa.org.br/panorama
- **Frequência:** Anual (publicado ~Q2)
- **O que extrair:**
  - consumo_per_capita (litros/ano)
  - consumo_excessivo_pct (% população)
  - internacoes (n absoluto)
  - obitos (n absoluto)
  - tendencias (array de mudanças)

### Google Trends
- **Termos:** "reduzir álcool", "parar de beber", "alcoolismo", "ajuda dependência"
- **Geog:** Brasil (filtrar por estado)
- **Métrica:** Volume de search 0-100 (normalizado)

### App Annie / Sensor Tower (competitor data)
- **Apps:** Sunflower, Reframe, I Am Sober, Nomo, Dry
- **Métricas:** 
  - MAU/DAU trends
  - Rating + reviews count
  - Estimativa de receita (baseada em downloads)
  - Countries de lançamento

### Sentimento Público
- Twitter/X: buscar mentions de "sobriedade", "parar álcool"
- Reddit: r/stopdrinking (português), grupos de sobriedade
- Blogs de saúde/wellness: novos conteúdos sobre redução

---

## Validação & Approval

1. **Agent executa:** Coleta dados, sintetiza
2. **Output:** JSON com dados estruturados
3. **Human approval:** Revisar em Telegram
   - ✅ Aprovar → Commit para GitHub
   - ❌ Rejeitar → Agent refaz (manual source correction)

---

## Exemplo de Output JSON

```json
{
  "date": "2026-05-07",
  "updated_at": "2026-05-07T23:00:00Z",
  "consumption_data": {
    "per_capita_liters": 7.7,
    "per_capita_year": 2024,
    "excessive_consumption_pct": 15,
    "excessive_year": 2025,
    "non_drinkers_pct": 64,
    "non_drinkers_year": 2025,
    "hospitalizations": 418467,
    "hospitalizations_year": 2024,
    "deaths": 73019,
    "deaths_year": 2023
  },
  "recent_trends": [
    {
      "trend": "Consumo de cerveja nos fins de semana",
      "change_pct": -25.4,
      "period": "2025 vs 2024",
      "source": "CISA"
    },
    {
      "trend": "Gen Z abstenção",
      "change_pct": 18,
      "period": "2023-2025",
      "source": "CISA/Ipsos"
    }
  ],
  "geography": [
    {
      "state": "Rio Grande do Sul",
      "excessive_pct": 34,
      "priority": "primary",
      "source": "CISA 2025"
    }
  ],
  "competitors": [
    {
      "name": "Sunflower",
      "mau": 100000,
      "rating": 4.8,
      "reviews_count": 5200,
      "strengths": ["Gamificação", "IA Sam", "HIPAA"],
      "weaknesses": ["Sem fluência cultural BR", "Funcional não relacional"],
      "market_positioning": "Duolingo para vícios",
      "estimated_revenue_monthly": 150000,
      "source": "Sensor Tower / App Annie"
    }
  ],
  "sources": {
    "cisa": "cisa.org.br/panorama",
    "datasus": "datasus.saude.gov.br",
    "google_trends": "trends.google.com",
    "app_data": "sensortower.com"
  }
}
```

---

## Implementação

- **Node.js:** `AUT/api/agents/agent-market.js`
- **Cron:** Vercel — `0 23 * * *` (23h BRT = 00h UTC+1)
- **Runtime:** 120s (coleta de dados, síntese)
- **Saída:** 
  1. JSON armazenado em estado
  2. `../KNOW/KNOW_strategy/KNOW_MarketContext.md` atualizado
  3. GitHub commit automático
  4. Telegram message de preview (aguardando aprovação)