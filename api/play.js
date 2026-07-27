module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const apiKey = process.env.INDOCAST_API_KEY || "bb47332ceca91e3a2c97128a40c798a69306400072cc4b5a352800697069e45c";
  const { id = "", se = "1", ep = "1", detailPath = "" } = req.query;

  try {
    const targetUrl = `https://indocast.site/api/dramovnime/getplay?id=${id}&se=${se}&ep=${ep}&lang=in_id&detailPath=${encodeURIComponent(detailPath)}`;
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
