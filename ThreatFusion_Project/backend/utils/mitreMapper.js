const mitreData = require('../../data/mitre_matrix.json');

exports.mapToMitre = (cveId) => {
  return mitreData[cveId] || { tactic: 'Privilege Escalation', technique: 'T1055' };
};

// backend/utils/apiFetcher.js
const axios = require('axios');

exports.fetchJSON = async (url) => {
  const { data } = await axios.get(url);
  return data;
};