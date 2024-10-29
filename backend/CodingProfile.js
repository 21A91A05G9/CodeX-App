const mongoose = require('mongoose');
const { Schema } = mongoose;

const codingProfileSchema = new Schema({
    user: {
        type: String,
        ref: 'User', // Reference to the User collection
        unique: true
    },
    name: {
        type: String,
        required: true
      },
    platforms: {
        leetcode: { type: String, default: '' },
        codechef: { type: String, default: '' },
        geekforgeeks: { type: String, default: '' },
        // Add more platforms as needed
    }
});

const CodingProfile = mongoose.model('CodingProfile', codingProfileSchema);

module.exports = CodingProfile;
