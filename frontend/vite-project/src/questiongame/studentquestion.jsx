import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentQuestion.css";

const StudentQuestion = () => {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    const fetchDailyQuestion = async () => {
      try {
        const res = await axios.get("http://localhost:3001/questions/daily");
        setQuestion(res.data);
      } catch (error) {
        console.error("Error fetching daily question:", error);
      }
    };

    fetchDailyQuestion();
  }, []);

  useEffect(() => {
    const checkAnsweredStatus = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/questions/daily/answered"
        );
        setAlreadySubmitted(res.data.answered);
      } catch (error) {
        console.error("Error checking answered status:", error);
      }
    };

    checkAnsweredStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOption) {
      alert("Please select an option.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3001/questions/daily/submit",
        {
          selectedOption,
          questionId: question._id,
        }
      );

      setFeedback(res.data.message);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="container">
      {" "}
      <h1>החידה המתחלפת !!!</h1>
      <div className="outer-border">
        <div className="middle-border">
          <div className="inner-border">
            <div className="innest-border">
              {question && !alreadySubmitted && !submitted ? (
                <form className="question-form" onSubmit={handleSubmit}>
                  {" "}
                  <h2>{question.content}</h2>
                  {question.options.map((option, index) => (
                    <div key={index} className="radio-container">
                      <input
                        type="radio"
                        id={option.text}
                        name="option"
                        value={option.text}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        disabled={submitted}
                      />
                      <label htmlFor={option.text}>{option.text}</label>
                    </div>
                  ))}
                  <button
                    className="sure-button"
                    type="submit"
                    disabled={submitted}
                  >
                    אני בטוח .
                  </button>{" "}
                </form>
              ) : alreadySubmitted ? (
                <p>כבר ענית היום.</p>
              ) : (
                <p>{feedback || "Loading..."}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQuestion;
