export default async (req, res) => {
  const tests = [];

  // Test 1: Google (sanity check)
  try {
    const resp = await Promise.race([
      fetch("https://www.google.com", { method: "HEAD", headers: { "User-Agent": "Test" } }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000))
    ]);
    tests.push({ api: "Google", status: resp.status, ok: resp.ok, error: null });
  } catch (e) {
    tests.push({ api: "Google", status: null, ok: false, error: e.message });
  }

  // Test 2: Insightfulpipe
  try {
    const url = `${process.env.INSIGHTFULPIPE_API_URL || 'https://api.insightfulpipe.com/v1'}/health`;
    const resp = await Promise.race([
      fetch(url, { method: "GET", headers: { "Authorization": `Bearer ${process.env.INSIGHTFULPIPE_API_KEY}` } }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000))
    ]);
    tests.push({ api: "Insightfulpipe", status: resp.status, ok: resp.ok, error: null });
  } catch (e) {
    tests.push({ api: "Insightfulpipe", status: null, ok: false, error: e.message });
  }

  // Test 3: DNS resolution test
  try {
    const url = "https://api.insightfulpipe.com/v1/instagram/account/test/metrics";
    const resp = await Promise.race([
      fetch(url, { method: "GET" }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000))
    ]);
    tests.push({ api: "Insightfulpipe (actual endpoint)", status: resp.status, ok: resp.ok, error: null });
  } catch (e) {
    tests.push({ api: "Insightfulpipe (actual endpoint)", status: null, ok: false, error: e.message });
  }

  res.json({ timestamp: new Date().toISOString(), vercel: !!process.env.VERCEL, tests });
};
