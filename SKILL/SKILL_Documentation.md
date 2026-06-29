# SKILL_Documentation

**Objetivo:** Documentar padrões de organização, nomeação e estrutura de arquivos em `padrinho-marketing` para evitar confusão e garantir que todos (humans + agents) entendam como estruturar conteúdo.

---

## 1. Estrutura Geral do Repo

```
padrinho-marketing/
├── KNOW/                ← Base de conhecimento (brand, personas, market)
├── SKILL/               ← Habilidades operacionais (guias, padrões)
├── AGENT/               ← Instruções dos agentes (workflow)
├── POSTS/               ← Conteúdo gerado (organizado por data + tema)
├── DOCS/                ← Documentação geral (deployment, análises)
├── .gitignore
└── README.md
```

---

## 2. POSTS/ — Estrutura de Conteúdo em Cascata

### Princípio
Cada "post" é criado UMA VEZ em camadas: Texto → Imagem → Vídeo.

Cada camada alimenta múltiplos canais sem duplicação desnecessária.

### Estrutura: semana → post

A unidade é a **semana**. Cada semana é uma pasta com os posts dentro:

```
POSTS/<Marca>/WEEKxx_DDMMYY_Tema/        ← semana
└── NN_DIA_AnguloPersona/                ← post
```

Exemplos:
- `WEEK03_010726_PaisQueBebem/01_MONDAY_AnaFilhoLembra/`
- `WEEK02_240626_BeberNaoEhRegra/03_SATURDAY_PedroAlcoolCerebro/`

> Cada agente preenche um shell de `MODEL/` — ver `MODEL/README.md`.

### Arquivos Dentro da Pasta

#### 1. POST_Overview.md (Estratégia)
**Criado por:** AGENT_Strategy  
**Propósito:** Guia único e de referência para o post

**Contém:**
- Tema, pillar editorial, persona alvo
- Perguntas que o post responde
- Estrutura esperada para cada canal
- Refs visuais (não imagens, apenas descrição)

**NÃO contém:** Copies específicas por canal (essas ficam em arquivos separados)

#### 2. Arquivos de Texto (Camada 1)
**Criados por:** AGENT_Tactic  
**Validados por:** AGENT_Operational

> **Esta tabela é a FONTE CANÔNICA** de nomes de arquivo, contagem de slides e dimensões. `SKILL_ContentCreationWorkflow.md` e `claude.md` referenciam daqui — não redefinir nomes em outro lugar.

| Arquivo | Criado Para | Comprimento | Formato |
|---------|-------------|------------|----------|
| `BLOG_<Nome>.md` | Site + SEO | **≈2.000 palavras (1.800–2.200)** — ver `SKILL_CopyRules` | Markdown |
| `INSTA_Carousel.md` | Slides do carrossel (**6–9 slides**) + legenda do feed | slides ~100–150 chars; legenda ≤2.200 | Markdown |
| `INSTA_Reshare.md` | Reshare / WhatsApp community | 50–150 chars | Plain text |
| `PODCAST_Script.md` | Pé na Trilha | 5–8 min | Markdown (bold/italic para ênfase) |
| `LINKEDIN_Captions.md` | Gabriel/Fabio | 150–300 chars | Plain text |

> **Nível semana** (na pasta `WEEKxx_.../`, não no post): `WEEK_Overview.md` + `STORIES_Suggestions.md` (Strategy) e `FACTS_Verified.md` (Tactic — gate de integridade).

**Nota sobre Newsletters:** O conteúdo de newsletter não é gerado por post. O conteúdo mensal é agrupado na pasta `POSTS/Padrinho/NEWS/YYYY_MM_Mes`. O arquivo `NEWS_...md` será usado no futuro para a newsletter mensal.

**Regra:** Cada arquivo é independente (não referencia outros), mas reutiliza insights/estrutura proposta no POST_Overview.

#### 3. Pasta `assets/images/` (Camada 2)
**Criados por:** AGENT_Figma  
**Dependência:** Existem APENAS após Camada 1 estar pronta

| Arquivo | Fonte | Formato |
|---------|-------|----------|
| `instagram-carousel.png` | Figma (carousel node) | PNG (**1080x1440**, 4:5) |
| `whatsapp-image.png` | Figma (adaptação) | PNG (540x675 ou quadrado) |
| `linkedin-image.png` | Figma (carousel OU novo) | PNG (1200x628) |

**Nomeação:** `[canal]-[descrição].png` (minúsculas, sem espaços)

#### 4. Pasta `assets/audio/` (Camada 3 — Futuro)
- `podcast-recording.mp3` (gravação futura da pauta)

#### 5. Pasta `assets/video/` (Camada 3 — Futuro)
- `instagram-reels-script.md` (script criado agora)
- `tiktok-script.md` (script criado agora)

### Exemplo Real

```
POSTS/Padrinho/
├── AGENDA_Padrinho.md · STRATEGY_Padrinho.md
└── WEEK03_010726_PaisQueBebem/
    ├── WEEK_Overview.md          ← AGENT_Strategy
    ├── STORIES_Suggestions.md    ← AGENT_Strategy
    ├── FACTS_Verified.md         ← AGENT_Tactic (gate)
    └── 01_MONDAY_AnaFilhoLembra/
        ├── POST_Overview.md      ← AGENT_Strategy
        ├── BLOG_<Nome>.md        ← AGENT_Tactic (pilar)
        ├── INSTA_Carousel.md     ← slides (6–9) + legenda do feed
        ├── INSTA_Reshare.md      ← reshare / WhatsApp community
        ├── PODCAST_Script.md     ← Pé na Trilha
        ├── LINKEDIN_Captions.md  ← LinkedIn
        └── assets/images/instagram-carousel.png
```

---

## 3. Nomeação de Arquivos

### Data
**Formato:** `DDMMYYYY` (sempre 8 dígitos)

Exemplo: `14062026` = 14 de junho de 2026

### Tema
**Formato:** CamelCase, sem espaços, descritivo

✅ Correto:
- `SobriedadeGlowUp`
- `AlcolismoFeminino`
- `MudancaDeEstilo`

❌ Incorreto:
- `sobriedade glow up`
- `tema1`
- `novo-post`

### Tipo de Arquivo
**Prefixo padrão:**
- `WEEK_` — Overview da semana (nível semana)
- `FACTS_` — Verificação de dados (nível semana)
- `POST_` — Post overview/guia
- `BLOG_` — Blog post (pilar)
- `INSTA_Carousel` — slides do carrossel + legenda do feed
- `INSTA_Reshare` — reshare / WhatsApp community
- `PODCAST_` — Pé na Trilha script
- `LINKEDIN_` — LinkedIn copy
- `NEWS_` — Newsletter (mensal, em POSTS/<Marca>/NEWS, não na pasta do post)

---

## 4. AGENDA_Padrinho.md — Calendário Editorial

**Localização:** `POSTS/Padrinho/AGENDA_Padrinho.md`  
**Criado/Atualizado por:** AGENT_Tactic (consulta para próximos temas)  
**Propósito:** Tabela de temas semanais para H2 2026

### Formato

```markdown
# AGENDA Padrinho — 2026 H2

| Data | Tema | Pillar | Persona | Status |
|------|------|--------|---------|--------|
| 14/06 | Sobriedade Glow Up | Empoderamento | Rosa | ✅ PRONTO |
| 21/06 | Alcoolismo Feminino | Desmascaramento | Ana | 🔄 EM PROGRESSO |
| 28/06 | Mudança de Estilo | Acolhimento | Pedro | ⏳ PLANEJADO |
| 05/07 | TBD | TBD | TBD | ⏳ PLANEJADO |
```

**Colunas:**
- **Data:** DDMMYYYY (formato brasileiro DD/MM)
- **Tema:** Título descritivo
- **Pillar:** Pilar editorial (KNOW_EditorialPillars.md)
- **Persona:** Rosa | Ana | Pedro | Familiar
- **Status:** ✅ PRONTO | 🔄 EM PROGRESSO | ⏳ PLANEJADO | 🚫 DESCARTADO

---

## 5. Convenções de Escrita

### Markdown (Blog, Newsletter, Scripts)
- **Títulos:** `# H1` para título do post, `## H2` para seções
- **Ênfase:** `**bold**` para palavras-chave, `*itálico*` para suavidade
- **Listas:** Use `-` para unordered, números para ordered
- **Links:** `[texto](url)` (absolutos sempre)
- **Quebras:** Use `---` para separadores visuais

### Plain Text (Instagram, WhatsApp, LinkedIn)
- **Sem markdown** — apenas texto e emojis
- **Máximo de linhas:** 3-4 (mobile-first)
- **CTA último:** Sempre termina com call-to-action ou emoji

### Formato de Arquivo
- **Encoding:** UTF-8 (sempre)
- **Line breaks:** LF (não CRLF)
- **Final de arquivo:** Newline ao final

---

## 6. Fluxo de Criação vs Arquivo

### Passo a Passo

```
1. AGENT_Strategy → WEEK_Overview.md + STORIES_Suggestions.md + 1 POST_Overview.md por post
   ↓
2. AGENT_Tactic → Blog-pilar + atomização (IG Carousel/Reshare, LinkedIn, Podcast) + FACTS_Verified.md
   ↓
3. AGENT_Operational → QA + gate FACTS_Verified + atualiza AGENDA + commit
   ↓
4. AGENT_Figma → carrossel (capa foto, 1080×1440) em assets/images/
   ↓
5. Publicação manual conforme AGENDA
```

### Checklist por Etapa

**Step 1 — Strategy:**
- [ ] WEEK_Overview.md + STORIES_Suggestions.md + 1 POST_Overview.md por post (arco Hook→Profundidade→Resolução)
- [ ] Persona única e pillar por post · dados-âncora marcados (verificar)

**Step 2 — Tactic:**
- [ ] Blog-pilar (≈2.000 palavras) + canais derivados dele
- [ ] Legenda complementa o carrossel · FACTS_Verified.md preenchido

**Step 3 — Operational:**
- [ ] Gate FACTS_Verified OK (zero stat não verificada)
- [ ] QA contra MODEL/ + SKILL_CopyRules · AGENDA atualizada · commit

**Step 4 — Figma:**
- [ ] Carrossel montado com texto exato de INSTA_Carousel.md
- [ ] Capa foto-first · exportado 1080×1440 em assets/images/

**Step 5 — Publicação:**
- [ ] Publicado conforme AGENDA · links funcionam

---

## 7. Organização por Tipo de Conteúdo

### Por Canal (Sem Duplicação)

**Blog (pilar):**
- Arquivo: `BLOG_<Nome>.md`
- Comprimento: **≈2.000 palavras (1.800–2.200)** — atingir o alvo, não subescrever (`SKILL_CopyRules`)
- SEO: H1, H2, palavras-chave, links internos
- CTA: Parágrafo final (suave, nunca venda)

**Instagram:**
- Arquivo: `INSTA_Carousel.md` (slides + legenda do feed)
- Imagem: `assets/images/instagram-carousel.png`
- Estrutura: 6–9 slides + legenda que **complementa** o carrossel
- CTA: Adesivo interativo OU save/share

**Podcast:**
- Arquivo: `PODCAST_Script.md`
- Duração: 5–8 min (read time ~ 1.200–1.600 palavras)
- Estrutura: Intro + 2-3 pontos + Closing
- Tom: Conversacional, direto

**WhatsApp / Reshare:**
- Arquivo: `INSTA_Reshare.md` (mesmo arquivo serve Stories + comunidade WhatsApp)
- Comprimento: 50–150 caracteres
- Tom: Ultra-casual, frase-âncora + CTA relacional

**Newsletter (mensal, fora da pasta do post):**
- Arquivo: `POSTS/<Marca>/NEWS/YYYY_MM_Mes/NEWS_DDMMYY_Tema.md`
- Comprimento: ~300–400 palavras · Tom pessoal/quente

**LinkedIn:**
- Arquivo: `LINKEDIN_Captions.md`
- Autor: Gabriel OU Fabio (profiles pessoais)
- Comprimento: 150–300 caracteres
- Tom: Profissional/pessoal (conforme perfil)
- Imagem: `assets/images/linkedin-image.png` (reutiliza carousel)

---

## 8. Exemplo de POST_Overview.md Completo

Ver `SKILL_ContentCreationWorkflow.md` → Seção 4 (Template).

---

## 9. Erros Comuns a Evitar

❌ **Criar múltiplos arquivos com o mesmo conteúdo**
- Se blog e newsletter são iguais, usa o mesmo (ou referencia via link)

❌ **Colocar imagens no markdown do Blog**
- Conteúdo é responsabilidade do Operational
- Imagens são responsabilidade do Figma

❌ **Nomes de pasta com espaços ou caracteres especiais**
- Use sempre CamelCase: `14062026_SobriedadeGlowUp`

❌ **Instagram captions em um arquivo gigante**
- 1 caption por linha, separadas claramente

❌ **Esquecer de validação antes de visual**
- Operational precisa confirmar texto antes de Figma começar

---

## 10. Futuro — Expansão

### Quando Adicionar Vídeo
1. Criar `assets/video/instagram-reels-script.md`
2. Criar `assets/video/tiktok-script.md`
3. (Futuramente) Gravar vídeos conforme scripts

### Quando Integrar Dados
1. Referenciar dados de Supabase em KNOW_UserInsights.md
2. Usar Clarity insights em AGENT_UserInsights para perguntas reais
3. Usar Apify data (competitor posts) em KNOW_MarketIntel.md

---

**Última atualização:** junho 2026  
**Responsável:** Bill (Padrinhotech)  
**Consultado por:** Todos os Agents + Humans
