import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DailyQuestionAdmin = () => {
  const [questionContent, setQuestionContent] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [isQuestionExists, setIsQuestionExists] = useState(false);

  useEffect(() => {
    const fetchDailyQuestion = async () => {
      try {
        const res = await axios.get('http://localhost:3001/questions/daily');
        if (res.data) {
          setQuestionContent(res.data.content);
          setOptions(res.data.options.map(option => option.text));
          setCorrectAnswerIndex(res.data.options.findIndex(option => option.isCorrect));
          setIsQuestionExists(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsQuestionExists(false);
        } else {
          console.error('Error fetching daily question:', error);
        }
      }
    };

    fetchDailyQuestion();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:3001/questions/daily/${isQuestionExists ? 'update' : 'create'}`;
    try {
      await axios.post(url, {
        content: questionContent,
        options: options.map((option, index) => ({
          text: option,
          isCorrect: index === correctAnswerIndex,
        })),
      });
      alert(`Daily question ${isQuestionExists ? 'updated' : 'created'} successfully`);
    } catch (error) {
      console.error(`Error ${isQuestionExists ? 'updating' : 'creating'} daily question:`, error);
      alert(`Failed to ${isQuestionExists ? 'update' : 'create'} the daily question`);
    }
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  // Simple inline styles
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    background: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div>
        <label htmlFor="questionContent">צור שאלה:</label>
        <br />
        <textarea
          id="questionContent"
          value={questionContent}
          onChange={(e) => setQuestionContent(e.target.value)}
          required
          style={{ ...inputStyle, height: '100px', resize: 'vertical' }}
        />
      </div>
      <div>
        <label>תשובות:</label>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              name="correctAnswer"
              value={index}
              checked={correctAnswerIndex === index}
              onChange={() => setCorrectAnswerIndex(index)}
              style={{ marginRight: '10px' }}
            />
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e)}
              required
              style={inputStyle}
            />
          </div>
        ))}
      </div>
      <button type="submit" style={buttonStyle}>{isQuestionExists ? 'עדכן שאלה' : 'צור שאלה'}</button>
    </form>
  );
};

export default DailyQuestionAdmin;
