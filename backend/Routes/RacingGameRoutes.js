const express = require('express');
const router = express.Router();
const RacingGameController = require('../Controllers/RacingGameController');

// Route for creating a new racing game
router.post('/', RacingGameController.createRacingGame);

// Route for fetching all racing games
router.get('/', RacingGameController.getAllRacingGames);

// Route for fetching a racing game by ID
router.get('/:racingGameId', RacingGameController.getRacingGameById);

// Route for updating a racing game by ID
router.put('/:racingGameId', RacingGameController.updateRacingGame);

// Route for deleting a racing game by ID
router.delete('/:racingGameId', RacingGameController.deleteRacingGame);

module.exports = router;
