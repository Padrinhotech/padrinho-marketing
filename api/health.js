/**
 * Health Check Endpoint
 * Minimal test
 */

module.exports = async function handler(req, res) {
  res.json({ ok: true, time: new Date().toISOString() });
};
