const express = require('express');
const router = express.Router();
const QuestionController = require('../Controllers/QuestionController');


router.get('/daily', QuestionController.getDailyQuestion);
router.post('/daily/submit', QuestionController.submitAnswer);
router.post('/daily/update', QuestionController.updateDailyQuestion);
router.post('/daily/create', QuestionController.createDailyQuestion);
router.get('/daily/answered', QuestionController.checkIfAnswered);
router.get('/top-responders', QuestionController.getTopResponders);

module.exports = router;
