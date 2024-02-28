const RacingGame = require('../Models/RacingGame');

// Controller to create a new racing game
const createRacingGame = async (req, res) => {
  const { title, questions } = req.body;

  try {
    const newRacingGame = new RacingGame({ title, questions });
    await newRacingGame.save();

    res.status(201).json({ message: 'Racing game created successfully', racingGame: newRacingGame });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to fetch all racing games
const getAllRacingGames = async (req, res) => {
  try {
    const racingGames = await RacingGame.find();

    res.status(200).json({ racingGames });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to fetch a single racing game by ID
const getRacingGameById = async (req, res) => {
  const { racingGameId } = req.params;

  try {
    const racingGame = await RacingGame.findById(racingGameId);

    if (racingGame) {
      res.status(200).json({ racingGame });
    } else {
      res.status(404).json({ message: 'Racing game not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update a racing game by ID
const updateRacingGame = async (req, res) => {
  const { racingGameId } = req.params;
  const { title, questions } = req.body;

  try {
    const updatedRacingGame = await RacingGame.findByIdAndUpdate(racingGameId, { title, questions }, { new: true });

    if (updatedRacingGame) {
      res.status(200).json({ message: 'Racing game updated successfully', racingGame: updatedRacingGame });
    } else {
      res.status(404).json({ message: 'Racing game not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to delete a racing game by ID
const deleteRacingGame = async (req, res) => {
  const { racingGameId } = req.params;

  try {
    const deletedRacingGame = await RacingGame.findByIdAndDelete(racingGameId);

    if (deletedRacingGame) {
      res.status(200).json({ message: 'Racing game deleted successfully' });
    } else {
      res.status(404).json({ message: 'Racing game not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createRacingGame,
  getAllRacingGames,
  getRacingGameById,
  updateRacingGame,
  deleteRacingGame
};
