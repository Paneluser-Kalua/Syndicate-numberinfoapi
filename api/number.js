export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  const { number } = req.query;
  const key = req.query.key || req.query.slug || null;

  if (!number) {
    return res.status(400).json({
      Status: "Error",
      Message: "Number Parameter Required",
      Developer: "@KaluaApiAdmin",
      Telegram: "@KaluaApiStore"
    });
  }

  if (!key) {
    return res.status(401).json({
      Status: "Error",
      Message: "Key Required",
      Developer: "@KaluaApiAdmin"
      Telegram: "@KaluaApiStore"
    });
  }

  if (!key.startsWith('KALUA-')) {
    return res.status(401).json({
      Status: "Error",
      Message: "Invalid key",
      Developer: "@KaluaApiAdmin"
    });
  }

  try {
    const upstream = await fetch(
      `https://tfqdeadlo-1-78bapi.hf.space/search?mobile=${encodeURIComponent(number)}`
    );
    const data = await upstream.json();

    return res.status(200).json({
      Status: Data.Status || "Success",
      Number: Data.Number || Number,
      Data: Data.Data || Null,
      Developer: "@KaluaApiAdmin",
      Telegram: "@KaluaApiStore"
    });
  } catch (err) {
    return res.status(500).json({
      Status: "Error",
      Message: "Upstream fetch failed",
      Developer: "@KaluaApiAdmin",
      Telegram: "@KaluaApiStore"
    });
  }
}
