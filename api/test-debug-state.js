/**
 * Debug: Check state file and test saving
 */

import fs from "fs";
import path from "path";
import StateManager from "../SKILL/skill-state.js";

export default async (req, res) => {
  try {
    const stateManager = new StateManager();
    const stateFile = path.join(process.cwd(), "DATA", "agent-state.json");

    console.log("[Debug] Checking state file location...");
    console.log("[Debug] Expected path:", stateFile);
    console.log("[Debug] File exists:", fs.existsSync(stateFile));
    console.log("[Debug] CWD:", process.cwd());
    console.log("[Debug] DATA exists:", fs.existsSync(path.join(process.cwd(), "DATA")));

    // Read current state
    const currentState = await stateManager.getState();
    
    // Try to save test data
    const testData = {
      test_debug: true,
      timestamp: new Date().toISOString(),
      random: Math.random().toString(36).substring(7),
    };

    console.log("[Debug] Saving test data:", testData);
    const updated = await stateManager.savePhaseData("test_debug", testData);
    console.log("[Debug] Save completed");

    // Read back
    const loaded = await stateManager.getPhaseData("test_debug");
    console.log("[Debug] Loaded back:", loaded);

    res.json({
      cwd: process.cwd(),
      state_file_path: stateFile,
      state_file_exists: fs.existsSync(stateFile),
      current_state_keys: Object.keys(currentState),
      test_save_success: !!loaded && loaded.test_debug === true,
      github_token_set: !!process.env.GITHUB_TOKEN,
      vercel: !!process.env.VERCEL,
    });
  } catch (error) {
    console.error("[Debug] Error:", error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
};
