/**
 * Tactic Agent
 * 
 * Dispara após aprovação de Strategy
 * Lê strategic brief + editorial pillars + trend radar
 * Gera plano de conteúdo (5-10 posts)
 * Envia ao Telegram com botões de aprovação
 * 
 * Entrada: strategic_brief.json (do estado)
 * Saída: content_plan.json (no estado)
 */

const fs = require("fs");
const path = require("path");
const StateManager = require("../lib/state.js");
const TelegramClient = require("../lib/telegram-client.js");
const ClaudeClient = require("../lib/claude-client.js");
const {
  TACTIC_SYSTEM_PROMPT,
} = require("../lib/claude-client.js");
const {
  generateApprovalButtons,
} = require("../lib/telegram-client.js");

class TacticAgent {
  constructor() {
    this.state = new StateManager();
    this.telegram = new TelegramClient(
      process.env.TELEGRAM_BOT_TOKEN,
      process.env.TELEGRAM_CHAT_ID
    );
    this.claude = new ClaudeClient();
  }

  /**
   * Executar agent
   */
  async run() {
    try {
      console.log("[TacticAgent] Starting...");

      // 1. Validar que Strategy foi aprovado
      const strategicBrief = await this.state.getPhaseData("strategy");
      if (!strategicBrief) {
        throw new Error("No strategy brief found. Run Strategy Agent first.");
      }

      // 2. Ler skills táticas + personas
      const editorialPillars = this.readFile(
        "marketing/skills/tactic/editorial-pillars.md"
      );
      const trendRadar = this.readFile(
        "marketing/skills/tactic/trend-radar.md"
      );
      const rosaPersona = this.readFile(
        "marketing/skills/audiences/rosa-equilibrista.md"
      );
      const anaMaePersona = this.readFile(
        "marketing/skills/audiences/ana-mae-protetora.md"
      );
      const pedroPersona = this.readFile(
        "marketing/skills/audiences/pedro-autonomo-solitario.md"
      );
      const brandPositioning = this.readFile(
        "marketing/skills/strategy/brand-positioning.md"
      );

      // 3. Preparar prompt para Claude
      const userPrompt = this.preparePrompt(
        strategicBrief,
        editorialPillars,
        trendRadar,
        rosaPersona,
        anaMaePersona,
        pedroPersona,
        brandPositioning
      );

      // 4. Chamar Claude para gerar plano de conteúdo
      console.log("[TacticAgent] Calling Claude API...");
      const contentPlan = await this.claude.callJSON(
        userPrompt,
        TACTIC_SYSTEM_PROMPT,
        { max_tokens: 4000 }
      );

      // 5. Validar output
      this.validatePlan(contentPlan);

      // 6. Salvar no estado
      await this.state.savePhaseData("tactic", contentPlan);

      // 7. Enviar ao Telegram
      const messageId = await this.sendTelegramPreview(
        contentPlan
      );

      // 8. Registrar message ID
      await this.state.saveTelegramMessageId("tactic", messageId);

      console.log("[TacticAgent] Complete - awaiting approval");
      return contentPlan;
    } catch (error) {
      console.error("[TacticAgent] Error:", error);
      await this.telegram.sendMessage(
        `❌ Erro ao gerar plano de conteúdo:\n\`${error.message}\``
      );
      throw error;
    }
  }

  /**
   * Ler arquivo de skill
   */
  readFile(filePath) {
    const fullPath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) {
      return `[Arquivo não encontrado: ${filePath}]`;
    }
    return fs.readFileSync(fullPath, "utf-8");
  }

  /**
   * Preparar prompt para Claude
   */
  preparePrompt(strategicBrief, editorialPillars, trendRadar, rosa, anaMae, pedro, positioning) {
    return `
# Strategic Brief para Desdobramento Tático

${JSON.stringify(strategicBrief, null, 2)}

---

# Editorial Pillars (Eixos Temáticos)

${editorialPillars}

---

# Trend Radar (Tendências do Mês)

${trendRadar}

---

# Brand Positioning (sempre respeitar tom e regras)

${positioning}

---

# Target Personas (qual é o foco para essa semana?)

## Rosa - A Equilibrista (PRIMARY TARGET)
${rosa}

---

## Ana Mae - A Mãe Protetora (SECONDARY)
${anaMae}

---

## Pedro - O Autônomo Solitário (TERTIARY)
${pedro}

---

Baseado no briefing estratégico acima, gere um CONTENT PLAN com 5-10 posts em JSON:

\`\`\`json
{
  "date": "YYYY-MM-DD",
  "strategic_brief_id": "strategy_brief_id",
  "posts": [
    {
      "id": 1,
      "sequence": 1,
      "editorial_pillar": "Pilar Editorial (ex: Histórias Reais)",
      "theme": "Tema específico (ex: Pequenas vitórias)",
      "format": "carousel|reel|caption|story|igtv",
      "trend": "Tendência aplicada (ou null)",
      "target_persona": "Rosa|Pedro|Ana-Mae|Caio",
      "key_messages": ["mensagem 1", "mensagem 2", "mensagem 3"],
      "hook": "Hook de engajamento (primeiros 50 chars)",
      "cta": "Call to action específico",
      "format_specs": {
        "slides": 10,
        "duration_seconds": null,
        "layout": "description"
      }
    }
  ],
  "distribution_strategy": {
    "monday": [1, 2],
    "tuesday": [3],
    "wednesday": [4, 5],
    "thursday": [6],
    "friday": [7],
    "saturday": [8],
    "sunday": [9, 10]
  }
}
\`\`\`

Retorne APENAS o JSON válido, sem markdown, sem explicações.

Requisitos obrigatórios:
- Mínimo 5 posts, máximo 10
- Cada post conectado a um objetivo estratégico
- Distribuição ao longo da semana (não tudo no mesmo dia)
- Formatos variados (não só captions)
- CTAs específicos e mensuráveis
`;
  }

  /**
   * Validar estrutura do plano
   */
  validatePlan(plan) {
    if (!plan.date) throw new Error("Missing date in plan");
    if (!Array.isArray(plan.posts)) throw new Error("posts must be array");
    if (plan.posts.length < 5) throw new Error("At least 5 posts required");
    if (plan.posts.length > 10) throw new Error("Maximum 10 posts allowed");

    // Validar cada post
    plan.posts.forEach((post, i) => {
      if (!post.theme) throw new Error(`Post ${i} missing theme`);
      if (!post.editorial_pillar)
        throw new Error(`Post ${i} missing editorial_pillar`);
      if (!["carousel", "reel", "caption", "story", "igtv"].includes(
        post.format
      )) {
        throw new Error(`Post ${i} invalid format: ${post.format}`);
      }
      if (!post.hook) throw new Error(`Post ${i} missing hook`);
      if (!post.cta) throw new Error(`Post ${i} missing cta`);
    });
  }

  /**
   * Enviar preview ao Telegram
   */
  async sendTelegramPreview(plan) {
    const date = plan.date || new Date().toISOString().split("T")[0];

    const postsList = plan.posts
      .slice(0, 5)
      .map(
        (post, i) =>
          `${i + 1}. **${post.theme}** (${post.format})\n   📌 ${post.hook}`
      )
      .join("\n\n");

    const distributionText = Object.entries(plan.distribution_strategy)
      .slice(0, 3)
      .map(([day, postIds]) => `• ${day}: Posts ${postIds.join(", ")}`)
      .join("\n");

    const message = `
📅 **CONTENT PLAN** — ${date}

✍️ **${plan.posts.length} Posts Planejados:**

${postsList}

${plan.posts.length > 5 ? `\n... e mais ${plan.posts.length - 5} posts` : ""}

📊 **Distribuição:**
${distributionText}

---
Formatos variados: ${[
      ...new Set(plan.posts.map((p) => p.format)),
    ]
      .join(", ")
      .toUpperCase()}

Deseja prosseguir com este plano?
    `.trim();

    const buttons = generateApprovalButtons("tactic", date);

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

// Exportar a classe para que possa ser instanciada pelo Orchestrator
module.exports = TacticAgent;

// Exportar handler serverless como propriedade
module.exports.handler = async (req, res) => {
  // Validar CRON_SECRET
  const secret = req.query.secret || req.headers["authorization"]?.split(" ")[1];
  if (secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const agent = new TacticAgent();

  try {
    const plan = await agent.run();
    res.json({
      ok: true,
      message: "Content plan generated successfully",
      data: plan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};
