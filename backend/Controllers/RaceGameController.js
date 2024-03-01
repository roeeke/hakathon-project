// const RaceGame = require('../Models/RaceGame');

// // Function to list available subjects
// exports.listSubjects = async (req, res) => {
//   try {
//     const subjects = await RaceGame.distinct('subject');
//     res.json({ subjects });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching subjects", error });
//   }
// };

// // Function to start a new game
// exports.startGame = async (req, res) => {
//   try {
//     const { subject } = req.body;
//     // Add logic to create or fetch a game based on the subject
//     // This is a placeholder example
//     const game = await RaceGame.findOne({ subject });
//     res.json(game);
//   } catch (error) {
//     res.status(500).json({ message: "Error starting game", error });
//   }
// };

// // Function to fetch the current question
// exports.getCurrentQuestion = async (req, res) => {
//   const { gameId } = req.params;
//   try {
//     const game = await RaceGame.findById(gameId);
//     // Assuming the game document contains the current question info
//     res.json(game);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching question", error });
//   }
// };

// // Function to submit an answer
// exports.submitAnswer = async (req, res) => {
//   const { gameId, answerIndex } = req.body;
//   try {
//     // Add your logic to handle answer submission
//     // This is a placeholder response
//     res.json({ message: "Answer submitted", finished: true });
//   } catch (error) {
//     res.status(500).json({ message: "Error submitting answer", error });
//   }
// };
