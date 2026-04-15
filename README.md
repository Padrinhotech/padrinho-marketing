# Padrinho Marketing

Sistema de automação de conteúdo para o Instagram do Padrinho.app.
Human-in-the-loop em cada etapa. Nada é publicado sem aprovação.

---

## Como funciona

```
Prompt → Strategy → Tactic → Copy → Componente → Figma _QUEUE → Você aprova
```

O agente nunca constrói posts do zero. Ele copia um **componente aprovado**
da página `_COMPONENTS` no Figma, adapta o conteúdo dentro das regras e
entrega para revisão humana.

---

## Estrutura do Repositório

```
padrinho-marketing/
│
├── CLAUDE.md                                    ← Instruções master do agente
│
├── brand/
│   ├── padrinho-product.md                      ← Produto, funcionalidades, ecossistema
│   ├── figma-tokens.json                        ← Tokens: cores, tipografia, logos, formatos
│   ├── styleguide-file-id.txt                   ← YtsMDsUi5SIF29NCOFs53x (read-only)
│   ├── references-file-id.txt                   ← sBItPeNLyvT5EMyKLqQbRv
│   └── staging-file-id.txt                      ← sBItPeNLyvT5EMyKLqQbRv (páginas _*)
│
├── skills/
│   ├── strategy/
│   │   ├── brand-positioning.md                 ← Quem somos, tom, posicionamento, concorrentes
│   │   └── market-context.md                    ← Dados BR, concorrentes, tendências (atualizar mensalmente)
│   │
│   ├── tactic/
│   │   ├── editorial-pillars.md                 ← 5 pilares, arco semanal, formatos
│   │   └── trend-radar.md                       ← Protocolo de tendências (atualizar semanalmente)
│   │
│   ├── audiences/
│   │   ├── icp.md                               ← Perfil geral do ICP
│   │   ├── rosa-equilibrista.md                 ← ★ PERSONA PRIMÁRIA — estratégia de conteúdo
│   │   ├── ana-mae-protetora.md                 ← Persona secundária
│   │   ├── pedro-autonomo-solitario.md          ← Persona terciária
│   │   └── caio-filho-ressentido.md             ← Desprioritizado por ora
│   │
│   └── operational/
│       ├── copy-rules.md                        ← Regras de copy, legenda, hashtags, CTAs
│       ├── component-system.md                  ← Design system: componentes, layers, regras
│       ├── figma-delivery.md                    ← Como executar no Figma
│       └── visual-agent.md                      ← Quando/como usar imagens
│
├── references/
│   └── index.md                                 ← Frame IDs + mapeamento de componentes + DNA visual
│
└── outputs/
    └── sessions/                                ← Outputs por sessão (gitignored)
        └── YYYY-MM-DD/
            ├── strategy-brief.md
            ├── content-plan.md
            ├── copy.md
            └── component-choice.md
```

---

## Persona Primária — Rosa, A Equilibrista

Todo o conteúdo é calibrado primeiro para Rosa.

> ~27 anos, designer, Porto Alegre. Excessivo. Instagram.
> Não se vê como "alcoólatra" — mas reconhece o padrão.
> Precisa ser encontrada onde está, não onde queremos que ela esteja.

Ver `skills/audiences/rosa-equilibrista.md` para estratégia completa.

---

## Arquivos Figma

| Arquivo | ID | Uso |
|---|---|---|
| **Styleguide** | `YtsMDsUi5SIF29NCOFs53x` | Tokens, logos — leitura |
| **Referências + Staging** | `sBItPeNLyvT5EMyKLqQbRv` | Referências, componentes, staging |

### Páginas

| Página | Quem usa | Permissão |
|---|---|---|
| `🌀 Semana 08–10` | Referência visual | 🔒 Nunca escrever |
| `_COMPONENTS` | Designer cria / Agente copia | 🔒 Só leitura + copiar |
| `_QUEUE` | Agente entrega drafts | ✅ Escrita |
| `_APPROVED` | Humano move | ✅ Humano |
| `_ARCHIVE` | Humano move | ✅ Humano |
| `_BRIEFS` | Agente registra contexto | ✅ Escrita |

---

## Protocolos de Atualização

| Documento | Frequência | Responsável |
|---|---|---|
| `market-context.md` | Mensal | Agente executa queries + founder aprova |
| `trend-radar.md` | Semanal (antes de cada brief) | Agente atualiza seção "Ativas" |
| `padrinho-product.md` | Quando houver novidade de produto | Founder |
| Personas (`audiences/`) | Quando chegarem dados de usuários | Founder + agente |
| Componentes (`_COMPONENTS`) | Quando designer criar/atualizar | Designer |

---

## Componentes Disponíveis

### Covers
| Nome | Fundo | Melhor para |
|---|---|---|
| `cover/minimal-light` | Cream | Acolhimento, Prova Social |
| `cover/dark-bold-left` | Navy | Desmascaramento, Reconhecimento |
| `cover/blumine-circle` | Horizon | Reconhecimento (pergunta espelho) |
| `cover/photo-fullbleed` | Foto | Desmascaramento, Reconhecimento |

### Blocks
| Nome | Fundo | Melhor para |
|---|---|---|
| `block/list-dark` | Navy | Listas com produto/Bill |
| `block/list-light` | Cream | Listas educacionais |
| `block/statement-dark` | Navy | Dado forte + contraste |
| `block/minimal-statement-light` | Cream | Reframing, analogias |

### Data
| Nome | Fundo | Melhor para |
|---|---|---|
| `data/wave-number` | Cream → Horizon | Comparativos de consumo |
| `data/circle-grid` | Cream | Percentuais visuais |
| `data/progress-bar` | Navy | Múltiplos percentuais |
| `data/before-after` | Cream | Evolução temporal |

---

## Regra de Ouro

> "Do not promote on the content ever — do it on the ads only."
>
> O conteúdo orgânico inspira e constrói relacionamento.
> Rosa precisa se ver — não ser vendida para.

---

## Setup

```bash
npm install -g @anthropic-ai/claude-code
```

```json
// ~/.claude/settings.json
{
  "mcpServers": {
    "figma": { "type": "url", "url": "https://mcp.figma.com/mcp" }
  }
}
```

```bash
# Pipeline completo
claude "Post sobre [tema], persona Rosa"

# Modo rápido
claude "Post sobre [tema]. Template: cover/minimal-light. Brief Semana 11."
```
