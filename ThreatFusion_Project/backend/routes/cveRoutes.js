const express = require('express');
const router = express.Router();
const { getCVEInsight } = require('../controllers/cveController');

router.get('/:id', getCVEInsight);

module.exports = router;