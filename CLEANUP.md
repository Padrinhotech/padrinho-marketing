# 🗑️ Cleanup: Files & Folders to Delete

**Status:** Ready for deletion  
**Reason:** 2026 H2 transition from automated Node.js/Vercel agents to manual/conversational workflow via Claude AI  
**Deletion Target:** Git push required

---

## Root-Level Files to Delete

### Configuration & Deployment
- ✅ `package.json` — Node.js project config
- ✅ `package-lock.json` — Dependency lock file
- ✅ `vercel.json` — Vercel deployment config
- ✅ `.env.example` — Environment variables template

### Scripts & Orchestration
- ✅ `DIAGNOSTIC_AGENTS.js` — Agent orchestration entry point (4.8 KB)

---

## Directories to Delete (Entire)

### `api/` — API Routes & Agent Implementations
```
api/
├── AUT_Automation.md                    (documentation)
├── agents/
│   ├── agent-figma.js                 (Figma design agent)
│   ├── agent-insights.js              (insights/data agent)
│   ├── agent-market.js                (market research agent)
│   ├── agent-operational.js           (operational tasks agent)
│   ├── agent-strategy.js              (strategy agent)
│   ├── agent-tactic.js                (tactics/execution agent)
│   └── agent-user-insights.js         (user research agent)
├── aut-orchestrate.js                  (orchestration logic)
├── test-supabase.js                    (Supabase test script)
└── webhooks/
    └── hooks-telegram.js               (Telegram webhook handler)
```
**Total:** 11 files  
**Size:** ~50 KB

### `node_modules/` — All Dependencies
```
node_modules/
├── @anthropic-ai/sdk/         (Anthropic SDK)
├── @types/node/               (TypeScript Node types)
├── @types/node-fetch/         (Fetch types)
├── dotenv/                    (Environment variable loader)
├── form-data/                 (FormData polyfill)
├── node-fetch/                (Fetch polyfill)
└── [65+ other packages]       (various dependencies)
```
**Total:** 931 files  
**Size:** 119.8 MB

---

## Deletion Commands

### Via Git (Recommended)
Ensure you're on the `main` branch:

```bash
cd padrinho-marketing
git rm package.json package-lock.json vercel.json .env.example DIAGNOSTIC_AGENTS.js -f
git rm api node_modules -r -f
git commit -m "Remove automation infrastructure (Node.js, Vercel, agent scripts)

Deleted 931 files:
- package.json, package-lock.json (Node.js dependencies)
- vercel.json (Vercel deployment config)
- .env.example (environment variables)
- DIAGNOSTIC_AGENTS.js (orchestration script)
- api/ directory (API routes and agents)
- node_modules/ directory (installed dependencies)

2026 H2: workflow is manual and conversational via Claude AI."
git push origin main
```

### Via GitHub Web UI
For each file/folder:
1. Navigate to file in https://github.com/Padrinhotech/padrinho-marketing
2. Click ⋮ → Delete file
3. Commit with message: "Remove [file/folder] (automation cleanup)"

---

## Impact Summary

| Item | Count | Size | Impact |
|------|-------|------|--------|
| Root config files | 4 | ~2 KB | Dependency config |
| Root scripts | 1 | ~5 KB | Agent orchestration |
| `api/` files | 11 | ~50 KB | Agent implementations |
| `node_modules/` | 931 | ~119.8 MB | Installed packages |
| **TOTAL** | **947** | **~119.8 MB** | **Archive cleanup** |

---

## Why These Files?

### Before 2026 H2
- Automated workflow: `DIAGNOSTIC_AGENTS.js` orchestrated 4 agents (Strategy → Tactic → Operational → Figma)
- Deployed on Vercel with Node.js runtime
- Used `.env` for secrets (Supabase, Figma, etc.)
- Agents implemented in `api/agents/`

### After 2026 H2
- **Manual workflow:** Claude AI handles steps conversationally
- **No deployment:** All work done via Claude in claude.ai (no Vercel needed)
- **Secrets in Claude:** Anthropic MCP servers handle authentication
- **No Node.js:** Code is Markdown-based (MD/YAML), not JavaScript

---

## Files to Keep ✅

```
padrinho-marketing/
├── README.md                          ← KEEP (2026 H2 overview)
├── .gitignore                         ← KEEP (Git ignore rules)
├── AGENT/                             ← KEEP (agent definitions v2.0)
│   ├── AGENT_Strategy.md
│   ├── AGENT_Tactic.md
│   ├── AGENT_Operational.md
│   └── AGENT_Figma.md
├── KNOW/                              ← KEEP (knowledge base)
│   ├── KNOW_BrandPositioning.md
│   ├── KNOW_RosaEquilibrista.md
│   ├── KNOW_AnaMaeProtetora.md
│   ├── KNOW_PedroAutonomo.md
│   ├── KNOW_CaioFilho.md
│   └── [other files]
├── SKILL/                             ← KEEP (skills & workflows)
│   ├── SKILL_ContentCreationWorkflow.md
│   ├── SKILL_Documentation.md
│   └── [other skills]
├── POSTS/                             ← KEEP (editorial calendar)
│   ├── AGENDA_Padrinho.md
│   └── [DDMMYYYY_Topic/ folders]
└── DATA/                              ← KEEP (data & insights)
    ├── [competitor analysis]
    └── [market data]
```

---

## Verification

After deletion, the repo should only contain:
- ✅ `README.md` (2026 H2 guide)
- ✅ `.gitignore` + `.github/` (Git config)
- ✅ `AGENT/`, `KNOW/`, `SKILL/`, `POSTS/`, `DATA/` directories

**Deleted:**
- ❌ `package.json`, `package-lock.json`, `vercel.json`, `.env.example`
- ❌ `DIAGNOSTIC_AGENTS.js`
- ❌ `api/` directory (entire)
- ❌ `node_modules/` directory (entire)

---

## Questions?

- **Why not delete gradually?** Cleaner history; all automation files removed in one commit.
- **Can we keep `api/` for reference?** No—it's obsolete and clutters the repo. The logic is preserved in AGENT v2.0 definitions.
- **What about `.env` secrets?** Not committed; `.env.example` is safe to delete.

---

**Last Updated:** 2026-06-14  
**Prepared by:** Claude Padrinho Bot
