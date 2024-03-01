// questionSchema.js

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  }
  // You can add more fields here as needed
});

const Question = mongoose.model('memoryQuestion', questionSchema);

module.exports = Question;