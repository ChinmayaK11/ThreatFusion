const { fetchCVEFromAPI } = require('../services/cveService');
const { calculateThreatScore, getPriorityLabel } = require('../utils/threatScorer');
const { mapToMitre } = require('../utils/mitreMapper');
const { generatePDFReport } = require('../services/pdfService');
const summarizeCVE = require('../../ai/summarizer'); // ⬅️ Add this line

exports.getCVEInsight = async (req, res) => {
  try {
    const cveId = req.params.id;
    const cveData = await fetchCVEFromAPI(cveId);
    const mitreInfo = mapToMitre(cveId);
    const threatScore = calculateThreatScore(cveData);
    const priority = getPriorityLabel(threatScore);

    // 🧠 Generate Gemini AI summary
    const summary = await summarizeCVE(cveData);

    const result = {
      ...cveData,
      mitre: mitreInfo,
      threatScore,
      priority,
      summary // ⬅️ Include in final response
    };
    
    res.json(result);
  } catch (err) {
    console.error('Error in getCVEInsight:', err);
    res.status(500).json({ error: 'Failed to fetch CVE insight' });
  }
};
