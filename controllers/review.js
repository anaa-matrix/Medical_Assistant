const Review = require('../models/review');

const postReview = async (req, res) => {
  try {
    const { comment, user, doctor } = req.body;

    // Create a new review instance
    const newReview = new Review({
      comment,
      user,
      doctor,
    });

    // Save the new review to the database
    await newReview.save();

    res.status(201).json({ message: 'Review posted successfully', review: newReview });
  } catch (error) {
    console.error('Error posting review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getReviewsOfDoctor = async (req, res) => {
  try {
      const { doctorId } = req.body;

      // Find all reviews of the doctor
      const reviews = await Review.find({ doctor: doctorId });
      if (reviews.length === 0) {
          return res.status(404).json({ error: 'No reviews found for this doctor' });
      }

      res.status(200).json({ reviews });
  } catch (error) {
      console.error('Error getting reviews:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { postReview, getReviewsOfDoctor};
