const Doctor = require('../models/doctor');

const recommendation = async (req, res) => {
  try {
    const { speciality } = req.body;

    // Find doctors with the specified speciality
    const doctors = await Doctor.find({ speciality })
      .sort({ rating: -1 }) // Sort doctors by rating in descending order
      .limit(5); // Limit the result to 5 top-rated doctors

    res.status(200).json({ message: 'Recommendation generated successfully', doctors });
  } catch (error) {
    console.error('Error generating recommendation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = recommendation;
