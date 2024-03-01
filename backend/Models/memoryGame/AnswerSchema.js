// answerSchema.js

const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  answerText: {
    type: String,
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'memoryQuestion',
    required: true
  }

});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;