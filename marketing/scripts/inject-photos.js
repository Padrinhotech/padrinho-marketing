/**
 * inject-photos.js
 * 
 * Busca fotos no Unsplash e injeta nos slides de foto via Figma Plugin API.
 * 
 * COMO USAR:
 * 1. Abra o Figma com o arquivo sBItPeNLyvT5EMyKLqQbRv
 * 2. Abra o console do plugin (Plugins → Development → Open Console)
 * 3. Cole o conteúdo deste arquivo no console
 * 4. Execute: await injectPhotos()
 * 
 * DEPENDÊNCIAS:
 * - Precisa rodar dentro do contexto do Figma Plugin (tem acesso ao fetch e ao figma global)
 * - A chave Unsplash precisa estar configurada abaixo
 */

const UNSPLASH_KEY = "hXQNoO0pFV8DW5PjDRp5kKFDQIV6JmxJ9xJWwknW0go";
const FIGMA_FILE   = "sBItPeNLyvT5EMyKLqQbRv";

// ─── Slides que precisam de foto ─────────────────────────────────────────────
// Cada item: { slideId, layerChars, query, template }
// layerChars: trecho do texto atual no layer de foto (para localizá-lo)
const SLIDES_WITH_PHOTOS = [
  {
    slideId:    "3363:219",   // Slide 05 — block-h — "Não é falta de força. É o cérebro."
    template:   "block-h",
    bgLayerName: "ivana-cajina-9fl5AUulJsk-unsplash 1",
    query:      "woman overwhelmed anxious dark moody authentic portrait",
    pilar:      "reconhecimento"
  },
  {
    slideId:    "3363:309",   // Slide 09 — block-j — "Cada recaída carrega uma informação"
    template:   "block-j",
    bgLayerName: "ivana-cajina-9fl5AUulJsk-unsplash 1",
    query:      "man stressed hands head dark moody authentic portrait",
    pilar:      "reconhecimento"
  }
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function searchUnsplash(query) {
  const params = new URLSearchParams({
    query,
    orientation: "portrait",
    per_page: "5",
    content_filter: "high",
    order_by: "relevant"
  });
  const res = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
    headers: {
      "Authorization": `Client-ID ${UNSPLASH_KEY}`,
      "Accept-Version": "v1"
    }
  });
  if (!res.ok) throw new Error(`Unsplash error ${res.status}: ${await res.text()}`);
  return res.json();
}

async function triggerDownload(downloadLocation) {
  await fetch(downloadLocation, {
    headers: { "Authorization": `Client-ID ${UNSPLASH_KEY}` }
  });
}

function findLayerByName(node, name) {
  if (node.name === name) return node;
  if ("children" in node) {
    for (const child of node.children) {
      const found = findLayerByName(child, name);
      if (found) return found;
    }
  }
  return null;
}

function findLayerByChars(node, partial) {
  if (node.type === "TEXT" && node.characters && node.characters.includes(partial)) return node;
  if ("children" in node) {
    for (const child of node.children) {
      const found = findLayerByChars(child, partial);
      if (found) return found;
    }
  }
  return null;
}

async function writeAnnotation(frame, photoData, query) {
  const annotation = findLayerByName(frame, "_annotation") 
    || findLayerByChars(frame, "FOTO:");
  
  if (!annotation) {
    console.warn(`[${frame.name}] Layer _annotation não encontrado — atribuição não registrada`);
    return;
  }
  
  if (annotation.type === "TEXT") {
    try {
      if (annotation.fontName !== figma.mixed) {
        await figma.loadFontAsync(annotation.fontName);
      } else {
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      }
    } catch(e) {}
    
    annotation.characters = [
      `FOTO: ${photoData.user.name} via Unsplash`,
      `PERFIL: ${photoData.user.links.html}?utm_source=padrinho_app&utm_medium=referral`,
      `URL: ${photoData.links.html}?utm_source=padrinho_app&utm_medium=referral`,
      `QUERY: "${query}"`,
      `DATA: ${new Date().toISOString().split("T")[0]}`
    ].join("\n");
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function injectPhotos() {
  const queuePage = figma.root.children.find(p => p.name === "_QUEUE");
  if (!queuePage) throw new Error("Página _QUEUE não encontrada");
  await figma.setCurrentPageAsync(queuePage);

  const results = [];

  for (const slide of SLIDES_WITH_PHOTOS) {
    console.log(`\n📸 Processando ${slide.slideId} (${slide.template})...`);

    // 1. Encontrar o frame do slide
    const frame = figma.getNodeById(slide.slideId);
    if (!frame) {
      console.error(`  ❌ Frame ${slide.slideId} não encontrado`);
      continue;
    }
    console.log(`  ✅ Frame: "${frame.name}"`);

    // 2. Encontrar o layer de foto
    const bgLayer = findLayerByName(frame, slide.bgLayerName);
    if (!bgLayer) {
      console.warn(`  ⚠️  Layer "${slide.bgLayerName}" não encontrado — tentando "bg-photo"...`);
      const alt = findLayerByName(frame, "bg-photo");
      if (!alt) {
        console.error(`  ❌ Nenhum layer de foto encontrado`);
        continue;
      }
    }
    const photoLayer = bgLayer || findLayerByName(frame, "bg-photo");
    console.log(`  ✅ Layer de foto: "${photoLayer.name}"`);

    // 3. Buscar foto no Unsplash
    console.log(`  🔍 Query: "${slide.query}"`);
    let searchData;
    try {
      searchData = await searchUnsplash(slide.query);
    } catch(e) {
      console.error(`  ❌ Unsplash error: ${e.message}`);
      continue;
    }

    if (!searchData.results || searchData.results.length === 0) {
      console.warn(`  ⚠️  Sem resultados para: "${slide.query}"`);
      continue;
    }

    const photo = searchData.results[0];
    console.log(`  ✅ Foto selecionada: "${photo.alt_description || "sem descrição"}" by ${photo.user.name}`);
    console.log(`     ${photo.links.html}`);

    // 4. Trigger de download (obrigatório — Unsplash Guidelines)
    await triggerDownload(photo.links.download_location);
    console.log(`  ✅ Download trigger enviado`);

    // 5. Fetch dos bytes e criar imagem no Figma
    const imgRes = await fetch(photo.urls.regular);
    const buffer = await imgRes.arrayBuffer();
    const image  = figma.createImage(new Uint8Array(buffer));
    console.log(`  ✅ Imagem criada no Figma`);

    // 6. Injetar no layer de foto
    photoLayer.fills = [{
      type: "IMAGE",
      imageHash: image.hash,
      scaleMode: "FILL"
    }];
    console.log(`  ✅ Foto injetada no layer "${photoLayer.name}"`);

    // 7. Registrar atribuição
    await writeAnnotation(frame, photo, slide.query);
    console.log(`  ✅ Atribuição registrada`);

    results.push({
      slide: frame.name,
      photo: photo.id,
      photographer: photo.user.name,
      url: photo.links.html
    });
  }

  console.log("\n\n=== RESULTADO FINAL ===");
  results.forEach(r => {
    console.log(`${r.slide}`);
    console.log(`  Foto: ${r.photo} by ${r.photographer}`);
    console.log(`  URL: ${r.url}`);
  });

  figma.viewport.scrollAndZoomIntoView(
    SLIDES_WITH_PHOTOS
      .map(s => figma.getNodeById(s.slideId))
      .filter(Boolean)
  );

  return results;
}

// Executar automaticamente
injectPhotos().catch(console.error);
