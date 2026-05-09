/**
 * Telegram Client — Enviar mensagens com botões inline
 * 
 * Suporta:
 * - Enviar mensagens simples
 * - Enviar mensagens com inline buttons (aprovação/rejeição)
 * - Editar mensagens existentes
 * - Enviar fotos
 */

import https from "https";

class TelegramClient {
  constructor(botToken, chatId) {
    this.botToken = botToken;
    this.chatId = chatId;
    this.baseUrl = `https://api.telegram.org/bot${botToken}`;
  }

  /**
   * Fazer request HTTP ao Telegram Bot API
   */
  async request(method, params) {
    return new Promise((resolve, reject) => {
      const url = new URL(`${this.baseUrl}/${method}`);

      // GET params
      if (params) {
        Object.keys(params).forEach((key) => {
          if (params[key] !== null && params[key] !== undefined) {
            // JSON fields need to be stringified
            if (typeof params[key] === "object") {
              url.searchParams.append(key, JSON.stringify(params[key]));
            } else {
              url.searchParams.append(key, params[key]);
            }
          }
        });
      }

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      https
        .get(url, options, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(new Error(`Failed to parse response: ${data}`));
            }
          });
        })
        .on("error", reject);
    });
  }

  /**
   * Enviar mensagem simples
   */
  async sendMessage(text, options = {}) {
    const response = await this.request("sendMessage", {
      chat_id: this.chatId,
      text,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Telegram error: ${response.description}`);
    }

    return response.result;
  }

  /**
   * Enviar mensagem com inline buttons
   * 
   * @param {string} text - Conteúdo da mensagem
   * @param {Array} buttons - Array de buttons
   *   Cada button: { text: "Approve", callback_data: "approve_strategy" }
   */
  async sendMessageWithButtons(text, buttons, options = {}) {
    const inline_keyboard = [buttons]; // Row de botões

    const response = await this.request("sendMessage", {
      chat_id: this.chatId,
      text,
      parse_mode: "Markdown",
      reply_markup: JSON.stringify({
        inline_keyboard,
      }),
      disable_web_page_preview: true,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Telegram error: ${response.description}`);
    }

    return response.result;
  }

  /**
   * Editar mensagem existente
   */
  async editMessage(messageId, text, buttons = null) {
    const params = {
      chat_id: this.chatId,
      message_id: messageId,
      text,
      parse_mode: "Markdown",
    };

    if (buttons) {
      params.reply_markup = JSON.stringify({
        inline_keyboard: [buttons],
      });
    }

    const response = await this.request("editMessageText", params);

    if (!response.ok) {
      throw new Error(`Telegram error: ${response.description}`);
    }

    return response.result;
  }

  /**
   * Responder a callback query (aquele "popup" que aparece)
   */
  async answerCallbackQuery(callbackQueryId, text = "", showAlert = false) {
    const response = await this.request("answerCallbackQuery", {
      callback_query_id: callbackQueryId,
      text,
      show_alert: showAlert,
    });

    if (!response.ok) {
      throw new Error(`Telegram error: ${response.description}`);
    }

    return response.result;
  }

  /**
   * Enviar foto
   */
  async sendPhoto(photoUrl, caption = "", buttons = null) {
    const params = {
      chat_id: this.chatId,
      photo: photoUrl,
      caption,
      parse_mode: "Markdown",
    };

    if (buttons) {
      params.reply_markup = JSON.stringify({
        inline_keyboard: [buttons],
      });
    }

    const response = await this.request("sendPhoto", params);

    if (!response.ok) {
      throw new Error(`Telegram error: ${response.description}`);
    }

    return response.result;
  }

  /**
   * Enviar documento (PDF, arquivo, etc)
   */
  async sendDocument(fileUrl, caption = "") {
    const params = {
      chat_id: this.chatId,
      document: fileUrl,
      caption,
      parse_mode: "Markdown",
    };

    const response = await this.request("sendDocument", params);

    if (!response.ok) {
      throw new Error(`Telegram error: ${response.description}`);
    }

    return response.result;
  }

  /**
   * Enviar mensagem de notificação (sem som)
   */
  async sendSilentMessage(text, options = {}) {
    return this.sendMessage(text, {
      disable_notification: true,
      ...options,
    });
  }

  /**
   * Enviar mensagem com formatação especial
   */
  async sendFormattedMessage(text, buttons = null, options = {}) {
    if (buttons) {
      return this.sendMessageWithButtons(text, buttons, options);
    }
    return this.sendMessage(text, options);
  }
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Gerar botões de aprovação/rejeição padrão
 */
function generateApprovalButtons(phase, date) {
  return [
    { text: "✅ Aprovar", callback_data: `approve_${phase}|${date}` },
    { text: "❌ Rejeitar", callback_data: `reject_${phase}|${date}` },
  ];
}

/**
 * Gerar botão de publicação
 */
function generatePublishButtons(date) {
  return [
    { text: "✅ PUBLICAR", callback_data: `publish|${date}` },
    { text: "❌ CANCELAR", callback_data: `cancel|${date}` },
  ];
}

// ============================================================================
// EXPORTS
// ============================================================================

export default TelegramClient;
export { generateApprovalButtons, generatePublishButtons };

/**
 * EXEMPLO DE USO:
 * 
 * const TelegramClient = require("./lib/telegram-client.js");
 * const { generateApprovalButtons } = require("./lib/telegram-client.js");
 * 
 * const telegram = new TelegramClient(process.env.TELEGRAM_BOT_TOKEN, process.env.TELEGRAM_CHAT_ID);
 * 
 * // Enviar mensagem simples
 * const msg = await telegram.sendMessage("Oi! 👋");
 * 
 * // Enviar com botões de aprovação
 * const buttons = generateApprovalButtons("strategy", "2026-05-07");
 * const msgWithButtons = await telegram.sendMessageWithButtons(
 *   "📊 STRATEGY BRIEFING\n\nDeseja aprovar?",
 *   buttons
 * );
 * 
 * // Editar mensagem depois
 * await telegram.editMessage(msgWithButtons.message_id, "✅ Aprovado!");
 */
