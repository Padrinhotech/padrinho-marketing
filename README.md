# Padrinho Marketing

Sistema de automação de conteúdo para o Instagram do Padrinho.app.
Human-in-the-loop em cada etapa. Nada é publicado sem aprovação.

---

## Como funciona

```
Prompt → Strategy → Tactic → Copy → Componente → Figma _QUEUE → Você aprova
```

O agente nunca constrói posts do zero. Ele copia um **componente aprovado**
da página `_COMPONENTS` no Figma e adapta o conteúdo dentro das regras.
Se nenhum componente existente serve, propõe um novo e aguarda aprovação.

---

## Estrutura do Repositório

```
padrinho-marketing/
│
├── CLAUDE.md                              ← Instruções master do agente
│
├── skills/
│   ├── strategy/
│   │   ├── brand-positioning.md           ← Quem somos, tom, posicionamento, concorrentes
│   │   └── market-context.md              ← Mercado BR, dados, ICP, personas
│   │
│   ├── tactic/
│   │   └── editorial-pillars.md           ← 5 pilares, 4 personas, formatos, arco semanal
│   │
│   └── operational/
│       ├── copy-rules.md                  ← Regras de copy, legenda, hashtags, CTAs
│       ├── component-system.md            ← Design system de posts: componentes, layers, regras
│       ├── figma-delivery.md              ← Como executar no Figma (copiar, adaptar, entregar)
│       └── visual-agent.md                ← Quando/como usar Imagen 3 para fotos/ilustrações
│
├── brand/
│   ├── figma-tokens.json                  ← Tokens completos: cores, tipografia, logos, formatos
│   ├── styleguide-file-id.txt             ← YtsMDsUi5SIF29NCOFs53x (read-only)
│   ├── references-file-id.txt             ← sBItPeNLyvT5EMyKLqQbRv (read-only nas Semanas)
│   └── staging-file-id.txt                ← sBItPeNLyvT5EMyKLqQbRv (escrita nas páginas _*)
│
├── references/
│   └── index.md                           ← Frame IDs dos posts de referência + mapeamento de componentes
│
└── outputs/
    └── sessions/                          ← Outputs por sessão (gitignored)
        └── YYYY-MM-DD/
            ├── strategy-brief.md
            ├── content-plan.md
            ├── copy.md
            └── component-choice.md
```

---

## Arquivos Figma

| Arquivo | ID | Uso |
|---|---|---|
| **Styleguide** | `YtsMDsUi5SIF29NCOFs53x` | Tokens de cor, tipografia, logos — leitura |
| **Referências + Staging** | `sBItPeNLyvT5EMyKLqQbRv` | Referências (Semanas), Componentes, Staging |

### Páginas em sBItPeNLyvT5EMyKLqQbRv

| Página | Uso | Quem escreve |
|---|---|---|
| `🌀 Semana 08–10` | Posts aprovados — referência visual canônica | Nunca (read-only) |
| `_COMPONENTS` | Design system de posts — templates pixel-perfect | Designer |
| `_QUEUE` | Drafts gerados pelo agente para revisão | Agente |
| `_APPROVED` | Posts aprovados para export | Humano move |
| `_ARCHIVE` | Histórico de versões revisadas | Humano move |
| `_BRIEFS` | Contexto de sessão em texto | Agente |

---

## Componentes Disponíveis

### COVERS
| Nome | Fundo | Melhor para |
|---|---|---|
| `cover/minimal-light` | Cream `#F9F8F3` | Acolhimento, Prova Social |
| `cover/dark-bold-left` | Navy `#002E49` | Desmascaramento, Reconhecimento |
| `cover/blumine-circle` | Horizon `#669AB7` | Reconhecimento (pergunta espelho) |
| `cover/photo-fullbleed` | Foto real | Desmascaramento, Reconhecimento |

### BLOCKS (corpo do carrossel)
| Nome | Fundo | Melhor para |
|---|---|---|
| `block/list-dark` | Navy `#002E49` | Listas com produto/Bill, benefícios |
| `block/list-light` | Cream `#F9F8F3` | Listas educacionais, cotidiano |
| `block/statement-dark` | Navy `#002E49` | Um dado forte + contraste |
| `block/minimal-statement-light` | Cream `#F9F8F3` | Reframing, analogias, explicações |

### DATA
| Nome | Fundo | Melhor para |
|---|---|---|
| `data/wave-number` | Cream → Horizon | Comparativos de consumo |
| `data/circle-grid` | Cream `#F9F8F3` | Percentuais visuais |
| `data/progress-bar` | Navy `#002E49` | Múltiplos percentuais |
| `data/before-after` | Cream `#F9F8F3` | Evolução temporal |

---

## As 4 Personas

| Persona | Perfil | Pilar |
|---|---|---|
| Rosa, A Equilibrista | 27a, designer, Porto Alegre | Reconhecimento |
| Ana, A Mãe Protetora | 40a, SP | Acolhimento |
| Pedro, O Autônomo Solitário | 31a, freelancer, Floripa | Empoderamento |
| Caio, O Filho Ressentido | 21a, estudante, SP | Desmascaramento |

---

## Regra de Ouro

> "Do not promote on the content ever — do it on the ads only."
>
> O conteúdo orgânico inspira e constrói relacionamento. Nunca vende.

---

## Setup (Claude Code)

### Pré-requisitos
```bash
npm install -g @anthropic-ai/claude-code
```

### Configurar Figma MCP
```json
// ~/.claude/settings.json
{
  "mcpServers": {
    "figma": {
      "type": "url",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

### Rodar
```bash
# Pipeline completo
claude "Post sobre [tema], persona [nome]"

# Modo rápido (brief já aprovado)
claude "Post sobre [tema]. Template: cover/minimal-light. Brief Semana 11."
```
