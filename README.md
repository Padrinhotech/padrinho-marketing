# Padrinho Marketing — 2026 H2

> **🤖 For LLMs:** Before running any marketing workflow, read [`claude.md`](./claude.md) for complete workflow instructions. It defines the 4-agent cascade (Strategy → Tactic → Operational → Figma) and how to execute content creation end-to-end.

---

## Sobre Este Repositório

Repositório de estratégia e execução de marketing do **Padrinho.app** — app de apoio a pessoas em recuperação de alcoolismo e seus familiares.

**Propósito:** Fonte única da verdade para criação de conteúdo, personas, brand positioning, e workflow operacional.

**Status:** 2026 H2 — Transição de automação (Node.js/Vercel) para workflow manual/conversacional via Claude AI.

**Quem usa:**
- Bill (Growth + Paid Acquisition) → Strategy + Tactic refinement
- Fábio (Creative Partner) → Ad creatives, visual assets  
- Claude AI / LLMs → Execute the full 4-agent cascade
- Marketing Team → Reference for brand guidelines & personas

---

## O que Mudou (2026 H2)

✂️ **Removido:** Toda infraestrutura de automação (scripts Node, Vercel, webhooks, APIs) — see [`CLEANUP.md`](./CLEANUP.md)

✨ **Mantido:** Base de conhecimento, skills operacionais, agentes (racional), outputs

🎯 **Foco:** Validar personas com dados reais + desenhar estratégia de conteúdo replicável em cascata

---

## Estrutura do Repositório

```
padrinho-marketing/
├── README.md                         ← Você está aqui
├── claude.md                         ← LLM workflow instructions (read first!)
├── CLEANUP.md                        ← Files deleted + why
│
├── KNOW/                             ← Base de conhecimento
│   ├── KNOW_BrandPositioning.md      ← Brand voice, strategy por canal
│   ├── KNOW_RosaEquilibrista.md      ← Persona 1: 25F, Instagram-native
│   ├── KNOW_AnaMaeProtetora.md       ← Persona 2: 40F mother
│   ├── KNOW_PedroAutonomo.md         ← Persona 3: 31M tech-forward
│   ├── KNOW_CaioFilho.md             ← Persona 4: amplifier
│   └── KNOW_EditorialPillars.md      ← Content themes
│
├── SKILL/                            ← Habilidades operacionais
│   ├── SKILL_ContentCreationWorkflow.md
│   ├── SKILL_CopyRules.md
│   ├── SKILL_ComponentSystem.md
│   └── SKILL_PhotoGuidelines.md
│
├── AGENT/                            ← Agentes (racional)
│   ├── AGENT_Strategy.md
│   ├── AGENT_Tactic.md
│   ├── AGENT_Operational.md
│   └── AGENT_Figma.md
│
└── POSTS/                            ← Conteúdo gerado (output)
    ├── AGENDA_Padrinho.md            ← Editorial calendar
    └── DDMMYYYY_TemaDoPost/
        ├── POST_Overview.md
        ├── BLOG_*.md
        ├── instagram-captions.md
        └── [outros outputs]
```

---

## Workflow em Cascata (Manual, 2026 H2)

Sem automação. Claude AI executa os 4 agents em sequência:

**Stage 1: Strategy Agent**  
Input: Tema semanal + persona → Output: `POST_Overview.md` (hook, message, tone, metrics)

**Stage 2: Tactic Agent**  
Input: POST_Overview → Output: Multi-canal content (Blog 1100w, Instagram captions, Podcast 8min, Newsletter, WhatsApp, LinkedIn)

**Stage 3: Operational Agent**  
Input: All tactic outputs → Output: Publishing checklist, calendar, metrics targets

**Stage 4: Figma Agent**  
Input: Tactic outputs → Output: Instagram carousel specs (1080×1350 px), LinkedIn (1200×628 px), design tokens

---

## Públicos Alvo (2026 H2)

**Foco:** Dependentes em recuperação (80%) + Familiares (20%)  
**Descontinuados:** Clínicas, empresas, profissionais

| Persona | Tipo | Perfil | Status |
|---------|------|--------|--------|
| Rosa Equilibrista | Dependente | 25F, Instagram-native, early recovery | 🔴 A validar |
| Ana Mae Protetora | Familiar | 40F mother, Facebook/YouTube | 🔴 A validar |
| Pedro Autônomo | Dependente | 31M freelancer, desktop | 🔴 A validar |
| Caio Filho | Amplifier | Shares with family | ✅ Active |

---

## Como Começar (Para LLMs)

**Primeira vez?**

1. Leia [`claude.md`](./claude.md) — instruções completas
2. Carregue contexto: `"Load context: KNOW_BrandPositioning, KNOW_RosaEquilibrista, AGENDA_Padrinho"`
3. Inicie: `"Week 28: Theme 'Mindfulness na Recuperação'. Persona: Rosa. Start with Strategy"`

**Full workflow?**

```
"Create content for Week 28.
Persona: Rosa.
Run all 4 agents (Strategy → Tactic → Operational → Figma).
Output files ready to publish."
```

**Refine quickly?**

```
"Make Instagram captions 30% shorter. Keep hook. Rerun Tactic."
```

---

## Próximas Etapas (Roadmap 2026 H2)

- [ ] **Datafy Personas:** Coletar dados de Supabase, Insightfulpipe, Apify
- [ ] **Customer Journey:** Mapear jornada por persona
- [ ] **Content Strategy:** Desenhar estratégia replicável
- [ ] **Publishing Calendar:** H2 2026 (weeks 25-52)
- [ ] **Monitor & Iterate:** Track metrics, refine personas

---

## Referências Rápidas

| Procurando... | Arquivo |
|---------------|---------|
| Brand voice? | `KNOW/Padrinho/KNOW_BrandPositioning.md` |
| Rosa persona? | `KNOW/Padrinho/KNOW_RosaEquilibrista.md` |
| Content workflow? | `SKILL/SKILL_ContentCreationWorkflow.md` |
| Strategy framework? | `AGENT/AGENT_Strategy.md` |
| This week's theme? | `POSTS/Padrinho/AGENDA_Padrinho.md` |
| **LLM instructions?** | **[`claude.md`](./claude.md)** ← **START HERE** |

---

## Mantém em Mente

✅ **Always:**
- Load context before generating
- Reference persona when writing
- Include CTA in every output
- Use brand voice from KNOW_BrandPositioning
- Suggest iterations ("Want me to adjust tone?")

❌ **Never:**
- Skip Strategy stage
- Use tone that contradicts persona
- Forget CTAs
- Publish without user confirmation
- Create visuals without design specs

---

**Última atualização:** 2026-06-14  
**Mantido por:** Bill + Claude AI  
**Para dúvidas:** Leia [`claude.md`](./claude.md) primeiro
