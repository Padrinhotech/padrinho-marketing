---
title: Deployment Guide
version: 1.0
type: Automation
status: active
last_updated: 2026-05-07
---

# 🚀 Padrinho Marketing Automation — Deployment Guide

**Status**: Code deployed to GitHub ✅ | Ready for Vercel setup

## Quick Start

```bash
# Code is already pushed to GitHub
git push origin main  # ✅ DONE

# Next: Configure Vercel (see steps below)
```

---

## Phase 1: GitHub (✅ COMPLETE)

### Repository
- **URL**: https://github.com/Padrinhotech/padrinho-marketing
- **Branch**: `main`
- **Latest commit**: b8dda91 (docs: add YAML frontmatter)

### What was pushed
- ✅ 7 agents (agent-*.js)
- ✅ All KNOW/SKILL/AGENT documentation
- ✅ vercel.json with cron configuration
- ✅ .env.example with required variables
- ✅ All naming conventions applied

---

## Phase 2: Vercel Deployment (NEXT)

### Step 1: Log in to Vercel
Visit: https://vercel.com/dashboard

### Step 2: Import Project
1. Click **"Add New..." → "Project"**
2. Select **"Padrinhotech/padrinho-marketing"**
3. Keep default settings:
   - Framework: **Other** (Serverless Functions)
   - Build Command: **npm install**
4. Click **"Import"**

### Step 3: Configure Environment Variables

**⚠️ CRITICAL: Set these before deploying**

Go to: **Settings → Environment Variables**

```env
# Claude API
ANTHROPIC_API_KEY=sk-ant-v0-...

# Figma
FIGMA_TOKEN=figd_...

# Telegram (for approval gates & preview posts)
TELEGRAM_BOT_TOKEN=7123456789:AAF...
TELEGRAM_CHAT_ID=8322832640

# Instagram (for publishing)
INSTAGRAM_ACCESS_TOKEN=EAAo...
INSTAGRAM_ACCOUNT_ID=...

# Security
CRON_SECRET=[generate with: openssl rand -hex 32]

# Vercel auto-fills this
VERCEL_URL=padrinho-marketing.vercel.app
```

**Generate CRON_SECRET locally:**
```bash
openssl rand -hex 32
# Example: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### Step 4: Deploy
Click **"Deploy"** — Vercel will:
1. Install dependencies (`npm install`)
2. Configure cron jobs from `vercel.json`
3. Set environment variables
4. Deploy serverless functions

### Step 5: Verify Deployment

After deployment succeeds:
1. Visit your Vercel project dashboard
2. Check **"Functions"** tab — should see:
   - ✓ `/api/agents/agent-insights.js`
   - ✓ `/api/agents/agent-market.js`
   - ✓ `/api/agents/agent-user-insights.js`
   - ✓ `/api/agents/agent-strategy.js`
   - ✓ `/api/agents/agent-tactic.js`
   - ✓ `/api/agents/agent-operational.js`
   - ✓ `/api/agents/agent-figma.js`
   - ✓ `/api/webhooks/hooks-telegram.js`
   - ✓ `/api/aut-publish.js`

3. Check **"Crons"** tab — should see 4 scheduled jobs:
   - `0 1 * * *` → `/api/agents/agent-insights` (22h BRT)
   - `0 2 * * *` → `/api/agents/agent-market` (23h BRT)
   - `30 2 * * *` → `/api/agents/agent-user-insights` (23h30 BRT)
   - `0 11 * * *` → `/api/agents/agent-strategy` (8h BRT)

---

## Phase 3: Telegram Webhook Setup (AFTER DEPLOYMENT)

Once Vercel deployment is live:

### Option A: Automated Setup
```bash
curl -X POST https://padrinho-marketing.vercel.app/api/aut-setup-webhook.js \
  -H "X-Cron-Secret: YOUR_CRON_SECRET" \
  -H "Content-Type: application/json"
```

### Option B: Manual Setup (Telegram Bot API)
```bash
curl -X POST https://api.telegram.org/botTOKEN/setWebhook \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://padrinho-marketing.vercel.app/api/webhooks/hooks-telegram.js",
    "secret_token": "YOUR_WEBHOOK_SECRET"
  }'
```

### Verify Webhook
```bash
curl -X POST https://api.telegram.org/botTOKEN/getWebhookInfo
```

---

## Phase 4: Local Testing (Optional)

Before going live, test locally:

```bash
# 1. Create local env file
cp .env.example .env.local

# Edit .env.local with test/staging credentials
# ⚠️ NEVER use production credentials for local testing

# 2. Install Vercel CLI
npm install -g vercel

# 3. Run locally
vercel dev

# 4. Test an agent (in another terminal)
curl http://localhost:3000/api/agents/agent-insights \
  -H "X-Cron-Secret: $(openssl rand -hex 32)"
```

---

## 📅 First Workflow Cycle

**Timeline (BRT - Brasília Time):**

| Time | Agent | Task | Output |
|------|-------|------|--------|
| **22:00** | Insights | Collect Instagram/Meta/Google data | → KNOW_Insights.md |
| **23:00** | Market | Market trend analysis | → KNOW_MarketContext.md |
| **23:30** | User Insights | Supabase behavior data | → KNOW_UserInsights.md |
| **10:00 (+1d)** | Strategy | Generate strategic brief | → Telegram (waiting ✅/❌) |
| **After ✅** | Tactic | Create content plan | → Telegram (waiting ✅/❌) |
| **After ✅** | Operational | Write copy + visual brief | → Telegram (waiting ✅/❌) |
| **After ✅** | Figma | Design + preview | → Telegram (waiting ✅/❌ PUBLISH) |
| **After ✅** | Publish | Post to Instagram | → Live |

---

## 🔐 Security Checklist

- [ ] ✅ `CRON_SECRET` is random (openssl rand -hex 32)
- [ ] ✅ No credentials in `.env` file (use Vercel dashboard only)
- [ ] ✅ All API tokens are valid and active
- [ ] ✅ Telegram bot token is correct
- [ ] ✅ Instagram access token has all required scopes
- [ ] ✅ Figma token has read/write permissions

---

## 📊 Monitoring

After deployment, monitor:

**Vercel Dashboard:**
- Cron job execution logs
- Function performance (duration, memory)
- Error tracking
- Build logs

**Telegram:**
- Approval gate messages (should appear at scheduled times)
- Button callbacks working
- Preview images loading

**GitHub:**
- Auto-commits from agents updating KNOW files

---

## 🆘 Troubleshooting

### "Cron jobs not running"
1. Check Vercel **Crons** tab (see scheduled jobs)
2. Verify environment variables set correctly
3. Check function logs for errors
4. Ensure `CRON_SECRET` matches in code

### "Telegram messages not appearing"
1. Verify `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are correct
2. Check that webhook was registered (Option A or B above)
3. Look at function logs for Telegram API errors

### "Agents failing"
1. Check function logs in Vercel dashboard
2. Verify MCP credentials (ANTHROPIC_API_KEY, FIGMA_TOKEN, etc.)
3. Ensure all required packages installed (`npm install`)

### "State file not found"
- State will auto-initialize in `KNOW/state.json` on first agent run

---

## 📝 Configuration Files

| File | Purpose |
|------|---------|
| `vercel.json` | Cron schedules + function config |
| `.env.example` | Template for environment variables |
| `package.json` | Dependencies (Anthropic SDK) |
| `AUT/api/agents/agent-*.js` | Agent implementations |
| `AGENT_*.md` | Agent instructions for Claude |
| `KNOW_*.md` | Knowledge files (auto-updated) |

---

## 🎯 Success Criteria

✅ **Deployment successful when:**
1. All functions show in Vercel Functions tab
2. All crons show in Vercel Crons tab  
3. First agent runs at scheduled time
4. KNOW_Insights.md gets updated
5. Telegram receives approval message at 8h BRT
6. Approval buttons work (✅/❌)
7. Content flows through all phases
8. Instagram post publishes

---

## 📞 Support

- **Agent Issues**: Check `AGENT_*.md` files for logic
- **API Issues**: Check `.env.example` for required credentials
- **Vercel Issues**: https://vercel.com/docs
- **Telegram Issues**: https://core.telegram.org/bots

---

**Deployed on**: 2026-05-07  
**Status**: Ready for Vercel import  
**Next step**: Configure environment variables in Vercel dashboard
