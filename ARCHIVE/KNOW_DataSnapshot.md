> ⚠️ **DEPRECATED — consolidado em `KNOW/Padrinho/KNOW_MarketIntel.md` (2026-06-27).** Referência histórica.

---
title: Data Snapshot — dados compartilhados das personas
version: 1.0
type: Knowledge
status: active
last_refreshed: 2026-06-14
next_review: 2026-07-31
---

# Data Snapshot — fonte única dos dados compartilhados

> Dados que as 4 personas (Rosa, Ana, Pedro, Caio) e o ICP citam em comum. Mantido **aqui uma vez** — os arquivos de persona apontam para cá em vez de repetir. Atualizar este arquivo a cada review; os arquivos de persona só carregam seus números específicos.

## Base de usuários (Supabase)
- **Total:** 268 users.
- **Distribuição por persona:** Rosa ~90 (maintain_sobriety 57 + identify_triggers 33) · Pedro ~70 (full_abstinence 49 + reduce_control 34) · Ana ~0 confirmados (campo `support_recipient` vazio) · Caio ~0 confirmados (`support_recipient` vazio).

## Corpus de conteúdo (Apify)
- **857 posts / 43 contas** de comunidades similares — base para os temas/formatos/tom citados em cada persona.

## Funil de aquisição (Clarity + Supabase)
- **Install → Account:** ~9% (antes do Google Sign-In) → **25%+** (após Google Sign-In, jun/2026). Baseline comum; cada persona detalha as etapas seguintes.

## Campanha Familiares (Meta)
- Lançada **jun/2026** (mira Ana + Caio). Validação ⏳ aguardando dados reais (`support_recipient` ainda vazio). IDs de campanha específicos: ver `KNOW/Padrinho/KNOW_CaioFilho.md` § Campanha.

## Insightfulpipe
- Integração de métricas — pending/parcial.

## Cadência de review
- **Próxima review:** 2026-07-31 (pós-Semanas 25–31 + performance da campanha Familiares).
