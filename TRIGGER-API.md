# Trigger Agents via Vercel API (Simplest Method)

No local setup needed! Just use `curl` to invoke the agents on Vercel.

## Quick Start

**Run all agents in sequence:**
```bash
./trigger-api.sh all
```

**Or run individual agents:**
```bash
./trigger-api.sh insights
./trigger-api.sh market
./trigger-api.sh user-insights
./trigger-api.sh strategy
# Check Telegram for strategy message, click ✅
./trigger-api.sh tactic
./trigger-api.sh operational
./trigger-api.sh figma
```

## What It Does

1. Calls Vercel API endpoint for each agent
2. Vercel's cron handler validates the request
3. Agent runs on Vercel's infrastructure
4. Results are saved and Telegram notifications sent

## Manual API Calls

If you prefer `curl` directly:

```bash
# Get your CRON_SECRET from Vercel settings (or ask admin)
CRON_SECRET="your-secret-here"

# Trigger insights agent
curl -X POST "https://padrinho-marketing.vercel.app/api/agents/agent-insights?secret=$CRON_SECRET"

# Trigger market agent  
curl -X POST "https://padrinho-marketing.vercel.app/api/agents/agent-market?secret=$CRON_SECRET"

# Trigger strategy agent
curl -X POST "https://padrinho-marketing.vercel.app/api/agents/agent-strategy?secret=$CRON_SECRET"
```

## Troubleshooting

**Getting "Unauthorized" (401)?**
- Make sure the CRON_SECRET is correct
- It's configured in Vercel > Settings > Environment Variables

**Getting server error (500)?**
- The agent might have failed
- Check the Vercel function logs: https://vercel.com/padrinho/padrinho-marketing/functions
- Check Telegram for error messages

**Want to see logs?**
- Go to https://vercel.com/padrinho/padrinho-marketing/functions
- Click on the agent function to see recent invocations and logs

---

This is the simplest approach - no local setup, no credentials needed locally, just call the API!
