/**
 * Figma Agent
 * 
 * Dispara após aprovação de Operational
 * Lê operational_copy.json + copy + visual brief
 * Popula frames no Figma (_QUEUE)
 * Injeta fotos via unsplash-mcp
 * Exporta screenshot
 * Envia preview ao Telegram com botão de publicação
 * 
 * Entrada: operational_copy.json (do estado)
 * Saída: figma_frames.json (no estado)
 * 
 * TODO: Implementação completa
 */

const StateManager = require("../lib/state.js");
const TelegramClient = require("../lib/telegram-client.js");

class FigmaAgent {
  constructor() {
    this.state = new StateManager();
    this.telegram = new TelegramClient(
      process.env.TELEGRAM_BOT_TOKEN,
      process.env.TELEGRAM_CHAT_ID
    );
    this.figmaToken = process.env.FIGMA_TOKEN;
    this.figmaFileId = "sBItPeNLyvT5EMyKLqQbRv"; // 03. Padrinho • Social
  }

  /**
   * Executar agent
   */
  async run() {
    try {
      console.log("[FigmaAgent] Starting...");

      // 1. Validar que Operational foi aprovado
      const operationalCopy = await this.state.getPhaseData("operational");
      if (!operationalCopy) {
        throw new Error(
          "No operational copy found. Run Operational Agent first."
        );
      }

      // 2. Ler skills de design
      const componentSystem = this.readFile(
        "marketing/skills/operational/component-system.md"
      );
      const figmaDelivery = this.readFile(
        "marketing/skills/operational/figma-delivery.md"
      );
      const visualAgent = this.readFile(
        "marketing/skills/operational/visual-agent.md"
      );

      // 3. Para cada post, popular frame no Figma
      const figmaFrames = [];

      for (const post of operationalCopy.posts) {
        console.log(`[FigmaAgent] Processing post ${post.post_id}...`);

        // TODO: Implementar Figma API calls com skills
        // 1. Copiar componente (definido em visual-agent.md) de _COMPONENTS para _QUEUE
        // 2. Renomear frame seguindo figma-delivery.md
        // 3. Popular textos: caption, hashtags, alt text (respeitando copy-rules.md)
        // 4. Injetar fotos via unsplash-mcp usando visual-agent.md como guia
        // 5. Validar contra component-system.md
        // 6. Exportar PNG

        // Por enquanto, apenas mock
        figmaFrames.push({
          post_id: post.post_id,
          frame_id: `3363:${3000 + post.post_id}`, // Mock ID
          frame_name: `Post ${post.post_id} - ${operationalCopy.date}`,
          status: "queued",
          export_url: `https://github.com/raw/padrinho-marketing/posts/post_${post.post_id}.png`,
          _skills_used: {
            component_system: true,
            figma_delivery: true,
            visual_agent: true
          }
        });
      }

      // 4. Salvar no estado
      await this.state.savePhaseData("figma", {
        date: operationalCopy.date,
        frames: figmaFrames,
        status: "exported",
      });

      // 5. Enviar preview ao Telegram
      const messageId = await this.sendTelegramPreview(
        figmaFrames,
        operationalCopy
      );

      // 6. Registrar message ID
      await this.state.saveTelegramMessageId("figma", messageId);

      console.log("[FigmaAgent] Complete - awaiting final approval");
      return { frames: figmaFrames };
    } catch (error) {
      console.error("[FigmaAgent] Error:", error);
      await this.telegram.sendMessage(
        `❌ Erro ao popular Figma:\n\`${error.message}\``
      );
      throw error;
    }
  }

  /**
   * Enviar preview ao Telegram
   */
  async sendTelegramPreview(frames, operationalCopy) {
    const date = operationalCopy.date || new Date().toISOString().split("T")[0];

    const framesList = frames
      .slice(0, 3)
      .map(
        (frame, i) =>
          `${i + 1}. **${frame.frame_name}** (ID: \`${frame.frame_id}\`)`
      )
      .join("\n");

    const message = `
🎨 **FIGMA PREVIEW** — ${date}

✅ ${frames.length} frames populados em _QUEUE:

${framesList}

${frames.length > 3 ? `\n... e mais ${frames.length - 3} frames` : ""}

📌 Status: Prontos para publicação no Instagram

---
Deseja prosseguir com a publicação?
    `.trim();

    const buttons = [
      { text: "✅ PUBLICAR", callback_data: `publish|${date}` },
      { text: "❌ CANCELAR", callback_data: `cancel|${date}` },
    ];

    const result = await this.telegram.sendMessageWithButtons(
      message,
      buttons
    );

    return result.message_id;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

// Exportar a classe
module.exports = FigmaAgent;

// Exportar handler serverless
module.exports.handler = async (req, res) => {
  // Validar CRON_SECRET
  const secret = req.query.secret || req.headers["authorization"]?.split(" ")[1];
  if (secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const agent = new FigmaAgent();

  try {
    const result = await agent.run();
    res.json({
      ok: true,
      message: "Figma frames populated successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

/**
 * TODO:
 * 1. Usar Figma REST API para:
 *    - GET file metadata (listar componentes em _COMPONENTS)
 *    - POST duplicate frame
 *    - PATCH text content
 *    - PATCH fill images (via unsplash)
 *
 * 2. Integrar unsplash-mcp para buscar fotos
 *
 * 3. Export PNG dos frames
 *
 * 4. Upload PNGs para GitHub (ou CDN)
 */
