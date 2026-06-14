# Padrinho Marketing — 2026 H2

Repositório de estratégia e execução de marketing do Padrinho.app. Fonte da verdade para criação de conteúdo.

## O que mudou (2026 H2)

✂️ **Removido:** Toda infraestrutura de automação (scripts Node, Vercel, webhooks, APIs)  
✨ **Mantido:** Base de conhecimento, skills operacionais, agentes (racional), outputs  
🎯 **Foco:** Validar personas com dados reais + desenhar estratégia de conteúdo replicável

## Estrutura

```
padrinho-marketing/
├── KNOW/           ← Base de conhecimento (brand, market, personas, insights)
├── SKILL/          ← Habilidades operacionais (copy rules, components, guidelines)
├── AGENT/          ← Instruções dos 7 agentes (racional de workflow)
├── POSTS/          ← Posts gerados (output)
├── DATA/           ← Dados de entrada/referência
├── DOCS/           ← Documentação adicional
├── .gitignore
└── README.md       ← este arquivo
```

## 2026 H2 — Iniciativas Prioritárias

### 1️⃣ Validar Personas com Dados
- Supabase: usuários atuais (app_goal, role, demographics)
- Insightfulpipe: Instagram @padrinho.app (engagement, type de conteúdo)
- Insightfulpipe: Meta Ads + Google Ads (age, gender, location, conversions)
- Apify: @temgentequenaobebe + similares (temas, tom, engajamento)

**Output esperado:** Personas refinadas ou novas personas baseadas em dados

### 2️⃣ Estratégia de Conteúdo Replicável
Criar conteúdo **uma vez**, replicar em **múltiplos canais**:
1. Blog post (site)
2. Carrossel Instagram
3. Script + pauta para Podcast Pé na Trilha
4. E-mail Newsletter
5. WhatsApp Community

**Canais ativos:** Blog, Instagram, Podcast, E-mail, WhatsApp, Encontros presenciais (AA/NA)

### 3️⃣ Jornada do Cliente Baseada em Dados
Validar dúvidas/questionamentos reais de cada persona usando dados de:
- Clarity (UX behavior no app)
- Supabase (funnel, drop-offs)
- Instagram comments + DMs (perguntas autênticas)

## Públicos Alvo (2026 H2)

**Foco:** Dependentes e Familiares (descontinuados: clínicas, empresas, profissionais)

| Persona | Tipo | Status |
|---------|------|--------|
| Rosa    | Excessivo | A validar |
| Ana     | Excessivo | A validar |
| Pedro   | Excessivo | A validar |
| Caio    | Social & Moderado | Desprioritizado/descontinuado |

## Workflow Operacional (sem automação)

1. **Briefing** (Strategy Agent) — Define tema semanal baseado em:
   - Editorial pillars
   - Trend radar
   - Perguntas reais das personas

2. **Tática** (Tactic Agent) — Desmembra em 5-10 ideias de conteúdo

3. **Execução** (Manual ou Operational Agent) — Produz conteúdo replicável:
   - Blog post em markdown
   - Imagens Instagram (Figma ou manual)
   - Script podcast
   - Copy newsletter
   - Post WhatsApp

4. **Publicação** (Manual) — Publica em cada canal conforme calendário

## Agentes (Racional, sem automação)

- **Strategy Agent** — Analisa contexto, define tema semanal
- **Tactic Agent** — Desmembra tema em ideias de conteúdo
- **Operational Agent** — Produz conteúdo final
- **Market Agent** — Monitora tendências, concorrência
- **Insights Agent** — Processa dados de engagement
- **UserInsights Agent** — Extrai perguntas reais dos usuários
- **Figma Agent** — Gera/atualiza assets visuais

## Próximas Etapas

1. [ ] Coletar dados de Supabase, Insightfulpipe, Apify
2. [ ] Refinar/criar personas baseadas em dados
3. [ ] Mapeiar jornada do cliente por persona
4. [ ] Desenhar estratégia de conteúdo replicável
5. [ ] Atualizar KNOW/ com personas validadas
6. [ ] Atualizar SKILL/ com template de conteúdo replicável
7. [ ] Definir calendário de publicação 2026 H2

---

**Última atualização:** junho 2026  
**Responsável:** Bill (Padrinhotech)
