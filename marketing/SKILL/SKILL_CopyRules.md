---
title: "Copy Rules — Padrinho Instagram"
version: "1.0"
status: "Final"
type: "Skill"
owner: "Padrinho Marketing Automation"
parent_doc: "marketing/SKILL/"
tags: [copy, writing, captions, cta, typography, tone]
---

# Copy Rules — Padrinho Instagram

Directrizes para redação de captions, copy e estruturas visuais de texto em conteúdo gerado pelo Operational Agent. Leia este arquivo se está criando ou refinando copy para Instagram. Usado pelo Operational Agent para validar e estruturar saídas antes de enviar para aprovação Telegram.

## Estrutura Visual de Post

### Tipografia (sempre Instrument Serif + Instrument Sans)
- **Headline display:** Instrument Serif, 32px, line-height 150%, Regular
- **Palavra-chave emocional:** sempre em itálico dentro do headline
- **Destaque inline:** retângulo #669AB7 @ 45% opacidade atrás de 1 frase por post
- **Subtexto / body:** Instrument Sans, 14-16px, line-height 140%
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

### Estrutura
1. **Gancho** (primeiros ~125 chars — o que aparece antes do "ver mais")
2. **Desenvolvimento** — 2-4 parágrafos curtos, respira entre eles
3. **Virada / insight** — a verdade que o post entrega
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
- Máximo **30 hashtags** — sempre no primeiro comentário, nunca na legenda
- Parágrafos curtos — máximo 3 linhas por parágrafo
- Espaço em branco entre parágrafos = respiração = leitura mobile
- Nunca começar com @menção ou # hashtag
- Emojis: usados com parcimônia, apenas quando reforçam o ponto — nunca decorativos

---

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
- Continuações após vírgula ou travessão
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

**Last Updated:** 2026-05-07  
**Maintained by:** Operational Agent  
**References:**  
- [../SKILL/SKILL_audiences/user-insights.md](../SKILL/SKILL_audiences/user-insights.md)
- [../SKILL/SKILL_KNOW_BrandPositioning.md](../SKILL/SKILL_KNOW_BrandPositioning.md)
- [../AGENT/AUT_operational.md](../AGENT/AUT_operational.md)
