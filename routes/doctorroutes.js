const express = require('express');
const router = express.Router();

const toggleAvailability = require('../controllers/availability');

router.post('/toggleavailability', toggleAvailability);

module.exports = router;
