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

        // Create a new rating
        const rating = new Rating({ doctor: doctorId, value: ratingValue });
        await rating.save();

        // Update the doctor's rating reference to the new rating
        doctor.rating = rating._id;
        await doctor.save();

        res.status(200).json({ message: 'Rating saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getRatingOfDoctor = async (req, res) => {
  const { doctorId } = req.body;

  try {
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
          return res.status(404).json({ error: 'Doctor not found' });
      }

      // Find all ratings of the doctor
      const ratings = await Rating.find({ doctor: doctorId });
      if (ratings.length === 0) {
          return res.status(404).json({ error: 'No ratings found for this doctor' });
      }

      // Calculate the average rating and round off
      const totalRating = ratings.reduce((acc, curr) => acc + curr.value, 0);
      const averageRating = Math.round((totalRating / ratings.length) * 2) / 2;

      res.status(200).json({ averageRating });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  }
};



  module.exports = {giveRatingToDoctor, getRatingOfDoctor};
