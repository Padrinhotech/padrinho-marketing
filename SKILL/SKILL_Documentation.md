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
├── DATA/                ← Dados de referência (Supabase, Insightfulpipe, Apify exports)
├── DOCS/                ← Documentação geral (deployment, análises)
├── .gitignore
└── README.md
```

---

## 2. POSTS/ — Estrutura de Conteúdo em Cascata

### Princípio
Cada "post" é criado UMA VEZ em camadas: Texto → Imagem → Vídeo.

Cada camada alimenta múltiplos canais sem duplicação desnecessária.

### Pasta Principal: `DDMMYYYY_Tema`

**Naming:** `DDMMYYYY_TemaEmMinusculaSemEspacos`

Exemplos:
- `14062026_SobriedadeGlowUp`
- `21062026_AalcolismoFeminino`
- `28062026_MudancaDeEstilo`

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

| Arquivo | Criado Para | Comprimento | Formato |
|---------|-------------|------------|----------|
| `BLOG_PostTitle.md` | Site + SEO | 1.5–2k palavras | Markdown |
| `INSTA_Captions.md` | Copy do carousel | ~100 chars/slide | Plain text, 1 caption por linha |
| `PNT_Script.md` | Pé na Trilha | 5–8 min | Markdown (bold/italic para ênfase) |
| `WHATSAPP_Reshare.md` | Community | 50–150 chars | Plain text |
| `LINKEDIN_Captions.md` | Gabriel/Fabio | 150–300 chars | Plain text |

**Nota sobre Newsletters:** O conteúdo de newsletter não é gerado por post. O conteúdo mensal é agrupado na pasta `POSTS/NEWS/YYYY_MM_Mes`. O arquivo `NEWS_...md` será usado no futuro para a newsletter mensal.

**Regra:** Cada arquivo é independente (não referencia outros), mas reutiliza insights/estrutura proposta no POST_Overview.

#### 3. Pasta `assets/images/` (Camada 2)
**Criados por:** AGENT_Figma  
**Dependência:** Existem APENAS após Camada 1 estar pronta

| Arquivo | Fonte | Formato |
|---------|-------|----------|
| `instagram-carousel.png` | Figma (carousel node) | PNG (1080x1350) |
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
POSTS/
├── AGENDA_Padrinho.md
│
└── 14062026_SobriedadeGlowUp/
    ├── POST_Overview.md
    ├── BLOG_PostTitle.md         ← Criado por AGENT_Tactic
    ├── INSTA_Captions.md          ← Criado por AGENT_Tactic
    ├── PNT_Script.md              ← Criado por AGENT_Tactic
    ├── WHATSAPP_Reshare.md               ← Criado por AGENT_Tactic
    ├── LINKEDIN_Captions.md               ← Criado por AGENT_Tactic
    └── assets/
        └── images/
            ├── instagram-carousel.png
            ├── whatsapp-image.png
            └── linkedin-image.png
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
- `BLOG_` — Blog post
- `INSTA_` — Instagram captions
- `PNT_` — Pé na Trilha script
- `WHATSAPP_` — WhatsApp reshare
- `LINKEDIN_` — LinkedIn copy
- `POST_` — Post overview/guia
- `NEWS_` — Newsletter (fica em POSTS/NEWS, não na pasta do post)

---

## 4. AGENDA_Padrinho.md — Calendário Editorial

**Localização:** `POSTS/AGENDA_Padrinho.md`  
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
1. AGENT_Strategy cria POST_Overview.md
   ↓
2. AGENT_Tactic cria 6 arquivos de TEXTO
   ↓
3. AGENT_Operational valida + finaliza (QA)
   ↓
4. AGENT_Figma cria IMAGENS (referencia POST_Overview + INSTA_Captions.md)
   ↓
5. Publicação manual em calendário
```

### Checklist por Etapa

**Step 1 — Strategy:**
- [ ] POST_Overview.md criado
- [ ] Persona clara
- [ ] Pillar definido

**Step 2 — Tactic:**
- [ ] 5 arquivos de texto criados (sem edição final)
- [ ] Estrutura segue POST_Overview
- [ ] Tons variam por canal

**Step 3 — Operational:**
- [ ] Cada arquivo tem gramática OK
- [ ] CTAs claros
- [ ] Formatação consistente
- [ ] Arquivos prontos em POSTS/DDMMYYYY_Tema/

**Step 4 — Figma:**
- [ ] Imagens criadas em Figma
- [ ] Captions/texto alinhado com INSTA_Captions.md
- [ ] Imagens exportadas para assets/images/
- [ ] Refs visuais no POST_Overview confirmadas

**Step 5 — Publicação:**
- [ ] Conteúdo agendado/publicado conforme AGENDA
- [ ] Links ao blog/newsletter funcionam
- [ ] Imagens aparecem nos stories do Telegram (QA final)

---

## 7. Organização por Tipo de Conteúdo

### Por Canal (Sem Duplicação)

**Blog:**
- Arquivo: `BLOG_DDMMYYYY_Tema.md`
- Comprimento: Completo (1.5–2k palavras)
- SEO: H1, H2, palavras-chave, links internos
- CTA: Botão ou parágrafo final

**Newsletter:**
- Arquivo: `NEWS_DDMMYYYY_Tema.md`
- Comprimento: ~300–400 palavras
- Tom: Pessoal, quente, menos formal
- CTA: Convite para visitar blog OU call-to-action direto

**Instagram:**
- Arquivo: `INSTA_Captions.md` (copy)
- Imagem: `assets/images/instagram-carousel.png`
- Estrutura: 3-5 slides (cada um tem 1 caption)
- CTA: Adesivo interativo OU "link na bio"

**Podcast:**
- Arquivo: `PNT_Script.md`
- Duração: 5–8 min (read time ~ 1.200–1.600 palavras)
- Estrutura: Intro + 2-3 pontos + Closing
- Tom: Conversacional, direto

**WhatsApp:**
- Arquivo: `WHATSAPP_Reshare.md`
- Comprimento: 50–150 caracteres
- Tom: Ultra-casual, enquete/pergunta
- Imagem: `assets/images/whatsapp-image.png` (opcional)

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
3. Usar Apify data (competitor posts) em KNOW_TrendRadar.md

---

**Última atualização:** junho 2026  
**Responsável:** Bill (Padrinhotech)  
**Consultado por:** Todos os Agents + Humans
