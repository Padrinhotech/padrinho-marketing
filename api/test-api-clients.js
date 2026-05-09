/**
 * Test API Clients: Verify each API integration works
 * 
 * URL: https://padrinho-marketing.vercel.app/api/test-api-clients?test=insights
 * URL: https://padrinho-marketing.vercel.app/api/test-api-clients?test=pipeboard
 * URL: https://padrinho-marketing.vercel.app/api/test-api-clients?test=supabase
 */

import InsightfulpipeClient from "../SKILL/skill-insightfulpipe.js";
import PipeboardClient from "../SKILL/skill-pipeboard.js";
import SupabaseClient from "../SKILL/skill-supabase.js";

export default async (req, res) => {
  try {
    const test = req.query.test || "all";

    const results = {
      timestamp: new Date().toISOString(),
      tests_run: [],
    };

    // Test Insightfulpipe
    if (test === "all" || test === "insights") {
      console.log("[TestAPI] Testing Insightfulpipe...");
      try {
        const client = new InsightfulpipeClient(
          process.env.INSIGHTFULPIPE_API_KEY,
          process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
        );
        const data = await client.getInstagramOrganic();
        results.tests_run.push({
          name: "Insightfulpipe (Instagram)",
          status: data ? "✅ Success" : "⚠️  Empty response",
          data: data ? "Data received" : null,
          error: null,
        });
      } catch (error) {
        results.tests_run.push({
          name: "Insightfulpipe (Instagram)",
          status: "❌ Error",
          error: error.message,
        });
      }
    }

    // Test Pipeboard Meta Ads
    if (test === "all" || test === "pipeboard") {
      console.log("[TestAPI] Testing Pipeboard Meta Ads...");
      try {
        const client = new PipeboardClient(process.env.PIPEBOARD_API_KEY);
        const metaData = await client.getMetaAds(process.env.META_ADS_ACCOUNT_ID);
        results.tests_run.push({
          name: "Pipeboard (Meta Ads)",
          status: metaData ? "✅ Success" : "⚠️  Empty response",
          data: metaData ? "Data received" : null,
          error: null,
        });

        // Also test Google Ads
        const googleData = await client.getGoogleAds(
          process.env.GOOGLE_ADS_ACCOUNT_ID
        );
        results.tests_run.push({
          name: "Pipeboard (Google Ads)",
          status: googleData ? "✅ Success" : "⚠️  Empty response",
          data: googleData ? "Data received" : null,
          error: null,
        });
      } catch (error) {
        results.tests_run.push({
          name: "Pipeboard (Meta/Google Ads)",
          status: "❌ Error",
          error: error.message,
        });
      }
    }

    // Test Supabase
    if (test === "all" || test === "supabase") {
      console.log("[TestAPI] Testing Supabase...");
      try {
        const client = new SupabaseClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_API_KEY || process.env.SUPABASE_ANON_KEY
        );
        const data = await client.getAudienceInsights();
        results.tests_run.push({
          name: "Supabase (Audience Insights)",
          status: data ? "✅ Success" : "⚠️  Empty response",
          data: data ? "Data received" : null,
          error: null,
        });
      } catch (error) {
        results.tests_run.push({
          name: "Supabase (Audience Insights)",
          status: "❌ Error",
          error: error.message,
        });
      }
    }

    console.log("[TestAPI] Results:", JSON.stringify(results, null, 2));
    res.status(200).json(results);
  } catch (error) {
    console.error("[TestAPI] Fatal error:", error);
    res.status(500).json({ error: error.message });
  }
};
