/**
 * inject-photos-node.js
 * 
 * Busca fotos no Unsplash e injeta nos slides via Figma REST API.
 * Roda localmente com: node scripts/inject-photos-node.js
 * 
 * Pré-requisitos:
 *   node >= 18  (tem fetch nativo)
 *   FIGMA_TOKEN em brand/figma-token.txt  (Personal Access Token do Figma)
 *   UNSPLASH_KEY em brand/unsplash-key.txt
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const root  = resolve(__dir, "..");

// ─── Ler credenciais ──────────────────────────────────────────────────────────
function readKey(file) {
  const path = resolve(root, "brand", file);
  const content = readFileSync(path, "utf8");
  // Suporta formato KEY=valor ou linha simples
  const match = content.match(/ACCESS_KEY=(.+)/);
  if (match) return match[1].trim();
  const lines = content.split("\n").filter(l => l && !l.startsWith("#"));
  return lines[0].trim();
}

function readFigmaToken() {
  const path = resolve(root, "brand", "figma-token.txt");
  const content = readFileSync(path, "utf8");
  const match = content.match(/TOKEN=(.+)/);
  if (match) return match[1].trim();
  return content.split("\n").filter(l => l && !l.startsWith("#"))[0].trim();
}

const UNSPLASH_KEY  = readKey("unsplash-key.txt");
const FIGMA_TOKEN   = readFigmaToken();
const FIGMA_FILE    = "sBItPeNLyvT5EMyKLqQbRv";

// ─── Slides com foto a injetar ────────────────────────────────────────────────
const SLIDES = [
  {
    slideId:    "3363:219",
    slideName:  "Slide 05 — Não é falta de força. É o cérebro.",
    template:   "block-h",
    imageLayer: "ivana-cajina-9fl5AUulJsk-unsplash 1",
    query:      "woman overwhelmed anxious dark moody authentic portrait",
  },
  {
    slideId:    "3363:309",
    slideName:  "Slide 09 — Cada recaída carrega uma informação.",
    template:   "block-j",
    imageLayer: "ivana-cajina-9fl5AUulJsk-unsplash 1",
    query:      "man stressed hands head dark moody authentic portrait",
  }
];

// ─── Unsplash ─────────────────────────────────────────────────────────────────
async function searchUnsplash(query) {
  const params = new URLSearchParams({
    query, orientation: "portrait",
    per_page: "5", content_filter: "high", order_by: "relevant"
  });
  const res = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
    headers: { "Authorization": `Client-ID ${UNSPLASH_KEY}`, "Accept-Version": "v1" }
  });
  if (!res.ok) throw new Error(`Unsplash ${res.status}: ${await res.text()}`);
  return res.json();
}

async function triggerDownload(url) {
  await fetch(url, {
    headers: { "Authorization": `Client-ID ${UNSPLASH_KEY}` }
  });
}

// ─── Figma REST API ───────────────────────────────────────────────────────────
async function uploadImageToFigma(imageUrl) {
  // Baixar a imagem
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error(`Image fetch failed: ${imgRes.status}`);
  const buffer = await imgRes.arrayBuffer();
  const bytes  = Buffer.from(buffer);

  // Fazer upload via Figma REST API
  const uploadRes = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE}/images`,
    {
      method: "POST",
      headers: {
        "X-Figma-Token": FIGMA_TOKEN,
        "Content-Type":  "image/jpeg"
      },
      body: bytes
    }
  );

  if (!uploadRes.ok) {
    const err = await uploadRes.text();
    throw new Error(`Figma upload failed ${uploadRes.status}: ${err}`);
  }

  const data = await uploadRes.json();
  // Retorna { error: false, status: 200, meta: { images: { "nodeId": "imageRef" } } }
  return data;
}

async function getNodeInfo(nodeId) {
  const res = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE}/nodes?ids=${encodeURIComponent(nodeId)}`,
    { headers: { "X-Figma-Token": FIGMA_TOKEN } }
  );
  const data = await res.json();
  return data.nodes[nodeId]?.document;
}

function findImageLayerInNode(node, layerName) {
  if (node.name === layerName) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findImageLayerInNode(child, layerName);
      if (found) return found;
    }
  }
  return null;
}

async function setImageFill(nodeId, imageRef) {
  const res = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE}/nodes`,
    {
      method: "PUT",
      headers: {
        "X-Figma-Token": FIGMA_TOKEN,
        "Content-Type":  "application/json"
      },
      body: JSON.stringify({
        nodes: {
          [nodeId]: {
            document: {
              fills: [{
                type:       "IMAGE",
                imageRef:   imageRef,
                scaleMode:  "FILL",
                visible:    true,
                opacity:    1
              }]
            }
          }
        }
      })
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Figma fill update failed ${res.status}: ${err}`);
  }
  return res.json();
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log("🚀 Padrinho Photo Injector\n");

  for (const slide of SLIDES) {
    console.log(`\n📸 ${slide.slideName}`);
    console.log(`   Template: ${slide.template} | Node: ${slide.slideId}`);

    try {
      // 1. Buscar estrutura do node no Figma
      console.log("   → Buscando estrutura do frame no Figma...");
      const frameNode = await getNodeInfo(slide.slideId);
      if (!frameNode) throw new Error(`Frame ${slide.slideId} não encontrado`);

      // 2. Encontrar o layer de imagem
      const imgLayer = findImageLayerInNode(frameNode, slide.imageLayer);
      if (!imgLayer) throw new Error(`Layer "${slide.imageLayer}" não encontrado`);
      console.log(`   ✅ Layer encontrado: "${imgLayer.name}" (${imgLayer.id})`);

      // 3. Buscar foto no Unsplash
      console.log(`   → Buscando foto: "${slide.query}"`);
      const search = await searchUnsplash(slide.query);
      if (!search.results?.length) throw new Error("Sem resultados no Unsplash");

      const photo = search.results[0];
      console.log(`   ✅ Foto: "${photo.alt_description || "sem descrição"}" by ${photo.user.name}`);
      console.log(`      ${photo.links.html}`);

      // 4. Trigger de download (obrigatório — Unsplash Guidelines)
      await triggerDownload(photo.links.download_location);
      console.log("   ✅ Download trigger enviado");

      // 5. Upload da imagem para o Figma
      console.log("   → Fazendo upload para o Figma...");
      const uploadData = await uploadImageToFigma(photo.urls.regular);

      // A API retorna um imageRef para o arquivo
      const imageRef = Object.values(uploadData.meta?.images || {})[0]
        || uploadData.imageRef;

      if (!imageRef) {
        console.log("   Upload response:", JSON.stringify(uploadData, null, 2));
        throw new Error("imageRef não retornado pelo Figma");
      }
      console.log(`   ✅ Upload concluído: ref ${imageRef}`);

      // 6. Aplicar fill no layer correto
      console.log("   → Aplicando fill no layer...");
      await setImageFill(imgLayer.id, imageRef);
      console.log(`   ✅ Foto injetada no layer "${imgLayer.name}"`);

      // 7. Log da atribuição
      console.log("\n   📝 ATRIBUIÇÃO:");
      console.log(`   FOTO: ${photo.user.name} via Unsplash`);
      console.log(`   PERFIL: ${photo.user.links.html}?utm_source=padrinho_app&utm_medium=referral`);
      console.log(`   URL: ${photo.links.html}?utm_source=padrinho_app&utm_medium=referral`);
      console.log(`   QUERY: "${slide.query}"`);

    } catch(e) {
      console.error(`   ❌ ERRO: ${e.message}`);
    }
  }

  console.log("\n\n✅ Concluído. Verifique os slides na página _QUEUE do Figma.");
}

run();
