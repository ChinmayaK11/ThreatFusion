const express = require('express');
const router = express.Router();
const { getIPDetails, getThreatFeeds } = require('../controllers/feedController');

// Route to get IP details (GET /?ip=...)
router.get('/', getIPDetails);

// Route to fetch threat feeds (GET /fetch)
router.get('/fetch', getThreatFeeds);

module.exports = router;
