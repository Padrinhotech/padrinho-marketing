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

To ensure organization and clarity for both humans and AI agents, all files in `/marketing/skills/` and `/marketing/agents/` must follow these naming patterns:

| Prefix | Category | Example | Location |
| :--- | :--- | :--- | :--- |
| **SKILL_** | Operational skills and guidelines | `SKILL_Documentation.md` | `marketing/skills/` |
| **AGENT_** | Agent instructions and definitions | `AGENT_Strategy.md` | `marketing/agents/` |
| *(none)* | Specific skill topics (primary convention) | `copy-rules.md`, `component-system.md` | `marketing/skills/{category}/` |

### Folder Organization

```
marketing/skills/
├── SKILL_Documentation.md          ← This file (master standard)
├── strategy/
│   ├── brand-positioning.md
│   └── market-context.md           ← Updated by Market Agent
├── tactic/
│   ├── editorial-pillars.md
│   └── trend-radar.md
├── operational/                    ← Visual & execution skills
│   ├── component-index.md          ← Component selection guide
│   ├── component-system.md         ← Available Figma components
│   ├── copy-rules.md               ← Copy writing standards
│   ├── figma-delivery.md           ← Figma delivery standards
│   ├── photo-guidelines.md         ← Photo sourcing & style
│   ├── visual-agent.md             ← Design guidelines
│   ├── inject-photos.js            ← Photo injection script
│   └── inject-photos-node.js       ← Local photo injection
├── audiences/                      ← User personas & insights
│   ├── icp.md                      ← Ideal customer profile
│   ├── user-insights.md            ← Updated by User Insights Agent
│   ├── rosa-equilibrista.md
│   ├── ana-mae-protetora.md
│   ├── pedro-autonomo-solitario.md
│   └── caio-filho-ressentido.md
└── ads/                            ← Campaign & audience skills
    ├── audience-pipeline.md
    └── campaign-setup-checklist.md

marketing/agents/
├── insights.md                     ← Insights Agent instructions
├── market.md                       ← Market Agent instructions
├── user-insights.md                ← User Insights Agent instructions
├── strategy.md                     ← Strategy Agent instructions
├── tactic.md                       ← Tactic Agent instructions
├── operational.md                  ← Operational Agent instructions
└── figma-design.md                 ← Figma Agent instructions
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
- `parent_doc`: Link to context (e.g., `marketing/skills/operational/`)
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
- **Example:** "O copy deve seguir as regras de CTA (call-to-action) definidas em copy-rules.md"

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

### A. Skill Documents (`marketing/skills/*/`)
Operational guidelines for specific tasks or knowledge areas.

**Mandatory Sections:**
1. Frontmatter + Purpose Statement
2. Overview / Context
3. Core Rules or Concepts
4. Examples
5. Edge Cases or Exceptions (if applicable)
6. Footer with references

**Example Structure:**
```markdown
---
title: "Copy Rules"
version: "1.0"
status: "Final"
type: "Skill"
owner: "Padrinho Marketing Automation"
parent_doc: "marketing/skills/operational/"
tags: [copy, writing, captions, cta]
---

# Copy Rules — Padrinho Social Content

Directrizes para redação de captions, hashtags e copy em conteúdo gerado pelo Operational Agent...

## Estrutura Base de Caption

## Exemplos por Pilar Editorial

## Regras de Hashtag

---

**Last Updated:** 2026-05-07  
**Maintained by:** Operational Agent  
**References:**  
- marketing/skills/audiences/
- marketing/agents/operational.md
```

### B. Agent Instructions (`marketing/agents/`)
Step-by-step guidance for what an agent must do.

**Mandatory Sections:**
1. Frontmatter + Purpose Statement
2. What This Agent Does
3. Input Requirements (what files/data it reads)
4. Output Specification (what it produces, exact format)
5. Step-by-Step Process
6. Approval Gate (if applicable)
7. Error Handling / Edge Cases
8. Footer with references

**Example Structure:**
```markdown
---
title: "Strategy Agent Instructions"
version: "1.0"
status: "Final"
type: "Agent"
owner: "Padrinho Marketing Automation"
parent_doc: "marketing/agents/"
tags: [agent, strategy, insights, planning]
---

# Strategy Agent — Instructions

O Strategy Agent lê insights diários e habilidades de marca para gerar um brief estratégico...

## Input Requirements

## Output Specification

## Processo Passo a Passo

## Human Approval Gate

---

**Last Updated:** 2026-05-07  
**Maintained by:** Strategy Agent  
**References:**  
- marketing/skills/strategy/brand-positioning.md
- AGENTS.md (architecture)
```

### C. Reference Indexes
Catalogs or lookup tables (e.g., `component-index.md`).

**Mandatory Sections:**
1. Frontmatter + Purpose Statement
2. Table of Contents or Quick Reference
3. Detailed Listings (organized tables or lists)
4. Selection Guidelines (if applicable)
5. Footer with version and last update

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
- [AIX Researcher Documentation Skill](https://github.com/your-org/aix-researcher/foundations/skills/SKILL_Documentation.md)
- [marketing/README.md](marketing/README.md)
- [AGENTS.md](AGENTS.md)
