const Doctor = require('../models/Doctor');

const recommendation = async (req, res) => {
    try {
        const { speciality, latitude, longitude } = req.body;

        // Find doctors with the specified speciality and calculate the distance
        const doctors = await Doctor.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [longitude, latitude] // The user's location
                    },
                    distanceField: 'distance',
                    spherical: true,
                    maxDistance: 10000 // Maximum distance in meters (adjust as needed)
                }
            },
            {
                $match: { speciality }
            },
            {
                $sort: { distance: 1, 'rating': -1 } // Sort by distance and then by rating
            },
            {
                $limit: 15 // Limit the result to 15 doctors
            }
        ]);

        res.status(200).json({ message: 'Recommendation generated successfully', doctors });
    } catch (error) {
        console.error('Error generating recommendation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = recommendation;
