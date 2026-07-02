# SKILL_ContentCreationWorkflow

**Objetivo:** Documentar a cascata de criação de conteúdo (semana → posts → canais) que alimenta todos os canais.

**Fonte da verdade para:** Strategy → Tactic → Operational → Figma. A **lógica** (arco, pilares, personas) vive em `STRATEGY_<Marca>.md`; os **shells dos arquivos** vivem em `MODEL/`; as **regras** vivem em `SKILL/` e `KNOW/`.

---

## 1. Unidade de planejamento = a SEMANA

```
1 TEMA da semana
 └── N ÂNGULOS (1 por post) · dias do arco: Dom · Seg · Qua · Sex
      └── 2 vozes (ex.: 2 Rosa + 2 Pedro / 2 Ana + 2 Caio)
           └── por post: 1 Blog-pilar, atomizado em IG (INSTA_ReelsQuestions sempre; Carousel usa INSTA_Carousel, Reels usa INSTA_ReelsScript) · INSTA_Reshare/WhatsApp · LinkedIn · Podcast
```

**Arco emocional:** **Hook** (Dom/Seg) → **Profundidade** (Qua) → **Resolução** (Sex). Ver `STRATEGY_<Marca>.md` §4.

**Atomização (§5.1):** todo post nasce como **1 Blog-pilar** e é atomizado nos demais formatos. Nunca se escreve cada canal do zero.

> **Newsletter NÃO é por post** — mensal/agregada em `POSTS/<Marca>/NEWS/` (`MODEL_NEWS.md`).

---

## 2. Workflow por Agente

### AGENT_Strategy
Cria **`WEEK_Overview.md`** + **`STORIES_Suggestions.md`** (nível semana) + **1 `POST_Overview.md` por post**.
Modelos: `MODEL/MODEL_WEEK_Overview.md` · `MODEL/MODEL_STORIES.md` · `MODEL/MODEL_POST_Overview.md`.
Marca os **dados-âncora a verificar**. Não cria copy de canal.

### AGENT_Tactic
Escreve o **Blog-pilar** e o **atomiza** nos canais; preenche **`FACTS_Verified.md`** (gate de integridade da semana).
Modelos: `MODEL_BLOG` · `MODEL_INSTA_Carousel` · `MODEL_INSTA_ReelsQuestions` · `MODEL_INSTA_ReelsScript` · `MODEL_INSTA_Reshare` · `MODEL_LINKEDIN_Captions` · `MODEL_PODCAST_Script` · `MODEL_FACTS_Verified`.
Todo post gera `INSTA_ReelsQuestions`; o artefato principal de IG depende do **formato do post**: Carousel gera `INSTA_Carousel`, Reels gera `INSTA_ReelsScript`.
Regras de copy: `SKILL_CopyRules.md` (legenda complementa o carrossel · estilo blog · vocabulário). Não cria imagens.

### AGENT_Operational
QA dos textos · **faz cumprir o gate `FACTS_Verified`** (zero stat não verificada) · atualiza `AGENDA` · commit. Não cria imagens.

### AGENT_Figma
Monta e exporta o **carrossel** (capas foto-first `cover / photo-fullbleed-a/b/c`, **1080×1440**) a partir de `POST_Overview` + `INSTA_Carousel`.
Segue: `SKILL_ComponentIndex` · `SKILL_ComponentSystem` · `SKILL_PhotoGuidelines` · `SKILL_FigmaDelivery`.

---

## 3. Estrutura de pastas

```
POSTS/<Marca>/
├── STRATEGY_<Marca>.md · AGENDA_<Marca>.md
├── NEWS/YYYY_MM_Mes/NEWS_DDMMYY_Tema.md          ← mensal (MODEL_NEWS)
└── WEEKxx_DDMMYY_Tema/
    ├── WEEK_Overview.md                           ← Strategy (MODEL_WEEK_Overview)
    ├── STORIES_Suggestions.md                     ← Strategy (MODEL_STORIES)
    ├── FACTS_Verified.md                          ← Tactic   (MODEL_FACTS_Verified)
    └── NN_DIA_AnguloPersona/
        ├── POST_Overview.md                       ← Strategy (MODEL_POST_Overview)
        ├── BLOG_<Nome>.md                         ← Tactic   (MODEL_BLOG, pilar)
        ├── INSTA_Carousel.md                      ← Tactic   (se Carousel: slides + legenda + reshare)
        ├── INSTA_ReelsQuestions.md                ← Tactic   (todo post: 3–5 perguntas p/ Reels)
        │   # se o post é Reels: INSTA_ReelsScript.md no lugar do carrossel
        ├── INSTA_Reshare.md                       ← Tactic   (+ WhatsApp)
        ├── LINKEDIN_Captions.md                   ← Tactic
        ├── PODCAST_Script.md                      ← Tactic
        └── CAROUSEL_Slides/                        ← Figma (1080×1440)
            ├── 01.png                              ← um arquivo por slide, só o número
            └── ...NN.png
```

---

## 4. Modelos (`MODEL/`)

Cada deliverable tem um shell em `MODEL/MODEL_<Nome>.md` — o agente copia, remove o prefixo `MODEL_`, preenche e apaga os comentários. Índice + invariantes em `MODEL/README.md`.

---

## 5. Specs canônicas (não redefinir aqui)

| Item | Valor | Fonte canônica |
|------|-------|----------------|
| Slides do carrossel | **6–9** | `SKILL_Documentation.md` |
| Dimensão do carrossel | **1080×1440** (4:5) | `SKILL_Documentation.md` |
| Capa | foto-first (`cover / photo-fullbleed-a/b/c`) | `SKILL_ComponentIndex.md` · `SKILL_ComponentSystem.md` |
| Variedade de componentes | cada post = forma dominante diferente + nº de slides variado (registrada em cada POST_Overview) | `SKILL_ComponentSystem.md` § Variedade |
| Página Figma | `🌀 Semana NN` (não `_QUEUE`) · slides 0px · 400px entre carrosséis | `SKILL_FigmaDelivery.md` |
| Legenda do feed | complementa, não duplica os slides | `SKILL_CopyRules.md` § Regras de Legenda |
| Comprimento do Blog | **≈2.000 palavras (1.800–2.200)** — atingir o alvo | `SKILL_CopyRules.md` § Word count |
| Hashtags | ≤5, no 1º comentário | `SKILL_CopyRules.md` |
| Newsletter | mensal/agregada em `NEWS/` | `SKILL_Documentation.md` |
| Lado (paciente/família) | tag em WEEK/POST; família = Programa Família em Reconstrução (FER), interno ao Padrinho (não marca separada) | `STRATEGY_<Marca>.md` §3.1 |

---

## 6. Checklist por agente

**Strategy:** WEEK_Overview + N POST_Overview · arco claro · 1 persona/pilar por post · dados-âncora marcados (verificar) · capa foto-first.
**Tactic:** Blog-pilar + canais derivados · legenda complementa (teste de duplicação) · 6–9 slides · **variedade de componentes entre posts** · FACTS_Verified preenchido · zero jargão médico/"cura".
**Operational:** gate FACTS_Verified OK · QA contra MODEL/SKILL_CopyRules · AGENDA atualizada · commit.
**Figma:** página `🌀 Semana NN` · slides 0px / 400px entre carrosséis · variedade entre posts · capa foto · textos exatos · 1080×1440, um PNG por slide em `CAROUSEL_Slides/` nomeado só com o número (`01.png`...`NN.png`).

---

**Última atualização:** 2026-06-29 · **Modelo:** week-based (v3)
