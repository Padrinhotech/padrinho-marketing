---
title: "Figma Delivery Standards — Padrinho"
version: "1.0"
status: "Final"
type: "Skill"
owner: "Padrinho Marketing Automation"
parent_doc: "SKILL/"
tags: [figma, delivery, standards, naming, exports]
---

# Figma Delivery Standards — Padrinho

Directrizes para entrega e exportação de posts do Figma. Leia este arquivo se está preparando frames para publicação ou entendendo padrões de nomeclatura. Usado pelo Figma Agent para validar e preparar conteúdo final.

## Papel
Você é a última etapa antes do humano ver o post no Figma.
Você **não constrói posts do zero**. Você copia componentes de `_COMPONENTS`
e adapta o conteúdo aprovado dentro das regras definidas.

Para regras completas de adaptação de conteúdo, leia `SKILL_ComponentSystem.md`.

---

## Arquivo de Trabalho

**Arquivo único:** `sBItPeNLyvT5EMyKLqQbRv`

| Página | Permissão |
|---|---|
| `_COMPONENTS` | 🔒 Leitura + cópia de frames apenas |
| `🌀 Semana NN` (semana atual) | ✅ **Escrita — destino dos carrosséis.** Criar se não existir (NN = nº da WEEK) |
| `_BRIEFS` | ✅ Escrita — contexto de sessão |
| `_QUEUE` | ⚠️ **Descontinuado** — não usar (página temporária, será apagada) |
| `_APPROVED` / `_ARCHIVE` | Humano move para cá |
| `🌀 Semana NN` (outras semanas) · `Thumbnail` | 🔒 **NUNCA ESCREVER** |

**Regra de segurança:** escrever **apenas** na página `🌀 Semana NN` da semana atual
(criando-a se não existir) ou em `_BRIEFS`. Nunca tocar em `_COMPONENTS`, em páginas de
outras semanas, em `_APPROVED`/`_ARCHIVE` ou em `Thumbnail`. Em dúvida, PARAR.

---

## Fluxo de Execução

```
1. Garantir a página da semana: `🌀 Semana NN` (criar se não existir; NN = nº da WEEK)
2. Navegar para _COMPONENTS e localizar o frame do componente pelo nome
3. Copiar o frame para `🌀 Semana NN`
4. Posicionar conforme § Layout na página da semana (0px entre slides · 400px entre carrosséis)
5. Renomear:
   - Carrossel: "Post NN — Slide 01 / {componente}", "Post NN — Slide 02 / {componente}", ...
6. Editar apenas os layers permitidos (ver SKILL_ComponentSystem.md)
7. Preencher _annotation com caption + hashtags + meta
8. Tirar screenshot e validar visualmente
9. Reportar ao humano com screenshot + link
```

---

## Layout na página da semana (`🌀 Semana NN`)

- **Uma linha (filmstrip) por post:** os slides do carrossel ficam lado a lado, na ordem, **0px entre slides** (encostados) — leem-se como uma tira contínua.
- **Carrosséis empilhados verticalmente** na ordem dos posts (Post 01 no topo → 02 → 03 …), com **400px de distância entre um carrossel e o seguinte**.
- O espaçamento de 400px existe **apenas entre carrosséis** — nunca entre slides do mesmo carrossel.
- Rotular cada linha com o nº/persona/função do post (ex.: "Post 01 — Ana — Hook").

---

## Especificações Fixas (nunca alterar)

```
Dimensões:    1080 × 1440 px  (portrait 4:5)
cornerRadius: 44 px
Margem H:     83 px (left e right)
Content W:    914 px  (= 1080 - 83*2)
Handle Y:     H - 119 px  (= y ≈ 1321)
```

---

## Layer _annotation (obrigatório em todo frame)

Todo frame entregue em `_QUEUE` deve ter uma layer `_annotation` hidden
contendo toda a informação necessária para publicação:

```
_annotation (visible: false)
├── CAPTION
│   [texto completo da legenda — máx 2.200 chars]
│
├── HASHTAGS (1º comentário)
│   [máx 5 hashtags]
│
├── META
│   Persona: [nome]
│   Pilar: [pilar]
│   Componente: [nome do componente usado]
│   Data: YYYY-MM-DD
│   Semana de referência: Semana XX
│
└── FEEDBACK (se v2+)
    [feedback verbatim do humano que gerou esta versão]
```

---

## Nomenclatura Completa

```
Post único:
  Post / 2026-04-14 / v1 — cover/minimal-light
  Post / 2026-04-14 / v2 — cover/minimal-light     ← após rejeição
  Post / 2026-04-14 / v2 ✓ — cover/minimal-light   ← aprovado

Carrossel (na página 🌀 Semana NN, prefixado pelo post):
  Post 01 — Slide 01 / cover/dark-bold-left
  Post 01 — Slide 02 / block/list-dark
  Post 01 — Slide 03 / block/statement-dark
  ...
  Post 02 — Slide 01 / cover/photo-fullbleed

Novo template (proposto pelo agente):
  RASCUNHO / cover/quote-dark / v1
```

---

## Checklist de Entrega

- [ ] Componente copiado de `_COMPONENTS` (nunca construído do zero)?
- [ ] Frames na página `🌀 Semana NN` (semana atual) do arquivo `sBItPeNLyvT5EMyKLqQbRv`?
- [ ] Slides do mesmo carrossel a **0px** (encostados); **400px** entre carrosséis?
- [ ] **Variedade de componentes entre os 4 posts** respeitada (`SKILL_ComponentSystem` § Variedade)?
- [ ] Nome do frame segue a nomenclatura correta?
- [ ] Apenas layers permitidos foram editados (ver SKILL_ComponentSystem.md)?
- [ ] `hl` (highlight) ajustado para cobrir o texto correto?
- [ ] `counter` atualizado com número do slide?
- [ ] `_annotation` preenchida com caption + hashtags + meta?
- [ ] Screenshot tirado e validado visualmente?
- [ ] Resultado reportado ao humano com screenshot?

---

## Regra de texto — sem quebras manuais
Regra canônica (quando usar / não usar `\n`) vive em **`SKILL_CopyRules.md` § Quebras de linha nos slides**. Resumo: nunca `\n` em frases contínuas (o Figma quebra pela largura); só em headline↔italic, itens de lista, ou pausa editorial real.

---

**Last Updated:** 2026-05-07  
**Maintained by:** Figma Agent  
**References:**  
- [SKILL/SKILL_ComponentSystem.md](SKILL/SKILL_ComponentSystem.md)
- [SKILL/SKILL_CopyRules.md](SKILL/SKILL_CopyRules.md)
- [AGENT/AGENT_Figma.md](AGENT/AGENT_Figma.md)
