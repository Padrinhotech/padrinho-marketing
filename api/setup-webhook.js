// api/setup-webhook.js
// Roda UMA VEZ para registrar o webhook do Telegram
// Acesse: https://SEU_DOMINIO.vercel.app/api/setup-webhook?secret=SEU_CRON_SECRET

export default async function handler(req, res) {
  if (req.query.secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const vercelUrl = process.env.VERCEL_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const webhookUrl = `https://${vercelUrl}/api/approve`;

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/setWebhook`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ["callback_query", "message"],
      }),
    }
  );

  const data = await response.json();
  return res.status(200).json({ webhook_url: webhookUrl, telegram_response: data });
}
