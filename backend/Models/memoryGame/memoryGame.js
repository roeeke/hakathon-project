const mongoose = require('mongoose');

const memoryGameSchema = new mongoose.Schema({
  questions: [{
    type: mongoose.Schema.Types.Mixed,
  }],
  answers: [{
    type: mongoose.Schema.Types.Mixed,

  }]
});

const MemoryGame = mongoose.model('MemoryGame', memoryGameSchema);

module.exports = MemoryGame;