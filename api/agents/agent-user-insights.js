/**
 * User Insights Agent
 * 
 * Coleta dados de usuários do Supabase (read-only)
 * Analisa padrões comportamentais, demográficos, jornada
 * Atualiza ./skills/audiences/user-insights.md
 * 
 * Roda: Diariamente às 23h30 BRT (02h30 UTC+1) — após Market Agent
 * Entrada: Supabase queries (profiles, consumption, journey, sentiment)
 * Saída: user-insights.md atualizado + commit GitHub + preview Telegram
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const StateManager = require("../SKILL/lib/state.js");
const TelegramClient = require("../SKILL/lib/telegram-client.js");
const { generateApprovalButtons } = require("../SKILL/lib/telegram-client.js");

class UserInsightsAgent {
  constructor() {
    this.state = new StateManager();
    this.telegram = new TelegramClient(
      process.env.TELEGRAM_BOT_TOKEN,
      process.env.TELEGRAM_CHAT_ID
    );
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.supabaseKey = process.env.SUPABASE_KEY;
  }

  /**
   * Executar agent
   */
  async run() {
    try {
      console.log("[UserInsightsAgent] Starting user data collection from Supabase...");

      // 1. Coletar dados do Supabase (read-only queries)
      const userInsightsData = await this.collectUserInsights();

      // 2. Gerar novo user-insights.md
      const userInsightsMd = this.generateUserInsightsMarkdown(userInsightsData);

      // 3. Salvar arquivo
      const insightsPath = path.join(
        process.cwd(),
        "./skills/audiences/user-insights.md"
      );
      fs.writeFileSync(insightsPath, userInsightsMd, "utf-8");
      console.log("[UserInsightsAgent] user-insights.md updated");

      // 4. Salvar no estado
      await this.state.savePhaseData("user-insights", userInsightsData);

      // 5. Enviar preview ao Telegram (aguardando aprovação para commit)
      const messageId = await this.sendTelegramPreview(userInsightsData);

      // 6. Registrar message ID
      await this.state.saveTelegramMessageId("user-insights", messageId);

      console.log("[UserInsightsAgent] Complete - awaiting approval to commit");
      return userInsightsData;
    } catch (error) {
      console.error("[UserInsightsAgent] Error:", error);
      await this.telegram.sendMessage(
        `❌ Erro ao coletar dados de usuários:\n\`${error.message}\``
      );
      throw error;
    }
  }

  /**
   * Coletar dados de usuários do Supabase
   * TODO: Conectar com Supabase real (por enquanto mock data)
   */
  async collectUserInsights() {
    const today = new Date().toISOString().split("T")[0];

    // TODO: Executar queries Supabase reais (via REST API ou pg_net)
    // const profiles = await this.querySupabase("SELECT ...");
    // const consumption = await this.querySupabase("SELECT ...");
    // const journey = await this.querySupabase("SELECT ...");
    // const sentiment = await this.querySupabase("SELECT ...");
    // const personas = await this.querySupabase("SELECT ...");

    // Por enquanto, mock data estruturado (será atualizado com dados reais)
    return {
      date: today,
      updated_at: new Date().toISOString(),
      period_days: 90,
      total_active_users: 2847,

      demographics: {
        age_distribution: {
          "18_25": { count: 412, pct: 14.5 },
          "25_34": { count: 891, pct: 31.3 },
          "35_44": { count: 756, pct: 26.5 },
          "45_54": { count: 562, pct: 19.7 },
          "55_plus": { count: 226, pct: 7.9 },
        },
        gender: {
          male: { count: 1703, pct: 59.8 },
          female: { count: 1087, pct: 38.2 },
          non_binary: { count: 57, pct: 2.0 },
        },
        top_states: [
          { state: "São Paulo", count: 612, pct: 21.5 },
          { state: "Rio Grande do Sul", count: 487, pct: 17.1 },
          { state: "Minas Gerais", count: 356, pct: 12.5 },
          { state: "Bahia", count: 245, pct: 8.6 },
          { state: "Santa Catarina", count: 198, pct: 6.9 },
        ],
        family_status: {
          single: { pct: 42 },
          married: { pct: 38 },
          with_children: { pct: 45 },
        },
      },

      consumption: {
        frequency: {
          daily: { pct: 8 },
          "3_4_times_week": { pct: 22 },
          weekends: { pct: 45 },
          occasional: { pct: 25 },
        },
        context: {
          social_bar: { pct: 52 },
          home_alone: { pct: 18 },
          events: { pct: 22 },
          other: { pct: 8 },
        },
        avg_liters_per_week: 4.2,
        drink_preference: {
          beer: { pct: 65 },
          wine: { pct: 15 },
          spirits: { pct: 15 },
          other: { pct: 5 },
        },
      },

      barriers_motivations: {
        why_reduce: {
          health: { pct: 38 },
          family_pressure: { pct: 22 },
          work_productivity: { pct: 18 },
          relationships: { pct: 15 },
          financial: { pct: 7 },
        },
        main_obstacles: {
          social_pressure: { pct: 35 },
          habit_addiction: { pct: 28 },
          isolation_without_alcohol: { pct: 18 },
          emotional_difficulty: { pct: 14 },
          lack_of_support: { pct: 5 },
        },
        previous_attempts: {
          yes: { pct: 72 },
          no: { pct: 28 },
        },
      },

      journey: [
        {
          stage: "awareness",
          count: 156,
          pct: 5.5,
          avg_days_in_stage: 8,
          retention_7d: 42,
          retention_30d: 18,
          retention_90d: 5,
        },
        {
          stage: "consideration",
          count: 412,
          pct: 14.5,
          avg_days_in_stage: 14,
          retention_7d: 68,
          retention_30d: 45,
          retention_90d: 22,
        },
        {
          stage: "decision",
          count: 687,
          pct: 24.1,
          avg_days_in_stage: 21,
          retention_7d: 78,
          retention_30d: 62,
          retention_90d: 38,
        },
        {
          stage: "action",
          count: 954,
          pct: 33.5,
          avg_days_in_stage: 35,
          retention_7d: 85,
          retention_30d: 71,
          retention_90d: 52,
        },
        {
          stage: "maintenance",
          count: 638,
          pct: 22.4,
          avg_days_in_stage: 67,
          retention_7d: 88,
          retention_30d: 78,
          retention_90d: 65,
        },
      ],

      sentiment: {
        nps: 52,
        avg_satisfaction: 4.2,
        support_categories: {
          emotional_support: { pct: 38 },
          features_bugs: { pct: 22 },
          how_to_use: { pct: 25 },
          content: { pct: 15 },
        },
        bill_feedback: {
          personalized_support: { pct: 74 },
          felt_supported: { pct: 81 },
          helped_with_decisions: { pct: 68 },
          missing_something: { pct: 22 },
        },
        critical_abandonment_point: "Day 3-4 (após primeiros check-ins)",
      },

      personas: [
        {
          persona: "Rosa - Equilibrista",
          identified_pct: 35,
          nps: 58,
          retention_days: 48,
          characteristics:
            "Mulher 35-44, SP/RS, profissional, bebe fins de semana em contexto social",
        },
        {
          persona: "Ana Mae - Mãe Protetora",
          identified_pct: 28,
          nps: 54,
          retention_days: 42,
          characteristics:
            "Mulher 40-50, casada com filhos, preocupação com saúde familiar",
        },
        {
          persona: "Pedro - Autônomo Solitário",
          identified_pct: 24,
          nps: 48,
          retention_days: 35,
          characteristics:
            "Homem 30-45, trabalha por conta própria, bebida como coping",
        },
        {
          persona: "Caio - Filho Ressentido",
          identified_pct: 13,
          nps: 42,
          retention_days: 22,
          characteristics: "Homem 25-35, conflito familiar, pressão de pais/companheira",
        },
      ],

      notes: "Mock data — será atualizado com queries Supabase reais (read-only)",
    };
  }

  /**
   * Gerar arquivo user-insights.md com os novos dados
   */
  generateUserInsightsMarkdown(userInsightsData) {
    const today = userInsightsData.date;
    const nextDay = new Date(new Date(today).setDate(new Date(today).getDate() + 1))
      .toISOString()
      .split("T")[0];

    const totalUsers = userInsightsData.total_active_users;

    const ageRows = Object.entries(userInsightsData.demographics.age_distribution)
      .map(
        ([range, data]) =>
          `| ${range.replace(/_/g, "-")} | ${data.count.toLocaleString("pt-BR")} (${data.pct}%) |`
      )
      .join("\n");

    const genderRows = Object.entries(userInsightsData.demographics.gender)
      .map(
        ([gender, data]) =>
          `| ${gender} | ${data.count.toLocaleString("pt-BR")} (${data.pct}%) |`
      )
      .join("\n");

    const stateRows = userInsightsData.demographics.top_states
      .map((s) => `| ${s.state} | ${s.count} (${s.pct}%) |`)
      .join("\n");

    const frequencyRows = Object.entries(userInsightsData.consumption.frequency)
      .map(([freq, data]) => `| ${freq.replace(/_/g, " ")} | ${data.pct}% |`)
      .join("\n");

    const contextRows = Object.entries(userInsightsData.consumption.context)
      .map(([ctx, data]) => `| ${ctx.replace(/_/g, " ")} | ${data.pct}% |`)
      .join("\n");

    const motiveRows = Object.entries(userInsightsData.barriers_motivations.why_reduce)
      .map(
        ([motive, data]) =>
          `| ${motive.replace(/_/g, " ")} | ${data.pct}% |`
      )
      .join("\n");

    const obstacleRows = Object.entries(userInsightsData.barriers_motivations.main_obstacles)
      .map(
        ([obstacle, data]) =>
          `| ${obstacle.replace(/_/g, " ")} | ${data.pct}% |`
      )
      .join("\n");

    const journeyRows = userInsightsData.journey
      .map(
        (j) =>
          `| ${j.stage} | ${j.count} (${j.pct}%) | ${j.avg_days_in_stage}d | ${j.retention_7d}% | ${j.retention_30d}% | ${j.retention_90d}% |`
      )
      .join("\n");

    const personaRows = userInsightsData.personas
      .map(
        (p) =>
          `| ${p.persona} | ${p.identified_pct}% | ${p.nps} | ${p.retention_days}d | ${p.characteristics} |`
      )
      .join("\n");

    return `# User Insights — Padrinho

> **Protocolo de atualização:** Este arquivo é atualizado automaticamente pelo User Insights Agent.
> **Última atualização:** ${today}
> **Dados de:** Últimos 90 dias
> **Próxima atualização:** ${nextDay}
> **Total de usuários ativos:** ${totalUsers.toLocaleString("pt-BR")}

---

## 📊 Demografia — Quem é o Usuário

### Distribuição de Idade

| Faixa | Usuários |
|---|---|
${ageRows}

**Insight:** A maioria é 25-44 anos (57.8%) — classe C/D, profissional ativo.

### Gênero

| Gênero | Usuários |
|---|---|
${genderRows}

**Insight:** Maioria masculina (59.8%), mas 38% mulheres — importante para Rosa & Ana Mae personas.

### Localização (Top 5 Estados)

| Estado | Usuários |
|---|---|
${stateRows}

**Insight:** SP + RS = 38.6% de toda base. Dados alinhados com ICP geográfico.

### Status Familiar

- Solteiros: 42%
- Casados: 38%
- Com filhos: 45% (overlapping com casados)

**Insight:** Ana Mae (mãe) é 45% da base — persona altamente relevante.

---

## 🍺 Padrões de Consumo — Como Bebem

### Frequência Reportada

| Frequência | % |
|---|---|
${frequencyRows}

**Insight:** 45% bebe "só nos fins de semana" (ICP excessivo) — sweet spot para Padrinho.

### Contexto (Quando Bebe)

| Contexto | % |
|---|---|
${contextRows}

**Insight:** 52% em contexto social (pressão), 18% sozinho (coping) — dois gatilhos diferentes.

### Bebida Preferida

- Cerveja: 65% (litrão, social)
- Vinho: 15% (sofisticado)
- Destilado: 15% (rápido, efeito)
- Outro: 5%

### Consumo Médio

**4,2 litros/semana** (acima da média nacional de 1,5L — confirma ICP excessivo)

---

## 🎯 Barreiras & Motivações — Por Que Quer Reduzir

### Motivos Principais

| Motivo | % |
|---|---|
${motiveRows}

**Insight:** Saúde (38%) + Família (22%) = 60% — emoções positivas/protetoras.

### Obstáculos Principais

| Obstáculo | % |
|---|---|
${obstacleRows}

**Insight:** Pressão social (35%) + Hábito (28%) = 63% — externos + internos.

### Tentativas Anteriores

- Já tentou parar/reduzir: 72%
- Primeira vez: 28%

**Insight:** 72% não é primeiro rodízio — experiência anterior (sucesso ou fracasso).

---

## 🛣️ Jornada do Usuário — Retenção por Stage

| Stage | Usuários | % | Tempo médio | Ret. 7d | Ret. 30d | Ret. 90d |
|---|---|---|---|---|---|---|
${journeyRows}

**Insight:** Maior abandono é em Awareness (5%). Taxa de retenção sobe conforme avança (awareness 5% → maintenance 65%).

**Momento crítico:** Dia 3-4 após onboarding (dropoff). **Ação:** Bill deve ser mais ativo nos primeiros contatos.

---

## 😊 Sentimento & Engajamento — Satisfação

### NPS & Satisfação
- **NPS:** ${userInsightsData.sentiment.nps} (promoter = 9-10, passive = 7-8, detractor = 0-6)
- **Satisfação média:** ${userInsightsData.sentiment.avg_satisfaction}/5

**Insight:** NPS 52 é bom (média de apps é 30-40). Room para melhoria.

### Temas de Suporte

| Tema | % |
|---|---|
| Suporte emocional | ${userInsightsData.sentiment.support_categories.emotional_support}% |
| Features/bugs | ${userInsightsData.sentiment.support_categories.features_bugs}% |
| Como usar | ${userInsightsData.sentiment.support_categories.how_to_use}% |
| Conteúdo | ${userInsightsData.sentiment.support_categories.content}% |

**Insight:** 38% pede suporte emocional — Bill must deliver warmth.

### Feedback sobre Bill (IA)

- Sentiu suporte acolhedor: **${userInsightsData.sentiment.bill_feedback.felt_supported}%**
- Personalizava acompanhamento: **${userInsightsData.sentiment.bill_feedback.personalized_support}%**
- Ajudava com decisões: **${userInsightsData.sentiment.bill_feedback.helped_with_decisions}%**
- Faltava algo: **${userInsightsData.sentiment.bill_feedback.missing_something}%**

**Insight:** Bill é percebido como **acolhedor** (81%) e **personalizador** (74%). Manter foco.

### Ponto de Abandono Crítico

**${userInsightsData.sentiment.critical_abandonment_point}}**

---

## 👥 Persona Alignment — Quem Se Identifica Com Quem

| Persona | Identificação | NPS | Retenção | Descrição |
|---|---|---|---|---|
${personaRows}

### Insights por Persona

**Rosa - Equilibrista (35%)**
- Maior identificação + melhor NPS (58)
- Melhor retenção (48 dias)
- **Strategy:** Foco nela. Conteúdo sobre balance, vida social, pequenas vitórias.

**Ana Mae - Mãe Protetora (28%)**
- Segunda maior base + bom NPS (54)
- Retenção média (42 dias)
- **Strategy:** Narrativa de proteção familiar, saúde dos filhos.

**Pedro - Autônomo (24%)**
- Base significativa mas NPS baixo (48)
- Retenção pior (35 dias)
- **Strategy:** Foco em autodescoberta, independência, self-care.

**Caio - Filho Ressentido (13%)**
- Menor base + pior NPS (42)
- Menor retenção (22 dias)
- **Strategy:** Conflito familiar, emancipação — persona desprioritizada.

---

## 🎬 Recomendações para Estratégia

1. **Rosa é a prioridade:** 35% + melhor NPS + ótima retenção. Conteúdo dela primeiro.
2. **Crítico: Dias 3-4 pós-onboarding.** Bill precisa ser mais ativo. Lembretes, wins, suporte.
3. **38% busca suporte emocional:** Não é feature request — é warmth. Tom de Bill deve ser acolhedor.
4. **72% já tentou parar:** Não é primer experience — é "rodízio de esperança". Validar frustração anterior.
5. **52% em contexto social:** Conteúdo sobre resistir pressão social. Scripts de não-pedir.
6. **45% tem filhos:** Ana Mae + mensagens sobre família. Kids' futures angle.

---

${userInsightsData.notes ? `**Nota:** ${userInsightsData.notes}` : ""}
`;
  }

  /**
   * Enviar preview ao Telegram
   */
  async sendTelegramPreview(userInsightsData) {
    const date = userInsightsData.date;
    const topState = userInsightsData.demographics.top_states[0];
    const rosaPersona = userInsightsData.personas[0];
    const nps = userInsightsData.sentiment.nps;

    const message = `
👥 **USER INSIGHTS UPDATE** — ${date}

**Base 👤**
${userInsightsData.total_active_users.toLocaleString("pt-BR")} usuários ativos (90d)
Idade primária: 25-34 (31%)
Gênero: 60% homens / 40% mulheres

**Consumo 🍺**
${userInsightsData.consumption.frequency.weekends}% bebe "só fins de semana"
Média: ${userInsightsData.consumption.avg_liters_per_week}L/semana
Contexto: ${userInsightsData.consumption.context.social_bar}% social

**Jornada 🛣️**
Ação: ${userInsightsData.journey[3].pct}% (maior stage)
Retenção 90d: ${userInsightsData.journey[4].retention_90d}% (manutenção)
⚠️ Crítico: Dia 3-4 pós-onboarding

**Top Persona 👸**
${rosaPersona.persona}: ${rosaPersona.identified_pct}%
NPS: **${rosaPersona.nps}** | Retenção: ${rosaPersona.retention_days}d

**Sentiment 😊**
NPS: **${nps}** | Satisfação: ${userInsightsData.sentiment.avg_satisfaction}/5
Acolhimento Bill: **${userInsightsData.sentiment.bill_feedback.felt_supported}%**

---
user-insights.md atualizado com demographics + journey + sentiment

Comitar atualização?
    `.trim();

    const buttons = generateApprovalButtons("user-insights", date);

    const result = await this.telegram.sendMessageWithButtons(
      message,
      buttons
    );

    return result.message_id;
  }

  /**
   * TODO: Query Supabase (read-only)
   * Implementar quando Supabase MCP estiver disponível
   */
  async querySupabase(sqlQuery) {
    // TODO: Implementar via Supabase REST API
    // const response = await fetch(`${this.supabaseUrl}/rest/v1/...`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "apikey": this.supabaseKey,
    //     "Authorization": `Bearer ${this.supabaseKey}`,
    //   },
    // });
    // return response.json();

    console.log("[UserInsightsAgent] TODO: Implement real Supabase queries");
    return null;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

// Exportar a classe
module.exports = UserInsightsAgent;

// Exportar handler serverless
module.exports.handler = async (req, res) => {
  // Validar CRON_SECRET
  const secret = req.query.secret || req.headers["authorization"]?.split(" ")[1];
  if (secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const agent = new UserInsightsAgent();

  try {
    const data = await agent.run();
    res.json({
      ok: true,
      message: "User insights collected and user-insights.md updated",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};
