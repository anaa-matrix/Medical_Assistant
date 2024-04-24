const uploadToCloudinary = require('../config/cloudinary');
const User = require('../models/user');
const Doctor = require('../models/doctor');


const doctorSignUp = async (req, res) => {
  try {
    const {
      name,
      speciality,
      latitude,
      longitude,
      hospital,
      city,
      experience,
      fees,
      rating,
      schedule,
      availability,
      message,
      phoneNumber,
    } = req.body;
    const profilePic = req.files.profilePic; // Assuming req.files is an object containing the uploaded file

    // Upload profile picture to Cloudinary
    const imageUrl = await uploadToCloudinary(profilePic.tempFilePath);

    // Create a new doctor instance
    const newDoctor = new Doctor({
      name,
      speciality,
      latitude,
      longitude,
      hospital,
      city,
      experience,
      fees,
      rating,
      schedule,
      availability,
      message,
      phoneNumber,
      image: imageUrl,
    });

    // Save the new doctor to the database
    await newDoctor.save();

    console.log('Doctor registered successfully:', newDoctor);
    res.status(201).json({ message: 'Doctor registered successfully', doctor: newDoctor });
  } catch (error) {
    console.error('Error registering doctor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const bcrypt = require('bcryptjs');

const userSignUp = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    // Check if the user already exists with the provided email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists.' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    // Save the new user to the database
    await newUser.save();

    console.log('User registered successfully:', newUser);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {userSignUp, doctorSignUp};
