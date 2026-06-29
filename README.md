# Padrinho Marketing · 2026 H2

> **Para LLMs:** antes de qualquer workflow, leia [`CLAUDE.md`](./CLAUDE.md), que define a cascata de 4 agentes (Strategy, Tactic, Operational, Figma) e como executar a criação de conteúdo de ponta a ponta.

Repositório de estratégia e execução de marketing de conteúdo, hoje atendendo **duas marcas** do mesmo ecossistema:

- **Padrinho**: o app de apoio a pessoas em recuperação de alcoolismo e às suas famílias. Tem dois lados internos, o **lado paciente** (Bill e o app, com Rosa e Pedro) e o **lado família** (Programa Família em Reconstrução, ou FER, com Ana, Caio e Cláudia).
- **CTBM**: o Centro de Tratamento Bezerra de Menezes, em reposicionamento de percepção, de "o fim" para "um novo começo" (públicos Maria, João e Colaboradores).

As duas marcas se cruzam apenas no **Fluxo C** (co-produção de histórias reais), no eixo entre Padrinho e CTBM. O mapeamento canônico das semanas pareadas vive em `POSTS/Padrinho/AGENDA_Padrinho.md`.

## A cascata (workflow)

A unidade de planejamento é a **semana**, não o post. Claude executa quatro agentes em sequência:

1. **Strategy**: transforma o tema da AGENDA na estratégia da semana, criando `WEEK_Overview.md`, `STORIES_Suggestions.md` e um `POST_Overview.md` por post.
2. **Tactic**: escreve o **Blog-pilar** de cada post e o atomiza nos canais (IG Carousel, IG Reshare e WhatsApp, LinkedIn, Podcast), e preenche `FACTS_Verified.md`, o gate de integridade.
3. **Operational**: faz o QA dos textos, garante o gate de fatos, atualiza a AGENDA e versiona.
4. **Figma**: monta os carrosséis (1080×1440, capa com preferência por foto) na página da semana do arquivo Figma.

## Estrutura

```
padrinho-marketing/
├── CLAUDE.md          (instruções de workflow para LLMs — comece aqui)
├── KNOW/              base de conhecimento, por marca (KNOW/Padrinho, KNOW/CTBM):
│                      brand positioning, pilares editoriais, market intel, personas
├── SKILL/             habilidades operacionais (CopyRules, ComponentSystem/Index,
│                      ContentCreationWorkflow, FigmaDelivery, Documentation, ...)
├── AGENT/             os 4 agentes (Strategy, Tactic, Operational, Figma)
├── MODEL/             templates-shell de cada artefato (WEEK_Overview, POST_Overview,
│                      STORIES, BLOG, INSTA_Carousel/Reshare, LINKEDIN, PODCAST,
│                      NEWS, FACTS_Verified, AGENDA, STRATEGY)
├── POSTS/
│   ├── Padrinho/      STRATEGY_Padrinho, AGENDA_Padrinho, WEEKxx_.../, NEWS/
│   └── CTBM/          STRATEGY_CTBM, AGENDA_CTBM, WEEKxx_.../
└── ARCHIVE/           material descontinuado
```

Cada semana vive em `POSTS/<Marca>/WEEKxx_<ddmmaa>_<Tema>/`:

- `WEEK_Overview.md` e `STORIES_Suggestions.md` (Strategy) e `FACTS_Verified.md` (Tactic, o gate);
- uma pasta por post, `NN_DIA_AnguloPersona/`, com `POST_Overview.md` e os textos dos canais (BLOG, INSTA_Carousel, INSTA_Reshare, LINKEDIN_Captions, PODCAST_Script).

## Fontes de verdade (onde mora cada coisa)

- **Lógica estratégica** (north star, pilares, personas, arco da semana, atomização): `POSTS/<Marca>/STRATEGY_<Marca>.md`.
- **O que publicar e quando**: `POSTS/<Marca>/AGENDA_<Marca>.md`.
- **Leis de tom** e voz por canal: `KNOW/<Marca>/KNOW_*BrandPositioning.md`.
- **Seleção visual, componentes e capas**: `SKILL/SKILL_ComponentIndex.md` e `SKILL_ComponentSystem.md`.
- **A cascata e os checklists**: `AGENT/` e `SKILL/SKILL_ContentCreationWorkflow.md`.
- **Modelos de arquivo**: `MODEL/` (ver `MODEL/README.md`).

A estratégia guarda só a lógica. Tom, visual e workflow vivem em KNOW, SKILL e AGENT, e a estratégia aponta para essas fontes sem duplicá-las.

## Convenções

- Carrossel em 1080×1440 (4:5), com capa de preferência fotográfica.
- Cadência típica de 4 posts por semana, cada um com uma forma dominante diferente.
- Newsletter é mensal e agregada (em `POSTS/<Marca>/NEWS/`), nunca por post.
- Nunca vender no orgânico: o Bill (e o App Padrinho, no contexto da CTBM) é presença, nunca anúncio.

---

**Para dúvidas de execução, leia [`CLAUDE.md`](./CLAUDE.md) primeiro.**
