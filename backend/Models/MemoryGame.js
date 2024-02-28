// Import Mongoose
const mongoose = require('mongoose');

// Define MemoryGame Schema
const memoryGameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question' // Reference to the Question model
  }],
  // Add more fields as needed, such as description, createdBy, etc.
});

// Create MemoryGame model
const MemoryGame = mongoose.model('MemoryGame', memoryGameSchema);

// Export MemoryGame model
module.exports = MemoryGame;
