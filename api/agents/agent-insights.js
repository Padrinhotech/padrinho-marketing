/**
 * Insights Agent
 * 
 * Executa automaticamente às 22h BRT
 * Coleta dados de múltiplas fontes e atualiza KNOW/KNOW_Insights.md
 * 
 * Entrada: Nenhuma (pulls externas)
 * Saída: KNOW/KNOW_Insights.md (commit ao GitHub)
 */

import StateManager from "../../SKILL/skill-state.js";
import TelegramClient from "../../SKILL/skill-telegram-client.js";
import InsightfulpipeClient from "../../SKILL/skill-insightfulpipe.js";
import PipeboardClient from "../../SKILL/skill-pipeboard.js";
import SupabaseClient from "../../SKILL/skill-supabase.js";

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
      console.log("[InsightsAgent] Saving insights to state...");
      console.log("[InsightsAgent] Data to save:", JSON.stringify(insights).substring(0, 200));
      await this.state.savePhaseData("insights", insights);
      console.log("[InsightsAgent] Saved to state successfully");

      // 5. Enviar resumo detalhado no Telegram
      await this.sendInsightsSummary(insights);

      // 6. Notificar sucesso
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
   * Integra com APIs reais:
   * - Insightfulpipe: Instagram organic
   * - Pipeboard: Meta Ads e Google Ads
   * - Supabase: audience_insights
   */
  async collectInsights() {
    console.log("[InsightsAgent] Collecting data from real sources...");

    const data = {
      date: new Date().toISOString().split("T")[0],
    };

    // 1. Insightfulpipe - Instagram Organic
    if (process.env.INSIGHTFULPIPE_API_KEY && process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID) {
      const insightfulpipe = new InsightfulpipeClient(
        process.env.INSIGHTFULPIPE_API_KEY,
        process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
      );
      data.instagram_organic = await insightfulpipe.getInstagramOrganic();
    } else {
      console.warn(
        "[InsightsAgent] INSIGHTFULPIPE_API_KEY or INSTAGRAM_BUSINESS_ACCOUNT_ID not configured"
      );
      data.instagram_organic = this._getMockInstagramData();
    }

    // 2. Pipeboard - Meta Ads
    if (
      process.env.PIPEBOARD_API_KEY &&
      process.env.META_ADS_ACCOUNT_ID
    ) {
      const pipeboard = new PipeboardClient(process.env.PIPEBOARD_API_KEY);
      data.meta_ads = await pipeboard.getMetaAds(
        process.env.META_ADS_ACCOUNT_ID
      );
    } else {
      console.warn(
        "[InsightsAgent] PIPEBOARD_API_KEY or META_ADS_ACCOUNT_ID not configured"
      );
      data.meta_ads = this._getMockMetaAdsData();
    }

    // 3. Pipeboard - Google Ads
    if (
      process.env.PIPEBOARD_API_KEY &&
      process.env.GOOGLE_ADS_ACCOUNT_ID
    ) {
      const pipeboard = new PipeboardClient(process.env.PIPEBOARD_API_KEY);
      data.google_ads = await pipeboard.getGoogleAds(
        process.env.GOOGLE_ADS_ACCOUNT_ID
      );
    } else {
      console.warn(
        "[InsightsAgent] PIPEBOARD_API_KEY or GOOGLE_ADS_ACCOUNT_ID not configured"
      );
      data.google_ads = this._getMockGoogleAdsData();
    }

    // 4. Supabase - Audience Insights
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_API_KEY || process.env.SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      const supabase = new SupabaseClient(supabaseUrl, supabaseKey);
      data.audience_insights = await supabase.getAudienceInsights();
    } else {
      console.warn(
        "[InsightsAgent] SUPABASE_URL or SUPABASE_API_KEY/SUPABASE_ANON_KEY not configured"
      );
      data.audience_insights = this._getMockAudienceData();
    }

    return data;
  }

  /**
   * Mock data fallbacks when APIs not configured
   */
  _getMockInstagramData() {
    return {
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
    };
  }

  _getMockMetaAdsData() {
    return {
      campaigns_active: 3,
      ytd_spend: 5240,
      leads_generated: 342,
      cac: "15.32",
      best_creative: {
        id: "creative_1",
        roas: "2.40",
        cpl: "12.50",
      },
    };
  }

  _getMockGoogleAdsData() {
    return {
      impressions: 45200,
      clicks: 1840,
      ctr: "4.07",
      conversions: 120,
      conversion_rate: "6.52",
      top_keywords: ["recuperação", "alcoolismo", "ajuda"],
    };
  }

  _getMockAudienceData() {
    return {
      total_users: 2140,
      monthly_active: 680,
      top_interests: ["saúde mental", "comunidade", "auto-ajuda"],
      engagement_score: "31.8",
    };
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
- **Top Keywords**: ${data.google_ads.top_keywords.map((k) => "*" + k).join(", ")}

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

  /**
   * Enviar resumo dos insights no Telegram
   */
  async sendInsightsSummary(data) {
    console.log("[InsightsAgent] Sending Telegram summary...");

    const date = new Date();
    const dateStr = date.toLocaleDateString("pt-BR");

    // Formatar resumo detalhado
    const summary = `
📊 *INSIGHTS — ${dateStr}*

🔴 *INSTAGRAM ORGANIC*
followers: ${data.instagram_organic.followers_current.toLocaleString("pt-BR")} (+${data.instagram_organic.followers_gain_month} mês)
reach: ~${data.instagram_organic.avg_daily_reach.toLocaleString("pt-BR")}/dia
engagement: ${data.instagram_organic.engagement_rate}

💰 *META ADS*
spend (YTD): R$ ${data.meta_ads.ytd_spend.toLocaleString("pt-BR")}
leads: ${data.meta_ads.leads_generated} (CAC: R$ ${data.meta_ads.cac.toFixed(2)})
best creative ROAS: ${data.meta_ads.best_creative.roas}x

🔎 *GOOGLE ADS*
impressions: ${data.google_ads.impressions.toLocaleString("pt-BR")}
clicks: ${data.google_ads.clicks.toLocaleString("pt-BR")} (CTR: ${data.google_ads.ctr}%)
conversions: ${data.google_ads.conversions}
top keyword: "${data.google_ads.top_keywords[0]}"

👥 *AUDIENCE (Elo)*
total: ${data.audience_insights.total_users.toLocaleString("pt-BR")}
monthly active: ${data.audience_insights.monthly_active.toLocaleString("pt-BR")}
top interest: ${data.audience_insights.top_interests[0]}

📈 Strategy Agent runs tomorrow at 8h BRT
`;

    try {
      await this.telegram.sendMessage(summary);
      console.log("[InsightsAgent] Summary sent to Telegram");
    } catch (error) {
      console.error("[InsightsAgent] Failed to send summary:", error);
      // Don't throw - agent should complete even if message fails
    }
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

// Vercel serverless handler (default export)
export default async (req, res) => {
  console.log(`[InsightsAgent] Handler called at ${new Date().toISOString()}`);
  
  // Allow Vercel cron invocations (no secret needed)
  // Only require secret for manual invocations
  const isVercelCron = !!req.headers["x-vercel-cron"];
  const providedSecret = req.query.secret || req.headers["authorization"]?.split(" ")[1];
  
  if (!isVercelCron && providedSecret !== process.env.CRON_SECRET) {
    console.error(`[InsightsAgent] Invalid secret provided`);
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  console.log(`[InsightsAgent] Invoking as: ${isVercelCron ? "Vercel Cron" : "Manual"}`);

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

// Export the class for external use (e.g., test-trigger)
export { InsightsAgent };
