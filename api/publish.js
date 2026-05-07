// api/publish.js
// Publica o carrossel no Instagram via Graph API

const IG_API = "https://graph.instagram.com/v19.0";

async function uploadCarouselItem(imageUrl, accessToken, accountId) {
  const res = await fetch(`${IG_API}/${accountId}/media`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image_url: imageUrl,
      is_carousel_item: true,
      access_token: accessToken,
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(`Upload falhou: ${data.error.message}`);
  return data.id;
}

async function createCarousel(itemIds, caption, accessToken, accountId) {
  const res = await fetch(`${IG_API}/${accountId}/media`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      media_type: "CAROUSEL",
      children: itemIds.join(","),
      caption,
      access_token: accessToken,
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(`Carrossel falhou: ${data.error.message}`);
  return data.id;
}

async function waitReady(containerId, accessToken, attempts = 12) {
  for (let i = 0; i < attempts; i++) {
    const res = await fetch(
      `${IG_API}/${containerId}?fields=status_code&access_token=${accessToken}`
    );
    const data = await res.json();
    if (data.status_code === "FINISHED") return true;
    if (data.status_code === "ERROR") throw new Error("Processamento do container falhou");
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error("Timeout aguardando container");
}

async function publish(containerId, accessToken, accountId) {
  const res = await fetch(`${IG_API}/${accountId}/media_publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ creation_id: containerId, access_token: accessToken }),
  });
  const data = await res.json();
  if (data.error) throw new Error(`Publicação falhou: ${data.error.message}`);
  return data.id;
}

async function getPermalink(mediaId, accessToken) {
  const res = await fetch(
    `${IG_API}/${mediaId}?fields=permalink&access_token=${accessToken}`
  );
  const data = await res.json();
  return data.permalink;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;

  try {
    const { content, slides } = req.body;
    const validSlides = (slides || []).filter((s) => s.url);

    if (!content || validSlides.length === 0) {
      return res.status(400).json({ error: "Sem conteúdo ou slides para publicar" });
    }

    console.log(`📤 Publicando ${validSlides.length} slides...`);

    const itemIds = [];
    for (const slide of validSlides) {
      const id = await uploadCarouselItem(slide.url, accessToken, accountId);
      itemIds.push(id);
    }

    const caption = `${content.caption}\n\n${content.hashtags}`;
    const carouselId = await createCarousel(itemIds, caption, accessToken, accountId);
    await waitReady(carouselId, accessToken);
    const mediaId = await publish(carouselId, accessToken, accountId);
    const permalink = await getPermalink(mediaId, accessToken);

    console.log("✅ Publicado:", permalink);
    return res.status(200).json({ success: true, mediaId, permalink });
  } catch (error) {
    console.error("❌ Erro ao publicar:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
