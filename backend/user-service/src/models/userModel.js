const mongoose = require('mongoose');

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true, // Ensure that each userId is unique
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true // Ensure that each username is unique
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }); 

module.exports = mongoose.model('User', UserSchema);
