/**
 * inject-photos.js
 * 
 * Busca fotos no Unsplash e injeta nos slides via Figma Plugin API.
 * 
 * COMO USAR:
 * 1. Abra o Figma com o arquivo sBItPeNLyvT5EMyKLqQbRv
 * 2. Abra o console do plugin (Plugins → Development → Open Console)
 * 3. Cole o conteúdo deste arquivo no console
 * 4. Execute: await injectPhotos()
 */

const UNSPLASH_KEY = "hXQNoO0pFV8DW5PjDRp5kKFDQIV6JmxJ9xJWwknW0go";
const FIGMA_FILE   = "sBItPeNLyvT5EMyKLqQbRv";

const SLIDES_WITH_PHOTOS = [
  {
    slideId:    "3363:219",
    template:   "block-h",
    bgLayerName: "ivana-cajina-9fl5AUulJsk-unsplash 1",
    query:      "woman overwhelmed anxious dark moody authentic portrait",
    pilar:      "reconhecimento"
  },
  {
    slideId:    "3363:309",
    template:   "block-j",
    bgLayerName: "ivana-cajina-9fl5AUulJsk-unsplash 1",
    query:      "man stressed hands head dark moody authentic portrait",
    pilar:      "reconhecimento"
  }
];

async function searchUnsplash(query) {
  const params = new URLSearchParams({ query, orientation: "portrait", per_page: "5", content_filter: "high", order_by: "relevant" });
  const res = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
    headers: { "Authorization": `Client-ID ${UNSPLASH_KEY}`, "Accept-Version": "v1" }
  });
  if (!res.ok) throw new Error(`Unsplash error ${res.status}`);
  return res.json();
}

async function triggerDownload(downloadLocation) {
  await fetch(downloadLocation, { headers: { "Authorization": `Client-ID ${UNSPLASH_KEY}` } });
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

async function injectPhotos() {
  const queuePage = figma.root.children.find(p => p.name === "_QUEUE");
  if (!queuePage) throw new Error("Página _QUEUE não encontrada");
  await figma.setCurrentPageAsync(queuePage);

  for (const slide of SLIDES_WITH_PHOTOS) {
    console.log(`\n📸 Processando ${slide.slideId} (${slide.template})...`);
    const frame = figma.getNodeById(slide.slideId);
    if (!frame) { console.error(`❌ Frame ${slide.slideId} não encontrado`); continue; }

    const photoLayer = findLayerByName(frame, slide.bgLayerName) || findLayerByName(frame, "bg-photo");
    if (!photoLayer) { console.error(`❌ Layer de foto não encontrado`); continue; }

    const searchData = await searchUnsplash(slide.query);
    if (!searchData.results?.length) { console.warn(`⚠️ Sem resultados`); continue; }

    const photo = searchData.results[0];
    console.log(`✅ Foto: "${photo.alt_description}" by ${photo.user.name}`);
    await triggerDownload(photo.links.download_location);

    const imgRes = await fetch(photo.urls.regular);
    const buffer = await imgRes.arrayBuffer();
    const image  = figma.createImage(new Uint8Array(buffer));
    photoLayer.fills = [{ type: "IMAGE", imageHash: image.hash, scaleMode: "FILL" }];
    console.log(`✅ Foto injetada`);
  }
}

injectPhotos().catch(console.error);
