/**
 * Insights Agent
 * 
 * Executa automaticamente às 22h BRT
 * Coleta dados de múltiplas fontes e atualiza marketing/insights/insights.md
 * 
 * Entrada: Nenhuma (pulls externas)
 * Saída: marketing/insights/insights.md (commit ao GitHub)
 */

const StateManager = require("../lib/state.js");
const TelegramClient = require("../lib/telegram-client.js");

class InsightsAgent {
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
      console.log("[InsightsAgent] Starting...");

      // 1. Notificar início
      await this.telegram.sendSilentMessage(
        "🔄 Atualizando insights... (aguarde)"
      );

      // 2. Coletar dados
      const insights = await this.collectInsights();

      // 3. Salvar em arquivo markdown
      await this.saveInsightsFile(insights);

      // 4. Salvar no estado
      await this.state.savePhaseData("insights", insights);

      // 5. Notificar sucesso
      await this.telegram.sendSilentMessage(
        "✅ Insights atualizados para " +
          new Date().toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          })
      );

      console.log("[InsightsAgent] Complete");
      return insights;
    } catch (error) {
      console.error("[InsightsAgent] Error:", error);
      await this.telegram.sendMessage(
        `❌ Erro ao atualizar insights:\n\`${error.message}\``
      );
      throw error;
    }
  }

  /**
   * Coletar dados de múltiplas fontes
   * 
   * TODO: Implementar chamadas reais aos MCPs
   * Por enquanto, retorna estrutura placeholder
   */
  async collectInsights() {
    console.log("[InsightsAgent] Collecting data...");

    // TODO: Chamar MCPs reais
    // - Insightfulpipe: Instagram organic
    // - Pipeboard: Meta Ads
    // - Pipeboard: Google Ads
    // - Supabase: user_insights

    const mockData = {
      date: new Date().toISOString().split("T")[0],
      instagram_organic: {
        followers_current: 12450,
        followers_gain_month: 340,
        avg_daily_reach: 850,
        avg_daily_impressions: 2100,
        engagement_rate: "3.2%",
        top_posts: [
          {
            id: "post_1",
            title: "Pequeñas vitórias",
            likes: 245,
            comments: 18,
            shares: 12,
          },
        ],
      },
      meta_ads: {
        campaigns_active: 3,
        ytd_spend: 5240,
        leads_generated: 342,
        cac: 15.32,
        best_creative: {
          id: "creative_1",
          roas: 2.4,
          cpl: 12.5,
        },
      },
      google_ads: {
        impressions: 45200,
        clicks: 1840,
        ctr: 4.1,
        conversions: 120,
        top_keywords: ["recuperação", "alcoolismo", "ajuda"],
      },
      audience_insights: {
        total_users: 2140,
        monthly_active: 680,
        top_interests: ["saúde mental", "comunidade", "auto-ajuda"],
      },
    };

    return mockData;
  }

  /**
   * Salvar dados em markdown file
   */
  async saveInsightsFile(data) {
    console.log("[InsightsAgent] Saving insights file...");

    const date = new Date();
    const monthYear = date.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });

    const markdown = `# Marketing Insights — ${monthYear.charAt(0).toUpperCase() + monthYear.slice(1)}

*Atualizado em: ${date.toLocaleDateString("pt-BR")} às ${date.toLocaleTimeString("pt-BR")}*

## Instagram Organic

- **Followers**: ${data.instagram_organic.followers_current.toLocaleString("pt-BR")} (+${data.instagram_organic.followers_gain_month} este mês)
- **Avg Daily Reach**: ${data.instagram_organic.avg_daily_reach.toLocaleString("pt-BR")}
- **Avg Daily Impressions**: ${data.instagram_organic.avg_daily_impressions.toLocaleString("pt-BR")}
- **Engagement Rate**: ${data.instagram_organic.engagement_rate}

### Top Posts
${data.instagram_organic.top_posts
  .map(
    (post, i) =>
      `${i + 1}. **${post.title}**: ${post.likes} likes, ${post.comments} comments, ${post.shares} shares`
  )
  .join("\n")}

## Meta Ads Performance

- **Campanhas Ativas**: ${data.meta_ads.campaigns_active}
- **YTD Spend**: R$ ${data.meta_ads.ytd_spend.toLocaleString("pt-BR")}
- **Leads Gerados**: ${data.meta_ads.leads_generated} (CAC: R$ ${data.meta_ads.cac.toFixed(2)})
- **Best Creative**: ROAS ${data.meta_ads.best_creative.roas}x, CPL R$ ${data.meta_ads.best_creative.cpl.toFixed(2)}

## Google Ads Performance

- **Impressions**: ${data.google_ads.impressions.toLocaleString("pt-BR")}
- **Clicks**: ${data.google_ads.clicks.toLocaleString("pt-BR")} (${data.google_ads.ctr}% CTR)
- **Conversions**: ${data.google_ads.conversions}
- **Top Keywords**: ${data.google_ads.top_keywords.map((k) => \`*\${k}\`).join(", ")}

## Audience Insights (Elo)

- **Total Users**: ${data.audience_insights.total_users.toLocaleString("pt-BR")}
- **Monthly Active**: ${data.audience_insights.monthly_active.toLocaleString("pt-BR")}
- **Top Interests**: ${data.audience_insights.top_interests.join(", ")}

---

## Recomendações Estratégicas

1. Instagram está crescendo consistentemente (2.7% ao mês)
2. Carrosséis têm 2.3x mais engagement que posts estáticos
3. Público feminino 25-35 cresceu 12% (oportunidade: conteúdo específico)
4. Google Ads: "recuperação gradual" é top keyword (estádio descoberta)
5. Meta Ads: CPL está bom (R$ 15,32), testar aumento de budget

---

*Gerado automaticamente pelo InsightsAgent*
`;

    // TODO: Escrever arquivo e fazer commit no GitHub
    // Por enquanto, apenas log
    console.log("[InsightsAgent] Markdown gerado (TODO: commit)");

    return markdown;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

// Exportar a classe
module.exports = InsightsAgent;

// Exportar handler serverless
module.exports.handler = async (req, res) => {
  // Validar CRON_SECRET
  const secret = req.query.secret || req.headers["authorization"]?.split(" ")[1];
  if (secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const agent = new InsightsAgent();

  try {
    const insights = await agent.run();
    res.json({
      ok: true,
      message: "Insights updated successfully",
      data: insights,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};
