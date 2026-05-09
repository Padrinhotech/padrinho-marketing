/**
 * Manual Test Trigger Endpoint
 * 
 * Allows manually triggering any agent for testing without waiting for cron
 * 
 * Usage:
 * POST /api/test-trigger?agent=insights
 * POST /api/test-trigger?agent=market
 * POST /api/test-trigger?agent=strategy
 * etc.
 */

const InsightsAgent = require("./agents/agent-insights");
const MarketAgent = require("./agents/agent-market");
const UserInsightsAgent = require("./agents/agent-user-insights");
const StrategyAgent = require("./agents/agent-strategy");
const TacticAgent = require("./agents/agent-tactic");
const OperationalAgent = require("./agents/agent-operational");
const FigmaAgent = require("./agents/agent-figma");

const AGENT_MAP = {
  insights: InsightsAgent,
  market: MarketAgent,
  "user-insights": UserInsightsAgent,
  strategy: StrategyAgent,
  tactic: TacticAgent,
  operational: OperationalAgent,
  figma: FigmaAgent,
};

module.exports = async function handler(req, res) {
  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Method not allowed",
        message: "Use POST /api/test-trigger?agent=<agent-name>",
        available_agents: Object.keys(AGENT_MAP),
      });
    }

    // Get agent name from query parameter
    const { agent } = req.query;

    if (!agent) {
      return res.status(400).json({
        error: "Missing agent parameter",
        usage: "POST /api/test-trigger?agent=<agent-name>",
        available_agents: Object.keys(AGENT_MAP),
      });
    }

    const agentName = agent.toLowerCase();

    if (!AGENT_MAP[agentName]) {
      return res.status(400).json({
        error: `Unknown agent: ${agentName}`,
        available_agents: Object.keys(AGENT_MAP),
      });
    }

    console.log(`[TestTrigger] Running agent: ${agentName}`);

    // Instantiate and run the agent
    const AgentClass = AGENT_MAP[agentName];
    const agentInstance = new AgentClass();
    const result = await agentInstance.run();

    return res.status(200).json({
      success: true,
      agent: agentName,
      timestamp: new Date().toISOString(),
      result: result,
    });
  } catch (error) {
    console.error("[TestTrigger] Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};
