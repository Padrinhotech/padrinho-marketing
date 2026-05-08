---
title: Audience Pipeline
version: 1.0
type: Skill
status: active
last_updated: 2026-05-07
---

# Audience Pipeline — Supabase → Meta Ads

## Overview
Automated flow to pull consented users from Supabase and upload them as a Meta Custom Audience, then generate a Lookalike for campaign targeting.

## Prerequisites
- Supabase MCP connected (read access to `public.profiles` and `public.user_consents`)
- Pipeboard Meta Ads MCP connected
- LGPD consent confirmed for data processing + marketing use

## Step-by-Step

### 1. Pull emails from Supabase
```sql
SELECT DISTINCT p.email
FROM public.profiles p
WHERE p.email IS NOT NULL
  AND p.is_admin = false
  AND p.role = 'user'
ORDER BY p.email
LIMIT 200;
```
> Filter out internal emails: `@padrinho.app`, `@padrinho.test`

### 2. Create Custom Audience (Pipeboard)
```
Tool: Pipeboard (Meta Ads):create_custom_audience
- account_id: act_1072464441119661
- name: "Padrinho App Users – Email Seed"
- subtype: CUSTOM
- customer_file_source: USER_PROVIDED_ONLY
- description: "Padrinho App users from Supabase (LGPD consented)"
```

### 3. Upload emails (Pipeboard)
```
Tool: Pipeboard (Meta Ads):add_users_to_audience
- audience_id: <from step 2>
- schema: ["EMAIL"]
- data: [[email1], [email2], ...]
- is_hashed: false  ← Pipeboard hashes SHA-256 server-side
```

### 4. Create Lookalike (Pipeboard)
```
Tool: Pipeboard (Meta Ads):create_lookalike_audience
- account_id: act_1072464441119661
- name: "Semelhante (BR, 1%) – Padrinho Email Seed"
- origin_audience_id: <custom audience ID from step 2>
- ratio: 0.01
- country: BR
- type: custom_ratio
```

### 5. Wire into Ad Set (Insightfulpipe)
```
targeting.custom_audiences: [{ id: "<lookalike_id>" }]
targeting.geo_locations.countries: ["BR"]
```

## Current Audience IDs (April 2026)
| Audience | ID | Size |
|---|---|---|
| Padrinho App Users – Email Seed | 120245669387580017 | 165 emails |
| Semelhante (BR, 1%) – Padrinho Email Seed | 120245669426600017 | BR 1% |
| Membros do Padrinho (original) | 120212398423750017 | ~1K |
| Semelhante (BR, 2%) – Membros | 120212398459350017 | BR 2% |

## Refresh Cadence
- Re-run monthly or when new users exceed +50
- Always append, never replace (Pipeboard adds incrementally)
- Update this file with new audience IDs after each run

## Assets & Token Storage
- Ad creatives: `assets/ads/` folder in this repo (public)
- Meta access token: stored in GitHub Secret `META_ADS_TOKEN` (private)
- Never store tokens in plain text files
