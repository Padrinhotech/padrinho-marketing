#!/usr/bin/env node
/**
 * skill-figma-writer.js
 * Cria a página 🌀 Semana 12 no arquivo Figma da Padrinho
 * e popula 4 carrosséis de Instagram com os slides definidos
 * nos arquivos instagram-captions.md de cada post da WEEK02.
 *
 * Uso: node SKILL/skill-figma-writer.js
 *
 *
 * Requer: NODE ≥ 18 (fetch nativo)
 * API key lida de: .env (FIGMA_TOKEN) ou env vars
 */

const fs = require('fs');
const path = require('path');

// Carregar .env manualmente para evitar dependências extras
try {
  const envFile = fs.readFileSync(path.join(__dirname, '../.env'), 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      process.env[match[1]] = match[2];
    }
  });
} catch (e) {
  // Ignora se não existir
}

// ─── CONFIG ────────────────────────────────────────────────────────────────────

const FILE_KEY = 'sBItPeNLyvT5EMyKLqQbRv';
const COMPONENTS_PAGE_ID = '3345:20';
const QUEUE_PAGE_ID = '3319:20';

// Lê token do .env ou variável de ambiente
function getToken() {
  const envToken = process.env.FIGMA_TOKEN;
  if (envToken) return envToken;
  throw new Error('FIGMA_TOKEN não encontrado. Defina no arquivo .env');
}

const TOKEN = getToken();
const BASE = 'https://api.figma.com/v1';
const HEADERS = { 'X-Figma-Token': TOKEN, 'Content-Type': 'application/json' };

// ─── COMPONENT IDs (de _COMPONENTS) ────────────────────────────────────────────

const COMP = {
  'cover-a': '3356:6120',
  'cover-b': '3356:6288',
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

// ─── CARROSSELS: definição dos 4 posts ─────────────────────────────────────────

const CAROUSELS = [
  {
    name: '01 / Sunday — Rosa / Gatilho Social',
    folder: 'WEEK02_240626_SextaComAmigos/01_SUNDAY_RosaGatilhoSocial',
    slides: [
      { template: 'cover-b', headline: 'A sexta chegou.', italic: 'E com ela a pressão.', body: 'Isso que você sente não é fraqueza. É humano — e tem um nome.', counter: '01 / 08' },
      { template: 'block-d', headline: 'A sexta não é', italic: 'só um convite para beber.', body: 'É um convite para pertencer. Relaxar. Se sentir parte. O álcool é o veículo — mas o que você busca vai além dele.', counter: '02 / 08' },
      { template: 'block-h', subhead: 'É isso mesmo!', headline: 'É normal', italic: 'sentir essa pressão.', body: 'O convite do happy hour carrega muito mais do que um drink. E reconhecer isso muda a sua escolha.', counter: '03 / 08', needsPhoto: true },
      { template: 'block-f', headline: 'Como a pressão social', italic: 'aparece sem ser dita:', bullets: ['O olhar quando você pede água', '"Mas é sexta, você não vai beber?"', 'O brinde que todo mundo faz — menos você', '"Semana pesada, a gente merece"'], counter: '04 / 08' },
      { template: 'data-f', headline: '73%', body: 'das pessoas em recovery relatam a sexta-feira como o gatilho social mais frequente.', counter: '05 / 08' },
      { template: 'block-g', subhead: 'Antes de responder o convite:', headline: 'Pause 30 segundos', italic: 'e pergunte:', bullets: ['O que eu estou sentindo agora?', 'O que eu espero que o happy hour entregue?', 'Se não fosse beber, eu ainda iria?'], counter: '06 / 08' },
      { template: 'block-j', headline: 'Reconhecer o gatilho', italic: 'já é uma escolha.', subtext: 'Você não precisa resistir na força. Precisa criar um segundo entre o estímulo e a resposta.', counter: '07 / 08', needsPhoto: true },
      { template: 'block-d', headline: 'O Bill está aqui', italic: 'para essa conversa.', body: 'Antes da sexta. Durante. E depois. Sem julgamento, no seu tempo.', cta: 'Falar com o Bill agora', counter: '08 / 08' },
    ]
  },
  {
    name: '02 / Monday — Rosa / Relaxar vs. Escapar',
    folder: 'WEEK02_240626_SextaComAmigos/02_MONDAY_RosaRelaxarVsEscapar',
    slides: [
      { template: 'cover-a', headline: 'Relaxar e escapar', italic: 'não são a mesma coisa.', body: 'E saber qual dos dois está acontecendo em você muda tudo.', counter: '01 / 08' },
      { template: 'block-d', headline: 'Relaxar te deixa', italic: 'mais você depois.', body: 'Escapar te afasta de você — temporariamente. O alívio é real. Mas o que estava lá volta quando o efeito passa.', counter: '02 / 08' },
      { template: 'block-h', subhead: 'É isso mesmo!', headline: 'O corpo', italic: 'sabe a diferença.', body: 'Quando você genuinamente relaxa, sai mais leve. Quando escapa, acorda mais pesada.', counter: '03 / 08', needsPhoto: true },
      { template: 'block-a', headline: 'Sinais de que', italic: 'é descanso genuíno:', bullets: ['Você quer aquelas pessoas — não o drink', 'Conseguiria parar no primeiro sem frustração', 'Na segunda, você lembra a sexta com leveza', 'Seu corpo não pede o drink — sua mente quer a companhia'], counter: '04 / 08' },
      { template: 'block-f', headline: 'Sinais de que pode', italic: 'ser escape:', bullets: ['Você quer o alívio — não as pessoas', 'Happy hour sem drink parece inútil', 'Está tentando não pensar em algo específico', 'Na manhã seguinte, se sente mais pesada que descansada'], counter: '05 / 08' },
      { template: 'data-e', headline: 'Escape vira padrão', italic: 'quando é a única ferramenta.', body: 'Com o tempo, a tolerância aumenta. O alívio diminui. E o que foi anestesiado acumula sem ser processado.', counter: '06 / 08' },
      { template: 'block-j', headline: 'Reconhecer', italic: 'já é uma escolha.', subtext: 'Você não precisa mudar nada hoje. Só observar o que realmente está acontecendo quando a sexta chega.', counter: '07 / 08', needsPhoto: true },
      { template: 'block-d', headline: 'O Bill está aqui', italic: 'para essa conversa.', body: 'Sem julgamento. Sem resposta certa. Só um espaço para ser honesta consigo mesma.', cta: 'Conversar agora', counter: '08 / 08' },
    ]
  },
  {
    name: '03 / Wednesday — Pedro / A Matemática do "Só Mais Um"',
    folder: 'WEEK02_240626_SextaComAmigos/03_WEDNESDAY_PedroMaisUm',
    slides: [
      { template: 'cover-b', headline: '"Só mais um."', italic: 'Por que o cérebro mente?', body: 'Não é falta de controle. É um circuito neurológico — previsível e compreensível.', counter: '01 / 08' },
      { template: 'block-d', headline: 'Não é fraqueza.', italic: 'É neurobiologia.', body: 'Seu cérebro está seguindo uma lógica muito precisa. E quando você entende essa lógica, você tem mais poder sobre ela.', counter: '02 / 08' },
      { template: 'block-h', subhead: 'É isso mesmo!', headline: 'O primeiro drink', italic: 'muda o jogo.', body: 'O córtex pré-frontal — responsável pelo autocontrole — tem sua atividade reduzida depois do primeiro drink. A decisão do "só um" foi tomada antes dele.', counter: '03 / 08', needsPhoto: true },
      { template: 'block-f', headline: '3 mecanismos que', italic: 'explicam o "só mais um":', bullets: ['Tolerância — o efeito diminui, o cérebro pede mais', 'Desinibição — o autocontrole fica comprometido após o 1°', 'Recompensa variável — "talvez o próximo seja o ideal"'], counter: '04 / 08' },
      { template: 'data-f', headline: '60%', body: 'do efeito do primeiro drink é menor hoje do que era há 1 ano em quem bebe regularmente.', counter: '05 / 08' },
      { template: 'block-g', subhead: 'O que fazer com isso:', headline: 'Decida antes', italic: 'de sair.', bullets: ['Sua decisão é mais sólida antes do 1° drink', 'Estabeleça uma âncora concreta: "2 drinks, depois água"', 'Saiba onde fica seu ponto crítico — e planeje antes'], counter: '06 / 08' },
      { template: 'block-j', headline: 'Entender o mecanismo', italic: 'é ganhar controle.', subtext: 'Você não é o problema. O problema é não ter um mapa. Agora você tem.', counter: '07 / 08', needsPhoto: true },
      { template: 'block-c', headline: 'O Bill pode ajudar', italic: 'a mapear seus padrões.', body: 'Antes do happy hour. No seu tempo. Sem julgamento.', cta: 'Conversar com o Bill', counter: '08 / 08' },
    ]
  },
  {
    name: '04 / Friday — Pedro / Como Curtir a Sexta Sem Álcool',
    folder: 'WEEK02_240626_SextaComAmigos/04_FRIDAY_PedroSextaSemAlcool',
    slides: [
      { template: 'cover-a', headline: 'Essa sexta pode', italic: 'ser diferente.', body: 'Se você quiser. E se você tiver um plano.', counter: '01 / 08' },
      { template: 'block-d', headline: 'O álcool não precisa', italic: 'ser o protagonista.', body: 'Você pode curtir a sexta com as mesmas pessoas, no mesmo bar, com uma experiência completamente diferente.', counter: '02 / 08' },
      { template: 'block-h', subhead: 'É isso mesmo!', headline: 'Decida antes', italic: 'de sair.', body: 'Com o cérebro tranquilo e fora do ambiente, suas decisões são muito mais sólidas.', counter: '03 / 08', needsPhoto: true },
      { template: 'block-a', headline: '3 coisas para decidir', italic: 'antes do happy hour:', bullets: ['O que você vai pedir (já sabe antes de chegar)', 'O que vai responder: "Por que você não tá bebendo?"', 'Até que horas você vai ficar — e quando reavalia', 'O que você quer levar dessa noite'], counter: '04 / 08' },
      { template: 'block-f', headline: '3 respostas que funcionam', italic: 'sem gerar debate:', bullets: ['"Tô cortando um pouco, vendo como me sinto"', '"Amanhã tenho uma coisa cedo"', '"Hoje não tô com vontade"'], counter: '05 / 08' },
      { template: 'block-b', headline: 'O sábado', italic: 'muda tudo.', bullets: ['Você lembra da conversa inteira', 'Acorda sem névoa, sem ansiedade', 'O corpo descansou de verdade', 'Você tem a manhã de volta'], counter: '06 / 08' },
      { template: 'block-j', headline: 'O melhor da sexta', italic: 'não estava no copo.', subtext: 'Quando você experimenta uma vez, a comparação existe — e a comparação é informação.', counter: '07 / 08', needsPhoto: true },
      { template: 'block-d', headline: 'O Bill pode te ajudar', italic: 'a planejar essa sexta.', body: 'Antes de sair. Sem julgamento. No seu tempo.', cta: 'Conversar com o Bill', counter: '08 / 08' },
    ]
  }
];

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

// ─── MAIN ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🎨 Padrinho Figma Writer — iniciando\n');

  // 1. Buscar estrutura do arquivo
  console.log('📂 Lendo páginas do arquivo...');
  const file = await figmaGet(`/files/${FILE_KEY}?depth=1`);
  const pages = file.document.children;
  console.log(`   Encontradas ${pages.length} páginas`);

  // 2. Verificar se página Semana 12 já existe
  const existingPage = pages.find(p => p.name.includes('Semana 12'));
  if (existingPage) {
    console.log(`⚠️  Página "${existingPage.name}" já existe (id: ${existingPage.id}). Pulando criação.`);
  } else {
    console.log('📄 Criando página "🌀 Semana 12"...');
    // Nota: criação de página via API requer POST /v1/files/:key/pages
    // Isso é suportado na Figma REST API com Content-Disposition form
    const createRes = await figmaPost(`/files/${FILE_KEY}/pages`, {
      name: '🌀 Semana 12',
      insertIndex: 8 // inserir após Semana 11
    });
    console.log('   Resultado:', JSON.stringify(createRes).slice(0, 200));
  }

  // 3. Buscar componentes de _COMPONENTS
  console.log('\n🧩 Lendo componentes de _COMPONENTS...');
  const compData = await figmaGet(`/files/${FILE_KEY}/nodes?ids=${Object.values(COMP).join(',')}&depth=1`);
  const compNodes = compData.nodes;
  console.log(`   Componentes disponíveis: ${Object.keys(compNodes).length}`);

  // 4. Para cada carrossel, gerar spec JSON
  console.log('\n📝 Gerando specs dos carrosséis...');
  const specs = [];

  for (const [ci, carousel] of CAROUSELS.entries()) {
    console.log(`\n  [${ci + 1}/4] ${carousel.name}`);
    const carouselSpec = {
      name: carousel.name,
      folder: carousel.folder,
      slides: []
    };

    for (const [si, slide] of carousel.slides.entries()) {
      const compId = COMP[slide.template];
      const compNode = compNodes[compId]?.document;
      const slideSpec = {
        slideIndex: si + 1,
        template: slide.template,
        componentId: compId,
        componentName: compNode?.name || slide.template,
        content: {
          counter: slide.counter,
          headline: slide.headline || '',
          headlineItalic: slide.italic || '',
          body: slide.body || '',
          subhead: slide.subhead || '',
          subtext: slide.subtext || '',
          cta: slide.cta || '',
          bullets: slide.bullets || [],
        },
        needsPhoto: !!slide.needsPhoto,
      };
      carouselSpec.slides.push(slideSpec);
      console.log(`     S${si + 1}: ${slide.template}${slide.needsPhoto ? ' 🖼' : ''} — "${slide.headline || slide.body}"`);
    }
    specs.push(carouselSpec);
  }

  // 5. Salvar specs como JSON para referência
  const specPath = path.join(__dirname, '../POSTS/WEEK02_240626_SextaComAmigos/figma-specs.json');
  fs.writeFileSync(specPath, JSON.stringify(specs, null, 2));
  console.log(`\n✅ Specs salvas em: POSTS/WEEK02_240626_SextaComAmigos/figma-specs.json`);

  // 6. Preparar payload genérico para o Figma Bridge
  console.log('\n🚀 Enviando comando para o Figma Agent Bridge...');
  const bridgePayload = {
    action: 'BATCH_CLONE_AND_FILL',
    payload: {
      pageName: '🌀 Semana 12',
      items: []
    }
  };

  let currentX = 0;
  for (const carousel of specs) {
    for (const slide of carousel.slides) {
      bridgePayload.payload.items.push({
        componentId: slide.componentId,
        x: currentX,
        y: 0,
        textOverrides: {
          counter: slide.content.counter,
          headline: slide.content.headline,
          'headline-italic': slide.content.headlineItalic,
          body: slide.content.body,
          subhead: slide.content.subhead,
          subtext: slide.content.subtext,
          cta: slide.content.cta
        }
      });
      currentX += 1200; // Espaçamento entre os slides
    }
    currentX += 800; // Espaçamento extra entre carrosséis
  }

  try {
    const bridgeRes = await fetch('http://127.0.0.1:3845/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bridgePayload)
    });
    
    if (bridgeRes.ok) {
      console.log('✅ Comando recebido pela Ponte! Verifique seu Figma.');
    } else {
      const errTxt = await bridgeRes.text();
      console.log('⚠️  A Ponte retornou um erro:', errTxt);
      console.log('   Certifique-se de que o plugin está aberto no Figma.');
    }
  } catch (e) {
    console.log('⚠️  Não foi possível conectar à Ponte no localhost:3845.');
    console.log('   Rode o servidor `bridge.js` e abra o plugin no Figma.');
  }

  // 7. Sumário
  console.log('\n─────────────────────────────────────────────');
  console.log('📊 SUMÁRIO');
  console.log(`   Arquivo: ${FILE_KEY}`);
  console.log(`   Carrosséis: ${CAROUSELS.length}`);
  console.log(`   Total slides: ${CAROUSELS.reduce((acc, c) => acc + c.slides.length, 0)}`);
  console.log('─────────────────────────────────────────────\n');
}

main().catch(err => {
  console.error('❌ Erro:', err.message);
  process.exit(1);
});
