# 📐 MODEL — Templates-padrão da cascata Padrinho

Templates extraídos dos padrões reais em `POSTS/`. Cada arquivo `MODEL_<Nome>.md`
define o **shell do arquivo** (frontmatter + âncoras onde cada coisa entra), não o
conteúdo. O sistema/agentes decidem o que escrever e colocam no lugar certo.

Há dois tipos de modelo — ambos shells, diferindo só no nº de âncoras:
- **Planejamento** (`WEEK_Overview`, `POST_Overview`, `FACTS_Verified`, `AGENDA`) —
  mais seções/campos, pois orientam a cascata.
- **Conteúdo** (`BLOG`, `INSTA_Carousel`, `INSTA_Reshare`, `INSTA_ReelsScript`, `INSTA_ReelsQuestions`, `LINKEDIN`, `PODCAST`,
  `NEWS`) — só frontmatter + uma ou duas âncoras. Estrutura interna (slides, seções,
  beats, contagens) fica a cargo do sistema, não do modelo.

> **Como usar:** copie o MODEL para a pasta certa, remova o sufixo `MODEL_`,
> preencha o frontmatter e o conteúdo, e apague os comentários `<!-- ... -->`.
> O "porquê/como" canônico vive em `STRATEGY_<Marca>.md`, `KNOW/` e `SKILL/`.

## Mapa dos templates

| Template | Vira | Nível | Onde mora |
|----------|------|-------|-----------|
| `MODEL_WEEK_Overview.md` | `WEEK_Overview.md` | Semana | `POSTS/<Marca>/WEEKXX_.../` |
| `MODEL_FACTS_Verified.md` | `FACTS_Verified.md` | Semana | `POSTS/<Marca>/WEEKXX_.../` |
| `MODEL_POST_Overview.md` | `POST_Overview.md` | Post | `.../NN_<DIA>_<Nome>/` |
| `MODEL_BLOG.md` | `BLOG_<Nome>.md` | Post (pilar) | `.../NN_<DIA>_<Nome>/` |
| `MODEL_INSTA_Carousel.md` | `INSTA_Carousel.md` | Post | `.../NN_<DIA>_<Nome>/` |
| `MODEL_INSTA_Reshare.md` | `INSTA_Reshare.md` | Post (+ WhatsApp) | `.../NN_<DIA>_<Nome>/` |
| `MODEL_INSTA_ReelsScript.md` | `INSTA_ReelsScript.md` | Post (formato Reels) | `.../NN_<DIA>_<Nome>/` |
| `MODEL_INSTA_ReelsQuestions.md` | `INSTA_ReelsQuestions.md` | Post (todos) | `.../NN_<DIA>_<Nome>/` |
| `MODEL_PODCAST_Script.md` | `PODCAST_Script.md` | Post | `.../NN_<DIA>_<Nome>/` |
| `MODEL_LINKEDIN_Captions.md` | `LINKEDIN_Captions.md` | Post | `.../NN_<DIA>_<Nome>/` |
| `MODEL_NEWS.md` | `NEWS_<ddmmaa>_<Tema>.md` | Mensal/agregado | `POSTS/<Marca>/NEWS/<aaaa_mm_Mes>/` |
| `MODEL_AGENDA.md` | `AGENDA_<Marca>.md` | Marca (calendário) | `POSTS/<Marca>/` |
| `MODEL_STRATEGY.md` | `STRATEGY_<Marca>.md` | Marca (lógica) | `POSTS/<Marca>/` |
| `MODEL_INSTA_Analysis.md` | `INSTA_Analysis.md` | Marca (desempenho) | `POSTS/<Marca>/` |
| `MODEL_STORIES.md` | `STORIES_Suggestions.md` | Semana | `POSTS/<Marca>/WEEKXX_.../` |

> `INSTA_Analysis.md` é um documento único e vivo por marca (como `AGENDA` e `STRATEGY`): desempenho do Instagram semana a semana. O dado é puxado e escrito seguindo `SKILL/SKILL_Analysis.md`, e o Strategy o consulta antes de planejar a semana.

## A cascata (ordem de produção)

```
WEEK_Overview (Strategy/semana)
   └─ POST_Overview (Strategy/post)
        └─ BLOG  ← pilar: escreve-se PRIMEIRO; atomiza em ↓ (§5.1)
             ├─ INSTA_ReelsQuestions  (TODO post: 3 a 5 perguntas que renderiam um Reels)
             ├─ IG conforme o formato: Carousel usa INSTA_Carousel; Reels usa INSTA_ReelsScript
             ├─ INSTA_Reshare    (= também comunidade WhatsApp)
             ├─ LINKEDIN_Captions (ângulo founder)
             └─ PODCAST_Script
   FACTS_Verified (integridade/semana — gate antes de publicar)
NEWS — mensal/agregada, NÃO por post
```

> As regras de produção (contagem de slides, dimensões, estrutura do blog, tom por
> canal, etc.) **não vivem nos modelos de conteúdo** — vivem em `SKILL/` e `KNOW/`,
> e o sistema as aplica ao gerar. O modelo só garante o arquivo e seus campos.

## Invariantes do arquivo (o que o shell garante)

- **Localização e nome** conforme a coluna "Onde mora" acima.
- **Frontmatter** com os campos do tipo (persona, pilar, post, etc.).
- **Newsletter:** mensal/agregada em `POSTS/<Marca>/NEWS/` — NÃO por post.
- **Integridade:** `FACTS_Verified.md` é o gate — não publicar estatística não verificada.
