---
title: "Market Intelligence — Padrinho (fonte única)"
version: "1.1"
status: active
type: Knowledge
layer: KNOW (dados/insights — não estratégia)
last_updated: 2026-06-27
supersedes: [KNOW_MarketContext.md, KNOW_TrendRadar.md, KNOW_DataSnapshot.md, KNOW_ICP.md, KNOW_IGBenchmarkPadrinho.md, KNOW_IGBenchmarkCompetitors.md, KNOW_IGBenchmarkBezerra.md]
tags: [market, trends, google-trends, ecosystem, instagram, benchmark, competitors, icp]
---

# Market Intelligence — Padrinho

**Fonte única e não-conflitante de DADOS e INSIGHTS de mercado:** mercado & consumo, radar de tendências (Google Trends), ecossistema próprio (Supabase) e Instagram (nós + concorrentes + Bezerra).

## Como usar
- Este é um arquivo de **referência (memória)**: contém **apenas dados e insights**. Decisões, recomendações e estratégia de conteúdo são dos **agentes** em tempo de execução — não deste arquivo.
- **Fonte única** desses dados — não duplicar em outros arquivos; os agentes leem daqui.
- "Insight" aqui = leitura/observação dos dados (o que se vê), nunca uma instrução (o que fazer).
- Personas (quem) vivem nos arquivos de persona; a §6 traz só a síntese de ICP.
- Cadência: mercado/IG mensal; Google Trends trimestral (próx. ~set/2026). Seguidores via Apify; insights próprios via Insightful Pipe; ecossistema via Supabase.

---

## 1. Mercado & Movimentos

### Consumo de álcool — Brasil
| Indicador | Valor | Ano | Fonte |
|---|---|---|---|
| Consumo per capita | 7,7 L/ano | 2024 | CISA Panorama 2024 |
| Média mundial | 6,2 L/ano | 2024 | OMS |
| Consumo excessivo (pop. geral) | 15% | 2025 | CISA Panorama 2025 |
| **Não bebem (declarado)** | **64%** (era 55% em 2023) | 2025 | CISA / Ipsos |
| Abstinência 18–24 | 46% → **64%** (2023→2025) | 2025 | CISA |
| Consumo abusivo 18–24 | 20% → **13%** | 2025 | CISA |
| Consumo de cerveja no FDS | **−25,4%** (2025 vs 2024) | 2025 | CISA |
| Consumo solitário | 13,6% → **22,4%** das ocasiões | 2025 | CISA |
| Internações por álcool | 418.467 | 2024 | Datasus |
| Óbitos atribuíveis | 73.019 | 2023 | Datasus |

### Mercado endereçável — escala de dependência
```
Não Alcoólico → Social & Moderado (10%) → [EXCESSIVO 70%] → Dependente (20%) → Forte
```
Segmento **Excessivo (70%)**: funcional, vida social ativa, não se identifica com o estereótipo do "alcoólatra". O álcool como anfitrião social, não como problema reconhecido.

### Movimento sober-curious
- **64% não beberam em 2025** (vs 55% em 2023); nos EUA, consumo na mínima em 90 anos.
- Gen Z / Millennials: sobriedade como estilo de vida aspiracional, não privação.
- **Bebidas sem álcool +37,5%** (vendas globais 2018–2022); marcas tradicionais lançando versões zero.
- Saúde mental mainstream (terapia/autocuidado normalizados 25–35). 62% dos brasileiros consideraram reduzir o consumo no último ano.

### Geografia
RS (34% bebe semanalmente — maior) · MS · SP (maior volume) · SC · RJ (26,3%) · DF (25,7% abuso).

### Concorrentes de produto (apps)
| App | Tração | Posicionamento | Fraqueza observada |
|---|---|---|---|
| **Sunflower** (YC W25) | 200→100k MAU em 6m, em PT | "Duolingo dos vícios" — gamificação+CBT+IA (Sam) | funcional, não relacional; sem fluência cultural BR |
| **Reframe** | 3,2M downloads; 91% reduzem em 3m | "Science, not stigma", 160 dias | frio, protocolar, americano, caro |
| **I Am Sober** | ~US$200k/mês, 150k dl | contador + pledges + comunidade | sem IA real, comunidade tóxica |

*(Concorrentes orgânicos de Instagram — outro recorte — na §5.)*

### Metas de negócio (contexto)
R$ 550k/ano (~R$45k/mês) · 35.000 membros · 1.000 Gestores de Recuperação · 10% pagantes · 6.000+ ativos diários · retenção D10→D90 alta.

---

## 2. Radar de Tendências — Google Trends (BR · jun/26)

> **Fonte:** Google Trends, Brasil, 12 meses (`related_queries` top+rising), coletado 2026-06-22 via Apify. Valores **relativos por cluster** (0–100), não comparáveis entre clusters; *rising* = aceleração. Re-coletar trimestralmente.
> **Leitura geral:** demanda de busca (Trends) reflete **intenção duradoura**; calendário cultural reflete **timing de momento** — são sinais diferentes.

### Parar de beber / sober-curious
`como parar de beber cerveja` (100) · `remédio para parar de beber` (94) · `como parar de beber álcool` (60) · `eu parei de beber` (100) · `remédio caseiro p/ parar definitivamente` (🔺+190%) · `sober curious meaning` (100, só "meaning").
**Leitura:** busca-se parar de beber **cerveja** (não "álcool" abstrato); forte intenção de permanência. `sober curious` **não tem busca em PT** (só o significado).

### Alcoolismo & cérebro
`alcoolismo tratamento` (100) · `o que é alcoolismo` (77–80) · **`efeitos do álcool no cérebro` (100)** · `crise de abstinência alcoólica` (100) · `auxílio/INSS alcoolismo` (🔺+550%).
**Leitura:** `efeitos do álcool no cérebro` é demanda alta e estável (tema de neurociência).

### Cerveja sem álcool
**`cerveja sem álcool tem álcool` (100)** · `faz mal` (51) · `cerveja zero álcool` (47) · `melhor cerveja sem álcool` (25) · **`faz mal pro fígado` (🔺+90%)** · `beber socialmente significado` (100, 🔺+40%).
**Leitura:** universo de busca grande e em alta = prova comportamental do sober-curious. `julho seco` / `são joão sem álcool` / `desafio 30 dias` = **sem dados de busca** (são apenas termos sazonais/sociais).

### Apoio / família
`alcoólicos anônimos online` (100) · `telefone` (73) · `whatsapp` (43) · `gratuito` (13).
**Leitura:** a demanda por AA é sobre **acesso** (remoto/instantâneo/grátis).

### Calendário cultural (timing)
| Período | Momento | Persona associada |
|---|---|---|
| Jan | Dry January | Rosa/Pedro |
| Fev | Carnaval (pós-festa) | Rosa |
| Mar | Dia da Mulher | Rosa/Ana |
| Mai | Dia das Mães | Ana |
| Jun | Festas Juninas | Rosa |
| Jul | Dry July / Julho Seco | Rosa/Pedro |
| Set | Setembro Amarelo | Todas |
| Dez | Fim de ano (recomeço) | Todas |

### Onde está a maior demanda (oportunidades de busca)
- **Cerveja sem álcool** (`tem álcool?`, `faz mal`, `fígado` 🔺+90%) — maior cluster de demanda não explorado.
- **Remédio para parar de beber** (naltrexona, 🔺+190%) — alta demanda; tema clínico/sensível.
- **AA online / WhatsApp / gratuito** — demanda por acesso remoto e gratuito.

---

## 3. Nosso Ecossistema (dados próprios)

> **Supabase — último sync (confirmar ao vivo).** ~268 usuários.

- **Distribuição por persona:** Rosa ~90 (maintain_sobriety 57 + identify_triggers 33) · Pedro ~70 (full_abstinence 49 + reduce_control 34) · Ana ~0 confirmados (`support_recipient` vazio) · Caio ~0 confirmados.
- **Funil:** Install → Account **~9%** (antes do Google Sign-In) → **25%+** (após, jun/2026). Pedro converte Account→Dashboard ~80% (vs ~55% Rosa).
- **Retenção:** alta para Pedro (~80 dias full_abstinence). Pagantes: ~28% dos Pedros (2,3× Rosa).
- **Campanha Familiares (Meta):** lançada jun/2026 (mira Ana+Caio); validação ⏳ (`support_recipient` ainda vazio). IDs em `KNOW_CaioFilho.md` § Campanha.
- **Interesses declarados (Dashboard):** Prevenção de Recaída (64) · Gatilhos (64) · Ansiedade (61) · Abstinência (60) · Álcool (58). Maioria feminina (54F/43M). Recaída e gatilhos = maior demanda declarada.
- **Corpus de benchmark (Apify):** 857 posts / 43 contas de comunidades similares (base dos padrões da §5).

---

## 4. Instagram — Nós (@padrinho.app)

### Números atuais (27/06/2026 · Insightful Pipe + Apify)
| Métrica | Atual | Antes |
|---|---|---|
| Seguidores | **300** | 299 (21/06) |
| Seguindo / Posts | 376 / 38 | — |
| Alcance (30d, 28/05–27/06) | **898** | 1.119 (22/05–21/06) |
| Views (30d) | 1.192 | 1.655 |
| Contas engajadas (30d) | 21 | 16 |
| **Cliques no link (30d)** | **0** | 0 |
| Cadência | ~0,4/sem | — |
| % vídeo histórico | 42% | — |

### Diagnóstico (insights)
1. **Conta dormente, não fraca.** Melhores posts são de jan–fev/2025: Reel da história do **Fábio (71 likes/18 com.)**, "as imagens do Google não parecem com você" (53), "o oposto da dependência é a conexão" (47). Hiato de ~15 meses; relançamento jun/2026 = carrosséis estáticos com 1–8 likes.
2. **Vídeo rende ~3× mais que estático** (37 vs 13 likes médios). O relançamento abandonou Reels.
3. **Tom certo, sem audiência.** Os carrosséis novos imitam bem `@temgentequenaobebe`, mas pedir share a 300 seguidores inativos não gera alcance.
4. **Funil sem clique:** 0 cliques no link em 30d.
5. **Hashtags de marca, não de intenção:** usa `#sobriedadecomleveza`, `#padrinhoapp` (baixa busca); líderes usam `#parardebeber`, `#dependenciaquimica`, `#alcoolismo`.

---

## 5. Instagram — Concorrentes & Bezerra

### Tabela-mestra do nicho (14 contas-núcleo · seguidores 27/06; engajamento = Apify, recorte recente)
| Conta | Seguidores | /sem | Interações méd. | % vídeo | Perfil |
|---|---|---:|---:|---:|---|
| **temgentequenaobebe** | **139.274** | 3,8 | 4.692 | 10% | 🏆 Líder — narrativa 1ª pessoa |
| sossobriedade | ~142.800 | 1,8 | 2.239 | **92%** | Máquina de Reels + hashtags |
| **brandsdecoded__** | **301.848** | 4,2 | 1.630 | 7% | Carrossel-de-tendência (0→300k s/ Reels) |
| drvitorblazius | ~391.000 | 3,0 | 1.348 | 68% | Autoridade médica (Reels) |
| movimento.zero | ~33.600 | 3,9 | 1.005 | 1% | Carrossel reflexivo feminino |
| wellhub_br | ~424.800 | 2,6 | 457 | 53% | Corporativo (ER 0,11%) |
| **ctbezerrademenezes** | **6.184** | **0,1** | 91 | 6% | Institucional adormecido |
| dra.alessandradiehl | ~11.000 | 2,4 | 76 | 84% | Psiquiatra (dependência) |
| joinmind.now / niky.com.vc / vidalink_ / figosaude / ra4consultoria | <12k | 1,5–2,8 | 15–178 | var. | apps/benefícios menores |
| **padrinho.app** | **300** | **0,4** | 25 | 42% | nós |

> ER não é comparável entre tamanhos — usar **interações absolutas + alcance**.

### Padrões observados (o que separa vencedores de perdedores)
1. **Narrativa em 1ª pessoa supera mensagem institucional.** Topo do nicho = confissão/história: temgente *"Eu não parei de beber porque algo terrível aconteceu…"* (52.188 likes/906 com.); até o Bezerra: ex-paciente que voltou após 25 anos (245 likes). Contas que falam como marca/instituição têm o pior engajamento.
2. **Dois motores de alcance:** (a) carrossel/imagem de narrativa longa (o texto é o produto; funciona com audiência ou gancho cultural — temgente puxou comentário do **João Gomes** → 54.726 likes); (b) **Reels + stack de hashtags de intenção** (sossobriedade 92% vídeo, descoberta a frio — um Reel a 181.166 likes; 0→142k).
3. **Cadência dos líderes: 3–4×/semana.** Padrinho (0,4) e Bezerra (0,1) estão fora por ausência.
4. **Hashtags de intenção** (`#parardebeber #dependenciaquimica #alcoolismo #abstinencia`), não de marca.
5. **Dias de maior interação:** Seg (5.018) · Qui (2.681) · Sex (2.010) ≫ Qua/Sáb/Dom/Ter.

### Bezerra — perfil
6.184 seguidores (20× o Padrinho) mas 0,1/sem e 6% vídeo. Melhor post = humano (ex-paciente 25 anos depois, 245 likes); 2º = utilidade segmentada ("Ansiedade/Depressão, mulheres 40+", 176 likes). Tem **audiência + autoridade clínica + histórias reais**, com baixa produção.
**Insight de complementaridade:** Bezerra tem audiência/autoridade/histórias e pouca produção; o Padrinho tem produção/voz e pouca audiência — ativos opostos. (Vocabulário das duas marcas difere — ver `KNOW_CTBM_BrandPositioning.md`.)

---

## 6. Públicos / ICP

**ICP:** adulto BR 25–54, vida social ativa, consumo regular, que começa a perceber problemas **mas não se identifica com o "alcoólatra"**. Não é o dependente em crise — é o **funcional** cuja relação com o álcool nunca foi nomeada. Segmento **Excessivo (70%)**. Renda > R$2k, classes B/C/D.

**Necessidade:** declarada = "reduzir consequências"; real = um novo jeito de se relacionar com a bebida **sem abrir mão da identidade**. Barreira = o único espelho disponível é o estereótipo, e ele não se encaixa.

**Jornada macro:** Inconsciência → Reconhecimento → Consideração → Decisão.

**As 4 personas (80/20: dependentes 80% · familiares 20%)** — detalhe completo nos arquivos próprios:
- Rosa, A Equilibrista — `KNOW_RosaEquilibrista.md` — ✅ Primária
- Ana, A Mãe Protetora — `KNOW_AnaMaeProtetora.md` — Secundária
- Pedro, O Autônomo Solitário — `KNOW_PedroAutonomo.md` — Secundária
- Caio, O Familiar que Apoia — `KNOW_CaioFilho.md` — Crescente (ativo H2 2026)

---

**Camada:** Knowledge (dados/insights) · **Atualização:** mercado/IG mensal, Google Trends trimestral.
**Fontes:** CISA/Ipsos (Panorama 2024/2025), Datasus, OMS, Google Trends BR (Apify, jun/26), Apify instagram-scraper, Insightful Pipe (@padrinho.app), Supabase (ecossistema).
**Personas:** `KNOW_RosaEquilibrista.md` · `KNOW_AnaMaeProtetora.md` · `KNOW_PedroAutonomo.md` · `KNOW_CaioFilho.md`.
