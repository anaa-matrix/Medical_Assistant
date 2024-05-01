const Doctor = require('../models/Doctor');
const Rating = require('../models/Rating');

const giveRatingToDoctor = async (req, res) => {
    const { doctorId, ratingValue } = req.body;

    // Check if the rating value is in the range of 1 to 5
    if (ratingValue < 1 || ratingValue > 5) {
        return res.status(400).json({ error: 'Rating value should be between 1 and 5' });
    }

    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Create or update the rating
        let rating = await Rating.findOne({ doctor: doctorId });
        if (!rating) {
            rating = new Rating({ doctor: doctorId, value: ratingValue });
        } else {
            rating.value = ratingValue;
        }

        await rating.save();

        // Update the doctor's rating reference
        doctor.rating = rating._id;
        await doctor.save();

        res.status(200).json({ message: 'Rating saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    giveRatingToDoctor
};
