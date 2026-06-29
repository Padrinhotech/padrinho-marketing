# 🤖 claude.md — LLM Workflow Instructions

**Last Updated:** 2026-06-14  
**Status:** Active (2026 H2)  
**Objective:** Guide Claude AI to execute the Padrinho marketing workflow end-to-end

---

## Overview

This file defines how Claude (or any LLM) should orchestrate the **manual marketing cascade workflow** for Padrinho Elo.

### The Shift (2026 H2)

**Before:** Automated agents (Node.js/Vercel) ran in sequence via `DIAGNOSTIC_AGENTS.js`

**Now:** Conversational workflow where Claude executes each agent step-by-step, iterating with the user

```
┌─────────────┐
│   Strategy  │  (What should we talk about?)
│   AGENT     │
└──────┬──────┘
       │ Output: POST_Overview.md (theme, pillar, persona, hook)
       ↓
┌─────────────┐
│    Tactic   │  (How should we say it?)
│   AGENT     │
└──────┬──────┘
       │ Output: BLOG, INSTAGRAM, PODCAST, NEWSLETTER, LINKEDIN
       ↓
┌─────────────┐
│ Operational │  (Where does it live?)
│   AGENT     │
└──────┬──────┘
       │ Output: Publishing checklist, calendar updates
       ↓
┌─────────────┐
│    Figma    │  (What does it look like?)
│   AGENT     │
└──────┬──────┘
       │ Output: Instagram carousel PNG, LinkedIn image, WhatsApp image
       ↓
┌─────────────────────────┐
│   User Review + Iterate │
│   (Edit, refine, rerun) │
└─────────────────────────┘
```

---

## How to Use This Workflow

### 1. **Context: Load the Knowledge Base**

When starting a session, Claude should load these in memory:

```
PATHS TO LOAD:
- POSTS/Padrinho/STRATEGY_Padrinho.md             → Strategy source of truth (pillars, personas, weekly arc, tone laws)
- KNOW/Padrinho/KNOW_BrandPositioning.md          → Brand voice, strategy by channel
- KNOW/Padrinho/KNOW_RosaEquilibrista.md          → Primary persona (25F, Instagram-native)
- KNOW/Padrinho/KNOW_AnaMaeProtetora.md           → Secondary persona (40F mother, Facebook/YouTube)
- KNOW/Padrinho/KNOW_PedroAutonomo.md             → Tertiary persona (31M tech-forward, desktop)
- KNOW/Padrinho/KNOW_CaioFilho.md                 → Amplifier persona (amplifies to family members)
- POSTS/Padrinho/AGENDA_Padrinho.md               → Editorial calendar (weeks 25-52 H2 2026)
```

**User Prompt to Load Context:**

```
"Ready to create [tema] content. Load context."
```

Claude responds:
```
✓ Loaded KNOW_BrandPositioning (strategy + channels)
✓ Loaded KNOW_RosaEquilibrista (target persona)
✓ Loaded AGENDA_Padrinho (week XX theme + brief)

Ready. What week/theme are we working on?
```

---

### 2. **Strategy Agent: Define the Content Idea**

**Trigger:** User provides a week number, theme, or specific directive

**Example User Input:**
```
Week 28: Theme "Mindfulness na Recuperação"
Pillar: Wellness
Persona: Rosa Equilibrista
How to start?
```

**Claude as Strategy Agent:**

1. **Reference AGENT/AGENT_Strategy.md** for instructions on framing
2. **Check AGENDA_Padrinho.md** for that week's theme + brief
3. **Select the persona** from KNOW/ (Rosa, Ana Mae, Pedro, Caio)
4. **Create POST_Overview.md** with:
   - **Theme:** [tema from agenda]
   - **Pillar:** [editorial pillar: Wellness / Community / Change / Sobriety / Family]
   - **Persona:** [Rosa / Ana Mae / Pedro / Caio]
   - **Hook:** [1-2 sentence attention-grabber for Instagram]
   - **Main Message:** [Core insight or lesson in 2-3 sentences]
   - **CTA:** [Call-to-action at end of content]
   - **Tone:** [Conversational / Inspirational / Educational / Vulnerable]
   - **Success Metric:** [What we want this content to achieve]

**Example POST_Overview.md:**
```markdown
# POST_Overview: Mindfulness na Recuperação (Week 28)

**Theme:** Mindfulness na Recuperação  
**Pillar:** Wellness  
**Persona:** Rosa Equilibrista (25F, Instagram-native, early recovery)  
**Hook:** "5 minutos de respiração pode mudar seu dia inteiro"  
**Main Message:** Mindfulness isn't meditation gurus. It's breathing before you react. It's noticing the urge without acting. For Rosa, it's the pause that saves the day.  
**CTA:** "Share: what's your 5-minute calm ritual? 🙏"  
**Tone:** Conversational + vulnerable  
**Success:** 50+ likes, 5+ saves, 2+ shares on Instagram carousel  
```

**Claude Output to User:**
```
✅ Strategy locked:
- Theme: Mindfulness na Recuperação
- Persona: Rosa Equilibrista (early recovery, needs practical tips)
- Hook: "5 minutos de respiração pode mudar seu dia inteiro"
- Tone: Conversational + vulnerable

Ready for Tactic stage? (y/n)
```

---

### 3. **Tactic Agent: Generate Multi-Channel Content**

**Trigger:** User confirms strategy ("yes" / "ready for tactics")

**Claude as Tactic Agent:**

1. **Reference AGENT/AGENT_Tactic.md** for channel-specific rules
2. **Reference SKILL/SKILL_CopyRules.md** for tone + voice rules per channel
3. **Generate outputs for EACH channel:**

#### 3a. **BLOG** → `BLOG_DDMMYYYY_Mindfulness.md`
- 800–1200 words
- SEO heading (includes keyword like "mindfulness na recuperação")
- 3–4 sections with subheadings
- 1 internal link (to past blog post or app feature)
- Meta description (160 chars max)

#### 3b. **INSTAGRAM** → `INSTA_Carousel.md`
> Nomes de arquivo, contagem de slides (**6–9**) e dimensões (**1080×1440**) são canônicos em `SKILL/SKILL_Documentation.md`. WhatsApp usa `INSTA_Reshare.md`.
- **Post 1 (Carousel):** Hook + 6–9 slides (see Figma Agent)
  - Slide 1: Hook (visual) + caption (150 chars)
  - Slide 2: Main message with emoji
  - Slide 3: CTA + hashtags (#recuperação #mindfulness #padrinho)
- **Feed caption:** a voz POR CIMA do carrossel — **complementa, nunca transcreve os slides**. Adiciona bastidor/contexto, um ângulo ou dado novo, voz íntima + a provocação que puxa comentário. Gancho ≠ headline da capa. (Regra de ouro: `SKILL/SKILL_CopyRules.md` § Regras de Legenda.)
- **Reels idea:** "5-minute breathing guide" (15–30 sec)
- **Story prompt:** "What's your calm ritual?"

#### 3c. **PODCAST** → `PNT_Script.md`
- 8–10 min read-aloud script
- 3 topic beats (hook → story → actionable tip)
- CTA at end (subscribe + mention app)
- Include guest quote or user testimony if available

#### 3d. **NEWSLETTER** → mensal em `POSTS/Padrinho/NEWS/` (NÃO por post — ver `SKILL/SKILL_Documentation.md`)
- Email subject line (50 chars max)
- Greeting + hook (50 words)
- Main story or insight (150 words)
- Link to full blog post
- P.S. CTA (app download / community join)

#### 3e. **WHATSAPP** → `INSTA_Reshare.md` (same file as Instagram)
- WhatsApp distribution = reshare the Instagram post directly
- No separate file needed — use the `INSTA_Reshare.md` already generated
- Share the Instagram link to the WhatsApp community

#### 3f. **LINKEDIN** → `LINKEDIN_Captions.md`
- Professional tone (for founder audience)
- 200–300 words
- "Why we built mindfulness into Padrinho"
- Link to blog post or app

**Example Tactic Output (BLOG excerpt):**
```markdown
# Mindfulness na Recuperação: O Pausa Que Salva o Dia

**Meta:** Mindfulness recovery breathing techniques Rosa Equilibrista

Para Rosa, mindfulness não é yoga no topo de uma montanha. É respirar antes de reagir.

## 1. O Problema Real
Quando a vontade chega, o tempo desacelera. Você tem 30 segundos para não ligar para seu ex.

## 2. A Técnica: Caixa Respiratória
Inspire em 4 / Segure 4 / Expire 4 / Segure 4. Repita 5 vezes.

## 3. Quando Usar
Antes de qualquer decisão grande. Antes do café com amigos que bebia.

[CTA] Salve essa técnica no Padrinho app.
```

**Claude Output to User:**
```
✅ Tactic stage complete:

📝 BLOG (1100 words, SEO-optimized)
📸 INSTAGRAM captions + carousel specs
🎙️ PODCAST script (8 min)
📧 NEWSLETTER email
📲 WHATSAPP → reshare Instagram post (INSTA_Reshare.md)
💼 LINKEDIN professional angle

All files ready in: POSTS/280626_Mindfulness_Recuperacao/

Ready for Operational stage? (y/n)
```

---

### 4. **Operational Agent: Publishing Plan**

**Trigger:** User confirms tactics ("yes" / "ready for ops")

**Claude as Operational Agent:**

1. **Reference AGENT/AGENT_Operational.md** for publishing rules
2. **Create `publishing-checklist.md`:**

```markdown
# Publishing Checklist: Mindfulness (Week 28)

## Tuesday (Day 1: Blog + Newsletter)
- [ ] Publish blog post → Padrinho site
- [ ] Generate SEO meta image
- [ ] Send newsletter email (Tuesday 9 AM BRT)
- [ ] Pin blog post on Instagram bio link
- **Metrics to track:** Blog views, newsletter CTR

## Wednesday (Day 2: Instagram Main Post)
- [ ] Upload carousel (3 slides) to Instagram feed
- [ ] Tag location + use hashtags
- [ ] Pin story: "What's your calm ritual?"
- [ ] Reply to all comments within 2 hours
- **Engagement target:** 50+ likes, 5+ saves

## Thursday (Day 3: Podcast + LinkedIn)
- [ ] Record & edit podcast (8 min audio)
- [ ] Upload to Spotify / Apple Podcasts
- [ ] Post LinkedIn article
- [ ] Share podcast clip on Instagram Reels
- **Metrics:** Podcast listens, LinkedIn impressions

## Friday (Day 4: WhatsApp Community)
- [ ] Reshare Instagram post to WhatsApp community (use INSTA_Reshare.md)
- [ ] Community engagement (replies to questions)
- **Metrics:** WhatsApp reach, community activity

## Throughout Week
- [ ] Monitor comment sentiment
- [ ] Respond to DMs within 24h
- [ ] Cross-promote on all channels
- [ ] Capture user testimonials for next week

## Success Metrics (Target)
- Blog views: 200+
- Instagram engagement: 50+ likes, 5+ saves
- Newsletter CTR: 15%+
- Podcast listens: 50+
- Community replies: 10+
```

3. **Update AGENDA_Padrinho.md:**
   - Mark "Week 28" status: `[PUBLISHED]`
   - Log actual metrics (after week ends)

4. **Create calendar file:** `calendar-updates.md`
   - ICS-compatible calendar entries for each publish time
   - Set reminders for community monitoring

**Claude Output to User:**
```
✅ Operational plan locked:

📅 Publishing schedule (Tue-Fri cascade)
✅ Checklist with real-time metrics tracking
📊 Success targets (50+ likes, 200+ blog views, etc.)
📍 Community engagement plan

Ready for Figma Agent (visual assets)? (y/n)
```

---

### 5. **Figma Agent: Generate Visual Assets**

**Trigger:** User confirms operations ("yes" / "ready for visuals")

**Claude as Figma Agent:**

1. **Reference AGENT/AGENT_Figma.md** for design system rules
2. **Reference azul-design-system** skill for colors, typography
3. **Generate image specs** for:
   - **Instagram carousel slide 1:** Hook visual (1080x1440 px)
   - **Instagram carousel slide 2:** Main message visual
   - **Instagram carousel slide 3:** CTA visual
   - **LinkedIn image:** Professional design (1200x628 px)

4. **Create design brief:** `design-brief.md`
```markdown
# Design Brief: Mindfulness (Week 28)

## Instagram Carousel (3 slides)

### Slide 1: Hook
- **Text:** "5 minutos de respiração pode mudar seu dia inteiro"
- **Visual:** Rosa (illustrated) breathing, calm background, soft colors
- **Colors:** Azul primary (#2E5090) + Calm green accent (#4CAF50)
- **Font:** Poppins Bold (48px) for hook

### Slide 2: Technique
- **Text:** "Caixa Respiratória: 4-4-4-4"
- **Visual:** Animation-ready diagram of breathing box
- **Colors:** Same palette
- **Elements:** Numbered steps, clear instructions

### Slide 3: CTA
- **Text:** "Share: what's your calm ritual? 🙏"
- **Visual:** Rosa in Padrinho app interface
- **CTA Button:** "Open Padrinho" (Azul primary color)

## LinkedIn Image
- **Size:** 1200x628 px
- **Theme:** Professional, but warm
- **Headline:** "Why Mindfulness Matters in Recovery"
- **Visual:** Abstract breathing pattern + Padrinho logo

```

5. **Output to user** with:
   - Visual specs (dimensions, colors, fonts)
   - Design system reference (azul-design-system colors)
   - Instructions for design tool (Figma / Canva / Adobe)

**Claude Output to User:**
```
✅ Figma specifications ready:

🎨 Instagram carousel (6–9 slides × 1080x1440 px)
📊 LinkedIn image (1200x628 px)

Design tokens:
- Primary blue: #2E5090 (Azul primary)
- Accent green: #4CAF50 (Calm)
- Font: Poppins Bold (headers), Inter Regular (body)

⚠️ Note: Visual assets require design tool (Figma/Canva).
I've provided design brief with specs. Ready to help refine?
```

---

## Iteration & Refinement Loop

### User Can Ask at ANY Stage:

**"Redo slide 2 with [feedback]"**
```
Claude rewrites that specific component, keeps others intact
```

**"Make the tone more [X]"**
```
Claude adjusts all tactic outputs (blog, Instagram, etc.) to new tone
```

**"Change persona to Ana Mae"**
```
Claude restarts from Strategy → Tactic (adjusts all outputs for 40F mother audience)
```

**"Add [external source] to blog"**
```
Claude incorporates reference, maintains SEO + length targets
```

**"Skip to Figma" (bypass Operational)**
```
Claude jumps to visual specs, assumes default publishing schedule
```

---

## Key Files Claude Must Reference

### Knowledge Base (KNOW/)
- **KNOW_BrandPositioning.md** → voice, values, channel strategy
- **KNOW_RosaEquilibrista.md** → 25F Instagram-native, early recovery
- **KNOW_AnaMaeProtetora.md** → 40F mother, Facebook/YouTube
- **KNOW_PedroAutonomo.md** → 31M freelancer, tech-forward
- **KNOW_CaioFilho.md** → amplifier (shares with family members)

### Skills (SKILL/)
- **SKILL_ContentCreationWorkflow.md** → cascade process (this file)
- **SKILL_CopyRules.md** → tone + voice per channel
- **SKILL_ComponentSystem.md** → design token usage
- **SKILL_PhotoGuidelines.md** → visual guidelines per persona

### Agents (AGENT/)
- **AGENT_Strategy.md** → framework for theme → hook → message
- **AGENT_Tactic.md** → rules for each channel (blog, IG, podcast, etc.)
- **AGENT_Operational.md** → publishing schedule + metrics tracking
- **AGENT_Figma.md** → design system + visual specs

### Strategy & Editorial Calendar (POSTS/)
- **STRATEGY_Padrinho.md** → strategy source of truth: HOW we produce content (pillars, personas 80/20, weekly arc, tone laws, visual selection)
- **AGENDA_Padrinho.md** → WHAT to publish: weekly themes, briefs, status

---

## Prompts to Start a Session

### Quick Session (One Theme)
```
"Create content for Week 28: 'Mindfulness na Recuperação'. 
Persona: Rosa. 
Start with Strategy."
```

### Full Cascade (Theme → Publication)
```
"Full workflow: Week 28 mindfulness. 
Load context, run all 4 agents, output files ready to publish. 
Include design specs for Instagram carousel."
```

### Iterate on Existing
```
"Make the Instagram captions 30% shorter. 
Maintain hook. 
Rerun Tactic stage."
```

### Jump to Visuals
```
"I have the copy ready (attached). 
Jump to Figma Agent: specs for Instagram carousel + LinkedIn image."
```

---

## Output File Structure

Claude creates files in:
```
POSTS/
└── DDMMYYYY_TemaDoPost/
    ├── POST_Overview.md              ← Strategy output
    ├── BLOG_DDMMYYYY_Tema.md         ← Tactic: Blog
    ├── INSTA_Carousel.md              ← Tactic: slides (6–9) + legenda do feed
    ├── INSTA_Reshare.md               ← Tactic: reshare (também WhatsApp)
    ├── PNT_Script.md                  ← Tactic: Podcast
    ├── LINKEDIN_Captions.md           ← Tactic: LinkedIn
    │   (newsletter NÃO é por post — mensal em POSTS/Padrinho/NEWS/)
    ├── publishing-checklist.md        ← Operational output
    ├── calendar-updates.md            ← Operational: Calendar
    ├── design-brief.md                ← Figma: Design specs
    └── assets/images/
        ├── instagram-carousel.png     ← Figma: Carousel render
        ├── linkedin-image.png         ← Figma: LinkedIn render
        └── whatsapp-image.png         ← Figma: WhatsApp render
```

---

## Rules Claude Must Follow

### Always
- ✅ Load context (KNOW files) before generating
- ✅ Reference persona when writing copy
- ✅ Include CTA in every channel output
- ✅ Capa do carrossel (slide 01): dar **preferência a capas com FOTO** — `cover-c` / `cover-d` / `cover-e` (marcar 🖼 + `image-query` em inglês). `cover-a` / `cover-b` (tipográficas) só como exceção. Ver `SKILL/SKILL_ComponentIndex.md`.
- ✅ Track metrics targets (blog views, Instagram engagement, etc.)
- ✅ Use brand voice from KNOW_BrandPositioning
- ✅ Suggest iterations ("Want me to make the tone more vulnerable?")

### Never
- ❌ Skip Strategy stage (always start with POST_Overview.md)
- ❌ Use tone that contradicts the persona
- ❌ Forget CTAs on any channel
- ❌ Publish without user confirmation
- ❌ Ignore AGENDA_Padrinho deadlines
- ❌ Create visuals without design specs (delegate to Figma/Canva)

### When Unsure
- Ask clarifying questions: "Which persona? Which channel?"
- Reference the relevant AGENT file
- Offer 2–3 alternatives and ask user preference

---

## Example Full Session

```
USER: "Week 28 content. Theme: Mindfulness. Rosa persona. Go full workflow."

CLAUDE: ✓ Loaded context (KNOW_RosaEquilibrista, AGENDA_Padrinho)

**STRATEGY STAGE**
Theme: Mindfulness na Recuperação
Persona: Rosa Equilibrista (25F, Instagram-native)
Hook: "5 minutos de respiração pode mudar seu dia inteiro"
Tone: Conversational + vulnerable
[Creates POST_Overview.md]

**TACTIC STAGE**
[Generates BLOG, INSTAGRAM captions, PODCAST script, NEWSLETTER, WHATSAPP, LINKEDIN]
📝 1100-word blog post
📸 Instagram carousel captions (3 slides)
📲 Instagram reshare (also used for WhatsApp community)
🎙️ 8-minute podcast script
📧 Newsletter email (150 words)
💼 LinkedIn article (300 words)

**OPERATIONAL STAGE**
[Creates publishing-checklist.md + calendar-updates.md]
📅 Tuesday: Blog + Newsletter
📅 Wednesday: Instagram carousel
📅 Thursday: Podcast + LinkedIn
📅 Friday: WhatsApp (reshare Instagram post)
✅ Metrics targets: 50+ likes, 200+ blog views, 15%+ CTR

**FIGMA STAGE**
[Creates design-brief.md with visual specs]
🎨 Instagram carousel (6–9 × 1080x1440 px)
📊 LinkedIn (1200x628 px)
🎨 Design tokens: Azul primary (#2E5090), Calm green (#4CAF50)

READY. All files in: POSTS/280626_Mindfulness_Recuperacao/

Need adjustments before publishing? (Tone, length, CTA, persona, etc.)

USER: "Make blog 800 words instead of 1100. Keep the hook."

CLAUDE: ✓ Shortening blog to 800 words, keeping hook + 3 sections.
[Updates BLOG_280626_Mindfulness.md]

Done. Blog is now leaner. Still ready to publish?
```

---

## Final Notes

This workflow is **collaborative, iterative, and responsive** to user feedback. Claude is not a black box—it's a thinking partner who:

1. **Explains decisions** ("I chose Rosa because her persona fits Instagram carousel content")
2. **Offers alternatives** ("Want a more vulnerable tone, or more practical/tips-focused?")
3. **Adapts quickly** ("Redo this in 30 seconds based on your feedback")
4. **Tracks everything** (files, metrics, calendar, status)
5. **Knows when to delegate** ("Visuals need a design tool—I've given specs")

**The goal:** End-to-end marketing content in 1–2 hours, refined to perfection, ready to publish.

---

**Created:** 2026-06-14  
**By:** Claude Padrinho Bot  
**For:** Padrinhotech Marketing Team
