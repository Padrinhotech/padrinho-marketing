/**
 * Diagnostic Script - Test Agents Locally
 * 
 * Run with: node DIAGNOSTIC_AGENTS.js
 * Tests each agent and shows what data they're collecting/returning
 */

import fs from "fs";
import path from "path";
import StateManager from "./SKILL/skill-state.js";
import InsightfulpipeClient from "./SKILL/skill-insightfulpipe.js";
import PipeboardClient from "./SKILL/skill-pipeboard.js";
import SupabaseClient from "./SKILL/skill-supabase.js";

console.log("\n========================================");
console.log("PADRINHO AGENTS DIAGNOSTIC");
console.log("========================================\n");

// 1. Check environment variables
console.log("📋 CHECKING ENVIRONMENT VARIABLES:\n");

const requiredVars = [
  "INSIGHTFULPIPE_API_KEY",
  "INSTAGRAM_BUSINESS_ACCOUNT_ID",
  "PIPEBOARD_API_KEY",
  "META_ADS_ACCOUNT_ID",
  "GOOGLE_ADS_ACCOUNT_ID",
  "SUPABASE_URL",
  "SUPABASE_API_KEY",
  "SUPABASE_ANON_KEY",
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_CHAT_ID",
  "GITHUB_TOKEN",
];

let missingVars = [];
requiredVars.forEach((varName) => {
  const value = process.env[varName];
  if (!value) {
    console.log(`❌ ${varName}: NOT SET`);
    missingVars.push(varName);
  } else {
    const masked = value.substring(0, 5) + "***" + value.substring(value.length - 3);
    console.log(`✅ ${varName}: ${masked}`);
  }
});

if (missingVars.length > 0) {
  console.log(`\n⚠️  ${missingVars.length} variables missing - agents will use mock data`);
}

// 2. Check STATE file
console.log("\n\n📁 CHECKING STATE FILE:\n");
const stateManager = new StateManager();
try {
  const state = await stateManager.getState();
  console.log("✅ STATE FILE EXISTS");
  console.log("Current state:", JSON.stringify(state, null, 2));
} catch (error) {
  console.log("❌ STATE FILE ERROR:", error.message);
}

// 3. Test Insightfulpipe
console.log("\n\n🔍 TESTING INSIGHTFULPIPE (Instagram):\n");
if (process.env.INSIGHTFULPIPE_API_KEY && process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID) {
  try {
    const client = new InsightfulpipeClient(
      process.env.INSIGHTFULPIPE_API_KEY,
      process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
    );
    const data = await client.getInstagramOrganic();
    console.log("✅ Insightfulpipe returned:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.log("❌ Insightfulpipe error:", error.message);
  }
} else {
  console.log("⚠️  Credentials not set - using MOCK data");
  console.log("Mock Instagram data: ", {
    followers_current: 12450,
    followers_gain_month: 340,
    avg_daily_reach: 850,
  });
}

// 4. Test Pipeboard
console.log("\n\n🔍 TESTING PIPEBOARD (Meta/Google Ads):\n");
if (process.env.PIPEBOARD_API_KEY && process.env.META_ADS_ACCOUNT_ID) {
  try {
    const client = new PipeboardClient(process.env.PIPEBOARD_API_KEY);
    const metaData = await client.getMetaAds(process.env.META_ADS_ACCOUNT_ID);
    console.log("✅ Pipeboard Meta returned:", JSON.stringify(metaData, null, 2));
  } catch (error) {
    console.log("❌ Pipeboard Meta error:", error.message);
  }
} else {
  console.log("⚠️  Credentials not set - using MOCK data");
  console.log("Mock Meta Ads data: ", {
    campaigns_active: 3,
    ytd_spend: 5240,
  });
}

// 5. Test Supabase
console.log("\n\n🔍 TESTING SUPABASE (Audience Insights):\n");
if (process.env.SUPABASE_URL && (process.env.SUPABASE_API_KEY || process.env.SUPABASE_ANON_KEY)) {
  try {
    const client = new SupabaseClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_API_KEY || process.env.SUPABASE_ANON_KEY
    );
    const data = await client.getAudienceInsights();
    console.log("✅ Supabase returned:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.log("❌ Supabase error:", error.message);
  }
} else {
  console.log("⚠️  Credentials not set - using MOCK data");
  console.log("Mock Audience data: ", {
    total_users: 2140,
    monthly_active: 680,
  });
}

// 6. Test StateManager save/load
console.log("\n\n🧪 TESTING STATE PERSISTENCE:\n");
try {
  const testData = {
    test_timestamp: new Date().toISOString(),
    test_value: "diagnostic_run",
  };
  
  console.log("Saving test data...");
  await stateManager.savePhaseData("insights", testData);
  
  console.log("Loading test data...");
  const loaded = await stateManager.getPhaseData("insights");
  
  if (loaded && loaded.test_value === "diagnostic_run") {
    console.log("✅ STATE PERSISTENCE WORKS");
    console.log("Saved and loaded:", JSON.stringify(loaded, null, 2));
  } else {
    console.log("❌ STATE PERSISTENCE FAILED");
  }
} catch (error) {
  console.log("❌ State test error:", error.message);
}

console.log("\n\n========================================");
console.log("DIAGNOSTIC COMPLETE");
console.log("========================================\n");
