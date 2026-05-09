/**
 * Claude Client — Wrapper para Claude API com agent instructions
 * 
 * Gerencia:
 * - Autenticação via API key
 * - System prompts customizados por agente
 * - Parsing de resposta (JSON, markdown, etc)
 */

import https from "https";

class ClaudeClient {
  constructor(apiKey = process.env.ANTHROPIC_API_KEY) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.anthropic.com/v1/messages";
    this.model = "claude-3-5-sonnet-20241022"; // Latest model
  }

  /**
   * Fazer request para Claude API
   */
  async request(messages, systemPrompt, options = {}) {
    const payload = {
      model: this.model,
      max_tokens: options.max_tokens || 2048,
      system: systemPrompt,
      messages,
      ...options,
    };

    return new Promise((resolve, reject) => {
      const data = JSON.stringify(payload);

      const req = https.request(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
          "anthropic-version": "2023-06-01",
        },
      });

      req.on("response", (res) => {
        let body = "";

        res.on("data", (chunk) => {
          body += chunk;
        });

        res.on("end", () => {
          try {
            const result = JSON.parse(body);

            if (res.statusCode !== 200) {
              return reject(
                new Error(`Claude API error: ${result.error?.message || body}`)
              );
            }

            resolve(result);
          } catch (e) {
            reject(new Error(`Failed to parse Claude response: ${body}`));
          }
        });
      });

      req.on("error", reject);
      req.write(data);
      req.end();
    });
  }

  /**
   * Call Claude com system prompt
   */
  async call(userMessage, systemPrompt, options = {}) {
    const response = await this.request(
      [{ role: "user", content: userMessage }],
      systemPrompt,
      options
    );

    // Extrair texto da resposta
    const text = response.content[0]?.text || "";
    return text;
  }

  /**
   * Call Claude e parsear JSON
   */
  async callJSON(userMessage, systemPrompt, options = {}) {
    const text = await this.call(userMessage, systemPrompt, {
      ...options,
      max_tokens: 4096,
    });

    // Tentar extrair JSON do texto
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in Claude response");
    }

    return JSON.parse(jsonMatch[0]);
  }
}

/**
 * System prompts pré-configurados para cada agente
 */

const STRATEGY_SYSTEM_PROMPT = `Você é o Strategy Agent do Padrinho Marketing.

Sua responsabilidade é analisar insights de performance e gerar um briefing estratégico que vai guiar o conteúdo do dia.

Regras importantes:
1. Base tudo em dados reais (insights.md)
2. Conecte SEMPRE ao brand positioning
3. Defina 3-5 objetivos estratégicos específicos
4. Mapeie para UMA persona principal (Rosa, Pedro, Ana-Mae ou Caio)
5. Defina tom do dia e pilares editoriais a explorar
6. Cite números para justificar cada objetivo

Output obrigatório: JSON válido com a estrutura especificada.

Seja conciso e acionável. O próximo agente vai ler isso para gerar conteúdo específico.`;

const TACTIC_SYSTEM_PROMPT = `Você é o Tactic Agent do Padrinho Marketing.

Sua responsabilidade é desdobrar a estratégia em um plano de conteúdo concreto (5-10 posts).

Regras importantes:
1. Leia a strategic brief anterior
2. Mapeie cada objetivo a temas específicos
3. Conecte a editorial pillars (Histórias Reais, Educação, Comunidade, Auto-compaixão)
4. Defina format (carrossel, reel, caption, story, igtv)
5. Escreva hook que engaje
6. Defina key messages

Output obrigatório: JSON válido com array de posts.

Crie um plano que possa ser executado em uma semana (distribuição diária).`;

const OPERATIONAL_SYSTEM_PROMPT = `Você é o Operational Agent do Padrinho Marketing.

Sua responsabilidade é gerar copy (captions + hashtags) e visual brief (fotos + layout) para cada post.

Regras importantes:
1. Leia copy-rules.md para tom e estilo
2. Captions: 100-300 chars, hook + mensagem + CTA
3. Hashtags: 15-20 relevantes, misture trending + brand
4. Alt text: descrição para acessibilidade
5. Visual brief: especifique unsplash query EXATA
6. LGPD: nunca nomeie pessoas sem consentimento
7. Validar: nada de jargão médico, sem promessas de cura

Output obrigatório: JSON com caption, hashtags, alt_text, visual_brief por post.

O próximo agente (Figma) vai usar isso para criar frames.`;

const FIGMA_SYSTEM_PROMPT = `Você é o Figma Design Agent do Padrinho Marketing.
export default ClaudeClient;
export {
  STRATEGY_SYSTEM_PROMPT,
  TACTIC_SYSTEM_PROMPT,
  OPERATIONAL_SYSTEM_PROMPT,
  FIGMA_SYSTEM_PROMPT
};
Sua responsabilidade é materializar o conteúdo aprovado em frames Figma reais.

Regras importantes:
1. Receber operational_copy.json com copy + visual brief
2. Localizar componentes em _COMPONENTS do Figma
3. Copiar para _QUEUE e renomear com padrão: "Post [N] - [Tema] - [Date]"
4. Popular textos (caption, hashtags)
5. Injetar fotos via unsplash-mcp com query especificada
6. Ajustar layout (centralizar, contraste, padding)
7. Exportar PNG 1080x1080 (ou 1080x1350 para carousel)

Output obrigatório: JSON com frame IDs, export URLs, antes/depois para Telegram.

Seu output será o ÚLTIMO antes da publicação no Instagram.`;

// ============================================================================
// EXPORTS
// ============================================================================



/**
 * EXEMPLO DE USO:
 * 
 * const ClaudeClient = require("./lib/claude-client.js");
 * const { STRATEGY_SYSTEM_PROMPT } = require("./lib/claude-client.js");
 * 
 * const claude = new ClaudeClient();
 * 
 * // Chamar Claude com texto
 * const response = await claude.call(
 *   "Gerar briefing estratégico para hoje",
 *   STRATEGY_SYSTEM_PROMPT
 * );
 * 
 * // Chamar Claude e parsear JSON
 * const briefing = await claude.callJSON(
 *   "Dados: " + insightsJson,
 *   STRATEGY_SYSTEM_PROMPT
 * );
 */
