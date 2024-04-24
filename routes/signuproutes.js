const express = require('express');
const router = express.Router();
const {userSignUp,doctorSignUp} = require('../controllers/signup');

router.post('/user/signup', userSignUp);
router.post('/doctor/signup', doctorSignUp);
