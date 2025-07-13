const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password
  },
});

async function sendEmail({ to, subject, html, attachments }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
    attachments, // This can be undefined or an array
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
