/**
 * Strategy Agent
 * 
 * Executa automaticamente às 8h BRT (11h UTC)
 * Lê insights + brand positioning
 * Gera strategic brief com 3-5 objetivos
 * Envia ao Telegram com botões de aprovação
 * 
 * Entrada: KNOW/KNOW_Insights.md
 * Saída: strategic_brief.json (no estado)
 */

const fs = require("fs");
const path = require("path");
const StateManager = require("../SKILL/SKILL_state");
const TelegramClient = require("../SKILL/SKILL_telegram-client");
const ClaudeClient = require("../SKILL/SKILL_claude-client");
const {
  STRATEGY_SYSTEM_PROMPT,
} = require("../SKILL/SKILL_claude-client");
const {
  generateApprovalButtons,
} = require("../SKILL/SKILL_telegram-client");

class StrategyAgent {
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
      console.log("[StrategyAgent] Starting...");

      // 1. Validar que Insights foi completo
      const insightsData = await this.state.getPhaseData("insights");
      if (!insightsData) {
        throw new Error(
          "No insights data found. Run Insights Agent first."
        );
      }

      // 2. Ler skills de estratégia
      const brandPositioning = this.readFile(
        "./skills/strategy/brand-positioning.md"
      );
      const marketContext = this.readFile(
        "./skills/strategy/market-context.md"
      );
      const icp = this.readFile("./skills/audiences/icp.md");
      const userInsights = this.readFile(
        "./skills/audiences/user-insights.md"
      );

      // 3. Preparar prompt para Claude
      const userPrompt = this.preparePrompt(
        insightsData,
        brandPositioning,
        marketContext,
        icp,
        userInsights
      );

      // 4. Chamar Claude para gerar briefing
      console.log("[StrategyAgent] Calling Claude API...");
      const strategicBrief = await this.claude.callJSON(
        userPrompt,
        STRATEGY_SYSTEM_PROMPT,
        { max_tokens: 3000 }
      );

      // 5. Validar output
      this.validateBrief(strategicBrief);

      // 6. Salvar no estado
      await this.state.savePhaseData("strategy", strategicBrief);

      // 7. Enviar ao Telegram
      const messageId = await this.sendTelegramPreview(
        strategicBrief
      );

      // 8. Registrar message ID para editar depois
      await this.state.saveTelegramMessageId("strategy", messageId);

      console.log("[StrategyAgent] Complete - awaiting approval");
      return strategicBrief;
    } catch (error) {
      console.error("[StrategyAgent] Error:", error);
      await this.telegram.sendMessage(
        `❌ Erro ao gerar estratégia:\n\`${error.message}\``
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
  preparePrompt(insightsData, brandPositioning, marketContext, icp, userInsights) {
    return `
# Dados para Análise Estratégica

## Insights do Mês (Performance Real)

${JSON.stringify(insightsData, null, 2)}

---

## Brand Positioning & Tone Rules

${brandPositioning}

---

## Market Context

${marketContext}

---

## ICP & Target Audience Definition

${icp}

---

## User Insights & Behavior Patterns

${userInsights}

---

Baseado nesses dados, gere um STRATEGIC BRIEF em JSON com a estrutura:

\`\`\`json
{
  "date": "YYYY-MM-DD",
  "objectives": [
    {
      "id": 1,
      "title": "Título do objetivo",
      "rationale": "Por que este objetivo é importante baseado nos dados",
      "target_persona": "Rosa|Pedro|Ana-Mae|Caio",
      "success_metric": "Métrica específica para medir sucesso"
    }
  ],
  "key_insights": ["insight 1", "insight 2", "insight 3"],
  "tone_of_day": "Descrição do tom recomendado (ex: Empático e esperançoso)",
  "content_pillars": ["Pilar 1", "Pilar 2", "Pilar 3"],
  "target_persona_profile": {
    "name": "Nome",
    "pain_points": ["dor 1", "dor 2"],
    "desires": ["desejo 1", "desejo 2"]
  }
}
\`\`\`

Retorne APENAS o JSON válido, sem markdown code blocks, sem explicações adicionais.
`;
  }

  /**
   * Validar estrutura do briefing
   */
  validateBrief(brief) {
    if (!brief.date) throw new Error("Missing date in brief");
    if (!Array.isArray(brief.objectives))
      throw new Error("objectives must be array");
    if (brief.objectives.length < 3)
      throw new Error("At least 3 objectives required");
    if (!brief.tone_of_day) throw new Error("Missing tone_of_day");
    if (!Array.isArray(brief.content_pillars))
      throw new Error("content_pillars must be array");

    // Validar cada objetivo
    brief.objectives.forEach((obj, i) => {
      if (!obj.title) throw new Error(`Objective ${i} missing title`);
      if (!obj.rationale) throw new Error(`Objective ${i} missing rationale`);
      if (!obj.target_persona)
        throw new Error(`Objective ${i} missing target_persona`);
      if (!["Rosa", "Pedro", "Ana-Mae", "Caio"].includes(obj.target_persona)) {
        throw new Error(`Invalid persona: ${obj.target_persona}`);
      }
    });
  }

  /**
   * Enviar preview ao Telegram com botões
   */
  async sendTelegramPreview(brief) {
    const date = brief.date || new Date().toISOString().split("T")[0];
    const personaFlag = {
      Rosa: "👩‍🦰",
      Pedro: "👨‍💼",
      "Ana-Mae": "👩‍🏫",
      Caio: "👨‍🍳",
    };

    const objectivesList = brief.objectives
      .slice(0, 3)
      .map(
        (obj, i) =>
          `${i + 1}. **${obj.title}** (${personaFlag[obj.target_persona] || "👤"} ${obj.target_persona})`
      )
      .join("\n");

    const message = `
📊 **STRATEGY BRIEFING** — ${date}

🎯 **Objetivos para Hoje:**
${objectivesList}

💡 **Key Insights:**
${brief.key_insights.map((insight) => `• ${insight}`).join("\n")}

🎨 **Tone of Day:**
*${brief.tone_of_day}*

📌 **Content Pillars:**
${brief.content_pillars.map((pillar) => `• ${pillar}`).join("\n")}

---
Deseja prosseguir com este briefing para gerar conteúdo?
    `.trim();

    const buttons = generateApprovalButtons("strategy", date);

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
module.exports = StrategyAgent;

// Exportar handler serverless
module.exports.handler = async (req, res) => {
  // Validar CRON_SECRET
  const secret = req.query.secret || req.headers["authorization"]?.split(" ")[1];
  if (secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const agent = new StrategyAgent();

  try {
    const brief = await agent.run();
    res.json({
      ok: true,
      message: "Strategy brief generated successfully",
      data: brief,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};
