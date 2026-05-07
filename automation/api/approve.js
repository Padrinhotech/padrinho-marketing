// automation/api/approve.js
// Webhook do Telegram — recebe sua aprovação (✅ ✏️ ❌) e age

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const baseUrl = `https://api.telegram.org/bot${botToken}`;
  const vercelUrl = process.env.VERCEL_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;

  try {
    const update = req.body;
    if (!update.callback_query) return res.status(200).json({ ok: true });

    const { id: callbackId, data: callbackData, message } = update.callback_query;

    await fetch(`${baseUrl}/answerCallbackQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callback_query_id: callbackId }),
    });

    const [action, sessionId] = callbackData.split("_");

    await fetch(`${baseUrl}/editMessageReplyMarkup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: message.message_id,
        reply_markup: { inline_keyboard: [] },
      }),
    });

    if (action === "approve") {
      await fetch(`${baseUrl}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: "⏳ Publicando no Instagram..." }),
      });

      const publishRes = await fetch(`https://${vercelUrl}/api/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CRON_SECRET}`,
        },
        body: JSON.stringify({ sessionId }),
      });

      const publishData = await publishRes.json();

      if (publishData.success) {
        await fetch(`${baseUrl}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: `✅ *Publicado!*\n\n🔗 [Ver no Instagram](${publishData.permalink})`,
            parse_mode: "Markdown",
          }),
        });
      } else {
        await fetch(`${baseUrl}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: `❌ Erro ao publicar: ${publishData.error}`,
          }),
        });
      }
    } else if (action === "redo") {
      await fetch(`${baseUrl}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: "🔄 Gerando novo conteúdo..." }),
      });

      await fetch(`https://${vercelUrl}/api/orchestrate`, {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.CRON_SECRET}` },
      });
    } else if (action === "cancel") {
      await fetch(`${baseUrl}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "❌ Post cancelado. Nada foi publicado.",
        }),
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Erro no approve handler:", error);
    return res.status(500).json({ error: error.message });
  }
}
