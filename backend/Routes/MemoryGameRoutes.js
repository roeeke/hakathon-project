const express = require('express');
const router = express.Router();
const MemoryGameController = require('../Controllers/MemoryGameController');

// Route for creating a new memory game
router.post('/', MemoryGameController.createMemoryGame);

// Route for fetching all memory games
router.get('/', MemoryGameController.getAllMemoryGames);

// Route for fetching a memory game by ID
router.get('/:memoryGameId', MemoryGameController.getMemoryGameById);

// Route for updating a memory game by ID
router.put('/:memoryGameId', MemoryGameController.updateMemoryGame);

// Route for deleting a memory game by ID
router.delete('/:memoryGameId', MemoryGameController.deleteMemoryGame);

module.exports = router;
