const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({ 
    rating: {
        type: Number,
        required: true,
        min: 0, // Minimum rating value
        max: 5, // Maximum rating value
    },
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;