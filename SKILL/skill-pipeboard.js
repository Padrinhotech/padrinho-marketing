/**
 * Pipeboard API Client
 * Fetches Meta Ads and Google Ads data
 */

class PipeboardClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.pipeboard.com/v1";
  }

  /**
   * Get Meta Ads (Facebook & Instagram Ads) metrics
   * @param {string} accountId Meta Ads account ID
   * @returns {Promise<Object>} Meta ads metrics
   */
  async getMetaAds(accountId) {
    try {
      console.log("[Pipeboard] Fetching Meta Ads data for account:", accountId);

      const response = await fetch(
        `${this.baseUrl}/facebook/accounts/${accountId}/campaigns`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Pipeboard API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Aggregate data from all campaigns
      const campaigns = data.campaigns || [];
      const totalSpend = campaigns.reduce((sum, c) => sum + (c.spend || 0), 0);
      const totalLeads = campaigns.reduce((sum, c) => sum + (c.leads || 0), 0);
      const bestCreative = this._findBestCreative(campaigns);

      return {
        campaigns_active: campaigns.filter((c) => c.status === "ACTIVE").length,
        ytd_spend: totalSpend,
        leads_generated: totalLeads,
        cac: totalLeads > 0 ? (totalSpend / totalLeads).toFixed(2) : 0,
        best_creative: bestCreative || {
          id: "none",
          roas: 0,
          cpl: 0,
        },
        campaigns_summary: campaigns.map((c) => ({
          id: c.id,
          name: c.name,
          status: c.status,
          spend: c.spend || 0,
          leads: c.leads || 0,
        })),
      };
    } catch (error) {
      console.error("[Pipeboard] Meta Ads error:", error.message);
      return {
        campaigns_active: 0,
        ytd_spend: 0,
        leads_generated: 0,
        cac: 0,
        best_creative: { id: "error", roas: 0, cpl: 0 },
        error: error.message,
      };
    }
  }

  /**
   * Get Google Ads metrics
   * @param {string} accountId Google Ads account ID
   * @returns {Promise<Object>} Google Ads metrics
   */
  async getGoogleAds(accountId) {
    try {
      console.log("[Pipeboard] Fetching Google Ads data for account:", accountId);

      const response = await fetch(
        `${this.baseUrl}/google/accounts/${accountId}/campaigns`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Pipeboard API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const campaigns = data.campaigns || [];

      // Calculate aggregated metrics
      const totalImpressions = campaigns.reduce(
        (sum, c) => sum + (c.impressions || 0),
        0
      );
      const totalClicks = campaigns.reduce(
        (sum, c) => sum + (c.clicks || 0),
        0
      );
      const totalConversions = campaigns.reduce(
        (sum, c) => sum + (c.conversions || 0),
        0
      );

      return {
        impressions: totalImpressions,
        clicks: totalClicks,
        ctr: totalImpressions > 0
          ? ((totalClicks / totalImpressions) * 100).toFixed(2)
          : 0,
        conversions: totalConversions,
        conversion_rate:
          totalClicks > 0
            ? ((totalConversions / totalClicks) * 100).toFixed(2)
            : 0,
        top_keywords: this._extractTopKeywords(campaigns),
        campaigns_count: campaigns.length,
      };
    } catch (error) {
      console.error("[Pipeboard] Google Ads error:", error.message);
      return {
        impressions: 0,
        clicks: 0,
        ctr: 0,
        conversions: 0,
        conversion_rate: 0,
        top_keywords: [],
        error: error.message,
      };
    }
  }

  /**
   * Helper: Find best performing creative
   */
  _findBestCreative(campaigns) {
    let bestCreative = null;
    let bestROAS = 0;

    campaigns.forEach((campaign) => {
      const creatives = campaign.creatives || [];
      creatives.forEach((creative) => {
        const roas = creative.roas || 0;
        if (roas > bestROAS) {
          bestROAS = roas;
          bestCreative = {
            id: creative.id,
            roas: roas.toFixed(2),
            cpl: (creative.cost_per_lead || 0).toFixed(2),
          };
        }
      });
    });

    return bestCreative;
  }

  /**
   * Helper: Extract top keywords from Google Ads
   */
  _extractTopKeywords(campaigns) {
    const keywordMap = {};

    campaigns.forEach((campaign) => {
      const keywords = campaign.keywords || [];
      keywords.forEach((kw) => {
        const term = kw.text || "";
        keywordMap[term] = (keywordMap[term] || 0) + (kw.clicks || 0);
      });
    });

    return Object.entries(keywordMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([term]) => term);
  }
}

module.exports = PipeboardClient;
