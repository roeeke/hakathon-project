// Import Mongoose
const mongoose = require('mongoose');

// Define RacingGame Schema
const racingGameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  questions: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question' // Reference to the Question model
    },
    answer: String // Answer to the question
  }],
  // Add more fields as needed, such as description, createdBy, etc.
});

// Create RacingGame model
const RacingGame = mongoose.model('RacingGame', racingGameSchema);

// Export RacingGame model
module.exports = RacingGame;
