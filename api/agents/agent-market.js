/**
 * Market Agent
 * 
 * Coleta dados de mercado, tendências, consumo de álcool no Brasil
 * e paisagem competitiva. Atualiza ./skills/strategy/market-context.md
 * 
 * Roda: Diariamente às 23h BRT (00h UTC+1) — após Insights Agent
 * Entrada: MCPs (Google Trends, Sensor Tower, CISA, Datasus, APIs externas)
 * Saída: market-context.md atualizado + commit GitHub + preview Telegram
 */

import fs from "fs";
import path from "path";
import StateManager from "../../SKILL/skill-state.js";
import TelegramClient from "../../SKILL/skill-telegram-client.js";
import { generateApprovalButtons } from "../../SKILL/skill-telegram-client.js";

class MarketAgent {
  constructor() {
    this.state = new StateManager();
    this.telegram = new TelegramClient(
      process.env.TELEGRAM_BOT_TOKEN,
      process.env.TELEGRAM_CHAT_ID
    );
  }

  /**
   * Executar agent
   */
  async run() {
    try {
      console.log("[MarketAgent] Starting market data collection...");

      // 1. Coletar dados de mercado (de MCPs/APIs)
      const marketData = await this.collectMarketData();

      // 2. Gerar novo market-context.md
      const marketContextMd = this.generateMarketContextMarkdown(marketData);

      // 3. Salvar arquivo (skip on Vercel ephemeral filesystem)
      try {
        const contextPath = path.join(
          process.cwd(),
          "./skills/strategy/market-context.md"
        );
        const contextDir = path.dirname(contextPath);
        if (!fs.existsSync(contextDir)) {
          fs.mkdirSync(contextDir, { recursive: true });
        }
        fs.writeFileSync(contextPath, marketContextMd, "utf-8");
        console.log("[MarketAgent] market-context.md updated");
      } catch (fileError) {
        console.warn(
          "[MarketAgent] Could not write file (Vercel ephemeral)",
          fileError.message
        );
      }

      // 4. Salvar no estado
      await this.state.savePhaseData("market", marketData);

      // 5. Enviar preview ao Telegram (aguardando aprovação para commit)
      const messageId = await this.sendTelegramPreview(marketData);

      // 6. Registrar message ID
      await this.state.saveTelegramMessageId("market", messageId);

      console.log("[MarketAgent] Complete - awaiting approval to commit");
      return marketData;
    } catch (error) {
      console.error("[MarketAgent] Error:", error);
      await this.telegram.sendMessage(
        `❌ Erro ao coletar dados de mercado:\n\`${error.message}\``
      );
      throw error;
    }
  }

  /**
   * Coletar dados de mercado
   * TODO: Integrar com MCPs reais (Google Trends, Sensor Tower, CISA, Datasus)
   * Por enquanto: mock data + template para estrutura
   */
  async collectMarketData() {
    const today = new Date().toISOString().split("T")[0];

    // TODO: Chamar MCPs reais
    // const googleTrends = await mcp.googleTrends.search([...]);
    // const sensorTower = await mcp.sensorTower.getAppMetrics([...]);
    // const cisaData = await mcp.cisa.getPanorama(2026);
    // const datasus = await mcp.datasus.getHospitalizations(...);

    // Por enquanto, mock data estruturado (será atualizado com dados reais)
    return {
      date: today,
      updated_at: new Date().toISOString(),
      consumption_data: {
        per_capita_liters: 7.7,
        per_capita_year: 2024,
        excessive_consumption_pct: 15,
        excessive_year: 2025,
        non_drinkers_pct: 64,
        non_drinkers_year: 2025,
        hospitalizations: 418467,
        hospitalizations_year: 2024,
        deaths: 73019,
        deaths_year: 2023,
      },
      recent_trends: [
        {
          trend: "Consumo de cerveja nos fins de semana",
          change_pct: -25.4,
          period: "2025 vs 2024",
          source: "CISA",
        },
        {
          trend: "Consumo individual (solitário)",
          change_pct: 8.8,
          period: "2024-2025",
          source: "CISA",
        },
        {
          trend: "Gen Z abstenção",
          change_pct: 18,
          period: "2023-2025",
          source: "CISA/Ipsos",
        },
        {
          trend: "Consideraram reduzir consumo",
          change_pct: 62,
          period: "2025",
          source: "CISA Pesquisa",
        },
      ],
      geography: [
        {
          state: "Rio Grande do Sul",
          excessive_pct: 34,
          priority: "primary",
          source: "CISA 2025",
        },
        {
          state: "Mato Grosso do Sul",
          excessive_pct: 28,
          priority: "high",
          source: "CISA 2025",
        },
        {
          state: "São Paulo",
          excessive_pct: 22,
          priority: "volume",
          source: "CISA 2025",
        },
        {
          state: "Santa Catarina",
          excessive_pct: 26,
          priority: "high",
          source: "CISA 2025",
        },
        {
          state: "Rio de Janeiro",
          excessive_pct: 26.3,
          priority: "relevant",
          source: "CISA 2025",
        },
        {
          state: "Brasília (DF)",
          excessive_pct: 25.7,
          priority: "monitor",
          source: "CISA 2025",
        },
      ],
      competitors: [
        {
          name: "Sunflower",
          mau: 100000,
          rating: 4.8,
          reviews_count: 5200,
          strengths: ["Gamificação", "IA Sam", "HIPAA"],
          weaknesses: ["Sem fluência cultural BR", "Funcional não relacional"],
          market_positioning: "Duolingo para vícios",
          estimated_revenue_monthly: 150000,
          threat_level: "HIGH",
          source: "Sensor Tower",
        },
        {
          name: "Reframe",
          mau: 267000,
          rating: 4.6,
          reviews_count: 8900,
          strengths: ["Líder global", "Autoridade clínica", "Programa 160 dias"],
          weaknesses: ["Frio/protocolar", "Americano", "Caro"],
          market_positioning: "Science, not stigma",
          estimated_revenue_monthly: 300000,
          threat_level: "HIGH",
          source: "Sensor Tower",
        },
        {
          name: "I Am Sober",
          mau: 25000,
          rating: 4.2,
          reviews_count: 2100,
          strengths: ["Comunidade", "Contador", "Barato"],
          weaknesses: ["Sem IA real", "Sem personalização", "Comunidade tóxica"],
          market_positioning: "Contador + pledge + comunidade",
          estimated_revenue_monthly: 16000,
          threat_level: "MEDIUM",
          source: "Sensor Tower",
        },
      ],
      google_trends: {
        "reduzir álcool": { volume: 65, change: 12 },
        "parar de beber": { volume: 58, change: 8 },
        alcoolismo: { volume: 42, change: -5 },
        "ajuda dependência": { volume: 35, change: 15 },
      },
      sources: {
        cisa: "cisa.org.br/panorama",
        datasus: "datasus.saude.gov.br",
        google_trends: "trends.google.com",
        app_data: "sensortower.com",
      },
      notes: "Mock data — será atualizado com integrações de MCPs reais (CISA, Datasus, Google Trends, Sensor Tower)",
    };
  }

  /**
   * Gerar arquivo market-context.md com os novos dados
   */
  generateMarketContextMarkdown(marketData) {
    const today = marketData.date;
    const nextMonth = new Date(
      new Date(today).setMonth(new Date(today).getMonth() + 1)
    )
      .toISOString()
      .split("T")[0];

    const consumptionRows = [
      `| Consumo per capita | ${marketData.consumption_data.per_capita_liters} litros/ano | ${marketData.consumption_data.per_capita_year} | CISA |`,
      `| Consumo excessivo (população geral) | ${marketData.consumption_data.excessive_consumption_pct}% | ${marketData.consumption_data.excessive_year} | CISA Panorama ${marketData.consumption_data.excessive_year} |`,
      `| Não bebem (declarado) | ${marketData.consumption_data.non_drinkers_pct}% | ${marketData.consumption_data.non_drinkers_year} | CISA / Ipsos |`,
      `| Internações atribuíveis ao álcool | ${marketData.consumption_data.hospitalizations.toLocaleString("pt-BR")} | ${marketData.consumption_data.hospitalizations_year} | Datasus |`,
      `| Óbitos atribuíveis ao álcool | ${marketData.consumption_data.deaths.toLocaleString("pt-BR")} | ${marketData.consumption_data.deaths_year} | Datasus |`,
    ].join("\n");

    const trendsText = marketData.recent_trends
      .map(
        (t) =>
          `- ${t.trend}: **${t.change_pct > 0 ? "+" : ""}${t.change_pct}%** em ${t.period} (${t.source})`
      )
      .join("\n");

    const geoRows = marketData.geography
      .map(
        (g) =>
          `| ${g.state} | ${g.excessive_pct}% consumo excessivo | ${g.priority.toUpperCase()} |`
      )
      .join("\n");

    const competitorSections = marketData.competitors
      .map(
        (c) => `
### ${c.name} — Threat: ${c.threat_level}
- **Tração:** ${c.mau.toLocaleString("pt-BR")} MAUs. Rating ${c.rating}★ (${c.reviews_count.toLocaleString("pt-BR")} reviews)
- **Receita estimada:** $${c.estimated_revenue_monthly.toLocaleString("pt-BR")}/mês
- **Posicionamento:** "${c.market_positioning}"
- **Forças:** ${c.strengths.join(", ")}
- **Fraquezas:** ${c.weaknesses.join(", ")}
`
      )
      .join("\n");

    return `# Market Context — Padrinho

> **Protocolo de atualização:** Este arquivo é atualizado automaticamente pelo Market Agent.
> Última atualização:** ${today}
> **Próxima atualização:** ${nextMonth}

---

## 📊 Dados de Consumo — Brasil

| Indicador | Valor | Ano | Fonte |
|---|---|---|---|
${consumptionRows}

### Tendências recentes
${trendsText}

---

## Mercado Endereçável

### Escala de dependência
\`\`\`
Não Alcoólico → Social & Moderado (10%) → [EXCESSIVO 70%] → Dependente (20%) → Forte
\`\`\`

**Foco: segmento Excessivo — 70% do mercado**

Características:
- Funcional, tem vida social ativa, não se identifica com o estereótipo
- O álcool como anfitrião social, não como problema reconhecido
- "Bebo só no fim de semana" — mas a cultura do FDS é intensa
- Resistência a buscar ajuda por não se ver no espelho clínico

---

## 📊 Geografia Prioritária

| Estado | Dado | Prioridade |
|---|---|---|
${geoRows}

---

## Perfil Demográfico do Público-Alvo

- Idade: 25–54 anos
- Renda: acima de R$ 2.000/mês
- Classe: B, C, D
- Hábitos: consome conteúdo online, busca soluções digitais
- Cultura: happy hour, sertanejo, samba, pagode
- Canal: Instagram, YouTube, Facebook, Google

---

## 📊 Concorrentes Diretos (Atualizados em ${today})

${competitorSections}

---

## Google Trends — Interesse de Busca 🔍

| Termo | Volume (0-100) | Mudança | Geog |
|---|---|---|---|
${marketData.google_trends
  ? Object.entries(marketData.google_trends)
      .map(
        ([term, data]) =>
          `| "${term}" | ${data.volume} | ${data.change > 0 ? "+" : ""}${data.change} | Brasil |`
      )
      .join("\n")
  : "| — | — | — | — |"}

---

## Fontes de Dados

- **CISA Panorama:** ${marketData.sources.cisa}
- **Datasus:** ${marketData.sources.datasus}
- **Google Trends:** ${marketData.sources.google_trends}
- **App Data (Sensor Tower):** ${marketData.sources.app_data}

---

${marketData.notes ? `**Nota:** ${marketData.notes}` : ""}
`;
  }

  /**
   * Enviar preview ao Telegram (aguardando aprovação para commitar)
   */
  async sendTelegramPreview(marketData) {
    const date = marketData.date;
    const competitors = marketData.competitors;
    const topCompetitor = competitors[0];
    const geoTop = marketData.geography[0];

    const message = `
📊 **MARKET DATA UPDATE** — ${date}

**Consumo 🍺**
- Per capita: ${marketData.consumption_data.per_capita_liters} L/ano
- Excessivo: ${marketData.consumption_data.excessive_consumption_pct}%
- Não bebem: ${marketData.consumption_data.non_drinkers_pct}%
- Mortes (2023): ${marketData.consumption_data.deaths.toLocaleString("pt-BR")}

**Top Trend 📈**
${marketData.recent_trends[0].trend}: **${marketData.recent_trends[0].change_pct > 0 ? "+" : ""}${marketData.recent_trends[0].change_pct}%**

**Geo Priority 🗺️**
${geoTop.state}: ${geoTop.excessive_pct}% consumo excessivo

**Main Competitor 🎯**
${topCompetitor.name}
- ${topCompetitor.mau.toLocaleString("pt-BR")} MAUs
- Threat: **${topCompetitor.threat_level}**

---
market-context.md atualizado com ${competitors.length} competitors + ${marketData.geography.length} estados

Comitar atualização?
    `.trim();

    const buttons = generateApprovalButtons("market", date);

    const result = await this.telegram.sendMessageWithButtons(
      message,
      buttons
    );

    return result.message_id;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

// Vercel serverless handler (default export for /api/agents/agent-market)
export default async (req, res) => {
  console.log(`[MarketAgent] Handler called at ${new Date().toISOString()}`);
  
  // Allow Vercel cron invocations (no secret needed)
  const isVercelCron = !!req.headers["x-vercel-cron"];
  const providedSecret = req.query.secret || req.headers["authorization"]?.split(" ")[1];
  
  if (!isVercelCron && providedSecret !== process.env.CRON_SECRET) {
    console.error(`[MarketAgent] Invalid secret provided`);
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  console.log(`[MarketAgent] Invoking as: ${isVercelCron ? "Vercel Cron" : "Manual"}`);

  const agent = new MarketAgent();

  try {
    console.log(`[MarketAgent] Starting agent.run()`);
    const data = await agent.run();
    console.log(`[MarketAgent] Completed successfully`);
    res.json({
      ok: true,
      message: "Market data collected and market-context.md updated",
      data,
    });
  } catch (error) {
    console.error(`[MarketAgent] Error:`, error);
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};
// Export classes for test-trigger
export { MarketAgent };
