// backend/config/nodemailerConfig.js
const nodemailer = require('nodemailer');

// Create a transporter using Gmail's SMTP server
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',    // SMTP host for Gmail
  port: 587,                 // Port 587 for TLS
  secure: false,             // false for TLS (use true for SSL port 465)
  auth: {
    user: process.env.EMAIL_USER,   // Your Gmail email address
    pass: process.env.EMAIL_PASS    // Your Gmail App password (generated)
  }
});

// Verify the SMTP configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP verification failed:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

module.exports = transporter;

