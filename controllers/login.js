const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Doctor = require('../models/doctor');

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ message: 'User logged in successfully', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the doctor exists with the provided email
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, doctor.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ doctorId: doctor._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Doctor logged in successfully', token });
  } catch (error) {
    console.error('Error logging in doctor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { userLogin, doctorLogin };
