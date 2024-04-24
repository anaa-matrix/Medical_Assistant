const Rating = require('../models/rating');
const Doctor = require('../models/doctor');

const giveRating = async (req, res) => {
  try {
    const { doctorId, rating, review } = req.body;
    
    // Check if the doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Create a new rating instance
    const newRating = new Rating({
      rating,
      review
    });

    // Save the new rating to the database
    await newRating.save();

    // Update the doctor's rating statistics
    doctor.rating = (doctor.rating * doctor.numRatings + rating) / (doctor.numRatings + 1);
    doctor.numRatings += 1;
    await doctor.save();

    res.status(201).json({ message: 'Rating added successfully', rating: newRating });
  } catch (error) {
    console.error('Error giving rating:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = giveRating;
