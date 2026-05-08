---
title: "Trend Radar — Padrinho"
version: "1.0"
status: "Final"
type: "Skill"
owner: "Padrinho Marketing Automation"
parent_doc: "KNOW/"
tags: [trends, market-research, cultural-moments, monitoring, news]
---

# Trend Radar — Padrinho

Protocolo de monitoramento de tendências culturais, movimentos de mercado e momentos culturais relevantes. Leia este arquivo para entender como manter o conteúdo conectado ao mundo real. Usado pelo Tactic Agent para validar seleção de temas.

## Propósito
O conteúdo do Padrinho precisa falar com o mundo em que o público vive,
não apenas com o tema da recuperação em abstrato. Este arquivo define
o protocolo de monitoramento de tendências culturais e de mercado que
alimenta a criação de conteúdo.

---

## Protocolo de Atualização

### Frequência
- **Semanal:** monitoramento de tendências culturais (o agente busca antes de criar)
- **Mensal:** atualização de dados de mercado (ver `KNOW_MarketContext.md`)
- **Trimestral:** revisão de concorrentes e movimentos do setor

### Queries semanais obrigatórias (rodar via web_search antes de cada sessão)
```
"sober curious Brasil [mês/ano]"
"alcoolismo tendência Brasil [ano]"
"sobriedade lifestyle [mês/ano]"
"hangxiety viral [mês/ano]"
"dry january / dry july Brasil"
"[concorrente principal] novidade lançamento"
"bebida sem álcool Brasil [ano]"
```

### Queries de contexto cultural (rodar para posts de Reconhecimento)
```
"viral instagram brasil [semana]"
"meme semana brasil"
"trend tiktok brasil [semana]"
"discussão twitter/x saúde mental brasil"
```

---

## Calendário Cultural Anual

Momentos de maior relevância temática para o Padrinho:

| Período | Momento | Relevância | Persona | Pilar |
|---|---|---|---|---|
| Jan | Dry January | Alta — sobriedade como trend | Rosa, Pedro | Empoderamento |
| Fev | Carnaval | Alta — pós-festa, reflexão | Rosa | Reconhecimento |
| Mar | Dia da Mulher (8/3) | Média — álcool e mulheres | Rosa, Ana | Desmascaramento |
| Mai | Dia das Mães | Alta — Ana, maternidade | Ana | Acolhimento |
| Jun | Festas Juninas | Média — consumo normalizado | Rosa | Reconhecimento |
| Jul | Dry July | Média — cresce no BR | Rosa, Pedro | Empoderamento |
| Set | Setembro Amarelo | Alta — saúde mental | Todas | Acolhimento |
| Out | Outubro Rosa | Média — saúde preventiva | Ana, Rosa | Empoderamento |
| Nov | Novembro Azul | Média — saúde masculina | Pedro | Empoderamento |
| Dez | Fim de ano | Alta — reflexão e recomeço | Todas | Reconhecimento + Acolhimento |

---

## Tendências Estruturais para Monitorar

### Sober Curious Movement
- Nos EUA: consumo atingiu mínima histórica de 90 anos
- No Brasil: 64% declararam não beber em 2025 (era 55% em 2023)
- Gen Z e Millennials: sobriedade como estilo de vida aspiracional
- **Oportunidade:** O Padrinho como marca do movimento sober no Brasil

### IA e Saúde Mental
- Explosão de apps de IA para bem-estar (Woebot, Wysa, etc.)
- Momentos virais de IA (ex: filtro Ghibli) como gancho de conteúdo
- **Oportunidade:** Bill como a IA que entende a jornada de recuperação

### Bebidas Sem Álcool
- Crescimento de 37,5% nas vendas globais (2018–2022)
- Marcas tradicionais lançando versões zero álcool
- **Oportunidade:** Sinalizar que "sobriedade" não é privação

### Saúde Mental Mainstream
- Terapia e autocuidado normalizados entre 25–35 anos
- Abertura para falar sobre saúde mental publicamente
- **Oportunidade:** Posicionar o Padrinho neste contexto, não no contexto clínico

---

## Concorrentes — Monitoramento Contínuo

### Sunflower (YC W25) — monitorar mensalmente
- Queries: `"Sunflower app brasil"`, `"sunflower vícios novidade"`
- O que observar: expansão no BR, novos features, comunicação
- Nossa contra-narrativa: "Bill te conhece. Sam te treina."

### Reframe — monitorar trimestralmente
- Queries: `"Reframe app brasil"`, `"reframe álcool"`
- Nossa contra-narrativa: "Ciência com alma."

### I Am Sober — monitorar trimestralmente
- Nossa contra-narrativa: "Acompanhamento real vs. fórum."

### Novos entrantes — monitorar mensalmente
- Query: `"app recuperação alcoolismo brasil lançamento [ano]"`

---

## Como Usar as Tendências no Conteúdo

### Regra principal
A tendência é o gancho, não o conteúdo. O conteúdo é sempre sobre
a jornada emocional do público. A tendência cria a ponte de entrada.

**Exemplo correto:**
Viral do filtro Ghibli → "Não é magia do universo Ghibli, é tecnologia
com alma" → Bill como companheiro de recuperação com IA

**Exemplo incorreto:**
Viral do filtro Ghibli → post sobre o filtro Ghibli (sem conexão real)

### Hierarquia de uso
1. Tendência cultural viral → gancho de reconhecimento (Rosa)
2. Dado de mercado novo → pilar de empoderamento (Pedro)
3. Momento do calendário → pilar de acolhimento (Ana)
4. Movimento de concorrente → reforço de posicionamento (todas)

---

## Dados de Interesse dos Usuários Atuais

> **Fonte:** Dashboard Padrinho Elo — Abril 2026
> Arquivo completo: `skills/audiences/user-insights.md`

**Top interesses declarados:**
1. Prevenção de Recaída (64) — tema #1
2. Gatilhos (64) — tema #1 (empate)
3. Ansiedade (61)
4. Abstinência (60)
5. Álcool (58)
6. Rotina de Sobriedade (52)
7. Sobriedade Longa (50)

**Implicações para conteúdo:**
- Recaída e gatilhos são os temas com maior demanda comprovada
- Maioria feminina (54F / 43M) — Rosa como primária validada
- 29 usuários já estão sóbrios — precisam de conteúdo de manutenção
- Full abstinence é o objetivo dominante (25) — tom mais decisivo
- Ansiedade como ponte álcool + saúde mental — sub-explorada

**Solicitar atualização:** mensalmente junto com KNOW_MarketContext.md

---

**Last Updated:** 2026-05-07  
**Maintained by:** Tactic Agent  
**References:**  
- [../KNOW/KNOW_editorial-pillars.md](editorial-pillars.md)
- [../KNOW/KNOW_KNOW_MarketContext.md](../strategy/KNOW_MarketContext.md)
- [../AGENT/AUT_tactic.md](../AGENT/tactic.md)

