# Photo Guidelines — Padrinho Instagram

Critérios de seleção, estilo visual e processo de busca para fotos em posts com imagem. Leia este arquivo quando precisar selecionar ou briefar uma foto. Usado pelo Figma Agent para validar seleções de Unsplash.

## Papel deste Skill
Você usa este skill sempre que precisar selecionar, avaliar ou briefar
uma foto para um template com imagem. Ele define os critérios visuais
da fotografia Padrinho, extraídos dos posts de referência aprovados
(Semanas 08–10), e o processo de busca via Unsplash API.

### Imagem é prioridade (usar MAIS imagem)
A foto cria contexto emocional e ritmo humano — posts ricos em imagem performam e parecem mais "Padrinho". **Meta: 3–5 fotos interiores por carrossel** (capa-foto à parte), intercalando foto/texto. Referências de uso forte de imagem: `🌀 Semana 08` (carrossel "funcional", ~6 fotos), `🌀 Semana 09` (hangxiety, milestones). Distribuição completa em `SKILL_ComponentSystem.md` § Estrutura.

### Templates com foto (lista canônica)
Leia este skill antes de usar qualquer um deles.

**Foto full-bleed** (a foto É o slide — portrait):
**`cover / photo-fullbleed-a·b·c` · `list / list-fullbleed` · `quote / phrase` · `quote / phrase-topic-a·b` · `quote / ending-a·b` · `quote / fold-quote` · `content / deep-fullbleed`**

**Imagem inline** (bloco de texto denso + imagem contida 800×400, ~2:1 landscape):
**`content / deep-text-dark-a·b` · `content / deep-text-light-a·b`** — ver § Imagem inline (crop landscape) abaixo.

> `quote / simple-a` e `quote / simple-b` **NÃO têm foto** — são tipográficos. Mecanismo de injeção de foto: `SKILL_PhotographerAgent.md`.

---

## O que a foto faz num post Padrinho

Não ilustra o tema — **cria o contexto emocional antes do texto**.
A foto é lida antes da primeira palavra. Ela precisa provocar
reconhecimento silencioso: "isso sou eu" — nunca "que pena essa pessoa".

---

## Vibe coesa: o que separa foto "Padrinho de verdade" de banco de imagem

Referência aprovada: `🌀 Semana 11`. O que faz aquelas fotos funcionarem, e que devemos replicar:

1. **Grade coeso por carrossel.** Todas as fotos de um post têm que parecer do MESMO ensaio: mesma paleta, mesma dessaturação, mesmo mood. Não misturar golden-hour quente com cinza frio no mesmo carrossel. Escolher um grade e manter. Se as fotos vierem de fontes diferentes, uniformizar no Figma (ajuste de exposição, contraste e saturação no fill, ou um overlay sutil).
2. **Dessaturado e filmic, não saturado e brilhante.** Tons subdued, cinematográficos. Fugir de cor punchy, HDR e sorriso de propaganda: é a cara de banco de imagem.
3. **Emoção real, não pose.** O critério central não é "esconder o rosto", é "não posar pra câmera". O rosto pode e às vezes deve aparecer, desde que em emoção genuína (rindo com alguém, olhos fechados, abraço, mãos no rosto). Nunca sorrindo pra lente. Silhueta ou rosto oculto é UMA opção forte, não a única regra.
4. **Pessoas reais e faixa etária ampla.** Incluir idade real (rugas, 45+ quando o tema pede), textura de pele, corpos naturais, diversidade real. Nunca modelo fitness ou jovem retocado.
5. **Variar o tipo de plano dentro do carrossel.** Misturar close emocional (rosto ou mãos), plano de grupo (comunidade), plano aberto e ambiental (figura pequena na paisagem, cinematográfico) e ângulo POV ou inusitado. Não repetir o mesmo enquadramento em todos os slides.
6. **Photo-essay, não ilustração.** Cada foto parece de um ensaio real com pessoas específicas, não de uma busca genérica de stock.

> Teste da vibe: se as 3 a 5 fotos do carrossel parecem tiradas na mesma sessão, com gente real em emoção real e um grade só, está "Padrinho". Se parecem 5 stocks aleatórios de bancos diferentes, refazer.

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

> Nota (Semana 11): o rosto NÃO precisa estar sempre oculto. Ele pode aparecer se estiver em **emoção real** (olhos fechados, riso genuíno com alguém, abraço). O proibido é o rosto **posando ou sorrindo pra câmera**. Ver § Vibe coesa.

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
| `cover / photo-fullbleed-c` | Centro-inferior | Sujeito no topo, área vazia embaixo |
| `cover / photo-fullbleed-a` | Centro (frame inteiro) | Sujeito levemente deslocado |
| `content / deep-fullbleed` | Inferior 40% | Rosto/ação na metade superior |
| `list / list-fullbleed` | Inferior 50% | Pessoa no topo, fundo simples abaixo |
| `quote / ending-a` | Centro-inferior | Grande área de fundo visível |
| `quote / ending-b` | Centro | Espaço no centro para texto |
| `quote / phrase` | Centro-inferior | Sujeito nas laterais, centro livre |
| `quote / phrase-topic-a` | Inferior | Ação no topo |
| `quote / phrase-topic-b` | Centro | Espaço no centro para texto |

**Orientação:** **sempre portrait** para foto full-bleed. Nunca landscape. **Exceção:** templates de imagem inline (`content / deep-text-*`) — ver § Imagem inline abaixo.

---

## Imagem inline (crop landscape) — content / deep-text-*

Diferente da foto full-bleed, os `content / deep-text-*` (dark-a·b, light-a·b) têm uma **imagem contida** (rounded-rect 800×400, ~2:1 **landscape**) entre o headline e o body. A imagem apoia o texto denso, não é o slide inteiro. (`content / deep-fullbleed` é foto full-bleed, entra na lista portrait acima.)

- **Orientação:** **landscape 2:1** (não portrait). Escolher foto com o sujeito centralizado, que sobreviva a um crop horizontal.
- **Mesmo grade e mood** das fotos full-bleed do carrossel: dessaturado, filmic, emoção real (ver § Vibe coesa). A imagem inline conta para a **coesão de grade** do carrossel.
- **Sem zona de texto na foto** — o texto vive fora da imagem (headline acima, body abaixo). Escolher pela emoção/relevância, não por área livre.
- Recebe `image-query` (EN, 3–4 palavras fortes) igual aos demais. Atribuição Unsplash obrigatória na `_annotation`.
- **Conta como slide de imagem** para o ritmo do carrossel (evitar colar 2 slides-imagem seguidos), mas **não substitui** a foto full-bleed emocional como âncora do post.

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

> **Injeção no Figma:** a busca (acima) é critério/seleção; o **passo de injetar a foto no slide** (via `upload_assets`) é canônico em `SKILL_PhotographerAgent.md` § Processo.

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
cover / photo-fullbleed-c (overlay azul escuro):
Ex: "exhausted woman portrait"

cover / photo-fullbleed-a (foto direta, texto handwriting):
Ex: "pensive woman morning"

content / deep-fullbleed (foto dark + raios):
Ex: "anxious portrait dark"

list / list-fullbleed (foto warm, lista sobreposta):
Ex: "contemplative woman warm"

quote / ending-a (foto dark, homem ou mulher):
Ex: "man stressed dark"

quote / ending-b (foto vivid, empoderamento):
Ex: "woman confident outdoors"

quote / phrase (foto escura, conexão):
Ex: "women friends laughing"

quote / phrase-topic-a (foto + raios, fechamento):
Ex: "woman recovery portrait"

content / deep-text-* (imagem inline, crop landscape 2:1):
Ex: "hands on head landscape"
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

**Last Updated:** 2026-07-01  
**Maintained by:** Figma Agent  
**References:**  
- [SKILL/SKILL_PhotographerAgent.md](SKILL/SKILL_PhotographerAgent.md)
- [AGENT/AGENT_Figma.md](AGENT/AGENT_Figma.md)
- [AGENT/AGENT_Operational.md](AGENT/AGENT_Operational.md)
