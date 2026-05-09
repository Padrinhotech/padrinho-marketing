import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const required = [
  "ANTHROPIC_API_KEY",
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_CHAT_ID",
];

const missing = required.filter((k) => !process.env[k]);

if (missing.length > 0) {
  console.log("❌ Missing environment variables:\n");
  missing.forEach((k) => console.log(`   ${k}`));
  console.log("\n📝 Add these to .env.local to run the trigger script\n");
  process.exit(1);
} else {
  console.log("✅ All required environment variables are set\n");
}
