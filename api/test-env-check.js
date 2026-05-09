/**
 * Test Endpoint: Check if environment variables are accessible on Vercel
 * 
 * URL: https://padrinho-marketing.vercel.app/api/test-env-check
 * 
 * Shows which API credentials are available at runtime
 */

export default async (req, res) => {
  try {
    console.log("[TestEnv] Checking environment variables on Vercel...");

    const envCheck = {
      timestamp: new Date().toISOString(),
      vercel: !!process.env.VERCEL,
      node_env: process.env.NODE_ENV,
      credentials_status: {
        INSIGHTFULPIPE_API_KEY: !!process.env.INSIGHTFULPIPE_API_KEY,
        INSTAGRAM_BUSINESS_ACCOUNT_ID: !!process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID,
        PIPEBOARD_API_KEY: !!process.env.PIPEBOARD_API_KEY,
        META_ADS_ACCOUNT_ID: !!process.env.META_ADS_ACCOUNT_ID,
        GOOGLE_ADS_ACCOUNT_ID: !!process.env.GOOGLE_ADS_ACCOUNT_ID,
        SUPABASE_URL: !!process.env.SUPABASE_URL,
        SUPABASE_API_KEY: !!process.env.SUPABASE_API_KEY,
        SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
        TELEGRAM_BOT_TOKEN: !!process.env.TELEGRAM_BOT_TOKEN,
        TELEGRAM_CHAT_ID: !!process.env.TELEGRAM_CHAT_ID,
        GITHUB_TOKEN: !!process.env.GITHUB_TOKEN,
        ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
      },
      // Show masked values for debugging
      masked_values: {
        INSIGHTFULPIPE_API_KEY: process.env.INSIGHTFULPIPE_API_KEY
          ? process.env.INSIGHTFULPIPE_API_KEY.substring(0, 5) + "***"
          : null,
        PIPEBOARD_API_KEY: process.env.PIPEBOARD_API_KEY
          ? process.env.PIPEBOARD_API_KEY.substring(0, 5) + "***"
          : null,
        SUPABASE_URL: process.env.SUPABASE_URL || null,
      },
    };

    console.log("[TestEnv] Result:", JSON.stringify(envCheck, null, 2));

    res.status(200).json(envCheck);
  } catch (error) {
    console.error("[TestEnv] Error:", error);
    res.status(500).json({ error: error.message });
  }
};
