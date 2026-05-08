// api/orchestrate.js
// Roda todo dia às 8h BRT (11h UTC)
// Claude gera copy → Figma exporta slides → Telegram envia para aprovação

import Anthropic from "@anthropic-ai/sdk";

const FIGMA_FILE_ID = "sBItPeNLyvT5EMyKLqQbRv";

// Arco semanal — editorial-pillars.md
const WEEKLY_ARC = [
  { day: "Domingo",  pilar: "Acolhimento",     template: "cover/minimal-light",           funcao: "Resolução" },
  { day: "Segunda",  pilar: "Desmascaramento", template: "cover/dark-bold-left",          funcao: "Hook" },
  { day: "Terça",    pilar: "Reconhecimento",  template: "cover/photo-fullbleed",         funcao: "Hook" },
  { day: "Quarta",   pilar: "Empoderamento",   template: "block/list-light",              funcao: "Profundidade" },
  { day: "Quinta",   pilar: "Empoderamento",   template: "data/wave-number",              funcao: "Profundidade" },
  { day: "Sexta",    pilar: "Acolhimento",     template: "block/minimal-statement-light", funcao: "Resolução" },
  { day: "Sábado",   pilar: "Prova Social",    template: "cover/blumine-circle",          funcao: "Resolução" },
];

async function generateContent(arc) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long", day: "numeric", month: "long",
  });

  const prompt = `Você é o agente de conteúdo do Padrinho.app — plataforma de recuperação de dependência química no Brasil.

# PERSONA PRIMÁRIA — Rosa, A Equilibrista
- ~27 anos, designer UX/gráfico, Porto Alegre, R$3k–6k
- Bebe excessivamente mas não se vê como "alcoólatra"
- Usa álcool como válvula de escape social e emocional
- Instagram heavy user — consome bem-estar e lifestyle
- Não está pronta para admitir que tem "um problema"
- Começa a perceber: ressacas que comprometem segundas, ressaca moral (não física)
- Engajamento esperado: Like & Save silencioso, compartilha 1:1 com amiga, DM sobre o app

# TENSÕES NARRATIVAS (material de conteúdo)
- Sexta perfeita → sábado com aquela pergunta que ela não faz em voz alta
- "Sou boa profissional" × "aquela reunião na segunda foi um desastre"
- "Estou no controle" × o copo que foi além do que ela planejou
- Vida social como valor × o preço que está pagando
- Quer mudar × não quer mudar tudo

# REGRA DE OURO
"Do not promote on the content ever — do it on the ads only."
O conteúdo orgânico inspira e constrói relacionamento. Rosa precisa se ver — não ser vendida para.

# PILAR DO DIA: ${arc.pilar} (${arc.funcao})
# DATA: ${today}
# TEMPLATE FIGMA: ${arc.template}

# VOCABULÁRIO
✅ Usar: "relação com o álcool", "sem julgamento", "no seu ritmo", "retomar o controle",
         "o Bill" (sempre com artigo), "acolhimento", "Padrinho", "estilo de vida"
❌ Nunca: "alcoólatra", "dependente" como rótulo, "você precisa de ajuda" (imperativo),
          linguagem clínica, diagnóstico médico, "doença" como rótulo direto

# REGRAS DE COPY
- Headline: mínimo 1 palavra em *itálico* (peso emocional da frase)
- Estruturas aprovadas:
  • Contraste: "Você não precisa [X] para [Y]. Pode ter os dois."
  • Espelho: "Na vida de quem [situação cotidiana específica]..."
  • Pivot: "Agora pensa comigo:" [pausa] "E se..."
  • Lista com ◆ (losango — nunca bullet •)
- Fechamento: sempre uma verdade, nunca uma venda
- CTAs permitidos: "Salva esse post 🔖", "Manda pra quem precisa ver isso", "Esse é você?"
- CTAs proibidos: "Baixe o app", "Clique no link", "Assine", "Teste grátis"
- Legenda: máx 2.200 chars, parágrafos curtos, hashtags separados (primeiro comentário)
- Handle @padrinho.app sempre presente nos frames

# TAREFA
Crie um post carrossel para o Instagram do Padrinho (3–5 slides).
Responda APENAS em JSON válido, sem markdown, sem texto antes ou depois:

{
  "pilar": "nome do pilar",
  "theme": "tema específico do post em uma frase",
  "hook": "frase de abertura — os primeiros 125 chars da legenda",
  "slides": [
    {
      "order": 1,
      "component": "${arc.template}",
      "headline": "texto principal do slide — máx 8 palavras, com *palavra* em itálico",
      "subtext": "texto secundário se houver — máx 20 palavras",
      "visual_note": "instrução para o visual: clima, elemento central, o que a imagem deve evocar"
    }
  ],
  "caption": "legenda completa — gancho + desenvolvimento + virada + CTA suave. Tom conversacional, parágrafos curtos. Máx 300 palavras.",
  "hashtags": "#recuperacao #sobriedade #saude (máx 10, para primeiro comentário)",
  "component_rationale": "por que esse template serve para esse pilar"
}`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content[0].text.trim();
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

async function exportFigmaSlides(content) {
  const figmaToken = process.env.FIGMA_TOKEN;
  const slides = [];

  const res = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE_ID}/components`,
    { headers: { "X-Figma-Token": figmaToken } }
  );
  const data = await res.json();
  const allComponents = data.meta?.components || [];

  for (const slide of content.slides) {
    const templateName = slide.component.split("/")[1];
    const component = allComponents.find(
      (c) => c.name.toLowerCase().includes(templateName.toLowerCase())
    );

    if (!component) {
      console.log(`Componente não encontrado: ${slide.component}`);
      slides.push({ order: slide.order, url: null, ...slide });
      continue;
    }

    const exportRes = await fetch(
      `https://api.figma.com/v1/images/${FIGMA_FILE_ID}?ids=${component.node_id}&format=png&scale=2`,
      { headers: { "X-Figma-Token": figmaToken } }
    );
    const exportData = await exportRes.json();
    const imageUrl = exportData.images?.[component.node_id] || null;

    slides.push({ order: slide.order, url: imageUrl, ...slide });
  }

  return slides;
}

async function sendToTelegram(content, slides) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const baseUrl = `https://api.telegram.org/bot${botToken}`;
  const sessionId = Date.now().toString();

  const validSlides = slides.filter((s) => s.url);
  if (validSlides.length > 0) {
    const media = validSlides.map((s) => ({
      type: "photo",
      media: s.url,
      caption: `Slide ${s.order}: ${s.headline}`,
    }));
    await fetch(`${baseUrl}/sendMediaGroup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, media }),
    });
  }

  const preview = `🎯 *Padrinho — Draft do dia*

*Pilar:* ${content.pilar}
*Tema:* ${content.theme}

*Slides (${content.slides.length}):*
${content.slides.map((s) => `${s.order}. ${s.headline}`).join("\n")}

*Caption:*
${content.caption}

*Hashtags:* ${content.hashtags}`;

  const msgRes = await fetch(`${baseUrl}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: preview,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✅ Publicar no Instagram", callback_data: `approve_${sessionId}` },
            { text: "✏️ Refazer", callback_data: `redo_${sessionId}` },
          ],
          [
            { text: "❌ Cancelar", callback_data: `cancel_${sessionId}` },
          ],
        ],
      },
    }),
  });

  const msgData = await msgRes.json();
  return { sessionId, messageId: msgData.result?.message_id, content, slides };
}

export default async function handler(req, res) {
  const isCron = req.headers["x-vercel-cron"] === "1";
  const isManual = req.headers.authorization === `Bearer ${process.env.CRON_SECRET}`;

  if (!isCron && !isManual) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const dayOfWeek = new Date().getDay();
    const arc = WEEKLY_ARC[dayOfWeek];

    console.log(`🚀 Iniciando geração — ${arc.day} — Pilar: ${arc.pilar}`);

    console.log("📝 Gerando copy...");
    const content = await generateContent(arc);
    console.log("✅ Copy gerado:", content.theme);

    console.log("🎨 Exportando slides do Figma...");
    const slides = await exportFigmaSlides(content);
    console.log(`✅ ${slides.filter((s) => s.url).length}/${slides.length} slides exportados`);

    console.log("📱 Enviando pro Telegram...");
    const session = await sendToTelegram(content, slides);
    console.log("✅ Enviado! Session ID:", session.sessionId);

    return res.status(200).json({
      success: true,
      sessionId: session.sessionId,
      theme: content.theme,
      pilar: arc.pilar,
      slides: slides.length,
    });
  } catch (error) {
    console.error("❌ Erro:", error);
    return res.status(500).json({ error: error.message });
  }
}
