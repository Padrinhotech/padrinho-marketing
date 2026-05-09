/**
 * Test Telegram Message Sending
 */

const TelegramClient = require("../SKILL/skill-telegram-client");

module.exports = async function handler(req, res) {
  console.log("[TestTelegramSend] Request received");

  try {
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      return res.status(400).json({
        error: "Missing TELEGRAM credentials",
        has_token: !!process.env.TELEGRAM_BOT_TOKEN,
        has_chat_id: !!process.env.TELEGRAM_CHAT_ID,
      });
    }

    console.log("[TestTelegramSend] Creating Telegram client...");
    const telegram = new TelegramClient(
      process.env.TELEGRAM_BOT_TOKEN,
      process.env.TELEGRAM_CHAT_ID
    );

    console.log("[TestTelegramSend] Sending test message...");
    const message = "🧪 Test message from Padrinho API - " + new Date().toISOString();
    
    const result = await telegram.sendMessage(message);

    console.log("[TestTelegramSend] Message sent successfully");

    return res.status(200).json({
      success: true,
      message: "Test message sent to Telegram",
      timestamp: new Date().toISOString(),
      result: result,
    });
  } catch (error) {
    console.error("[TestTelegramSend] Error:", error.message);
    console.error("[TestTelegramSend] Stack:", error.stack);

    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
  }
};
