/**
 * Telegram Webhook — Recebe aprovações/rejeições e dispara agentes
 * 
 * Padrão de callback_data:
 * - "approve_strategy|2026-05-07" → Aprovação de strategy
 * - "reject_strategy|2026-05-07" → Rejeição de strategy
 * - "publish|2026-05-07" → Publicar conteúdo
 * - "cancel|2026-05-07" → Cancelar fluxo
 */

import Orchestrator from "../SKILL/skill-orchestrator.js";
import TelegramClient from "../SKILL/skill-telegram-client.js";

/**
 * Serverless handler para Vercel
 */
export default async (req, res) => {
  // Apenas POST é aceito
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body;

  try {
    // Validar assinatura do Telegram (opcional, mas recomendado)
    if (!validateTelegramSignature(body, process.env.TELEGRAM_SECRET)) {
      console.warn("[Telegram Webhook] Invalid signature");
      // Não retorna erro, apenas ignora (Telegram vai fazer retry)
    }

    // Está em callback_query? (botão foi pressionado)
    if (body.callback_query) {
      return await handleCallbackQuery(body.callback_query);
    }

    // Está em message? (mensagem de texto)
    if (body.message) {
      return await handleMessage(body.message);
    }

    // Ignorar outros tipos de update
    return res.json({ ok: true });
  } catch (error) {
    console.error("[Telegram Webhook] Error:", error);
    // Sempre retornar 200 ao Telegram (caso contrário ele faz retry)
    return res.status(200).json({
      ok: true,
      error_logged: true,
    });
  }
};

// ============================================================================
// HANDLERS
// ============================================================================

async function handleCallbackQuery(callbackQuery) {
  const { id: callbackQueryId, from, data } = callbackQuery;
  const telegram = new TelegramClient(
    process.env.TELEGRAM_BOT_TOKEN,
    process.env.TELEGRAM_CHAT_ID
  );

  console.log(`[Telegram] Callback: ${data} by @${from.username}`);

  // Parse callback_data
  const [action, dateStr] = data.split("|");

  const orchestrator = new Orchestrator();

  // Responder ao popup com feedback imediato
  await telegram.answerCallbackQuery(callbackQueryId, "⏳ Processando...");

  try {
    if (action.startsWith("approve_")) {
      const phase = action.replace("approve_", "");
      console.log(`[Telegram] Approving phase: ${phase}`);

      // Editar a mensagem original para indicar aprovação
      if (callbackQuery.message?.message_id) {
        await telegram.editMessage(
          callbackQuery.message.message_id,
          `${callbackQuery.message.text}\n\n✅ *Aprovado!*`
        );
      }

      // Chamar orchestrator para transicionar e disparar próximo agente
      await orchestrator.handleApproval(phase, true);

      // Confirmação de transição
      await telegram.sendSilentMessage(
        `✅ Fase \`${phase}\` aprovada. Iniciando \`${orchestrator.getNextPhase(phase)}\`...`
      );
    } else if (action.startsWith("reject_")) {
      const phase = action.replace("reject_", "");
      console.log(`[Telegram] Rejecting phase: ${phase}`);

      if (callbackQuery.message?.message_id) {
        await telegram.editMessage(
          callbackQuery.message.message_id,
          `${callbackQuery.message.text}\n\n❌ *Rejeitado - Aguardando refazer*`
        );
      }

      await orchestrator.handleApproval(phase, false);
      await telegram.sendSilentMessage(
        `❌ Fase \`${phase}\` rejeitada. Refaça e reenvie para aprovação.`
      );
    } else if (action === "publish") {
      console.log("[Telegram] Publishing content");

      if (callbackQuery.message?.message_id) {
        await telegram.editMessage(
          callbackQuery.message.message_id,
          `${callbackQuery.message.text}\n\n⏳ *Publicando...*`
        );
      }

      // TODO: Chamar /api/publish.js
      // Para agora, apenas marcar como publicado
      await orchestrator.state.updateState({ phase: "published", status: "approved" });
      await telegram.sendMessage("✅ Conteúdo publicado no Instagram!");
    } else if (action === "cancel") {
      console.log("[Telegram] Cancelling flow");

      if (callbackQuery.message?.message_id) {
        await telegram.editMessage(
          callbackQuery.message.message_id,
          `${callbackQuery.message.text}\n\n❌ *Cancelado pelo usuário*`
        );
      }

      await orchestrator.cancelFlow("Cancelado pelo usuário");
    } else {
      console.warn(`[Telegram] Unknown action: ${action}`);
      await telegram.answerCallbackQuery(
        callbackQueryId,
        "❌ Ação desconhecida",
        true
      );
    }

    return { ok: true };
  } catch (error) {
    console.error("[Telegram Handler] Error:", error);
    await telegram.answerCallbackQuery(
      callbackQueryId,
      `❌ Erro: ${error.message}`,
      true
    );
    return { ok: true };
  }
}

async function handleMessage(message) {
  const telegram = new TelegramClient(
    process.env.TELEGRAM_BOT_TOKEN,
    process.env.TELEGRAM_CHAT_ID
  );

  const text = message.text?.toLowerCase() || "";

  // Comandos úteis
  if (text === "/status" || text === "/diagnostics") {
    const orchestrator = new Orchestrator();
    await orchestrator.sendDiagnostics();
  } else if (text === "/reset") {
    const orchestrator = new Orchestrator();
    await orchestrator.state.resetDaily();
    await telegram.sendMessage("♻️ Estado resetado. Pronto para novo dia.");
  } else if (text.startsWith("/force_phase ")) {
    // DEBUG: forçar transição (apenas em dev)
    if (process.env.NODE_ENV === "production") {
      return { ok: true };
    }

    const phase = text.replace("/force_phase ", "").trim();
    const orchestrator = new Orchestrator();

    try {
      await orchestrator.state.updateState({ phase });
      await telegram.sendMessage(`🔧 Fase alterada para: ${phase}`);
    } catch (error) {
      await telegram.sendMessage(`❌ Erro: ${error.message}`);
    }
  }

  return { ok: true };
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Validar assinatura do Telegram (opcional)
 * Telegram envia X-Telegram-Bot-Api-Secret-Token no header
 */
function validateTelegramSignature(body, secret) {
  // Por enquanto, apenas verificar se TELEGRAM_BOT_TOKEN foi usado
  // Em produção, implementar HMAC-SHA256 se necessário
  return true;
}

/**
 * Para Vercel, registrar este webhook em:
 * /api/webhooks/telegram
 * 
 * No setup-webhook.js:
 * curl -X POST https://api.telegram.org/bot${TOKEN}/setWebhook \
 *   -d "url=https://${DOMAIN}/api/webhooks/telegram" \
 *   -d "secret_token=${TELEGRAM_SECRET}"
 */
