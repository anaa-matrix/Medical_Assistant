const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },  
    longitude: {
        type: Number,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    rating: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating',
        default: 0
    },
    image: {
        type: String,
    },
    schedule: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: false
    },
    message: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
