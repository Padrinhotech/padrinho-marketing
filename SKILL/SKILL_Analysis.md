# SKILL_Analysis — Desempenho do Instagram (semana a semana)

Mede o desempenho dos posts no Instagram e devolve isso para a estratégia. Saída canônica: `POSTS/<Marca>/INSTA_Analysis.md` (modelo `MODEL/MODEL_INSTA_Analysis.md`).

## Quando rodar

- 48 a 72h depois de a semana publicar (o alcance ainda cresce nas primeiras horas; post do dia não deve ser penalizado).
- Antes de o Strategy Agent planejar uma nova semana, para decidir com dados o que repetir.

## Fonte de dados: Insightful Pipe (MCP)

Plataforma `instagram`. Descubra a conta com `query_contexts request='accounts' platform='instagram'` e carregue o `workspace_id` adiante em toda chamada.

- **Padrinho (referência atual):** workspace_id 1303, brand_id 1470, account_id `17841460771348803` (@padrinho.app).
- **CTBM:** descobrir via `accounts` quando a conta existir.

Passos:
1. `query_contexts request='available_actions' platform='instagram' workspace_id=...`
2. `query_contexts request='actions_details' actions=['get_media','get_media_insights','get_profile']`
3. `query_data action='get_media'` com fields `id, caption, media_type, media_product_type, permalink, timestamp, like_count, comments_count` e `limit` igual ao nº de posts da semana (ou 10 para a janela recente).
4. Para cada post, `query_data action='get_media_insights'` com metrics `["reach","saved","shares","total_interactions","views"]` e period `lifetime`.
5. `query_data action='get_profile'` com fields `followers_count` para contextualizar o alcance.

## Métricas que importam

- **Alcance** (contas únicas): principal medida de distribuição. Comparar com a mediana da conta e com o nº de seguidores.
- **Salvos** e **compartilhamentos:** as alavancas de distribuição. Salvo alto indica conteúdo de referência; compartilhamento alto indica utilidade.
- **Comentários:** engajamento ativo. CTA de 1 toque (voto com emoji) converte mais que convite para escrever texto.
- **Curtidas** e **visualizações:** sinal de apoio, mais fraco. A relação visualizações por alcance mostra quantos slides as pessoas passam.

## Como ler (heurísticas)

- Ranquear por alcance. Olhar o topo e o rodapé e perguntar o que o topo tem em comum (formato, persona, tema, gancho).
- Compartilhamento e salvo dizem mais que curtida sobre o que vale repetir.
- Ressalvas obrigatórias: amostra pequena (conta jovem) é direcional, não estatística; post recém-publicado ainda acumula alcance; taxas em alcance baixo são ruidosas.

## Saída

Escrever e atualizar `POSTS/<Marca>/INSTA_Analysis.md` seguindo `MODEL/MODEL_INSTA_Analysis.md`: inserir a semana mais recente como seção 2 (empurrando as demais para baixo, como histórico), preencher 2.1 Posts e desempenho, 2.2 Insights (funcionou e não funcionou) e 2.3 Direções, e atualizar o "Contexto inicial" (baseline) quando os números mudarem. Registrar os números também na `AGENDA_<Marca>.md` da semana.

## Ligações

- Alimenta o `AGENT/AGENT_Strategy.md`: decisão data-informada antes de planejar a semana.
- Formato do arquivo: `MODEL/MODEL_INSTA_Analysis.md`.
- Leis de cópia: sem travessão "—" e sem "→" (`SKILL/SKILL_CopyRules.md`).
