const express  = require('express');

const router = express.Router();
const recommendation = require('../controllers/recommendation');
router.get('/recommendations', recommendation);

module.exports = router;