const express = require('express');
const router = express.Router();
const {
    createMemoryGame,
    getAllMemoryGames,
    getMemoryGameById,
    updateMemoryGame,
    deleteMemoryGame,
    getAnswersByQuestionId
  } = require('../Controllers/MemoryGameController');

// Route for creating a new memory game
router.post('/',createMemoryGame);

// Route for fetching all memory games
router.get('/',getAllMemoryGames);

// Route for fetching a memory game by ID
router.get('/:memoryGameId',getMemoryGameById);

// Route for updating a memory game by ID
router.put('/:memoryGameId',updateMemoryGame);

// Route for deleting a memory game by ID
router.delete('/:memoryGameId',deleteMemoryGame);
router.get('/:questionId', getAnswersByQuestionId);
module.exports = router;