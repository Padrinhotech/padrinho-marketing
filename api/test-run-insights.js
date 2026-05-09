/**
 * Manual Trigger: Run InsightsAgent
 * 
 * URL: https://padrinho-marketing.vercel.app/api/test-run-insights
 * 
 * This allows manual testing of the insights agent
 * Useful for debugging before the scheduled cron runs
 */

import InsightfulpipeClient from "../SKILL/skill-insightfulpipe.js";
import PipeboardClient from "../SKILL/skill-pipeboard.js";
import SupabaseClient from "../SKILL/skill-supabase.js";
import StateManager from "../SKILL/skill-state.js";

class TestInsightsAgent {
  constructor() {
    this.state = new StateManager();
  }

  async run() {
    try {
      console.log("[TestInsightsAgent] Starting manual test...");

      const data = {
        date: new Date().toISOString().split("T")[0],
        timestamp: new Date().toISOString(),
        manual_test: true,
      };

      // 1. Insightfulpipe - Instagram Organic
      console.log("[TestInsightsAgent] Fetching Instagram data...");
      if (process.env.INSIGHTFULPIPE_API_KEY && process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID) {
        const insightfulpipe = new InsightfulpipeClient(
          process.env.INSIGHTFULPIPE_API_KEY,
          process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
        );
        data.instagram_organic = await insightfulpipe.getInstagramOrganic();
        console.log("[TestInsightsAgent] Instagram data:", JSON.stringify(data.instagram_organic).substring(0, 100));
      }

      // 2. Pipeboard - Meta Ads
      console.log("[TestInsightsAgent] Fetching Meta Ads data...");
      if (process.env.PIPEBOARD_API_KEY && process.env.META_ADS_ACCOUNT_ID) {
        const pipeboard = new PipeboardClient(process.env.PIPEBOARD_API_KEY);
        data.meta_ads = await pipeboard.getMetaAds(process.env.META_ADS_ACCOUNT_ID);
        console.log("[TestInsightsAgent] Meta data:", JSON.stringify(data.meta_ads).substring(0, 100));
      }

      // 3. Pipeboard - Google Ads
      console.log("[TestInsightsAgent] Fetching Google Ads data...");
      if (process.env.PIPEBOARD_API_KEY && process.env.GOOGLE_ADS_ACCOUNT_ID) {
        const pipeboard = new PipeboardClient(process.env.PIPEBOARD_API_KEY);
        data.google_ads = await pipeboard.getGoogleAds(process.env.GOOGLE_ADS_ACCOUNT_ID);
        console.log("[TestInsightsAgent] Google data:", JSON.stringify(data.google_ads).substring(0, 100));
      }

      // 4. Supabase - Audience Insights
      console.log("[TestInsightsAgent] Fetching Audience data...");
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_API_KEY || process.env.SUPABASE_ANON_KEY;
      
      if (supabaseUrl && supabaseKey) {
        const supabase = new SupabaseClient(supabaseUrl, supabaseKey);
        data.audience_insights = await supabase.getAudienceInsights();
        console.log("[TestInsightsAgent] Audience data:", JSON.stringify(data.audience_insights).substring(0, 100));
      }

      // Save to state
      console.log("[TestInsightsAgent] Saving to state...");
      await this.state.savePhaseData("insights", data);

      return {
        success: true,
        data_collected: {
          instagram: !!data.instagram_organic,
          meta_ads: !!data.meta_ads,
          google_ads: !!data.google_ads,
          audience: !!data.audience_insights,
        },
        full_data: data,
      };
    } catch (error) {
      console.error("[TestInsightsAgent] Error:", error);
      throw error;
    }
  }
}

export default async (req, res) => {
  try {
    const agent = new TestInsightsAgent();
    const result = await agent.run();
    res.status(200).json(result);
  } catch (error) {
    console.error("[TestInsightsAgent] Handler error:", error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
};
