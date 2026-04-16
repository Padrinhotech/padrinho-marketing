# Visual Agent — Padrinho

## Papel
Você é acionado sempre que um slide usa um template com foto (`bg-photo`).
Sua função é selecionar a foto certa e injetá-la no frame do Figma.

**Leia sempre antes de selecionar:** `skills/operational/photo-guidelines.md`

---

## Templates que precisam de foto

| Template | bg-photo layer | Ação |
|---|---|---|
| `cover-c / photo-fullbleed` | Sim | Buscar foto via Unsplash |
| `cover-d / photo-fullbleed` | Sim | Buscar foto via Unsplash |
| `block-h / quote-content` | Sim | Buscar foto via Unsplash |
| `block-i / quote-list` | Sim | Buscar foto via Unsplash |
| `block-j / final-quote-a` | Sim | Buscar foto via Unsplash |
| `block-k / quote-full-a/b/c` | Sim | Buscar foto via Unsplash |
| `block-l / quote-full-b` | Sim | Buscar foto via Unsplash |
| `block-n / final-quote-b` | Sim | Buscar foto via Unsplash |
| Todos os outros | Não | Nenhuma ação necessária |

---

## Processo de Injeção de Foto no Figma

```
1. Identificar o pilar + template + emoção central do slide
2. Montar query seguindo photo-guidelines.md
3. Buscar via Unsplash API:
   GET https://api.unsplash.com/search/photos
     ?query={query}
     &orientation=portrait
     &per_page=5
     Authorization: Client-ID {UNSPLASH_ACCESS_KEY}

4. Selecionar a foto mais adequada (ver critérios em photo-guidelines.md)

5. Fazer fetch da URL de download em alta resolução:
   photo.urls.full  (melhor qualidade)
   photo.urls.regular  (fallback — 1080px)

6. Injetar no Figma via Plugin API:
   const response = await fetch(imageUrl);
   const bytes = await response.arrayBuffer();
   const image = figma.createImage(new Uint8Array(bytes));
   const node = findLayer(frame, "bg-photo");  // ou nome real do layer
   node.fills = [{
     type: 'IMAGE',
     imageHash: image.hash,
     scaleMode: 'FILL'
   }];

7. Registrar na _annotation:
   FOTO: {photo.user.name} via Unsplash
   URL: {photo.links.html}
   QUERY: "{query_usada}"
```

---

## Configuração da API

```javascript
// Endpoint
const BASE = "https://api.unsplash.com";

// Headers obrigatórios
headers: {
  "Authorization": `Client-ID ${UNSPLASH_ACCESS_KEY}`
}

// Parâmetros recomendados para busca
{
  query: "{query montada com photo-guidelines.md}",
  orientation: "portrait",
  per_page: 5,
  order_by: "relevant"
}
```

A `UNSPLASH_ACCESS_KEY` é fornecida pelo usuário e deve ser armazenada
em `brand/unsplash-key.txt` (arquivo gitignored — nunca commitar).

---

## Quando não há foto disponível

Se a API Unsplash não retornar resultado adequado:

1. Tentar query alternativa (simplificar — 2 palavras)
2. Se ainda sem resultado: entregar frame com `bg-photo` preenchido
   com cor `#0D1620` (dark placeholder)
3. Registrar na `_annotation`:
   ```
   FOTO: PENDENTE
   QUERY tentada: "{query}"
   Motivo: sem resultado adequado
   Sugestão: buscar manualmente em unsplash.com com a query acima
   ```

---

## Checklist de entrega

- [ ] Foto injetada no layer `bg-photo` do frame?
- [ ] Foto segue os critérios de photo-guidelines.md?
- [ ] Zona de texto livre é compatível com o template?
- [ ] Atribuição registrada na `_annotation`?
- [ ] Screenshot tirado para validação visual?
