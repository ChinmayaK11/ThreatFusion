const { generatePDFReport } = require('../services/pdfService');
const sendEmail = require('../services/emailService');
const axios = require('axios');
const summarizeCVE = require('../../ai/summarizer');
const { calculateThreatScore, getPriorityLabel } = require('../utils/threatScorer');

exports.sendEmail = async () => {
  try {
    const { data: cves } = await axios.get('https://cve.circl.lu/api/last');
    const topCVEs = cves.slice(0, 10);

    const processedCVEs = [];

    for (const cve of topCVEs) {
      const threatScore = calculateThreatScore(cve);
      const priority = getPriorityLabel(threatScore);
      const summary = await summarizeCVE(cve);

      processedCVEs.push({
        id: cve.id,
        summary,
        cvss: cve.cvss || 0,
        published: cve.Published,
        description: cve.summary,
        threatScore,
        priority,
        references: cve.references
      });
    }

    // ✅ Generate PDF buffer
    const pdfBuffer = await generatePDFReport(processedCVEs, 'Daily CVE Threat Report');

    // ✅ Send email with PDF attachment
    await sendEmail({
      to: 'honey02052004@gmail.com', // replace with real email
      subject: 'Daily ThreatFusion CVE Report',
      html: '<h2>Please find attached the latest CVE Threat Report.</h2>',
      attachments: [
        {
          filename: 'Daily_CVE_Report.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });

    console.log('✅ Email with PDF report sent!');
  } catch (error) {
    console.error('❌ Failed to send CVE report email:', error);
  }
};
