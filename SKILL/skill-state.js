/**
 * State Manager — Rastreia fase atual do fluxo de agentes
 * 
 * Suporta dois backends:
 * 1. Supabase (produção/Vercel) — tabela `agent_state`
 * 2. JSON local (desenvolvimento) — arquivo `/KNOW/current-state.json`
 */

import fs from "fs";
import path from "path";

// ============================================================================
// ESTADO LOCAL (JSON)
// ============================================================================

class StateManager {
  constructor(backend = null) {
    // Auto-detect backend: use Supabase on Vercel, local elsewhere
    if (backend === null) {
      this.backend = process.env.VERCEL ? "supabase" : "local";
    } else {
      this.backend = backend;
    }

    this.stateFile = path.join(
      process.cwd(),
      "marketing",
      "state",
      "current-state.json"
    );

    // Initialize Supabase client if needed
    if (this.backend === "supabase") {
      const projectUrl = process.env.SUPABASE_URL;
      const apiKey = process.env.SUPABASE_KEY;
      if (!projectUrl || !apiKey) {
        console.warn(
          "[StateManager] Supabase credentials missing, using in-memory storage (Vercel serverless)"
        );
        this.backend = "memory";
      } else {
        this.supabaseUrl = projectUrl;
        this.supabaseKey = apiKey;
      }
    }

    // Initialize backends
    if (this.backend === "local") {
      this.ensureStateFile();
    } else if (this.backend === "memory") {
      this._memoryState = null;
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

    if (this.backend === "memory") {
      if (!this._memoryState) {
        this._memoryState = {
          date: new Date().toISOString().split("T")[0],
          phase: "insights",
          status: "pending",
          insights_data: null,
          strategy_brief: null,
          tactic_plan: null,
          operational_copy: null,
          figma_frames: null,
          telegram_message_ids: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }
      return this._memoryState;
    }

    if (this.backend === "supabase") {
      try {
        const response = await fetch(
          `${this.supabaseUrl}/rest/v1/agent_state?limit=1&order=id.desc`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.supabaseKey}`,
              "Content-Type": "application/json",
              apikey: this.supabaseKey,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Supabase error: ${response.status}`);
        }

        const data = await response.json();
        if (data.length > 0) {
          return data[0];
        }

        // Create initial state if none exists
        return await this._createInitialState();
      } catch (error) {
        console.error("[StateManager] Supabase getState error:", error.message);
        throw error;
      }
    }
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

    if (this.backend === "memory") {
      const current = await this.getState();
      const updated = {
        ...current,
        ...updates,
        updated_at: new Date().toISOString(),
      };
      this._memoryState = updated;
      return updated;
    }

    if (this.backend === "supabase") {
      try {
        const state = await this.getState();
        const updated = {
          ...state,
          ...updates,
          updated_at: new Date().toISOString(),
        };

        const response = await fetch(
          `${this.supabaseUrl}/rest/v1/agent_state?id=eq.${state.id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${this.supabaseKey}`,
              "Content-Type": "application/json",
              apikey: this.supabaseKey,
            },
            body: JSON.stringify(updated),
          }
        );

        if (!response.ok) {
          throw new Error(`Supabase error: ${response.status}`);
        }

        return updated;
      } catch (error) {
        console.error("[StateManager] Supabase updateState error:", error.message);
        throw error;
      }
    }
  }

  /**
   * Criar estado inicial no Supabase
   */
  async _createInitialState() {
    const initial = {
      date: new Date().toISOString().split("T")[0],
      phase: "insights",
      status: "pending",
      insights_data: null,
      strategy_brief: null,
      tactic_plan: null,
      operational_copy: null,
      figma_frames: null,
      telegram_message_ids: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        `${this.supabaseUrl}/rest/v1/agent_state`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.supabaseKey}`,
            "Content-Type": "application/json",
            apikey: this.supabaseKey,
          },
          body: JSON.stringify(initial),
        }
      );

      if (!response.ok) {
        throw new Error(`Supabase error: ${response.status}`);
      }

      const result = await response.json();
      return result[0] || initial;
    } catch (error) {
      console.error("[StateManager] Failed to create initial state:", error.message);
      throw error;
    }
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

export default StateManager;

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
