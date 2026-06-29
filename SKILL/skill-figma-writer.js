#!/usr/bin/env node
/**
 * skill-figma-writer.js
 * Lê arquivos INSTA_Captions.md de uma semana específica e
 * envia os comandos para o Figma Agent Bridge desenhar os carrosséis.
 *
 * Uso: node SKILL/skill-figma-writer.js POSTS/WEEK02_240626_SextaComAmigos
 *
 * Requer: NODE ≥ 18 (fetch nativo)
 */

const fs = require('fs');
const path = require('path');

// Carregar .env
try {
  const envFile = fs.readFileSync(path.join(__dirname, '../.env'), 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) process.env[match[1]] = match[2];
  });
} catch (e) {}

// ─── CONFIG ────────────────────────────────────────────────────────────────────

const FILE_KEY = 'sBItPeNLyvT5EMyKLqQbRv';

const TOKEN = process.env.FIGMA_TOKEN;
if (!TOKEN) throw new Error('FIGMA_TOKEN não encontrado. Defina no arquivo .env');

const BASE = 'https://api.figma.com/v1';
const HEADERS = { 'X-Figma-Token': TOKEN, 'Content-Type': 'application/json' };

// ─── COMPONENT IDs ─────────────────────────────────────────────────────────────

const COMP = {
  // ── COVERS ──
  // PREFERÊNCIA: usar capas COM FOTO (cover-c/d/e) por padrão. cover-a/b (tipográficas) são exceção.
  'cover-a': '3356:6120', // minimal-light (tipográfica — exceção)
  'cover-b': '3356:6288', // dark-bold-left (tipográfica — exceção)
  'cover-c': '3356:6334', // photo-fullbleed (foto + headline/subtext) — usar com 🖼 + image-query
  'cover-d': '3356:6076', // photo-fullbleed (foto + headline/cta)     — usar com 🖼 + image-query
  'cover-e': '3532:2411', // photo-fullbleed (foto + subhead/headline/cta) — usar com 🖼 + image-query

  'block-a': '3356:6346',
  'block-b': '3356:6373',
  'block-c': '3356:6399',
  'block-d': '3356:6411',
  'block-f': '3356:6444',
  'block-g': '3356:6491',
  'block-h': '3356:6555',
  'block-j': '3356:6518',
  'data-e':  '3356:8429',
  'data-f':  '3356:8265',
};

// ─── PARSER ─────────────────────────────────────────────────────────────────────

function parseInstaCaptions(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const slides = [];
  
  // Divide the document by "## Slide"
  const slideBlocks = content.split(/^## Slide/m).slice(1);
  
  for (const block of slideBlocks) {
    const lines = block.trim().split('\n');
    const headerLine = lines[0].trim();
    // Example: 01 / cover-b  OR  03 / block-h 🖼
    const templateMatch = headerLine.match(/\d+\s*\/\s*([\w-]+)/);
    
    if (!templateMatch) continue;
    
    const template = templateMatch[1];
    const textOverrides = {};
    const imageOverrides = {};
    const needsPhoto = headerLine.includes('🖼');
    
    for (const line of lines.slice(1)) {
      if (line.trim() === '---') break; // stop at divider
      const kvMatch = line.match(/^([\w-]+):\s*(.*)$/);
      if (kvMatch) {
        if (kvMatch[1] === 'image-query' || kvMatch[1] === 'bg-photo-query') {
          imageOverrides['image'] = { query: kvMatch[2] };
        } else {
          textOverrides[kvMatch[1]] = kvMatch[2];
        }
      }
    }
    
    slides.push({
      template,
      componentId: COMP[template] || null,
      textOverrides,
      imageOverrides,
      needsPhoto
    });
  }
  
  return slides;
}

// ─── API HELPERS ────────────────────────────────────────────────────────────────

async function figmaGet(endpoint) {
  const res = await fetch(`${BASE}${endpoint}`, { headers: HEADERS });
  const data = await res.json();
  if (data.err || data.status === 403) throw new Error(`API error: ${data.err || data.status}`);
  return data;
}

async function figmaPost(endpoint, body) {
  const res = await fetch(`${BASE}${endpoint}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body)
  });
  return res.json();
}

async function fetchUnsplashImageBase64(query) {
  if (!process.env.UNSPLASH_ACCESS_KEY) {
    console.warn(`⚠️ UNSPLASH_ACCESS_KEY não configurado. Pulando imagem: ${query}`);
    return null;
  }
  try {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=portrait&per_page=5&content_filter=high`, {
      headers: { 'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
    });
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      // Pick a random image from the top 5 to avoid always picking the generic first stock result
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const imgUrl = data.results[randomIndex].urls.regular;
      const imgRes = await fetch(imgUrl);
      const buffer = await imgRes.arrayBuffer();
      return Buffer.from(buffer).toString('base64');
    } else {
      console.warn(`⚠️ Nenhuma imagem encontrada para: ${query}`);
    }
  } catch(e) {
    console.error(`❌ Erro ao buscar imagem no Unsplash:`, e);
  }
  return null;
}

// ─── MAIN ───────────────────────────────────────────────────────────────────────

async function main() {
  const targetDir = process.argv[2];
  if (!targetDir) {
    console.error('❌ Por favor, informe a pasta da semana. Ex: node SKILL/skill-figma-writer.js POSTS/WEEK02_240626_SextaComAmigos');
    process.exit(1);
  }

  const absTargetDir = path.resolve(targetDir);
  const weekName = path.basename(absTargetDir);
  
  // Extract week number from folder name (e.g. WEEK02 -> Semana 26 in real life, or we can just use the folder name)
  const pageName = `🌀 ${weekName.split('_')[1] || weekName}`;

  console.log(`🎨 Padrinho Figma Writer — iniciando para a pasta: ${weekName}\n`);

  // Ler pastas dos dias
  const daysDirs = fs.readdirSync(absTargetDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort();

  const carousels = [];

  for (const day of daysDirs) {
    const captionPath = path.join(absTargetDir, day, 'INSTA_Captions.md');
    if (fs.existsSync(captionPath)) {
      console.log(`📝 Lendo ${day}/INSTA_Captions.md...`);
      const slides = parseInstaCaptions(captionPath);
      carousels.push({ name: day, slides });
    }
  }

  if (carousels.length === 0) {
    console.error('❌ Nenhum arquivo INSTA_Captions.md encontrado nesta semana.');
    process.exit(1);
  }

  // Verificar se a página já existe no Figma
  console.log('\n📂 Lendo páginas do arquivo Figma...');
  const file = await figmaGet(`/files/${FILE_KEY}?depth=1`);
  const pages = file.document.children;
  
  const existingPage = pages.find(p => p.name === pageName);
  if (existingPage) {
    console.log(`⚠️  Página "${existingPage.name}" já existe. O plugin vai jogar os posts nela.`);
  } else {
    console.log(`📄 Tentando criar página "${pageName}"...`);
    try {
      await figmaPost(`/files/${FILE_KEY}/pages`, { name: pageName, insertIndex: 8 });
    } catch (e) {
      console.log('⚠️  Aviso: não foi possível criar a página via API. Você pode ter que criar manualmente se não aparecer.');
    }
  }

  // Preparar payload genérico para o Figma Bridge
  console.log('\n🚀 Enviando comando para o Figma Agent Bridge (porta 5845)...');
  const bridgePayload = {
    action: 'BATCH_CLONE_AND_FILL',
    payload: {
      pageName: pageName,
      items: []
    }
  };

  let currentY = 0;
  for (const carousel of carousels) {
    let currentX = 0;
    for (const slide of carousel.slides) {
      if (!slide.componentId) {
        console.warn(`⚠️ Template desconhecido ou sem ID configurado: ${slide.template}`);
        continue;
      }
      if (slide.imageOverrides && slide.imageOverrides['image'] && slide.imageOverrides['image'].query) {
        console.log(`🖼  Buscando imagem para query: "${slide.imageOverrides['image'].query}"...`);
        const base64 = await fetchUnsplashImageBase64(slide.imageOverrides['image'].query);
        if (base64) {
          slide.imageOverrides['image'].base64 = base64;
        }
      }
      bridgePayload.payload.items.push({
        componentId: slide.componentId,
        x: currentX,
        y: currentY,
        textOverrides: slide.textOverrides,
        imageOverrides: slide.imageOverrides
      });
      currentX += 1080; // Largura do slide (sem espaço entre eles)
    }
    currentY += 1350 + 450; // Altura do slide (1350) + 450px de espaço
  }

  try {
    const bridgeRes = await fetch('http://127.0.0.1:5845/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bridgePayload)
    });
    
    if (bridgeRes.ok) {
      console.log('✅ Comando recebido pela Ponte! Verifique seu Figma.');
    } else {
      const errTxt = await bridgeRes.text();
      console.log('⚠️  A Ponte retornou um erro:', errTxt);
    }
  } catch (e) {
    console.log('⚠️  Não foi possível conectar à Ponte no localhost:5845.');
    console.log('   Certifique-se de que a Ponte está rodando e a janela do Figma está aberta.');
  }

  // Sumário
  console.log('\n─────────────────────────────────────────────');
  console.log('📊 SUMÁRIO DE EXECUÇÃO');
  console.log(`   Semana: ${weekName}`);
  console.log(`   Carrosséis processados: ${carousels.length}`);
  console.log(`   Total slides gerados: ${carousels.reduce((acc, c) => acc + c.slides.length, 0)}`);
  console.log('─────────────────────────────────────────────\n');
}

main().catch(err => {
  console.error('❌ Erro Fatal:', err.message);
  process.exit(1);
});
