# Paid Ads Playbook — Supabase → Meta Audience → Campaign → Creative

> **Escopo:** **off-roadmap.** Mídia paga NÃO faz parte da cascata de conteúdo (Strategy→Tactic→Operational→Figma). Use este playbook só quando alguém for rodar anúncios manualmente. Tudo aqui é via MCP (Supabase MCP + Pipeboard Meta Ads MCP), não a automação antiga.

## Conta, IDs e token (fonte única)

| Item | Valor |
|---|---|
| Ad Account (Sponsor Inc) | `act_1072464441119661` |
| Facebook Page | `417089314811065` |
| Pixel | `1054648579566005` |
| Facebook App | `2875084979493755` |
| iOS App Store | `id6752896009` (`itunes.apple.com/app/id6752896009`) |
| Android Play | `app.padrinho.eloapp` |
| Access token | GitHub Secret `META_ADS_TOKEN` (nunca em texto plano) |
| Criativos | pasta `assets/ads/` no repo |

> **Nota de tooling:** operações de Meta Ads são via **Pipeboard (Meta Ads) MCP**. Algumas ações de criação aparecem nos docs antigos rotuladas "Insightfulpipe execute_action" — **confirmar o nome real da tool no MCP conectado** antes de rodar (inconsistência herdada dos arquivos originais).

---

## 1. Pré-flight (checar antes de cada campanha)
- [ ] Facebook App ID confirmado (developers.facebook.com/apps)
- [ ] iOS: Bundle ID + Store ID (`6752896009`) adicionados
- [ ] Android: package `app.padrinho.eloapp` confirmado
- [ ] Pixel `1054648579566005` ativo
- [ ] Custom Audience TOS aceito (business.facebook.com/ads/manage/customaudiences/tos)
- [ ] Supabase SQL approval habilitado nas settings do Claude
- [ ] Figma desktop aberto com plugin Claude MCP (para exportar criativo)
- [ ] `META_ADS_TOKEN` disponível

## 2. Pipeline de audiência (Supabase → Custom → Lookalike)
**LGPD:** confirmar consentimento de marketing antes de exportar qualquer email.

1. **Puxar emails (Supabase MCP)** — `public.profiles`, `email IS NOT NULL`, `is_admin=false`, `role='user'`, `LIMIT 200`. Filtrar internos (`@padrinho.app`, `@padrinho.test`).
2. **Criar Custom Audience** (Pipeboard `create_custom_audience`): `account_id` acima, name "Padrinho App Users – Email Seed", subtype CUSTOM, source USER_PROVIDED_ONLY.
3. **Subir emails** (Pipeboard `add_users_to_audience`): schema `["EMAIL"]`, `is_hashed:false` (Pipeboard faz SHA-256 server-side).
4. **Criar Lookalike** (Pipeboard `create_lookalike_audience`): origin = custom audience, `ratio:0.01`, `country:BR`.
5. **Ligar no Ad Set**: `targeting.custom_audiences:[{id:<lookalike>}]`, `geo_locations.countries:["BR"]`.

**Cadência:** re-rodar mensalmente ou quando novos usuários > +50. Sempre **append**, nunca replace. Atualizar a tabela de IDs abaixo após cada run.

## 3. Estrutura de campanha (App Install / Subscription)
```
Campaign (OUTCOME_APP_PROMOTION, CBO R$50/dia)
├── Ad Set iOS (Lookalike BR 1% – Email Seed) · APP_INSTALLS · promoted_object: application_id + object_store_url (iOS)
├── Ad Set Android (Lookalike BR 1% – Email Seed) · APP_INSTALLS · promoted_object: application_id + object_store_url (Android)
└── Ad Set Conversions/Pixel (fallback) · WEBSITE · OFFSITE_CONVERSIONS · promoted_object: pixel_id + SUBSCRIBE
```

## 4. Upload de criativo
1. Exportar do Figma como PNG 2x (ou URL público via Figma REST).
2. Se usar GitHub: commit em `assets/ads/` → URL raw.githubusercontent.com.
3. Pipeboard `upload_ad_image` (base64 ou URL).
4. `create_ad_creative` → `create_ad` (ver nota de tooling acima).

## 5. Audiences atuais (snapshot — VERIFICAR ao vivo)
> ⚠️ IDs abaixo são um snapshot de abr/2026 e decaem. Confirmar no Ads Manager antes de usar.

| Audience | ID | Tamanho |
|---|---|---|
| Padrinho App Users – Email Seed | 120245669387580017 | 165 emails |
| Semelhante (BR, 1%) – Email Seed | 120245669426600017 | BR 1% |
| Membros do Padrinho (original) | 120212398423750017 | ~1K |
| Semelhante (BR, 2%) – Membros | 120212398459350017 | BR 2% |

## Gotchas de API (Meta)
- `OUTCOME_APP_PROMOTION` exige `application_id` no `promoted_object` — sem workaround.
- iOS e Android devem ser ad sets separados com OS targeting.
- Com CBO (budget na campanha), ad sets não podem ter `daily_budget` próprio.
- Advantage+ audience lock impede update de targeting em ad set existente — fazer manual.
- `bid_amount` exigido mesmo com `LOWEST_COST_WITH_BID_CAP` quando há budget na campanha.
