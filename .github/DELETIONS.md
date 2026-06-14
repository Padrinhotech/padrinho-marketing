# Deleted Files (2026-06-14)

## Summary
Automation infrastructure removed as part of 2026 H2 transition to manual/conversational workflow.

## Files Deleted
- `package.json` — Node.js project config
- `package-lock.json` — Node.js dependency lock
- `vercel.json` — Vercel deployment config
- `.env.example` — Environment variables template
- `DIAGNOSTIC_AGENTS.js` — Agent orchestration script (4.8 KB)
- `api/` directory — API routes and agent implementations:
  - `api/AUT_Automation.md`
  - `api/agents/` (7 agent files)
  - `api/aut-orchestrate.js`
  - `api/test-supabase.js`
  - `api/webhooks/hooks-telegram.js`
- `node_modules/` directory — All installed dependencies (931 files total)

## Total
**931 files deleted, 119.8 KB removed**

## Commit
Hash: `5aeb4d6`

The deletion commit was created locally via:
```bash
git rm package.json package-lock.json vercel.json .env.example DIAGNOSTIC_AGENTS.js -f
git rm api node_modules -r -f
git commit -m "Remove automation infrastructure..."
```

To view the changes:
```bash
git log --oneline -1
git show --stat
```
