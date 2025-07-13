const axios = require('axios');

exports.fetchThreatFeeds = async () => {
  try {
    const { data } = await axios.get(
      'https://otx.alienvault.com/api/v1/pulses/subscribed', 
      {
        headers: {
          'X-OTX-API-KEY': process.env.OTX_API_KEY
        }
      }
    );

    // Simplify the data for frontend usage
    const simplifiedFeeds = data.results.map(pulse => ({
      id: pulse.id,
      name: pulse.name,
      author: pulse.author_name,
      description: pulse.description,
      created: pulse.created,
      tags: pulse.tags,
      indicators: pulse.indicators.map(ind => ({
        type: ind.type,
        indicator: ind.indicator,
        description: ind.description
      }))
    }));

    return simplifiedFeeds;
  } catch (error) {
    console.error('OTX Feed Error:', error.message);
    return [];
  }
};

exports.fetchIPReputation = async (ip) => {
  try {
    const ipinfoResponse = await axios.get(`https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_TOKEN}`);

    return {
      ip,
      country: ipinfoResponse.data.country,
      region: ipinfoResponse.data.region,
      city: ipinfoResponse.data.city,
      org: ipinfoResponse.data.org,
      loc: ipinfoResponse.data.loc,  // format: "lat,long"
      timezone: ipinfoResponse.data.timezone,
    };
  } catch (error) {
    console.error('IP Geolocation Error:', error.message);
    return { ip, error: 'Failed to fetch IP geolocation data' };
  }
};


