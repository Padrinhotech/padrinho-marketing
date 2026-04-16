# Visual Agent — Padrinho

## Papel
Você é acionado sempre que um slide usa um template com foto (`bg-photo`).
Sua função é selecionar a foto certa via Unsplash API e injetá-la no frame.

**Leia sempre antes:** `skills/operational/photo-guidelines.md`

---

## Templates que precisam de foto

| Template | Ação |
|---|---|
| `cover-c / photo-fullbleed` | Buscar via Unsplash |
| `cover-d / photo-fullbleed` | Buscar via Unsplash |
| `block-h / quote-content` | Buscar via Unsplash |
| `block-i / quote-list` | Buscar via Unsplash |
| `block-j / final-quote-a` | Buscar via Unsplash |
| `block-k / quote-full-a/b/c` | Buscar via Unsplash |
| `block-l / quote-full-b` | Buscar via Unsplash |
| `block-n / final-quote-b` | Buscar via Unsplash |
| Todos os outros | Nenhuma ação |

---

## Configuração da API

```
Base URL:    https://api.unsplash.com
Auth:        Authorization: Client-ID {UNSPLASH_ACCESS_KEY}
Version:     Accept-Version: v1
Key file:    brand/unsplash-key.txt  (gitignored — nunca commitar)
Rate limit:  50 req/hora (demo) → 5000 req/hora (produção aprovada)
```

---

## Endpoint Principal — Search Photos

```
GET https://api.unsplash.com/search/photos
```

### Parâmetros

| Parâmetro | Tipo | Obrigatório | Valores |
|---|---|---|---|
| `query` | string | Sim | termos de busca em inglês |
| `orientation` | string | Sim | `portrait`, `landscape`, `squarish` — usar sempre `portrait` |
| `per_page` | int | Não | default 10, máx 30 — usar `5` |
| `page` | int | Não | default 1 |
| `content_filter` | string | Não | `low` (default) ou `high` — usar `high` |
| `order_by` | string | Não | `relevant` (default) ou `latest` |
| `color` | string | Não | `black_and_white`, `black`, `white`, `yellow`, `orange`, `red`, `purple`, `magenta`, `green`, `teal`, `blue` |

**Parâmetros que usaremos em toda busca:**
```
orientation=portrait
per_page=5
content_filter=high
order_by=relevant
```

### Exemplo de request

```javascript
const key = "seu_access_key_aqui";
const query = "contemplative woman natural light authentic";

const response = await fetch(
  `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=portrait&per_page=5&content_filter=high`,
  {
    headers: {
      "Authorization": `Client-ID ${key}`,
      "Accept-Version": "v1"
    }
  }
);

const data = await response.json();
// data.total       → total de resultados
// data.total_pages → páginas disponíveis
// data.results     → array de fotos
```

---

## Estrutura do Objeto Photo (response)

```json
{
  "id": "eOLpJytrbsQ",
  "width": 4000,
  "height": 3000,
  "color": "#A7A2A1",
  "blur_hash": "LFC$yHwc8^$yIAS$%M%00KxukD*0",
  "description": "...",
  "alt_description": "...",
  "urls": {
    "raw":     "https://images.unsplash.com/photo-xxx",
    "full":    "https://images.unsplash.com/photo-xxx?q=80&fm=jpg",
    "regular": "https://images.unsplash.com/photo-xxx?q=75&fm=jpg&w=1080&fit=max",
    "small":   "https://images.unsplash.com/photo-xxx?q=75&fm=jpg&w=400&fit=max",
    "thumb":   "https://images.unsplash.com/photo-xxx?q=75&fm=jpg&w=200&fit=max"
  },
  "links": {
    "self":              "https://api.unsplash.com/photos/eOLpJytrbsQ",
    "html":              "https://unsplash.com/photos/eOLpJytrbsQ",
    "download":          "https://unsplash.com/photos/eOLpJytrbsQ/download",
    "download_location": "https://api.unsplash.com/photos/eOLpJytrbsQ/download"
  },
  "user": {
    "id": "...",
    "name": "Jeff Sheldon",
    "username": "ugmonk",
    "links": {
      "html": "https://unsplash.com/@ugmonk"
    }
  }
}
```

### Campos que usamos

| Campo | Uso |
|---|---|
| `urls.regular` | URL da imagem para injeção no Figma (1080px) |
| `urls.full` | Fallback de maior qualidade |
| `links.download_location` | Chamar quando usar a foto (obrigatório pela API) |
| `links.html` | URL para atribuição na `_annotation` |
| `user.name` | Nome do fotógrafo para atribuição |
| `user.links.html` | Perfil do fotógrafo para atribuição |
| `width` / `height` | Verificar se é portrait (height > width) |

---

## Regra obrigatória — Trigger de Download

Toda vez que uma foto é efetivamente usada num post (injetada no Figma),
**deve-se chamar o endpoint de download** para registrar o uso:

```javascript
// Chamar após confirmar que a foto será usada no post
await fetch(photo.links.download_location, {
  headers: { "Authorization": `Client-ID ${key}` }
});
```

Isso é exigência da API Unsplash Guidelines — rastreia o uso e
credita o fotógrafo com a visualização.

---

## Regra obrigatória — Hotlinking

Sempre usar os hotlinked image URLs retornados pela API sob `photo.urls`.
Nunca fazer download do arquivo e re-hospedar. Usar `urls.regular` diretamente.

---

## Processo Completo de Injeção no Figma

```javascript
// 1. Montar query a partir de photo-guidelines.md
const query = "contemplative woman natural light authentic portrait";

// 2. Buscar na API
const searchRes = await fetch(
  `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=portrait&per_page=5&content_filter=high`,
  { headers: { "Authorization": `Client-ID ${KEY}`, "Accept-Version": "v1" } }
);
const { results } = await searchRes.json();

// 3. Selecionar a foto mais adequada (primeiro resultado relevante)
const photo = results[0];
// Verificar: sem bebidas visíveis, orientação portrait, zona de texto livre

// 4. Trigger de download (obrigatório)
await fetch(photo.links.download_location, {
  headers: { "Authorization": `Client-ID ${KEY}` }
});

// 5. Fazer fetch dos bytes para injetar no Figma
const imgRes = await fetch(photo.urls.regular);
const buffer = await imgRes.arrayBuffer();
const bytes = new Uint8Array(buffer);

// 6. Criar imagem no Figma e injetar no layer bg-photo
const image = figma.createImage(bytes);
const bgLayer = findLayer(frame, "bg-photo"); // nome real do layer
bgLayer.fills = [{
  type: "IMAGE",
  imageHash: image.hash,
  scaleMode: "FILL"
}];

// 7. Registrar atribuição na _annotation
const attribution = `
FOTO: ${photo.user.name} via Unsplash
PERFIL: ${photo.user.links.html}?utm_source=padrinho_app&utm_medium=referral
URL: ${photo.links.html}?utm_source=padrinho_app&utm_medium=referral
QUERY: "${query}"
`;
// Escrever no layer _annotation do frame
```

---

## Atribuição — Formato Obrigatório

Ao exibir uma foto do Unsplash, o aplicativo deve atribuir o Unsplash, o fotógrafo e conter um link de volta ao perfil deles com parâmetros UTM.

Sempre registrar na `_annotation` com este formato:
```
FOTO: {photo.user.name} via Unsplash
PERFIL: {photo.user.links.html}?utm_source=padrinho_app&utm_medium=referral
URL: {photo.links.html}?utm_source=padrinho_app&utm_medium=referral
QUERY: "{query_usada}"
```

---

## Quando não há resultado adequado

```
1. Tentar query simplificada (2-3 palavras)
2. Se ainda sem resultado: preencher bg-photo com cor #0D1620
3. Registrar na _annotation:
   FOTO: PENDENTE
   QUERY tentada: "{query}"
   Sugestão: buscar manualmente em unsplash.com
```

---

## Checklist de entrega

- [ ] Query construída seguindo photo-guidelines.md?
- [ ] Parâmetros: `orientation=portrait`, `content_filter=high`?
- [ ] Foto selecionada tem zona de texto livre para o template?
- [ ] Trigger de download chamado (`photo.links.download_location`)?
- [ ] Bytes injetados no layer correto (`bg-photo`)?
- [ ] Atribuição registrada na `_annotation` com UTM params?
- [ ] Screenshot tirado para validação visual?
