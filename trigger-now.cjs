#!/usr/bin/env node

/**
 * Trigger Agent Workflow Immediately
 * 
 * Runs: Insights → Market → User-Insights → Strategy (waits for approval) → ... rest
 * 
 * Usage: node trigger-now.cjs [agent-name]
 * Example: node trigger-now.cjs insights
 *          node trigger-now.cjs all
 */

require("dotenv").config({ path: ".env.local" });

// Import agent classes
const insightsModule = require("./api/agents/agent-insights");
const marketModule = require("./api/agents/agent-market");
const userInsightsModule = require("./api/agents/agent-user-insights");
const strategyModule = require("./api/agents/agent-strategy");
const tacticModule = require("./api/agents/agent-tactic");
const operationalModule = require("./api/agents/agent-operational");
const figmaModule = require("./api/agents/agent-figma");

const InsightsAgent = insightsModule.InsightsAgent || insightsModule;
const MarketAgent = marketModule.MarketAgent || marketModule;
const UserInsightsAgent = userInsightsModule.UserInsightsAgent || userInsightsModule;
const StrategyAgent = strategyModule.StrategyAgent || strategyModule;
const TacticAgent = tacticModule.TacticAgent || tacticModule;
const OperationalAgent = operationalModule.OperationalAgent || operationalModule;
const FigmaAgent = figmaModule.FigmaAgent || figmaModule;

const args = process.argv.slice(2);
const targetAgent = args[0] || "all";

const agents = {
  insights: InsightsAgent,
  market: MarketAgent,
  "user-insights": UserInsightsAgent,
  strategy: StrategyAgent,
  tactic: TacticAgent,
  operational: OperationalAgent,
  figma: FigmaAgent,
};

const agentNames = [
  "insights",
  "market",
  "user-insights",
  "strategy",
  "tactic",
  "operational",
  "figma",
];

// Check required env vars
const required = ["ANTHROPIC_API_KEY", "TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"];
const missing = required.filter((k) => !process.env[k]);

if (missing.length > 0) {
  console.error("\n❌ Missing required environment variables:\n");
  missing.forEach((k) => console.error(`   ${k}`));
  console.error("\n📝 Add these to .env.local to run\n");
  process.exit(1);
}

async function runAgent(name) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`🚀 Running ${name} Agent...`);
  console.log(`${"=".repeat(60)}`);

  try {
    const Agent = agents[name];
    if (!Agent) {
      throw new Error(`Unknown agent: ${name}`);
    }

    const agent = new Agent();
    const result = await agent.run();

    console.log(`✅ ${name} agent completed successfully`);
    return result;
  } catch (error) {
    console.error(`❌ ${name} agent failed:`, error.message);
    throw error;
  }
}

async function runAll() {
  console.log("\n🎯 Starting full workflow...");
  console.log(`   Env: ${process.env.NODE_ENV || "development"}`);
  console.log(`   Telegram: ${process.env.TELEGRAM_CHAT_ID ? "✅ Configured" : "❌ Missing"}`);
  console.log(`   Claude: ${process.env.ANTHROPIC_API_KEY ? "✅ Configured" : "❌ Missing"}`);

  try {
    // Phase 1: Insights
    await runAgent("insights");

    // Phase 2: Market
    await runAgent("market");

    // Phase 3: User Insights
    await runAgent("user-insights");

    // Phase 4: Strategy (waits for approval via Telegram)
    console.log("\n⏳ Strategy Agent requires Telegram approval...");
    console.log("   Check Telegram for strategy message with approval buttons");
    console.log("   Click ✅ to approve and trigger remaining agents\n");
    
    await runAgent("strategy");

    // If approval worked, continue
    console.log("\n✅ Approval received! Continuing workflow...");

    // Phase 5: Tactic
    await runAgent("tactic");

    // Phase 6: Operational
    await runAgent("operational");

    // Phase 7: Figma
    await runAgent("figma");

    console.log("\n" + "=".repeat(60));
    console.log("🎉 COMPLETE WORKFLOW FINISHED!");
    console.log("=".repeat(60));
  } catch (error) {
    console.error("\n❌ Workflow stopped due to error");
    process.exit(1);
  }
}

async function main() {
  if (targetAgent === "all") {
    await runAll();
  } else if (agentNames.includes(targetAgent)) {
    try {
      await runAgent(targetAgent);
      console.log(`\n✅ Single agent execution complete`);
    } catch (error) {
      process.exit(1);
    }
  } else {
    console.error(`\nUnknown agent: ${targetAgent}`);
    console.error(`\nAvailable agents:`);
    console.error(`  node trigger-now.cjs all`);
    agentNames.forEach((name) => {
      console.error(`  node trigger-now.cjs ${name}`);
    });
    process.exit(1);
  }
}

main();
