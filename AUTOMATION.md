# Padrinho Marketing — Automação

Sistema de geração e publicação automática de conteúdo para o Instagram do Padrinho.app.

## Fluxo completo

```
Vercel Cron (todo dia 10h BRT = 13h UTC)
  → /api/orchestrate
    → Claude API gera copy (pilar do dia + persona Rosa + copy-rules)
    → Figma REST API exporta slides dos componentes
    → Telegram envia preview com botões
      → ✅ Publicar → /api/publish → Instagram
      → ✏️ Refazer  → /api/orchestrate (nova rodada)
      → ❌ Cancelar → encerra
```

## Setup (uma vez)

### 1. Gere o CRON_SECRET
```bash
openssl rand -hex 32
```
Adicione no Vercel e GitHub como `CRON_SECRET`.

### 2. Registre o webhook do Telegram
Após deploy, acesse **uma vez**:
```
https://SEU_DOMINIO.vercel.app/api/setup-webhook?secret=SEU_CRON_SECRET
```

### 3. Teste manual
```bash
curl -X POST https://SEU_DOMINIO.vercel.app/api/orchestrate \
  -H "Authorization: Bearer SEU_CRON_SECRET"
```

## Variáveis de ambiente

| Variável | Onde obter |
|---|---|
| `ANTHROPIC_API_KEY` | console.anthropic.com |
| `FIGMA_TOKEN` | figma.com → Settings → Security |
| `TELEGRAM_BOT_TOKEN` | @BotFather |
| `TELEGRAM_CHAT_ID` | `8322832640` |
| `INSTAGRAM_ACCESS_TOKEN` | Meta Graph API (token longo, expira 60 dias) |
| `INSTAGRAM_ACCOUNT_ID` | graph.facebook.com/me/accounts |
| `CRON_SECRET` | `openssl rand -hex 32` |

## Arquivos

```
api/
├── orchestrate.js     ← cron principal
├── approve.js         ← webhook Telegram
├── publish.js         ← publica no Instagram
└── setup-webhook.js   ← setup único
vercel.json            ← cron 10h BRT
package.json
.env.example
```

## Renovação do token Instagram
Token expira em 60 dias. Para renovar:
```
https://graph.facebook.com/v19.0/oauth/access_token
  ?grant_type=fb_exchange_token
  &client_id=2875084979493755
  &client_secret=SEU_APP_SECRET
  &fb_exchange_token=TOKEN_ATUAL
```
Atualize `INSTAGRAM_ACCESS_TOKEN` no Vercel após renovar.
