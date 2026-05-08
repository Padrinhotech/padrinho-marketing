---
title: API Integrations Guide
version: 1.0
type: documentation
status: active
owner: padrinho-marketing
parent_doc: SKILL_Documentation.md
tags:
  - api
  - integrations
  - setup
  - insightfulpipe
  - pipeboard
  - supabase
---

# API Integrations Guide

This document explains how to set up each external API for the Padrinho Marketing automation system.

## Overview

The Insights Agent collects data from 4 external sources:

| Source | Service | Data | Status |
|--------|---------|------|--------|
| Instagram | Insightfulpipe | Organic metrics, followers, reach | ✅ Implemented |
| Meta Ads | Pipeboard | Campaign spend, leads, ROI | ✅ Implemented |
| Google Ads | Pipeboard | Impressions, clicks, conversions | ✅ Implemented |
| Audience | Supabase | User counts, engagement, interests | ✅ Implemented |

---

## 1. Insightfulpipe (Instagram)

**Purpose:** Collect Instagram organic analytics (followers, reach, engagement, top posts)

### Setup Steps

1. **Create Account**
   - Visit: https://www.insightfulpipe.com
   - Sign up with business email

2. **Connect Instagram Business Account**
   - Navigate to Settings → Integrations
   - Click "Add Instagram Account"
   - Authorize with your Instagram Business account credentials
   - Note the **Business Account ID** (numeric, e.g., `17841402024`)

3. **Generate API Key**
   - Go to Settings → API Keys
   - Click "Create New Key"
   - Copy the **API Key**

4. **Add to Environment Variables**
   ```
   INSIGHTFULPIPE_API_KEY=your-api-key-here
   INSTAGRAM_BUSINESS_ACCOUNT_ID=17841402024
   ```

5. **Test Connection**
   - The agent will use these credentials at 22:00 BRT daily
   - Check Telegram for data messages

**API Reference:** `SKILL/skill-insightfulpipe.js`

---

## 2. Pipeboard (Meta Ads & Google Ads)

**Purpose:** Collect campaign performance data (spend, leads, ROI, keywords)

### Setup for Meta Ads

1. **Create Account**
   - Visit: https://www.pipeboard.com
   - Sign up with business email

2. **Connect Meta Ads Account**
   - Settings → Ad Accounts
   - Click "Add Meta Ads Account"
   - Select your Business Account
   - Note the **Meta Account ID** (format: `act_1234567890`)

3. **Connect Google Ads Account**
   - Settings → Ad Accounts
   - Click "Add Google Ads Account"
   - Authenticate with Google
   - Note the **Google Customer ID** (format: `1234567890`)

4. **Generate API Key**
   - Settings → API Keys
   - Create a new key with permissions for:
     - Facebook Ads (READ)
     - Google Ads (READ)

5. **Add to Environment Variables**
   ```
   PIPEBOARD_API_KEY=your-api-key-here
   META_ADS_ACCOUNT_ID=act_1234567890
   GOOGLE_ADS_ACCOUNT_ID=1234567890
   ```

6. **Verify Data Sync**
   - Pipeboard typically syncs data every 6 hours
   - First data should appear within 24 hours

**API Reference:** `SKILL/skill-pipeboard.js`

---

## 3. Supabase (Audience & User Data)

**Purpose:** Store and query user segments, engagement metrics, retention data

### Setup Steps

1. **Create Project**
   - Visit: https://supabase.com
   - Create new project
   - Choose region closest to your users
   - Wait for project initialization (5-10 min)

2. **Create Tables**
   - Open SQL Editor
   - Run the schema below:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE,
  segment VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- User profiles
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  age_group VARCHAR(20),
  gender VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- User interests
CREATE TABLE user_interests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  interest VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- User sessions (for engagement tracking)
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  last_active TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
```

3. **Get Credentials**
   - Settings → API
   - Copy **Project URL** (format: `https://xxxxx.supabase.co`)
   - Copy **anon/public** key (under "Project API keys")

4. **Add to Environment Variables**
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_API_KEY=eyJhbGc...
   ```

5. **Load Sample Data (Optional)**
   - Use Supabase Studio to insert test users
   - Create interests for engagement testing
   - The agent queries this data at 22:00+ BRT

**API Reference:** `SKILL/skill-supabase.js`

---

## Environment Setup

### Local Testing (.env.local)

```bash
# 1. Copy template
cp .env.example .env.local

# 2. Fill in all API credentials
nano .env.local

# 3. Test locally
npm run dev
```

### Production (Vercel)

```bash
# 1. Add secrets to Vercel
vercel env add INSIGHTFULPIPE_API_KEY
vercel env add PIPEBOARD_API_KEY
vercel env add SUPABASE_URL
vercel env add SUPABASE_API_KEY

# 2. Deploy
vercel deploy --prod

# 3. Verify in Vercel dashboard
#    Settings → Environment Variables
```

---

## Fallback Behavior

If any API is not configured, the agent falls back to mock data:

```javascript
if (process.env.INSIGHTFULPIPE_API_KEY) {
  // Use real API
} else {
  // Use mock data
  data.instagram_organic = this._getMockInstagramData();
}
```

This allows:
- ✅ Local development without live API keys
- ✅ Testing the full workflow with mock data
- ✅ Gradual API activation

---

## API Limits & Costs

| Service | Free Tier | Limits | Cost |
|---------|-----------|--------|------|
| Insightfulpipe | 14 days trial | 1 account | ~$20-50/mo |
| Pipeboard | 14 days trial | Unlimited accounts | ~$30-100/mo |
| Supabase | Free | 500MB database | Free-$25/mo |

---

## Troubleshooting

### "API key not found"
- Check `.env.local` or Vercel Environment Variables
- Ensure variable names match exactly (case-sensitive)
- Redeploy after adding new variables

### "No data returned"
- Verify API credentials are correct
- Check API service status page
- Confirm data sync completed (may take 24 hours first run)
- Check agent logs in Vercel Dashboard

### "Connection timeout"
- Verify internet connectivity
- Check if API service is down
- Increase timeout in Vercel function settings (currently 300s max)

### Testing Individual APIs

Use the test endpoint (when implemented):

```bash
# Test Insightfulpipe
curl https://padrinho-marketing.vercel.app/api/test-insights

# Test Pipeboard
curl https://padrinho-marketing.vercel.app/api/test-ads

# Test Supabase
curl https://padrinho-marketing.vercel.app/api/test-audience
```

---

## Next Steps

1. **Sign up** for each service (Insightfulpipe, Pipeboard, Supabase)
2. **Gather credentials** and add to `.env.local`
3. **Test locally** with `npm run dev`
4. **Deploy to Vercel** with credentials
5. **Monitor** Telegram messages at scheduled times

---

## References

- [Insightfulpipe Docs](https://docs.insightfulpipe.com)
- [Pipeboard Docs](https://docs.pipeboard.com)
- [Supabase Docs](https://supabase.com/docs)
- [Agent Schedule](./SKILL_Documentation.md#schedule)
