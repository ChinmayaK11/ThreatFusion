const axios = require('axios');

exports.fetchCVEFromAPI = async (cveId) => {
  const url = `https://cveawg.mitre.org/api/cve/${cveId}`; // ← or the working URL you hit
  const { data } = await axios.get(url);

  if (!data || !data.containers || !data.containers.cna) {
    throw new Error(`CVE data not found or malformed for ID: ${cveId}`);
  }

  const cna = data.containers.cna;

  return {
    id: cveId,
    description: cna.descriptions?.[0]?.value || 'No description available',
    cvss: cna.metrics?.[0]?.cvssV3?.baseScore || 0,
    exploited: false, // No direct flag here — you can enrich later
    reports: cna.references?.length || 0
  };
};
