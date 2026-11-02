export default async function handler(req, res) {
  // 1. Enable Global CORS Headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle Preflight Requests
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const { number } = req.query;
  const key = req.query.key || req.query.slug || null;

  // 2. Validate Required Parameters
  if (!number) {
    return res.status(400).json({
      Status: "Error",
      Message: "Number parameter is required.",
      Developer: "@KaluaApiAdmin",
      Telegram: "@KaluaApiStore"
    });
  }

  if (!key) {
    return res.status(401).json({
      Status: "Error",
      Message: "API key is required.",
      Developer: "@KaluaApiAdmin",
      Telegram: "@KaluaApiStore"
    });
  }

  if (!key.startsWith('KALUA-')) {
    return res.status(401).json({
      Status: "Error",
      Message: "Invalid API key format.",
      Developer: "@KaluaApiAdmin",
      Telegram: "@KaluaApiStore"
    });
  }

  // 3. Fetch Upstream Data & Return Clean JSON Response
  try {
    const upstream = await fetch(
      `https://tfqdeadlo-1-78bapi.hf.space/search?mobile=${encodeURIComponent(number)}`
    );

    if (!upstream.ok) {
      throw new Error(`Upstream server responded with status: ${upstream.status}`);
    }

    const data = await upstream.json();

    return res.status(200).json({
      Status: data.Status || "Success",
      Number: data.Number || number,
      Data: data.Data || data || null,
      Developer: "@KaluaApiAdmin",
      Telegram: "@KaluaApiStore"
    });
  } catch (err) {
    return res.status(500).json({
      Status: "Error",
      Message: "Upstream fetch failed",
      Details: err.message,
      Developer: "@KaluaApiAdmin",
      Telegram: "@KaluaApiStore"
    });
  }
}
