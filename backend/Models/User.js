// Import Mongoose
const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // Ensure usernames are unique
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'student'], // Define roles as 'admin' or 'student'
    required: true
  },
  // Add more fields as needed, such as email, name, etc.
});

// Create User model
const User = mongoose.model('User', userSchema);

// Export User model
module.exports = User;
