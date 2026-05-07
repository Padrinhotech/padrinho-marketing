/**
 * inject-photos-node.js
 * 
 * Busca fotos no Unsplash e injeta nos slides via Figma REST API.
 * Roda localmente com: node marketing/scripts/inject-photos-node.js
 * 
 * Pré-requisitos:
 *   node >= 18
 *   FIGMA_TOKEN em marketing/brand/figma-token.txt
 *   UNSPLASH_KEY em marketing/brand/unsplash-key.txt
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const root  = resolve(__dir, "..");

function readKey(file) {
  const path = resolve(root, "brand", file);
  const content = readFileSync(path, "utf8");
  const match = content.match(/ACCESS_KEY=(.+)/);
  if (match) return match[1].trim();
  return content.split("\n").filter(l => l && !l.startsWith("#"))[0].trim();
}

function readFigmaToken() {
  const path = resolve(root, "brand", "figma-token.txt");
  const content = readFileSync(path, "utf8");
  const match = content.match(/TOKEN=(.+)/);
  if (match) return match[1].trim();
  return content.split("\n").filter(l => l && !l.startsWith("#"))[0].trim();
}

const UNSPLASH_KEY = readKey("unsplash-key.txt");
const FIGMA_TOKEN  = readFigmaToken();
const FIGMA_FILE   = "sBItPeNLyvT5EMyKLqQbRv";

const SLIDES = [
  {
    slideId:    "3363:219",
    template:   "block-h",
    imageLayer: "ivana-cajina-9fl5AUulJsk-unsplash 1",
    query:      "woman overwhelmed anxious dark moody authentic portrait",
  },
  {
    slideId:    "3363:309",
    template:   "block-j",
    imageLayer: "ivana-cajina-9fl5AUulJsk-unsplash 1",
    query:      "man stressed hands head dark moody authentic portrait",
  }
];

async function searchUnsplash(query) {
  const params = new URLSearchParams({ query, orientation: "portrait", per_page: "5", content_filter: "high", order_by: "relevant" });
  const res = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
    headers: { "Authorization": `Client-ID ${UNSPLASH_KEY}`, "Accept-Version": "v1" }
  });
  if (!res.ok) throw new Error(`Unsplash ${res.status}`);
  return res.json();
}

async function triggerDownload(url) {
  await fetch(url, { headers: { "Authorization": `Client-ID ${UNSPLASH_KEY}` } });
}

async function uploadImageToFigma(imageUrl) {
  const imgRes = await fetch(imageUrl);
  const buffer = await imgRes.arrayBuffer();
  const bytes  = Buffer.from(buffer);
  const uploadRes = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE}/images`, {
    method: "POST",
    headers: { "X-Figma-Token": FIGMA_TOKEN, "Content-Type": "image/jpeg" },
    body: bytes
  });
  if (!uploadRes.ok) throw new Error(`Figma upload failed ${uploadRes.status}`);
  return uploadRes.json();
}

async function getNodeInfo(nodeId) {
  const res = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE}/nodes?ids=${encodeURIComponent(nodeId)}`, {
    headers: { "X-Figma-Token": FIGMA_TOKEN }
  });
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
  const res = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE}/nodes`, {
    method: "PUT",
    headers: { "X-Figma-Token": FIGMA_TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify({
      nodes: { [nodeId]: { document: { fills: [{ type: "IMAGE", imageRef, scaleMode: "FILL", visible: true, opacity: 1 }] } } }
    })
  });
  if (!res.ok) throw new Error(`Figma fill update failed ${res.status}`);
  return res.json();
}

async function run() {
  console.log("🚀 Padrinho Photo Injector\n");
  for (const slide of SLIDES) {
    console.log(`\n📸 ${slide.slideId} (${slide.template})`);
    try {
      const frameNode = await getNodeInfo(slide.slideId);
      if (!frameNode) throw new Error(`Frame não encontrado`);
      const imgLayer = findImageLayerInNode(frameNode, slide.imageLayer);
      if (!imgLayer) throw new Error(`Layer "${slide.imageLayer}" não encontrado`);
      const search = await searchUnsplash(slide.query);
      if (!search.results?.length) throw new Error("Sem resultados");
      const photo = search.results[0];
      console.log(`  ✅ Foto: "${photo.alt_description}" by ${photo.user.name}`);
      await triggerDownload(photo.links.download_location);
      const uploadData = await uploadImageToFigma(photo.urls.regular);
      const imageRef = Object.values(uploadData.meta?.images || {})[0];
      if (!imageRef) throw new Error("imageRef não retornado");
      await setImageFill(imgLayer.id, imageRef);
      console.log(`  ✅ Foto injetada`);
    } catch(e) {
      console.error(`  ❌ ERRO: ${e.message}`);
    }
  }
  console.log("\n✅ Concluído.");
}

run();
