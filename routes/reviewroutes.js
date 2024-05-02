const express = require('express');
const router = express.Router();

const {postReview,getReviewsOfDoctor} = require('../controllers/review');

router.post('/givereview', postReview);
router.get('/getreview', getReviewsOfDoctor);

module.exports = router;
