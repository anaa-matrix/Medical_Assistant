const mongoose = require('mongoose');

const doctoberSchema = new mongoose.Schema({
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
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Rating'
    },
    image: {
        type: String,
        required: true
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
});

const Doctor = mongoose.model('Doctor', doctoberSchema);

module.exports = Doctor;
