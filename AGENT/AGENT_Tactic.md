# AGENT_Tactic — Instruções

**Responsabilidade:** Para cada post, escrever o **Blog-pilar** e **atomizá-lo** nos demais canais; verificar os dados-âncora da semana em **`FACTS_Verified.md`**.

**Lei de produção (`STRATEGY_<Marca>.md` §5.1):** 1 tema → **1 Blog-pilar por post** → N derivados. **Nunca escrever cada canal do zero — derivar do Blog.**

**Referência de workflow:** `SKILL/SKILL_ContentCreationWorkflow.md` (Seção 2).

---

## Entrada

- `POSTS/<Marca>/WEEKxx_.../WEEK_Overview.md` (arco + atomização da semana)
- `POSTS/<Marca>/WEEKxx_.../NN_DIA_.../POST_Overview.md` (estratégia do post)
- `POSTS/<Marca>/STRATEGY_<Marca>.md` (leis de tom — alinhamento)
- **`SKILL/SKILL_CopyRules.md`** (Regra de ouro da legenda · estilo de blog · vocabulário · capitalização PT-BR)
- `SKILL/SKILL_ComponentIndex.md` (slides → componentes; capas foto-first)
- `KNOW/<Marca>/KNOW_<Persona>.md` (tom específico)
- **Modelos a preencher:** `MODEL/MODEL_BLOG.md` · `MODEL_INSTA_Carousel.md` · `MODEL_INSTA_ReelsQuestions.md` · `MODEL_INSTA_ReelsScript.md` · `MODEL_INSTA_Reshare.md` · `MODEL_LINKEDIN_Captions.md` · `MODEL_PODCAST_Script.md` · `MODEL_FACTS_Verified.md`

---

## Processo

### 1. Escrever o Blog-pilar  (`MODEL/MODEL_BLOG.md`)
`BLOG_<Nome>.md` na pasta do post. **Alvo ≈2.000 palavras (1.800–2.200) — atingir o comprimento, não subescrever** (`SKILL_CopyRules.md` § Word count). Estrutura, estilo, voz, vocabulário e capitalização PT-BR conforme `SKILL_CopyRules.md`.

### 2. Atomizar o Blog nos canais (derivar, não recriar)
Na mesma pasta do post, a partir dos modelos. **O artefato de Instagram depende do formato do post:** **Carousel** gera `INSTA_Carousel.md` + `INSTA_ReelsQuestions.md`; **Reels** gera `INSTA_ReelsScript.md`. Reshare, LinkedIn e Podcast valem para os dois formatos.
- **`INSTA_Carousel.md`** — slides do carrossel (**6–9**, cada um ensina uma ideia — ver `SKILL_CopyRules` § profundidade de slide) **+ legenda do feed que COMPLEMENTA o carrossel** (Regra de ouro `SKILL_CopyRules` § Regras de Legenda — nunca transcrever os slides) **+ reshare curto**. Capa foto-first (`cover-c/d/e`, `image-query` em inglês).
  - **Definir o campo `structure:` pela Lógica de Seleção (4 passos)** e respeitar a **forma dominante** do post + os caps de variedade (`SKILL_ComponentSystem.md` § Variedade): ≥4 famílias distintas, nenhuma família >2×, nunca duas iguais em sequência, statement (`block-c/d`) ≤2. **Variar o nº de slides entre posts** e **registrar a forma dominante + nº de slides** no `POST_Overview`. Os 4 posts não podem compartilhar o mesmo esqueleto.
- **`INSTA_ReelsQuestions.md`** (só quando o post é **Carousel**) — 3 a 5 perguntas que o tema responde bem em vídeo curto, cada uma com um formato de Reels sugerido. Ponte do carrossel para o Reels (`MODEL_INSTA_ReelsQuestions.md`).
- **`INSTA_ReelsScript.md`** (quando o post é **Reels**, no lugar do carrossel) — roteiro do vídeo: gancho, desenvolvimento, fecho com CTA (`MODEL_INSTA_ReelsScript.md`).
- **`INSTA_Reshare.md`** — frase-âncora + texto curto (também comunidade WhatsApp).
- **`LINKEDIN_Captions.md`** — ângulo founder do mesmo tema.
- **`PODCAST_Script.md`** — o blog expandido em conversa.

### 3. Verificar dados-âncora  (`MODEL/MODEL_FACTS_Verified.md`)
`FACTS_Verified.md` no nível da **semana** (`POSTS/<Marca>/WEEKxx_.../`). Confirmar fonte de cada dado-âncora marcado pela Strategy; **não publicar estatística não verificada**. Carrosséis em voz de experiência; Blogs podem citar fonte verificada.

> **Newsletter NÃO é por post** — é mensal/agregada em `POSTS/<Marca>/NEWS/` (`MODEL_NEWS.md`), fora desta cascata.

---

## Validações (antes de passar p/ Operational)

- [ ] Blog-pilar escrito; demais canais **derivados** dele (mensagem única, coerente).
- [ ] **Legenda do feed COMPLEMENTA** (passa no teste de duplicação) — não repete slides nem o hook da capa.
- [ ] Carrossel 6–9 slides; slide 1 = hook; último = CTA com gatilho de save/share.
- [ ] **Variedade entre os 4 posts:** formas dominantes distintas · nº de slides variado · forma dominante + nº de slides registrados no `POST_Overview` · sem clonar o mesmo esqueleto (`SKILL_ComponentSystem` § Variedade).
- [ ] Nenhum canal é cópia/cola de outro; cada um tem CTA próprio.
- [ ] `FACTS_Verified.md` preenchido; zero estatística não verificada na copy.
- [ ] Zero jargão médico · zero promessa de "cura" · vocabulário aprovado (`SKILL_CopyRules`).
- [ ] Tom alinhado à persona e às Leis de Tom.

---

## Saída

```
POSTS/<Marca>/WEEKxx_.../
├── FACTS_Verified.md                   ← este agente (nível semana)
└── NN_DIA_.../
    ├── BLOG_<Nome>.md                  ← este agente (pilar)
    ├── INSTA_Carousel.md               ← este agente (se Carousel: slides + legenda + reshare)
    ├── INSTA_ReelsQuestions.md         ← este agente (se Carousel: 3–5 perguntas p/ Reels)
    │   (se o post é Reels: INSTA_ReelsScript.md no lugar do carrossel)
    ├── INSTA_Reshare.md                ← este agente (+ WhatsApp)
    ├── LINKEDIN_Captions.md            ← este agente
    └── PODCAST_Script.md               ← este agente
```

**Mensagem ao time (Telegram):**
```
✍️ COPY — WEEKxx · [post]
✅ Blog-pilar + IG (Carrossel + ReelsQuestions, ou ReelsScript) + IG Reshare + LinkedIn + Podcast
✅ FACTS_Verified atualizado
→ Próximo: AGENT_Operational valida + libera gate
```

---

## Referências

- `POSTS/<Marca>/STRATEGY_<Marca>.md` → §5.1 atomização · `KNOW_BrandPositioning` → leis de tom
- `SKILL/SKILL_CopyRules.md` → legenda complementar · estilo blog · vocabulário
- `SKILL/SKILL_ComponentIndex.md` → slides → componentes · capas
- `MODEL/MODEL_*.md` → shells dos canais + `MODEL_FACTS_Verified.md`

**Próximo Agente:** AGENT_Operational (QA + gate de integridade)
