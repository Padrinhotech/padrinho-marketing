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
├── ./             ← estratégia, personas, brand, posts
│   ├── KNOW/              ← knowledge files (brand positioning, market context, personas)
│   ├── SKILL/             ← operational skills (copy rules, component index, guidelines)
│   ├── AUT/               ← AUT/agent instructions (all 7 agents)
│   ├── brand/             ← design tokens, product spec
│   ├── insights/          ← marketing insights (updated daily)
│   └── posts/             ← generated social content
│
└── AUT/            ← sistema técnico de publicação
    ├── api/
    │   ├── auto-orchestrate.js ← gera conteúdo diariamente
    │   ├── auto-approve.js     ← recebe aprovação do Telegram
    │   ├── auto-publish.js     ← publica no Instagram
    │   └── auto-setup-webhook.js
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

Veja `AUT/AUTOMATION.md` para instruções completas.
