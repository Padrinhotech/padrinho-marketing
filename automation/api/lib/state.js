/**
 * State Manager — Rastreia fase atual do fluxo de agentes
 * 
 * Suporta dois backends:
 * 1. Supabase (produção) — tabela `agent_state`
 * 2. JSON local (desenvolvimento) — arquivo `/marketing/state/current-state.json`
 */

const fs = require("fs");
const path = require("path");

// ============================================================================
// ESTADO LOCAL (JSON)
// ============================================================================

class StateManager {
  constructor(backend = "local") {
    this.backend = backend;
    this.stateFile = path.join(
      process.cwd(),
      "marketing",
      "state",
      "current-state.json"
    );

    if (this.backend === "local") {
      this.ensureStateFile();
    }
  }

  ensureStateFile() {
    const dir = path.dirname(this.stateFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(this.stateFile)) {
      const initial = {
        date: new Date().toISOString().split("T")[0],
        phase: "insights", // insights | strategy | tactic | operational | figma | published | cancelled
        status: "pending", // pending | approved | rejected
        insights_data: null,
        strategy_brief: null,
        tactic_plan: null,
        operational_copy: null,
        figma_frames: null,
        telegram_message_ids: {}, // { phase: message_id }
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      fs.writeFileSync(this.stateFile, JSON.stringify(initial, null, 2));
    }
  }

  /**
   * Obter estado atual
   */
  async getState() {
    if (this.backend === "local") {
      const content = fs.readFileSync(this.stateFile, "utf-8");
      return JSON.parse(content);
    }
    // TODO: Supabase
  }

  /**
   * Atualizar estado (parcial)
   */
  async updateState(updates) {
    if (this.backend === "local") {
      const current = this.getState();
      const updated = {
        ...current,
        ...updates,
        updated_at: new Date().toISOString(),
      };
      fs.writeFileSync(this.stateFile, JSON.stringify(updated, null, 2));
      return updated;
    }
    // TODO: Supabase
  }

  /**
   * Transição de fase
   * Valida transições permitidas
   */
  async transitionPhase(fromPhase, toPhase, approval = "approved") {
    const validTransitions = {
      insights: ["strategy"],
      strategy: approval === "approved" ? ["tactic"] : ["strategy"],
      tactic: approval === "approved" ? ["operational"] : ["tactic"],
      operational: approval === "approved" ? ["figma"] : ["operational"],
      figma: approval === "approved" ? ["published"] : ["operational"],
      published: ["insights"], // próximo dia
      cancelled: ["insights"], // reset
    };

    if (!validTransitions[fromPhase] || !validTransitions[fromPhase].includes(toPhase)) {
      throw new Error(`Transição inválida: ${fromPhase} → ${toPhase}`);
    }

    return this.updateState({
      phase: toPhase,
      status: approval === "approved" ? "approved" : "rejected",
    });
  }

  /**
   * Resetar estado diário (rodar insights de novo)
   */
  async resetDaily() {
    return this.updateState({
      date: new Date().toISOString().split("T")[0],
      phase: "insights",
      status: "pending",
      insights_data: null,
      strategy_brief: null,
      tactic_plan: null,
      operational_copy: null,
      figma_frames: null,
      telegram_message_ids: {},
    });
  }

  /**
   * Salvar dados de fase específica
   */
  async savePhaseData(phase, data) {
    const key = `${phase}_data`;
    return this.updateState({
      [key]: data,
    });
  }

  /**
   * Obter dados de fase específica
   */
  async getPhaseData(phase) {
    const state = await this.getState();
    const key = `${phase}_data`;
    return state[key];
  }

  /**
   * Registrar message ID do Telegram (para editar depois)
   */
  async saveTelegramMessageId(phase, messageId) {
    const state = await this.getState();
    return this.updateState({
      telegram_message_ids: {
        ...state.telegram_message_ids,
        [phase]: messageId,
      },
    });
  }

  /**
   * Obter message ID do Telegram
   */
  async getTelegramMessageId(phase) {
    const state = await this.getState();
    return state.telegram_message_ids?.[phase];
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = StateManager;

/**
 * EXEMPLO DE USO:
 * 
 * const StateManager = require("./lib/state.js");
 * const state = new StateManager("local");
 * 
 * // Obter estado atual
 * const current = await state.getState();
 * console.log(current.phase); // "insights"
 * 
 * // Salvar dados gerados pela strategy
 * await state.savePhaseData("strategy", {
 *   objectives: [...],
 *   key_insights: [...],
 *   tone_of_day: "..."
 * });
 * 
 * // Transicionar para tactic (se aprovado)
 * await state.transitionPhase("strategy", "tactic", "approved");
 * 
 * // Registrar message ID do Telegram (para editar depois)
 * await state.saveTelegramMessageId("strategy", 123456789);
 */
