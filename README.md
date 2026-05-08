# Padrinho Marketing

Repositório central de marketing e automação de conteúdo do Padrinho.app.

## Estrutura

```
Root (Essential Only)
├── package.json           ← dependências Node (required)
├── package-lock.json      ← npm lock file (required)
├── vercel.json            ← configuração do servidor (required)
├── .env.example           ← template de variáveis de ambiente
├── .env.local             ← variáveis de ambiente locais
├── .gitignore             ← git ignore rules
└── README.md              ← este arquivo

Documentation & Organization
├── KNOW/                  ← knowledge files (brand positioning, market context, personas)
├── SKILL/                 ← operational skills (copy rules, component system, guidelines)
├── AGENT/                 ← agent instructions (all 7 agents)
├── AUT/                   ← automation system & API implementation
│   └── api/
│       ├── agents/        ← agent implementation files
│       ├── lib/           ← shared libraries (state, telegram, claude, orchestrator)
│       └── webhooks/      ← webhook handlers
├── DOCS/                  ← reference & deployment documentation
│   ├── AGENTS.md          ← agent system overview
│   ├── DEPLOYMENT.md      ← deployment guide
│   ├── DEPLOYMENT_STATUS.md
│   ├── ANALYSIS_ISSUES_AND_FIXES.md
│   └── CLAUDE.md          ← Claude integration notes
├── brand/                 ← design tokens, product spec
├── insights/              ← marketing insights (updated daily)
└── outputs/               ← generated content output folder
```

## Como funciona

Todo dia às 8h BRT o sistema roda automaticamente:
1. Claude gera copy baseado nos skills de marketing
2. Figma exporta os slides visuais
3. Você recebe o draft no Telegram (@padrinho_marketing_bot)
4. Toca ✅ para publicar direto no Instagram

Sem desktop. Sem input manual. 100% mobile.

## Setup

Veja `AUT/AUT_Automation.md` para instruções completas.
