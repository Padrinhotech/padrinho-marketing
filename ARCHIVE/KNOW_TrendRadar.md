> ⚠️ **DEPRECATED — consolidado em `KNOW/Padrinho/KNOW_MarketIntel.md` (2026-06-27).** Referência histórica.

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
- **Trimestral:** revisão de concorrentes e movimentos do setor + **re-coleta de demanda de busca** (Google Trends)

### Referência de demanda de busca (o que o Brasil pesquisa)
Snapshot de `related_queries` (top + rising) por cluster está na seção **§ Demanda de Busca — Google Trends (BR)** abaixo. Regra de ouro: **blog mira demanda de busca; hook social mira timing cultural.** Validar keyword/título antes de produzir (Tactic). Re-coletar trimestralmente.

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

## Demanda de Busca — Google Trends (BR · jun/26)

> **Fonte:** Google Trends, região **Brasil**, janela **12 meses** (`related_queries` top + rising), coletado em **2026-06-22** via Apify.
> **Limites:** valores são **relativos por cluster** (0–100), não comparáveis entre clusters; *rising* = aceleração recente, não volume absoluto. Re-coletar **trimestralmente** (próxima: ~set/2026).
>
> **Como usar:** mira de keyword/título de blog (Tactic). **Blog = demanda de busca. Hook social = timing cultural** — datas como São João e Julho Seco servem de gancho de Instagram, mas quase ninguém as busca; o blog da mesma pauta deve mirar a query de alta demanda.

### 1. Parar de beber / sober-curious
| Query | Valor | Tipo |
|---|---|---|
| `como parar de beber cerveja` | 100 | top |
| `remédio para parar de beber` | 94 | top |
| `como parar de beber álcool` | 60 | top |
| `como parar de beber definitivamente` | 21 | top |
| `simpatia / oração para parar de beber` | 14–16 | top |
| `eu parei de beber` | 100 | top |
| `remédio caseiro para parar de beber definitivamente` | 🔺 **+190%** | rising |
| `vou parar de beber` | 🔺 +60% | rising |
| `sober curious meaning` | 100 | top ⚠️ só "meaning" |

**Leitura:** busca-se "parar de beber **cerveja**", não "álcool" abstrato; forte intenção de **permanência** (`definitivamente`) e método dividido entre **remédio/naltrexona** e **fé/simpatia**. ⚠️ **`sober curious` não tem base de busca em PT** — não usar o termo inglês como título/SEO.

### 2. Alcoolismo & saúde / cérebro
| Query | Valor | Tipo |
|---|---|---|
| `alcoolismo tratamento` | 100 | top |
| `o que é alcoolismo` | 77–80 | top |
| `alcoolismo é doença` | 31 | top |
| `sintomas de alcoolismo` | 19 | top |
| `efeitos do álcool no cérebro` | **100** | top |
| `crise de abstinência alcoólica` | 100 | top |
| `auxílio / benefício inss / bolsa alcoolismo` | 🔺 **+550% / +250% / +170%** | rising |

**Leitura:** demanda evergreen de **definição + doença + sintomas**. `efeitos do álcool no cérebro` (100) valida pauta de neurociência (Pedro/Empoderamento). ⚠️ Cluster `auxílio/INSS alcoolismo` explode (+550%) mas é **fora do tom** — sinalizar, não perseguir.

### 3. "Sazonal" → na verdade: cerveja sem álcool
| Query | Valor | Tipo |
|---|---|---|
| `cerveja sem álcool tem álcool` | **100** | top |
| `cerveja sem álcool faz mal` | 51 | top |
| `cerveja zero álcool` | 47 | top |
| `melhor cerveja sem álcool` | 25 | top |
| `cerveja sem álcool faz mal para o fígado` | 🔺 **+90%** | rising |
| `beber socialmente significado` | 100 (🔺 +40%) | top + rising |
| `julho seco` · `são joão sem álcool` · `desafio 30 dias sem álcool` | ❌ sem dados | — |

**Leitura (descoberta principal):** **"cerveja sem álcool" é um universo de busca enorme e em alta** (prova comportamental do sober-curious no BR); `beber socialmente significado` é pergunta de identidade (fit Rosa). ⚠️ **"Julho Seco" e "São João sem álcool" quase não são buscados** — só ganchos sociais, nunca alvo de SEO.

### 4. Apoio / família
| Query | Valor | Tipo |
|---|---|---|
| `alcoólicos anônimos online` | **100** | top |
| `alcoólicos anônimos telefone` | 73 | top |
| `alcoólicos anônimos whatsapp` | 43 | top |
| `alcoólicos anônimos gratuito` | 13 | top |

**Leitura:** demanda por AA é sobre **acesso** (online, telefone, WhatsApp, gratuito) → encaixe quase perfeito para o Padrinho (app = remoto, instantâneo, gratuito). Pauta de Acolhimento que conecta ao Bill.

### Backlog de alta demanda (futuras pautas)
1. **Cerveja sem álcool** — `tem álcool?` `faz mal?` `faz mal pro fígado` (+90%) `engorda` `melhor marca`. Maior oportunidade não explorada. (Rosa / Desmascaramento) → 🟡 **em produção:** `POSTS/Padrinho/BACKLOG_CervejaSemAlcool/`
2. **Remédio para parar de beber** — naltrexona, `definitivamente`, `remédio caseiro` (+190%). ⚠️ Enquadrar como *"o que a ciência diz"* (Pedro/Empoderamento), **nunca conselho médico**.
3. **AA online / WhatsApp / gratuito** — wedge natural para o Padrinho. (Acolhimento → Bill)

---

## Concorrentes — Monitoramento Contínuo

> **Benchmark de Instagram orgânico (Apify):** análise de desempenho das contas
> do nicho nas redes está em `KNOW_IGBenchmarkCompetitors.md` (o que funciona +
> direções), com auditorias individuais em `KNOW_IGBenchmarkPadrinho.md` e
> `KNOW_IGBenchmarkBezerra.md`. Atualizar trimestralmente junto com esta seção.


> Perfis completos + posicionamento/contra-narrativas dos concorrentes vivem em `KNOW_MarketContext.md` § Concorrentes Diretos. Abaixo só o **protocolo de monitoramento** (o que buscar).

### Sunflower (YC W25) — monitorar mensalmente
- Queries: `"Sunflower app brasil"`, `"sunflower vícios novidade"`
- O que observar: expansão no BR, novos features, comunicação

### Reframe — monitorar trimestralmente
- Queries: `"Reframe app brasil"`, `"reframe álcool"`

### I Am Sober — monitorar trimestralmente
- Query: `"I Am Sober app brasil"`

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

**Last Updated:** 2026-06-22  
**Maintained by:** Tactic Agent  
**References:**  
- [KNOW/Padrinho/KNOW_EditorialPillars.md](KNOW/Padrinho/KNOW_EditorialPillars.md)
- [KNOW/KNOW_MarketContext.md](KNOW/KNOW_MarketContext.md)
- [AGENT/AGENT_Tactic.md](AGENT/AGENT_Tactic.md)

