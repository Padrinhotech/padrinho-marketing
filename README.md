# Padrinho Marketing

Sistema de automação de conteúdo para o Instagram do Padrinho.app — 
com human-in-the-loop em cada etapa.

## Visão
Você dá um prompt. O sistema gera um post editável no Figma.
Nada é publicado sem a sua aprovação explícita.

## Arquitetura

```
[Prompt] → [Strategy Agent] → ✅ você aprova
         → [Tactic Agent]   → ✅ você aprova  
         → [Operational Agent]
              → Copy          → ✅ você aprova
              → Visual Brief  → ✅ você aprova
              → Imagen 3      → ✅ você escolhe
              → Figma Frame   → post aparece em _QUEUE
```

## Estrutura do Repositório

```
padrinho-marketing/
│
├── CLAUDE.md                          # Instruções master do agente
│
├── skills/
│   ├── strategy/
│   │   ├── brand-positioning.md       # Quem somos, tom, posicionamento
│   │   └── market-context.md          # Mercado, concorrentes, dados Brasil
│   ├── tactic/
│   │   └── editorial-pillars.md       # Pilares, personas, formatos, arco semanal
│   └── operational/
│       ├── copy-rules.md              # Regras de copy e legenda
│       ├── visual-agent.md            # Como briefar o Imagen 3
│       └── figma-delivery.md          # Como entregar o frame no Figma
│
├── brand/
│   ├── figma-tokens.json              # Tokens de cor, tipografia, logos
│   ├── styleguide-file-id.txt         # ID do arquivo Figma Styleguide (read-only)
│   ├── references-file-id.txt         # ID do arquivo de posts de referência (read-only)
│   └── staging-file-id.txt            # ID do arquivo Staging (escrita do sistema)
│
├── references/
│   └── index.md                       # Índice dos posts de referência com Frame IDs
│
└── outputs/
    └── sessions/                      # Outputs gerados por sessão (gitignored)
```

## Três Arquivos Figma

| Arquivo | ID | Permissão | Uso |
|---|---|---|---|
| **Styleguide** | `YtsMDsUi5SIF29NCOFs53x` | 🔒 Leitura | Tokens de cor, tipografia, logos |
| **Referências** | `sBItPeNLyvT5EMyKLqQbRv` | 🔒 Leitura | Posts aprovados Semanas 08-10 |
| **Staging** | ver `staging-file-id.txt` | ✏️ Escrita | Drafts em `_QUEUE` para revisão |

## Como Usar

### Pré-requisitos
```bash
npm install -g @anthropic-ai/claude-code
```

### Configurar Figma MCP
Adicionar ao `~/.claude/settings.json`:
```json
{
  "mcpServers": {
    "figma": {
      "type": "url",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

### Criar o Staging File
1. Abra o Figma
2. Crie um novo arquivo: "Padrinho — Staging"
3. Crie 4 páginas: `_QUEUE`, `_APPROVED`, `_ARCHIVE`, `_BRIEFS`
4. Copie o File ID da URL e cole em `brand/staging-file-id.txt`

### Rodar o pipeline completo
```bash
claude "Post sobre o fim de semana e a relação com o álcool. Tom de reconhecimento."
```

### Rodar apenas a camada Operacional (estratégia já definida)
```bash
claude --skip-strategy "Post sobre hangxiety, usar brief da Semana 11"
```

## Personas
| Persona | Perfil | Pilar preferido |
|---|---|---|
| Rosa, A Equilibrista | 27 anos, designer, Porto Alegre | Reconhecimento |
| Ana, A Mãe Protetora | 40 anos, São Paulo | Acolhimento |
| Pedro, O Autônomo Solitário | 31 anos, freelancer, Florianópolis | Empoderamento |
| Caio, O Filho Ressentido | 21 anos, estudante, São Paulo | Desmascaramento |

## Regra de Ouro
> "Do not promote on the content ever — do it on the ads only."
> O conteúdo orgânico inspira e constrói relacionamento. Nunca vende.
