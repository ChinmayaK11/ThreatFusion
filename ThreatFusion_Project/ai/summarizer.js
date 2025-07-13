const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Always load env vars at the top

// Validate API key
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY not found in environment variables.');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async function summarizeCVE(cveData) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }); // safer than 'gemini-1.5-pro'

    const prompt = `
Summarize this CVE in simple language for security analysts and developers:
${JSON.stringify(cveData, null, 2)}
`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text(); // no await here
    return summary;
  } catch (err) {
    console.error('❌ Error generating CVE summary:', err.message || err);
    return 'Summary not available due to Gemini API error.';
  }
};
