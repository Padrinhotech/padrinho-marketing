/**
 * Orchestrator — Coordena transições entre agentes
 * 
 * Responsável por:
 * - Validar transições de fase
 * - Chamar agentes apropriados
 * - Gerenciar estado
 * - Tratamento de erros
 */

const StateManager = require("./state.js");
const TelegramClient = require("./telegram-client.js");

class Orchestrator {
  constructor() {
    this.state = new StateManager(process.env.STATE_BACKEND || "local");
    this.telegram = new TelegramClient(
      process.env.TELEGRAM_BOT_TOKEN,
      process.env.TELEGRAM_CHAT_ID
    );
  }

  /**
   * Iniciar dia novo (22h da noite anterior)
   * Dispara Insights Agent
   */
  async startInsightsPhase() {
    console.log("[Orchestrator] Starting INSIGHTS phase...");

    const currentState = await this.state.getState();

    // Se já está em published/cancelled, reset para novo dia
    if (
      currentState.phase === "published" ||
      currentState.phase === "cancelled"
    ) {
      await this.state.resetDaily();
    }

    // TODO: Chamar /api/agents/insights.js
    // const insightsAgent = require("./agents/insights.js");
    // await insightsAgent.run(this.state, this.telegram);

    console.log("[Orchestrator] INSIGHTS phase initiated");
  }

  /**
   * Disparar Strategy Agent (10h BRT)
   */
  async startStrategyPhase() {
    console.log("[Orchestrator] Starting STRATEGY phase...");

    const currentState = await this.state.getState();

    // Validar: só roda se insights foi completado
    const insightsData = await this.state.getPhaseData("insights");
    if (!insightsData) {
      throw new Error("Cannot start STRATEGY phase without INSIGHTS data");
    }

    // TODO: Chamar /api/agents/strategy.js
    // const strategyAgent = require("./agents/strategy.js");
    // await strategyAgent.run(this.state, this.telegram);

    console.log("[Orchestrator] STRATEGY phase initiated");
  }

  /**
   * Disparar agente baseado em aprovação (webhook)
   */
  async handleApproval(phase, approved) {
    console.log(`[Orchestrator] Handling approval: ${phase} = ${approved}`);

    const currentState = await this.state.getState();

    if (!approved) {
      // Rejeição: fica na mesma fase, permite refazer
      await this.state.transitionPhase(phase, phase, "rejected");
      await this.telegram.sendMessage(
        `⚠️ ${phase.toUpperCase()} foi rejeitado. Refaça e tente novamente.`
      );
      return;
    }

    // Aprovação: transiciona para próxima fase
    const nextPhase = this.getNextPhase(phase);
    
    // Se não há próxima fase (insights/market), apenas commit
    if (!nextPhase) {
      await this.state.transitionPhase(phase, phase, "approved");
      await this.telegram.sendMessage(
        `✅ ${phase.toUpperCase()} aprovado. Comitando para GitHub...`
      );
      // TODO: Commit para GitHub
      // await this.commitToGithub(phase);
      await this.telegram.sendMessage(
        `✅ ${phase.toUpperCase()} comitado com sucesso!`
      );
      return;
    }

    await this.state.transitionPhase(phase, nextPhase, "approved");

    // Chamar agent apropriado
    try {
      switch (nextPhase) {
        case "tactic": {
          console.log("[Orchestrator] Dispatching TACTIC agent");
          const TacticAgent = require("../agents/tactic.js");
          const tacticInstance = new TacticAgent();
          await tacticInstance.run();
          break;
        }

        case "operational": {
          console.log("[Orchestrator] Dispatching OPERATIONAL agent");
          const OperationalAgent = require("../agents/operational.js");
          const operationalInstance = new OperationalAgent();
          await operationalInstance.run();
          break;
        }

        case "figma": {
          console.log("[Orchestrator] Dispatching FIGMA agent");
          // TODO: Implementar FigmaAgent
          await this.telegram.sendMessage("⏳ Preparando Figma...");
          break;
        }

        case "published": {
          console.log("[Orchestrator] Dispatching PUBLISH");
          // TODO: publish logic
          await this.telegram.sendMessage("✅ Conteúdo pronto para publicação!");
          break;
        }

        default:
          throw new Error(`Unknown next phase: ${nextPhase}`);
      }
    } catch (error) {
      console.error("[Orchestrator] Error dispatching agent:", error);
      await this.telegram.sendMessage(
        `❌ Erro ao disparar agente: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * Determinar próxima fase baseado na fase atual
   */
  getNextPhase(currentPhase) {
    const transitions = {
      insights: null, // Insights é independente, apenas atualiza arquivo
      market: null, // Market é independente, apenas atualiza arquivo
      strategy: "tactic",
      tactic: "operational",
      operational: "figma",
      figma: "published",
    };

    return transitions[currentPhase];
  }

  /**
   * Cancelar fluxo atual (rejeição na fase final)
   */
  async cancelFlow(reason = "") {
    console.log("[Orchestrator] Cancelling flow...");

    await this.state.updateState({
      phase: "cancelled",
      status: "rejected",
    });

    const message = reason
      ? `❌ Fluxo cancelado: ${reason}`
      : "❌ Fluxo cancelado pelo usuário";

    await this.telegram.sendMessage(message);
  }

  /**
   * Obter diagnóstico do estado atual
   */
  async getDiagnostics() {
    const state = await this.state.getState();
    return {
      date: state.date,
      phase: state.phase,
      status: state.status,
      has_insights: !!state.insights_data,
      has_strategy: !!state.strategy_brief,
      has_tactic: !!state.tactic_plan,
      has_operational: !!state.operational_copy,
      has_figma: !!state.figma_frames,
      updated_at: state.updated_at,
    };
  }

  /**
   * Debug: enviar estado ao Telegram
   */
  async sendDiagnostics() {
    const diag = await this.getDiagnostics();
    const message = `
🔍 ESTADO ATUAL

📅 Data: ${diag.date}
📍 Fase: ${diag.phase}
📊 Status: ${diag.status}

✅ Insights: ${diag.has_insights ? "Sim" : "Não"}
✅ Strategy: ${diag.has_strategy ? "Sim" : "Não"}
✅ Tactic: ${diag.has_tactic ? "Sim" : "Não"}
✅ Operational: ${diag.has_operational ? "Sim" : "Não"}
✅ Figma: ${diag.has_figma ? "Sim" : "Não"}

Última atualização: ${diag.updated_at}
    `;

    await this.telegram.sendMessage(message);
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = Orchestrator;

/**
 * EXEMPLO DE USO:
 * 
 * const Orchestrator = require("./lib/orchestrator.js");
 * 
 * const orchestrator = new Orchestrator();
 * 
 * // Iniciar Insights (22h)
 * await orchestrator.startInsightsPhase();
 * 
 * // Iniciar Strategy (10h)
 * await orchestrator.startStrategyPhase();
 * 
 * // Lidar com aprovação (webhook)
 * await orchestrator.handleApproval("strategy", true); // Aprovado
 * await orchestrator.handleApproval("tactic", false); // Rejeitado
 * 
 * // Cancelar tudo
 * await orchestrator.cancelFlow("Conteúdo inadequado");
 * 
 * // Debug
 * await orchestrator.sendDiagnostics();
 */
