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

module.exports = postReview;
