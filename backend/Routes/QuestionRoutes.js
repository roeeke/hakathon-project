const express = require('express');
const router = express.Router();
const QuestionController = require('../Controllers/QuestionController');

// Route for creating a new daily question
router.post('/', QuestionController.createDailyQuestion);

// Route for fetching all daily questions
router.get('/', QuestionController.getAllDailyQuestions);

// Route for fetching a daily question by ID
router.get('/:questionId', QuestionController.getDailyQuestionById);

// Route for updating a daily question by ID
router.put('/:questionId', QuestionController.updateDailyQuestion);

// Route for deleting a daily question by ID
router.delete('/:questionId', QuestionController.deleteDailyQuestion);

module.exports = router;
