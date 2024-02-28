const Question = require('../Models/Question');

// Controller to create a new daily question
const createDailyQuestion = async (req, res) => {
  const { type, content } = req.body;

  try {
    const newQuestion = new Question({ type, content });
    await newQuestion.save();

    res.status(201).json({ message: 'Question created successfully', question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to fetch all daily questions
const getAllDailyQuestions = async (req, res) => {
  try {
    const dailyQuestions = await Question.find({ type: 'daily' });

    res.status(200).json({ questions: dailyQuestions });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to fetch a single daily question by ID
const getDailyQuestionById = async (req, res) => {
  const { questionId } = req.params;

  try {
    const question = await Question.findById(questionId);

    if (question && question.type === 'daily') {
      res.status(200).json({ question });
    } else {
      res.status(404).json({ message: 'Daily question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update a daily question by ID
const updateDailyQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { content } = req.body;

  try {
    const question = await Question.findByIdAndUpdate(questionId, { content }, { new: true });

    if (question && question.type === 'daily') {
      res.status(200).json({ message: 'Question updated successfully', question });
    } else {
      res.status(404).json({ message: 'Daily question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to delete a daily question by ID
const deleteDailyQuestion = async (req, res) => {
  const { questionId } = req.params;

  try {
    const question = await Question.findByIdAndDelete(questionId);

    if (question && question.type === 'daily') {
      res.status(200).json({ message: 'Question deleted successfully' });
    } else {
      res.status(404).json({ message: 'Daily question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createDailyQuestion,
  getAllDailyQuestions,
  getDailyQuestionById,
  updateDailyQuestion,
  deleteDailyQuestion
};
