const express = require('express');
const router = express.Router();
const { getIPDetails } = require('../controllers/ipController');

router.get('/:ip', getIPDetails);

module.exports = router;