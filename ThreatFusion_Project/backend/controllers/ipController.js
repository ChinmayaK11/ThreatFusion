const { fetchIPReputation } = require('../services/feedService');

exports.getIPDetails = async (req, res) => {
  try {
    const ip = req.params.ip;
    const data = await fetchIPReputation(ip);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch IP details' });
  }
};