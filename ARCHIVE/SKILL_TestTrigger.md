> ⚠️ **DEPRECATED (2026 H2).** Documenta a automação Node/Vercel/cron/Telegram já removida. Mantido só como referência histórica — não usar no workflow atual (cascata manual via MCP).

---
title: Manual Test Trigger Endpoint
version: 1.0
type: documentation
status: deprecated
owner: padrinho-marketing
parent_doc: SKILL_APIIntegrations.md
tags:
  - testing
  - debugging
  - manual-trigger
  - endpoints
---

# Manual Test Trigger Endpoint

Test any agent on-demand without waiting for cron schedules.

## Endpoint

```
POST /api/test-trigger?agent=<agent-name>
```

## Available Agents

| Agent | Endpoint | Purpose |
|-------|----------|---------|
| insights | `?agent=insights` | Collect marketing insights from all sources |
| market | `?agent=market` | Analyze market trends |
| user-insights | `?agent=user-insights` | Analyze user behavior patterns |
| strategy | `?agent=strategy` | Generate strategy briefing with approval |
| tactic | `?agent=tactic` | Generate tactical content plan |
| operational | `?agent=operational` | Generate operational copy/captions |
| figma | `?agent=figma` | Prepare Figma design assets |

## Usage Examples

### Test Insights Agent

```bash
curl -X POST "https://padrinho-marketing.vercel.app/api/test-trigger?agent=insights"
```

Response:
```json
{
  "success": true,
  "agent": "insights",
  "timestamp": "2026-05-08T22:30:00.000Z",
  "result": {
    "date": "2026-05-08",
    "instagram_organic": {
      "followers_current": 12450,
      "engagement_rate": "3.2%",
      ...
    },
    "meta_ads": { ... },
    "google_ads": { ... },
    "audience_insights": { ... }
  }
}
```

### Test Strategy Agent

```bash
curl -X POST "https://padrinho-marketing.vercel.app/api/test-trigger?agent=strategy"
```

Response:
```json
{
  "success": true,
  "agent": "strategy",
  "timestamp": "2026-05-08T08:15:00.000Z",
  "result": {
    "date": "2026-05-08",
    "objectives": [
      {
        "title": "Increase engagement",
        "rationale": "...",
        "target_persona": "Rosa",
        "success_metric": "..."
      }
    ],
    "tone_of_day": "optimistic",
    "content_pillars": [...]
  }
}
```

### Test All Agents in Sequence

```bash
#!/bin/bash

BASE_URL="https://padrinho-marketing.vercel.app/api/test-trigger"
AGENTS=("insights" "market" "user-insights" "strategy")

for agent in "${AGENTS[@]}"; do
  echo "Testing agent: $agent"
  curl -X POST "$BASE_URL?agent=$agent"
  echo ""
  sleep 2
done
```

## Error Responses

### Missing Agent Parameter

```json
{
  "error": "Missing agent parameter",
  "usage": "POST /api/test-trigger?agent=<agent-name>",
  "available_agents": ["insights", "market", "user-insights", ...]
}
```

### Unknown Agent

```json
{
  "error": "Unknown agent: invalid-agent",
  "available_agents": ["insights", "market", "user-insights", ...]
}
```

### Agent Execution Error

```json
{
  "success": false,
  "error": "ANTHROPIC_API_KEY not configured",
  "timestamp": "2026-05-08T22:35:00.000Z"
}
```

### Wrong HTTP Method

```json
{
  "error": "Method not allowed",
  "message": "Use POST /api/test-trigger?agent=<agent-name>",
  "available_agents": ["insights", "market", "user-insights", ...]
}
```

## Workflow Testing

### Test Complete Workflow

1. **Test Insights** (collects data)
   ```bash
   curl -X POST "...?agent=insights"
   ```
   ✅ Should send Telegram message with insights summary

2. **Test Market** (analyzes trends)
   ```bash
   curl -X POST "...?agent=market"
   ```
   ✅ Should send Telegram message with market analysis

3. **Test User Insights** (user patterns)
   ```bash
   curl -X POST "...?agent=user-insights"
   ```
   ✅ Should send Telegram message with audience summary

4. **Test Strategy** (approval workflow)
   ```bash
   curl -X POST "...?agent=strategy"
   ```
   ✅ Should send Telegram message with strategy briefing + ✅/❌ buttons

5. **Click ✅ in Telegram** → Webhook triggers
   ✅ Should run Tactic Agent automatically

6. **Test Tactic** (content planning)
   ```bash
   curl -X POST "...?agent=tactic"
   ```
   ✅ Should send Telegram message with content calendar

7. **Click ✅ in Telegram** → Webhook triggers
   ✅ Should run Operational Agent automatically

8. **Test Operational** (copy generation)
   ```bash
   curl -X POST "...?agent=operational"
   ```
   ✅ Should send Telegram message with captions/hashtags

9. **Click ✅ in Telegram** → Webhook triggers
   ✅ Should run Figma Agent automatically

10. **Test Figma** (design assets)
    ```bash
    curl -X POST "...?agent=figma"
    ```
    ✅ Should send Telegram message with Figma preview link

## Debugging

### Check if Agent Dependencies Are OK

If agent fails, check:
1. **API Keys configured?**
   ```bash
   vercel env list | grep -E "ANTHROPIC|TELEGRAM|INSIGHTFUL"
   ```

2. **Recent logs**
   ```bash
   vercel logs api/test-trigger
   ```

3. **Vercel function status**
   - Dashboard → Deployments → [latest] → Functions tab
   - Check runtime and cold start times

### Simulate Agent Without Real APIs

All agents fall back to **mock data** if APIs not configured:
- No ANTHROPIC_API_KEY? Uses mock Claude responses
- No INSIGHTFULPIPE_API_KEY? Uses mock Instagram data
- No TELEGRAM_BOT_TOKEN? Logs to console instead of sending

Perfect for testing the workflow without live services!

## Performance Notes

- **Insights Agent**: 5-15s (depends on API response times)
- **Market Agent**: 3-8s
- **User Insights Agent**: 2-5s
- **Strategy Agent**: 5-20s (Claude processing)
- **Tactic Agent**: 10-25s (Claude processing)
- **Operational Agent**: 10-25s (Claude processing)
- **Figma Agent**: 5-10s

Timeout is set to 300s (Vercel Hobby limit), so any agent can run up to 5 minutes.

## Common Issues

### "ANTHROPIC_API_KEY not configured"
- Add to Vercel: `vercel env add ANTHROPIC_API_KEY`
- Redeploy: `vercel deploy --prod`

### "TELEGRAM connection timeout"
- Check Telegram API key is correct
- Verify internet connectivity
- Check Telegram service status

### "Agent returns no data"
- Check all required environment variables
- Test with mock data first (don't add API keys)
- Check Vercel function logs for errors

---

## Related

- [SKILL_APIIntegrations.md](./SKILL_APIIntegrations.md) - API setup guide
- [SKILL_Documentation.md](./SKILL_Documentation.md) - System overview
- [Vercel Logs](https://vercel.com/dashboard) - Check real execution logs