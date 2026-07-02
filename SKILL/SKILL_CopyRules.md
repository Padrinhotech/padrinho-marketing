# Copy Rules — Padrinho All Channels

Directrizes unificadas para redação de copy, captions, posts de blog e estruturas visuais de texto em todos os canais (Instagram, Blog, Newsletter, etc.). Leia este arquivo se está criando ou refinando qualquer conteúdo copywriting para a marca Padrinho. Usado pelo Strategy Agent, Tactic Agent e Operational Agent para validar e estruturar saídas antes de envio/aprovação.

## Estrutura Visual de Post

### Tipografia (3 fontes da marca: Moma · Instrument Serif · Instrument Sans)
- **Moma** — fonte de marca display/manuscrita (habilitada em 2026 H2). Usada em elementos de destaque manuscrito/assinatura — ex.: a "seta curva" e o mix handwriting da capa `cover / photo-fullbleed-a`.
- **Headline display:** Instrument Serif, 32px, line-height 150%, Regular
- **Palavra-chave emocional:** sempre em itálico dentro do headline
- **Destaque inline:** retângulo #669AB7 @ 45% opacidade atrás de 1 frase por post
- **Subtexto / body:** Instrument Sans, 14-16px, line-height 140%

> As 3 fontes (Moma, Instrument Serif, Instrument Sans) já vêm aplicadas nos componentes — o agente **nunca troca fonte** (ver `SKILL_ComponentSystem.md` § O que o Agente NUNCA altera).
- **Handle:** @padrinho.app — espaçado, centralizado, y=1321, quase invisível
- **Wave underline (~):** vetor teal #669AB7 sob CTAs e palavras-chave

### Hierarquia de Headline
A mistura Regular + Itálico dentro de uma frase é a assinatura tipográfica da marca.
O itálico sinaliza: "esta é a palavra que carrega o peso emocional da frase."

Exemplo correto:
> Não é *magia* do universo Ghibli, é tecnologia com alma

Exemplo incorreto:
> **Não é magia do universo Ghibli, é tecnologia com alma** (tudo igual = sem ênfase)

---

## Escreva até a capacidade do componente (profundidade de slide)

> **Diagnóstico:** a gente subpreenche os componentes — vira um statement num rótulo de 4 palavras quando ele cabe uma ideia inteira. Conteúdo raso = post "phase-based" (rótulos, não ensino). Cada campo tem um **alvo de conteúdo**, não só um teto.

**Princípio:** cada slide **ensina uma ideia completa** — afirmação → mecanismo/porquê → consequência. Se o componente oferece um campo (`subtext`, `body`, `bullet`), ele **não é decorativo**: preencha com conteúdo real.

**Alvos por tipo de campo:**
| Campo | Alvo (não só teto) |
|---|---|
| `headline` | a ideia central — 2–3 linhas, nunca 1 palavra solta |
| `subtext` | uma **frase completa** que adiciona (consequência, nuance) — nunca um rótulo solto |
| `body` (`content/deep-*`, `list/list-*-b`, `data/quote-numbers`, `data/quote-fill-percentage`) | **3–6 linhas que DESENVOLVEM**: claim → porquê → e daí |
| `bullet-N` | keyword **+ detalhe** (ex.: "Sono melhor — o álcool rouba o REM"), não só a keyword |

**Referência de densidade:** olhe `@brandsdecoded` e `@temgentequenaobebe` — cada slide é um **parágrafo que ensina**, não uma legenda.

**Teste de subpreenchimento:** se, ao reler o slide, você não aprendeu nada além do título → está raso, desenvolva. Prefira **menos slides mais densos** a muitos slides-rótulo.

> Para conteúdo educacional (Empoderamento/Desmascaramento), o spine deve ser `content / deep-text-*` (conteúdo) — ver `SKILL_ComponentSystem.md` § Lógica de Seleção (Passo 4).

---

## Carrossel: gancho e narrativa contínua

Um carrossel é **um texto fatiado**, não vários posts sobre o mesmo tema. O leitor tem que sentir que lê uma conversa que avança, não uma sequência de recomeços.

### A capa (slide 01) abre um loop
- **Prefira PERGUNTA a afirmação.** Uma pergunta cria uma lacuna de curiosidade que puxa pro próximo slide. Foi o que fez o post "o que o álcool faz no cérebro" ganhar tração. Uma afirmação fechada entrega a conclusão de cara e não dá motivo pra deslizar.
- A capa faz uma **promessa ou pergunta que só o resto do carrossel responde**. Não resolva o tema no slide 01.
- **Clareza acima de esperteza.** Em 1 segundo o leitor entende do que se trata e o que vai ganhar. Gancho vago ou "espertinho" perde o deslize. Se precisa reler pra entender, está fraco.

### Slide 01 para 02 é uma conversa, não duas aberturas
- O **slide 02 CONTINUA o slide 01** (responde a pergunta, dá o próximo beat). Nunca reabre o tema com um segundo gancho.
- **Teste da segunda entrada:** se o slide 02 funcionaria sozinho como capa, está errado. Ele deve soar como quem completa a frase que o slide 01 começou (ex.: a capa pergunta, o slide 02 começa com "resposta curta: ...").
- Sintoma a evitar: 01 e 02 soando como duas aberturas concorrentes do mesmo assunto (narrativa duplicada).

### Amarração entre todos os slides (texto contínuo)
- Cada slide **puxa o anterior e prepara o próximo**. Use ligações de continuidade: "e é aí que", "só que", "por isso", "na prática", "o problema é que", "a virada é esta".
- **Abra e feche loops:** levantou uma pergunta num slide, responda no próximo; prometeu "o passo a passo", entregue.
- Lido em sequência, tem que soar como UM texto corrido. Teste: se dá pra embaralhar a ordem dos slides do meio sem o leitor perceber, falta amarração.
- Vale para a legenda também: uma voz contínua, não uma colcha de frases soltas.

---

## Estruturas de Copy Comprovadas

### 1. Contraste (mais usado)
```
"Você não precisa [X] para [Y]. Pode ter os dois."
"Você não precisa escolher entre tecnologia e acolhimento."
```

### 2. Pivot com pergunta
```
"Agora pensa comigo:"
[pausa visual]
"E se essa mesma tecnologia também te ajudasse a..."
```

### 3. Espelho de identidade
```
"Posso ser uma boa [identidade positiva] e ainda [admissão difícil]?"
"Na vida de quem [situação cotidiana específica]..."
```

### 4. Lista com contraste bold/regular
Cada item: **palavra-chave em negrito** + contexto em regular
```
◆ No "repita meu pedido" do iFood
◆ No **"mood triste"** da playlist no Spotify
◆ E até na **legenda do story** aqui no Instagram
```
(Usar losango ◆ como bullet — nunca bullet padrão •)

### 5. Fechamento em caixa bordada
Sempre uma **verdade**, nunca uma venda.
```
┌─────────────────────────────────────┐
│ Ela já te conhece. Já te           │
│ acompanha. Já te entende.          │
└─────────────────────────────────────┘
```

---

## Regras de Legenda (Caption Instagram)

### ⚠️ Regra de ouro: a legenda COMPLEMENTA o carrossel — nunca o duplica

O carrossel já entrega o argumento, slide a slide. Se a legenda repete os mesmos pontos nas mesmas palavras, o leitor lê tudo duas vezes — e não há motivo pra parar nem pra interagir. **A legenda é a voz por cima do carrossel** (o "áudio do criador", o "DM pra uma amiga"), não a transcrição dele.

A legenda deve adicionar uma camada que os slides NÃO têm. Escolha 1–2:
- **Bastidor / contexto pessoal** — por que esse tema agora, de onde veio, uma cena real, uma confissão.
- **Ângulo ou dado novo** — um exemplo, nuance ou número que não aparece nos slides.
- **Voz íntima** — a amiga que *comenta* o post, não que o repete.
- **Condução da conversa** — a provocação que puxa comentário + o gatilho de save/share.
- **Ponte, não resumo** — pode dar o gancho ("arrasta que o 3º slide explica…") sem entregar a conclusão.

**Teste de duplicação:** se dá pra ler SÓ a legenda *ou* SÓ o carrossel e receber a mesma coisa, a legenda está duplicando. Cada um deve deixar o leitor querendo o outro.

- ❌ Legenda = frases dos slides na mesma ordem (recap).
- ✅ Legenda = o que você diria *por cima* do carrossel: história, contexto, ou a pergunta que gera resposta.
- ❌ Gancho da legenda = headline do slide 01 repetido.
- ✅ Gancho da legenda = uma porta de entrada diferente para o mesmo tema.

### Estrutura
1. **Gancho** (primeiros ~125 chars) — porta de entrada **diferente** da capa; nunca a headline do slide 01 repetida
2. **Desenvolvimento (complemento)** — 2-4 parágrafos curtos que adicionam (bastidor / ângulo novo / voz íntima), não que recapitulam os slides
3. **Virada / insight** — fecha o pensamento da legenda (pode apontar pro carrossel: "é disso que o post fala")
4. **CTA suave** — sempre no final, nunca no meio

### CTAs Permitidos (suaves, relacionais)
- "Salva esse post 🔖"
- "Manda pra quem precisa ver isso"
- "Conta pra gente nos comentários"
- "Esse é você? Ou alguém que você conhece?"
- "Qual dessas situações te pegou?"

### CTAs Proibidos (vendas no orgânico)
- ❌ "Baixe o app agora"
- ❌ "Clique no link da bio"
- ❌ "Assine o Padrinho"
- ❌ "Teste grátis por 7 dias"

### Formatação
- Máximo **2.200 caracteres** por legenda
- Máximo **5 hashtags** — sempre no primeiro comentário, nunca na legenda
- Parágrafos curtos — máximo 3 linhas por parágrafo
- Espaço em branco entre parágrafos = respiração = leitura mobile
- Nunca começar com @menção ou # hashtag
- Emojis: usados com parcimônia, apenas quando reforçam o ponto — nunca decorativos

---

## Fontes e autoridade

Citar de onde veio o dado constrói autoridade. Mas nem toda frase pede fonte: o segredo é saber QUANDO atribuir na própria copy e quando é a voz da persona.

### Quando CITAR a fonte na copy
- **Todo número ou estatística.** Ou vem com fonte nomeada, ou não entra. Ex.: "segundo o NIAAA...", "dados do CISA mostram...".
- **Quando você declara um mecanismo ou fato científico COMO fato** (não como sentimento). Ex.: "a ciência do apego mostra que...", "de acordo com estudos de Tronick...", "segundo a OMS...".
- **Ao desmascarar um mito com dado** (a autoridade fortalece o argumento).
Formas naturais: "segundo [portal ou instituição]", "de acordo com um estudo de [autor ou universidade]", "pesquisas do [órgão] apontam".

### Quando NÃO precisa
- **Vivência, emoção, observação em 1ª pessoa.** A persona não cita estudo pra falar do que sentiu.
- Verdade de senso comum ou não-factual.
Regra prática: se a frase fica mais forte com "segundo X", cite; se soaria acadêmica demais numa confissão íntima, mantenha como voz.

### Como e onde
- **Blog:** citação nominal e link no corpo.
- **Carrossel:** citar leve, "segundo o NIAAA" dentro do slide ou um rodapé "fonte: [órgão]" no último slide. Nunca poluir o slide.
- **Legenda:** linguagem natural ("li um estudo que...", "os dados mostram...").
- **Sempre:** preferir as fontes de `KNOW/Padrinho/KNOW_Sources.md` e registrar a fonte no `FACTS_Verified.md` (gate) antes de publicar. Sem fonte, não afirme como fato: reformule como observação ou corte.

## Pontuação

- **Não usar travessão / em-dash (—).** Em vez de unir ou intercalar frases com `—`, reescreva com vírgula, dois-pontos, ponto final ou parênteses. Ex.: em vez de *"presença — a que pesa quando está"*, escreva *"presença: a que pesa quando está"* ou divida em duas frases. Vale para todos os canais (slides, legendas, blog, LinkedIn, podcast) e para os documentos de planejamento.

## Vocabulário Aprovado

### ✅ Usar
- "relação com o álcool" (não "problema")
- "sem julgamento"
- "no seu ritmo" / "no seu tempo"
- "um passo de cada vez"
- "com apoio de verdade"
- "tecnologia com alma"
- "o Bill" — sempre com artigo, sempre como pessoa
- "estilo de vida" (foco na aspiração, não na doença)
- "retomar o controle"
- "com leveza"
- "acolhimento"
- "de verdade"
- "Padrinho" — como marca e como conceito de apoio

### ❌ Nunca usar (para descrever o leitor)
- "alcoólatra"
- "dependente" como rótulo direto
- "alcoólismo" no contexto de diagnóstico
- "você precisa de ajuda" (imperativo)
- "é fácil" / "simples assim"
- linguagem de AA / 12 passos (sem contextualizar)
- "doença" como rótulo do leitor
- qualquer coisa que soe como diagnóstico médico

---

## Blog & Long-Form Content Writing Style

### Voz & Tom Geral
A voz do Padrinho é **compassiva mas não condescendente**, honesta sobre a dor, otimista sobre recuperação. Falamos como amigos de confiança que entendem a luta — do ponto de vista de quem já esteve lá.

**Default emotional register:** Esperançoso + realista  
**Nunca:** Clínico, julgador, tóxico-positivo ("é só parar de beber!")  
**Sempre:** Validante, focado em soluções, embasado em evidências, vulnerável sem overshare

**Assinatura de tom:**
> "Sentir-se perdido faz parte do caminho para a sobriedade. A boa notícia é que muitos já passaram por essa situação e podem compartilhar picas valiosas."

---

### Estrutura Narrativa — O Padrão Universal

Cada post de blog segue esta estrutura:

```
1. OPENING HOOK (1-2 sentences)
   └─ Problema/pergunta relatable OU
      Verdade chocante OU
      Cenário emocional específico

2. VALIDAÇÃO + PONTE (2-3 sentences)
   └─ "Isso é normal", "Você não está sozinho"
      Remove a vergonha do problema

3. CORE TEACHING (Main body, 3-5 seções)
   └─ Alternância: história pessoal + educação
      └─ Explica O PORQUÊ (psicologia/biologia remove a culpa)
      └─ Oferece 3-5 passos práticos ou insights

4. REFLEXÃO + PERGUNTAS (Mid-post engagement)
   └─ *"Pergunte a si mesma: o que eu espero dessa conversa?"*
      Faz o leitor interiorizar a mensagem

5. FECHAMENTO (1-3 sentences)
   └─ Reafirma esperança
   └─ Padrinho CTA (pessoal, específico)
   └─ NUNCA fecha em nota negativa
```

---

### Padrões Narrativos Comprovados

**Padrão A: Problema → Compreensão → Solução → Esperança**
- Usado em: "Estou perdido", "Abstinência de álcool", "Como contar sobre a doença"
- Identifica o ponto de dor upfront
- Explica POR QUE acontece (remove culpa)
- Oferece 3-5 passos práticos
- Encerra com encorajamento + CTA

**Padrão B: História Pessoal → Insight Universal → Ação**
- Usado em: "Entre afilhados" posts
- Abre com momento vulnerável e específico (detalhes sensoriais)
- Extrai a lição ("O que aprendi é...")
- Traduz para situação do leitor
- Oferece caminho adiante

**Padrão C: Mito-Busting → Verdade Profunda → Empoderamento**
- Usado em: "10 coisas que você precisa saber"
- Desmente um mito comum
- Explica a verdade nuançada
- Mostra como entender isso empodera o leitor
- Repete para cada ponto

---

### Palavras de Poder (Usadas Repetidamente)

**Core vocabulary** — aparecem em quase todo post:
- **sobriedade** — a estrela do norte
- **jornada/caminho** — enquadra recuperação como processo
- **recuperação** — termo neutro, respeitoso
- **apoio** — comunidade é essencial
- **coragem** — redefine admissão como força, não fraqueza
- **esperança** — sempre presente, mesmo em tópicos difíceis
- **significado** — recuperação dá propósito à vida
- **padrinho/madrinha** — central ao modelo
- **compaixão/empatia** — valor central

**Frases conector** — fluxo e engajamento:
- "Lembre-se de que..."
- "É importante que..."
- "A boa notícia é..."
- "Imagine que..."
- "Pergunte a si mesma..."
- "Saber que..."
- "Para não..."
- "O que acontece é..."
- "Entender... é vital para..."

**Frases de validação** — faz o leitor se sentir visto:
- "Sentir-se [emoção] é comum entre aqueles que..."
- "Não é fraqueza. É biologia."
- "Você não está sozinho(a)."
- "Isso é um passo corajoso."
- "Sua abertura é um pedido de ajuda genuíno."

---

### Estrutura de Sentença — Variedade Rítmica

**Curta + pontual (ênfase):**
- "A recuperação é possível!"
- "Não acreditei muito."
- "Ufa!"

**Média + fluxo (desenvolvimento):**
- "Entender os sintomas da abstinência de álcool, quando eles aparecem e o que fazer com eles pode fazer toda a diferença nesse processo."

**Longa + contemplativa (reflexão):**
- "Ao encontrar ajuda, achei também o meu propósito. Eu me tornei uma pessoa disciplinada, resiliente, estudiosa, determinada, altruísta, entre outras qualidades que me orgulho."

**Uso de dois-pontos (pausa para reflexão):**
- "O álcool é uma droga: socialmente aceita, mas uma droga"
- "A recuperação é como uma trilha cheia de altos e baixos, e é natural, em alguns momentos, sentir que o ponto de chegada está distante."

---

### Estrutura de Parágrafos & Ritmo

**Comprimento padrão:**
- Opening: 2-3 sentences (contexto)
- Body: 3-5 sentences máx (digestível)
- Closing: 1-3 sentences (punch)

**Headers (Padrão de títulos):**
- **Ação-baseado:** "Entenda onde você está"
- **Pergunta-baseado:** "Por que você se sente perdido?"
- **Declaração-baseado:** "O papel dos Padrinhos&Madrinhas"
- **How-to-baseado:** "Como criar seu próprio ritual"

**⚠️ Capitalização de títulos em português:**
Somente a **primeira palavra** e **nomes próprios** levam letra maiúscula. O restante é minúsculo.
- ✅ `Recaída não é o fim da história`
- ✅ `O que ninguém te conta sobre recaída`
- ✅ `Mulheres em recuperação: por que espaços tradicionais não funcionam`
- ❌ `Recaída Não É O Fim Da História` ← estilo inglês, nunca usar em PT-BR

**Respiração visual:** Linha em branco entre parágrafos (mobile-friendly)

---

### Técnicas de Storytelling

**Quando usar histórias pessoais:**

1. **Especificidade > Generalidade**
   - ❌ "Eu estava em uma festa e bebi muito"
   - ✅ "Imagine a cena: eu de terno, minha esposa vestida de noiva — com véu e tudo — em uma padaria às 4 da manhã."

2. **Turning point vulnerável** (momento de realization)
   - "Foi então que... no desespero total, lembrei do AA e pedi ajuda"
   - "E foi aí que o estalo veio"

3. **Extração da lição** (fazer ser universal)
   - "Hoje sei que o excesso de álcool daqueles dias poderia ter resultado em uma tragédia"
   - "Percebi que... o álcool estava controlando meus momentos"

4. **Hope bridge** (de dor para possibilidade)
   - "Não acreditei muito, porém, não tinha mais muitas escolhas, nada me restava. Então me agarrei nisso."

---

### Metáforas & Linguagem Simbólica

**Metáforas primárias** (usadas repetidamente):

1. **Jornada/Caminho:**
   - "trilha cheia de altos e baixos"
   - "cada pequeno passo conta"
   - "caminhos que ajudam"

2. **Estar Perdido/Navegação:**
   - "perdido em uma floresta sem um mapa"
   - "oferecem um mapa e uma bússola"
   - "encontrar seu próprio caminho"

3. **Luz/Escuridão:**
   - "despertar espiritual"
   - "cérebro havia silenciado"
   - "confusão mental"

4. **Construção/Fundação:**
   - "ferramentas para recuperação"
   - "crescimento"
   - "fortalecer"

5. **Ritual/Significado:**
   - "simbolismo"
   - "significado"
   - "transformar"

**Evitar:** Metáforas militares ("fight addiction" soa como culpa)

---

### Conteúdo Educacional — When Teaching Facts

**Ordem de prioridades:**

1. **Realidade emocional primeiro** (antes da ciência)
2. **Explique O PORQUÊ** (psicologia/biologia — remove culpa)
3. **Liste ou divida** em seções numeradas ou headers
4. **Valide continuamente** — "Isso é comum, você não está sozinho"
5. **Termine com próximos passos** práticos

**FAQ/Knowledge sections:**
- Use bold para perguntas
- Respostas 2-4 sentences (scannable)
- Sempre atém-se para esperança ou ação

---

### CTAs — Soft vs. Hard

**Soft CTAs** (ao longo do post):
- "Isso é importante de entender"
- "Vale a pena pensar..."
- "Pergunte a si mesma..."
- "Deixe claro que..."

**Hard CTAs** (final do post — formato):
```
[Closing hope statement].

O [Padrinho] está aqui para [specific benefit].
```

**Exemplos:**
- "Se você, ou alguém que você conhece, está lutando contra a dependência de álcool, saiba que a recuperação é possível! O Padrinho está aqui para te orientar e ajudar."
- "O Padrinho é uma solução fácil, acessível e tecnológica, criado por pessoas que já estiveram onde você está. Fale com a gente!"

**Event CTAs:**
- "No dia [DATE], às [TIME], você está convidado para [EVENT]..."
- Inclua link mas mantenha tom conversacional

---

### Formatting & Visual Elements — Blog

**Headers:**
- Use **bold** para headers principais
- Use *itálico* para ênfase em phrases
- Headers são ação/pergunta-orientados
- Nunca ALL CAPS
- **Capitalização PT-BR:** Apenas a primeira palavra e nomes próprios em maiúsculo. Nunca estilo inglês (Title Case) em títulos em português.

**Listas:**
- Bullet points para traits/sintomas
- Numbered lists para passos ou "X things"
- 1-2 linhas por bullet point máx
- Bold na primeira palavra-chave

**Blockquotes:**
- Para insights poderosos ou citações diretas
- Tipicamente 1-2 sentences
- Visualmente centradas mentalmente
- Geralmente extraído de histórias pessoais

---

### Checklist — Blog Post Quality

Antes de publicar, verifique:

- [ ] Opening hook aborda imediatamente problema/emoção do leitor?
- [ ] Primeiro parágrafo valida ("Isso é normal/comum/compreensível")?
- [ ] Alternância entre histórias pessoais e conselhos (ou ciência + emoção)?
- [ ] Pelo menos uma metáfora específica ou imagem vívida?
- [ ] 2-3 perguntas de reflexão (*como esta*)?
- [ ] Fechamento irradia esperança, não desespero?
- [ ] Contém "Lembre-se de que..." ou "É importante que..." pelo menos 1x?
- [ ] CTA Padrinho é pessoal e específico?
- [ ] Zero linguagem de culpa/vergonha? Foco em agência?
- [ ] Comprimentos de parágrafo variam (curto + longo mix)?
- [ ] Lê como conversa, não como lecture?
- [ ] Usa dois-pontos ou parênteses para pausas de reflexão (nunca travessão —)?
- [ ] Fala com "você" (2ª pessoa), não terceira pessoa?

**Word count sweet spot:** ~2000 palavras (mínimo 1800, máximo 2200)  
(Testimonials: 400–600 words)

> ⚠️ **O alvo é para ser atingido, não um teto distante.** O blog-pilar deve **chegar a ~2.000 palavras** desenvolvendo cada seção (história + porquê + passo prático) — não parar em ~750 e ficar raso. Mesmo princípio do § "Escreva até a capacidade do componente": subescrever = conteúdo raso. Se o rascunho ficou curto, **aprofunde** (mais exemplo, mecanismo, reflexão), não encerre.

---

### Tom Específico por Persona

**Rosa Equilibrista (25F, nativa de Instagram):**
- Mais conversacional, linguagem adjacent a emoji
- Foco em coping momento-a-momento
- "Você nesta hora..." language
- Ritual e mindfulness sentem-se naturais
- Referências contemporâneas okay

**Ana Mae Protetora (40F, mãe/cuidadora):**
- Mais prática, focado em "how-to"
- Linguagem de impacto familiar
- Tópicos "Como conversar com..."
- Auto-cuidado enquadrado como cuidado familiar
- Leituras mais longas e substantivas

**Pedro Autónomo (31M, freelancer):**
- Estrutura problema-solução
- Independência enquadrada como "escolhendo ajuda"
- Linguagem de carreira/estabilidade
- Ferramentas práticas e conforto com tech
- Seções mais curtas e scannable

---

### Guardrails de Tom — O que Dizer vs. O que NÃO Dizer

#### ✅ DO SAY
- "Dependência de álcool é uma doença"
- "Isso é corajoso/difícil/normal"
- "Você não está sozinho"
- "A recuperação é um processo"
- "Apoio profissional ajuda"
- "Pequenos passos contam"
- "Cada dia é uma vitória"

#### ❌ DON'T SAY
- "Just stop drinking" (oversimplification, shaming)
- "Weakness" ou "lack of willpower" (medical misframe)
- "You're broken" (reframes identity as disease)
- "One day you'll be cured" (recovery is ongoing)
- Jargão clínico sem tradução
- "Alcoólatra" — use "pessoa em recuperação" ou "alguém que luta com o álcool"

---

### Assinatura Final de Estilo (em 3 sentences)

Escrevemos como se estivéssemos sentados de frente para alguém que está com medo e sozinho, falando sua linguagem (português, conversacional, honesto), validando sua luta enquanto mostramos que o caminho adiante não é apenas possível — está acontecendo todos os dias para milhares de pessoas como eles em nossa comunidade.

**Essência:** Compaixão + Clareza + Esperança

---

## Padrões de Destaque Visual

### Highlight — bloco azul (layer `hl`)
- Usado **exclusivamente em headlines e títulos**
- Cobre a linha ou frase de maior peso emocional do headline
- Cor: #C0D1DB (Jungle Mist) ou #669AB7 (Horizon) dependendo do componente
- Nunca usar em body text, CTA ou bullets
- 1 highlight por post — sempre no título, nunca no corpo

### Wave underline (layer `wave`)
- Usado em **textos menores**: body text, CTA box, subhead
- Nunca no headline (para headline usa-se o `hl`)
- Posicionar sob a palavra-chave mais importante do texto menor
- Nunca cobrir mais de uma palavra por slide

### Handle @padrinho.app
- Sempre presente — é a assinatura, não um CTA
- Sempre em letras minúsculas
- Sempre espaçado (tracking/letter-spacing alto)
- Sempre centralizado, y=1321, tamanho pequeno
- Quase invisível — como uma assinatura de artista

---

## Checklist Antes de Aprovar um Copy

- [ ] O headline tem pelo menos uma palavra em itálico?
- [ ] Existe exatamente 1 destaque inline (retângulo azul)?
- [ ] O copy começa com gancho nos primeiros 125 caracteres?
- [ ] A legenda tem CTA suave no final (não de venda)?
- [ ] Nenhuma das palavras proibidas foi usada?
- [ ] O tom é quente, não clínico?
- [ ] O handle @padrinho.app está presente no frame?
- [ ] A legenda tem menos de 2.200 caracteres?
- [ ] Os hashtags foram separados para o primeiro comentário?
- [ ] O fechamento é uma verdade, não uma venda?

---

## Quebras de linha nos slides (regra crítica)

**Nunca inserir `\n` manual para quebrar frases contínuas.**
O Figma quebra automaticamente pela largura do frame — forçar quebras
cria resultados visuais estranhos e imprevisíveis.

### Quando NÃO usar `\n`
- Frases contínuas, mesmo que longas
- Continuações após vírgula ou dois-pontos
- Body text e CTA box

```
❌ "E percebeu que era mais difícil do que parecia.\nIsso diz muito sobre como o cérebro funciona."
✅ "E percebeu que era mais difícil do que parecia. Isso diz muito sobre como o cérebro funciona."

❌ "Dopamina é dopamina — seja numa dose de álcool,\nnum scroll infinito ou numa compra por impulso.\nO circuito é o mesmo."
✅ "Dopamina é dopamina — seja numa dose de álcool, num scroll infinito ou numa compra por impulso. O circuito é o mesmo."
```

### Quando usar `\n`
- Separar headline de headline-italic (são layers diferentes)
- Separar itens de lista que são visualmente distintos
- Separar parágrafos com intenção editorial clara (pausa real)

```
✅ "Quando acontecer —\ne pode acontecer:"   ← dois momentos distintos intencionais
✅ bullet-1: "Não se puna."\nbullet-2: "Fale com alguém."   ← itens separados
```

---

**Last Updated:** 2026-07-01 (carrossel: gancho + narrativa contínua; coerência com a regra do travessão)  
**Maintained by:** Padrinho Marketing Team  
**References:**  
- [KNOW/Padrinho/KNOW_BrandPositioning.md](KNOW/Padrinho/KNOW_BrandPositioning.md)
- [AGENT/AGENT_Operational.md](AGENT/AGENT_Operational.md)
