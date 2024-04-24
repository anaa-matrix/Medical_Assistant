const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;