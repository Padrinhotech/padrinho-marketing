---
title: "Insights Agent — Padrinho Automation"
version: "1.0"
status: "Final"
type: "Agent"
owner: "Padrinho Marketing Automation"
parent_doc: "marketing/AGENT/"
tags: [agent, automation, orchestration]
---

# Insights Agent Instructions

## Propósito
Gerar insights mensais sobre performance de marketing e dados do negócio. Executa automaticamente às 22h BRT e atualiza `marketing/KNOW/KNOW_Insights.md` no GitHub.

## Entrada
Nenhuma (tudo é pull de APIs externas)

## Processo

### 1. Coletar dados de Instagram (Insightfulpipe)
- Insights orgânicos da conta @padrinho_app
- Lifetime: total de impressões, reaches, followers ganhos
- Últimos 30 dias: média diária de engagement, top 3 posts
- Demográficos: idade, gênero, localização de audiência

### 2. Coletar dados de Meta Ads (Pipeboard)
- Campanha atual: spend YTD, leads, CAC
- Ad set performance: CPL, CTR, conversion rate
- Top 3 creatives por ROAS

### 3. Coletar dados de Google Ads (Pipeboard)
- Impressions, clicks, conversion value
- Top 5 keywords por performance
- Search term insights

### 4. Síntese
Combinar tudo em formato:

```markdown
# Marketing Insights — Maio 2026

## Instagram Organic
- **Followers**: 12.450 (+340 este mês)
- **Avg Daily Reach**: 850
- **Avg Daily Impressions**: 2.100
- **Top 3 Posts**: [post_1, post_2, post_3] com links

## Meta Ads Performance
- **Current Campaigns**: 3 ativas
- **YTD Spend**: R$ 5.240
- **Leads Gerados**: 342 (CAC: R$ 15,32)
- **Best Creative**: [link com ROAS]

## Google Ads Performance
- **Impressions**: 45.200
- **Clicks**: 1.840 (4.1% CTR)
- **Conversions**: 120
- **Top Keywords**: [keyword_1, keyword_2, ...]

## Audience Insights (Elo)
- **Total Users**: 2.140
- **Monthly Active**: 680
- **Top Interests**: [from user-insights.md]

## Recomendações Estratégicas
- [insights acionáveis para o mês]
```

## Saída
- Arquivo: `marketing/KNOW/KNOW_Insights.md`
- Commit automático ao GitHub
- Post ao Telegram: "✅ Insights atualizados para Maio 2026"

## Instruções de Prompting
- Use dados brutos (não interprete)
- Comparar com mês anterior quando disponível
- Incluir sempre a data de atualização
- Formato: markdown clean, nada de emojis exceto em headings
- Foco: o que é acionável para o Strategy Agent?

## Requisitos
- MCP: Insightfulpipe
- MCP: Pipeboard (Meta)
- MCP: Pipeboard (Google)
- Supabase: read-only acesso a `user_insights`
- Git: push access

## Horário
- **Cron**: 22h BRT (01h UTC+1 dia seguinte)
- **Timeout**: 10 minutos
- **Retry**: 2x se falhar
