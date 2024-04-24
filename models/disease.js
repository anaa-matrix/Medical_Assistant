const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    speciality: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Speciality',
    },
});
const Disease = mongoose.model('Disease', diseaseSchema);
module.exports = Disease;