/**
 * State Manager — Rastreia fase atual do fluxo de agentes
 * 
 * Backend: GitHub (DATA/agent-state.json)
 * - Lê/escreve arquivo JSON no repositório
 * - Auto-commit após atualizar estado
 * - Funciona em local development e Vercel
 * - Dados persistem entre execuções de cron
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

class StateManager {
  constructor() {
    // On Vercel, /var/task is read-only. Use /tmp for local writes.
    // GitHub path is always DATA/agent-state.json
    const isVercel = !!process.env.VERCEL;
    this.stateFile = isVercel
      ? "/tmp/agent-state.json"
      : path.join(process.cwd(), "DATA", "agent-state.json");
    this.githubPath = "DATA/agent-state.json"; // Always GitHub path
    
    console.log("[StateManager] Using state file:", this.stateFile);
    console.log("[StateManager] GitHub path:", this.githubPath);
    
    this.ensureStateFile();
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
   * Obter estado atual (lê de DATA/agent-state.json)
   */
  async getState() {
    try {
      const content = fs.readFileSync(this.stateFile, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      console.error("[StateManager] Error reading state file:", error.message);
      throw error;
    }
  }

  /**
   * Atualizar estado (parcial) e fazer commit no GitHub
   */
  async updateState(updates) {
    try {
      const current = await this.getState();
      const updated = {
        ...current,
        ...updates,
        updated_at: new Date().toISOString(),
      };

      // Write to file
      fs.writeFileSync(
        this.stateFile,
        JSON.stringify(updated, null, 2),
        "utf-8"
      );
      console.log("[StateManager] ✅ File written locally");

      // Auto-commit to GitHub
      console.log("[StateManager] Attempting GitHub API commit...");
      const commitResult = await this.commitToGitHub(
        `chore: update agent state - ${updated.phase} (${updated.status})`
      );
      console.log("[StateManager] GitHub commit completed");

      return updated;
    } catch (error) {
      console.error("[StateManager] ❌ Error in updateState:", error.message);
      console.error("[StateManager] Stack:", error.stack);
      // Throw to let caller handle
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
    console.log("[StateManager] savePhaseData called:", phase);
    const key = `${phase}_data`;
    const updateObj = { [key]: data };
    console.log("[StateManager] Updating with key:", key);
    return this.updateState(updateObj);
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

  /**
   * Atualizar arquivo no GitHub via API
   * Mais confiável do que git commands em Vercel
   */
  async commitToGitHub(message) {
    console.log("[StateManager] commitToGitHub called:", message);
    
    // On local development, use git directly
    if (!process.env.VERCEL) {
      console.log("[StateManager] Local mode - using git");
      try {
        execSync(`git add DATA/agent-state.json`, { cwd: process.cwd() });
        execSync(`git commit -m "${message}"`, {
          cwd: process.cwd(),
          stdio: "pipe",
        });
        execSync(`git push origin main`, { cwd: process.cwd(), stdio: "pipe" });
        console.log("[StateManager] ✅ Committed to GitHub:", message);
      } catch (e) {
        console.warn("[StateManager] Local git commit failed:", e.message);
      }
      return;
    }

    // On Vercel, use GitHub API (more reliable)
    console.log("[StateManager] Vercel mode - using GitHub API");
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      console.warn("[StateManager] ⚠️  GITHUB_TOKEN not set - data will be lost!");
      return;
    }

    console.log("[StateManager] GitHub token found, reading file...");
    try {
      // Read file content
      const fileContent = fs.readFileSync(this.stateFile, "utf-8");
      console.log("[StateManager] File read successfully, size:", fileContent.length);
      const base64Content = Buffer.from(fileContent).toString("base64");

      // Prepare GitHub API request
      const owner = "Padrinhotech";
      const repo = "padrinho-marketing";
      const filePath = "DATA/agent-state.json";

      // Get current file SHA (needed for updates)
      console.log("[StateManager] Getting current file SHA from GitHub...");
      const getResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${token}`,
            "User-Agent": "Padrinho-Bot",
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      let sha = null;
      if (getResponse.ok) {
        const data = await getResponse.json();
        sha = data.sha;
        console.log("[StateManager] File SHA found:", sha?.substring(0, 8));
      } else {
        console.warn("[StateManager] File not found on GitHub (first time?)", getResponse.status);
      }

      // Update file via GitHub API
      console.log("[StateManager] Updating file on GitHub...");
      const updateBody = {
        message: message,
        content: base64Content,
        branch: "main",
      };

      if (sha) {
        updateBody.sha = sha;
      }

      const updateResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
        {
          method: "PUT",
          headers: {
            Authorization: `token ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "Padrinho-Bot",
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify(updateBody),
        }
      );

      if (updateResponse.ok) {
        console.log("[StateManager] ✅ Committed to GitHub via API:", message);
      } else {
        let errDetails = "";
        try {
          const errData = await updateResponse.json();
          errDetails = JSON.stringify(errData, null, 2);
        } catch {
          errDetails = await updateResponse.text();
        }
        console.warn(
          "[StateManager] ❌ GitHub API update failed:",
          updateResponse.status,
          updateResponse.statusText
        );
        console.warn("[StateManager] Error details:", errDetails);
      }
    } catch (error) {
      console.error("[StateManager] ❌ Fatal error during GitHub API commit:", error.message);
      console.error("[StateManager] Stack trace:", error.stack);
      throw error;
    }
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
