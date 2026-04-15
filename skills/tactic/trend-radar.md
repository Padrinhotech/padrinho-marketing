# Trend Radar — Padrinho

## Papel
Este documento define o protocolo de monitoramento de tendências culturais
e de mercado que devem informar o conteúdo semanal.

O agente consulta este arquivo antes de cada ciclo de Strategy para
verificar tendências ativas e oportunidades de gancho cultural.

---

## Protocolo de Monitoramento

### Frequência
- **Semanal:** verificar notícias e tendências de comportamento antes de cada brief
- **Mensal:** atualização profunda junto com `market-context.md`
- **Pontual:** quando evento cultural relevante surgir (viral, notícia de impacto)

### Queries Semanais (rodar antes de cada brief de conteúdo)
```
"alcoolismo notícias Brasil [semana/mês]"
"sober curious tendência [mês/ano]"
"hangxiety viral [mês]"
"[evento cultural da semana] álcool"
"saúde mental Brasil [semana]"
```

---

## Framework de Avaliação de Tendência

Antes de usar uma tendência no conteúdo, avaliar:

| Critério | Pergunta | Mínimo |
|---|---|---|
| **Relevância** | Tem relação genuína com a jornada de recuperação? | Obrigatório |
| **Autenticidade** | O Padrinho tem algo real a dizer sobre isso? | Obrigatório |
| **Timing** | Está no pico ou já passou? | Pico ou subindo |
| **Persona** | Qual persona vai se reconhecer? | Ao menos uma |
| **Tom** | Dá para falar sem pregar ou diagnosticar? | Obrigatório |

**Regra:** Uma tendência só entra no conteúdo se o Padrinho tem algo
*próprio* a dizer sobre ela — não apenas reagir ao que está em alta.

---

## Tendências Ativas (Abril 2026)

### 🟢 Sober Curious (alta — onda crescente)
- Movimento de sobriedade aspiracional chegando ao Brasil
- Geração Z liderando redução de consumo
- Bebidas zero álcool em alta nas prateleiras
- "Sober shaming" como tema emergente
- **Como usar:** validar que o público do Padrinho está dentro da cultura,
  não fora dela. Sobriedade virou cool — e o Padrinho foi pioneiro.

### 🟢 IA no Cotidiano (alta — contínua)
- IA generativa presente em todos os aspectos da vida
- Ghibli viral, Co-pilot, ChatGPT no dia a dia
- Público familiarizado com agentes de IA
- **Como usar:** Bill não é novidade estranha — é o que o mundo já usa,
  mas com alma e propósito de recuperação.

### 🟡 Hangxiety (média — educacional)
- Termo entrando no vocabulário popular
- Ainda pouco conhecido no Brasil
- Oportunidade educacional para o Padrinho
- **Como usar:** Pilar Empoderamento — explicar o que é, validar o que
  o público já sente mas não sabe nomear.

### 🟡 Saúde Mental Masculina (média — crescente)
- Homens começando a falar sobre saúde mental
- Ainda muito tabu, mas quebrando
- Relevante especialmente para Pedro
- **Como usar:** abrir espaço para Pedro sem fazer dele o "cara com problema"

### 🔴 Dry January (sazonal — Janeiro)
- Pico em Janeiro, decai em Fevereiro
- Entrada natural para o Padrinho no início do ano
- **Quando usar:** conteúdo em Dezembro (antecipação) e Janeiro (onda)

---

## Tendências para Monitorar

| Tendência | Por que monitorar | Signal de entrada |
|---|---|---|
| **Sunflower** crescimento | Principal concorrente em PT-BR | Novo funding, feature lançada |
| **Legislação** álcool BR | Mudanças regulatórias afetam contexto | Notícia de lei ou campanha governamental |
| **Celebridades** e sobriedade | Amplificadores culturais | Celebridade BR fala sobre sobriedade |
| **Dados CISA** novos | Fonte primária de dados do mercado | Publicação de novo relatório |
| **Formato viral** Instagram | Adaptar formato ao que está engajando | Novo formato de carrossel/reel em alta |

---

## Log de Tendências Usadas

| Data | Tendência | Post | Resultado |
|---|---|---|---|
| Abr 2026 | IA Ghibli viral | Semana 10 — "Não é magia Ghibli, é tecnologia com alma" | *(registrar quando disponível)* |

---

## Tendências que o Padrinho NÃO deve usar

Por mais que estejam em alta, algumas tendências não são território do Padrinho:

- **Memes de bebedeira / ressaca com humor** — trivializa o problema
- **"Beber com moderação"** como solução — vai contra a proposta de valor
- **Trends de saúde extrema** (detox, jejum, etc.) — não é o público
- **Polêmicas políticas** — nunca tomar partido
- **Crítica a AA ou tratamentos tradicionais** — respeito ao que existe

---

## Integração com o Pipeline

O agente deve incluir no brief estratégico (Camada 1):

```markdown
## Tendências Ativas desta Semana
- [tendência 1]: [como usar]
- [tendência 2]: [como usar]
- Oportunidade de gancho cultural: [sim/não + justificativa]
```
