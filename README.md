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
│   ├── skills/
│   │   ├── audiences/     ← personas (Rosa, etc)
│   │   ├── tactic/        ← pilares editoriais
│   │   └── operational/   ← copy-rules, componentes Figma
│   ├── brand/
│   ├── references/
│   ├── insights/
│   └── posts/
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
