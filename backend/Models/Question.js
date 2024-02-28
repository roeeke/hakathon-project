// Import Mongoose
const mongoose = require('mongoose');

// Define Question Schema
const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['daily', 'memory'], // Define question types as 'daily' or 'memory'
    required: true
  },
  content: {
    type: String,
    required: true
  },
  // Add more fields as needed, such as options, correct answer, etc.
});

// Create Question model
const Question = mongoose.model('Question', questionSchema);

// Export Question model
module.exports = Question;
