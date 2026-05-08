---
title: Campaign Setup
version: 1.0
type: Skill
status: active
last_updated: 2026-05-07
---

# Campaign Setup Checklist — App Promotion

## Pre-Flight (check before every campaign)
- [ ] Facebook App ID confirmed at developers.facebook.com/apps
- [ ] iOS platform added: Bundle ID + iPhone Store ID (6752896009)
- [ ] Android platform confirmed: package = app.padrinho.eloapp
- [ ] Pixel ID active: 1054648579566005
- [ ] Custom Audience TOS accepted (business.facebook.com/ads/manage/customaudiences/tos)
- [ ] Supabase SQL approval enabled in Claude settings
- [ ] Figma desktop app open with Claude MCP plugin (for creative export)
- [ ] Meta Access Token available (GitHub Secret: META_ADS_TOKEN)

## Account IDs (Sponsor Inc)
- Ad Account: act_1072464441119661
- Facebook Page: 417089314811065
- Pixel: 1054648579566005
- Facebook App: 2875084979493755
- iOS App Store: http://itunes.apple.com/app/id6752896009
- Android Play Store: http://play.google.com/store/apps/details?id=app.padrinho.eloapp

## Campaign Structure — App Install / Subscription
```
Campaign (OUTCOME_APP_PROMOTION, CBO R$50/day)
├── Ad Set: iOS (Lookalike BR 1% – Email Seed)
│   ├── OS: iOS | Devices: iPhone, iPad, iPod
│   ├── optimization_goal: APP_INSTALLS
│   └── promoted_object: application_id + object_store_url (iOS)
├── Ad Set: Android (Lookalike BR 1% – Email Seed)
│   ├── OS: Android | Devices: Android_Smartphone, Android_Tablet
│   ├── optimization_goal: APP_INSTALLS
│   └── promoted_object: application_id + object_store_url (Android)
└── Ad Set: Conversions/Pixel (all devices, fallback)
    ├── destination_type: WEBSITE
    ├── optimization_goal: OFFSITE_CONVERSIONS
    └── promoted_object: pixel_id + custom_event_type: SUBSCRIBE
```

## Known API Gotchas
- `OUTCOME_APP_PROMOTION` requires `application_id` in promoted_object — no workaround
- iOS and Android must be separate ad sets with OS targeting
- If campaign has daily_budget (CBO), ad sets cannot also have daily_budget
- Advantage+ audience lock prevents targeting updates on existing ad sets — do manually
- `bid_amount` required even with `LOWEST_COST_WITH_BID_CAP` when campaign-level budget exists

## Creative Upload Flow
1. Export from Figma as PNG 2x (or get public URL via Figma REST API)
2. If using GitHub: commit to `assets/ads/` → use raw.githubusercontent.com URL
3. Tool: `Pipeboard (Meta Ads):upload_ad_image` (base64 or URL)
4. Tool: `Insightfulpipe execute_action: create_ad_creative`
5. Tool: `Insightfulpipe execute_action: create_ad`
