# Padrinho Marketing

Repositório central de marketing e automação de conteúdo do Padrinho.app.

## Estrutura

```
/
├── CLAUDE.md              ← instruções para o agente (Claude Code)
├── vercel.json            ← configuração do servidor (cron 10h BRT)
├── package.json           ← dependências Node
├── .env.example           ← template de variáveis de ambiente
│
├── marketing/             ← estratégia, personas, brand, posts
│   ├── KNOW/              ← knowledge files (brand positioning, market context, personas)
│   ├── SKILL/             ← operational skills (copy rules, component index, guidelines)
│   ├── AUT/               ← automation/agent instructions (all 7 agents)
│   ├── brand/             ← design tokens, product spec
│   ├── insights/          ← marketing insights (updated daily)
│   └── posts/             ← generated social content
│
└── automation/            ← sistema técnico de publicação
    ├── api/
    │   ├── orchestrate.js ← gera conteúdo diariamente
    │   ├── approve.js     ← recebe aprovação do Telegram
    │   ├── publish.js     ← publica no Instagram
    │   └── setup-webhook.js
    └── AUTOMATION.md
```

## Como funciona

Todo dia às 10h BRT o sistema roda automaticamente:
1. Claude gera copy baseado nos skills de marketing
2. Figma exporta os slides visuais
3. Você recebe o draft no Telegram (@padrinho_marketing_bot)
4. Toca ✅ para publicar direto no Instagram

Sem desktop. Sem input manual. 100% mobile.

## Setup

Veja `automation/AUTOMATION.md` para instruções completas.
