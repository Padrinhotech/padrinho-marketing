---
title: "Photo Guidelines — Padrinho Instagram"
version: "1.0"
status: "Final"
type: "Skill"
owner: "Padrinho Marketing Automation"
parent_doc: "SKILL/"
tags: [photos, visual, unsplash, sourcing, mood, style]
---

# Photo Guidelines — Padrinho Instagram

Critérios de seleção, estilo visual e processo de busca para fotos em posts com imagem. Leia este arquivo quando precisar selecionar ou briefar uma foto. Usado pelo Figma Agent para validar seleções de Unsplash.

## Papel deste Skill
Você usa este skill sempre que precisar selecionar, avaliar ou briefar
uma foto para um template com imagem. Ele define os critérios visuais
da fotografia Padrinho, extraídos dos posts de referência aprovados
(Semanas 08–10), e o processo de busca via Unsplash API.

Leia antes de usar qualquer template com `bg-photo`:
`cover-c`, `cover-d`, `block-h`, `block-i`, `block-j`, `block-k`, `block-l`, `block-n`

---

## O que a foto faz num post Padrinho

Não ilustra o tema — **cria o contexto emocional antes do texto**.
A foto é lida antes da primeira palavra. Ela precisa provocar
reconhecimento silencioso: "isso sou eu" — nunca "que pena essa pessoa".

---

## Critérios Visuais

### Pessoas

| Critério | Correto | Evitar |
|---|---|---|
| Expressão | Real, capturada, imperfeita | Posada, sorriso forçado |
| Rosto | Parcial, oculto, desfocado | Full-face olhando para câmera |
| Corpo | Natural, cotidiano | Idealizado, fitness, corporativo |
| Gênero | Maioria feminina (56% da base) | Só masculino |
| Idade | 25–45 anos | Adolescentes ou muito idosos |
| Raça | Diversidade real | Tokenismo ou ausência |

**Por que rosto parcial funciona:**
Quando o rosto está oculto ou desfocado, o leitor projeta a própria
experiência. A foto diz "isso poderia ser qualquer pessoa — inclusive você."
É a técnica mais recorrente nos posts aprovados.

### Iluminação

| Pilar | Luz ideal | Nunca |
|---|---|---|
| Reconhecimento | Natural difusa, quente, interior | Flash, estúdio |
| Desmascaramento | Contrastada, sombras, dramática | Plana e uniforme |
| Acolhimento | Suave, dourada, íntima | Fria, azulada |
| Empoderamento | Natural forte, exterior | Fechado e escuro |
| Prova Social | Quente, alegre, exterior | Corporativa, posada |

### Composição — Zona de Texto Segura

Cada template exige uma área com baixa informação visual para o texto respirar:

| Template | Zona de texto | Composição ideal da foto |
|---|---|---|
| `cover-c` | Centro-inferior | Sujeito no topo, área vazia embaixo |
| `cover-d` | Centro (frame inteiro) | Sujeito levemente deslocado |
| `block-h` | Inferior 40% | Rosto/ação na metade superior |
| `block-i` | Inferior 50% | Pessoa no topo, fundo simples abaixo |
| `block-j` | Centro-inferior | Grande área de fundo visível |
| `block-k` | Centro | Espaço no centro para texto |
| `block-l` | Centro-inferior | Sujeito nas laterais, centro livre |
| `block-n` | Inferior | Ação no topo |

**Orientação:** sempre portrait ou quadrada. **Nunca** landscape.

---

## Tom por Pilar

### Reconhecimento
Momentos íntimos e privados. A pessoa sozinha com seus pensamentos.
- Olhar distante, introspectivo
- Ambientes domésticos (sofá, cama, cozinha, banheiro)
- Horários de reflexão: manhã cedo, noite
- Entre cansaço e lucidez — não desespero
- *Refs:* `3356:6555`, `3177:3858`

### Desmascaramento
Tensão entre aparência externa e o que está por dentro.
- Pessoa funcional mas com algo fora de lugar
- Movimento, desfoco, motion blur como metáfora de confusão
- Contexto social onde o álcool estaria presente (sem mostrar bebida)
- *Refs:* `3177:56`, `3356:6334`

### Acolhimento
Conexão, presença, calor humano.
- Duas pessoas juntas — abraço, conversa próxima
- Mãos: símbolo de cuidado
- Expressão de alívio ou leveza — não euforia
- Tons âmbar, luz quente
- *Refs:* `3356:6588`

### Empoderamento
Movimento, conquista, presença no mundo.
- Pessoa em ação (caminhando, correndo)
- Exterior, céu visível
- Postura ereta ou expansiva
- Confiante, não arrogante
- *Refs:* `3356:6570`

### Prova Social
Realidade compartilhada, não performance.
- Grupos pequenos em momentos reais
- Alegria autêntica, não posada
- Ambientes cotidianos
- *Refs:* `3356:6588`, `3177:3870`

---

## O que NUNCA usar

**Conteúdo:**
- Garrafas, copos ou bebidas alcoólicas — mesmo para ilustrar o problema
- Pessoas visivelmente embriagadas
- Ambientes de bar ou balada como cenário principal
- Expressões de desespero extremo ou choro intenso
- Foto de banco de imagens com sorriso corporativo
- Pessoas em posição de vítima passiva
- Qualquer estética de "campanha anti-drogas"

**Estilo visual:**
- Filtros vintage excessivos
- Saturação irreal ou HDR exagerado
- Edição de beleza excessiva (pele artificial)
- Composição simétrica demais (parece anúncio)
- Fundo branco de estúdio

---

## Processo de Seleção via Unsplash

### Passo a passo

```
1. Identificar: pilar do slide + template + emoção central
2. Montar a query (ver tabela abaixo)
3. Buscar: GET /search/photos?query=...&orientation=portrait
4. Filtrar: resolução ≥ 1080px, sem bebidas visíveis, sem estúdio
5. Selecionar: resultado mais relevante que tenha zona de texto livre
6. Registrar na _annotation: fotógrafo + URL + query usada
```

### Vocabulário de busca por emoção (termos EN para Unsplash)

| Emoção | Termos de busca |
|---|---|
| Introspecção / reflexão | `contemplative woman`, `pensive`, `looking away`, `lost in thought` |
| Cansaço emocional | `exhausted woman`, `tired`, `overwhelmed` |
| Reconhecimento / rosto oculto | `woman face hidden`, `hair covering face`, `partial face` |
| Tensão / ansiedade | `anxious`, `worried`, `stressed woman`, `hands on head` |
| Acolhimento / calor | `warm hug`, `friends laughing`, `women together`, `golden hour` |
| Empoderamento | `confident woman`, `running`, `outdoors active`, `determined` |
| Conexão | `two friends`, `genuine laugh`, `candid moment` |
| Solidão | `woman alone`, `solitude`, `window light` |

### Modificadores de estética (adicionar sempre 1–2)

| Modificador | Quando usar |
|---|---|
| `candid` | Momentos autênticos, sem pose |
| `portrait` | Sempre para templates fullbleed |
| `dark` | Para templates com texto claro sobre fundo |

> **⚠️ REGRA DE OURO PARA UNSPLASH:** O algoritmo do Unsplash funciona **muito mal** com frases longas. Quanto mais palavras você coloca, mais genérica e "stock" a foto fica. Use no **máximo 3 a 4 palavras fortes** por query.

### Queries por template

```
cover-c (overlay azul escuro):
Ex: "exhausted woman portrait"

cover-d (foto direta, texto handwriting):
Ex: "pensive woman morning"

block-h (foto dark + raios):
Ex: "anxious portrait dark"

block-i (foto warm, lista sobreposta):
Ex: "contemplative woman warm"

block-j (foto dark, homem ou mulher):
Ex: "man stressed dark"

block-k (foto vivid, empoderamento):
Ex: "woman confident outdoors"

block-l (foto escura, conexão):
Ex: "women friends laughing"

block-n (foto + raios, fechamento):
Ex: "woman recovery portrait"
```

---

## Atribuição Unsplash (obrigatória)

O Unsplash exige crédito ao fotógrafo. Sempre registrar na `_annotation`:

```
FOTO: {photographer_name} via Unsplash
URL: {photo_url}
QUERY: "{query_usada}"
```

---

## Referências Visuais Canônicas

Posts aprovados que exemplificam as diretrizes — consultar antes de escolher:

| Frame ID | Por que é referência |
|---|---|
| `3356:6555` | Rosto parcial + iluminação dark coerente com template |
| `3356:6588` | Alegria autêntica — zero sorriso forçado |
| `3356:6570` | Empoderamento sem euforia artificial |
| `3356:6518` | Sofrimento sem ser pesado demais |
| `3177:56` | Rosto oculto criando identificação universal |
| `3356:6530` | Desfoco emocional + zona de texto livre funcional |

---

## Checklist antes de usar uma foto

- [ ] A foto tem uma zona livre compatível com o template?
- [ ] A expressão é autêntica — não posada ou corporativa?
- [ ] Nenhuma bebida ou garrafa visível?
- [ ] A iluminação é coerente com o pilar do slide?
- [ ] Orientação portrait ou square?
- [ ] Resolução mínima de 1080px de largura?
- [ ] A emoção da foto é compatível com o copy do slide?
- [ ] A atribuição foi registrada na `_annotation`?

---

**Last Updated:** 2026-05-07  
**Maintained by:** Figma Agent  
**References:**  
- [../SKILL/SKILL_operational/visual-agent.md](visual-agent.md)
- [../AGENT/AUT_figma-design.md](../AGENT/figma-design.md)
- [../AGENT/AUT_operational.md](../AGENT/operational.md)
