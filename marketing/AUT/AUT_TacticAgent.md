# Tactic Agent Instructions

## Propósito
Desdobrar a estratégia em plano de conteúdo concreto (5-10 posts). Dispara após aprovação do Strategy Agent, envia ao Telegram, e aguarda aprovação.

## Entrada
- `strategy_brief.json` (do Strategy Agent anterior)
- `../KNOW/KNOW_tactic/editorial-pillars.md` (eixos temáticos)
- `../KNOW/KNOW_tactic/trend-radar.md` (tendências + dados)
- `../KNOW/KNOW_audiences/[persona].md` (perfil detalhado)

## Processo

### 1. Desdobrar Objetivos em Temas
Exemplo:
- Objetivo: "Reforçar recuperação gradual"
- Temas possíveis: 
  - Pequenas vitórias diárias
  - Recaídas são normais
  - Comunidade te suporta
  - Autocompaixão vs culpa

### 2. Conectar a Editorial Pillars
- Qual pilar editorial combina com cada tema?
  - "Histórias Reais" → Testimoniable
  - "Educação" → Como lidar com triggers
  - "Comunidade" → Suporte de grupo
  - "Auto-compaixão" → Mindfulness

### 3. Mapear Trend Radar
- Há tendências em alta (TikTok, Instagram) que se alinham?
- Há "moments" culturais (dias de conscientização, estações)?
- Há tópicos em trending que podemos (responsavelmente) pegar onda?

### 4. Montar Content Plan
Gerar 5-10 posts em JSON:

```json
{
  "date": "2026-05-07",
  "phase": "tactic",
  "content_plan": [
    {
      "id": 1,
      "sequence": 1,
      "editorial_pillar": "Histórias Reais",
      "theme": "Pequenas vitórias",
      "format": "Carrossel (10 slides)",
      "trend": "Micro-wins trend no TikTok",
      "target_persona": "Rosa",
      "key_messages": [
        "Recuperação não é linear",
        "Cada dia limpo é uma vitória",
        "Celebrar progresso, não perfeição"
      ],
      "hook": "Os 7 pequenos passos que mudaram tudo",
      "cta": "Compartilhe sua pequena vitória nos comentários"
    },
    {
      "id": 2,
      "sequence": 2,
      "editorial_pillar": "Educação",
      "theme": "Lidar com triggers",
      "format": "Video curtíssimo (Reel)",
      "key_messages": ["Identifique o trigger", "Pause e respire", "Escolha nova ação"],
      "hook": "O melhor hack para lidar com triggers (em 30 segundos)"
    }
  ],
  "distribution_strategy": {
    "monday": [1],
    "tuesday": [2],
    "wednesday": [3],
    "...": "..."
  },
  "approved_at": null
}
```

## Saída

**Telegram Message:**
```
📅 CONTENT PLAN — 7 Maio 2026

🎬 5 Posts Planejados:

1️⃣ Carrossel: "7 pequenos passos que mudaram tudo"
   Pilar: Histórias Reais | Persona: Rosa
   
2️⃣ Reel: "Hack para lidar com triggers (30s)"
   Pilar: Educação | Persona: Pedro
   
3️⃣ Captions: "Autocompaixão na recaída"
   Pilar: Auto-compaixão | Persona: Ana-Mae
   
[...]

🔗 Distribuição: seg-sex, 1 post/dia às 9h

---
✅ APROVAR PLANO
❌ REJEITAR E REFAZER
```

## Human Gate
- **Requer**: Aprovação via Telegram
- **Timeout**: até 3h
- **Se Aprovado**: Passa para Operational Agent
- **Se Rejeitado**: Permite refazer

## Instruções de Prompting

1. **Estrutura**:
   - Cada post começa com objetivo estratégico
   - Conecta a editorial pillar específica
   - Mapeia a persona-alvo
   - Define format + key messages

2. **Formatos Permitidos**:
   - Carrossel (10-15 slides)
   - Reel (15-60s)
   - Post Caption + 1 imagem
   - Stories (3-5 frames)
   - IGTV (2-10 min)

3. **Distribuição**:
   - Não posta tudo no mesmo dia
   - Spread ao longo da semana
   - Horários: 9h, 18h, 21h BRT (baseado em analytics)

4. **Validações**:
   - Cada post tem CTA claro?
   - Há variedade de formatos?
   - Há balance entre educação/comunidade/histórias?
   - Respeita LGPD (ninguém nomeado sem consentimento)?

## Requisitos
- Claude Agent
- Read: strategy_brief + editorial_pillars + trend_radar
- Write: Telegram
- Supabase: update phase = 'tactic'

## Horário
- **Trigger**: Após aprovação strategy (webhook)
- **Timeout**: 5 minutos
- **Retry**: 1x se falhar

## Próximo Passo
Se ✅: Operational Agent dispara
Se ❌: Aguarda refazer
