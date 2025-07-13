
const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');

function generatePDFReport(data, title = 'CVE Report') {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const stream = new PassThrough();
      const chunks = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Header
      doc.fontSize(20).text(title, { align: 'center' });
      doc.moveDown();

      // CVE entries
      data.forEach((cve, index) => {
        doc.fontSize(12).fillColor('black').text(`${index + 1}. ${cve.id}`, { underline: true });
        doc.moveDown(0.2);
        doc.fontSize(10).fillColor('gray').text(`CVSS: ${cve.cvss} | Published: ${cve.published}`);
        doc.fontSize(10).fillColor('black').text(`Threat Score: ${cve.threatScore} | Priority: ${cve.priority}`);
        doc.moveDown(0.2);
        doc.fontSize(10).text(`Summary: ${cve.summary}`);
        doc.moveDown();
      });

      doc.end(); // Finalize PDF
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  generatePDFReport,
};
