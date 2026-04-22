# CLAUDE.md — Padrinho Marketing Automation

## Project Overview
This repo powers the Padrinho marketing automation system. It contains skills, brand assets, agent instructions, and ad campaign data for the Padrinho app (addiction recovery, Brazil).

## MCP Role Map

| MCP | Role | Use For |
|---|---|---|
| **Insightfulpipe** | Primary campaign CRUD + organic data | Create/update campaigns, ad sets, ads, creatives. Pull organic Instagram insights. Read Facebook Pages data. |
| **Pipeboard Meta Ads** | Audience operations | `create_custom_audience`, `add_users_to_audience`, `create_lookalike_audience`. NOT for campaign creation. |
| **Pipeboard Google Ads** | Google Ads management | Google campaign CRUD, keyword management, performance reports. |
| **Figma MCP** | Creative export (desktop only) | Requires Figma desktop app open with Claude plugin. Times out in browser sessions. Use Figma REST API + token as fallback. |
| **Supabase MCP** | User data queries only | Pull emails/user data for audience seeding. Read-only. No writes. Requires SQL approval toggle in Claude settings. |
| **GitHub** | Source of truth + asset hosting | Skills, workflows, ad creatives (`assets/ads/`), token secrets. Connect via GitHub MCP when available. |
| **Notion** | Workspace search | Secondary reference. Not primary for this workflow. |

## Agent Architecture

```
INSIGHTS AGENT (read-only, scheduled)
├── Insightfulpipe: Instagram organic metrics
├── Insightfulpipe: Facebook Pages data  
├── Pipeboard: Meta Ads performance
├── Pipeboard: Google Ads performance
└── Output → skills/insights/insights.md (commit to GitHub)

STRATEGY AGENT (reads insights.md + brand skills)
└── Output → strategic brief → human approval gate

TACTIC AGENT (reads strategic brief + editorial pillars)
└── Output → content plan → human approval gate

OPERATIONAL AGENT (reads content plan + copy rules)
├── Output → copy + visual brief → human approval gate
├── Figma MCP → create/populate frames in _QUEUE
└── Insightfulpipe → publish to Instagram (on explicit command)

ADS AGENT (reads insights.md + campaign data)
├── Supabase → pull consented users
├── Pipeboard → create/refresh Custom Audience + Lookalike
├── Insightfulpipe → create campaign + ad sets
├── GitHub assets/ads/ → source of truth for creatives
├── Pipeboard → upload images → get image_hash
└── Insightfulpipe → create_ad_creative + create_ad
```

## Human Gates (NEVER skip)
1. Strategic brief approval before tactic
2. Content plan approval before copy
3. Copy + visual brief approval before Figma creation
4. Campaign structure approval before ad creation
5. Manual activation in Ads Manager (campaigns always created PAUSED)

## Asset Storage Strategy
- **Ad creatives**: `assets/ads/` in this repo — public folder, use raw.githubusercontent.com URLs
- **Meta Access Token**: GitHub Secret `META_ADS_TOKEN` — never in plain text
- **Figma file IDs**: `brand/figma-file-ids.md`
- **Audience IDs**: `skills/ads/audience-pipeline.md`
- **Account IDs**: `skills/ads/campaign-setup-checklist.md`

## Key Account IDs
- Meta Ad Account: act_1072464441119661 (Sponsor Inc)
- Facebook Page: 417089314811065 (Padrinho)
- Meta Pixel: 1054648579566005
- Facebook App ID: 2875084979493755
- Supabase Project: kyxfbmqiamspfacaiqjg (Padrinho App)

## Figma Files
- Social content: sBItPeNLyvT5EMyKLqQbRv (03. Padrinho • Social)
- Ad creatives node: 3410-4300

## Workflow: Supabase → Meta Audience
See `skills/ads/audience-pipeline.md` for full step-by-step.
Quick summary: Supabase profiles → Pipeboard create_custom_audience → add_users_to_audience → create_lookalike_audience (BR 1%)

## Workflow: Ad Creative → Meta
1. Export PNG from Figma (desktop MCP or REST API with token)
2. Commit to `assets/ads/` in this repo
3. Use raw.githubusercontent.com URL
4. Pipeboard: upload_ad_image (by URL)
5. Insightfulpipe: create_ad_creative with image_hash
6. Insightfulpipe: create_ad linking creative to ad set

## Workflow: Insights Generation
1. Insightfulpipe: pull Instagram organic (lifetime, then monthly delta)
2. Pipeboard: pull Meta Ads performance (last 30d)
3. Pipeboard: pull Google Ads performance (last 30d)
4. Synthesize → write skills/insights/insights.md
5. Commit to GitHub

## Active Campaigns (April 2026)
| Campaign | ID | Status | Objective |
|---|---|---|---|
| Padrinho App – Assinaturas (App) | 120245666331630017 | PAUSED | OUTCOME_APP_PROMOTION |
| Padrinho App – Assinaturas (Conversions) | 120245666384760017 | PAUSED | OUTCOME_SALES |
| Campanha: Baixe o App (Loja) | 120244326825780017 | ACTIVE | OUTCOME_APP_PROMOTION |

## Rules
- All campaigns created PAUSED — never activate via API
- All Supabase queries read-only — no writes
- No credentials in plain text — use GitHub Secrets
- Figma MCP requires desktop app — use REST API fallback when in browser
- Always confirm LGPD consent before any Supabase → Meta data transfer
