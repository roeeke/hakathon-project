const express = require('express');
const router = express.Router();
const RacingGameController = require('../Controllers/RacingGameController');
router.post('/', RacingGameController.createRacingGame);

router.get('/', RacingGameController.getAllRacingGames);

router.get('/:racingGameId', RacingGameController.getRacingGameById);

router.put('/:racingGameId', RacingGameController.updateRacingGame);

router.delete('/:racingGameId', RacingGameController.deleteRacingGame);

module.exports = router;
