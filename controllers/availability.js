const Doctor = require('../models/doctor');


const toggleAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params; // Assuming doctorId is passed as a route parameter
    const doctor = await Doctor.findById(doctorId);
    
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Toggle the availability
    doctor.availability = !doctor.availability;
    await doctor.save();

    res.status(200).json({ message: 'Availability toggled successfully', doctor });
  } catch (error) {
    console.error('Error toggling availability:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = toggleAvailability;
