const Question = require("../Models/Question");
const User = require("../Models/User");

const createDailyQuestion = async (req, res) => {
  try {
    const questionExists = await Question.findOne({});
    if (questionExists) {
      return res.status(400).json({ message: "An initial question already exists." });
    }

    const question = new Question({
      content: req.body.content,
      options: req.body.options
    });

    await question.save();
    res.status(201).json({ message: "Initial question created successfully", question });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateDailyQuestion = async (req, res) => {
  try {
    let question = await Question.findOne({});
  
    if (!question) {
      question = new Question(req.body);
    } else {
      question.content = req.body.content;
      question.options = req.body.options;
    }
  
    await question.save();

    
    await User.updateMany({}, { $set: { answeredDailyQuestion: false } });

    res.json({ message: "Daily question updated successfully, and all users can answer again.", question });
  } catch (error) {
    console.error("Error updating daily question or resetting user flags:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getDailyQuestion = async (req, res) => {
  try {
    const question = await Question.findOne({});
    if (!question) return res.status(404).json({ message: "No daily question found" });
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const submitAnswer = async (req, res) => {
  const { selectedOption, questionId } = req.body;
  try {
    const user = await User.findById(req.cookies.userId);
    const question = await Question.findById(questionId);

    if (!user || !question) {
      return res.status(404).json({ message: "User or question not found" });
    }

    if (user.answeredDailyQuestion === false) {
      const isCorrect = question.options.some(option => option.isCorrect && option.text === selectedOption);

      // Mark the user as having answered the question
      user.answeredDailyQuestion = true;
      user.lastAnswerSubmitted = new Date();

      let message = "Incorrect answer!";
      if (isCorrect) {
        // Initially award 3 stars for correct answer
        user.stars += 3;
        message = "Correct answer! You earned 3 stars.";

        await user.save();

        // After saving, check if the user is among the first three correct responders
        const topCorrectResponders = await User.find({ answeredDailyQuestion: true, stars: { $gte: 3 } })
          .sort({ lastAnswerSubmitted: 1 })
          .limit(3);
        
        const isTopCorrectResponder = topCorrectResponders.find(responder => responder.id.toString() === user.id.toString());
        if (isTopCorrectResponder) {
          // If the user is among the top 3 correct, award additional 3 stars (making it 6)
          user.stars += 3;
          await user.save();
          message = "Amazing! You're among the first 3 to answer correctly and earned 6 stars!";
        }
      } else {
        // Even if the answer is incorrect, save the attempt to prevent re-attempts
        await user.save();
      }

      res.json({ message });
    } else {
      res.status(400).json({ message: "You have already answered the daily question." });
    }
  } catch (error) {
    console.error("Error submitting answer:", error);
    res.status(500).json({ message: "Server error" });
  }
};



const checkIfAnswered = async (req, res) => {
  try {
    const userId = req.cookies.userId; 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ answered: user.answeredDailyQuestion });
  } catch (error) {
    console.error("Error checking if answered:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getTopResponders = async (req, res) => {
  try {
    const topResponders = await User.find({ answeredDailyQuestion: true })
      .sort({ lastAnswerSubmitted: 1 }) 
      .limit(3) 
      .select('username lastAnswerSubmitted -_id');

    res.json(topResponders);
  } catch (error) {
    console.error("Error fetching top responders:", error);
    res.status(500).json({ message: "Server error" });
  }
};




module.exports = {
  updateDailyQuestion,
  getDailyQuestion,
  submitAnswer,
  createDailyQuestion,
  checkIfAnswered,
  getTopResponders
};
