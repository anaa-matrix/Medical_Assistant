const express = require('express');

const router = express.Router();

const {userLogin,doctorLogin} = require('../controllers/login');


module.exports = router;