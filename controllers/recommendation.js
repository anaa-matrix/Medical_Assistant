const Doctor = require('../models/Doctor');

const recommendation = async (req, res) => {
  try {
    const { speciality, latitude, longitude } = req.body;

    // Define the latitude and longitude ranges
    const latitudeRange = 0.5; // Range of 0.5 degrees (adjust as needed)
    const longitudeRange = 0.5; // Range of 0.5 degrees (adjust as needed)

    // Find all doctors with the specified speciality within a certain distance
    const doctors = await Doctor.find({
      speciality,
      availability: true,
      latitude: { $gte: latitude - latitudeRange, $lte: latitude + latitudeRange },
      longitude: { $gte: longitude - longitudeRange, $lte: longitude + longitudeRange },
    })
      .sort({ distance: 1, rating: -1 }) // Sort by distance and then by rating
      .limit(15); // Limit the result to 15 doctors

    res.status(200).json({ message: 'Recommendation generated successfully', doctors });
  } catch (error) {
    console.error('Error generating recommendation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = recommendation;
