/**
 * Health Check Endpoint
 * Minimal test
 */

module.exports = async function handler(req, res) {
  try {
    res.setHeader("Content-Type", "application/json");
    res.status(200).end(JSON.stringify({ 
      ok: true, 
      time: new Date().toISOString() 
    }));
  } catch (e) {
    res.status(500).end(JSON.stringify({ error: e.message }));
  }
};
