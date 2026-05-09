# How to Trigger Agents Now (Instead of Waiting for Cron)

## Option 1: Run Locally (Recommended)

### Step 1: Get Credentials from Vercel

The credentials are stored securely in Vercel. Follow these steps:

1. Go to https://vercel.com/padrinho/padrinho-marketing/settings/environment-variables
2. You'll see the following variables (masked):
   - `ANTHROPIC_API_KEY` → Copy the value
   - `TELEGRAM_BOT_TOKEN` → Copy the value
   - `TELEGRAM_CHAT_ID` → Copy the value
   - `INSIGHTFULPIPE_API_KEY` (optional, for real data)
   - `PIPEBOARD_API_KEY` (optional, for real data)
   - `SUPABASE_URL` & `SUPABASE_API_KEY` (optional, for real data)

### Step 2: Update .env.local

Edit `.env.local` and add the values you copied:

```
ANTHROPIC_API_KEY=sk-ant-...
TELEGRAM_BOT_TOKEN=7123456789:AAF...
TELEGRAM_CHAT_ID=8322832640
```

Optional (for real analytics data instead of mocks):
```
INSIGHTFULPIPE_API_KEY=...
INSTAGRAM_BUSINESS_ACCOUNT_ID=...
PIPEBOARD_API_KEY=...
META_ADS_ACCOUNT_ID=...
GOOGLE_ADS_ACCOUNT_ID=...
SUPABASE_URL=...
SUPABASE_API_KEY=...
```

### Step 3: Run Agents

**Run all agents in sequence:**
```bash
node trigger-now.cjs all
```

**Or run individual agents:**
```bash
node trigger-now.cjs insights
node trigger-now.cjs market
node trigger-now.cjs user-insights
node trigger-now.cjs strategy
# (check Telegram for approval button, click ✅)
node trigger-now.cjs tactic
node trigger-now.cjs operational
node trigger-now.cjs figma
```

## Option 2: Use Scheduled Crons

If you prefer to wait, the agents will run automatically:

- **22:00 BRT** (today) — Insights Agent
- **23:00 BRT** (today) — Market Agent
- **23:30 BRT** (today) — User Insights Agent
- **08:00 BRT** (tomorrow) — Strategy Agent

Check Telegram for messages at these times.

## Troubleshooting

**Issue: "Cannot find package 'dotenv'"**
```bash
npm install
```

**Issue: "Missing required environment variables"**
- Make sure you edited `.env.local` and saved it
- Check that values are not wrapped in quotes

**Issue: Agent fails with "Unauthorized"**
- Verify `TELEGRAM_BOT_TOKEN` is correct
- Verify `TELEGRAM_CHAT_ID` is correct (should be a number)

**Issue: Agent fails with "401 Unauthorized" from Claude**
- Verify `ANTHROPIC_API_KEY` starts with `sk-ant-`
- Check that the key hasn't expired

## What Happens When You Run

1. **Insights Agent** collects data from Instagram, Meta Ads, Google Ads, Supabase
2. **Market Agent** analyzes market trends and competitive landscape
3. **User-Insights Agent** analyzes audience segments and retention
4. **Strategy Agent** generates strategic recommendations (sends Telegram message with ✅ button)
5. **[WAITING]** You must click the ✅ button in Telegram to continue
6. **Tactic Agent** generates tactical recommendations
7. **Operational Agent** creates operational guidelines
8. **Figma Agent** updates design and creates visual assets

All outputs are saved to GitHub in the KNOW/ folder.

---

**Questions?** Check the logs - they show which step is running and any errors.
