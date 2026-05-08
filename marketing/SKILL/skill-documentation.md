---
title: "Padrinho Documentation Standardization"
version: "1.0"
status: "Final"
type: "Skill"
owner: "Padrinho Marketing Automation"
parent_doc: "marketing/README.md"
tags: [skill, documentation, standards, quality, agents, processes]
---

# Skill: Documentation Standardization — Padrinho Marketing Automation

This skill defines the global guidelines for creating and maintaining all documentation in the **Padrinho Marketing Automation** system. It ensures that all documentation is professional, agent-readable, and consistent with our multi-agent orchestration architecture.

This is an **operational skill** applied to all skill creation, agent instructions, and process documentation across the system.

---

## 1. File Naming Conventions

All documentation files must use prefixes to clearly indicate their type and purpose. This enables both human navigation and agent routing.

| Prefix | Category | Purpose | Example |
| :--- | :--- | :--- | :--- |
| **KNOW_** | Knowledge & Context | Information agents need to understand (brand, market, audiences, personas, insights) | `KNOW_BrandPositioning.md`, `KNOW_MarketContext.md` |
| **SKILL_** | Operational Skills | Step-by-step guidelines for how to execute tasks (copy rules, component selection, photo sourcing) | `SKILL_CopyRules.md`, `SKILL_ComponentSystem.md` |
| **AGENT_** | Agent Instructions | Instructions for how agents operate (agent execution steps, approval gates, data inputs/outputs) | `AGENT_Strategy.md`, `AGENT_Operational.md` |
| **skill-** | Script Assets | Executable scripts and utilities (photo injection, utilities) | `skill-inject-photos.js`, `skill-inject-photos-node.js` |

### Key Distinction: Knowledge vs. Skill vs. Agent
- **KNOW_** files are *read-only context* that agents ingest to understand business rules, market conditions, or brand identity
- **SKILL_** files are *executable guidelines* with step-by-step instructions, checklists, and validation criteria
- **AGENT_** files define *agent behavior* and orchestration logic
- **skill-** prefixed scripts are utilities used within skill execution

### Folder Organization

```
marketing/
├── KNOW/                           ← Knowledge & Context files
│   ├── KNOW_BrandPositioning.md
│   ├── KNOW_MarketContext.md       ← Updated by Market Agent
│   ├── KNOW_EditorialPillars.md
│   ├── KNOW_TrendRadar.md
│   ├── KNOW_ICP.md
│   ├── KNOW_UserInsights.md        ← Updated by User Insights Agent
│   ├── KNOW_RosaEquilibrista.md
│   ├── KNOW_AnaMaeProtetora.md
│   ├── KNOW_PedroAutonomo.md
│   └── KNOW_CaioFilho.md
│
├── SKILL/                          ← Operational Skills & Guidelines
│   ├── skill-documentation.md      ← This file (master standard)
│   ├── SKILL_CopyRules.md
│   ├── SKILL_ComponentSystem.md
│   ├── SKILL_ComponentIndex.md
│   ├── SKILL_FigmaDelivery.md
│   ├── SKILL_PhotoGuidelines.md
│   ├── SKILL_VisualAgent.md
│   ├── SKILL_AudiencePipeline.md
│   ├── SKILL_CampaignSetup.md
│   ├── skill-inject-photos.js
│   └── skill-inject-photos-node.js
│
├── AUT/                            ← Automations & Agent Instructions
│   ├── AGENT_Insights.md
│   ├── AGENT_Market.md
│   ├── AGENT_UserInsights.md
│   ├── AGENT_Strategy.md
│   ├── AGENT_Tactic.md
│   ├── AGENT_Operational.md
│   └── AGENT_Figma.md
│
└── posts/                          ← Generated content (managed by Figma Agent)
```

---

## 2. Mandatory Document Structure

Every `.md` file must follow this structure:

### A. Frontmatter (YAML)
Located at the very top of the file for metadata and indexing.

```yaml
---
title: "Document Title"
version: "1.0"
status: "Draft | Reviewed | Final"
type: "Skill | Agent | Instructions | Reference"
owner: "Padrinho Marketing Automation"
parent_doc: "Link to parent folder/file"
tags: [tag1, tag2, tag3]
---
```

**Frontmatter Rules:**
- `version`: Increment on significant changes (1.0 → 1.1 → 2.0)
- `status`: Draft (in progress), Reviewed (peer check), Final (production)
- `owner`: Always "Padrinho Marketing Automation" or specific agent name
- `parent_doc`: Link to context (e.g., `../SKILL/SKILL_operational/`)
- `tags`: 3-5 relevant tags for search/organization

### B. Title & Purpose Statement
A 2-3 sentence paragraph immediately after Frontmatter, explaining:
- What the document is
- Who should read it
- How it's used in the system

**Example:**
> Este documento define as regras de redação para todas as captions e copy gerado pelo Operational Agent. Leia este arquivo se você está criando conteúdo para Instagram ou refinando copy já gerado. Usado pelo Operational Agent para validar saídas antes de enviar para aprovação Telegram.

### C. Hierarchical Content
- **H1 (#)**: Only for the main title (can be omitted if using Frontmatter as title)
- **H2 (##)**: Major sections (Objetivos, Diretrizes, Exemplos, Casos de Uso)
- **H3 (###)**: Subsections and technical details
- **H4 (####)**: Lists, code blocks, edge cases
- Do **not** skip heading levels (H2 → H4 is invalid)

### D. Visual Elements
- **Tables**: Use for comparative data, lists of items with attributes, or reference lists
- **Alerts/Blockquotes**: For highlights:
  - `> [!NOTE]` — Additional context or clarification
  - `> [!TIP]` — Best practice or recommendation
  - `> [!IMPORTANT]` — Critical rules, restrictions, or risks
  - `> [!WARNING]` — Caution about misuse or unintended consequences
- **Code Blocks**: For technical examples, JSON structures, or prompt templates
- **Lists**: Use bullet lists (unordered) for options; numbered lists (ordered) for steps

### E. Traceability Footer
At the very end of the document:

```markdown
---

**Last Updated:** [YYYY-MM-DD]  
**Maintained by:** [Agent Name or Team]  
**References:**  
- [Link to related skill]
- [Link to parent document]
- [Link to examples or references]
```

---

## 3. Content and Style Guidelines

### Language
- **Primary Language:** Portuguese (Brazilian variant — pt-BR)
- **Use English only for:** Technical terms, API references, code, proper names that are English-only
- **Example:** "O copy deve seguir as regras de CTA (call-to-action) definidas em SKILL_CopyRules.md"

### Tone of Voice
- **Professional**: Avoid slang or overly casual language
- **Clear and Direct**: Use active voice; minimize jargon
- **Agent-Readable**: Write as if an AI agent will read and follow these instructions
- **Senior-Level**: Assume readers understand marketing and product context

### Writing Rules
- **No Placeholders**: Never deliver `[Fill in here]` or `Text here`. If information is missing, mark as **[Pending]** and notify the user
- **Be Specific**: Instead of "Use good colors," write "Use colors from figma-tokens.json palette, prioritizing Navy (#1A2540) and Cream (#F5F3F0)"
- **Include Examples**: Every rule should have at least one example
- **Cross-Reference**: Link to related skills, agents, or documents using markdown links

### Formatting Best Practices

**DO:**
- Use **bold** for key terms being defined
- Use *italic* for emphasis or when referencing file names
- Use `code` for variable names, frame IDs, JSON keys, or technical identifiers
- Use | tables | for structured information
- Use numbered lists for sequential steps
- Use bullet lists for options or non-sequential items

**DON'T:**
- All CAPS except for acronyms (LGPD, API, etc.)
- Excessive punctuation or emojis (unless specifically required)
- Inline links that obscure the URL — use descriptive link text

---

## 4. Documentation by Content Type

### A. KNOW_ Documents (Knowledge & Context)
Read-only files containing information agents ingest to understand business context.

**Purpose:** Brand identity, market conditions, audience profiles, editorial strategy
**Location:** `/marketing/KNOW/`

**Mandatory Sections:**
1. Frontmatter + Purpose Statement (describe what agent reads this and why)
2. Overview / Context
3. Core Concepts or Definitions
4. Data (if applicable) — tables, metrics, personas
5. Selection Guidelines (if applicable)
6. Footer with references

**Example Structure:**
```markdown
---
title: "Brand Positioning — Padrinho"
version: "1.0"
status: "Final"
type: "Knowledge"
owner: "Padrinho Marketing Automation"
parent_doc: "marketing/KNOW/"
tags: [brand, positioning, messaging, values]
---

# Brand Positioning — Padrinho

O Strategy Agent lê este arquivo para entender posicionamento da marca...

## Vision

## Core Values

---

**Last Updated:** 2026-05-07  
**Read by:** Strategy, Tactic, Operational Agents  
**References:**  
- marketing/KNOW/MarketContext.md
```

### B. SKILL_ Documents (Operational Skills)
Step-by-step, executable guidelines with checklists and validation criteria.

**Purpose:** How to execute specific tasks (write copy, select components, source photos)
**Location:** `/marketing/SKILL/`

**Mandatory Sections:**
1. Frontmatter + Purpose Statement (describe what agent uses this for)
2. Overview / Context
3. Core Rules or Concepts
4. Step-by-Step Process or Checklist
5. Examples (at least one per major rule)
6. Edge Cases or Exceptions
7. Validation Checklist
8. Footer with references

**Example Structure:**
```markdown
---
title: "Copy Rules — Padrinho"
version: "1.0"
status: "Final"
type: "Skill"
owner: "Padrinho Marketing Automation"
parent_doc: "marketing/SKILL/"
tags: [copy, writing, captions, cta, guidelines]
---

# Copy Rules — Padrinho

O Operational Agent usa este arquivo para estruturar e validar captions...

## Estrutura Base de Caption

### 1. Gancho (primeiros 125 chars)
- [ ] Hook emocional?
- [ ] Relevante ao pilar?

## Exemplos por Pilar Editorial

## Regras de Hashtag

## Validation Checklist

---

**Last Updated:** 2026-05-07  
**Used by:** Operational Agent  
**References:**  
- marketing/KNOW/EditorialPillars.md
- marketing/KNOW/BrandPositioning.md
```

### C. AGENT_ Documents (Agent Instructions)
Agent execution instructions defining inputs, outputs, and orchestration.

**Purpose:** How agents run (step-by-step process, data flow, approval gates)
**Location:** `/marketing/AGENT/`

**Mandatory Sections:**
1. Frontmatter + Purpose Statement
2. Agent Purpose & Responsibilities
3. Trigger / Schedule (when it runs)
4. Input Requirements (files, data, triggers)
5. Step-by-Step Process
6. Output Specification (exact JSON structure)
7. Approval Gates (if applicable)
8. Error Handling
9. Footer with references

**Example Structure:**
```markdown
---
title: "Strategy Agent — Automation"
version: "1.0"
status: "Final"
type: "Automation"
owner: "Padrinho Marketing Automation"
parent_doc: "marketing/AGENT/"
tags: [agent, strategy, orchestration, scheduling]
---

# Strategy Agent — Automation

## Purpose
Generate strategic brief from insights + market context + brand positioning.

## Schedule
Cron: 0 13 * * * (13h UTC = 10h BRT)

## Input Requirements
- marketing/KNOW/BrandPositioning.md
- marketing/KNOW/MarketContext.md
- marketing/KNOW/EditorialPillars.md

## Output Specification

```json
{
  "date": "2026-05-07",
  "objectives": [...],
  "telegram_message_id": 12345
}
```

## Step-by-Step Process

1. Read KNOW_ files
2. Validate previous phase
3. Call Claude with system prompt
4. Validate output
5. Save to state
6. Send Telegram preview

---

**Last Updated:** 2026-05-07  
**Maintained by:** Orchestrator  
**References:**  
- AGENTS.md (architecture)
- marketing/KNOW/BrandPositioning.md
```

---

## 5. Quality Checklist

Before finalizing **any** document, validate:

- [ ] **Frontmatter**: YAML block present with all required fields?
- [ ] **Title Hierarchy**: No skipped levels (H2 → H4)?
- [ ] **No Placeholders**: All `[Fill in]` or `Text here` removed or marked `[Pending]`?
- [ ] **Examples**: Every major rule/concept has at least one concrete example?
- [ ] **Cross-References**: Related skills or agents linked where relevant?
- [ ] **Language**: Portuguese (pt-BR) used; English only for technical terms?
- [ ] **Footer**: Updated with date, maintainer, and references?
- [ ] **Clarity**: Would an AI agent understand these instructions clearly?
- [ ] **Formatting**: Tables used for structured data; alerts for highlights?

---

## 6. Maintenance & Versioning

### When to Update Version
- **1.0 → 1.1**: Minor clarifications, typo fixes, added examples
- **1.0 → 2.0**: Significant process change, new rules, breaking changes to agent behavior

### When to Update Status
- Draft → Reviewed: After peer review or agent testing
- Reviewed → Final: After approval and confirmed use in production
- Final → Reviewed: If errors or changes discovered

### Update Process
1. Update `version` in Frontmatter
2. Update `status` if applicable
3. Update `Last Updated` in footer
4. Commit to Git with clear message: `docs: update [filename] to v1.1`

---

> [!IMPORTANT]
> **This skill must be read by any AI agent or human before creating or modifying documentation in this repository.** Consistent documentation enables reliable agent execution and human collaboration.

---

**Last Updated:** 2026-05-07  
**Maintained by:** Padrinho Marketing Automation  
**References:**  
- [AIX Researcher Documentation Skill](https://github.com/your-org/aix-researcher/foundations/skills/skill-documentation.md)
- [marketing/README.md](marketing/README.md)
- [AGENTS.md](AGENTS.md)
