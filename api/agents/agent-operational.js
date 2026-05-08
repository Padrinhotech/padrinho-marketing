/**
 * Operational Agent
 * 
 * Dispara após aprovação de Tactic
 * Lê content plan + copy rules + photo guidelines
 * Gera copy (captions + hashtags) + visual brief
 * Envia ao Telegram com botões de aprovação
 * 
 * Entrada: content_plan.json (do estado)
 * Saída: operational_copy.json (no estado)
 */

const fs = require("fs");
const path = require("path");
const StateManager = require("../SKILL/lib/state.js");
const TelegramClient = require("../SKILL/lib/telegram-client.js");
const ClaudeClient = require("../SKILL/lib/claude-client.js");
const {
  OPERATIONAL_SYSTEM_PROMPT,
} = require("../SKILL/lib/claude-client.js");
const {
  generateApprovalButtons,
} = require("../SKILL/lib/telegram-client.js");

class OperationalAgent {
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
      console.log("[OperationalAgent] Starting...");

      // 1. Validar que Tactic foi aprovado
      const contentPlan = await this.state.getPhaseData("tactic");
      if (!contentPlan) {
        throw new Error("No content plan found. Run Tactic Agent first.");
      }

      // 2. Ler skills operacionais + personas + design
      const copyRules = this.readFile(
        "./skills/operational/copy-rules.md"
      );
      const photoGuidelines = this.readFile(
        "./skills/operational/photo-guidelines.md"
      );
      const componentSystem = this.readFile(
        "./skills/operational/component-system.md"
      );
      const figmaDelivery = this.readFile(
        "./skills/operational/figma-delivery.md"
      );
      const visualAgent = this.readFile(
        "./skills/operational/visual-agent.md"
      );
      const rosaPersona = this.readFile(
        "./skills/audiences/rosa-equilibrista.md"
      );
      const anaMaePersona = this.readFile(
        "./skills/audiences/ana-mae-protetora.md"
      );
      const brandPositioning = this.readFile(
        "./skills/strategy/brand-positioning.md"
      );

      // 3. Preparar prompt para Claude
      const userPrompt = this.preparePrompt(
        contentPlan,
        copyRules,
        photoGuidelines,
        componentSystem,
        figmaDelivery,
        visualAgent,
        rosaPersona,
        anaMaePersona,
        brandPositioning
      );

      // 4. Chamar Claude para gerar copy
      console.log("[OperationalAgent] Calling Claude API...");
      const operationalCopy = await this.claude.callJSON(
        userPrompt,
        OPERATIONAL_SYSTEM_PROMPT,
        { max_tokens: 5000 }
      );

      // 5. Validar output
      this.validateCopy(operationalCopy);

      // 6. Salvar no estado
      await this.state.savePhaseData("operational", operationalCopy);

      // 7. Enviar ao Telegram (preview do primeiro post)
      const messageId = await this.sendTelegramPreview(
        operationalCopy
      );

      // 8. Registrar message ID
      await this.state.saveTelegramMessageId("operational", messageId);

      console.log("[OperationalAgent] Complete - awaiting approval");
      return operationalCopy;
    } catch (error) {
      console.error("[OperationalAgent] Error:", error);
      await this.telegram.sendMessage(
        `❌ Erro ao gerar copy operacional:\n\`${error.message}\``
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
  preparePrompt(contentPlan, copyRules, photoGuidelines, componentSystem, figmaDelivery, visualAgent, rosa, anaMae, positioning) {
    return `
# Content Plan para Execução Operacional

${JSON.stringify(contentPlan, null, 2)}

---

# Copy Rules (Ton, Estilo, Tamanho)

${copyRules}

---

# Photo Guidelines (Estilo, Demografia, Mood)

${photoGuidelines}

---

# Component System (Componentes Figma Disponíveis)

${componentSystem}

---

# Figma Delivery Standards

${figmaDelivery}

---

# Visual Agent Guidelines

${visualAgent}

---

# Brand Positioning (sempre respeitar tom)

${positioning}

---

# Target Personas (escrita para quem?)

## Rosa - A Equilibrista (PRIMARY)
${rosa}

---

## Ana Mae - A Mãe Protetora (SECONDARY)
${anaMae}

---

Baseado no plano de conteúdo acima, gere COPY (captions + hashtags) e VISUAL BRIEF (fotos + layout) para cada post:

\`\`\`json
{
  "date": "YYYY-MM-DD",
  "content_plan_id": "content_plan_id",
  "posts": [
    {
      "post_id": 1,
      "caption": "Caption com hook + mensagem + CTA (100-300 chars)",
      "hashtags": ["tag1", "tag2", "...", "tag20"],
      "alt_text": "Descrição para acessibilidade",
      "visual_brief": {
        "component_figma": "nome do componente em _COMPONENTS",
        "layout": {
          "background_color": "rgba(...)",
          "typography": {
            "headline": "Brand Bold 48px",
            "body": "Brand Regular 20px"
          }
        },
        "photos": [
          {
            "slide": 5,
            "unsplash_query": "QUERY EXATO para Unsplash",
            "style": "authentic, moody, vulnerable",
            "tone": "descrição do mood"
          }
        ]
      }
    }
  ]
}
\`\`\`

Requisitos obrigatórios:
- Caption: 100-300 caracteres
- Hook engajador (primeiros 50 chars interessantes)
- CTA específico (não genérico)
- Hashtags: misture trending + brand + relevantes (15-20)
- Alt text: descrição acessível (para deficientes visuais)
- Unsplash query: seja MUITO específico (ex: "woman overwhelmed anxious dark moody authentic portrait")
- Ninguém identificável (LGPD)
- Zero jargão médico, zero promessas de cura
- Tone sempre alinhado com copy-rules.md

Retorne APENAS o JSON válido, sem markdown, sem explicações.
`;
  }

  /**
   * Validar estrutura do copy
   */
  validateCopy(copy) {
    if (!copy.date) throw new Error("Missing date");
    if (!Array.isArray(copy.posts)) throw new Error("posts must be array");

    copy.posts.forEach((post, i) => {
      if (!post.caption) throw new Error(`Post ${i} missing caption`);
      if (post.caption.length > 300)
        throw new Error(`Post ${i} caption too long (max 300)`);
      if (!Array.isArray(post.hashtags))
        throw new Error(`Post ${i} hashtags must be array`);
      if (post.hashtags.length < 10 || post.hashtags.length > 20) {
        throw new Error(`Post ${i} hashtags must be 10-20`);
      }
      if (!post.alt_text) throw new Error(`Post ${i} missing alt_text`);
      if (!post.visual_brief) throw new Error(`Post ${i} missing visual_brief`);
      if (!post.visual_brief.component_figma)
        throw new Error(`Post ${i} missing component_figma`);
      if (!post.visual_brief.photos || post.visual_brief.photos.length === 0) {
        console.warn(`Post ${i} no photos specified (caption-only?)`);
      }
    });
  }

  /**
   * Enviar preview ao Telegram (mostra primeiro post)
   */
  async sendTelegramPreview(copy) {
    const date = copy.date || new Date().toISOString().split("T")[0];
    const firstPost = copy.posts[0];

    const hashtagsText = firstPost.hashtags.slice(0, 5).join(" ");

    const message = `
✍️ **COPY & VISUAL BRIEF** — ${date}

📝 **Post 1 — Copy:**

${firstPost.caption}

🏷️ **Hashtags:**
${hashtagsText} ... (+${firstPost.hashtags.length - 5} mais)

🎨 **Visual Brief:**
Component: ${firstPost.visual_brief.component_figma}
${
  firstPost.visual_brief.photos && firstPost.visual_brief.photos.length > 0
    ? `Fotos: ${firstPost.visual_brief.photos
        .map((p) => `Slide ${p.slide}`)
        .join(", ")}`
    : "Fotos: Nenhuma (caption only)"
}

---
**Total: ${copy.posts.length} posts com copy + visual brief**

Deseja prosseguir com este conteúdo para Figma?
    `.trim();

    const buttons = generateApprovalButtons("operational", date);

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
module.exports = OperationalAgent;

// Exportar handler serverless como propriedade
module.exports.handler = async (req, res) => {
  // Validar CRON_SECRET
  const secret = req.query.secret || req.headers["authorization"]?.split(" ")[1];
  if (secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const agent = new OperationalAgent();

  try {
    const copy = await agent.run();
    res.json({
      ok: true,
      message: "Operational copy generated successfully",
      data: copy,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};
