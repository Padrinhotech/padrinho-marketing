# Estado Atual do Projeto — Abril 2026

## O que está pronto

### Sistema de automação
- Pipeline completo: Prompt → Strategy → Tactic → Copy → Componente → Figma _QUEUE
- Human-in-the-loop em cada camada
- Carrossel de recaídas (10 slides) em _QUEUE aguardando aprovação visual

### GitHub (padrinho-marketing)
- CLAUDE.md — instruções master do agente
- brand/ — produto, tokens, personas
- skills/strategy/ — brand positioning, market context (refresh mensal)
- skills/tactic/ — pilares editoriais, trend radar (dados reais integrados)
- skills/audiences/ — ICP, 4 personas separadas, user insights do Elo
- skills/operational/ — copy rules, component system, figma delivery, photo guidelines, visual agent

### Figma (sBItPeNLyvT5EMyKLqQbRv)
- _COMPONENTS — 19 componentes pixel-perfect criados pelo designer
- _QUEUE — 10 slides do carrossel de recaídas prontos para revisão

---

## O que falta — Próximos passos

### Desenvolvimento necessário (bloqueante)

**1. Injeção de fotos via unsplash-mcp**
- unsplash-mcp instalado no Claude Code (~/.claude.json)
- Problema: Claude.ai e Claude Code são ambientes separados
- Solução: usar Claude Code no terminal para rodar o workflow com foto
- Comando: `claude "Injeta fotos nos slides 5 e 9 do carrossel em _QUEUE"`
- Alternativa futura: expor unsplash-mcp via URL para Claude.ai

**2. Fotos nos slides 5 e 9**
- Slide 05 (block-h): query "woman overwhelmed anxious dark moody authentic portrait"
- Slide 09 (block-j): query "man stressed hands head dark moody authentic portrait"
- Layer de foto: "ivana-cajina-9fl5AUulJsk-unsplash 1" (nos dois componentes)
- Node IDs: 3363:219 (slide 5) e 3363:309 (slide 9)

**3. Revogar a Unsplash key exposta**
- Acessar: unsplash.com/oauth/applications/926138
- Keys → Rotate
- Atualizar brand/unsplash-key.txt com a nova key

### Design (bloqueante)
**4. Componentes finais no Figma**
- Os 19 componentes em _COMPONENTS são pixel-perfect do designer
- Quando finalizados, atualizar references/index.md com Frame IDs reais
- O agente usa esses componentes como molde — não constrói do zero

### Conteúdo (próximo)
**5. Legenda + hashtags do carrossel de recaídas**
- Caption ainda não foi escrita
- Após aprovação visual dos 10 slides → escrever legenda e hashtags
- Mover para _APPROVED quando pronto para publicação

**6. Protocolo de atualização mensal**
- market-context.md tem protocolo definido mas ainda não foi executado
- Próxima atualização: Maio 2026

**7. Dados de interesse dos usuários**
- Dashboard Elo capturado em Abril 2026 (user-insights.md)
- Solicitar atualização mensal ao time

---

## Arquitetura de foto — decisão pendente

Três opções em aberto:

| Opção | Status |
|---|---|
| unsplash-mcp via Claude Code | ✅ Instalado, pronto pra testar |
| Banco de fotos em _ASSETS no Figma | Não construído — mais confiável a longo prazo |
| Plugin Figma | Não construído — melhor para times |

**Recomendação:** Testar o Claude Code primeiro. Se funcionar bem, é a solução definitiva.

---

## Credenciais

| Serviço | Localização | Status |
|---|---|---|
| Unsplash key | brand/unsplash-key.txt | ⚠️ REVOGAR — foi exposta em conversa |
| Figma token | brand/figma-token.txt (gitignored) | Não criado ainda |
| GitHub token | Exposto em conversa anterior | ⚠️ REVOGAR — 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 |
| unsplash-mcp | ~/.claude.json no Claude Code | ✅ Instalado |
