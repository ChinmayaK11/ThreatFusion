const axios = require('axios');

exports.fetchJSON = async (url) => {
  const { data } = await axios.get(url);
  return data;
};