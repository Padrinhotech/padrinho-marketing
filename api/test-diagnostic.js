/**
 * Diagnostic Test Endpoint
 * Simple test to verify Vercel function is working
 */

module.exports = async function handler(req, res) {
  try {
    console.log("[Diagnostic] Request received");
    console.log("[Diagnostic] Environment check:");
    console.log(`  - NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`  - ANTHROPIC_API_KEY: ${process.env.ANTHROPIC_API_KEY ? "✅" : "❌"}`);
    console.log(`  - TELEGRAM_BOT_TOKEN: ${process.env.TELEGRAM_BOT_TOKEN ? "✅" : "❌"}`);
    console.log(`  - TELEGRAM_CHAT_ID: ${process.env.TELEGRAM_CHAT_ID ? "✅" : "❌"}`);

    // Try to load InsightsAgent
    console.log("[Diagnostic] Attempting to load InsightsAgent...");
    try {
      const insightsModule = require("./agents/agent-insights");
      console.log(`[Diagnostic] Module loaded successfully`);
      console.log(`[Diagnostic] Module has InsightsAgent: ${!!insightsModule.InsightsAgent}`);

      if (insightsModule.InsightsAgent) {
        console.log(`[Diagnostic] Attempting to instantiate InsightsAgent...`);
        const agent = new insightsModule.InsightsAgent();
        console.log(`[Diagnostic] Agent instantiated: ${agent.constructor.name}`);
      }
    } catch (importError) {
      console.error("[Diagnostic] Import error:", importError.message);
      console.error("[Diagnostic] Stack:", importError.stack);
      return res.status(500).json({
        success: false,
        error: "Failed to load agent module",
        details: importError.message,
        stack: importError.stack,
      });
    }

    return res.status(200).json({
      success: true,
      message: "System diagnostic complete",
      timestamp: new Date().toISOString(),
      environment: {
        has_anthropic_key: !!process.env.ANTHROPIC_API_KEY,
        has_telegram_token: !!process.env.TELEGRAM_BOT_TOKEN,
        has_telegram_chat_id: !!process.env.TELEGRAM_CHAT_ID,
      },
    });
  } catch (error) {
    console.error("[Diagnostic] Unhandled error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
  }
};
