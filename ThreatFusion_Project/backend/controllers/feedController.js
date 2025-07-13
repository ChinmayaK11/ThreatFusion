const { fetchThreatFeeds, fetchIPReputation } = require('../services/feedService');

// GET /fetch - Threat feed data
exports.getThreatFeeds = async (req, res) => {
  try {
    const feeds = await fetchThreatFeeds();
    res.status(200).json(feeds);
  } catch (err) {
    console.error('Controller Error - Threat Feeds:', err.message);
    res.status(500).json({ error: 'Failed to fetch threat feeds' });
  }
};

// GET /?ip=1.2.3.4 - IP reputation
exports.getIPDetails = async (req, res) => {
  const ip = req.query.ip;
  if (!ip) {
    return res.status(400).json({ error: 'IP address is required' });
  }

  try {
    const result = await fetchIPReputation(ip);
    res.status(200).json(result);
  } catch (err) {
    console.error('Controller Error - IP Lookup:', err.message);
    res.status(500).json({ error: 'Failed to fetch IP details' });
  }
};
