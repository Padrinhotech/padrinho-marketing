# Agents Architecture — Padrinho Marketing Automation

Orquestração multi-agente para geração e publicação de conteúdo com aprovação humana em cada fase.

## 🔄 Fluxo Diário

```
22h BRT (01h UTC+1)
  → /api/agents/insights
     └─ Atualiza marketing/insights/insights.md
        (Instagram organic, Meta Ads, Google Ads)

10h BRT (13h UTC)
  → /api/agents/strategy
     ├─ Lê: insights.md + brand positioning
     ├─ Gera: Strategic brief
     └─ Aguarda: ✅/❌ Telegram approval
        ├─ ✅ → /api/agents/tactic
        └─ ❌ → PARADO (refazer manualmente)

TACTIC (após strategy ✅)
  → /api/agents/tactic
     ├─ Lê: strategic brief + editorial pillars
     ├─ Gera: Content plan
     └─ Aguarda: ✅/❌ Telegram approval
        ├─ ✅ → /api/agents/operational
        └─ ❌ → PARADO

OPERATIONAL (após tactic ✅)
  → /api/agents/operational
     ├─ Lê: content plan + copy rules
     ├─ Gera: Copy + visual brief
     ├─ Aguarda: ✅/❌ Telegram approval
     │  └─ ✅ → /api/agents/figma
     │  └─ ❌ → PARADO
     │
     └─ /api/agents/figma
        ├─ Popula componentes em _QUEUE
        ├─ Injeta fotos (unsplash-mcp)
        ├─ Exporta screenshot
        └─ Envia preview Telegram
           └─ Aguarda: ✅/❌ PUBLICAR
              ├─ ✅ → /api/publish (Instagram)
              └─ ❌ → CANCELAR
```

---

## 📁 Estrutura de Pastas

```
automation/api/
├── agents/
│   ├── insights.js        ← cron 22h BRT (MCP: Insightfulpipe, Pipeboard)
│   ├── strategy.js        ← cron 10h BRT (Claude agent)
│   ├── tactic.js          ← triggered by webhook
│   ├── operational.js     ← triggered by webhook
│   ├── figma.js           ← triggered by webhook
│   └── orchestrator.js    ← gerencia estado + transições
│
├── webhooks/
│   ├── telegram.js        ← recebe botões: approve_PHASE / reject_PHASE / publish
│   └── github.js          ← trigger insights (opcional)
│
├── lib/
│   ├── state.js           ← gerencia estado do fluxo (Supabase ou arquivo)
│   ├── telegram-client.js ← client para enviar/editar mensagens
│   ├── figma-client.js    ← wrapper REST API
│   └── claude-client.js   ← client com instruções dos agentes
│
├── orchestrate.js         ← entry point principal (mantido)
├── approve.js             ← entry point Telegram (refatorado)
├── publish.js             ← entry point Instagram (mantido)
└── setup-webhook.js       ← setup único

marketing/
├── agents/
│   ├── insights.md        ← instruções do Insights Agent
│   ├── strategy.md        ← instruções do Strategy Agent
│   ├── tactic.md          ← instruções do Tactic Agent
│   ├── operational.md     ← instruções do Operational Agent
│   └── figma-design.md    ← instruções do Figma Agent
│
└── state/
    └── .gitkeep (ou Supabase se quisermos)
```

---

## 🤖 Especificação de cada Agente

### **1. INSIGHTS AGENT**
- **Cron**: 22h BRT (cron job ou Vercel scheduled)
- **Entrada**: Nenhuma (pulls externas)
- **Saída**: `marketing/insights/insights.md` (commit GitHub)
- **MCPs**:
  - Insightfulpipe: Instagram organic (lifetime + delta mensal)
  - Pipeboard Meta: últimos 30d de campanhas + ad sets + ads
  - Pipeboard Google: últimos 30d de campanhas + keywords
- **Human Gate**: Nenhuma (automático)
- **Próximo**: Strategy Agent (10h)

### **2. STRATEGY AGENT**
- **Trigger**: Cron 10h BRT (ou webhook manual)
- **Entrada**: 
  - `marketing/insights/insights.md` (data-driven)
  - `marketing/skills/strategy/brand-positioning.md`
  - `marketing/skills/strategy/market-context.md`
- **Saída**: 
  - Strategic brief (texto + JSON)
  - Post ao Telegram com buttons: ✅ / ❌
- **Instruções**: `marketing/agents/strategy.md`
- **Human Gate**: ✅ Aprovação Telegram necessária
- **Próximo**: Tactic Agent (se ✅)

### **3. TACTIC AGENT**
- **Trigger**: Webhook (aprovação strategy)
- **Entrada**:
  - Strategic brief (anterior)
  - `marketing/skills/tactic/editorial-pillars.md`
  - `marketing/skills/tactic/trend-radar.md`
- **Saída**:
  - Content plan (5-10 posts)
  - Post ao Telegram com buttons: ✅ / ❌
- **Instruções**: `marketing/agents/tactic.md`
- **Human Gate**: ✅ Aprovação Telegram necessária
- **Próximo**: Operational Agent (se ✅)

### **4. OPERATIONAL AGENT**
- **Trigger**: Webhook (aprovação tactic)
- **Entrada**:
  - Content plan (anterior)
  - `marketing/skills/operational/copy-rules.md`
  - `marketing/skills/operational/photo-guidelines.md`
- **Saída**:
  - Copy (captions + hashtags)
  - Visual brief (tamanho, cores, fotos)
  - Post ao Telegram com buttons: ✅ / ❌
- **Instruções**: `marketing/agents/operational.md`
- **Human Gate**: ✅ Aprovação Telegram necessária
- **Próximo**: Figma Agent (se ✅)

### **5. FIGMA AGENT**
- **Trigger**: Webhook (aprovação operational)
- **Entrada**:
  - Copy + visual brief
  - `marketing/SKILL/skill-figma-tokens.json` (design system)
  - Figma file ID: `sBItPeNLyvT5EMyKLqQbRv`
- **Processo**:
  1. Popula componentes em frame _QUEUE
  2. Injeta fotos via unsplash-mcp
  3. Exporta screenshot
  4. Posta ao Telegram com preview
- **Saída**: 
  - Frames em _QUEUE prontos
  - Screenshot para preview
  - Post ao Telegram com button: ✅ PUBLICAR / ❌ CANCELAR
- **Instruções**: `marketing/agents/figma-design.md`
- **Human Gate**: ✅ Aprovação final (visual + copy)
- **Próximo**: /api/publish (Instagram)

---

## 📊 Sistema de Estado

Rastreamos a fase atual em **Supabase** (ou arquivo JSON se offline):

```sql
-- Tabela: agent_state
CREATE TABLE agent_state (
  id serial primary key,
  date date unique,
  phase text, -- 'insights' | 'strategy' | 'tactic' | 'operational' | 'figma' | 'published' | 'cancelled'
  status text, -- 'pending' | 'approved' | 'rejected'
  
  insights_data jsonb,
  strategy_brief jsonb,
  tactic_plan jsonb,
  operational_copy jsonb,
  figma_frames jsonb,
  
  telegram_message_id int,
  created_at timestamp,
  updated_at timestamp
);
```

**Cada webhook Telegram** atualiza:
- `phase` (avança se ✅, volta se ❌)
- `status`
- `updated_at`

---

## 🔗 Webhooks Telegram

```
POST /api/webhooks/telegram
  ├─ approve_PHASE (estrategy, tactic, operational, figma)
  └─ reject_PHASE (volta para aguardar refazer)
```

**Payload esperado** (Telegram Inline Button Callback):
```json
{
  "callback_query": {
    "id": "...",
    "from": {...},
    "message": {...},
    "data": "approve_strategy|2026-05-07" // ou "reject_strategy|2026-05-07"
  }
}
```

---

## 🚀 Ordem de Implementação

1. **Estado + Orquestrador** (`lib/state.js`, `orchestrator.js`)
2. **Telegram Client** (`lib/telegram-client.js`) — édita messages, envia buttons
3. **Insights Agent** — testar pull de dados
4. **Strategy Agent** — testar aprovação Telegram
5. **Tactic + Operational** — incrementalmente
6. **Figma Agent** — último (mais complexo)
7. **Webhook Unificado** (`webhooks/telegram.js`)

---

## 🔐 Variáveis de Ambiente (novas)

```env
# Supabase (para estado)
SUPABASE_URL=
SUPABASE_KEY=

# Ou arquivo local (dev)
STATE_FILE_PATH=./marketing/state/current-state.json

# MCPs (para insights)
INSIGHTFULPIPE_TOKEN=
PIPEBOARD_META_TOKEN=
PIPEBOARD_GOOGLE_TOKEN=

# Existentes (mantém)
ANTHROPIC_API_KEY=
FIGMA_TOKEN=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_ACCOUNT_ID=
CRON_SECRET=
```

---

## ⏰ Horários Finais

| Agente | Hora | Tipo |
|---|---|---|
| Insights | 22h BRT | Cron automático |
| Strategy | 10h BRT | Cron automático |
| Tactic | Após aprovação | Webhook |
| Operational | Após aprovação | Webhook |
| Figma | Após aprovação | Webhook |
| Publish | Após aprovação | Webhook |

---

## 📋 Checklist de Implementação

- [ ] Criar `lib/state.js` (Supabase ou JSON)
- [ ] Criar `lib/telegram-client.js`
- [ ] Criar `automation/api/agents/insights.js`
- [ ] Criar `automation/api/agents/strategy.js`
- [ ] Criar `marketing/agents/*.md` (instruções)
- [ ] Criar `automation/api/agents/orchestrator.js`
- [ ] Refatorar `approve.js` → webhook unificado
- [ ] Testar aprovação Telegram com buttons
- [ ] Criar Tactic + Operational agents
- [ ] Criar Figma agent (unsplash-mcp integration)
- [ ] Deploy no Vercel com crons configurados

---

Este é o **blueprint executável** da arquitetura. Vamos começar!
