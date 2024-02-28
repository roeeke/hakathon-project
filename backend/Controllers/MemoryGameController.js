const MemoryGame = require('../Models/MemoryGame');

// Controller to create a new memory game
const createMemoryGame = async (req, res) => {
  const { title, questions } = req.body;

  try {
    const newMemoryGame = new MemoryGame({ title, questions });
    await newMemoryGame.save();

    res.status(201).json({ message: 'Memory game created successfully', memoryGame: newMemoryGame });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to fetch all memory games
const getAllMemoryGames = async (req, res) => {
  try {
    const memoryGames = await MemoryGame.find();

    res.status(200).json({ memoryGames });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to fetch a single memory game by ID
const getMemoryGameById = async (req, res) => {
  const { memoryGameId } = req.params;

  try {
    const memoryGame = await MemoryGame.findById(memoryGameId);

    if (memoryGame) {
      res.status(200).json({ memoryGame });
    } else {
      res.status(404).json({ message: 'Memory game not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update a memory game by ID
const updateMemoryGame = async (req, res) => {
  const { memoryGameId } = req.params;
  const { title, questions } = req.body;

  try {
    const updatedMemoryGame = await MemoryGame.findByIdAndUpdate(memoryGameId, { title, questions }, { new: true });

    if (updatedMemoryGame) {
      res.status(200).json({ message: 'Memory game updated successfully', memoryGame: updatedMemoryGame });
    } else {
      res.status(404).json({ message: 'Memory game not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to delete a memory game by ID
const deleteMemoryGame = async (req, res) => {
  const { memoryGameId } = req.params;

  try {
    const deletedMemoryGame = await MemoryGame.findByIdAndDelete(memoryGameId);

    if (deletedMemoryGame) {
      res.status(200).json({ message: 'Memory game deleted successfully' });
    } else {
      res.status(404).json({ message: 'Memory game not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createMemoryGame,
  getAllMemoryGames,
  getMemoryGameById,
  updateMemoryGame,
  deleteMemoryGame
};
