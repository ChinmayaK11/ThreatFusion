const fs = require('fs');
const path = require('path');
const genAI = require('../geminiConfig');

const loadPrompt = (templateName) => {
  const filePath = path.join(__dirname, '..', 'prompts', templateName);
  return fs.readFileSync(filePath, 'utf8');
};

exports.generateSummary = async (cveData) => {
  const promptTemplate = loadPrompt('summarizer.txt');
  const prompt = promptTemplate
    .replace('{{cve_id}}', cveData.id)
    .replace('{{description}}', cveData.description)
    .replace('{{cvss}}', cveData.cvss)
    .replace('{{exploited}}', cveData.exploited)
    .replace('{{reports}}', cveData.reports);

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
};
