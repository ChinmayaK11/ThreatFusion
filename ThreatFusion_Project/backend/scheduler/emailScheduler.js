// backend/scheduler/emailScheduler.js
const cron = require('node-cron');
const emailController = require('../controllers/emailController');

cron.schedule('0 21 * * *', async () => { 
  try {
    console.log('Scheduler triggered at:', new Date()); // Log the time when it runs
    await emailController.sendEmail();  // Call the sendEmail function
    console.log('Email sent by scheduler!');
  } catch (err) {
    console.error('Error sending email via scheduler:', err);
  }
});
