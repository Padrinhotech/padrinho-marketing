---
title: "Figma Delivery Standards — Padrinho"
version: "1.0"
status: "Final"
type: "Skill"
owner: "Padrinho Marketing Automation"
parent_doc: "marketing/SKILL/"
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
| `_QUEUE` | ✅ Escrita — destino de todos os drafts |
| `_APPROVED` | Humano move para cá após aprovar |
| `_ARCHIVE` | Humano move para cá |
| `_BRIEFS` | ✅ Escrita — contexto de sessão |
| `🌀 Semana XX` | 🔒 **NUNCA ESCREVER** |
| `Thumbnail` | 🔒 **NUNCA ESCREVER** |

**Regra de segurança:** Antes de qualquer escrita, confirmar que a página
de destino começa com `_`. Se não começar, PARAR.

---

## Fluxo de Execução

```
1. Navegar para _COMPONENTS
2. Localizar o frame do componente pelo nome (ex: "cover/minimal-light")
3. Copiar o frame para _QUEUE
4. Renomear:
   - Post único:   "Post / YYYY-MM-DD / vN — {componente}"
   - Carrossel:    "Slide 01 / {componente}", "Slide 02 / {componente}", ...
   - Novo template: "RASCUNHO / {componente} / vN"
5. Editar apenas os layers permitidos (ver SKILL_ComponentSystem.md)
6. Preencher _annotation com caption + hashtags + meta
7. Tirar screenshot e validar visualmente
8. Reportar ao humano com screenshot + link
```

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
│   [máx 30 hashtags]
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

Carrossel:
  Slide 01 / cover/dark-bold-left
  Slide 02 / block/list-dark
  Slide 03 / block/statement-dark
  ...
  Slide 09 / block/minimal-statement-light

Novo template (proposto pelo agente):
  RASCUNHO / cover/quote-dark / v1
```

---

## Checklist de Entrega

- [ ] Componente copiado de `_COMPONENTS` (nunca construído do zero)?
- [ ] Frame está em `_QUEUE` do arquivo `sBItPeNLyvT5EMyKLqQbRv`?
- [ ] Nome do frame segue a nomenclatura correta?
- [ ] Apenas layers permitidos foram editados (ver SKILL_ComponentSystem.md)?
- [ ] `hl` (highlight) ajustado para cobrir o texto correto?
- [ ] `counter` atualizado com número do slide?
- [ ] `_annotation` preenchida com caption + hashtags + meta?
- [ ] Screenshot tirado e validado visualmente?
- [ ] Resultado reportado ao humano com screenshot?

---

## Regra de texto — sem quebras manuais

Ao adaptar o conteúdo dos layers, **nunca usar `\n` para quebrar frases contínuas**.
O Figma respeita a largura do frame e quebra automaticamente.

Quebras manuais só em:
- Separação intencional de headline + italic (layers distintos)
- Itens de lista com separação visual real
- Parágrafos com pausa editorial deliberada

Ver exemplos completos em `SKILL_CopyRules.md`.

---

**Last Updated:** 2026-05-07  
**Maintained by:** Figma Agent  
**References:**  
- [../SKILL/SKILL_operational/SKILL_ComponentSystem.md](SKILL_ComponentSystem.md)
- [../SKILL/SKILL_operational/SKILL_CopyRules.md](SKILL_CopyRules.md)
- [../AUT/AUT_figma-design.md](../AUT/figma-design.md)

---

**Last Updated:** 2026-05-07  
**Maintained by:** Figma Agent  
**References:**  
- [../SKILL/SKILL_operational/SKILL_ComponentSystem.md](SKILL_ComponentSystem.md)
- [../SKILL/SKILL_operational/SKILL_CopyRules.md](SKILL_CopyRules.md)
- [../AUT/AUT_figma-design.md](../AUT/figma-design.md)
