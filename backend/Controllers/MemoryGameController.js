const Question = require('../Models/memoryGame/QuestionSchema');
const Answer = require('../Models/memoryGame/AnswerSchema');
const MemoryGame = require('../Models/memoryGame/memoryGame')
// Controller to create a new memory game
const createMemoryGame = async (req, res) => {
    const { questions, answers } = req.body;

    try {
        // Create new questions
        console.log(answers)
        const createdQuestions = await Question.create({ questionText: questions });
        console.log("here", 12)

        // Create new answers with corresponding question IDs
        // const answersWithQuestionIds = answers.map((answer, index) => ({
        //     ...answer,
        //     questionId: createdQuestions[index]._id
        // }));
        console.log("here", 19)
        const createdAnswers = await Answer.create({ answerText: answers, questionId: createdQuestions._id });
        console.log(createdAnswers.answerText);
        console.log(createdQuestions.questionText);
        console.log("lol");
        // Create a new memory game with references to questions and answers
        const newMemoryGame = new MemoryGame({ questions: createdQuestions, answers: createdAnswers});
        console.log(newMemoryGame);
        
        await newMemoryGame.save();
        res.status(201).json({ message: 'Memory game created successfully', memoryGame: newMemoryGame });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Controller to fetch all memory games
const getAllMemoryGames = async (req, res) => {
    try {
        const memoryGames = await MemoryGame.find();
        res.status(200).json({ memoryGames });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
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
        // Update questions
        await Question.deleteMany({ _id: { $in: questions.map(q => q._id) } });
        const updatedQuestions = await Question.create(questions);

        // Update memory game with new questions
        const updatedMemoryGame = await MemoryGame.findByIdAndUpdate(memoryGameId, { title, questions: updatedQuestions }, { new: true });

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
// Controller to fetch answers by question ID
const getAnswersByQuestionId = async (req, res) => {
    const { questionId } = req.params;

    try {
        const answers = await Answer.find({ questionId });

        if (answers.length > 0) {
            res.status(200).json({ answers });
        } else {
            res.status(404).json({ message: 'Answers not found for the provided question ID' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAnswersByQuestionId
};


module.exports = {
    createMemoryGame,
    getAllMemoryGames,
    getMemoryGameById,
    updateMemoryGame,
    deleteMemoryGame,
    getAnswersByQuestionId
};