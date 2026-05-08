---
title: "Market Context — Padrinho"
version: "1.0"
status: "Final"
type: "Skill"
owner: "Padrinho Marketing Automation"
parent_doc: "marketing/KNOW/"
tags: [market, competitive-analysis, trends, consumption-data, geography]
---

# Market Context — Padrinho

Dados de mercado, análise competitiva, tendências de consumo e distribuição geográfica. Leia este arquivo para entender o contexto de mercado e oportunidades. Atualizado pelo Market Agent mensalmente; used pelo Strategy Agent para gerar briefings informados por dados.

> **Protocolo de atualização:** Este arquivo deve ser atualizado mensalmente.
> O agente roda as queries definidas em `tactic/trend-radar.md`, coleta
> dados novos, atualiza as seções marcadas com 📊, e aguarda aprovação
> antes de commitar.
>
> **Última atualização:** Abril 2026
> **Próxima atualização:** Maio 2026

---

## 📊 Dados de Consumo — Brasil

| Indicador | Valor | Ano | Fonte |
|---|---|---|---|
| Consumo per capita | 7,7 litros/ano | 2024 | CISA Panorama 2024 |
| Média mundial | 6,2 litros/ano | 2024 | OMS |
| Pico histórico BR | 8,6 litros/ano | — | CISA |
| Consumo excessivo (população geral) | 15% | 2025 | CISA Panorama 2025 |
| Não bebem (declarado) | 64% | 2025 | CISA / Ipsos |
| Não bebiam em 2023 | 55% | 2023 | CISA |
| ~60% do consumo | "litrão" do FDS | — | CISA |
| Internações atribuíveis ao álcool | 418.467 | 2024 | Datasus |
| Óbitos atribuíveis ao álcool | 73.019 | 2023 | Datasus |

### Tendências recentes
- Consumo de cerveja nos fins de semana recuou **25,4%** em 2025 vs 2024
- Consumo individual (solitário) cresceu de 13,6% para **22,4%** das ocasiões
- 62% dos brasileiros consideraram reduzir consumo no último ano
- Gen Z: abstenção saltou de 46% para **64%** entre 2023–2025

---

## Mercado Endereçável

### Escala de dependência
```
Não Alcoólico → Social & Moderado (10%) → [EXCESSIVO 70%] → Dependente (20%) → Forte
```

**Foco: segmento Excessivo — 70% do mercado**

Características:
- Funcional, tem vida social ativa, não se identifica com o estereótipo
- O álcool como anfitrião social, não como problema reconhecido
- "Bebo só no fim de semana" — mas a cultura do FDS é intensa
- Resistência a buscar ajuda por não se ver no espelho clínico

---

## 📊 Geografia Prioritária

| Estado | Dado | Relevância |
|---|---|---|
| Rio Grande do Sul | 34% bebe semanalmente | Principal |
| Mato Grosso do Sul | Alta concentração | Alta |
| São Paulo | Maior mercado absoluto | Volume |
| Santa Catarina | Alta relevância | Alta |
| Rio de Janeiro | 26,3% — 4º lugar | Relevante |
| Brasília (DF) | 25,7% consumo abusivo adultos | Monitorar |

---

## Perfil Demográfico do Público-Alvo

- Idade: 25–54 anos
- Renda: acima de R$ 2.000/mês
- Classe: B, C, D
- Hábitos: consome conteúdo online, busca soluções digitais
- Cultura: happy hour, sertanejo, samba, pagode
- Canal: Instagram, YouTube, Facebook, Google

---

## 📊 Concorrentes Diretos

### Sunflower (YC W25) — Ameaça Principal
- **Tração:** 200 → 100.000 MAUs em 6 meses. Em português.
- **Posicionamento:** "Duolingo para vícios" — gamificação + CBT + IA (Sam)
- **Modelo:** HIPAA-compliant, subscription
- **Fraqueza:** Funcional, não relacional. Americana, sem fluência cultural BR.
- **Nossa contra-narrativa:** "Bill te conhece. Sam te treina."
- **Monitorar:** expansão BR, novos features, preço

### Reframe — Líder Global
- **Tração:** 3,2M downloads. 91% reportam redução em 3 meses.
- **Posicionamento:** "Science, not stigma." Programa 160 dias.
- **Modelo:** ~$100–200/ano. Centenas de especialistas médicos.
- **Fraqueza:** Frio, protocolar, americano. Reviews: custo + impessoal.
- **Nossa contra-narrativa:** "Ciência com alma."

### I Am Sober
- **Tração:** ~$200k/mês, 150k downloads. Free + $9,99/mês.
- **Posicionamento:** Contador + pledges + comunidade
- **Fraqueza:** Sem IA real, sem personalização, comunidade tóxica.
- **Nossa contra-narrativa:** "Acompanhamento real vs. fórum."

---

## 📊 Contexto Cultural (atualizar mensalmente)

### Movimento Sober Curious no Brasil
- EUA: consumo na mínima histórica de 90 anos (Gallup)
- Brasil segue tendência americana com 2–3 anos de defasagem
- **Status atual:** onda chegando — sobriedade se tornando aspiracional
- Gen Z e Millennials: abertos à conversa sobre saúde mental + substâncias

### IA e Bem-Estar
- Explosão de apps de IA para saúde mental (Woebot, Wysa, etc.)
- Momentos culturais de IA como gancho de conteúdo
- Oportunidade: Bill como a IA que entende a recuperação

### Bebidas Sem Álcool
- Vendas globais: +37,5% entre 2018–2022
- Brasil: marcas tradicionais lançando linhas zero álcool
- Oportunidade: sobriedade não como privação, mas como escolha

---

## 📊 Metas de Negócio Padrinho (contexto para o agente)

| Métrica | Meta |
|---|---|
| Faturamento anual | R$ 550k |
| Faturamento mensal | ~R$ 45k |
| Total de membros | 35.000 |
| Gestores de Recuperação | 1.000 |
| % pagantes | 10% |
| % apadrinhados | 10% |
| Tempo médio no programa | ~15 dias até completar |
| Membros ativos diários | 6.000+ |
| Retenção D10→D90 | Alta (dado de produto confirmado) |

---

## Protocolo de Atualização Mensal

O agente deve, no início de cada mês:

1. Rodar as queries definidas em `tactic/trend-radar.md`
2. Verificar: novos dados CISA/Datasus publicados?
3. Verificar: movimentos dos concorrentes (Sunflower especialmente)?
4. Verificar: novos estudos sobre recuperação digital?
5. Atualizar as seções marcadas com 📊
6. Registrar data de atualização no cabeçalho
7. Apresentar resumo das mudanças para aprovação antes de commitar

**Fontes prioritárias:**
- cisa.org.br (Panorama CISA)
- datasus.saude.gov.br
- Publicações do Ministério da Saúde
- Reportagens Folha / Estadão / Agência Brasil sobre álcool
- App stores (ratings e reviews dos concorrentes)

---

**Last Updated:** 2026-05-07  
**Maintained by:** Market Agent  
**References:**  
- [../AUT/AUT_market.md](../AUT/market.md)
- [../AUT/AUT_strategy.md](../AUT/strategy.md)
- [../KNOW/KNOW_brand-positioning.md](brand-positioning.md)
