> ⚠️ **DEPRECATED — consolidado em `KNOW/Padrinho/KNOW_MarketIntel.md` (2026-06-27).** Referência histórica.

---
title: "IG Benchmark — Padrinho (Auditoria da Conta)"
version: "1.0"
status: "Final"
type: "Knowledge"
owner: "Padrinho Marketing Automation"
parent_doc: "KNOW/"
tags: [instagram, social-audit, benchmark, padrinho, engagement, organic]
---

# IG Benchmark — Padrinho (Auditoria da Conta)

Auditoria da conta orgânica de Instagram `@padrinho.app` e comparação com o nicho (sobriedade, recuperação, dependência química, saúde mental). Leia este arquivo para entender o estado atual da conta, o que já funcionou e o que travou. Usado pelo Strategy/Tactic Agent para calibrar formato, cadência e tom no Instagram.

> **Nota de escopo:** este arquivo cobre concorrência **orgânica de Instagram**, complementar — não substitui — a análise de **concorrentes de produto/app** (Sunflower, Reframe, I Am Sober) em `KNOW_MarketContext.md`. Para o que funciona no nicho e as direções acionáveis, ver `KNOW_IGBenchmarkCompetitors.md`. Para a conta do Bezerra, ver `KNOW_IGBenchmarkBezerra.md`.

---

## Snapshot da Conta (21/06/2026)

| Métrica | Padrinho | Mediana do nicho-núcleo |
|---|---|---|
| Seguidores | **299** | ~10.000 |
| Posts (analisados) | 31 | recorte (de ~35 no total) |
| Cadência | **0,4/semana** | ~2,6/semana |
| Likes médios/post | 23 | — |
| Interações médias/post | 25 | — |
| % vídeo (Reels) | 42% | 36% |
| Alcance (30d, InsightfulPipe) | 1.119 | — |
| Views (30d) | 1.655 | — |
| Contas engajadas (30d) | 16 | — |
| Interações totais (30d) | 28 (21 likes, 1 com., 1 share) | — |
| **Cliques no link (30d)** | **0** | — |

**Bio atual:** *"Sua melhor companhia para construir um estilo de vida em sobriedade. 💙"*
**Categoria IG:** Health & wellness website · **Verificada:** não

---

## Diagnóstico

1. **Conta dormente, não fraca.** Os melhores posts são de **jan–fev/2025**: o Reel da história do fundador Fábio (**71 likes / 18 comentários**), "as imagens do Google não parecem com você" (53 likes), "o oposto da dependência é a conexão" (47 likes). Depois houve um hiato de ~15 meses; o relançamento (jun/2026) traz **carrosséis estáticos** com **1–4 likes, 0 comentários**.

2. **Trocou o formato que funcionava.** Para o Padrinho, **vídeo rende ~3× mais que estático** (37 vs. 13 likes médios). O relançamento abandonou Reels e foi para carrossel estático — o formato mais fraco para uma conta pequena, pois depende de audiência já existente (que o Padrinho não tem).

3. **Copiou o tom certo, sem a base.** Os posts novos ("Passa isso aí", "compartilha", "Tá achando que é fraco…") imitam bem o estilo da líder `@temgentequenaobebe` — mas pedir compartilhamento a 299 seguidores inativos não gera alcance. O tom está certo; falta o motor (Reels + volume + audiência).

4. **Funil quebrado.** 0 cliques no link em 30 dias, apesar de o objetivo ser download do app. O CTA "link na bio" não está convertendo.

5. **Hashtags de marca, não de intenção.** Usa `#sobriedadecomleveza`, `#estilodevidaindependente`, `#padrinhoapp` (ninguém busca). As líderes usam `#parardebeber`, `#dependenciaquimica`, `#alcoolismo` (intenção de busca real). Top tags atuais do Padrinho: `#sobriedade` (21), `#recuperação` (21), `#padrinhoapp` (16), `#vidasemálcool` (8).

---

## Formato: vídeo vs. estático (dados da conta)

| Formato | Likes médios | n |
|---|---|---|
| Vídeo (Reels) | **37** | 13 |
| Estático (imagem/carrossel) | 13 | 18 |

→ Conclusão: para o tamanho atual, **priorizar Reels**.

---

## Direções para o Padrinho

> Direções acionáveis (P0–P2) + a sinergia Padrinho × Bezerra são **canônicas** em **`KNOW_IGBenchmarkCompetitors.md`** § Direções acionáveis → Padrinho.
> **Resumo:** Reels 3×/sem + hashtags de intenção (`#parardebeber #dependenciaquimica #alcoolismo`); série depoimentos/Fábio em vídeo 1ª pessoa (seg/qui/sex); consertar o funil de link (hoje 0 cliques).

---

## Fontes e Metodologia

- **Posts:** Apify `apify/instagram-scraper`, run `VUoyYM2zHWZXg6f40` (1.137 posts; recorte de 31 posts da `@padrinho.app`).
- **Perfil/seguidores:** Apify `apify/instagram-profile-scraper`, run `Flg3ATppNoBoGaPzA`.
- **Insights nativos:** InsightfulPipe (Instagram Insights, conta `padrinho.app`), janela 22/05–21/06/2026.
- **Ressalva:** "taxa de engajamento" (ER) é inflada em contas minúsculas (denominador ínfimo) — usar interações absolutas e alcance para benchmarking, não ER.

---

**Last Updated:** 2026-06-21
**Maintained by:** Market Agent
**References:**
- [KNOW_IGBenchmarkCompetitors.md](KNOW_IGBenchmarkCompetitors.md)
- [KNOW_IGBenchmarkBezerra.md](KNOW_IGBenchmarkBezerra.md)
- [KNOW_TrendRadar.md](KNOW_TrendRadar.md)
- [KNOW_MarketContext.md](KNOW_MarketContext.md)
